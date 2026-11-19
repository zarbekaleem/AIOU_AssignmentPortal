import { demoAuthConfig } from '@/config/demo-auth'

export interface DemoSession {
  email: string
  mode: 'demo'
}

export class DemoAuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DemoAuthError'
  }
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

export const demoAuthService = {
  login(email: string, password: string): DemoSession {
    const normalizedEmail = email.trim().toLowerCase()
    if (normalizedEmail !== demoAuthConfig.email || password !== demoAuthConfig.password) {
      throw new DemoAuthError('The email or password is incorrect.')
    }

    const session: DemoSession = { email: demoAuthConfig.email, mode: 'demo' }
    const storage = getStorage()
    if (!storage) throw new DemoAuthError('Demo sign-in is unavailable in this browser session.')
    storage.setItem(demoAuthConfig.sessionKey, JSON.stringify(session))
    return session
  },

  getSession(): DemoSession | null {
    const storage = getStorage()
    if (!storage) return null
    try {
      const value: unknown = JSON.parse(storage.getItem(demoAuthConfig.sessionKey) ?? 'null')
      if (
        typeof value === 'object' && value !== null &&
        'email' in value && value.email === demoAuthConfig.email &&
        'mode' in value && value.mode === 'demo'
      ) {
        return value as DemoSession
      }
    } catch {
      return null
    }
    return null
  },

  logout(): void {
    getStorage()?.removeItem(demoAuthConfig.sessionKey)
  },
}
