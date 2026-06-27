import Link from 'next/link'

interface RelatedPage {
  href: string
  title: string
  description: string
  emoji: string
}

const ALL_STUDY_ROOMS: RelatedPage[] = [
  { href: '/online-study-room',  emoji: '📚', title: 'Online Study Room',  description: 'Virtual study space with lofi & Pomodoro' },
  { href: '/anime-study-room',   emoji: '🌸', title: 'Anime Study Room',   description: 'Japanese aesthetic + rain + lofi beats' },
  { href: '/coding-room',        emoji: '💻', title: 'Coding Room',        description: 'Synthwave, dark UI & coding cat companion' },
  { href: '/focus-room',         emoji: '🎯', title: 'Focus Room',         description: 'Deep work preset, minimal distractions' },
  { href: '/deep-work-room',     emoji: '🧠', title: 'Deep Work Room',     description: 'Flow state environment for hard problems' },
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
