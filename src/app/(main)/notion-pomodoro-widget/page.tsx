import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Notion Pomodoro Widget — Run a Timer Inside Your Notion Page',
  description:
    'Embed a working Pomodoro timer — with lofi music and ambient sounds — directly into your Notion workspace. Customize duration, sound and theme, then copy one iframe.',
  keywords: [
    'notion pomodoro widget', 'notion pomodoro timer', 'pomodoro widget notion', 'embed pomodoro notion',
    'notion focus timer', 'notion timer embed', 'pomodoro notion template',
  ],
  openGraph: {
    title: 'Notion Pomodoro Widget — LofiSpace',
    description: 'A real, working Pomodoro timer embedded inside Notion — with lofi music built in.',
    type: 'website',
    url: 'https://www.focusworkspace.app/notion-pomodoro-widget',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notion Pomodoro Widget — LofiSpace',
    description: 'A real, working Pomodoro timer embedded inside Notion — with lofi music built in.',
  },
  alternates: { canonical: 'https://www.focusworkspace.app/notion-pomodoro-widget' },
}

const FAQ = [
  {
    q: 'Is this a Notion template or a real timer?',
    a: 'It\'s a real, running Pomodoro timer — not a static Notion template with a countdown gif. It counts down live, plays lofi music, and switches to a break automatically inside the embedded iframe.',
  },
  {
    q: 'How do I add it to a Notion page?',
    a: 'Build your embed link with the generator on our Notion Widget page, type /embed in any Notion page, and paste the link. The timer, music and background appear inline.',
  },
  {
    q: 'Can I set a custom focus/break length?',
    a: 'Yes. The embed generator lets you set the focus and break duration in minutes before you copy the code — it is not locked to 25/5.',
  },
  {
    q: 'Does the Notion embed track my streak?',
    a: 'Yes, if you open the same browser\'s Focus Dashboard afterward — sessions completed inside the Notion embed are saved to the same local session history as the main workspace.',
  },
  {
    q: 'Will it slow down my Notion page?',
    a: 'No — it loads as a single lightweight iframe and only starts playing audio once you interact with it, same as any embedded video.',
  },
]

const STEPS = [
  { step: '1', title: 'Configure', desc: 'Pick a background, lofi stream, accent color and Pomodoro duration in the embed generator.' },
  { step: '2', title: 'Copy the iframe', desc: 'One click copies a ready-to-paste <iframe> snippet — no API key or OAuth required.' },
  { step: '3', title: 'Paste in Notion', desc: 'Type /embed in any Notion page, paste the link, and the live timer appears inline.' },
  { step: '4', title: 'Focus', desc: 'Click once to unmute, then start the timer. Completed sessions save to your Focus Dashboard.' },
]

export default function NotionPomodoroWidgetPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Notion Pomodoro Widget', url: 'https://www.focusworkspace.app/notion-pomodoro-widget' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Notion Pomodoro Widget"
        description="A configurable, embeddable Pomodoro timer with lofi music for Notion pages."
        url="https://www.focusworkspace.app/notion-pomodoro-widget"
        applicationCategory="ProductivityApplication"
        keywords={['notion pomodoro widget', 'notion timer embed', 'notion focus timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
            📝 Notion · Pomodoro · Lofi
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Notion <span className="text-indigo-400">Pomodoro Widget</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A real, running Pomodoro timer — with lofi music, ambient sound and a custom duration —
            that lives inside your Notion page as a single embed block.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/notion-widget"
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500 transition-colors"
            >
              Build Your Embed →
            </Link>
            <Link
              href="/workspace?pom=1"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Try the Timer First
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">4 Steps to a Working Timer in Notion</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {STEPS.map(s => (
              <div key={s.step} className="rounded-xl border border-white/10 bg-white/3 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                    {s.step}
                  </span>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-indigo-500/15 bg-indigo-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Run a Timer Inside Notion?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              If your tasks, notes and study plan already live in Notion, switching to a separate
              timer app is one more context switch you don&apos;t need. Embedding the timer keeps your
              focus session in the same page as the work it&apos;s timing.
            </p>
            <p>
              Unlike a static countdown-gif template, this is a live iframe — the timer actually
              counts down, the lofi stream actually plays, and a completed Pomodoro actually logs
              to your streak and Focus Dashboard, the same as running the full workspace.
            </p>
            <p>
              It works in personal Notion pages, shared team wikis, or a public Notion site — anywhere
              Notion allows an /embed block.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">FAQ</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-2 font-semibold text-white text-sm">{q}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-violet-900/20 border border-indigo-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Embed this lofi Pomodoro widget in Notion</h2>
          <p className="mb-6 text-white/55">Configure it once on the Notion Widget page, then paste it anywhere.</p>
          <Link
            href="/notion-widget"
            className="inline-block rounded-full bg-indigo-600 px-10 py-3 font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Open the Embed Generator →
          </Link>
        </div>

        <RelatedPages exclude="/notion-pomodoro-widget" />
      </div>
    </>
  )
}
