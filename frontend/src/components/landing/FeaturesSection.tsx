import { Sparkles, Upload, FileDown, BookOpen } from 'lucide-react'
import { features } from '@/data/features'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Upload,
  FileDown,
  BookOpen,
}

interface FeatureCardProps {
  iconName: string
  title: string
  description: string
  index: number
}

function FeatureCard({ iconName, title, description, index }: FeatureCardProps) {
  const Icon = iconMap[iconName] ?? Sparkles
  const accentColors = [
    { bg: 'bg-indigo-50 dark:bg-indigo-950/60', text: 'text-indigo-600 dark:text-indigo-400', ring: 'group-hover:border-indigo-200 dark:group-hover:border-indigo-500/50' },
    { bg: 'bg-blue-50 dark:bg-blue-950/60', text: 'text-blue-600 dark:text-blue-400', ring: 'group-hover:border-blue-200 dark:group-hover:border-blue-500/50' },
    { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', ring: 'group-hover:border-slate-300 dark:group-hover:border-slate-600' },
    { bg: 'bg-emerald-50 dark:bg-emerald-950/60', text: 'text-emerald-600 dark:text-emerald-400', ring: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-500/50' },
  ]
  const color = accentColors[index % accentColors.length]

  return (
    <article
      className={cn(
        'group bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-6 transition-all duration-200',
        'hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/70 hover:-translate-y-1',
        color.ring
      )}
    >
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105', color.bg)}>
        <Icon className={cn('h-6 w-6', color.text)} aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2.5">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </article>
  )
}

export default function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="bg-slate-50/70 dark:bg-slate-950 py-20 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Four Core Pillars
          </span>
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Engineered Specifically for AIOU Distance Learners
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            From assignment question paper extraction to final formatted Word &amp; PDF document submission with authentic cover designs.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
