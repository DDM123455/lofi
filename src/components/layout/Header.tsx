import Link from 'next/link'
import { Music2 } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0d0d14]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <Music2 className="h-5 w-5 text-violet-400" />
          <span>LofiSpace</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm text-white/60">
          <Link href="/workspace" className="hover:text-white transition-colors">
            Workspace
          </Link>
          <Link href="/scenes" className="hover:text-white transition-colors">
            Scenes
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link
            href="/workspace"
            className="rounded-full bg-violet-600 px-4 py-1.5 text-white hover:bg-violet-500 transition-colors"
          >
            Try Free
          </Link>
        </nav>
      </div>
    </header>
  )
}
