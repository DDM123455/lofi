import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Lofi Pomodoro Timer — Focus Sessions with Lofi Music',
  description:
    'A Pomodoro timer built around lofi music, not bolted onto it. 25-minute focus sessions, ambient sound layers, XP and streaks — free, no sign-up.',
  keywords: [
    'lofi pomodoro', 'lofi pomodoro timer', 'pomodoro with lofi music', 'lofi study timer',
    'pomodoro lofi hip hop', 'focus timer lofi', 'lofi girl pomodoro',
  ],
  openGraph: {
    title: 'Lofi Pomodoro Timer — LofiSpace',
    description: '25-minute focus sessions with lofi music baked into the timer, not a separate tab.',
    type: 'website',
    url: 'https://www.focusworkspace.app/lofi-pomodoro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lofi Pomodoro Timer — LofiSpace',
    description: '25-minute focus sessions with lofi music baked into the timer, not a separate tab.',
  },
  alternates: {
    canonical: 'https://www.focusworkspace.app/lofi-pomodoro',
    languages: {
      en: 'https://www.focusworkspace.app/lofi-pomodoro',
      vi: 'https://www.focusworkspace.app/vi/dong-ho-lofi-pomodoro',
      'x-default': 'https://www.focusworkspace.app/lofi-pomodoro',
    },
  },
}

const FAQ = [
  {
    q: 'How is this different from a regular Pomodoro timer?',
    a: 'Most Pomodoro timers are silent by design and expect you to run music in a separate tab. LofiSpace mixes a continuous lofi stream and ambient sounds directly into the same widget as the timer, so starting a session starts your music too.',
  },
  {
    q: 'Can I mute the music and just use the timer?',
    a: 'Yes. The lofi stream and every ambient sound layer has its own volume slider, including zero — you can run a completely silent Pomodoro if you prefer.',
  },
  {
    q: 'What lofi stations are available?',
    a: 'A rotating set of curated lofi hip-hop and synthwave streams, plus the ability to paste in your own YouTube lofi stream URL.',
  },
  {
    q: 'Does finishing a Pomodoro do anything besides start a break?',
    a: 'Yes — it logs XP, extends your daily streak, and (if you have the free Focus Dashboard open) adds to your session history and focus heatmap.',
  },
]

const FEATURES = [
  { emoji: '🎧', label: 'Continuous lofi stream, not a separate tab' },
  { emoji: '🍅', label: '25/5 Pomodoro cycle with visual progress ring' },
  { emoji: '🌧️', label: 'Layer rain, café or vinyl-crackle underneath' },
  { emoji: '🔥', label: 'XP, streaks and a focus heatmap' },
  { emoji: '✅', label: 'Link a task to auto-track pomodoros per task' },
  { emoji: '🔗', label: 'Share your exact setup via URL' },
]

export default function LofiPomodoroPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/lofi-bedroom.mp4') +
    '&bgo=40&ls=lofi1&lv=65&at=rain:35&pom=1&clk=1&ac=a78bfa'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Lofi Pomodoro', url: 'https://www.focusworkspace.app/lofi-pomodoro' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Lofi Pomodoro Timer"
        description="Pomodoro timer with lofi music and ambient sounds mixed directly into the widget."
        url="https://www.focusworkspace.app/lofi-pomodoro"
        applicationCategory="ProductivityApplication"
        keywords={['lofi pomodoro', 'pomodoro with music', 'lofi study timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Lofi Pomodoro', url: 'https://www.focusworkspace.app/lofi-pomodoro' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🎧 Lofi + Pomodoro, in one widget
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-violet-400">Lofi</span> Pomodoro Timer
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A Pomodoro timer that starts your lofi music with it, instead of asking you to juggle
            two tabs. 25-minute sessions, ambient layers, XP and streaks — free, forever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Start a Lofi Pomodoro →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              View My Dashboard
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">What&apos;s Different</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Lofi and Pomodoro Belong Together</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              The Pomodoro Technique structures your time; lofi music structures your attention.
              Its steady BPM and lack of lyrics give your brain a consistent backdrop instead of
              silence — which most people find harder to sustain focus in than gentle noise.
            </p>
            <p>
              Splitting the two across separate apps means one more thing to set up before you can
              actually start working, and one more thing to break your focus when you have to go
              switch tracks or restart a stream. LofiSpace keeps the music and the timer in the
              same session state, so pressing play starts both.
            </p>
            <p>
              Every completed Pomodoro also feeds your streak and the free Focus Dashboard, so the
              lofi sessions you&apos;re already doing start compounding into a visible habit.
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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/30 to-fuchsia-900/20 border border-violet-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready for a focused hour?</h2>
          <p className="mb-6 text-white/55">Press play and let the timer and the music run together.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Open Lofi Pomodoro — Free →
          </Link>
        </div>

        <PomodoroCompare exclude="/lofi-pomodoro" />

        <RelatedPages exclude="/lofi-pomodoro" />
      </div>
    </>
  )
}
