import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Forest Sounds for Focus & Relaxation — Free Online',
  description:
    'Free forest sounds online — birds, rustling leaves, wind through trees, and babbling brooks. Natural ambient sounds for studying, relaxation, and sleep. No sign-up.',
  keywords: [
    'forest sounds', 'forest sounds for studying', 'nature sounds forest',
    'forest ambient sounds', 'forest sounds online', 'forest background noise',
    'birdsong sounds', 'nature sounds for focus', 'forest sounds free',
    'woodland sounds', 'forest meditation sounds', 'bird sounds forest',
    'nature sounds studying', 'forest ambience', 'forest white noise',
  ],
  alternates: { canonical: 'https://focusworkspace.app/forest-sounds' },
  openGraph: {
    title: 'Forest Sounds for Focus & Relaxation | LofiSpace',
    description: 'Free forest sounds — birds, rustling leaves, and natural ambient sounds for studying and relaxation. No sign-up.',
    url: 'https://focusworkspace.app/forest-sounds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forest Sounds for Focus & Relaxation | LofiSpace',
    description: 'Free forest sounds online — natural ambience for studying, relaxation, and sleep.',
  },
}

const FAQ = [
  {
    q: 'Why are forest sounds good for studying?',
    a: 'Forest sounds work through two mechanisms. First, they mask unpredictable distractions with consistent natural ambient sound. Second, they trigger Attention Restoration Theory (ART) effects — exposure to natural soundscapes, even recorded ones, has been shown to reduce mental fatigue and restore directed attention. This is why a walk in the woods feels refreshing: the natural environment gives your voluntary attention system a rest.',
  },
  {
    q: 'What is Attention Restoration Theory?',
    a: 'Attention Restoration Theory (ART), developed by Rachel and Stephen Kaplan, proposes that natural environments replenish directed attention capacity. Natural sounds — birdsong, wind, water — engage "soft fascination" that allows the voluntary attention system to rest and recover. Research shows that even brief exposure to recorded nature sounds reduces stress and improves subsequent focus performance.',
  },
  {
    q: 'Are forest sounds good for sleep?',
    a: 'Yes. Forest sounds are among the most effective natural sleep aids. Birdsong specifically is processed by the brain as a safety signal — birds only sing when the environment is safe and predator-free. Soft wind and rustling leaves provide gentle broadband masking. For sleep, use forest sounds without any music at a low-to-moderate volume.',
  },
  {
    q: 'Do nature sounds reduce stress?',
    a: 'Multiple studies confirm nature sounds lower cortisol levels, reduce heart rate, and decrease activity in the amygdala (the brain\'s threat-detection centre). One University of Sussex study found that nature sounds shifted brain connectivity away from inward-focused worry toward outward-focused processing — effectively reducing rumination and anxiety.',
  },
  {
    q: 'What is the best nature sound for studying?',
    a: 'For studying specifically, forest sounds with birdsong and a gentle stream tend to outperform ocean sounds (too variable) and pure silence (no masking). Combining forest sounds with lofi music at a lower volume creates a layered environment with both the masking benefit of ambient noise and the motivational benefit of gentle music.',
  },
  {
    q: 'Is LofiSpace forest sounds free?',
    a: 'Yes, completely free. No account, no subscription, no download. The forest ambience and full ambient sound mixer run in any browser.',
  },
]

const SCENES = [
  { emoji: '🌅', label: 'Forest morning', desc: 'Dawn chorus, dew-wet leaves, gentle birdsong. Energising and fresh — perfect for early-morning study sessions.' },
  { emoji: '🌿', label: 'Deep woodland', desc: 'Dense canopy, distant birds, soft wind. A sense of depth and immersion. Great for long reading sessions.' },
  { emoji: '🏞️', label: 'Forest stream', desc: 'Babbling brook with forest ambient. Water sounds enhance the masking power and add rhythmic texture.' },
  { emoji: '🌧️', label: 'Forest rain', desc: 'Rain on leaves — a unique texture where rain is softened by the canopy. Deeply calming.' },
  { emoji: '🦅', label: 'Mountain forest', desc: 'Wind through pines, occasional bird calls. Sparse and open — reminiscent of high-altitude wilderness.' },
  { emoji: '🌙', label: 'Night forest', desc: 'Crickets, gentle wind, occasional owl. The opposite energy to morning — calming and meditative.' },
]

