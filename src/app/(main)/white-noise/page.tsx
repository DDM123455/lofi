import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Free White Noise Online — Focus, Study & Sleep',
  description:
    'Free white noise online for studying, focus, and sleep. Combine with lofi music and ambient sounds in our interactive mixer. No ads, no sign-up. Works in any browser.',
  keywords: [
    'white noise', 'white noise online', 'white noise for studying', 'white noise free',
    'white noise for focus', 'white noise for sleep', 'white noise machine online',
    'white noise generator', 'white noise for concentration', 'white noise adhd',
    'white noise background', 'free white noise',
  ],
  alternates: { canonical: 'https://focusworkspace.app/white-noise' },
  openGraph: {
    title: 'Free White Noise Online — Focus, Study & Sleep | LofiSpace',
    description: 'Free white noise for studying and sleep. Mix with lofi music and ambient sounds. No ads. No sign-up.',
    url: 'https://focusworkspace.app/white-noise',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free White Noise Online | LofiSpace',
    description: 'Free white noise online — mix with lofi music and ambient sounds for focus or sleep.',
  },
}

const NOISE_TYPES = [
  {
    name: 'White Noise',
    emoji: '⬜',
    freq: 'Equal energy across all frequencies',
    analogy: 'A TV with no signal',
    best: 'Maximum noise masking, sleep',
    feel: 'Sharp, bright, uniform',
    color: 'text-white',
  },
  {
    name: 'Pink Noise',
    emoji: '🩷',
    freq: 'More energy in lower frequencies',
    analogy: 'Steady rainfall',
    best: 'Sleep, relaxation, focus',
    feel: 'Balanced, natural, softer than white',
    color: 'text-pink-300',
  },
  {
    name: 'Brown Noise',
    emoji: '🟤',
    freq: 'Most energy in lowest frequencies',
    analogy: 'Deep waterfall, heavy wind',
    best: 'ADHD focus, deep work, anxiety',
    feel: 'Deep, warm, rumbling',
    color: 'text-amber-300',
  },
]

const FAQ = [
  {
    q: 'What is white noise?',
    a: 'White noise contains all frequencies at equal intensity — similar to how white light contains all wavelengths. When played as sound, it produces a consistent "shhhh" that covers a broad frequency range. This makes it effective at masking other sounds, because it provides a uniform auditory floor across all pitches.',
  },
  {
    q: 'Does white noise help with focus?',
    a: 'Yes, for most people. White noise blocks out unpredictable sounds (the main culprits of distraction) by providing a consistent auditory baseline. Your brain stops monitoring the environment for novel sounds, freeing cognitive bandwidth for your actual work. The masking effect is strongest in noisy environments — offices, public transport, shared spaces.',
  },
  {
    q: 'What is the difference between white, pink, and brown noise?',
    a: 'White noise: equal energy at all frequencies — bright, consistent hiss. Pink noise: more energy in lower frequencies — softer, more natural (similar to rain). Brown noise: most energy in very low frequencies — deep, warm rumble (like strong wind or a waterfall). Brown noise is often described as more pleasant for long-term listening than white noise.',
  },
  {
    q: 'Is white noise good for ADHD?',
    a: 'Yes — many people with ADHD find white, pink, or brown noise helpful for focus. The consistent stimulation satisfies the ADHD brain\'s need for sensory input, reducing the impulse to seek stimulation from distractions. Brown noise is often cited as particularly effective for ADHD; it is deeper and less fatiguing over long sessions.',
  },
  {
    q: 'Can white noise damage your hearing?',
    a: 'White noise at a reasonable volume is safe. The risk from any sound comes from high volume, not the type of sound. Keep listening levels at or below 65-70 dB (roughly the volume of a quiet conversation) for extended sessions. LofiSpace\'s sounds are normalised to safe listening levels.',
  },
  {
    q: 'Can I mix white noise with music?',
    a: 'Yes. In LofiSpace, layer rain (which functions similarly to pink noise) or wind with lofi music at independent volumes. Rain + lofi hip hop is the most popular study combination, providing both the masking benefits of ambient noise and the rhythm benefits of instrumental music.',
  },
  {
    q: 'Is LofiSpace\'s white noise free?',
    a: 'Yes, completely free. No account, no subscription, no time limits. All ambient sounds and the full mixer are free forever.',
  },
]

