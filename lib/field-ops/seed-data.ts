import { Crew, Equipment, Job } from "./types"
import { getMonday, addDays } from "./utils"

export function createSeedCrews(): Crew[] {
  return [
    {
      id: "crew-alpha",
      name: "Crew Alpha",
      type: "Paving",
      foreman: "Mike Davis",
      color: "bg-blue-500",
      members: [
        { name: "Mike Davis", role: "Foreman" },
        { name: "Jake Wilson", role: "Paver Operator" },
        { name: "Ray Thompson", role: "Screedman" },
        { name: "Chris Allen", role: "Rollerman" },
        { name: "Tony Russo", role: "Rollerman" },
        { name: "Brian Foster", role: "Luteman" },
        { name: "Steve Park", role: "Luteman" },
        { name: "Dave Martinez", role: "Traffic Control" },
      ],
    },
    {
      id: "crew-bravo",
      name: "Crew Bravo",
      type: "Milling",
      foreman: "Carlos Reyes",
      color: "bg-amber-500",
      members: [
        { name: "Carlos Reyes", role: "Foreman" },
        { name: "Marco Silva", role: "Mill Operator" },
        { name: "Jeff Brown", role: "Dump Truck Driver" },
        { name: "Rick Santos", role: "Dump Truck Driver" },
        { name: "Al Cooper", role: "Broom/Sweep Op" },
        { name: "Tom Nguyen", role: "Broom/Sweep Op" },
      ],
    },
    {
      id: "crew-charlie",
      name: "Crew Charlie",
      type: "Paving",
      foreman: "Tom Hatch",
      color: "bg-emerald-500",
      members: [
        { name: "Tom Hatch", role: "Foreman" },
        { name: "Bill Murray", role: "Paver Operator" },
        { name: "Sam Wright", role: "Screedman" },
        { name: "Ed Lopez", role: "Rollerman" },
        { name: "Pat Kelly", role: "Rollerman" },
        { name: "Joe Fischer", role: "Luteman" },
      ],
    },
    {
      id: "crew-delta",
      name: "Crew Delta",
      type: "Striping",
      foreman: "Linda Morales",
      color: "bg-purple-500",
      members: [
        { name: "Linda Morales", role: "Foreman" },
        { name: "Kevin Park", role: "Striping Operator" },
        { name: "Danny Ortiz", role: "Layout Tech" },
        { name: "Amy Chen", role: "Traffic Control" },
      ],
    },
    {
      id: "crew-echo",
      name: "Crew Echo",
      type: "Sealcoat",
      foreman: "Jim O'Brien",
      color: "bg-cyan-500",
      members: [
        { name: "Jim O'Brien", role: "Foreman" },
        { name: "Bobby Walsh", role: "Sealcoat Sprayer" },
        { name: "Frank Diaz", role: "Crack Seal Op" },
        { name: "Nate Harris", role: "Laborer" },
        { name: "Leo Tran", role: "Laborer" },
      ],
    },
    {
      id: "crew-foxtrot",
      name: "Crew Foxtrot",
      type: "Concrete",
      foreman: "Pete Sullivan",
      color: "bg-rose-500",
      members: [
        { name: "Pete Sullivan", role: "Foreman" },
        { name: "Gus Romano", role: "Finisher" },
        { name: "Tyler Banks", role: "Form Setter" },
        { name: "Will Jackson", role: "Laborer" },
      ],
    },
  ]
}

