'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useGameStore } from '@/lib/gameStore'

export type PomodoroPhase = 'work' | 'break'
export type PomodoroStatus = 'idle' | 'running' | 'paused' | 'done'

export interface PomodoroGame {
  phase: PomodoroPhase
  status: PomodoroStatus
  secs: number
  workMins: number
  breakMins: number
  progress: number // 0-1
  mm: string
  ss: string
  start: () => void
  pause: () => void
  reset: () => void
  setWorkMins: (m: number) => void
  setBreakMins: (m: number) => void
  skip: () => void
}

export function usePomodoroGame(
  onStart?: () => void,
  onComplete?: (minutes: number) => void,
): PomodoroGame {
  const completePomodoro = useGameStore(s => s.completePomodoro)
  const setCompanionMood  = useGameStore(s => s.setCompanionMood)
  const setCompanionMessage = useGameStore(s => s.setCompanionMessage)

  const [workMins, setWorkMins]   = useState(25)
  const [breakMins, setBreakMins] = useState(5)
  const [phase, setPhase]         = useState<PomodoroPhase>('work')
  const [status, setStatus]       = useState<PomodoroStatus>('idle')
  const [secs, setSecs]           = useState(25 * 60)
  const phaseRef = useRef<PomodoroPhase>('work')
  const workRef  = useRef(25)
  const breakRef = useRef(5)

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { workRef.current = workMins }, [workMins])
  useEffect(() => { breakRef.current = breakMins }, [breakMins])

  useEffect(() => {
    if (status !== 'running') return
    const id = setInterval(() => {
      setSecs(s => {
        if (s <= 1) {
          clearInterval(id)
          const currentPhase = phaseRef.current
          if (currentPhase === 'work') {
            completePomodoro(workRef.current)
            onComplete?.(workRef.current)
          }
          // Switch phase
          const nextPhase: PomodoroPhase = currentPhase === 'work' ? 'break' : 'work'
          const nextSecs = nextPhase === 'work' ? workRef.current * 60 : breakRef.current * 60
          setPhase(nextPhase)
          setSecs(nextSecs)
          setStatus('idle')

          // Companion reaction
          if (currentPhase === 'work') {
            setCompanionMood('happy')
          } else {
            setCompanionMood('typing')
            setCompanionMessage('Back to work! Let\'s do this! 🎯')
            setTimeout(() => setCompanionMessage(null), 3000)
          }
          return nextSecs
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [status, completePomodoro, onComplete, setCompanionMood, setCompanionMessage])

  const start = useCallback(() => {
    setStatus('running')
    setCompanionMood('typing')
    setCompanionMessage('Let\'s focus! 🎯')
    setTimeout(() => setCompanionMessage(null), 3000)
    onStart?.()
  }, [setCompanionMood, setCompanionMessage, onStart])

  const pause = useCallback(() => {
    setStatus(s => s === 'running' ? 'paused' : 'running')
    setCompanionMood('idle')
  }, [setCompanionMood])

  const reset = useCallback(() => {
    setStatus('idle')
    setPhase('work')
    setSecs(workRef.current * 60)
    setCompanionMood('idle')
    setCompanionMessage(null)
  }, [setCompanionMood, setCompanionMessage])

  const skip = useCallback(() => {
    const nextPhase: PomodoroPhase = phase === 'work' ? 'break' : 'work'
    const nextSecs = nextPhase === 'work' ? workMins * 60 : breakMins * 60
    setPhase(nextPhase)
    setSecs(nextSecs)
    setStatus('idle')
  }, [phase, workMins, breakMins])

  const handleSetWorkMins = useCallback((m: number) => {
    setWorkMins(m)
    if (phase === 'work' && status === 'idle') setSecs(m * 60)
  }, [phase, status])

  const handleSetBreakMins = useCallback((m: number) => {
    setBreakMins(m)
    if (phase === 'break' && status === 'idle') setSecs(m * 60)
  }, [phase, status])

  const total = phase === 'work' ? workMins * 60 : breakMins * 60

  return {
    phase, status, secs, workMins, breakMins,
    progress: Math.max(0, Math.min(1, 1 - secs / total)),
    mm: String(Math.floor(secs / 60)).padStart(2, '0'),
    ss: String(secs % 60).padStart(2, '0'),
    start, pause, reset, skip,
    setWorkMins: handleSetWorkMins,
    setBreakMins: handleSetBreakMins,
  }
}
