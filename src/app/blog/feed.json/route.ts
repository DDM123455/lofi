import { BLOG_POSTS } from '@/lib/blogPosts'

const BASE = 'https://www.focusworkspace.app'

export const dynamic = 'force-static'

export function GET() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  )

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'LofiSpace Blog',
    home_page_url: `${BASE}/blog`,
    feed_url: `${BASE}/blog/feed.json`,
    description: 'Study tips, focus science, and lofi — from LofiSpace.',
    language: 'en',
    items: posts.map(p => ({
      id: `${BASE}/blog/${p.slug}`,
      url: `${BASE}/blog/${p.slug}`,
      title: p.title,
      summary: p.excerpt,
      content_html: p.content,
      date_published: new Date(p.publishedAt).toISOString(),
      date_modified: new Date(p.dateModified || p.publishedAt).toISOString(),
      authors: [{ name: p.author }],
      tags: [p.category],
    })),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
