'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { analytics } from '@/lib/analytics'
import type { Lang } from '@/lib/i18n'
import { EXP_EMOJI, HOME_COPY, HUB, loadHomeCopy, MOOD_EMOJI, MOOD_SUGGEST, NEED_MIX, RITUAL_MIX, type Exp, type HomeCopy, type Mood, type Ritual } from './copy'
import { loadSky, useFocusOnMount, useReducedMotion } from './hooks'
import { BrainDump, MemorySky, OneThing, StarField, type Exits } from './Release'
import { CalmBreath, CompanyRoom, QuietMixer, RestRoom, SleepWindDown, type HomeAudio } from './Experiences'
import { NIGHT_ROOM_CSS } from './NightRoom'
import { NEIGHBORS_CSS } from './Neighbors'
import { COME_HOME_CSS } from './styles'

export type { HomeAudio } from './Experiences'

/*
 * Flow:  welcome (mood, skippable) → hub (grouped cards) → experience → shared "what next"
 *        exits (hub · rest room · done) → final → closed.
 * Every screen can go back one level (top-left pill or Esc); wizards step back internally first.
 */
type Screen =
  | { kind: 'welcome' }
  | { kind: 'hub' }
  | { kind: 'exp'; exp: Exp }
  | { kind: 'final' }
  | { kind: 'closed' }

const VISITS_KEY = 'comehome-visits'
const START_EVENT: Partial<Record<Exp, string>> = {
  rest: 'rest_mode_started', calm: 'calm_mode_started', quiet: 'quiet_mode_started',
  company: 'company_mode_started', sleep: 'sleep_mode_started', one: 'one_thing_started',
  mind: 'brain_dump_opened', sky: 'sky_opened',
}

interface Props {
  audio: HomeAudio
  lang: Lang
  /** Switch back to the Focus workspace (called after the fade-out). */
  onExit: () => void
  /** Swap the shared workspace background to one of BG_PRESETS by id. */
  setBackdrop: (presetId: string) => void
}

/** Copy for `lang`; null only while a not-yet-loaded language's chunk is in flight. */
function useHomeCopy(lang: Lang): HomeCopy | null {
  const [loaded, setLoaded] = useState<{ lang: Lang; copy: HomeCopy } | null>(null)
  useEffect(() => {
    if (lang === 'en' || lang === 'vi') return
    let live = true
    loadHomeCopy(lang).then(copy => { if (live) setLoaded({ lang, copy }) }).catch(() => { if (live) setLoaded({ lang, copy: HOME_COPY.en }) })
    return () => { live = false }
  }, [lang])
  if (lang === 'en' || lang === 'vi') return HOME_COPY[lang]
  return loaded?.copy ?? null
}

export function ComeHome(props: Props) {
  const c = useHomeCopy(props.lang)
  // Same dim veil as the dynamic() loading state, so a language chunk fetch looks seamless.
  if (!c) return <div style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(8,5,12,.7)' }} />
  return <ComeHomeView {...props} c={c} />
}

