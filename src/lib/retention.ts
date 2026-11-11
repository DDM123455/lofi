/**
 * No-backend retention helpers: install / bookmark nudge, "add to calendar" reminders and the
 * "welcome back" snapshot. Everything lives in this browser's localStorage — no accounts, no
 * server, nothing personal sent anywhere (analytics events carry only coarse, anonymous labels).
 *
 * Imported statically by the workspace so the `beforeinstallprompt` listener is registered as
 * early as possible, and so the visit snapshot is read before any effect writes to storage.
 */

import { localDate } from './gameStore'

export type Surface = 'focus' | 'home'

// ── Install prompt capture ────────────────────────────────────────────────────
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferredPrompt: BeforeInstallPromptEvent | null = null
const installListeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', e => {
    // Hold the browser's prompt for a happy moment instead of interrupting the first visit.
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
    installListeners.forEach(fn => fn())
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    markNudgeDone()
    installListeners.forEach(fn => fn())
  })
}

export function onInstallAvailabilityChange(fn: () => void): () => void {
  installListeners.add(fn)
  return () => { installListeners.delete(fn) }
}

/** Shows the browser's native install dialog. Resolves to whether the person accepted. */
export async function promptInstall(): Promise<boolean | null> {
  const p = deferredPrompt
  if (!p) return null
  deferredPrompt = null // a captured prompt can only be used once
  await p.prompt()
  const { outcome } = await p.userChoice
  return outcome === 'accepted'
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(display-mode: standalone)').matches
    || (navigator as Navigator & { standalone?: boolean }).standalone === true
}

function inIframe(): boolean {
  try { return window.self !== window.top } catch { return true }
}

export type InstallKind = 'prompt' | 'ios' | 'menu' | 'bookmark'

/** How this browser can keep the app one tap away. */
export function installKind(): InstallKind {
  if (deferredPrompt) return 'prompt'
  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (iOS) return 'ios'
  if (/Android|Mobi/i.test(ua)) return 'menu'
  return 'bookmark'
}

export function isMac(): boolean {
  return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
}

// ── Nudge eligibility ─────────────────────────────────────────────────────────
const NUDGE_KEY = 'lofispace-nudge'
const REASK_MS = 14 * 86400000
/** n = times dismissed ("not now"), imp = times shown, done = installed / reminder added. */
interface NudgeState { n: number; at: number; imp?: number; done?: boolean }
/** Shown-but-ignored this many times counts as a "not now". */
const MAX_IGNORED = 3

function readNudge(): NudgeState {
  try {
    const s = JSON.parse(localStorage.getItem(NUDGE_KEY) || 'null')
    if (s && typeof s.n === 'number') return s
  } catch { /* ignore */ }
  return { n: 0, at: 0 }
}
function writeNudge(s: NudgeState) {
  try { localStorage.setItem(NUDGE_KEY, JSON.stringify(s)) } catch { /* ignore */ }
}

let nudgeShownThisPage = false

/**
 * The card is offered at most once per page load, never inside an embed (Notion etc.), never
 * when already installed, and — after a "not now" — asked again at most once, 14 days later.
 */
export function canShowNudge(): boolean {
  if (typeof window === 'undefined' || nudgeShownThisPage) return false
  if (isStandalone() || inIframe()) return false
  const s = readNudge()
  if (s.done) return false
  if (s.n === 0) return (s.imp ?? 0) < MAX_IGNORED
  return s.n === 1 && Date.now() - s.at >= REASK_MS
}
export function markNudgeShown() {
  nudgeShownThisPage = true
  const s = readNudge()
  const imp = (s.imp ?? 0) + 1
  // The one re-ask after 14 days is used up by being shown; ignoring it ends the asking.
  if (s.n >= 1) writeNudge({ ...s, n: 2, imp })
  else if (imp >= MAX_IGNORED) writeNudge({ n: 1, at: Date.now(), imp })
  else writeNudge({ ...s, imp })
}
export function dismissNudge() {
  const s = readNudge()
  writeNudge({ ...s, n: Math.max(s.n, 1) + (s.n >= 1 ? 1 : 0), at: Date.now() })
}
/** Installed or reminder added — the card has done its job; never ask again. */
export function markNudgeDone() {
  writeNudge({ ...readNudge(), done: true, at: Date.now() })
}

// ── Calendar reminder ─────────────────────────────────────────────────────────
export interface ReminderEvent {
  title: string
  description: string
  /** "HH:MM", local time */
  time: string
  minutes: number
  url: string
}

export const DEFAULT_TIME: Record<Surface, string> = { focus: '20:00', home: '22:00' }
const TIME_KEY = 'lofispace-reminder-time'

export function savedReminderTime(surface: Surface): string {
  try {
    const t = JSON.parse(localStorage.getItem(TIME_KEY) || '{}')?.[surface]
    if (typeof t === 'string' && /^\d{2}:\d{2}$/.test(t)) return t
  } catch { /* ignore */ }
  return DEFAULT_TIME[surface]
}
export function saveReminderTime(surface: Surface, time: string) {
  try {
    const all = JSON.parse(localStorage.getItem(TIME_KEY) || '{}') || {}
    localStorage.setItem(TIME_KEY, JSON.stringify({ ...all, [surface]: time }))
  } catch { /* ignore */ }
}

export function reminderUrl(surface: Surface): string {
  const u = new URL('/workspace', window.location.origin)
  if (surface === 'home') u.searchParams.set('mode', 'home')
  u.searchParams.set('utm_source', 'calendar')
  u.searchParams.set('utm_medium', 'reminder')
  return u.toString()
}

const pad = (n: number) => String(n).padStart(2, '0')
/** Floating local time (no Z / TZID): the reminder stays at 20:00 wherever the person is. */
const stamp = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
const utcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

