import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { demoData } from "@/lib/data"
import { CheckCircle2, Clock } from "lucide-react"

export default function EnrichmentPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Enrichment</h1>
        <p className="text-muted-foreground">Auto-populate contact and deal data from emails, PDFs, and conversations</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contacts Enriched
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data Completeness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.dataCompleteness}</div>
            <p className="text-xs text-green-600">↑ +33% from 61%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Time Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.timeSaved}</div>
            <p className="text-xs text-muted-foreground">Manual data entry eliminated</p>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Data Enrichment Works</CardTitle>
          <CardDescription>Automated extraction from multiple sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">1</div>
            <div>
              <h3 className="font-semibold">Email Parsing</h3>
              <p className="text-sm text-muted-foreground">Extract project details from RFP emails (location, size, type, timeline)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">2</div>
            <div>
              <h3 className="font-semibold">Document Analysis</h3>
              <p className="text-sm text-muted-foreground">Read PDFs and attachments for square footage, specs, requirements</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">3</div>
            <div>
              <h3 className="font-semibold">HubSpot Sync</h3>
              <p className="text-sm text-muted-foreground">Auto-populate custom properties (Job Type, Estimated Value, Property Type, Square Footage)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">4</div>
            <div>
              <h3 className="font-semibold">Human Review</h3>
              <p className="text-sm text-muted-foreground">Team can verify and adjust auto-populated data if needed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Enrichments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recently Enriched Contacts</CardTitle>
              <CardDescription>Auto-populated from incoming emails</CardDescription>
            </div>
            <Badge variant="secondary">AUTO</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Sq Ft</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoData.contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.company}</div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.jobType}</TableCell>
                  <TableCell>{contact.estimatedValue}</TableCell>
                  <TableCell>{contact.propertyType}</TableCell>
                  <TableCell>{contact.squareFeet}</TableCell>
                  <TableCell>
                    {contact.dataComplete ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Complete</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Pending</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
