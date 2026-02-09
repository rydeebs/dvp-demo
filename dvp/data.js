// Realistic Delaware Valley Paving demo data
const demoData = {
    // HubSpot Contacts (pulled from HubSpot API)
    contacts: [
        {
            id: 'C001',
            name: 'Michael Chen',
            email: 'mchen@westchesterhoa.org',
            phone: '610-555-0123',
            company: 'Westchester HOA',
            lifecycleStage: 'Lead',
            owner: 'Sarah Miller',
            // Fields enriched by automation layer
            enriched: {
                jobType: 'Community Paving',
                estimatedValue: '$145,000',
                propertyType: 'Residential Community',
                squareFootage: 28000,
                lastEnriched: '2026-02-09 08:15 AM'
            },
            // Missing data that HubSpot doesn't have
            missingFields: ['Decision Timeline', 'Budget Authority', 'Current Contractor']
        },
        {
            id: 'C002',
            name: 'Jennifer Torres',
            email: 'jtorres@valleyforge-bp.com',
            phone: '484-555-0198',
            company: 'Valley Forge Business Park',
            lifecycleStage: 'MQL',
            owner: 'Tom Richards',
            enriched: {
                jobType: 'Commercial Parking Lot',
                estimatedValue: '$320,000',
                propertyType: 'Commercial',
                squareFootage: 65000,
                lastEnriched: '2026-02-08 02:30 PM'
            },
            missingFields: []
        },
        {
            id: 'C003',
            name: 'Robert Williams',
            email: 'rwilliams@gmail.com',
            phone: '610-555-0287',
            company: null,
            lifecycleStage: 'Lead',
            owner: 'Sarah Miller',
            enriched: {
                jobType: 'Residential Driveway',
                estimatedValue: '$8,500',
                propertyType: 'Residential',
                squareFootage: 1200,
                lastEnriched: '2026-02-09 09:45 AM'
            },
            missingFields: ['Company', 'Property Address', 'Decision Timeline']
        }
    ],

    // Active RFPs/Opportunities
    rfps: [
        {
            id: 'RFP-2026-089',
            title: 'Route 202 Corridor Resurfacing',
            source: 'PennDOT Bid Portal',
            receivedDate: '2026-02-09 07:22 AM',
            dueDate: '2026-03-15',
            client: 'PennDOT District 6',
            estimatedValue: '$1,250,000',
            scope: '4.2 miles milling & overlay, Chester County',
            priority: 'high',
            autoScore: 94,
            scoreBreakdown: {
                location: 100, // Within 10 miles of yard
                size: 95,      // Perfect size for capacity
                timing: 90,    // Spring start ideal
                client: 92     // Existing relationship
            },
            assignedTo: 'Tom Richards',
            status: 'Routed to Estimator',
            hubspotDeal: 'DEAL-8829',
            actions: [
                { type: 'created_deal', timestamp: '2026-02-09 07:23 AM', hubspot: true },
                { type: 'assigned_owner', timestamp: '2026-02-09 07:23 AM', hubspot: true },
                { type: 'site_walk_scheduled', timestamp: '2026-02-09 07:24 AM', hubspot: true },
                { type: 'slack_alert_sent', timestamp: '2026-02-09 07:23 AM', hubspot: false }
            ]
        },
        {
            id: 'RFP-2026-090',
            title: 'Malvern Corporate Center - Parking Lot Repair',
            source: 'Email (direct)',
            receivedDate: '2026-02-09 11:45 AM',
            dueDate: '2026-02-22',
            client: 'Malvern Corporate Center LLC',
            estimatedValue: '$185,000',
            scope: 'Crack sealing, sealcoating, line striping - 3 buildings',
            priority: 'medium',
            autoScore: 78,
            scoreBreakdown: {
                location: 85,
                size: 80,
                timing: 70,  // Quick turnaround needed
                client: 75   // New client
            },
            assignedTo: 'Sarah Miller',
            status: 'Awaiting Clarification',
            hubspotDeal: 'DEAL-8830',
            actions: [
                { type: 'created_deal', timestamp: '2026-02-09 11:46 AM', hubspot: true },
                { type: 'rfi_drafted', timestamp: '2026-02-09 11:47 AM', hubspot: false },
                { type: 'awaiting_response', timestamp: '2026-02-09 11:50 AM', hubspot: true }
            ]
        },
        {
            id: 'RFP-2026-088',
            title: 'Township Road Maintenance 2026-2029',
            source: 'BidNet Direct',
            receivedDate: '2026-02-08 02:15 PM',
            dueDate: '2026-03-01',
            client: 'Easttown Township',
            estimatedValue: '$2,400,000',
            scope: '3-year contract, annual road repairs & maintenance',
            priority: 'high',
            autoScore: 88,
            scoreBreakdown: {
                location: 100,
                size: 70,   // Large multi-year
                timing: 95,
                client: 90  // Current contractor
            },
            assignedTo: 'Tom Richards',
            status: 'Estimate in Progress',
            hubspotDeal: 'DEAL-8827',
            actions: [
                { type: 'created_deal', timestamp: '2026-02-08 02:16 PM', hubspot: true },
                { type: 'preliminary_estimate', timestamp: '2026-02-08 04:30 PM', hubspot: false },
                { type: 'updated_deal_notes', timestamp: '2026-02-08 04:31 PM', hubspot: true }
            ]
        }
    ],

    // Deals needing follow-up
    followUps: [
        {
            dealId: 'DEAL-8801',
            dealName: 'Newtown Square Shopping Plaza',
            contact: 'David Park',
            company: 'Park Properties LLC',
            stage: 'Quote Sent',
            amount: '$425,000',
            lastContact: '2026-01-28',
            daysSinceContact: 12,
            nextAction: 'Follow-up on quote decision',
            urgency: 'high',
            automatedMessage: {
                subject: 'Following up: Newtown Square Shopping Plaza Quote',
                preview: 'Hi David, I wanted to follow up on the quote we sent on January 28th for the shopping plaza resurfacing...',
                scheduled: '2026-02-10 09:00 AM'
            },
            owner: 'Tom Richards'
        },
        {
            dealId: 'DEAL-8815',
            dealName: 'Residential - 123 Oak Lane',
            contact: 'Susan Martinez',
            company: null,
            stage: 'Site Visit Completed',
            amount: '$12,500',
            lastContact: '2026-02-04',
            daysSinceContact: 5,
            nextAction: 'Send formal quote',
            urgency: 'medium',
            automatedMessage: {
                subject: 'Your Driveway Paving Quote',
                preview: 'Hi Susan, Thank you for meeting with us last week. Based on our site visit...',
                scheduled: '2026-02-09 02:00 PM'
            },
            owner: 'Sarah Miller'
        },
        {
            dealId: 'DEAL-8792',
            dealName: 'King of Prussia Office Park',
            contact: 'James Wilson',
            company: 'KOP Property Management',
            stage: 'Negotiation',
            amount: '$890,000',
            lastContact: '2026-02-07',
            daysSinceContact: 2,
            nextAction: 'Price negotiation follow-up',
            urgency: 'low',
            automatedMessage: null, // Within SLA, no automation needed yet
            owner: 'Tom Richards'
        }
    ],

    // Competitor intelligence
    competitors: [
        {
            name: 'ABC Paving',
            recentWins: 12,
            recentLosses: 8,
            avgBidDifference: '-12%', // They're typically 12% lower
            specialties: ['Municipal contracts', 'Large-scale milling'],
            lastEncounter: {
                project: 'Route 30 Resurfacing',
                outcome: 'Loss',
                theirBid: '$1,125,000',
                ourBid: '$1,280,000',
                reason: 'Price'
            },
            impactedDeals: ['DEAL-8827'] // Easttown Township - they're current contractor
        },
        {
            name: 'Premier Asphalt',
            recentWins: 5,
            recentLosses: 15,
            avgBidDifference: '+8%',
            specialties: ['Commercial parking lots', 'Premium finishes'],
            lastEncounter: {
                project: 'Valley Forge Business Park',
                outcome: 'Win',
                theirBid: '$348,000',
                ourBid: '$320,000',
                reason: 'Price + Timeline'
            },
            impactedDeals: []
        }
    ],

    // Weather and scheduling data
    schedule: {
        today: '2026-02-09',
        crews: [
            {
                id: 'CREW-1',
                name: 'Paving Crew A',
                foreman: 'Joe Martinez',
                size: 6,
                assignments: [
                    {
                        jobId: 'JOB-445',
                        jobName: 'Exton Shopping Center',
                        location: 'Exton, PA',
                        type: 'Commercial Paving',
                        scheduledStart: '8:00 AM',
                        estimatedDuration: '4 hours',
                        status: 'Active',
                        weather: { temp: 52, condition: 'Cloudy', precipitation: 10 }
                    },
                    {
                        jobId: 'JOB-448',
                        jobName: 'Media Office Park',
                        location: 'Media, PA',
                        type: 'Parking Lot Overlay',
                        scheduledStart: '1:00 PM',
                        estimatedDuration: '3 hours',
                        status: 'Scheduled',
                        weather: { temp: 54, condition: 'Partly Cloudy', precipitation: 5 }
                    }
                ]
            },
            {
                id: 'CREW-2',
                name: 'Milling Crew',
                foreman: 'Mike Sullivan',
                size: 4,
                assignments: [
                    {
                        jobId: 'JOB-447',
                        jobName: 'Route 30 Section 2',
                        location: 'Frazer, PA',
                        type: 'Road Milling',
                        scheduledStart: '7:00 AM',
                        estimatedDuration: '8 hours',
                        status: 'Active',
                        weather: { temp: 51, condition: 'Cloudy', precipitation: 15 }
                    }
                ]
            },
            {
                id: 'CREW-3',
                name: 'Residential Crew',
                foreman: 'Tom Chen',
                size: 3,
                assignments: [
                    {
                        jobId: 'JOB-449',
                        jobName: 'Driveway - 456 Maple Ave',
                        location: 'Newtown Square, PA',
                        type: 'Residential Driveway',
                        scheduledStart: '9:00 AM',
                        estimatedDuration: '5 hours',
                        status: 'Delayed',
                        weather: { temp: 50, condition: 'Rain Expected', precipitation: 85 },
                        alert: 'WEATHER DELAY - Rain forecasted 11am-3pm'
                    }
                ]
            }
        ],
        weatherAlerts: [
            {
                severity: 'warning',
                message: 'Rain expected 11am-3pm, 85% probability',
                affectedJobs: ['JOB-449'],
                recommendation: 'Reschedule residential driveway work',
                automatedActions: [
                    'Customer SMS sent: "Weather delay expected today. Reschedule to Fri 2/14?"',
                    'Crew reassigned to indoor equipment maintenance',
                    'HubSpot task created: Confirm new date with customer'
                ]
            }
        ]
    },

    // Dashboard stats
    stats: {
        activeBids: 12,
        avgResponseTime: '2.3 days',
        winRate: '42%',
        pipelineValue: '$8.2M',
        followUpsPending: 8,
        overdueFollowUps: 2,
        enrichedContacts: 247,
        automatedActions: 156
    }
};

// Export for use in app.js
window.demoData = demoData;
