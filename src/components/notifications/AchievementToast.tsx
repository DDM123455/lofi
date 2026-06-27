'use client'

import { useEffect, useState } from 'react'
import { ACHIEVEMENT_DEFS } from '@/lib/gameStore'

interface AchievementToastProps {
  achievementId: string
  onDismiss: () => void
  accent?: string
}

export function AchievementToast({ achievementId, onDismiss, accent = '#a78bfa' }: AchievementToastProps) {
  const [visible, setVisible] = useState(false)
  const def = ACHIEVEMENT_DEFS.find(a => a.id === achievementId)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100)
    const t2 = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 400) }, 4000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [achievementId, onDismiss])

  if (!def) return null

  return (
    <div
      onClick={() => { setVisible(false); setTimeout(onDismiss, 300) }}
      style={{
        position: 'fixed',
        top: 70,
        right: 16,
        zIndex: 200,
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'rgba(14,15,28,0.96)',
        border: `1px solid ${accent}50`,
        borderRadius: 16,
        padding: '12px 16px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${accent}20, 0 0 30px ${accent}20`,
        backdropFilter: 'blur(20px)',
        minWidth: 260,
        maxWidth: 320,
      }}>
        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: `${accent}20`,
          border: `1px solid ${accent}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          {def.emoji}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: 2 }}>
            Achievement Unlocked!
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f0ff' }}>{def.title}</div>
          <div style={{ fontSize: 11, color: '#6b6e80', marginTop: 2 }}>{def.desc}</div>
        </div>

        {/* Glow pulse */}
        <style>{`
          @keyframes ach_pulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.05)} }
        `}</style>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16,
          border: `1px solid ${accent}`,
          animation: 'ach_pulse 2s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

// ── Level Up Overlay ───────────────────────────────────────────────────

interface LevelUpOverlayProps {
  level: number
  onDismiss: () => void
  accent?: string
}

export function LevelUpOverlay({ level, onDismiss, accent = '#a78bfa' }: LevelUpOverlayProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100)
    const t2 = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 500) }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [level, onDismiss])

  return (
    <div
      onClick={() => { setVisible(false); setTimeout(onDismiss, 400) }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{
        textAlign: 'center',
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <style>{`
          @keyframes lu_sparkle { 0%,100%{transform:scale(0) rotate(0)} 50%{transform:scale(1) rotate(180deg)} }
          @keyframes lu_pulse   { 0%,100%{text-shadow:0 0 30px ${accent};} 50%{text-shadow:0 0 60px ${accent}, 0 0 120px ${accent};} }
          .lu-num { animation: lu_pulse 1.5s ease-in-out infinite; }
        `}</style>
        <div style={{ fontSize: 60, marginBottom: 8 }}>⭐</div>
        <div style={{ fontSize: 13, letterSpacing: '0.25em', textTransform: 'uppercase', color: accent, fontWeight: 700, marginBottom: 8 }}>
          Level Up!
        </div>
        <div className="lu-num" style={{ fontSize: 72, fontWeight: 900, color: '#fff', lineHeight: 1, fontFamily: 'system-ui' }}>
          {level}
        </div>
        <div style={{ fontSize: 14, color: '#a0a0c0', marginTop: 12 }}>
          Your companion is getting stronger!
        </div>
        <div style={{ fontSize: 11, color: '#4a4c60', marginTop: 20 }}>
          Tap to continue
        </div>
      </div>
    </div>
  )
}
