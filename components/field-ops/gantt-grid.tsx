"use client"

import { useCallback, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { addDays, diffDays, shortDay, shortDate } from "@/lib/field-ops/utils"

export interface GanttRow {
  id: string
  label: string
  subtitle?: string
  utilization?: number
}

export interface GanttChip {
  id: string
  rowId: string
  startDate: string
  duration: number
  label: string
  colorClass: string
  isConflict?: boolean
  isMaintenance?: boolean
}

interface GanttGridProps {
  rows: GanttRow[]
  chips: GanttChip[]
  startDate: string
  numDays: number
  onChipClick?: (chipId: string) => void
  onChipMove?: (chipId: string, newRowId: string, newStartDate: string) => void
}

const CELL_W = 48
const ROW_H = 56
const HEADER_H = 48
const LABEL_W = 208

export function GanttGrid({ rows, chips, startDate, numDays, onChipClick, onChipMove }: GanttGridProps) {
  const [dragId, setDragId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const days = Array.from({ length: numDays }, (_, i) => addDays(startDate, i))

  const handleDragStart = useCallback((e: React.DragEvent, chipId: string) => {
    setDragId(chipId)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", chipId)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, rowId: string, date: string) => {
    e.preventDefault()
    const chipId = e.dataTransfer.getData("text/plain")
    if (chipId && onChipMove) {
      onChipMove(chipId, rowId, date)
    }
    setDragId(null)
  }, [onChipMove])

  const getChipsForRow = (rowId: string) =>
    chips.filter((c) => c.rowId === rowId)

  return (
    <div className="flex h-full border rounded-lg bg-card overflow-hidden">
      {/* Row labels - fixed left */}
      <div className="flex-shrink-0 border-r bg-card z-10" style={{ width: LABEL_W }}>
        {/* Header spacer */}
        <div className="border-b px-3 flex items-center" style={{ height: HEADER_H }}>
          <span className="text-xs font-semibold text-muted-foreground uppercase">Resource</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.id}
            className="border-b px-3 flex items-center gap-3"
            style={{ height: ROW_H }}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{row.label}</div>
              {row.subtitle && (
                <div className="text-xs text-muted-foreground truncate">{row.subtitle}</div>
              )}
            </div>
            {row.utilization !== undefined && (
              <div className="flex-shrink-0 w-12">
                <div className="text-xs text-right text-muted-foreground mb-0.5">{row.utilization}%</div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      row.utilization > 85 ? "bg-red-500" :
                      row.utilization > 60 ? "bg-amber-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${Math.min(row.utilization, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scrollable timeline */}
      <div className="flex-1 overflow-x-auto" ref={scrollRef}>
        <div style={{ minWidth: numDays * CELL_W }}>
          {/* Day headers */}
          <div className="flex border-b" style={{ height: HEADER_H }}>
            {days.map((day) => {
              const d = new Date(day + "T00:00:00")
              const dow = d.getDay()
              const isWeekend = dow === 0 || dow === 6
              const isMonday = dow === 1
              return (
                <div
                  key={day}
                  className={cn(
                    "flex-shrink-0 flex flex-col items-center justify-center text-xs border-r",
                    isWeekend ? "bg-muted/50 text-muted-foreground" : "",
                    isMonday ? "border-l-2 border-l-border" : ""
                  )}
                  style={{ width: CELL_W }}
                >
                  <span className="font-medium">{shortDay(day)}</span>
                  <span className="text-muted-foreground">{d.getDate()}</span>
                </div>
              )
            })}
          </div>

          {/* Data rows */}
          {rows.map((row) => {
            const rowChips = getChipsForRow(row.id)
            return (
              <div key={row.id} className="relative border-b" style={{ height: ROW_H }}>
                {/* Day cells (drop targets) */}
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
                          isWeekend ? "bg-muted/30" : "",
                          isMonday ? "border-l-2 border-l-border" : "",
                          dragId ? "hover:bg-accent/30" : ""
                        )}
                        style={{ width: CELL_W }}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, row.id, day)}
                      />
                    )
                  })}
                </div>

                {/* Chips */}
                {rowChips.map((chip) => {
                  const offset = diffDays(startDate, chip.startDate)
                  if (offset + chip.duration < 0 || offset >= numDays) return null
                  const left = Math.max(0, offset) * CELL_W
                  const visibleStart = Math.max(0, offset)
                  const visibleEnd = Math.min(numDays, offset + chip.duration)
                  const width = (visibleEnd - visibleStart) * CELL_W - 4

                  if (chip.isMaintenance) {
                    return (
                      <div
                        key={chip.id}
                        className="absolute top-1 rounded flex items-center px-2 text-xs text-muted-foreground overflow-hidden"
                        style={{
                          left: left + 2,
                          width,
                          height: ROW_H - 8,
                          background: "repeating-linear-gradient(135deg, hsl(var(--muted)) 0px, hsl(var(--muted)) 4px, hsl(var(--muted-foreground) / 0.1) 4px, hsl(var(--muted-foreground) / 0.1) 8px)",
                        }}
                      >
                        {chip.label}
                      </div>
                    )
                  }

                  return (
                    <div
                      key={chip.id}
                      className={cn(
                        "absolute top-1 rounded flex items-center px-2 text-xs text-white font-medium cursor-pointer shadow-sm overflow-hidden transition-shadow hover:shadow-md",
                        chip.colorClass,
                        chip.isConflict && "ring-2 ring-red-500 ring-offset-1 ring-offset-background",
                        dragId === chip.id && "opacity-50"
                      )}
                      style={{
                        left: left + 2,
                        width,
                        height: ROW_H - 8,
                      }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, chip.id)}
                      onClick={() => onChipClick?.(chip.id)}
                    >
                      <span className="truncate">{chip.label}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
