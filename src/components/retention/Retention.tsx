'use client'

import { useEffect, useMemo, useState } from 'react'
import { analytics } from '@/lib/analytics'
import { useLanguage } from '@/contexts/LanguageContext'
import { useGameStore } from '@/lib/gameStore'
import { getCurrentStreak } from '@/lib/focusStats'
import {
  canShowNudge, dismissNudge, downloadIcs, googleCalendarUrl, installKind, isMac, isReturningVisit,
  lastFocusDay, markNudgeDone, markNudgeShown, markSeen, markWelcomed, onInstallAvailabilityChange,
  promptInstall, reminderUrl, savedReminderTime, saveReminderTime, type InstallKind, type Surface,
} from '@/lib/retention'
import { loadSky } from '@/components/comehome/hooks'
import { RETENTION_COPY, fill, type RetentionCopy } from './copy'

function useCopy(): RetentionCopy {
  const { lang } = useLanguage()
  return RETENTION_COPY[lang] ?? RETENTION_COPY.en
}

const CSS = `
.rt{--rt-bg:rgba(20,17,40,.94);--rt-text:#f3f3f8;--rt-dim:rgba(243,243,248,.62);--rt-line:rgba(255,255,255,.12);--rt-accent:#a78bfa;--rt-accent-ink:#16121f;--rt-soft:rgba(167,139,250,.16);
  color:var(--rt-text);font-family:'Outfit',system-ui,sans-serif;text-align:left}
.rt[data-tone=home]{--rt-bg:rgba(22,16,22,.78);--rt-text:#f4ece4;--rt-dim:rgba(244,236,228,.62);--rt-line:rgba(255,236,220,.14);--rt-accent:#f0b88a;--rt-accent-ink:#22160f;--rt-soft:rgba(240,184,138,.14)}
.rt-card{width:min(340px,calc(100vw - 32px));padding:16px 16px 12px;border-radius:18px;background:var(--rt-bg);border:1px solid var(--rt-line);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 22px 60px rgba(0,0,0,.45);animation:rt-in .4s ease both}
.rt-inline{margin:6px auto 0}
@keyframes rt-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.rt-card,.rt-wb{animation:none}}
.rt-head{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}
.rt-title{flex:1;margin:0;font-size:14px;font-weight:600;line-height:1.4}
.rt-x{flex-shrink:0;width:24px;height:24px;border:none;border-radius:8px;background:transparent;color:var(--rt-dim);cursor:pointer;font-size:13px}
.rt-x:hover{color:var(--rt-text);background:var(--rt-soft)}
.rt-sec{padding:10px 0;border-top:1px solid var(--rt-line)}
.rt-sec:first-of-type{border-top:none;padding-top:0}
.rt-label{display:block;margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:.02em;color:var(--rt-dim)}
.rt-p{margin:0;font-size:12.5px;line-height:1.55;color:var(--rt-dim)}
.rt-steps{margin:0;padding:0;list-style:none;display:grid;gap:6px}
.rt-steps li{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--rt-text)}
.rt-num{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:var(--rt-soft);color:var(--rt-accent);font-size:11px;font-weight:700;flex-shrink:0}
.rt-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 13px;border-radius:999px;border:1px solid var(--rt-line);background:var(--rt-soft);color:var(--rt-text);font-size:12.5px;font-weight:600;cursor:pointer;text-decoration:none;font-family:inherit;white-space:nowrap}
.rt-btn:hover{border-color:var(--rt-accent)}
.rt-main{background:var(--rt-accent);color:var(--rt-accent-ink);border-color:transparent}
.rt-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.rt-time{padding:6px 9px;border-radius:10px;border:1px solid var(--rt-line);background:rgba(255,255,255,.06);color:var(--rt-text);font-size:13px;font-family:inherit;color-scheme:dark}
.rt-ok{margin:8px 0 0;font-size:12.5px;color:var(--rt-accent)}
.rt-later{display:block;margin:4px auto 0;border:none;background:none;color:var(--rt-dim);font-size:12px;cursor:pointer;font-family:inherit;padding:4px 8px}
.rt-later:hover{color:var(--rt-text)}
.rt-link{border:none;background:none;color:var(--rt-dim);font-size:13px;cursor:pointer;font-family:inherit;text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--rt-line)}
.rt-link:hover{color:var(--rt-text)}
.rt :focus-visible{outline:2px solid var(--rt-accent);outline-offset:2px}
.rt-wb{position:fixed;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;width:max-content;max-width:calc(100vw - 32px);padding:10px 16px;border-radius:20px;background:var(--rt-bg);border:1px solid var(--rt-line);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);box-shadow:0 12px 36px rgba(0,0,0,.4);cursor:pointer;font-size:13px;line-height:1.4;animation:rt-wb 7s ease forwards}
.rt-wb b{font-weight:600}
.rt-wb span{color:var(--rt-dim)}
@keyframes rt-wb{0%{opacity:0;transform:translate(-50%,-6px)}6%{opacity:1;transform:translate(-50%,0)}88%{opacity:1}100%{opacity:0}}
`

