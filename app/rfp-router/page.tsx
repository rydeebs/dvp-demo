import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { demoData } from "@/lib/data"
import { MapPin, Ruler, Clock, Users } from "lucide-react"

export default function RFPRouterPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">RFP Alert Router</h1>
        <p className="text-muted-foreground">Auto-score incoming RFPs and route to the right estimator</p>
      </div>

      {/* How Scoring Works */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Scoring Algorithm</CardTitle>
          <CardDescription>Each RFP gets scored 0-100 based on 4 factors</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Location Score (0-100)</h3>
            </div>
            <p className="text-sm text-muted-foreground">Distance from your service area. Closer = higher score.</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• 0-15 miles: 90-100</li>
              <li>• 15-30 miles: 70-89</li>
              <li>• 30-50 miles: 50-69</li>
              <li>• 50+ miles: 0-49</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Size Score (0-100)</h3>
            </div>
            <p className="text-sm text-muted-foreground">Project size fits your crew capacity. Sweet spot = higher score.</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• 50k-200k sq ft: 90-100</li>
              <li>• 25k-50k sq ft: 70-89</li>
              <li>• 10k-25k sq ft: 50-69</li>
              <li>• &lt;10k or &gt;200k: 0-49</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Timing Score (0-100)</h3>
            </div>
            <p className="text-sm text-muted-foreground">How well project timeline fits your schedule.</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• 4-8 weeks out: 90-100</li>
              <li>• 2-4 weeks out: 70-89</li>
              <li>• 8-12 weeks out: 50-69</li>
              <li>• Rush or far future: 0-49</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold">Relationship Score (0-100)</h3>
            </div>
            <p className="text-sm text-muted-foreground">Existing relationship with client.</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Repeat client: 90-100</li>
              <li>• Referral: 70-89</li>
              <li>• Previous quote: 50-69</li>
              <li>• New/cold: 0-49</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Recent RFPs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Auto-Routed RFPs</h2>
        {demoData.rfps.map((rfp) => (
          <Card key={rfp.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{rfp.title}</CardTitle>
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
    </div>
  )
}
