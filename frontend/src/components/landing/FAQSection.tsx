import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { faqs } from '@/data/faqs'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export default function FAQSection() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="bg-slate-50/70 dark:bg-slate-950 py-16 sm:py-20 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Help Center
          </span>
          <h2
            id="faqs-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Clear answers to the most common questions regarding assignment creation, upload formats, exports, credits, and support.
          </p>
        </div>

        {/* Centered Accordion List */}
        <div className="max-w-3xl mx-auto">
          <Accordion.Root type="single" collapsible defaultValue="1" className="space-y-3">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.id}
                value={faq.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none transition-all data-[state=open]:border-indigo-300 dark:data-[state=open]:border-indigo-700"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    className={cn(
                      'flex flex-1 items-center justify-between gap-4 p-5 text-left',
                      'text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 transition-colors',
                      'hover:text-indigo-600 dark:hover:text-indigo-400',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset group'
                    )}
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <ChevronDown
                      className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-indigo-600 dark:group-data-[state=open]:text-indigo-400"
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>

                <Accordion.Content className="overflow-hidden text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40">
                  <div className="p-5">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          {/* Friendly Footer Support Note */}
          <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
            Still have questions? Reach out to our support team on{' '}
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
            >
              WhatsApp ({siteConfig.whatsapp.display})
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
