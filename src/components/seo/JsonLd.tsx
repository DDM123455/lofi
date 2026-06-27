const BASE = 'https://focusworkspace.app'

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
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/blog?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
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