export default function WhiteNoisePage() {
  const workspaceUrl = '/workspace?at=rain:70,wind:30&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'White Noise', url: 'https://focusworkspace.app/white-noise' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace White Noise"
        description="Free white noise online for focus, studying and sleep. Mix with lofi music and ambient sounds in an interactive mixer."
        url="https://focusworkspace.app/white-noise"
        keywords={['white noise', 'white noise online', 'white noise for studying', 'white noise free']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-slate-800/50 px-4 py-1 text-sm text-slate-300 ring-1 ring-slate-500/20">
            ⬜ White noise · Pink noise · Brown noise · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Free <span className="text-slate-300">White Noise</span> Online
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Free white noise, pink noise, and brown noise for studying, focus, and sleep.
            Combine with lofi music and other ambient sounds in our interactive mixer —
            each with independent volume control. No ads, no sign-up, works anywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-slate-600 px-8 py-3 font-semibold text-white shadow-lg shadow-slate-900/40 hover:bg-slate-500 transition-colors"
            >
              Play White Noise →
            </Link>
            <Link
              href="/brown-noise"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Try Brown Noise
            </Link>
          </div>
        </div>

        {/* Noise types comparison */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">White, Pink & Brown Noise — Which Is Right for You?</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {NOISE_TYPES.map(n => (
              <div key={n.name} className="rounded-2xl border border-white/8 bg-white/4 p-6">
                <div className="mb-3 text-3xl">{n.emoji}</div>
                <h3 className={`mb-1 font-bold text-lg ${n.color}`}>{n.name}</h3>
                <p className="text-xs text-white/35 mb-3">{n.freq}</p>
                <div className="space-y-2 text-xs text-white/55">
                  <div><span className="text-white/35">Like: </span>{n.analogy}</div>
                  <div><span className="text-white/35">Feel: </span>{n.feel}</div>
                  <div><span className="text-white/35">Best for: </span>{n.best}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How white noise works */}
        <section className="mb-16 rounded-2xl border border-slate-500/15 bg-slate-900/20 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">How White Noise Masks Distractions</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Your auditory system is constantly scanning the environment for novel or unexpected
              sounds. Each time something new occurs — a door closing, someone coughing, a
              notification chime — your brain involuntarily redirects attention to assess the
              sound. This is an evolutionary survival mechanism.
            </p>
            <p>
              White noise works by raising the auditory floor. Instead of silence punctuated by
              occasional distracting sounds, you have consistent noise that covers the frequency
              range where distracting sounds live. Your brain detects far fewer spikes, which
              means far fewer involuntary attention redirections.
            </p>
            <p>
              The result: you maintain focus for longer between interruptions. In open offices
              and shared study spaces, white noise can cut perceived interruptions by 50-70%.
              For solo workers at home, it helps reduce the impact of household noise and the
              anxiety of total silence.
            </p>
          </div>
        </section>

        {/* Best for studies */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Best White Noise Combinations for Studying</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '📚 Classic Study Mix', recipe: 'Rain (like pink noise) 65% + Lofi music 70%', desc: 'Rain approximates pink noise while adding natural texture. The most popular study sound combination.' },
              { title: '💻 Deep Work Mix', recipe: 'Heavy Rain 80% + Wind 30%', desc: 'Near-white-noise coverage with natural texture. Maximum masking for noisy environments.' },
              { title: '🧠 ADHD Focus Mix', recipe: 'Heavy Rain 75% + Café murmur 25%', desc: 'Broad spectrum masking with just enough social warmth to prevent isolation anxiety.' },
              { title: '😴 Sleep Mix', recipe: 'Rain 60% + Wind 40%', desc: 'Natural ambient without music. The rhythmic variation of rain and wind is less jarring than pure white noise for sleep.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs font-mono text-slate-300/70 mb-2">{item.recipe}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-slate-800/60 to-slate-900/40 border border-slate-600/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Block out the noise and focus</h2>
          <p className="mb-6 text-white/55">
            Free ambient mixer — rain, wind, café, and more. No sign-up. Open in 10 seconds.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-slate-600 px-10 py-3 font-semibold text-white hover:bg-slate-500 transition-colors shadow-lg shadow-slate-900/30"
          >
            Play White Noise — Free →
          </Link>
        </div>

        <RelatedPages exclude="/white-noise" />
      </div>
    </>
  )
}
