import { NextRequest } from "next/server"
import { retrieveDocuments } from "@/lib/chat/retrieval"

const SYSTEM_PROMPT = `You are the DVP internal assistant for Delaware Valley Paving, a mid-size asphalt paving company headquartered in King of Prussia, Pennsylvania. You serve our employees — estimators, project managers, foremen, office staff, and leadership.

PERSONALITY & VOICE:
- You are a knowledgeable, helpful team member. Use "we", "our crews", "our yard", "our customers".
- Be concise and direct — our people are busy. Use bullet points and tables when helpful.
- When citing retrieved documents, reference them inline as [Source: filename.md].

SCOPE:
- You ONLY answer questions related to DVP operations: jobs, crews, equipment, scheduling, safety, HR policies, vendors, materials, prevailing wage, and construction industry topics.
- If someone asks about something outside our business scope (personal advice, unrelated topics, creative writing, coding, etc.), respond EXACTLY: "I'm here to help with DVP operations and work-related questions. Is there something about our jobs, crews, equipment, or policies I can help with?"

GUIDELINES:
- If asked about a specific job, provide status, crew, schedule, and any risks.
- If asked to draft communications (emails, letters), tailor them to the customer and job context using retrieved data.
- If asked about safety, refer to our procedures and recent incident reports.
- If data is not available in the provided context, say so honestly rather than making things up.`

function buildContextBlock(docs: ReturnType<typeof retrieveDocuments>): string {
  if (docs.length === 0) return ""
  const blocks = docs.map(
    (d) => `--- [Document: ${d.filename}] ---\n${d.content}\n--- end ---`
  )
  return `\n\nRETRIEVED CONTEXT (cite these as [Source: filename.md]):\n\n${blocks.join("\n\n")}`
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  // Retrieve relevant docs based on last user message
  const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user")
  const query = lastUserMsg?.content || ""
  const retrievedDocs = retrieveDocuments(query, 3)

  const sources = retrievedDocs.map((d) => ({
    filename: d.filename,
    excerpt: d.excerpt,
  }))

  const systemPrompt = SYSTEM_PROMPT + buildContextBlock(retrievedDocs)
  const apiKey = process.env.ANTHROPIC_API_KEY

  // Build the SSE encoder
  const encoder = new TextEncoder()

  if (!apiKey) {
    // Mock streaming response
    const mockAnswer = generateMockResponse(query, retrievedDocs)
    const stream = new ReadableStream({
      async start(controller) {
        // Send sources first
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "sources", sources })}\n\n`)
        )
        // Stream mock text character by character
        for (let i = 0; i < mockAnswer.length; i++) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: "delta", text: mockAnswer[i] })}\n\n`)
          )
          // Small delay to simulate streaming - batch every 3 chars
          if (i % 3 === 0) {
            await new Promise((r) => setTimeout(r, 15))
          }
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  }

  // Real Claude API call with streaming
  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250514",
        max_tokens: 2048,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
        stream: true,
      }),
    })

    if (!apiRes.ok || !apiRes.body) {
      // Fallback to mock
      const mockAnswer = generateMockResponse(query, retrievedDocs)
      return new Response(
        JSON.stringify({ type: "full", content: mockAnswer, sources }),
        { headers: { "Content-Type": "application/json" } }
      )
    }

    // Transform Anthropic SSE into our format
    const reader = apiRes.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ""

    const stream = new ReadableStream({
      async start(controller) {
        // Send sources first
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "sources", sources })}\n\n`)
        )

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() || ""

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue
              const data = line.slice(6).trim()
              if (data === "[DONE]") continue

              try {
                const parsed = JSON.parse(data)
                if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "delta", text: parsed.delta.text })}\n\n`
                    )
                  )
                }
              } catch {
                // skip unparseable lines
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err)
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    const mockAnswer = generateMockResponse(query, retrievedDocs)
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "sources", sources })}\n\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "delta", text: mockAnswer })}\n\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`))
        controller.close()
      },
    })
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    })
  }
}

function generateMockResponse(
  query: string,
  docs: ReturnType<typeof retrieveDocuments>
): string {
  const q = query.toLowerCase()

  if (q.includes("route 202") || q.includes("penndot")) {
    return `Here's the current status of the Route 202 PennDOT job [Source: job-route-202-penndot.md]:

