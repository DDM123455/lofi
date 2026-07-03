import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Lofi Timer for Studying — Free Study Timer with Lofi Music',
  description:
    'A study timer built for students: lofi music, ambient sounds, Pomodoro cycles and a to-do list that tracks how many sessions each assignment took. Free.',
  keywords: [
    'lofi timer for studying', 'study timer', 'lofi study timer', 'study timer with music',
    'student pomodoro timer', 'lofi music for studying', 'study timer online',
  ],
  openGraph: {
    title: 'Lofi Timer for Studying — LofiSpace',
    description: 'A study timer with lofi music, ambient sounds and a task list built for students.',
    type: 'website',
    url: 'https://focusworkspace.app/lofi-timer-for-studying',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lofi Timer for Studying — LofiSpace',
    description: 'A study timer with lofi music, ambient sounds and a task list built for students.',
  },
  alternates: { canonical: 'https://focusworkspace.app/lofi-timer-for-studying' },
}

const FAQ = [
  {
    q: 'Is this timer made for students specifically?',
    a: 'It combines the things students consistently ask for in study-timer apps: lofi music by default, a to-do list you can link to your Pomodoro sessions, and a visible streak so revision doesn\'t stall for days at a time.',
  },
  {
    q: 'Can I track study time per subject or assignment?',
    a: 'Yes — add each subject or assignment as a task, mark one active, and every completed Pomodoro adds to that task\'s count automatically. Your Focus Dashboard then ranks tasks by total time spent.',
  },
  {
    q: 'What if I need longer than 25 minutes for an exam-style session?',
    a: 'The embed generator on our Notion Widget page lets you set a custom focus length up to 60 minutes if you prefer longer, exam-style blocks over the standard Pomodoro interval.',
  },
  {
    q: 'Does it work for group study or just solo?',
    a: 'It\'s built for solo, heads-down studying. For studying alongside others without video, see our Study With Me page.',
  },
]

const FEATURES = [
  { emoji: '📚', label: 'Lofi music + rain/café ambience' },
  { emoji: '✅', label: 'To-do list linked to your Pomodoro sessions' },
  { emoji: '🔥', label: 'Daily streak so revision doesn\'t stall' },
  { emoji: '📈', label: 'Dashboard ranking subjects by time spent' },
  { emoji: '🍅', label: 'Custom focus/break length' },
  { emoji: '📱', label: 'Works on phone, tablet and desktop' },
]

export default function LofiTimerForStudyingPage() {
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=40&ls=lofi1&lv=60&at=rain:35,cafe:15&pom=1&clk=1&ac=db2777'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Lofi Timer for Studying', url: 'https://focusworkspace.app/lofi-timer-for-studying' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Lofi Timer for Studying"
        description="A student-focused study timer with lofi music, task tracking and a daily streak."
        url="https://focusworkspace.app/lofi-timer-for-studying"
        applicationCategory="EducationalApplication"
        keywords={['lofi timer for studying', 'study timer', 'student pomodoro']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-pink-900/30 px-4 py-1 text-sm text-pink-300 ring-1 ring-pink-500/20">
            📚 Built for Study Sessions
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Lofi Timer <span className="text-pink-400">for Studying</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A study timer that pairs lofi music with a task list — so you can see exactly how many
            focus sessions each subject or assignment actually took.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-900/40 hover:bg-pink-500 transition-colors"
            >
              Start Studying →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              View My Progress
            </Link>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Made for Studying</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-pink-500/15 bg-pink-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Students Use a Lofi Study Timer</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              A blank timer counting down doesn&apos;t tell you much about where your revision time
              actually goes. Linking each subject to the timer as a task means every completed
              session adds up automatically — no separate spreadsheet, no manual logging.
            </p>
            <p>
              Lofi music and light rain or café ambience mask the small noises that break
              concentration during long library or bedroom study sessions, without pulling
              attention the way music with lyrics does.
            </p>
            <p>
              And because the streak resets if you skip a full day, it works as a soft nudge to
              come back tomorrow — closer to a study habit than a one-off cram session.
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

        <div className="mb-16 rounded-2xl bg-gradient-to-r from-pink-900/30 to-rose-900/20 border border-pink-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to start revising?</h2>
          <p className="mb-6 text-white/55">Add today&apos;s subjects as tasks and start your first session.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-pink-600 px-10 py-3 font-semibold text-white hover:bg-pink-500 transition-colors"
          >
            Open Study Timer — Free →
          </Link>
        </div>

        <RelatedPages exclude="/lofi-timer-for-studying" />
      </div>
    </>
  )
}
