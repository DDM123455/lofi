import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Coding Music for Programmers — Focus Beats & Synthwave',
  description:
    'Free coding music for programmers. Synthwave, lofi hip-hop, and chillhop beats to keep you in flow state while you code. No sign-up, runs in any browser.',
  keywords: [
    'coding music', 'music for coding', 'programming music', 'music to code to',
    'coding playlist', 'synthwave coding', 'lofi coding music', 'developer music',
    'music for programmers', 'coding beats', 'focus music for coding',
    'best music for coding', 'coding music free', 'background music for coding',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/coding-music',
    languages: {
      en: 'https://www.focusworkspace.app/coding-music',
      vi: 'https://www.focusworkspace.app/vi/nhac-lap-trinh',
      'x-default': 'https://www.focusworkspace.app/coding-music',
    },
  },
  openGraph: {
    title: 'Coding Music for Programmers — Focus Beats & Synthwave | LofiSpace',
    description: 'Free coding music — synthwave, lofi beats, and ambient soundscapes for programmers in flow state. No sign-up.',
    url: 'https://www.focusworkspace.app/coding-music',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Music for Programmers | LofiSpace',
    description: 'Free coding music — synthwave and lofi beats to keep you in flow state while you code.',
  },
}

const FAQ = [
  {
    q: 'What music is best for coding?',
    a: 'Instrumental music without lyrics is the universal recommendation for coding. Synthwave and lofi hip-hop are the most popular genres among programmers because they: maintain a consistent BPM that matches focused cognitive states (80-120 BPM), provide enough atmosphere to block external noise, and avoid lyrical content that competes with reading and writing code.',
  },
  {
    q: 'Does music help with coding?',
    a: 'For most programmers, yes — with caveats. Music helps most during routine tasks (bug fixes, refactoring, boilerplate code) and less during complex problem-solving that requires active reasoning. When you\'re stuck on a hard algorithm, you might benefit from ambient sounds rather than music. Experiment to find what works for each type of work.',
  },
  {
    q: 'Is synthwave good for coding?',
    a: 'Synthwave is one of the most beloved coding genres because its aesthetic matches the programming mindset: retro-futuristic, focused, slightly dramatic. The electronic instrumentation has no linguistic content, the BPM keeps energy up without being distracting, and the atmosphere creates an immersive "hacker" environment that many developers find motivating.',
  },
  {
    q: 'What volume should I use for coding music?',
    a: 'Research and anecdotal reports from developers converge on 50-65 dB as the optimal coding music volume — roughly equivalent to a quiet conversation. Loud music (75+ dB) degrades performance on complex tasks. The goal is ambient presence, not immersion.',
  },
  {
    q: 'Should I use headphones or speakers for coding?',
    a: 'Headphones are recommended for coding music, especially in open offices or shared spaces. Over-ear noise-cancelling headphones provide additional noise isolation on top of the music. This combination — music + physical noise isolation — is the most effective setup for programmers in distracting environments.',
  },
  {
    q: 'Is LofiSpace coding music free?',
    a: 'Yes, completely free. No account, no subscription, no download required. LofiSpace streams curated lofi and synthwave playlists with an ambient sound mixer, all in your browser.',
  },
]

const MOODS = [
  { emoji: '🌃', label: 'Synthwave / Retrowave', desc: 'Neon-lit electronic beats. Classic late-night coding energy. High focus, slightly cinematic.' },
  { emoji: '🎧', label: 'Lofi hip-hop', desc: 'Mellow, jazzy chill. Best for routine tasks, bug fixing, and long sessions without fatigue.' },
  { emoji: '🌌', label: 'Space ambient', desc: 'Atmospheric, minimal. No BPM, just texture. Ideal for architecture design and complex problem-solving.' },
  { emoji: '⚡', label: 'Chillstep', desc: 'Lofi + electronic hybrid. Steady pulse with ambient texture. Great for debugging and code review.' },
  { emoji: '🎷', label: 'Jazz fusion', desc: 'Complex, sophisticated. Keeps the brain engaged without demanding attention. Best for senior dev work.' },
  { emoji: '🔥', label: 'Dark techno', desc: 'For deadline crunches. Driving rhythm keeps you moving when you\'re fighting a production bug at 2am.' },
]

