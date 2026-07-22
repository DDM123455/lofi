import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'ADHD Focus Room — Free Study Space with Brown Noise & Lofi',
  description:
    'Free ADHD focus room with brown noise, rain sounds, lofi music, and Pomodoro timer. Structured sessions and sensory calm for ADHD brains. No sign-up.',
  keywords: [
    'adhd focus room', 'adhd study room', 'adhd focus music', 'brown noise adhd',
    'adhd study music', 'adhd productivity', 'focus adhd', 'adhd pomodoro',
    'white noise adhd', 'adhd concentration', 'study with adhd', 'adhd ambient noise',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/adhd-focus-room',
    languages: {
      en: 'https://www.focusworkspace.app/adhd-focus-room',
      vi: 'https://www.focusworkspace.app/vi/phong-tap-trung-adhd',
      'x-default': 'https://www.focusworkspace.app/adhd-focus-room',
    },
  },
  openGraph: {
    title: 'ADHD Focus Room — Brown Noise, Lofi & Pomodoro Timer | LofiSpace',
    description: 'Free study space for ADHD brains. Brown noise, rain sounds, Pomodoro structure, XP streaks. No sign-up.',
    url: 'https://www.focusworkspace.app/adhd-focus-room',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADHD Focus Room | LofiSpace',
    description: 'Free study space built for ADHD — brown noise, Pomodoro timer, lofi music, visual calm.',
  },
}

const FAQ = [
  {
    q: 'Why does brown noise help ADHD?',
    a: 'Brown noise provides consistent, low-frequency sensory stimulation that the ADHD brain seeks. Without adequate stimulation, the brain looks for it elsewhere — which leads to distraction. Brown noise satisfies that craving, reducing the urge to seek stimulation from social media, conversations, or other interruptions.',
  },
  {
    q: 'Is brown noise better than white noise for ADHD?',
    a: 'Many people with ADHD find brown noise more effective than white noise. Brown noise has more energy in the low frequencies (deeper rumble), which is subjectively warmer and less fatiguing over long sessions. A common comparison: white noise sounds like static; brown noise sounds like a distant waterfall or strong rain.',
  },
  {
    q: 'Does the Pomodoro technique work for ADHD?',
    a: 'Yes — the Pomodoro technique is one of the most recommended productivity methods for ADHD. It addresses two core ADHD challenges: task initiation (the timer creates a defined start point, making it easier to begin) and time blindness (the visible countdown provides external time awareness that ADHD brains often lack internally).',
  },
  {
    q: 'Can lofi music help with ADHD?',
    a: 'Yes. Lofi music provides mild, rhythmic stimulation without lyrics, which reduces cognitive competition. The tempo (65-90 BPM) can promote a calm, alert state. Many people with ADHD find music more effective than silence for maintaining focus, but only when the music is instrumental and non-lyrical.',
  },
  {
    q: 'What is the best ambient sound for ADHD?',
    a: 'Brown noise and rain are consistently the most reported effective sounds for ADHD focus. Heavy rain provides broad-spectrum masking similar to brown noise but with more natural texture. Experiment with layering rain + brown noise at different volumes in LofiSpace to find your ideal combination.',
  },
  {
    q: 'How long should an ADHD study session be?',
    a: 'For most people with ADHD, 25-minute Pomodoro blocks are a good starting point. Some find shorter blocks (15-20 minutes) more sustainable. Others enter hyperfocus and can extend to 45-50 minutes. The key is having a defined endpoint — open-ended study sessions are much harder for ADHD brains to sustain.',
  },
  {
    q: 'Is LofiSpace free for ADHD students?',
    a: 'Yes, completely free. No account, no premium tier, no time limits. All sounds, all study rooms, the Pomodoro timer, and the full ambient mixer are free for everyone.',
  },
]

const ADHD_TIPS = [
  {
    emoji: '🔊',
    title: 'Start with brown noise or heavy rain',
    desc: 'Open the Sounds panel. Set Rain to 70-80% or try Brown Noise if available. This is your sensory anchor — it satisfies the brain\'s stimulation-seeking before it starts looking for distractions.',
  },
  {
    emoji: '📝',
    title: 'Write ONE task before starting',
    desc: 'In the to-do list, write your single focus task for this Pomodoro. One task. Not a list. "Write the introduction" not "finish the paper". Specificity helps with task initiation.',
  },
  {
    emoji: '⏱️',
    title: 'Use the Pomodoro timer — always',
    desc: 'Start the timer even if you don\'t think you need it. The visual countdown provides external time awareness. When the bell rings, stop — even in hyperfocus. Breaking the session structure undermines future sessions.',
  },
  {
    emoji: '📱',
    title: 'Put your phone in another room',
    desc: 'The presence of a phone on your desk reduces cognitive capacity even if you don\'t use it. This effect is stronger for ADHD brains. Physical distance is more effective than "just not checking it".',
  },
  {
    emoji: '🌡️',
    title: 'Keep the room slightly cool',
    desc: '65-68°F (18-20°C) is the ideal focus temperature. Warm rooms increase drowsiness — especially after lunch. This is especially important for ADHD, where dopamine levels fluctuate with energy and alertness.',
  },
  {
    emoji: '🔄',
    title: 'Actually take the break',
    desc: 'When the timer rings — stop. Stand up. Drink water. Look out the window. The break is not optional. It resets dopamine and lets the prefrontal cortex recover before the next session.',
  },
]

