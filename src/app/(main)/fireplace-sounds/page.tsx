import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Fireplace Sounds for Focus & Relaxation — Free Online',
  description:
    'Free fireplace sounds online — crackling fire and cosy hearth ambience for studying and relaxation. Mix with lofi music. No sign-up.',
  keywords: [
    'fireplace sounds', 'crackling fire sounds', 'fireplace ambience',
    'fireplace sounds for studying', 'crackling fireplace', 'fire sounds online',
    'fireplace background noise', 'hearth sounds', 'cosy fireplace sounds',
    'fireplace sounds free', 'fire crackling sounds', 'fireplace white noise',
    'fire sounds for focus', 'fireplace asmr', 'crackling fire for sleep',
  ],
  alternates: { canonical: 'https://www.focusworkspace.app/fireplace-sounds' },
  openGraph: {
    title: 'Fireplace Sounds for Focus & Relaxation | LofiSpace',
    description: 'Free crackling fireplace sounds — cosy hearth ambience for studying, relaxation, and sleep. Mix with lofi music. No sign-up.',
    url: 'https://www.focusworkspace.app/fireplace-sounds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fireplace Sounds for Focus & Relaxation | LofiSpace',
    description: 'Free fireplace sounds online — crackling fire for cosy study sessions and relaxation.',
  },
}

const FAQ = [
  {
    q: 'Why are fireplace sounds so relaxing?',
    a: 'Fireplace sounds engage multiple senses and deep evolutionary instincts simultaneously. Anthropologists believe humans have been gathering around fires for 400,000 years — it is one of our oldest social rituals. The crackling sound, even recorded, triggers a "hearth response": lowered blood pressure, relaxed muscles, and increased social feelings. It is one of the most universally calming sounds in human experience.',
  },
  {
    q: 'Do fireplace sounds help with studying?',
    a: 'Yes — especially for creative work, reading, and writing. The warm, consistent crackling provides gentle acoustic masking while creating a psychologically cosy atmosphere that reduces anxiety. Many students find that fireplace sounds make studying feel more comfortable and less stressful, which directly improves session duration and retention.',
  },
  {
    q: 'Are fireplace sounds good for sleep?',
    a: 'Fireplace sounds are excellent for sleep because they combine consistent broadband noise (masking external sounds) with deeply familiar evolutionary comfort signals. The irregular-but-predictable pattern of crackling fire is complex enough to engage the auditory system, preventing it from latching onto other sounds, while being non-threatening enough to allow full relaxation.',
  },
  {
    q: 'What is the best combination of sounds with a fireplace?',
    a: 'The most popular combinations: Fire + wind (cabin in winter), Fire + rain (stormy night at home), Fire + lofi music (cosy study session), Fire + café murmur (warm social atmosphere). The Cozy Cabin Winter scene in LofiSpace combines fire at 65% with wind at 30% and lofi music — it is one of the most-used scenes on the platform.',
  },
  {
    q: 'Can fireplace sounds help with anxiety?',
    a: 'Yes. Research shows that fire sounds specifically (not just general nature sounds) reduce anxiety more effectively than silence or urban noise. The primitive comfort associations, combined with the masking of unexpected sounds, create a psychologically safe environment. Several mental health apps include fireplace sounds specifically for anxiety management.',
  },
  {
    q: 'Is LofiSpace fireplace sounds free?',
    a: 'Yes, completely free. No account, no subscription, no download. Open your browser and start your cosy study session immediately.',
  },
]

const VIBES = [
  { emoji: '🏔️', label: 'Mountain cabin', desc: 'Crackling fire with howling wind outside. The definitive winter study atmosphere — warm inside, wild outside.' },
  { emoji: '🌧️', label: 'Rainy evening', desc: 'Fire with rain on the windows. Two classic comfort sounds combined into one deeply relaxing mix.' },
  { emoji: '📚', label: 'Library fireplace', desc: 'Soft crackling, minimal ambience. The old-world reading room — focused and refined.' },
  { emoji: '☕', label: 'Café fireplace', desc: 'Gentle fire with distant café murmur. Social warmth without distraction.' },
  { emoji: '🎄', label: 'Winter night', desc: 'Crackling fire with soft snow outside. Pure cosy — reading, journaling, slow evenings.' },
  { emoji: '🌙', label: 'Late night fire', desc: 'Quiet house, just the fire. Meditative and focused — perfect for late-night creative work.' },
]

