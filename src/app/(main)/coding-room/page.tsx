import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Coding Room — Focus Music & Ambient Sounds for Developers',
  description:
    'A dedicated online coding room with synthwave music, city ambience, dark UI and a coding cat companion. Built for developers who need to focus. Free.',
  keywords: [
    'coding room', 'coding music', 'programming focus music', 'developer study room',
    'synthwave coding', 'focus music coding', 'code with me', 'coding ambient sounds',
  ],
  openGraph: {
    title: 'Coding Room — LofiSpace',
    description: 'Synthwave music, dark UI, coding cat companion. Focus workspace for developers.',
    type: 'website',
    url: 'https://focusworkspace.app/coding-room',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Room — LofiSpace',
    description: 'Synthwave music, dark UI, coding cat companion. Focus workspace for developers.',
  },
  alternates: { canonical: 'https://focusworkspace.app/coding-room' },
}

const FAQ = [
  {
    q: 'What music is best for coding?',
    a: 'Instrumental music without lyrics — like synthwave, lofi hip hop or ambient electronic — works best for coding. It provides stimulation without activating the language-processing parts of your brain.',
  },
  {
    q: 'What is the coding cat?',
    a: 'An animated SVG cat companion that types alongside you on screen. It reacts when you complete Pomodoro sessions and can be dragged, resized, or hidden.',
  },
  {
    q: 'Can I use this for long coding sessions?',
    a: 'Yes. The Pomodoro timer helps prevent burnout by reminding you to take breaks. The XP system tracks your daily progress and streak.',
  },
  {
    q: 'Does it work offline?',
    a: 'The lofi music streams require internet. Ambient sounds, the timer, and all widgets work offline after the initial load.',
  },
]

const PRESET_FEATURES = [
  { emoji: '🌃', label: 'Midnight cityscape backgrounds' },
  { emoji: '🎹', label: 'Synthwave & dark lofi music' },
  { emoji: '🌆', label: 'City rain ambient sounds' },
  { emoji: '🐱', label: 'Animated coding cat companion' },
  { emoji: '🍅', label: 'Pomodoro timer with XP' },
  { emoji: '🕐', label: 'Clock & session tracker' },
]

export default function CodingRoomPage() {
  // Midnight Coding scene params
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif') +
    '&bgo=50&ls=lofi2&lv=70&at=city:30,wind:20&pom=1&clk=1&ac=22d3ee'

  return (
    <>
      <JsonLd
        type="WebApplication"
        name="LofiSpace Coding Room"
        description="Online coding focus room with synthwave music, city ambience and coding cat companion."
        url="https://focusworkspace.app/coding-room"
        applicationCategory="DeveloperApplication"
        keywords={['coding room', 'programming music', 'developer focus', 'synthwave coding']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-900/30 px-4 py-1 text-sm text-cyan-300 ring-1 ring-cyan-500/20">
            💻 Synthwave · Dark UI · Coding Cat
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-cyan-400">Coding</span> Room
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A dark, distraction-free workspace built for developers. Synthwave beats, city rain
            ambience, a coding cat companion and Pomodoro timer — everything you need for a
            productive coding session.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-500 transition-colors"
            >
              Enter Coding Room →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Scenes
            </Link>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Built for Developers</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PRESET_FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why section */}
        <section className="mb-16 rounded-2xl border border-cyan-500/15 bg-cyan-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Ambient Sound Helps You Code</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Developers need deep focus — the kind that lets you hold complex logic in your head
              for extended periods. Silence can feel too empty; noisy environments break concentration.
              Ambient sound with instrumental music hits the sweet spot.
            </p>
            <p>
              Synthwave's driving electronic rhythms increase alertness without the distraction of
              lyrics. City rain adds consistent white noise that masks ambient office sounds.
              Together they create a flow-state environment that experienced developers swear by.
            </p>
            <p>
              The Pomodoro timer keeps sessions structured. 25 minutes of focus, 5-minute break —
              your brain stays sharp and you avoid the 4-hour coding marathon that leaves you
              exhausted and prone to bugs.
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-cyan-900/30 to-violet-900/20 border border-cyan-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to ship something?</h2>
          <p className="mb-6 text-white/55">Open the coding room and enter the zone.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-cyan-600 px-10 py-3 font-semibold text-white hover:bg-cyan-500 transition-colors"
          >
            Open Coding Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/coding-room" />
      </div>
    </>
  )
}
