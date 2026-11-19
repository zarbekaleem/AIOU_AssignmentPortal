import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GraduationCap, MessageCircle, CreditCard, ExternalLink } from 'lucide-react'
import { siteConfig } from '@/config/site'

const quickLinks = [
  { label: 'Home & Sign In', href: '/#home' },
  { label: 'Pricing Packages', href: '/pricing' },
  { label: 'Guides & FAQs', href: '/#faqs' },
  { label: 'Study Blogs', href: '/#blogs' },
  { label: 'Contact Us', href: '/#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '')
      if (location.pathname === '/') {
        e.preventDefault()
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        e.preventDefault()
        navigate(href)
      }
    }
  }

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

          {/* 1. Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-[18px] w-[18px] text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block leading-tight">
                  AIOU Assignment
                </span>
                <span className="text-xs font-medium text-indigo-400 block leading-tight">
                  Studio
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-4">
              An independent educational platform helping AIOU students prepare assignments, practice Aaghi LMS quizzes, and format academic work.
            </p>
            <p className="text-xs text-slate-500">
              Not affiliated with, sponsored by, or endorsed by Allama Iqbal Open University (AIOU).
            </p>
          </div>

          {/* 2. Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support & WhatsApp Column */}
          <div id="contact">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Student Support
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Have questions about assignment generation or need help? Contact our support team directly on WhatsApp.
            </p>
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-medium rounded-lg transition-colors shadow-xs"
              aria-label={`Contact support on WhatsApp at ${siteConfig.whatsapp.display} (opens in new tab)`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {siteConfig.whatsapp.display}
              <ExternalLink className="h-3 w-3 opacity-70 ml-1" aria-hidden="true" />
            </a>
          </div>

          {/* 4. Payment Information Column (Configurable EasyPaisa) */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-slate-400" aria-hidden="true" />
                Payment Options
              </span>
            </h3>
            {siteConfig.easypaisa.available ? (
              <div className="bg-slate-800 rounded-lg p-3.5 text-sm space-y-1.5 border border-slate-700/60">
                <p className="text-white font-medium">EasyPaisa Account</p>
                <p className="text-slate-400 text-xs">Account: {siteConfig.easypaisa.accountNumber}</p>
                <p className="text-slate-400 text-xs">Title: {siteConfig.easypaisa.accountHolder}</p>
              </div>
            ) : (
              <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-800">
                <p className="text-xs font-semibold text-slate-300 mb-1">EasyPaisa &amp; JazzCash</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {siteConfig.easypaisa.note}
                </p>
              </div>
            )}
            <p className="text-[11px] text-slate-500 mt-3 leading-normal">
              Official payment gateway integration will be launched in Section 11.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to={siteConfig.legal.privacyPolicy}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to={siteConfig.legal.termsAndConditions}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
