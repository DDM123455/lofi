import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Deep Work Room — Online Workspace for Maximum Concentration',
  description:
    'An online deep work room with rain ambience, minimal UI and Pomodoro timer. Designed for solving hard problems, writing and long focus sessions. Free.',
  keywords: [
    'deep work room', 'deep work online', 'deep work music', 'concentration workspace',
    'deep focus room', 'flow state workspace', 'intense focus music', 'cal newport deep work',
  ],
  openGraph: {
    title: 'Deep Work Room — Maximum Concentration Workspace | LofiSpace',
    description: 'Minimal online room for deep work. Rain ambience, Pomodoro timer, XP system. Free.',
    type: 'website',
    url: 'https://www.focusworkspace.app/deep-work-room',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Work Room — LofiSpace',
    description: 'Minimal online room for deep work. Rain ambience, Pomodoro timer, XP system.',
  },
  alternates: { canonical: 'https://www.focusworkspace.app/deep-work-room' },
}

const FAQ = [
  {
    q: 'What is deep work?',
    a: 'Deep work (coined by Cal Newport) is professional activity performed in a state of distraction-free concentration that pushes cognitive capabilities to the limit — producing maximum value in minimum time.',
  },
  {
    q: 'How does ambient sound help with deep work?',
    a: 'Steady ambient sound — particularly rain — masks unpredictable background noise. Unpredictable noise is the biggest enemy of concentration because it triggers an involuntary attention reflex. Rain provides consistent, non-distracting coverage.',
  },
  {
    q: 'What is the difference between focus room and deep work room?',
    a: 'The focus room uses a thunderstorm preset ideal for medium-intensity tasks. The deep work room uses a heavier rain preset with a darker, more minimal aesthetic — tuned for sustained, high-intensity cognitive effort over 2-4 hour blocks.',
  },
  {
    q: 'How do I track my deep work hours?',
    a: 'LofiSpace tracks Pomodoro sessions, daily streaks and total focus minutes. The progress card shows your XP, current streak and weekly session dots.',
  },
]

const PRINCIPLES = [
  { num: '01', title: 'Ritual', desc: 'Same sounds. Same setup. Every time. Train your brain to associate the environment with deep focus.' },
  { num: '02', title: 'Isolation', desc: 'One browser tab. One task. The workspace shows nothing except what you need.' },
  { num: '03', title: 'Time-boxing', desc: 'Pomodoro sessions give your deep work sessions a defined structure. Intensity over duration.' },
  { num: '04', title: 'Measurement', desc: 'XP, streaks, and session logs make your output visible. What gets measured, gets done.' },
]

