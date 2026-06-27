'use client'

import { useGameStore, ACHIEVEMENT_DEFS } from '@/lib/gameStore'

interface AchievementsPanelProps {
  accent?: string
}

export function AchievementsPanel({ accent = '#a78bfa' }: AchievementsPanelProps) {
  const { unlockedAchievements, totalPomodoros, streak, level, totalFocusMinutes } = useGameStore()

  const checkState = { totalPomodoros, streak, level, totalFocusMinutes }
  const unlocked = unlockedAchievements.length
  const total    = ACHIEVEMENT_DEFS.length

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Achievements</div>
        <span style={{ fontSize: 11, fontWeight: 700, color: accent }}>{unlocked}/{total}</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${(unlocked/total)*100}%`,
          background: `linear-gradient(90deg, ${accent}, #4ade80)`,
          borderRadius: 2, transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Achievement list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 300, overflowY: 'auto' }}>
        {ACHIEVEMENT_DEFS.map(a => {
          const done = unlockedAchievements.includes(a.id)
          return (
            <div key={a.id} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px',
              borderRadius: 12,
              background: done ? `${accent}12` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${done ? accent + '35' : 'rgba(255,255,255,0.05)'}`,
              opacity: done ? 1 : 0.55,
              transition: 'all .15s',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: done ? `${accent}20` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${done ? accent + '40' : 'transparent'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, filter: done ? 'none' : 'grayscale(1)',
              }}>
                {a.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: done ? '#e0e0f0' : '#4a4c60' }}>{a.title}</div>
                <div style={{ fontSize: 10, color: '#3a3c50', marginTop: 2 }}>{a.desc}</div>
              </div>
              {done && (
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: accent, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"><path d="M5 12l5 5L20 6"/></svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
