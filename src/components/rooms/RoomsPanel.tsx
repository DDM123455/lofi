'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { getBgPresetByUrl, type BgPreset } from '@/lib/backgrounds'
import type { Lang } from '@/lib/i18n'
import { loadRooms, markSceneOfWeekSeen, MAX_ROOMS, newRoomId, saveRooms, sceneOfWeek, type Room } from '@/lib/rooms'
import { ROOMS_COPY } from './copy'

export type RoomSnapshot = Omit<Room, 'id' | 'name' | 'savedAt'>

const label: CSSProperties = { fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--dim2)', marginBottom: 8 }

function roomEmoji(r: Pick<Room, 'bgUrl'>) {
  return getBgPresetByUrl(r.bgUrl)?.emoji ?? '🎧'
}

/** Top of the background popover: this week's featured scene + the visitor's saved rooms. */
export function RoomsPanel({ lang, accent, accentSoft, snapshot, onApply, onTryScene }: {
  lang: Lang
  accent: string
  accentSoft: string
  /** The current workspace setup, read when "Save" is pressed. */
  snapshot: () => RoomSnapshot
  onApply: (room: Room) => void
  onTryScene: (preset: BgPreset) => void
}) {
  const c = ROOMS_COPY[lang] ?? ROOMS_COPY.en
  // Only mounted client-side (inside a popover), so localStorage can be read up front.
  const [rooms, setRooms] = useState<Room[]>(loadRooms)
  const [naming, setNaming] = useState(false)
  const [name, setName] = useState('')
  const [justSaved, setJustSaved] = useState<string | null>(null)
  const sow = sceneOfWeek()
  const current = snapshot()

  useEffect(() => { markSceneOfWeekSeen() }, [])

  const save = () => {
    const snap = snapshot()
    const preset = getBgPresetByUrl(snap.bgUrl)
    const room: Room = { ...snap, id: newRoomId(), name: name.trim().slice(0, 40) || preset?.label || c.rooms_title, savedAt: Date.now() }
    const next = [room, ...rooms].slice(0, MAX_ROOMS)
    setRooms(next); saveRooms(next)
    setNaming(false); setName(''); setJustSaved(room.id)
  }
  const remove = (id: string) => {
    const next = rooms.filter(r => r.id !== id)
    setRooms(next); saveRooms(next)
  }

  const chip: CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, padding: '9px 10px', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--input)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Scene of the week */}
      <div style={label}>{c.sow_title}</div>
      <button
        onClick={() => { onTryScene(sow) }}
        style={{ ...chip, width: '100%', marginBottom: 16, padding: '12px 14px', background: `linear-gradient(135deg, ${sow.gradient[0]}, ${sow.gradient[1]})`, borderColor: current.bgUrl === sow.url ? accent : 'var(--border)' }}
      >
        <span style={{ fontSize: 22, lineHeight: 1 }}>{sow.emoji}</span>
        <span style={{ flex: 1, fontSize: 13 }}>{sow.label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 9px', borderRadius: 999, background: current.bgUrl === sow.url ? 'transparent' : accent, color: current.bgUrl === sow.url ? accent : '#16121f' }}>
          {current.bgUrl === sow.url ? c.sow_on : c.sow_try}
        </span>
      </button>

      {/* My rooms */}
      <div style={label}>{c.rooms_title}</div>
      {rooms.length === 0 && !naming && <p style={{ fontSize: 11.5, color: 'var(--dim)', margin: '0 0 10px', lineHeight: 1.5 }}>{c.rooms_empty}</p>}
      {rooms.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          {rooms.map(r => (
            <div key={r.id} style={{ position: 'relative', minWidth: 0 }}>
              <button onClick={() => { onApply(r) }} style={{ ...chip, width: '100%', paddingRight: 28, borderColor: justSaved === r.id ? accent : 'var(--border)' }} title={r.name}>
                <span style={{ fontSize: 17, lineHeight: 1 }}>{roomEmoji(r)}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
              </button>
              <button onClick={() => remove(r.id)} aria-label={`${c.rooms_delete}: ${r.name}`} title={c.rooms_delete}
                style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 6, background: 'transparent', color: 'var(--dim2)', cursor: 'pointer', fontSize: 13 }}>×</button>
            </div>
          ))}
        </div>
      )}
      {naming ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <input autoFocus value={name} onChange={e => setName(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setNaming(false) }}
            placeholder={c.rooms_name_ph} maxLength={40}
            style={{ flex: 1, minWidth: 0, padding: '9px 11px', border: '1px solid var(--border)', background: 'var(--input)', color: 'var(--text)', borderRadius: 11, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
          <button onClick={save} style={{ padding: '0 14px', border: 'none', borderRadius: 11, background: accent, color: '#16121f', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>✓</button>
        </div>
      ) : rooms.length >= MAX_ROOMS ? (
        <p style={{ fontSize: 11, color: 'var(--dim2)', margin: 0 }}>{c.rooms_full}</p>
      ) : (
        <button onClick={() => setNaming(true)} style={{ ...chip, width: '100%', justifyContent: 'center', background: accentSoft, color: accent, borderColor: 'transparent' }}>
          + {justSaved ? `${c.rooms_saved} ✓` : c.rooms_save}
        </button>
      )}
    </div>
  )
}

/** On the "tap to start" screen: one tap opens a saved room and starts the audio. */
export function StartRooms({ lang, onPick }: { lang: Lang; onPick: (room: Room) => void }) {
  const [rooms] = useState<Room[]>(loadRooms) // rendered only after the workspace has mounted
  if (!rooms.length) return null
  const c = ROOMS_COPY[lang] ?? ROOMS_COPY.en
  return (
    <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginTop: 6, maxWidth: 'min(520px, calc(100vw - 32px))' }}>
      <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.6)' }}>{c.rooms_start}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {rooms.slice(0, 4).map(r => (
          <button key={r.id} onClick={() => { onPick(r) }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, maxWidth: 220, padding: '8px 14px', border: '1px solid rgba(255,255,255,.22)', borderRadius: 999, background: 'rgba(20,16,30,.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', color: '#fff', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            <span aria-hidden>{roomEmoji(r)}</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
