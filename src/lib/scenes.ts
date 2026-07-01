export interface Scene {
  id: string
  name: string
  nameVi: string
  description: string
  tags: string[]
  emoji: string
  category: 'study' | 'chill' | 'night' | 'nature' | 'cafe' | 'coding'
  gifUrl: string
  bgGradient: [string, string]
  overlay: number
  blur: number
  lofiStreamId: string
  lofiVolume: number
  ambientTracks: Array<{ id: string; volume: number }>
  accentColor: string
  showClock: boolean
  showPomodoro: boolean
}

export const SCENES: Scene[] = [
  {
    id: 'tokyo-cafe-rain',
    name: 'Tokyo Café Rain',
    nameVi: 'Quán Cà Phê Tokyo Mưa',
    description: 'Rainy window, jazz lofi & café ambience — the classic lofi vibe.',
    tags: ['rain', 'cafe', 'lofi', 'tokyo', 'study'],
    emoji: '☕🌧️',
    category: 'cafe',
    gifUrl: '/video/street-scene.mp4',
    bgGradient: ['#0f1923', '#1a2d3d'],
    overlay: 40, blur: 0,
    lofiStreamId: 'lofi1', lofiVolume: 0.65,
    ambientTracks: [{ id: 'rain', volume: 0.55 }, { id: 'cafe', volume: 0.35 }],
    accentColor: '#a78bfa', showClock: true, showPomodoro: false,
  },
  {
    id: 'midnight-coding',
    name: 'Midnight Coding',
    nameVi: 'Lập Trình Đêm Khuya',
    description: 'Synthwave beats + city ambience. Perfect for late-night sessions.',
    tags: ['coding', 'night', 'synthwave', 'city', 'focus'],
    emoji: '💻🌃',
    category: 'coding',
    gifUrl: '/video/lofi-bedroom.mp4',
    bgGradient: ['#050510', '#10052a'],
    overlay: 50, blur: 0,
    lofiStreamId: 'lofi2', lofiVolume: 0.7,
    ambientTracks: [{ id: 'city', volume: 0.3 }, { id: 'wind', volume: 0.2 }],
    accentColor: '#22d3ee', showClock: true, showPomodoro: true,
  },
  {
    id: 'cozy-cabin',
    name: 'Cozy Cabin Winter',
    nameVi: 'Cabin Ấm Áp Mùa Đông',
    description: 'Crackling fireplace & howling wind outside. Stay warm inside.',
    tags: ['fire', 'cozy', 'winter', 'cabin', 'chill'],
    emoji: '🔥🏔️',
    category: 'chill',
    gifUrl: '/video/cabin-night.mp4',
    bgGradient: ['#1a0a05', '#2d1508'],
    overlay: 45, blur: 0,
    lofiStreamId: 'lofi4', lofiVolume: 0.6,
    ambientTracks: [{ id: 'fire', volume: 0.65 }, { id: 'wind', volume: 0.3 }],
    accentColor: '#fbbf24', showClock: true, showPomodoro: false,
  },
  {
    id: 'forest-morning',
    name: 'Forest Morning',
    nameVi: 'Rừng Buổi Sáng',
    description: 'Birds, rustling leaves & jazz hop. Start your day right.',
    tags: ['forest', 'morning', 'nature', 'birds', 'fresh'],
    emoji: '🌿🌅',
    category: 'nature',
    gifUrl: '/video/forest.mp4',
    bgGradient: ['#081408', '#112410'],
    overlay: 30, blur: 0,
    lofiStreamId: 'lofi4', lofiVolume: 0.55,
    ambientTracks: [{ id: 'forest', volume: 0.6 }, { id: 'wind', volume: 0.2 }],
    accentColor: '#4ade80', showClock: true, showPomodoro: false,
  },
  {
    id: 'ocean-drive',
    name: 'Ocean Drive',
    nameVi: 'Bên Bờ Biển',
    description: 'Rolling waves & chillhop beats. Close your eyes and drift.',
    tags: ['ocean', 'waves', 'chill', 'relax', 'lofi'],
    emoji: '🌊🌅',
    category: 'chill',
    gifUrl: '/video/beach-night.mp4',
    bgGradient: ['#020d1a', '#041e3a'],
    overlay: 35, blur: 0,
    lofiStreamId: 'lofi4', lofiVolume: 0.5,
    ambientTracks: [{ id: 'wave', volume: 0.7 }],
    accentColor: '#38bdf8', showClock: true, showPomodoro: false,
  },
  {
    id: 'thunderstorm-focus',
    name: 'Thunderstorm Focus',
    nameVi: 'Tập Trung Dưới Sấm',
    description: 'Heavy thunder & rain. Deadlines fuel the storm.',
    tags: ['thunder', 'rain', 'focus', 'deadline', 'storm'],
    emoji: '⛈️⚡',
    category: 'study',
    gifUrl: '/video/winter-night.mp4',
    bgGradient: ['#050810', '#080f1f'],
    overlay: 60, blur: 0,
    lofiStreamId: 'lofi1', lofiVolume: 0.5,
    ambientTracks: [{ id: 'thunder', volume: 0.6 }, { id: 'rain', volume: 0.7 }],
    accentColor: '#818cf8', showClock: true, showPomodoro: true,
  },
  {
    id: 'jazz-bar-night',
    name: 'Jazz Bar Night',
    nameVi: 'Quán Bar Jazz Ban Đêm',
    description: 'Smoky jazz bar atmosphere. Let the saxophone carry you.',
    tags: ['jazz', 'bar', 'night', 'lofi', 'elegant'],
    emoji: '🎷🍸',
    category: 'cafe',
    gifUrl: '/video/street-scene.mp4',
    bgGradient: ['#0f0805', '#1f120a'],
    overlay: 50, blur: 0,
    lofiStreamId: 'lofi4', lofiVolume: 0.7,
    ambientTracks: [{ id: 'cafe', volume: 0.5 }],
    accentColor: '#fbbf24', showClock: false, showPomodoro: false,
  },
  {
    id: 'space-station',
    name: 'Space Station',
    nameVi: 'Trạm Vũ Trụ',
    description: 'Synthwave & deep space ambience. Float among the stars.',
    tags: ['space', 'synthwave', 'retro', 'sci-fi', 'ambient'],
    emoji: '🚀🌌',
    category: 'coding',
    gifUrl: '/video/mountain.mp4',
    bgGradient: ['#020208', '#080420'],
    overlay: 55, blur: 0,
    lofiStreamId: 'lofi2', lofiVolume: 0.65,
    ambientTracks: [{ id: 'wind', volume: 0.25 }],
    accentColor: '#c084fc', showClock: true, showPomodoro: false,
  },
  {
    id: 'study-corner',
    name: 'Study Corner',
    nameVi: 'Góc Học Bài',
    description: 'Minimal distractions. Just you, your notes, and lofi.',
    tags: ['study', 'focus', 'minimal', 'pomodoro', 'student'],
    emoji: '📚✏️',
    category: 'study',
    gifUrl: '/video/study-corner.mp4',
    bgGradient: ['#100e08', '#1c1a10'],
    overlay: 40, blur: 0,
    lofiStreamId: 'lofi1', lofiVolume: 0.6,
    ambientTracks: [{ id: 'cafe', volume: 0.2 }, { id: 'rain', volume: 0.3 }],
    accentColor: '#a78bfa', showClock: true, showPomodoro: true,
  },
  {
    id: 'sleepy-afternoon',
    name: 'Sleepy Afternoon',
    nameVi: 'Buổi Chiều Ngủ Gật',
    description: 'Gentle rain & jazz lullabies. Nap time has never felt better.',
    tags: ['afternoon', 'relax', 'gentle rain', 'nap', 'peaceful'],
    emoji: '😴🌦️',
    category: 'chill',
    gifUrl: '/video/balcony-twilight.mp4',
    bgGradient: ['#0e1018', '#181522'],
    overlay: 55, blur: 2,
    lofiStreamId: 'lofi4', lofiVolume: 0.45,
    ambientTracks: [{ id: 'rain', volume: 0.4 }],
    accentColor: '#fb7185', showClock: false, showPomodoro: false,
  },
  {
    id: 'neon-city',
    name: 'Neon City',
    nameVi: 'Thành Phố Neon',
    description: 'Cyberpunk vibes with city noise & synthwave. Blade Runner mood.',
    tags: ['neon', 'cyberpunk', 'city', 'night', 'synthwave'],
    emoji: '🌆⚡',
    category: 'night',
    gifUrl: '/video/winter-night.mp4',
    bgGradient: ['#040010', '#0f0022'],
    overlay: 45, blur: 0,
    lofiStreamId: 'lofi2', lofiVolume: 0.6,
    ambientTracks: [{ id: 'city', volume: 0.4 }, { id: 'rain', volume: 0.2 }],
    accentColor: '#f472b6', showClock: true, showPomodoro: false,
  },
  {
    id: 'mountain-mist',
    name: 'Mountain Mist',
    nameVi: 'Sương Núi Mờ',
    description: 'Wind through pine trees. Far from the city noise.',
    tags: ['mountain', 'mist', 'wind', 'nature', 'peaceful'],
    emoji: '🏔️🌫️',
    category: 'nature',
    gifUrl: '/video/mountain.mp4',
    bgGradient: ['#080f08', '#0f1a10'],
    overlay: 50, blur: 1,
    lofiStreamId: 'lofi4', lofiVolume: 0.5,
    ambientTracks: [{ id: 'wind', volume: 0.55 }, { id: 'forest', volume: 0.4 }],
    accentColor: '#86efac', showClock: true, showPomodoro: false,
  },
  {
    id: 'late-night-work',
    name: 'Late Night Work',
    nameVi: 'Làm Việc Đêm Muộn',
    description: 'When 2AM hits and you still have tasks. Tokyo jazz keeps you going.',
    tags: ['late night', 'work', 'pomodoro', 'deadline', 'focus'],
    emoji: '🌙💼',
    category: 'coding',
    gifUrl: '/video/lofi-bedroom.mp4',
    bgGradient: ['#05050f', '#0a0a20'],
    overlay: 55, blur: 0,
    lofiStreamId: 'lofi2', lofiVolume: 0.65,
    ambientTracks: [{ id: 'city', volume: 0.25 }, { id: 'cafe', volume: 0.2 }],
    accentColor: '#818cf8', showClock: true, showPomodoro: true,
  },
  {
    id: 'rainy-library',
    name: 'Rainy Library',
    nameVi: 'Thư Viện Ngày Mưa',
    description: 'Page turns, soft rain & lofi beats. The ultimate study atmosphere.',
    tags: ['library', 'rain', 'study', 'books', 'quiet'],
    emoji: '📖🌧️',
    category: 'study',
    gifUrl: '/video/lofi-bedroom.mp4',
    bgGradient: ['#0a080e', '#14101c'],
    overlay: 45, blur: 0,
    lofiStreamId: 'lofi1', lofiVolume: 0.55,
    ambientTracks: [{ id: 'rain', volume: 0.45 }, { id: 'cafe', volume: 0.15 }],
    accentColor: '#c4b5fd', showClock: true, showPomodoro: true,
  },
  {
    id: 'summer-chill',
    name: 'Summer Chill',
    nameVi: 'Hè Lười Biếng',
    description: 'Chillhop + ocean waves. No deadlines, just vibes.',
    tags: ['summer', 'ocean', 'chill', 'relax', 'lofi'],
    emoji: '🏖️☀️',
    category: 'chill',
    gifUrl: '/video/city-sunset.mp4',
    bgGradient: ['#0a1520', '#0f2035'],
    overlay: 30, blur: 0,
    lofiStreamId: 'lofi4', lofiVolume: 0.6,
    ambientTracks: [{ id: 'wave', volume: 0.5 }],
    accentColor: '#fbbf24', showClock: false, showPomodoro: false,
  },
]

