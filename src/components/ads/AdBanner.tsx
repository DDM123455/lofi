'use client'

import { useEffect, useRef } from 'react'

interface Props {
  slot: string
  format?: 'auto' | 'horizontal' | 'rectangle'
  style?: React.CSSProperties
  className?: string
}

const PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID

export function AdBanner({ slot, format = 'auto', style, className }: Props) {
  const insRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!PUB_ID || pushed.current || !insRef.current) return
    pushed.current = true
    try {
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch (_) {}
  }, [])

  // Dev: hiện placeholder để biết vị trí ad
  if (!PUB_ID) {
    if (process.env.NODE_ENV !== 'production') {
      return (
        <div
          className={className}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 72,
            borderRadius: 12,
            border: '1px dashed rgba(167,139,250,0.25)',
            fontSize: 11,
            color: 'rgba(167,139,250,0.4)',
            ...style,
          }}
        >
          Ad slot: {slot} — thêm NEXT_PUBLIC_ADSENSE_PUB_ID để bật
        </div>
      )
    }
    return null
  }

  return (
    <div className={className} style={{ overflow: 'hidden', ...style }}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
