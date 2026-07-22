import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Ambient Focus Timer — Pomodoro Timer with Layered Ambient Sound',
  description:
    'A focus timer built around ambient sound — rain, forest, café, fire, thunder and more — layered under a Pomodoro cycle. For work, not just study. Free.',
  keywords: [
    'ambient focus timer', 'ambient sound timer', 'focus timer with sounds', 'ambient pomodoro',
    'work focus timer', 'ambient noise timer', 'deep work timer',
  ],
  openGraph: {
    title: 'Ambient Focus Timer — LofiSpace',
    description: 'Layer rain, forest, café or fire under a Pomodoro cycle built for work, not just study.',
    type: 'website',
    url: 'https://www.focusworkspace.app/ambient-focus-timer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ambient Focus Timer — LofiSpace',
    description: 'Layer rain, forest, café or fire under a Pomodoro cycle built for work, not just study.',
  },
  alternates: {
    canonical: 'https://www.focusworkspace.app/ambient-focus-timer',
    languages: {
      en: 'https://www.focusworkspace.app/ambient-focus-timer',
      vi: 'https://www.focusworkspace.app/vi/dong-ho-tap-trung-am-thanh',
      'x-default': 'https://www.focusworkspace.app/ambient-focus-timer',
    },
  },
}

const FAQ = [
  {
    q: 'What ambient sounds are available?',
    a: 'Rain, ocean waves, café chatter, campfire, wind, thunder, forest and city ambience — each with its own volume slider so you can layer several at once.',
  },
  {
    q: 'Is this only for lofi music fans?',
    a: 'No — the lofi music stream is entirely optional. You can run the Pomodoro timer with ambient sound only and no music at all, which is common for people who find music itself distracting at work.',
  },
  {
    q: 'Can I use this for deep work sessions, not just Pomodoro?',
    a: 'Yes. Set a longer custom focus duration via the embed generator, or simply keep the timer running past a single 25-minute cycle — the ambient mix keeps playing continuously either way.',
  },
  {
    q: 'Does ambient noise actually help focus?',
    a: 'Consistent background noise masks sudden, attention-grabbing sounds — a door closing, a notification, someone talking nearby — which is often what breaks concentration, more than silence itself.',
  },
]

const FEATURES = [
  { emoji: '🌧️', label: '8 ambient sound layers, independently mixed' },
  { emoji: '🍅', label: 'Pomodoro cycle with custom duration' },
  { emoji: '🎵', label: 'Optional lofi music — not required' },
  { emoji: '🔥', label: 'Streak + heatmap on the Focus Dashboard' },
  { emoji: '🖥️', label: 'Works for office work, not just study' },
  { emoji: '🔗', label: 'Save your exact mix as a shareable link' },
]

export default function AmbientFocusTimerPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/forest.mp4') +
    '&bgo=35&ls=lofi1&lv=40&at=forest:50,rain:30,wind:20&pom=1&clk=1&ac=34d399'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Ambient Focus Timer', url: 'https://www.focusworkspace.app/ambient-focus-timer' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Ambient Focus Timer"
        description="A Pomodoro timer built around layered ambient sound for deep work and study."
        url="https://www.focusworkspace.app/ambient-focus-timer"
        applicationCategory="ProductivityApplication"
        keywords={['ambient focus timer', 'ambient sound timer', 'deep work timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Ambient Focus Timer', url: 'https://www.focusworkspace.app/ambient-focus-timer' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-emerald-900/30 px-4 py-1 text-sm text-emerald-300 ring-1 ring-emerald-500/20">
            🌿 Ambient Sound · Optional Music · Custom Timer
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Ambient <span className="text-emerald-400">Focus Timer</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Rain, forest, café, fire, thunder — layer any mix of ambient sound under a Pomodoro
            timer. Music is optional. Built for work as much as study.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-emerald-600 px-8 py-3 font-semibold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-colors"
            >
              Start Focusing →
            </Link>
            <Link
              href="/ambient-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Browse All Sounds
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Built Around Sound, Not Silence</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-emerald-500/15 bg-emerald-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Ambient Sound, Specifically</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Most focus-timer apps default to music. Some people find music — even lofi — pulls
              attention rather than holding it, especially during writing or detailed analytical
              work. Ambient sound gives a steady auditory floor without a melody competing for
              attention.
            </p>
            <p>
              Layering matters too: a single sound (like rain alone) can get monotonous over a long
              session, while two or three layered at low volume — say forest plus a little wind —
              feels closer to a real, varied environment.
            </p>
            <p>
              The Pomodoro cycle keeps sessions structured, but the ambient mix doesn&apos;t reset
              between focus and break — so the environment stays continuous even as the timer
              switches phases.
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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Build your ambient mix</h2>
          <p className="mb-6 text-white/55">Pick your sounds, set the timer, and get to work.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-emerald-600 px-10 py-3 font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Open Ambient Focus Timer — Free →
          </Link>
        </div>

        <PomodoroCompare exclude="/ambient-focus-timer" />

        <RelatedPages exclude="/ambient-focus-timer" />
      </div>
    </>
  )
}
