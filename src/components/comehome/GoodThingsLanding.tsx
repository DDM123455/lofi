import Link from 'next/link'
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

/** Shared layout of the /good-things and /vi/dieu-tot-van-den landing pages. */
export interface GoodThingsLandingCopy {
  lang: 'en' | 'vi'
  url: string
  app: string
  crumbHome: string
  crumb: string
  h1: string
  tagline: string
  intro: string
  cta: string
  finePrint: string
  doorsTitle: string
  doors: { emoji: string; title: string; body: string }[]
  whyTitle: string
  why: string
  whyLink?: { href: string; label: string }
  privacyTitle: string
  privacy: string[]
  notTitle: string
  not: string
  faqTitle: string
  faq: { q: string; a: string }[]
  guidesTitle?: string
  guides?: { href: string; label: string }[]
  closing: string
  otherLang: { href: string; hrefLang: string; label: string }
}

export function GoodThingsLanding({ c }: { c: GoodThingsLandingCopy }) {
  const crumbs = [
    { name: c.crumbHome, url: 'https://www.focusworkspace.app' },
    { name: c.crumb, url: c.url },
  ]
  return (
    <div lang={c.lang}>
      <BreadcrumbJsonLd items={crumbs} />
      <FaqJsonLd items={c.faq} />
      <div className="bg-gradient-to-b from-[#221a14] via-[#130f15] to-[#0d0d14]">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <Breadcrumb items={crumbs} />

          <section className="mb-16 text-center">
            <div className="mb-6 text-5xl" aria-hidden>🌟</div>
            <h1 className="mb-5 text-4xl font-semibold leading-tight text-[#f6ebe0] sm:text-5xl">
              {c.h1}
              <span className="mt-3 block text-2xl font-normal text-amber-100/70">{c.tagline}</span>
            </h1>
            <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-white/60">{c.intro}</p>
            <Link href={c.app} className="inline-block rounded-full bg-amber-200/90 px-8 py-3 font-semibold text-[#2a1a14] transition-colors hover:bg-amber-100">
              {c.cta}
            </Link>
            <p className="mt-4 text-xs text-white/35">{c.finePrint}</p>
          </section>

          <section className="mb-16" aria-labelledby="doors">
            <h2 id="doors" className="mb-6 text-center text-2xl font-semibold text-white">{c.doorsTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {c.doors.map(d => (
                <div key={d.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>{d.emoji}</span>
                    <h3 className="font-medium text-white/90">{d.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16" aria-labelledby="why">
            <h2 id="why" className="mb-3 text-xl font-semibold text-white">{c.whyTitle}</h2>
            <p className="text-sm leading-relaxed text-white/60">
              {c.why}{' '}
              {c.whyLink && <Link href={c.whyLink.href} className="text-amber-200/80 underline underline-offset-4">{c.whyLink.label}</Link>}
            </p>
          </section>

          <section className="mb-16 rounded-2xl border border-white/10 bg-white/[0.03] p-7" aria-labelledby="privacy">
            <h2 id="privacy" className="mb-3 text-xl font-semibold text-white">🔒 {c.privacyTitle}</h2>
            <ul className="space-y-2 text-sm leading-relaxed text-white/60">
              {c.privacy.map(p => <li key={p}>• {p}</li>)}
            </ul>
          </section>

          <section className="mb-16 text-center" aria-labelledby="not">
            <h2 id="not" className="mb-3 text-xl font-semibold text-white">{c.notTitle}</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/55">{c.not}</p>
          </section>

          {c.guides && (
            <section className="mb-16" aria-labelledby="guides">
              <h2 id="guides" className="mb-5 text-xl font-semibold text-white">{c.guidesTitle}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.guides.map(g => (
                  <li key={g.href}>
                    <Link href={g.href} className="block h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-white/80 transition-colors hover:border-amber-200/25">{g.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-14" aria-labelledby="faq">
            <h2 id="faq" className="mb-6 text-2xl font-semibold text-white">{c.faqTitle}</h2>
            <div className="space-y-3">
              {c.faq.map(f => (
                <details key={f.q} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <summary className="cursor-pointer font-medium text-white/85">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center">
            <p className="mb-5 text-lg text-white/70">{c.closing}</p>
            <Link href={c.app} className="inline-block rounded-full bg-amber-200/90 px-8 py-3 font-semibold text-[#2a1a14] transition-colors hover:bg-amber-100">
              🌟 {c.cta}
            </Link>
            <p className="mt-6 text-xs text-white/35">
              <Link href={c.otherLang.href} hrefLang={c.otherLang.hrefLang} className="underline underline-offset-4 hover:text-white/60">{c.otherLang.label}</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
