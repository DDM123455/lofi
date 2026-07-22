import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Coffee Shop Sounds for Studying & Focus — Free Online',
  description:
    'Free coffee shop sounds online for studying, work, and focus. Realistic café ambience mixed with lofi music. No sign-up, runs in any browser.',
  keywords: [
    'coffee shop sounds', 'coffee shop sounds for studying', 'cafe sounds for studying',
    'coffee shop ambience', 'cafe background noise', 'coffee shop noise',
    'cafe sounds online', 'coffee shop white noise', 'cafe ambience for focus',
    'coffee shop sounds free', 'study cafe sounds', 'coffeehouse sounds',
  ],
  alternates: {
    canonical: 'https://www.focusworkspace.app/coffee-shop-sounds',
    languages: {
      en: 'https://www.focusworkspace.app/coffee-shop-sounds',
      vi: 'https://www.focusworkspace.app/vi/am-thanh-quan-cafe',
      'x-default': 'https://www.focusworkspace.app/coffee-shop-sounds',
    },
  },
  openGraph: {
    title: 'Coffee Shop Sounds for Studying & Focus | LofiSpace',
    description: 'Free coffee shop ambience — murmur, espresso machines, soft background noise. Mix with lofi music for the perfect study atmosphere.',
    url: 'https://www.focusworkspace.app/coffee-shop-sounds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coffee Shop Sounds for Studying & Focus | LofiSpace',
    description: 'Free café ambience online — mix with lofi music for the perfect study atmosphere.',
  },
}

const FAQ = [
  {
    q: 'Why do coffee shop sounds help with studying?',
    a: 'Coffee shop sounds sit at roughly 65-70 dB — the "moderate ambient noise" sweet spot identified by consumer research to boost creative thinking and divergent problem-solving. The unintelligible background murmur masks spiky distractions while providing just enough stimulation to keep your brain engaged. Psychologists call this the "coffee shop effect."',
  },
  {
    q: 'What is the coffee shop effect?',
    a: 'The coffee shop effect refers to the finding (popularised by a 2012 Journal of Consumer Research study) that moderate ambient noise (~70 dB) — the kind you hear in a café — enhances creativity and abstract thinking compared to both silence and loud noise. The background murmur prevents you from getting distracted by your own thoughts while stopping short of overwhelming focus.',
  },
  {
    q: 'Is café noise better than silence for studying?',
    a: 'For most people, yes. Complete silence can actually feel uncomfortable during long study sessions — every small sound becomes distracting and your mind wanders more easily. Café ambient noise provides a consistent auditory background that grounds your attention. It is especially effective for reading comprehension and writing tasks.',
  },
  {
    q: 'Can I mix coffee shop sounds with music?',
    a: 'Yes — it is actually the recommended approach. In LofiSpace, layer café ambience at 40-50% with lofi hip-hop at 60-70%. The music provides gentle rhythm and structure, while the café sounds add social warmth and mask external distractions. This combination replicates the ideal coffee shop environment without having to leave your desk.',
  },
  {
    q: 'Does coffee shop noise help with ADHD?',
    a: 'Many people with ADHD find café sounds effective because they provide consistent, non-threatening stimulation that satisfies the brain\'s need for input. The social background prevents the anxiety of complete isolation. Pair café sounds with brown noise or rain at a lower volume for maximum ADHD focus benefit.',
  },
  {
    q: 'Is LofiSpace coffee shop sounds free?',
    a: 'Yes, completely free. No account, no subscription, no download required. Open in your browser and start studying immediately.',
  },
]

const VIBES = [
  { emoji: '☕', label: 'Morning rush', desc: 'Lively chatter, espresso steam, cups clinking. Energising and motivating for morning study sessions.' },
  { emoji: '🌧️', label: 'Rainy café', desc: 'Soft murmur with rain against the windows. The classic lofi study vibe — warm and cosy.' },
  { emoji: '📖', label: 'Quiet corner', desc: 'Distant background hum, occasional cup sounds. Minimal distraction, maximum focus.' },
  { emoji: '🎷', label: 'Jazz café', desc: 'Background café noise with jazz undertones. Elegant and timeless — great for creative work.' },
  { emoji: '🌅', label: 'Afternoon café', desc: 'Mellower crowd, slower pace. Ideal for reading, reviewing notes, and gentle creative work.' },
  { emoji: '🌙', label: 'Late-night café', desc: 'Near-empty café, very soft background. Deep concentration mode for deadline-night sessions.' },
]

