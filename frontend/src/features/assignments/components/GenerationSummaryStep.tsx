import { CheckCircle2, FileText, ShieldAlert } from 'lucide-react'
import type { AssignmentFormValues, AssignmentQuestion, SelectedSourceFile } from '@/features/assignments/types/assignment.types'
import { formatFileSize } from '@/features/assignments/utils/sourceFiles'

interface GenerationSummaryStepProps {
  values: AssignmentFormValues
  files: SelectedSourceFile[]
  questions: AssignmentQuestion[]
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="flex flex-col gap-1 border-b border-slate-100 py-3 last:border-0 dark:border-slate-800 sm:flex-row sm:justify-between sm:gap-6"><dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</dt><dd className="text-sm font-semibold text-slate-800 dark:text-slate-200 sm:text-right">{value || 'Not provided'}</dd></div>
}

export function GenerationSummaryStep({ values, files, questions }: GenerationSummaryStepProps) {
  const includedQuestions = questions.filter((question) => question.included && question.text.trim())
  return (
    <section aria-labelledby="summary-step-heading">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step 6 · Review &amp; generate</p>
        <h2 id="summary-step-heading" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Review your assignment setup</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Go back to any step to make changes. No files are uploaded and generation has not started.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />Assignment details</h3>
          <dl className="mt-3">
            <SummaryRow label="Title" value={values.title} />
            <SummaryRow label="University" value={values.university} />
            <SummaryRow label="Course" value={`${values.courseName} (${values.courseCode})`} />
            <SummaryRow label="Semester / assignment" value={`${values.semester} · ${values.assignmentNumber}`} />
            <SummaryRow label="Student" value={`${values.studentName} · ${values.rollNumber}`} />
            <SummaryRow label="Tutor / due date" value={[values.tutorName, values.submissionDate].filter(Boolean).join(' · ')} />
          </dl>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white">Source materials</h3>
          {files.length ? <ul className="mt-3 space-y-2">{files.map(({ id, file }) => <li key={id} className="flex justify-between gap-3 text-sm"><span className="truncate text-slate-700 dark:text-slate-300">{file.name}</span><span className="shrink-0 text-xs text-slate-500">{formatFileSize(file.size)}</span></li>)}</ul> : <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No local files selected</p>}
          <p className="mt-3 text-xs text-amber-700 dark:text-amber-300">Files remain in this browser session and are not uploaded.</p>
          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Questions included</h4>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{includedQuestions.length}</p>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h3 className="font-bold text-slate-900 dark:text-white">Instructions &amp; preferences</h3>
          <p className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 dark:bg-slate-950 dark:text-slate-300">{values.instructions}</p>
          <dl className="mt-3 grid gap-x-6 sm:grid-cols-2">
            <SummaryRow label="Language" value={values.language} />
            <SummaryRow label="Academic level" value={values.academicLevel === 'Other / Specify' ? values.academicLevelOther : values.academicLevel} />
            <SummaryRow label="Answer length" value={values.answerLength} />
            <SummaryRow label="Answer format" value={values.answerFormat} />
            <SummaryRow label="Word limit" value={values.wordLimit} />
            <SummaryRow label="Additional preferences" value={[
              values.includeExamples && 'Examples',
              values.explainCalculations && 'Step-by-step calculations',
              values.includeFormulas && 'Formulas where required',
              values.formalTone && 'Formal academic tone',
            ].filter(Boolean).join(', ')} />
          </dl>
        </article>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div><p className="font-semibold">Backend confirmation required</p><p className="mt-1 text-xs leading-relaxed">One credit is used for one full solved assignment. Your balance is unavailable here; the backend must check credit eligibility and process generation. This page will not deduct credits or claim a generated result.</p></div>
      </div>
      {includedQuestions.length > 0 && <p className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />{includedQuestions.length} manually entered question{includedQuestions.length === 1 ? '' : 's'} ready for review</p>}
    </section>
  )
}
