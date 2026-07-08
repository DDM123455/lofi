import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Study With Me Online — Free Virtual Study Space',
  description:
    'Study with me online in a free virtual study room. Lofi music, ambient sounds, Pomodoro timer, XP streaks, and a cosy environment. No sign-up.',
  keywords: [
    'study with me', 'study with me online', 'study with me free', 'virtual study buddy',
    'online study session', 'study together online', 'body doubling for studying',
    'study accountability', 'study session online', 'study partner online',
  ],
  alternates: { canonical: 'https://www.focusworkspace.app/study-with-me' },
  openGraph: {
    title: 'Study With Me Online — Free Virtual Study Space | LofiSpace',
    description: 'Study with me in a free virtual room with lofi music, Pomodoro timer and XP streaks. No sign-up.',
    url: 'https://www.focusworkspace.app/study-with-me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study With Me Online | LofiSpace',
    description: 'Free virtual study room with lofi music, Pomodoro timer and XP streaks. No sign-up.',
  },
}

const FAQ = [
  {
    q: 'What is "study with me"?',
    a: '"Study with me" is a productivity method where you study alongside someone else — in person, via video call, or virtually — for accountability and motivation. The shared environment makes it harder to procrastinate and easier to stay focused.',
  },
  {
    q: 'What is body doubling?',
    a: 'Body doubling is the practice of working in the presence of another person to improve focus. Originally used as a technique for people with ADHD, it works for nearly everyone. The presence of another person — even virtual — activates a social awareness that reduces procrastination.',
  },
  {
    q: 'How does LofiSpace replace a study buddy?',
    a: 'LofiSpace creates the environmental conditions of a "study with me" session: ambient sounds simulate a shared space, the Pomodoro timer creates shared session structure, and the XP system tracks your progress just like a real accountability partner would. Many users find it equally effective for getting into focus mode.',
  },
  {
    q: 'Can I study with real friends using LofiSpace?',
    a: 'Yes. Share your workspace URL with a friend and you can both open the exact same scene, sounds, and settings — creating a synchronised virtual study environment. Use video call alongside LofiSpace for a full "study with me" experience.',
  },
  {
    q: 'Is it free?',
    a: 'Yes, completely free. No account, no subscription, no time limits. Open the workspace and start studying immediately.',
  },
  {
    q: 'What study rooms work best for "study with me" sessions?',
    a: 'The Online Study Room and Anime Study Room are the most popular for study with me sessions — they have the warmest, most social atmosphere. The Coding Room is popular among developers doing paired focus sessions.',
  },
]

const BENEFITS = [
  {
    emoji: '🎯',
    title: 'Social accountability',
    desc: 'The ambient "presence" of a study space — even a virtual one — activates the same social awareness that makes studying with a friend so effective.',
  },
  {
    emoji: '⏱️',
    title: 'Shared session structure',
    desc: 'The Pomodoro timer creates defined 25-minute work blocks, just like a structured "study with me" session on YouTube — except you control the environment.',
  },
  {
    emoji: '🔥',
    title: 'Streak motivation',
    desc: 'The daily streak counter and XP system replace the external motivation that normally comes from a study partner. Missing a day breaks the chain.',
  },
  {
    emoji: '🌸',
    title: 'Aesthetic environment',
    desc: 'The same reason millions watch "study with me" videos: the visual and auditory atmosphere of a beautiful study space puts your brain in study mode.',
  },
]

const ROOMS = [
  { href: '/online-study-room', emoji: '📚', label: 'Online Study Room', color: 'violet', desc: 'The classic study with me environment. Lofi music, rain sounds, Pomodoro timer.' },
  { href: '/anime-study-room', emoji: '🌸', label: 'Anime Study Room', color: 'pink', desc: 'Japanese aesthetic study space — the closest thing to a Studio Ghibli study session.' },
  { href: '/coding-room', emoji: '💻', label: 'Coding Room', color: 'cyan', desc: 'Study with me for developers. Synthwave music and city rain.' },
  { href: '/focus-room', emoji: '🎯', label: 'Focus Room', color: 'indigo', desc: 'Minimal, distraction-free. For study sessions that demand complete concentration.' },
]

