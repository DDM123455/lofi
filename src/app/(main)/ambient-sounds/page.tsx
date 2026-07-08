import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Free Ambient Sounds Mixer — Study, Focus & Relax Online',
  description:
    'Free online ambient sounds mixer. Layer rain, café noise, fire, ocean, forest and more with lofi music. Customise volumes. No sign-up.',
  keywords: [
    'ambient sounds', 'ambient sound mixer', 'ambient sounds for studying', 'ambient noise',
    'nature sounds', 'background sounds for focus', 'white noise online', 'study sounds',
    'ambient sounds free', 'soundscape for studying', 'focus sounds',
  ],
  alternates: { canonical: 'https://www.focusworkspace.app/ambient-sounds' },
  openGraph: {
    title: 'Free Ambient Sounds Mixer for Studying & Focus | LofiSpace',
    description: 'Mix rain, café, fire, ocean and more with lofi music. Free ambient sound mixer — no sign-up.',
    url: 'https://www.focusworkspace.app/ambient-sounds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Ambient Sounds Mixer | LofiSpace',
    description: 'Mix rain, café, fire, ocean and more with lofi music. Free ambient sound mixer — no sign-up.',
  },
}

const SOUNDS = [
  { emoji: '🌧️', name: 'Rain', desc: 'Light or heavy rain — the most effective sound for masking distractions and entering deep focus.' },
  { emoji: '☕', name: 'Café', desc: 'Coffee shop murmur — moderate ambient noise proven to enhance creative performance.' },
  { emoji: '🔥', name: 'Fire crackling', desc: 'Warm hearth crackling — perfect for cosy evening study sessions and a calm atmosphere.' },
  { emoji: '🌊', name: 'Ocean waves', desc: 'Rhythmic wave pattern — deeply relaxing, ideal for creative work and meditation sessions.' },
  { emoji: '🌿', name: 'Forest', desc: 'Birds, leaves, gentle wind — nature sounds reduce cortisol and stress while maintaining alertness.' },
  { emoji: '⛈️', name: 'Thunderstorm', desc: 'Dramatic rain and distant thunder — intense masking for deep work in noisy environments.' },
  { emoji: '🌬️', name: 'Wind', desc: 'Gentle breeze or strong wind — adds subtle movement to your soundscape.' },
  { emoji: '🌃', name: 'City at night', desc: 'Distant traffic, occasional voices — the urban background hum that many people find energising.' },
]

const FAQ = [
  {
    q: 'What are ambient sounds?',
    a: 'Ambient sounds are background environmental sounds — rain, wind, café noise, fire crackling, ocean waves — that create a consistent auditory environment. Unlike music, they contain no meaningful information, so your brain can filter them out while maintaining focus.',
  },
  {
    q: 'How do ambient sounds help you focus?',
    a: 'Unpredictable sounds trigger involuntary attention responses — your brain drops whatever it was doing to check the potential threat. Ambient sounds eliminate these spikes by providing consistent, predictable background noise. Your attentional system can safely ignore them, leaving full cognitive bandwidth for your work.',
  },
  {
    q: 'What is the best ambient sound for studying?',
    a: 'It depends on the task. For deep focus work: rain or brown noise. For creative work: café sounds at moderate volume (~70 dB). For reading: soft nature sounds. For ADHD: brown noise or rain. Experiment with LofiSpace\'s mixer to find your ideal combination.',
  },
  {
    q: 'Can I mix multiple ambient sounds together?',
    a: 'Yes. LofiSpace\'s ambient mixer lets you layer multiple sounds simultaneously with independent volume controls. You can combine rain + café + fire at custom volumes, save the combination via URL, and share it with others.',
  },
  {
    q: 'Is the ambient sound mixer free?',
    a: 'Yes, completely free. No account, no subscription, no time limits. The full ambient mixer is available to everyone.',
  },
  {
    q: 'Can I use ambient sounds for sleeping?',
    a: 'Yes. The rain, ocean, and forest sounds work well for sleep. However, LofiSpace is primarily designed for study and focus sessions — for dedicated sleep sounds, you may also want to look at apps specifically designed for sleep.',
  },
]

