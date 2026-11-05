'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Exits } from './Release'
import { AfterActions, CareNote, StarField } from './Release'
import type { HomeCopy, Mood } from './copy'
import { loadSky, newStar, saveSky, useFocusOnMount, type SkyStar } from './hooks'
import { needsSupport } from './support'

/*
 * Good Things Happen — a soft version of the "Three Good Things" exercise, with two doors:
 *   - notice one (one is enough, three at most; no streaks, no score)
 *   - just be shown one: something you kept on an earlier evening, or a "somewhere tonight"
 *     line for people with nothing saved yet.
 * Asking someone who is hurting to list what they're grateful for can backfire, so on a heavy
 * day the receiving door comes first and writing is never required.
 *
 * Kept moments are ordinary sky stars (same privacy contract as Release.tsx: this browser only,
 * never in analytics), so a good thing noticed tonight is what comes back on a bad night.
 */

type Track = (name: string, params?: Record<string, string | number | boolean>) => void
type Step = 'open' | 'note' | 'rising' | 'receive' | 'after'
type Shown = { kind: 'own'; star: SkyStar } | { kind: 'world'; line: string }

const MAX_TONIGHT = 3

function shuffled<T>(list: T[]): T[] {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function GoodThings({ c, lang, mood, reduced, track, onKept, onOpenSky, exits }: {
  c: HomeCopy; lang: string; mood: Mood | null; reduced: boolean; track: Track
  onKept: () => void; onOpenSky: () => void; exits: Exits
}) {
  const g = c.good
  const [step, setStep] = useState<Step>('open')
  const [text, setText] = useState('')
  const [why, setWhy] = useState('')
  const [hint, setHint] = useState(0)
  const [kept, setKept] = useState(0)
  const [rising, setRising] = useState('')
  const [shown, setShown] = useState<Shown | null>(null)
  const h = useFocusOnMount<HTMLHeadingElement>(step)

  // Own moments first, world lines between them; a deck, so nothing repeats until it runs out.
  const deck = useRef<Shown[]>([])
  const buildDeck = () => {
    const own: Shown[] = shuffled(loadSky()).map(star => ({ kind: 'own', star }))
    const world: Shown[] = shuffled(g.world).map(line => ({ kind: 'world', line }))
    const out: Shown[] = []
    while (own.length || world.length) {
      if (own.length) out.push(own.shift()!)
      if (world.length) out.push(world.shift()!)
    }
    return out
  }
  const next = () => {
    if (!deck.current.length) deck.current = buildDeck()
    const item = deck.current.shift()!
    setShown(item)
    setStep('receive')
    track('good_thing_shown', { source: item.kind })
  }

  const careNeeded = useMemo(() => needsSupport(`${text} ${why}`), [text, why])

  const keep = () => {
    const t = text.trim()
    if (!t) return
    saveSky([...loadSky(), newStar(t, why)])
    onKept()
    const n = kept + 1
    setKept(n)
    setText(''); setWhy(''); setHint((hint + 1) % g.hints.length)
    setRising(t)
    setStep('rising')
    track('good_thing_kept', { n, why: !!why.trim() })
  }

  useEffect(() => {
    if (step !== 'rising') return
    const tm = setTimeout(() => { setRising(''); setStep(kept >= MAX_TONIGHT ? 'after' : 'note') }, reduced ? 900 : 2600)
    return () => clearTimeout(tm)
  }, [step, kept, reduced])

  const fmt = (iso: string) => {
    const d = new Date(iso)
    return isNaN(d.getTime()) ? '' : d.toLocaleDateString(lang, { month: 'long', day: 'numeric' })
  }

  if (step === 'rising') {
    return (
      <div className="ch-release" aria-hidden>
        <StarField count={36} />
        <div className="ch-cards" data-clarity-mask="True">
          <div className="ch-card ch-one-keep">{rising}</div>
        </div>
      </div>
    )
  }

  if (step === 'after') {
    return (
      <div className="ch-screen ch-center">
        <StarField count={kept ? 40 : 24} />
        <AfterActions c={c} line={kept ? g.after_kept : g.after_read} exits={exits}>
          {kept > 0 && <button className="ch-link is-warm" onClick={onOpenSky}>✦ {c.sky_open}</button>}
        </AfterActions>
      </div>
    )
  }

  if (step === 'receive' && shown) {
    return (
      <div className="ch-screen ch-center">
        <StarField count={36} />
        <div className="ch-col gt-col">
          <div key={shown.kind === 'own' ? shown.star.id : shown.line} className={`gt-card is-${shown.kind}`} data-clarity-mask={shown.kind === 'own' ? 'True' : undefined}>
            <span className="gt-light" aria-hidden />
            <p className="gt-label">{shown.kind === 'own' ? g.own_label.replace('{date}', fmt(shown.star.at)) : g.somewhere_label}</p>
            <h2 ref={h} tabIndex={-1} className="ch-h2 ch-soft gt-text">{shown.kind === 'own' ? shown.star.text : shown.line}</h2>
            {shown.kind === 'own' && shown.star.why && <p className="ch-sub gt-why">{shown.star.why}</p>}
          </div>
          <div className="ch-row">
            <button className="ch-btn ch-btn-main" onClick={next}>{g.another}</button>
            <button className="ch-btn" onClick={() => setStep('note')}>{g.note}</button>
          </div>
          <button className="ch-link" onClick={() => setStep('after')}>{g.enough}</button>
        </div>
      </div>
    )
  }

  if (step === 'note') {
    const cur = g.hints[hint]
    return (
      <div className="ch-screen ch-center">
        <div className="ch-col" style={{ maxWidth: 560 }}>
          <div className="gt-dots" role="img" aria-label={`${kept} / ${MAX_TONIGHT}`}>
            {Array.from({ length: MAX_TONIGHT }, (_, i) => <span key={i} className={i < kept ? 'is-lit' : ''} />)}
          </div>
          <h2 ref={h} tabIndex={-1} className="ch-h2">{kept ? g.note_more : g.note_title}</h2>
          <p className="ch-sub">{g.one_is_enough}</p>
          <div className="ch-ritual-row">
            {g.hints.map((x, i) => (
              <button key={x.label} className={`ch-chip${i === hint ? ' is-on' : ''}`} aria-pressed={i === hint} onClick={() => setHint(i)}>{x.label}</button>
            ))}
          </div>
          <label htmlFor="gt-text" className="ch-sr">{kept ? g.note_more : g.note_title}</label>
          <textarea
            id="gt-text" className="ch-textarea gt-area" data-clarity-mask="True"
            value={text} onChange={e => setText(e.target.value)}
            placeholder={cur.example} rows={2} maxLength={280} spellCheck={false} autoComplete="off"
          />
          {text.trim() && (
            <div className="gt-why-field" data-clarity-mask="True">
              <label htmlFor="gt-why">{g.why_label}</label>
              <input id="gt-why" value={why} onChange={e => setWhy(e.target.value)} placeholder={g.why_placeholder} maxLength={140} autoComplete="off" spellCheck={false} />
            </div>
          )}
          {careNeeded && <CareNote c={c} />}
          <button className="ch-btn ch-btn-main" onClick={keep} disabled={!text.trim()}>✦ {g.keep}</button>
          {kept > 0 && <button className="ch-link" onClick={() => setStep('after')}>{g.enough}</button>}
          <p className="ch-fine">🔒 {g.privacy}</p>
        </div>
      </div>
    )
  }

  const receiveFirst = mood === 'heavy'
  return (
    <div className="ch-screen ch-center">
      <StarField count={36} />
      <div className="ch-col gt-col">
        <h2 ref={h} tabIndex={-1} className="ch-h1">{g.title}</h2>
        <p className="ch-sub">{g.sub}</p>
        <div className="ch-row gt-doors" style={{ flexDirection: receiveFirst ? 'row-reverse' : 'row' }}>
          <button className={`ch-btn${receiveFirst ? '' : ' ch-btn-main'}`} onClick={() => setStep('note')}>✦ {g.note}</button>
          <button className={`ch-btn${receiveFirst ? ' ch-btn-main' : ''}`} onClick={next}>🌟 {g.show}</button>
        </div>
      </div>
    </div>
  )
}

export const GOOD_THINGS_CSS = `
.gt-col{max-width:600px;gap:18px}
.gt-doors{margin-top:18px}
.gt-card{position:relative;width:100%;padding:34px 28px 30px;border-radius:24px;background:rgba(255,240,230,.05);border:1px solid var(--ch-line);animation:gt-in 1.6s ease both}
.gt-card.is-own{background:linear-gradient(160deg,rgba(240,184,138,.14),rgba(255,240,230,.04));border-color:rgba(240,184,138,.3)}
.gt-light{display:block;width:12px;height:12px;margin:0 auto 16px;border-radius:50%;background:#fff3cf;box-shadow:0 0 18px 7px rgba(255,236,190,.6);animation:ch-twinkle-strong 6s ease-in-out infinite}
.gt-label{margin:0 0 10px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ch-dim2)}
.gt-text{margin:0;overflow-wrap:anywhere}
.gt-why{margin-top:10px;font-size:15px;overflow-wrap:anywhere}
.gt-dots{display:flex;gap:10px;margin-bottom:6px}
.gt-dots span{width:9px;height:9px;border-radius:50%;background:rgba(255,240,230,.14);transition:background .8s,box-shadow .8s}
.gt-dots span.is-lit{background:#fff3cf;box-shadow:0 0 12px 3px rgba(255,236,190,.55)}
.gt-area{min-height:92px}
.gt-why-field{width:100%;display:flex;flex-direction:column;gap:6px;text-align:left;font-size:13px;color:var(--ch-dim);animation:ch-screen-in .7s ease both}
.gt-why-field input{width:100%;padding:11px 16px;border-radius:14px;border:1px solid var(--ch-line);background:rgba(255,244,232,.05);color:var(--ch-text);font:15px 'Outfit',system-ui,sans-serif;outline:none;user-select:text;-webkit-user-select:text}
.gt-why-field input::placeholder{color:rgba(244,236,228,.32)}
@keyframes gt-in{from{opacity:0;transform:translateY(12px);filter:blur(4px)}to{opacity:1;transform:none;filter:blur(0)}}
.is-reduced .gt-card,.is-reduced .gt-light{animation:none!important}
`
