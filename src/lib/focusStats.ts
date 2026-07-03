import { useGameStore, localDate, type FocusSession } from '@/lib/gameStore'

export function getTodayFocusSeconds(): number {
  const { dailyStats } = useGameStore.getState()
  return dailyStats[localDate()]?.focusSeconds ?? 0
}

export function getTodayPomodoroCount(): number {
  const { dailyStats } = useGameStore.getState()
  return dailyStats[localDate()]?.pomodoros ?? 0
}

export function getCurrentStreak(): number {
  const { streak, lastActiveDate } = useGameStore.getState()
  if (!lastActiveDate) return 0
  const today = localDate()
  const yesterday = localDate(new Date(Date.now() - 86400000))
  if (lastActiveDate !== today && lastActiveDate !== yesterday) return 0
  return streak
}

export function getBestStreak(): number {
  return useGameStore.getState().bestStreak
}

export function getWeeklyPomodoroStats(): { date: string; label: string; count: number; focusSeconds: number }[] {
  const { dailyStats } = useGameStore.getState()
  const days: { date: string; label: string; count: number; focusSeconds: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const date = localDate(d)
    const stat = dailyStats[date]
    days.push({
      date,
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      count: stat?.pomodoros ?? 0,
      focusSeconds: stat?.focusSeconds ?? 0,
    })
  }
  return days
}

export function getHeatmapData(days = 90): { date: string; count: number; focusSeconds: number }[] {
  const { dailyStats } = useGameStore.getState()
  const out: { date: string; count: number; focusSeconds: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const date = localDate(new Date(Date.now() - i * 86400000))
    const stat = dailyStats[date]
    out.push({ date, count: stat?.pomodoros ?? 0, focusSeconds: stat?.focusSeconds ?? 0 })
  }
  return out
}

export function getTopTasksByFocusTime(limit = 5): { taskId: string; title: string; pomodoros: number; focusSeconds: number }[] {
  const { sessions } = useGameStore.getState()
  const byTask = new Map<string, { taskId: string; title: string; pomodoros: number; focusSeconds: number }>()
  for (const s of sessions) {
    if (!s.taskId) continue
    const entry = byTask.get(s.taskId) ?? { taskId: s.taskId, title: s.taskTitle ?? 'Untitled task', pomodoros: 0, focusSeconds: 0 }
    entry.pomodoros += 1
    entry.focusSeconds += s.durationSeconds
    entry.title = s.taskTitle ?? entry.title
    byTask.set(s.taskId, entry)
  }
  return [...byTask.values()].sort((a, b) => b.focusSeconds - a.focusSeconds).slice(0, limit)
}

export function getRecentSessions(limit = 10): FocusSession[] {
  const { sessions } = useGameStore.getState()
  return sessions.slice(-limit).reverse()
}

export function hasAnyFocusHistory(): boolean {
  return useGameStore.getState().sessions.length > 0
}
