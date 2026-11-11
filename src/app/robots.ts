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
      // Block AI *training* crawlers only. Answer-engine crawlers that send visitors back
      // (OAI-SearchBot / ChatGPT-User for ChatGPT search, PerplexityBot for Perplexity) are
      // deliberately NOT listed: blocking them hid the site from AI answers.
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'ClaudeBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'Claude-Web', disallow: ['/'] },
      { userAgent: 'Bytespider', disallow: ['/'] },
      { userAgent: 'Applebot-Extended', disallow: ['/'] },
      { userAgent: 'Meta-ExternalAgent', disallow: ['/'] },
    ],
    sitemap: 'https://www.focusworkspace.app/sitemap.xml',
    host: 'https://www.focusworkspace.app',
  }
}
