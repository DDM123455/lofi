'use client'

import { useEffect, useRef, useState } from 'react'
import { AMBIENT_SOUNDS } from '@/lib/lofiStreams'
import type { HomeCopy } from './copy'
import { useClock, useElapsed, useFocusOnMount } from './hooks'
import { NightRoom } from './NightRoom'
import { Neighbors } from './Neighbors'
import { AfterActions, StarField, type Exits } from './Release'

export interface HomeAudio {
  /** Ambient sound is currently audible. */
  soundOn: boolean
  /** Must be called from a user gesture (browser autoplay policy). */
  enableSound: () => void
  disableSound: () => void
  vols: Record<string, number>
  toggle: (id: string) => void
  setVol: (id: string, v: number) => void
  /** 0-100, scales every ambient layer. */
  master: number
  setMaster: (v: number) => void
  /** Crossfade to a suggested mix (plays only if sound is already on). */
  setMix: (mix: Record<string, number>) => void
}

function SmallClock({ moon = true }: { moon?: boolean }) {
  const now = useClock()
  return (
    <div className="ch-clock" aria-label={now}>
      {moon && <span aria-hidden>🌙</span>}
      <span>{now}</span>
    </div>
  )
}

// ── Rest ────────────────────────────────────────────────────────────────────
export function RestRoom({ c, audio }: { c: HomeCopy; audio: HomeAudio }) {
  const [lamp, setLamp] = useState(true)
  const [curtains, setCurtains] = useState(true)
  const [teaHot, setTeaHot] = useState(true)
  const rain = audio.vols.rain !== undefined
  const fire = audio.vols.fire !== undefined
  // Objects are optional toys. With sound on, the window/fireplace follow (and toggle) the
  // rain/fire layers; with sound off they're purely visual, so a stray click never starts
  // playback on its own.
  const [rainVis, setRainVis] = useState(true)
  const [fireVis, setFireVis] = useState(true)

  return (
    <div className="ch-screen ch-fill">
      <NightRoom
        lampOn={lamp} fireOn={audio.soundOn ? fire : fireVis} rain={audio.soundOn ? rain : rainVis} curtainsOpen={curtains}
        teaHot={teaHot} labels={c.rest_objects} label={c.room_label}
        onLamp={() => setLamp(v => !v)}
        onCurtain={() => setCurtains(v => !v)}
        onWindow={() => (audio.soundOn ? audio.toggle('rain') : setRainVis(v => !v))}
        onFire={() => (audio.soundOn ? audio.toggle('fire') : setFireVis(v => !v))}
        onTea={() => setTeaHot(v => !v)}
      />
      <SmallClock />
      <p className="ch-hint">{c.rest_hint}</p>
    </div>
  )
}

// ── Company ─────────────────────────────────────────────────────────────────
export function CompanyRoom({ c, audio, reduced }: { c: HomeCopy; audio: HomeAudio; reduced: boolean }) {
  return (
    <div className="ch-screen ch-fill">
      <Neighbors rain={audio.soundOn && audio.vols.rain !== undefined} lines={c.company_lines} label={c.company_label} reduced={reduced} />
      <SmallClock />
    </div>
  )
}

// ── Calm (2 minutes, breathing-paced) ───────────────────────────────────────
const CALM_SECS = 120
export function CalmBreath({ c, reduced, exits }: { c: HomeCopy; reduced: boolean; exits: Exits }) {
  const elapsed = useElapsed(200)
  const idx = Math.min(3, Math.floor(elapsed / 30))
  const inhale = elapsed % 10 < 4 // 4s in, 6s out — slow, never forced
  const h = useFocusOnMount<HTMLParagraphElement>()

  // After two minutes the breathing fades into the same "what next" exits as everything else.
  if (elapsed >= CALM_SECS) {
    return (
      <div className="ch-screen ch-center">
        <StarField count={30} />
        <AfterActions c={c} line={c.calm_lines[3]} exits={exits} />
      </div>
    )
  }

  return (
    <div className={`ch-screen ch-center ch-calm${reduced ? ' is-reduced' : ''}`}>
      <div className="ch-calm-curtain l" aria-hidden />
      <div className="ch-calm-curtain r" aria-hidden />
      <div className="ch-orb" aria-hidden />
      <svg className="ch-waves" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden>
        <path className="w1" d="M0 120 C240 80 480 160 720 120 C960 80 1200 160 1440 120 V220 H0 Z" />
        <path className="w2" d="M0 150 C260 120 520 190 780 150 C1040 110 1250 180 1440 150 V220 H0 Z" />
      </svg>
      <div className="ch-col" style={{ position: 'relative', zIndex: 2 }}>
        <p ref={h} tabIndex={-1} key={idx} className="ch-h2 ch-soft ch-line" aria-live="polite">{c.calm_lines[idx]}</p>
        <p className="ch-breath-label" aria-hidden>{inhale ? c.calm_in : c.calm_out}</p>
      </div>
      <div className="ch-progress" aria-hidden><span style={{ width: `${Math.min(100, (elapsed / CALM_SECS) * 100)}%` }} /></div>
    </div>
  )
}

