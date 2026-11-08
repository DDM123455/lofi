'use client'

// Retention UI is only needed at a few moments (after a pomodoro, on a returning visit, from the
// More menu), so it — and its 12-language copy — loads in its own chunk on first use.
import dynamic from 'next/dynamic'

export const NudgeCard = dynamic(() => import('./Retention').then(m => m.NudgeCard), { ssr: false })
export const ReminderDialog = dynamic(() => import('./Retention').then(m => m.ReminderDialog), { ssr: false })
export const HomeRetention = dynamic(() => import('./Retention').then(m => m.HomeRetention), { ssr: false })
export const WelcomeBack = dynamic(() => import('./Retention').then(m => m.WelcomeBack), { ssr: false })
