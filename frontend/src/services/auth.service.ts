import api from './api'

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  fullName: string
  email: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await api.post('/api/v1/auth/login', payload)
    return response.data
  },
  signup: async (payload: SignupPayload) => {
    const response = await api.post('/api/v1/auth/register', payload)
    return response.data
  },
  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const response = await api.post('/api/v1/auth/forgot-password', payload)
    return response.data
  },
}
