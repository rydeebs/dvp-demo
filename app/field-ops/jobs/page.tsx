"use client"

import { useMemo, useState } from "react"
import { useFieldOpsStore } from "@/lib/field-ops/store"
import { getMonday, addDays, diffDays, formatCurrency, crewUtilization, equipmentUtilization, shortDate } from "@/lib/field-ops/utils"
import { Drawer } from "@/components/field-ops/drawer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarDays, ChevronLeft, ChevronRight, DollarSign, Users, Wrench, CloudRain, MapPin, ArrowRight } from "lucide-react"

const CREW_COLORS: Record<string, string> = {
  "crew-alpha": "bg-blue-500",
  "crew-bravo": "bg-amber-500",
  "crew-charlie": "bg-emerald-500",
  "crew-delta": "bg-purple-500",
  "crew-echo": "bg-cyan-500",
  "crew-foxtrot": "bg-rose-500",
}

const CELL_W = 120
const ROW_H = 80

export default function JobSchedulerPage() {
  const { jobs, crews, equipment } = useFieldOpsStore()
  const [view, setView] = useState<"month" | "week">("month")
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  const baseMonday = getMonday()
  const viewStart = addDays(baseMonday, view === "week" ? weekOffset * 7 : 0)
  const numDays = view === "week" ? 7 : 42 // 6 weeks for month view

  const days = useMemo(() =>
    Array.from({ length: numDays }, (_, i) => addDays(viewStart, i)),
    [viewStart, numDays]
  )

  // Stats
  const totalBacklog = useMemo(() => jobs.reduce((sum, j) => sum + j.bidValue, 0), [jobs])
  const avgCrewUtil = useMemo(() => {
    const utils = crews.map((c) => crewUtilization(jobs, c.id, baseMonday, 28))
    return Math.round(utils.reduce((a, b) => a + b, 0) / (utils.length || 1))
  }, [crews, jobs, baseMonday])
  const avgEquipUtil = useMemo(() => {
    const utils = equipment.map((e) => equipmentUtilization(jobs, e.id, baseMonday, 28))
    return Math.round(utils.reduce((a, b) => a + b, 0) / (utils.length || 1))
  }, [equipment, jobs, baseMonday])
  const weatherRiskCount = useMemo(() => jobs.filter((j) => j.weatherRisk !== "none").length, [jobs])

  // Sort jobs by start date for row ordering
  const sortedJobs = useMemo(() => [...jobs].sort((a, b) => a.startDate.localeCompare(b.startDate)), [jobs])

  // Dependency lines
  const dependencies = useMemo(() => {
    return jobs
      .filter((j) => j.dependsOn)
      .map((j) => {
        const parent = jobs.find((p) => p.id === j.dependsOn)
        if (!parent) return null
        return { from: parent, to: j }
      })
      .filter(Boolean) as { from: typeof jobs[0]; to: typeof jobs[0] }[]
  }, [jobs])

  const selectedJob = jobs.find((j) => j.id === selectedJobId)
  const selectedCrew = selectedJob ? crews.find((c) => c.id === selectedJob.crewId) : null
  const selectedEquip = selectedJob ? equipment.filter((e) => selectedJob.equipmentIds.includes(e.id)) : []

  return (
    <div className="flex flex-col h-full">
      {/* Stats strip */}
      <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Backlog</p>
            <p className="text-sm font-semibold">{formatCurrency(totalBacklog)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Crew Utilization</p>
            <p className="text-sm font-semibold">{avgCrewUtil}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Equip Utilization</p>
            <p className="text-sm font-semibold">{avgEquipUtil}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CloudRain className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Weather-at-Risk</p>
            <p className={cn("text-sm font-semibold", weatherRiskCount > 0 && "text-amber-500")}>{weatherRiskCount} job{weatherRiskCount !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      {/* View toggle + navigation */}
      <div className="flex items-center justify-between px-6 py-2 border-b bg-card">
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={view === "month" ? "default" : "ghost"}
            onClick={() => { setView("month"); setWeekOffset(0) }}
            className="text-xs h-7"
          >
            <CalendarDays className="w-3 h-3 mr-1" />
            Month
          </Button>
          <Button
            size="sm"
            variant={view === "week" ? "default" : "ghost"}
            onClick={() => setView("week")}
            className="text-xs h-7"
          >
            Week
          </Button>
        </div>
        {view === "week" && (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setWeekOffset((o) => o - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-xs text-muted-foreground">
              {shortDate(viewStart)} — {shortDate(addDays(viewStart, 6))}
            </span>
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setWeekOffset((o) => o + 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex border rounded-lg bg-card overflow-hidden">
          {/* Fixed label column */}
          <div className="flex-shrink-0 border-r bg-card z-10" style={{ width: 200 }}>
            <div className="border-b px-3 flex items-center" style={{ height: 40 }}>
              <span className="text-xs font-semibold text-muted-foreground uppercase">Job</span>
            </div>
            {sortedJobs.map((job) => (
              <div
                key={job.id}
                className="border-b px-3 flex items-center cursor-pointer hover:bg-muted/50"
                style={{ height: ROW_H }}
                onClick={() => setSelectedJobId(job.id)}
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{job.customer}</div>
                  <div className="text-xs text-muted-foreground truncate">{job.scope}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className={cn("w-2 h-2 rounded-full", CREW_COLORS[job.crewId])} />
                    <span className="text-xs text-muted-foreground">{crews.find((c) => c.id === job.crewId)?.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scrollable timeline */}
          <div className="flex-1 overflow-x-auto relative">
            <div style={{ minWidth: numDays * CELL_W / (view === "month" ? 3 : 1) }}>
              {/* Day headers */}
              <div className="flex border-b" style={{ height: 40 }}>
                {days.map((day) => {
                  const d = new Date(day + "T00:00:00")
                  const dow = d.getDay()
                  const isWeekend = dow === 0 || dow === 6
                  const isMonday = dow === 1
                  const cellW = view === "month" ? CELL_W / 3 : CELL_W
                  return (
                    <div
                      key={day}
                      className={cn(
                        "flex-shrink-0 flex items-center justify-center text-xs border-r",
                        isWeekend && "bg-muted/50 text-muted-foreground",
                        isMonday && "border-l-2 border-l-border"
                      )}
                      style={{ width: cellW }}
                    >
                      {view === "week" ? (
                        <div className="text-center">
                          <div className="font-medium">{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                          <div className="text-muted-foreground">{d.getDate()}</div>
                        </div>
                      ) : (
                        <span>{d.getDate()}</span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Job rows */}
              {sortedJobs.map((job) => {
                const offset = diffDays(viewStart, job.startDate)
                const cellW = view === "month" ? CELL_W / 3 : CELL_W
                const left = Math.max(0, offset) * cellW
                const visibleStart = Math.max(0, offset)
                const visibleEnd = Math.min(numDays, offset + job.duration)
                const width = Math.max(0, (visibleEnd - visibleStart) * cellW - 4)
                const isVisible = visibleEnd > 0 && visibleStart < numDays

                return (
                  <div key={job.id} className="relative border-b" style={{ height: ROW_H }}>
                    {/* Background cells */}
                    <div className="absolute inset-0 flex">
                      {days.map((day) => {
                        const d = new Date(day + "T00:00:00")
                        const dow = d.getDay()
                        const isWeekend = dow === 0 || dow === 6
                        const isMonday = dow === 1
                        return (
                          <div
                            key={day}
                            className={cn(
                              "flex-shrink-0 border-r",
                              isWeekend && "bg-muted/30",
                              isMonday && "border-l-2 border-l-border"
                            )}
                            style={{ width: cellW }}
                          />
                        )
                      })}
                    </div>

                    {/* Job card */}
                    {isVisible && (
                      <div
                        className={cn(
                          "absolute top-2 rounded-md px-2 py-1 cursor-pointer shadow-sm hover:shadow-md transition-shadow border",
                          CREW_COLORS[job.crewId],
                          "text-white"
                        )}
                        style={{ left: left + 2, width, height: ROW_H - 16 }}
                        onClick={() => setSelectedJobId(job.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold truncate">{job.customer}</span>
                          {job.bidValue > 0 && (
                            <span className="text-xs ml-1 opacity-80">{formatCurrency(job.bidValue)}</span>
                          )}
                        </div>
                        <div className="text-xs opacity-80 truncate">{job.scope}</div>
                        {view === "week" && (
                          <div className="flex gap-1 mt-0.5 flex-wrap">
                            {job.equipmentIds.slice(0, 3).map((eId) => (
                              <span key={eId} className="text-[10px] bg-white/20 rounded px-1">{eId}</span>
                            ))}
                            {job.equipmentIds.length > 3 && (
                              <span className="text-[10px] opacity-70">+{job.equipmentIds.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Dependency connectors */}
            <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
              {dependencies.map(({ from, to }) => {
                const cellW = view === "month" ? CELL_W / 3 : CELL_W
                const fromIdx = sortedJobs.findIndex((j) => j.id === from.id)
                const toIdx = sortedJobs.findIndex((j) => j.id === to.id)
                if (fromIdx === -1 || toIdx === -1) return null

                const fromOffset = diffDays(viewStart, from.startDate)
                const fromX = (fromOffset + from.duration) * cellW
                const fromY = 40 + fromIdx * ROW_H + ROW_H / 2

                const toOffset = diffDays(viewStart, to.startDate)
                const toX = Math.max(0, toOffset) * cellW
                const toY = 40 + toIdx * ROW_H + ROW_H / 2

                if (fromX < 0 && toX < 0) return null

                const midX = (fromX + toX) / 2

                return (
                  <g key={`${from.id}-${to.id}`}>
                    <path
                      d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
                      fill="none"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={1.5}
                      strokeDasharray="4 2"
                      opacity={0.5}
                    />
                    <circle cx={toX} cy={toY} r={3} fill="hsl(var(--muted-foreground))" opacity={0.5} />
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Job detail drawer */}
      <Drawer
        open={!!selectedJob}
        onClose={() => setSelectedJobId(null)}
        title={selectedJob?.customer || ""}
      >
        {selectedJob && (
          <div className="space-y-5">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Scope</h3>
              <p className="text-sm">{selectedJob.scope}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="w-3 h-3" /> Location</div>
                <p className="text-sm">{selectedJob.location}</p>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Area</div>
                <p className="text-sm">{selectedJob.sqFt.toLocaleString()} sq ft</p>
              </div>
              {selectedJob.tons > 0 && (
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Tonnage</div>
                  <p className="text-sm">{selectedJob.tons.toLocaleString()} tons</p>
                </div>
              )}
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Bid Value</div>
                <p className="text-sm font-semibold">{formatCurrency(selectedJob.bidValue)}</p>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Duration</div>
                <p className="text-sm">{selectedJob.duration} days</p>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Status</div>
                <Badge variant={selectedJob.status === "in-progress" ? "default" : "secondary"}>{selectedJob.status}</Badge>
              </div>
            </div>

            {selectedJob.weatherRisk !== "none" && (
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                selectedJob.weatherRisk === "high" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
              )}>
                <CloudRain className="w-4 h-4" />
                Weather risk: {selectedJob.weatherRisk}
              </div>
            )}

            {selectedJob.dependsOn && (
              <div className="bg-muted/50 rounded-md px-3 py-2 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Depends on</p>
                  <p className="text-sm font-medium">{jobs.find((j) => j.id === selectedJob.dependsOn)?.customer} — {jobs.find((j) => j.id === selectedJob.dependsOn)?.scope}</p>
                </div>
              </div>
            )}

            {selectedCrew && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Assigned Crew</h3>
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", CREW_COLORS[selectedCrew.id])} />
                  <span className="text-sm font-medium">{selectedCrew.name}</span>
                  <span className="text-xs text-muted-foreground">({selectedCrew.type})</span>
                </div>
              </div>
            )}

            {selectedEquip.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Equipment</h3>
                <div className="space-y-1">
                  {selectedEquip.map((e) => (
                    <div key={e.id} className="flex items-center justify-between text-xs bg-muted/50 rounded px-2 py-1.5">
                      <span className="font-medium">{e.tag} {e.name}</span>
                      <span className="text-muted-foreground">{e.model}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  )
}