export default function DeepWorkRoomPage() {
  // Rainy Library scene — deep focus preset
  const workspaceUrl =
    '/workspace?bgv=' +
    encodeURIComponent('/video/study-corner.mp4') +
    '&bgo=45&ls=lofi1&lv=55&at=rain:45,cafe:15&pom=1&clk=1&ac=c4b5fd'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Deep Work Room', url: 'https://www.focusworkspace.app/deep-work-room' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Deep Work Room"
        description="Minimal online deep work room with rain ambience and Pomodoro timer for maximum concentration."
        url="https://www.focusworkspace.app/deep-work-room"
        keywords={['deep work room', 'deep focus', 'concentration workspace', 'flow state']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🧠 Maximum Concentration · Rain · Minimal
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            <span className="text-violet-400">Deep Work</span> Room
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            For the hardest problems. A minimal, distraction-free environment tuned for
            sustained deep concentration — rainy library ambience, structured Pomodoro
            sessions and progress tracking.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white shadow-lg shadow-violet-900/40 hover:bg-violet-500 transition-colors"
            >
              Enter Deep Work Room →
            </Link>
            <Link
              href="/scenes"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Scenes
            </Link>
          </div>
        </div>

        {/* Principles */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">4 Principles of Deep Work</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(p => (
              <div key={p.num} className="flex gap-4 rounded-2xl border border-white/8 bg-white/4 p-5">
                <span className="mt-0.5 font-mono text-2xl font-bold text-violet-400/50">{p.num}</span>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-white/50">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Room presets */}
        <section className="mb-16 rounded-2xl border border-violet-500/15 bg-violet-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">Room Preset</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
            {[
              ['🌧️', 'Heavy rain ambience'],
              ['📚', 'Library background'],
              ['🎵', 'Low-BPM lofi music'],
              ['🍅', 'Pomodoro 25/5 min'],
              ['📊', 'XP + streak tracking'],
              ['🕐', 'Session clock'],
            ].map(([emoji, label]) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-3 py-2">
                <span>{emoji}</span>
                <span className="text-white/65">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/35">All settings can be customised inside the workspace.</p>
        </section>

        {/* What is deep work — expanded content */}
        <section className="mb-16 space-y-6">
          <h2 className="text-2xl font-bold text-white">What Is Deep Work and Why Does It Matter?</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Cal Newport, computer scientist and author of the book <em>Deep Work</em>, defines it as
            "professional activities performed in a state of distraction-free concentration that push
            your cognitive capabilities to their limit." The output of deep work sessions is high-quality,
            hard-to-replicate work — the kind that actually moves the needle.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            In contrast, shallow work — email, meetings, social media, easy admin tasks — can feel
            busy but produces little lasting value. Newport argues that deep work is becoming both
            <strong className="text-white"> increasingly rare</strong> (because open offices and
            constant notifications make it nearly impossible) and
            <strong className="text-white"> increasingly valuable</strong> (because the most
            important problems require sustained, undistracted thought).
          </p>

          <h2 className="text-2xl font-bold text-white pt-4">How to Build a Deep Work Practice</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Deep work is a skill, not a personality trait. It degrades without practice and grows
            with consistent training. Here is how to start building it:
          </p>
          <div className="space-y-4">
            {[
              {
                title: '1. Choose your deep work philosophy',
                body: 'Newport identifies four approaches: Monastic (cut off everything), Bimodal (deep work in multi-day blocks), Rhythmic (same time every day), and Journalistic (fit it in wherever possible). Most people start with Rhythmic — a daily 90-minute deep work block at a fixed time.',
              },
              {
                title: '2. Design your shutdown ritual',
                body: 'Your brain needs a clear signal that the work day has ended. Write tomorrow\'s top three tasks before you close the laptop. Say "shutdown complete" out loud if you like — it sounds odd but trains your brain to stop ruminating after hours.',
              },
              {
                title: '3. Embrace boredom',
                body: 'Attention is a muscle. If you reach for your phone every time you feel bored, you are training your brain to crave constant stimulation — which makes deep work nearly impossible. Practice sitting with boredom for five minutes a day.',
              },
              {
                title: '4. Quit social media (or batch it)',
                body: 'You don\'t have to delete everything. But checking Twitter/X or Reddit between tasks destroys your ability to focus. Batch social media to one 20-minute window per day, outside of work hours.',
              },
              {
                title: '5. Set a hard cutoff time',
                body: 'Parkinson\'s Law: work expands to fill the time available. Fix a hard stop time for deep work — say 5pm — and work backward to ensure your most important task gets done first. Urgency sharpens focus.',
              },
            ].map(item => (
              <div key={item.title} className="rounded-xl border border-white/8 bg-white/3 p-5">
                <h3 className="mb-2 font-semibold text-white text-sm">{item.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white pt-4">The Science Behind Rain Sounds and Concentration</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Rain is the most studied ambient sound for cognitive performance. A 2012 study published
            in the <em>Journal of Consumer Research</em> found that moderate ambient noise (~70 dB)
            — like the sound of a coffee shop or light rain — enhances creative performance compared
            to silence or loud noise. The LofiSpace Deep Work Room uses a heavy rain preset calibrated
            to this range.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Rain works specifically because it is <strong className="text-white">consistent and non-predictive</strong>.
            Your brain is wired to track unexpected sounds (evolutionary survival mechanism). Rain never
            spikes, never speaks, and never contains meaningful information — so your attentional system
            can safely ignore it, leaving full cognitive bandwidth for your work.
          </p>

          <h2 className="text-2xl font-bold text-white pt-4">Who Should Use the Deep Work Room?</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { emoji: '💻', label: 'Software developers', desc: 'Solving hard algorithmic problems, code reviews, architecture design.' },
              { emoji: '✍️', label: 'Writers', desc: 'First drafts, research synthesis, long-form content that requires sustained narrative thinking.' },
              { emoji: '🎨', label: 'Designers', desc: 'Creative concepting, visual problem-solving, deep UX thinking sessions.' },
              { emoji: '📊', label: 'Analysts', desc: 'Data modelling, complex spreadsheet work, report writing that requires zero interruption.' },
              { emoji: '🎓', label: 'Students', desc: 'Dissertation writing, exam revision, understanding new complex subjects from scratch.' },
              { emoji: '🔬', label: 'Researchers', desc: 'Literature review, hypothesis development, paper writing.' },
            ].map(item => (
              <div key={item.label} className="flex gap-3 rounded-xl border border-white/8 bg-white/4 p-4">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{item.label}</p>
                  <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-white pt-4">Deep Work vs Focus Room: Which Should You Choose?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 text-left text-white/40 font-normal">Feature</th>
                  <th className="py-3 text-left text-violet-300 font-semibold">Deep Work Room</th>
                  <th className="py-3 text-left text-indigo-300 font-semibold">Focus Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ['Best for', '2–4 hour intensive sessions', '25–90 min Pomodoro sessions'],
                  ['Sound', 'Heavy rain (minimal)', 'Thunderstorm + rain (immersive)'],
                  ['Mood', 'Austere, minimal', 'Atmospheric, energising'],
                  ['Ideal tasks', 'Writing, complex coding, deep thinking', 'General studying, moderate coding'],
                  ['Pomodoro', 'Optional — longer blocks encouraged', 'Core mechanic'],
                ].map(([feature, deep, focus]) => (
                  <tr key={feature}>
                    <td className="py-2.5 text-white/40">{feature}</td>
                    <td className="py-2.5 text-white/70">{deep}</td>
                    <td className="py-2.5 text-white/70">{focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">FAQ</h2>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-violet-900/40 to-indigo-900/20 border border-violet-500/20 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Do the work that matters</h2>
          <p className="mb-6 text-white/55">Open the room. Start the timer. Begin.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-violet-600 px-10 py-3 font-semibold text-white hover:bg-violet-500 transition-colors"
          >
            Open Deep Work Room — Free →
          </Link>
        </div>

        <RelatedPages exclude="/deep-work-room" />
      </div>
    </>
  )
}
