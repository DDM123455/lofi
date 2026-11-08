'use client'

import { useEffect, useRef, useState } from 'react'

/** "22:47" — refreshed a few times a minute; the clock is decoration, not a timer. */
export function useClock(): string {
  const [now, setNow] = useState('')
  useEffect(() => {
    const fmt = () => {
      const d = new Date()
      setNow(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`)
    }
    fmt()
    const id = setInterval(fmt, 15000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const upd = () => setReduced(mq.matches)
    upd()
    mq.addEventListener('change', upd)
    return () => mq.removeEventListener('change', upd)
  }, [])
  return reduced
}

/**
 * Seconds elapsed since mount, derived from wall-clock time so a throttled background tab
 * doesn't stretch a "2-minute" sequence into ten.
 */
export function useElapsed(tickMs = 250): number {
  const start = useRef(0)
  const [elapsed, setElapsed] = useState(0)
  useEffect(() => {
    start.current = Date.now()
    const id = setInterval(() => setElapsed((Date.now() - start.current) / 1000), tickMs)
    return () => clearInterval(id)
  }, [tickMs])
  return elapsed
}

/**
 * Moves keyboard/screen-reader focus to a screen's heading when that screen appears.
 * Pass `key` (e.g. the current wizard step) to re-focus whenever it changes.
 */
export function useFocusOnMount<T extends HTMLElement>(key?: unknown) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const t = setTimeout(() => ref.current?.focus({ preventScroll: true }), 60)
    return () => clearTimeout(t)
  }, [key])
  return ref
}

// ── Memory sky (local-only "good moments") ─────────────────────────────────
export interface SkyStar { id: string; text: string; at: string }
const SKY_KEY = 'comehome-sky'
/** A year of nightly moments; older stars fade out first. */
export const SKY_MAX = 365

export function newStar(text: string): SkyStar {
  return { id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, text: text.slice(0, 280), at: new Date().toISOString() }
}

export function loadSky(): SkyStar[] {
  try {
    const raw = JSON.parse(localStorage.getItem(SKY_KEY) || '[]')
    return Array.isArray(raw) ? raw.filter(s => s && typeof s.text === 'string' && typeof s.id === 'string') : []
  } catch { return [] }
}

export function saveSky(stars: SkyStar[]) {
  try { localStorage.setItem(SKY_KEY, JSON.stringify(stars.slice(-SKY_MAX))) } catch { /* storage full / blocked */ }
}

/** Stable pseudo-random position for a star, so the sky looks the same on every visit. */
export function starPos(id: string): { x: number; y: number; s: number } {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = Math.imul(h, 16777619) }
  const a = (h >>> 0) / 4294967295
  const b = ((Math.imul(h, 2654435761) >>> 0) / 4294967295)
  return { x: 8 + a * 84, y: 30 + b * 46, s: 0.8 + ((h >>> 3) % 5) / 10 }
}

/**
 * Keeps the screen awake while `active` (Screen Wake Lock API), so a phone doesn't lock and
 * suspend the audio mid wind-down. The browser drops the lock whenever the tab is hidden, so
 * it is re-requested when the page becomes visible again. No-op where unsupported.
 */
export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !('wakeLock' in navigator)) return
    let lock: WakeLockSentinel | null = null
    let live = true
    const request = async () => {
      if (document.visibilityState !== 'visible' || (lock && !lock.released)) return
      try {
        const l = await navigator.wakeLock.request('screen')
        if (live) lock = l; else l.release().catch(() => {})
      } catch { /* denied (battery saver, permissions policy) — the wind-down still works */ }
    }
    request()
    document.addEventListener('visibilitychange', request)
    return () => {
      live = false
      document.removeEventListener('visibilitychange', request)
      lock?.release().catch(() => {})
    }
  }, [active])
}

// ── Heavy-evening streak (local-only; a date list, never any text) ──────────
const HEAVY_KEY = 'comehome-heavy-days'
const HEAVY_HIDE_KEY = 'comehome-heavy-hidden'
/** Consecutive heavy evenings before the gentle "talk to someone" line appears. */
export const HEAVY_STREAK_MIN = 3

/** "2026-10-24" for the evening we're in — before 5am still counts as the night before. */
function eveningKey(offsetDays = 0): string {
  const d = new Date(Date.now() - 5 * 3600_000)
  d.setDate(d.getDate() - offsetDays)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function loadHeavyDays(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(HEAVY_KEY) || '[]')
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string') : []
  } catch { return [] }
}

/** Record tonight's mood (the latest answer of the evening wins). */
export function recordEveningMood(heavy: boolean) {
  const today = eveningKey()
  const recent = new Set(Array.from({ length: 14 }, (_, i) => eveningKey(i)))
  const days = loadHeavyDays().filter(d => d !== today && recent.has(d))
  if (heavy) days.push(today)
  try { localStorage.setItem(HEAVY_KEY, JSON.stringify(days)) } catch { /* ignore */ }
}

/** Heavy evenings in a row, ending tonight (0 if tonight wasn't heavy). */
export function heavyStreak(): number {
  const days = new Set(loadHeavyDays())
  let n = 0
  while (days.has(eveningKey(n))) n++
  return n
}

/** The support line was dismissed within the last week. */
export function heavyNoteHidden(): boolean {
  try {
    const at = parseInt(localStorage.getItem(HEAVY_HIDE_KEY) || '0', 10)
    return Date.now() - at < 7 * 86400_000
  } catch { return false }
}

export function hideHeavyNote() {
  try { localStorage.setItem(HEAVY_HIDE_KEY, String(Date.now())) } catch { /* ignore */ }
}
