import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'success' | 'warning'
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100',
    outline: 'bg-transparent text-slate-600 ring-1 ring-slate-200',
    success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export type { BadgeProps }
