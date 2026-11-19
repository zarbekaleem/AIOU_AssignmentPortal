import { useEffect, useState } from 'react'
import { ArrowRight, BookOpenCheck, CircleHelp, FilePlus2, Files, Wallet, AlertCircle, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { dashboardService } from '@/features/dashboard/services/dashboard.service'
import type { DashboardOverview } from '@/features/dashboard/types/dashboard.types'
import { siteConfig } from '@/config/site'

const summaryItems = [
  { label: 'Total assignments', key: 'totalAssignments' as const, icon: Files },
  { label: 'Completed', key: 'completedAssignments' as const, icon: BookOpenCheck },
  { label: 'In progress', key: 'inProgressAssignments' as const, icon: Clock3 },
  { label: 'Available credits', key: 'availableCredits' as const, icon: Wallet },
]

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUnavailable, setIsUnavailable] = useState(false)

  useEffect(() => {
    let mounted = true
    dashboardService.getOverview()
      .then((data) => { if (mounted) setOverview(data) })
      .catch(() => { if (mounted) setIsUnavailable(true) })
      .finally(() => { if (mounted) setIsLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Student workspace</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            {overview?.studentName ? `Welcome back, ${overview.studentName}` : 'Welcome to your workspace'}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">Manage your assignments, prepare academic work, and practice your quizzes.</p>
        </div>
        <Link to="/app/assignments/new" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />
          Create New Assignment
        </Link>
      </section>

      {isUnavailable && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200" role="status">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>Student account services are not connected yet. Your profile, credit balance, and assignment activity will appear here when the backend is available.</p>
        </div>
      )}

      <section aria-label="Student activity summary" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map(({ label, key, icon: Icon }) => (
          <article key={key} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"><Icon className="h-4 w-4" aria-hidden="true" /></span>
            </div>
            <p className="mt-5 text-2xl font-bold text-slate-900 dark:text-white" aria-label={isLoading ? `${label} loading` : `${label} unavailable`}>
              {isLoading ? '…' : overview ? overview[key] : '—'}
            </p>
            {!overview && <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Unavailable</p>}
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)]">
        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Recent assignments</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Your latest assignment work and status</p>
            </div>
            <Link to="/app/assignments" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">View all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
          </div>
          {overview?.recentAssignments.length ? (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {overview.recentAssignments.map((assignment) => (
                <li key={assignment.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{assignment.title}</p><p className="mt-1 text-xs text-slate-500">{assignment.courseCode} · {assignment.updatedAt}</p></div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{assignment.status.replace(/_/g, ' ')}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-10 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"><Files className="h-5 w-5" aria-hidden="true" /></span>
              <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">Assignment activity unavailable</p>
              <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">Connect your student account to see saved drafts, processing status, and completed work.</p>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <article className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5 dark:border-indigo-900/70 dark:bg-indigo-950/30">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Start here</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">Prepare an assignment</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Add your course details, source material, and instructions in a guided workspace.</p>
            <Link to="/app/assignments/new" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200">Create assignment <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2"><CircleHelp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /><h3 className="text-sm font-bold text-slate-900 dark:text-white">Need a hand?</h3></div>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">Contact student support for help with account access and academic workflows.</p>
            <a href={siteConfig.whatsapp.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-xs font-semibold text-emerald-700 underline underline-offset-2 dark:text-emerald-400">Contact WhatsApp support</a>
          </article>
        </div>
      </section>

      {!isLoading && !isUnavailable && !overview && <p className="sr-only">Dashboard data is not available.</p>}
    </div>
  )
}
