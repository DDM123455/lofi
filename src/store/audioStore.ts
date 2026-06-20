'use client'

import { create } from 'zustand'
import { DEFAULT_AMBIENT_TRACKS } from '@/lib/youtubeStreams'
import type { AmbientTrack } from '@/types/widget'

interface AudioState {
  isPlaying: boolean
  lofiVolume: number
  lofiStreamId: string
  ambientTracks: AmbientTrack[]

  // Actions
  setPlaying: (v: boolean) => void
  togglePlay: () => void
  setLofiVolume: (v: number) => void
  setLofiStream: (id: string) => void
  setAmbientVolume: (id: string, volume: number) => void
  toggleAmbientTrack: (id: string) => void
  syncFromConfig: (config: {
    lofiStreamId: string
    lofiVolume: number
    ambientTracks: Record<string, { volume: number; enabled: boolean }>
  }) => void
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  lofiVolume: 0.7,
  lofiStreamId: 'lofi-girl',
  ambientTracks: DEFAULT_AMBIENT_TRACKS,

  setPlaying: (v) => set({ isPlaying: v }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setLofiVolume: (v) => set({ lofiVolume: v }),
  setLofiStream: (id) => set({ lofiStreamId: id }),

  setAmbientVolume: (id, volume) =>
    set((s) => ({
      ambientTracks: s.ambientTracks.map((t) => (t.id === id ? { ...t, volume } : t)),
    })),

  toggleAmbientTrack: (id) =>
    set((s) => ({
      ambientTracks: s.ambientTracks.map((t) =>
        t.id === id ? { ...t, enabled: !t.enabled } : t
      ),
    })),

  syncFromConfig: ({ lofiStreamId, lofiVolume, ambientTracks }) =>
    set((s) => ({
      lofiStreamId,
      lofiVolume,
      ambientTracks: s.ambientTracks.map((t) => ({
        ...t,
        ...(ambientTracks[t.id] ?? {}),
      })),
    })),
}))
