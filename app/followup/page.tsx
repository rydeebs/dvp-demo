import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { demoData } from "@/lib/data"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function FollowUpPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Follow-Up Automation</h1>
        <p className="text-muted-foreground">Track SLA compliance and auto-draft follow-up emails</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              12
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approaching SLA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              5
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              3
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Follow-Up Rules</CardTitle>
          <CardDescription>Automatic SLA tracking by deal stage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Quote Sent</h3>
                <p className="text-sm text-muted-foreground">Follow up 5 business days after sending quote</p>
              </div>
              <Badge>5 days</Badge>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Site Visit Completed</h3>
                <p className="text-sm text-muted-foreground">Send follow-up within 3 business days</p>
              </div>
              <Badge>3 days</Badge>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Negotiation</h3>
                <p className="text-sm text-muted-foreground">Check in every 7 business days</p>
              </div>
              <Badge>7 days</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deals Needing Follow-Up</CardTitle>
          <CardDescription>Synced from HubSpot</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoData.followUps.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{deal.dealName}</div>
                      <div className="text-sm text-muted-foreground">{deal.client}</div>
                    </div>
                  </TableCell>
                  <TableCell>{deal.stage}</TableCell>
                  <TableCell>{deal.daysSinceContact} days ago</TableCell>
                  <TableCell className="max-w-xs">{deal.nextAction}</TableCell>
                  <TableCell>
                    <Badge variant={
                      deal.slaStatus === "overdue" ? "destructive" :
                      deal.slaStatus === "approaching" ? "default" :
                      "secondary"
                    }>
                      {deal.slaStatus}
                    </Badge>
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
