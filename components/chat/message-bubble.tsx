"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Copy, Check, ChevronDown, ChevronRight, FileText } from "lucide-react"
import type { ChatMessage } from "@/lib/chat/types"

interface MessageBubbleProps {
  message: ChatMessage
  onFeedback: (id: string, feedback: "up" | "down") => void
}

export function MessageBubble({ message, onFeedback }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const isUser = message.role === "user"

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-xs font-bold text-primary-foreground">D</span>
        </div>
      )}

      <div className={cn("max-w-[85%] space-y-2", isUser ? "items-end" : "items-start")}>
        {/* Message content */}
        <div
          className={cn(
            "rounded-xl px-4 py-3 text-sm",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-bl-sm"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm prose-invert max-w-none [&_table]:text-xs [&_th]:px-2 [&_th]:py-1 [&_td]:px-2 [&_td]:py-1 [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border [&_p]:my-1.5 [&_ul]:my-1.5 [&_ol]:my-1.5 [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_strong]:text-foreground [&_hr]:my-3 [&_hr]:border-border">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Sources footer */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="rounded-lg border bg-card/50 overflow-hidden">
            <button
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground w-full"
              onClick={() => setSourcesOpen(!sourcesOpen)}
            >
              {sourcesOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              <FileText className="w-3 h-3" />
              {message.sources.length} source{message.sources.length > 1 ? "s" : ""}
            </button>
            {sourcesOpen && (
              <div className="px-3 pb-2 space-y-1.5">
                {message.sources.map((s, i) => (
                  <div key={i} className="text-xs bg-muted/50 rounded px-2 py-1.5">
                    <span className="font-medium text-foreground">{s.filename}</span>
                    <p className="text-muted-foreground mt-0.5 line-clamp-2">{s.excerpt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        {!isUser && (
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-6 w-6", message.feedback === "up" && "text-green-500")}
              onClick={() => onFeedback(message.id, "up")}
            >
              <ThumbsUp className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-6 w-6", message.feedback === "down" && "text-red-500")}
              onClick={() => onFeedback(message.id, "down")}
            >
              <ThumbsDown className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-xs font-bold text-secondary-foreground">Y</span>
        </div>
      )}
    </div>
  )
}
