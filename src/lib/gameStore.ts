import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CompanionMood = 'idle' | 'typing' | 'sleeping' | 'coffee' | 'happy' | 'excited' | 'level_up'
export type RoomTheme = 'rainy-cafe' | 'programmer-setup'

export interface AchievementDef {
  id: string
  title: string
  desc: string
  emoji: string
  check: (s: { totalPomodoros: number; streak: number; level: number; totalFocusMinutes: number }) => boolean
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  { id: 'first_focus',    title: 'First Focus',      desc: 'Hoàn thành Pomodoro đầu tiên',      emoji: '🎯', check: s => s.totalPomodoros >= 1   },
  { id: 'ten_sessions',   title: 'Getting Serious',   desc: 'Hoàn thành 10 Pomodoro',            emoji: '🔥', check: s => s.totalPomodoros >= 10  },
  { id: 'fifty_sessions', title: 'Focus Master',      desc: 'Hoàn thành 50 Pomodoro',            emoji: '⚡', check: s => s.totalPomodoros >= 50  },
  { id: 'hundred',        title: 'Legendary',         desc: 'Hoàn thành 100 Pomodoro',           emoji: '🏆', check: s => s.totalPomodoros >= 100 },
  { id: 'streak_3',       title: 'Habit Forming',     desc: '3 ngày streak liên tiếp',           emoji: '📅', check: s => s.streak >= 3           },
  { id: 'streak_7',       title: 'One Week Strong',   desc: '7 ngày streak liên tiếp',           emoji: '🗓️', check: s => s.streak >= 7           },
  { id: 'streak_30',      title: 'Monthly Master',    desc: '30 ngày streak liên tiếp',          emoji: '🌟', check: s => s.streak >= 30          },
  { id: 'level_5',        title: 'Rising Star',       desc: 'Đạt Level 5',                       emoji: '⭐', check: s => s.level >= 5            },
  { id: 'level_10',       title: 'Veteran',           desc: 'Đạt Level 10',                      emoji: '💎', check: s => s.level >= 10           },
  { id: 'focus_5h',       title: 'Deep Worker',       desc: 'Tập trung tổng cộng 5 giờ',        emoji: '🧠', check: s => s.totalFocusMinutes >= 300 },
  { id: 'focus_24h',      title: 'Full Day Focus',    desc: 'Tập trung tổng cộng 24 giờ',       emoji: '🕰️', check: s => s.totalFocusMinutes >= 1440 },
]

export interface DecorationDef {
  id: string
  label: string
  emoji: string
  unlockAt: number // total pomodoros required
  desc: string
}

export const DECORATION_DEFS: DecorationDef[] = [
  { id: 'desk-plant',      label: 'Cây xanh',         emoji: '🪴', unlockAt: 10,  desc: 'Unlock sau 10 Pomodoro'  },
  { id: 'mech-keyboard',   label: 'Bàn phím cơ',      emoji: '⌨️', unlockAt: 25,  desc: 'Unlock sau 25 Pomodoro'  },
  { id: 'second-monitor',  label: 'Màn hình phụ',     emoji: '🖥️', unlockAt: 50,  desc: 'Unlock sau 50 Pomodoro'  },
  { id: 'gaming-setup',    label: 'Gaming Setup',      emoji: '🎮', unlockAt: 100, desc: 'Unlock sau 100 Pomodoro' },
  { id: 'coffee-mug',      label: 'Ly cà phê',        emoji: '☕', unlockAt: 5,   desc: 'Unlock sau 5 Pomodoro'   },
  { id: 'bookshelf',       label: 'Giá sách',         emoji: '📚', unlockAt: 15,  desc: 'Unlock sau 15 Pomodoro'  },
]

function xpForLevel(level: number): number {
  return level * 120
}

