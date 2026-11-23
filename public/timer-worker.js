// Wakes the timer page when a countdown ends. Worker timers are not subject to the 1-per-minute
// "intensive throttling" Chrome applies to hidden tabs, so long timers still end on time.
// Message in: { endsAt: <epoch ms> } to arm, {} to cancel. Message out: 'done'.
let t = null
self.onmessage = e => {
  clearTimeout(t)
  const endsAt = e.data && e.data.endsAt
  if (!endsAt) return
  const tick = () => {
    const left = endsAt - Date.now()
    if (left <= 0) self.postMessage('done')
    else t = setTimeout(tick, Math.min(left, 1000))
  }
  tick()
}
