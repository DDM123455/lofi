import Link from 'next/link'
import type { Metadata } from 'next'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Free Brown Noise Online — Focus, ADHD & Deep Work',
  description:
    'Free brown noise online for ADHD focus, deep work, and anxiety relief. Combine with lofi music and ambient sounds. No ads, no sign-up.',
  keywords: [
    'brown noise', 'brown noise online', 'brown noise for focus', 'brown noise adhd',
    'brown noise free', 'brown noise for studying', 'brown noise sleep', 'brown noise anxiety',
    'brownian noise', 'brown noise generator online', 'deep brown noise', 'brown noise benefits',
  ],
  alternates: { canonical: 'https://focusworkspace.app/brown-noise' },
  openGraph: {
    title: 'Free Brown Noise Online — ADHD Focus & Deep Work | LofiSpace',
    description: 'Free brown noise for ADHD focus and deep work. Deep, warm low-frequency noise — mix with lofi music. No sign-up.',
    url: 'https://focusworkspace.app/brown-noise',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Brown Noise Online | LofiSpace',
    description: 'Free brown noise for ADHD focus and deep work. Mix with lofi music and ambient sounds.',
  },
}

const FAQ = [
  {
    q: 'What is brown noise?',
    a: 'Brown noise (also called Brownian noise or red noise) is a type of random noise with more energy concentrated in the lower frequencies. The result is a deep, rich rumbling sound — often described as resembling a strong waterfall, distant thunder, or a powerful fan. Unlike white noise, which has equal energy at all frequencies, brown noise rolls off sharply at higher frequencies, creating a warmer, deeper sound.',
  },
  {
    q: 'Why is brown noise so popular for ADHD?',
    a: 'Brown noise provides consistent low-frequency stimulation that appears to satisfy the ADHD brain\'s baseline need for sensory input without introducing distracting novelty. When the ADHD brain is understimulated, it compensates by seeking stimulation from the environment — leading to distraction. Brown noise provides that stimulation in a controlled, non-distracting form. Many users with ADHD report brown noise as significantly more effective than white noise for maintaining focus.',
  },
  {
    q: 'What is the difference between brown noise and white noise?',
    a: 'White noise has equal energy at all frequencies (bright, uniform hiss). Brown noise has most energy in the low frequencies (deep, warm rumble). Brown noise is generally considered more pleasant for long-term listening because the harsh high frequencies of white noise can cause auditory fatigue over time. Brown noise sounds more like natural sounds — waterfalls, rain, wind.',
  },
  {
    q: 'What is the difference between brown noise and pink noise?',
    a: 'Pink noise is between white and brown — more energy in low frequencies than white noise, but less than brown. Pink noise sounds like steady, moderate rainfall. Brown noise sounds deeper and more powerful — like heavy rain or strong wind. Pink noise is often preferred for sleep; brown noise is often preferred for ADHD focus and deep concentration.',
  },
  {
    q: 'Does brown noise help with anxiety?',
    a: 'Many people report that brown noise helps reduce anxiety and racing thoughts. The deep, consistent sound appears to create a "cocoon" effect — a calming auditory environment that reduces the brain\'s tendency to monitor for threats. This may be partly because low-frequency sounds are evolutionarily associated with enclosed, safe spaces (caves, interiors) rather than exposed environments.',
  },
  {
    q: 'Can I use brown noise for sleeping?',
    a: 'Yes. Brown noise is commonly used for sleep, particularly for people who find white noise too harsh or jarring. The deeper rumble is less likely to cause auditory fatigue over a full night of listening. Many sleep researchers and therapists recommend brown noise or pink noise over white noise for this reason.',
  },
  {
    q: 'Is brown noise free on LofiSpace?',
    a: 'Yes, completely free. No account, no subscription, no time limits. The ambient mixer (including rain, which functions similarly to brown noise) and all lofi music are free forever.',
  },
]

const COMPARISON = [
  { label: 'Sound quality', white: 'Bright, static-like', brown: 'Deep, warm, rumbling' },
  { label: 'High frequencies', white: 'Strong', brown: 'Minimal' },
  { label: 'Low frequencies', white: 'Equal to highs', brown: 'Dominant' },
  { label: 'Listening fatigue', white: 'Higher over time', brown: 'Lower over time' },
  { label: 'ADHD focus', white: 'Good', brown: 'Often better' },
  { label: 'Sleep', white: 'Effective', brown: 'Often more natural' },
  { label: 'Natural analogy', white: 'TV static', brown: 'Waterfall, heavy wind' },
]