function localDate(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function computeStreak(lastActiveDate: string | null, currentStreak: number): number {
  const today = localDate()
  if (lastActiveDate === today) return currentStreak
  const yesterday = localDate(new Date(Date.now() - 86400000))
  if (lastActiveDate === yesterday) return currentStreak + 1
  return 1
}

interface GameStore {
  // Progression
  xp: number
  level: number
  coins: number
  friendship: number

  // Streak
  streak: number
  lastActiveDate: string | null
  bestStreak: number

  // Companion
  companionMood: CompanionMood
  companionMessage: string | null

  // Room
  roomTheme: RoomTheme
  unlockedDecorations: string[]
  activeDecorations: string[]

  // Stats
  totalPomodoros: number
  totalFocusMinutes: number

  // Achievements
  unlockedAchievements: string[]

  // Notification queues
  pendingAchievements: string[]
  newLevelReached: number | null

  // Actions
  completePomodoro: (minutes?: number) => void
  setCompanionMood: (mood: CompanionMood) => void
  setCompanionMessage: (msg: string | null) => void
  setRoomTheme: (theme: RoomTheme) => void
  toggleDecoration: (id: string) => void
  recordActivity: () => void
  checkAndUpdateStreak: () => void
  dismissAchievement: () => void
  dismissLevelUp: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      coins: 0,
      friendship: 0,
      streak: 0,
      lastActiveDate: null,
      bestStreak: 0,
      companionMood: 'idle',
      companionMessage: null,
      roomTheme: 'rainy-cafe',
      unlockedDecorations: ['coffee-mug'],
      activeDecorations: ['coffee-mug'],
      totalPomodoros: 0,
      totalFocusMinutes: 0,
      unlockedAchievements: [],
      pendingAchievements: [],
      newLevelReached: null,

      recordActivity: () => {
        const state = get()
        const today = localDate()
        if (state.lastActiveDate === today) return
        const newStreak = computeStreak(state.lastActiveDate, state.streak)
        set({
          streak: newStreak,
          lastActiveDate: today,
          bestStreak: Math.max(state.bestStreak, newStreak),
        })
      },

      completePomodoro: (minutes = 25) => {
        const state = get()
        const xpGain = minutes
        const coinGain = Math.floor(minutes * 0.4)

        let newXp = state.xp + xpGain
        let newLevel = state.level
        let leveledUp = false
        while (newXp >= xpForLevel(newLevel)) {
          newXp -= xpForLevel(newLevel)
          newLevel++
          leveledUp = true
        }

        const newTotalPoms = state.totalPomodoros + 1
        const newTotalMins = state.totalFocusMinutes + minutes

        // Streak: dùng computeStreak (local date, không double-count hôm nay)
        const newStreak = computeStreak(state.lastActiveDate, state.streak)
        let newBest = Math.max(state.bestStreak, newStreak)

        // Decoration unlocks
        const newDecUnlocks = DECORATION_DEFS
          .filter(d => !state.unlockedDecorations.includes(d.id) && newTotalPoms >= d.unlockAt)
          .map(d => d.id)

        // Achievement unlocks
        const checkState = { totalPomodoros: newTotalPoms, streak: newStreak, level: newLevel, totalFocusMinutes: newTotalMins }
        const newAchievements = ACHIEVEMENT_DEFS
          .filter(a => !state.unlockedAchievements.includes(a.id) && a.check(checkState))
          .map(a => a.id)

        // Companion message
        let message: string
        if (leveledUp) message = `Level ${newLevel}! You're unstoppable! ✨`
        else if (newStreak > state.streak) message = `${newStreak} day streak! 🔥`
        else if (newTotalPoms % 10 === 0) message = `${newTotalPoms} sessions done! Legendary! 🏆`
        else message = ['Great work! 🎉', 'That was productive!', "Let's keep going! 💪", 'One session at a time! 🎯'][newTotalPoms % 4]

        set({
          xp: newXp,
          level: newLevel,
          coins: state.coins + coinGain,
          friendship: Math.min(100, state.friendship + 5),
          totalPomodoros: newTotalPoms,
          totalFocusMinutes: newTotalMins,
          streak: newStreak,
          lastActiveDate: localDate(),
          bestStreak: newBest,
          unlockedDecorations: [...state.unlockedDecorations, ...newDecUnlocks],
          unlockedAchievements: [...state.unlockedAchievements, ...newAchievements],
          pendingAchievements: [...state.pendingAchievements, ...newAchievements],
          newLevelReached: leveledUp ? newLevel : state.newLevelReached,
          companionMood: leveledUp ? 'level_up' : 'happy',
          companionMessage: message,
        })

        setTimeout(() => {
          const s = get()
          if (s.companionMood === 'happy' || s.companionMood === 'level_up') {
            set({ companionMood: 'idle', companionMessage: null })
          }
        }, 4000)
      },

      setCompanionMood: (mood) => set({ companionMood: mood }),
      setCompanionMessage: (msg) => set({ companionMessage: msg }),
      setRoomTheme: (theme) => set({ roomTheme: theme }),

      toggleDecoration: (id) => {
        const { activeDecorations, unlockedDecorations } = get()
        if (!unlockedDecorations.includes(id)) return
        set({
          activeDecorations: activeDecorations.includes(id)
            ? activeDecorations.filter(d => d !== id)
            : [...activeDecorations, id],
        })
      },

      // Streak reset xảy ra tự nhiên trong computeStreak() khi user hoàn thành
      // Pomodoro hoặc recordActivity() — không cần reset sớm khi mở app.
      checkAndUpdateStreak: () => {},

      dismissAchievement: () => {
        const { pendingAchievements } = get()
        set({ pendingAchievements: pendingAchievements.slice(1) })
      },

      dismissLevelUp: () => set({ newLevelReached: null }),
    }),
    { name: 'focuslofi-v1' }
  )
)

export function xpProgress(xp: number, level: number) {
  return { current: xp, max: xpForLevel(level), pct: Math.min(100, (xp / xpForLevel(level)) * 100) }
}
