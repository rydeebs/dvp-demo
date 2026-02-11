import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Bot, 
  UserPlus, 
  FileText, 
  Mail, 
  Phone, 
  Calendar, 
  BarChart3, 
  Zap, 
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Clock,
  Target,
  Building2,
  Play
} from "lucide-react"

export default function HubSpotPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HubSpot Automation</h1>
          <p className="text-muted-foreground">Clawdbot-powered automations that supercharge your HubSpot CRM</p>
        </div>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Run All
        </Button>
      </div>

      {/* Automation Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* Contact Data Enrichment */}
        <Card className="border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">Contact Data Enrichment</CardTitle>
            <CardDescription>Auto-fill missing contact fields</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Find missing phone numbers
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Verify email addresses
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Add job titles & LinkedIn profiles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Enrich company data (size, revenue)
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">247 contacts enriched this month</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* RFP Document Review */}
        <Card className="border-purple-500/20 hover:border-purple-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">RFP Document Review</CardTitle>
            <CardDescription>Extract key details from RFP documents</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Parse PDF attachments automatically
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Extract scope, budget, timeline
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Identify key requirements
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Flag compliance requirements
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">32 RFPs processed this week</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Sequence Optimization */}
        <Card className="border-green-500/20 hover:border-green-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">Email Sequence Optimization</CardTitle>
            <CardDescription>AI-powered email timing & content</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Optimal send time prediction
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Subject line A/B testing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Personalize based on deal stage
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Auto-pause on engagement signals
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">+23% open rate improvement</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Call Logging & Transcription */}
        <Card className="border-orange-500/20 hover:border-orange-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-orange-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">Call Logging & Transcription</CardTitle>
            <CardDescription>Auto-capture call insights</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Transcribe sales calls automatically
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Extract action items & next steps
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Update deal notes automatically
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Flag competitor mentions
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">156 calls logged this month</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Scheduler Intelligence */}
        <Card className="border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-cyan-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">Meeting Scheduler Intelligence</CardTitle>
            <CardDescription>Smart scheduling & prep</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Auto-suggest optimal meeting times
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Generate meeting prep briefs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Send smart reminders
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Auto-create follow-up tasks
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">89 meetings scheduled</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Deal Stage Automation */}
        <Card className="border-pink-500/20 hover:border-pink-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-pink-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">Deal Stage Automation</CardTitle>
            <CardDescription>Auto-advance deals based on signals</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Move deals on email reply
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Advance on document view
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Flag stalled deals automatically
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Trigger alerts on deal changes
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">45 deals auto-advanced</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Duplicate Detection & Merge */}
        <Card className="border-red-500/20 hover:border-red-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-red-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">Duplicate Detection & Merge</CardTitle>
            <CardDescription>Keep your CRM clean</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Find duplicate contacts/companies
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Smart merge recommendations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Preserve activity history
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Weekly cleanup reports
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">23 duplicates found</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Research */}
        <Card className="border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-indigo-500" />
              </div>
              <Badge variant="secondary">Auto</Badge>
            </div>
            <CardTitle className="mt-3">Company Research</CardTitle>
            <CardDescription>Auto-research target accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Pull company news & updates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Track leadership changes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Monitor expansion signals
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Identify buying triggers
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">78 companies monitored</span>
              <Button variant="ghost" size="sm" className="text-xs">Run Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Analytics */}
        <Card className="border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-yellow-500" />
              </div>
              <Badge variant="secondary">Insight</Badge>
            </div>
            <CardTitle className="mt-3">Pipeline Analytics</CardTitle>
            <CardDescription>AI-powered forecasting</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Win probability scoring
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Revenue forecasting
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Deal velocity tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Bottleneck identification
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">$1.2M forecasted this Q</span>
              <Button variant="ghost" size="sm" className="text-xs">View Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clawdbot Integration */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Powered by Clawdbot</CardTitle>
              <CardDescription>All automations run continuously in the background</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
              <Zap className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-semibold text-2xl">1,247</p>
                <p className="text-sm text-muted-foreground">Automations run today</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
              <Clock className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-semibold text-2xl">47 hrs</p>
                <p className="text-sm text-muted-foreground">Time saved this week</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <div>
                <p className="font-semibold text-2xl">99.8%</p>
                <p className="text-sm text-muted-foreground">Automation success rate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
