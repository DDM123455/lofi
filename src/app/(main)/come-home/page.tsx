import Link from 'next/link'
import type { Metadata } from 'next'
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { EVENING_POSTS } from '@/lib/blogPostsEvening'

const URL = 'https://www.focusworkspace.app/come-home'
const APP = '/workspace?mode=home'

export const metadata: Metadata = {
  title: 'Come Home — A Quiet Place to Unwind After Work',
  description:
    'A calm digital space between work and sleep. Clear your mind with a private brain dump, rest in a cozy room, breathe for two minutes, or wind down for bed. Free, no account.',
  keywords: [
    'how to relax after work', 'unwind after work', 'brain dump', 'clear your mind before bed',
    'evening routine', 'overthinking at night', 'relaxing after a long day', 'wind down before bed',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, vi: 'https://www.focusworkspace.app/vi/ve-nha', 'x-default': URL },
  },
  openGraph: {
    title: 'Come Home — A Quiet Place Between Work and Sleep',
    description: 'Leave the day behind. A private brain dump, a cozy room, soft rain and a gentle wind-down — free, no account.',
    url: URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Come Home — A Quiet Place Between Work and Sleep',
    description: 'Leave the day behind. Brain dump, cozy room, soft rain, gentle wind-down. Free.',
  },
}

const FAQ = [
  {
    q: 'What is Come Home mode?',
    a: 'Come Home is an evening mode inside Focus Workspace. Instead of timers and to-do lists, it offers a quiet space to decompress after work: a private brain dump, a cozy room to rest in, a two-minute calming experience, soft ambient sound, a view of the lights across the street for company, and a five-minute wind-down for sleep.',
  },
  {
    q: 'Is what I write in the brain dump saved anywhere?',
    a: 'No. Brain dump text stays on your device while you write and is discarded when you release it. It is never stored, synced or sent to a server, and it is never included in analytics. Only “good moments” you explicitly choose to keep are saved — and only in your own browser.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Come Home is free and works without sign-up, like the rest of Focus Workspace.',
  },
  {
    q: 'Is Come Home therapy or a mental health treatment?',
    a: 'No. Come Home is a relaxation space, not a medical or therapeutic tool. If you are struggling with stress, sleep or your mood over a longer period, please talk to a doctor or a mental health professional.',
  },
  {
    q: 'Will it play sound automatically?',
    a: 'No. Sound stays off until you turn it on. When you do, it starts softly with gentle rain, and you can mix rain, wind, fireplace, café, ocean, night city and forest sounds at your own volume.',
  },
  {
    q: 'How do I get back to my focus workspace?',
    a: 'Tap the ☀️ button in the top corner (or the Focus switch on the welcome screen). Your timer, tasks, background and sounds are exactly as you left them.',
  },
]

const NEEDS = [
  { emoji: '🛋️', title: 'I just want to rest', body: 'A cozy apartment at night: warm lamp, rain on the window, a cup of tea, and a very small clock. Nothing to do.' },
  { emoji: '🌧️', title: 'I need to calm down', body: 'Two minutes of slow waves and soft light, paced with your breathing. Four short sentences. That’s all.' },
  { emoji: '💭', title: 'I need to clear my mind', body: 'Write everything that’s taking up space, then choose how to let it go: send it up to the stars, float it down a river as paper boats, burn it, give it to the wind, or let the rain wash it away.' },
  { emoji: '🎧', title: 'I want some quiet', body: 'Rain, wind, fireplace, café, ocean, night city and forest — each with its own gentle volume.' },
  { emoji: '🏙️', title: 'I want some company', body: 'Look out at the building across the street, where other people are winding down too — lights slowly coming on and going off.' },
  { emoji: '🌙', title: 'I want to prepare for sleep', body: 'Five minutes where the screen dims, the sound lowers, and the day gently ends with “Good night.”' },
]

