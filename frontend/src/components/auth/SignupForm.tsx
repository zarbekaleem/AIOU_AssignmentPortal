import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, AlertCircle, Gift } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { signupSchema, type SignupFormValues } from '@/lib/validations'
import { authService } from '@/services/auth.service'
import { siteConfig } from '@/config/site'
import type { AuthTab } from '@/types'

interface SignupFormProps {
  onSwitchTab: (tab: AuthTab) => void
}

export default function SignupForm({ onSwitchTab }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await authService.signup({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      })
      // On success: redirect will be handled once backend is connected
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      if (!err.response) {
        setApiError('Registration service is not connected yet. Please check back soon.')
      } else {
        setApiError(err.response?.data?.message || 'Registration failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3.5">
      {/* Promotional message */}
      <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
        <Gift className="h-4 w-4 text-indigo-600 flex-shrink-0" aria-hidden="true" />
        <p className="text-xs text-indigo-700">{siteConfig.credits.promotionalMessage}</p>
      </div>

      {apiError && (
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-lg" role="alert">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-amber-800">{apiError}</p>
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        placeholder="Muhammad Ali"
        autoComplete="name"
        required
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="student@example.com"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Min. 8 chars, 1 uppercase, 1 number"
          autoComplete="new-password"
          required
          error={errors.password?.message}
          helperText="At least 8 characters, one uppercase letter, and one number."
          {...register('password')}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-9 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
        >
          {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="acceptTerms"
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          {...register('acceptTerms')}
        />
        <label htmlFor="acceptTerms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
          I accept the{' '}
          <a href="/terms-and-conditions" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Terms &amp; Conditions
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-xs text-red-600 -mt-2" role="alert">{errors.acceptTerms.message}</p>
      )}

      <Button type="submit" variant="primary" fullWidth loading={isLoading}>
        {isLoading ? 'Creating account…' : 'Create Account'}
      </Button>

      <p className="text-center text-xs text-slate-500">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => onSwitchTab('login')}
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
