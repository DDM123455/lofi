import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/embed',      // legacy route — redirects to /workspace
          '/api/',
        ],
      },
    ],
    sitemap: 'https://focusworkspace.app/sitemap.xml',
  }
}
