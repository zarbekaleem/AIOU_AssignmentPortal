import { ArrowLeft, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'

interface StudentModulePlaceholderProps {
  title: string
  description: string
}

export function StudentModulePlaceholder({ title, description }: StudentModulePlaceholderProps) {
  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900 sm:px-10" aria-labelledby="module-placeholder-heading">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Clock3 className="h-6 w-6" aria-hidden="true" /></span>
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Module integration pending</p>
      <h2 id="module-placeholder-heading" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
      <Link to="/app/dashboard" className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to dashboard</Link>
    </section>
  )
}
