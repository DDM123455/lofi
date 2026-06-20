'use client'

import { useEffect, useRef, useCallback } from 'react'
import { LOFI_STREAMS } from '@/lib/youtubeStreams'

/// <reference types="youtube" />

declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: () => void
  }
}

interface UseYouTubePlayerOptions {
  containerId: string
  videoId: string
  volume: number // 0-1
  isPlaying: boolean
}

export function useYouTubePlayer({
  containerId,
  videoId,
  volume,
  isPlaying,
}: UseYouTubePlayerOptions) {
  const playerRef = useRef<YT.Player | null>(null)
  const readyRef = useRef(false)

  const initPlayer = useCallback(() => {
    if (!window.YT?.Player) return

    playerRef.current = new window.YT.Player(containerId, {
      width: '1',
      height: '1',
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          readyRef.current = true
          playerRef.current?.setVolume(Math.round(volume * 100))
          if (isPlaying) playerRef.current?.playVideo()
        },
        onError: (e) => {
          console.warn('[YT] Player error:', e.data)
        },
      },
    })
  }, [containerId, videoId, volume, isPlaying])

  // Load YouTube IFrame API script once
  useEffect(() => {
    if (window.YT?.Player) {
      initPlayer()
      return
    }

    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script')
      tag.id = 'yt-iframe-api'
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }

    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      initPlayer()
    }

    return () => {
      playerRef.current?.destroy()
      playerRef.current = null
      readyRef.current = false
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle play/pause
  useEffect(() => {
    if (!readyRef.current || !playerRef.current) return
    if (isPlaying) {
      playerRef.current.playVideo()
    } else {
      playerRef.current.pauseVideo()
    }
  }, [isPlaying])

  // Handle volume change
  useEffect(() => {
    if (!readyRef.current || !playerRef.current) return
    playerRef.current.setVolume(Math.round(volume * 100))
  }, [volume])

  // Handle video ID change (switch stream)
  useEffect(() => {
    if (!readyRef.current || !playerRef.current) return
    playerRef.current.loadVideoById(videoId)
    if (!isPlaying) playerRef.current.pauseVideo()
  }, [videoId]) // eslint-disable-line react-hooks/exhaustive-deps

  return playerRef
}

export function getYouTubeVideoId(streamId: string): string {
  return LOFI_STREAMS.find((s) => s.id === streamId)?.youtubeId ?? LOFI_STREAMS[0].youtubeId
}
