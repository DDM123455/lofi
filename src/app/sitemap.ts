import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blogPosts'
import { PRESETS } from '@/lib/presets'

const BASE = 'https://focusworkspace.app'

// Use real dates per content type — Google ignores identical programmatic dates
const D = (iso: string) => new Date(iso)

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                  lastModified: D('2026-06-30'), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/workspace`,                   lastModified: D('2026-06-29'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/scenes`,                      lastModified: D('2026-06-29'), changeFrequency: 'weekly',  priority: 0.85 },
    // Core SEO landing pages
    { url: `${BASE}/online-study-room`,           lastModified: D('2026-06-29'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/anime-study-room`,            lastModified: D('2026-06-29'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/coding-room`,                 lastModified: D('2026-06-29'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/focus-room`,                  lastModified: D('2026-06-29'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/deep-work-room`,              lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.85 },
    // New high-value landing pages
    { url: `${BASE}/pomodoro-timer`,              lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/rain-sounds`,                 lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/ambient-sounds`,              lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/study-with-me`,               lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/lofi-music`,                  lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/virtual-study-room`,          lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/adhd-focus-room`,             lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/focus-music`,                 lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/white-noise`,                 lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/brown-noise`,                 lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/notion-widget`,               lastModified: D('2026-06-30'), changeFrequency: 'monthly', priority: 0.85 },
    // P1 sound / keyword landing pages
    { url: `${BASE}/coffee-shop-sounds`,          lastModified: D('2026-07-01'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/study-music`,                 lastModified: D('2026-07-01'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/coding-music`,                lastModified: D('2026-07-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/thunderstorm-sounds`,         lastModified: D('2026-07-01'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/forest-sounds`,               lastModified: D('2026-07-01'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/fireplace-sounds`,            lastModified: D('2026-07-01'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/website-for-studying`,        lastModified: D('2026-07-01'), changeFrequency: 'monthly', priority: 0.85 },
    // Blog index
    { url: `${BASE}/blog`,                        lastModified: D('2026-06-30'), changeFrequency: 'weekly',  priority: 0.8 },
  ]

  const presetRoutes: MetadataRoute.Sitemap = PRESETS.map(preset => ({
    url: `${BASE}/workspace/p/${preset.slug}`,
    lastModified: D('2026-06-29'),
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
