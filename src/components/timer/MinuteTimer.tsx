'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ALARM_SOUNDS, previewAlarm, scheduleAlarm, type AlarmSound, type ScheduledAlarm } from './alarm'
import { LOFI_STREAMS } from '@/lib/lofiStreams'
import type { SynthNode } from '@/lib/ambientSynth'

const PREFS_KEY = 'lofispace-timer-prefs'
interface Prefs { sound: AlarmSound; volume: number; notify: boolean }
const DEFAULT_PREFS: Prefs = { sound: 'bell', volume: 0.7, notify: false }

function loadPrefs(): Prefs {
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}')
    return {
      sound: ALARM_SOUNDS.some(s => s.id === p.sound) ? p.sound : DEFAULT_PREFS.sound,
      volume: typeof p.volume === 'number' && p.volume >= 0 && p.volume <= 1 ? p.volume : DEFAULT_PREFS.volume,
      notify: p.notify === true,
    }
  } catch { return DEFAULT_PREFS }
}
function savePrefs(p: Prefs) { try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)) } catch { /* storage blocked */ } }

const fmt = (secs: number) => {
  const s = Math.max(0, secs)
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60
  const mm = String(m).padStart(2, '0'), ss = String(r).padStart(2, '0')
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

type Ambient = 'rain' | 'cafe' | 'fire'
const AMBIENTS: { id: Ambient; label: string; icon: string }[] = [
  { id: 'rain', label: 'Rain', icon: '🌧️' },
  { id: 'cafe', label: 'Café', icon: '☕' },
  { id: 'fire', label: 'Fireplace', icon: '🔥' },
]

/**
 * The interactive countdown for /N-minute-timer pages. Server-rendered with N:00 and a Start
 * button (so the HTML is complete without JS and nothing shifts on hydration); all timing is
 * wall-clock based (end timestamp), never accumulated from setInterval ticks.
 */
export function MinuteTimer({ minutes }: { minutes: number }) {
  const [duration, setDuration] = useState(minutes * 60)       // seconds the timer is set to
  const [remaining, setRemaining] = useState(minutes * 60)     // seconds left (shown)
  const [endsAt, setEndsAt] = useState<number | null>(null)    // epoch ms while running
  const [ringing, setRinging] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS)
  const [fs, setFs] = useState<'off' | 'native' | 'css'>('off')
  const [ambient, setAmbient] = useState<Ambient[]>([])
  const [ambVol, setAmbVol] = useState(0.5)
  const [lofi, setLofi] = useState(false)

  const running = endsAt != null
  const started = running || remaining !== duration || ringing

  const ctxRef = useRef<AudioContext | null>(null)
  const alarmRef = useRef<ScheduledAlarm | null>(null)
  const ambRef = useRef<Partial<Record<Ambient, SynthNode>>>({})
  const ambBus = useRef<GainNode | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const prefsRef = useRef(prefs)
  const ringingRef = useRef(false)
  const rangRef = useRef(false)        // the scheduled alarm has actually started sounding
  const baseTitle = useRef('')

  useEffect(() => { prefsRef.current = prefs }, [prefs])
  useEffect(() => {
    baseTitle.current = document.title
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read storage after hydration on purpose
    setPrefs(loadPrefs())
  }, [])

  const audio = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      ctxRef.current = new AC()
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume().catch(() => {})
    return ctx
  }, [])

  const notify = useCallback(() => {
    if (!prefsRef.current.notify || typeof Notification === 'undefined' || Notification.permission !== 'granted') return
    try { new Notification(`⏰ Time's up`, { body: `Your ${minutes} minute timer has finished.`, tag: 'lofispace-timer', icon: '/logo-192.png' }) } catch { /* some mobile browsers only allow SW notifications */ }
  }, [minutes])

  const finish = useCallback(() => {
    if (ringingRef.current) return
    ringingRef.current = true
    setEndsAt(null)
    setRemaining(0)
    setRinging(true)
    // Whichever fires first wins: the audio-clock marker or the wall-clock ticker. If the
    // ticker got here first (audio clock lagging, device asleep, context suspended), replace
    // the pending alarm with one that sounds right now.
    const ctx = ctxRef.current
    if (ctx && !rangRef.current) {
      if (ctx.state !== 'running') ctx.resume().catch(() => {})
      alarmRef.current?.stop()
      alarmRef.current = scheduleAlarm(ctx, prefsRef.current.sound, prefsRef.current.volume, ctx.currentTime)
      rangRef.current = true
    }
    notify()
  }, [notify])

  const cancelAlarm = () => { alarmRef.current?.stop(); alarmRef.current = null }

  /** (Re)schedule the alarm for `secsFromNow`. */
  const arm = useCallback((secsFromNow: number) => {
    alarmRef.current?.stop()
    const ctx = audio()
    rangRef.current = false
    alarmRef.current = scheduleAlarm(ctx, prefsRef.current.sound, prefsRef.current.volume, ctx.currentTime + secsFromNow, () => { rangRef.current = true; finish() })
  }, [audio, finish])

  // Background-safe wake-up: a tiny worker posts 'done' at the end time (see /timer-worker.js).
  const workerRef = useRef<Worker | null>(null)
  const finishRef = useRef(finish)
  useEffect(() => { finishRef.current = finish }, [finish])
  useEffect(() => {
    if (endsAt == null) { workerRef.current?.postMessage({}); return }
    if (!workerRef.current && typeof Worker !== 'undefined') {
      try {
        workerRef.current = new Worker('/timer-worker.js')
        workerRef.current.onmessage = () => finishRef.current()
      } catch { /* the ticker below still ends the timer */ }
    }
    workerRef.current?.postMessage({ endsAt })
  }, [endsAt])
  useEffect(() => () => workerRef.current?.terminate(), [])

  // Ticker: derives the remaining time from the end timestamp.
  useEffect(() => {
    if (endsAt == null) return
    const tick = () => {
      const left = Math.ceil((endsAt - Date.now()) / 1000)
      if (left <= 0) finish()
      else setRemaining(left)
    }
    tick()
    const id = setInterval(tick, 250)
    document.addEventListener('visibilitychange', tick)
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', tick) }
  }, [endsAt, finish])

  // Time left in the tab title.
  useEffect(() => {
    if (!baseTitle.current) return
    const name = `${minutes} Minute Timer`
    document.title = ringing ? `⏰ Time's up · ${name}` : started ? `${fmt(remaining)}${running ? '' : ' ⏸'} · ${name}` : baseTitle.current
  }, [remaining, running, ringing, started, minutes])
  useEffect(() => () => { if (baseTitle.current) document.title = baseTitle.current }, [])

  const start = useCallback(() => {
    if (ringingRef.current) return
    const secs = remaining > 0 ? remaining : duration
    arm(secs)
    setRemaining(secs)
    setEndsAt(Date.now() + secs * 1000)
  }, [remaining, duration, arm])

  const pause = useCallback(() => {
    if (endsAt == null) return
    cancelAlarm()
    setRemaining(Math.max(1, Math.ceil((endsAt - Date.now()) / 1000)))
    setEndsAt(null)
  }, [endsAt])

  const stopRinging = useCallback(() => {
    cancelAlarm()
    ringingRef.current = false
    setRinging(false)
    setRemaining(duration)
  }, [duration])

  const reset = useCallback(() => {
    cancelAlarm()
    ringingRef.current = false
    setRinging(false)
    setEndsAt(null)
    setRemaining(duration)
  }, [duration])

  const adjust = useCallback((deltaMin: number) => {
    const d = deltaMin * 60
    if (ringing) return
    const nextDuration = Math.min(600 * 60, Math.max(60, duration + d))
    setDuration(nextDuration)
    if (endsAt != null) {
      const left = Math.ceil((endsAt - Date.now()) / 1000)
      const nl = Math.max(1, left + d)
      setEndsAt(Date.now() + nl * 1000)
      setRemaining(nl)
      arm(nl)
    } else if (!started) {
      setRemaining(nextDuration)
    } else {
      setRemaining(r => Math.max(1, r + d))
    }
  }, [duration, endsAt, ringing, started, arm])

  const toggle = useCallback(() => {
    if (ringing) stopRinging()
    else if (running) pause()
    else start()
  }, [ringing, running, pause, start, stopRinging])

  // ── Fullscreen (native where supported, a fixed overlay on iPhone) ──
  const toggleFs = useCallback(() => {
    if (fs === 'native') { document.exitFullscreen?.().catch(() => {}); return }
    if (fs === 'css') { setFs('off'); return }
    const el = cardRef.current
    if (el?.requestFullscreen) el.requestFullscreen().then(() => setFs('native')).catch(() => setFs('css'))
    else setFs('css')
  }, [fs])
  useEffect(() => {
    const on = () => setFs(f => (document.fullscreenElement ? 'native' : f === 'native' ? 'off' : f))
    document.addEventListener('fullscreenchange', on)
    return () => document.removeEventListener('fullscreenchange', on)
  }, [])

  // ── Keyboard: Space start/pause, R reset, F fullscreen ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const el = e.target as HTMLElement | null
      const tag = el?.tagName
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || el?.isContentEditable) return
      if (e.code === 'Space') {
        if (tag === 'BUTTON' || tag === 'A') return // the focused control handles Space itself
        e.preventDefault(); toggle()
      } else if (e.key === 'r' || e.key === 'R') { e.preventDefault(); reset() }
      else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFs() }
      else if (e.key === 'Escape' && fs === 'css') setFs('off')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, reset, toggleFs, fs])

  // ── Prefs ──
  const updatePrefs = (p: Partial<Prefs>) => {
    const next = { ...prefs, ...p }
    setPrefs(next)
    savePrefs(next)
    if (p.volume != null) alarmRef.current?.setVolume(p.volume)
    if (p.sound && alarmRef.current && endsAt != null) arm(Math.max(0, (endsAt - Date.now()) / 1000))
  }
  const toggleNotify = async () => {
    if (prefs.notify) { updatePrefs({ notify: false }); return }
    if (typeof Notification === 'undefined') return
    const perm = Notification.permission === 'default' ? await Notification.requestPermission() : Notification.permission
    updatePrefs({ notify: perm === 'granted' })
  }

  // ── Ambient sounds (shared synth engine with the workspace, loaded on first use) ──
  const toggleAmbient = async (id: Ambient) => {
    const ctx = audio()
    const cur = ambRef.current[id]
    if (cur) {
      cur.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.15)
      setTimeout(() => cur.stop(), 600)
      delete ambRef.current[id]
      setAmbient(a => a.filter(x => x !== id))
      return
    }
    setAmbient(a => [...a, id])
    const { buildSynthGraph } = await import('@/lib/ambientSynth')
    if (!ambBus.current) { ambBus.current = ctx.createGain(); ambBus.current.gain.value = ambVol; ambBus.current.connect(ctx.destination) }
    const node = buildSynthGraph(ctx, id, ambBus.current)
    node.gain.gain.setTargetAtTime(1, ctx.currentTime, 0.4)
    ambRef.current[id] = node
  }
  const setAmbientVolume = (v: number) => {
    setAmbVol(v)
    if (ambBus.current && ctxRef.current) ambBus.current.gain.setTargetAtTime(v, ctxRef.current.currentTime, 0.05)
  }
  useEffect(() => () => {
    Object.values(ambRef.current).forEach(n => n?.stop())
    alarmRef.current?.stop()
    ctxRef.current?.close().catch(() => {})
  }, [])

  const big = fs !== 'off'
  const btn = 'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400'
  const chip = (on: boolean) => `${btn} gap-1.5 px-3.5 py-2 text-sm ${on ? 'bg-violet-500/25 text-violet-100 ring-1 ring-violet-400/60' : 'bg-white/[0.06] text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white'}`
  const workspaceHref = minutes <= 90 ? `/workspace?pw=${minutes}` : '/workspace'

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        ref={cardRef}
        className={`flex flex-col items-center justify-center bg-[#100e1c] text-white ${fs === 'css' ? 'fixed inset-0 z-50' : ''} ${big ? 'h-full w-full' : 'rounded-3xl border border-white/10 px-4 py-8 shadow-2xl shadow-black/40 sm:px-8'} ${ringing ? 'ring-2 ring-amber-300/70' : ''}`}
        data-timer-card
      >
        <div
          role="timer"
          aria-live="off"
          aria-label={`${fmt(remaining)} remaining`}
          className={`font-bold leading-none tracking-tight tabular-nums ${ringing ? 'text-amber-200 motion-safe:animate-pulse' : 'text-white'} ${big ? 'text-[min(26vw,48vh)]' : 'text-[clamp(4.5rem,22vw,9rem)]'}`}
          data-timer-display
        >
          {fmt(remaining)}
        </div>
        <p className={`mt-2 h-6 text-sm ${ringing ? 'text-amber-200' : 'text-white/45'}`} aria-live="polite">
          {ringing ? "Time's up!" : running ? `${fmtLabel(duration)} timer running` : started ? 'Paused' : `${fmtLabel(duration)} timer`}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => adjust(-1)} disabled={ringing || duration <= 60} className={`${btn} h-11 w-16 bg-white/[0.06] text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10 disabled:opacity-35`}>−1 min</button>
          <button
            type="button"
            onClick={toggle}
            data-timer-start
            className={`${btn} h-14 min-w-[9.5rem] px-8 text-lg shadow-lg ${ringing ? 'bg-amber-300 text-[#2a1a05] hover:bg-amber-200' : 'bg-violet-600 text-white shadow-violet-900/40 hover:bg-violet-500'}`}
          >
            {ringing ? 'Stop alarm' : running ? 'Pause' : started ? 'Resume' : 'Start'}
          </button>
          <button type="button" onClick={() => adjust(1)} disabled={ringing} className={`${btn} h-11 w-16 bg-white/[0.06] text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10 disabled:opacity-35`}>+1 min</button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button type="button" onClick={reset} className={`${btn} px-4 py-2 text-sm text-white/60 hover:text-white`} data-timer-reset>↺ Reset</button>
          <button type="button" onClick={toggleFs} className={`${btn} px-4 py-2 text-sm text-white/60 hover:text-white`} aria-pressed={big}>{big ? '⤡ Exit fullscreen' : '⤢ Fullscreen'}</button>
        </div>
        {!big && <p className="mt-3 hidden text-xs text-white/30 sm:block">Space start / pause · R reset · F fullscreen</p>}
      </div>

      {/* Settings: alarm + sounds. Fixed heights, so loading saved prefs never shifts the page. */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Alarm sound</p>
          <div className="flex items-center gap-2">
            <select
              aria-label="Alarm sound"
              value={prefs.sound}
              onChange={e => updatePrefs({ sound: e.target.value as AlarmSound })}
              className="h-9 flex-1 rounded-lg border border-white/10 bg-[#16132a] px-2 text-sm text-white"
            >
              {ALARM_SOUNDS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <button type="button" onClick={() => previewAlarm(audio(), prefs.sound, prefs.volume)} className={`${btn} h-9 px-3 text-sm bg-white/[0.06] text-white/80 ring-1 ring-white/10 hover:bg-white/10`}>▶ Test</button>
          </div>
          <label className="mt-3 flex items-center gap-3 text-sm text-white/60">
            <span className="w-14">Volume</span>
            <input type="range" min={0} max={1} step={0.05} value={prefs.volume} onChange={e => updatePrefs({ volume: Number(e.target.value) })} className="flex-1 accent-violet-500" aria-label="Alarm volume" />
          </label>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-white/60">
            <input type="checkbox" checked={prefs.notify} onChange={toggleNotify} className="accent-violet-500" />
            Notify me when time is up
          </label>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">Add lofi / rain sounds</p>
          <div className="flex flex-wrap gap-2">
            {AMBIENTS.map(a => (
              <button key={a.id} type="button" onClick={() => toggleAmbient(a.id)} aria-pressed={ambient.includes(a.id)} className={chip(ambient.includes(a.id))}>
                <span aria-hidden>{a.icon}</span>{a.label}
              </button>
            ))}
            <button type="button" onClick={() => setLofi(v => !v)} aria-pressed={lofi} className={chip(lofi)}>
              <span aria-hidden>🎧</span>Lofi music
            </button>
          </div>
          <label className="mt-3 flex items-center gap-3 text-sm text-white/60">
            <span className="w-14">Sounds</span>
            <input type="range" min={0} max={1} step={0.05} value={ambVol} onChange={e => setAmbientVolume(Number(e.target.value))} className="flex-1 accent-violet-500" aria-label="Ambient sound volume" />
          </label>
          <Link href={workspaceHref} className="mt-3 inline-block text-sm text-violet-300 hover:text-violet-200">
            Open full focus workspace →
          </Link>
        </div>
      </div>

      {lofi && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            title="Lofi music stream"
            src={`https://www.youtube-nocookie.com/embed/${LOFI_STREAMS[0].youtubeId}?autoplay=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            className="aspect-video w-full"
          />
        </div>
      )}
    </div>
  )
}

function fmtLabel(secs: number) {
  const m = Math.round(secs / 60)
  return `${m} minute`
}
