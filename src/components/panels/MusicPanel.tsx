'use client'

import { LOFI_STREAMS } from '@/lib/lofiStreams'
import type { AudioEngine } from '@/hooks/useAudioEngine'

interface MusicPanelProps {
  audio: AudioEngine
  accent?: string
}

export function MusicPanel({ audio, accent = '#a78bfa' }: MusicPanelProps) {
  const { lofiId, lofiVol, lofiOn, ytStatus, setLofiId, setLofiVol, toggleLofi, masterStarted, doMasterStart } = audio

  const handleToggle = () => {
    if (!masterStarted) { doMasterStart(); return }
    toggleLofi()
  }

  const statusColor = ytStatus === 'ready' ? '#4ade80' : ytStatus === 'blocked' ? '#f97316' : ytStatus === 'loading' ? '#fbbf24' : '#2a2c40'

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Play control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={handleToggle}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: lofiOn ? accent : 'rgba(255,255,255,0.08)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: lofiOn ? `0 0 20px ${accent}50` : 'none',
            transition: 'all .2s',
          }}
        >
          {lofiOn
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#e0e0f0' }}>
            {LOFI_STREAMS.find(s => s.id === lofiId)?.label ?? 'Lofi Music'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
            <span style={{ fontSize: 10, color: '#4a4c60' }}>
              {ytStatus === 'ready' ? 'Playing' : ytStatus === 'loading' ? 'Connecting…' : ytStatus === 'blocked' ? 'Blocked by browser' : 'Stopped'}
            </span>
          </div>
        </div>
      </div>

      {/* Volume slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#4a4c60', marginBottom: 6 }}>
          <span>Volume</span><span>{Math.round(lofiVol * 100)}%</span>
        </div>
        <input
          type="range" min="0" max="1" step="0.01" value={lofiVol}
          onChange={e => setLofiVol(Number(e.target.value))}
          style={{ width: '100%', accentColor: accent, cursor: 'pointer' }}
        />
      </div>

      {/* Stream list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Streams</div>
        {LOFI_STREAMS.map(s => {
          const active = lofiId === s.id
          return (
            <button
              key={s.id}
              onClick={() => setLofiId(s.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                textAlign: 'left', transition: 'all .15s',
                background: active ? `${accent}18` : 'rgba(255,255,255,0.03)',
                borderLeft: `2px solid ${active ? accent : 'transparent'}`,
              }}
            >
              <span style={{ fontSize: 14 }}>🎵</span>
              <span style={{ flex: 1, fontSize: 12, fontWeight: active ? 600 : 400, color: active ? '#fff' : '#6b6e80' }}>
                {s.label}
              </span>
              {active && lofiOn && ytStatus === 'ready' && (
                <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                  {[3,5,4,7,5].map((h, i) => (
                    <div key={i} style={{ width: 2, height: h * 2, background: accent, borderRadius: 1, animation: `eqB ${0.4 + i*0.1}s ease-in-out infinite alternate` }} />
                  ))}
                  <style>{`@keyframes eqB { from{transform:scaleY(0.3)} to{transform:scaleY(1)} }`}</style>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {!masterStarted && (
        <p style={{ fontSize: 11, color: '#4a4c60', textAlign: 'center', lineHeight: 1.5 }}>
          Click ▶ to start audio (browser policy requires a tap first)
        </p>
      )}
    </div>
  )
}
