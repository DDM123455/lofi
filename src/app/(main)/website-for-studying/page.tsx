import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Best Website for Studying — Free Study Room with Lofi & Tools',
  description:
    'LofiSpace is the best free website for studying online. Lofi music, ambient sounds, Pomodoro timer, to-do list, and 15+ study scenes — all in one browser tab. No sign-up.',
  keywords: [
    'website for studying', 'best website for studying', 'study website',
    'online study room', 'free study website', 'study tool online',
    'study with lofi music', 'focus website', 'productivity website for students',
    'study app online', 'lofi study website', 'website to help study',
    'free online study room', 'study tools for students', 'study environment online',
  ],
  alternates: { canonical: 'https://focusworkspace.app/website-for-studying' },
  openGraph: {
    title: 'Best Free Website for Studying | LofiSpace',
    description: 'Lofi music, ambient sounds, Pomodoro timer, and 15+ study scenes — all free in one browser tab. The study website students actually use.',
    url: 'https://focusworkspace.app/website-for-studying',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Free Website for Studying | LofiSpace',
    description: 'Lofi music, ambient sounds, Pomodoro timer, and study scenes — free, no sign-up.',
  },
}

const FAQ = [
  {
    q: 'What makes a good study website?',
    a: 'A good study website removes friction between you and focused work. It should start instantly (no downloads, no accounts), provide the right audio environment (music and ambient sounds to mask distractions), include productivity tools that complement rather than interrupt your workflow (Pomodoro timer, to-do list), and not bombard you with notifications or engagement-maximising features. LofiSpace is built exactly around these principles.',
  },
  {
    q: 'Is LofiSpace free?',
    a: 'Yes, completely free. No account required, no subscription, no download. Every feature — lofi music streams, ambient sound mixer, Pomodoro timer, to-do list, calendar, XP system, 15+ study scenes — is available from the moment you open the site. LofiSpace is supported by optional donations and non-intrusive ads.',
  },
  {
    q: 'Can I use LofiSpace without signing up?',
    a: 'Yes. You can open LofiSpace and start a study session immediately with no account. Your workspace settings are saved in your browser. Creating an account (when available) adds cloud sync and streak tracking, but is entirely optional.',
  },
  {
    q: 'What study tools does LofiSpace have?',
    a: 'LofiSpace includes: lofi music player with multiple stream presets, ambient sound mixer (rain, café, forest, fire, ocean, and more) with independent volume controls, Pomodoro timer with custom work/break intervals, to-do list with task management, calendar integration, live clock, weather widget with automatic scene selection, XP and achievement system, and 15+ animated study scene backgrounds.',
  },
  {
    q: 'Can I embed LofiSpace in Notion?',
    a: 'Yes. LofiSpace has a dedicated embed mode designed for Notion, Obsidian, and any website that supports iframes. Paste the embed URL into a Notion /embed block and your study workspace appears directly in your notes. The embed includes music player, ambient mixer, and Pomodoro timer.',
  },
  {
    q: 'What are the best study scenes on LofiSpace?',
    a: 'The most popular scenes are: Tokyo Café Rain (rain, café sounds, lofi beats), Thunderstorm Focus (heavy rain and thunder for deadline sessions), Cozy Cabin Winter (fireplace and wind — perfect for winter evenings), and Study Corner (clean, minimal — music and light rain). Browse all 15 scenes in the Scene Gallery and open any in one click.',
  },
]

const FEATURES = [
  {
    emoji: '🎧',
    title: 'Lofi Music Player',
    desc: 'Multiple curated lofi and synthwave streams — switch between them instantly. Volume control, auto-play.',
  },
  {
    emoji: '🌊',
    title: 'Ambient Sound Mixer',
    desc: 'Layer rain, café, forest, fire, ocean, and more. Independent volume control for each. 10+ ambient sounds.',
  },
  {
    emoji: '⏱️',
    title: 'Pomodoro Timer',
    desc: 'Customisable work and break intervals. Visual and audio cues. Streak tracking to build study habits.',
  },
  {
    emoji: '✅',
    title: 'To-Do List',
    desc: 'Session task list that lives in your study workspace — no switching tabs. Mark tasks complete while you study.',
  },
  {
    emoji: '🌤️',
    title: 'Weather Widget',
    desc: 'Live weather data. LofiSpace automatically selects a matching study scene based on your local weather.',
  },
  {
    emoji: '🏆',
    title: 'XP & Achievements',
    desc: 'Gamified focus tracking. Earn XP for completed Pomodoros, maintain streaks, unlock achievements.',
  },
  {
    emoji: '🎬',
    title: '15+ Study Scenes',
    desc: 'Animated backgrounds ranging from Tokyo Café Rain to Midnight Coding. Each is a complete atmosphere.',
  },
  {
    emoji: '📎',
    title: 'Notion Embed',
    desc: 'Embed your study workspace directly into Notion pages. Study with your notes in the same view.',
  },
]