function ComeHomeView({ audio, lang, onExit, setBackdrop, c }: Props & { c: HomeCopy }) {
  const reduced = useReducedMotion()
  const [screen, setScreen] = useState<Screen>({ kind: 'welcome' })
  const [mood, setMood] = useState<Mood | null>(null)
  const [leaving, setLeaving] = useState(false)
  const [skyCount, setSkyCount] = useState(() => loadSky().length)
  const [chromeIdle, setChromeIdle] = useState(false)
  const returning = useRef(false)

  // Anonymous product events only — never any text the person writes.
  const track = useCallback((name: string, params?: Record<string, string | number | boolean>) => {
    analytics.comeHome(name, params)
  }, [])

  useEffect(() => {
    let visits = 0
    try { visits = parseInt(localStorage.getItem(VISITS_KEY) || '0', 10) || 0; localStorage.setItem(VISITS_KEY, String(visits + 1)) } catch { /* ignore */ }
    returning.current = visits > 0
    track('come_home_opened', { returning: visits > 0 })
  }, [track])

  const leave = useCallback(() => {
    setLeaving(true)
    setTimeout(onExit, reduced ? 0 : 700)
  }, [onExit, reduced])

  const openExp = useCallback((exp: Exp) => {
    setScreen({ kind: 'exp', exp })
    const ev = START_EVENT[exp]
    if (ev) track(ev, mood ? { mood } : undefined)
    if (exp !== 'quiet' && exp !== 'sky' && exp !== 'one') audio.setMix(NEED_MIX[exp])
    setBackdrop(exp === 'calm' ? 'beach-night' : 'lofi-bedroom')
  }, [audio, mood, setBackdrop, track])

  const toHub = useCallback(() => setScreen({ kind: 'hub' }), [])

  const finish = useCallback((via: string) => {
    setScreen({ kind: 'final' })
    track('session_completed', { via, returning: returning.current })
  }, [track])

  const closeWorkspace = useCallback(() => {
    audio.disableSound()
    setScreen({ kind: 'closed' })
    // Only works when the tab was opened by script; otherwise the "closed" screen stays.
    try { window.close() } catch { /* ignore */ }
  }, [audio])

  const back = useCallback(() => {
    setScreen(s => {
      if (s.kind === 'exp' || s.kind === 'final') return { kind: 'hub' }
      if (s.kind === 'hub') return { kind: 'welcome' }
      return s
    })
  }, [])

  // Esc steps back one level (the focus workspace's own shortcuts are off in this mode).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const el = e.target as HTMLElement | null
      if ((el?.tagName === 'TEXTAREA' || el?.tagName === 'INPUT') && (el as HTMLTextAreaElement).value) return
      back()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [back])

  // During the sleep wind-down, the chrome fades away until the pointer/keyboard moves.
  const inSleep = screen.kind === 'exp' && screen.exp === 'sleep'
  useEffect(() => {
    if (!inSleep) return
    let t = setTimeout(() => setChromeIdle(true), 6000)
    const wake = () => { setChromeIdle(false); clearTimeout(t); t = setTimeout(() => setChromeIdle(true), 6000) }
    window.addEventListener('pointermove', wake)
    window.addEventListener('keydown', wake)
    return () => { clearTimeout(t); setChromeIdle(false); window.removeEventListener('pointermove', wake); window.removeEventListener('keydown', wake) }
  }, [inSleep])

  const onRitual = useCallback((r: Ritual) => audio.setMix(RITUAL_MIX[r]), [audio])
  const syncSky = useCallback(() => setSkyCount(loadSky().length), [])
  const exits: Exits = useMemo(() => ({
    onMenu: toHub,
    onRest: () => openExp('rest'),
    onDone: () => finish(screen.kind === 'exp' ? screen.exp : 'other'),
  }), [toHub, openExp, finish, screen])

  const screenKey = screen.kind === 'exp' ? `exp-${screen.exp}` : screen.kind
  const exp = screen.kind === 'exp' ? screen.exp : null

  return (
    <div className={`ch-root${leaving ? ' is-leaving' : ''}${reduced ? ' is-reduced' : ''}`} lang={lang}>
      <style>{COME_HOME_CSS + NIGHT_ROOM_CSS + NEIGHBORS_CSS}</style>
      <div className="ch-veil" aria-hidden />

      {screen.kind !== 'closed' && (
        <header className={`ch-top${chromeIdle ? ' is-idle' : ''}`}>
          <div className="ch-top-left">
            {screen.kind === 'welcome' ? (
              <div className="ch-switch" role="radiogroup" aria-label={c.mode_switch_label}>
                <button role="radio" aria-checked={false} onClick={leave}>☀️ <span className="ch-hide-sm">{c.mode_focus}</span></button>
                <button role="radio" aria-checked className="is-on">🌙 <span>{c.mode_home}</span></button>
              </div>
            ) : (
              <button className="ch-pill" onClick={back}>
                ← <span className="ch-hide-sm">{screen.kind === 'hub' ? c.back : c.menu}</span>
              </button>
            )}
          </div>

          {/* Where am I: a quiet breadcrumb instead of a heavy nav bar */}
          <p className="ch-where" aria-live="polite">
            {exp ? <><span aria-hidden>{EXP_EMOJI[exp]}</span> {c.exp_titles[exp]}</> : screen.kind === 'hub' ? `🌙 ${c.mode_home}` : ''}
          </p>

          <div className="ch-top-right">
            {screen.kind !== 'welcome' && screen.kind !== 'hub' && exp !== 'sky' && skyCount > 0 && (
              <button className="ch-pill" onClick={() => openExp('sky')} aria-label={c.sky_open}>✦ <span className="ch-hide-sm">{skyCount}</span></button>
            )}
            <button
              className={`ch-pill${audio.soundOn ? ' is-on' : ''}`}
              aria-pressed={audio.soundOn}
              aria-label={audio.soundOn ? c.sound_on : `${c.sound_off} · ${c.sound_hint}`}
              onClick={audio.soundOn ? audio.disableSound : audio.enableSound}
            >
              {audio.soundOn ? '🔊' : '🔈'} <span className="ch-hide-sm">{audio.soundOn ? c.sound_on : c.sound_hint}</span>
            </button>
            {screen.kind !== 'welcome' && (
              <button className="ch-pill ch-pill-sun" onClick={leave} aria-label={c.mode_focus} title={c.mode_focus}>☀️</button>
            )}
          </div>
        </header>
      )}

      <main className="ch-stage" key={screenKey}>
        {screen.kind === 'welcome' && (
          <Welcome
            c={c}
            onMood={m => { setMood(m); track('mood_selected', { mood: m }); toHub() }}
            onSkip={() => { track('mood_skipped'); toHub() }}
          />
        )}
        {screen.kind === 'hub' && <Hub c={c} mood={mood} skyCount={skyCount} onPick={openExp} />}

        {exp === 'mind' && <BrainDump c={c} reduced={reduced} track={track} onRitual={onRitual} exits={exits} />}
        {exp === 'one' && (
          <OneThing c={c} reduced={reduced} track={track} onRitual={onRitual} onKept={syncSky} onOpenSky={() => openExp('sky')} exits={exits} />
        )}
        {exp === 'sky' && <MemorySky c={c} lang={lang} track={track} onChange={setSkyCount} />}
        {exp === 'rest' && <RestRoom c={c} audio={audio} />}
        {exp === 'company' && <CompanyRoom c={c} audio={audio} reduced={reduced} />}
        {exp === 'calm' && <CalmBreath c={c} reduced={reduced} exits={exits} />}
        {exp === 'quiet' && <QuietMixer c={c} audio={audio} />}
        {exp === 'sleep' && (
          <SleepWindDown c={c} audio={audio} onStay={toHub} onClose={closeWorkspace} onComplete={() => track('session_completed', { via: 'sleep', returning: returning.current })} />
        )}

        {screen.kind === 'final' && <Final c={c} onMenu={toHub} onClose={closeWorkspace} />}
        {screen.kind === 'closed' && (
          <div className="ch-screen ch-center ch-closed">
            <div className="ch-col">
              <div className="ch-moon" aria-hidden>🌙</div>
              <p className="ch-h2 ch-soft">{c.closed_title}</p>
              <p className="ch-sub">{c.closed_sub}</p>
              <button className="ch-link" onClick={() => setScreen({ kind: 'welcome' })}>{c.closed_reopen}</button>
            </div>
          </div>
        )}
      </main>

      {/* Open-ended rooms get the same gentle ending as the guided experiences. */}
      {(exp === 'rest' || exp === 'company' || exp === 'quiet') && (
        <button className="ch-end" onClick={() => finish(exp)}>{c.done_tonight}</button>
      )}
    </div>
  )
}

