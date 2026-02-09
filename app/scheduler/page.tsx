import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { demoData } from "@/lib/data"
import { Cloud, CloudRain, Sun, AlertTriangle } from "lucide-react"

export default function SchedulerPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weather & Crew Scheduler</h1>
        <p className="text-muted-foreground">Auto-reschedule jobs based on weather and notify all stakeholders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduling Rules</CardTitle>
          <CardDescription>Automatic weather-based rescheduling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CloudRain className="w-8 h-8 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold">Rain Forecast</h3>
                <p className="text-sm text-muted-foreground">Auto-delay if rain chance &gt; 40%</p>
              </div>
              <Badge variant="destructive">DELAY</Badge>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8 text-gray-600" />
              <div className="flex-1">
                <h3 className="font-semibold">Temperature</h3>
                <p className="text-sm text-muted-foreground">Delay paving if temp &lt; 45°F</p>
              </div>
              <Badge variant="destructive">DELAY</Badge>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Sun className="w-8 h-8 text-yellow-600" />
              <div className="flex-1">
                <h3 className="font-semibold">Clear Conditions</h3>
                <p className="text-sm text-muted-foreground">Proceed with scheduled work</p>
              </div>
              <Badge variant="secondary">PROCEED</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">This Week's Schedule</h2>
        
        {demoData.schedule.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{job.projectName}</CardTitle>
                  <CardDescription>{job.client} • {job.squareFeet} sq ft</CardDescription>
                </div>
                {job.status === "delayed" ? (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    DELAYED
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Sun className="w-3 h-3" />
                    CONFIRMED
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Scheduled Date</p>
                  <p className="font-semibold">{job.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Weather Forecast</p>
                  <p className="font-semibold">{job.weatherForecast}</p>
                  <p className="text-xs text-muted-foreground">Rain: {job.rainChance}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Crew Assigned</p>
                  <p className="font-semibold">{job.crew}</p>
                </div>
              </div>

              {job.status === "delayed" && job.rescheduledTo && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800">Auto-Rescheduled</h3>
                      <p className="text-sm text-red-700 mt-1">
                        Rain forecast &gt; 80%. Job rescheduled to {job.rescheduledTo}
                      </p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-red-700">✓ Customer notified via email + SMS</p>
                        <p className="text-red-700">✓ Crew calendar updated</p>
                        <p className="text-red-700">✓ HubSpot deal timeline adjusted</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Actions on Weather Delay</CardTitle>
          <CardDescription>What happens when a job is rescheduled</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">1</div>
            <div>
              <h3 className="font-semibold">Monitor Weather</h3>
              <p className="text-sm text-muted-foreground">Check forecast 48 hours before scheduled date</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">2</div>
            <div>
              <h3 className="font-semibold">Auto-Reschedule</h3>
              <p className="text-sm text-muted-foreground">Find next available clear day for crew</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">3</div>
            <div>
              <h3 className="font-semibold">Notify Customer</h3>
              <p className="text-sm text-muted-foreground">Send email + SMS with new date and reason</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">4</div>
            <div>
              <h3 className="font-semibold">Update Systems</h3>
              <p className="text-sm text-muted-foreground">Adjust crew calendar, HubSpot timeline, material delivery</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
