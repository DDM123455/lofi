'use client'

import { useGameStore, DECORATION_DEFS, type RoomTheme } from '@/lib/gameStore'

interface RoomPanelProps {
  accent?: string
}

const ROOM_THEMES: { id: RoomTheme; label: string; emoji: string; desc: string }[] = [
  { id: 'rainy-cafe',      label: 'Rainy Café',      emoji: '☕🌧️', desc: 'Warm café vibes with rain outside' },
  { id: 'programmer-setup', label: 'Programmer Setup', emoji: '💻🖥️', desc: 'Dark desk with RGB lighting'         },
]

export function RoomPanel({ accent = '#a78bfa' }: RoomPanelProps) {
  const { roomTheme, setRoomTheme, unlockedDecorations, activeDecorations, toggleDecoration, totalPomodoros } = useGameStore()

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Room themes */}
      <div>
        <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Room Theme</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ROOM_THEMES.map(t => {
            const active = roomTheme === t.id
            return (
              <button key={t.id} onClick={() => setRoomTheme(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 12, border: `1px solid ${active ? accent + '50' : 'transparent'}`, cursor: 'pointer',
                background: active ? `${accent}18` : 'rgba(255,255,255,0.04)',
                textAlign: 'left', transition: 'all .15s',
              }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{t.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: active ? '#fff' : '#8a8ca0' }}>{t.label}</div>
                  <div style={{ fontSize: 10, color: '#4a4c60', marginTop: 2 }}>{t.desc}</div>
                </div>
                {active && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Decorations */}
      <div>
        <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
          Desk Decorations
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {DECORATION_DEFS.map(dec => {
            const unlocked = unlockedDecorations.includes(dec.id)
            const active   = activeDecorations.includes(dec.id)
            const progress = Math.min(100, (totalPomodoros / dec.unlockAt) * 100)

            return (
              <div key={dec.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 12,
                background: active ? `${accent}10` : unlocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${active ? accent + '40' : 'rgba(255,255,255,0.06)'}`,
                opacity: unlocked ? 1 : 0.6,
                transition: 'all .15s',
              }}>
                <span style={{ fontSize: 22, flexShrink: 0, filter: unlocked ? 'none' : 'grayscale(1)' }}>
                  {dec.emoji}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: unlocked ? '#c8cae0' : '#4a4c60' }}>
                      {dec.label}
                    </span>
                    {unlocked && (
                      <span style={{ fontSize: 9, color: '#4ade80', background: 'rgba(74,222,128,0.15)', padding: '1px 6px', borderRadius: 4 }}>
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  {unlocked ? (
                    <div style={{ fontSize: 10, color: '#4a4c60', marginTop: 2 }}>
                      {active ? 'Active in room' : 'Click to add to room'}
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 10, color: '#4a4c60', marginTop: 2 }}>
                        {dec.desc} — {totalPomodoros}/{dec.unlockAt} sessions
                      </div>
                      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${progress}%`,
                          background: accent, borderRadius: 2, transition: 'width 0.4s ease',
                        }} />
                      </div>
                    </div>
                  )}
                </div>

                {unlocked && (
                  <button
                    onClick={() => toggleDecoration(dec.id)}
                    style={{
                      width: 36, height: 20, padding: 2, border: 'none', borderRadius: 999, cursor: 'pointer',
                      background: active ? accent : 'rgba(255,255,255,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: active ? 'flex-end' : 'flex-start',
                      transition: 'all .2s', flexShrink: 0,
                    }}
                  >
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff' }} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
