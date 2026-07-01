import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Anime Study Room — Japanese Aesthetic Study Space with Lofi Music',
  description:
    'Study in a cosy anime-inspired room with Japanese lofi music, rain sounds, cherry blossom backgrounds and a Pomodoro timer. Free online aesthetic study room.',
  keywords: [
    'anime study room', 'japanese study room', 'aesthetic study room', 'lofi anime',
    'study with me anime', 'japanese aesthetic workspace', 'cozy anime room', 'study music anime',
  ],
  openGraph: {
    title: 'Anime Study Room — LofiSpace',
    description: 'Japanese aesthetic study space with lofi music, rain sounds & Pomodoro timer. Free.',
    type: 'website',
    url: 'https://focusworkspace.app/anime-study-room',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anime Study Room — LofiSpace',
    description: 'Japanese aesthetic study space with lofi music, rain sounds & Pomodoro timer.',
  },
  alternates: { canonical: 'https://focusworkspace.app/anime-study-room' },
}

const FAQ = [
  {
    q: 'What is an anime study room?',
    a: 'An anime study room is a virtual workspace designed with Japanese aesthetic — cosy backgrounds, lo-fi city-pop music and rain ambience — inspired by scenes from anime like Your Name or Weathering With You.',
  },
  {
    q: 'What music plays in the anime study room?',
    a: 'Japanese-inspired lofi hip hop, city pop and chill beats — calm enough to study without distracting you.',
  },
  {
    q: 'Can I change the background?',
    a: 'Yes. Inside the workspace you can choose from 15+ animated GIF backgrounds including anime-styled scenes, rainy windows, cosy rooms and more.',
  },
  {
    q: 'Does it have a Pomodoro timer?',
    a: 'Yes. A 25/5 minute Pomodoro timer is built in. Completing sessions earns XP and builds your study streak.',
  },
]

const PRESET_FEATURES = [
  { emoji: '🌸', label: 'Sakura & Rain aesthetic backgrounds' },
  { emoji: '🎵', label: 'Japanese city-pop lofi soundtrack' },
  { emoji: '🌧️', label: 'Soft rain + café ambient sounds' },
  { emoji: '🍅', label: 'Pomodoro timer with XP rewards' },
  { emoji: '🐱', label: 'Coding cat study companion' },
  { emoji: '✅', label: 'To-do list & daily calendar' },
]

export default function AnimeStudyRoomPage() {
  // Tokyo Cafe Rain scene params
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/lofi-bedroom.mp4') +
    '&bgo=40&ls=lofi1&lv=65&at=rain:55,cafe:35&pom=1&clk=1&ac=a78bfa'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Anime Study Room', url: 'https://focusworkspace.app/anime-study-room' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Anime Study Room"
        description="Japanese aesthetic virtual study room with lofi music, rain ambience and Pomodoro timer."
        url="https://focusworkspace.app/anime-study-room"
        keywords={['anime study room', 'japanese aesthetic', 'lofi anime', 'study with me']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-pink-900/30 px-4 py-1 text-sm text-pink-300 ring-1 ring-pink-500/20">
            🌸 Japanese aesthetic · Rain sounds · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-pink-400">Anime</span> Study Room
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Step into a cosy Japanese-inspired study space with soft lofi beats, gentle rain
            sounds and anime-aesthetic backgrounds. Study smarter with the Pomodoro timer and
            earn XP for every session.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-pink-600 px-8 py-3 font-semibold text-white shadow-lg shadow-pink-900/40 hover:bg-pink-500 transition-colors"
            >
              Enter Anime Room →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Scenes
            </Link>
          </div>
        </div>

        {/* Preset features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            What's Included
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {PRESET_FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{f.emoji}</span>
                <span className="text-sm text-white/70">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About section */}
        <section className="mb-16 rounded-2xl border border-pink-500/15 bg-pink-950/15 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Study in an Anime Room?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              The anime study room aesthetic — popularised by lo-fi Girl and millions of
              "study with me" videos — creates a calm, immersive environment that signals
              to your brain it's time to focus.
            </p>
            <p>
              Soft rain sounds act as white noise, masking distractions. Japanese city-pop
              lofi has a BPM (70–90) proven to support concentration without engaging the
              language-processing areas of the brain.
            </p>
            <p>
              The Pomodoro technique built into LofiSpace turns each 25-minute session into
              a small, achievable goal. The XP and streak system gives you a reason to
              come back every day.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">FAQ</h2>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-pink-900/30 to-violet-900/20 border border-pink-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Start studying now</h2>
          <p className="mb-6 text-white/55">No account. No download. Just open and focus.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-pink-600 px-10 py-3 font-semibold text-white hover:bg-pink-500 transition-colors"
          >
            Open Anime Study Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/anime-study-room" />
      </div>
    </>
  )
}
