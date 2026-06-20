'use client'

import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { useAudioStore } from '@/store/audioStore'
import { cn } from '@/lib/utils'

interface ControlBarProps {
  accentColor?: string
  className?: string
}

export function ControlBar({ accentColor = '#a78bfa', className }: ControlBarProps) {
  const { isPlaying, lofiVolume, togglePlay, setLofiVolume } = useAudioStore()

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl bg-black/40 px-4 py-2 backdrop-blur-sm',
        className
      )}
    >
      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: accentColor }}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 fill-white text-white" />
        ) : (
          <Play className="h-5 w-5 fill-white text-white" />
        )}
      </button>

      {/* Lofi Volume */}
      <button
        aria-label="Toggle mute"
        onClick={() => setLofiVolume(lofiVolume > 0 ? 0 : 0.7)}
        className="shrink-0 text-white/60 hover:text-white"
      >
        {lofiVolume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>

      <Slider
        min={0}
        max={1}
        step={0.01}
        value={[lofiVolume]}
        onValueChange={(val) => setLofiVolume(Array.isArray(val) ? (val as number[])[0] : (val as number))}
        className="w-24"
      />

      {/* Animated equalizer bars when playing */}
      {isPlaying && (
        <div className="flex items-end gap-[2px]" aria-hidden="true">
          {[3, 5, 4, 6, 3].map((h, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full"
              style={{
                backgroundColor: accentColor,
                height: `${h * 3}px`,
                animation: `eq-bounce ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
