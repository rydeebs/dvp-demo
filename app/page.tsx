"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { demoData } from "@/lib/data"
import { TrendingUp, Plus, Share2, Filter, ArrowUpDown, Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back CEO!</h1>
          <p className="text-muted-foreground">Let's tackle down some work</p>
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

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Generated Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.generatedRevenue}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {demoData.stats.revenueChange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Signed Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.signedClients}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {demoData.stats.clientsChange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.totalLeads}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {demoData.stats.leadsChange}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">{demoData.stats.activeMembers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Top Performers Row */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Leads Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Leads Gathered</CardTitle>
            <p className="text-sm text-muted-foreground">Last 6 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demoData.leadsChart}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="newLeads" stroke="hsl(var(--primary))" strokeWidth={2} name="New Leads" />
                <Line type="monotone" dataKey="replied" stroke="#10b981" strokeWidth={2} name="Replied" />
                <Line type="monotone" dataKey="closed" stroke="#f59e0b" strokeWidth={2} name="Closed" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <p className="text-sm text-muted-foreground">This quarter</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoData.topPerformers.map((performer, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={cn(
                    "font-semibold text-sm",
                    idx === 0 ? "bg-blue-100 text-blue-600" :
                    idx === 1 ? "bg-green-100 text-green-600" :
                    idx === 2 ? "bg-purple-100 text-purple-600" :
                    idx === 3 ? "bg-orange-100 text-orange-600" :
                    "bg-gray-100 text-gray-600"
                  )}>
                    {performer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{performer.name}</p>
                  <p className="text-xs text-muted-foreground">{performer.deals} deals closed</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{performer.revenue}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Lead Management Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lead Management</CardTitle>
              <p className="text-sm text-muted-foreground">Recent RFPs auto-routed to estimators</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Follow-up</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoData.rfps.slice(0, 10).map((rfp) => (
                <TableRow key={rfp.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{rfp.name}</div>
                      <div className="text-sm text-muted-foreground">{rfp.client}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={rfp.type === "Warm" ? "default" : rfp.type === "Cold" ? "secondary" : "outline"}>
                      {rfp.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{rfp.email}</TableCell>
                  <TableCell className="text-sm">{rfp.followUp}</TableCell>
                  <TableCell>
                    <Badge variant={rfp.status === "Closed" ? "default" : rfp.status === "Lost" ? "destructive" : "secondary"}>
                      {rfp.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-semibold",
                      rfp.score >= 85 ? "text-green-600" :
                      rfp.score >= 70 ? "text-blue-600" :
                      "text-gray-600"
                    )}>
                      {rfp.score}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">{rfp.source}</TableCell>
                  <TableCell className="font-medium">{rfp.estimatedValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <p>Showing 1 to 10 of {demoData.rfps.length} leads</p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