function Welcome({ c, onMood, onSkip }: { c: HomeCopy; onMood: (m: Mood) => void; onSkip: () => void }) {
  const h = useFocusOnMount<HTMLHeadingElement>()
  return (
    <div className="ch-screen ch-center">
      <StarField count={28} />
      <div className="ch-col">
        <h1 ref={h} tabIndex={-1} className="ch-h1">{c.welcome_title}</h1>
        <p className="ch-sub">{c.welcome_sub}</p>
        <p className="ch-q" id="ch-mood-q">{c.welcome_q}</p>
        <div className="ch-moods" role="group" aria-labelledby="ch-mood-q">
          {(Object.keys(MOOD_EMOJI) as Mood[]).map(m => (
            <button key={m} className="ch-mood" onClick={() => onMood(m)}>
              <span className="ch-mood-emoji" aria-hidden>{MOOD_EMOJI[m]}</span>
              <span>{c.moods[m]}</span>
            </button>
          ))}
        </div>
        <button className="ch-link" onClick={onSkip}>{c.mood_skip} →</button>
      </div>
    </div>
  )
}

function Hub({ c, mood, skyCount, onPick }: { c: HomeCopy; mood: Mood | null; skyCount: number; onPick: (e: Exp) => void }) {
  const h = useFocusOnMount<HTMLHeadingElement>()
  const suggest = mood ? MOOD_SUGGEST[mood] : null
  return (
    <div className="ch-screen ch-center ch-hub">
      <StarField count={20} />
      <div className="ch-col ch-wide">
        {mood && <p className="ch-sub ch-reply">{c.mood_reply[mood]}</p>}
        <h2 ref={h} tabIndex={-1} className="ch-h2">{c.need_q}</h2>
        {HUB.map(({ group, items }) => (
          <section key={group} className="ch-group" aria-labelledby={`ch-g-${group}`}>
            <h3 id={`ch-g-${group}`} className="ch-group-title">{c.hub_groups[group]}</h3>
            <div className="ch-cardgrid">
              {items.map(x => (
                <button key={x} className={`ch-need${suggest === x ? ' is-suggested' : ''}`} onClick={() => onPick(x)}>
                  <span className="ch-need-emoji" aria-hidden>{EXP_EMOJI[x]}</span>
                  <span className="ch-need-text">
                    <span className="ch-need-title">
                      {c.cards[x].title}
                      {x === 'sky' && skyCount > 0 && <span className="ch-count"> · {skyCount}</span>}
                    </span>
                    <span className="ch-need-desc">{c.cards[x].desc}</span>
                  </span>
                  {suggest === x && <span className="ch-badge">{c.suggested}</span>}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function Final({ c, onMenu, onClose }: { c: HomeCopy; onMenu: () => void; onClose: () => void }) {
  const h = useFocusOnMount<HTMLParagraphElement>()
  return (
    <div className="ch-screen ch-center">
      <StarField count={50} />
      <div className="ch-col ch-final">
        <p ref={h} tabIndex={-1} className="ch-h1">{c.final_1}</p>
        <p className="ch-sub">{c.final_2}</p>
        <div className="ch-moon" aria-hidden>🌙</div>
        <p className="ch-h2 ch-soft">{c.final_night}</p>
        <div className="ch-row">
          <button className="ch-btn" onClick={onMenu}>{c.after_menu}</button>
          <button className="ch-btn ch-btn-ghost" onClick={onClose}>{c.close}</button>
        </div>
      </div>
    </div>
  )
}
