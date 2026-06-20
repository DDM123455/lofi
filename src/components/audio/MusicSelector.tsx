'use client'

import Image from 'next/image'
import { LOFI_STREAMS } from '@/lib/youtubeStreams'
import { useAudioStore } from '@/store/audioStore'
import { cn } from '@/lib/utils'

export function MusicSelector() {
  const { lofiStreamId, setLofiStream } = useAudioStore()

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Lofi Stream</p>
      <div className="grid grid-cols-1 gap-2">
        {LOFI_STREAMS.map((stream) => (
          <button
            key={stream.id}
            onClick={() => setLofiStream(stream.id)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
              lofiStreamId === stream.id
                ? 'bg-violet-600/80 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            )}
          >
            <Image
              src={stream.thumbnail}
              alt={stream.label}
              width={48}
              height={36}
              className="rounded object-cover"
              unoptimized
            />
            <span className="truncate">{stream.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
