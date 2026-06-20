/** Single source of truth for background GIF presets used in both workspace and embed */
export interface BgPreset {
  id: string
  label: string   // Vietnamese display name
  emoji: string
  url: string
  gradient: [string, string]   // CSS gradient colors for preview when GIF not loaded
  pixel?: boolean              // true = pixel art
}

export const BG_PRESETS: BgPreset[] = [
  // ── Anime / Lofi Rooms ────────────────────────────────────────────────
  {
    id: 'lofi-room',
    label: 'Phòng Lofi',
    emoji: '🏠',
    url: 'https://media.giphy.com/media/SVgKToBLI6S6DUye1Y/giphy.gif',
    gradient: ['#0d0814', '#160d20'],
  },
  {
    id: 'anime-study',
    label: 'Góc Học Bài',
    emoji: '📚',
    url: 'https://media.giphy.com/media/xT9IgG50Lg7rusyOGY/giphy.gif',
    gradient: ['#1a1208', '#2d2010'],
  },
  // ── Rain & Storm ──────────────────────────────────────────────────────
  {
    id: 'rain-window',
    label: 'Mưa Cửa Sổ',
    emoji: '🌧️',
    url: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif',
    gradient: ['#0f1923', '#1a2d3d'],
  },
  {
    id: 'neon-rain',
    label: 'Mưa Neon',
    emoji: '💜',
    url: 'https://media.giphy.com/media/xT9KViMmyMdyKbfceU/giphy.gif',
    gradient: ['#090012', '#180028'],
  },
  {
    id: 'snow',
    label: 'Tuyết Rơi',
    emoji: '❄️',
    url: 'https://media.giphy.com/media/26uf2YTgF5upXUTm0/giphy.gif',
    gradient: ['#09111f', '#111e30'],
  },
  // ── Nature ────────────────────────────────────────────────────────────
  {
    id: 'forest',
    label: 'Rừng Xanh',
    emoji: '🌿',
    url: 'https://media.giphy.com/media/MdbFDCvHQJkBTLPHoD/giphy.gif',
    gradient: ['#050e06', '#0d1d0f'],
  },
  {
    id: 'ocean',
    label: 'Sóng Biển',
    emoji: '🌊',
    url: 'https://media.giphy.com/media/3oKIPtjElfqwMOTbH2/giphy.gif',
    gradient: ['#03111a', '#062030'],
  },
  {
    id: 'sunset',
    label: 'Hoàng Hôn',
    emoji: '🌅',
    url: 'https://media.giphy.com/media/xUA7b1MxpngddUvdgc/giphy.gif',
    gradient: ['#1a0808', '#2e1404'],
  },
  {
    id: 'mountain',
    label: 'Núi Sương Mù',
    emoji: '🏔️',
    url: 'https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif',
    gradient: ['#07080d', '#10141e'],
  },
  // ── Cozy Indoors ──────────────────────────────────────────────────────
  {
    id: 'cafe-winter',
    label: 'Café Mùa Đông',
    emoji: '☕',
    url: 'https://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif',
    gradient: ['#130c06', '#261a0c'],
  },
  {
    id: 'fireplace',
    label: 'Lò Sưởi Ấm',
    emoji: '🔥',
    url: 'https://media.giphy.com/media/l2Sq29cFXosJrWNkk/giphy.gif',
    gradient: ['#1a0a05', '#2d1508'],
  },
  // ── City & Night ──────────────────────────────────────────────────────
  {
    id: 'city-night',
    label: 'Thành Phố Đêm',
    emoji: '🌆',
    url: 'https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif',
    gradient: ['#06050f', '#120e28'],
  },
  {
    id: 'space',
    label: 'Không Gian',
    emoji: '🌌',
    url: 'https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif',
    gradient: ['#04040f', '#0a0720'],
  },
  // ── Pixel Art ─────────────────────────────────────────────────────────
  {
    id: 'px-street',
    label: 'Pixel Phố Đêm',
    emoji: '🏮',
    url: 'https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif',
    gradient: ['#0d0510', '#200a30'],
    pixel: true,
  },
  {
    id: 'px-cabin',
    label: 'Pixel Cabin',
    emoji: '🛖',
    url: 'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif',
    gradient: ['#050d05', '#0a1a0a'],
    pixel: true,
  },
  {
    id: 'px-sakura',
    label: 'Pixel Sakura',
    emoji: '🌸',
    url: 'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif',
    gradient: ['#12060c', '#2a0d18'],
    pixel: true,
  },
  {
    id: 'px-city',
    label: 'Pixel City',
    emoji: '🏙️',
    url: 'https://media.giphy.com/media/TlK63EFHBMbLsqo7oeM/giphy.gif',
    gradient: ['#06050f', '#120e28'],
    pixel: true,
  },
]

export function getBgPresetByUrl(url: string): BgPreset | undefined {
  return BG_PRESETS.find(p => p.url === url)
}

export function getBgPresetById(id: string): BgPreset | undefined {
  return BG_PRESETS.find(p => p.id === id)
}
