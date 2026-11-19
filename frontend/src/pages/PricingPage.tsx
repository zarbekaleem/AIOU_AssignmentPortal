import { useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { PricingPlans } from '@/components/pricing/PricingPlans'
import { CreditUsageSection } from '@/components/pricing/CreditUsageSection'
import { CreditCalculator } from '@/components/pricing/CreditCalculator'
import { IncludedFeatures } from '@/components/pricing/IncludedFeatures'
import { PaymentMethods } from '@/components/pricing/PaymentMethods'
import { PricingFAQ } from '@/components/pricing/PricingFAQ'
import { PricingCTA } from '@/components/pricing/PricingCTA'
import { PurchaseDialog } from '@/components/pricing/PurchaseDialog'
import type { PurchasePlan } from '@/types/pricing'

export default function PricingPage() {
  const [purchasePlan, setPurchasePlan] = useState<PurchasePlan | null>(null)

  useEffect(() => {
    document.title = 'Pricing & Credit Packages | AIOU Assignment Studio'
    const existingDescription = document.querySelector('meta[name="description"]')
    const description = 'Explore transparent AIOU Assignment Studio pricing. Purchase credits for assignment preparation and LMS quiz practice, or choose the annual Academy & Tutor VIP package.'

    if (existingDescription) {
      existingDescription.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.head.appendChild(meta)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <main>
        <section className="border-b border-slate-100 bg-slate-50/50 px-4 py-14 dark:border-slate-800 dark:bg-slate-900/30 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:border-indigo-800/80 dark:bg-indigo-950/60 dark:text-indigo-400">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Transparent Academic Pricing
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">Simple, Transparent Pricing for Every Student</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">Choose flexible credits for your assignments and quiz practice, or unlock a complete yearly solution for your academy.</p>
          </div>
        </section>

        <div className="space-y-16 py-12 sm:space-y-20 sm:py-16">
          <PricingPlans onPurchase={setPurchasePlan} />
          <CreditUsageSection />
          <CreditCalculator />
          <IncludedFeatures />
          <PaymentMethods />
          <PricingFAQ />
          <PricingCTA />
        </div>
      </main>
      <Footer />
      <PurchaseDialog plan={purchasePlan} onClose={() => setPurchasePlan(null)} />
    </div>
  )
}
