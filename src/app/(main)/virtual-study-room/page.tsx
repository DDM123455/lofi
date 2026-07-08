import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Virtual Study Room — Free Online Study Space with Lofi Music',
  description:
    'Free virtual study room with lofi music, ambient sounds, Pomodoro timer, and XP streaks. Animated backgrounds — anime, cottage, coding space. No sign-up.',
  keywords: [
    'virtual study room', 'online study room', 'virtual study space', 'study room online',
    'virtual study hall', 'online study environment', 'aesthetic study room online',
    'free virtual study room', 'lofi study room', 'virtual library', 'study room with music',
  ],
  alternates: { canonical: 'https://www.focusworkspace.app/virtual-study-room' },
  openGraph: {
    title: 'Virtual Study Room — Free Online Study Space | LofiSpace',
    description: 'Free virtual study room with lofi music, Pomodoro timer, XP streaks and beautiful animated scenes.',
    url: 'https://www.focusworkspace.app/virtual-study-room',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Virtual Study Room | LofiSpace',
    description: 'Study in a beautiful virtual room with lofi music, ambient sounds and Pomodoro timer. No sign-up.',
  },
}

const ROOMS = [
  {
    href: '/online-study-room',
    emoji: '📚',
    title: 'Online Study Room',
    vibe: 'Warm · Classical · Timeless',
    desc: 'A cosy lofi-lit study desk with books, plants, and rain on the window. The most popular virtual study room on LofiSpace. Lofi hip hop + rain sounds included.',
    badge: 'Most popular',
    badgeColor: 'violet',
  },
  {
    href: '/anime-study-room',
    emoji: '🌸',
    title: 'Anime Study Room',
    vibe: 'Japanese · Aesthetic · Dreamy',
    desc: 'Cherry blossoms, tatami mat, soft daylight through shoji screens. City-pop lofi music. Inspired by Studio Ghibli study scenes.',
    badge: 'Fan favourite',
    badgeColor: 'pink',
  },
  {
    href: '/coding-room',
    emoji: '💻',
    title: 'Coding Room',
    vibe: 'Dark · Electric · Focused',
    desc: 'Dual monitors, dark theme, neon city rain. Synthwave music for late-night coding sessions. The developer\'s virtual study room.',
    badge: null,
    badgeColor: null,
  },
  {
    href: '/focus-room',
    emoji: '🎯',
    title: 'Focus Room',
    vibe: 'Minimal · Intense · Zen',
    desc: 'Stripped to essentials. No visual clutter — just a desk, a view, and a thunderstorm. Built for maximum cognitive output.',
    badge: null,
    badgeColor: null,
  },
  {
    href: '/deep-work-room',
    emoji: '🧠',
    title: 'Deep Work Room',
    vibe: 'Heavy · Rain · Immersive',
    desc: 'Heavy rain, minimal interface, ambient beats. For 2+ hour focused work marathons. Based on Cal Newport\'s deep work principles.',
    badge: null,
    badgeColor: null,
  },
]

const FEATURES = [
  {
    emoji: '🎵',
    title: 'Lofi music streams',
    desc: 'Lofi hip hop, chillhop, synthwave, and ambient music — handpicked for focus. No ads, no interruptions.',
  },
  {
    emoji: '🎚️',
    title: 'Ambient sound mixer',
    desc: 'Layer rain, café noise, fire, ocean, forest, and more with independent volume controls.',
  },
  {
    emoji: '⏱️',
    title: 'Built-in Pomodoro timer',
    desc: '25-minute focus blocks with automatic break reminders. Customisable to your preferred interval.',
  },
  {
    emoji: '🔥',
    title: 'Daily streak & XP',
    desc: 'Earn XP each session. Build a daily streak. Track your study hours over time.',
  },
  {
    emoji: '✅',
    title: 'Session task list',
    desc: 'Write your focus task at the start of each Pomodoro. Check it off when done. Stay intentional.',
  },
  {
    emoji: '📤',
    title: 'Shareable room links',
    desc: 'Your entire room — music, sounds, volumes, timer — is encoded in the URL. Share it with anyone.',
  },
]

