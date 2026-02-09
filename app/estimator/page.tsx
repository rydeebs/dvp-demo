import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function EstimatorPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bid Auto-Estimator</h1>
        <p className="text-muted-foreground">Generate preliminary cost estimates to speed up response time</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>How It Works</CardTitle>
            <Badge variant="secondary">ASSIST</Badge>
          </div>
          <CardDescription>Assistive tool - NOT final pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="font-semibold mb-1">Input Data</h3>
            <p className="text-sm text-muted-foreground">Project type, square footage, milling depth, overlay thickness</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="font-semibold mb-1">Cost Calculation</h3>
            <p className="text-sm text-muted-foreground">Material costs + labor + equipment + overhead + margin</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h3 className="font-semibold mb-1">Preliminary Estimate</h3>
            <p className="text-sm text-muted-foreground">Ballpark quote saved to HubSpot deal notes</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-yellow-800">⚠️ Important: This is a preliminary estimate only</p>
            <p className="text-sm text-yellow-700 mt-1">Final pricing requires site visit, soil testing, and detailed assessment by estimator.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Estimates Generated</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">Route 202 Resurfacing</h3>
                <p className="text-sm text-muted-foreground">145,000 sq ft • 2" mill + 2" overlay</p>
              </div>
              <Badge>$485,000</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Material: $215k • Labor: $145k • Equipment: $75k • OH+Margin: $50k
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">Valley Forge Corporate Park</h3>
                <p className="text-sm text-muted-foreground">42,000 sq ft • New construction</p>
              </div>
              <Badge>$125,000</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Material: $62k • Labor: $35k • Equipment: $18k • OH+Margin: $10k
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
