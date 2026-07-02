import Link from 'next/link'

interface RelatedPage {
  href: string
  title: string
  description: string
  emoji: string
}

const ALL_STUDY_ROOMS: RelatedPage[] = [
  { href: '/online-study-room',    emoji: '📚', title: 'Online Study Room',    description: 'Virtual study space with lofi & Pomodoro' },
  { href: '/anime-study-room',     emoji: '🌸', title: 'Anime Study Room',     description: 'Japanese aesthetic + rain + lofi beats' },
  { href: '/coding-room',          emoji: '💻', title: 'Coding Room',          description: 'Synthwave, dark UI & coding cat companion' },
  { href: '/focus-room',           emoji: '🎯', title: 'Focus Room',           description: 'Deep work preset, minimal distractions' },
  { href: '/deep-work-room',       emoji: '🧠', title: 'Deep Work Room',       description: 'Flow state environment for hard problems' },
  { href: '/adhd-focus-room',      emoji: '⚡', title: 'ADHD Focus Room',      description: 'Structured focus for ADHD & neurodivergent' },
  { href: '/virtual-study-room',   emoji: '🖥️', title: 'Virtual Study Room',   description: 'Study together online, any time zone' },
  { href: '/coffee-shop-sounds',   emoji: '☕', title: 'Coffee Shop Sounds',   description: 'Café ambience for focus & relaxation' },
  { href: '/study-music',          emoji: '🎵', title: 'Study Music',          description: 'Background music for studying & focus' },
  { href: '/coding-music',         emoji: '🎧', title: 'Coding Music',         description: 'Lofi & synthwave for coding sessions' },
  { href: '/thunderstorm-sounds',  emoji: '⛈️', title: 'Thunderstorm Sounds', description: 'Rain & thunder for deep focus' },
  { href: '/forest-sounds',        emoji: '🌿', title: 'Forest Sounds',        description: 'Nature sounds for calm & clarity' },
  { href: '/fireplace-sounds',     emoji: '🔥', title: 'Fireplace Sounds',     description: 'Warm crackling fire for cozy study' },
  { href: '/website-for-studying', emoji: '🌐', title: 'Website for Studying', description: 'Best free online study tool' },
  { href: '/pomodoro-timer',       emoji: '⏱️', title: 'Pomodoro Timer',       description: 'Free online Pomodoro with XP & streaks' },
  { href: '/lofi-music',           emoji: '🎶', title: 'Lofi Music',           description: 'Chill lofi beats to study & relax' },
  { href: '/rain-sounds',          emoji: '🌧️', title: 'Rain Sounds',          description: 'Rain ambience for deep focus & sleep' },
  { href: '/white-noise',          emoji: '⚪', title: 'White Noise',          description: 'Pure white noise for concentration' },
  { href: '/brown-noise',          emoji: '🟤', title: 'Brown Noise',          description: 'Deep brown noise for calm focus' },
  { href: '/ambient-sounds',       emoji: '🎐', title: 'Ambient Sounds',       description: 'Layered ambient mixes for any mood' },
  { href: '/focus-music',          emoji: '🎹', title: 'Focus Music',          description: 'Instrumental music to boost concentration' },
  { href: '/study-with-me',        emoji: '👥', title: 'Study With Me',        description: 'Virtual co-studying, no video needed' },
  { href: '/notion-widget',        emoji: '📝', title: 'Notion Widget',        description: 'Embed a live lofi widget in Notion' },
]

interface Props {
  exclude?: string      // href to exclude (the current page)
  title?: string
}

export function RelatedPages({ exclude, title = 'Explore Other Study Rooms' }: Props) {
  const pages = ALL_STUDY_ROOMS.filter(p => p.href !== exclude)

  return (
    <section className="mt-16 border-t border-white/5 pt-12">
      <h2 className="mb-6 text-center text-xl font-bold text-white">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {pages.map(p => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex flex-col gap-1 rounded-xl border border-white/8 bg-white/4 p-4 transition-all hover:border-violet-500/40 hover:bg-white/8"
          >
            <span className="text-2xl">{p.emoji}</span>
            <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
              {p.title}
            </span>
            <span className="text-xs text-white/40 leading-snug">{p.description}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/scenes" className="text-white/40 hover:text-violet-300 transition-colors">
          → All Scenes Gallery
        </Link>
        <span className="text-white/20">·</span>
        <Link href="/blog" className="text-white/40 hover:text-violet-300 transition-colors">
          → Productivity Blog
        </Link>
        <span className="text-white/20">·</span>
        <Link href="/workspace" className="text-white/40 hover:text-violet-300 transition-colors">
          → Open Workspace
        </Link>
      </div>
    </section>
  )
}
