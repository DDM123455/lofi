import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/blogPosts'
import { AdBanner } from '@/components/ads/AdBanner'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { BlogFilter } from './BlogFilter'

export const metadata: Metadata = {
  title: 'Study Tips & Lofi Advice Blog — LofiSpace',
  description: 'LofiSpace blog: how to study better, set up your workspace, use the Pomodoro technique, and find the best focus music for studying.',
  keywords: ['study tips', 'productivity blog', 'lofi music guide', 'pomodoro technique', 'ambient sound tips', 'focus workspace', 'study with me'],
  alternates: { canonical: 'https://focusworkspace.app/blog' },
  openGraph: {
    title: 'Study Tips & Lofi Advice Blog | LofiSpace',
    description: 'Guides on studying better, workspace setup, Pomodoro technique, and the best focus music.',
    url: 'https://focusworkspace.app/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LofiSpace Blog — Study Tips & Productivity Guides',
    description: 'Guides on studying better, workspace setup, and the best focus music.',
  },
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Blog', url: 'https://focusworkspace.app/blog' },
      ]} />

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">Study Tips & Lofi Blog</h1>
        <p className="mt-3 text-white/50">
          Study Tips · Lofi Music · Productivity · Aesthetic Workspace
        </p>
      </div>

      {/* AdSense — Top */}
      <div className="mb-10">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BLOG_TOP ?? ''} format="horizontal" style={{ minHeight: 72 }} />
      </div>

      {/* Client component handles category filter + post grid */}
      <BlogFilter posts={BLOG_POSTS} />

      {/* AdSense — Bottom */}
      <div className="mt-12">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_BLOG_BOT ?? ''} format="auto" style={{ minHeight: 72 }} />
      </div>
    </div>
  )
}
