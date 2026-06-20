'use client'

import { useEffect, useRef } from 'react'
import type { AmbientTrack } from '@/types/widget'

export function useAmbientAudio(tracks: AmbientTrack[], isPlaying: boolean) {
  // Map of track id → HTMLAudioElement
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  // Create/update audio elements when tracks change
  useEffect(() => {
    tracks.forEach((track) => {
      if (!audioRefs.current[track.id]) {
        const audio = new Audio(track.src)
        audio.loop = true
        audio.volume = track.volume
        audio.preload = 'none'
        audioRefs.current[track.id] = audio
      }

      const audio = audioRefs.current[track.id]
      audio.volume = track.volume

      if (track.enabled && isPlaying) {
        audio.play().catch(() => {})
      } else {
        audio.pause()
      }
    })

    // Cleanup tracks that no longer exist
    return () => {
      Object.entries(audioRefs.current).forEach(([id, audio]) => {
        if (!tracks.find((t) => t.id === id)) {
          audio.pause()
          delete audioRefs.current[id]
        }
      })
    }
  }, [tracks, isPlaying])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(audioRefs.current).forEach((a) => {
        a.pause()
        a.src = ''
      })
    }
  }, [])
}
