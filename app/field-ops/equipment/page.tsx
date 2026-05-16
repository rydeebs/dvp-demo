"use client"

import { useMemo, useState } from "react"
import { useFieldOpsStore } from "@/lib/field-ops/store"
import { getMonday, equipmentUtilization } from "@/lib/field-ops/utils"
import { GanttGrid, GanttRow, GanttChip } from "@/components/field-ops/gantt-grid"
import { Drawer } from "@/components/field-ops/drawer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Wrench, Clock, User, Users } from "lucide-react"
import { Equipment } from "@/lib/field-ops/types"

const CATEGORY_COLORS: Record<string, string> = {
  paver: "bg-blue-500",
  roller: "bg-emerald-500",
  mill: "bg-amber-500",
  truck: "bg-slate-500",
  striping: "bg-purple-500",
  support: "bg-cyan-500",
}

const CATEGORY_LABELS: Record<string, string> = {
  paver: "Paving",
  roller: "Rollers",
  mill: "Milling",
  truck: "Hauling",
  striping: "Striping",
  support: "Support",
}

const NUM_DAYS = 28

export default function EquipmentSchedulerPage() {
  const { equipment, jobs, crews } = useFieldOpsStore()
  const [selectedEquipId, setSelectedEquipId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const weekStart = getMonday()

  const filteredEquipment = useMemo(() =>
    filter ? equipment.filter((e) => e.category === filter) : equipment,
    [equipment, filter]
  )

  const rows: GanttRow[] = useMemo(() =>
    filteredEquipment.map((e) => ({
      id: e.id,
      label: `${e.tag} ${e.name}`,
      subtitle: e.model,
      utilization: equipmentUtilization(jobs, e.id, weekStart, NUM_DAYS),
    })),
    [filteredEquipment, jobs, weekStart]
  )

  // Build chips: job assignments + maintenance windows
  const chips: GanttChip[] = useMemo(() => {
    const result: GanttChip[] = []

    // Job assignments → chips on each equipment row
    for (const job of jobs) {
      for (const eqId of job.equipmentIds) {
        if (!filteredEquipment.some((e) => e.id === eqId)) continue
        result.push({
          id: `${job.id}-${eqId}`,
          rowId: eqId,
          startDate: job.startDate,
          duration: job.duration,
          label: job.customer,
          colorClass: CATEGORY_COLORS[equipment.find((e) => e.id === eqId)?.category || "support"],
        })
      }
    }

    // Maintenance windows
    for (const eq of filteredEquipment) {
      for (const mw of eq.maintenanceWindows) {
        const start = mw.startDate
        const end = mw.endDate
        const durMs = new Date(end + "T00:00:00").getTime() - new Date(start + "T00:00:00").getTime()
        const dur = Math.max(1, Math.round(durMs / 86400000) + 1)
        result.push({
          id: `maint-${eq.id}-${start}`,
          rowId: eq.id,
          startDate: start,
          duration: dur,
          label: mw.reason,
          colorClass: "bg-muted",
          isMaintenance: true,
        })
      }
    }

    return result
  }, [jobs, filteredEquipment, equipment])

  const selectedEquip = equipment.find((e) => e.id === selectedEquipId)
  const selectedEquipJobs = selectedEquip
    ? jobs.filter((j) => j.equipmentIds.includes(selectedEquip.id))
    : []
  const selectedEquipCrew = selectedEquipJobs.length > 0
    ? crews.find((c) => c.id === selectedEquipJobs[0].crewId)
    : null

  const categories = Array.from(new Set(equipment.map((e) => e.category)))

  const handleChipClick = (chipId: string) => {
    // chipId might be "job-01-P-01" or "maint-R-03-2026-05-30"
    if (chipId.startsWith("maint-")) {
      const parts = chipId.replace("maint-", "").split("-")
      // Equipment ID is first part(s) before the date
      const eqId = parts.slice(0, parts.length - 3).join("-")
      setSelectedEquipId(eqId)
    } else {
      // Extract equipment ID: last segment after the job id
      const lastDash = chipId.lastIndexOf("-")
      const eqId = chipId.substring(chipId.indexOf("-", 4) + 1)
      // Try to find equipment matching the end of the chipId
      const match = equipment.find((e) => chipId.endsWith(e.id))
      if (match) setSelectedEquipId(match.id)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-muted-foreground">4-Week View</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={filter === null ? "default" : "ghost"}
            onClick={() => setFilter(null)}
            className="text-xs h-7"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={filter === cat ? "default" : "ghost"}
              onClick={() => setFilter(filter === cat ? null : cat)}
              className="text-xs h-7"
            >
              {CATEGORY_LABELS[cat] || cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Gantt */}
      <div className="flex-1 p-4 overflow-hidden">
        <GanttGrid
          rows={rows}
          chips={chips}
          startDate={weekStart}
          numDays={NUM_DAYS}
          onChipClick={handleChipClick}
        />
      </div>

      {/* Equipment detail drawer */}
      <Drawer
        open={!!selectedEquip}
        onClose={() => setSelectedEquipId(null)}
        title={selectedEquip ? `${selectedEquip.tag} ${selectedEquip.name}` : ""}
      >
        {selectedEquip && (
          <EquipmentDetail
            equip={selectedEquip}
            jobs={selectedEquipJobs}
            crew={selectedEquipCrew}
          />
        )}
      </Drawer>
    </div>
  )
}

function EquipmentDetail({
  equip,
  jobs,
  crew,
}: {
  equip: Equipment
  jobs: ReturnType<typeof useFieldOpsStore.getState>["jobs"]
  crew: ReturnType<typeof useFieldOpsStore.getState>["crews"][0] | null | undefined
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium">{equip.model}</p>
        <Badge variant="secondary" className="mt-1">{equip.category}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> Total Hours</div>
          <p className="text-sm font-medium">{equip.totalHours.toLocaleString()} hrs</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Wrench className="w-3 h-3" /> Last Service</div>
          <p className="text-sm">{equip.lastServiceDate}</p>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Next Service Due</div>
          <p className="text-sm">{equip.nextServiceDue}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><User className="w-3 h-3" /> Operator</div>
          <p className="text-sm">{equip.assignedOperator}</p>
        </div>
      </div>

      {crew && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
            <Users className="w-3 h-3" /> Attached Crew
          </h3>
          <p className="text-sm">{crew.name} — {crew.foreman}</p>
        </div>
      )}

      {equip.maintenanceWindows.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Maintenance</h3>
          {equip.maintenanceWindows.map((mw, i) => (
            <div key={i} className="bg-muted/50 rounded px-3 py-2 text-sm mb-1">
              <p className="font-medium">{mw.reason}</p>
              <p className="text-xs text-muted-foreground">{mw.startDate} — {mw.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {jobs.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Assigned Jobs</h3>
          <div className="space-y-1">
            {jobs.map((j) => (
              <div key={j.id} className="flex items-center justify-between text-xs bg-muted/50 rounded px-2 py-1.5">
                <span className="font-medium">{j.customer}</span>
                <span className="text-muted-foreground">{j.startDate} ({j.duration}d)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