const MIXES = [
  { combo: 'Café 50% + Lofi music 70% + Rain 30%', label: '☕ Classic study mix', best: 'Reading, homework, general studying' },
  { combo: 'Café 60% + Rain 50%', label: '🌧️ Rainy café mix', best: 'Writing, creative tasks, brainstorming' },
  { combo: 'Café 40% + Lofi 75% + Pomodoro timer', label: '⏱️ Focused work mix', best: 'Deep work, difficult problems, exams' },
  { combo: 'Café 35% + Fire 25% + Lofi 60%', label: '🔥 Cosy study mix', best: 'Evening sessions, long reading marathons' },
]

export default function CoffeeShopSoundsPage() {
  const workspaceUrl = '/workspace?at=cafe:60,rain:35&ls=lofi1&lv=65&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Coffee Shop Sounds', url: 'https://www.focusworkspace.app/coffee-shop-sounds' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Coffee Shop Sounds"
        description="Free coffee shop sounds online for studying, work, and focus. Mix café ambience with lofi music in an interactive ambient sound mixer."
        url="https://www.focusworkspace.app/coffee-shop-sounds"
        keywords={['coffee shop sounds', 'cafe sounds for studying', 'coffee shop ambience', 'cafe background noise']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Coffee Shop Sounds', url: 'https://www.focusworkspace.app/coffee-shop-sounds' },
        ]} />

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-900/30 px-4 py-1 text-sm text-amber-300 ring-1 ring-amber-500/20">
            ☕ Café ambience · Lofi music · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Coffee Shop Sounds for <span className="text-amber-400">Studying & Focus</span>
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Free café ambience that recreates the coffee shop effect from your desk.
            Layer café murmur, rain, and lofi music in our interactive ambient mixer —
            no sign-up, no download, free forever.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-amber-700 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-900/40 hover:bg-amber-600 transition-colors"
            >
              Play Café Sounds →
            </Link>
            <Link
              href="/ambient-sounds"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              All Ambient Sounds
            </Link>
          </div>
        </div>

        {/* Vibes */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Choose Your Café Vibe</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIBES.map(v => (
              <div key={v.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <div className="mb-2 text-3xl">{v.emoji}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{v.label}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coffee shop effect */}
        <section className="mb-16 rounded-2xl border border-amber-500/15 bg-amber-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">The Coffee Shop Effect — Science</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-sm text-white/55 leading-relaxed">
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Moderate noise boosts creativity</h3>
              <p>A Journal of Consumer Research study found that ~70 dB of ambient noise — typical of a busy café — enhances creative and abstract thinking. Silence is often too quiet; loud noise overwhelms. The café sweet spot is just right.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Social warmth prevents isolation</h3>
              <p>Working alone in silence can feel isolating and increase anxiety. Café sounds create a sense of ambient human presence — enough to feel connected without the distraction of actual conversations.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Unintelligible speech masks distraction</h3>
              <p>The murmur of a coffee shop is just intelligible enough to be non-threatening, yet too indistinct to follow. Your brain classifies it as safe background noise and stops monitoring it — freeing attention for your work.</p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white text-sm">Consistent environment builds habits</h3>
              <p>Using the same soundscape repeatedly can create a conditioned focus state. After a few sessions, hearing café sounds may automatically shift your brain into study mode through classical conditioning.</p>
            </div>
          </div>
        </section>

        {/* Mixes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-white text-center">Best Coffee Shop Sound Mixes</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {MIXES.map(item => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="font-semibold text-white text-sm mb-1">{item.label}</p>
                <p className="text-xs text-amber-300/70 font-mono mb-2">{item.combo}</p>
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-amber-900/40 to-amber-800/10 border border-amber-500/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Bring the coffee shop to your desk</h2>
          <p className="mb-6 text-white/55">
            Free forever. No account. Runs in any browser. Open in 10 seconds.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-amber-700 px-10 py-3 font-semibold text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-900/30"
          >
            Play Coffee Shop Sounds — Free →
          </Link>
        </div>

        <RelatedPages exclude="/coffee-shop-sounds" />
      </div>
    </>
  )
}
