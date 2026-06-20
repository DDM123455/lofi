import Link from 'next/link'
import { Music2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a11] py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-2 text-sm text-white/40">
            <Music2 className="h-4 w-4" />
            <span>LofiSpace</span>
          </Link>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} LofiSpace. Free ambient sound widgets for everyone.
          </p>
          <nav className="flex gap-4 text-xs text-white/30">
            <Link href="/blog" className="hover:text-white/60">Blog</Link>
            <Link href="/workspace" className="hover:text-white/60">Create</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
