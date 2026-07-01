import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/embed',
        ],
      },
      // Block AI scrapers from training data
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
    ],
    sitemap: 'https://focusworkspace.app/sitemap.xml',
  }
}
