import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Focus Dashboard — Pomodoro Streaks, Heatmap & Stats',
  description:
    'Track your daily focus time, Pomodoro streak, weekly progress and a GitHub-style focus heatmap. 100% free, no sign-up, stored on your device.',
  keywords: [
    'pomodoro dashboard', 'focus dashboard', 'pomodoro streak tracker', 'focus heatmap',
    'pomodoro stats', 'study streak tracker', 'productivity dashboard', 'focus time tracker',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/dashboard',
    languages: {
      en: 'https://www.focusworkspace.app/dashboard',
      vi: 'https://www.focusworkspace.app/vi/bang-thong-ke-hoc-tap',
      'x-default': 'https://www.focusworkspace.app/dashboard',
    },
  },
  openGraph: {
    title: 'Focus Dashboard — Pomodoro Streaks, Heatmap & Stats | LofiSpace',
    description: 'Track your focus time, streak, weekly progress and a focus heatmap. Free, no sign-up.',
    url: 'https://www.focusworkspace.app/dashboard',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Dashboard — Pomodoro Streaks, Heatmap & Stats',
    description: 'Track your focus time, streak, weekly progress and a focus heatmap. Free, no sign-up.',
  },
}

const FAQ = [
  {
    q: 'Do I need an account to use the focus dashboard?',
    a: 'No. Your Pomodoro sessions, streak and stats are stored locally in your browser — no sign-up, no login, no server sync.',
  },
  {
    q: 'How is my streak calculated?',
    a: 'Your streak increases by one each calendar day you complete at least one Pomodoro session, and resets if you miss a full day.',
  },
  {
    q: 'What does the heatmap show?',
    a: 'A GitHub-style calendar of your last 90 days — darker squares mean more Pomodoros completed that day.',
  },
  {
    q: 'Will I lose my data if I clear my browser?',
    a: 'Yes — since everything is stored in localStorage on your device, clearing site data or switching browsers/devices resets your history.',
  },
]

export default function DashboardPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Dashboard', url: 'https://www.focusworkspace.app/dashboard' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Focus Dashboard"
        description="Pomodoro streak tracker with weekly progress chart and a 90-day focus heatmap."
        url="https://www.focusworkspace.app/dashboard"
        keywords={['pomodoro dashboard', 'focus heatmap', 'streak tracker']}
      />
      <FaqJsonLd items={FAQ} />
      <div className="mx-auto max-w-5xl px-4 pt-8">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Dashboard', url: 'https://www.focusworkspace.app/dashboard' },
        ]} />
      </div>
      <DashboardClient />
      <div className="mx-auto max-w-5xl px-4">
        <RelatedPages exclude="/dashboard" />
      </div>
    </>
  )
}
