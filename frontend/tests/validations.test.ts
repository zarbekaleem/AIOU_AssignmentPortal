import { describe, it, expect } from 'vitest'
import { loginSchema, signupSchema, forgotPasswordSchema } from '../src/lib/validations'

describe('loginSchema', () => {
  it('validates correct email and password', () => {
    const result = loginSchema.safeParse({
      email: 'student@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Email address is required')
    }
  })

  it('rejects invalid email format', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Please enter a valid email address')
    }
  })

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({
      email: 'student@example.com',
      password: '',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Password is required')
    }
  })
})

describe('signupSchema', () => {
  const validSignup = {
    fullName: 'Muhammad Ali',
    email: 'ali@example.com',
    password: 'Password1',
    confirmPassword: 'Password1',
    acceptTerms: true,
  }

  it('validates a correct registration payload', () => {
    const result = signupSchema.safeParse(validSignup)
    expect(result.success).toBe(true)
  })

  it('rejects short full name', () => {
    const result = signupSchema.safeParse({ ...validSignup, fullName: 'A' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('at least 2 characters')
    }
  })

  it('rejects passwords shorter than 8 characters', () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      password: 'Pass1',
      confirmPassword: 'Pass1',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('at least 8 characters')
    }
  })

  it('rejects passwords without an uppercase letter', () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      password: 'password1',
      confirmPassword: 'password1',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('uppercase letter')
    }
  })

  it('rejects passwords without a number', () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      password: 'Password',
      confirmPassword: 'Password',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('at least one number')
    }
  })

  it('rejects mismatched password and confirm password', () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      password: 'Password1',
      confirmPassword: 'Password2',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const matchErr = result.error.errors.find((e) => e.path.includes('confirmPassword'))
      expect(matchErr?.message).toBe('Passwords do not match')
    }
  })

  it('rejects unaccepted terms and conditions', () => {
    const result = signupSchema.safeParse({
      ...validSignup,
      acceptTerms: false,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('terms and conditions')
    }
  })
})

describe('forgotPasswordSchema', () => {
  it('validates valid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'student@example.com' })
    expect(result.success).toBe(true)
  })

  it('rejects empty email', () => {
    const result = forgotPasswordSchema.safeParse({ email: '' })
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const result = forgotPasswordSchema.safeParse({ email: 'not-an-email' })
    expect(result.success).toBe(false)
  })
})
