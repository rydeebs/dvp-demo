"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { demoData } from "@/lib/data"
import { CheckCircle2, Clock, Upload, FileSpreadsheet, ArrowDown, Search, Mail, Database, CheckCheck, Bot, Globe, Building2, MapPin, Ruler, Calendar } from "lucide-react"
import { useRef, useState } from "react"

export default function EnrichmentPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Enrichment</h1>
          <p className="text-muted-foreground">Auto-populate contact and deal data from emails, PDFs, and conversations</p>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="border-dashed border-2">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Upload Contact List</h3>
              <p className="text-sm text-muted-foreground">Upload an Excel or CSV file to enrich contacts with verified emails</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <div className="flex items-center gap-3">
              <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
                <Upload className="w-4 h-4" />
                Select File
              </Button>
              {fileName && (
                <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
                  <FileSpreadsheet className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{fileName}</span>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    Enrich Now
                  </Button>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Supports .xlsx, .xls, and .csv files up to 10MB</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contacts Enriched
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data Completeness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.dataCompleteness}</div>
            <p className="text-xs text-green-600">↑ +33% from 61%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Time Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demoData.stats.timeSaved}</div>
            <p className="text-xs text-muted-foreground">Manual data entry eliminated</p>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Data Enrichment Works</CardTitle>
          <CardDescription>Waterfall email discovery using multiple data providers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Waterfall Visualization */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Email Waterfall Discovery
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">1</div>
                <div className="flex-1 flex items-center justify-between p-3 bg-card rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">in</span>
                    </div>
                    <span className="font-medium">LinkedIn Sales Navigator</span>
                  </div>
                  <Badge variant="secondary">Primary</Badge>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-green-600 flex items-center justify-center text-white font-semibold text-sm">2</div>
                <div className="flex-1 flex items-center justify-between p-3 bg-card rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-green-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-green-600">TP</span>
                    </div>
                    <span className="font-medium">TruePeople Search</span>
                  </div>
                  <Badge variant="secondary">Fallback 1</Badge>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-orange-600 flex items-center justify-center text-white font-semibold text-sm">3</div>
                <div className="flex-1 flex items-center justify-between p-3 bg-card rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-orange-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-orange-600">ZI</span>
                    </div>
                    <span className="font-medium">ZoomInfo</span>
                  </div>
                  <Badge variant="secondary">Fallback 2</Badge>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-purple-600 flex items-center justify-center text-white font-semibold text-sm">4</div>
                <div className="flex-1 flex items-center justify-between p-3 bg-card rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-600">AP</span>
                    </div>
                    <span className="font-medium">Apollo.io / Hunter.io</span>
                  </div>
                  <Badge variant="secondary">Fallback 3</Badge>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              System tries each provider in sequence until a verified email is found. Average success rate: 94%
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-3 p-4 rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">1. Upload Contacts</h3>
                <p className="text-sm text-muted-foreground">Import your Excel/CSV with company names, titles, and any known info</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">2. Waterfall Search</h3>
                <p className="text-sm text-muted-foreground">System cascades through providers to find the best verified email</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">3. Email Verification</h3>
                <p className="text-sm text-muted-foreground">All emails are verified for deliverability before being added</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">4. HubSpot Sync</h3>
                <p className="text-sm text-muted-foreground">Enriched contacts auto-sync to HubSpot with all data fields populated</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Enrichments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recently Enriched Contacts</CardTitle>
              <CardDescription>Auto-populated from incoming emails</CardDescription>
            </div>
            <Badge variant="secondary">AUTO</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Est. Value</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Sq Ft</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoData.contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.company}</div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.jobType}</TableCell>
                  <TableCell>{contact.estimatedValue}</TableCell>
                  <TableCell>{contact.propertyType}</TableCell>
                  <TableCell>{contact.squareFeet}</TableCell>
                  <TableCell>
                    {contact.dataComplete ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Complete</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Pending</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* OpenClaw Automatic Data Enrichment */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Automatic Data Enrichment with OpenClaw</CardTitle>
              <CardDescription>Fully automated contact enrichment pipeline</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-card border rounded-lg p-4">
            <div className="space-y-4">
              {/* Trigger */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">New contact in HubSpot</p>
                  <p className="text-sm text-muted-foreground">OpenClaw detects new contact creation</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              {/* Step 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Searches web for company info</p>
                  <p className="text-xs text-muted-foreground">Company website, LinkedIn, news articles</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Checks county records for past projects</p>
                  <p className="text-xs text-muted-foreground">Permit history, previous contractors, project values</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Looks up property details</p>
                  <p className="text-xs text-muted-foreground">Property type, ownership, zoning information</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Ruler className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Estimates square footage from Google Maps</p>
                  <p className="text-xs text-muted-foreground">Satellite imagery analysis for parking lots & roads</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              {/* Step 5 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-pink-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Populates ALL custom fields automatically</p>
                  <p className="text-xs text-muted-foreground">Job type, property type, estimated value, square footage, and more</p>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>

              {/* Step 6 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Adds enrichment timestamp</p>
                  <p className="text-xs text-muted-foreground">Tracks when data was last updated for accuracy</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Result:</span> Every new contact is automatically enriched with complete data within seconds, eliminating manual research and data entry.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
