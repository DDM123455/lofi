'use client'

import { useGameStore, xpProgress } from '@/lib/gameStore'

interface GameHUDProps {
  onSettings?: () => void
  accent?: string
}

export function GameHUD({ onSettings, accent = '#a78bfa' }: GameHUDProps) {
  const { xp, level, coins, streak, bestStreak } = useGameStore()
  const prog = xpProgress(xp, level)

  return (
    <div style={{
      height: 52,
      background: 'rgba(10,11,20,0.92)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 16px',
      flexShrink: 0,
      zIndex: 50,
    }}>

      {/* Logo */}
      <div style={{ fontWeight: 700, fontSize: 14, color: accent, letterSpacing: '-0.3px', flexShrink: 0 }}>
        FocusLofi
      </div>

      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {/* Streak */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 16 }}>🔥</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: streak > 0 ? '#fb923c' : '#4a4c60', lineHeight: 1 }}>
            {streak}<span style={{ fontSize: 10, color: '#6b6e80', fontWeight: 400, marginLeft: 2 }}>d</span>
          </div>
          {bestStreak > 0 && (
            <div style={{ fontSize: 9, color: '#4a4c60', lineHeight: 1, marginTop: 1 }}>best {bestStreak}</div>
          )}
        </div>
      </div>

      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {/* Level + XP bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
        {/* Level badge */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 800, color: '#fff',
          boxShadow: `0 0 12px ${accent}50`,
          flexShrink: 0,
        }}>
          {level}
        </div>

        {/* XP bar */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#4a4c60', marginBottom: 3 }}>
            <span style={{ color: '#7a7c8e' }}>Lv.{level}</span>
            <span>{prog.current}/{prog.max} XP</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${prog.pct}%`,
              borderRadius: 3,
              background: `linear-gradient(90deg, ${accent}, ${accent}cc)`,
              transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)',
              boxShadow: `0 0 6px ${accent}80`,
            }} />
          </div>
        </div>
      </div>

      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

      {/* Coins */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 14 }}>🪙</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24' }}>{coins}</span>
      </div>

      {/* Settings */}
      {onSettings && (
        <button
          onClick={onSettings}
          style={{
            width: 32, height: 32, borderRadius: 9,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: '#6b6e80', cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          </svg>
        </button>
      )}
    </div>
  )
}
