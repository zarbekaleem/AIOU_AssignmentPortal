export type PurchasePlan = 'credits' | 'vip'

export interface CreditEstimate {
  assignments: number
  quizSessions: number
  totalCredits: number
  totalCost: number
}

export interface PricingFAQ {
  id: string
  question: string
  answer: string
}

export interface PaymentMethod {
  id: 'easypaisa' | 'jazzcash'
  name: 'EasyPaisa' | 'JazzCash'
  accountHolder: string | null
  paymentNumber: string
}
