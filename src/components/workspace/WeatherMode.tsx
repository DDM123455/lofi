'use client'

import { useState, useCallback } from 'react'
import { SCENES, weatherCodeToSceneId, WMO_DESCRIPTIONS, sceneToWorkspaceUrl } from '@/lib/scenes'

interface WeatherData {
  city: string
  temp: number
  code: number
  description: string
  sceneId: string
}

export interface DetectedWeather { city: string; temp: number; desc: string; emoji: string }

interface Props {
  onApplyScene: (sceneId: string) => void
  accentColor: string
  onDetected?: (w: DetectedWeather) => void
}

export function WeatherMode({ onApplyScene, accentColor, onDetected }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [applied, setApplied] = useState(false)

  const detect = useCallback(async () => {
    setState('loading')
    setApplied(false)

    try {
      // 1. Get geolocation
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 })
      )
      const { latitude: lat, longitude: lon } = pos.coords

      // 2. Fetch weather from Open-Meteo (free, no API key)
      const [weatherRes, geoRes] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m&timezone=auto`),
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=vi`),
      ])

      const weatherJson = await weatherRes.json()
      const geoJson = await geoRes.json()

      const code: number = weatherJson.current.weather_code
      const temp: number = Math.round(weatherJson.current.temperature_2m)
      const hour = new Date().getHours()
      const city: string =
        geoJson.address?.city ||
        geoJson.address?.town ||
        geoJson.address?.state ||
        'Vị trí của bạn'

      const sceneId = weatherCodeToSceneId(code, hour)
      const description = WMO_DESCRIPTIONS[code] ?? 'Thời tiết đặc biệt'

      const emoji = code>=95?'⛈️':code>=80?'🌧️':code>=71?'❄️':code>=51?'🌦️':code===45||code===48?'🌫️':code>=2?'☁️':'☀️'
      setWeather({ city, temp, code, description, sceneId })
      setState('done')
      onDetected?.({ city, temp, desc: description, emoji })
    } catch (err) {
      setState('error')
    }
  }, [onDetected])

  const apply = () => {
    if (!weather) return
    onApplyScene(weather.sceneId)
    setApplied(true)
  }

  const scene = weather ? SCENES.find(s => s.id === weather.sceneId) : null

  const weatherEmoji = (code: number) => {
    if (code >= 95) return '⛈️'
    if (code >= 80) return '🌧️'
    if (code >= 71) return '❄️'
    if (code >= 51) return '🌦️'
    if (code === 45 || code === 48) return '🌫️'
    if (code >= 2) return '☁️'
    return '☀️'
  }

  return (
    <div style={{
      background: '#0a0b14',
      border: '1px solid #1a1c2e',
      borderRadius: 12,
      padding: '14px 15px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B6E80', margin: 0, fontWeight: 600 }}>
          🌤️ Auto Weather Mode
        </p>
        {state === 'done' && (
          <span style={{ fontSize: 9, color: '#4ade80', background: '#0a2010', padding: '2px 7px', borderRadius: 10, border: '1px solid #1a4020' }}>
            Đã phát hiện
          </span>
        )}
      </div>

      {state === 'idle' && (
        <>
          <p style={{ fontSize: 11, color: '#4a4c70', margin: '0 0 10px', lineHeight: 1.5 }}>
            Tự động chọn scene phù hợp với <strong style={{ color: '#6B6E80' }}>thời tiết thực tế</strong> của bạn ngay lúc này.
          </p>
          <button
            onClick={detect}
            style={{
              width: '100%', padding: '9px 0', borderRadius: 8,
              border: `1px solid ${accentColor}40`,
              background: `${accentColor}15`,
              color: accentColor,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            📍 Phát hiện thời tiết của tôi
          </button>
        </>
      )}

      {state === 'loading' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            border: `2px solid ${accentColor}40`,
            borderTopColor: accentColor,
            animation: 'spin 0.8s linear infinite',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, color: '#6B6E80' }}>Đang đọc vị trí & thời tiết…</span>
        </div>
      )}

      {state === 'error' && (
        <div>
          <p style={{ fontSize: 11, color: '#f97316', margin: '0 0 8px', lineHeight: 1.5 }}>
            ⚠ Không thể truy cập vị trí. Hãy cho phép trình duyệt dùng GPS.
          </p>
          <button onClick={() => setState('idle')} style={{ fontSize: 11, color: '#6B6E80', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
            Thử lại
          </button>
        </div>
      )}

      {state === 'done' && weather && scene && (
        <div>
          {/* Weather info */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#060810', borderRadius: 10, padding: '10px 12px',
            marginBottom: 10, border: '1px solid #12142a',
          }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{weatherEmoji(weather.code)}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>
                {weather.city} · {weather.temp}°C
              </div>
              <div style={{ fontSize: 11, color: '#6B6E80', marginTop: 2 }}>
                {weather.description}
              </div>
            </div>
          </div>

          {/* Recommended scene */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: `${accentColor}10`, borderRadius: 10, padding: '10px 12px',
            marginBottom: 10, border: `1px solid ${accentColor}20`,
          }}>
            <span style={{ fontSize: 22 }}>{scene.emoji}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>
                {scene.nameVi}
              </div>
              <div style={{ fontSize: 10, color: '#6B6E80', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {scene.ambientTracks.map(t => {
                  const icons: Record<string,string> = { rain:'🌧',wave:'🌊',cafe:'☕',fire:'🔥',wind:'🍃',thunder:'⛈️',forest:'🌳',city:'🏙️' }
                  return icons[t.id] ?? ''
                }).join(' ')} · {scene.name}
              </div>
            </div>
            <span style={{ fontSize: 10, color: accentColor, fontWeight: 600 }}>Gợi ý</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={apply}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                background: applied ? '#1a3a20' : accentColor,
                color: applied ? '#4ade80' : '#fff',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {applied ? '✓ Đã áp dụng!' : '✨ Áp dụng Scene này'}
            </button>
            <button
              onClick={() => { setState('idle'); setWeather(null) }}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #1e2035', background: 'transparent', color: '#6B6E80', fontSize: 12, cursor: 'pointer' }}
            >
              ↺
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