export default function ForestSoundsPage() {
  const workspaceUrl = '/workspace?at=forest:70,wind:30&ls=lofi4&lv=55&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Forest Sounds', url: 'https://focusworkspace.app/forest-sounds' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Forest Sounds"
        description="Free forest sounds online for studying, relaxation, and sleep. Natural ambient sounds — birds, wind, rustling leaves."
        url="https://focusworkspace.app/forest-sounds"
        keywords={['forest sounds', 'nature sounds', 'forest ambient', 'birdsong sounds']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-green-900/30 px-4 py-1 text-sm text-green-300 ring-1 ring-green-500/20">
            🌿 Forest sounds · Nature ambient · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Forest Sounds for <span className="text-green-400">Focus & Relaxation</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Immersive forest ambience — birds, rustling leaves, wind through trees —
            backed by neuroscience to restore attention and reduce stress.
            Mix with lofi music in our free ambient mixer. No sign-up, no download.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-green-700 px-8 py-3 font-semibold text-white shadow-lg shadow-green-900/40 hover:bg-green-600 transition-colors"
            >
              Play Forest Sounds →
            </Link>
            <Link
              href="/ambient-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Ambient Sounds
            </Link>
          </div>
        </div>

        {/* Scene types */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Forest Soundscapes — Choose Your Environment</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SCENES.map(s => (
              <div key={s.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{s.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ART section */}
        <section className="mb-16 rounded-2xl border border-green-500/15 bg-green-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">The Science: Why Nature Sounds Restore Focus</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Attention Restoration Theory (ART)</h3>
              <p>Natural environments engage "soft fascination" — effortless attention that lets the voluntary attention system recover. Even recorded forest sounds trigger partial ART benefits, reducing mental fatigue during long study sessions.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Birdsong as a safety signal</h3>
              <p>Birds only sing when they feel safe. Evolutionary psychology suggests your brain interprets birdsong as confirmation that no predators are nearby — reducing ambient vigilance and freeing cognitive resources for focused work.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Cortisol reduction</h3>
              <p>Multiple studies show that listening to nature sounds lowers cortisol (the stress hormone) more effectively than urban sounds. Lower cortisol means less anxiety and better working memory — direct benefits for studying.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Consistent masking without monotony</h3>
              <p>Unlike pure white noise, forest sounds have micro-variations — a bird call here, a gust of wind there — that prevent listener fatigue while still providing consistent masking. This makes them more sustainable over long study sessions.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Best Forest Sound Mixes</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '📚 Forest study mix', combo: 'Forest 70% + Wind 25% + Lofi 55%', best: 'Reading, reviewing, general studying' },
              { label: '😴 Forest sleep mix', combo: 'Forest 65% + Wind 35%', best: 'Falling asleep, meditation, relaxation' },
              { label: '🌧️ Rainy forest mix', combo: 'Forest 60% + Rain 50% + Lofi 50%', best: 'Writing, journaling, creative work' },
              { label: '🧘 Restoration break', combo: 'Forest 80% + Wind 30%', best: 'Study breaks, mindfulness, stress relief' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-green-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-green-900/40 to-green-800/10 border border-green-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Step into the forest — from your desk</h2>
          <p className="mb-6 text-white/55">Free forever. No account. Runs in any browser. Open in 10 seconds.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-green-700 px-10 py-3 font-semibold text-white hover:bg-green-600 transition-colors shadow-lg shadow-green-900/30"
          >
            Play Forest Sounds — Free →
          </Link>
        </div>

        <RelatedPages exclude="/forest-sounds" />
      </div>
    </>
  )
}
