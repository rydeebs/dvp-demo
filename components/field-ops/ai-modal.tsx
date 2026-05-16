"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Check, XIcon, Loader2 } from "lucide-react"
import { AiSuggestion } from "@/lib/field-ops/types"

interface AiModalProps {
  open: boolean
  onClose: () => void
  onAccept: (suggestion: AiSuggestion) => void
  currentWeekPayload: object
}

export function AiModal({ open, onClose, onAccept, currentWeekPayload }: AiModalProps) {
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [accepted, setAccepted] = useState<Set<string>>(new Set())
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const fetchSuggestions = async () => {
    setLoading(true)
    setError(null)
    setSuggestions([])
    setAccepted(new Set())
    setDismissed(new Set())

    try {
      const res = await fetch("/api/field-ops/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentWeekPayload),
      })
      if (!res.ok) throw new Error("Failed to get suggestions")
      const data = await res.json()
      setSuggestions(data.suggestions || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = (s: AiSuggestion) => {
    setAccepted((prev) => new Set(prev).add(s.id))
    onAccept(s)
  }

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-xl border shadow-2xl w-full max-w-xl max-h-[80vh] flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">AI Schedule Optimizer</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!loading && suggestions.length === 0 && !error && (
            <div className="text-center py-8">
              <Sparkles className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-4">
                Analyze the current week&#39;s schedule for crew balancing, weather risks, and equipment conflicts.
              </p>
              <Button onClick={fetchSuggestions}>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Suggestions
              </Button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
              <p className="text-sm text-muted-foreground">Analyzing schedule&hellip;</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-sm text-destructive mb-3">{error}</p>
              <Button variant="outline" onClick={fetchSuggestions}>Retry</Button>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="space-y-3">
              {suggestions.map((s) => {
                const isAccepted = accepted.has(s.id)
                const isDismissed = dismissed.has(s.id)
                if (isDismissed) return null

                return (
                  <Card key={s.id} className={cn(isAccepted && "border-green-500/50 bg-green-500/5")}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium">{s.action}</p>
                            {isAccepted && <Badge variant="default" className="bg-green-600 text-xs">Applied</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground">{s.reasoning}</p>
                        </div>
                        {!isAccepted && (
                          <div className="flex gap-1 flex-shrink-0">
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-green-600 hover:text-green-700 hover:bg-green-100" onClick={() => handleAccept(s)}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDismiss(s.id)}>
                              <XIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
