'use client'

import type { PomodoroGame } from '@/hooks/usePomodoroGame'

interface TimerPanelProps {
  pom: PomodoroGame
  accent?: string
}

const WORK_PRESETS  = [15, 25, 45, 60]
const BREAK_PRESETS = [5, 10, 15]

export function TimerPanel({ pom, accent = '#a78bfa' }: TimerPanelProps) {
  const circ = 2 * Math.PI * 52
  const isWork = pom.phase === 'work'
  const phaseColor = isWork ? accent : '#4ade80'

  return (
    <div style={{ padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Phase toggle */}
      <div style={{ display: 'flex', gap: 6, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4 }}>
        <button
          onClick={() => pom.phase !== 'work' && pom.skip()}
          style={{
            flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, transition: 'all .15s',
            background: isWork ? accent : 'transparent',
            color: isWork ? '#fff' : '#6b6e80',
          }}
        >🎯 Focus</button>
        <button
          onClick={() => pom.phase !== 'break' && pom.skip()}
          style={{
            flex: 1, padding: '7px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, transition: 'all .15s',
            background: !isWork ? '#4ade80' : 'transparent',
            color: !isWork ? '#000' : '#6b6e80',
          }}
        >☕ Break</button>
      </div>

      {/* Circular progress timer */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 130, height: 130 }}>
          <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="65" cy="65" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
            <circle
              cx="65" cy="65" r="52" fill="none"
              stroke={phaseColor} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pom.progress)}
              style={{ transition: 'stroke-dashoffset 1s linear', filter: `drop-shadow(0 0 6px ${phaseColor}80)` }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              fontSize: 34, fontWeight: 700, fontFamily: 'monospace',
              color: '#fff', letterSpacing: '-1px', lineHeight: 1,
            }}>
              {pom.mm}:{pom.ss}
            </div>
            <div style={{ fontSize: 10, color: '#4a4c60', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {isWork ? 'Focus' : 'Break'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={pom.status === 'running' ? pom.pause : pom.start}
          style={{
            flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: pom.status === 'running' ? 'rgba(255,255,255,0.1)' : phaseColor,
            color: pom.status === 'running' ? '#fff' : isWork ? '#fff' : '#000',
            fontSize: 13, fontWeight: 700,
            boxShadow: pom.status === 'idle' ? `0 4px 16px ${phaseColor}40` : 'none',
            transition: 'all .2s',
          }}
        >
          {pom.status === 'running' ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={pom.reset}
          style={{
            width: 42, borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)', color: '#6b6e80', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>
          </svg>
        </button>
      </div>

      {/* Work presets */}
      <div>
        <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Focus duration
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {WORK_PRESETS.map(m => (
            <button key={m} onClick={() => pom.setWorkMins(m)} style={{
              flex: 1, padding: '6px 0', borderRadius: 8, cursor: 'pointer',
              fontSize: 11, fontWeight: 600, transition: 'all .15s',
              background: pom.workMins === m ? `${accent}30` : 'rgba(255,255,255,0.04)',
              color: pom.workMins === m ? accent : '#4a4c60',
              border: `1px solid ${pom.workMins === m ? accent + '50' : 'transparent'}`,
            }}>{m}m</button>
          ))}
        </div>
      </div>

      {/* Break presets */}
      <div>
        <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
          Break duration
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {BREAK_PRESETS.map(m => (
            <button key={m} onClick={() => pom.setBreakMins(m)} style={{
              flex: 1, padding: '6px 0', borderRadius: 8, cursor: 'pointer',
              fontSize: 11, fontWeight: 600, transition: 'all .15s',
              background: pom.breakMins === m ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.04)',
              color: pom.breakMins === m ? '#4ade80' : '#4a4c60',
              border: `1px solid ${pom.breakMins === m ? '#4ade8050' : 'transparent'}`,
            }}>{m}m</button>
          ))}
        </div>
      </div>
    </div>
  )
}
