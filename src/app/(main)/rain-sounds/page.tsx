import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Rain Sounds for Studying & Focus — Free Online',
  description:
    'Free rain sounds for studying, working, and sleeping. Combine rain with lofi music and other ambient sounds in our interactive mixer. No sign-up. Runs in any browser.',
  keywords: [
    'rain sounds', 'rain sounds for studying', 'rain sounds for focus', 'rain sounds online',
    'rain noise for studying', 'rainfall sounds', 'rain ambient', 'rain white noise',
    'rain sounds free', 'thunderstorm sounds', 'heavy rain sounds',
  ],
  alternates: { canonical: 'https://focusworkspace.app/rain-sounds' },
  openGraph: {
    title: 'Rain Sounds for Studying & Focus | LofiSpace',
    description: 'Free rain sounds — mix with lofi music and café noise for the perfect study atmosphere. No sign-up.',
    url: 'https://focusworkspace.app/rain-sounds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rain Sounds for Studying & Focus | LofiSpace',
    description: 'Free rain sounds online — mix with lofi music for the perfect study atmosphere.',
  },
}

const FAQ = [
  {
    q: 'Why do rain sounds help with studying?',
    a: 'Rain creates a consistent, non-predictive sound pattern. Your brain is hardwired to track unexpected sounds (an evolutionary survival mechanism). Since rain never spikes or contains meaningful information, your attentional system can safely ignore it — leaving full cognitive bandwidth for your work.',
  },
  {
    q: 'Is rain better than white noise for studying?',
    a: 'Both work, but rain has a warmer, more natural quality that many people find less fatiguing over long sessions. Rain also tends to be more effective at masking mid-frequency office sounds (voices, keyboards) compared to pure white noise.',
  },
  {
    q: 'What is the best combination of sounds for studying?',
    a: 'A popular formula: Lofi music at 60% volume + Rain at 45% + Café murmur at 25%. The lofi provides gentle rhythm, rain masks distractions, and café murmur adds a cosy social atmosphere without being intelligible. Experiment in the LofiSpace mixer to find your ideal mix.',
  },
  {
    q: 'Do rain sounds help with ADHD?',
    a: 'Yes — rain and brown noise are among the most recommended sounds for ADHD focus. The consistent auditory stimulation satisfies the brain\'s need for input, reducing the urge to seek stimulation from distractions. Many users with ADHD report rain sounds as significantly more effective than silence.',
  },
  {
    q: 'Can I mix rain with other sounds?',
    a: 'Yes. LofiSpace has an ambient sound mixer where you can layer rain with café sounds, fire crackling, wind, ocean waves, birds, and more — with independent volume controls for each.',
  },
  {
    q: 'Is it free?',
    a: 'Yes, completely free. No account needed. The rain sounds and full ambient mixer run in any browser with no download required.',
  },
]

const RAIN_TYPES = [
  { emoji: '🌧️', label: 'Light rain', desc: 'Gentle drizzle — ideal for creative work and writing. Less masking power but more relaxing.' },
  { emoji: '⛈️', label: 'Heavy rain', desc: 'Powerful downpour — maximum noise masking. Best for deep work in noisy environments.' },
  { emoji: '🌩️', label: 'Thunderstorm', desc: 'Rain with distant thunder — adds drama and urgency. Popular for late-night study sessions.' },
  { emoji: '☕', label: 'Rain + café', desc: 'Rain outside a coffee shop window — the classic study combination. Cosy and productive.' },
  { emoji: '📚', label: 'Rain + library', desc: 'Soft rain, interior quiet — the Rainy Library scene preset in LofiSpace.' },
  { emoji: '🌙', label: 'Rain + lofi', desc: 'The essential pairing — lofi music layered with rain creates a complete study environment.' },
]

