'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { CATEGORY_LABELS, sceneToWorkspaceUrl, sceneToEmbedUrl } from '@/lib/scenes'
import type { Scene, SceneCategory } from '@/lib/scenes'

interface Props { scenes: Scene[] }

export function SceneGrid({ scenes }: Props) {
  const [activeCategory, setActiveCategory] = useState<SceneCategory>('all')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = activeCategory === 'all'
    ? scenes
    : scenes.filter(s => s.category === activeCategory)

  const copyEmbed = useCallback((scene: Scene) => {
    const url = sceneToEmbedUrl(scene, window.location.origin)
    navigator.clipboard?.writeText(url).then(() => {
      setCopiedId(scene.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }, [])

  return (
    <>
      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(Object.keys(CATEGORY_LABELS) as SceneCategory[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/30'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(scene => (
          <div
            key={scene.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all hover:border-white/20 hover:shadow-xl hover:shadow-black/40"
            onMouseEnter={() => setHoveredId(scene.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Preview thumbnail */}
            <div className="relative h-44 overflow-hidden" style={{
              background: `linear-gradient(135deg, ${scene.bgGradient[0]}, ${scene.bgGradient[1]})`
            }}>
              {/* GIF — load on hover only to save bandwidth */}
              {hoveredId === scene.id ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={scene.gifUrl}
                  alt={scene.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ opacity: 1 - scene.overlay / 100 + 0.3 }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {scene.emoji}
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black" style={{ opacity: hoveredId === scene.id ? scene.overlay / 100 : 0.2 }} />

              {/* Accent color dot */}
              <div className="absolute top-3 right-3 h-3 w-3 rounded-full ring-2 ring-black/20"
                style={{ background: scene.accentColor }} />

              {/* Category badge */}
              <span className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white/70 backdrop-blur-sm">
                {CATEGORY_LABELS[scene.category].split(' ').slice(1).join(' ')}
              </span>

              {/* Hover: ambient icons */}
              {hoveredId === scene.id && (
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {scene.ambientTracks.map(t => {
                    const icons: Record<string,string> = { rain:'🌧',wave:'🌊',cafe:'☕',fire:'🔥',wind:'🍃',thunder:'⛈️',forest:'🌳',city:'🏙️' }
                    return <span key={t.id} className="text-sm">{icons[t.id]}</span>
                  })}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white">{scene.name}</h3>
                  <p className="text-xs text-white/40 mt-0.5">{scene.nameVi}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {scene.showPomodoro && (
                    <span title="Có Pomodoro" className="text-xs">🍅</span>
                  )}
                  {scene.showClock && (
                    <span title="Có đồng hồ" className="text-xs">🕐</span>
                  )}
                </div>
              </div>

              <p className="mt-2 flex-1 text-xs text-white/40 leading-relaxed line-clamp-2">
                {scene.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {scene.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/30">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Link
                  href={sceneToWorkspaceUrl(scene)}
                  className="flex-1 rounded-lg py-2 text-center text-xs font-semibold text-white transition-colors"
                  style={{ background: scene.accentColor + 'dd' }}
                >
                  ▶ Dùng Scene
                </Link>
                <button
                  onClick={() => copyEmbed(scene)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 hover:bg-white/10 transition-colors"
                  title="Copy link nhúng Notion"
                >
                  {copiedId === scene.id ? '✓' : '🔗'}
                </button>
                <a
                  href={sceneToEmbedUrl(scene)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60 hover:bg-white/10 transition-colors"
                  title="Xem preview"
                >
                  👁
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-white/30">
          Chưa có scene nào trong danh mục này.
        </div>
      )}
    </>
  )
}
