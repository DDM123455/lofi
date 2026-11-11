import { BG_PRESETS, type BgPreset } from './backgrounds'

/**
 * "My rooms" — named snapshots of a workspace setup (scene, music, ambient mix, look) the
 * visitor can reopen in one tap, plus a rotating "scene of the week". Everything lives in this
 * browser's localStorage: no accounts, nothing sent anywhere.
 */

export interface Room {
  id: string
  name: string
  bgUrl: string
  bgOpacity: number
  bgBlur: number
  atmosphere: string
  lofiId: string
  customLofiId: string
  lofiVol: number
  ambVols: Record<string, number>
  savedAt: number
}

const ROOMS_KEY = 'lofispace-rooms'
const SOW_SEEN_KEY = 'lofispace-sow-seen'
export const MAX_ROOMS = 6

export function loadRooms(): Room[] {
  try {
    const raw = JSON.parse(localStorage.getItem(ROOMS_KEY) || '[]')
    return Array.isArray(raw) ? raw.filter(r => r && typeof r.id === 'string' && typeof r.bgUrl === 'string').slice(0, MAX_ROOMS) : []
  } catch { return [] }
}

export function saveRooms(rooms: Room[]) {
  try { localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms.slice(0, MAX_ROOMS))) } catch { /* storage full / blocked */ }
}

export function newRoomId(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
}

/** Monday-based week number since the Unix epoch, in local time — stable for a whole week. */
export function weekIndex(d = new Date()): number {
  const local = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
  // 1970-01-05 was a Monday
  return Math.floor((local - Date.UTC(1970, 0, 5)) / (7 * 864e5))
}

/** Rotates through every preset, one per week, the same for every visitor. */
export function sceneOfWeek(d = new Date()): BgPreset {
  const presets = BG_PRESETS
  return presets[((weekIndex(d) * 7) % presets.length + presets.length) % presets.length]
}

export function sceneOfWeekSeen(d = new Date()): boolean {
  try { return localStorage.getItem(SOW_SEEN_KEY) === String(weekIndex(d)) } catch { return true }
}

export function markSceneOfWeekSeen(d = new Date()) {
  try { localStorage.setItem(SOW_SEEN_KEY, String(weekIndex(d))) } catch { /* ignore */ }
}
