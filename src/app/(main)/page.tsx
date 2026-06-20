import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LofiSpace — Ambient Sound Widgets for Notion & Blog',
}

const TEMPLATES = [
  {
    id: 'rainy-cafe',
    label: 'Rainy Café',
    emoji: '☕🌧️',
    desc: 'Rain + Café ambience with lofi jazz',
    bg: '#1a1a2e',
    params: 'bg=g&bgv=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2Fl0HlBO7eyXzSZkJri%2Fgiphy.gif&at=rain%3A60%2Ccafe%3A40&ls=lofi-girl',
  },
  {
    id: 'forest-night',
    label: 'Forest Night',
    emoji: '🌿🌙',
    desc: 'Crickets & forest breeze',
    bg: '#0d1f0d',
    params: 'bg=g&at=forest%3A70&ls=jazz-hop',
  },
  {
    id: 'synthwave',
    label: 'Synthwave Drive',
    emoji: '🚗🌆',
    desc: 'Retrowave vibes for late night coding',
    bg: '#1a0a2e',
    params: 'ls=synthwave&ac=f472b6',
  },
  {
    id: 'fireplace',
    label: 'Cozy Fireplace',
    emoji: '🔥📚',
    desc: 'Warm crackling fire for reading',
    bg: '#2d1a0a',
    params: 'at=fire%3A70&ls=lofi-chill',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-violet-900/40 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/30">
            Free · No sign-up · Embeds in Notion
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-tight text-white sm:text-6xl">
            Your personal<br />
            <span className="text-violet-400">ambient workspace</span>
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Mix lofi music with ambient sounds. Add animated backgrounds. Embed the widget
            directly into Notion, your blog, or any webpage — all for free.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/workspace"
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Create Your Widget
            </Link>
            <Link
              href="#templates"
              className="rounded-full bg-white/5 px-8 py-3 font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense Slot — Top Banner */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/2 text-xs text-white/20">
          {/* Replace with actual AdSense script */}
          Google AdSense Banner (728×90)
        </div>
      </div>

      {/* Templates */}
      <section id="templates" className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-white">
          Ready-made Templates
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((t) => (
            <Link
              key={t.id}
              href={`/workspace?${t.params}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-violet-500/50 hover:bg-white/8"
            >
              <div
                className="mb-3 flex h-32 items-center justify-center rounded-xl text-4xl"
                style={{ backgroundColor: t.bg }}
              >
                {t.emoji}
              </div>
              <h3 className="font-semibold text-white">{t.label}</h3>
              <p className="mt-1 text-sm text-white/50">{t.desc}</p>
              <span className="mt-3 text-xs font-medium text-violet-400 group-hover:text-violet-300">
                Use template →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">How it works</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { icon: '🎚️', title: 'Mix your sounds', body: 'Combine lofi streams with rain, café, waves and more. Each has its own volume slider.' },
            { icon: '🖼️', title: 'Choose a background', body: 'Pick any GIF URL or Giphy search. Set opacity to blend it perfectly.' },
            { icon: '🔗', title: 'Embed anywhere', body: 'Get a unique URL. Paste it into Notion with /embed or drop an <iframe> in any webpage.' },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/3 p-6">
              <div className="mb-4 text-3xl">{f.icon}</div>
              <h3 className="mb-2 font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-white/50">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AdSense Slot — Mid Page */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/2 text-xs text-white/20">
          Google AdSense Banner (728×90)
        </div>
      </div>

      {/* CTA */}
      <section className="text-center px-4">
        <h2 className="text-3xl font-bold text-white">Ready to vibe?</h2>
        <p className="mt-3 text-white/50">No sign-up. No download. Just click and create.</p>
        <Link
          href="/workspace"
          className="mt-6 inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white shadow-xl shadow-violet-900/40 hover:bg-violet-500 transition-colors"
        >
          Create Widget for Free
        </Link>
      </section>
    </div>
  )
}
