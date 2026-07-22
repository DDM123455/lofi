import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import { PomodoroCompare } from '@/components/seo/PomodoroCompare'

export const metadata: Metadata = {
  title: 'Pomodoro Streak Tracker — Daily Focus Streaks & Heatmap',
  description:
    'Track your daily Pomodoro streak with a free focus dashboard: current streak, best streak, weekly progress and a 90-day heatmap. No sign-up, no app to install.',
  keywords: [
    'pomodoro streak tracker', 'focus streak', 'study streak tracker', 'pomodoro heatmap',
    'daily focus streak', 'productivity streak', 'pomodoro habit tracker',
  ],
  openGraph: {
    title: 'Pomodoro Streak Tracker — LofiSpace',
    description: 'Current streak, best streak, weekly progress and a 90-day focus heatmap. Free.',
    type: 'website',
    url: 'https://www.focusworkspace.app/pomodoro-streak-tracker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pomodoro Streak Tracker — LofiSpace',
    description: 'Current streak, best streak, weekly progress and a 90-day focus heatmap. Free.',
  },
  alternates: {
    canonical: 'https://www.focusworkspace.app/pomodoro-streak-tracker',
    languages: {
      en: 'https://www.focusworkspace.app/pomodoro-streak-tracker',
      vi: 'https://www.focusworkspace.app/vi/theo-doi-chuoi-pomodoro',
      'x-default': 'https://www.focusworkspace.app/pomodoro-streak-tracker',
    },
  },
}

const FAQ = [
  {
    q: 'How does the Pomodoro streak work?',
    a: 'Your streak increases by one for every calendar day you complete at least one Pomodoro session. Miss a full day and the streak resets to zero the next time you start a session.',
  },
  {
    q: 'Where do I see my streak?',
    a: 'Open the free Focus Dashboard — it shows your current streak, your best streak ever, a 7-day bar chart and a 90-day heatmap of every session you\'ve logged.',
  },
  {
    q: 'Do I need to create an account to track a streak?',
    a: 'No. Everything is stored locally in your browser. There is nothing to sign up for and nothing syncs to a server.',
  },
  {
    q: 'What happens if I switch devices or browsers?',
    a: 'Streak data lives in that browser\'s local storage, so it does not follow you across devices. Stick to one browser if you want a continuous streak history.',
  },
  {
    q: 'Can I see which tasks I spend the most time on?',
    a: 'Yes — the dashboard\'s Top Tasks section ranks your linked to-do items by total focus time and completed Pomodoros.',
  },
]

const FEATURES = [
  { emoji: '🔥', label: 'Current streak + all-time best streak' },
  { emoji: '📊', label: '7-day Pomodoro bar chart' },
  { emoji: '🟪', label: '90-day GitHub-style focus heatmap' },
  { emoji: '✅', label: 'Top tasks ranked by focus time' },
  { emoji: '🕐', label: 'Recent session history' },
  { emoji: '🔒', label: 'Private — stored only on your device' },
]

export default function PomodoroStreakTrackerPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=45&ls=lofi1&lv=60&at=rain:30&pom=1&clk=1&ac=fb923c'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Pomodoro Streak Tracker', url: 'https://www.focusworkspace.app/pomodoro-streak-tracker' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Pomodoro Streak Tracker"
        description="Free Pomodoro streak tracker with weekly chart, 90-day heatmap and top-task breakdown."
        url="https://www.focusworkspace.app/pomodoro-streak-tracker"
        applicationCategory="ProductivityApplication"
        keywords={['pomodoro streak tracker', 'focus streak', 'study streak']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Pomodoro Streak Tracker', url: 'https://www.focusworkspace.app/pomodoro-streak-tracker' },
        ]} />
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-orange-900/30 px-4 py-1 text-sm text-orange-300 ring-1 ring-orange-500/20">
            🔥 Streaks · Heatmap · No Sign-up
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Pomodoro <span className="text-orange-400">Streak Tracker</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Every focus session you complete builds a streak. Watch it on a free dashboard with a
            weekly chart, a 90-day heatmap and your most-worked-on tasks — all stored on your device.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-orange-600 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-orange-500 transition-colors"
            >
              Open My Dashboard →
            </Link>
            <Link
              href={workspaceUrl}
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Start a Pomodoro First
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">What the Dashboard Tracks</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-orange-500/15 bg-orange-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Streaks Work</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              A streak turns &quot;I should focus today&quot; into &quot;I can&apos;t break the chain.&quot; It&apos;s a small
              piece of accountability that doesn&apos;t require anyone else — just a visible counter
              that goes up when you show up, and resets when you don&apos;t.
            </p>
            <p>
              The heatmap makes the pattern visible at a glance: a wall of dark squares tells you
              exactly which weeks were productive and which had gaps, the same way a habit tracker
              or a GitHub contribution graph does.
            </p>
            <p>
              Because the dashboard is tied to the same Pomodoro timer you&apos;re already using in the
              workspace, there&apos;s nothing extra to set up — your streak starts building the moment
              you complete your first session.
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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-orange-900/30 to-amber-900/20 border border-orange-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Don&apos;t break the chain</h2>
          <p className="mb-6 text-white/55">Check your streak, or start today&apos;s Pomodoro right now.</p>
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-orange-600 px-10 py-3 font-semibold text-white hover:bg-orange-500 transition-colors"
          >
            View Focus Dashboard →
          </Link>
        </div>

        <PomodoroCompare exclude="/pomodoro-streak-tracker" />

        <RelatedPages exclude="/pomodoro-streak-tracker" />
      </div>
    </>
  )
}
