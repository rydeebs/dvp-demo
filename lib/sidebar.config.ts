export interface SidebarItem {
  label: string
  href: string
  tag?: string
}

export interface SidebarWorkgroup {
  id: string
  name: string
  items: SidebarItem[]
}

export const sidebarConfig: SidebarWorkgroup[] = [
  {
    id: "field-ops",
    name: "Field Ops",
    items: [
      { label: "Crew Scheduler", href: "/field-ops/crews", tag: "Ops" },
      { label: "Equipment Scheduler", href: "/field-ops/equipment", tag: "Ops" },
      { label: "Job Site Scheduler", href: "/field-ops/jobs", tag: "Auto" },
    ],
  },
  {
    id: "knowledge",
    name: "Knowledge",
    items: [
      { label: "Ask DVP", href: "/askdvp", tag: "Auto" },
      { label: "Knowledge Sources", href: "/askdvp/sources", tag: "Native" },
    ],
  },
]
