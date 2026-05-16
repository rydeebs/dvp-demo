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
  // {
  //   id: "field-ops",
  //   name: "Field Ops",
  //   items: [
  //     { label: "Crews", href: "/field-ops/crews", tag: "Ops" },
  //   ],
  // },
]
