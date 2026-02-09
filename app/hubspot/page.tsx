import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export default function HubSpotPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HubSpot Native Capabilities</h1>
        <p className="text-muted-foreground">Understanding what HubSpot does well vs. where automation adds value</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* What HubSpot Does Well */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle>HubSpot Strengths</CardTitle>
                <CardDescription>Core CRM capabilities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-2 border-green-500 pl-3 py-2">
              <h3 className="font-semibold">Contact & Company Management</h3>
              <p className="text-sm text-muted-foreground">System of record for all contacts, companies, relationships</p>
            </div>
            <div className="border-l-2 border-green-500 pl-3 py-2">
              <h3 className="font-semibold">Deal Pipeline Tracking</h3>
              <p className="text-sm text-muted-foreground">Visual pipeline, stages, deal values, forecasting</p>
            </div>
            <div className="border-l-2 border-green-500 pl-3 py-2">
              <h3 className="font-semibold">Email Tracking & Templates</h3>
              <p className="text-sm text-muted-foreground">Open tracking, click tracking, template library</p>
            </div>
            <div className="border-l-2 border-green-500 pl-3 py-2">
              <h3 className="font-semibold">Basic Workflows</h3>
              <p className="text-sm text-muted-foreground">Simple if/then automation, task creation, notifications</p>
            </div>
            <div className="border-l-2 border-green-500 pl-3 py-2">
              <h3 className="font-semibold">Reporting & Dashboards</h3>
              <p className="text-sm text-muted-foreground">Standard reports, custom dashboards, analytics</p>
            </div>
          </CardContent>
        </Card>

        {/* What HubSpot Struggles With */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <CardTitle>HubSpot Limitations</CardTitle>
                <CardDescription>Where automation adds value</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="border-l-2 border-red-500 pl-3 py-2">
              <h3 className="font-semibold">Context-Aware Logic</h3>
              <p className="text-sm text-muted-foreground">Can't auto-score RFPs based on location, size, timing, relationships</p>
            </div>
            <div className="border-l-2 border-red-500 pl-3 py-2">
              <h3 className="font-semibold">External Data Integration</h3>
              <p className="text-sm text-muted-foreground">Can't pull weather data, competitor pricing, permit filings</p>
            </div>
            <div className="border-l-2 border-red-500 pl-3 py-2">
              <h3 className="font-semibold">Cross-System Orchestration</h3>
              <p className="text-sm text-muted-foreground">Can't coordinate between email, calendar, SMS, crew schedules</p>
            </div>
            <div className="border-l-2 border-red-500 pl-3 py-2">
              <h3 className="font-semibold">Proactive Actions</h3>
              <p className="text-sm text-muted-foreground">Can't monitor for events and take action (weather delays, contract renewals)</p>
            </div>
            <div className="border-l-2 border-red-500 pl-3 py-2">
              <h3 className="font-semibold">Complex Calculations</h3>
              <p className="text-sm text-muted-foreground">Can't generate preliminary estimates based on project specs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Layer Value */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Layer: What We Add</CardTitle>
          <CardDescription>HubSpot remains the system of record. Automation multiplies what it can do.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <Badge className="mb-2">Auto</Badge>
              <h3 className="font-semibold mb-1">Smart Routing</h3>
              <p className="text-sm text-muted-foreground">RFPs auto-scored and routed to the right estimator based on location, size, expertise</p>
            </div>
            <div className="border rounded-lg p-4">
              <Badge className="mb-2">Auto</Badge>
              <h3 className="font-semibold mb-1">Data Enrichment</h3>
              <p className="text-sm text-muted-foreground">Auto-populate job type, property type, square footage from emails and documents</p>
            </div>
            <div className="border rounded-lg p-4">
              <Badge className="mb-2">Assist</Badge>
              <h3 className="font-semibold mb-1">Preliminary Estimates</h3>
              <p className="text-sm text-muted-foreground">Generate ballpark quotes to speed up initial response time</p>
            </div>
            <div className="border rounded-lg p-4">
              <Badge className="mb-2">Auto</Badge>
              <h3 className="font-semibold mb-1">Follow-Up Tracking</h3>
              <p className="text-sm text-muted-foreground">Monitor SLAs, auto-draft follow-up emails, escalate overdue deals</p>
            </div>
            <div className="border rounded-lg p-4">
              <Badge className="mb-2">Insight</Badge>
              <h3 className="font-semibold mb-1">Competitive Intelligence</h3>
              <p className="text-sm text-muted-foreground">Track competitor pricing, win rates, and flag deals where they're involved</p>
            </div>
            <div className="border rounded-lg p-4">
              <Badge className="mb-2">Ops</Badge>
              <h3 className="font-semibold mb-1">Weather Coordination</h3>
              <p className="text-sm text-muted-foreground">Auto-reschedule jobs based on weather, notify crews and customers</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
