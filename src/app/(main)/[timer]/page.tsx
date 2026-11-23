import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { MinuteTimer } from '@/components/timer/MinuteTimer'
import {
  BASE, TIMERS, getTimer, timerSlug, timerPath, timerUrl, timerTitle, timerDescription,
  timerAlternates, timerFaq, relatedTimers, fmtDuration,
} from '@/lib/timers'

// One page per entry in src/lib/timers.ts: /1-minute-timer … /120-minute-timer.
// Every page is prerendered at build time; any other single-segment URL that reaches this
// route 404s instead of rendering on demand.
export const dynamicParams = false

export function generateStaticParams() {
  return TIMERS.map(t => ({ timer: timerSlug(t.minutes) }))
}

function parse(slug: string) {
  const m = /^(\d{1,3})-minute-timer$/.exec(slug)
  return m ? getTimer(Number(m[1])) : undefined
}

export async function generateMetadata({ params }: { params: Promise<{ timer: string }> }): Promise<Metadata> {
  const t = parse((await params).timer)
  if (!t) return {}
  const m = t.minutes
  const title = timerTitle(m)
  const description = timerDescription(m)
  return {
    title: { absolute: title },
    description,
    keywords: [`${m} minute timer`, `${m} min timer`, `timer ${m} minutes`, `${m} minute countdown`, `${m} minute timer with alarm`, `set timer for ${m} minutes`],
    alternates: { canonical: timerUrl(m), languages: timerAlternates(m) },
    openGraph: { title, description, url: timerUrl(m), type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function TimerPage({ params }: { params: Promise<{ timer: string }> }) {
  const t = parse((await params).timer)
  if (!t) notFound()
  const m = t.minutes
  const faq = timerFaq(t)
  const crumbs = [
    { name: 'Home', url: BASE },
    { name: 'Online Timers', url: `${BASE}/timers` },
    { name: `${m} Minute Timer`, url: timerUrl(m) },
  ]
  const related = relatedTimers(m)

  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />
      <JsonLd
        type="WebApplication"
        name={`${m} Minute Timer`}
        description={timerDescription(m)}
        url={timerUrl(m)}
        applicationCategory="UtilitiesApplication"
        keywords={[`${m} minute timer`, 'online timer', 'countdown timer', 'timer with alarm']}
        featureList={['Countdown timer with alarm', 'Accurate in background tabs', 'Fullscreen mode', 'Keyboard shortcuts', 'Selectable alarm sounds', 'Optional lofi and rain sounds']}
      />
      <FaqJsonLd items={faq} />

      <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:pt-10">
        <Breadcrumb items={crumbs} />

        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{`${m} Minute Timer`}</h1>
          <p className="mt-2 text-white/55">{t.tagline} Free, no sign-up.</p>
        </header>

        <MinuteTimer minutes={m} />

        <article className="mx-auto mt-14 max-w-2xl text-white/70">
          <p className="text-lg leading-relaxed">{t.intro}</p>

          <h2 className="mb-4 mt-10 text-2xl font-bold text-white">{`What to use a ${m} minute timer for`}</h2>
          <ul className="space-y-3">
            {t.uses.map(u => (
              <li key={u.title} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                <h3 className="font-semibold text-white">{u.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  {u.desc}
                  {m === 25 && u.title === 'A Pomodoro session' && <> For the full cycle with breaks, see the <Link href="/pomodoro-timer" className="text-violet-300 hover:text-violet-200">Pomodoro timer</Link>.</>}
                </p>
              </li>
            ))}
          </ul>

          <h2 className="mb-3 mt-10 text-2xl font-bold text-white">How to use this timer</h2>
          <ol className="list-decimal space-y-2 pl-5 leading-relaxed">
            <li>Press <strong className="text-white">Start</strong> (or the Space bar). The clock is already set to {fmtDuration(m)}.</li>
            <li>Need a little more or less? Use <strong className="text-white">+1 min</strong> or <strong className="text-white">−1 min</strong>, even while it runs.</li>
            <li>When time is up the alarm repeats until you press <strong className="text-white">Stop alarm</strong>.</li>
          </ol>
          <h3 className="mb-2 mt-6 font-semibold text-white">Tips</h3>
          <ul className="list-disc space-y-2 pl-5 leading-relaxed">
            {t.tips.map(tip => <li key={tip}>{tip}</li>)}
          </ul>

          <h2 className="mb-4 mt-10 text-2xl font-bold text-white">Frequently asked questions</h2>
          <div className="space-y-3">
            {faq.map(f => (
              <details key={f.q} className="group rounded-xl border border-white/8 bg-white/[0.03] p-4" open>
                <summary className="cursor-pointer font-semibold text-white">{f.q}</summary>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.a}</p>
              </details>
            ))}
          </div>
        </article>

        <nav aria-labelledby="other-timers" className="mx-auto mt-14 max-w-2xl">
          <h2 id="other-timers" className="mb-4 text-xl font-bold text-white">Other timers</h2>
          <div className="flex flex-wrap gap-2">
            {related.map(r => (
              <Link key={r} href={timerPath(r)} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 transition-colors hover:border-violet-400/50 hover:text-white">
                {`${r} minute timer`}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/timers" className="text-violet-300 hover:text-violet-200">All online timers →</Link>
            <Link href="/pomodoro-timer" className="text-violet-300 hover:text-violet-200">Pomodoro timer →</Link>
            <Link href="/workspace" className="text-violet-300 hover:text-violet-200">Open the focus workspace →</Link>
          </div>
        </nav>
      </div>
    </>
  )
}
