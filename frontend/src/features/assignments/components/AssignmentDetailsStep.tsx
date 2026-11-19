import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { assignmentConfig } from '@/features/assignments/config/assignment'
import type { AssignmentFormValues } from '@/features/assignments/types/assignment.types'

interface AssignmentDetailsStepProps {
  register: UseFormRegister<AssignmentFormValues>
  errors: FieldErrors<AssignmentFormValues>
}

export function AssignmentDetailsStep({ register, errors }: AssignmentDetailsStepProps) {
  return (
    <section aria-labelledby="details-step-heading">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step 1 · Assignment details</p>
        <h2 id="details-step-heading" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Tell us about your assignment</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">These details help organize your work and prepare its cover information.</p>
      </div>
      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <Input label="Assignment title" required placeholder="e.g. Assignment 1 - Educational Psychology" error={errors.title?.message} {...register('title')} />
        <Input label="University" required defaultValue={assignmentConfig.defaultUniversity} error={errors.university?.message} {...register('university')} />
        <Input label="Course name" required placeholder="Course or subject name" error={errors.courseName?.message} {...register('courseName')} />
        <Input label="Course code" required placeholder="e.g. 8601" error={errors.courseCode?.message} {...register('courseCode')} />
        <Input label="Semester" required placeholder="e.g. Autumn 2026" error={errors.semester?.message} {...register('semester')} />
        <Input label="Assignment number" required placeholder="e.g. 1" error={errors.assignmentNumber?.message} {...register('assignmentNumber')} />
        <Input label="Student name" required autoComplete="name" error={errors.studentName?.message} {...register('studentName')} />
        <Input label="Roll / registration number" required autoComplete="off" error={errors.rollNumber?.message} helperText="Private academic information; only used for your assignment." {...register('rollNumber')} />
        <Input label="Tutor name" placeholder="Optional" error={errors.tutorName?.message} {...register('tutorName')} />
        <Input label="Submission date" type="date" error={errors.submissionDate?.message} {...register('submissionDate')} />
      </div>
    </section>
  )
}
