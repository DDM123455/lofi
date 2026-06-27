'use client'

import { useState } from 'react'
import { TimerPanel }        from '@/components/panels/TimerPanel'
import { MusicPanel }        from '@/components/panels/MusicPanel'
import { SoundsPanel }       from '@/components/panels/SoundsPanel'
import { TasksPanel }        from '@/components/panels/TasksPanel'
import { StatsPanel }        from '@/components/panels/StatsPanel'
import { RoomPanel }         from '@/components/panels/RoomPanel'
import { AchievementsPanel } from '@/components/panels/AchievementsPanel'
import type { AudioEngine }  from '@/hooks/useAudioEngine'
import type { PomodoroGame } from '@/hooks/usePomodoroGame'

type PanelId = 'timer' | 'music' | 'sounds' | 'tasks' | 'stats' | 'room' | 'achievements'

interface DockItem {
  id: PanelId
  icon: React.ReactNode
  label: string
}

const ITEMS: DockItem[] = [
  { id: 'timer', label: 'Timer', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  )},
  { id: 'music', label: 'Music', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>
  )},
  { id: 'sounds', label: 'Sounds', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 13c1.5 0 1.5-4 3-4s1.5 8 3 8 1.5-10 3-10 1.5 6 3 6 1.5-3 3-3"/>
    </svg>
  )},
  { id: 'tasks', label: 'Tasks', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  )},
  { id: 'stats', label: 'Stats', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
    </svg>
  )},
  { id: 'room', label: 'Room', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )},
  { id: 'achievements', label: 'Awards', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  )},
]

interface DockProps {
  audio: AudioEngine
  pom: PomodoroGame
  accent?: string
}

export function Dock({ audio, pom, accent = '#a78bfa' }: DockProps) {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)

  const toggle = (id: PanelId) => setActivePanel(p => p === id ? null : id)

  const PANEL_TITLES: Record<PanelId, string> = {
    timer: '⏱️ Focus Timer', music: '🎵 Lofi Music', sounds: '🎚️ Ambient Sounds',
    tasks: '📝 Tasks', stats: '📊 Stats', room: '🏠 Room', achievements: '🏆 Achievements',
  }

  return (
    <>
      {/* Panel drawer */}
      <div style={{
        position: 'absolute', bottom: 64, left: 0, right: 0,
        height: activePanel ? 'clamp(280px, 45vh, 440px)' : 0,
        overflow: 'hidden',
        transition: 'height 0.35s cubic-bezier(0.32,0.72,0,1)',
        zIndex: 40,
        background: 'rgba(10,11,22,0.97)',
        backdropFilter: 'blur(24px)',
        borderTop: activePanel ? '1px solid rgba(255,255,255,0.07)' : 'none',
      }}>
        {activePanel && (
          <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {/* Panel header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 20px 0',
              position: 'sticky', top: 0,
              background: 'rgba(10,11,22,0.97)',
              backdropFilter: 'blur(12px)',
              zIndex: 1,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: '0.02em' }}>
                {PANEL_TITLES[activePanel]}
              </span>
              <button
                onClick={() => setActivePanel(null)}
                style={{
                  background: 'none', border: 'none', color: '#4a4c60', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {activePanel === 'timer'        && <TimerPanel        pom={pom}    accent={accent} />}
            {activePanel === 'music'        && <MusicPanel        audio={audio} accent={accent} />}
            {activePanel === 'sounds'       && <SoundsPanel       audio={audio} accent={accent} />}
            {activePanel === 'tasks'        && <TasksPanel                      accent={accent} />}
            {activePanel === 'stats'        && <StatsPanel                      accent={accent} />}
            {activePanel === 'room'         && <RoomPanel                       accent={accent} />}
            {activePanel === 'achievements' && <AchievementsPanel               accent={accent} />}
          </div>
        )}
      </div>

      {/* Dock bar */}
      <div style={{
        height: 64,
        background: 'rgba(8,9,18,0.98)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(24px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 4, padding: '0 12px',
        flexShrink: 0, zIndex: 50, position: 'relative',
      }}>
        {ITEMS.map(item => {
          const isActive = activePanel === item.id

          // Special badge for timer when running
          const showBadge = item.id === 'timer' && pom.status === 'running'

          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              title={item.label}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, width: 52, height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
                background: isActive ? `${accent}18` : 'transparent',
                color: isActive ? accent : '#4a4c60',
                transition: 'all .18s ease',
                position: 'relative',
                transform: isActive ? 'translateY(-3px)' : 'none',
              }}
            >
              {item.icon}
              <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 400, letterSpacing: '0.03em', lineHeight: 1 }}>
                {item.label}
              </span>
              {/* Active indicator dot */}
              {isActive && (
                <div style={{
                  position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)',
                  width: 4, height: 4, borderRadius: '50%', background: accent,
                }} />
              )}
              {/* Running badge */}
              {showBadge && (
                <div style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 7, height: 7, borderRadius: '50%', background: '#4ade80',
                  animation: 'dock_pulse 1.5s ease-in-out infinite',
                }}>
                  <style>{`@keyframes dock_pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }`}</style>
                </div>
              )}
            </button>
          )
        })}

        {/* Mini timer display when panel closed */}
        {pom.status === 'running' && activePanel !== 'timer' && (
          <div style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: '5px 12px',
            border: `1px solid ${pom.phase === 'work' ? accent : '#4ade80'}30`,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: pom.phase === 'work' ? accent : '#4ade80', animation: 'dock_pulse 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#e0e0f0', fontFamily: 'monospace' }}>
              {pom.mm}:{pom.ss}
            </span>
          </div>
        )}
      </div>
    </>
  )
}
