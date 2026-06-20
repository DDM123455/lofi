'use client'

import { useEffect } from 'react'
import { AudioEngine } from '@/components/audio/AudioEngine'
import { BackgroundLayer } from './BackgroundLayer'
import { ControlBar } from './ControlBar'
import { ClockWidget } from './ClockWidget'
import { PomodoroTimer } from './PomodoroTimer'
import { useAudioStore } from '@/store/audioStore'
import type { WidgetConfig } from '@/types/widget'

interface WidgetCanvasProps {
  config: WidgetConfig
  /** If true, shows "Powered by" footer (embed mode only) */
  showBranding?: boolean
  className?: string
}

export function WidgetCanvas({ config, showBranding = false, className }: WidgetCanvasProps) {
  const { syncFromConfig } = useAudioStore()

  useEffect(() => {
    syncFromConfig({
      lofiStreamId: config.lofiStreamId,
      lofiVolume: config.lofiVolume,
      ambientTracks: config.ambientTracks,
    })
  }, [config, syncFromConfig])

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-2xl p-4 ${className ?? ''}`}
    >
      {/* Background */}
      <BackgroundLayer config={config} />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Audio Engine (invisible) */}
      <AudioEngine />

      {/* Top: Clock */}
      <div className="relative z-10 mt-2">
        {config.showClock && (
          <ClockWidget format={config.clockFormat} accentColor={config.accentColor} />
        )}
      </div>

      {/* Center: Pomodoro */}
      <div className="relative z-10">
        {config.showPomodoro && (
          <PomodoroTimer
            workMinutes={config.pomodoroWork}
            breakMinutes={config.pomodoroBreak}
            accentColor={config.accentColor}
          />
        )}
      </div>

      {/* Bottom: Controls + Branding */}
      <div className="relative z-10 w-full space-y-2">
        <div className="flex justify-center">
          <ControlBar accentColor={config.accentColor} />
        </div>

        {showBranding && (
          <p className="text-center text-[10px] text-white/20">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:text-white/50"
            >
              Powered by LofiSpace — Create your own
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
