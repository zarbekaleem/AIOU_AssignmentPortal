import AuthCard from '@/components/auth/AuthCard'
import { TypewriterHeadline } from './TypewriterHeadline'

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/80 py-10 lg:py-16 transition-colors duration-200"
    >
      {/* Subtle backdrop soft gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 via-white to-white dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Section: Headline & Subtitle with generous max-width */}
        <div className="text-center w-full max-w-5xl mx-auto mb-10">
          {/* Continuously Animated Headline (Single Line, Balanced Font Size & Centered) */}
          <div className="mb-3.5 flex justify-center w-full overflow-hidden">
            <TypewriterHeadline />
          </div>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto px-2">
            Create assignments more efficiently with AI assistance. Upload PDF, DOCX, or photos of your questions, prepare editable answers, and export your work into Word or PDF with 30 AIOU-style cover designs.
          </p>
        </div>

        {/* Centered Large Sign In / Sign Up Section */}
        <div className="flex justify-center w-full">
          <AuthCard />
        </div>

      </div>
    </section>
  )
}
