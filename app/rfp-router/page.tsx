import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { demoData } from "@/lib/data"
import { MapPin, Ruler, Clock, Users, Play, Mail, FileText, Target, MessageSquare, Calendar, Bot, CheckCircle2, Building2, Landmark, HardHat, Globe } from "lucide-react"

export default function RFPRouterPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RFP Alert Router</h1>
          <p className="text-muted-foreground">Auto-score incoming RFPs and route to the right estimator</p>
        </div>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Run Now
        </Button>
      </div>

      {/* Recent RFPs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Auto-Routed RFPs</h2>
        {demoData.rfps.map((rfp) => (
          <Card key={rfp.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{rfp.name}</CardTitle>
                  <CardDescription>{rfp.client} • {rfp.estimatedValue}</CardDescription>
                </div>
                <Badge variant={rfp.priority === "high" ? "destructive" : rfp.priority === "medium" ? "default" : "secondary"} className="text-lg px-3 py-1">
                  {rfp.autoScore}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold">Location</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{rfp.locationScore}</div>
                  <div className="text-xs text-muted-foreground">{rfp.location}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Ruler className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold">Size</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{rfp.sizeScore}</div>
                  <div className="text-xs text-muted-foreground">{rfp.squareFeet}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold">Timing</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{rfp.timingScore}</div>
                  <div className="text-xs text-muted-foreground">Due {rfp.dueDate}</div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold">Relationship</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{rfp.relationshipScore}</div>
                  <div className="text-xs text-muted-foreground">Repeat client</div>
                </div>
              </div>

              <div className="border-t pt-4 grid gap-2 md:grid-cols-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Auto-Assigned:</span>
                  <span className="ml-2 font-semibold">{rfp.assignedTo}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">HubSpot Deal:</span>
                  <span className="ml-2 font-semibold">{rfp.hubspotDeal}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2 font-semibold">{rfp.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clawdbot Automation Section */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Powered by Clawdbot</CardTitle>
              <CardDescription>Automated RFP monitoring and intelligent routing</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Monitoring Sources */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-primary" />
              Monitors Email Inbox for RFP Notifications
            </h3>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <Landmark className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">BidNet Direct</p>
                  <p className="text-xs text-muted-foreground">Government bids</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <Building2 className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">PlanHub</p>
                  <p className="text-xs text-muted-foreground">Private sector</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <HardHat className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">ConstructConnect</p>
                  <p className="text-xs text-muted-foreground">Construction bids</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <Globe className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-medium text-sm">Municipal Sites</p>
                  <p className="text-xs text-muted-foreground">PA, NJ, DE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Extraction */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              Extracts Key Data
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">Project Location</Badge>
              <Badge variant="secondary" className="text-sm">Scope of Work</Badge>
              <Badge variant="secondary" className="text-sm">Bid Deadline</Badge>
              <Badge variant="secondary" className="text-sm">Budget Range</Badge>
              <Badge variant="secondary" className="text-sm">Contact Info</Badge>
              <Badge variant="secondary" className="text-sm">Requirements</Badge>
            </div>
          </div>

          {/* Auto-Scoring Criteria */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              Auto-Scores Opportunity Fit Based On
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Project Size vs Capacity</p>
                  <p className="text-xs text-muted-foreground">Matches project scope to your crew and equipment availability</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Distance from Equipment Yard</p>
                  <p className="text-xs text-muted-foreground">Calculates travel time and mobilization costs</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Seasonal Timing</p>
                  <p className="text-xs text-muted-foreground">Avoids winter paving bids, prioritizes optimal weather windows</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Bonding Requirements</p>
                  <p className="text-xs text-muted-foreground">Compares required bonding vs your prequalification limits</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-primary" />
              Automated Actions
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="flex items-center gap-3 p-4 rounded-lg border border-dashed">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Routes to Estimator</p>
                  <p className="text-sm text-muted-foreground">Via Slack notification or email alert</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-dashed">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Creates Calendar Block</p>
                  <p className="text-sm text-muted-foreground">Preliminary site visit scheduling</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
