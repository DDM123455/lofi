import type { Metadata } from 'next'
import { JsonLd, WebsiteJsonLd, FaqJsonLd } from '@/components/seo/JsonLd'
import { HomeContent } from './HomeContent'

export const metadata: Metadata = {
  title: 'LofiSpace — Free Online Study Room & Focus Workspace',
  description:
    'Free online study room with lofi music, ambient sounds mixer, Pomodoro timer, to-do list, XP system and animated backgrounds. No sign-up. Start studying now.',
  keywords: [
    'online study room', 'virtual study room', 'focus workspace', 'lofi music',
    'ambient sounds', 'pomodoro timer online', 'anime study room', 'productivity workspace',
    'study with me', 'deep work room',
  ],
  openGraph: {
    title: 'LofiSpace — Free Online Study Room',
    description: 'Lofi music, ambient sounds, Pomodoro timer & XP system. Study smarter for free.',
    type: 'website',
    url: 'https://focusworkspace.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LofiSpace — Free Online Study Room',
    description: 'Lofi music, ambient sounds, Pomodoro timer & XP system. Study smarter for free.',
  },
  alternates: { canonical: 'https://focusworkspace.app' },
}

const FAQ_EN = [
  { q: 'Is LofiSpace free?', a: 'Yes, completely free. No account, no subscription, no hidden costs. Open the workspace and start immediately.' },
  { q: 'Can I embed the workspace in Notion?', a: 'Yes. Customise your workspace, copy the URL, and paste it into a Notion /embed block. Your exact settings — music, sounds, background — are encoded in the URL.' },
  { q: 'What devices does it work on?', a: 'LofiSpace works on desktop, tablet and mobile browsers. All widgets are touch-friendly and the layout adapts to screen size.' },
  { q: 'How does the XP system work?', a: 'You earn XP by completing Pomodoro sessions (25 XP each). XP fills your level bar — reach the threshold to level up. Achievements unlock for milestones like streaks and session counts.' },
  { q: 'Can I share my workspace settings with a friend?', a: 'Yes. The workspace URL encodes all your settings. Copy the link from the address bar and anyone can open your exact configuration.' },
  { q: 'What is the best sound combination for studying?', a: 'A classic: Lofi music at 60% volume + Rain at 40% + Café murmur at 25%. Experiment in the ambient sound mixer to find your ideal mix.' },
]

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <JsonLd
        type="SoftwareApplication"
        name="LofiSpace"
        description="Free online study room and focus workspace with lofi music, ambient sounds, Pomodoro timer and XP system."
        url="https://focusworkspace.app"
        keywords={['online study room', 'focus workspace', 'lofi music', 'pomodoro timer', 'ambient sounds']}
      />
      <FaqJsonLd items={FAQ_EN} />
      <HomeContent />
    </>
  )
}
