import Link from 'next/link'
import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blogPosts'
import { AdBanner } from '@/components/ads/AdBanner'

export const metadata: Metadata = {
  title: 'Blog — Lofi, Notion Tips & Productivity | LofiSpace',
  description: 'Hướng dẫn trang trí Notion, tổng hợp nhạc lofi học bài, tips tăng năng suất với ambient sound.',
  keywords: ['blog lofi', 'trang trí notion', 'nhạc lofi học bài', 'ambient sound', 'productivity tips'],
}

const CATEGORIES = ['Tất cả', 'Notion Tips', 'Music', 'Lifestyle', 'Productivity']

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Blog</h1>
        <p className="mt-3 text-white/50">
          Lofi · Notion Tips · Productivity · Aesthetic Workspace
        </p>
      </div>

      {/* AdSense — Top */}
      <div className="mb-10">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BLOG_TOP ?? ''} format="horizontal" style={{ minHeight: 72 }} />
      </div>

      {/* Category filter — visual only for now */}
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat, i) => (
          <span
            key={cat}
            className={`rounded-full px-4 py-1.5 text-sm cursor-pointer transition-colors ${
              i === 0
                ? 'bg-violet-600 text-white'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Featured post */}
      <Link
        href={`/blog/${BLOG_POSTS[0].slug}`}
        className="group mb-8 flex overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-violet-500/40 hover:bg-white/8"
      >
        <div
          className="hidden w-2/5 shrink-0 items-center justify-center text-7xl sm:flex"
          style={{ background: `linear-gradient(135deg, ${BLOG_POSTS[0].coverGradient[0]}, ${BLOG_POSTS[0].coverGradient[1]})` }}
        >
          {BLOG_POSTS[0].emoji}
        </div>
        <div className="flex flex-col justify-center p-6">
          <span className="mb-2 inline-block w-fit rounded-full bg-violet-900/40 px-3 py-0.5 text-xs text-violet-300">
            {BLOG_POSTS[0].category}
          </span>
          <h2 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
            {BLOG_POSTS[0].title}
          </h2>
          <p className="mt-2 text-sm text-white/50 line-clamp-2">{BLOG_POSTS[0].excerpt}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-white/30">
            <span>{new Date(BLOG_POSTS[0].publishedAt).toLocaleDateString('vi-VN')}</span>
            <span>{BLOG_POSTS[0].readTime} phút đọc</span>
          </div>
        </div>
      </Link>

      {/* Post grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.slice(1).map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-violet-500/40 hover:bg-white/8"
          >
            <div
              className="flex h-36 items-center justify-center text-5xl"
              style={{ background: `linear-gradient(135deg, ${post.coverGradient[0]}, ${post.coverGradient[1]})` }}
            >
              {post.emoji}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="mb-2 inline-block w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/50">
                {post.category}
              </span>
              <h3 className="flex-1 font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-white/40 line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-white/25">
                <span>{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</span>
                <span>{post.readTime} phút đọc</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* AdSense — Bottom */}
      <div className="mt-12">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BLOG_BOT ?? ''} format="auto" style={{ minHeight: 72 }} />
      </div>
    </div>
  )
}
