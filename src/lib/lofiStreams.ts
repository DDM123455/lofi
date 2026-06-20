/** Single source of truth for lofi music streams used in both workspace and embed */
export interface LofiStream {
  id: string
  label: string
  youtubeId: string
}

export const LOFI_STREAMS: LofiStream[] = [
  { id: 'lofi1', label: 'Lofi Girl – Study',  youtubeId: 'jfKfPfyJRdk' },
  { id: 'lofi2', label: 'Synthwave Chill',    youtubeId: '4xDzrJKXOOY' },
  { id: 'lofi3', label: 'Jazz Lofi Sleep',    youtubeId: 'Na0w3Mz46GA' },
  { id: 'lofi4', label: 'Chillhop Radio',     youtubeId: '7NOSDKb0HlU' },
  { id: 'lofi5', label: 'Tokyo Night Lofi',   youtubeId: 'lTRiuFIWV54' },
]

export const AMBIENT_SOUNDS = [
  { id: 'rain',    label: 'Mưa rơi',    icon: '🌧️', file: '/sounds/rain.mp3'    },
  { id: 'wave',    label: 'Sóng biển',  icon: '🌊', file: '/sounds/waves.mp3'   },
  { id: 'cafe',    label: 'Quán cafe',  icon: '☕', file: '/sounds/cafe.mp3'    },
  { id: 'fire',    label: 'Lửa trại',   icon: '🔥', file: '/sounds/fire.mp3'    },
  { id: 'wind',    label: 'Gió thổi',   icon: '🍃', file: '/sounds/wind.mp3'    },
  { id: 'thunder', label: 'Sấm sét',    icon: '⛈️', file: '/sounds/thunder.mp3' },
  { id: 'forest',  label: 'Rừng cây',   icon: '🌳', file: '/sounds/forest.mp3'  },
  { id: 'city',    label: 'Thành phố',  icon: '🏙️', file: '/sounds/city.mp3'    },
] as const

export type AmbientId = typeof AMBIENT_SOUNDS[number]['id']

export const AMBIENT_ICONS: Record<string, string> = {
  rain: '🌧️', wave: '🌊', cafe: '☕', fire: '🔥',
  wind: '🍃', thunder: '⛈️', forest: '🌳', city: '🏙️',
}
