import { useRef, useState } from 'react'
import { FileText, Image, Trash2, UploadCloud } from 'lucide-react'
import { assignmentConfig, assignmentFileLimitLabel } from '@/features/assignments/config/assignment'
import { formatFileSize, validateSourceFile } from '@/features/assignments/utils/sourceFiles'
import type { SelectedSourceFile } from '@/features/assignments/types/assignment.types'

interface SourceMaterialsStepProps {
  files: SelectedSourceFile[]
  onAddFiles: (files: File[]) => void
  onRemoveFile: (id: string) => void
}

export function SourceMaterialsStep({ files, onAddFiles, onRemoveFile }: SourceMaterialsStepProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const acceptFiles = (selected: FileList | File[]) => {
    const candidates = Array.from(selected)
    if (candidates.length > assignmentConfig.maxFiles) {
      setError('Select one source file at a time. Replace the selected file to choose another.')
      return
    }
    const invalid = candidates.find(validateSourceFile)
    if (invalid) {
      setError(`${invalid.name}: ${validateSourceFile(invalid)}`)
      return
    }
    setError(null)
    onAddFiles(candidates)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <section aria-labelledby="source-step-heading">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Step 2 · Source materials</p>
        <h2 id="source-step-heading" className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Add assignment questions or references</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Select local files to include with your assignment setup. They are not uploaded or stored by this page.</p>
      </div>

      <div
        onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => { event.preventDefault(); setIsDragging(false); acceptFiles(event.dataTransfer.files) }}
        className={`rounded-xl border-2 border-dashed px-5 py-10 text-center transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-slate-300 bg-slate-50/60 dark:border-slate-700 dark:bg-slate-950/40'}`}
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"><UploadCloud className="h-6 w-6" aria-hidden="true" /></span>
        <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">Drop files here or browse</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">One file · PDF, DOCX, JPG, JPEG or PNG · {assignmentFileLimitLabel}</p>
        <button type="button" onClick={() => inputRef.current?.click()} className="mt-4 min-h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-indigo-300">{files.length ? 'Replace selected file' : 'Browse files'}</button>
        <input ref={inputRef} type="file" accept={assignmentConfig.acceptedExtensions.join(',')} className="sr-only" onChange={(event) => { if (event.target.files) acceptFiles(event.target.files) }} aria-label="Select assignment source file" />
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Selection limit: {assignmentFileLimitLabel}. The server must validate files again when secure upload is connected.</p>
      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300" role="alert">{error}</p>}

      {files.length > 0 && (
        <ul className="mt-5 space-y-2" aria-label="Selected source files">
          {files.map(({ id, file }) => {
            const isImage = file.type.startsWith('image/')
            const Icon = isImage ? Image : FileText
            return (
              <li key={id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-200">{file.name}</span><span className="text-xs text-slate-500">{formatFileSize(file.size)}</span></span>
                <button type="button" onClick={() => onRemoveFile(id)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-950/40" aria-label={`Remove ${file.name}`}><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