export default function BrownNoisePage() {
  const workspaceUrl = '/workspace?at=rain:80,wind:30&pom=1&clk=1'

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://focusworkspace.app' },
        { name: 'Brown Noise', url: 'https://focusworkspace.app/brown-noise' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Brown Noise"
        description="Free brown noise online for ADHD focus, deep work, and anxiety relief. Mix with lofi music and ambient sounds."
        url="https://focusworkspace.app/brown-noise"
        keywords={['brown noise', 'brown noise online', 'brown noise adhd', 'brown noise for focus']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-14">

        {/* Hero */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-amber-950/40 px-4 py-1 text-sm text-amber-300 ring-1 ring-amber-700/30">
            🟤 Brown noise · ADHD focus · Deep work · Free
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Free <span className="text-amber-400">Brown Noise</span> Online
          </h1>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed">
            Deep, warm brown noise for ADHD focus, deep work, anxiety relief, and sleep.
            Layer with heavy rain, lofi music, and other ambient sounds in our mixer —
            no ads, no sign-up, no download needed.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={workspaceUrl}
              className="rounded-full bg-amber-700 px-8 py-3 font-semibold text-white shadow-lg shadow-amber-950/40 hover:bg-amber-600 transition-colors"
            >
              Play Brown Noise →
            </Link>
            <Link
              href="/adhd-focus-room"
              className="rounded-full border border-white/10 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              ADHD Focus Room
            </Link>
          </div>
        </div>

        {/* What makes brown noise different */}
        <section className="mb-16 rounded-2xl border border-amber-700/20 bg-amber-950/10 p-8">
          <h2 className="mb-4 text-xl font-bold text-white">What Makes Brown Noise Different</h2>
          <div className="space-y-3 text-white/60 text-sm leading-relaxed">
            <p>
              All coloured noises (white, pink, brown) are forms of random sound that differ
              in how energy is distributed across frequencies. White noise: equal energy at
              every frequency. Pink noise: slightly more energy at lower frequencies.
              Brown noise: most energy concentrated in the lowest frequencies.
            </p>
            <p>
              The perceptual result of this difference is dramatic. White noise sounds like TV
              static — bright, sharp, uniform. Brown noise sounds like a distant waterfall,
              heavy wind, or the deep rumble of an aircraft. The warm, low-frequency character
              makes brown noise significantly more pleasant to listen to for extended periods.
            </p>
            <p>
              This comfort factor is important. Sound used for focus needs to work over
              sessions of 1-4 hours. White noise can cause auditory fatigue, increasing
              irritability and reducing its effectiveness. Brown noise maintains its pleasant
              character across long sessions — which may partly explain its popularity for
              both ADHD focus and sleep.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Brown Noise vs White Noise</h2>
          <div className="overflow-x-auto rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/4">
                  <th className="py-3 px-5 text-left text-white/50 font-medium">Property</th>
                  <th className="py-3 px-5 text-left text-white/50 font-medium">White Noise</th>
                  <th className="py-3 px-5 text-left text-amber-300/80 font-medium">Brown Noise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON.map(row => (
                  <tr key={row.label}>
                    <td className="py-3 px-5 text-white/60">{row.label}</td>
                    <td className="py-3 px-5 text-white/45">{row.white}</td>
                    <td className="py-3 px-5 text-amber-300/80">{row.brown}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Best uses */}
        <section className="mb-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-white">Best Brown Noise Combinations</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: '🧠 ADHD Power Focus', recipe: 'Heavy Rain 80% + Wind 25% + Lofi 45%', desc: 'Maximum low-frequency stimulation for ADHD brains that need strong sensory grounding. Rain provides the broadest coverage.' },
              { title: '🎯 Deep Work Cocoon', recipe: 'Heavy Rain 90% + Wind 35%', desc: 'Pure ambient, no music. For tasks requiring maximum verbal processing. The deep rumble creates an isolation bubble.' },
              { title: '😴 Deep Sleep Mix', recipe: 'Rain 65% + Wind 45%', desc: 'Natural brown-noise equivalent without mechanical quality of synthesised noise. Very effective for falling and staying asleep.' },
              { title: '😰 Anxiety Calm Mix', recipe: 'Rain 60% + Fire 30% + Lofi 50%', desc: 'Warm, enveloping soundscape that reduces hypervigilance. The fire adds warmth and intimacy to the rain\'s grounding effect.' },
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
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-amber-950/50 to-orange-950/30 border border-amber-700/25 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Experience deep brown noise focus</h2>
          <p className="mb-6 text-white/55">
            Heavy rain pre-loaded (brown noise equivalent). Free forever. No sign-up.
          </p>
          <Link
            href={workspaceUrl}
            className="inline-block rounded-full bg-amber-700 px-10 py-3 font-semibold text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-950/40"
          >
            Play Brown Noise — Free →
          </Link>
        </div>

        <RelatedPages exclude="/brown-noise" />
      </div>
    </>
  )
}
