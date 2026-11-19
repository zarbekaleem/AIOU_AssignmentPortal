import { z } from 'zod'

export const assignmentSchema = z.object({
  title: z.string().trim().min(2, 'Enter an assignment title').max(120, 'Use 120 characters or fewer'),
  university: z.string().trim().min(2, 'Enter your university'),
  courseName: z.string().trim().min(2, 'Enter the course name'),
  courseCode: z.string().trim().min(1, 'Enter the course code'),
  semester: z.string().trim().min(1, 'Enter your semester'),
  assignmentNumber: z.string().trim().min(1, 'Enter the assignment number'),
  studentName: z.string().trim().min(2, 'Enter the student name'),
  rollNumber: z.string().trim().min(1, 'Enter your roll or registration number'),
  tutorName: z.string(),
  submissionDate: z.string(),
  instructions: z.string().trim().min(10, 'Add at least 10 characters of assignment instructions'),
  language: z.enum(['English', 'Urdu']),
  academicLevel: z.enum(['', 'Undergraduate', 'Graduate', 'Other / Specify']),
  academicLevelOther: z.string(),
  answerLength: z.enum(['Short', 'Medium', 'Detailed']),
  answerFormat: z.enum(['Paragraphs', 'Headings and Subheadings', 'Bullet Points', 'Structured Academic Format']),
  wordLimit: z.string().refine((value) => value === '' || (/^\d+$/.test(value) && Number(value) > 0), 'Enter a positive whole-number word limit'),
  includeExamples: z.boolean(),
  explainCalculations: z.boolean(),
  includeFormulas: z.boolean(),
  formalTone: z.boolean(),
}).superRefine((values, context) => {
  if (values.academicLevel === 'Other / Specify' && !values.academicLevelOther.trim()) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['academicLevelOther'], message: 'Specify the academic level' })
  }
})

export type AssignmentSchemaValues = z.infer<typeof assignmentSchema>
