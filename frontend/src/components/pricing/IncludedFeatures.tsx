import { Bot, FileInput, FileText, Download, Palette, BookOpenCheck } from 'lucide-react'

const includedFeatures = [
  { title: 'AI-assisted assignment preparation', description: 'Create and refine academic content with guided assistance.', icon: Bot },
  { title: 'Flexible document input', description: 'PDF, DOCX and image-based question inputs where supported.', icon: FileInput },
  { title: 'Word document export', description: 'Prepare editable .docx documents for further review.', icon: FileText },
  { title: 'PDF export', description: 'Export final formatted work as a PDF document.', icon: Download },
  { title: '30 AIOU-style covers', description: 'Choose from a library of 30 academic cover designs.', icon: Palette },
  { title: 'LMS quiz practice', description: 'Practice with complete 30-MCQ, 45-minute quiz sessions.', icon: BookOpenCheck },
]

export function IncludedFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="included-heading">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Platform Capabilities</p>
        <h2 id="included-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">What’s included</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {includedFeatures.map((feature) => {
          const Icon = feature.icon
          return (
            <article key={feature.title} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-800">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{feature.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
