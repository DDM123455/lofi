'use client'

import { useEffect, useState } from 'react'

interface ChatBubbleProps {
  message: string
  accent?: string
}

export function ChatBubble({ message, accent = '#a78bfa' }: ChatBubbleProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Mount animation
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [message])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '-8px' : '4px'})`,
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 20,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        marginBottom: 6,
      }}
    >
      <div
        style={{
          background: 'rgba(18,20,36,0.94)',
          border: `1px solid ${accent}50`,
          borderRadius: 14,
          padding: '8px 14px',
          fontSize: 13,
          fontWeight: 600,
          color: '#f0f0ff',
          fontFamily: "'Outfit', system-ui, sans-serif",
          boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20`,
          backdropFilter: 'blur(12px)',
          position: 'relative',
        }}
      >
        {message}
        {/* Tail */}
        <div style={{
          position: 'absolute',
          bottom: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `8px solid rgba(18,20,36,0.94)`,
        }} />
      </div>
    </div>
  )
}