const FAQ = [
  {
    q: 'What is a virtual study room?',
    a: 'A virtual study room is an online environment designed to simulate the atmosphere and productivity benefits of a physical study space — lofi music, ambient sounds, and a beautiful aesthetic backdrop. It gives remote students the focus-triggering environmental cues of a library or coffee shop without leaving home.',
  },
  {
    q: 'How is LofiSpace different from a YouTube "study with me" video?',
    a: 'YouTube study videos are passive — you have no control over the music, sounds, or duration. LofiSpace is interactive: you choose your scene and music genre, mix your own ambient sounds, set Pomodoro timer intervals, track your daily streak, and write your session tasks. Everything is live and responsive, not a pre-recorded video.',
  },
  {
    q: 'Is the virtual study room free?',
    a: 'Yes, completely free. No account, no subscription, no time limits. All study rooms, all music genres, the full ambient mixer, and the Pomodoro timer are all free forever.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account required. Open any study room and start immediately. Your settings (sounds, volumes, timer preferences) are saved in the URL rather than requiring a login.',
  },
  {
    q: 'Can I embed the virtual study room in Notion or a website?',
    a: 'Yes. LofiSpace supports embed mode — a minimal version of the workspace designed to be embedded in Notion pages, websites, or dashboards. Append ?embed=1 to the workspace URL.',
  },
  {
    q: 'What devices does it work on?',
    a: 'LofiSpace works on desktop, laptop, tablet, and mobile. The layout is fully responsive. The Pomodoro timer and ambient mixer are touch-friendly on mobile.',
  },
  {
    q: 'Can I use the virtual study room for ADHD?',
    a: 'Many users with ADHD find LofiSpace very effective. The ambient sounds (especially rain and brown noise) provide the sensory stimulation that ADHD brains often seek, reducing the urge to seek distraction elsewhere. The Pomodoro timer structure also helps with task initiation and time awareness, which are common ADHD challenges.',
  },
]

export default function VirtualStudyRoomPage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1&ls=lofi1&at=rain:50,cafe:25'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Virtual Study Room', url: 'https://www.focusworkspace.app/virtual-study-room' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Virtual Study Room"
        description="Free virtual study room with lofi music, Pomodoro timer, ambient sounds, XP streaks and beautiful animated backgrounds."
        url="https://www.focusworkspace.app/virtual-study-room"
        keywords={['virtual study room', 'online study room', 'lofi study room', 'study space online']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
            🏠 Virtual study rooms · Lofi music · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Free <span className="text-indigo-400">Virtual Study Room</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Choose from beautifully animated virtual study rooms — anime, cosy desk, coding
            space, and more. Each room includes lofi music, an ambient sound mixer, a Pomodoro
            timer, daily XP streaks, and a session task list. Free, no sign-up, works anywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500 transition-colors"
            >
              Enter Study Room →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Browse All Scenes
            </Link>
          </div>
        </div>

        {/* Rooms */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Choose Your Virtual Study Room</h2>
          <div className="space-y-4">
            {ROOMS.map(room => (
              <Link
                key={room.href}
                href={room.href}
                className="flex gap-5 rounded-2xl border border-white/8 bg-white/4 p-6 hover:border-indigo-500/30 hover:bg-white/6 transition-all"
              >
                <span className="text-4xl mt-1">{room.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{room.title}</h3>
                    {room.badge && (
                      <span className="rounded-full bg-indigo-600/20 px-2 py-0.5 text-xs text-indigo-300">
                        {room.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/35 mb-2">{room.vibe}</p>
                  <p className="text-sm text-white/55 leading-relaxed">{room.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Everything in Every Virtual Room</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-2xl">{f.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{f.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to set up */}
        <section className="mb-16 rounded-2xl border border-indigo-500/15 bg-indigo-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">How to Set Up Your Virtual Study Room</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Pick a room that fits your task', body: 'Light homework? Try the Anime Study Room. Coding project? Coding Room. Deep writing or research? Deep Work Room. Each room sets the right mood for its purpose.' },
              { step: '2', title: 'Customise your sounds', body: 'Open the Sounds panel and layer rain, café, fire, or other ambient sounds over the music. Adjust volumes until the mix feels right. Your settings are immediately reflected in the URL.' },
              { step: '3', title: 'Write your session task', body: 'Before hitting Start, type your focus task for this session into the to-do list. A specific task ("finish chapter 4 summary") beats a vague one ("study").' },
              { step: '4', title: 'Start the Pomodoro timer', body: '25 minutes, nothing else. At the end of each session, you earn XP and your streak grows. After 4 Pomodoros, take a longer 20-minute break.' },
              { step: '5', title: 'Save and share your room', body: 'Copy the URL at any time to save your exact room setup — music genre, sounds, volumes, timer settings. Send it to a friend for a synchronised study session.' },
            ].map(s => (
              <div key={s.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white text-sm">{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-2 font-semibold text-white text-sm">{q}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-violet-900/20 border border-indigo-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Open your virtual study room</h2>
          <p className="mb-6 text-white/55">
            No account. No download. Choose your room, start the timer, and focus.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-indigo-600 px-10 py-3 font-semibold text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/30"
          >
            Enter Study Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/virtual-study-room" />
      </div>
    </>
  )
}
