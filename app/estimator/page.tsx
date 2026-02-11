import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bot, 
  Building2, 
  Warehouse, 
  Users, 
  Globe, 
  Newspaper, 
  FileText, 
  UserPlus, 
  Mail, 
  Linkedin,
  Play,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react"

export default function EstimatorPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proactive Commercial Property Lead Generator</h1>
          <p className="text-muted-foreground">Identify and engage commercial property opportunities before competitors</p>
        </div>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Run Now
        </Button>
      </div>

      {/* What Clawdbot Does */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>What Clawdbot Does</CardTitle>
              <CardDescription>Automated commercial real estate monitoring and outreach</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monitoring */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Monitors Commercial Real Estate Transactions in Delaware Valley
            </h3>
          </div>

          {/* Identifies */}
          <div>
            <h3 className="font-semibold mb-3">Identifies:</h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">New Shopping Centers</p>
                  <p className="text-sm text-muted-foreground">Under construction projects requiring parking lot paving</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Warehouse className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium">Warehouse Developments</p>
                  <p className="text-sm text-muted-foreground">E-commerce boom driving massive logistics facilities</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Property Management Cos</p>
                  <p className="text-sm text-muted-foreground">Companies acquiring portfolios needing maintenance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-semibold mb-3">Scrapes Data From:</h3>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <Globe className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-sm">LoopNet.com</p>
                  <p className="text-xs text-muted-foreground">Commercial listings</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <Newspaper className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">Local Business Journals</p>
                  <p className="text-xs text-muted-foreground">Development news</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <FileText className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">Building Permits</p>
                  <p className="text-xs text-muted-foreground">Public records</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-dashed">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Enriches with Decision-Maker Contact Info</p>
                <p className="text-sm text-muted-foreground">Finds property managers, facility directors, and construction PMs</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-dashed">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">Sends Personalized Outreach</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  Via <Mail className="w-4 h-4" /> Email and <Linkedin className="w-4 h-4" /> LinkedIn
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Leads Generated */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads Generated</CardTitle>
          <CardDescription>Commercial properties identified this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold">King of Prussia Town Center - Phase 3</h3>
                  <p className="text-sm text-muted-foreground">New retail development • 85,000 sq ft parking</p>
                </div>
              </div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Hot Lead</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-4">
              <span>Contact: Mike Reynolds, Development PM</span>
              <span>•</span>
              <span>Source: Building Permit</span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                <Warehouse className="w-5 h-5 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Amazon Distribution Center - Exton</h3>
                  <p className="text-sm text-muted-foreground">Warehouse expansion • 220,000 sq ft</p>
                </div>
              </div>
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Qualified</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-4">
              <span>Contact: Sarah Kim, Facilities</span>
              <span>•</span>
              <span>Source: LoopNet</span>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Brandywine Realty Trust - Portfolio Acquisition</h3>
                  <p className="text-sm text-muted-foreground">12 properties acquired • Maintenance contracts needed</p>
                </div>
              </div>
              <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">New</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-4">
              <span>Contact: Tom Bradley, VP Operations</span>
              <span>•</span>
              <span>Source: Business Journal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clawdbot Implementation */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Clawdbot Implementation</CardTitle>
              <CardDescription>Municipal contract renewal monitoring</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cron Job Description */}
          <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">Cron Job: Weekly scan of 25 local municipalities</span>
            </div>
            
            <div className="space-y-4 ml-7">
              <div className="font-medium text-sm text-muted-foreground mb-2">For each township:</div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                  <p className="text-sm">Download board meeting minutes PDF</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                  <div className="text-sm">
                    <p>Search for keywords:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">"paving"</Badge>
                      <Badge variant="outline" className="text-xs">"resurfacing"</Badge>
                      <Badge variant="outline" className="text-xs">"road repair"</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                  <p className="text-sm">Extract contractor names and contract end dates</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
                  <div className="text-sm">
                    <p className="font-medium">If contract expires within 6 months:</p>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" />
                        Add to "Renewal Target" list
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" />
                        Generate outreach plan
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" />
                        Alert sales team
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example Alert */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              Example Alert
            </h3>
            <div className="bg-card border-2 border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div className="space-y-2">
                  <p className="font-semibold text-yellow-500">Easttown Township Contract Expiring</p>
                  <p className="text-sm">
                    Easttown Township's paving contract with <span className="font-semibold">XYZ Paving</span> expires <span className="font-semibold">8/1/2026</span>. 
                    They awarded <span className="font-semibold text-green-500">$2.3M</span> last cycle.
                  </p>
                  <div className="pt-2 border-t border-border mt-2">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Recommended Action:
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Attend Feb township meeting, introduce capabilities.
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      Add to Calendar
                    </Button>
                    <Button size="sm" className="text-xs">
                      View Full Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
