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
//   (plus region-sharded https://*.google-analytics.com for GA4).
// - frame-src 'self': the only live <iframe> rendered on non-/workspace/-/embed pages is
//   the embed-code live preview (src/components/embed/EmbedGenerator.tsx), which points at
//   our own /embed route (same-origin). The actual YouTube IFrame API/player
//   (src/hooks/useYouTubePlayer.ts, src/app/embed/EmbedClient.tsx) only runs inside
//   /workspace and /embed, which are excluded from this policy, so youtube.com is not
//   needed in frame-src here.
// - img-src 'self' data: https:: next/image renders remote YouTube thumbnails
//   (img.youtube.com, see images.remotePatterns below) plus AdSense ad creative images;
//   allowing https: broadly avoids an ever-growing thumbnail/ad-image allowlist.
// - font-src 'self': fonts are self-hosted via next/font (Geist/Geist Mono), no external CDN.
// - object-src 'none', base-uri 'self': standard hardening, nothing in the app needs plugins
//   or dynamic <base> rewriting.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://www.clarity.ms",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://*.googlesyndication.com https://googleads.g.doubleclick.net https://www.clarity.ms",
  "frame-src 'self'",
  "font-src 'self'",
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
