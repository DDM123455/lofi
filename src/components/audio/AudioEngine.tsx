'use client'

import { useId } from 'react'
import { useAudioStore } from '@/store/audioStore'
import { useYouTubePlayer, getYouTubeVideoId } from '@/hooks/useYouTubePlayer'
import { useAmbientAudio } from '@/hooks/useAmbientAudio'

/**
 * Invisible component that owns all audio playback.
 * Mount once inside the widget canvas — handles both YouTube + ambient.
 */
export function AudioEngine() {
  const ytContainerId = useId().replace(/:/g, '')

  const { isPlaying, lofiVolume, lofiStreamId, ambientTracks } = useAudioStore()

  const videoId = getYouTubeVideoId(lofiStreamId)

  useYouTubePlayer({
    containerId: `yt-player-${ytContainerId}`,
    videoId,
    volume: lofiVolume,
    isPlaying,
  })

  useAmbientAudio(ambientTracks, isPlaying)

  return (
    // YouTube requires a real DOM node — keep it 1×1 and off-screen
    <div
      id={`yt-player-${ytContainerId}`}
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none',
        bottom: 0,
        right: 0,
        zIndex: -1,
      }}
    />
  )
}
