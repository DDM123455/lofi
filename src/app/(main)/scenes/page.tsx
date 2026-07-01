import Link from 'next/link'
import type { Metadata } from 'next'
import { SCENES, CATEGORY_LABELS, sceneToWorkspaceUrl, sceneToEmbedUrl } from '@/lib/scenes'
import type { SceneCategory } from '@/lib/scenes'
import { SceneGrid } from './SceneGrid'
import { AdBanner } from '@/components/ads/AdBanner'
import { BreadcrumbJsonLd, ItemListJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Scene Gallery — 15+ Lofi Study Scenes & Ambient Backgrounds',
  description: 'Browse 15+ hand-crafted lofi ambient scenes: Tokyo Café Rain, Midnight Coding, Cozy Cabin, Thunderstorm Focus and more. Pick your vibe and open your study workspace instantly. Free.',
  keywords: ['lofi scene', 'ambient study backgrounds', 'study vibes', 'lofi backgrounds', 'aesthetic study room', 'virtual study environment', 'ambient workspace'],
  alternates: { canonical: 'https://focusworkspace.app/scenes' },
  openGraph: {
    title: 'Scene Gallery — 15+ Lofi Study Scenes | LofiSpace',
    description: 'Browse 15+ lofi ambient scenes: Tokyo Café Rain, Midnight Coding, Cozy Cabin and more. Free — open in one click.',
    url: 'https://focusworkspace.app/scenes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scene Gallery — 15+ Lofi Study Scenes | LofiSpace',
    description: 'Browse 15+ lofi ambient scenes and open your study workspace instantly. Free.',
  },
}

export default function ScenesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Scene Gallery', url: 'https://focusworkspace.app/scenes' },
      ]} />
      <ItemListJsonLd items={SCENES.map(s => ({
        name: s.name,
        url: `https://focusworkspace.app/workspace?scene=${s.id}`,
        description: s.description,
      }))} />

      {/* Hero */}
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20 mb-4">
          ✨ 15 scenes · 100% free · No sign-up
        </span>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Choose Your <span className="text-violet-400">Scene</span>
        </h1>
        <p className="mt-3 text-white/50 max-w-xl mx-auto">
          Every scene is a complete atmosphere — music, ambient sounds, and animated background.
          One click to open, or embed directly into Notion.
        </p>
      </div>

      {/* AdSense — Top */}
      <div className="mb-8">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_SCENES_TOP ?? ''} format="horizontal" style={{ minHeight: 72 }} />
      </div>

      {/* Scene grid với filter (client component) */}
      <SceneGrid scenes={SCENES} />

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl bg-gradient-to-r from-violet-900/30 to-violet-800/10 border border-violet-500/20 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Want to build your own scene?</h2>
        <p className="text-white/50 text-sm mb-5">
          Open the workspace to mix ambient sounds, pick a GIF background, and customise colours to your liking.
        </p>
        <Link href="/workspace"
          className="inline-block rounded-full bg-violet-600 px-8 py-2.5 font-semibold text-white hover:bg-violet-500 transition-colors">
          Open Workspace →
        </Link>
      </div>

      {/* Related Sound Pages */}
      <div className="mt-12">
        <h2 className="mb-4 text-center text-lg font-semibold text-white/60">Explore by Sound</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {([
            { href: '/rain-sounds',          emoji: '🌧️', label: 'Rain Sounds' },
            { href: '/coffee-shop-sounds',   emoji: '☕',  label: 'Coffee Shop' },
            { href: '/thunderstorm-sounds',  emoji: '⛈️', label: 'Thunderstorm' },
            { href: '/forest-sounds',        emoji: '🌿',  label: 'Forest' },
            { href: '/fireplace-sounds',     emoji: '🔥',  label: 'Fireplace' },
            { href: '/white-noise',          emoji: '🔇',  label: 'White Noise' },
            { href: '/brown-noise',          emoji: '🎙️', label: 'Brown Noise' },
          ] as const).map(({ href, emoji, label }) => (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 p-3 text-center transition-all hover:border-violet-500/40 hover:bg-white/8">
              <span className="text-xl">{emoji}</span>
              <span className="text-xs font-medium text-white/60">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* AdSense — Bottom */}
      <div className="mt-8">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_SCENES_BOT ?? ''} format="auto" style={{ minHeight: 72 }} />
      </div>
    </div>
  )
}
