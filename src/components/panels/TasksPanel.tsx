'use client'

import { useState, useEffect, useRef } from 'react'

interface Task { id: string; text: string; done: boolean }

interface TasksPanelProps {
  accent?: string
}

export function TasksPanel({ accent = '#a78bfa' }: TasksPanelProps) {
  const [tasks, setTasks]   = useState<Task[]>([])
  const [input, setInput]   = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try { setTasks(JSON.parse(localStorage.getItem('fl-tasks') || '[]')) } catch(_) {}
  }, [])

  const save = (list: Task[]) => {
    setTasks(list)
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => localStorage.setItem('fl-tasks', JSON.stringify(list)), 400)
  }

  const add = () => {
    if (!input.trim()) return
    save([...tasks, { id: Date.now().toString(), text: input.trim(), done: false }])
    setInput('')
    inputRef.current?.focus()
  }

  const toggle = (id: string) => save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = (id: string) => save(tasks.filter(t => t.id !== id))
  const clearDone = () => save(tasks.filter(t => !t.done))

  const done  = tasks.filter(t => t.done).length
  const total = tasks.length

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10, color: '#4a4c60', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tasks</div>
        {total > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: accent, fontWeight: 600 }}>{done}/{total}</span>
            {done > 0 && (
              <button onClick={clearDone} style={{
                fontSize: 10, color: '#4a4c60', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}>
                Clear done
              </button>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a task…"
          style={{
            flex: 1, padding: '9px 12px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, color: '#e0e0f0', fontSize: 12, outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button onClick={add} style={{
          width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${total > 0 ? (done/total)*100 : 0}%`,
            background: `linear-gradient(90deg, ${accent}, #4ade80)`,
            borderRadius: 2, transition: 'width 0.4s ease',
          }} />
        </div>
      )}

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, maxHeight: 240, overflowY: 'auto' }}>
        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#2e3050', fontSize: 12 }}>
            No tasks yet. Add something to focus on!
          </div>
        )}

        {tasks.map(t => (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
            borderRadius: 9, background: t.done ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${t.done ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
            transition: 'all .15s',
          }}>
            <button
              onClick={() => toggle(t.id)}
              style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0, cursor: 'pointer',
                border: `1.5px solid ${t.done ? accent : 'rgba(255,255,255,0.2)'}`,
                background: t.done ? accent : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}
            >
              {t.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round"><path d="M5 12l5 5L20 6"/></svg>}
            </button>
            <span style={{
              flex: 1, fontSize: 12, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              color: t.done ? '#2e3050' : '#c8cae0',
              textDecoration: t.done ? 'line-through' : 'none',
            }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', color: '#2e3050', padding: 2, flexShrink: 0,
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
