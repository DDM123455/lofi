import { Suspense } from 'react'
import type { Metadata } from 'next'
import { EmbedClient } from '@/app/embed/EmbedClient'

export const metadata: Metadata = {
  title: 'Focus Workspace — Lofi Music, Pomodoro & Ambient Sounds',
  description:
    'Your all-in-one online focus workspace. Lofi music, ambient sounds mixer, Pomodoro timer, to-do list, XP system and animated backgrounds — free forever.',
  keywords: [
    'focus workspace', 'online study room', 'lofi music player', 'pomodoro timer online',
    'ambient sounds', 'study with me', 'productivity workspace',
  ],
  openGraph: {
    title: 'LofiSpace — Free Online Focus Workspace',
    description: 'Lofi music + ambient sounds + Pomodoro timer + to-do list. Study smarter.',
    type: 'website',
    url: 'https://www.focusworkspace.app/workspace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LofiSpace — Free Online Focus Workspace',
    description: 'Lofi music + ambient sounds + Pomodoro timer + to-do list. Study smarter.',
  },
  robots: { index: false }, // app itself; SEO value lives on landing pages
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div style={{ background: '#0d0d14', minHeight: '100vh' }} />}>
      <EmbedClient />
    </Suspense>
  )
}
