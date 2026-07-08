import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Free Lofi Music Online — Study, Focus & Chill',
  description:
    'Stream free lofi music online. Lofi hip hop, chillhop, synthwave, and ambient beats for studying, working, and relaxing. No ads, no sign-up.',
  keywords: [
    'lofi music', 'lofi hip hop', 'lofi music for studying', 'lofi beats', 'chill lofi',
    'lofi study music', 'chillhop', 'lo-fi music', 'lofi music free', 'lofi music online',
    'lofi radio', 'background music for studying', 'study music', 'focus music lofi',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/lofi-music',
    languages: {
      en: 'https://www.focusworkspace.app/lofi-music',
      vi: 'https://www.focusworkspace.app/vi/nhac-lofi-hoc-bai',
      'x-default': 'https://www.focusworkspace.app/lofi-music',
    },
  },
  openGraph: {
    title: 'Free Lofi Music for Studying & Focus | LofiSpace',
    description: 'Stream free lofi hip hop, chillhop and synthwave with ambient sounds. No ads. No sign-up.',
    url: 'https://www.focusworkspace.app/lofi-music',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lofi Music Online | LofiSpace',
    description: 'Free lofi music for studying — lofi hip hop, chillhop, synthwave. No ads. No sign-up.',
  },
}

const GENRES = [
  {
    emoji: '🎵',
    name: 'Lofi Hip Hop',
    bpm: '65–85 BPM',
    desc: 'Warm, dusty beats with vinyl crackle and jazz samples. The quintessential study music genre. Triggers flow states without lyrical distraction.',
    best: 'General studying, homework, reading',
    color: 'violet',
  },
  {
    emoji: '🎷',
    name: 'Chillhop',
    bpm: '75–95 BPM',
    desc: 'Relaxed hip hop with live jazz instruments — saxophone, keys, brushed drums. Slightly more energetic than lofi. Great for creative work.',
    best: 'Creative writing, design, brainstorming',
    color: 'amber',
  },
  {
    emoji: '🌆',
    name: 'Synthwave',
    bpm: '90–120 BPM',
    desc: '80s-inspired electronic with pulsing basslines and lush pads. Higher energy. Excellent for fast-paced tasks and coding sessions.',
    best: 'Coding, data work, fast-output tasks',
    color: 'pink',
  },
  {
    emoji: '🌊',
    name: 'Ambient',
    bpm: '55–70 BPM',
    desc: 'Textures, drones, and slow-evolving pads. Minimal rhythm. Puts the brain in a receptive, meditative state.',
    best: 'Meditation, deep reading, heavy thinking',
    color: 'teal',
  },
]

const FAQ = [
  {
    q: 'Why does lofi music help with studying?',
    a: 'Lofi music sits in a productivity sweet spot: it is structured enough to provide rhythmic stimulation (which increases arousal and alertness), but lacks lyrics and melodic hooks that would compete for language-processing resources. The result is gentle background activation without cognitive interference.',
  },
  {
    q: 'What is lofi music exactly?',
    a: 'Lofi (low-fidelity) music is a genre defined by intentionally imperfect production — vinyl crackle, tape hiss, soft clipping, dusty samples from jazz and soul records. The aesthetic warmth of these "imperfections" creates a nostalgic, comfortable atmosphere that many people associate with focused, creative work.',
  },
  {
    q: 'Is lofi music better than silence for studying?',
    a: 'For most people, yes — moderate background music (~50-70 dB) outperforms silence on creative tasks and tasks requiring sustained attention. However, for tasks requiring heavy verbal processing (writing, reading dense text), silence or instrumental-only music is better. Lofi hits the right balance for most study scenarios.',
  },
  {
    q: 'What is the difference between lofi and chillhop?',
    a: 'Lofi hip hop uses mostly sampled and synthesized instruments with intentional lo-fi production artifacts (vinyl crackle, tape hiss). Chillhop features more live instrumentation — real saxophone, real piano — with a slightly cleaner sound. Both are excellent for studying; chillhop tends to be slightly more energetic.',
  },
  {
    q: 'Can I listen to lofi music with headphones?',
    a: 'Yes, headphones work well for lofi music especially in noisy environments. However, LofiSpace is designed for speakers too — the ambient sounds (rain, café, fire) layer naturally with room acoustics and create a more immersive environment when played through speakers.',
  },
  {
    q: 'Is the lofi music on LofiSpace free?',
    a: 'Yes, completely free. No account, no subscription, no ads. Stream lofi hip hop, chillhop, synthwave, and ambient music directly in your browser with no interruptions.',
  },
  {
    q: 'Can I mix lofi music with other sounds?',
    a: 'Yes — this is the core feature of LofiSpace. Use the ambient mixer to layer rain, café sounds, fire crackling, or ocean waves over the music. Each sound has an independent volume control. Your custom mix is saved in the URL so you can share it or return to it any time.',
  },
]

