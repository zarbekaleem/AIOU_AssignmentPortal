import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { assignmentConfig } from '@/features/assignments/config/assignment'
import type { AssignmentFormValues } from '@/features/assignments/types/assignment.types'

interface GenerationPreferencesStepProps {
  register: UseFormRegister<AssignmentFormValues>
  errors: FieldErrors<AssignmentFormValues>
  academicLevel: AssignmentFormValues['academicLevel']
}

const selectClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white'

export function GenerationPreferencesStep({ register, errors, academicLevel }: GenerationPreferencesStepProps) {
  return (
    <section aria-labelledby="preferences-step-heading">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step 4 · Generation preferences</p>
        <h2 id="preferences-step-heading" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Set your answer preferences</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">These preferences describe your requested output. They do not start generation.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Language
          <select className={selectClass} {...register('language')}>
            {assignmentConfig.languages.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Academic level
          <select className={selectClass} {...register('academicLevel')}>
            <option value="">Select if applicable</option>
            {assignmentConfig.academicLevels.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          {errors.academicLevel && <span className="mt-1 block text-xs text-red-600" role="alert">{errors.academicLevel.message}</span>}
        </label>
        {academicLevel === 'Other / Specify' && (
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">Specify academic level
            <input className={selectClass} {...register('academicLevelOther')} aria-invalid={Boolean(errors.academicLevelOther)} />
            {errors.academicLevelOther && <span className="mt-1 block text-xs text-red-600" role="alert">{errors.academicLevelOther.message}</span>}
          </label>
        )}
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Answer length
          <select className={selectClass} {...register('answerLength')}>
            {assignmentConfig.answerLengths.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">Answer format
          <select className={selectClass} {...register('answerFormat')}>
            {assignmentConfig.answerFormats.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">Word limit <span className="font-normal text-slate-500">(optional)</span>
          <input type="number" min="1" step="1" placeholder="No word limit specified" className={selectClass} {...register('wordLimit')} aria-invalid={Boolean(errors.wordLimit)} />
          {errors.wordLimit && <span className="mt-1 block text-xs text-red-600" role="alert">{errors.wordLimit.message}</span>}
        </label>
      </div>

      <fieldset className="mt-7">
        <legend className="text-sm font-bold text-slate-800 dark:text-slate-200">Additional preferences</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { name: 'includeExamples' as const, label: 'Include examples where appropriate' },
            { name: 'explainCalculations' as const, label: 'Explain calculations step by step' },
            { name: 'includeFormulas' as const, label: 'Include formulas where required' },
            { name: 'formalTone' as const, label: 'Use a formal academic tone' },
          ].map(({ name, label }) => (
            <label key={name} className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" {...register(name)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  )
}
