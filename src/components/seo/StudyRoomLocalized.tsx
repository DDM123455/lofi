import Link from 'next/link'
import type { Metadata } from 'next'
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { LangHtml } from '@/components/seo/LangHtml'
import { SITE_URL, STUDY_ROOM_HREFLANG, studyRoomLocale, type StudyRoomLocale } from '@/lib/studyRoomLocales'

export function studyRoomMetadata(lang: StudyRoomLocale['lang']): Metadata {
  const l = studyRoomLocale(lang)
  const url = `${SITE_URL}${l.path}`
  return {
    title: { absolute: `${l.metaTitle} | LofiSpace` },
    description: l.metaDesc,
    keywords: l.keywords,
    alternates: { canonical: url, languages: STUDY_ROOM_HREFLANG },
    openGraph: { title: l.metaTitle, description: l.metaDesc, url, type: 'website', locale: l.ogLocale },
    twitter: { card: 'summary_large_image', title: l.metaTitle, description: l.metaDesc },
  }
}

export function StudyRoomLocalized({ lang }: { lang: StudyRoomLocale['lang'] }) {
  const l = studyRoomLocale(lang)
  const url = `${SITE_URL}${l.path}`
  const app = `/workspace?lang=${l.lang}`
  const crumbs = [{ name: l.crumbHome, url: SITE_URL }, { name: l.crumb, url }]
  return (
    <div lang={l.lang}>
      <LangHtml lang={l.lang} />
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={l.faq} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: `LofiSpace — ${l.h1}`,
        description: l.metaDesc,
        url,
        inLanguage: l.lang,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      }) }} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={crumbs} />

        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
            {l.h1}
            <span className="mt-3 block text-xl font-normal text-violet-200/70 sm:text-2xl">{l.tagline}</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/60">{l.intro}</p>
          <Link href={app} className="inline-block rounded-full bg-violet-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-violet-500">
            {l.cta} →
          </Link>
          <p className="mt-4 text-xs text-white/40">{l.fine}</p>
        </section>

        <section className="mb-16" aria-labelledby="features">
          <h2 id="features" className="mb-6 text-center text-2xl font-semibold text-white">{l.featuresTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {l.features.map(f => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-2 text-2xl" aria-hidden>{f.emoji}</div>
                <h3 className="mb-1 font-medium text-white/90">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="steps">
          <h2 id="steps" className="mb-6 text-center text-2xl font-semibold text-white">{l.stepsTitle}</h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {l.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-200">{i + 1}</span>
                <h3 className="mb-1 font-medium text-white/90">{s.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-14" aria-labelledby="faq">
          <h2 id="faq" className="mb-6 text-2xl font-semibold text-white">{l.faqTitle}</h2>
          <div className="space-y-3">
            {l.faq.map(f => (
              <details key={f.q} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <summary className="cursor-pointer font-medium text-white/85">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="text-center">
          <p className="mb-5 text-lg text-white/70">{l.closing}</p>
          <Link href={app} className="inline-block rounded-full bg-violet-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-violet-500">
            {l.cta} →
          </Link>
          <p className="mt-6 text-xs text-white/35">
            <Link href="/online-study-room" hrefLang="en" className="underline underline-offset-4 hover:text-white/60">English</Link>
          </p>
        </section>
      </div>
    </div>
  )
}
