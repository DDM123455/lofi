import type { WidgetConfig } from '@/types/widget'
import { DEFAULT_AMBIENT_TRACKS, LOFI_STREAMS } from './youtubeStreams'

export const DEFAULT_WIDGET_CONFIG: WidgetConfig = {
  backgroundType: 'gif',
  backgroundValue: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
  backgroundOpacity: 90,
  lofiStreamId: 'lofi-girl',
  lofiVolume: 0.7,
  ambientTracks: Object.fromEntries(
    DEFAULT_AMBIENT_TRACKS.map((t) => [t.id, { volume: t.volume, enabled: t.enabled }])
  ),
  showClock: true,
  clockFormat: '24h',
  showPomodoro: false,
  pomodoroWork: 25,
  pomodoroBreak: 5,
  theme: 'dark',
  accentColor: '#a78bfa',
}

/** Serialize config → compact URL search params string */
export function serializeConfig(config: WidgetConfig): string {
  const params = new URLSearchParams()

  params.set('bg', config.backgroundType[0]) // g/u/c
  params.set('bgv', encodeURIComponent(config.backgroundValue))
  params.set('bgo', String(config.backgroundOpacity))
  params.set('ls', config.lofiStreamId)
  params.set('lv', String(Math.round(config.lofiVolume * 100)))
  params.set('clk', config.showClock ? '1' : '0')
  params.set('clf', config.clockFormat === '24h' ? '1' : '0')
  params.set('pom', config.showPomodoro ? '1' : '0')
  params.set('pw', String(config.pomodoroWork))
  params.set('pb', String(config.pomodoroBreak))
  params.set('th', config.theme[0]) // d/l
  params.set('ac', config.accentColor.replace('#', ''))

  // Ambient: only encode enabled tracks + volumes
  const enabledTracks = Object.entries(config.ambientTracks)
    .filter(([, v]) => v.enabled)
    .map(([id, v]) => `${id}:${Math.round(v.volume * 100)}`)
    .join(',')

  if (enabledTracks) params.set('at', enabledTracks)

  return params.toString()
}

/** Deserialize URL search params → config (merges with defaults) */
export function deserializeConfig(search: string): WidgetConfig {
  const params = new URLSearchParams(search)
  const config = structuredClone(DEFAULT_WIDGET_CONFIG)

  const bgMap: Record<string, WidgetConfig['backgroundType']> = { g: 'gif', u: 'url', c: 'color' }
  const bg = params.get('bg')
  if (bg && bgMap[bg]) config.backgroundType = bgMap[bg]

  const bgv = params.get('bgv')
  if (bgv) config.backgroundValue = decodeURIComponent(bgv)

  const bgo = params.get('bgo')
  if (bgo) config.backgroundOpacity = Math.min(100, Math.max(0, parseInt(bgo)))

  const ls = params.get('ls')
  if (ls && LOFI_STREAMS.find((s) => s.id === ls)) config.lofiStreamId = ls

  const lv = params.get('lv')
  if (lv) config.lofiVolume = Math.min(100, Math.max(0, parseInt(lv))) / 100

  config.showClock = params.get('clk') !== '0'
  config.clockFormat = params.get('clf') === '0' ? '12h' : '24h'
  config.showPomodoro = params.get('pom') === '1'

  const pw = params.get('pw')
  if (pw) config.pomodoroWork = Math.min(60, Math.max(1, parseInt(pw)))

  const pb = params.get('pb')
  if (pb) config.pomodoroBreak = Math.min(30, Math.max(1, parseInt(pb)))

  const th = params.get('th')
  config.theme = th === 'l' ? 'light' : 'dark'

  const ac = params.get('ac')
  if (ac) config.accentColor = '#' + ac

  const at = params.get('at')
  if (at) {
    at.split(',').forEach((entry) => {
      const [id, vol] = entry.split(':')
      if (id && vol && config.ambientTracks[id] !== undefined) {
        config.ambientTracks[id] = {
          volume: Math.min(100, Math.max(0, parseInt(vol))) / 100,
          enabled: true,
        }
      }
    })
  }

  return config
}
