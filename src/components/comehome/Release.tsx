'use client'

import { useCallback, useEffect, useMemo, useState, type CSSProperties, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { localeOf, type Lang } from '@/lib/i18n'
import { RITUAL_EMOJI, RITUAL_ORDER, type HomeCopy, type Ritual } from './copy'
import { loadSky, newStar, saveSky, SKY_MAX, starPos, useFocusOnMount, type SkyStar } from './hooks'

/*
 * Privacy contract for everything in this file:
 *  - Brain-dump text lives only in React state and is dropped the moment it's released.
 *    It is never written to storage, never sent anywhere, never passed to analytics.
 *  - "Keep this moment" / "Add a star" is the only thing persisted, and only to this
 *    browser's localStorage (see hooks.ts), because the person explicitly asked to keep it.
 *  - Text-bearing nodes carry data-clarity-mask so session recording never captures them.
 */

type Track = (name: string, params?: Record<string, string | number | boolean>) => void

/** Shared "what next" exits, so every experience ends the same way. */
export interface Exits { onMenu: () => void; onRest: () => void; onDone: () => void }

const RITUAL_KEY = 'comehome-ritual' // last chosen ritual (a preference, never text)
function loadRitual(): Ritual {
  try { const r = localStorage.getItem(RITUAL_KEY) as Ritual | null; return r && RITUAL_ORDER.includes(r) ? r : 'sky' } catch { return 'sky' }
}
function saveRitual(r: Ritual) { try { localStorage.setItem(RITUAL_KEY, r) } catch { /* ignore */ } }

function toCards(text: string): string[] {
  let parts = text.split(/\n+/).map(s => s.trim()).filter(Boolean)
  if (parts.length === 1 && parts[0].length > 90) {
    parts = parts[0].split(/(?<=[.!?…])\s+/).map(s => s.trim()).filter(Boolean)
  }
  const MAX = 10
  if (parts.length > MAX) parts = [...parts.slice(0, MAX - 1), parts.slice(MAX - 1).join(' · ')]
  return parts.map(p => (p.length > 140 ? p.slice(0, 137) + '…' : p))
}

/** How long each ritual's animation runs for `n` cards (ms), so the next screen waits for it. */
const RITUAL_DUR: Record<Ritual, number> = { sky: 5200, river: 7400, burn: 4600, wind: 4200, rain: 4800 }
function ritualMs(r: Ritual, n: number, reduced: boolean) {
  if (reduced) return 1600
  return 1500 + (n - 1) * 420 + RITUAL_DUR[r] + 600
}

/** Cmd/Ctrl+Enter submits from a textarea. */
function onCmdEnter(fn: () => void) {
  return (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); fn() }
  }
}

