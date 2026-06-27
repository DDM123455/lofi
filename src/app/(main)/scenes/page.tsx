import Link from 'next/link'
import type { Metadata } from 'next'
import { SCENES, CATEGORY_LABELS, sceneToWorkspaceUrl, sceneToEmbedUrl } from '@/lib/scenes'
import type { SceneCategory } from '@/lib/scenes'
import { SceneGrid } from './SceneGrid'
import { AdBanner } from '@/components/ads/AdBanner'

export const metadata: Metadata = {
  title: 'Scene Gallery — Lofi Ambient Vibes | LofiSpace',
  description: 'Khám phá 15+ cảnh ambient được tuyển chọn: Tokyo Café Rain, Midnight Coding, Cozy Cabin... 1 click để nhúng vào Notion.',
  keywords: ['lofi scene', 'ambient widget', 'notion widget aesthetic', 'study vibes', 'lofi backgrounds'],
  openGraph: {
    title: 'LofiSpace Scene Gallery — Find Your Vibe',
    description: '15+ pre-made ambient scenes. One click to embed in Notion.',
  },
}

export default function ScenesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">

      {/* Hero */}
      <div className="mb-12 text-center">
        <span className="inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20 mb-4">
          ✨ 15 scenes · Miễn phí hoàn toàn
        </span>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Chọn <span className="text-violet-400">Vibe</span> của bạn
        </h1>
        <p className="mt-3 text-white/50 max-w-xl mx-auto">
          Mỗi scene là một bầu không khí hoàn chỉnh — nhạc, âm thanh, hình nền.
          Một click để dùng ngay, nhúng thẳng vào Notion.
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
        <h2 className="text-xl font-bold text-white mb-2">Muốn tạo scene riêng?</h2>
        <p className="text-white/50 text-sm mb-5">
          Mở widget để mix âm thanh, chọn GIF, tùy chỉnh màu sắc theo ý muốn.
        </p>
        <Link href="/"
          className="inline-block rounded-full bg-violet-600 px-8 py-2.5 font-semibold text-white hover:bg-violet-500 transition-colors">
          Mở Widget →
        </Link>
      </div>

      {/* AdSense — Bottom */}
      <div className="mt-8">
        <AdBanner slot={process.env.NEXT_PUBLIC_AD_SLOT_SCENES_BOT ?? ''} format="auto" style={{ minHeight: 72 }} />
      </div>
    </div>
  )
}
