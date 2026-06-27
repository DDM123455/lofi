export type TimePeriod = 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night'

export interface DayNightConfig {
  period: TimePeriod
  label: string
  emoji: string
  bgUrl: string
  lofiId: string
  ambVols: Record<string, number>
  accent: string
  overlay: number
}

export function getTimePeriod(hour = new Date().getHours()): TimePeriod {
  if (hour >= 5 && hour < 8) return 'dawn'
  if (hour >= 8 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 20) return 'evening'
  return 'night'
}

const CONFIGS: Record<TimePeriod, Omit<DayNightConfig, 'period'>> = {
  dawn: {
    label: 'Bình Minh',
    emoji: '🌅',
    bgUrl: 'https://media.giphy.com/media/xUA7b1MxpngddUvdgc/giphy.gif',
    lofiId: 'lofi4',
    accent: '#fbbf24',
    overlay: 22,
    ambVols: { forest: 55, wind: 20 },
  },
  morning: {
    label: 'Buổi Sáng',
    emoji: '☀️',
    bgUrl: 'https://media.giphy.com/media/xT9IgG50Lg7rusyOGY/giphy.gif',
    lofiId: 'lofi4',
    accent: '#a78bfa',
    overlay: 30,
    ambVols: { cafe: 35 },
  },
  afternoon: {
    label: 'Buổi Chiều',
    emoji: '🌤️',
    bgUrl: 'https://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif',
    lofiId: 'lofi2',
    accent: '#22d3ee',
    overlay: 35,
    ambVols: { cafe: 40, wave: 20 },
  },
  evening: {
    label: 'Buổi Tối',
    emoji: '🌆',
    bgUrl: 'https://media.giphy.com/media/3o6Zt6KHxJTbXCnSvu/giphy.gif',
    lofiId: 'lofi4',
    accent: '#f472b6',
    overlay: 45,
    ambVols: { city: 30 },
  },
  night: {
    label: 'Ban Đêm',
    emoji: '🌙',
    bgUrl: 'https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif',
    lofiId: 'lofi2',
    accent: '#818cf8',
    overlay: 55,
    ambVols: { rain: 45, thunder: 20 },
  },
}

export function getDayNightConfig(hour = new Date().getHours()): DayNightConfig {
  const period = getTimePeriod(hour)
  return { period, ...CONFIGS[period] }
}
