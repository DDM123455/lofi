import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Online Study Room — Free Virtual Study Space with Lofi Music',
  description:
    'Join a free online study room with lofi music, ambient sounds, Pomodoro timer, to-do list and XP system. Study smarter — no sign-up needed.',
  keywords: [
    'online study room', 'virtual study room', 'study with me online', 'lofi study room',
    'free study room', 'online focus room', 'pomodoro study room', 'study music online',
  ],
  openGraph: {
    title: 'Free Online Study Room — LofiSpace',
    description: 'Virtual study space with lofi music, ambient sounds and productivity tools. No sign-up.',
    type: 'website',
    url: 'https://focusworkspace.app/online-study-room',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Study Room — LofiSpace',
    description: 'Virtual study space with lofi music, ambient sounds and productivity tools.',
  },
  alternates: { canonical: 'https://focusworkspace.app/online-study-room' },
}

const FAQ = [
  {
    q: 'What is an online study room?',
    a: 'An online study room is a virtual workspace with ambient music, focus timers and productivity tools that simulate the atmosphere of studying in a library or café — without leaving your home.',
  },
  {
    q: 'Is this free to use?',
    a: 'Yes, LofiSpace is completely free. No account or subscription needed. Open the workspace and start studying immediately.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes, LofiSpace is fully responsive and works on phones and tablets. All widgets are touch-friendly.',
  },
  {
    q: 'Can I embed it in Notion?',
    a: 'Yes. Open the workspace, customise it, then copy the link and paste it into a Notion /embed block.',
  },
  {
    q: 'What is the Pomodoro timer?',
    a: 'The Pomodoro technique splits study sessions into 25-minute focused intervals with 5-minute breaks. LofiSpace has a built-in Pomodoro timer that awards XP when a session completes.',
  },
]

const FEATURES = [
  { emoji: '🎵', title: 'Lofi Music Player', desc: 'Curated lofi streams from different genres — jazz hop, synthwave, chill beats.' },
  { emoji: '🌧️', title: 'Ambient Sound Mixer', desc: 'Layer rain, café noise, fire crackling, wind — create your perfect soundscape.' },
  { emoji: '🍅', title: 'Pomodoro Timer', desc: '25-minute focus sessions with XP rewards. Build streaks and level up.' },
  { emoji: '✅', title: 'To-Do List', desc: 'Add tasks, check them off, auto-log completions to your daily calendar.' },
  { emoji: '📅', title: 'Daily Calendar', desc: 'Track what you accomplished each day. Completed tasks appear automatically.' },
  { emoji: '⭐', title: 'XP & Achievements', desc: 'Earn XP for every Pomodoro. Level up and unlock achievements.' },
  { emoji: '🌤️', title: 'Weather Widget', desc: 'Live weather for your city. Background auto-adapts to current conditions.' },
  { emoji: '🐱', title: 'Coding Cat Companion', desc: 'An animated cat sits beside you while you study. Draggable and resizable.' },
]

export default function OnlineStudyRoomPage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1'

  return (
    <>
      <JsonLd
        type="WebApplication"
        name="LofiSpace Online Study Room"
        description="Free virtual study room with lofi music, ambient sounds, Pomodoro timer and productivity tools."
        url="https://focusworkspace.app/online-study-room"
        keywords={['online study room', 'virtual study room', 'lofi study', 'pomodoro timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            📚 Free · No sign-up · Works on any device
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Your Free{' '}
            <span className="text-violet-400">Online Study Room</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Study online with lofi music, ambient sounds, a built-in Pomodoro timer, to-do list
            and XP rewards — everything you need in one beautiful workspace.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Open Study Room →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Browse Scenes
            </Link>
          </div>
        </div>

        {/* Feature grid */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Everything in One Place
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/8 bg-white/4 p-5 transition-all hover:border-violet-500/30 hover:bg-white/6"
              >
                <div className="mb-3 text-3xl">{f.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-16 rounded-2xl border border-white/8 bg-white/3 p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">How It Works</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: '1', title: 'Open the Workspace', desc: 'No account needed. Click the button above and start immediately.' },
              { step: '2', title: 'Customise Your Vibe', desc: 'Choose lofi music, layer ambient sounds, pick a background scene.' },
              { step: '3', title: 'Start a Pomodoro', desc: 'Hit Start, focus for 25 minutes, earn XP. Build your streak.' },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-1 font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-white/50">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/20 border border-violet-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to focus?</h2>
          <p className="mb-6 text-white/55">
            Join thousands of students studying with LofiSpace every day.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
          >
            Open Study Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/online-study-room" />
      </div>
    </>
  )
}