export default function CodingMusicPage() {
  const workspaceUrl = '/workspace?ls=lofi2&lv=70&at=city:25,wind:20&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Coding Music', url: 'https://www.focusworkspace.app/coding-music' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Coding Music"
        description="Free coding music for programmers. Synthwave, lofi hip-hop, and chillhop beats to keep developers in flow state."
        url="https://www.focusworkspace.app/coding-music"
        keywords={['coding music', 'music for coding', 'programming music', 'synthwave coding']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Coding Music', url: 'https://www.focusworkspace.app/coding-music' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-cyan-900/30 px-4 py-1 text-sm text-cyan-300 ring-1 ring-cyan-500/20">
            💻 Synthwave · Lofi beats · Free · No sign-up
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Coding Music for <span className="text-cyan-400">Programmers in Flow</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Curated synthwave and lofi beats that keep you in flow state while you code.
            Mix music with city ambience and ambient sounds in our free interactive mixer.
            No ads, no sign-up, no download.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-cyan-700 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-900/40 hover:bg-cyan-600 transition-colors"
            >
              Start Coding Session →
            </Link>
            <Link
              href="/coding-room"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Coding Room
            </Link>
          </div>
        </div>

        {/* Moods */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Coding Music Moods — Pick Your Vibe</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOODS.map(m => (
              <div key={m.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{m.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{m.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dev tips */}
        <section className="mb-16 rounded-2xl border border-cyan-500/15 bg-cyan-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Developer Flow State — What the Science Says</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Flow state takes ~23 minutes to enter</h3>
              <p>Research on cognitive interruptions shows it takes an average of 23 minutes to fully recover deep focus after a distraction. Music that maintains consistent atmosphere reduces interruptions, making flow state easier to enter and sustain.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">No lyrics = no WM competition</h3>
              <p>Reading and writing code uses verbal working memory — the same cognitive system that processes song lyrics. Instrumental music bypasses this conflict entirely, letting you parse syntax and write logic without interference.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Consistent BPM maintains arousal</h3>
              <p>Music around 80-100 BPM keeps physiological arousal in the focused-but-calm zone. Too slow and you get drowsy; too fast and you get anxious. Most lofi and synthwave playlists hit this range naturally.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Ambient sound masks keyboard noise</h3>
              <p>Layering music with city or café ambience masks the sound of your own typing — which can be a surprising source of self-distraction during complex problem-solving. The combined soundscape creates a clean acoustic environment.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Best Coding Sound Mixes</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '🌃 Midnight Coding', combo: 'Synthwave lofi 70% + City 30% + Wind 15%', best: 'Late-night sessions, complex features' },
              { label: '🐛 Bug Hunting', combo: 'Lofi 65% + Rain 50%', best: 'Debugging, code review, reading docs' },
              { label: '🚀 Deployment Day', combo: 'Synthwave lofi 75% + City 40%', best: 'High-energy tasks, feature releases' },
              { label: '📐 Architecture Mode', combo: 'Space ambient 55% + Wind 30%', best: 'System design, planning, documentation' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-cyan-300/70 font-mono mb-2">{item.combo}</p>
                <p className="text-xs text-white/40">Best for: {item.best}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-violet-900/20 border border-cyan-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Enter flow state — start your coding session</h2>
          <p className="mb-6 text-white/55">Free forever. No account. Open in 10 seconds.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-cyan-700 px-10 py-3 font-semibold text-white hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-900/30"
          >
            Start Coding Music — Free →
          </Link>
        </div>

        <RelatedPages exclude="/coding-music" />
      </div>
    </>
  )
}
