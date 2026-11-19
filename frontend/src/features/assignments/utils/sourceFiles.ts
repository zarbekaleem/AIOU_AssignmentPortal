import { assignmentConfig } from '@/features/assignments/config/assignment'

export function validateSourceFile(file: File): string | null {
  const extension = `.${file.name.split('.').pop()?.toLowerCase() ?? ''}`
  const validExtension = (assignmentConfig.acceptedExtensions as readonly string[]).includes(extension)
  const validMimeType = file.type === '' || (assignmentConfig.acceptedMimeTypes as readonly string[]).includes(file.type)

  if (!validExtension || !validMimeType) return 'Choose a PDF, DOCX, JPG, JPEG, or PNG file.'
  if (file.size > assignmentConfig.maxFileSizeBytes) return `Each file must be no larger than ${assignmentConfig.maxFileSizeBytes / (1024 * 1024)} MB.`
  if (file.size === 0) return 'This file is empty. Choose another file.'
  return null
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