// ── Quiet (reuses the workspace's synth engine through `audio`) ─────────────
const QUIET_IDS = ['rain', 'wind', 'fire', 'cafe', 'wave', 'city', 'forest'] as const
export function QuietMixer({ c, audio }: { c: HomeCopy; audio: HomeAudio }) {
  const h = useFocusOnMount<HTMLHeadingElement>()
  return (
    <div className="ch-screen ch-center">
      <SmallClock />
      <div className="ch-col ch-quiet">
        <h2 ref={h} tabIndex={-1} className="ch-h2">{c.quiet_title}</h2>
        <ul className="ch-mixer">
          {QUIET_IDS.map(id => {
            const meta = AMBIENT_SOUNDS.find(s => s.id === id)
            const on = audio.vols[id] !== undefined
            const vol = audio.vols[id] ?? 30
            const label = c.quiet_sounds[id]
            return (
              <li key={id} className={on ? 'is-on' : ''}>
                <button className="ch-snd" aria-pressed={on} onClick={() => audio.toggle(id)}>
                  <span aria-hidden>{id === 'city' ? '🌃' : meta?.icon}</span>
                  <span>{label}</span>
                </button>
                <input
                  type="range" min={0} max={100} value={vol} disabled={!on}
                  aria-label={`${label} ${c.quiet_volume}`}
                  onChange={e => audio.setVol(id, +e.target.value)}
                />
              </li>
            )
          })}
        </ul>
        <div className="ch-master">
          <label htmlFor="ch-master">{c.quiet_master}</label>
          <input id="ch-master" type="range" min={0} max={100} value={audio.master} onChange={e => audio.setMaster(+e.target.value)} />
        </div>
        {!audio.soundOn && (
          <button className="ch-btn ch-btn-main" onClick={audio.enableSound}>🔈 {c.sound_hint}</button>
        )}
      </div>
    </div>
  )
}

// ── Sleep (5-minute wind-down) ──────────────────────────────────────────────
const SLEEP_SECS = 300
export function SleepWindDown({ c, audio, onStay, onClose, onComplete }: {
  c: HomeCopy; audio: HomeAudio; onStay: () => void; onClose: () => void; onComplete: () => void
}) {
  const elapsed = useElapsed(1000)
  const p = Math.min(1, elapsed / SLEEP_SECS)
  const startMaster = useRef<number | null>(null)
  const completed = useRef(false)

  // Lower the audio gently over the five minutes (to ~35% of where it started).
  useEffect(() => {
    if (startMaster.current === null) startMaster.current = audio.master
    const target = Math.round(startMaster.current * (1 - 0.65 * p))
    audio.setMaster(target)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Math.floor(elapsed / 10)])

  useEffect(() => {
    if (p >= 1 && !completed.current) { completed.current = true; onComplete() }
  }, [p, onComplete])

  // Leaving the wind-down early ("stay", back, another screen) hands the volume back.
  const setMasterRef = useRef(audio.setMaster)
  useEffect(() => { setMasterRef.current = audio.setMaster })
  useEffect(() => () => {
    if (startMaster.current !== null) setMasterRef.current(startMaster.current)
  }, [])

  const line = elapsed < 20 ? c.sleep_intro : elapsed < 200 ? c.sleep_main : p < 1 ? c.sleep_eyes : null

  return (
    <div className="ch-screen ch-center ch-sleep">
      <StarField count={24} />
      <div className="ch-dimmer" style={{ opacity: 0.15 + 0.62 * p }} aria-hidden />
      <div className="ch-col" style={{ position: 'relative', zIndex: 2 }}>
        {line ? (
          <p key={line} className="ch-h2 ch-soft ch-line" aria-live="polite">{line}</p>
        ) : (
          <>
            <p className="ch-h2 ch-soft ch-line" aria-live="polite">{c.sleep_night}</p>
            <div className="ch-moon" aria-hidden>🌙</div>
            <div className="ch-row">
              <button className="ch-btn" onClick={onClose}>{c.close_ws}</button>
              <button className="ch-btn ch-btn-ghost" onClick={onStay}>{c.after_menu}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
