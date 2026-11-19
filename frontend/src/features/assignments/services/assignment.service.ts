import type { AssignmentGenerationRequest } from '@/features/assignments/types/assignment.types'

export class AssignmentIntegrationUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AssignmentIntegrationUnavailableError'
  }
}

export const assignmentService = {
  async uploadSourceFiles(_files: File[]): Promise<never> {
    throw new AssignmentIntegrationUnavailableError('Secure file upload is not connected yet. Your selected files are only in this browser session.')
  },

  async extractQuestions(_assignmentId: string): Promise<never> {
    throw new AssignmentIntegrationUnavailableError('Question extraction is not connected yet. You can add or correct questions manually.')
  },

  async generateAssignment(_request: AssignmentGenerationRequest): Promise<never> {
    throw new AssignmentIntegrationUnavailableError('Assignment generation is not connected yet. No assignment has been generated and no credits have been deducted.')
  },
}
