import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import type { AuthTab } from '@/types'

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState<AuthTab>('login')

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/60 border border-slate-100 dark:border-slate-800 overflow-hidden w-full max-w-2xl mx-auto transition-colors duration-200">
      
      {/* Header */}
      <div className="px-6 sm:px-10 pt-10 pb-6 text-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        
        {/* Brand Logo Container */}
        <div className="flex justify-center mb-5">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-out cursor-pointer select-none">
            <img
              src="/logos/logo.png"
              alt="AIOU Assignment Studio Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.currentTarget
                if (target.src.endsWith('/logos/logo.png')) {
                  target.src = '/logos/logo.svg'
                }
              }}
            />
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Student Portal
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
          Access your assignment workspace, review AI answers, and prepare for Aaghi LMS quizzes.
        </p>
      </div>

      <Tabs.Root value={activeTab} onValueChange={(v) => setActiveTab(v as AuthTab)}>
        {/* Tab Navigation */}
        <Tabs.List
          className="flex px-4 sm:px-10 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 gap-2 sm:gap-4"
          aria-label="Authentication options"
        >
          <Tabs.Trigger
            value="login"
            className="flex-1 py-4 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 border-b-2 border-transparent data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all whitespace-nowrap cursor-pointer"
          >
            Log In
          </Tabs.Trigger>
          <Tabs.Trigger
            value="signup"
            className="flex-1 py-4 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 border-b-2 border-transparent data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all whitespace-nowrap cursor-pointer"
          >
            Sign Up (2 Free Credits)
          </Tabs.Trigger>
          <Tabs.Trigger
            value="forgot-password"
            className="flex-1 py-4 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 border-b-2 border-transparent data-[state=active]:border-indigo-600 dark:data-[state=active]:border-indigo-400 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all whitespace-nowrap cursor-pointer"
          >
            Forgot Password
          </Tabs.Trigger>
        </Tabs.List>

        {/* Form Body */}
        <div className="p-6 sm:p-10 bg-white dark:bg-slate-900">
          <Tabs.Content value="login" className="focus-visible:outline-none">
            <LoginForm onSwitchTab={setActiveTab} />
          </Tabs.Content>
          <Tabs.Content value="signup" className="focus-visible:outline-none">
            <SignupForm onSwitchTab={setActiveTab} />
          </Tabs.Content>
          <Tabs.Content value="forgot-password" className="focus-visible:outline-none">
            <ForgotPasswordForm onSwitchTab={setActiveTab} />
          </Tabs.Content>
        </div>
      </Tabs.Root>

    </div>
  )
}
