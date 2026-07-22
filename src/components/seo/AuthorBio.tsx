export const AUTHOR_NAME = 'Alex Chen'
export const AUTHOR_TITLE = 'Productivity Writer, LofiSpace'
export const AUTHOR_URL = 'https://www.focusworkspace.app/blog'

export function AuthorBio() {
  return (
    <div className="mt-12 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-900/50 text-lg font-semibold text-violet-300">
        AC
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{AUTHOR_NAME}</p>
        <p className="mb-2 text-xs text-white/40">{AUTHOR_TITLE}</p>
        <p className="text-sm leading-relaxed text-white/60">
          Alex writes about focus, study habits, and building better ambient work environments for the LofiSpace blog.
          Their guides draw on practical testing of Pomodoro routines, lofi playlists, and sound-mixing setups with the
          LofiSpace community, alongside published research on attention and background sound. Alex is especially
          interested in the small environmental changes — sound, lighting, timing — that make focused work easier to sustain.
        </p>
      </div>
    </div>
  )
}