export default function AmbientSoundsPage() {
  const workspaceUrl = '/workspace?at=rain:50,cafe:30&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Ambient Sounds', url: 'https://www.focusworkspace.app/ambient-sounds' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Ambient Sounds Mixer"
        description="Free online ambient sounds mixer. Layer rain, café, fire, ocean and more with lofi music for studying and focus."
        url="https://www.focusworkspace.app/ambient-sounds"
        keywords={['ambient sounds', 'ambient mixer', 'focus sounds', 'study sounds']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-teal-900/30 px-4 py-1 text-sm text-teal-300 ring-1 ring-teal-500/20">
            🎚️ 8+ ambient sounds · Mix freely · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Free <span className="text-teal-400">Ambient Sounds</span> Mixer
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Layer rain, café noise, fire crackling, ocean waves, forest sounds, and more —
            each with independent volume control. Combine with lofi music to build your
            perfect study or work soundscape. Free forever, no account needed.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-teal-600 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-900/40 hover:bg-teal-500 transition-colors"
            >
              Open Ambient Mixer →
            </Link>
            <Link
              href="/rain-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Rain Sounds Only
            </Link>
          </div>
        </div>

        {/* Available sounds */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Available Ambient Sounds</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOUNDS.map(s => (
              <div key={s.name} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{s.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How the mixer works */}
        <section className="mb-16 rounded-2xl border border-teal-500/15 bg-teal-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">How the Ambient Sound Mixer Works</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Inside the LofiSpace workspace, the Sounds panel gives you a slider for each
              ambient sound category. Turn on rain at 60%, add café murmur at 30%, and layer
              in fire crackling at 20% — all playing simultaneously in real time.
            </p>
            <p>
              The sounds are mixed in your browser, so there is no latency or buffering between
              them. The total volume stays controlled, so you won&apos;t blow out your ears
              when you layer multiple sounds.
            </p>
            <p>
              Your exact mix is <strong className="text-white">saved in the URL</strong>. Copy
              the workspace link and share it with anyone — they open the exact same soundscape,
              including all sound types and volumes.
            </p>
          </div>
        </section>

        {/* Best combinations */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Best Ambient Sound Combinations</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '📚 Ultimate Study Mix', sounds: 'Rain 60% + Café 30% + Lofi music 70%', desc: 'The classic formula. Rain masks noise, café adds warmth, lofi provides gentle rhythm.' },
              { title: '🧠 Deep Focus Mix', sounds: 'Heavy Rain 80% + Lofi music 50%', desc: 'Minimal. Powerful masking. No social cues — just you and the work.' },
              { title: '🔥 Cosy Evening Mix', sounds: 'Fire 50% + Rain 35% + Lofi 60%', desc: 'Warm, intimate, perfect for journaling, reading, or creative writing.' },
              { title: '💻 Developer Flow Mix', sounds: 'City Night 40% + Rain 30% + Synthwave 70%', desc: 'Urban energy with rain in the background — perfect for late-night coding.' },
              { title: '🌿 Nature Calm Mix', sounds: 'Forest 50% + Ocean 30% + Lofi 65%', desc: 'Biophilic sounds reduce cortisol. Great for high-anxiety days.' },
              { title: '⛈️ Storm Deadline Mix', sounds: 'Thunderstorm 70% + Rain 60%', desc: 'Maximum drama. When you have 3 hours and a deadline at midnight.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs font-mono text-teal-300/70 mb-2">{item.sounds}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-teal-900/40 to-blue-900/20 border border-teal-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Build your perfect soundscape</h2>
          <p className="mb-6 text-white/55">Free forever. 8+ sounds. Independent volume control. Open in any browser.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-teal-600 px-10 py-3 font-semibold text-white hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/30"
          >
            Open Ambient Mixer — Free →
          </Link>
        </div>

        <RelatedPages exclude="/ambient-sounds" />
      </div>
    </>
  )
}
