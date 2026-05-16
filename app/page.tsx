"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, Plus, Share2 } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back, DVP!</h1>
          <p className="text-muted-foreground">Modules coming online</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-sm w-full">
          <CardContent className="flex flex-col items-center text-center py-12 px-6">
            <LayoutGrid className="w-12 h-12 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-1">No modules yet</h2>
            <p className="text-sm text-muted-foreground">
              New modules will appear in the sidebar as they&#39;re built.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
