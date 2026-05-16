export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: RetrievedSource[]
  feedback?: "up" | "down" | null
  timestamp: number
}

export interface RetrievedSource {
  filename: string
  excerpt: string
}

export interface KnowledgeDoc {
  filename: string
  category: string
  title: string
  lastUpdated: string
  retrievalCount: number
}

export const SUGGESTED_PROMPTS = [
  "What's the status of the Route 202 PennDOT job?",
  "How much asphalt is in our yard right now?",
  "Who's the foreman of Crew Bravo and what's their schedule this week?",
  "Summarize last week's safety incidents.",
  "What's our standard prevailing wage rate for laborers in Chester County?",
  "Generate a customer follow-up email for Liberty Property Trust.",
]

export const KNOWLEDGE_DOCS: KnowledgeDoc[] = [
  { filename: "employee-handbook-excerpt.md", category: "HR / Policy", title: "Employee Handbook Excerpt", lastUpdated: "Jan 2026", retrievalCount: 34 },
  { filename: "safety-procedures.md", category: "Safety", title: "Safety Procedures Manual", lastUpdated: "Mar 2026", retrievalCount: 67 },
  { filename: "prevailing-wage-pa-2026.md", category: "Compliance", title: "PA Prevailing Wage Rates 2026", lastUpdated: "Jan 2026", retrievalCount: 52 },
  { filename: "vendor-list.md", category: "Procurement", title: "Approved Vendor List", lastUpdated: "Apr 2026", retrievalCount: 41 },
  { filename: "equipment-maintenance-schedule.md", category: "Equipment", title: "Equipment Maintenance Schedule", lastUpdated: "May 2026", retrievalCount: 89 },
  { filename: "job-route-202-penndot.md", category: "Active Job", title: "Route 202 PennDOT Resurfacing", lastUpdated: "May 2026", retrievalCount: 112 },
  { filename: "job-villanova-parking.md", category: "Active Job", title: "Villanova University Parking", lastUpdated: "May 2026", retrievalCount: 28 },
  { filename: "job-lower-merion-township.md", category: "Active Job", title: "Lower Merion Township Roads", lastUpdated: "May 2026", retrievalCount: 19 },
  { filename: "job-main-line-health.md", category: "Active Job", title: "Main Line Health Campus", lastUpdated: "May 2026", retrievalCount: 22 },
  { filename: "job-chester-county-industrial.md", category: "Active Job", title: "Chester County Industrial Park", lastUpdated: "May 2026", retrievalCount: 15 },
  { filename: "job-phoenixville-shopping.md", category: "Active Job", title: "Phoenixville Shopping Center", lastUpdated: "May 2026", retrievalCount: 8 },
  { filename: "job-valley-forge-corporate.md", category: "Active Job", title: "Valley Forge Corporate Park", lastUpdated: "May 2026", retrievalCount: 31 },
  { filename: "yard-inventory.md", category: "Operations", title: "Yard Inventory Report", lastUpdated: "May 14, 2026", retrievalCount: 76 },
  { filename: "safety-incidents-weekly.md", category: "Safety", title: "Weekly Safety Report", lastUpdated: "May 10, 2026", retrievalCount: 45 },
  { filename: "crew-roster.md", category: "Operations", title: "Crew Roster", lastUpdated: "May 2026", retrievalCount: 98 },
]
