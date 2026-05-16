import { NextRequest, NextResponse } from "next/server"

const MOCK_SUGGESTIONS = [
  {
    id: "sug-1",
    action: "Move 'Main Line Health' milling from Crew Bravo to Crew Alpha (Week 3 Mon-Wed)",
    reasoning: "Crew Bravo is at 95% utilization weeks 2-3 while Crew Alpha drops to 40% after Villanova wraps. Re-balancing avoids burnout and keeps Alpha productive.",
    from: { jobId: "job-08", crewId: "crew-bravo" },
    to: { crewId: "crew-alpha" },
  },
  {
    id: "sug-2",
    action: "Delay 'Chester County Industrial' by 2 days to avoid Crew Bravo double-book",
    reasoning: "Crew Bravo is currently scheduled for Main Line Health and Chester County in overlapping windows. Pushing Chester County to Wednesday eliminates the conflict with no downstream impact.",
    from: { jobId: "job-10", crewId: "crew-bravo" },
    to: { crewId: "crew-bravo", startDate: "" },
  },
  {
    id: "sug-3",
    action: "Swap Crew Charlie onto 'Valley Forge' overlay — free up Crew Alpha for weather-risk buffer",
    reasoning: "Thursday/Friday of week 3 shows 60% rain probability. Crew Alpha's Route 202 overlay is weather-sensitive. Moving Valley Forge to Crew Charlie (lighter load) gives Alpha a built-in rain day buffer without delaying the PennDOT contract.",
    from: { jobId: "job-12", crewId: "crew-alpha" },
    to: { crewId: "crew-charlie" },
  },
  {
    id: "sug-4",
    action: "Pre-position roller #R-03 at Villanova after Lower Merion wraps (save 45-min deadhead)",
    reasoning: "R-03 finishes Lower Merion Thursday afternoon and Villanova paving starts Friday. Leaving R-03 on-site at Villanova overnight avoids a round-trip to the yard and gets rolling 45 minutes earlier.",
    from: { jobId: "job-02", crewId: "crew-charlie" },
    to: { crewId: "crew-charlie" },
  },
]

export async function POST(req: NextRequest) {
  const body = await req.json()
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    // Return mock suggestions when no API key configured
    // Adjust the date-based suggestion to use actual data
    const suggestions = MOCK_SUGGESTIONS.map((s) => {
      if (s.id === "sug-2" && body.jobs) {
        const job10 = body.jobs.find((j: { id: string; startDate: string }) => j.id === "job-10")
        if (job10) {
          return { ...s, to: { ...s.to, startDate: job10.startDate } }
        }
      }
      return s
    })
    return NextResponse.json({ suggestions, source: "mock" })
  }

  try {
    const prompt = `You are a construction scheduling optimizer for Delaware Valley Paving, a mid-size asphalt paving company in the Philadelphia suburbs.

Analyze the current schedule and suggest 3-5 specific crew/equipment re-balancing moves. Consider:
- Crew utilization balance (no crew over 90% while another is under 50%)
- Weather risk windows (delay weather-sensitive paving if rain >50%)
- Equipment conflicts and deadhead (transit) time between job sites
- Dependency chains (milling must complete before paving on same scope)
- Contract deadline priorities

Current schedule data:
${JSON.stringify(body, null, 2)}

Respond with ONLY a JSON array of objects with this shape:
[{
  "id": "sug-1",
  "action": "Short description of the move",
  "reasoning": "Why this improves the schedule",
  "from": { "jobId": "xxx", "crewId": "xxx" },
  "to": { "crewId": "xxx", "startDate": "YYYY-MM-DD" (optional) }
}]`

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error("Anthropic API error:", errText)
      return NextResponse.json({ suggestions: MOCK_SUGGESTIONS, source: "mock-fallback" })
    }

    const data = await res.json()
    const text = data.content?.[0]?.text || "[]"

    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return NextResponse.json({ suggestions: MOCK_SUGGESTIONS, source: "mock-fallback" })
    }

    const suggestions = JSON.parse(jsonMatch[0])
    return NextResponse.json({ suggestions, source: "ai" })
  } catch (error) {
    console.error("AI suggestion error:", error)
    return NextResponse.json({ suggestions: MOCK_SUGGESTIONS, source: "mock-fallback" })
  }
}
