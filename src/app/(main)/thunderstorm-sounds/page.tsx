import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Thunderstorm Sounds for Sleep & Focus — Free Online',
  description:
    'Free thunderstorm sounds for sleep, focus, and relaxation. Heavy rain and distant thunder combined with lofi music in our interactive mixer. No sign-up.',
  keywords: [
    'thunderstorm sounds', 'thunderstorm sounds for sleeping', 'thunder sounds for sleep',
    'thunderstorm noise', 'rain and thunder sounds', 'thunderstorm ambient',
    'thunderstorm sounds free', 'heavy rain and thunder', 'storm sounds for focus',
    'thunderstorm white noise', 'thunder rain sounds', 'stormy weather sounds',
    'thunderstorm sounds for studying', 'thunder sounds online',
  ],
  alternates: { canonical: 'https://focusworkspace.app/thunderstorm-sounds' },
  openGraph: {
    title: 'Thunderstorm Sounds for Sleep & Focus | LofiSpace',
    description: 'Free thunderstorm sounds — heavy rain and distant thunder for deep focus or sleep. Mix with lofi music. No sign-up.',
    url: 'https://focusworkspace.app/thunderstorm-sounds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thunderstorm Sounds for Sleep & Focus | LofiSpace',
    description: 'Free thunderstorm sounds online — heavy rain and thunder for sleep or deep focus.',
  },
}

const FAQ = [
  {
    q: 'Why do thunderstorm sounds help you sleep?',
    a: 'Thunderstorm sounds combine two powerful sleep aids: broadband noise (rain) that masks environmental disturbances, and low-frequency rumble (thunder) that has a physiologically calming effect. The consistent sound pattern is evolutionarily associated with safe shelter — your ancestors could stop scanning for threats when it was raining heavily outside. This is why thunderstorm ASMR is so effective for sleep.',
  },
  {
    q: 'Are thunderstorm sounds good for focus and studying?',
    a: 'Yes — particularly for deep work and deadline-pressure tasks. The dramatic intensity of a thunderstorm creates urgency and masks distractions simultaneously. Heavy rain provides near-white-noise coverage, while distant thunder adds low-frequency grounding that many people find conducive to sustained focus. The "Thunderstorm Focus" scene on LofiSpace is built exactly for this.',
  },
  {
    q: 'Do thunderstorm sounds help with ADHD?',
    a: 'Many people with ADHD report thunderstorm sounds as highly effective — even more so than rain alone. The combination of broadband noise (masking distraction) and low-frequency content (grounding stimulation similar to brown noise) satisfies the ADHD brain\'s need for input without providing intelligible or distracting content.',
  },
  {
    q: 'Is rain or thunderstorm better for sleep?',
    a: 'Both work, but thunderstorm sounds are often better for people who find plain rain too mild to mask their environment. The additional low-frequency energy from thunder covers more of the acoustic spectrum and provides a deeper masking effect. For very light sleepers in noisy environments, thunderstorm sounds at moderate volume tend to be more effective.',
  },
  {
    q: 'Can I mix thunderstorm sounds with music?',
    a: 'Yes, but keep the music volume lower than you normally would. A popular combination is: Heavy Rain 70% + Thunder 55% + Lofi music 45%. The music provides structure but the storm atmosphere dominates. Many people prefer thunderstorm sounds without music for sleep, but with low-volume lofi for focused work.',
  },
  {
    q: 'Is LofiSpace thunderstorm sounds free?',
    a: 'Yes, completely free. No account, no download. The thunderstorm ambient sounds and full mixer run in any browser with no time limits.',
  },
]

const TYPES = [
  { emoji: '⛈️', label: 'Heavy thunderstorm', desc: 'Intense rain with frequent, close thunder. Maximum noise masking — best for deadline work and very noisy environments.' },
  { emoji: '🌩️', label: 'Distant thunder', desc: 'Light rain with rumbling thunder far away. Dramatic atmosphere without intensity — great for creative work.' },
  { emoji: '🌧️', label: 'Rain + occasional thunder', desc: 'Mostly rain with intermittent thunder rolls. Balanced — works well for both sleep and studying.' },
  { emoji: '🏠', label: 'Indoor storm', desc: 'Storm heard from inside — muffled by walls and windows. Safe, cosy, warm. Classic sleep sound.' },
  { emoji: '🌲', label: 'Forest thunderstorm', desc: 'Storm in the woods — rain on leaves, distant thunder, wind through trees. Deeply immersive nature sound.' },
  { emoji: '🎧', label: 'Storm + lofi', desc: 'Thunderstorm layered with lofi hip-hop. The dramatic contrast creates an intense focus environment.' },
]

