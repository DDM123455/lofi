import Link from 'next/link'
import type { Metadata } from 'next'
import { BreadcrumbJsonLd, ItemListJsonLd, FaqJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { BASE, GROUP_LABEL, TIMERS, groupOf, timerPath, timerUrl, type TimerGroup } from '@/lib/timers'

const URL = `${BASE}/timers`
const TITLE = 'Online Timers – Free Countdown Timers with Alarm | LofiSpace'
const DESC = 'Free online timers from 1 minute to 2 hours. One click to start, loud alarm, fullscreen, accurate in background tabs, with optional lofi and rain sounds.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: ['online timer', 'countdown timer', 'timer with alarm', 'minute timer', 'free timer', 'classroom timer'],
  alternates: { canonical: URL, languages: { en: URL, 'x-default': URL } },
  openGraph: { title: TITLE, description: DESC, url: URL, type: 'website' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
}

const FAQ = [
  { q: 'Are these timers free?', a: 'Yes. Every timer is free, needs no account, and starts with one click.' },
  { q: 'Do the timers keep time in a background tab?', a: 'Yes. Each timer counts against its exact end time and schedules the alarm when you press Start, so it stays accurate and rings on time even when the tab is in the background.' },
  { q: 'What if I need a length that is not listed?', a: 'Open the closest timer and use the +1 min and −1 min buttons. For focus sessions with breaks, use the Pomodoro timer in the focus workspace.' },
]

const GROUPS: TimerGroup[] = ['short', 'medium', 'long']

export default function TimersHub() {
  const crumbs = [{ name: 'Home', url: BASE }, { name: 'Online Timers', url: URL }]
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <ItemListJsonLd items={TIMERS.map(t => ({ name: `${t.minutes} Minute Timer`, url: timerUrl(t.minutes), description: t.tagline }))} />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <Breadcrumb items={crumbs} />
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Online Timers</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
            Free countdown timers from one minute to two hours. Each one opens ready to go: press Start,
            and a clear alarm rings when time is up. Fullscreen for classrooms, accurate in background
            tabs, with optional lofi, rain or café sounds while you wait.
          </p>
        </header>

        {GROUPS.map(g => (
          <section key={g} aria-labelledby={`g-${g}`} className="mb-10">
            <h2 id={`g-${g}`} className="mb-1 text-2xl font-bold text-white">{GROUP_LABEL[g].title}</h2>
            <p className="mb-4 text-sm text-white/40">{GROUP_LABEL[g].range}</p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {TIMERS.filter(t => groupOf(t.minutes) === g).map(t => (
                <li key={t.minutes}>
                  <Link href={timerPath(t.minutes)} className="flex h-full items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-violet-400/40 hover:bg-white/[0.06]">
                    <span className="text-2xl" aria-hidden>{t.emoji}</span>
                    <span>
                      <span className="block font-semibold text-white">{`${t.minutes} Minute Timer`}</span>
                      <span className="mt-0.5 block text-sm leading-snug text-white/50">{t.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mb-10 rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-6 text-center">
          <h2 className="text-xl font-bold text-white">Need focus sessions with breaks?</h2>
          <p className="mx-auto mt-2 max-w-xl text-white/60">
            The Pomodoro timer alternates focus and break sessions automatically, with a to-do list,
            lofi music and ambient sounds.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/pomodoro-timer" className="rounded-full bg-violet-600 px-6 py-2.5 font-semibold text-white hover:bg-violet-500">Pomodoro timer</Link>
            <Link href="/workspace" className="rounded-full border border-white/15 px-6 py-2.5 font-semibold text-white/75 hover:text-white">Open the focus workspace</Link>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold text-white">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map(f => (
              <div key={f.q} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <h3 className="font-semibold text-white">{f.q}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