const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v12M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>
  </svg>
)

// ── Calendar reminder ─────────────────────────────────────────────────────────
export function CalendarReminder({ surface, onAdded }: { surface: Surface; onAdded?: () => void }) {
  const r = useCopy()
  const [time, setTime] = useState(() => savedReminderTime(surface))
  const [added, setAdded] = useState(false)
  const ev = useMemo(() => ({
    title: surface === 'home' ? r.ev_title_home : r.ev_title_focus,
    description: surface === 'home' ? r.ev_desc_home : r.ev_desc_focus,
    time,
    minutes: surface === 'home' ? 15 : 25,
    url: reminderUrl(surface),
  }), [r, surface, time])

  const done = (via: 'google' | 'ics') => {
    saveReminderTime(surface, time)
    analytics.custom('calendar_added', { via, surface })
    markNudgeDone()
    setAdded(true)
    onAdded?.()
  }

  return (
    <div>
      <label className="rt-label" htmlFor={`rt-time-${surface}`}>{surface === 'home' ? r.cal_title_home : r.cal_title_focus}</label>
      <div className="rt-row">
        <input id={`rt-time-${surface}`} className="rt-time" type="time" value={time} aria-label={r.cal_time}
          onChange={e => { if (e.target.value) { setTime(e.target.value); setAdded(false) } }}/>
        <a className="rt-btn" href={googleCalendarUrl(ev)} target="_blank" rel="noopener noreferrer" onClick={() => done('google')} data-rt="gcal">
          {r.cal_google}
        </a>
        <button className="rt-btn" onClick={() => { downloadIcs(ev, `lofispace-${surface === 'home' ? 'evening' : 'focus'}-reminder.ics`); done('ics') }} data-rt="ics">
          {r.cal_ics}
        </button>
      </div>
      {added && <p className="rt-ok" role="status">✓ {r.cal_added}</p>}
    </div>
  )
}

// ── Install / bookmark section ────────────────────────────────────────────────
function InstallSection({ surface, kind, onInstalled }: { surface: Surface; kind: InstallKind; onInstalled: () => void }) {
  const r = useCopy()
  if (kind === 'prompt') {
    return (
      <div className="rt-row">
        <button className="rt-btn rt-main" data-rt="install" onClick={async () => {
          analytics.custom('install_prompt_shown', { surface })
          const ok = await promptInstall()
          if (ok) { analytics.custom('install_prompt_accepted', { surface }); markNudgeDone(); onInstalled() }
        }}>⬇ {r.install_btn}</button>
        <p className="rt-p" style={{ flex: 1, minWidth: 140 }}>{r.install_desc}</p>
      </div>
    )
  }
  if (kind === 'ios') {
    return (
      <ol className="rt-steps">
        <li><span className="rt-num">1</span>{r.ios_step1} <ShareIcon/></li>
        <li><span className="rt-num">2</span>{r.ios_step2}</li>
      </ol>
    )
  }
  if (kind === 'menu') return <p className="rt-p">{r.menu_hint}</p>
  return <p className="rt-p">{fill(r.bookmark_hint, { key: isMac() ? '⌘ D' : 'Ctrl + D' })}</p>
}

/**
 * The happy-moment card: keep the app one tap away + a daily reminder. Only call it after
 * `canShowNudge()` said yes; it records the impression itself.
 */
export function NudgeCard({ surface, inline = false, onClose, style }: { surface: Surface; inline?: boolean; onClose: () => void; style?: React.CSSProperties }) {
  const r = useCopy()
  const [kind, setKind] = useState<InstallKind>(() => installKind())
  useEffect(() => onInstallAvailabilityChange(() => setKind(installKind())), [])
  useEffect(() => {
    markNudgeShown()
    const k = installKind()
    if (k !== 'prompt') analytics.custom('install_instructions_shown', { kind: k, surface })
  }, [surface])

  const notNow = () => { dismissNudge(); onClose() }
  return (
    <div className={`rt rt-card${inline ? ' rt-inline' : ''}`} data-tone={surface} role={inline ? 'region' : 'dialog'} aria-labelledby={`rt-nudge-${surface}`} data-rt="nudge" style={style}>
      <style>{CSS}</style>
      <div className="rt-head">
        <p className="rt-title" id={`rt-nudge-${surface}`}>{surface === 'home' ? r.nudge_home : r.nudge_focus}</p>
        <button className="rt-x" onClick={notNow} aria-label={r.close}>✕</button>
      </div>
      <div className="rt-sec"><InstallSection surface={surface} kind={kind} onInstalled={onClose}/></div>
      <div className="rt-sec"><CalendarReminder surface={surface}/></div>
      <button className="rt-later" onClick={notNow}>{r.not_now}</button>
    </div>
  )
}

