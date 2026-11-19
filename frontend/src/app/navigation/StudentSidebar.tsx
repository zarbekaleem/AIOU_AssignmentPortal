import { NavLink } from 'react-router-dom'
import { BookOpenCheck, CircleHelp, FilePlus2, Files, GraduationCap, LayoutDashboard, LibraryBig, ReceiptText, Settings2, Wallet, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

const navigation = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Create Assignment', to: '/app/assignments/new', icon: FilePlus2 },
  { label: 'My Assignments', to: '/app/assignments', icon: Files, end: true },
  { label: 'Practice Quizzes', to: '/app/quizzes', icon: BookOpenCheck },
  { label: 'Cover Templates', to: '/app/templates', icon: LibraryBig },
  { label: 'Credits & Wallet', to: '/app/wallet', icon: Wallet },
  { label: 'Payment History', to: '/app/payments', icon: ReceiptText },
  { label: 'Profile & Settings', to: '/app/profile', icon: Settings2 },
]

interface StudentSidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export function StudentSidebar({ mobileOpen, onClose }: StudentSidebarProps) {
  return (
    <>
      {mobileOpen && <button type="button" className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden" onClick={onClose} aria-label="Close student navigation" />}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-[min(84vw,280px)] flex-col border-r border-slate-200 bg-white transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-64 lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )} aria-label="Student workspace sidebar">
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 dark:border-slate-800">
          <NavLink to="/app/dashboard" onClick={onClose} className="flex items-center gap-3" aria-label="AIOU Assignment Studio dashboard">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white"><GraduationCap className="h-5 w-5" aria-hidden="true" /></span>
            <span>
              <span className="block text-sm font-bold text-slate-900 dark:text-white">AIOU Assignment</span>
              <span className="block text-xs font-semibold text-indigo-600 dark:text-indigo-400">Student Studio</span>
            </span>
          </NavLink>
          <button type="button" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden" onClick={onClose} aria-label="Close navigation">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Student workspace">
          <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Workspace</p>
          <ul className="space-y-1">
            {navigation.map(({ label, to, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) => cn(
                    'flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  )}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <a href={siteConfig.whatsapp.url} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
            <CircleHelp className="h-[18px] w-[18px]" aria-hidden="true" />
            Help &amp; Support
          </a>
        </div>
      </aside>
    </>
  )
}
