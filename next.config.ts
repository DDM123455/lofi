import type { NextConfig } from 'next'
import createBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// Content-Security-Policy for every route EXCEPT /workspace and /embed (those two
// are meant to be iframed by Notion/embed platforms and only set frame-ancestors —
// see the SAMEORIGIN block below for where this is attached).
//
// Sources included, and why:
// - script-src 'self': app's own bundles.
// - 'unsafe-inline': GA4 and Microsoft Clarity are loaded via inline
//   `dangerouslySetInnerHTML` snippets (src/app/layout.tsx, src/components/analytics/ClarityScript.tsx).
//   A static next.config.ts headers() function can't generate a per-request nonce
//   (no access to the request), so 'unsafe-inline' is the pragmatic choice here —
//   this is a deliberate tradeoff, not an oversight.
// - https://www.googletagmanager.com: GA4 loader script (src/app/layout.tsx).
// - https://pagead2.googlesyndication.com, https://*.googlesyndication.com,
//   https://googleads.g.doubleclick.net: Google AdSense loader + ad creatives
//   (src/app/layout.tsx uses pagead2.googlesyndication.com; AdSense itself renders
//   ad units and further requests from the wider googlesyndication/doubleclick domains).
// - https://www.clarity.ms: Microsoft Clarity loader (src/components/analytics/ClarityScript.tsx
//   injects a script tag with src https://www.clarity.ms/tag/<id>).
// - connect-src mirrors the analytics/ad vendors above since GA4, Clarity and AdSense
//   all beacon data back over fetch/XHR/sendBeacon from those same origins
//   (plus region-sharded https://*.google-analytics.com for GA4). GA4 also sends hits to
//   https://www.google.com/g/collect and *.analytics.google.com — without those the hits
//   were being blocked on every page under this policy. Clarity's tag loads its script
//   from scripts.clarity.ms and uploads to a sharded *.clarity.ms collector.
// - The WORKSPACE's own needs are also allowed here, even though /workspace itself is
//   excluded from this policy. A CSP belongs to the document, and Next.js <Link> navigations
//   are client-side: someone who lands on the homepage / a blog post / a landing page and
//   then clicks "Open Workspace" is still running under THIS policy. Without these entries
//   the YouTube player, its fonts and the weather widget were blocked ((blocked:csp)) on that
//   path — music silently never started until a fresh tab or a hard reload. Needed:
//     script-src  https://www.youtube.com https://s.ytimg.com   (IFrame API + widgetapi)
//     frame-src   https://www.youtube.com https://www.youtube-nocookie.com (player, YT backgrounds)
//     style-src / font-src  fonts.googleapis.com / fonts.gstatic.com (Outfit, Space Grotesk)
//     connect-src api.open-meteo.com, nominatim.openstreetmap.org (weather widget)
//     media-src   https: blob:  (custom background video URLs)
// - frame-src 'self' additionally covers the embed-code live preview
//   (src/components/embed/EmbedGenerator.tsx), which points at our own /embed route.
// - img-src 'self' data: https:: next/image renders remote YouTube thumbnails
//   (img.youtube.com, see images.remotePatterns below) plus AdSense ad creative images;
//   allowing https: broadly avoids an ever-growing thumbnail/ad-image allowlist.
// - font-src: Geist is self-hosted via next/font; the workspace pulls Outfit/Space Grotesk
//   from Google Fonts (see above).
// - object-src 'none', base-uri 'self': standard hardening, nothing in the app needs plugins
//   or dynamic <base> rewriting.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://www.youtube.com https://s.ytimg.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "media-src 'self' https: blob:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://www.google.com https://*.analytics.google.com https://api.open-meteo.com https://nominatim.openstreetmap.org",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
  "font-src 'self' https://fonts.gstatic.com",
  "object-src 'none'",
  "base-uri 'self'",
].join('; ')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async redirects() {
    return [
      // Canonical domain: non-www → www (defense-in-depth; also configured at the Vercel domain layer)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'focusworkspace.app' }],
        destination: 'https://www.focusworkspace.app/:path*',
        permanent: true,
      },
      // Phase 1: /embed → /workspace (308 permanent, preserves query params)
      {
        source: '/embed',
        destination: '/workspace',
        permanent: true,
      },
      // Phase 5: Vietnamese blog slugs → English slugs (301 permanent)
      {
        source: '/blog/trang-tri-notion-widget-lofi',
        destination: '/blog/lofi-widget-notion-embed',
        permanent: true,
      },
      {
        source: '/blog/nhac-lofi-hoc-bai-hieu-qua',
        destination: '/blog/best-lofi-music-for-studying',
        permanent: true,
      },
      {
        source: '/blog/setup-ban-lam-viec-aesthetic',
        destination: '/blog/aesthetic-desk-setup-guide',
        permanent: true,
      },
      {
        source: '/blog/pomodoro-technique-hoc-bai',
        destination: '/blog/pomodoro-technique-guide',
        permanent: true,
      },
    ]
  },
  // Security + frame headers
  async headers() {
    return [
      // Global security headers for all routes
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
      // Long-term cache for background videos (large, static, filename-versioned by deploy)
      {
        source: '/video/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Allow /workspace to be iframed by Notion and any embed platform
      {
        source: '/workspace',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors *' },
        ],
      },
      // Keep /embed headers for the redirect response
      {
        source: '/embed',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors *' },
        ],
      },
      // Prevent framing of all other pages
      {
        source: '/((?!workspace|embed).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: CSP },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
