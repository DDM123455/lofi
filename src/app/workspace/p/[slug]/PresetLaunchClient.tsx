'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { WorkspacePreset } from '@/lib/presets'
import { analytics } from '@/lib/analytics'
import { PRESETS, presetWorkspaceUrl } from '@/lib/presets'

interface Props {
  preset: WorkspacePreset
  workspaceUrl: string
}

const CATEGORY_LABEL: Record<WorkspacePreset['category'], string> = {
  anime: '🌸 Anime',
  coding: '💻 Coding',
  focus: '🎯 Focus',
  study: '📚 Study',
  chill: '☕ Chill',
}

export function PresetLaunchClient({ preset, workspaceUrl }: Props) {
  const router = useRouter()

  useEffect(() => {
    analytics.presetOpen(preset.slug)
    const timer = setTimeout(() => {
      router.push(workspaceUrl)
    }, 3000)
    return () => clearTimeout(timer)
  }, [preset.slug, workspaceUrl, router])

  const others = PRESETS.filter(p => p.slug !== preset.slug).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0d14] px-4 py-20">
      {/* Main card */}
      <div className="w-full max-w-lg text-center">
        <div className="mb-6 text-7xl">{preset.emoji}</div>

        <span
          className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium ring-1"
          style={{
            color: preset.accentColor,
            backgroundColor: `${preset.accentColor}18`,
            borderColor: `${preset.accentColor}40`,
          }}
        >
          {CATEGORY_LABEL[preset.category]}
        </span>

        <h1 className="mb-4 text-4xl font-bold text-white">{preset.title}</h1>
        <p className="mb-10 text-lg text-white/55 leading-relaxed">{preset.description}</p>

        {/* Auto-launch indicator */}
        <p className="mb-4 text-sm text-white/30">Opening workspace automatically…</p>

        <Link
          href={workspaceUrl}
          onClick={() => analytics.presetOpen(preset.slug)}
          className="inline-block rounded-full px-12 py-4 text-lg font-semibold text-white shadow-2xl transition-all hover:scale-105"
          style={{
            backgroundColor: preset.accentColor,
            boxShadow: `0 20px 60px ${preset.accentColor}40`,
          }}
        >
          Open Now →
        </Link>

        <p className="mt-4 text-xs text-white/20">No account · No download · Free forever</p>
      </div>

      {/* Share this preset */}
      <div className="mt-16 w-full max-w-lg">
        <SharePreset slug={preset.slug} title={preset.title} />
      </div>

      {/* Other presets */}
      {others.length > 0 && (
        <div className="mt-16 w-full max-w-2xl">
          <h2 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-white/30">
            Other Presets
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {others.map(p => (
              <Link
                key={p.slug}
                href={`/workspace/p/${p.slug}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-white/4 p-4 text-center transition-all hover:border-white/20 hover:bg-white/8"
              >
                <span className="text-2xl">{p.emoji}</span>
                <span className="text-xs font-semibold text-white/70">{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SharePreset({ slug, title }: { slug: string; title: string }) {
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/workspace/p/${slug}`
    : `https://focusworkspace.app/workspace/p/${slug}`

  function copy() {
    navigator.clipboard.writeText(url).catch(() => {})
    analytics.shareClick('copy_link')
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
      <p className="mb-3 text-center text-sm text-white/50">
        Share <span className="text-white/80">{title}</span> with a friend
      </p>
      <div className="flex gap-2">
        <input
          readOnly
          value={url}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/50 outline-none"
        />
        <button
          onClick={copy}
          className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
        >
          Copy
        </button>
      </div>
    </div>
  )
}
