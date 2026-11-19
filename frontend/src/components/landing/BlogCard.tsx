import { Link } from 'react-router-dom'
import { ArrowRight, Tag, BookOpen } from 'lucide-react'
import type { BlogPost } from '@/data/blogs'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Illustrative Thumbnail Banner */}
      <div className="h-44 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-indigo-100/30 dark:from-slate-800 dark:via-slate-900 dark:to-indigo-950/40 flex flex-col items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800 text-center relative">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-xs flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
          {post.imageAlt}
        </span>
        <span className="absolute top-3 right-3 text-[10px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider bg-white/80 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700">
          Guide
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
              <Tag className="h-3 w-3" aria-hidden="true" />
              {post.category}
            </span>
            <span className="text-xs text-slate-400">
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
            {post.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* Read More Link */}
        <Link
          to={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/link mt-auto pt-2"
          aria-label={`Read guide: ${post.title}`}
        >
          Read Guide
          <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
