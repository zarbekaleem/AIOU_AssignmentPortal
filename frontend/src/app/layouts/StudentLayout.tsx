import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { StudentHeader } from '@/app/navigation/StudentHeader'
import { StudentSidebar } from '@/app/navigation/StudentSidebar'
import { demoAuthService } from '@/services/demo-auth.service'

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    demoAuthService.logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white lg:flex">
      <StudentSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-w-0 flex-1">
        <StudentHeader onMenuClick={() => setMobileOpen(true)} onLogout={handleLogout} />
        <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
