import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Crew, Equipment, Job } from "./types"
import { createSeedCrews, createSeedEquipment, createSeedJobs, addMaintenanceWindows } from "./seed-data"

interface FieldOpsState {
  crews: Crew[]
  equipment: Equipment[]
  jobs: Job[]
  moveJob: (jobId: string, crewId: string, startDate?: string) => void
  moveJobDate: (jobId: string, newStartDate: string) => void
  assignEquipment: (jobId: string, equipmentId: string) => void
  removeEquipment: (jobId: string, equipmentId: string) => void
  updateJobStatus: (jobId: string, status: Job["status"]) => void
  resetData: () => void
}

function createInitialState() {
  return {
    crews: createSeedCrews(),
    equipment: addMaintenanceWindows(createSeedEquipment()),
    jobs: createSeedJobs(),
  }
}

export const useFieldOpsStore = create<FieldOpsState>()(
  persist(
    (set) => ({
      ...createInitialState(),

      moveJob: (jobId, crewId, startDate) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId
              ? { ...j, crewId, ...(startDate ? { startDate } : {}) }
              : j
          ),
        })),

      moveJobDate: (jobId, newStartDate) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId ? { ...j, startDate: newStartDate } : j
          ),
        })),

      assignEquipment: (jobId, equipmentId) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId && !j.equipmentIds.includes(equipmentId)
              ? { ...j, equipmentIds: [...j.equipmentIds, equipmentId] }
              : j
          ),
        })),

      removeEquipment: (jobId, equipmentId) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId
              ? { ...j, equipmentIds: j.equipmentIds.filter((e) => e !== equipmentId) }
              : j
          ),
        })),

      updateJobStatus: (jobId, status) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === jobId ? { ...j, status } : j
          ),
        })),

      resetData: () => set(createInitialState()),
    }),
    {
      name: "dvp-field-ops",
    }
  )
)