**Project:** US-202 Resurfacing (Swedesford Rd to Route 30, King of Prussia)
**Contract Value:** $485,000 | **Contract #:** PD-2026-4417

**Current Status:** Milling is in progress and on schedule — approximately 60% complete as of Tuesday.

- **Milling phase** (Mon–Wed this week): Crew Bravo with Wirtgen W 210 Fi (#M-01). On track to complete Wednesday.
- **Tack coat:** Scheduled for Wednesday PM after milling wraps.
- **Paving phase** (Thu–next Wed, 5 days): Crew Alpha with CAT AP1055F (#P-01). 8,500 tons of 9.5mm Superpave ordered from Allan Myers Devault.

**Key Notes:**
- Night work required (7 PM – 5 AM). No lane closures during 6–9 AM and 3–7 PM per PennDOT TCP.
- PennDOT inspector Gary Walsh is on-site daily; all density tests are passing.
- This is a prevailing-wage project — liquidated damages of $1,500/day if we exceed 15 working days.
- Estimated profit margin: 18.2%.`
  }

  if (q.includes("asphalt") && (q.includes("yard") || q.includes("inventory"))) {
    return `Here's our current yard inventory for asphalt and related materials [Source: yard-inventory.md]:

**Hot Mix Asphalt (HMA) On Hand: 615 tons total**

| Mix Type | On-Hand | On Order | Delivery |
|---|---|---|---|
| 9.5mm Superpave (PG 64-22) | 340 tons | 2,200 tons | May 16 (Fri) |
| 19mm Superpave Base | 180 tons | 800 tons | May 19 (Mon) |
| 25mm Superpave Base | 95 tons | — | — |

**Important:** Route 202 paving starts Thursday — we need minimum 1,500 tons of 9.5mm by Wednesday PM. Allan Myers has confirmed delivery of 2,200 tons Thursday–Friday from the Devault plant.

**Other Materials:**
- Tack coat (CSS-1h): 3,200 gal — adequate for ~2 weeks
- Sealcoat: 18 drums (4,950 gal) — enough for Phoenixville + 1 more job
- Screenings are **approaching reorder point** (110 tons on hand, reorder at 100)
- Diesel: ~1,200 gal of 2,000 gal capacity, next fill Tuesday May 20`
  }

  if (q.includes("crew bravo") || (q.includes("foreman") && q.includes("bravo"))) {
    return `**Crew Bravo** is our milling crew [Source: crew-roster.md]:

**Foreman:** Carlos Reyes | Cell: (610) 555-0102 | OSHA 30, CDL-A

**Crew Members:**
| Name | Role | Certifications |
|---|---|---|
| Marco Silva | Mill Operator | OSHA 10, Wirtgen Certified |
| Jeff Brown | Dump Truck Driver | OSHA 10, CDL-A |
| Rick Santos | Dump Truck Driver | OSHA 10, CDL-A |
| Al Cooper | Broom/Sweep Operator | OSHA 10 |
| Tom Nguyen | Broom/Sweep Operator | OSHA 10 |

**This Week's Schedule:**
- Mon–Wed: Route 202 milling (PennDOT) — currently in progress, 60% complete [Source: job-route-202-penndot.md]

**Next Week:**
- Mon–Wed: Villanova University Parking Lots A & B milling [Source: job-villanova-parking.md]`
  }

  if (q.includes("safety") && (q.includes("incident") || q.includes("last week"))) {
    return `Here's a summary of last week's safety report (week ending May 10) [Source: safety-incidents-weekly.md]:

**Overview:** 3 total incidents — 0 recordable injuries, 2 near misses, 1 property damage. **47 days since last recordable.**

**Incidents:**

1. **Near Miss — Backing Dump Truck (May 6)** at the yard. Tri-axle #T-03 came within 2 ft of a laborer crossing behind the truck — spotter wasn't in position.
   - *Corrective action:* Mandatory "clear to back" call-and-response procedure implemented for all yard backing movements.

2. **Property Damage — Mirror Strike (May 8)** on Greenfield Ave, Lower Merion. Sweeper #SW-01 clipped a resident's mailbox (~$150, DVP replacing).
   - *Corrective action:* Spotter now required for sweeper movements on residential streets <28 ft wide.

3. **Near Miss — Hot Tack Splash (May 9)** on Route 30. Small tack emulsion splash on Brian Foster's forearm during hose disconnect. No injury — emulsion had cooled below 140°F.
   - *Corrective action:* Heat-resistant gloves mandatory for ALL tack truck connect/disconnect, added to daily tailgate briefing.

**Positive trend:** Near-miss reporting is up 55% year-over-year, which shows our safety culture is improving. TRIR is at 1.2, down from 2.1 last year.

**Upcoming:** Quarterly safety stand-down on May 14 — topic is heat illness prevention.`
  }

  if (q.includes("prevailing wage") || (q.includes("wage") && q.includes("laborer"))) {
    return `Here are the current PA prevailing wage rates for Chester County [Source: prevailing-wage-pa-2026.md]:

**Laborers (Laborers' District Council of Eastern PA):**
| Classification | Base Rate | Fringe | Total Package |
|---|---|---|---|
| General Laborer | $34.25/hr | $22.10/hr | **$56.35/hr** |
| Flagger/Traffic Control | $30.50/hr | $22.10/hr | **$52.60/hr** |
| Luteman/Rakerman | $34.25/hr | $22.10/hr | **$56.35/hr** |

**Operating Engineers (IUOE Local 542):**
| Classification | Base Rate | Fringe | Total Package |
|---|---|---|---|
| Paver Operator | $45.80/hr | $28.65/hr | **$74.45/hr** |
| Roller Operator | $43.50/hr | $28.65/hr | **$72.15/hr** |
| Milling Machine Operator | $46.20/hr | $28.65/hr | **$74.85/hr** |

These rates apply to all publicly funded projects exceeding $25,000 in Chester, Delaware, and Montgomery counties. Overtime: time-and-a-half after 8 hrs/day and on Saturdays; double time on Sundays and holidays.

Foremen receive the highest-classified worker's base rate plus a $2.00/hr premium.`
  }

  if (q.includes("follow-up") || q.includes("follow up") || q.includes("liberty") || q.includes("email")) {
    return `Here's a draft follow-up email for Liberty Property Trust [Source: job-valley-forge-corporate.md]:

---

**Subject:** Valley Forge Corporate Park — Resurfacing Start Date Confirmation

Hi Sarah,

I hope you're doing well. I wanted to follow up on our Valley Forge Corporate Park resurfacing project (Swedesford Rd location).

We're targeting a start date during the week of June 2nd, weather permitting. Our scope remains as discussed:

- **1.5" Superpave overlay** across the 42,000 sq ft parking area
- **Full re-striping** of 140 parking stalls, fire lanes, and directional markings
- **Duration:** 3 working days, M–F, standard business hours

To keep us on track, could you confirm:
1. The signed purchase order — our accounting team will need this before we mobilize
2. Any tenant coordination requirements or preferred lot closure sequencing

We'll also want to schedule a brief pre-construction walk with your facilities team about a week before we start.

On a separate note — you'd mentioned interest in the Level 1 parking garage resurfacing during our last site visit. I'd be happy to put together a preliminary scope and budget for that whenever you're ready. Just say the word.

Looking forward to working together again. Please don't hesitate to reach out if you have any questions.

Best regards,
*[Your Name]*
Delaware Valley Paving
(610) 555-0100

---

*Note: Sarah prefers written communication over calls and is the primary decision-maker. Liberty Property Trust is a repeat customer — they pay on time at Net 30.* [Source: job-valley-forge-corporate.md]`
  }

  // Out-of-scope check
  if (q.includes("poem") || q.includes("joke") || q.includes("recipe") || q.includes("code") || q.includes("python") || q.includes("javascript")) {
    return "I'm here to help with DVP operations and work-related questions. Is there something about our jobs, crews, equipment, or policies I can help with?"
  }

  // Generic response using retrieved docs
  if (docs.length > 0) {
    const sourceRefs = docs.map((d) => `[Source: ${d.filename}]`).join(", ")
    return `Based on our internal records (${sourceRefs}), here's what I found:\n\n${docs
      .map((d) => `**From ${d.filename}:**\n${d.excerpt}...`)
      .join("\n\n")}\n\nWould you like me to dig deeper into any of these areas?`
  }

  return "I don't have specific information on that in our knowledge base right now. Could you try rephrasing your question? I can help with job statuses, crew schedules, equipment, safety procedures, vendor information, or company policies."
}
