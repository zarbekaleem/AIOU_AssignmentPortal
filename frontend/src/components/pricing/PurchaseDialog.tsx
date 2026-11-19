import { useEffect, useRef } from 'react'
import { Crown, CreditCard, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { pricingConfig } from '@/config/pricing'
import type { PurchasePlan } from '@/types/pricing'

interface PurchaseDialogProps {
  plan: PurchasePlan | null
  onClose: () => void
}

export function PurchaseDialog({ plan, onClose }: PurchaseDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!plan) return
    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [plan, onClose])

  if (!plan) return null

  const isVip = plan === 'vip'

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4" role="presentation">
      <button type="button" className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} aria-label="Close purchase instructions" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-dialog-title"
        aria-describedby="purchase-dialog-description"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-7"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          aria-label="Close purchase instructions"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
          {isVip ? <Crown className="h-5 w-5" aria-hidden="true" /> : <CreditCard className="h-5 w-5" aria-hidden="true" />}
        </span>
        <h2 id="purchase-dialog-title" className="mt-5 pr-10 text-xl font-bold text-slate-900 dark:text-white">
          {isVip ? 'Get Academy & Tutor VIP' : 'Purchase assignment credits'}
        </h2>
        <p id="purchase-dialog-description" className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {isVip
            ? `Annual VIP package: Rs. ${pricingConfig.vip.price.toLocaleString('en-PK')} for ${pricingConfig.vip.credits.toLocaleString('en-PK')} credits and 365-day access.`
            : `Pay As You Go: Rs. ${pricingConfig.payAsYouGo.pricePerCredit} per credit. One credit covers one complete assignment or one complete quiz session.`}
        </p>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200">
          The secure purchase and payment confirmation process is not connected yet. No payment has been made and no credits will be added from this page.
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
          <Button
            type="button"
            onClick={() => {
              onClose()
              window.setTimeout(() => document.getElementById('payment-methods')?.scrollIntoView({ behavior: 'smooth' }), 0)
            }}
          >
            View Payment Methods
          </Button>
        </div>
      </div>
    </div>
  )
}
