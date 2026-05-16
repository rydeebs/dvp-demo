"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { sidebarConfig } from "@/lib/sidebar.config"
import {
  LayoutDashboard,
  Plus,
  ChevronRight
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const mainRoutes = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-card h-screen flex flex-col">
      {/* Logo */}
      <div className="p-3 border-b">
        <Image
          src="/logo.png"
          alt="Delaware Valley Paving"
          width={200}
          height={80}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1 mb-4">
          {mainRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === route.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <route.icon className="w-4 h-4" />
              <span>{route.label}</span>
            </Link>
          ))}
        </div>

        <Separator className="my-3" />

        {/* Workgroups */}
        <div className="mb-3">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Workgroups</h3>
          </div>

          {sidebarConfig.length > 0 ? (
            <Accordion type="multiple" defaultValue={sidebarConfig.map(g => g.id)} className="space-y-1">
              {sidebarConfig.map((group) => (
                <AccordionItem key={group.id} value={group.id} className="border-none">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                    {group.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 pl-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors group",
                            pathname === item.href
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                          )}
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="flex-1">{item.label}</span>
                          {item.tag && (
                            <span className={cn(
                              "text-xs px-1.5 py-0.5 rounded",
                              item.tag === "Native" ? "bg-gray-100 text-gray-600" :
                              item.tag === "Auto" ? "bg-blue-100 text-blue-600" :
                              item.tag === "Assist" ? "bg-purple-100 text-purple-600" :
                              item.tag === "Insight" ? "bg-green-100 text-green-600" :
                              "bg-orange-100 text-orange-600"
                            )}>
                              {item.tag}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="px-3 py-2 text-xs text-muted-foreground">No workgroups yet</p>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
          <Plus className="w-4 h-4" />
          Create Group
        </Button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Connected to HubSpot
        </div>
      </div>
    </div>
  )
}
