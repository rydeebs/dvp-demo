"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Bot, 
  Play, 
  Rss, 
  Building2, 
  Newspaper, 
  ArrowDown, 
  Search, 
  MapPin, 
  UserPlus, 
  ListPlus, 
  ClipboardList, 
  Mail,
  ExternalLink,
  Calendar,
  Ruler,
  User
} from "lucide-react"

const constructionProjects = [
  {
    id: 1,
    name: "Collegeville Town Center Mixed-Use Development",
    source: "Philadelphia Business Journal",
    date: "2026-02-10",
    estimatedSize: "185,000 sq ft",
    type: "Mixed-Use",
    location: "Collegeville, PA",
    status: "Planning Approved",
    contact: "Michael Torres",
    contactTitle: "Development Director",
    company: "Toll Brothers Commercial",
    email: "mtorres@tollbrothers.com"
  },
  {
    id: 2,
    name: "King of Prussia Logistics Hub",
    source: "Construction Dive",
    date: "2026-02-09",
    estimatedSize: "320,000 sq ft",
    type: "Industrial/Warehouse",
    location: "King of Prussia, PA",
    status: "Permits Filed",
    contact: "Sarah Williams",
    contactTitle: "Project Manager",
    company: "Prologis",
    email: "swilliams@prologis.com"
  },
  {
    id: 3,
    name: "Exton Square Redevelopment Phase 2",
    source: "ENR Mid-Atlantic",
    date: "2026-02-08",
    estimatedSize: "95,000 sq ft",
    type: "Retail",
    location: "Exton, PA",
    status: "Under Construction",
    contact: "David Chen",
    contactTitle: "Construction PM",
    company: "PREIT",
    email: "dchen@preit.com"
  },
  {
    id: 4,
    name: "Chester County Medical Campus Expansion",
    source: "County Permits",
    date: "2026-02-07",
    estimatedSize: "142,000 sq ft",
    type: "Healthcare",
    location: "West Chester, PA",
    status: "Permits Approved",
    contact: "Jennifer Martinez",
    contactTitle: "Facilities Director",
    company: "Penn Medicine Chester County",
    email: "jmartinez@pennmedicine.upenn.edu"
  },
  {
    id: 5,
    name: "Phoenixville Apartments at Bridge Street",
    source: "Montgomery County Records",
    date: "2026-02-06",
    estimatedSize: "78,000 sq ft",
    type: "Residential",
    location: "Phoenixville, PA",
    status: "Site Work Starting",
    contact: "Robert Kim",
    contactTitle: "VP Development",
    company: "Hanover Company",
    email: "rkim@hanoverco.com"
  }
]

export default function ConstructionMonitorPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Construction Monitor</h1>
          <p className="text-muted-foreground">Track new construction projects and identify paving opportunities</p>
        </div>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Scrape Now
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Projects Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Service Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-green-500">68% match rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contacts Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Added to HubSpot</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Est. Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <p className="text-xs text-muted-foreground">Pipeline potential</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Construction Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Construction Projects Found</CardTitle>
              <CardDescription>New projects identified from monitored sources</CardDescription>
            </div>
            <Badge variant="secondary">Live Feed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Est. Size</TableHead>
                <TableHead>Best Contact</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {constructionProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      {project.source.includes("Dive") || project.source.includes("ENR") ? (
                        <Rss className="w-3 h-3 text-orange-500" />
                      ) : project.source.includes("Permits") || project.source.includes("Records") ? (
                        <Building2 className="w-3 h-3 text-blue-500" />
                      ) : (
                        <Newspaper className="w-3 h-3 text-green-500" />
                      )}
                      {project.source}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3" />
                      {project.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Ruler className="w-3 h-3" />
                      {project.estimatedSize}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {project.contact}
                      </div>
                      <div className="text-xs text-muted-foreground">{project.contactTitle}</div>
                      <div className="text-xs text-muted-foreground">{project.company}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        project.status === "Under Construction" ? "default" :
                        project.status === "Site Work Starting" ? "default" :
                        "secondary"
                      }
                      className={
                        project.status === "Under Construction" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                        project.status === "Site Work Starting" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                        ""
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* OpenClaw Automation */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">OpenClaw Construction Monitor</CardTitle>
              <CardDescription>Automated new construction discovery pipeline</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monitoring Sources */}
          <div>
            <h3 className="font-semibold mb-3">OpenClaw monitors:</h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Rss className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">RSS Feeds</p>
                  <p className="text-xs text-muted-foreground">Construction Dive, ENR</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Permit Databases</p>
                  <p className="text-xs text-muted-foreground">County building permits</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Local News</p>
                  <p className="text-xs text-muted-foreground">Construction news sites</p>
                </div>
              </div>
            </div>
          </div>

          {/* Automation Flow */}
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-primary" />
              <span className="font-semibold">When relevant project found:</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Extract project details</p>
                  <p className="text-xs text-muted-foreground">Size, type, location, timeline, key contacts</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Check if it's in service area</p>
                  <p className="text-xs text-muted-foreground">Verify location is within Delaware Valley region</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Create HubSpot contact (project owner)</p>
                  <p className="text-xs text-muted-foreground">Add contact with all enriched data</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <ListPlus className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Add to "Prospects" list</p>
                  <p className="text-xs text-muted-foreground">Organize for sales team follow-up</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Set task: "Research and reach out"</p>
                  <p className="text-xs text-muted-foreground">Assign to sales rep with due date</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-pink-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Draft outreach email template</p>
                  <p className="text-xs text-muted-foreground">Personalized intro referencing the project</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Result:</span> New construction opportunities are automatically discovered and queued for outreach—your team gets warm leads without manual research.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

