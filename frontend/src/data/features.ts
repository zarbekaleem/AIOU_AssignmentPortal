export interface Feature {
  id: string
  iconName: string
  title: string
  description: string
}

export const features: Feature[] = [
  {
    id: 'ai-generator',
    iconName: 'Sparkles',
    title: 'AI Assignment Generator',
    description: 'Upload assignment questions and prepare structured, editable answers with AI assistance. Supports theoretical, analytical, and MCQ question types.',
  },
  {
    id: 'document-uploads',
    iconName: 'Upload',
    title: 'Multiple Document Uploads',
    description: 'Work with PDF, DOCX, and image-based assignment question papers. Automatic text extraction and OCR processing for scanned documents.',
  },
  {
    id: 'export',
    iconName: 'FileDown',
    title: 'Word & PDF Export',
    description: 'Prepare downloadable assignment documents with 30 original AIOU-style cover designs in both Word and PDF formats.',
  },
  {
    id: 'quiz',
    iconName: 'BookOpen',
    title: 'Aaghi LMS Quiz Practice',
    description: 'Practice educational questions, revise important concepts, and track your topic-based performance to prepare for assessments.',
  },
]
