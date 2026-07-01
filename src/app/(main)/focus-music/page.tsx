import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Free Focus Music Online — Music to Study, Work & Concentrate',
  description:
    'Free focus music for studying and deep work. Lofi beats, ambient music, and binaural-style soundscapes designed to help you concentrate. No ads, no sign-up. Works in any browser.',
  keywords: [
    'focus music', 'music to focus', 'music for studying', 'concentration music',
    'study music online', 'focus music free', 'focus music for work', 'music for deep work',
    'instrumental focus music', 'focus music without lyrics', 'background music for studying',
    'music for concentration', 'brain focus music',
  ],
  alternates: { canonical: 'https://focusworkspace.app/focus-music' },
  openGraph: {
    title: 'Free Focus Music Online — Study & Concentration | LofiSpace',
    description: 'Free focus music for studying and deep work. Lofi, ambient, synthwave. No ads, no sign-up.',
    url: 'https://focusworkspace.app/focus-music',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Focus Music | LofiSpace',
    description: 'Free focus music for studying and work — lofi, ambient, synthwave. No ads. No sign-up.',
  },
}

const FAQ = [
  {
    q: 'What type of music is best for focus?',
    a: 'Instrumental music without lyrics is consistently the most effective for cognitive work. Lyrics compete with the verbal processing systems you use for reading and writing. Within instrumental music, lofi hip hop and ambient music are the most commonly cited genres for sustained focus, owing to their consistent tempo and non-demanding melodic structure.',
  },
  {
    q: 'Does music improve focus and productivity?',
    a: 'Yes, for most people and most tasks. Research shows moderate-tempo instrumental music improves performance on creative tasks, memorisation, and repetitive cognitive work. Tasks requiring heavy verbal processing (drafting, writing, editing) can be impaired by music with lyrics. The ideal: instrumental background music at ~50-65 dB.',
  },
  {
    q: 'Should I listen to music while studying?',
    a: 'It depends on the task. For reading, note-taking, or problem-solving: instrumental lofi or ambient music is beneficial. For tasks requiring you to mentally formulate language (writing essays, editing, composing): silence or non-melodic ambient sounds (rain, brown noise) are better. Use LofiSpace to switch between music and pure ambient depending on your task.',
  },
  {
    q: 'What is the Mozart Effect?',
    a: 'The Mozart Effect refers to a 1993 study suggesting that listening to Mozart temporarily improved spatial reasoning. The effect was small and specific — it has since been largely debunked as a generalised "music makes you smarter" claim. However, the broader principle holds: appropriate music modulates arousal and creates conditions for better focus. The effect is about the environment, not the specific composer.',
  },
  {
    q: 'Is lofi music the same as focus music?',
    a: 'Lofi hip hop is the most popular genre within the focus music category, but focus music is broader. LofiSpace offers lofi hip hop, chillhop, synthwave, and ambient music — all without lyrics and all designed to support focused work. Each genre has different energy levels suitable for different tasks.',
  },
  {
    q: 'Can I listen to focus music and ambient sounds together?',
    a: 'Yes — this is the core feature of LofiSpace. Use the ambient mixer to layer rain, café sounds, fire, or other sounds over the focus music. Independent volume controls let you dial in the exact mix for your task and environment.',
  },
  {
    q: 'Is LofiSpace\'s focus music free?',
    a: 'Yes, completely free. No account, no subscription, no time limits. All music genres and the full ambient mixer are free forever.',
  },
]

const MUSIC_TYPES = [
  {
    emoji: '🎵',
    genre: 'Lofi Hip Hop',
    why: 'Warm, repetitive, non-demanding',
    best: 'Homework, reading, general studying',
    energy: '●●○○○',
  },
  {
    emoji: '🎷',
    genre: 'Chillhop',
    why: 'Jazz-inflected, slightly more melodic',
    best: 'Creative work, light writing, design',
    energy: '●●●○○',
  },
  {
    emoji: '🌆',
    genre: 'Synthwave',
    why: 'Electronic, pulsing rhythm, higher energy',
    best: 'Coding, data work, deadline tasks',
    energy: '●●●●○',
  },
  {
    emoji: '🌊',
    genre: 'Ambient',
    why: 'Textures and drones, almost no rhythm',
    best: 'Deep thinking, meditation, reading',
    energy: '●○○○○',
  },
]

