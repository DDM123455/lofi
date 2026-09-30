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
      // Block AI scrapers from training data (does not affect search indexing)
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'OAI-SearchBot', disallow: ['/'] },
      { userAgent: 'ChatGPT-User', disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'ClaudeBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Claude-Web', disallow: ['/'] },
      { userAgent: 'PerplexityBot', disallow: ['/'] },
      { userAgent: 'Bytespider', disallow: ['/'] },
      { userAgent: 'Applebot-Extended', disallow: ['/'] },
      { userAgent: 'Meta-ExternalAgent', disallow: ['/'] },
    ],
    sitemap: 'https://www.focusworkspace.app/sitemap.xml',
    host: 'https://www.focusworkspace.app',
  }
}
