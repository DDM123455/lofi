import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Deep Work Room — Online Workspace for Maximum Concentration',
  description:
    'An online deep work room with rain ambience, minimal UI and Pomodoro timer. Designed for solving hard problems, writing and long focus sessions. Free.',
  keywords: [
    'deep work room', 'deep work online', 'deep work music', 'concentration workspace',
    'deep focus room', 'flow state workspace', 'intense focus music', 'cal newport deep work',
  ],
  openGraph: {
    title: 'Deep Work Room — Maximum Concentration Workspace | LofiSpace',
    description: 'Minimal online room for deep work. Rain ambience, Pomodoro timer, XP system. Free.',
    type: 'website',
    url: 'https://focusworkspace.app/deep-work-room',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Work Room — LofiSpace',
    description: 'Minimal online room for deep work. Rain ambience, Pomodoro timer, XP system.',
  },
  alternates: { canonical: 'https://focusworkspace.app/deep-work-room' },
}

const FAQ = [
  {
    q: 'What is deep work?',
    a: 'Deep work (coined by Cal Newport) is professional activity performed in a state of distraction-free concentration that pushes cognitive capabilities to the limit — producing maximum value in minimum time.',
  },
  {
    q: 'How does ambient sound help with deep work?',
    a: 'Steady ambient sound — particularly rain — masks unpredictable background noise. Unpredictable noise is the biggest enemy of concentration because it triggers an involuntary attention reflex. Rain provides consistent, non-distracting coverage.',
  },
  {
    q: 'What is the difference between focus room and deep work room?',
    a: 'The focus room uses a thunderstorm preset ideal for medium-intensity tasks. The deep work room uses a heavier rain preset with a darker, more minimal aesthetic — tuned for sustained, high-intensity cognitive effort over 2-4 hour blocks.',
  },
  {
    q: 'How do I track my deep work hours?',
    a: 'LofiSpace tracks Pomodoro sessions, daily streaks and total focus minutes. The progress card shows your XP, current streak and weekly session dots.',
  },
]

const PRINCIPLES = [
  { num: '01', title: 'Ritual', desc: 'Same sounds. Same setup. Every time. Train your brain to associate the environment with deep focus.' },
  { num: '02', title: 'Isolation', desc: 'One browser tab. One task. The workspace shows nothing except what you need.' },
  { num: '03', title: 'Time-boxing', desc: 'Pomodoro sessions give your deep work sessions a defined structure. Intensity over duration.' },
  { num: '04', title: 'Measurement', desc: 'XP, streaks, and session logs make your output visible. What gets measured, gets done.' },
]

export default function DeepWorkRoomPage() {
  // Rainy Library scene — deep focus preset
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('https://media.giphy.com/media/xT9IgG50Lg7rusyOGY/giphy.gif') +
    '&bgo=45&ls=lofi1&lv=55&at=rain:45,cafe:15&pom=1&clk=1&ac=c4b5fd'

  return (
    <>
      <JsonLd
        type="WebApplication"
        name="LofiSpace Deep Work Room"
        description="Minimal online deep work room with rain ambience and Pomodoro timer for maximum concentration."
        url="https://focusworkspace.app/deep-work-room"
        keywords={['deep work room', 'deep focus', 'concentration workspace', 'flow state']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🧠 Maximum Concentration · Rain · Minimal
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-violet-400">Deep Work</span> Room
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            For the hardest problems. A minimal, distraction-free environment tuned for
            sustained deep concentration — rainy library ambience, structured Pomodoro
            sessions and progress tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Enter Deep Work Room →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Scenes
            </Link>
          </div>
        </div>

        {/* Principles */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">4 Principles of Deep Work</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(p => (
              <div key={p.num} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 font-mono text-2xl font-bold text-violet-400/50">{p.num}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-white/50">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Room presets */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Room Preset</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
            {[
              ['🌧️', 'Heavy rain ambience'],
              ['📚', 'Library background'],
              ['🎵', 'Low-BPM lofi music'],
              ['🍅', 'Pomodoro 25/5 min'],
              ['📊', 'XP + streak tracking'],
              ['🕐', 'Session clock'],
            ].map(([emoji, label]) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2">
                <span>{emoji}</span>
                <span className="text-white/65">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/35">All settings can be customised inside the workspace.</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-indigo-900/20 border border-violet-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Do the work that matters</h2>
          <p className="mb-6 text-white/55">Open the room. Start the timer. Begin.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Open Deep Work Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/deep-work-room" />
      </div>
    </>
  )
}
