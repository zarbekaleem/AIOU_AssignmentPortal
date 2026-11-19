export interface ApiError {
  message: string
  code?: string
  details?: Record<string, string[]>
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export type AuthTab = 'login' | 'signup' | 'forgot-password'
