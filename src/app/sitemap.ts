import type { MetadataRoute } from 'next'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/blogPosts'
import { BG_PRESETS } from '@/lib/backgrounds'

const BASE = 'https://www.focusworkspace.app'

// Use real dates per content type — Google ignores identical programmatic dates
const D = (iso: string) => new Date(iso)

// Walk src/app/(main) and return every static page route ("/foo", "/vi/bar", …).
// Skips dynamic segments ([slug]), route groups ((main)), and private folders (_x).
// Wrapped by the caller in try/catch so a filesystem hiccup never breaks the sitemap.
function discoverMainRoutes(): string[] {
  const root = join(process.cwd(), 'src', 'app', '(main)')
  const out: string[] = []
  const walk = (dir: string, segs: string[]) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const name = entry.name
        if (name.startsWith('_') || name.startsWith('[') || (name.startsWith('(') && name.endsWith(')'))) {
          if (name.startsWith('(') && name.endsWith(')')) walk(join(dir, name), segs) // route group: keep depth
          continue
        }
        walk(join(dir, name), [...segs, name])
      } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
        out.push('/' + segs.join('/'))
      }
    }
  }
  walk(root, [])
  return out
}

// Scene backgrounds are animated mp4 loops (migrated off Giphy GIFs) — surface them to
// Google Video Search via the sitemap's video extension. Each preset now ships a real
// first-frame poster JPG (see BG_PRESETS), so use it as the video thumbnail.
const sceneVideos = BG_PRESETS.map(p => ({
  title: p.label,
  thumbnail_loc: `${BASE}${p.poster}`,
  description: `${p.label} — animated ambient background for lofi study sessions.`,
  content_loc: `${BASE}${p.url}`,
}))

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                  lastModified: D('2026-06-30'), changeFrequency: 'weekly',  priority: 1.0 },
    // /workspace is noindexed (robots: {index:false}) — SEO value lives on landing pages, kept out of sitemap
    { url: `${BASE}/scenes`,                      lastModified: D('2026-06-29'), changeFrequency: 'weekly',  priority: 0.85, videos: sceneVideos },
    { url: `${BASE}/about`,                       lastModified: D('2026-07-30'), changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${BASE}/privacy`,                     lastModified: D('2026-09-01'), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms`,                       lastModified: D('2026-09-01'), changeFrequency: 'yearly',  priority: 0.3 },
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

  // Freshest blog date drives the blog index + category pages instead of a stale constant
  const newestBlog = BLOG_POSTS.reduce<Date>((acc, p) => {
    const d = new Date(p.dateModified || p.publishedAt)
    return d > acc ? d : acc
  }, new Date('2026-06-29'))

  const categoryRoutes: MetadataRoute.Sitemap = BLOG_CATEGORIES.map(c => ({
    url: `${BASE}/blog/category/${c.slug}`,
    lastModified: newestBlog,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // /workspace/p/* preset pages are noindexed (doorway-page avoidance) — excluded from sitemap

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Safety net: any (main) page not already curated above still enters the sitemap, so a new
  // landing page is never silently missing. Curated entries keep their tuned priority/freq.
  const known = new Set(staticRoutes.map(r => r.url))
  let discovered: MetadataRoute.Sitemap = []
  try {
    discovered = discoverMainRoutes()
      .map(path => (path === '/' ? BASE : `${BASE}${path}`))
      .filter(url => !known.has(url) && !url.includes('/blog/category'))
      .map(url => ({ url, lastModified: newestBlog, changeFrequency: 'monthly' as const, priority: 0.6 }))
  } catch {
    discovered = []
  }

  return [...staticRoutes, ...discovered, ...categoryRoutes, ...blogRoutes]
}