/** Next occurrence of HH:MM — today if it's still ahead, otherwise tomorrow. */
export function nextOccurrence(time: string, now = new Date()): Date {
  const [h, m] = time.split(':').map(n => parseInt(n, 10) || 0)
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0)
  if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 1)
  return d
}

export function googleCalendarUrl(ev: ReminderEvent, now = new Date()): string {
  const start = nextOccurrence(ev.time, now)
  const end = new Date(start.getTime() + ev.minutes * 60000)
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    details: `${ev.description}\n${ev.url}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    recur: 'RRULE:FREQ=DAILY',
  })
  try { p.set('ctz', Intl.DateTimeFormat().resolvedOptions().timeZone) } catch { /* ignore */ }
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}

const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

/** RFC 5545 line folding: at most 75 octets per line, continuation lines start with a space. */
function fold(line: string): string {
  const enc = new TextEncoder()
  const out: string[] = []
  let cur = ''
  let bytes = 0
  for (const ch of line) {
    const b = enc.encode(ch).length
    if (bytes + b > (out.length ? 74 : 75)) { out.push(cur); cur = ''; bytes = 0 }
    cur += ch; bytes += b
  }
  out.push(cur)
  return out.join('\r\n ')
}

export function buildIcs(ev: ReminderEvent, now = new Date()): string {
  const start = nextOccurrence(ev.time, now)
  const end = new Date(start.getTime() + ev.minutes * 60000)
  const uid = `${utcStamp(now)}-${Math.random().toString(36).slice(2, 10)}@focusworkspace.app`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LofiSpace//Daily reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    'RRULE:FREQ=DAILY',
    `SUMMARY:${icsText(ev.title)}`,
    `DESCRIPTION:${icsText(`${ev.description}\n${ev.url}`)}`,
    `URL:${ev.url}`,
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${icsText(ev.title)}`,
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.map(fold).join('\r\n') + '\r\n'
}

export function downloadIcs(ev: ReminderEvent, filename: string) {
  const blob = new Blob([buildIcs(ev)], { type: 'text/calendar;charset=utf-8' })
  const href = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(href), 4000)
}

// ── "Welcome back" visit snapshot ─────────────────────────────────────────────
const SEEN_KEY = 'lofispace-seen'
const WB_KEY = 'lofispace-wb-day'
const RETURN_GAP_MS = 6 * 3600000

interface Boot {
  seen: Partial<Record<Surface, number>>
  wbDay: Partial<Record<Surface, string>>
  /** Signals for people who visited before this feature shipped. */
  legacyFocus: boolean
  legacyHome: boolean
}

function readJson<T>(key: string, fallback: T): T {
  try { const v = JSON.parse(localStorage.getItem(key) || 'null'); return v && typeof v === 'object' ? v : fallback } catch { return fallback }
}

function readBoot(): Boot {
  const today = localDate()
  let legacyFocus = false
  try {
    const st = readJson<{ state?: { lastActiveDate?: string | null; dailyStats?: Record<string, unknown> } }>('focuslofi-v1', {}).state
    const days = Object.keys(st?.dailyStats ?? {})
    legacyFocus = !!localStorage.getItem('lofispace-onboarded')
      && ((!!st?.lastActiveDate && st.lastActiveDate < today) || days.some(d => d < today))
  } catch { /* ignore */ }
  let legacyHome = false
  try { legacyHome = (parseInt(localStorage.getItem('comehome-visits') || '0', 10) || 0) > 0 } catch { /* ignore */ }
  return { seen: readJson(SEEN_KEY, {}), wbDay: readJson(WB_KEY, {}), legacyFocus, legacyHome }
}

// Read once, when this module first loads — before React effects record today's visit.
const BOOT: Boot | null = typeof window !== 'undefined' ? readBoot() : null

/** True when this is a returning visit to `surface` that hasn't been greeted yet today. */
export function isReturningVisit(surface: Surface): boolean {
  // Never inside an embed (Notion, blogs): a greeting there is noise for whoever reads the page.
  if (!BOOT || inIframe()) return false
  const today = localDate()
  // Live read too: switching modes remounts the greeter, which must not greet twice a day.
  if (BOOT.wbDay[surface] === today || readJson<Partial<Record<Surface, string>>>(WB_KEY, {})[surface] === today) return false
  const last = BOOT.seen[surface]
  if (typeof last === 'number') {
    return localDate(new Date(last)) !== today || Date.now() - last >= RETURN_GAP_MS
  }
  return surface === 'focus' ? BOOT.legacyFocus : BOOT.legacyHome
}

export function markSeen(surface: Surface) {
  const all = readJson<Partial<Record<Surface, number>>>(SEEN_KEY, {})
  try { localStorage.setItem(SEEN_KEY, JSON.stringify({ ...all, [surface]: Date.now() })) } catch { /* ignore */ }
}

export function markWelcomed(surface: Surface) {
  const all = readJson<Partial<Record<Surface, string>>>(WB_KEY, {})
  try { localStorage.setItem(WB_KEY, JSON.stringify({ ...all, [surface]: localDate() })) } catch { /* ignore */ }
}

/** Focus minutes of the most recent day before today that had any, and whether that was yesterday. */
export function lastFocusDay(dailyStats: Record<string, { focusSeconds?: number }>): { minutes: number; yesterday: boolean } | null {
  const today = localDate()
  const yesterday = localDate(new Date(Date.now() - 86400000))
  const day = Object.keys(dailyStats).filter(d => d < today && (dailyStats[d]?.focusSeconds ?? 0) >= 60).sort().pop()
  if (!day) return null
  return { minutes: Math.round((dailyStats[day].focusSeconds ?? 0) / 60), yesterday: day === yesterday }
}