export default function ThunderstormSoundsPage() {
  const workspaceUrl = '/workspace?at=thunder:60,rain:75&ls=lofi1&lv=45&clk=1&pom=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Thunderstorm Sounds', url: 'https://focusworkspace.app/thunderstorm-sounds' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Thunderstorm Sounds"
        description="Free thunderstorm sounds for sleep, focus, and relaxation. Heavy rain and thunder in an interactive ambient mixer."
        url="https://focusworkspace.app/thunderstorm-sounds"
        keywords={['thunderstorm sounds', 'thunder sounds for sleep', 'rain and thunder', 'storm sounds']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm text-indigo-300 ring-1 ring-indigo-500/20">
            ⛈️ Heavy rain · Thunder · Ambient mixer · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Thunderstorm Sounds for <span className="text-indigo-400">Sleep & Focus</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Free thunderstorm sounds — heavy rain and distant thunder — that create a powerful
            acoustic cocoon for sleep or deep focus. Mix the storm with lofi music in our
            interactive mixer. No sign-up, runs in any browser.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-indigo-700 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-600 transition-colors"
            >
              Play Thunderstorm →
            </Link>
            <Link
              href="/rain-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              Rain Sounds
            </Link>
          </div>
        </div>

        {/* Types */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Types of Thunderstorm Sounds</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TYPES.map(t => (
              <div key={t.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{t.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{t.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Science */}
        <section className="mb-16 rounded-2xl border border-indigo-500/15 bg-indigo-950/10 p-8">
          <h2 className="mb-6 text-xl font-bold text-white">Why Thunderstorms Are Powerful for Sleep & Focus</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Broadband masking from rain</h3>
              <p>Heavy rain covers the full frequency spectrum — from the low rumble of distant traffic to the high-pitched ring of a phone notification. It is one of the most powerful natural masking sounds available, comparable to dedicated noise machines.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Low-frequency grounding from thunder</h3>
              <p>Thunder&apos;s infrasonic and low-frequency components have a measurable physiological calming effect, similar to brown noise. The low rumble is processed by the body as vibration, not just sound — which may explain its unique relaxing quality.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Safety signal from shelter</h3>
              <p>Evolutionarily, being inside during a storm meant you were safe and could afford to relax. The sound of a storm from inside triggers this "shelter response" — a deep, pre-rational sense of safety that lowers arousal and prepares the body for rest.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Urgency for deep work</h3>
              <p>The dramatic intensity of a thunderstorm creates a psychological urgency that many people find useful for deadline-driven work. The environment matches the emotional state of focused, high-stakes concentration — creating a self-reinforcing focus loop.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Best Thunderstorm Sound Mixes</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: '😴 Sleep mix', combo: 'Heavy Rain 75% + Thunder 60%', best: 'Falling asleep, insomnia, noisy environments' },
              { label: '⚡ Deep focus mix', combo: 'Thunder 60% + Rain 75% + Lofi 45%', best: 'Deadlines, hard problems, intense study' },
              { label: '✍️ Creative writing mix', combo: 'Distant Thunder 45% + Rain 65% + Lofi 60%', best: 'Writing, journaling, creative work' },
              { label: '🧘 Relaxation mix', combo: 'Indoor Storm 55% + Rain 50%', best: 'Unwinding, meditation, anxiety relief' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-indigo-300/70 font-mono mb-2">{item.combo}</p>
                <p className="text-xs text-white/40">Best for: {item.best}</p>
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
          <h2 className="mb-3 text-2xl font-bold text-white">Let the storm carry you into focus</h2>
          <p className="mb-6 text-white/55">Free forever. No account. Runs in any browser. Open in 10 seconds.</p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-indigo-700 px-10 py-3 font-semibold text-white hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-900/30"
          >
            Play Thunderstorm — Free →
          </Link>
        </div>

        <RelatedPages exclude="/thunderstorm-sounds" />
      </div>
    </>
  )
}
