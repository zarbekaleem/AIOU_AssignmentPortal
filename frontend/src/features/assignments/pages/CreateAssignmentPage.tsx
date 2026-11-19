import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch, type FieldPath } from 'react-hook-form'
import { AlertCircle, ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { assignmentConfig } from '@/features/assignments/config/assignment'
import { AssignmentDetailsStep } from '@/features/assignments/components/AssignmentDetailsStep'
import { SourceMaterialsStep } from '@/features/assignments/components/SourceMaterialsStep'
import { AssignmentInstructionsStep } from '@/features/assignments/components/AssignmentInstructionsStep'
import { GenerationPreferencesStep } from '@/features/assignments/components/GenerationPreferencesStep'
import { QuestionReviewStep } from '@/features/assignments/components/QuestionReviewStep'
import { GenerationSummaryStep } from '@/features/assignments/components/GenerationSummaryStep'
import { AssignmentStepper } from '@/features/assignments/components/AssignmentStepper'
import { assignmentSchema } from '@/features/assignments/schemas/assignment.schema'
import { assignmentService, AssignmentIntegrationUnavailableError } from '@/features/assignments/services/assignment.service'
import type { AssignmentFormValues, AssignmentQuestion, AssignmentGenerationRequest, SelectedSourceFile } from '@/features/assignments/types/assignment.types'

const defaultValues: AssignmentFormValues = {
  title: '',
  university: assignmentConfig.defaultUniversity,
  courseName: '',
  courseCode: '',
  semester: '',
  assignmentNumber: '',
  studentName: '',
  rollNumber: '',
  tutorName: '',
  submissionDate: '',
  instructions: '',
  language: 'English',
  academicLevel: '',
  academicLevelOther: '',
  answerLength: 'Medium',
  answerFormat: 'Structured Academic Format',
  wordLimit: '',
  includeExamples: false,
  explainCalculations: false,
  includeFormulas: false,
  formalTone: true,
}

const fieldsByStep: Record<number, FieldPath<AssignmentFormValues>[]> = {
  1: ['title', 'university', 'courseName', 'courseCode', 'semester', 'assignmentNumber', 'studentName', 'rollNumber'],
  2: [],
  3: ['instructions'],
  4: ['language', 'academicLevel', 'academicLevelOther', 'answerLength', 'answerFormat', 'wordLimit'],
  5: [],
  6: [],
}

export default function CreateAssignmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [sourceFiles, setSourceFiles] = useState<SelectedSourceFile[]>([])
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([])
  const [integrationMessage, setIntegrationMessage] = useState('')
  const { register, control, trigger, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues,
    mode: 'onTouched',
  })
  const values = useWatch({ control }) as AssignmentFormValues

  const addFiles = (files: File[]) => {
    setSourceFiles(files.slice(0, assignmentConfig.maxFiles).map((file) => ({ id: `${Date.now()}-${Math.random()}`, file })))
  }

  const moveForward = async () => {
    setIntegrationMessage('')
    const fields = fieldsByStep[currentStep]
    const valid = fields.length === 0 || await trigger(fields)
    if (valid && currentStep < assignmentConfig.steps.length) setCurrentStep((step) => step + 1)
  }

  const onSubmit = async (formValues: AssignmentFormValues) => {
    setIntegrationMessage('')
    const includedQuestions = questions.filter((question) => question.included && question.text.trim())
    if (includedQuestions.length === 0) {
      setIntegrationMessage('Add at least one question in Step 5 before requesting generation. Automatic extraction is not connected yet.')
      setCurrentStep(5)
      return
    }

    const request: AssignmentGenerationRequest = {
      details: {
        title: formValues.title,
        university: formValues.university,
        courseName: formValues.courseName,
        courseCode: formValues.courseCode,
        semester: formValues.semester,
        assignmentNumber: formValues.assignmentNumber,
        studentName: formValues.studentName,
        rollNumber: formValues.rollNumber,
        tutorName: formValues.tutorName,
        submissionDate: formValues.submissionDate,
      },
      instructions: formValues.instructions,
      preferences: {
        language: formValues.language,
        academicLevel: formValues.academicLevel,
        academicLevelOther: formValues.academicLevelOther,
        answerLength: formValues.answerLength,
        answerFormat: formValues.answerFormat,
        wordLimit: formValues.wordLimit,
        includeExamples: formValues.includeExamples,
        explainCalculations: formValues.explainCalculations,
        includeFormulas: formValues.includeFormulas,
        formalTone: formValues.formalTone,
      },
      questions: includedQuestions,
      selectedFiles: sourceFiles.map(({ file }) => file),
    }

    try {
      await assignmentService.generateAssignment(request)
    } catch (error: unknown) {
      setIntegrationMessage(error instanceof AssignmentIntegrationUnavailableError
        ? error.message
        : 'We could not submit this request. Your form details are still available in this page.')
    }
  }

  const instructions = values?.instructions ?? ''

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section>
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Guided assignment setup</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Create an assignment</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">Add course information, provide your requirements, and review the setup before any generation request can be made.</p>
      </section>

      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <AssignmentStepper currentStep={currentStep} onSelectStep={(step) => { setIntegrationMessage(''); setCurrentStep(step) }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {currentStep === 1 && <AssignmentDetailsStep register={register} errors={errors} />}
        {currentStep === 2 && <SourceMaterialsStep files={sourceFiles} onAddFiles={addFiles} onRemoveFile={(id) => setSourceFiles((files) => files.filter((file) => file.id !== id))} />}
        {currentStep === 3 && <AssignmentInstructionsStep value={instructions} error={errors.instructions?.message} onChange={(value) => setValue('instructions', value, { shouldDirty: true, shouldTouch: true, shouldValidate: true })} />}
        {currentStep === 4 && <GenerationPreferencesStep register={register} errors={errors} academicLevel={values?.academicLevel ?? defaultValues.academicLevel} />}
        {currentStep === 5 && <QuestionReviewStep questions={questions} onChange={setQuestions} />}
        {currentStep === 6 && <GenerationSummaryStep values={values ?? defaultValues} files={sourceFiles} questions={questions} />}

        {integrationMessage && <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200" role="alert"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /><p>{integrationMessage}</p></div>}

        <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row">
          <Button type="button" variant="secondary" disabled={currentStep === 1 || isSubmitting} onClick={() => { setIntegrationMessage(''); setCurrentStep((step) => Math.max(1, step - 1)) }}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Back
          </Button>
          {currentStep < assignmentConfig.steps.length ? (
            <Button type="button" onClick={() => void moveForward()}>
              Continue<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Request generation
            </Button>
          )}
        </div>
      </form>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400">Your details and instructions stay in this page session. They are not saved to an account or uploaded without connected services.</p>
    </div>
  )
}
