import { blogPosts } from '@/data/blogs'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'
import { ArrowRight, BookMarked } from 'lucide-react'

export default function BlogSection() {
  return (
    <section
      id="blogs"
      aria-labelledby="blogs-heading"
      className="bg-white dark:bg-slate-950 py-20 border-b border-slate-100 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <BookMarked className="h-3.5 w-3.5" aria-hidden="true" />
              Student Resources &amp; Guides
            </span>
            <h2 id="blogs-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Essential Guides for AIOU Distance Learners
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Carefully curated advice on preparing assignments, submission deadlines, formatting guidelines, and distance education study strategies.
            </p>
          </div>
          
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex-shrink-0"
            aria-label="View all study resources and guides"
          >
            Browse All Guides
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Transparent Disclosure Notice */}
        <div className="mt-10 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Note: The articles listed above represent sample educational outlines designed for Section 01 layout demonstration. In-depth editorial versions will be linked as dedicated content routes are rolled out.
          </p>
        </div>

      </div>
    </section>
  )
}
