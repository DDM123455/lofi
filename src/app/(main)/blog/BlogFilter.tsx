'use client'

import { useState } from 'react'
import type { BlogPostCard } from '@/lib/blogPosts'
import { BlogPostGrid } from './BlogPostGrid'

interface Props {
  posts: BlogPostCard[]
  categories: string[]
}

export function BlogFilter({ posts, categories }: Props) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active)

  return (
    <>
      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              active === cat
                ? 'bg-violet-600 text-white'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <BlogPostGrid posts={filtered} />
    </>
  )
}
