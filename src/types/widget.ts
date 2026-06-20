export interface AmbientTrack {
  id: string
  label: string
  emoji: string
  src: string // path to /public/sounds/*.mp3
  volume: number // 0-1
  enabled: boolean
}

export interface LofiStream {
  id: string
  label: string
  youtubeId: string // YouTube video or playlist ID
  thumbnail: string
}

export interface WidgetConfig {
  // Background
  backgroundType: 'gif' | 'url' | 'color'
  backgroundValue: string // GIF URL or hex color
  backgroundOpacity: number // 0-100

  // Audio
  lofiStreamId: string
  lofiVolume: number // 0-1
  ambientTracks: Record<string, { volume: number; enabled: boolean }>

  // Overlays
  showClock: boolean
  clockFormat: '12h' | '24h'
  showPomodoro: boolean
  pomodoroWork: number // minutes
  pomodoroBreak: number // minutes

  // UI
  theme: 'dark' | 'light'
  accentColor: string // hex
}

export type WidgetConfigKey = keyof WidgetConfig
