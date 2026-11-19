import { useState } from 'react'
import { Copy, Check, Building2, ShieldCheck } from 'lucide-react'
import { pricingConfig } from '@/config/pricing'

interface CopyState {
  id: string
  status: 'copied' | 'failed'
}

export function PaymentMethods() {
  const [copyState, setCopyState] = useState<CopyState | null>(null)

  const copyNumber = async (id: string, number: string) => {
    try {
      await navigator.clipboard.writeText(number)
      setCopyState({ id, status: 'copied' })
    } catch {
      setCopyState({ id, status: 'failed' })
    }
  }

  const methods = [
    { id: 'easypaisa' as const, ...pricingConfig.paymentMethods.easypaisa },
    { id: 'jazzcash' as const, ...pricingConfig.paymentMethods.jazzcash },
  ]

  return (
    <section id="payment-methods" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="payment-heading">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Payment Instructions</p>
        <h2 id="payment-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Choose a payment method</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {methods.map((method) => (
          <article key={method.id} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"><Building2 className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{method.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mobile wallet</p>
              </div>
            </div>

            {method.accountHolder && (
              <p className="mt-5 text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold text-slate-900 dark:text-white">Account holder:</span> {method.accountHolder}</p>
            )}

            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Payment number</p>
                <p className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white">{method.paymentNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => void copyNumber(method.id, method.paymentNumber)}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-indigo-400"
                aria-label={`Copy ${method.name} payment number`}
              >
                {copyState?.id === method.id && copyState.status === 'copied' ? <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copyState?.id === method.id && copyState.status === 'copied' ? 'Copied' : 'Copy number'}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 text-sm text-indigo-900 dark:border-indigo-900/70 dark:bg-indigo-950/30 dark:text-indigo-200">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-semibold">Payment guidance</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs leading-relaxed">
            <li>Select your desired credits or VIP package.</li>
            <li>Make payment using an available payment method.</li>
            <li>Follow the displayed purchase instructions.</li>
            <li>Complete payment confirmation when backend confirmation is available.</li>
          </ol>
        </div>
      </div>

      <p className="mt-3 min-h-5 text-center text-xs text-slate-500 dark:text-slate-400" role="status" aria-live="polite">
        {copyState?.status === 'copied' && 'Payment number copied to clipboard.'}
        {copyState?.status === 'failed' && 'Could not copy automatically. Please copy the number manually.'}
      </p>
    </section>
  )
}
