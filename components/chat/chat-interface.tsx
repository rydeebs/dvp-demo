"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { MessageBubble } from "./message-bubble"
import { Send, Loader2, MessageSquare } from "lucide-react"
import type { ChatMessage, RetrievedSource } from "@/lib/chat/types"
import { SUGGESTED_PROMPTS } from "@/lib/chat/types"

interface ChatInterfaceProps {
  compact?: boolean
  storageKey?: string
}

export function ChatInterface({ compact = false, storageKey = "dvp-chat" }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Persist messages
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(messages))
    }
  }, [messages, storageKey])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleFeedback = useCallback((id: string, feedback: "up" | "down") => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, feedback: m.feedback === feedback ? null : feedback } : m
      )
    )
  }, [])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: Date.now(),
      feedback: null,
    }

    const assistantId = `msg-${Date.now() + 1}`
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      sources: [],
      timestamp: Date.now() + 1,
      feedback: null,
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput("")
    setIsStreaming(true)

    try {
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok || !res.body) {
        throw new Error("Failed to get response")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""
      let accContent = ""
      let sources: RetrievedSource[] = []

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue
          const data = line.slice(6).trim()
          if (!data) continue

          try {
            const parsed = JSON.parse(data)
            if (parsed.type === "sources") {
              sources = parsed.sources || []
            } else if (parsed.type === "delta") {
              accContent += parsed.text
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: accContent, sources } : m
                )
              )
            } else if (parsed.type === "done") {
              // Final update with sources
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: accContent, sources } : m
                )
              )
            }
          } catch {
            // skip
          }
        }
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Sorry, I encountered an error. Please try again." }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleClear = () => {
    setMessages([])
    localStorage.removeItem(storageKey)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className={compact ? "text-base font-semibold mb-1" : "text-lg font-semibold mb-1"}>
              Ask DVP
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Ask anything about our jobs, crews, vendors, or policies.
            </p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onFeedback={handleFeedback} />
        ))}
        {isStreaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pl-10">
            <Loader2 className="w-3 h-3 animate-spin" />
            Searching knowledge base...
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      <div className="px-4 pb-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              onClick={() => sendMessage(prompt)}
              disabled={isStreaming}
            >
              {prompt.length > 45 ? prompt.slice(0, 45) + "..." : prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about jobs, crews, safety..."
              rows={1}
              className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isStreaming}
            />
          </div>
          <div className="flex gap-1">
            <Button type="submit" size="icon" disabled={!input.trim() || isStreaming}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        {messages.length > 0 && (
          <button
            className="text-xs text-muted-foreground hover:text-foreground mt-1.5 px-1"
            onClick={handleClear}
          >
            Clear conversation
          </button>
        )}
      </div>
    </div>
  )
}
