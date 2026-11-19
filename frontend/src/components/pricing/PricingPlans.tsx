import { PricingCard } from './PricingCard'
import { pricingConfig } from '@/config/pricing'
import type { PurchasePlan } from '@/types/pricing'

interface PricingPlansProps {
  onPurchase: (plan: PurchasePlan) => void
}

export function PricingPlans({ onPurchase }: PricingPlansProps) {
  const payg = pricingConfig.payAsYouGo
  const vip = pricingConfig.vip

  return (
    <section id="pricing-plans" aria-labelledby="pricing-plans-heading" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 id="pricing-plans-heading" className="sr-only">Available pricing plans</h2>
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <PricingCard
          name="Pay As You Go"
          eyebrow="Flexible credits"
          price={`${payg.currency} ${payg.pricePerCredit}`}
          period="per credit"
          description="One credit for one complete solved assignment or one complete LMS quiz session."
          features={[
            'Word (.docx) export',
            'PDF export',
            'Access to all 30 AIOU-style cover designs',
            'Instant credit top-up when payment methods are available',
          ]}
          cta="Buy Credits"
          onAction={() => onPurchase('credits')}
        />
        <PricingCard
          name="Academy & Tutor Yearly VIP"
          eyebrow="Annual academy plan"
          price={`${payg.currency} ${vip.price.toLocaleString('en-PK')}`}
          period="/ year"
          description="Designed for computer centers and commercial tutors managing a high volume of academic work."
          features={[
            `${vip.credits.toLocaleString('en-PK')} assignment and quiz credits`,
            `Full access for ${vip.durationDays} days`,
            'Live Days Remaining counter for a valid active subscription',
            'Priority WhatsApp VIP Support Desk',
          ]}
          cta="Get Academy VIP"
          vip
          onAction={() => onPurchase('vip')}
        />
      </div>
    </section>
  )
}
