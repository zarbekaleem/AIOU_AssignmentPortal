import { Bell, ChevronRight, Menu, UserRound, Wallet } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const pageTitles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/assignments': 'My Assignments',
  '/app/assignments/new': 'Create Assignment',
  '/app/quizzes': 'Practice Quizzes',
  '/app/templates': 'Cover Templates',
  '/app/wallet': 'Credits & Wallet',
  '/app/payments': 'Payment History',
  '/app/profile': 'Profile & Settings',
  '/app/settings': 'Settings',
}

interface StudentHeaderProps {
  onMenuClick: () => void
}

export function StudentHeader({ onMenuClick }: StudentHeaderProps) {
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? (pathname.includes('/assignments/') ? 'Assignment Workspace' : 'Student Workspace')

  return (
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={onMenuClick} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden" aria-label="Open student navigation">
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="hidden text-slate-400 sm:inline">Student Workspace</span>
          <ChevronRight className="hidden h-4 w-4 text-slate-300 sm:block" aria-hidden="true" />
          <h1 className="truncate font-semibold text-slate-900 dark:text-white">{title}</h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link to="/app/wallet" className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700 sm:px-3 dark:border-slate-800 dark:text-slate-300 dark:hover:text-indigo-300" aria-label="Credits balance unavailable; open wallet">
          <Wallet className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Credits <span className="text-slate-400">Unavailable</span></span>
          <span className="sr-only sm:hidden">Credits unavailable</span>
        </Link>
        <button type="button" disabled className="rounded-lg p-2 text-slate-400" aria-label="Notifications unavailable until account services are connected" title="Notifications will be available when account services are connected">
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
        <ThemeToggle />
        <Link to="/#home" className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900" aria-label="Sign in or return to public site">
          <UserRound className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Account</span>
        </Link>
      </div>
    </header>
  )
}
