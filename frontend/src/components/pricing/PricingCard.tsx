import type { ReactNode } from 'react'
import { Crown, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  name: string
  eyebrow: string
  price: string
  period: string
  description: string
  features: ReactNode[]
  cta: string
  vip?: boolean
  onAction: () => void
}

export function PricingCard({ name, eyebrow, price, period, description, features, cta, vip = false, onAction }: PricingCardProps) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-200',
        vip
          ? 'border-indigo-300 bg-indigo-50/40 text-slate-900 shadow-xl shadow-indigo-200/40 dark:border-indigo-700 dark:bg-slate-900 dark:text-white dark:shadow-indigo-950/30'
          : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-white'
      )}
    >
      {vip && (
        <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 dark:border-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
          <Crown className="h-3.5 w-3.5" aria-hidden="true" />
          VIP
        </div>
      )}

      <p className={cn('text-xs font-bold uppercase tracking-wider', vip ? 'text-indigo-700 dark:text-indigo-400' : 'text-indigo-600 dark:text-indigo-400')}>{eyebrow}</p>
      <h3 className="mt-3 text-xl font-bold">{name}</h3>
      <p className={cn('mt-3 max-w-md text-sm leading-relaxed', vip ? 'text-slate-600 dark:text-slate-300' : 'text-slate-600 dark:text-slate-400')}>{description}</p>

      <div className="mt-7 flex items-end gap-2">
        <span className="text-4xl font-extrabold tracking-tight sm:text-5xl">{price}</span>
        <span className={cn('pb-1 text-sm font-semibold', vip ? 'text-slate-500 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400')}>{period}</span>
      </div>

      <ul className="mt-7 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className={cn('flex items-start gap-3 text-sm leading-relaxed', vip ? 'text-slate-700 dark:text-slate-200' : 'text-slate-700 dark:text-slate-300')}>
            <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', vip ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400')}>
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        size="lg"
        fullWidth
        onClick={onAction}
        className={cn('mt-8', vip ? 'border border-indigo-600 bg-indigo-600 hover:border-indigo-700 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20' : '')}
      >
        {cta}
      </Button>
    </article>
  )
}
