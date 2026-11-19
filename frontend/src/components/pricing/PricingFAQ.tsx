import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { pricingFaqs } from '@/data/pricing-faqs'

export function PricingFAQ() {
  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" aria-labelledby="pricing-faq-heading">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Pricing FAQs</p>
        <h2 id="pricing-faq-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Frequently asked questions</h2>
      </div>
      <Accordion.Root type="single" collapsible className="space-y-3">
        {pricingFaqs.map((faq) => (
          <Accordion.Item key={faq.id} value={faq.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition dark:border-slate-800 dark:bg-slate-900 data-[state=open]:border-indigo-300 dark:data-[state=open]:border-indigo-700">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="group flex flex-1 items-center justify-between gap-4 p-5 text-left text-sm font-semibold text-slate-900 transition hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:text-slate-100 dark:hover:text-indigo-400 sm:text-base">
                <span className="leading-snug">{faq.question}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-indigo-600 dark:text-slate-500 dark:group-data-[state=open]:text-indigo-400" aria-hidden="true" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="border-t border-slate-100 bg-slate-50/40 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
              <div className="p-5">{faq.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}
