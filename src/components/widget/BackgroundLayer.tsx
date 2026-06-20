'use client'

import type { WidgetConfig } from '@/types/widget'

interface BackgroundLayerProps {
  config: Pick<WidgetConfig, 'backgroundType' | 'backgroundValue' | 'backgroundOpacity'>
}

export function BackgroundLayer({ config }: BackgroundLayerProps) {
  const { backgroundType, backgroundValue, backgroundOpacity } = config
  const opacity = backgroundOpacity / 100

  if (backgroundType === 'color') {
    return (
      <div
        className="absolute inset-0"
        style={{ backgroundColor: backgroundValue, opacity }}
      />
    )
  }

  // GIF or external URL
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={backgroundValue}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ opacity }}
      draggable={false}
    />
  )
}
