const BASE = 'https://www.focusworkspace.app'

interface SoftwareAppProps {
  type: 'SoftwareApplication' | 'WebApplication'
  name: string
  description: string
  url?: string
  applicationCategory?: string
  operatingSystem?: string
  offers?: { price: string; priceCurrency: string }
  keywords?: string[]
}

export function JsonLd({
  type,
  name,
  description,
  url = BASE,
  applicationCategory = 'ProductivityApplication',
  operatingSystem = 'Web',
  offers = { price: '0', priceCurrency: 'USD' },
  keywords = [],
}: SoftwareAppProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      ...offers,
    },
    keywords: keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'LofiSpace',
      url: BASE,
    },
    featureList: [
      'Lofi music player',
      'Ambient sounds mixer',
      'Pomodoro timer',
      'To-do list',
      'Calendar',
      'XP & achievement system',
      'Weather widget',
      'Animated backgrounds',
    ].join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LofiSpace',
    url: BASE,
    description:
      'Free online study room with lofi music, ambient sounds, Pomodoro timer and productivity tools.',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ItemListJsonLd({ items }: { items: { name: string; url: string; description?: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BlogPostingProps {
  title: string
  description: string
  url: string
  publishedAt: string
  dateModified?: string
  imageUrl?: string
  authorName?: string
}

export function BlogPostingJsonLd({
  title,
  description,
  url,
  publishedAt,
  dateModified,
  imageUrl,
  authorName = 'LofiSpace',
}: BlogPostingProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: dateModified || publishedAt,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LofiSpace',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(imageUrl ? { image: { '@type': 'ImageObject', url: imageUrl } } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LofiSpace',
    url: BASE,
    logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    description: 'Free online study room and focus workspace with lofi music, ambient sounds, Pomodoro timer and XP system.',
    sameAs: [
      'https://twitter.com/lofispace_app',
      'https://www.reddit.com/r/lofispace',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
