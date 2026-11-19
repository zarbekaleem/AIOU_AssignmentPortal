import { Link } from 'react-router-dom'
import { FilePlus2, Files } from 'lucide-react'

export default function AssignmentsPage() {
  return (
    <section className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center dark:border-slate-800 dark:bg-slate-900 sm:px-10" aria-labelledby="assignments-heading">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"><Files className="h-6 w-6" aria-hidden="true" /></span>
      <h2 id="assignments-heading" className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Your assignment list will appear here</h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-400">Assignment history is unavailable until student account services are connected. You can still explore the assignment setup workflow.</p>
      <Link to="/app/assignments/new" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
        <FilePlus2 className="h-4 w-4" aria-hidden="true" />Create an assignment
      </Link>
    </section>
  )
}
