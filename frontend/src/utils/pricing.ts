import { pricingConfig } from '@/config/pricing'
import type { CreditEstimate } from '@/types/pricing'

export function normalizeQuantity(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.floor(value))
}

export function calculateCreditEstimate(assignments: number, quizSessions: number): CreditEstimate {
  const normalizedAssignments = normalizeQuantity(assignments)
  const normalizedQuizSessions = normalizeQuantity(quizSessions)
  const totalCredits =
    normalizedAssignments * pricingConfig.creditRules.assignmentCredits +
    normalizedQuizSessions * pricingConfig.creditRules.quizCredits

  return {
    assignments: normalizedAssignments,
    quizSessions: normalizedQuizSessions,
    totalCredits,
    totalCost: totalCredits * pricingConfig.payAsYouGo.pricePerCredit,
  }
}