const HOW_IT_AFFECTS_BRAIN = [
  {
    title: 'Arousal regulation',
    body: 'Music modulates your brain\'s arousal level. Slow, consistent music calms an over-stimulated brain. Slightly faster tempo can raise alertness when you\'re fatigued. Lofi\'s 65-90 BPM sits in the optimal range for sustained cognitive work.',
  },
  {
    title: 'Masking distracting noise',
    body: 'Background noise — office chatter, traffic, HVAC — triggers involuntary attention responses. Focus music covers these auditory interruptions, reducing the number of times your attention is pulled away from your task.',
  },
  {
    title: 'Pavlovian conditioning',
    body: 'If you always study with the same music, your brain begins to associate that music with focused work. Over 2-3 weeks, starting the music becomes a reliable trigger for entering a focus state — without needing willpower to get started.',
  },
  {
    title: 'Mood elevation',
    body: 'Music activates the brain\'s reward system, releasing dopamine. A small mood boost improves creative performance and reduces the resistance to starting difficult tasks. This is separate from the masking effect and explains why music helps even in quiet environments.',
  },
]

export default function FocusMusicPage() {
  const workspaceUrl = '/workspace?ls=lofi1&at=rain:40&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Focus Music', url: 'https://focusworkspace.app/focus-music' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Focus Music"
        description="Free focus music for studying and deep work. Lofi, chillhop, synthwave and ambient music without ads or sign-up."
        url="https://focusworkspace.app/focus-music"
        keywords={['focus music', 'music for studying', 'concentration music', 'study music']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-900/30 px-4 py-1 text-sm text-cyan-300 ring-1 ring-cyan-500/20">
            🎧 Focus music · No lyrics · No ads · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Free <span className="text-cyan-400">Focus Music</span> for Studying
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Instrumental focus music with no ads and no account. Lofi hip hop, chillhop,
            synthwave, and ambient music — choose by energy level for your task.
            Layer with rain and ambient sounds for a complete study environment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-500 transition-colors"
            >
              Play Focus Music →
            </Link>
            <Link
              href="/lofi-music"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Lofi Music Guide
            </Link>
          </div>
        </div>

        {/* Music types */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Focus Music Genres — Choose by Task</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-4 text-left text-white/50 font-medium">Genre</th>
                  <th className="py-3 pr-4 text-left text-white/50 font-medium">Why it works</th>
                  <th className="py-3 pr-4 text-left text-white/50 font-medium">Best for</th>
                  <th className="py-3 text-left text-white/50 font-medium">Energy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MUSIC_TYPES.map(m => (
                  <tr key={m.genre}>
                    <td className="py-4 pr-4">
                      <span className="mr-2">{m.emoji}</span>
                      <span className="font-semibold text-white">{m.genre}</span>
                    </td>
                    <td className="py-4 pr-4 text-white/50">{m.why}</td>
                    <td className="py-4 pr-4 text-white/50">{m.best}</td>
                    <td className="py-4 text-cyan-400 font-mono text-xs">{m.energy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How music affects the brain */}
        <section className="mb-16 rounded-2xl border border-cyan-500/15 bg-cyan-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">How Focus Music Affects Your Brain</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {HOW_IT_AFFECTS_BRAIN.map(item => (
              <div key={item.title}>
                <h3 className="mb-2 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to use music vs. silence */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Focus Music vs. Silence — When to Use Each</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-6">
              <h3 className="mb-3 font-bold text-cyan-300">Use focus music for:</h3>
              <ul className="space-y-2 text-sm text-white/60">
                {[
                  'Maths, coding, data analysis',
                  'Flashcard review and memorisation',
                  'Drawing, design, creative projects',
                  'Homework and problem sets',
                  'Tasks you\'ve done many times before',
                  'Repetitive cognitive work',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/8 bg-white/4 p-6">
              <h3 className="mb-3 font-bold text-white/70">Use silence (or ambient only) for:</h3>
              <ul className="space-y-2 text-sm text-white/60">
                {[
                  'Writing essays or long-form text',
                  'Reading complex arguments',
                  'Editing or proofreading',
                  'Learning entirely new material',
                  'Verbal reasoning or language tasks',
                  'Exams and high-stakes cognitive tests',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-white/30 mt-0.5">○</span> {item}
                  </li>
                ))}
              </ul>
            </div>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-blue-900/20 border border-cyan-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to focus?</h2>
          <p className="mb-6 text-white/55">
            Free focus music, no ads. Open the workspace and start immediately.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-cyan-600 px-10 py-3 font-semibold text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-900/30"
          >
            Play Focus Music — Free →
          </Link>
        </div>

        <RelatedPages exclude="/focus-music" />
      </div>
    </>
  )
}
