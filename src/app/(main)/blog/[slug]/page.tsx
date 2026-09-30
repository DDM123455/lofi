import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BLOG_POSTS, getPostBySlug, categorySlug } from '@/lib/blogPosts'
import { BlogPostingJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { AdBanner } from '@/components/ads/AdBanner'
import { AuthorBio, AUTHOR_TITLE, AUTHOR_URL } from '@/components/seo/AuthorBio'

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const url = `https://www.focusworkspace.app/blog/${post.slug}`
  const title = post.seoTitle ?? post.title
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.dateModified ?? post.publishedAt,
      authors: [post.author],
      section: post.category,
      siteName: 'LofiSpace',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  // Prefer posts from the same category so "Related Posts" is actually related,
  // then fill any remaining slots from the rest of the blog.
  const sameCategory = BLOG_POSTS.filter(p => p.slug !== post.slug && p.category === post.category)
  const otherCategory = BLOG_POSTS.filter(p => p.slug !== post.slug && p.category !== post.category)
  const related = [...sameCategory, ...otherCategory].slice(0, 3)

  const postUrl = `https://www.focusworkspace.app/blog/${post.slug}`

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">

      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Blog', url: 'https://www.focusworkspace.app/blog' },
        { name: post.title, url: postUrl },
      ]} />
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        publishedAt={post.publishedAt}
        dateModified={post.dateModified}
        imageUrl={`${postUrl}/opengraph-image`}
        authorName={post.author}
        authorTitle={AUTHOR_TITLE}
        authorUrl={AUTHOR_URL}
        articleSection={post.category}
        wordCount={post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length}
      />
      {post.faq && post.faq.length > 0 && <FaqJsonLd items={post.faq} />}

      <Breadcrumb items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Blog', url: 'https://www.focusworkspace.app/blog' },
        { name: post.title, url: postUrl },
      ]} />

      {/* Hero */}
      <div
        className="mb-8 flex h-48 items-center justify-center rounded-2xl text-8xl"
        style={{ background: `linear-gradient(135deg, ${post.coverGradient[0]}, ${post.coverGradient[1]})` }}
      >
        {post.emoji}
      </div>

      {/* Meta */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/blog/category/${categorySlug(post.category)}`}
          className="rounded-full bg-violet-900/40 px-3 py-1 text-xs text-violet-300 hover:bg-violet-900/60 transition-colors"
        >
          {post.category}
        </Link>
        <span className="text-xs text-white/30">
          {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span className="text-xs text-white/30">{post.readTime} min read</span>
        <span className="text-xs text-white/30">By {post.author}</span>
      </div>

      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold leading-tight text-white">{post.title}</h1>

      {/* AdSense — top of article */}
      <div className="mb-8">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_POST_TOP || process.env.NEXT_PUBLIC_AD_SLOT_BLOG_TOP || ''} format="horizontal" style={{ minHeight: 72 }} />
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
          prose-ol:text-white/70 prose-ul:text-white/70
          [&_.come-home-inline]:rounded-xl [&_.come-home-inline]:border [&_.come-home-inline]:border-amber-200/15
          [&_.come-home-inline]:bg-amber-100/5 [&_.come-home-inline]:px-4 [&_.come-home-inline]:py-3"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* FAQ — visible counterpart of the FAQPage JSON-LD above */}
      {post.faq && post.faq.length > 0 && (
        <section className="mt-12" aria-labelledby="post-faq">
          <h2 id="post-faq" className="mb-5 text-xl font-semibold text-white">Frequently asked questions</h2>
          <div className="space-y-3">
            {post.faq.map(item => (
              <details key={item.q} className="group rounded-xl border border-white/10 bg-white/5 px-5 py-4 open:bg-white/[0.07]">
                <summary className="cursor-pointer list-none font-medium text-white/85 marker:hidden">
                  <span className="mr-2 text-white/30 group-open:hidden">+</span>
                  <span className="mr-2 hidden text-white/30 group-open:inline">−</span>
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* AdSense — mid article */}
      <div className="my-10">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_POST_MID || process.env.NEXT_PUBLIC_AD_SLOT_BLOG_BOT || ''} format="auto" style={{ minHeight: 72 }} />
      </div>

      {/* CTA widget */}
      {post.cta === 'come-home' ? (
      <div className="my-8 rounded-2xl border border-amber-200/15 bg-gradient-to-br from-[#2a1c24] to-[#15101c] p-6">
        <p className="mb-1 text-sm font-semibold text-amber-200/80">🌙 A quiet place between work and sleep</p>
        <h3 className="mb-2 text-lg font-bold text-white">Try Come Home</h3>
        <p className="mb-4 text-sm text-white/60">Clear your mind, rest in a cozy room, or wind down for sleep. No account, no productivity scores — and nothing you write leaves your device.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/workspace?mode=home"
            className="inline-block rounded-full bg-amber-200/90 px-6 py-2 text-sm font-semibold text-[#2a1a14] transition-colors hover:bg-amber-100"
          >
            Try Come Home
          </Link>
          <Link href="/come-home" className="text-sm text-white/55 underline-offset-4 hover:text-white/80 hover:underline">
            What is Come Home?
          </Link>
        </div>
      </div>
      ) : (
      <div className="my-8 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/20 p-6 border border-violet-500/20">
        <p className="text-sm text-violet-300 font-semibold mb-1">Try it free — no account needed</p>
        <h3 className="text-lg font-bold text-white mb-2">Open Your LofiSpace Study Room</h3>
        <p className="text-sm text-white/60 mb-4">Mix lofi music + ambient sounds + animated GIF background. Embed in Notion in 30 seconds.</p>
        <Link
          href="/workspace"
          className="inline-block rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          Open Workspace — Free →
        </Link>
      </div>
      )}

      <AuthorBio />

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-lg font-semibold text-white">Related Posts</h2>
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
