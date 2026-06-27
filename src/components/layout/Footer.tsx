import Link from 'next/link'
import { Music2 } from 'lucide-react'
import { SupportButton } from '@/components/support/SupportButton'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a11] pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="mb-3 flex items-center gap-2 text-sm text-white/60">
              <Music2 className="h-4 w-4 text-violet-400" />
              <span className="font-semibold text-white">LofiSpace</span>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed">
              Free online study room with lofi music, ambient sounds and Pomodoro timer.
            </p>
          </div>

          {/* Study Rooms */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Study Rooms</h3>
            <ul className="space-y-2 text-xs text-white/30">
              <li><Link href="/online-study-room" className="hover:text-white/70 transition-colors">Online Study Room</Link></li>
              <li><Link href="/anime-study-room"  className="hover:text-white/70 transition-colors">Anime Study Room</Link></li>
              <li><Link href="/coding-room"       className="hover:text-white/70 transition-colors">Coding Room</Link></li>
              <li><Link href="/focus-room"        className="hover:text-white/70 transition-colors">Focus Room</Link></li>
              <li><Link href="/deep-work-room"    className="hover:text-white/70 transition-colors">Deep Work Room</Link></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Product</h3>
            <ul className="space-y-2 text-xs text-white/30">
              <li><Link href="/workspace" className="hover:text-white/70 transition-colors">Open Workspace</Link></li>
              <li><Link href="/scenes"    className="hover:text-white/70 transition-colors">Scene Gallery</Link></li>
              <li><Link href="/blog"      className="hover:text-white/70 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Features</h3>
            <ul className="space-y-2 text-xs text-white/30">
              <li>Lofi Music Player</li>
              <li>Ambient Sound Mixer</li>
              <li>Pomodoro Timer</li>
              <li>XP & Achievements</li>
              <li>Notion Embed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} LofiSpace. Free for everyone, forever.
          </p>
          <div className="flex items-center gap-4">
            <SupportButton />
            <p className="text-xs text-white/20">
              Online Study Room · Focus Workspace · Lofi Music
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