export type SceneCategory = Scene['category'] | 'all'

export const CATEGORY_LABELS: Record<SceneCategory, string> = {
  all: '✨ All Scenes',
  study: '📚 Study',
  chill: '🌊 Chill',
  night: '🌙 Night',
  nature: '🌿 Nature',
  cafe: '☕ Café',
  coding: '💻 Coding',
}

export function getSceneById(id: string) {
  return SCENES.find(s => s.id === id)
}

/** Build /workspace URL from a scene */
export function sceneToEmbedUrl(scene: Scene, base = ''): string {
  const p = new URLSearchParams()
  p.set('bgv', encodeURIComponent(scene.gifUrl))
  p.set('bgo', String(scene.overlay))
  p.set('ls', scene.lofiStreamId)
  p.set('lv', String(Math.round(scene.lofiVolume * 100)))
  const at = scene.ambientTracks.map(t => `${t.id}:${Math.round(t.volume * 100)}`).join(',')
  if (at) p.set('at', at)
  if (scene.showClock) p.set('clk', '1')
  if (scene.showPomodoro) p.set('pom', '1')
  p.set('ac', scene.accentColor.replace('#', ''))
  return `${base}/workspace?${p.toString()}`
}

/** @deprecated use sceneToEmbedUrl */
export const sceneToWorkspaceUrl = sceneToEmbedUrl

