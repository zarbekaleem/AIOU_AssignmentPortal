import { ArrowRight, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PricingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="pricing-cta-heading">
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 px-6 py-10 text-center text-white sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.18),_transparent_38%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Start with confidence</p>
          <h2 id="pricing-cta-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Ready to Simplify Your Academic Work?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">Choose the pricing option that fits your study or teaching needs.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/#home" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
              <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              Get Started
            </Link>
            <button type="button" onClick={() => document.getElementById('pricing-plans')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:border-slate-600 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
              View Pricing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
