"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Crew Scheduler", href: "/field-ops/crews" },
  { label: "Equipment Scheduler", href: "/field-ops/equipment" },
  { label: "Job Site Scheduler", href: "/field-ops/jobs" },
]

export default function FieldOpsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full">
      {/* Page header + pill tabs */}
      <div className="border-b bg-card px-6 pt-6 pb-0">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Field Operations</h1>
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-2 rounded-t-lg text-sm font-medium transition-colors",
                pathname === tab.href
                  ? "bg-background text-foreground border border-b-0 border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
