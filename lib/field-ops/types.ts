export interface CrewMember {
  name: string
  role: string
}

export interface Crew {
  id: string
  name: string
  type: "Paving" | "Milling" | "Striping" | "Sealcoat" | "Concrete"
  foreman: string
  members: CrewMember[]
  color: string
}

export interface MaintenanceWindow {
  startDate: string
  endDate: string
  reason: string
}

export interface Equipment {
  id: string
  tag: string
  name: string
  model: string
  category: "paver" | "roller" | "mill" | "truck" | "striping" | "support"
  totalHours: number
  lastServiceDate: string
  nextServiceDue: string
  assignedOperator: string
  maintenanceWindows: MaintenanceWindow[]
}

export interface Job {
  id: string
  customer: string
  location: string
  scope: string
  sqFt: number
  tons: number
  bidValue: number
  startDate: string
  duration: number
  crewId: string
  equipmentIds: string[]
  dependsOn: string | null
  status: "scheduled" | "in-progress" | "completed" | "weather-hold"
  weatherRisk: "none" | "low" | "high"
}

export interface Conflict {
  crewId: string
  jobIds: [string, string]
}

export interface AiSuggestion {
  id: string
  action: string
  reasoning: string
  from: { jobId: string; crewId: string }
  to: { crewId: string; startDate?: string }
}
