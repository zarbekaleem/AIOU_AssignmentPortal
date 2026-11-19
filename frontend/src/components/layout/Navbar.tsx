import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

interface NavItem {
  label: string
  href: string
  sectionId: string
}

const navLinks: NavItem[] = [
  { label: 'Home & Sign In', href: '/#home', sectionId: 'home' },
  { label: 'Pricing Packages', href: '/pricing', sectionId: 'pricing' },
  { label: 'Guides & FAQs', href: '/#faqs', sectionId: 'faqs' },
  { label: 'Study Blogs', href: '/#blogs', sectionId: 'blogs' },
  { label: 'Contact Us', href: '/#contact', sectionId: 'contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const location = useLocation()
  const navigate = useNavigate()

  // Track scroll depth for navbar shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // ScrollSpy listener to determine the active section
  const updateActiveSection = useCallback(() => {
    if (location.pathname !== '/') {
      if (location.pathname.startsWith('/pricing')) {
        setActiveSection('pricing')
      } else if (location.pathname.startsWith('/blogs')) {
        setActiveSection('blogs')
      } else {
        setActiveSection('')
      }
      return
    }

    // If near the bottom of the page, activate 'contact'
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY
    const fullHeight = document.documentElement.scrollHeight

    if (windowHeight + scrollY >= fullHeight - 80) {
      setActiveSection('contact')
      return
    }

    // Check sections top positions from bottom to top
    const threshold = scrollY + 180

    const sections = [
      { id: 'contact', el: document.getElementById('contact') },
      { id: 'faqs', el: document.getElementById('faqs') },
      { id: 'blogs', el: document.getElementById('blogs') },
      { id: 'home', el: document.getElementById('home') },
    ]

    for (const section of sections) {
      if (section.el) {
        const top = section.el.offsetTop
        if (threshold >= top) {
          setActiveSection(section.id)
          return
        }
      }
    }

    setActiveSection('home')
  }, [location.pathname])

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [updateActiveSection])

  // Handle smooth scroll for anchor links & instant active state
  const handleNavClick = (href: string, sectionId: string, e: React.MouseEvent) => {
    setActiveSection(sectionId)

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
    setIsMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/80'
      )}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to={siteConfig.routes.home}
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2.5 flex-shrink-0 group"
            aria-label={`${siteConfig.name} - Go to homepage`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-xs group-hover:shadow-indigo-200 dark:group-hover:shadow-indigo-900 transition-shadow">
              <GraduationCap className="h-[18px] w-[18px] text-white" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight block">
                AIOU Assignment
              </span>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 leading-tight block">
                Studio
              </span>
            </div>
            <span className="sm:hidden text-sm font-bold text-slate-900 dark:text-white">AIOU Studio</span>
          </Link>

          {/* Desktop Interactive Navigation with Animated Underlines */}
          <ul className="hidden lg:flex items-center gap-1 h-16" role="list">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId

              return (
                <li key={link.label} className="relative h-full flex items-center">
                  <Link
                    to={link.href}
                    onClick={(e) => handleNavClick(link.href, link.sectionId, e)}
                    className={cn(
                      'group relative px-3.5 py-2 text-sm transition-all duration-150 whitespace-nowrap rounded-md flex items-center h-10',
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/70 dark:hover:bg-slate-800/60 font-medium'
                    )}
                  >
                    <span>{link.label}</span>

                    {/* Professional Active Underline Indicator Bar */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-2.5 right-2.5 h-[2.5px] rounded-full transition-all duration-300 ease-out pointer-events-none',
                        isActive
                          ? 'bg-indigo-600 dark:bg-indigo-400 opacity-100 scale-x-100'
                          : 'bg-indigo-300/40 dark:bg-indigo-500/30 opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-90'
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right Upper Corner: Interactive Dark / Light Mode Toggle Button */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
          </div>

          {/* Mobile Right Controls: Toggle & Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-slate-100 dark:border-slate-800 py-3 bg-white dark:bg-slate-950"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId

                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(link.href, link.sectionId, e)}
                      className={cn(
                        'flex items-center justify-between px-3.5 py-2.5 text-sm rounded-lg transition-colors border-l-2',
                        isActive
                          ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 font-semibold'
                          : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 font-medium'
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
