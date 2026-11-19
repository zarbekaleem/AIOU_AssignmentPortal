import { Sparkles } from 'lucide-react'
import { assignmentConfig } from '@/features/assignments/config/assignment'

interface AssignmentInstructionsStepProps {
  value: string
  error?: string
  onChange: (value: string) => void
}

export function AssignmentInstructionsStep({ value, error, onChange }: AssignmentInstructionsStepProps) {
  const appendPreset = (text: string) => onChange(value.trim() ? `${value.trimEnd()}\n\n${text}` : text)

  return (
    <section aria-labelledby="instructions-step-heading">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step 3 · Your instructions</p>
        <h2 id="instructions-step-heading" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">How should your assignment be prepared?</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Write your requirements in your own words. You can edit them at any time before generation.</p>
      </div>

      <label htmlFor="assignment-instructions" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200">Assignment instructions <span className="text-red-500" aria-hidden="true">*</span></label>
      <textarea
        id="assignment-instructions"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={9}
        placeholder={'Describe how you want your assignment prepared. For example:\n\n- Answer every question in detail.\n- Use simple academic English.\n- Follow the AIOU assignment format.\n- Include examples and step-by-step working where appropriate.'}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'assignment-instructions-error' : 'assignment-instructions-help'}
        className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
      />
      {error ? <p id="assignment-instructions-error" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400" role="alert">{error}</p> : <p id="assignment-instructions-help" className="mt-2 text-xs text-slate-500 dark:text-slate-400">Your instructions are kept separate from internal platform prompts and are not rewritten by these presets.</p>}

      <div className="mt-6">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200"><Sparkles className="h-4 w-4 text-indigo-500" aria-hidden="true" />Optional instruction presets</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Selecting a preset appends it to your current instructions.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {assignmentConfig.instructionPresets.map((preset) => (
            <button key={preset.id} type="button" onClick={() => appendPreset(preset.text)} className="min-h-9 rounded-full border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300">{preset.label}</button>
          ))}
        </div>
      </div>
    </section>
  )
}
