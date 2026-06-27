import Link from 'next/link'
import { Music2 } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

const STUDY_ROOMS = [
  { href: '/online-study-room', label: 'Online Study Room' },
  { href: '/anime-study-room',  label: 'Anime Study Room' },
  { href: '/coding-room',       label: 'Coding Room' },
  { href: '/focus-room',        label: 'Focus Room' },
  { href: '/deep-work-room',    label: 'Deep Work Room' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0d0d14]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <Music2 className="h-5 w-5 text-violet-400" />
          <span>LofiSpace</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm text-white/60">
          {/* Study Rooms dropdown — CSS-only hover */}
          <div className="group relative hidden sm:block">
            <button className="flex items-center gap-1 hover:text-white transition-colors py-1">
              Study Rooms
              <svg className="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            <div className="pointer-events-none absolute left-0 top-full mt-1 w-48 rounded-xl border border-white/10 bg-[#16131f] py-1 opacity-0 shadow-xl transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
              {STUDY_ROOMS.map(r => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="block px-4 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/scenes" className="hidden sm:block hover:text-white transition-colors">
            Scenes
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <LanguageToggle />
          <Link
            href="/workspace"
            className="rounded-full bg-violet-600 px-4 py-1.5 text-white hover:bg-violet-500 transition-colors"
          >
            Open Workspace
          </Link>
        </nav>
      </div>
    </header>
  )
}