const COMPARE = [
  { feature: 'Lofi music', lofi: '✅', others: '✅' },
  { feature: 'Ambient sounds mixer', lofi: '✅', others: '⚠️ Limited' },
  { feature: 'Pomodoro timer', lofi: '✅', others: '⚠️ Separate app' },
  { feature: 'Study scenes / backgrounds', lofi: '✅ 15+', others: '❌' },
  { feature: 'Notion embed', lofi: '✅', others: '❌' },
  { feature: 'No sign-up required', lofi: '✅', others: '⚠️ Varies' },
  { feature: 'Weather-based scene matching', lofi: '✅', others: '❌' },
  { feature: 'XP & achievement system', lofi: '✅', others: '❌' },
  { feature: 'Free forever', lofi: '✅', others: '⚠️ Freemium' },
]

export default function WebsiteForStudyingPage() {
  const workspaceUrl = '/workspace?ls=lofi1&lv=65&at=rain:45,cafe:25&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Website for Studying', url: 'https://focusworkspace.app/website-for-studying' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace — Website for Studying"
        description="Free study website with lofi music, ambient sounds, Pomodoro timer, to-do list, and 15+ animated study scenes."
        url="https://focusworkspace.app/website-for-studying"
        keywords={['website for studying', 'study website', 'online study room', 'lofi study website']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            📚 Free · No sign-up · All tools in one tab
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            The Best <span className="text-violet-400">Website for Studying</span> Online
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            LofiSpace is a free, all-in-one study website: lofi music, ambient sound mixer,
            Pomodoro timer, to-do list, and 15+ animated study scenes — everything you need
            to focus, in a single browser tab. No sign-up, no download.
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
              Browse Study Scenes
            </Link>
          </div>
        </div>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Everything You Need to Study — In One Tab</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{f.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">LofiSpace vs. Other Study Websites</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-left font-semibold text-white/50">Feature</th>
                  <th className="pb-3 text-center font-semibold text-violet-300">LofiSpace</th>
                  <th className="pb-3 text-center font-semibold text-white/30">Others</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(row => (
                  <tr key={row.feature} className="border-b border-white/5">
                    <td className="py-2.5 text-white/55">{row.feature}</td>
                    <td className="py-2.5 text-center text-violet-300 font-medium">{row.lofi}</td>
                    <td className="py-2.5 text-center text-white/35">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to use */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">How to Start Studying with LofiSpace</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { step: '1', title: 'Open the workspace', desc: 'Click "Open Study Room" above. No account, no setup — it opens instantly in your browser.' },
              { step: '2', title: 'Choose your scene', desc: 'Pick a study scene (Tokyo Café Rain, Study Corner, Cozy Cabin...) or customise your own mix.' },
              { step: '3', title: 'Start the Pomodoro', desc: 'Set your tasks, start the timer, and focus. LofiSpace tracks your progress and rewards consistency.' },
            ].map(item => (
              <div key={item.step} className="rounded-xl border border-white/8 bg-white/4 p-6 text-center">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-600/20 text-lg font-bold text-violet-300">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Frequently Asked Questions</h2>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/10 border border-violet-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to study smarter?</h2>
          <p className="mb-6 text-white/55">
            Free forever. No account. All tools in one tab. Open in 10 seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
            >
              Open Free Study Room →
            </Link>
            <Link
              href="/scenes"
              className="inline-block rounded-full border border-violet-500/30 bg-violet-900/20 px-8 py-3 font-semibold text-violet-300 hover:bg-violet-900/40 transition-colors"
            >
              Browse 15+ Scenes
            </Link>
          </div>
        </div>

        {/* Related landing pages */}
        <section className="border-t border-white/5 pt-12">
          <h2 className="mb-6 text-center text-xl font-bold text-white">Explore Study Tools</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { href: '/online-study-room', emoji: '📚', title: 'Online Study Room', desc: 'Virtual study space' },
              { href: '/study-music', emoji: '🎧', title: 'Study Music', desc: 'Lofi beats for focus' },
              { href: '/rain-sounds', emoji: '🌧️', title: 'Rain Sounds', desc: 'Ambient rain for study' },
              { href: '/focus-room', emoji: '🎯', title: 'Focus Room', desc: 'Deep work preset' },
            ].map(p => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex flex-col gap-1 rounded-xl border border-white/8 bg-white/4 p-4 transition-all hover:border-violet-500/40 hover:bg-white/8"
              >
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">{p.title}</span>
                <span className="text-xs text-white/40 leading-snug">{p.desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