// ─── WEATHER → SCENE MAPPING ─────────────────────────────────────────
// WMO weather codes: https://open-meteo.com/en/docs#weathervariables

export function weatherCodeToSceneId(code: number, hour: number): string {
  const isNight = hour < 6 || hour >= 20

  // Thunderstorm
  if (code >= 95) return 'thunderstorm-focus'

  // Heavy rain / showers
  if ((code >= 80 && code <= 82) || (code >= 61 && code <= 67))
    return 'tokyo-cafe-rain'

  // Drizzle
  if (code >= 51 && code <= 57) return 'sleepy-afternoon'

  // Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86))
    return 'cozy-cabin'

  // Fog
  if (code === 45 || code === 48) return 'mountain-mist'

  // Partly cloudy
  if (code === 2 || code === 3)
    return isNight ? 'late-night-work' : 'study-corner'

  // Clear
  if (code === 0 || code === 1)
    return isNight ? 'space-station' : 'forest-morning'

  return 'study-corner'
}

export const WMO_DESCRIPTIONS: Record<number, string> = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Freezing fog',
  51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
  61: 'Light rain', 63: 'Moderate rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Moderate snow', 75: 'Heavy snow',
  77: 'Snow grains', 80: 'Light showers', 81: 'Moderate showers', 82: 'Heavy showers',
  85: 'Light snow showers', 86: 'Heavy snow showers',
  95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Thunderstorm w/ heavy hail',
}
