import type { LofiStream, AmbientTrack } from '@/types/widget'

export const LOFI_STREAMS: LofiStream[] = [
  {
    id: 'lofi-girl',
    label: 'Lofi Girl - Study',
    youtubeId: 'jfKfPfyJRdk',
    thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/mqdefault.jpg',
  },
  {
    id: 'lofi-chill',
    label: 'Chillhop Radio',
    youtubeId: '7NOSDKb0HlU',
    thumbnail: 'https://img.youtube.com/vi/7NOSDKb0HlU/mqdefault.jpg',
  },
  {
    id: 'synthwave',
    label: 'Synthwave // Retrowave',
    youtubeId: '4xDzrJKXOOY',
    thumbnail: 'https://img.youtube.com/vi/4xDzrJKXOOY/mqdefault.jpg',
  },
  {
    id: 'jazz-hop',
    label: 'Jazz Hop Cafe',
    youtubeId: 'Dx5qFachd3A',
    thumbnail: 'https://img.youtube.com/vi/Dx5qFachd3A/mqdefault.jpg',
  },
  {
    id: 'tokyo-night',
    label: 'Tokyo Night Lo-fi',
    youtubeId: 'lTRiuFIWV54',
    thumbnail: 'https://img.youtube.com/vi/lTRiuFIWV54/mqdefault.jpg',
  },
]

export const DEFAULT_AMBIENT_TRACKS: AmbientTrack[] = [
  {
    id: 'rain',
    label: 'Rain',
    emoji: '🌧️',
    src: '/sounds/rain.mp3',
    volume: 0.5,
    enabled: false,
  },
  {
    id: 'cafe',
    label: 'Café',
    emoji: '☕',
    src: '/sounds/cafe.mp3',
    volume: 0.4,
    enabled: false,
  },
  {
    id: 'waves',
    label: 'Waves',
    emoji: '🌊',
    src: '/sounds/waves.mp3',
    volume: 0.5,
    enabled: false,
  },
  {
    id: 'fire',
    label: 'Fireplace',
    emoji: '🔥',
    src: '/sounds/fire.mp3',
    volume: 0.4,
    enabled: false,
  },
  {
    id: 'forest',
    label: 'Forest',
    emoji: '🌿',
    src: '/sounds/forest.mp3',
    volume: 0.5,
    enabled: false,
  },
  {
    id: 'thunder',
    label: 'Thunder',
    emoji: '⛈️',
    src: '/sounds/thunder.mp3',
    volume: 0.3,
    enabled: false,
  },
]
