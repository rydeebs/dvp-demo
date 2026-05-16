"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChatInterface } from "./chat-interface"
import { MessageSquare, X } from "lucide-react"

export function ChatDock() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Launcher pill */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">Ask DVP</span>
        </button>
      )}

      {/* Slide-over panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-50 md:bg-transparent"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className={cn(
              "fixed top-0 right-0 h-full z-50 flex flex-col bg-card border-l shadow-2xl transition-transform duration-200",
              "w-full sm:w-[420px]"
            )}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-card">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Ask DVP</h2>
                  <p className="text-xs text-muted-foreground">Internal Knowledge Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat interface */}
            <div className="flex-1 overflow-hidden">
              <ChatInterface compact storageKey="dvp-chat-dock" />
            </div>
          </div>
        </>
      )}
    </>
  )
}
