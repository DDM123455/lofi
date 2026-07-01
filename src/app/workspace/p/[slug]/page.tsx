import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PRESETS, getPreset, presetWorkspaceUrl, presetCanonicalUrl } from '@/lib/presets'
import { PresetLaunchClient } from './PresetLaunchClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PRESETS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const preset = getPreset(slug)
  if (!preset) return {}

  const title = `${preset.title} — Focus Workspace Preset`
  const canonical = presetCanonicalUrl(slug)

  return {
    title,
    description: preset.description,
    keywords: preset.keywords,
    alternates: { canonical },
    // Preset pages auto-redirect to /workspace — noindex to avoid doorway page penalty
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description: preset.description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: preset.description,
    },
  }
}

export default async function PresetPage({ params }: Props) {
  const { slug } = await params
  const preset = getPreset(slug)
  if (!preset) notFound()

  const workspaceUrl = presetWorkspaceUrl(preset)

  return <PresetLaunchClient preset={preset} workspaceUrl={workspaceUrl} />
}
