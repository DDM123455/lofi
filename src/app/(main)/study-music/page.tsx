import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Study Music for Focus & Concentration — Free Online',
  description:
    'Free study music for focus and concentration. Lofi hip-hop, chill beats, and ambient soundscapes to help you study better. No sign-up, any browser.',
  keywords: [
    'study music', 'study music for focus', 'study music concentration',
    'music to study to', 'best music for studying', 'lofi study music',
    'study beats', 'concentration music', 'focus music for studying',
    'music for studying and concentration', 'instrumental study music',
    'study music free', 'chill study music', 'music while studying',
  ],
  alternates: { canonical: 'https://focusworkspace.app/study-music' },
  openGraph: {
    title: 'Study Music for Focus & Concentration | LofiSpace',
    description: 'Free lofi study music — chill beats and ambient soundscapes to help you concentrate. No sign-up.',
    url: 'https://focusworkspace.app/study-music',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Music for Focus & Concentration | LofiSpace',
    description: 'Free study music online — lofi beats that actually help you concentrate.',
  },
}

const FAQ = [
  {
    q: 'Does music help with studying?',
    a: 'It depends on the type of music and the type of task. Instrumental music without lyrics — especially lofi hip-hop, classical, and ambient music — consistently improves mood and reduces anxiety during studying without competing with language processing. Lyric-heavy music tends to hurt reading comprehension and writing, as the words compete with your internal voice.',
  },
  {
    q: 'What is the best music to study to?',
    a: 'The research consensus favours instrumental music at moderate volume (60-70 dB): lofi hip-hop, classical piano, ambient electronic, or binaural beats. The key properties are: no lyrics, consistent tempo (80-120 BPM is common for focus playlists), and moderate complexity — enough to engage your auditory system, not enough to demand attention.',
  },
  {
    q: 'Is lofi music good for studying?',
    a: 'Yes — lofi hip-hop is arguably the most popular genre for studying for a reason. Its properties align well with cognitive focus: tempos around 60-90 BPM (matching a relaxed heart rate), jazz-influenced harmonics that are complex enough to be interesting, and an intentionally "imperfect" lo-fi quality that many people find psychologically comfortable and non-fatiguing.',
  },
  {
    q: 'What is the Mozart effect?',
    a: 'The Mozart effect is the popular claim that listening to Mozart temporarily boosts spatial reasoning. The original research (Rauscher et al., 1993) was limited in scope and has not reliably replicated. The broader takeaway from the research: enjoyable music can boost mood and motivation, which in turn can improve study performance — but there is no magic genre that makes you smarter.',
  },
  {
    q: 'Should I use headphones or speakers for study music?',
    a: 'Headphones are generally better for studying in shared spaces — they block external noise and allow you to control your sound environment. Over-ear headphones are preferable to in-ear for long sessions as they cause less fatigue. Keep volumes at or below 65-70 dB (a comfortable conversational level) to protect your hearing during long study marathons.',
  },
  {
    q: 'Is LofiSpace study music free?',
    a: 'Yes, completely free. No account, no subscription, no download. LofiSpace streams curated lofi playlists and lets you mix them with ambient sounds — all in your browser at no cost.',
  },
]

const GENRES = [
  { emoji: '🎧', label: 'Lofi hip-hop', desc: 'Mellow beats, jazzy chords, and a warm, nostalgic quality. The most popular study music genre globally.' },
  { emoji: '🎹', label: 'Chillhop', desc: 'Slower lofi + jazz-influenced instrumentals. Great for reading and note-taking.' },
  { emoji: '🌊', label: 'Ambient electronic', desc: 'Atmospheric textures, minimal percussion. Ideal for deep focus and problem-solving.' },
  { emoji: '🎷', label: 'Jazz instrumentals', desc: 'Sophisticated harmonic complexity without being distracting. Perfect for creative work.' },
  { emoji: '🎼', label: 'Classical', desc: 'Baroque and classical-period piano. Low arousal, high focus — excellent for maths and analytical tasks.' },
  { emoji: '🌿', label: 'Nature + music', desc: 'Lofi beats layered with rain, forest, or café sounds. The complete study environment.' },
]

const SCIENCE = [
  { title: 'Reduces anxiety and stress', body: 'Familiar, pleasant music lowers cortisol levels. Students who listen to calming instrumental music before and during studying report lower test anxiety and better recall.' },
  { title: 'Improves mood and motivation', body: 'Enjoyable music triggers dopamine release, which improves motivation and the subjective experience of studying. You are more likely to sit down, stay seated, and return the next day.' },
  { title: 'Sets environmental anchor', body: 'Consistently using the same study music creates a conditioned association: hearing it signals your brain to enter study mode. This is why many students find it easier to focus with "study music" than with random playlists.' },
  { title: 'Masks distracting sounds', body: 'When combined with ambient sounds, lofi music covers the frequency range of distracting sounds — speech, traffic, keyboard noise. The combined effect is a personalised acoustic cocoon.' },
]

export default function StudyMusicPage() {
  const workspaceUrl = '/workspace?ls=lofi1&lv=70&at=rain:40,cafe:25&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Study Music', url: 'https://focusworkspace.app/study-music' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Study Music"
        description="Free study music for focus and concentration. Lofi hip-hop, chill beats, and ambient soundscapes to help you study better."
        url="https://focusworkspace.app/study-music"
        keywords={['study music', 'lofi study music', 'music for studying', 'concentration music']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🎧 Lofi music · Ambient mixer · Free · No sign-up
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Study Music for <span className="text-violet-400">Focus & Concentration</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Curated lofi hip-hop and chill beats proven to improve focus and reduce study anxiety.
            Mix music with ambient sounds — rain, café noise, and more — in our free interactive mixer.
            No ads, no sign-up, no download.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Play Study Music →
            </Link>
            <Link
              href="/lofi-music"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Lofi Music
            </Link>
          </div>
        </div>

        {/* Genres */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Best Music Genres for Studying</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GENRES.map(g => (
              <div key={g.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{g.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{g.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Why Study Music Works — The Science</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SCIENCE.map(s => (
              <div key={s.title}>
                <h3 className="mb-1 font-semibold text-white text-sm">{s.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Top Study Music Combinations</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '📚 Classic deep study', combo: 'Lofi 70% + Rain 45% + Café 25%', best: 'Reading, note-taking, homework' },
              { label: '💻 Coding & programming', combo: 'Synthwave lofi 70% + City 30%', best: 'Coding, technical writing, debugging' },
              { label: '✍️ Creative writing', combo: 'Lofi 65% + Café 40% + Rain 30%', best: 'Writing essays, brainstorming, journaling' },
              { label: '🧮 Maths & problem-solving', combo: 'Lofi 55% + Rain 50%', best: 'Maths, physics, analytical tasks' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-violet-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/10 border border-violet-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to study with the perfect music?</h2>
          <p className="mb-6 text-white/55">Free forever. No account. Open in 10 seconds.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-900/30"
          >
            Play Study Music — Free →
          </Link>
        </div>

        <RelatedPages exclude="/study-music" />
      </div>
    </>
  )
}
