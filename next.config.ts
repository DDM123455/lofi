import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
    ],
  },
  async redirects() {
    return [
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
        ],
      },
    ]
  },
}

export default nextConfig
