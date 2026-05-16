"use client"

import { useMemo, useState } from "react"
import { useFieldOpsStore } from "@/lib/field-ops/store"
import { detectConflicts, getMonday } from "@/lib/field-ops/utils"
import { crewUtilization } from "@/lib/field-ops/utils"
import { GanttGrid, GanttRow, GanttChip } from "@/components/field-ops/gantt-grid"
import { Drawer } from "@/components/field-ops/drawer"
import { AiModal } from "@/components/field-ops/ai-modal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, AlertTriangle, MapPin, Ruler, CloudRain, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/field-ops/utils"

const CREW_COLORS: Record<string, string> = {
  "crew-alpha": "bg-blue-500",
  "crew-bravo": "bg-amber-500",
  "crew-charlie": "bg-emerald-500",
  "crew-delta": "bg-purple-500",
  "crew-echo": "bg-cyan-500",
  "crew-foxtrot": "bg-rose-500",
}

const NUM_DAYS = 28
const weekStart = getMonday()

export default function CrewSchedulerPage() {
  const { crews, jobs, equipment, moveJob } = useFieldOpsStore()
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [aiOpen, setAiOpen] = useState(false)

  const conflicts = useMemo(() => detectConflicts(jobs), [jobs])
  const conflictJobIds = useMemo(() => {
    const set = new Set<string>()
    conflicts.forEach((c) => { set.add(c.jobIds[0]); set.add(c.jobIds[1]) })
    return set
  }, [conflicts])

  const rows: GanttRow[] = useMemo(() =>
    crews.map((c) => ({
      id: c.id,
      label: c.name,
      subtitle: `${c.type} — ${c.foreman}`,
      utilization: crewUtilization(jobs, c.id, weekStart, NUM_DAYS),
    })),
    [crews, jobs]
  )

  const chips: GanttChip[] = useMemo(() =>
    jobs.map((j) => ({
      id: j.id,
      rowId: j.crewId,
      startDate: j.startDate,
      duration: j.duration,
      label: j.customer,
      colorClass: CREW_COLORS[j.crewId] || "bg-gray-500",
      isConflict: conflictJobIds.has(j.id),
    })),
    [jobs, conflictJobIds]
  )

  const selectedJob = jobs.find((j) => j.id === selectedJobId)
  const selectedCrew = selectedJob ? crews.find((c) => c.id === selectedJob.crewId) : null
  const selectedEquip = selectedJob ? equipment.filter((e) => selectedJob.equipmentIds.includes(e.id)) : []
  const dependencyJob = selectedJob?.dependsOn ? jobs.find((j) => j.id === selectedJob.dependsOn) : null

  const handleChipMove = (chipId: string, newRowId: string, newStartDate: string) => {
    moveJob(chipId, newRowId, newStartDate)
  }

  const handleAiAccept = (suggestion: { from: { jobId: string }; to: { crewId: string; startDate?: string } }) => {
    moveJob(suggestion.from.jobId, suggestion.to.crewId, suggestion.to.startDate)
  }

  const aiPayload = useMemo(() => ({
    crews: crews.map((c) => ({ id: c.id, name: c.name, type: c.type })),
    jobs: jobs.map((j) => ({
      id: j.id, customer: j.customer, scope: j.scope, startDate: j.startDate,
      duration: j.duration, crewId: j.crewId, weatherRisk: j.weatherRisk, dependsOn: j.dependsOn,
    })),
    conflicts,
  }), [crews, jobs, conflicts])

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">4-Week View</h2>
          {conflicts.length > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="w-3 h-3" />
              {conflicts.length} Conflict{conflicts.length > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        <Button size="sm" onClick={() => setAiOpen(true)} className="gap-2">
          <Sparkles className="w-4 h-4" />
          AI Suggestion
        </Button>
      </div>

      {/* Gantt */}
      <div className="flex-1 p-4 overflow-hidden">
        <GanttGrid
          rows={rows}
          chips={chips}
          startDate={weekStart}
          numDays={NUM_DAYS}
          onChipClick={setSelectedJobId}
          onChipMove={handleChipMove}
        />
      </div>

      {/* Job detail drawer */}
      <Drawer
        open={!!selectedJob}
        onClose={() => setSelectedJobId(null)}
        title={selectedJob?.customer || ""}
      >
        {selectedJob && (
          <div className="space-y-5">
            {/* Scope */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Scope</h3>
              <p className="text-sm">{selectedJob.scope}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="w-3 h-3" /> Location</div>
                <p className="text-sm">{selectedJob.location}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Ruler className="w-3 h-3" /> Area</div>
                <p className="text-sm">{selectedJob.sqFt.toLocaleString()} sq ft</p>
              </div>
              {selectedJob.tons > 0 && (
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Tonnage</div>
                  <p className="text-sm">{selectedJob.tons.toLocaleString()} tons</p>
                </div>
              )}
              {selectedJob.bidValue > 0 && (
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Bid Value</div>
                  <p className="text-sm font-semibold">{formatCurrency(selectedJob.bidValue)}</p>
                </div>
              )}
            </div>

            {/* Weather risk */}
            {selectedJob.weatherRisk !== "none" && (
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                selectedJob.weatherRisk === "high" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
              )}>
                <CloudRain className="w-4 h-4" />
                Weather risk: {selectedJob.weatherRisk}
              </div>
            )}

            {/* Dependency */}
            {dependencyJob && (
              <div className="bg-muted/50 rounded-md px-3 py-2">
                <p className="text-xs text-muted-foreground">Depends on</p>
                <p className="text-sm font-medium">{dependencyJob.customer} — {dependencyJob.scope}</p>
              </div>
            )}

            {/* Crew */}
            {selectedCrew && (
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
                  <Users className="w-3 h-3" /> Crew
                </h3>
                <p className="text-sm font-medium mb-1">{selectedCrew.name} ({selectedCrew.type})</p>
                <div className="space-y-1">
                  {selectedCrew.members.map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span>{m.name}</span>
                      <span className="text-muted-foreground">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment */}
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

      {/* AI Modal */}
      <AiModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onAccept={handleAiAccept}
        currentWeekPayload={aiPayload}
      />
    </div>
  )
}
