import type { PurchasePlan } from '@/types/pricing'

export interface PurchaseRequest {
  plan: PurchasePlan
}

export const pricingService = {
  async requestPurchase(_request: PurchaseRequest): Promise<{ connected: false; message: string }> {
    return {
      connected: false,
      message: 'Payment confirmation is not connected yet. No purchase or credit allocation has been made.',
    }
  },
}