export function createSeedEquipment(): Equipment[] {
  return [
    // Pavers
    { id: "P-01", tag: "#P-01", name: "Paver", model: "Caterpillar AP1055F", category: "paver", totalHours: 4280, lastServiceDate: "2026-04-20", nextServiceDue: "2026-06-20", assignedOperator: "Jake Wilson", maintenanceWindows: [] },
    { id: "P-02", tag: "#P-02", name: "Paver", model: "Volvo P7820D", category: "paver", totalHours: 2910, lastServiceDate: "2026-05-01", nextServiceDue: "2026-07-01", assignedOperator: "Bill Murray", maintenanceWindows: [] },
    // Rollers
    { id: "R-01", tag: "#R-01", name: "Steel Wheel Roller", model: "Cat CB10", category: "roller", totalHours: 3150, lastServiceDate: "2026-04-15", nextServiceDue: "2026-06-15", assignedOperator: "Chris Allen", maintenanceWindows: [] },
    { id: "R-02", tag: "#R-02", name: "Pneumatic Roller", model: "Cat CW34", category: "roller", totalHours: 2670, lastServiceDate: "2026-05-05", nextServiceDue: "2026-07-05", assignedOperator: "Tony Russo", maintenanceWindows: [] },
    { id: "R-03", tag: "#R-03", name: "Combo Roller", model: "Hamm HD+ 120i", category: "roller", totalHours: 1820, lastServiceDate: "2026-04-28", nextServiceDue: "2026-06-28", assignedOperator: "Ed Lopez", maintenanceWindows: [] },
    // Mills
    { id: "M-01", tag: "#M-01", name: "Cold Mill (Large)", model: "Wirtgen W 210 Fi", category: "mill", totalHours: 5420, lastServiceDate: "2026-05-08", nextServiceDue: "2026-06-08", assignedOperator: "Marco Silva", maintenanceWindows: [] },
    { id: "M-02", tag: "#M-02", name: "Cold Mill (Small)", model: "Wirtgen W 100 CFi", category: "mill", totalHours: 3870, lastServiceDate: "2026-04-22", nextServiceDue: "2026-06-22", assignedOperator: "Carlos Reyes", maintenanceWindows: [] },
    // Trucks
    { id: "T-01", tag: "#T-01", name: "Tri-Axle Dump", model: "Mack Granite", category: "truck", totalHours: 6200, lastServiceDate: "2026-05-10", nextServiceDue: "2026-07-10", assignedOperator: "Jeff Brown", maintenanceWindows: [] },
    { id: "T-02", tag: "#T-02", name: "Tri-Axle Dump", model: "Mack Granite", category: "truck", totalHours: 5840, lastServiceDate: "2026-05-03", nextServiceDue: "2026-07-03", assignedOperator: "Rick Santos", maintenanceWindows: [] },
    { id: "T-03", tag: "#T-03", name: "Tri-Axle Dump", model: "Mack Granite", category: "truck", totalHours: 4910, lastServiceDate: "2026-04-25", nextServiceDue: "2026-06-25", assignedOperator: "Dave Martinez", maintenanceWindows: [] },
    { id: "T-04", tag: "#T-04", name: "Tri-Axle Dump", model: "Mack Granite", category: "truck", totalHours: 7120, lastServiceDate: "2026-05-12", nextServiceDue: "2026-07-12", assignedOperator: "Joe Fischer", maintenanceWindows: [] },
    { id: "T-05", tag: "#T-05", name: "Tri-Axle Dump", model: "Mack Granite", category: "truck", totalHours: 3580, lastServiceDate: "2026-04-30", nextServiceDue: "2026-06-30", assignedOperator: "Pat Kelly", maintenanceWindows: [] },
    { id: "T-06", tag: "#T-06", name: "Tri-Axle Dump", model: "Mack Granite", category: "truck", totalHours: 4450, lastServiceDate: "2026-05-06", nextServiceDue: "2026-07-06", assignedOperator: "Steve Park", maintenanceWindows: [] },
    // Support
    { id: "TK-01", tag: "#TK-01", name: "Tack Truck", model: "Freightliner M2 106", category: "support", totalHours: 2100, lastServiceDate: "2026-05-02", nextServiceDue: "2026-07-02", assignedOperator: "Brian Foster", maintenanceWindows: [] },
    { id: "SW-01", tag: "#SW-01", name: "Street Sweeper", model: "Elgin Pelican", category: "support", totalHours: 3340, lastServiceDate: "2026-04-18", nextServiceDue: "2026-06-18", assignedOperator: "Al Cooper", maintenanceWindows: [] },
    { id: "WT-01", tag: "#WT-01", name: "Water Truck", model: "Peterbilt 348", category: "support", totalHours: 1980, lastServiceDate: "2026-05-09", nextServiceDue: "2026-07-09", assignedOperator: "Tom Nguyen", maintenanceWindows: [] },
    // Striping
    { id: "ST-01", tag: "#ST-01", name: "Striping Truck", model: "EZ-Liner EZ4000", category: "striping", totalHours: 1540, lastServiceDate: "2026-04-26", nextServiceDue: "2026-06-26", assignedOperator: "Kevin Park", maintenanceWindows: [] },
  ]
}

