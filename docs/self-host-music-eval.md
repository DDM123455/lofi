# Self-hosted lofi music — evaluation

**Status:** evaluation only. No playback code changed. The workspace still streams lofi
through the YouTube IFrame API (`initYT` in `src/app/embed/EmbedClient.tsx`), now with
preconnect warm-up and a one-shot auto-retry (see workstream A4).

## Why consider moving off YouTube

| Problem with the YouTube path | Impact |
|---|---|
| The IFrame API pulls ~1 MB of YouTube JS/CSS on first play | competes with hydration + the background video on cold load |
| Embeds are blocked on some networks / by some extensions | `ytStatus === 'blocked'`, user sees a Retry button |
| No control over buffering, gapless loop, or crossfade | track changes tear down and rebuild a whole player |
| Playback is subject to YouTube ToS and can break if a stream goes private | the 3 hard-coded stream IDs in `src/lib/lofiStreams.ts` are a standing risk |

Self-hosting 2–3 short loops as `<audio>` elements removes all four at the cost of
bandwidth + a licensing obligation.

## Candidate sources (royalty-free / license-clear)

| Source | License | Attribution required | Notes |
|---|---|---|---|
| **Pixabay Music** (pixabay.com/music) | Pixabay Content License | No (appreciated) | Large lofi selection, direct MP3 download, no signup for download. Safest default. |
| **Uppbeat** (uppbeat.io) | Uppbeat free license | Yes — credit string per track; free tier has a monthly download cap | Good quality; the credit requirement means a visible "Music by …" line. |
| **Chosic** (chosic.com/free-music/lofi) | mostly CC-BY / CC0 (per track) | Per track (CC-BY yes, CC0 no) | Aggregates Free Music Archive + others; check each track's badge. |
| **Free Music Archive** — CC0 / CC-BY filter | CC0 or CC-BY | CC-BY: yes | Filter strictly to CC0 to avoid an attribution UI. |
| **Chillhop** | proprietary; free use only for personal streams, **not** redistribution/embedding | — | ❌ Not usable for a hosted product without a commercial agreement. |

**Recommendation:** pick **3 Pixabay Music lofi loops** (CC-equivalent, no attribution
string needed) as the shipping set, plus keep one Uppbeat/CC-BY option behind an
attribution line if a specific track is wanted.

## Storage / bandwidth cost (Vercel)

- A 3–5 minute lofi loop at 128 kbps CBR MP3 ≈ **3–5 MB**; at 96 kbps ≈ 2–3.5 MB.
- 3 loops ≈ **10–15 MB** committed to `public/audio/` (well under repo/deploy limits).
- Served with `Cache-Control: public, max-age=31536000, immutable` (mirror the existing
  `/video/:path*` header in `next.config.ts`) → one download per user per version.
- At ~100 MB egress/GB on Vercel's included bandwidth, even 10k first-plays/month of a
  4 MB file ≈ 40 GB — fine on Pro, watch on Hobby. Range requests keep re-listens cheap.
- Encode as **MP3** (universal) and optionally **Opus in WebM** as a smaller `<source>`
  for Chromium/Firefox; Safari falls back to MP3.

## Proposed implementation (follow-up, not this pass)

1. `src/lib/lofiStreams.ts`: add a parallel `LOCAL_TRACKS: { id, label, src, credit? }[]`.
2. `EmbedClient`: a `musicSource: 'youtube' | 'local'` state, default `'youtube'`, switched
   by a `?src=local` URL param and a toggle in the Music panel. When `'local'`, render a
   single reused `<audio loop preload="auto">`; `handleLofiChange` swaps `src` + `.load()`
   (same imperative pattern now used for the background `<video>`), crossfade volume on
   change. Reuse `handleLofiVol` for the slider.
3. Drop the ~1 MB YouTube pre-init and the `blocked` UI entirely when `musicSource === 'local'`.
4. If any chosen track is CC-BY / Uppbeat: render a small "Music: <title> — <artist>" line
   in the Music panel and add the credit to `/about`.
5. Keep YouTube as the "custom URL" path (users pasting their own stream) regardless.

## Decision needed from the owner

- Ship self-hosted as the **default** (best UX, removes the blocked-embed failure) or keep
  it opt-in behind `?src=local` for one release to watch bandwidth?
- Accept an attribution line anywhere, or restrict the shipping set to no-attribution
  (Pixabay / CC0) tracks only?
