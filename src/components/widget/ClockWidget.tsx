'use client'

import { useState, useEffect } from 'react'

interface ClockWidgetProps {
  format: '12h' | '24h'
  accentColor?: string
}

export function ClockWidget({ format, accentColor = '#a78bfa' }: ClockWidgetProps) {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: format === '12h',
        })
      )
      setDate(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [format])

  return (
    <div className="text-center select-none">
      <div
        className="text-4xl font-light tabular-nums tracking-widest drop-shadow"
        style={{ color: accentColor }}
      >
        {time}
      </div>
      <div className="mt-1 text-xs text-white/50 tracking-wider">{date}</div>
    </div>
  )
}
