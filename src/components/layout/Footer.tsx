import Link from 'next/link'
import { Music2 } from 'lucide-react'
import { SupportButton } from '@/components/support/SupportButton'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a11] pt-12 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
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
              <li><Link href="/online-study-room"  className="hover:text-white/70 transition-colors">Online Study Room</Link></li>
              <li><Link href="/anime-study-room"   className="hover:text-white/70 transition-colors">Anime Study Room</Link></li>
              <li><Link href="/coding-room"        className="hover:text-white/70 transition-colors">Coding Room</Link></li>
              <li><Link href="/focus-room"         className="hover:text-white/70 transition-colors">Focus Room</Link></li>
              <li><Link href="/deep-work-room"     className="hover:text-white/70 transition-colors">Deep Work Room</Link></li>
              <li><Link href="/adhd-focus-room"    className="hover:text-white/70 transition-colors">ADHD Focus Room</Link></li>
              <li><Link href="/virtual-study-room" className="hover:text-white/70 transition-colors">Virtual Study Room</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Focus Tools</h3>
            <ul className="space-y-2 text-xs text-white/30">
              <li><Link href="/pomodoro-timer"     className="hover:text-white/70 transition-colors">Pomodoro Timer</Link></li>
              <li><Link href="/lofi-music"         className="hover:text-white/70 transition-colors">Lofi Music</Link></li>
              <li><Link href="/ambient-sounds"     className="hover:text-white/70 transition-colors">Ambient Sounds</Link></li>
              <li><Link href="/focus-music"        className="hover:text-white/70 transition-colors">Focus Music</Link></li>
              <li><Link href="/study-with-me"      className="hover:text-white/70 transition-colors">Study With Me</Link></li>
              <li><Link href="/study-music"        className="hover:text-white/70 transition-colors">Study Music</Link></li>
              <li><Link href="/coding-music"       className="hover:text-white/70 transition-colors">Coding Music</Link></li>
            </ul>
          </div>

          {/* Sounds */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Ambient Sounds</h3>
            <ul className="space-y-2 text-xs text-white/30">
              <li><Link href="/rain-sounds"           className="hover:text-white/70 transition-colors">Rain Sounds</Link></li>
              <li><Link href="/white-noise"           className="hover:text-white/70 transition-colors">White Noise</Link></li>
              <li><Link href="/brown-noise"           className="hover:text-white/70 transition-colors">Brown Noise</Link></li>
              <li><Link href="/coffee-shop-sounds"    className="hover:text-white/70 transition-colors">Coffee Shop Sounds</Link></li>
              <li><Link href="/thunderstorm-sounds"   className="hover:text-white/70 transition-colors">Thunderstorm Sounds</Link></li>
              <li><Link href="/forest-sounds"         className="hover:text-white/70 transition-colors">Forest Sounds</Link></li>
              <li><Link href="/fireplace-sounds"      className="hover:text-white/70 transition-colors">Fireplace Sounds</Link></li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Product</h3>
            <ul className="space-y-2 text-xs text-white/30">
              <li><Link href="/workspace"           className="hover:text-white/70 transition-colors">Open Workspace</Link></li>
              <li><Link href="/scenes"              className="hover:text-white/70 transition-colors">Scene Gallery</Link></li>
              <li><Link href="/notion-widget"       className="hover:text-white/70 transition-colors">Notion Widget</Link></li>
              <li><Link href="/website-for-studying" className="hover:text-white/70 transition-colors">Website for Studying</Link></li>
              <li><Link href="/blog"                className="hover:text-white/70 transition-colors">Blog</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} LofiSpace. Free for everyone, forever.
          </p>
          <div className="flex items-center gap-4">
            <SupportButton />
            <a
              href="https://twitter.com/lofispace_app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/50 transition-colors"
              aria-label="LofiSpace on Twitter / X"
            >
              𝕏
            </a>
            <a
              href="https://www.reddit.com/r/lofispace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/20 hover:text-white/50 transition-colors"
              aria-label="LofiSpace on Reddit"
            >
              Reddit
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
