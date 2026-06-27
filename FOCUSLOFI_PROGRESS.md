# FocusLofi — Build Progress

## Priority Order
1. Coding Cat companion (SVG animated)
2. Daily Streak tracking
3. XP + Level system
4. Unlock desk decorations
5. Room themes (Rainy Cafe, Programmer Setup)
6. Achievement system

---

## FILES COMPLETED ✅

### Foundation
- [x] `src/lib/gameStore.ts` — Zustand store: XP, Level, Coins, Streak, Decorations, Achievements, Companion mood/messages

### Hooks
- [x] `src/hooks/useAudioEngine.ts` — Web Audio synth + HTML5 fallback + YouTube player hook
- [x] `src/hooks/usePomodoroGame.ts` — Pomodoro timer integrated with gameStore.completePomodoro()

### Companion
- [x] `src/components/companion/CodingCat.tsx` — SVG animated cat (idle/typing/sleeping/coffee/happy/excited/level_up)
- [x] `src/components/companion/ChatBubble.tsx` — Animated speech bubble above cat

### HUD
- [x] `src/components/hud/GameHUD.tsx` — Top bar: 🔥Streak | Level badge | XP progress bar | 🪙Coins

### Room
- [x] `src/components/room/RoomView.tsx` — Two themes: RainyCafe (CSS room + animated rain canvas) + ProgrammerSetup (dark desk + RGB effects) with conditional decoration rendering

### Notifications
- [x] `src/components/notifications/AchievementToast.tsx` — Slide-in toast + LevelUpOverlay (both exported from same file)

### Panels (bottom drawer via Dock)
- [x] `src/components/panels/TimerPanel.tsx` — Circular progress Pomodoro with presets
- [x] `src/components/panels/MusicPanel.tsx` — Lofi stream selector + volume + equalizer animation
- [x] `src/components/panels/SoundsPanel.tsx` — Ambient mixer with toggle + volume per sound
- [x] `src/components/panels/TasksPanel.tsx` — Todo list (localStorage, progress bar)
- [x] `src/components/panels/StatsPanel.tsx` — Stats grid + friendship bar + recent achievements
- [x] `src/components/panels/RoomPanel.tsx` — Room theme picker + decoration unlock/toggle grid
- [x] `src/components/panels/AchievementsPanel.tsx` — Achievement list with locked/unlocked state

### Dock
- [x] `src/components/dock/Dock.tsx` — Bottom icon bar with slide-up panels + mini timer badge

### Main Page
- [x] `src/app/page.tsx` — Complete game UI: HUD + RoomView + CodingCat + ChatBubble + Dock + notifications

---

## WHAT'S WORKING
- Full game loop: Complete Pomodoro → XP + coins + streak + friend points → level up → achievements → decorations unlock
- Coding Cat with 7 animated states (CSS keyframes in SVG)
- Rainy Café room with animated rain canvas + desk items + conditional decorations
- Programmer Setup room with RGB glow + dual monitors + keyboard
- Bottom dock with 7 panels (slide-up animation)
- Achievement toast (slide from right) + Level Up overlay
- Streak tracking with localStorage persistence (Zustand persist)
- All 11 achievements + 6 decorations defined

## POTENTIAL NEXT IMPROVEMENTS
- [ ] Add more companions (Coffee Capybara, Study Bunny, Fox Developer, Panda Reader)
- [ ] Companion selector panel
- [ ] More room themes (Japanese Library, Forest Cabin, Cyberpunk Office)
- [ ] Weather-based room effects (if weather widget detects rain → more rain in room)
- [ ] Daily stats reset (today's pomodoros)
- [ ] Settings panel (accent color picker, companion picker)
- [ ] Sound presets save/load
- [ ] Shareable workspace URL (embed page still works at /embed)
- [ ] Mobile responsive adjustments

## DESIGN DECISION (2026-06-22)
Rolled back to old EmbedClient design. Game functions integrated INTO EmbedClient:
- `src/app/page.tsx` → simple Suspense wrapper rendering `<EmbedClient />`
- Pomodoro completion auto-calls `completePomodoro(25)` via phase change detection
- Streak checked on mount via `checkAndUpdateStreak()`
- Pet tab: shows **CodingCat** (with mood = typing/coffee/idle) + streak/level/coins/XP bar
- New **"🏆 XP"** sub-tab in More panel: level badge, XP bar, 3-stat grid, full achievements list
- AchievementToast + LevelUpOverlay layered over the widget (zIndex works with glassmorphism)
- All game components (GameHUD, RoomView, Dock, etc.) still exist in their files but unused from `/`

## RESUME INSTRUCTIONS
All core files are complete. If resuming, run `npm run dev` and test:
1. Open `/` — should show FocusLofi game UI
2. Click ⏱️ → start timer → when done, cat should celebrate + XP increases in HUD
3. 10 sessions → desk-plant unlocks → Room panel shows it
4. Click 🏠 → switch room theme → change Room
5. /embed still works for sharing

---

## ARCHITECTURE NOTES

### Layout
```
+──────────────────────────────────────+
│ HUD: streak | lv | xp bar | coins   │  56px
+──────────────────────────────────────+
│                                      │
│  ROOM VIEW (full width, flex-grow)   │
│  - Background gradient (theme)       │
│  - Window + weather effect           │
│  - Furniture SVG                     │
│  - Cat on desk                       │
│  - Active decorations                │
│                                      │
+──────────────────────────────────────+
│ DOCK: icons → open panel above       │  64px
+──────────────────────────────────────+
  [PANEL slides up from dock when open]
```

### Audio System
- YouTube Iframe API (hidden 1x1 div) for lofi streams
- Web Audio API synth (pink noise) for ambient sounds as instant fallback
- HTML5 Audio takes over from synth when file loads (cross-fade)
- All audio state managed in useAudioEngine hook

### Game Loop
- completePomodoro(minutes) → updates XP, streak, coins, checks unlocks + achievements
- Companion mood changes reactively to game events
- Companion message auto-clears after 4s

### Room Themes
- rainy-cafe: warm amber wall, window with CSS rain animation, round cafe table
- programmer-setup: dark blue wall, monitor silhouettes, RGB glow effects

### Decoration System
- Unlocks based on totalPomodoros thresholds (5, 10, 15, 25, 50, 100)
- Decorations rendered as SVG elements inside RoomView
- User can toggle active decorations in RoomPanel

### Streak Logic
- Stored as { streak: number, lastActiveDate: 'YYYY-MM-DD' }
- On app load: checkAndUpdateStreak() resets streak if lastActiveDate < yesterday
- completePomodoro() increments streak if lastActiveDate was yesterday

---

## RESUME INSTRUCTIONS

When resuming next session, tell Claude:
"Resume FocusLofi build. See FOCUSLOFI_PROGRESS.md for what's done and what's next.
The gameStore is complete. Continue from useAudioEngine hook, then CodingCat SVG,
then GameHUD, then RoomView, then notifications, then all panels, then Dock, then page.tsx.
Keep all inline styles (no Tailwind classes in game components — use CSS variables and inline styles like the existing EmbedClient for precise game-like control)."
