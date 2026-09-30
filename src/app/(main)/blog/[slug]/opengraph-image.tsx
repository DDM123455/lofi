import { ImageResponse } from 'next/og'
import { BLOG_POSTS, getPostBySlug } from '@/lib/blogPosts'
import { OG_SIZE, OG_CONTENT_TYPE } from '@/lib/ogImage'

export const alt = 'LofiSpace Blog'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.title ?? 'LofiSpace Blog'
  const [g1, g2] = post?.coverGradient ?? ['#1a0d24', '#0d0d14']
  const emoji = post?.emoji ?? '📝'
  const category = post?.category ?? 'Study Tips'

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: 72,
        background: `linear-gradient(135deg, ${g1} 0%, ${g2} 100%)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
          <span style={{ fontSize: 40 }}>{emoji}</span>
          <span>{category}</span>
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: 'rgba(255,255,255,0.55)' }}>
          <span style={{ color: '#a78bfa', fontWeight: 700 }}>focusworkspace.app</span>
          <span>/blog</span>
        </div>
      </div>
    ),
    size,
  )
}
