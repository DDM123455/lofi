import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BLOG_POSTS, BLOG_CATEGORIES, getCategoryBySlug } from '@/lib/blogPosts'
import { BreadcrumbJsonLd, ItemListJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { BlogPostGrid } from '../../BlogPostGrid'

export function generateStaticParams() {
  return BLOG_CATEGORIES.map(c => ({ category: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) return {}
  const url = `https://www.focusworkspace.app/blog/category/${cat.slug}`
  const title = `${cat.label} — LofiSpace Blog`
  const description = `Every LofiSpace article about ${cat.label.toLowerCase()}: guides, tips, and how-tos for studying, focusing, and building a better workspace.`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const cat = getCategoryBySlug(category)
  if (!cat) notFound()

  const posts = BLOG_POSTS.filter(p => p.category === cat.label)
  const blogUrl = 'https://www.focusworkspace.app/blog'
  const categoryUrl = `${blogUrl}/category/${cat.slug}`

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Breadcrumb items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Blog', url: blogUrl },
        { name: cat.label, url: categoryUrl },
      ]} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Blog', url: blogUrl },
        { name: cat.label, url: categoryUrl },
      ]} />
      <ItemListJsonLd items={posts.map(p => ({
        name: p.title,
        url: `${blogUrl}/${p.slug}`,
        description: p.excerpt,
      }))} />

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">{cat.label} — LofiSpace Blog</h1>
        <p className="mt-3 text-white/50">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} about {cat.label.toLowerCase()}
        </p>
      </div>

      <BlogPostGrid posts={posts} />
    </div>
  )
}
