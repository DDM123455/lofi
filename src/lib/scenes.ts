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
    tags: ['mưa', 'cafe', 'lofi', 'tokyo', 'học bài'],
    emoji: '☕🌧️',
    category: 'cafe',
    gifUrl: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
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
    tags: ['lập trình', 'đêm', 'synthwave', 'thành phố', 'coding'],
    emoji: '💻🌃',
    category: 'coding',
    gifUrl: 'https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif',
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
    tags: ['lửa', 'ấm áp', 'mùa đông', 'cabin', 'chill'],
    emoji: '🔥🏔️',
    category: 'chill',
    gifUrl: 'https://media.giphy.com/media/l2Sq29cFXosJrWNkk/giphy.gif',
    bgGradient: ['#1a0a05', '#2d1508'],
    overlay: 45, blur: 0,
    lofiStreamId: 'lofi3', lofiVolume: 0.6,
    ambientTracks: [{ id: 'fire', volume: 0.65 }, { id: 'wind', volume: 0.3 }],
    accentColor: '#fbbf24', showClock: true, showPomodoro: false,
  },
  {
    id: 'forest-morning',
    name: 'Forest Morning',
    nameVi: 'Rừng Buổi Sáng',
    description: 'Birds, rustling leaves & jazz hop. Start your day right.',
    tags: ['rừng', 'buổi sáng', 'thiên nhiên', 'chim', 'tươi mát'],
    emoji: '🌿🌅',
    category: 'nature',
    gifUrl: 'https://media.giphy.com/media/MdbFDCvHQJkBTLPHoD/giphy.gif',
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
    tags: ['biển', 'sóng', 'chill', 'thư giãn', 'nghỉ ngơi'],
    emoji: '🌊🌅',
    category: 'chill',
    gifUrl: 'https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif',
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
    tags: ['sấm', 'mưa', 'tập trung', 'deadline', 'storm'],
    emoji: '⛈️⚡',
    category: 'study',
    gifUrl: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
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
    tags: ['jazz', 'bar', 'đêm', 'rượu', 'sang trọng'],
    emoji: '🎷🍸',
    category: 'cafe',
    gifUrl: 'https://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif',
    bgGradient: ['#0f0805', '#1f120a'],
    overlay: 50, blur: 0,
    lofiStreamId: 'lofi3', lofiVolume: 0.7,
    ambientTracks: [{ id: 'cafe', volume: 0.5 }],
    accentColor: '#fbbf24', showClock: false, showPomodoro: false,
  },
  {
    id: 'space-station',
    name: 'Space Station',
    nameVi: 'Trạm Vũ Trụ',
    description: 'Synthwave & deep space ambience. Float among the stars.',
    tags: ['vũ trụ', 'synthwave', 'retro', 'sci-fi', 'không gian'],
    emoji: '🚀🌌',
    category: 'coding',
    gifUrl: 'https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif',
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
    tags: ['học bài', 'tập trung', 'minimal', 'pomodoro', 'sinh viên'],
    emoji: '📚✏️',
    category: 'study',
    gifUrl: 'https://media.giphy.com/media/xT9IgG50Lg7rusyOGY/giphy.gif',
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
    tags: ['buổi chiều', 'thư giãn', 'mưa nhẹ', 'ngủ', 'yên tĩnh'],
    emoji: '😴🌦️',
    category: 'chill',
    gifUrl: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    bgGradient: ['#0e1018', '#181522'],
    overlay: 55, blur: 2,
    lofiStreamId: 'lofi3', lofiVolume: 0.45,
    ambientTracks: [{ id: 'rain', volume: 0.4 }],
    accentColor: '#fb7185', showClock: false, showPomodoro: false,
  },
  {
    id: 'neon-city',
    name: 'Neon City',
    nameVi: 'Thành Phố Neon',
    description: 'Cyberpunk vibes with city noise & synthwave. Blade Runner mood.',
    tags: ['neon', 'cyberpunk', 'thành phố', 'đêm', 'synthwave'],
    emoji: '🌆⚡',
    category: 'night',
    gifUrl: 'https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif',
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
    tags: ['núi', 'sương', 'gió', 'thiên nhiên', 'yên bình'],
    emoji: '🏔️🌫️',
    category: 'nature',
    gifUrl: 'https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif',
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
    tags: ['đêm muộn', 'làm việc', 'pomodoro', 'deadline', 'tập trung'],
    emoji: '🌙💼',
    category: 'coding',
    gifUrl: 'https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif',
    bgGradient: ['#05050f', '#0a0a20'],
    overlay: 55, blur: 0,
    lofiStreamId: 'lofi5', lofiVolume: 0.65,
    ambientTracks: [{ id: 'city', volume: 0.25 }, { id: 'cafe', volume: 0.2 }],
    accentColor: '#818cf8', showClock: true, showPomodoro: true,
  },
  {
    id: 'rainy-library',
    name: 'Rainy Library',
    nameVi: 'Thư Viện Ngày Mưa',
    description: 'Page turns, soft rain & lofi beats. The ultimate study atmosphere.',
    tags: ['thư viện', 'mưa', 'học bài', 'sách', 'yên tĩnh'],
    emoji: '📖🌧️',
    category: 'study',
    gifUrl: 'https://media.giphy.com/media/xT9IgG50Lg7rusyOGY/giphy.gif',
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
    tags: ['mùa hè', 'biển', 'chill', 'thư giãn', 'không lo lắng'],
    emoji: '🏖️☀️',
    category: 'chill',
    gifUrl: 'https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif',
    bgGradient: ['#0a1520', '#0f2035'],
    overlay: 30, blur: 0,
    lofiStreamId: 'lofi4', lofiVolume: 0.6,
    ambientTracks: [{ id: 'wave', volume: 0.5 }],
    accentColor: '#fbbf24', showClock: false, showPomodoro: false,
  },
]

export type SceneCategory = Scene['category'] | 'all'

export const CATEGORY_LABELS: Record<SceneCategory, string> = {
  all: '✨ Tất cả',
  study: '📚 Học bài',
  chill: '🌊 Thư giãn',
  night: '🌙 Ban đêm',
  nature: '🌿 Thiên nhiên',
  cafe: '☕ Quán cafe',
  coding: '💻 Lập trình',
}

export function getSceneById(id: string) {
  return SCENES.find(s => s.id === id)
}

/** Build /workspace URL from a scene */
export function sceneToWorkspaceUrl(scene: Scene, base = ''): string {
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

/** Build /embed URL from a scene */
export function sceneToEmbedUrl(scene: Scene, base = ''): string {
  return sceneToWorkspaceUrl(scene, base).replace('/workspace?', '/embed?')
}

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
  0: 'Trời quang', 1: 'Chủ yếu quang', 2: 'Có mây', 3: 'U ám',
  45: 'Sương mù', 48: 'Sương mù băng',
  51: 'Mưa phùn nhẹ', 53: 'Mưa phùn vừa', 55: 'Mưa phùn dày',
  61: 'Mưa nhẹ', 63: 'Mưa vừa', 65: 'Mưa to',
  71: 'Tuyết nhẹ', 73: 'Tuyết vừa', 75: 'Tuyết dày',
  77: 'Hạt tuyết', 80: 'Mưa rào nhẹ', 81: 'Mưa rào vừa', 82: 'Mưa rào mạnh',
  85: 'Tuyết rào nhẹ', 86: 'Tuyết rào mạnh',
  95: 'Dông', 96: 'Dông có mưa đá', 99: 'Dông mưa đá lớn',
}
