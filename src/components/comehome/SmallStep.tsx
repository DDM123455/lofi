'use client'

import { useState } from 'react'
import type { Exits } from './Release'
import { AfterActions, StarField } from './Release'
import { STEP_EMOJI, STEP_IDS, type HomeCopy, type StepId } from './copy'
import { useFocusOnMount } from './hooks'

/*
 * One Small Step — for the evenings when nothing feels possible.
 *
 * Built on the idea behind behavioural activation: when motivation is gone, a tiny action
 * usually comes first and the feeling follows, not the other way round. So this offers ONE
 * two-minute thing at a time, lets you swap it freely, and treats "not even this tonight" as a
 * valid answer. No timers, no counts on screen beyond a few soft lights, nothing stored.
 */

type Track = (name: string, params?: Record<string, string | number | boolean>) => void
type Phase = 'offer' | 'doing' | 'done' | 'rest'

function shuffled<T>(list: readonly T[]): T[] {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SmallStep({ c, track, exits }: { c: HomeCopy; track: Track; exits: Exits }) {
  const s = c.step
  // A deck held in state (not a ref) so nothing repeats until every step has been offered.
  const [deck, setDeck] = useState<StepId[]>(() => shuffled(STEP_IDS))
  const step = deck[0]
  const draw = () => setDeck(d => (d.length > 1 ? d.slice(1) : shuffled(STEP_IDS).filter(x => x !== d[0])))
  const [phase, setPhase] = useState<Phase>('offer')
  const [doneCount, setDoneCount] = useState(0)
  const h = useFocusOnMount<HTMLHeadingElement>(`${phase}-${step}`)

  const other = () => { draw(); track('small_step_swapped') }
  const accept = () => { setPhase('doing'); track('small_step_accepted', { step }) }
  const done = () => { setDoneCount(n => n + 1); setPhase('done'); track('small_step_done', { step, n: doneCount + 1 }) }
  const skip = () => { draw(); setPhase('offer'); track('small_step_skipped', { step }) }
  const notTonight = () => { setPhase('rest'); track('small_step_not_tonight', { after: doneCount }) }
  const more = () => { draw(); setPhase('offer') }

  const lights = doneCount > 0 && (
    <div className="gt-dots" aria-hidden>
      {Array.from({ length: Math.min(doneCount, 7) }, (_, i) => <span key={i} className="is-lit" />)}
    </div>
  )

  if (phase === 'rest') {
    return (
      <div className="ch-screen ch-center">
        <StarField count={24} />
        <AfterActions c={c} line={doneCount ? s.done_line : s.rest_line} exits={exits} />
      </div>
    )
  }

  if (phase === 'done') {
    return (
      <div className="ch-screen ch-center">
        <StarField count={30} />
        <AfterActions c={c} line={s.done_line} exits={exits}>
          {lights}
          <button className="ch-btn ch-btn-ghost is-warm" onClick={more}>🌱 {s.more}</button>
        </AfterActions>
      </div>
    )
  }

  const card = (
    <div key={step} className={`gt-card ss-card${phase === 'doing' ? ' is-doing' : ''}`}>
      <div className="ss-emoji" aria-hidden>{STEP_EMOJI[step]}</div>
      <h2 ref={h} tabIndex={-1} className="ch-h2 ch-soft gt-text">{s.steps[step].text}</h2>
      <p className="ch-sub gt-why">{s.steps[step].why}</p>
      {phase === 'offer' && <p className="gt-label ss-about">{s.about}</p>}
    </div>
  )

  if (phase === 'doing') {
    return (
      <div className="ch-screen ch-center">
        <div className="ss-glow" aria-hidden />
        <div className="ch-col gt-col">
          {card}
          <p className="ch-sub">{s.doing}</p>
          <button className="ch-btn ch-btn-main" onClick={done}>✓ {s.done}</button>
          <button className="ch-link" onClick={skip}>{s.skip}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="ch-screen ch-center">
      <StarField count={20} />
      <div className="ch-col gt-col">
        {lights || (
          <>
            <p className="ch-h2" style={{ margin: 0 }}>{s.title}</p>
            <p className="ch-sub" style={{ marginTop: -4 }}>{s.sub}</p>
          </>
        )}
        {card}
        <div className="ch-row">
          <button className="ch-btn ch-btn-main" onClick={accept}>{s.accept}</button>
          <button className="ch-btn" onClick={other}>↻ {s.other}</button>
        </div>
        <button className="ch-link" onClick={notTonight}>{s.not_tonight}</button>
      </div>
    </div>
  )
}

export const SMALL_STEP_CSS = `
.ss-card{padding-top:28px}
.ss-emoji{font-size:44px;line-height:1;margin-bottom:14px}
.ss-about{margin:14px 0 0}
.ss-card.is-doing{border-color:rgba(240,184,138,.32)}
.ss-glow{position:absolute;left:50%;top:44%;width:56vmin;height:56vmin;margin:-28vmin 0 0 -28vmin;border-radius:50%;background:radial-gradient(circle,rgba(255,214,170,.22) 0%,rgba(255,200,150,.06) 45%,transparent 70%);animation:ch-breath 10s ease-in-out infinite;pointer-events:none}
.is-reduced .ss-glow{animation:none!important}
`
