import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Focus Room — Deep Focus Workspace with Pomodoro Timer',
  description:
    'A minimalist online focus room designed for deep work. Ambient sounds, Pomodoro timer, no distractions. Enter a flow state and get more done in less time.',
  keywords: [
    'focus room', 'deep focus', 'focus workspace online', 'pomodoro focus room',
    'concentration room', 'deep work workspace', 'flow state workspace', 'minimal study room',
  ],
  openGraph: {
    title: 'Focus Room — Deep Work Workspace | LofiSpace',
    description: 'Minimal focus room with ambient sounds, Pomodoro timer and XP rewards. Enter flow state.',
    type: 'website',
    url: 'https://focusworkspace.app/focus-room',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Room — LofiSpace',
    description: 'Minimal focus room with ambient sounds, Pomodoro timer and XP rewards.',
  },
  alternates: { canonical: 'https://focusworkspace.app/focus-room' },
}

const FAQ = [
  {
    q: 'What is a focus room?',
    a: 'A focus room is a minimal, distraction-free workspace designed specifically to help you enter and maintain deep concentration — often called a "flow state".',
  },
  {
    q: 'What makes this different from just playing music?',
    a: 'The combination of structured Pomodoro intervals, a todo list, XP progress tracking and optimised ambient sound creates a system — not just background noise. The routine itself trains your brain to focus on command.',
  },
  {
    q: 'How many Pomodoros should I do per day?',
    a: 'Most productivity experts recommend 8–12 Pomodoros (4–6 hours of focused work) as a sustainable daily maximum. LofiSpace tracks your streak so you can build this habit over time.',
  },
  {
    q: 'Can I share my focus room settings with others?',
    a: 'Yes. Customise the workspace and copy the URL — it encodes all your settings. Share the link and anyone can open your exact setup.',
  },
]

const BENEFITS = [
  { emoji: '🧠', title: 'Enter Flow State Faster', desc: 'Consistent ambient sound creates a conditioned trigger for focus.' },
  { emoji: '⏱️', title: 'Structured Sessions', desc: 'Pomodoro intervals prevent mental fatigue and sustain high output.' },
  { emoji: '📈', title: 'Track Progress', desc: 'XP, streaks and daily logs make your effort visible and motivating.' },
  { emoji: '🔇', title: 'Minimal Distractions', desc: 'Clean UI, no notifications, no social features — just work.' },
]

export default function FocusRoomPage() {
  // Thunderstorm Focus scene — high-focus preset
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=60&ls=lofi1&lv=50&at=thunder:60,rain:70&pom=1&clk=1&ac=818cf8'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Focus Room', url: 'https://focusworkspace.app/focus-room' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Focus Room"
        description="Minimal deep-focus workspace with ambient sounds, Pomodoro timer and XP progress tracking."
        url="https://focusworkspace.app/focus-room"
        keywords={['focus room', 'deep work', 'pomodoro', 'flow state', 'concentration']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
            🎯 Deep Work · Pomodoro · Flow State
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-indigo-400">Focus</span> Room
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A minimal, distraction-free workspace built for deep work. Thunderstorm ambience,
            structured Pomodoro sessions and XP tracking help you enter — and stay in — a
            flow state.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500 transition-colors"
            >
              Enter Focus Room →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Scenes
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Why It Works</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFITS.map(b => (
              <div key={b.title} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 text-2xl">{b.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{b.title}</h3>
                  <p className="text-sm text-white/50">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The science */}
        <section className="mb-16 rounded-2xl border border-indigo-500/15 bg-indigo-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">The Science of Focus</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Deep work — the ability to concentrate without distraction on cognitively
              demanding tasks — is becoming both increasingly rare and increasingly valuable.
              Building a focus ritual is the first step.
            </p>
            <p>
              Studies show that consistent environmental cues (the same sounds, the same setup)
              reduce the time your brain needs to enter focused mode. Over time the ambient
              sound alone can trigger the neural pathways associated with deep work.
            </p>
            <p>
              The Pomodoro technique works because it converts overwhelming tasks into small,
              bounded units with clear end points. Each completed Pomodoro is a win — and
              LofiSpace makes that win visible with XP and streak tracking.
            </p>
          </div>
        </section>

        {/* FAQ */}
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

        {/* CTA */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-violet-900/20 border border-indigo-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Start your focus session</h2>
          <p className="mb-6 text-white/55">No sign-up. No cost. Just open and work.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-indigo-600 px-10 py-3 font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Open Focus Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/focus-room" />
      </div>
    </>
  )
}
