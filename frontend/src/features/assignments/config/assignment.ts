export const assignmentConfig = {
  acceptedExtensions: ['.pdf', '.docx', '.jpg', '.jpeg', '.png'],
  acceptedMimeTypes: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
  ],
  maxFileSizeBytes: 20 * 1024 * 1024,
  maxFiles: 1,
  defaultUniversity: 'Allama Iqbal Open University (AIOU)',
  steps: [
    'Assignment details',
    'Source materials',
    'Your instructions',
    'Preferences',
    'Review questions',
    'Review & generate',
  ],
  instructionPresets: [
    { id: 'simple', label: 'Simple and easy language', text: 'Use simple, easy-to-understand academic language.' },
    { id: 'detailed', label: 'Detailed academic answers', text: 'Provide detailed academic answers with clear explanations.' },
    { id: 'concise', label: 'Concise answers', text: 'Keep answers concise while covering all essential points.' },
    { id: 'maths', label: 'Step-by-step mathematics', text: 'For mathematical questions, show each step and explain the working.' },
    { id: 'theory', label: 'Theory-based explanations', text: 'Explain theoretical concepts clearly and connect related ideas.' },
    { id: 'examples', label: 'Examples where appropriate', text: 'Include relevant examples where they help explain a concept.' },
  ],
  languages: ['English', 'Urdu'],
  academicLevels: ['Undergraduate', 'Graduate', 'Other / Specify'],
  answerLengths: ['Short', 'Medium', 'Detailed'],
  answerFormats: ['Paragraphs', 'Headings and Subheadings', 'Bullet Points', 'Structured Academic Format'],
} as const

export const assignmentFileLimitLabel = `${assignmentConfig.maxFileSizeBytes / (1024 * 1024)} MB per file`