export function createSeedJobs(): Job[] {
  const w = getMonday()

  // Add maintenance windows after creating equipment
  const maintenanceStart = addDays(w, 19) // Thursday week 3
  const maintenanceEnd = addDays(w, 20)   // Friday week 3

  return [
    // --- WEEK 0 ---
    {
      id: "job-01", customer: "PennDOT District 6-0", location: "Route 202, King of Prussia, PA",
      scope: "Mill 3\"", sqFt: 145000, tons: 0, bidValue: 485000,
      startDate: w, duration: 3, crewId: "crew-bravo",
      equipmentIds: ["M-01", "T-01", "T-02", "SW-01"],
      dependsOn: null, status: "in-progress", weatherRisk: "none",
    },
    {
      id: "job-02", customer: "Lower Merion Township", location: "Township Roads, Ardmore, PA",
      scope: "Overlay 2\"", sqFt: 58000, tons: 3400, bidValue: 195000,
      startDate: w, duration: 4, crewId: "crew-charlie",
      equipmentIds: ["P-02", "R-03", "T-05", "TK-01"],
      dependsOn: null, status: "in-progress", weatherRisk: "low",
    },
    {
      id: "job-03", customer: "PREIT", location: "Retail Plaza, Plymouth Meeting, PA",
      scope: "Crack seal & sealcoat", sqFt: 18000, tons: 0, bidValue: 54000,
      startDate: addDays(w, 1), duration: 2, crewId: "crew-echo",
      equipmentIds: [],
      dependsOn: null, status: "in-progress", weatherRisk: "none",
    },

    // --- WEEK 1 ---
    {
      id: "job-04", customer: "PennDOT District 6-0", location: "Route 202, King of Prussia, PA",
      scope: "Overlay 2\"", sqFt: 145000, tons: 8500, bidValue: 0,
      startDate: addDays(w, 4), duration: 5, crewId: "crew-alpha",
      equipmentIds: ["P-01", "R-01", "R-02", "T-03", "T-04", "TK-01"],
      dependsOn: "job-01", status: "scheduled", weatherRisk: "low",
    },
    {
      id: "job-05", customer: "Villanova University", location: "Parking Lots A & B, Villanova, PA",
      scope: "Mill 2\"", sqFt: 98000, tons: 0, bidValue: 340000,
      startDate: addDays(w, 7), duration: 3, crewId: "crew-bravo",
      equipmentIds: ["M-01", "M-02", "T-01", "T-02", "SW-01"],
      dependsOn: null, status: "scheduled", weatherRisk: "none",
    },
    {
      id: "job-06", customer: "Phoenixville Shopping Center", location: "Bridge St, Phoenixville, PA",
      scope: "Sealcoat", sqFt: 28000, tons: 0, bidValue: 78000,
      startDate: addDays(w, 7), duration: 3, crewId: "crew-echo",
      equipmentIds: [],
      dependsOn: null, status: "scheduled", weatherRisk: "none",
    },

    // --- WEEK 2 ---
    {
      id: "job-07", customer: "Villanova University", location: "Parking Lots A & B, Villanova, PA",
      scope: "Overlay 2.5\"", sqFt: 98000, tons: 5800, bidValue: 0,
      startDate: addDays(w, 11), duration: 4, crewId: "crew-alpha",
      equipmentIds: ["P-01", "R-01", "R-02", "T-03", "T-04", "TK-01"],
      dependsOn: "job-05", status: "scheduled", weatherRisk: "none",
    },
    {
      id: "job-08", customer: "Main Line Health", location: "Medical Campus, Bryn Mawr, PA",
      scope: "Mill 3\" / Overlay 2\"", sqFt: 76000, tons: 4500, bidValue: 275000,
      startDate: addDays(w, 14), duration: 5, crewId: "crew-bravo",
      equipmentIds: ["M-01", "T-01", "T-02", "SW-01"],
      dependsOn: null, status: "scheduled", weatherRisk: "high",
    },
    {
      id: "job-09", customer: "Chesterbrook Corporate Center", location: "Chesterbrook Blvd, Wayne, PA",
      scope: "Striping & signage", sqFt: 32000, tons: 0, bidValue: 38000,
      startDate: addDays(w, 14), duration: 2, crewId: "crew-delta",
      equipmentIds: ["ST-01"],
      dependsOn: null, status: "scheduled", weatherRisk: "none",
    },

    // --- WEEK 3 (intentional conflict for demo) ---
    {
      id: "job-10", customer: "Chester County Industrial Park", location: "Industrial Blvd, West Chester, PA",
      scope: "Mill 2\" / Overlay 2\"", sqFt: 68000, tons: 4000, bidValue: 215000,
      startDate: addDays(w, 18), duration: 5, crewId: "crew-bravo",
      equipmentIds: ["M-01", "T-01", "T-02"],
      dependsOn: null, status: "scheduled", weatherRisk: "none",
    },
    {
      id: "job-11", customer: "Toll Brothers", location: "Residential Community, Downingtown, PA",
      scope: "New construction paving", sqFt: 31000, tons: 1800, bidValue: 92000,
      startDate: addDays(w, 21), duration: 4, crewId: "crew-charlie",
      equipmentIds: ["P-02", "R-03", "T-05", "T-06"],
      dependsOn: null, status: "scheduled", weatherRisk: "none",
    },
    {
      id: "job-12", customer: "Valley Forge Corporate Park", location: "Swedesford Rd, King of Prussia, PA",
      scope: "Overlay 1.5\"", sqFt: 42000, tons: 2500, bidValue: 125000,
      startDate: addDays(w, 18), duration: 3, crewId: "crew-alpha",
      equipmentIds: ["P-01", "R-01", "R-02", "T-03", "TK-01"],
      dependsOn: null, status: "scheduled", weatherRisk: "low",
    },
  ]
}

export function addMaintenanceWindows(equipment: Equipment[]): Equipment[] {
  const w = getMonday()
  const maintStart = addDays(w, 19)
  const maintEnd = addDays(w, 20)

  return equipment.map((e) => {
    if (e.id === "R-03") {
      return { ...e, maintenanceWindows: [{ startDate: maintStart, endDate: maintEnd, reason: "Scheduled 500-hr service" }] }
    }
    if (e.id === "M-02") {
      return { ...e, maintenanceWindows: [{ startDate: addDays(w, 12), endDate: addDays(w, 13), reason: "Drum teeth replacement" }] }
    }
    if (e.id === "T-04") {
      return { ...e, maintenanceWindows: [{ startDate: addDays(w, 25), endDate: addDays(w, 26), reason: "DOT inspection" }] }
    }
    return e
  })
}
