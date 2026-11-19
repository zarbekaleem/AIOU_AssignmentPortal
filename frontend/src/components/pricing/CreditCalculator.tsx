import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { calculateCreditEstimate } from '@/utils/pricing'

export function CreditCalculator() {
  const [assignments, setAssignments] = useState(0)
  const [quizSessions, setQuizSessions] = useState(0)
  const estimate = calculateCreditEstimate(assignments, quizSessions)

  const updateInput = (value: string, setter: (value: number) => void) => {
    const parsed = Number(value)
    setter(value === '' ? 0 : Number.isFinite(parsed) ? Math.max(0, parsed) : 0)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="calculator-heading">
      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[1fr_320px] dark:border-slate-800 dark:bg-slate-900">
        <div className="p-5 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"><Calculator className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Estimate</p>
              <h2 id="calculator-heading" className="text-xl font-bold text-slate-900 dark:text-white">Credit Calculator</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Assignments
              <input
                type="number"
                min="0"
                step="1"
                value={assignments}
                onChange={(event) => updateInput(event.target.value, setAssignments)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Quiz sessions
              <input
                type="number"
                min="0"
                step="1"
                value={quizSessions}
                onChange={(event) => updateInput(event.target.value, setQuizSessions)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </label>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-8 lg:border-l lg:border-t-0 dark:border-slate-800 dark:bg-slate-950" aria-live="polite">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Estimated Pay As You Go cost</p>
          <div className="mt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">Total credits</p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">{estimate.totalCredits}</p>
          </div>
          <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">Estimated total</p>
            <p className="mt-1 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">Rs. {estimate.totalCost.toLocaleString('en-PK')}</p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">This is an estimate. It does not perform a purchase.</p>
        </div>
      </div>
    </section>
  )
}
