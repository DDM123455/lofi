/** Single source of truth for background presets used in both workspace and embed */
export interface BgPreset {
  id: string
  label: string
  emoji: string
  url: string
  /** Small first-frame JPG shown instantly via <video poster> while the clip buffers */
  poster: string
  gradient: [string, string]
}

export const BG_PRESETS: BgPreset[] = [
  { id: 'street-scene', label: 'Street Scene',  emoji: '🛵',  url: '/video/street-scene.mp4',  poster: '/video/street-scene-poster.jpg',  gradient: ['#1a1208', '#2d2010'] },
  { id: 'lofi-bedroom', label: 'Lofi Bedroom',  emoji: '🌙',  url: '/video/lofi-bedroom.mp4',  poster: '/video/lofi-bedroom-poster.jpg',  gradient: ['#0d0814', '#160d20'] },
  { id: 'forest-glow',  label: 'Forest Glow',   emoji: '🌿',  url: '/video/forest.mp4',         poster: '/video/forest-poster.jpg',         gradient: ['#081408', '#112410'] },
  { id: 'mountain-dawn',label: 'Mountain Dawn',  emoji: '🏔️', url: '/video/mountain.mp4',       poster: '/video/mountain-poster.jpg',       gradient: ['#07080d', '#10141e'] },
  { id: 'beach-night',  label: 'Moonlit Beach',  emoji: '🌊',  url: '/video/beach-night.mp4',   poster: '/video/beach-night-poster.jpg',   gradient: ['#020d1a', '#041e3a'] },
  { id: 'study-nook',   label: 'Study Nook',     emoji: '📖',  url: '/video/study-corner.mp4',  poster: '/video/study-corner-poster.jpg',  gradient: ['#100e08', '#1c1a10'] },
  { id: 'golden-hour',  label: 'Golden Hour',    emoji: '🌅',  url: '/video/sunset.mp4',         poster: '/video/sunset-poster.jpg',         gradient: ['#1a0808', '#2e1404'] },
  { id: 'winter-night', label: 'Winter Night',   emoji: '❄️', url: '/video/winter-night.mp4',  poster: '/video/winter-night-poster.jpg',  gradient: ['#09111f', '#111e30'] },
  { id: 'cabin-winter', label: 'Winter Cabin',   emoji: '🏡',  url: '/video/cabin-night.mp4',   poster: '/video/cabin-night-poster.jpg',   gradient: ['#130c06', '#261a0c'] },
  { id: 'city-sunset',     label: 'City Sunset',    emoji: '🌇',  url: '/video/city-sunset.mp4',      poster: '/video/city-sunset-poster.jpg',      gradient: ['#1a0e08', '#2e1a0a'] },
  { id: 'balcony-twilight',label: 'Balcony Twilight',emoji: '🏮', url: '/video/balcony-twilight.mp4', poster: '/video/balcony-twilight-poster.jpg', gradient: ['#0e0814', '#1a1028'] },
]

export function getBgPresetByUrl(url: string): BgPreset | undefined {
  return BG_PRESETS.find(p => p.url === url)
}

export function getBgPresetById(id: string): BgPreset | undefined {
  return BG_PRESETS.find(p => p.id === id)
}
