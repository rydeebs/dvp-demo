"use client"

import { ChatInterface } from "@/components/chat/chat-interface"
import { MessageSquare } from "lucide-react"

export default function AskDVPPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Ask DVP</h1>
            <p className="text-sm text-muted-foreground">Company-wide knowledge assistant — powered by AI</p>
          </div>
        </div>
      </div>

      {/* Full-width chat */}
      <div className="flex-1 overflow-hidden max-w-3xl w-full mx-auto">
        <ChatInterface storageKey="dvp-chat-full" />
      </div>
    </div>
  )
}
