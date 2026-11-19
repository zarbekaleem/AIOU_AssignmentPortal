import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validations'
import { authService } from '@/services/auth.service'
import type { AuthTab } from '@/types'

interface ForgotPasswordFormProps {
  onSwitchTab: (tab: AuthTab) => void
}

export default function ForgotPasswordForm({ onSwitchTab }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await authService.forgotPassword(data)
      setSubmitted(true)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string }
      if (!err.response) {
        setApiError('Password reset service is not connected yet. Please check back soon.')
      } else {
        setApiError(err.response?.data?.message || 'An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
          <Mail className="h-6 w-6 text-indigo-600" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">Check your email</h3>
          <p className="text-xs text-slate-500">
            If an account exists for{' '}
            <span className="font-medium text-slate-700">{getValues('email')}</span>,
            you will receive password reset instructions.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onSwitchTab('login')}
          className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Reset Your Password</h3>
        <p className="text-xs text-slate-500">Enter your registered email address and we&apos;ll send reset instructions.</p>
      </div>

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

      <Button type="submit" variant="primary" fullWidth loading={isLoading}>
        {isLoading ? 'Sending…' : 'Send Reset Instructions'}
      </Button>

      <button
        type="button"
        onClick={() => onSwitchTab('login')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors w-full justify-center"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to Sign In
      </button>
    </form>
  )
}
