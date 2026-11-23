// Alarm sounds for the timer pages, synthesised into AudioBuffers (no files to load or 404).
// The alarm is *scheduled* on the AudioContext clock when the timer starts, so it rings on
// time even when the browser throttles JavaScript in a background tab.

export type AlarmSound = 'bell' | 'digital' | 'chime' | 'gong'
export const ALARM_SOUNDS: { id: AlarmSound; label: string }[] = [
  { id: 'bell', label: 'Bell' },
  { id: 'digital', label: 'Digital' },
  { id: 'chime', label: 'Gentle chime' },
  { id: 'gong', label: 'Soft gong' },
]

interface Note { at: number; freq: number; dur: number; partials: [number, number][]; decay: number; square?: boolean }

/** One repetition of each pattern, plus the silence before it repeats (seconds). */
const PATTERNS: Record<AlarmSound, { period: number; notes: Note[] }> = {
  bell: {
    period: 2.2,
    notes: [0, 0.55].map(at => ({ at, freq: 880, dur: 1.6, decay: 2.6, partials: [[1, 1], [2.0, 0.45], [2.76, 0.3], [5.4, 0.12]] as [number, number][] })),
  },
  digital: {
    period: 1.4,
    notes: [0, 0.16, 0.32, 0.48].map(at => ({ at, freq: 2000, dur: 0.1, decay: 0, square: true, partials: [[1, 1]] as [number, number][] })),
  },
  chime: {
    period: 2.8,
    notes: [[0, 1046.5], [0.32, 1318.5], [0.64, 1568]].map(([at, freq]) => ({ at, freq, dur: 1.5, decay: 3.2, partials: [[1, 1], [2, 0.2], [3, 0.06]] as [number, number][] })),
  },
  gong: {
    period: 4.2,
    notes: [{ at: 0, freq: 196, dur: 3.8, decay: 1.1, partials: [[1, 1], [1.48, 0.5], [2.09, 0.35], [2.7, 0.2], [3.9, 0.08]] as [number, number][] }],
  },
}

const cache = new WeakMap<AudioContext, Partial<Record<AlarmSound, AudioBuffer>>>()

function render(ctx: AudioContext, sound: AlarmSound): AudioBuffer {
  const per = cache.get(ctx) ?? {}
  if (per[sound]) return per[sound]!
  const { period, notes } = PATTERNS[sound]
  const sr = ctx.sampleRate
  const buf = ctx.createBuffer(1, Math.ceil(period * sr), sr)
  const d = buf.getChannelData(0)
  for (const n of notes) {
    const start = Math.floor(n.at * sr), len = Math.floor(n.dur * sr)
    for (let i = 0; i < len && start + i < d.length; i++) {
      const t = i / sr
      const attack = Math.min(1, t / 0.004)
      const env = n.square ? attack * Math.min(1, (n.dur - t) / 0.01) : attack * Math.exp(-n.decay * t)
      let v = 0
      for (const [mul, amp] of n.partials) {
        const ph = Math.sin(2 * Math.PI * n.freq * mul * t)
        v += amp * (n.square ? Math.sign(ph) * 0.35 : ph)
      }
      d[start + i] += v * env * 0.32
    }
  }
  per[sound] = buf
  cache.set(ctx, per)
  return buf
}

export interface ScheduledAlarm {
  stop: () => void
  setVolume: (v: number) => void
}

/**
 * Starts the looping alarm at `when` (AudioContext time). `onRing` fires when it starts
 * sounding — via an audio-thread `ended` event, which is not subject to timer throttling.
 */
export function scheduleAlarm(ctx: AudioContext, sound: AlarmSound, volume: number, when: number, onRing?: () => void): ScheduledAlarm {
  const gain = ctx.createGain()
  gain.gain.value = volume
  gain.connect(ctx.destination)
  const src = ctx.createBufferSource()
  src.buffer = render(ctx, sound)
  src.loop = true
  src.connect(gain)
  const at = Math.max(ctx.currentTime, when)
  src.start(at)
  // A 1-sample silent buffer that *ends* exactly when the alarm starts.
  const marker = ctx.createBufferSource()
  marker.buffer = ctx.createBuffer(1, 1, ctx.sampleRate)
  marker.connect(gain)
  if (onRing) marker.onended = () => onRing()
  marker.start(Math.max(ctx.currentTime, at - 1 / ctx.sampleRate))
  let stopped = false
  return {
    stop: () => {
      if (stopped) return
      stopped = true
      marker.onended = null
      try { src.stop() } catch { /* not started */ }
      try { marker.stop() } catch { /* ignore */ }
      gain.disconnect()
    },
    setVolume: v => { gain.gain.setTargetAtTime(v, ctx.currentTime, 0.02) },
  }
}

/** Plays one repetition, for the "test sound" button. */
export function previewAlarm(ctx: AudioContext, sound: AlarmSound, volume: number) {
  const gain = ctx.createGain()
  gain.gain.value = volume
  gain.connect(ctx.destination)
  const src = ctx.createBufferSource()
  src.buffer = render(ctx, sound)
  src.connect(gain)
  src.onended = () => gain.disconnect()
  src.start()
}
