import { useState } from 'react'
import { ArrowDown, ArrowUp, CircleAlert, FileQuestion, Plus, Trash2 } from 'lucide-react'
import type { AssignmentQuestion } from '@/features/assignments/types/assignment.types'

interface QuestionReviewStepProps {
  questions: AssignmentQuestion[]
  onChange: (questions: AssignmentQuestion[]) => void
}

export function QuestionReviewStep({ questions, onChange }: QuestionReviewStepProps) {
  const [notice, setNotice] = useState('')

  const addQuestion = () => {
    onChange([...questions, { id: `${Date.now()}-${questions.length}`, text: '', included: true }])
    setNotice('A blank question was added for manual entry.')
  }
  const updateQuestion = (id: string, updates: Partial<AssignmentQuestion>) => onChange(questions.map((question) => question.id === id ? { ...question, ...updates } : question))
  const removeQuestion = (id: string) => onChange(questions.filter((question) => question.id !== id))
  const moveQuestion = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= questions.length) return
    const updated = [...questions]
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    onChange(updated)
  }

  return (
    <section aria-labelledby="questions-step-heading">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step 5 · Review questions</p>
        <h2 id="questions-step-heading" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Check the questions for your assignment</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Correct question wording, reorder items, or exclude a question before continuing.</p>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200">
        <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>Automatic question extraction is not connected yet. No extracted questions are shown. You can enter questions manually for the review flow.</p>
      </div>

      {questions.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center dark:border-slate-700">
          <FileQuestion className="mx-auto h-7 w-7 text-slate-400" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-200">No questions added</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Add questions yourself or continue to review your setup without starting generation.</p>
        </div>
      ) : (
        <ol className="mt-5 space-y-3">
          {questions.map((question, index) => (
            <li key={question.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor={`question-${question.id}`} className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Question {index + 1}</label>
                <div className="flex items-center gap-1">
                  <button type="button" disabled={index === 0} onClick={() => moveQuestion(index, -1)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800" aria-label={`Move question ${index + 1} up`}><ArrowUp className="h-4 w-4" aria-hidden="true" /></button>
                  <button type="button" disabled={index === questions.length - 1} onClick={() => moveQuestion(index, 1)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800" aria-label={`Move question ${index + 1} down`}><ArrowDown className="h-4 w-4" aria-hidden="true" /></button>
                  <button type="button" onClick={() => removeQuestion(question.id)} className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40" aria-label={`Delete question ${index + 1}`}><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                </div>
              </div>
              <textarea id={`question-${question.id}`} value={question.text} onChange={(event) => updateQuestion(question.id, { text: event.target.value })} rows={3} placeholder="Type or correct the question wording" className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              <label className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400"><input type="checkbox" checked={question.included} onChange={(event) => updateQuestion(question.id, { included: event.target.checked })} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />Include in assignment</label>
            </li>
          ))}
        </ol>
      )}
      <button type="button" onClick={addQuestion} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-indigo-200 px-4 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-950/50"><Plus className="h-4 w-4" aria-hidden="true" />Add a question</button>
      <p className="sr-only" aria-live="polite">{notice}</p>
    </section>
  )
}