/** Modal wrapper for the always-available reminder (workspace "More" menu). */
export function ReminderDialog({ surface, onClose }: { surface: Surface; onClose: () => void }) {
  const r = useCopy()
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.42)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}>
      <div className="rt rt-card" data-tone={surface} role="dialog" aria-label={r.cal_open} onClick={e => e.stopPropagation()}>
        <style>{CSS}</style>
        <div className="rt-head">
          <p className="rt-title">🗓 {r.cal_open}</p>
          <button className="rt-x" onClick={onClose} aria-label={r.close}>✕</button>
        </div>
        <CalendarReminder surface={surface}/>
      </div>
    </div>
  )
}

/**
 * Come Home slot for the Final / "what next" screens. Shows the nudge card when allowed;
 * on the Final screen it otherwise leaves a quiet "remind me tomorrow evening" link.
 */
export function HomeRetention({ final = false }: { final?: boolean }) {
  const r = useCopy()
  const [show, setShow] = useState(() => canShowNudge())
  const [open, setOpen] = useState(false)
  if (show) return <NudgeCard surface="home" inline onClose={() => setShow(false)}/>
  if (!final) return null
  return (
    <div className="rt" data-tone="home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <style>{CSS}</style>
      {open
        ? <div className="rt-card rt-inline"><CalendarReminder surface="home"/></div>
        : <button className="rt-link" onClick={() => setOpen(true)} data-rt="home-remind">🗓 {r.cal_home_link}</button>}
    </div>
  )
}

// ── Welcome back ──────────────────────────────────────────────────────────────
function focusLine(r: RetentionCopy): string {
  const parts: string[] = []
  const last = lastFocusDay(useGameStore.getState().dailyStats)
  if (last) parts.push(fill(last.yesterday ? r.wb_yesterday : r.wb_last, { m: last.minutes }))
  const streak = getCurrentStreak()
  if (streak >= 2) parts.push(fill(r.wb_streak, { n: streak }))
  try {
    const todos = JSON.parse(localStorage.getItem('lofispace-todos') || '[]')
    const left = Array.isArray(todos) ? todos.filter((x: { done?: boolean }) => x && !x.done).length : 0
    if (left > 0) parts.push(fill(r.wb_todos, { n: left }))
  } catch { /* ignore */ }
  return parts.length ? parts.join(' · ') : r.wb_focus_plain
}

function homeLine(r: RetentionCopy): string {
  // Deliberately streak-free: Come Home never counts days.
  const stars = loadSky().length
  return stars > 0 ? fill(r.wb_home_stars, { n: stars }) : r.wb_home_plain
}

/** One gentle line for a returning visitor, built only from this browser's own storage. */
export function WelcomeBack({ surface, top }: { surface: Surface; top: number }) {
  const r = useCopy()
  const [line, setLine] = useState<string | null>(null)
  useEffect(() => {
    if (!isReturningVisit(surface)) { markSeen(surface); return }
    let hide: ReturnType<typeof setTimeout> | undefined
    const show = setTimeout(() => {
      setLine(surface === 'home' ? homeLine(r) : focusLine(r))
      markWelcomed(surface)
      markSeen(surface)
      analytics.custom('welcome_back_shown', { surface })
      hide = setTimeout(() => setLine(null), 7000)
    }, 1200)
    return () => { clearTimeout(show); if (hide) clearTimeout(hide) }
  // copy changes (late language chunk) must not re-run the visit check
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surface])
  if (!line) return null
  return (
    <div className="rt" data-tone={surface}>
      <style>{CSS}</style>
      <div className="rt-wb" role="status" data-rt="welcome-back" style={{ top, zIndex: surface === 'home' ? 31 : 12 }} onClick={() => setLine(null)}>
        <b>{surface === 'home' ? '🌙' : '👋'} {r.wb_hello}</b>
        <span>{line}</span>
      </div>
    </div>
  )
}
