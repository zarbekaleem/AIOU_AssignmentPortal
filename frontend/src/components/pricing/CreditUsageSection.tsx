import { FileText, ClipboardCheck, ArrowRight } from 'lucide-react'
import { pricingConfig } from '@/config/pricing'

export function CreditUsageSection() {
  const rules = pricingConfig.creditRules

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="credit-usage-heading">
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mb-7 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Credit Usage</p>
          <h2 id="credit-usage-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">How credits work</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Choose between one complete assignment or one complete LMS quiz session for each credit.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"><FileText className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Assignment Generation</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">One credit = one complete solved assignment.</p>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"><ClipboardCheck className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">LMS Quiz Practice</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">One credit = one complete quiz session.</p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{rules.quizMcqs} MCQs · {rules.quizMinutes} minutes</p>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 dark:border-indigo-900/70 dark:bg-indigo-950/40 dark:text-indigo-300">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          Each full assignment or full quiz session consumes one credit.
        </div>
      </div>
    </section>
  )
}
