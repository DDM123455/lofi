'use client'

import { Slider } from '@/components/ui/slider'
import { useAudioStore } from '@/store/audioStore'
import { cn } from '@/lib/utils'

export function AmbientTrackList() {
  const { ambientTracks, toggleAmbientTrack, setAmbientVolume } = useAudioStore()

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Ambient Mix</p>
      <div className="space-y-3">
        {ambientTracks.map((track) => (
          <div key={track.id} className="flex items-center gap-3">
            <button
              onClick={() => toggleAmbientTrack(track.id)}
              title={track.label}
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-colors',
                track.enabled
                  ? 'bg-violet-600/80 shadow-md shadow-violet-900/40'
                  : 'bg-white/5 opacity-50 hover:opacity-80'
              )}
            >
              {track.emoji}
            </button>

            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-xs text-white/40">
                <span>{track.label}</span>
                <span>{Math.round(track.volume * 100)}%</span>
              </div>
              <Slider
                min={0}
                max={1}
                step={0.01}
                value={[track.volume]}
                onValueChange={(val) => setAmbientVolume(track.id, Array.isArray(val) ? (val as number[])[0] : (val as number))}
                disabled={!track.enabled}
                className={cn(!track.enabled && 'opacity-30')}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
