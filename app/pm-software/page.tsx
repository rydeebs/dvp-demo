"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Star,
  Lightbulb,
  Calendar,
  DollarSign,
  Layers,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Vendor {
  name: string
  bestFor: string
  pavingFit: number
  pricing: string
  mobileUx: string
  accounting: string
  estimating: string
  apiQuality: string
  tag: "Top Pick" | "Runner-Up" | "Strong" | "Niche" | "Consider"
}

const vendors: Vendor[] = [
  {
    name: "HCSS HeavyJob / HeavyBid",
    bestFor: "Heavy-civil field tracking & bidding",
    pavingFit: 5,
    pricing: "$1,500–2,500/mo",
    mobileUx: "Purpose-built field app (Android/iOS). Foremen enter time, quantities, and daily diaries on-site.",
    accounting: "Exports to Sage 300 CRE, Vista, QuickBooks. JDE connector available.",
    estimating: "HeavyBid is the industry-standard estimating engine for DOT work. Direct bid-to-budget handoff.",
    apiQuality: "REST API + webhooks. Well-documented. Real-time job-cost push to external systems.",
    tag: "Top Pick",
  },
  {
    name: "B2W Software (Trimble)",
    bestFor: "Bid → dispatch → field tracking loop",
    pavingFit: 4,
    pricing: "$1,200–2,000/mo",
    mobileUx: "Solid field app. Dispatch board is standout — closest to our Crew Scheduler concept.",
    accounting: "Sage, Vista, Viewpoint integrations. CSV/API fallback for others.",
    estimating: "B2W Estimate is competent but less dominant than HeavyBid on DOT/prevailing-wage work.",
    apiQuality: "REST API, newer but improving. Trimble ecosystem connectivity (GPS, machine control).",
    tag: "Runner-Up",
  },
  {
    name: "Procore",
    bestFor: "General construction PM, document management",
    pavingFit: 2,
    pricing: "$2,000–5,000/mo",
    mobileUx: "Best-in-class mobile UX across construction. Excellent photo/doc management.",
    accounting: "Strong (Sage, QuickBooks, Xero, NetSuite). ERP connector marketplace.",
    estimating: "No native estimating — requires third-party (Procore + HeavyBid is common).",
    apiQuality: "Excellent REST API, webhooks, OAuth. Largest third-party app marketplace in construction.",
    tag: "Consider",
  },
  {
    name: "Sage Intacct Construction + Sage 300 CRE",
    bestFor: "Accounting, job costing, payroll compliance",
    pavingFit: 3,
    pricing: "$1,800–3,500/mo",
    mobileUx: "Sage Field Operations app is functional but dated. Payroll/time entry is strong.",
    accounting: "Native — this IS the accounting system. Gold standard for PA prevailing-wage payroll.",
    estimating: "Relies on HeavyBid or manual import for estimates. No native bid engine.",
    apiQuality: "Sage Intacct has a modern API. Sage 300 CRE is ODBC/SDK — older, more brittle.",
    tag: "Strong",
  },
  {
    name: "Foundation Software",
    bestFor: "Payroll-first shops, prevailing wage compliance",
    pavingFit: 3,
    pricing: "$800–1,500/mo",
    mobileUx: "Basic mobile time entry. No field dispatch or daily diary.",
    accounting: "Built-in construction accounting + payroll. Strong certified payroll reporting.",
    estimating: "Basic built-in estimating. Not competitive with HeavyBid for DOT work.",
    apiQuality: "Limited API. Import/export via CSV. Custom integrations require vendor engagement.",
    tag: "Niche",
  },
]

const TAG_STYLES: Record<string, string> = {
  "Top Pick": "bg-green-500/15 text-green-400 border-green-500/30",
  "Runner-Up": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Strong": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Consider": "bg-slate-500/15 text-slate-400 border-slate-500/30",
  "Niche": "bg-purple-500/15 text-purple-400 border-purple-500/30",
}

const timeline = [
  { phase: "Weeks 1–2", title: "Data Migration Plan", details: "Export existing job history, vendor records, equipment lists from current spreadsheets/QuickBooks. Map cost codes to HCSS structure. Set up chart of accounts." },
  { phase: "Weeks 3–4", title: "Pilot — One Active Job", details: "Run HCSS HeavyJob in parallel on one job (e.g., a Lower Merion-style township job). Foremen enter time in both old system and HeavyJob mobile. Validate costs match." },
  { phase: "Weeks 5–8", title: "Rollout to All Crews", details: "Train all 6 foremen on HeavyJob mobile (half-day each). Roll out daily diaries, quantity tracking, equipment hours. Cut over from paper timesheets." },
  { phase: "Weeks 9–12", title: "AI Layer Integrations", details: "Connect HCSS API to the DVP automation platform: HubSpot deal-won triggers project creation, Crew Scheduler pulls live assignments, Ask DVP retrieves job-cost data for answers." },
]