export default function ComeHomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Come Home', url: URL },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Come Home — Evening Decompression Mode',
          description: 'A calm digital space to unwind after work: private brain dump, cozy room, breathing-paced calm, ambient sound and a sleep wind-down.',
          url: URL,
          applicationCategory: 'LifestyleApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          isPartOf: { '@type': 'WebApplication', name: 'Focus Workspace', url: 'https://www.focusworkspace.app/workspace' },
          publisher: { '@type': 'Organization', name: 'LofiSpace', url: 'https://www.focusworkspace.app' },
        }) }}
      />
      <FaqJsonLd items={FAQ} />

      <div className="bg-gradient-to-b from-[#1a1219] via-[#110d15] to-[#0d0d14]">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <Breadcrumb items={[
            { name: 'Home', url: 'https://www.focusworkspace.app' },
            { name: 'Come Home', url: URL },
          ]} />

          {/* Hero */}
          <section className="mb-20 text-center">
            <div className="mb-6 text-5xl" aria-hidden>🌙</div>
            <h1 className="mb-5 text-4xl font-semibold leading-tight text-[#f6ebe0] sm:text-5xl">
              Come Home
              <span className="mt-3 block text-2xl font-normal text-amber-100/70 sm:text-3xl">A quiet place between work and sleep</span>
            </h1>
            <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-white/60">
              When work is over but your mind is still running, Come Home gives you a quiet space to slow down,
              clear your thoughts, and simply rest.
            </p>
            <p className="mx-auto mb-9 max-w-xl text-white/45">You did enough today. You don’t have to solve everything tonight.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={APP}
                className="rounded-full bg-amber-200/90 px-8 py-3 font-semibold text-[#2a1a14] shadow-lg shadow-black/30 transition-colors hover:bg-amber-100"
              >
                Come Home
              </Link>
              <Link href="/workspace" className="rounded-full border border-white/15 px-8 py-3 text-white/70 transition-colors hover:border-white/30 hover:text-white">
                ☀️ Focus Workspace
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/35">Free · No account · Sound stays off until you choose it</p>
          </section>

          {/* How it works */}
          <section className="mb-20" aria-labelledby="how">
            <h2 id="how" className="mb-3 text-center text-2xl font-semibold text-white">How it works</h2>
            <p className="mx-auto mb-10 max-w-xl text-center text-white/50">
              Come Home asks one small question — <em>how was today?</em> — and then another: <em>what do you need right now?</em>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {NEEDS.map(n => (
                <div key={n.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>{n.emoji}</span>
                    <h3 className="font-medium text-white/90">{n.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{n.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-amber-200/10 bg-amber-100/[0.03] p-5">
              <h3 className="mb-1 font-medium text-white/90">✦ One thing from today</h3>
              <p className="text-sm leading-relaxed text-white/55">
                Write one sentence about your day. Let a hard moment go — or keep a good one as a star in your own private
                “memory sky”, there for the evenings you come back. You can also open your sky and add a star directly.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-20 rounded-2xl border border-white/10 bg-white/[0.03] p-7" aria-labelledby="privacy">
            <h2 id="privacy" className="mb-3 text-xl font-semibold text-white">🔒 Private by design</h2>
            <ul className="space-y-2 text-sm leading-relaxed text-white/60">
              <li>• What you write in the brain dump never leaves your device and is discarded when you let it go.</li>
              <li>• Nothing you write is sent to a server or included in analytics — we only count anonymous events like “a session was completed”.</li>
              <li>• Good moments you choose to keep live only in your own browser’s storage. You can let any of them go at any time.</li>
              <li>• No account, no email, no profile.</li>
            </ul>
          </section>

          {/* Positioning */}
          <section className="mb-20 text-center" aria-labelledby="what-not">
            <h2 id="what-not" className="mb-3 text-xl font-semibold text-white">No pressure. No scores.</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/55">
              Come Home isn’t a productivity tool, and it isn’t therapy. There are no streaks, badges or reminders that you
              “wasted time”. It’s simply a calm digital space to leave the day behind. If stress or sleep has been hard for a
              while, please reach out to a doctor or someone you trust — you deserve real support.
            </p>
          </section>

          {/* Evening guides — internal links into the cluster */}
          <section className="mb-20" aria-labelledby="guides">
            <h2 id="guides" className="mb-6 text-2xl font-semibold text-white">Evening Reset guides</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {EVENING_POSTS.map(p => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="flex h-full items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-amber-200/25">
                    <span className="text-xl" aria-hidden>{p.emoji}</span>
                    <span className="text-sm font-medium text-white/80">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-16" aria-labelledby="faq">
            <h2 id="faq" className="mb-6 text-2xl font-semibold text-white">Questions</h2>
            <div className="space-y-3">
              {FAQ.map(f => (
                <details key={f.q} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <summary className="cursor-pointer font-medium text-white/85">{f.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="text-center">
            <p className="mb-5 text-lg text-white/70">Leave the day behind.</p>
            <Link href={APP} className="inline-block rounded-full bg-amber-200/90 px-8 py-3 font-semibold text-[#2a1a14] transition-colors hover:bg-amber-100">
              🌙 Come Home
            </Link>
            <p className="mt-6 text-xs text-white/35">
              <Link href="/vi/ve-nha" hrefLang="vi" className="underline underline-offset-4 hover:text-white/60">Tiếng Việt</Link>
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