export default function StudyWithMePage() {
  const workspaceUrl = '/workspace?pom=1&clk=1&note=1&ls=lofi1&at=rain:50,cafe:25'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Study With Me', url: 'https://www.focusworkspace.app/study-with-me' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Study With Me"
        description="Free virtual study with me space with lofi music, Pomodoro timer, XP streaks and ambient sounds."
        url="https://www.focusworkspace.app/study-with-me"
        keywords={['study with me', 'virtual study room', 'online study session', 'body doubling']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-green-900/30 px-4 py-1 text-sm text-green-300 ring-1 ring-green-500/20">
            📚 Study with me · Body doubling · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-green-400">Study With Me</span> — Online & Free
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A free virtual study space that recreates the motivation and focus of studying
            with a friend. Lofi music, ambient sounds, a Pomodoro timer, daily XP streaks,
            and a beautiful aesthetic environment — everything you need to stop procrastinating
            and start working.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-lg shadow-green-900/40 hover:bg-green-500 transition-colors"
            >
              Start Studying Now →
            </Link>
            <Link
              href="/online-study-room"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Browse Study Rooms
            </Link>
          </div>
        </div>

        {/* Why it works */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">
            Why Virtual &quot;Study With Me&quot; Actually Works
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {BENEFITS.map(b => (
              <div key={b.title} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 text-2xl">{b.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white text-sm">{b.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Body doubling explained */}
        <section className="mb-16 rounded-2xl border border-green-500/15 bg-green-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">What Is Body Doubling?</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              Body doubling is a productivity technique where you work in the presence of another
              person — not necessarily working on the same task, just being in the same space.
              It was originally developed as a tool for people with ADHD, but research shows it
              benefits nearly everyone.
            </p>
            <p>
              The mechanism: humans are social creatures. When another person is present, we
              activate a low-level social awareness that keeps us &quot;on&quot; and inhibits
              the drift toward distraction. The feeling of being observed — even by someone who
              isn&apos;t watching you — reduces procrastination.
            </p>
            <p>
              Virtual body doubling works on the same principle. Millions of people watch
              &quot;study with me&quot; YouTube videos not for the content but for the
              ambient presence they create. LofiSpace builds this environment directly,
              without needing to find or schedule a study partner.
            </p>
          </div>
        </section>

        {/* Choose your room */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">
            Choose Your Study With Me Room
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ROOMS.map(room => (
              <Link
                key={room.href}
                href={room.href}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 hover:border-green-500/30 hover:bg-white/6 transition-all"
              >
                <span className="text-3xl">{room.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{room.label}</h3>
                  <p className="text-sm text-white/50">{room.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">How to Have a Study With Me Session</h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Open your study room', body: 'Choose a room that matches your vibe — anime room, coding room, or the classic online study room. No sign-up needed.' },
              { step: '2', title: 'Set your intention', body: 'Before starting the Pomodoro timer, write your focus task for this session in the to-do list. Specific intentions outperform vague goals by 3x.' },
              { step: '3', title: 'Start the timer', body: '25 minutes, full focus. No phone, no tabs, no email. The ambient sounds and music run automatically.' },
              { step: '4', title: 'Take your break', body: 'When the timer rings — actually stop. Stand up, stretch, look away from the screen. 5 minutes away from the desk makes the next Pomodoro stronger.' },
              { step: '5', title: 'Track your streak', body: 'After 4 Pomodoros you\'ve done 2 hours of real focused work. Your XP grows, your streak extends. Come back tomorrow.' },
            ].map(s => (
              <div key={s.step} className="flex gap-4 rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-green-900/40 to-violet-900/20 border border-green-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to study together?</h2>
          <p className="mb-6 text-white/55">
            No account. No sign-up. Just open, focus, and build the habit.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-green-600 px-10 py-3 font-semibold text-white hover:bg-green-500 transition-colors shadow-lg shadow-green-900/30"
          >
            Start Studying Now — Free →
          </Link>
        </div>

        <RelatedPages exclude="/study-with-me" />
      </div>
    </>
  )
}
