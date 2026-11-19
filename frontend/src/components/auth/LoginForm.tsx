import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { loginSchema, type LoginFormValues } from '@/lib/validations'
import { authService } from '@/services/auth.service'
import type { AuthTab } from '@/types'

interface LoginFormProps {
  onSwitchTab: (tab: AuthTab) => void
}

export default function LoginForm({ onSwitchTab }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await authService.login(data)
      // On success: redirect will be handled once backend is connected
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      if (!err.response) {
        setApiError('Authentication service is not connected yet. Please check back soon.')
      } else {
        setApiError(err.response?.data?.message || 'An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {apiError && (
        <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-lg" role="alert">
          <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-amber-800">{apiError}</p>
        </div>
      )}

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
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          error={errors.password?.message}
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

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => onSwitchTab('forgot-password')}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          Forgot your password?
        </button>
      </div>

      <Button type="submit" variant="primary" fullWidth loading={isLoading}>
        {isLoading ? 'Signing in…' : 'Sign In'}
      </Button>

      <p className="text-center text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => onSwitchTab('signup')}
          className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          Sign up for free
        </button>
      </p>
    </form>
  )
}
