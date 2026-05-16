"use client"

import { KNOWLEDGE_DOCS } from "@/lib/chat/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Database } from "lucide-react"

const CATEGORY_COLORS: Record<string, string> = {
  "HR / Policy": "bg-purple-100 text-purple-700",
  "Safety": "bg-red-100 text-red-700",
  "Compliance": "bg-amber-100 text-amber-700",
  "Procurement": "bg-blue-100 text-blue-700",
  "Equipment": "bg-slate-100 text-slate-700",
  "Active Job": "bg-green-100 text-green-700",
  "Operations": "bg-cyan-100 text-cyan-700",
}

export default function KnowledgeSourcesPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Knowledge Sources</h1>
            <p className="text-sm text-muted-foreground">{KNOWLEDGE_DOCS.length} documents indexed for the Ask DVP assistant</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Retrievals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {KNOWLEDGE_DOCS.map((doc) => (
                <TableRow key={doc.filename} className="hover:bg-muted/50">
                  <TableCell>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{doc.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{doc.filename}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[doc.category] || "bg-gray-100 text-gray-700"}`}>
                      {doc.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="font-mono">{doc.retrievalCount}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
