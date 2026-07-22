import type { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blogPosts'

const BASE = 'https://www.focusworkspace.app'

// Use real dates per content type — Google ignores identical programmatic dates
const D = (iso: string) => new Date(iso)

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                  lastModified: D('2026-06-30'), changeFrequency: 'weekly',  priority: 1.0 },
    // /workspace is noindexed (robots: {index:false}) — SEO value lives on landing pages, kept out of sitemap
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
    // Focus dashboard + streak/heatmap tracking (2026-07-03)
    { url: `${BASE}/dashboard`,                   lastModified: D('2026-07-03'), changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/focus-dashboard`,             lastModified: D('2026-07-03'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/pomodoro-streak-tracker`,     lastModified: D('2026-07-03'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/lofi-pomodoro`,               lastModified: D('2026-07-03'), changeFrequency: 'monthly', priority: 0.9  },
    { url: `${BASE}/notion-pomodoro-widget`,      lastModified: D('2026-07-03'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/lofi-timer-for-studying`,     lastModified: D('2026-07-03'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/ambient-focus-timer`,         lastModified: D('2026-07-03'), changeFrequency: 'monthly', priority: 0.85 },
    // Vietnamese landing pages (2026-07-08)
    { url: `${BASE}/vi/phong-hoc-online`,         lastModified: D('2026-07-08'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/vi/dong-ho-pomodoro`,         lastModified: D('2026-07-08'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/vi/nhac-lofi-hoc-bai`,        lastModified: D('2026-07-08'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/vi/tieng-mua-hoc-bai`,        lastModified: D('2026-07-08'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/vi/am-thanh-trang-tap-trung`, lastModified: D('2026-07-08'), changeFrequency: 'monthly', priority: 0.8  },
    { url: `${BASE}/vi/khong-gian-tap-trung`,     lastModified: D('2026-07-08'), changeFrequency: 'monthly', priority: 0.8  },
    // Vietnamese landing pages — full hreflang expansion (2026-07-22)
    { url: `${BASE}/vi/phong-hoc-anime`,             lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/phong-hoc-lap-trinh`,          lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/khong-gian-deep-work`,         lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/phong-tap-trung-adhd`,         lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/phong-hoc-ao`,                 lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/hoc-cung-nhau-online`,         lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/am-thanh-nen`,                 lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/tieng-on-nau`,                 lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/am-thanh-quan-cafe`,           lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/am-thanh-mua-bao`,             lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/am-thanh-rung`,                lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/am-thanh-lo-suoi`,             lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/nhac-tap-trung`,               lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/nhac-hoc-bai`,                 lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/nhac-lap-trinh`,               lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/widget-notion`,                lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/website-hoc-bai-mien-phi`,     lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/bang-thong-ke-hoc-tap`,        lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/dong-ho-lofi-pomodoro`,        lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/widget-pomodoro-notion`,       lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/theo-doi-chuoi-pomodoro`,      lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/dong-ho-tap-trung-am-thanh`,   lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/dong-ho-lofi-hoc-bai`,         lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/vi/gioi-thieu-bang-thong-ke`,     lastModified: D('2026-07-22'), changeFrequency: 'monthly', priority: 0.8 },
    // Blog index
    { url: `${BASE}/blog`,                        lastModified: D('2026-06-30'), changeFrequency: 'weekly',  priority: 0.8 },
  ]

  // /workspace/p/* preset pages are noindexed (doorway-page avoidance) — excluded from sitemap

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}
