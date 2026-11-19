import { Link } from 'react-router-dom'
import { GraduationCap, ArrowLeft, Clock } from 'lucide-react'
import { siteConfig } from '@/config/site'

interface PlaceholderPageProps {
  title?: string
  subtitle?: string
}

export default function PlaceholderPage({
  title = 'Student Application Portal',
  subtitle = 'This module will be introduced in subsequent milestones. You are currently viewing Section 01: Public Landing Page & Inline Authentication.',
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-xs">
        <GraduationCap className="h-8 w-8" aria-hidden="true" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-4">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        Upcoming Section Milestone
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 max-w-md">
        {title}
      </h1>

      <p className="text-sm text-slate-600 max-w-md leading-relaxed mb-8">
        {subtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to={siteConfig.routes.home}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Public Landing
        </Link>
      </div>

      <p className="mt-12 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </p>
    </div>
  )
}
