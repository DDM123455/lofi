'use client'

import { create } from 'zustand'
import { DEFAULT_WIDGET_CONFIG, serializeConfig } from '@/lib/widgetConfig'
import type { WidgetConfig } from '@/types/widget'

interface WidgetState {
  config: WidgetConfig
  embedUrl: string

  updateConfig: (patch: Partial<WidgetConfig>) => void
  setConfig: (config: WidgetConfig) => void
  getEmbedUrl: () => string
}

function buildEmbedUrl(config: WidgetConfig): string {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/embed?${serializeConfig(config)}`
}

export const useWidgetStore = create<WidgetState>((set, get) => ({
  config: DEFAULT_WIDGET_CONFIG,
  embedUrl: '',

  updateConfig: (patch) => {
    const next = { ...get().config, ...patch }
    set({ config: next, embedUrl: buildEmbedUrl(next) })
  },

  setConfig: (config) => {
    set({ config, embedUrl: buildEmbedUrl(config) })
  },

  getEmbedUrl: () => {
    const config = get().config
    return buildEmbedUrl(config)
  },
}))
