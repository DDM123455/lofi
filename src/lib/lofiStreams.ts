/** Single source of truth for lofi music streams used in both workspace and embed */
export interface LofiStream {
  id: string
  label: string
  youtubeId: string
}

export const LOFI_STREAMS: LofiStream[] = [
  { id: 'lofi2', label: 'Synthwave Chill',    youtubeId: '4xDzrJKXOOY' },
  { id: 'lofi4', label: 'Chillhop Radio',     youtubeId: '7NOSDKb0HlU' },
]

export const AMBIENT_SOUNDS = [
  { id: 'rain',    label: 'Rain',        icon: '🌧️', file: '/sounds/rain.mp3'    },
  { id: 'wave',    label: 'Ocean Waves', icon: '🌊', file: '/sounds/waves.mp3'   },
  { id: 'cafe',    label: 'Café',        icon: '☕', file: '/sounds/cafe.mp3'    },
  { id: 'fire',    label: 'Campfire',    icon: '🔥', file: '/sounds/fire.mp3'    },
  { id: 'wind',    label: 'Wind',        icon: '🍃', file: '/sounds/wind.mp3'    },
  { id: 'thunder', label: 'Thunder',     icon: '⛈️', file: '/sounds/thunder.mp3' },
  { id: 'forest',  label: 'Forest',      icon: '🌳', file: '/sounds/forest.mp3'  },
  { id: 'city',    label: 'City',        icon: '🏙️', file: '/sounds/city.mp3'    },
] as const

export type AmbientId = typeof AMBIENT_SOUNDS[number]['id']

export const AMBIENT_ICONS: Record<string, string> = {
  rain: '🌧️', wave: '🌊', cafe: '☕', fire: '🔥',
  wind: '🍃', thunder: '⛈️', forest: '🌳', city: '🏙️',
}
