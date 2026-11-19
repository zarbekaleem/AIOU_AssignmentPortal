import type { DashboardOverview } from '@/features/dashboard/types/dashboard.types'

export class DashboardIntegrationUnavailableError extends Error {
  constructor() {
    super('Student account and dashboard services are not connected yet.')
    this.name = 'DashboardIntegrationUnavailableError'
  }
}

export const dashboardService = {
  async getOverview(): Promise<DashboardOverview> {
    throw new DashboardIntegrationUnavailableError()
  },
}
