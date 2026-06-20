'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface PomodoroTimerProps {
  workMinutes?: number
  breakMinutes?: number
  accentColor?: string
}

type Phase = 'work' | 'break'

export function PomodoroTimer({
  workMinutes = 25,
  breakMinutes = 5,
  accentColor = '#a78bfa',
}: PomodoroTimerProps) {
  const [phase, setPhase] = useState<Phase>('work')
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)

  const totalSeconds = phase === 'work' ? workMinutes * 60 : breakMinutes * 60
  const progress = 1 - secondsLeft / totalSeconds
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const secs = String(secondsLeft % 60).padStart(2, '0')

  const switchPhase = useCallback(() => {
    const next: Phase = phase === 'work' ? 'break' : 'work'
    setPhase(next)
    setSecondsLeft(next === 'work' ? workMinutes * 60 : breakMinutes * 60)
    if (next === 'work') setSessions((s) => s + 1)
  }, [phase, workMinutes, breakMinutes])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { switchPhase(); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, switchPhase])

  // Reset when work/break durations change
  useEffect(() => {
    setSecondsLeft(workMinutes * 60)
    setPhase('work')
    setRunning(false)
  }, [workMinutes, breakMinutes])

  const circumference = 2 * Math.PI * 20

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {/* Circular progress */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeOpacity={0.1} strokeWidth="3" />
          <circle
            cx="24" cy="24" r="20"
            fill="none"
            stroke={accentColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <span className="text-sm font-mono font-semibold text-white">
          {mins}:{secs}
        </span>
      </div>

      {/* Phase label */}
      <span className="text-[10px] uppercase tracking-widest text-white/50">
        {phase === 'work' ? `Focus #${sessions + 1}` : 'Break'}
      </span>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className={cn(
            'rounded-full px-3 py-1 text-[11px] font-semibold transition-colors',
            running ? 'bg-white/10 text-white/60' : 'text-white'
          )}
          style={!running ? { backgroundColor: accentColor } : undefined}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => { setRunning(false); setSecondsLeft(workMinutes * 60); setPhase('work') }}
          className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/40 hover:text-white/70"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
