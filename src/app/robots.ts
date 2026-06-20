import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/embed'], // no need to index embed pages
      },
    ],
    sitemap: 'https://lofispace.app/sitemap.xml',
  }
}
