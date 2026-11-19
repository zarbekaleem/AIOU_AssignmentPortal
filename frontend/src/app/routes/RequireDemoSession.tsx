import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { demoAuthService } from '@/services/demo-auth.service'

interface RequireDemoSessionProps {
  children: ReactNode
}

export function RequireDemoSession({ children }: RequireDemoSessionProps) {
  return demoAuthService.getSession() ? <>{children}</> : <Navigate to="/" replace />
}
