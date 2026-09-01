/** Single source of truth for lofi music streams used in both workspace and embed */
export interface LofiStream {
  id: string
  label: string
  youtubeId: string
}

export const LOFI_STREAMS: LofiStream[] = [
  { id: 'lofi1', label: 'Lofi Hip-Hop Radio', youtubeId: 'jfKfPfyJRdk' }, // Lofi Girl — stable long-running stream
  { id: 'lofi2', label: 'Synthwave Chill',    youtubeId: '4xDzrJKXOOY' }, // verified working
  { id: 'lofi4', label: 'Chillhop Radio',     youtubeId: '7NOSDKb0HlU' }, // Chillhop Music — stable long-running stream
]

// Ambient beds are generated in-browser with the Web Audio API (see buildSynthGraph in
// EmbedClient) — there are no .mp3 assets to ship or 404 on.
export const AMBIENT_SOUNDS = [
  { id: 'rain',    label: 'Rain',        icon: '🌧️' },
  { id: 'wave',    label: 'Ocean Waves', icon: '🌊' },
  { id: 'cafe',    label: 'Café',        icon: '☕' },
  { id: 'fire',    label: 'Campfire',    icon: '🔥' },
  { id: 'wind',    label: 'Wind',        icon: '🍃' },
  { id: 'thunder', label: 'Thunder',     icon: '⛈️' },
  { id: 'forest',  label: 'Forest',      icon: '🌳' },
  { id: 'city',    label: 'City',        icon: '🏙️' },
] as const

export type AmbientId = typeof AMBIENT_SOUNDS[number]['id']

export const AMBIENT_ICONS: Record<string, string> = {
  rain: '🌧️', wave: '🌊', cafe: '☕', fire: '🔥',
  wind: '🍃', thunder: '⛈️', forest: '🌳', city: '🏙️',
}
