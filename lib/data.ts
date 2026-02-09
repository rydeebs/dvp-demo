export const demoData = {
  stats: {
    generatedRevenue: "$1.2M",
    revenueChange: "+12%",
    signedClients: 42,
    clientsChange: "+8%",
    totalLeads: 127,
    leadsChange: "+17%",
    teamMembers: 8,
    activeMembers: "5 Active"
  },

  // Chart data for leads over time
  leadsChart: [
    { month: "Jan", newLeads: 15, replied: 8, closed: 5 },
    { month: "Feb", newLeads: 18, replied: 12, closed: 7 },
    { month: "Mar", newLeads: 22, replied: 15, closed: 9 },
    { month: "Apr", newLeads: 19, replied: 13, closed: 8 },
    { month: "May", newLeads: 25, replied: 18, closed: 11 },
    { month: "Jun", newLeads: 28, replied: 21, closed: 14 },
  ],

  // Top performers
  topPerformers: [
    { name: "Tom Richards", initials: "TR", deals: 18, revenue: "$485K" },
    { name: "Sarah Mitchell", initials: "SM", deals: 14, revenue: "$378K" },
    { name: "Mike Johnson", initials: "MJ", deals: 11, revenue: "$295K" },
    { name: "Emily Rodriguez", initials: "ER", deals: 8, revenue: "$187K" },
    { name: "Dan Kelly", initials: "DK", deals: 5, revenue: "$125K" },
  ],

  // RFPs for lead management table
  rfps: [
    {
      id: "rfp-001",
      name: "Route 202 Resurfacing",
      client: "PennDOT District 6-0",
      type: "Warm",
      email: "john.martinez@penndot.gov",
      followUp: "In 1 day",
      status: "Closed",
      score: 94,
      source: "Government RFP",
      estimatedValue: "$485,000",
      location: "King of Prussia, PA",
      squareFeet: "145,000",
      autoScore: 94,
      assignedTo: "Tom Richards",
      hubspotDeal: "DEAL-2024-089",
      priority: "high"
    },
    {
      id: "rfp-002",
      name: "Valley Forge Corporate Park",
      client: "Liberty Property Trust",
      type: "Warm",
      email: "schen@libertyproperty.com",
      followUp: "In 2 days",
      status: "Closed",
      score: 88,
      source: "Referral",
      estimatedValue: "$125,000",
      location: "King of Prussia, PA",
      squareFeet: "42,000",
      autoScore: 88,
      assignedTo: "Sarah Mitchell",
      hubspotDeal: "DEAL-2024-090",
      priority: "medium"
    },
    {
      id: "rfp-003",
      name: "Phoenixville Shopping Center",
      client: "Brandywine Realty",
      type: "Cold",
      email: "facilities@brandywine.com",
      followUp: "In 5 days",
      status: "Open",
      score: 72,
      source: "Website",
      estimatedValue: "$78,000",
      location: "Phoenixville, PA",
      squareFeet: "28,000",
      autoScore: 72,
      assignedTo: "Mike Johnson",
      hubspotDeal: "DEAL-2024-091",
      priority: "low"
    },
    {
      id: "rfp-004",
      name: "Chester County Industrial Park",
      client: "Industrial Realty Group",
      type: "Warm",
      email: "ops@industrialrealty.com",
      followUp: "In 1 day",
      status: "Closed",
      score: 85,
      source: "LinkedIn",
      estimatedValue: "$215,000",
      location: "West Chester, PA",
      squareFeet: "68,000",
      autoScore: 85,
      assignedTo: "Tom Richards",
      hubspotDeal: "DEAL-2024-092",
      priority: "high"
    },
    {
      id: "rfp-005",
      name: "Main Street Overlay",
      client: "Norristown Borough",
      type: "Warm",
      email: "publicworks@norristown.gov",
      followUp: "In 3 days",
      status: "Closed",
      score: 79,
      source: "Government RFP",
      estimatedValue: "$165,000",
      location: "Norristown, PA",
      squareFeet: "52,000",
      autoScore: 79,
      assignedTo: "Sarah Mitchell",
      hubspotDeal: "DEAL-2024-093",
      priority: "medium"
    },
    {
      id: "rfp-006",
      name: "Residential Community Roads",
      client: "Toll Brothers",
      type: "Cold",
      email: "construction@tollbrothers.com",
      followUp: "In 1 week",
      status: "Lost",
      score: 45,
      source: "Cold Call",
      estimatedValue: "$92,000",
      location: "Downingtown, PA",
      squareFeet: "31,000",
      autoScore: 45,
      assignedTo: "Mike Johnson",
      hubspotDeal: "DEAL-2024-094",
      priority: "low"
    },
    {
      id: "rfp-007",
      name: "University Parking Lots A & B",
      client: "Villanova University",
      type: "Warm",
      email: "facilities@villanova.edu",
      followUp: "In 2 days",
      status: "Closed",
      score: 91,
      source: "Referral",
      estimatedValue: "$340,000",
      location: "Villanova, PA",
      squareFeet: "98,000",
      autoScore: 91,
      assignedTo: "Tom Richards",
      hubspotDeal: "DEAL-2024-095",
      priority: "high"
    },
    {
      id: "rfp-008",
      name: "Medical Campus Resurfacing",
      client: "Main Line Health",
      type: "Warm",
      email: "realestate@mainlinehealth.org",
      followUp: "In 1 day",
      status: "Closed",
      score: 87,
      source: "LinkedIn",
      estimatedValue: "$275,000",
      location: "Bryn Mawr, PA",
      squareFeet: "76,000",
      autoScore: 87,
      assignedTo: "Sarah Mitchell",
      hubspotDeal: "DEAL-2024-096",
      priority: "high"
    },
    {
      id: "rfp-009",
      name: "Retail Plaza Maintenance",
      client: "PREIT",
      type: "Cold",
      email: "ops@preit.com",
      followUp: "In 4 days",
      status: "Open",
      score: 58,
      source: "Website",
      estimatedValue: "$54,000",
      location: "Plymouth Meeting, PA",
      squareFeet: "18,000",
      autoScore: 58,
      assignedTo: "Dan Kelly",
      hubspotDeal: "DEAL-2024-097",
      priority: "low"
    },
    {
      id: "rfp-010",
      name: "Township Road Repairs",
      client: "Lower Merion Township",
      type: "Warm",
      email: "engineering@lowermerion.org",
      followUp: "In 2 days",
      status: "Closed",
      score: 82,
      source: "Government RFP",
      estimatedValue: "$195,000",
      location: "Ardmore, PA",
      squareFeet: "58,000",
      autoScore: 82,
      assignedTo: "Emily Rodriguez",
      hubspotDeal: "DEAL-2024-098",
      priority: "medium"
    }
  ],

  // Follow-up data
  followUps: [
    {
      id: "deal-001",
      dealName: "Route 202 Resurfacing",
      client: "PennDOT District 6-0",
      stage: "Quote Sent",
      amount: "$485,000",
      lastContact: "2026-02-08",
      daysSinceContact: 1,
      slaStatus: "on-track",
      nextAction: "Follow up on quote",
      dueDate: "2026-02-13",
      assignedTo: "Tom Richards",
      priority: "high"
    },
    {
      id: "deal-002",
      dealName: "Valley Forge Corporate Park",
      client: "Liberty Property Trust",
      stage: "Site Visit",
      amount: "$125,000",
      lastContact: "2026-02-05",
      daysSinceContact: 4,
      slaStatus: "approaching",
      nextAction: "Schedule site visit",
      dueDate: "2026-02-10",
      assignedTo: "Sarah Mitchell",
      priority: "medium"
    },
    {
      id: "deal-003",
      dealName: "Chester County Industrial Park",
      client: "Industrial Realty Group",
      stage: "Negotiation",
      amount: "$215,000",
      lastContact: "2026-01-28",
      daysSinceContact: 12,
      slaStatus: "overdue",
      nextAction: "Send revised proposal",
      dueDate: "2026-02-04",
      assignedTo: "Tom Richards",
      priority: "high"
    }
  ],

  // Contacts for enrichment
  contacts: [
    {
      id: 1,
      name: "John Martinez",
      company: "PennDOT District 6-0",
      email: "john.martinez@penndot.gov",
      phone: "(610) 205-6700",
      jobType: "Highway Resurfacing",
      estimatedValue: "$485,000",
      propertyType: "Government",
      squareFeet: "145,000",
      lastContact: "2026-02-08",
      dataComplete: true
    },
    {
      id: 2,
      name: "Sarah Chen",
      company: "Liberty Property Trust",
      email: "schen@libertyproperty.com",
      phone: "(610) 648-1700",
      jobType: "Parking Lot Paving",
      estimatedValue: "$125,000",
      propertyType: "Commercial",
      squareFeet: "42,000",
      lastContact: "2026-02-07",
      dataComplete: true
    }
  ],

  // Competitors
  competitors: [
    {
      name: "ABC Paving & Sealcoating",
      dealsAgainst: 18,
      wins: 7,
      losses: 11,
      winRate: "38%",
      avgPriceDiff: "-12%",
      strengths: ["Lower pricing", "Fast turnaround"],
      weaknesses: ["Quality issues", "Limited capacity"]
    },
    {
      name: "Premier Asphalt Services",
      dealsAgainst: 12,
      wins: 9,
      losses: 3,
      winRate: "75%",
      avgPriceDiff: "+8%",
      strengths: ["Premium quality", "Strong references"],
      weaknesses: ["Higher pricing", "Longer lead times"]
    }
  ],

  // Schedule
  schedule: [
    {
      id: "job-001",
      projectName: "Chesterbrook Shopping Center",
      client: "PREIT",
      crew: "Crew A (Tom R., Mike J., Carlos S.)",
      date: "2026-02-10",
      weatherForecast: "Sunny, 58°F",
      rainChance: "10%",
      status: "confirmed",
      squareFeet: "32,000"
    },
    {
      id: "job-002",
      projectName: "Devon Business Park - Phase 2",
      client: "Equus Capital",
      crew: "Crew B (Sarah M., Dan K., Jose R.)",
      date: "2026-02-11",
      weatherForecast: "Rain, 52°F",
      rainChance: "85%",
      status: "delayed",
      squareFeet: "28,000",
      rescheduledTo: "2026-02-13"
    }
  ]
}

export type RFP = typeof demoData.rfps[0]
export type Contact = typeof demoData.contacts[0]
export type FollowUp = typeof demoData.followUps[0]
export type Competitor = typeof demoData.competitors[0]
export type ScheduleItem = typeof demoData.schedule[0]
export type TopPerformer = typeof demoData.topPerformers[0]
export type ChartData = typeof demoData.leadsChart[0]
