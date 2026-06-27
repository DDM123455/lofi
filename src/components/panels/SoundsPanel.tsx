'use client'

import { AMBIENT_SOUNDS } from '@/lib/lofiStreams'
import type { AudioEngine } from '@/hooks/useAudioEngine'

interface SoundsPanelProps {
  audio: AudioEngine
  accent?: string
}

export function SoundsPanel({ audio, accent = '#a78bfa' }: SoundsPanelProps) {
  const { ambVols, toggleAmbient, setAmbVol, masterStarted, doMasterStart } = audio

  const handleToggle = (id: string) => {
    if (!masterStarted) doMasterStart()
    toggleAmbient(id)
  }

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
        Ambient mixer — mix multiple sounds
      </div>

      {AMBIENT_SOUNDS.map(s => {
        const on  = ambVols[s.id] !== undefined
        const vol = ambVols[s.id] ?? 0.5

        return (
          <div key={s.id} style={{
            borderRadius: 10, padding: '10px 12px',
            background: on ? `${accent}10` : 'rgba(255,255,255,0.03)',
            border: `1px solid ${on ? accent + '30' : 'rgba(255,255,255,0.05)'}`,
            transition: 'all .2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Icon toggle button */}
              <button
                onClick={() => handleToggle(s.id)}
                style={{
                  width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: on ? accent : 'rgba(255,255,255,0.06)',
                  fontSize: 16, transition: 'all .2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: on ? `0 0 12px ${accent}40` : 'none',
                  filter: on ? 'none' : 'grayscale(0.6)',
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </button>

              <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: on ? '#e0e0f0' : '#4a4c60' }}>
                {s.label}
              </span>

              {/* Toggle switch */}
              <button
                onClick={() => handleToggle(s.id)}
                style={{
                  width: 38, height: 22, padding: 2, border: 'none', borderRadius: 999, cursor: 'pointer',
                  background: on ? accent : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: on ? 'flex-end' : 'flex-start',
                  transition: 'all .2s', flexShrink: 0,
                }}
              >
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
              </button>
            </div>

            {/* Volume slider */}
            {on && (
              <div style={{ marginTop: 8, paddingLeft: 46 }}>
                <input
                  type="range" min="0" max="1" step="0.01" value={vol}
                  onChange={e => setAmbVol(s.id, Number(e.target.value))}
                  style={{ width: '100%', accentColor: accent, cursor: 'pointer', height: 4 }}
                />
              </div>
            )}
          </div>
        )
      })}

      {Object.keys(ambVols).length === 0 && (
        <p style={{ fontSize: 11, color: '#4a4c60', textAlign: 'center', padding: '12px 0', lineHeight: 1.6 }}>
          Toggle sounds above to mix your ambient atmosphere.
        </p>
      )}
    </div>
  )
}
