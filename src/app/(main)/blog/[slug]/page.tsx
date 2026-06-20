import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BLOG_POSTS, getPostBySlug } from '@/lib/blogPosts'

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">

      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-white/30">
        <Link href="/" className="hover:text-white/60">Trang chủ</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-white/60">Blog</Link>
        <span>/</span>
        <span className="text-white/50">{post.category}</span>
      </nav>

      {/* Hero */}
      <div
        className="mb-8 flex h-48 items-center justify-center rounded-2xl text-8xl"
        style={{ background: `linear-gradient(135deg, ${post.coverGradient[0]}, ${post.coverGradient[1]})` }}
      >
        {post.emoji}
      </div>

      {/* Meta */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-violet-900/40 px-3 py-1 text-xs text-violet-300">
          {post.category}
        </span>
        <span className="text-xs text-white/30">
          {new Date(post.publishedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span className="text-xs text-white/30">{post.readTime} phút đọc</span>
      </div>

      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold leading-tight text-white">{post.title}</h1>

      {/* AdSense — top of article */}
      <div className="mb-8 flex h-20 items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-white/20">
        Google AdSense — 728×90
      </div>

      {/* Content */}
      <article
        className="prose prose-invert prose-violet max-w-none
          prose-headings:text-white prose-headings:font-semibold
          prose-p:text-white/70 prose-p:leading-relaxed
          prose-li:text-white/70
          prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300
          prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-violet-300
          prose-strong:text-white
          prose-h2:text-xl prose-h3:text-lg
          prose-ol:text-white/70 prose-ul:text-white/70"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* AdSense — mid article */}
      <div className="my-10 flex h-20 items-center justify-center rounded-xl border border-dashed border-white/10 text-xs text-white/20">
        Google AdSense — 300×250
      </div>

      {/* CTA widget */}
      <div className="my-8 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/20 p-6 border border-violet-500/20">
        <p className="text-sm text-violet-300 font-semibold mb-1">Thử ngay miễn phí</p>
        <h3 className="text-lg font-bold text-white mb-2">Tạo Widget Lofi của bạn</h3>
        <p className="text-sm text-white/60 mb-4">Mix nhạc lofi + ambient sound + hình nền GIF. Nhúng vào Notion chỉ trong 30 giây.</p>
        <Link
          href="/workspace"
          className="inline-block rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          Tạo Widget ngay →
        </Link>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-lg font-semibold text-white">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {related.map(p => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-violet-500/30 hover:bg-white/8"
              >
                <div
                  className="mb-3 flex h-20 items-center justify-center rounded-lg text-3xl"
                  style={{ background: `linear-gradient(135deg, ${p.coverGradient[0]}, ${p.coverGradient[1]})` }}
                >
                  {p.emoji}
                </div>
                <p className="text-sm font-medium text-white/80 group-hover:text-white line-clamp-2">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
