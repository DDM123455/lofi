import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Free Pomodoro Timer Online — Study & Work with Music',
  description:
    'Free online Pomodoro timer with lofi music, ambient sounds, XP rewards and streak tracking. 25-minute sessions with breaks. No sign-up.',
  keywords: [
    'pomodoro timer', 'pomodoro timer online', 'free pomodoro timer', 'pomodoro technique',
    'study timer', 'focus timer', 'pomodoro with music', 'pomodoro app', 'pomodoro clock',
    '25 minute timer', 'pomodoro for students',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/pomodoro-timer',
    languages: {
      en: 'https://www.focusworkspace.app/pomodoro-timer',
      vi: 'https://www.focusworkspace.app/vi/dong-ho-pomodoro',
      'x-default': 'https://www.focusworkspace.app/pomodoro-timer',
    },
  },
  openGraph: {
    title: 'Free Pomodoro Timer Online with Lofi Music | LofiSpace',
    description: 'Free Pomodoro timer with lofi music, ambient sounds and XP rewards. No sign-up. Start in 10 seconds.',
    url: 'https://www.focusworkspace.app/pomodoro-timer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Pomodoro Timer with Lofi Music | LofiSpace',
    description: 'Free online Pomodoro timer — lofi music, ambient sounds, XP rewards, streak tracking.',
  },
}

const FAQ = [
  {
    q: 'What is the Pomodoro Technique?',
    a: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. You work in 25-minute focused intervals (called "Pomodoros") separated by 5-minute breaks. After 4 Pomodoros, you take a longer 15-30 minute break.',
  },
  {
    q: 'Why does the Pomodoro Technique work?',
    a: 'The human brain cannot sustain peak concentration indefinitely. Research suggests that 25-minute intervals align with natural ultradian rhythms — cycles of high and low alertness that repeat roughly every 90 minutes. Short breaks prevent mental fatigue from compounding, keeping your output consistent throughout the day.',
  },
  {
    q: 'Is the LofiSpace Pomodoro timer free?',
    a: 'Yes, completely free. No account, no subscription, no hidden costs. Open the workspace and start your first Pomodoro session immediately.',
  },
  {
    q: 'Can I use the Pomodoro timer with music?',
    a: 'Yes — and that is the core advantage of LofiSpace. While the timer runs, lofi music plays and ambient sounds layer in the background. The combination creates a consistent auditory environment that trains your brain to focus on command.',
  },
  {
    q: 'What happens when a Pomodoro session completes?',
    a: 'You earn 25 XP, your daily session count increases, and your study streak is extended. A sound notification plays and the timer automatically switches to a 5-minute break countdown.',
  },
  {
    q: 'How many Pomodoros should I do per day?',
    a: 'Most productivity experts recommend 8-12 Pomodoros (4-6 hours of deep work) as a sustainable daily maximum. Start with 4 and build up. Quality of focus matters more than quantity.',
  },
  {
    q: 'Can I change the Pomodoro duration?',
    a: 'Yes. Inside the workspace you can adjust the focus duration (15-60 minutes) and break length to match your preferences and work style.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes. LofiSpace is fully responsive and works on phones and tablets. The timer widget is touch-friendly and the layout adapts to all screen sizes.',
  },
]

const HOW_IT_WORKS = [
  { step: '1', title: 'Choose your room', desc: 'Pick a study scene — anime room, coding room, rainy library — or open the custom workspace.' },
  { step: '2', title: 'Start the timer', desc: 'Hit Start on the Pomodoro timer. 25 minutes of focused work begins. Music and sounds play automatically.' },
  { step: '3', title: 'Work without distraction', desc: 'The timer counts down visibly on screen. Your only job is to stay on task until the bell rings.' },
  { step: '4', title: 'Earn XP and take a break', desc: 'Session complete — you earn 25 XP and your streak grows. Take 5 minutes, then repeat.' },
]

const SCIENCE_POINTS = [
  { emoji: '🧠', title: 'Prevents cognitive fatigue', desc: 'Forced breaks stop your prefrontal cortex from becoming overwhelmed. You maintain consistent output across the day instead of trailing off after hour 2.' },
  { emoji: '⚡', title: 'Creates urgency', desc: 'A visible countdown activates mild time pressure — enough to override procrastination without triggering anxiety.' },
  { emoji: '🎯', title: 'Defeats perfectionism', desc: 'Each session is just 25 minutes. You cannot perfect anything in 25 minutes, so your brain stops trying and just does the work.' },
  { emoji: '📈', title: 'Makes progress visible', desc: 'Counting Pomodoros is more motivating than counting hours. "I did 8 Pomodoros today" feels concrete and achievable.' },
]

