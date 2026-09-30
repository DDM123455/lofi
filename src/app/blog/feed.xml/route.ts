import { BLOG_POSTS } from '@/lib/blogPosts'

const BASE = 'https://www.focusworkspace.app'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export const dynamic = 'force-static'

export function GET() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  )
  const updated = posts[0] ? new Date(posts[0].dateModified || posts[0].publishedAt) : new Date()

  const items = posts
    .map(p => {
      const url = `${BASE}/blog/${p.slug}`
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <dc:creator>${esc(p.author)}</dc:creator>
      <description>${esc(p.excerpt)}</description>
      <content:encoded><![CDATA[${p.content}]]></content:encoded>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>LofiSpace Blog</title>
    <link>${BASE}/blog</link>
    <atom:link href="${BASE}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Study tips, focus science, and lofi — from LofiSpace.</description>
    <language>en</language>
    <lastBuildDate>${updated.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
