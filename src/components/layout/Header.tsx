'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LanguageToggle } from "./LanguageToggle";

const STUDY_ROOMS = [
  { href: "/online-study-room",  label: "Online Study Room" },
  { href: "/anime-study-room",   label: "Anime Study Room" },
  { href: "/coding-room",        label: "Coding Room" },
  { href: "/focus-room",         label: "Focus Room" },
  { href: "/deep-work-room",     label: "Deep Work Room" },
  { href: "/adhd-focus-room",    label: "ADHD Focus Room" },
  { href: "/virtual-study-room", label: "Virtual Study Room" },
];

const FOCUS_TOOLS = [
  { href: "/pomodoro-timer",       label: "Pomodoro Timer" },
  { href: "/lofi-music",           label: "Lofi Music" },
  { href: "/ambient-sounds",       label: "Ambient Sounds" },
  { href: "/rain-sounds",          label: "Rain Sounds" },
  { href: "/white-noise",          label: "White Noise" },
  { href: "/brown-noise",          label: "Brown Noise" },
  { href: "/focus-music",          label: "Focus Music" },
  { href: "/study-with-me",        label: "Study With Me" },
  { href: "/coffee-shop-sounds",   label: "Coffee Shop Sounds" },
  { href: "/study-music",          label: "Study Music" },
  { href: "/coding-music",         label: "Coding Music" },
  { href: "/thunderstorm-sounds",  label: "Thunderstorm Sounds" },
  { href: "/forest-sounds",        label: "Forest Sounds" },
  { href: "/fireplace-sounds",     label: "Fireplace Sounds" },
  { href: "/website-for-studying", label: "Website for Studying" },
  { href: "/lofi-pomodoro",        label: "Lofi Pomodoro" },
  { href: "/lofi-timer-for-studying", label: "Lofi Study Timer" },
  { href: "/ambient-focus-timer",  label: "Ambient Focus Timer" },
  { href: "/notion-pomodoro-widget", label: "Notion Pomodoro Widget" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change (click a link)
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = '' };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0d0d14]/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-white" onClick={() => setMobileOpen(false)}>
            <Image src="/logo.png" width={36} height={36} alt="LofiSpace" className="rounded-md" />
            <span>LofiSpace</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-5 text-sm text-white/60">
            {/* Study Rooms dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 hover:text-white transition-colors py-1">
                Study Rooms
                <svg className="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="pointer-events-none absolute left-0 top-full w-52 rounded-xl border border-white/10 bg-[#16131f] pt-2 pb-1 opacity-0 shadow-xl transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                {STUDY_ROOMS.map((r) => (
                  <Link key={r.href} href={r.href} className="block px-4 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sounds & Tools dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 hover:text-white transition-colors py-1">
                Sounds & Tools
                <svg className="h-3 w-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="pointer-events-none absolute left-0 top-full w-52 rounded-xl border border-white/10 bg-[#16131f] pt-2 pb-1 opacity-0 shadow-xl transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 max-h-80 overflow-y-auto">
                {FOCUS_TOOLS.map((r) => (
                  <Link key={r.href} href={r.href} className="block px-4 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                    {r.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/scenes" className="hover:text-white transition-colors">Scenes</Link>
            <Link href="/notion-widget" className="hover:text-white transition-colors">Notion Widget</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <LanguageToggle />
            <Link href="/workspace" className="rounded-full bg-violet-600 px-4 py-1.5 text-white hover:bg-violet-500 transition-colors">
              Open Workspace
            </Link>
          </nav>

          {/* Mobile: open workspace + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/workspace" className="rounded-full bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-500 transition-colors">
              Open →
            </Link>
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#0d0d14] overflow-y-auto sm:hidden">
          {/* Header bar inside overlay */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-semibold text-white" onClick={() => setMobileOpen(false)}>
              <Image src="/logo.png" width={28} height={28} alt="LofiSpace" className="rounded-md" />
              <span>LofiSpace</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/10"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 px-4 py-6 space-y-8">

            {/* Study Rooms */}
            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">Study Rooms</p>
              <div className="grid grid-cols-2 gap-2">
                {STUDY_ROOMS.map(r => (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* Sounds & Tools */}
            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">Sounds & Tools</p>
              <div className="grid grid-cols-2 gap-2">
                {FOCUS_TOOLS.map(r => (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* Other links */}
            <section>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">Explore</p>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/scenes',       label: '✨ Scene Gallery' },
                  { href: '/notion-widget', label: '📎 Notion Widget' },
                  { href: '/dashboard',    label: '📊 Focus Dashboard' },
                  { href: '/pomodoro-streak-tracker', label: '🔥 Streak Tracker' },
                  { href: '/blog',         label: '📝 Blog' },
                ].map(r => (
                  <Link
                    key={r.href}
                    href={r.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* Language toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30">Language:</span>
              <LanguageToggle />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="border-t border-white/5 p-4">
            <Link
              href="/workspace"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-full bg-violet-600 py-3 text-center font-semibold text-white hover:bg-violet-500 transition-colors"
            >
              Open Workspace →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