export default function PomodoroTimerPage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Pomodoro Timer', url: 'https://www.focusworkspace.app/pomodoro-timer' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Pomodoro Timer"
        description="Free online Pomodoro timer with lofi music, ambient sounds and XP reward system."
        url="https://www.focusworkspace.app/pomodoro-timer"
        keywords={['pomodoro timer', 'free pomodoro', 'study timer', 'pomodoro with music']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-red-900/30 px-4 py-1 text-sm text-red-300 ring-1 ring-red-500/20">
            🍅 25-min focus sessions · XP rewards · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Free <span className="text-red-400">Pomodoro Timer</span> Online
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A built-in Pomodoro timer combined with lofi music, ambient sounds, and an XP reward
            system. Work in 25-minute focused sessions, take structured breaks, and build your
            daily study streak — completely free, no account needed.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-lg shadow-red-900/40 hover:bg-red-500 transition-colors"
            >
              Start Pomodoro Timer →
            </Link>
            <Link
              href="/online-study-room"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              See Study Rooms
            </Link>
          </div>
        </div>

        {/* How it works */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">How It Works</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(s => (
              <div key={s.step} className="flex flex-col items-center text-center rounded-2xl border border-white/8 bg-white/4 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What makes it different */}
        <section className="mb-16 rounded-2xl border border-red-500/15 bg-red-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Why LofiSpace&apos;s Pomodoro Timer Is Different</h2>
          <div className="space-y-4 text-white/60 text-sm leading-relaxed">
            <p>
              Most Pomodoro timers are just countdown clocks. LofiSpace wraps the timer inside a
              complete study environment: lofi music plays during focus sessions, ambient sounds
              mask distractions, and the XP system gives you a reason to keep going.
            </p>
            <p>
              The combination matters. Pavlovian conditioning — yes, the same principle as
              Pavlov&apos;s dogs — means that if you always start your Pomodoro sessions with the
              same sounds and the same visual environment, your brain begins to associate that
              environment with focused work. Over 2–3 weeks, entering the workspace triggers
              a focus response automatically.
            </p>
            <p>
              You also get <strong className="text-white">25 XP per completed Pomodoro</strong>,
              a <strong className="text-white">daily streak counter</strong>, and an
              <strong className="text-white"> achievement system</strong> that rewards consistency.
              The gamification turns what can be a willpower-draining habit into something you
              actually look forward to.
            </p>
          </div>
        </section>

        {/* Science */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">The Science Behind the Pomodoro Technique</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SCIENCE_POINTS.map(s => (
              <div key={s.title} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 text-2xl">{s.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white text-sm">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best rooms for Pomodoro */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Best Study Rooms for Pomodoro Sessions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: '/online-study-room', emoji: '📚', label: 'Online Study Room', desc: 'Classic setup — lofi beats, rain sounds, Pomodoro timer. The all-rounder.' },
              { href: '/anime-study-room', emoji: '🌸', label: 'Anime Study Room', desc: 'Japanese aesthetic with city-pop lofi and cherry blossom backgrounds.' },
              { href: '/coding-room', emoji: '💻', label: 'Coding Room', desc: 'Synthwave music and city rain for developers in long coding sessions.' },
              { href: '/focus-room', emoji: '🎯', label: 'Focus Room', desc: 'Thunderstorm ambience for intense focus. Structured Pomodoro at its best.' },
              { href: '/deep-work-room', emoji: '🧠', label: 'Deep Work Room', desc: 'Heavy rain, minimal UI — for 2+ hour deep work marathon sessions.' },
            ].map(room => (
              <Link
                key={room.href}
                href={room.href}
                className="flex gap-3 rounded-xl border border-white/8 bg-white/4 p-4 hover:border-red-500/30 hover:bg-white/6 transition-all"
              >
                <span className="text-2xl">{room.emoji}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{room.label}</p>
                  <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{room.desc}</p>
                </div>
              </Link>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-red-900/40 to-violet-900/20 border border-red-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Start your first Pomodoro now</h2>
          <p className="mb-6 text-white/55">
            Free forever. No account. No download. Open and focus in 10 seconds.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-red-600 px-10 py-3 font-semibold text-white hover:bg-red-500 transition-colors shadow-lg shadow-red-900/30"
          >
            Open Pomodoro Timer — Free →
          </Link>
        </div>

        <RelatedPages exclude="/pomodoro-timer" />
      </div>
    </>
  )
}
