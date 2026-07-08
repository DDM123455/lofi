const BASE = 'https://www.focusworkspace.app'

export interface WorkspacePreset {
  slug: string
  title: string
  description: string
  emoji: string
  keywords: string[]
  accentColor: string
  /** Query string (without leading ?) to append to /workspace */
  workspaceQuery: string
  category: 'anime' | 'coding' | 'focus' | 'study' | 'chill'
}

export const PRESETS: WorkspacePreset[] = [
  {
    slug: 'anime-rain-focus',
    title: 'Anime Rain Focus',
    description:
      'A cosy Japanese-aesthetic workspace with lofi bedroom background, soft rain sounds and lofi city-pop. Perfect for long study sessions.',
    emoji: '🌸',
    keywords: ['anime study room', 'japanese aesthetic', 'rain lofi', 'study preset'],
    accentColor: '#db2777',
    category: 'anime',
    workspaceQuery:
      'bgv=' + encodeURIComponent('/video/lofi-bedroom.mp4') +
      '&bgo=40&ls=lofi1&lv=65&at=rain:55,cafe:35&pom=1&clk=1&ac=a78bfa',
  },
  {
    slug: 'coding-night',
    title: 'Coding Night',
    description:
      'Dark synthwave workspace for late-night coding sessions. Midnight lofi bedroom, electronic beats and rain on glass — enter the zone.',
    emoji: '💻',
    keywords: ['coding room', 'synthwave', 'developer focus', 'night coding'],
    accentColor: '#0891b2',
    category: 'coding',
    workspaceQuery:
      'bgv=' + encodeURIComponent('/video/lofi-bedroom.mp4') +
      '&bgo=50&ls=lofi2&lv=70&at=city:30,wind:20&pom=1&clk=1&ac=22d3ee',
  },
  {
    slug: 'deep-work',
    title: 'Deep Work',
    description:
      'Minimal, high-intensity focus preset. Study corner backdrop, low-BPM lofi and heavy rain ambience — built for solving hard problems.',
    emoji: '🧠',
    keywords: ['deep work', 'focus room', 'concentration', 'flow state'],
    accentColor: '#7c3aed',
    category: 'focus',
    workspaceQuery:
      'bgv=' + encodeURIComponent('/video/study-corner.mp4') +
      '&bgo=45&ls=lofi1&lv=55&at=rain:45,cafe:15&pom=1&clk=1&ac=c4b5fd',
  },
  {
    slug: 'cozy-cafe',
    title: 'Cozy Café',
    description:
      'Warm street café atmosphere with jazz hop music, café chatter and rain. The classic study vibe — focused but comfortable.',
    emoji: '☕',
    keywords: ['cafe study room', 'coffee shop ambience', 'lofi cafe', 'cozy study'],
    accentColor: '#d97706',
    category: 'chill',
    workspaceQuery:
      'bgv=' + encodeURIComponent('/video/street-scene.mp4') +
      '&bgo=35&ls=lofi1&lv=60&at=cafe:55,rain:30&pom=1&clk=1&ac=f59e0b',
  },
  {
    slug: 'thunderstorm-focus',
    title: 'Thunderstorm Focus',
    description:
      'Powerful thunderstorm ambience for your most demanding sessions. When you need to block everything out and just work.',
    emoji: '⛈️',
    keywords: ['thunderstorm study', 'rain sounds focus', 'storm ambience', 'intense focus'],
    accentColor: '#6366f1',
    category: 'focus',
    workspaceQuery:
      'bgv=' + encodeURIComponent('/video/winter-night.mp4') +
      '&bgo=60&ls=lofi1&lv=50&at=thunder:60,rain:70&pom=1&clk=1&ac=818cf8',
  },
  {
    slug: 'lofi-morning',
    title: 'Lofi Morning',
    description:
      'A gentle wake-up preset for productive mornings. Soft lofi beats, birds chirping and the first light of day.',
    emoji: '🌅',
    keywords: ['morning study', 'lofi morning', 'productive morning', 'sunrise study'],
    accentColor: '#ea580c',
    category: 'chill',
    workspaceQuery: 'bgv=' + encodeURIComponent('/video/forest.mp4') +
      '&bgo=30&ls=lofi1&lv=55&at=forest:50,wind:20&pom=1&clk=1&ac=fb923c',
  },
]

export function getPreset(slug: string): WorkspacePreset | undefined {
  return PRESETS.find(p => p.slug === slug)
}

export function getPresetsByCategory(
  category: WorkspacePreset['category'],
): WorkspacePreset[] {
  return PRESETS.filter(p => p.category === category)
}

export function getPresetUrl(preset: WorkspacePreset, base = BASE): string {
  return `${base}/workspace?${preset.workspaceQuery}`
}

export function presetWorkspaceUrl(preset: WorkspacePreset): string {
  return `/workspace?${preset.workspaceQuery}`
}

export function presetCanonicalUrl(slug: string, base = BASE): string {
  return `${base}/workspace/p/${slug}`
}