/** While a wizard is past step 1, Esc steps back inside it instead of leaving to the hub. */
function useEscStep(active: boolean, fn: () => void) {
  useEffect(() => {
    if (!active) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation() // capture phase: runs before ComeHome's own Esc handler
      fn()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [active, fn])
}

// ── Pieces ──────────────────────────────────────────────────────────────────
export function StarField({ count = 40 }: { count?: number }) {
  const stars = useMemo(() => Array.from({ length: count }, (_, i) => starPos(`bg-${i}`)), [count])
  return (
    <div className="ch-starfield" aria-hidden>
      {stars.map((s, i) => (
        <span key={i} style={{ left: `${s.x}%`, top: `${((s.y - 30) / 46) * 92}%`, transform: `scale(${s.s})`, animationDelay: `${-i * 0.9}s` }} />
      ))}
    </div>
  )
}

function Steps({ labels, current }: { labels: string[]; current: number }) {
  return (
    <ol className="ch-steps" aria-label={`${current + 1} / ${labels.length}`}>
      {labels.map((l, i) => (
        <li key={l} className={i === current ? 'is-now' : i < current ? 'is-done' : ''} aria-current={i === current ? 'step' : undefined}>
          <span aria-hidden>{i < current ? '✓' : i + 1}</span>{l}
        </li>
      ))}
    </ol>
  )
}

export function AfterActions({ c, line, exits, children }: { c: HomeCopy; line: string; exits: Exits; children?: ReactNode }) {
  const h = useFocusOnMount<HTMLParagraphElement>()
  return (
    <div className="ch-col ch-after">
      <p ref={h} tabIndex={-1} className="ch-h2 ch-soft ch-line">{line}</p>
      <div className="ch-moon" aria-hidden>🌙</div>
      {children}
      <div className="ch-row">
        <button className="ch-btn ch-btn-main" onClick={exits.onMenu}>{c.after_menu}</button>
        <button className="ch-btn" onClick={exits.onRest}>{c.after_rest}</button>
      </div>
      <button className="ch-link" onClick={exits.onDone}>{c.done_tonight}</button>
    </div>
  )
}

function RitualPicker({ c, value, onChange }: { c: HomeCopy; value: Ritual; onChange: (r: Ritual) => void }) {
  return (
    <div className="ch-rituals" role="radiogroup" aria-label={c.mind_choose_title}>
      {RITUAL_ORDER.map(r => (
        <button key={r} role="radio" aria-checked={value === r} className={`ch-ritual${value === r ? ' is-on' : ''}`} onClick={() => onChange(r)}>
          <span className="ch-ritual-emoji" aria-hidden>{RITUAL_EMOJI[r]}</span>
          <span className="ch-ritual-name">{c.rituals[r].name}</span>
          <span className="ch-ritual-desc">{c.rituals[r].desc}</span>
        </button>
      ))}
    </div>
  )
}

/** Backdrop for each ritual — pure CSS, no assets. */
function RitualScene({ ritual }: { ritual: Ritual }) {
  if (ritual === 'river') {
    return (
      <div className="ch-river" aria-hidden>
        {Array.from({ length: 7 }, (_, i) => <span key={i} style={{ top: `${18 + i * 11}%`, animationDelay: `${-i * 1.7}s` }} />)}
      </div>
    )
  }
  if (ritual === 'burn') {
    return (
      <div className="ch-burn-scene" aria-hidden>
        <div className="ch-burn-glow" />
        {Array.from({ length: 22 }, (_, i) => (
          <span key={i} className="ch-ember" style={{ left: `${20 + ((i * 37) % 60)}%`, animationDelay: `${1.6 + (i % 8) * 0.35}s`, ['--ex' as string]: `${((i * 23) % 60) - 30}px` } as CSSProperties} />
        ))}
      </div>
    )
  }
  if (ritual === 'wind') {
    return (
      <div className="ch-wind" aria-hidden>
        {Array.from({ length: 9 }, (_, i) => <span key={i} style={{ top: `${10 + i * 9}%`, animationDelay: `${-i * 0.7}s`, width: `${20 + (i % 3) * 12}%` }} />)}
        {Array.from({ length: 8 }, (_, i) => <i key={i} style={{ top: `${15 + ((i * 29) % 70)}%`, animationDelay: `${1.2 + i * 0.5}s` }}>🍃</i>)}
      </div>
    )
  }
  if (ritual === 'rain') return <div className="ch-rainfall" aria-hidden />
  return <StarField count={46} />
}

function RitualStage({ ritual, cards, prefix }: { ritual: Ritual; cards: string[]; prefix?: string }) {
  return (
    <div className={`ch-release ch-rit-${ritual}`} aria-hidden>
      <RitualScene ritual={ritual} />
      <div className="ch-cards" data-clarity-mask="True">
        {cards.map((t, i) => (
          <div key={i} className="ch-card" style={{
            ['--i' as string]: i,
            ['--dx' as string]: `${((i * 37) % 60) - 30}vw`,
            ['--rot' as string]: `${((i * 13) % 14) - 7}deg`,
          } as CSSProperties}>{prefix ? `${prefix} ${t}` : t}</div>
        ))}
      </div>
    </div>
  )
}

// ── Clear My Mind: write → choose → let go → after ──────────────────────────
type Step = 'write' | 'choose' | 'release' | 'after'

export function BrainDump({ c, reduced, track, onRitual, exits }: {
  c: HomeCopy; reduced: boolean; track: Track; onRitual: (r: Ritual) => void; exits: Exits
}) {
  const [step, setStep] = useState<Step>('write')
  const [text, setText] = useState('')
  const [ritual, setRitual] = useState<Ritual>(loadRitual)
  const [cards, setCards] = useState<string[]>([])
  const [typed, setTyped] = useState(false)
  const h = useFocusOnMount<HTMLHeadingElement>(step)

  const backToWrite = useCallback(() => setStep('write'), [])
  useEscStep(step === 'choose', backToWrite)

  const onType = (v: string) => {
    if (!typed && v.trim()) { setTyped(true); track('brain_dump_started') }
    setText(v)
  }
  const toChoose = () => { if (text.trim()) setStep('choose') }
  const pick = (r: Ritual) => { setRitual(r); saveRitual(r) }

  const release = () => {
    const list = toCards(text)
    if (!list.length) return
    setText('') // the only copy left is the transient animation below
    setCards(list)
    setStep('release')
    onRitual(ritual)
    track('brain_dump_released', { ritual, pieces: list.length })
  }

  useEffect(() => {
    if (step !== 'release') return
    const t = setTimeout(() => { setCards([]); setStep('after') }, ritualMs(ritual, cards.length, reduced))
    return () => clearTimeout(t)
  }, [step, ritual, cards.length, reduced])

  const labels = [c.steps.write, c.steps.choose, c.steps.release]

  if (step === 'release') return <RitualStage ritual={ritual} cards={cards} />

  if (step === 'after') {
    return (
      <div className="ch-screen ch-center">
        <StarField count={30} />
        <AfterActions c={c} line={c.rituals[ritual].after} exits={exits} />
      </div>
    )
  }

  if (step === 'choose') {
    return (
      <div className="ch-screen ch-center" key="choose">
        <div className="ch-col ch-wide">
          <Steps labels={labels} current={1} />
          <h2 ref={h} tabIndex={-1} className="ch-h2">{c.mind_choose_title}</h2>
          <p className="ch-sub">{c.mind_choose_sub}</p>
          <RitualPicker c={c} value={ritual} onChange={pick} />
          <div className="ch-row">
            <button className="ch-btn ch-btn-ghost" onClick={backToWrite}>← {c.edit}</button>
            <button className="ch-btn ch-btn-main" onClick={release}>{RITUAL_EMOJI[ritual]} {c.mind_release}</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ch-screen ch-center" key="write">
      <div className="ch-col" style={{ maxWidth: 580 }}>
        <Steps labels={labels} current={0} />
        <h2 ref={h} tabIndex={-1} className="ch-h2">{c.mind_title}</h2>
        <p className="ch-sub">{c.mind_sub}</p>
        <label htmlFor="ch-dump" className="ch-sr">{c.mind_title}</label>
        <textarea
          id="ch-dump"
          className="ch-textarea"
          data-clarity-mask="True"
          value={text}
          onChange={e => onType(e.target.value)}
          onKeyDown={onCmdEnter(toChoose)}
          placeholder={c.mind_placeholder}
          rows={8}
          maxLength={4000}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
        />
        <button className="ch-btn ch-btn-main" onClick={toChoose} disabled={!text.trim()}>{c.next} →</button>
        <p className="ch-fine">🔒 {c.mind_privacy} <span className="ch-hide-sm">· {c.ctrl_enter}</span></p>
      </div>
    </div>
  )
}

// ── One Thing From Today: write → keep or let go → after ────────────────────
export function OneThing({ c, reduced, track, onRitual, onOpenSky, onKept, exits }: {
  c: HomeCopy; reduced: boolean; track: Track; onRitual: (r: Ritual) => void
  onOpenSky: () => void; onKept: () => void; exits: Exits
}) {
  const [step, setStep] = useState<Step>('write')
  const [text, setText] = useState('')
  const [how, setHow] = useState<Ritual | 'keep'>('keep')
  const [shown, setShown] = useState('')
  const h = useFocusOnMount<HTMLHeadingElement>(step)

  const backToWrite = useCallback(() => setStep('write'), [])
  useEscStep(step === 'choose', backToWrite)

  const toChoose = () => { if (text.trim()) setStep('choose') }
  const act = (kind: Ritual | 'keep') => {
    const t = text.trim()
    if (!t) return
    setText('')
    setShown(t)
    setHow(kind)
    setStep('release')
    if (kind === 'keep') { saveSky([...loadSky(), newStar(t)]); onKept() } else onRitual(kind)
    track(kind === 'keep' ? 'one_thing_kept' : 'one_thing_released', kind === 'keep' ? undefined : { ritual: kind })
  }

  useEffect(() => {
    if (step !== 'release') return
    const ms = how === 'keep' ? (reduced ? 1200 : 4200) : ritualMs(how, 1, reduced)
    const tm = setTimeout(() => { setShown(''); setStep('after') }, ms)
    return () => clearTimeout(tm)
  }, [step, how, reduced])

  const labels = [c.steps.write, c.steps.choose, c.steps.release]

  if (step === 'after') {
    return (
      <div className="ch-screen ch-center">
        <StarField count={how === 'keep' ? 40 : 20} />
        <AfterActions c={c} line={how === 'keep' ? c.one_after_keep : c.rituals[how].after} exits={exits}>
          {how === 'keep' && <button className="ch-link is-warm" onClick={onOpenSky}>✦ {c.sky_open}</button>}
        </AfterActions>
      </div>
    )
  }

  if (step === 'release') {
    if (how !== 'keep') return <RitualStage ritual={how} cards={[shown]} prefix={c.one_prefix} />
    return (
      <div className="ch-release" aria-hidden>
        <StarField count={40} />
        <div className="ch-cards" data-clarity-mask="True">
          <div className="ch-card ch-one-keep">{c.one_prefix} {shown}</div>
        </div>
      </div>
    )
  }

  if (step === 'choose') {
    return (
      <div className="ch-screen ch-center" key="choose">
        <div className="ch-col ch-wide">
          <Steps labels={labels} current={1} />
          <h2 ref={h} tabIndex={-1} className="ch-h2">{c.one_choose_title}</h2>
          <div className="ch-quote" data-clarity-mask="True">{c.one_prefix} {text.trim()}</div>
          <button className="ch-ritual ch-keep" onClick={() => act('keep')}>
            <span className="ch-ritual-emoji" aria-hidden>✦</span>
            <span className="ch-ritual-name">{c.one_keep}</span>
            <span className="ch-ritual-desc">{c.one_keep_desc}</span>
          </button>
          <p className="ch-dim ch-or">{c.one_go_label}</p>
          <div className="ch-ritual-row">
            {RITUAL_ORDER.map(r => (
              <button key={r} className="ch-chip" onClick={() => act(r)}>{RITUAL_EMOJI[r]} {c.rituals[r].name}</button>
            ))}
          </div>
          <button className="ch-btn ch-btn-ghost" onClick={backToWrite}>← {c.edit}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="ch-screen ch-center" key="write">
      <div className="ch-col" style={{ maxWidth: 580 }}>
        <Steps labels={labels} current={0} />
        <h2 ref={h} tabIndex={-1} className="ch-h2">{c.one_title}</h2>
        <div className="ch-one-input" data-clarity-mask="True">
          <label htmlFor="ch-one" className="ch-one-prefix">{c.one_prefix}</label>
          <textarea
            id="ch-one"
            className="ch-textarea ch-one-area"
            data-clarity-mask="True"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={onCmdEnter(toChoose)}
            placeholder={c.one_placeholder}
            rows={3}
            maxLength={280}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <button className="ch-btn ch-btn-main" onClick={toChoose} disabled={!text.trim()}>{c.next} →</button>
        <p className="ch-fine">🔒 {c.one_privacy} <span className="ch-hide-sm">· {c.ctrl_enter}</span></p>
      </div>
    </div>
  )
}

// ── Memory Sky ──────────────────────────────────────────────────────────────
export function MemorySky({ c, lang, track, onChange }: {
  c: HomeCopy; lang: Lang; track: Track; onChange: (n: number) => void
}) {
  const [stars, setStars] = useState<SkyStar[]>(loadSky)
  const [open, setOpen] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [born, setBorn] = useState<string | null>(null)
  const h = useFocusOnMount<HTMLHeadingElement>()

  const commit = (next: SkyStar[]) => {
    const kept = next.slice(-SKY_MAX)
    setStars(kept); saveSky(kept); onChange(kept.length)
  }
  const forget = (id: string) => { commit(stars.filter(s => s.id !== id)); setOpen(null) }
  // Add a moment straight from the sky (before, only "One thing from today" could create stars).
  const add = (e: FormEvent) => {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return
    const star = newStar(t)
    commit([...stars, star])
    setDraft('')
    setOpen(null)
    setBorn(star.id)
    track('sky_star_added')
  }
  useEffect(() => {
    if (!born) return
    const tm = setTimeout(() => setBorn(null), 2600)
    return () => clearTimeout(tm)
  }, [born])

  const fmt = (iso: string) => {
    const d = new Date(iso)
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString(localeOf(lang), { month: 'short', day: 'numeric', year: 'numeric' })
  }
  const active = stars.find(s => s.id === open)

  return (
    <div className="ch-screen ch-sky">
      <StarField count={60} />
      <div className="ch-sky-head">
        <h2 ref={h} tabIndex={-1} className="ch-h2">{c.sky_title}</h2>
        <p className="ch-sub">{stars.length ? c.sky_hint : c.sky_empty}</p>
      </div>
      <ul className="ch-sky-list" data-clarity-mask="True">
        {stars.map(s => {
          const p = starPos(s.id)
          return (
            <li key={s.id} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <button
                className={`ch-memstar${open === s.id ? ' is-open' : ''}${born === s.id ? ' is-born' : ''}`}
                style={{ ['--s' as string]: p.s } as CSSProperties}
                aria-label={`${fmt(s.at)} — ${s.text}`}
                aria-expanded={open === s.id}
                onClick={() => setOpen(o => (o === s.id ? null : s.id))}
              />
            </li>
          )
        })}
      </ul>
      {active && (
        <div className="ch-memcard" role="dialog" aria-label={fmt(active.at)} data-clarity-mask="True">
          <div className="ch-dim" style={{ fontSize: 12 }}>{fmt(active.at)}</div>
          <p style={{ margin: '6px 0 12px', lineHeight: 1.5 }}>{active.text}</p>
          <div className="ch-row" style={{ justifyContent: 'space-between' }}>
            <button className="ch-link" onClick={() => forget(active.id)}>{c.sky_forget}</button>
            <button className="ch-link" onClick={() => setOpen(null)} aria-label={c.close}>✕</button>
          </div>
        </div>
      )}
      <form className="ch-sky-add" onSubmit={add} data-clarity-mask="True">
        <label htmlFor="ch-sky-input" className="ch-sr">{c.sky_add_label}</label>
        <input
          id="ch-sky-input"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder={c.sky_add_placeholder}
          maxLength={280}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="ch-btn ch-btn-main" disabled={!draft.trim()} aria-label={c.sky_add}>✦ <span className="ch-hide-sm">{c.sky_add}</span></button>
      </form>
      <p className="ch-sr" aria-live="polite">{born ? c.sky_added : ''}</p>
    </div>
  )
}
