import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { demoData } from "@/lib/data"
import { TrendingDown, TrendingUp } from "lucide-react"

export default function CompetitorPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Competitor Intelligence</h1>
        <p className="text-muted-foreground">Track competitor activity and pricing in your deals</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {demoData.competitors.map((competitor, idx) => (
          <Card key={idx}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{competitor.name}</CardTitle>
                <Badge variant={competitor.winRate.includes("75") ? "destructive" : "secondary"}>
                  {competitor.winRate} Win Rate
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Deals Against</p>
                  <p className="text-2xl font-bold">{competitor.dealsAgainst}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Wins</p>
                  <p className="text-2xl font-bold text-green-600">{competitor.wins}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  {competitor.avgPriceDiff.includes("-") ? (
                    <TrendingDown className="w-5 h-5 text-green-600" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-semibold">
                    {competitor.avgPriceDiff} avg price vs yours
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {competitor.avgPriceDiff.includes("-") 
                    ? "They typically bid lower" 
                    : "They typically bid higher"}
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Strengths</h3>
                <ul className="space-y-1">
                  {competitor.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Weaknesses</h3>
                <ul className="space-y-1">
                  {competitor.weaknesses.map((w, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How Competitor Tracking Works</CardTitle>
          <CardDescription>Auto-flags deals where competitors are involved</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="font-semibold">Monitor Public Bid Results</h3>
            <p className="text-sm text-muted-foreground">Track who won municipal and commercial contracts</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="font-semibold">Flag Deals in HubSpot</h3>
            <p className="text-sm text-muted-foreground">Add "Competitor Presence" property when detected</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="font-semibold">Analyze Patterns</h3>
            <p className="text-sm text-muted-foreground">Track win rates, pricing differences, strengths/weaknesses</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