const costs = [
  { item: "HCSS HeavyJob + HeavyBid license (8 users, 6 field)", amount: "$24,000–30,000/yr", type: "Annual" },
  { item: "Implementation & data migration (HCSS professional services)", amount: "$15,000–25,000", type: "One-time" },
  { item: "Training — 6 foremen + 2 office (on-site, 2 days)", amount: "$5,000–8,000", type: "One-time" },
  { item: "Custom API integration development (DVP ↔ HCSS)", amount: "$10,000–15,000", type: "One-time" },
  { item: "Change management / parallel-run overhead (est. 80 hrs internal)", amount: "$8,000–12,000", type: "One-time" },
]

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

function FitDots({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "w-2.5 h-2.5 rounded-full",
            i < score
              ? score >= 4 ? "bg-green-500" : score >= 3 ? "bg-amber-500" : "bg-red-400"
              : "bg-muted"
          )}
        />
      ))}
    </div>
  )
}

export default function PMSoftwarePage() {
  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* ---- Header ---- */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Project Management — Buy, Don&apos;t Build</h1>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Project management, job costing, and field tracking are solved problems in heavy-civil
          construction. Five mature platforms already speak the language of paving — cost codes,
          prevailing-wage payroll, equipment hours, and DOT reporting. Building this in-house would
          burn 6–12 months of engineering on commodity features and saddle DVP with maintenance risk.
          The smarter play: license a proven PM platform and invest our custom-build budget in the AI
          tools competitors <em>can&apos;t</em> buy off the shelf — the Crew Scheduler, the Ask DVP
          knowledge assistant, and the estimating agents already in this demo.
        </p>
      </div>

      {/* ---- Comparison table ---- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vendor Comparison — 5 Finalists</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Vendor</TableHead>
                <TableHead className="min-w-[160px]">Best For</TableHead>
                <TableHead className="min-w-[100px]">Paving Fit</TableHead>
                <TableHead className="min-w-[130px]">Pricing</TableHead>
                <TableHead className="min-w-[220px]">Mobile / Field UX</TableHead>
                <TableHead className="min-w-[200px]">Accounting</TableHead>
                <TableHead className="min-w-[200px]">Estimating</TableHead>
                <TableHead className="min-w-[200px]">API Quality</TableHead>
                <TableHead className="min-w-[90px]">Verdict</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((v) => (
                <TableRow key={v.name} className={v.tag === "Top Pick" ? "bg-green-500/5" : ""}>
                  <TableCell className="font-medium text-sm">{v.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{v.bestFor}</TableCell>
                  <TableCell><FitDots score={v.pavingFit} /></TableCell>
                  <TableCell className="text-xs font-mono">{v.pricing}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{v.mobileUx}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{v.accounting}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{v.estimating}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{v.apiQuality}</TableCell>
                  <TableCell>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border font-medium", TAG_STYLES[v.tag])}>
                      {v.tag}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ---- Recommendation ---- */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-semibold">Primary Recommendation: HCSS HeavyJob + HeavyBid</h3>
                <p className="text-sm text-muted-foreground mt-1">Three reasons this is the right pick for DVP:</p>
              </div>
              <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                <li>
                  <strong className="text-foreground">Purpose-built for paving.</strong>{" "}
                  HCSS is the most-used platform among heavy-civil contractors in the Northeast.
                  It natively understands tonnage tracking, equipment hours, daily diaries, and DOT-
                  certified payroll — the exact workflows DVP runs every day.
                </li>
                <li>
                  <strong className="text-foreground">HeavyBid closes the loop on estimating.</strong>{" "}
                  Bids built in HeavyBid flow directly into HeavyJob as budgets. No re-keying, no
                  spreadsheet hand-off. This is the single biggest efficiency gain for the estimating
                  team.
                </li>
                <li>
                  <strong className="text-foreground">Clean API for the AI layer.</strong>{" "}
                  HCSS exposes REST endpoints and webhooks that let us pipe live job-cost data into
                  Ask DVP (<code>/askdvp</code>), trigger crew assignments in the Crew Scheduler
                  (<code>/field-ops/crews</code>), and feed actuals back to the Job Site view
                  (<code>/field-ops/jobs</code>).
                </li>
              </ol>

              <div className="border-t border-green-500/20 pt-3 mt-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Runner-up: B2W Software (Trimble)</strong> — if HCSS
                    licensing feels too heavy for DVP&apos;s current crew count, B2W offers a tighter
                    bid-to-dispatch loop at a lower price point. Its dispatch board maps closely to the
                    Crew Scheduler (<code>/field-ops/crews</code>) we&apos;ve already built, which would
                    simplify the integration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Why not Procore?</strong> Procore is the
                  best-known name in construction tech, but it&apos;s built for general contractors
                  doing vertical construction (buildings, interiors). Its cost-coding model doesn&apos;t
                  map cleanly to paving — no native tonnage, equipment-hour, or DOT payroll concepts.
                  DVP would end up buying Procore <em>plus</em> a heavy-civil bolt-on, paying more
                  for a worse fit.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---- Integration Map ---- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Integration Map — HCSS ↔ DVP Automation Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1: Sources */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Trigger / Source</h4>
              <IntegrationNode label="HubSpot CRM" sub="Deal won → project created" color="bg-blue-500/15 border-blue-500/30 text-blue-400" />
              <IntegrationNode label="HeavyBid Estimate" sub="Bid approved → budget loaded" color="bg-amber-500/15 border-amber-500/30 text-amber-400" />
              <IntegrationNode label="Field Crews (HeavyJob Mobile)" sub="Daily: time, quantities, diaries" color="bg-emerald-500/15 border-emerald-500/30 text-emerald-400" />
            </div>

            {/* Column 2: HCSS Hub */}
            <div className="flex flex-col items-center justify-center">
              <div className="hidden md:flex flex-col items-center gap-2 text-muted-foreground">
                <ArrowRight className="w-5 h-5 rotate-0" />
                <ArrowRight className="w-5 h-5 rotate-0" />
                <ArrowRight className="w-5 h-5 rotate-0" />
              </div>
              <div className="border-2 border-primary/40 bg-primary/5 rounded-xl px-6 py-5 text-center my-3 w-full">
                <p className="text-sm font-semibold text-primary">HCSS HeavyJob</p>
                <p className="text-xs text-muted-foreground mt-1">Central job-cost ledger</p>
                <p className="text-xs text-muted-foreground">REST API + Webhooks</p>
              </div>
              <div className="hidden md:flex flex-col items-center gap-2 text-muted-foreground">
                <ArrowRight className="w-5 h-5 rotate-0" />
                <ArrowRight className="w-5 h-5 rotate-0" />
                <ArrowRight className="w-5 h-5 rotate-0" />
              </div>
            </div>

            {/* Column 3: DVP Consumers */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">DVP Module (this demo)</h4>
              <IntegrationNode
                label="Crew Scheduler"
                sub="/field-ops/crews — live crew assignments sync"
                color="bg-blue-500/15 border-blue-500/30 text-blue-400"
              />
              <IntegrationNode
                label="Job Site Scheduler"
                sub="/field-ops/jobs — budget vs. actual overlay"
                color="bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              />
              <IntegrationNode
                label="Ask DVP"
                sub="/askdvp — real-time job-cost answers"
                color="bg-purple-500/15 border-purple-500/30 text-purple-400"
              />
              <IntegrationNode
                label="Equipment Scheduler"
                sub="/field-ops/equipment — hours sync, service alerts"
                color="bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              <strong>Data flow:</strong> When a HubSpot deal closes, a webhook creates the project
              in HCSS with the HeavyBid budget attached. Field crews log time and quantities via
              HeavyJob mobile. DVP&apos;s AI layer reads the HCSS API to power the Crew Scheduler,
              the Job Site Scheduler backlog/utilization stats, the Equipment Scheduler hour tracking,
              and the Ask DVP knowledge assistant for real-time &quot;what&apos;s the cost on Route 202?&quot;
              answers.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ---- Implementation Timeline ---- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            Implementation Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {timeline.map((phase, i) => (
              <div key={i} className="flex gap-4 relative">
                {/* Timeline gutter */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0",
                    i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border my-1" />}
                </div>
                {/* Content */}
                <div className="pb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">{phase.phase}</span>
                    <h4 className="text-sm font-semibold">{phase.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-lg">{phase.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ---- Cost Summary ---- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-muted-foreground" />
            Cost Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Line Item</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Estimated Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{c.item}</TableCell>
                  <TableCell>
                    <Badge variant={c.type === "Annual" ? "default" : "secondary"} className="text-xs">
                      {c.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">{c.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Year-1 total (license + implementation)</p>
              <p className="text-lg font-bold">$62,000 – $90,000</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Year-2+ annual (license only)</p>
              <p className="text-lg font-bold">$24,000 – $30,000/yr</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            For context, one misfiled prevailing-wage report can carry a $10K+ penalty, and a
            single under-estimated job can lose $50K–100K. The break-even on this investment is
            roughly one avoided miss of either kind.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

/* ---- Helper component ---- */

function IntegrationNode({ label, sub, color }: { label: string; sub: string; color: string }) {
  return (
    <div className={cn("rounded-lg border px-3 py-2.5", color)}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs opacity-80 mt-0.5">{sub}</p>
    </div>
  )
}