export default function LofiMusicPage() {
  const workspaceUrl = '/workspace?ls=lofi1&at=rain:45,cafe:20&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Lofi Music', url: 'https://www.focusworkspace.app/lofi-music' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Lofi Music"
        description="Free lofi music streaming for studying and focus. Lofi hip hop, chillhop, synthwave and ambient music with ambient sound mixer."
        url="https://www.focusworkspace.app/lofi-music"
        keywords={['lofi music', 'lofi hip hop', 'study music', 'chillhop', 'focus music']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🎵 Lofi hip hop · Chillhop · Synthwave · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Free <span className="text-violet-400">Lofi Music</span> for Studying
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Stream lofi hip hop, chillhop, synthwave, and ambient music with no ads and no
            account. Layer with rain sounds, café noise, and other ambient sounds in our
            interactive mixer. The complete lofi music experience, free forever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Play Lofi Music →
            </Link>
            <Link
              href="/ambient-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Ambient Sounds Mixer
            </Link>
          </div>
        </div>

        {/* Genres */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Lofi Music Genres Available</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {GENRES.map(g => (
              <div key={g.name} className="rounded-2xl border border-white/8 bg-white/4 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-3xl">{g.emoji}</span>
                  <div>
                    <h3 className="font-bold text-white">{g.name}</h3>
                    <span className="text-xs text-white/40">{g.bpm}</span>
                  </div>
                </div>
                <p className="text-sm text-white/55 leading-relaxed mb-3">{g.desc}</p>
                <p className="text-xs text-white/35">Best for: <span className="text-white/50">{g.best}</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* Why lofi works */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Lofi Music Works for Studying</h2>
          <div className="space-y-4 text-white/60 text-sm leading-relaxed">
            <p>
              The relationship between music and cognitive performance is well-studied.
              The key finding: music with lyrics impairs verbal processing tasks. Music
              with too much variation demands attention and pulls you out of flow. Music
              with too little stimulation provides no benefit over silence.
            </p>
            <p>
              Lofi music occupies the optimal position in this space. Its tempo (65-90 BPM)
              matches resting heart rate and provides mild rhythmic entrainment — your brain
              syncs to the rhythm, which moderates arousal and sustains attention.
              Its absence of lyrics and repetitive, predictable structure means your language
              and novelty-detection systems can fully ignore it.
            </p>
            <p>
              The lo-fi aesthetic — vinyl crackle, soft distortion — adds warmth that many
              people associate with comfort and nostalgia. This emotional association may
              prime a relaxed-but-alert state that supports sustained focus better than
              a neutral or harsh acoustic environment.
            </p>
          </div>
        </section>

        {/* Best lofi combinations */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Best Lofi Music + Ambient Sound Combos</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '📚 Classic Study Mix', recipe: 'Lofi hip hop 70% + Rain 50% + Café 25%', desc: 'The most popular combination. Timeless. Works for nearly every type of study session.' },
              { title: '💻 Late-Night Code Mix', recipe: 'Synthwave 75% + City Night 40% + Rain 30%', desc: 'High-energy lofi for extended coding or writing sessions after dark.' },
              { title: '🔥 Cosy Winter Mix', recipe: 'Lofi hip hop 65% + Fire 50% + Rain 35%', desc: 'Warm and intimate. For journaling, reading, or creative projects on rainy days.' },
              { title: '🌿 Nature Study Mix', recipe: 'Chillhop 60% + Forest 45% + Ocean 25%', desc: 'Biophilic soundscape. Reduces cortisol and anxiety during high-stress study periods.' },
              { title: '🎷 Jazz Study Mix', recipe: 'Chillhop 70% + Café 40%', desc: 'Live jazz instruments over the ambient murmur of a coffee shop.' },
              { title: '🌊 Minimal Focus Mix', recipe: 'Ambient music 50% + Rain 70%', desc: 'Almost silent but never silent. For tasks requiring maximum verbal processing.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs font-mono text-violet-300/70 mb-2">{item.recipe}</p>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Study rooms */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Lofi Music Study Rooms</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: '/online-study-room', emoji: '📚', label: 'Online Study Room', desc: 'Lofi hip hop + rain. The essential study space.' },
              { href: '/anime-study-room', emoji: '🌸', label: 'Anime Study Room', desc: 'City-pop lofi with cherry blossom aesthetics.' },
              { href: '/coding-room', emoji: '💻', label: 'Coding Room', desc: 'Synthwave + city rain. Built for developers.' },
              { href: '/deep-work-room', emoji: '🧠', label: 'Deep Work Room', desc: 'Minimal UI, ambient beats, heavy rain.' },
              { href: '/focus-room', emoji: '🎯', label: 'Focus Room', desc: 'Thunderstorm + lofi. Maximum focus mode.' },
            ].map(room => (
              <Link
                key={room.href}
                href={room.href}
                className="flex gap-3 rounded-xl border border-white/8 bg-white/4 p-4 hover:border-violet-500/30 hover:bg-white/6 transition-all"
              >
                <span className="text-2xl">{room.emoji}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{room.label}</p>
                  <p className="text-xs text-white/45 mt-0.5 leading-relaxed">{room.desc}</p>
                </div>
              </Link>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-pink-900/20 border border-violet-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to focus with lofi?</h2>
          <p className="mb-6 text-white/55">
            Free lofi music, no ads, no sign-up. Mix with rain and café sounds in 10 seconds.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
          >
            Play Lofi Music — Free →
          </Link>
        </div>

        <RelatedPages exclude="/lofi-music" />
      </div>
    </>
  )
}
