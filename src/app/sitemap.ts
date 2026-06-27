import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blogPosts'
import { PRESETS } from '@/lib/presets'

const BASE = 'https://focusworkspace.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                           lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/workspace`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/scenes`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    // SEO landing pages
    { url: `${BASE}/online-study-room`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/anime-study-room`,     lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/coding-room`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/focus-room`,           lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/deep-work-room`,       lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    // Blog index
    { url: `${BASE}/blog`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const presetRoutes: MetadataRoute.Sitemap = PRESETS.map(preset => ({
    url: `${BASE}/workspace/p/${preset.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...presetRoutes, ...blogRoutes]
}