export default function AdhdFocusRoomPage() {
  const workspaceUrl = '/workspace?at=rain:75,cafe:15&pom=1&clk=1&note=1&ls=lofi1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'ADHD Focus Room', url: 'https://www.focusworkspace.app/adhd-focus-room' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace ADHD Focus Room"
        description="Free ADHD focus room with brown noise, rain sounds, lofi music, Pomodoro timer and visual calm. Designed for ADHD brains."
        url="https://www.focusworkspace.app/adhd-focus-room"
        keywords={['adhd focus room', 'adhd study room', 'brown noise adhd', 'adhd pomodoro timer']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'ADHD Focus Room', url: 'https://www.focusworkspace.app/adhd-focus-room' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-900/30 px-4 py-1 text-sm text-amber-300 ring-1 ring-amber-500/20">
            🧠 ADHD · Brown noise · Pomodoro · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-amber-400">ADHD Focus Room</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            A study space built around how ADHD brains actually work. Heavy rain or brown noise
            for sensory grounding, lofi music without distracting lyrics, Pomodoro timer for
            external time awareness, and a visual environment calm enough to let you focus.
            Free, no sign-up, no time limits.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-amber-600 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-900/40 hover:bg-amber-500 transition-colors"
            >
              Open ADHD Focus Room →
            </Link>
            <Link
              href="/deep-work-room"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Deep Work Room
            </Link>
          </div>
        </div>

        {/* Why sounds help ADHD */}
        <section className="mb-16 rounded-2xl border border-amber-500/15 bg-amber-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Why Ambient Sounds Work for ADHD Brains</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              ADHD brains are characterised by lower baseline dopamine in the prefrontal cortex —
              the region responsible for sustained attention, working memory, and impulse control.
              When dopamine is low, the brain compensates by seeking stimulation from the
              environment. This is the mechanism behind ADHD distraction.
            </p>
            <p>
              Brown noise and rain sounds provide the external stimulation the ADHD brain is
              searching for — but they provide it in a controlled, non-distracting form. The
              consistent sensory input satisfies the brain&apos;s demand without triggering
              the novelty-seeking response that makes social media so powerful.
            </p>
            <p>
              The Pomodoro timer addresses the second major ADHD challenge: time blindness.
              Without external time cues, ADHD brains have poor access to their internal sense
              of time passing. The visible countdown makes time concrete, reduces task-avoidance
              anxiety (&quot;I only have to do this for 25 minutes&quot;), and creates a
              defined start point that helps with task initiation.
            </p>
          </div>
        </section>

        {/* Tips for ADHD */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">How to Set Up Your ADHD Focus Session</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ADHD_TIPS.map(tip => (
              <div key={tip.title} className="flex gap-4 rounded-xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 text-2xl">{tip.emoji}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white text-sm">{tip.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended sounds */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Best Sound Combinations for ADHD</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '🌧️ Heavy Rain Focus', recipe: 'Heavy Rain 80% + Lofi music 50%', desc: 'Maximum distraction masking. Start here if you\'re in a noisy environment or have had a high-distraction day.' },
              { title: '🔉 Brown Noise Deep Work', recipe: 'Brown Noise 70% + Rain 30%', desc: 'Low-frequency grounding without melodic content. Best for tasks requiring heavy verbal processing.' },
              { title: '⛈️ Storm Deadline Mode', recipe: 'Thunderstorm 75% + Rain 55% + Lofi 40%', desc: 'High stimulation. Useful for tasks requiring urgency or when hyperfocus needs triggering.' },
              { title: '☕ Calm Café Focus', recipe: 'Rain 50% + Café 30% + Lofi 60%', desc: 'Moderate stimulation with social warmth. Good for light to medium cognitive tasks.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <h3 className="mb-1 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-xs font-mono text-amber-300/70 mb-2">{item.recipe}</p>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-amber-900/40 to-orange-900/20 border border-amber-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Open the ADHD Focus Room</h2>
          <p className="mb-6 text-white/55">
            Heavy rain pre-loaded. Pomodoro timer ready. No sign-up. Start in 5 seconds.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-amber-600 px-10 py-3 font-semibold text-white hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/30"
          >
            Open ADHD Focus Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/adhd-focus-room" />
      </div>
    </>
  )
}
