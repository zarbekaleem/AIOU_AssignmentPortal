export interface AssignmentFormValues {
  title: string
  university: string
  courseName: string
  courseCode: string
  semester: string
  assignmentNumber: string
  studentName: string
  rollNumber: string
  tutorName: string
  submissionDate: string
  instructions: string
  language: 'English' | 'Urdu'
  academicLevel: '' | 'Undergraduate' | 'Graduate' | 'Other / Specify'
  academicLevelOther: string
  answerLength: 'Short' | 'Medium' | 'Detailed'
  answerFormat: 'Paragraphs' | 'Headings and Subheadings' | 'Bullet Points' | 'Structured Academic Format'
  wordLimit: string
  includeExamples: boolean
  explainCalculations: boolean
  includeFormulas: boolean
  formalTone: boolean
}

export interface AssignmentQuestion {
  id: string
  text: string
  included: boolean
}

export interface AssignmentGenerationRequest {
  details: Pick<AssignmentFormValues, 'title' | 'university' | 'courseName' | 'courseCode' | 'semester' | 'assignmentNumber' | 'studentName' | 'rollNumber' | 'tutorName' | 'submissionDate'>
  instructions: string
  preferences: Pick<AssignmentFormValues, 'language' | 'academicLevel' | 'academicLevelOther' | 'answerLength' | 'answerFormat' | 'wordLimit' | 'includeExamples' | 'explainCalculations' | 'includeFormulas' | 'formalTone'>
  questions: AssignmentQuestion[]
  selectedFiles: File[]
}

export interface SelectedSourceFile {
  id: string
  file: File
}
