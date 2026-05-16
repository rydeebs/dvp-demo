import { Job, Conflict } from "./types"

export function getMonday(date: Date = new Date()): string {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  return fmt(d)
}

export function fmt(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00")
  d.setDate(d.getDate() + days)
  return fmt(d)
}

export function diffDays(a: string, b: string): number {
  const da = new Date(a + "T00:00:00")
  const db = new Date(b + "T00:00:00")
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

export function daysBetween(start: string, numDays: number): string[] {
  const result: string[] = []
  for (let i = 0; i < numDays; i++) {
    result.push(addDays(start, i))
  }
  return result
}

export function rangesOverlap(
  aStart: string, aDur: number,
  bStart: string, bDur: number
): boolean {
  const aEnd = addDays(aStart, aDur - 1)
  const bEnd = addDays(bStart, bDur - 1)
  return aStart <= bEnd && bStart <= aEnd
}

export function detectConflicts(jobs: Job[]): Conflict[] {
  const conflicts: Conflict[] = []
  const byCrewMap: Record<string, Job[]> = {}
  for (const j of jobs) {
    if (!j.crewId) continue
    if (!byCrewMap[j.crewId]) byCrewMap[j.crewId] = []
    byCrewMap[j.crewId].push(j)
  }
  for (const crewId of Object.keys(byCrewMap)) {
    const crewJobs = byCrewMap[crewId]
    for (let i = 0; i < crewJobs.length; i++) {
      for (let k = i + 1; k < crewJobs.length; k++) {
        if (rangesOverlap(crewJobs[i].startDate, crewJobs[i].duration, crewJobs[k].startDate, crewJobs[k].duration)) {
          conflicts.push({ crewId, jobIds: [crewJobs[i].id, crewJobs[k].id] })
        }
      }
    }
  }
  return conflicts
}

export function crewUtilization(jobs: Job[], crewId: string, windowStart: string, windowDays: number): number {
  let busyDays = 0
  const crewJobs = jobs.filter((j) => j.crewId === crewId)
  for (let d = 0; d < windowDays; d++) {
    const day = addDays(windowStart, d)
    const dow = new Date(day + "T00:00:00").getDay()
    if (dow === 0 || dow === 6) continue // skip weekends
    for (const j of crewJobs) {
      const jEnd = addDays(j.startDate, j.duration - 1)
      if (day >= j.startDate && day <= jEnd) {
        busyDays++
        break
      }
    }
  }
  const weekdays = Array.from({ length: windowDays }, (_, i) => {
    const dow = new Date(addDays(windowStart, i) + "T00:00:00").getDay()
    return dow !== 0 && dow !== 6
  }).filter(Boolean).length
  return weekdays === 0 ? 0 : Math.round((busyDays / weekdays) * 100)
}

export function equipmentUtilization(jobs: Job[], equipId: string, windowStart: string, windowDays: number): number {
  let busyDays = 0
  const eqJobs = jobs.filter((j) => j.equipmentIds.includes(equipId))
  for (let d = 0; d < windowDays; d++) {
    const day = addDays(windowStart, d)
    const dow = new Date(day + "T00:00:00").getDay()
    if (dow === 0 || dow === 6) continue
    for (const j of eqJobs) {
      const jEnd = addDays(j.startDate, j.duration - 1)
      if (day >= j.startDate && day <= jEnd) {
        busyDays++
        break
      }
    }
  }
  const weekdays = Array.from({ length: windowDays }, (_, i) => {
    const dow = new Date(addDays(windowStart, i) + "T00:00:00").getDay()
    return dow !== 0 && dow !== 6
  }).filter(Boolean).length
  return weekdays === 0 ? 0 : Math.round((busyDays / weekdays) * 100)
}

export function formatCurrency(val: number): string {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`
  if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`
  return `$${val}`
}

export function shortDay(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { weekday: "short" })
}

export function shortDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
