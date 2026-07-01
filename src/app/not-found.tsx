import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found — LofiSpace',
  description: 'This page does not exist. Browse LofiSpace study rooms, ambient scenes, and productivity tools.',
  robots: { index: false },
}

const QUICK_LINKS = [
  { href: '/online-study-room', label: '📚 Online Study Room' },
  { href: '/anime-study-room', label: '🌸 Anime Study Room' },
  { href: '/coding-room', label: '💻 Coding Room' },
  { href: '/pomodoro-timer', label: '🍅 Pomodoro Timer' },
  { href: '/ambient-sounds', label: '🌧️ Ambient Sounds' },
  { href: '/scenes', label: '✨ Scene Gallery' },
  { href: '/blog', label: '📝 Blog' },
  { href: '/workspace', label: '🎵 Open Workspace' },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-[#0d0d14]">
      <div className="max-w-lg w-full text-center">
        <p className="text-7xl mb-6">🌧️</p>
        <h1 className="text-5xl font-bold text-white mb-3">404</h1>
        <h2 className="text-xl font-semibold text-white/70 mb-3">
          This page drifted away into the lofi void
        </h2>
        <p className="text-white/40 text-sm mb-10">
          The page you&apos;re looking for doesn&apos;t exist. But your focus session doesn&apos;t have to stop here.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-10 text-left">
          {QUICK_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/60 hover:border-violet-500/40 hover:bg-white/8 hover:text-white transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block rounded-full bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          Back to Home →
        </Link>
      </div>
    </div>
  )
}
