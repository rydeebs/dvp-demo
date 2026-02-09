// Main application logic
const app = {
    currentView: 'dashboard',
    
    init() {
        this.setupNavigation();
        this.renderView('dashboard');
    },
    
    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                
                // Update active state
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Render view
                this.renderView(view);
            });
        });
    },
    
    renderView(viewName) {
        this.currentView = viewName;
        const contentArea = document.getElementById('content-area');
        const pageTitle = document.getElementById('page-title');
        
        const views = {
            'dashboard': this.renderDashboard,
            'hubspot-native': this.renderHubSpotNative,
            'enrichment': this.renderEnrichment,
            'rfp-router': this.renderRFPRouter,
            'estimator': this.renderEstimator,
            'followup': this.renderFollowUp,
            'competitor': this.renderCompetitor,
            'scheduler': this.renderScheduler
        };
        
        const titles = {
            'dashboard': 'Automation Dashboard',
            'hubspot-native': 'HubSpot Native Data',
            'enrichment': 'Data Enrichment',
            'rfp-router': 'RFP Alert Router',
            'estimator': 'Bid Auto-Estimator',
            'followup': 'Follow-Up Automation',
            'competitor': 'Competitor Intelligence',
            'scheduler': 'Weather & Crew Scheduler'
        };
        
        pageTitle.textContent = titles[viewName];
        contentArea.innerHTML = views[viewName].call(this);
    },
    
    renderDashboard() {
        const data = window.demoData;
        return `
            <div class="alert alert-info">
                <i class="fas fa-info-circle"></i>
                <div class="alert-content">
                    <div class="alert-title">CEO Demo Mode Active</div>
                    This dashboard demonstrates the automation layer built on top of HubSpot. 
                    All data shown is synchronized with HubSpot in real-time.
                </div>
            </div>

            <div class="grid grid-4">
                <div class="stat-card">
                    <div class="stat-label">Active Bids</div>
                    <div class="stat-value">${data.stats.activeBids}</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+3 this week</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-label">Pipeline Value</div>
                    <div class="stat-value">${data.stats.pipelineValue}</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>+12% vs last month</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-label">Win Rate</div>
                    <div class="stat-value">${data.stats.winRate}</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>Above industry avg (35%)</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-label">Avg Response Time</div>
                    <div class="stat-value">${data.stats.avgResponseTime}</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-down"></i>
                        <span>-40% with automation</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <div class="card-header">
                        <div>
                            <div class="card-title">Recent RFPs (Auto-Routed)</div>
                            <div class="card-subtitle">Last 24 hours • Synced to HubSpot</div>
                        </div>
                        <span class="card-badge" style="background: #dbeafe; color: #2563eb;">AUTO</span>
                    </div>
                    
                    ${data.rfps.slice(0, 3).map(rfp => `
                        <div style="padding: 16px; border: 1px solid var(--gray-200); border-radius: 8px; margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                                <div>
                                    <div style="font-weight: 600; color: var(--gray-900);">${rfp.title}</div>
                                    <div style="font-size: 13px; color: var(--gray-700); margin-top: 4px;">
                                        ${rfp.client} • ${rfp.estimatedValue}
                                    </div>
                                </div>
                                <span class="status ${rfp.priority}-priority">
                                    <span class="status-dot"></span>
                                    ${rfp.priority.toUpperCase()}
                                </span>
                            </div>
                            <div style="font-size: 12px; color: var(--gray-700); margin-top: 12px;">
                                <strong>Auto-Score:</strong> ${rfp.autoScore}/100 • 
                                <strong>Assigned:</strong> ${rfp.assignedTo} • 
                                <strong>HubSpot Deal:</strong> ${rfp.hubspotDeal}
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="integration-note">
                        <strong>🔄 HubSpot Integration:</strong>
                        RFPs automatically create deals, assign owners, and schedule site walks in HubSpot
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <div>
                            <div class="card-title">Follow-Ups Pending</div>
                            <div class="card-subtitle">${data.followUps.length} deals need attention</div>
                        </div>
                        <span class="card-badge" style="background: #dbeafe; color: #2563eb;">AUTO</span>
                    </div>
                    
                    ${data.followUps.slice(0, 3).map(deal => `
                        <div style="padding: 16px; border: 1px solid var(--gray-200); border-radius: 8px; margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <div>
                                    <div style="font-weight: 600;">${deal.dealName}</div>
                                    <div style="font-size: 13px; color: var(--gray-700);">${deal.contact} • ${deal.amount}</div>
                                </div>
                                <span class="status ${deal.urgency}-priority">
                                    <span class="status-dot"></span>
                                    ${deal.urgency.toUpperCase()}
                                </span>
                            </div>
                            <div style="font-size: 12px; color: var(--gray-700); background: var(--gray-50); padding: 8px; border-radius: 4px; margin-top: 8px;">
                                <strong>Last contact:</strong> ${deal.daysSinceContact} days ago<br>
                                <strong>Next action:</strong> ${deal.nextAction}
                            </div>
                            ${deal.automatedMessage ? `
                                <div style="margin-top: 8px; font-size: 12px; color: var(--primary);">
                                    <i class="fas fa-envelope"></i> Automated email scheduled for ${deal.automatedMessage.scheduled}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                    
                    <div class="integration-note">
                        <strong>🔄 HubSpot Integration:</strong>
                        Follow-up emails logged as activities, tasks created for manual review
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Today's Operations</div>
                        <div class="card-subtitle">Weather-aware scheduling • Synced to HubSpot deals</div>
                    </div>
                    <span class="card-badge" style="background: #d1fae5; color: #059669;">OPS</span>
                </div>
                
                ${data.schedule.weatherAlerts.length > 0 ? `
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div class="alert-content">
                            <div class="alert-title">Weather Alert</div>
                            ${data.schedule.weatherAlerts[0].message}<br><br>
                            <strong>Automated actions:</strong>
                            <ul style="margin: 8px 0 0 20px;">
                                ${data.schedule.weatherAlerts[0].automatedActions.map(action => `<li>${action}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                ` : ''}
                
                <div class="grid grid-3">
                    ${data.schedule.crews.map(crew => `
                        <div style="padding: 16px; border: 1px solid var(--gray-200); border-radius: 8px;">
                            <div style="font-weight: 600; margin-bottom: 8px;">${crew.name}</div>
                            <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 12px;">
                                Foreman: ${crew.foreman} • ${crew.size} workers
                            </div>
                            ${crew.assignments.map(job => `
                                <div style="background: var(--gray-50); padding: 8px; border-radius: 4px; margin-bottom: 8px; font-size: 12px;">
                                    <div style="font-weight: 600;">${job.jobName}</div>
                                    <div style="color: var(--gray-700); margin-top: 4px;">
                                        ${job.scheduledStart} • ${job.estimatedDuration}
                                    </div>
                                    ${job.alert ? `
                                        <div style="color: #d97706; margin-top: 4px;">
                                            <i class="fas fa-exclamation-circle"></i> ${job.alert}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    renderHubSpotNative() {
        return `
            <div class="alert alert-info">
                <i class="fas fa-database"></i>
                <div class="alert-content">
                    <div class="alert-title">HubSpot Native Capabilities</div>
                    This view shows what HubSpot provides out-of-the-box, before our automation layer adds intelligence.
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">What HubSpot Provides (Native)</div>
                </div>
                
                <div class="grid grid-2">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--gray-900);">
                            ✅ HubSpot Strengths
                        </h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 12px; background: var(--gray-50); border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-check-circle" style="color: var(--success);"></i>
                                <strong>Contact & Company Management</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Centralized database for all contacts, companies, and relationships
                                </span>
                            </li>
                            <li style="padding: 12px; background: var(--gray-50); border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-check-circle" style="color: var(--success);"></i>
                                <strong>Deal Pipeline</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Visual pipeline management with customizable stages
                                </span>
                            </li>
                            <li style="padding: 12px; background: var(--gray-50); border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-check-circle" style="color: var(--success);"></i>
                                <strong>Email Tracking</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Track opens, clicks, and engagement on emails
                                </span>
                            </li>
                            <li style="padding: 12px; background: var(--gray-50); border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-check-circle" style="color: var(--success);"></i>
                                <strong>Simple Workflows</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Basic automation: send email, create task, update property
                                </span>
                            </li>
                            <li style="padding: 12px; background: var(--gray-50); border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-check-circle" style="color: var(--success);"></i>
                                <strong>Reporting Dashboard</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Standard reports on pipeline, activity, and performance
                                </span>
                            </li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: var(--gray-900);">
                            ⚠️ HubSpot Limitations
                        </h3>
                        <ul style="list-style: none; padding: 0;">
                            <li style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-times-circle" style="color: #d97706;"></i>
                                <strong>No Context-Aware Logic</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Can't auto-score RFPs based on location, size, timing, and client history
                                </span>
                            </li>
                            <li style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-times-circle" style="color: #d97706;"></i>
                                <strong>No External Data Integration</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Can't pull weather data, competitor bids, or municipal records
                                </span>
                            </li>
                            <li style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-times-circle" style="color: #d97706;"></i>
                                <strong>No Cross-System Orchestration</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Can't coordinate between CRM, scheduling, and operations
                                </span>
                            </li>
                            <li style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-times-circle" style="color: #d97706;"></i>
                                <strong>Linear Workflows Only</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Can't make complex decisions: "If weather bad AND job outdoor, then reschedule"
                                </span>
                            </li>
                            <li style="padding: 12px; background: #fef3c7; border-radius: 8px; margin-bottom: 8px;">
                                <i class="fas fa-times-circle" style="color: #d97706;"></i>
                                <strong>Manual Data Entry</strong><br>
                                <span style="font-size: 13px; color: var(--gray-700);">
                                    Reps must manually enrich contacts, classify leads, estimate values
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">What Our Automation Layer Adds</div>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 32px; border-radius: 12px;">
                    <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 24px;">
                        Intelligence Layer on Top of HubSpot
                    </h3>
                    
                    <div class="grid grid-3">
                        <div>
                            <div style="font-size: 32px; margin-bottom: 8px;">🎯</div>
                            <div style="font-weight: 600; margin-bottom: 4px;">Smart Routing</div>
                            <div style="font-size: 13px; opacity: 0.9;">
                                Auto-score and route RFPs based on business logic HubSpot can't understand
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 32px; margin-bottom: 8px;">🔄</div>
                            <div style="font-weight: 600; margin-bottom: 4px;">Cross-System Orchestration</div>
                            <div style="font-size: 13px; opacity: 0.9;">
                                Connect CRM + Weather + Scheduling + Competitor Data in real-time
                            </div>
                        </div>
                        <div>
                            <div style="font-size: 32px; margin-bottom: 8px;">🤖</div>
                            <div style="font-weight: 600; margin-bottom: 4px;">Proactive Actions</div>
                            <div style="font-size: 13px; opacity: 0.9;">
                                Auto-draft estimates, reschedule for weather, send competitor alerts
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Data Flow: HubSpot ↔ Automation Layer</div>
                </div>
                
                <div style="background: var(--gray-50); padding: 24px; border-radius: 8px;">
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-time">Step 1: Pull from HubSpot</div>
                            <div class="timeline-content">
                                <strong>Contacts:</strong> name, email, phone, company, lifecycle stage<br>
                                <strong>Deals:</strong> stage, amount, close date, owner<br>
                                <strong>Activities:</strong> calls, emails, meetings
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-time">Step 2: Enrich with External Data</div>
                            <div class="timeline-content">
                                Company size, property type, estimated project value, decision timeline, competitor presence, weather forecasts
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-time">Step 3: Apply Business Logic</div>
                            <div class="timeline-content">
                                Score opportunities, route to right owner, draft estimates, flag risks, schedule actions
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="timeline-time">Step 4: Push Back to HubSpot</div>
                            <div class="timeline-content">
                                <strong>Create:</strong> deals, tasks, notes<br>
                                <strong>Update:</strong> custom properties, deal stages<br>
                                <strong>Log:</strong> all automated activities for audit trail
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Continue in next file due to length...
    renderEnrichment() {
        const data = window.demoData;
        return `
            <div class="alert alert-info">
                <i class="fas fa-magic"></i>
                <div class="alert-content">
                    <div class="alert-title">Automated Data Enrichment</div>
                    Contacts and companies are automatically enriched with missing data, then synced back to HubSpot custom properties.
                </div>
            </div>

            <div class="grid grid-4">
                <div class="stat-card">
                    <div class="stat-label">Contacts Enriched</div>
                    <div class="stat-value">${data.stats.enrichedContacts}</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>Last 30 days</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-label">Fields Auto-Filled</div>
                    <div class="stat-value">1,847</div>
                    <div class="stat-change positive">
                        <i class="fas fa-check"></i>
                        <span>Data quality improved</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-label">Time Saved</div>
                    <div class="stat-value">~32hrs</div>
                    <div class="stat-change positive">
                        <i class="fas fa-clock"></i>
                        <span>Per month</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-label">Data Completeness</div>
                    <div class="stat-value">94%</div>
                    <div class="stat-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>From 61% manual</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">Recently Enriched Contacts</div>
                        <div class="card-subtitle">Auto-synced to HubSpot custom properties</div>
                    </div>
                </div>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Contact</th>
                                <th>Company</th>
                                <th>HubSpot Stage</th>
                                <th>Enriched Data</th>
                                <th>Missing Fields</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.contacts.map(contact => `
                                <tr>
                                    <td>
                                        <div style="font-weight: 600;">${contact.name}</div>
                                        <div style="font-size: 12px; color: var(--gray-700);">${contact.email}</div>
                                    </td>
                                    <td>${contact.company || '<span style="color: var(--gray-700);">—</span>'}</td>
                                    <td><span class="status low-priority">${contact.lifecycleStage}</span></td>
                                    <td>
                                        <div style="font-size: 12px;">
                                            <strong>Type:</strong> ${contact.enriched.jobType}<br>
                                            <strong>Value:</strong> ${contact.enriched.estimatedValue}<br>
                                            <strong>Size:</strong> ${contact.enriched.squareFootage.toLocaleString()} sq ft
                                        </div>
                                    </td>
                                    <td>
                                        ${contact.missingFields.length > 0 ? `
                                            <div style="font-size: 12px; color: #d97706;">
                                                <i class="fas fa-exclamation-triangle"></i>
                                                ${contact.missingFields.join(', ')}
                                            </div>
                                        ` : '<span style="color: var(--success);"><i class="fas fa-check-circle"></i> Complete</span>'}
                                    </td>
                                    <td style="font-size: 12px;">${contact.enriched.lastEnriched}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div class="integration-note">
                    <strong>🔄 HubSpot Integration:</strong>
                    Enriched data is written to custom properties: "Job Type", "Estimated Value", "Property Type", "Square Footage"
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Enrichment Process</div>
                </div>
                
                <div style="background: var(--gray-50); padding: 24px; border-radius: 8px;">
                    <div class="grid grid-3">
                        <div>
                            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--gray-900);">
                                1. Data Sources
                            </div>
                            <ul style="font-size: 13px; color: var(--gray-700); list-style: none; padding: 0;">
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> Property records</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> LinkedIn company data</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> Google Maps (for size)</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> Industry databases</li>
                            </ul>
                        </div>
                        
                        <div>
                            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--gray-900);">
                                2. Classification
                            </div>
                            <ul style="font-size: 13px; color: var(--gray-700); list-style: none; padding: 0;">
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> Residential vs Commercial</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> Job type estimation</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> Project size calculation</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-check" style="color: var(--success);"></i> Value estimation</li>
                            </ul>
                        </div>
                        
                        <div>
                            <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--gray-900);">
                                3. HubSpot Sync
                            </div>
                            <ul style="font-size: 13px; color: var(--gray-700); list-style: none; padding: 0;">
                                <li style="margin-bottom: 8px;"><i class="fas fa-sync" style="color: var(--primary);"></i> Update custom properties</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-sync" style="color: var(--primary);"></i> Create enrichment log note</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-sync" style="color: var(--primary);"></i> Trigger HubSpot workflows</li>
                                <li style="margin-bottom: 8px;"><i class="fas fa-sync" style="color: var(--primary);"></i> Update deal properties</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderRFPRouter() {
        const data = window.demoData;
        return `
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i>
                <div class="alert-content">
                    <div class="alert-title">RFP Router Active</div>
                    ${data.rfps.length} RFPs processed in last 48 hours. All automatically scored, routed, and logged in HubSpot.
                </div>
            </div>

            ${data.rfps.map(rfp => `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <div class="card-title">${rfp.title}</div>
                            <div class="card-subtitle">
                                ${rfp.client} • Received ${rfp.receivedDate} via ${rfp.source}
                            </div>
                        </div>
                        <span class="status ${rfp.priority}-priority">
                            <span class="status-dot"></span>
                            Score: ${rfp.autoScore}/100
                        </span>
                    </div>
                    
                    <div class="grid grid-2">
                        <div>
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Project Details</h4>
                            <div style="font-size: 13px; line-height: 1.8;">
                                <strong>Scope:</strong> ${rfp.scope}<br>
                                <strong>Estimated Value:</strong> ${rfp.estimatedValue}<br>
                                <strong>Bid Due:</strong> ${rfp.dueDate}<br>
                                <strong>Status:</strong> ${rfp.status}
                            </div>
                        </div>
                        
                        <div>
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Auto-Score Breakdown</h4>
                            <div style="font-size: 13px;">
                                ${Object.entries(rfp.scoreBreakdown).map(([key, value]) => `
                                    <div style="margin-bottom: 8px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                            <span style="text-transform: capitalize;">${key.replace('_', ' ')}</span>
                                            <strong>${value}/100</strong>
                                        </div>
                                        <div style="background: var(--gray-200); height: 6px; border-radius: 3px; overflow: hidden;">
                                            <div style="background: ${value >= 90 ? 'var(--success)' : value >= 70 ? 'var(--warning)' : 'var(--danger)'}; height: 100%; width: ${value}%;"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--gray-200);">
                        <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Automated Actions</h4>
                        <div class="timeline">
                            ${rfp.actions.map(action => `
                                <div class="timeline-item">
                                    <div class="timeline-time">${action.timestamp}</div>
                                    <div class="timeline-content">
                                        ${action.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        ${action.hubspot ? '<span style="color: var(--primary); font-weight: 600;"> • Logged in HubSpot</span>' : '<span style="color: var(--gray-700);"> • Internal only</span>'}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="integration-note">
                        <strong>🔄 HubSpot Integration:</strong>
                        Created deal "${rfp.hubspotDeal}", assigned to ${rfp.assignedTo}, scheduled site walk, added score to deal properties
                    </div>
                    
                    <div style="margin-top: 16px; display: flex; gap: 12px;">
                        <button class="btn btn-primary btn-small">
                            <i class="fas fa-external-link-alt"></i>
                            View in HubSpot
                        </button>
                        <button class="btn btn-secondary btn-small">
                            <i class="fas fa-file-pdf"></i>
                            Download RFP
                        </button>
                    </div>
                </div>
            `).join('')}
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Scoring Logic</div>
                </div>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px;">
                    <div class="grid grid-4">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px;">Location (0-100)</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li>• 0-10 miles: 100</li>
                                <li>• 10-25 miles: 85</li>
                                <li>• 25-50 miles: 60</li>
                                <li>• 50+ miles: 30</li>
                            </ul>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px;">Project Size (0-100)</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li>• $100K-$2M: 100</li>
                                <li>• $50K-$100K: 80</li>
                                <li>• $2M-$5M: 70</li>
                                <li>• < $50K or > $5M: 40</li>
                            </ul>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px;">Timing (0-100)</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li>• Apr-Oct start: 100</li>
                                <li>• Nov-Dec start: 70</li>
                                <li>• Jan-Mar start: 50</li>
                                <li>• Emergency: 40</li>
                            </ul>
                        </div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 8px;">Client (0-100)</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li>• Existing: 100</li>
                                <li>• Municipal: 90</li>
                                <li>• Referral: 80</li>
                                <li>• Cold: 60</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderEstimator() {
        return `
            <div class="alert alert-warning">
                <i class="fas fa-calculator"></i>
                <div class="alert-content">
                    <div class="alert-title">Assistive Tool - Not Final Pricing</div>
                    Auto-estimator provides rough order of magnitude for initial qualification. Final bids require estimator review.
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Quick Estimate Generator</div>
                </div>
                
                <div class="grid grid-2">
                    <div>
                        <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 16px;">Input Parameters</h4>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Project Type</label>
                            <select style="width: 100%; padding: 10px; border: 1px solid var(--gray-300); border-radius: 6px;">
                                <option>Commercial Parking Lot</option>
                                <option>Residential Driveway</option>
                                <option>Road Milling & Overlay</option>
                                <option>Sealcoating</option>
                                <option>Crack Filling</option>
                            </select>
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Square Footage</label>
                            <input type="number" value="35000" style="width: 100%; padding: 10px; border: 1px solid var(--gray-300); border-radius: 6px;">
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Milling Depth (inches)</label>
                            <input type="number" value="2" step="0.5" style="width: 100%; padding: 10px; border: 1px solid var(--gray-300); border-radius: 6px;">
                        </div>
                        
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Overlay Thickness (inches)</label>
                            <input type="number" value="3" step="0.5" style="width: 100%; padding: 10px; border: 1px solid var(--gray-300); border-radius: 6px;">
                        </div>
                        
                        <button class="btn btn-primary" style="width: 100%;">
                            <i class="fas fa-calculator"></i>
                            Generate Estimate
                        </button>
                    </div>
                    
                    <div style="background: var(--gray-50); padding: 20px; border-radius: 8px;">
                        <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 16px;">Preliminary Estimate</h4>
                        
                        <div style="font-size: 24px; font-weight: 700; color: var(--primary); margin-bottom: 20px;">
                            $187,500 - $212,300
                        </div>
                        
                        <div style="font-size: 13px; line-height: 2;">
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--gray-200);">
                                <span>Milling (583 tons @ $45/ton)</span>
                                <strong>$26,235</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--gray-200);">
                                <span>Asphalt (972 tons @ $95/ton)</span>
                                <strong>$92,340</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--gray-200);">
                                <span>Labor (280 hrs @ $85/hr)</span>
                                <strong>$23,800</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--gray-200);">
                                <span>Equipment (5 days @ $2,200/day)</span>
                                <strong>$11,000</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--gray-200);">
                                <span>Overhead (15%)</span>
                                <strong>$23,006</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; padding: 8px 0; font-weight: 600; color: var(--gray-900);">
                                <span>Subtotal + Profit (12%)</span>
                                <strong>$199,900</strong>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 6px; font-size: 12px;">
                            <strong>⚠️ Confidence: Medium</strong><br>
                            Estimate based on avg costs from last 6 similar projects. Final pricing requires site visit and detailed scope review.
                        </div>
                        
                        <button class="btn btn-secondary" style="width: 100%; margin-top: 16px;">
                            <i class="fas fa-save"></i>
                            Save to HubSpot Deal Notes
                        </button>
                    </div>
                </div>
                
                <div class="integration-note">
                    <strong>🔄 HubSpot Integration:</strong>
                    Estimate saved as deal note with timestamp, assumptions, and "Preliminary - Not Final" disclaimer
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Recent Auto-Estimates</div>
                </div>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Deal</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Auto-Estimate</th>
                                <th>Status</th>
                                <th>Generated</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div style="font-weight: 600;">Route 202 Resurfacing</div>
                                    <div style="font-size: 12px; color: var(--gray-700);">DEAL-8829</div>
                                </td>
                                <td>Road Overlay</td>
                                <td>134,400 sq ft</td>
                                <td style="font-weight: 600;">$420K - $480K</td>
                                <td><span class="status completed">Reviewed</span></td>
                                <td style="font-size: 12px;">Feb 9, 8:30 AM</td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="font-weight: 600;">Malvern Corporate Center</div>
                                    <div style="font-size: 12px; color: var(--gray-700);">DEAL-8830</div>
                                </td>
                                <td>Sealcoating</td>
                                <td>82,000 sq ft</td>
                                <td style="font-weight: 600;">$165K - $190K</td>
                                <td><span class="status medium-priority">Pending Review</span></td>
                                <td style="font-size: 12px;">Feb 9, 11:50 AM</td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="font-weight: 600;">Residential - Oak Lane</div>
                                    <div style="font-size: 12px; color: var(--gray-700);">DEAL-8815</div>
                                </td>
                                <td>Driveway</td>
                                <td>1,200 sq ft</td>
                                <td style="font-weight: 600;">$8K - $9.5K</td>
                                <td><span class="status completed">Quote Sent</span></td>
                                <td style="font-size: 12px;">Feb 4, 2:15 PM</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },

    renderFollowUp() {
        const data = window.demoData;
        return `
            <div class="alert ${data.stats.overdueFollowUps > 0 ? 'alert-warning' : 'alert-success'}">
                <i class="fas ${data.stats.overdueFollowUps > 0 ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i>
                <div class="alert-content">
                    <div class="alert-title">${data.stats.followUpsPending} Follow-Ups Pending</div>
                    ${data.stats.overdueFollowUps > 0 ? 
                        `${data.stats.overdueFollowUps} overdue • Automated emails will be sent today` :
                        'All follow-ups on schedule • No manual intervention needed'
                    }
                </div>
            </div>

            ${data.followUps.map(deal => `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <div class="card-title">${deal.dealName}</div>
                            <div class="card-subtitle">
                                ${deal.contact} ${deal.company ? `• ${deal.company}` : ''} • ${deal.owner}
                            </div>
                        </div>
                        <span class="status ${deal.urgency}-priority">
                            <span class="status-dot"></span>
                            ${deal.daysSinceContact} days since contact
                        </span>
                    </div>
                    
                    <div class="grid grid-2">
                        <div>
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Deal Status</h4>
                            <div style="font-size: 13px; line-height: 1.8;">
                                <strong>Stage:</strong> ${deal.stage}<br>
                                <strong>Amount:</strong> ${deal.amount}<br>
                                <strong>Last Contact:</strong> ${deal.lastContact}<br>
                                <strong>Next Action:</strong> ${deal.nextAction}
                            </div>
                        </div>
                        
                        ${deal.automatedMessage ? `
                            <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border: 2px solid var(--primary);">
                                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                                    <i class="fas fa-robot" style="color: var(--primary); font-size: 20px;"></i>
                                    <strong style="color: var(--primary);">Automated Follow-Up Ready</strong>
                                </div>
                                <div style="font-size: 13px; margin-bottom: 8px;">
                                    <strong>Subject:</strong><br>
                                    ${deal.automatedMessage.subject}
                                </div>
                                <div style="font-size: 13px; background: white; padding: 12px; border-radius: 4px; margin-bottom: 12px;">
                                    ${deal.automatedMessage.preview}...
                                </div>
                                <div style="font-size: 12px; color: var(--gray-700);">
                                    <i class="fas fa-clock"></i> Scheduled: ${deal.automatedMessage.scheduled}
                                </div>
                            </div>
                        ` : `
                            <div style="background: var(--gray-50); padding: 16px; border-radius: 8px;">
                                <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 12px;">
                                    <i class="fas fa-check-circle" style="color: var(--success);"></i>
                                    <strong>Within SLA - No Automation Needed</strong>
                                </div>
                                <div style="font-size: 13px;">
                                    Last contact was ${deal.daysSinceContact} days ago. 
                                    Automation triggers after 7 days for ${deal.stage} stage.
                                </div>
                            </div>
                        `}
                    </div>
                    
                    ${deal.automatedMessage ? `
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--gray-200);">
                            <div style="display: flex; gap: 12px;">
                                <button class="btn btn-primary">
                                    <i class="fas fa-paper-plane"></i>
                                    Approve & Send Now
                                </button>
                                <button class="btn btn-secondary">
                                    <i class="fas fa-edit"></i>
                                    Edit Message
                                </button>
                                <button class="btn btn-secondary">
                                    <i class="fas fa-ban"></i>
                                    Skip This Follow-Up
                                </button>
                            </div>
                        </div>
                        
                        <div class="integration-note" style="margin-top: 16px;">
                            <strong>🔄 HubSpot Integration:</strong>
                            When sent, email will be logged as activity, deal stage updated to "Follow-Up Sent", task created for ${deal.owner} to track response
                        </div>
                    ` : ''}
                </div>
            `).join('')}

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Follow-Up Automation Rules</div>
                </div>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px;">
                    <div class="grid grid-3">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 12px; color: var(--gray-900);">By Deal Stage</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li style="margin-bottom: 8px;">
                                    <strong>Quote Sent:</strong> Follow up after 5 days
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <strong>Site Visit Done:</strong> Send quote within 3 days
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <strong>Negotiation:</strong> Check in after 7 days
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <strong>Decision Pending:</strong> Weekly reminders
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 12px; color: var(--gray-900);">By Deal Value</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li style="margin-bottom: 8px;">
                                    <strong>> $500K:</strong> Manual review required
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <strong>$100K - $500K:</strong> Auto + approval
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <strong>< $100K:</strong> Fully automated
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 12px; color: var(--gray-900);">Escalation</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li style="margin-bottom: 8px;">
                                    <strong>14 days:</strong> Alert sales manager
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <strong>21 days:</strong> Suggest closing as lost
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <strong>30 days:</strong> Auto-close if no response
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    renderCompetitor() {
        const data = window.demoData;
        return `
            <div class="alert alert-info">
                <i class="fas fa-users"></i>
                <div class="alert-content">
                    <div class="alert-title">Competitive Intelligence Active</div>
                    Tracking ${data.competitors.length} key competitors across municipal bids and commercial contracts.
                </div>
            </div>

            ${data.competitors.map(competitor => `
                <div class="card">
                    <div class="card-header">
                        <div>
                            <div class="card-title">${competitor.name}</div>
                            <div class="card-subtitle">
                                ${competitor.recentWins} wins • ${competitor.recentLosses} losses • Last 12 months
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 24px; font-weight: 700; color: ${competitor.avgBidDifference.startsWith('-') ? 'var(--danger)' : 'var(--success)'};">
                                ${competitor.avgBidDifference}
                            </div>
                            <div style="font-size: 12px; color: var(--gray-700);">Avg vs Our Bids</div>
                        </div>
                    </div>
                    
                    <div class="grid grid-2">
                        <div>
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Specialties</h4>
                            <div style="display: flex; flex-wrap: gap; gap: 8px;">
                                ${competitor.specialties.map(specialty => `
                                    <span style="background: var(--gray-100); padding: 6px 12px; border-radius: 12px; font-size: 12px; font-weight: 500;">
                                        ${specialty}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div>
                            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Last Direct Competition</h4>
                            <div style="background: var(--gray-50); padding: 12px; border-radius: 8px; font-size: 13px;">
                                <strong>${competitor.lastEncounter.project}</strong><br>
                                <div style="margin-top: 8px; color: var(--gray-700);">
                                    Their Bid: <strong>${competitor.lastEncounter.theirBid}</strong><br>
                                    Our Bid: <strong>${competitor.lastEncounter.ourBid}</strong><br>
                                    Outcome: <span style="color: ${competitor.lastEncounter.outcome === 'Win' ? 'var(--success)' : 'var(--danger)'}; font-weight: 600;">${competitor.lastEncounter.outcome}</span><br>
                                    Reason: ${competitor.lastEncounter.reason}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ${competitor.impactedDeals.length > 0 ? `
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--gray-200);">
                            <div class="alert alert-warning">
                                <i class="fas fa-exclamation-triangle"></i>
                                <div class="alert-content">
                                    <div class="alert-title">Active Competition Alert</div>
                                    ${competitor.name} is the current contractor for ${competitor.impactedDeals.length} deal(s) in your pipeline:
                                    ${competitor.impactedDeals.join(', ')}
                                </div>
                            </div>
                            
                            <div class="integration-note">
                                <strong>🔄 HubSpot Integration:</strong>
                                Competitor flag added to deal notes, alert sent to deal owner, pricing strategy note created
                            </div>
                        </div>
                    ` : ''}
                </div>
            `).join('')}

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Win/Loss Analysis</div>
                </div>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px;">
                    <div style="margin-bottom: 24px;">
                        <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Your Win Rate vs Key Competitors</div>
                        <div style="background: white; padding: 16px; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                <span>vs ABC Paving</span>
                                <strong style="color: var(--warning);">38% (8 of 21 bids)</strong>
                            </div>
                            <div style="background: var(--gray-200); height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="background: var(--warning); height: 100%; width: 38%;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 24px;">
                        <div style="background: white; padding: 16px; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                <span>vs Premier Asphalt</span>
                                <strong style="color: var(--success);">75% (15 of 20 bids)</strong>
                            </div>
                            <div style="background: var(--gray-200); height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="background: var(--success); height: 100%; width: 75%;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="font-size: 13px; color: var(--gray-700); margin-top: 16px;">
                        <strong>Insights:</strong><br>
                        • ABC Paving consistently bids 10-15% lower on large municipal contracts<br>
                        • Consider reducing overhead on projects > $1M to compete<br>
                        • You have strong competitive advantage on commercial parking lots (75% win rate)
                    </div>
                </div>
            </div>
        `;
    },

    renderScheduler() {
        const data = window.demoData.schedule;
        return `
            <div class="alert ${data.weatherAlerts.length > 0 ? 'alert-warning' : 'alert-success'}">
                <i class="fas ${data.weatherAlerts.length > 0 ? 'fa-cloud-rain' : 'fa-sun'}"></i>
                <div class="alert-content">
                    <div class="alert-title">${data.weatherAlerts.length > 0 ? 'Weather Alerts Active' : 'Clear Weather - All Crews Dispatched'}</div>
                    ${data.weatherAlerts.length > 0 ? 
                        `${data.weatherAlerts[0].message} • ${data.weatherAlerts[0].affectedJobs.length} job(s) impacted` :
                        'No weather delays expected today • All schedules on track'
                    }
                </div>
            </div>

            ${data.weatherAlerts.map(alert => `
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                            <i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i>
                            Weather Impact & Automated Response
                        </div>
                    </div>
                    
                    <div style="background: var(--gray-50); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">
                            ${alert.message}
                        </div>
                        <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 16px;">
                            <strong>Recommendation:</strong> ${alert.recommendation}
                        </div>
                        
                        <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Automated Actions Taken:</div>
                        <ul style="font-size: 13px; color: var(--gray-700); margin: 0; padding-left: 20px;">
                            ${alert.automatedActions.map(action => `<li style="margin-bottom: 6px;">${action}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="integration-note">
                        <strong>🔄 HubSpot Integration:</strong>
                        Task created for sales rep to confirm new schedule, deal note updated with delay reason, customer activity logged
                    </div>
                </div>
            `).join('')}

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Today's Crew Schedule - ${data.today}</div>
                </div>
                
                ${data.crews.map(crew => `
                    <div style="margin-bottom: 24px; padding-bottom: 24px; ${crew !== data.crews[data.crews.length - 1] ? 'border-bottom: 1px solid var(--gray-200);' : ''}">
                        <div style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: var(--gray-900);">
                            ${crew.name}
                        </div>
                        <div style="font-size: 13px; color: var(--gray-700); margin-bottom: 16px;">
                            Foreman: ${crew.foreman} • Crew Size: ${crew.size} workers
                        </div>
                        
                        <div class="grid grid-${crew.assignments.length > 2 ? '3' : '2'}">
                            ${crew.assignments.map(job => `
                                <div style="background: ${job.status === 'Delayed' ? '#fef3c7' : 'var(--gray-50)'}; padding: 16px; border-radius: 8px; border: ${job.status === 'Delayed' ? '2px solid var(--warning)' : '1px solid var(--gray-200)'};">
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                                        <div>
                                            <div style="font-weight: 600; margin-bottom: 4px;">${job.jobName}</div>
                                            <div style="font-size: 12px; color: var(--gray-700);">${job.location}</div>
                                        </div>
                                        <span class="status ${job.status === 'Active' ? 'completed' : job.status === 'Scheduled' ? 'low-priority' : 'medium-priority'}">
                                            ${job.status}
                                        </span>
                                    </div>
                                    
                                    <div style="font-size: 13px; margin-bottom: 12px;">
                                        <strong>Type:</strong> ${job.type}<br>
                                        <strong>Start:</strong> ${job.scheduledStart}<br>
                                        <strong>Duration:</strong> ${job.estimatedDuration}
                                    </div>
                                    
                                    <div style="background: white; padding: 8px; border-radius: 4px; font-size: 12px;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                            <span>Weather:</span>
                                            <strong>${job.weather.temp}°F • ${job.weather.condition}</strong>
                                        </div>
                                        <div style="display: flex; justify-content: space-between;">
                                            <span>Rain Chance:</span>
                                            <strong style="color: ${job.weather.precipitation > 50 ? 'var(--danger)' : 'var(--success)'};">${job.weather.precipitation}%</strong>
                                        </div>
                                    </div>
                                    
                                    ${job.alert ? `
                                        <div style="margin-top: 12px; padding: 8px; background: var(--warning); color: white; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                            <i class="fas fa-exclamation-triangle"></i> ${job.alert}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-title">Weather-Driven Business Logic</div>
                </div>
                
                <div style="background: var(--gray-50); padding: 20px; border-radius: 8px;">
                    <div class="grid grid-2">
                        <div>
                            <div style="font-weight: 600; margin-bottom: 12px;">Paving Operations</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li style="margin-bottom: 8px;">
                                    <i class="fas fa-times-circle" style="color: var(--danger);"></i>
                                    <strong>Temp < 45°F:</strong> Delay paving work
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <i class="fas fa-times-circle" style="color: var(--danger);"></i>
                                    <strong>Rain > 40%:</strong> Reschedule outdoor work
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <i class="fas fa-check-circle" style="color: var(--success);"></i>
                                    <strong>Optimal:</strong> 50-85°F, < 20% rain
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <div style="font-weight: 600; margin-bottom: 12px;">Automated Actions</div>
                            <ul style="font-size: 13px; list-style: none; padding: 0; color: var(--gray-700);">
                                <li style="margin-bottom: 8px;">
                                    <i class="fas fa-sms" style="color: var(--primary);"></i>
                                    Text customer with reschedule options
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <i class="fas fa-users" style="color: var(--primary);"></i>
                                    Reassign crew to indoor tasks
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <i class="fas fa-truck" style="color: var(--primary);"></i>
                                    Cancel material deliveries
                                </li>
                                <li style="margin-bottom: 8px;">
                                    <i class="fas fa-clipboard" style="color: var(--primary);"></i>
                                    Update HubSpot deal timeline
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
