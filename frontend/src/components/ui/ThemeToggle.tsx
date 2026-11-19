import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 cursor-pointer',
        'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900',
        'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDark}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-5 h-5 text-indigo-400 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
        )}
      </div>
    </button>
  )
}
