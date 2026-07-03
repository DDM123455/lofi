'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  getTodayFocusSeconds,
  getTodayPomodoroCount,
  getCurrentStreak,
  getBestStreak,
  getWeeklyPomodoroStats,
  getHeatmapData,
  getTopTasksByFocusTime,
  getRecentSessions,
  hasAnyFocusHistory,
} from '@/lib/focusStats'

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return totalSeconds > 0 ? '<1m' : '0m'
}

function formatRelativeTime(ts: number): string {
  const diffMs = Date.now() - ts
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// Sequential single-hue ramp (violet, the app's accent) — light to dark by pomodoro count
function heatmapColor(count: number): string {
  if (count === 0) return 'rgba(255,255,255,0.05)'
  if (count <= 2) return 'rgba(167,139,250,0.28)'
  if (count <= 4) return 'rgba(167,139,250,0.48)'
  if (count <= 6) return 'rgba(167,139,250,0.7)'
  return 'rgba(167,139,250,0.95)'
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/4 p-5">
      <div className="text-xs font-medium uppercase tracking-wider text-white/35">{label}</div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
      {sub && <div className="mt-1 text-xs text-white/40">{sub}</div>}
    </div>
  )
}

export default function DashboardClient() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="h-40 animate-pulse rounded-2xl border border-white/8 bg-white/3" />
      </div>
    )
  }

  const hasHistory = hasAnyFocusHistory()

  if (!hasHistory) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mb-5 text-5xl">🌙</div>
        <h1 className="mb-4 text-3xl font-bold text-white">Your Focus Dashboard</h1>
        <p className="mx-auto mb-8 max-w-md text-white/50 leading-relaxed">
          No focus sessions yet. Complete your first Pomodoro and this page fills up with your
          streak, weekly progress and focus heatmap.
        </p>
        <Link
          href="/workspace?pom=1"
          className="inline-block rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
        >
          Start a Focus Session →
        </Link>
      </div>
    )
  }

  const todayFocusSeconds = getTodayFocusSeconds()
  const todayCount = getTodayPomodoroCount()
  const streak = getCurrentStreak()
  const best = getBestStreak()
  const weekly = getWeeklyPomodoroStats()
  const heatmap = getHeatmapData(90)
  const topTasks = getTopTasksByFocusTime(5)
  const recent = getRecentSessions(10)
  const weekMax = Math.max(1, ...weekly.map(d => d.count))

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">

      {/* Header */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Your Focus Dashboard</h1>
          <p className="mt-1 text-sm text-white/45">Streaks, focus time and session history — all stored on this device.</p>
        </div>
        <Link
          href="/workspace"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
        >
          Open Workspace →
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Today Focus" value={formatDuration(todayFocusSeconds)} />
        <StatCard label="Today Pomodoros" value={String(todayCount)} />
        <StatCard label="Current Streak" value={`${streak} 🔥`} sub={streak === 1 ? 'day' : 'days'} />
        <StatCard label="Best Streak" value={`${best} 🏆`} sub={best === 1 ? 'day' : 'days'} />
      </div>

      {/* Weekly progress */}
      <section className="mb-10 rounded-2xl border border-white/8 bg-white/3 p-6">
        <h2 className="mb-5 text-lg font-bold text-white">Weekly Progress</h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {weekly.map(day => (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-2" title={`${day.count} pomodoro${day.count === 1 ? '' : 's'} · ${formatDuration(day.focusSeconds)}`}>
              <div className="flex h-24 w-full items-end">
                <div
                  className="w-full rounded-t-md bg-violet-500/70 transition-all"
                  style={{ height: `${Math.max(4, (day.count / weekMax) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] text-white/35">{day.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Heatmap */}
      <section className="mb-10 rounded-2xl border border-white/8 bg-white/3 p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Last 90 Days</h2>
          <div className="flex items-center gap-1.5 text-[11px] text-white/35">
            <span>Less</span>
            {[0, 1, 3, 5, 7].map(c => (
              <span key={c} className="h-2.5 w-2.5 rounded-sm" style={{ background: heatmapColor(c) }} />
            ))}
            <span>More</span>
          </div>
        </div>
        <div
          className="grid gap-[3px] overflow-x-auto pb-1"
          style={{ gridAutoFlow: 'column', gridTemplateRows: 'repeat(7, 12px)' }}
        >
          {heatmap.map(day => (
            <div
              key={day.date}
              title={`${day.date}: ${day.count} pomodoro${day.count === 1 ? '' : 's'} · ${formatDuration(day.focusSeconds)}`}
              className="h-3 w-3 rounded-[2px]"
              style={{ background: heatmapColor(day.count) }}
            />
          ))}
        </div>
      </section>

      <div className="mb-10 grid gap-6 sm:grid-cols-2">
        {/* Top tasks */}
        <section className="rounded-2xl border border-white/8 bg-white/3 p-6">
          <h2 className="mb-5 text-lg font-bold text-white">Top Tasks</h2>
          {topTasks.length === 0 ? (
            <p className="text-sm text-white/35">Link a task to your active Pomodoro to see it ranked here.</p>
          ) : (
            <ul className="space-y-3">
              {topTasks.map(t => (
                <li key={t.taskId} className="flex items-center justify-between gap-3 rounded-lg border border-white/6 bg-white/3 px-3 py-2.5">
                  <span className="truncate text-sm text-white/80">{t.title}</span>
                  <span className="shrink-0 text-xs text-white/40">{t.pomodoros}🍅 · {formatDuration(t.focusSeconds)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent sessions */}
        <section className="rounded-2xl border border-white/8 bg-white/3 p-6">
          <h2 className="mb-5 text-lg font-bold text-white">Recent Sessions</h2>
          <ul className="space-y-3">
            {recent.map(s => (
              <li key={s.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/6 bg-white/3 px-3 py-2.5">
                <span className="truncate text-sm text-white/80">{s.taskTitle ?? 'Focus session'}</span>
                <span className="shrink-0 text-xs text-white/40">{formatDuration(s.durationSeconds)} · {formatRelativeTime(s.startedAt)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* CTA */}
      <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-900/30 to-violet-800/10 p-10 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">Keep the streak alive</h2>
        <p className="mb-6 text-white/50">Jump back into your workspace and log another focus session.</p>
        <Link href="/workspace?pom=1" className="inline-block rounded-full bg-violet-600 px-10 py-3.5 font-semibold text-white hover:bg-violet-500 transition-all hover:scale-105">
          Start a Pomodoro →
        </Link>
      </section>
    </div>
  )
}