export default function FireplaceSoundsPage() {
  const workspaceUrl = '/workspace?at=fire:70,wind:30&ls=lofi4&lv=55&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Fireplace Sounds', url: 'https://www.focusworkspace.app/fireplace-sounds' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Fireplace Sounds"
        description="Free fireplace sounds online — crackling fire and cosy hearth ambience for studying, relaxation, and sleep."
        url="https://www.focusworkspace.app/fireplace-sounds"
        keywords={['fireplace sounds', 'crackling fire sounds', 'fireplace ambience', 'cosy fire sounds']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-orange-900/30 px-4 py-1 text-sm text-orange-300 ring-1 ring-orange-500/20">
            🔥 Crackling fire · Cosy ambient · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Fireplace Sounds for <span className="text-orange-400">Focus & Relaxation</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Free crackling fireplace sounds that create a warm, cosy study atmosphere
            wherever you are. Layer fire with wind, rain, and lofi music in our ambient mixer.
            No sign-up, no download, free forever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-orange-700 px-8 py-3 font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-orange-600 transition-colors"
            >
              Play Fireplace Sounds →
            </Link>
            <Link
              href="/ambient-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Ambient Sounds
            </Link>
          </div>
        </div>

        {/* Vibes */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Fireplace Vibes — Choose Your Cosy Setting</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIBES.map(v => (
              <div key={v.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{v.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{v.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science */}
        <section className="mb-16 rounded-2xl border border-orange-500/15 bg-orange-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Why Fireplace Sounds Are Uniquely Powerful</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">400,000 years of fire evolution</h3>
              <p>Humans have gathered around fires for almost half a million years. No other sound has been as consistently associated with safety, warmth, and social bonding. Fire sounds trigger deep pre-cognitive comfort responses that few other sounds can match.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Lowers blood pressure</h3>
              <p>A University of Alabama study found that fire-gazing (or fire-listening) lowers blood pressure and promotes prosocial behaviour. The researchers identified "absorption" — a state of relaxed, effortless attention — as the mechanism, similar to light meditation.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Irregular pattern prevents habituation</h3>
              <p>Crackling fire is irregular enough that your auditory system never fully tunes it out, yet predictable enough to be non-distracting. This keeps background awareness just active enough to prevent the unease of silence without competing with focused thought.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Warmth associations boost mood</h3>
              <p>The concept of psychological "warmth" is literally borrowed from physical warmth. Fire sounds activate warmth associations in the brain, which in turn trigger the social and emotional neural networks — increasing feelings of belonging, safety, and calm.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Best Fireplace Sound Mixes</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '🏠 Cosy cabin study', combo: 'Fire 70% + Wind 30% + Lofi 60%', best: 'Reading, studying, long sessions' },
              { label: '🌧️ Stormy night', combo: 'Fire 65% + Rain 55% + Wind 25%', best: 'Writing, creative work, journaling' },
              { label: '😴 Sleep by the fire', combo: 'Fire 75% + Wind 20%', best: 'Falling asleep, deep relaxation' },
              { label: '☕ Fireplace café', combo: 'Fire 50% + Café 35% + Lofi 65%', best: 'Light studying, morning sessions' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-orange-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-orange-900/40 to-amber-900/20 border border-orange-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Cosy up and get focused</h2>
          <p className="mb-6 text-white/55">Free forever. No account. Runs in any browser. Open in 10 seconds.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-orange-700 px-10 py-3 font-semibold text-white hover:bg-orange-600 transition-colors shadow-lg shadow-orange-900/30"
          >
            Play Fireplace Sounds — Free →
          </Link>
        </div>

        <RelatedPages exclude="/fireplace-sounds" />
      </div>
    </>
  )
}
