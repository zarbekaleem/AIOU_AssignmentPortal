import { Check } from 'lucide-react'
import { assignmentConfig } from '@/features/assignments/config/assignment'
import { cn } from '@/lib/utils'

interface AssignmentStepperProps {
  currentStep: number
  onSelectStep: (step: number) => void
}

export function AssignmentStepper({ currentStep, onSelectStep }: AssignmentStepperProps) {
  return (
    <nav aria-label="Assignment setup progress">
      <div className="xl:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step {currentStep} of {assignmentConfig.steps.length}</p>
          <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">{assignmentConfig.steps[currentStep - 1]}</p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800" role="progressbar" aria-label="Assignment setup progress" aria-valuemin={1} aria-valuemax={assignmentConfig.steps.length} aria-valuenow={currentStep}>
          <div className="h-full rounded-full bg-indigo-600 transition-[width] duration-200 dark:bg-indigo-400" style={{ width: `${(currentStep / assignmentConfig.steps.length) * 100}%` }} />
        </div>
      </div>
      <ol className="hidden min-w-230 items-start xl:flex">
        {assignmentConfig.steps.map((label, index) => {
          const step = index + 1
          const completed = step < currentStep
          const active = step === currentStep
          return (
            <li key={label} className="relative flex-1">
              {index < assignmentConfig.steps.length - 1 && <span className={cn('absolute left-[calc(50%+18px)] right-[-50%] top-4 h-px', completed ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-800')} aria-hidden="true" />}
              <button
                type="button"
                onClick={() => { if (step <= currentStep) onSelectStep(step) }}
                disabled={step > currentStep}
                aria-current={active ? 'step' : undefined}
                className="relative flex w-full flex-col items-center gap-2 text-center disabled:cursor-not-allowed"
              >
                <span className={cn(
                  'z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition',
                  completed ? 'border-indigo-600 bg-indigo-600 text-white' : active ? 'border-indigo-600 bg-white text-indigo-700 ring-4 ring-indigo-100 dark:border-indigo-400 dark:bg-slate-950 dark:text-indigo-300 dark:ring-indigo-950' : 'border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900'
                )}>
                  {completed ? <Check className="h-4 w-4" aria-hidden="true" /> : step}
                </span>
                <span className={cn('max-w-28 text-[11px] font-semibold leading-tight', active ? 'text-indigo-700 dark:text-indigo-300' : completed ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400')}>{label}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
