'use client'

import { useGameStore, ACHIEVEMENT_DEFS } from '@/lib/gameStore'

interface StatsPanelProps {
  accent?: string
}

function Stat({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div style={{
      padding: '12px 14px', borderRadius: 12,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color ?? '#e0e0f0', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: '#4a4c60', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

export function StatsPanel({ accent = '#a78bfa' }: StatsPanelProps) {
  const { totalPomodoros, totalFocusMinutes, streak, bestStreak, level, friendship, unlockedAchievements } = useGameStore()

  const hours   = Math.floor(totalFocusMinutes / 60)
  const minutes = totalFocusMinutes % 60
  const focusStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`

  const recentAchs = ACHIEVEMENT_DEFS.filter(a => unlockedAchievements.includes(a.id)).slice(-3).reverse()

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Stat label="Sessions"    value={totalPomodoros}       sub="completed" color={accent} />
        <Stat label="Focus Time"  value={focusStr}              sub="total"     color="#4ade80" />
        <Stat label="Streak"      value={`${streak}d`}          sub={`best: ${bestStreak}d`} color="#fb923c" />
        <Stat label="Level"       value={level}                 sub="current"   color="#fbbf24" />
      </div>

      {/* Friendship */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          <span>Friendship with Coding Cat</span>
          <span style={{ color: '#f472b6' }}>{friendship}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${friendship}%`,
            background: 'linear-gradient(90deg, #f472b6, #fb923c)',
            borderRadius: 3, transition: 'width 0.6s ease',
            boxShadow: '0 0 8px rgba(244,114,182,0.4)',
          }} />
        </div>
      </div>

      {/* Recent achievements */}
      {recentAchs.length > 0 && (
        <div>
          <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Recent Achievements
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {recentAchs.map(a => (
              <div key={a.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 10,
                background: `${accent}10`, border: `1px solid ${accent}25`,
              }}>
                <span style={{ fontSize: 18 }}>{a.emoji}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#c8cae0' }}>{a.title}</div>
                  <div style={{ fontSize: 10, color: '#4a4c60' }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalPomodoros === 0 && (
        <p style={{ textAlign: 'center', color: '#2e3050', fontSize: 12, padding: '8px 0', lineHeight: 1.6 }}>
          Complete your first Pomodoro session to start tracking stats!
        </p>
      )}
    </div>
  )
}