const SCIENCE = [
  { title: 'Masks distracting noise', body: 'Rain operates across a broad frequency spectrum, covering the range where human speech sits (1-4 kHz). It is one of the most effective sounds for masking office chatter, traffic, and HVAC noise.' },
  { title: 'Reduces mental load', body: 'Unpredictable sounds (phones ringing, doors slamming) trigger involuntary attention responses — your brain drops what it was doing and checks the threat. Rain eliminates these spikes entirely.' },
  { title: 'Activates parasympathetic state', body: 'The sound of rain is evolutionarily associated with shelter and safety — conditions where your ancestors could afford to relax and think rather than scan for danger. This may explain why many people find rain calming.' },
  { title: '~70 dB sweet spot', body: 'Research in the Journal of Consumer Research found that moderate ambient noise (~70 dB) — the approximate volume of light rain — enhances creative performance and divergent thinking compared to both silence and loud noise.' },
]

export default function RainSoundsPage() {
  const workspaceUrl = '/workspace?at=rain:70&pom=1&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Rain Sounds', url: 'https://focusworkspace.app/rain-sounds' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Rain Sounds"
        description="Free rain sounds online for studying, focus and relaxation. Mix with lofi music in an interactive ambient sound mixer."
        url="https://focusworkspace.app/rain-sounds"
        keywords={['rain sounds', 'rain sounds for studying', 'rain noise', 'ambient rain']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-900/30 px-4 py-1 text-sm text-blue-300 ring-1 ring-blue-500/20">
            🌧️ Rain sounds · Ambient mixer · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Rain Sounds for <span className="text-blue-400">Studying & Focus</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Free rain sounds that mask distractions and create the perfect study atmosphere.
            Layer rain with lofi music, café sounds, and thunderstorms in our interactive
            ambient mixer — no sign-up, no download, free forever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-colors"
            >
              Play Rain Sounds →
            </Link>
            <Link
              href="/ambient-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Ambient Sounds
            </Link>
          </div>
        </div>

        {/* Rain types */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Types of Rain — Choose Your Vibe</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RAIN_TYPES.map(r => (
              <div key={r.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{r.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{r.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science */}
        <section className="mb-16 rounded-2xl border border-blue-500/15 bg-blue-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Why Rain Sounds Work — The Science</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SCIENCE.map(s => (
              <div key={s.title}>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mixer info */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Mix Rain with Other Sounds</h2>
          <p className="text-center text-white/55 text-sm mb-8 max-w-xl mx-auto">
            LofiSpace&apos;s ambient sound mixer lets you layer rain with other sounds and control
            each volume independently. Here are the most popular combinations:
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { combo: 'Rain 60% + Café 30% + Lofi music 70%', label: '☕ Classic study mix', best: 'General studying, homework, reading' },
              { combo: 'Heavy Rain 80% + Lofi music 50%', label: '⛈️ Deep focus mix', best: 'Hard problems, writing, deep work' },
              { combo: 'Rain 50% + Fire 40% + Lofi 60%', label: '🔥 Cosy cabin mix', best: 'Creative work, journaling, late evenings' },
              { combo: 'Thunderstorm 70% + Rain 50%', label: '🌩️ Storm focus mix', best: 'Deadline work, intense coding sessions' },
              { combo: 'Rain 40% + Ocean 30% + Lofi 65%', label: '🌊 Chill study mix', best: 'Light review, memorisation, light reading' },
              { combo: 'Rain 55% + Birds 25% + Lofi 70%', label: '🐦 Morning focus mix', best: 'Early morning work, fresh creative sessions' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-4">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-blue-300/70 font-mono mb-2">{item.combo}</p>
                <p className="text-xs text-white/40">Best for: {item.best}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-blue-900/40 to-violet-900/20 border border-blue-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to focus with rain sounds?</h2>
          <p className="mb-6 text-white/55">
            Free forever. No account. Runs in any browser. Open in 10 seconds.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-blue-600 px-10 py-3 font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/30"
          >
            Play Rain Sounds — Free →
          </Link>
        </div>

        <RelatedPages exclude="/rain-sounds" />
      </div>
    </>
  )
}
