import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Focus Dashboard — See Your Focus Time, Streak & Habits at a Glance',
  description:
    'A free focus dashboard: today\'s focus time, current streak, weekly Pomodoro chart, a 90-day heatmap and your top tasks by focus time. No sign-up.',
  keywords: [
    'focus dashboard', 'productivity dashboard', 'pomodoro dashboard', 'focus time tracker',
    'study analytics', 'focus analytics', 'work session tracker',
  ],
  openGraph: {
    title: 'Focus Dashboard — LofiSpace',
    description: 'Today\'s focus time, streak, weekly chart, heatmap and top tasks. Free, no sign-up.',
    type: 'website',
    url: 'https://focusworkspace.app/focus-dashboard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Dashboard — LofiSpace',
    description: 'Today\'s focus time, streak, weekly chart, heatmap and top tasks. Free, no sign-up.',
  },
  alternates: { canonical: 'https://focusworkspace.app/focus-dashboard' },
}

const FAQ = [
  {
    q: 'What exactly does the Focus Dashboard show?',
    a: 'Today\'s total focus time and Pomodoro count, your current and best streak, a 7-day bar chart, a 90-day heatmap, your top tasks ranked by focus time, and a list of recent sessions.',
  },
  {
    q: 'Where does the data come from?',
    a: 'Every Pomodoro you complete in the LofiSpace workspace (or an embedded widget) is saved automatically — there is nothing extra to turn on.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Everything is stored in your browser\'s local storage. Nothing is sent to a server, and there is no account required to view it.',
  },
  {
    q: 'Can I see stats for individual tasks?',
    a: 'Yes — link a to-do item to your active Pomodoro session and the dashboard\'s Top Tasks section will rank it by total pomodoros and focus time.',
  },
]

const FEATURES = [
  { emoji: '⏱️', label: 'Today\'s total focus time & session count' },
  { emoji: '🔥', label: 'Current streak + all-time best' },
  { emoji: '📊', label: '7-day Pomodoro bar chart' },
  { emoji: '🟪', label: '90-day focus heatmap' },
  { emoji: '✅', label: 'Top tasks by focus time' },
  { emoji: '🕐', label: 'Recent session history' },
]

export default function FocusDashboardPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Focus Dashboard', url: 'https://focusworkspace.app/focus-dashboard' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Focus Dashboard"
        description="A free focus dashboard with streaks, weekly chart, heatmap and top-task breakdown."
        url="https://focusworkspace.app/focus-dashboard"
        applicationCategory="ProductivityApplication"
        keywords={['focus dashboard', 'productivity dashboard', 'focus time tracker']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            📊 Free · No Sign-up · Stored Locally
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Your <span className="text-violet-400">Focus Dashboard</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Every Pomodoro you complete becomes data: how much you focused today, how long your
            streak is, and which tasks actually got the time. See it all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Open My Dashboard →
            </Link>
            <Link
              href="/workspace?pom=1"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Start a Session First
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">What&apos;s on the Dashboard</h2>
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
          <h2 className="mb-4 text-xl font-bold text-white">Why a Dashboard Instead of Just a Timer</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              A timer tells you how one session went. A dashboard tells you the pattern — whether
              you&apos;re actually focusing more this week than last, whether your streak is holding,
              and which of your tasks are quietly eating most of your time.
            </p>
            <p>
              The heatmap in particular makes gaps visible in a way a daily counter doesn&apos;t: a
              string of empty squares stands out immediately, the same way it would on a habit
              tracker or a GitHub contribution graph.
            </p>
            <p>
              Because it reads straight from the same session history your Pomodoro timer already
              writes to, there&apos;s no separate tracking step — the dashboard is just a view on top of
              work you were already doing.
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
          <h2 className="mb-3 text-2xl font-bold text-white">See where your focus goes</h2>
          <p className="mb-6 text-white/55">One click, and it&apos;s already tracking everything you&apos;ve done.</p>
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Open Focus Dashboard →
          </Link>
        </div>

        <RelatedPages exclude="/focus-dashboard" />
      </div>
    </>
  )
}
