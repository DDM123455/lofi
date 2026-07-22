import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { PRESETS as WORKSPACE_PRESETS, presetWorkspaceUrl } from '@/lib/presets'
import { EmbedGenerator } from '@/components/embed/EmbedGenerator'
import { RelatedPages } from '@/components/seo/RelatedPages'

export const metadata: Metadata = {
  title: 'Lofi Widget for Notion — Free Embeddable Study Room',
  description: 'Embed a free lofi music player, ambient sounds mixer, and Pomodoro timer directly into your Notion pages. No sign-up. Works with any Notion /embed block.',
  keywords: ['notion widget', 'lofi notion widget', 'notion study room', 'embed lofi in notion', 'notion pomodoro timer', 'notion ambient sounds', 'notion productivity widget'],
  alternates: {
    canonical: 'https://www.focusworkspace.app/notion-widget',
    languages: {
      en: 'https://www.focusworkspace.app/notion-widget',
      vi: 'https://www.focusworkspace.app/vi/widget-notion',
      'x-default': 'https://www.focusworkspace.app/notion-widget',
    },
  },
  openGraph: {
    title: 'Lofi Widget for Notion — Free Embeddable Study Room | LofiSpace',
    description: 'Embed a free lofi music + ambient sounds + Pomodoro timer widget into Notion. One URL, zero setup.',
    url: 'https://www.focusworkspace.app/notion-widget',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lofi Widget for Notion — Free Embeddable Study Room',
    description: 'Embed a lofi music + ambient sounds + Pomodoro timer widget into Notion. Free.',
  },
}

const STEPS = [
  {
    step: '1',
    title: 'Open LofiSpace',
    desc: 'Go to focusworkspace.app/workspace and configure your scene — pick a background, choose your lofi stream, mix ambient sounds, and enable the Pomodoro timer.',
  },
  {
    step: '2',
    title: 'Copy the URL',
    desc: 'Your entire configuration is encoded in the URL. Copy it directly from your browser address bar — it looks like focusworkspace.app/workspace?scene=...&sounds=...',
  },
  {
    step: '3',
    title: 'Paste in Notion',
    desc: 'In any Notion page, type /embed and press Enter. Paste the LofiSpace URL into the input field and click "Embed link." Your study room appears inline.',
  },
  {
    step: '4',
    title: 'Resize and enjoy',
    desc: 'Drag the embed block to your preferred size. We recommend at least 600px height for the full experience with Pomodoro timer and sound controls.',
  },
]

const WHY = [
  { icon: '🎵', title: 'Music + Sounds Together', desc: 'Lofi music and ambient sounds mixed in one widget — no need for separate tabs.' },
  { icon: '🍅', title: 'Built-in Pomodoro Timer', desc: '25/5 sessions with visual progress ring, auto-break alerts and XP rewards.' },
  { icon: '⚙️', title: 'Fully Configurable URL', desc: 'Every setting is in the URL — share your exact vibe with classmates or teammates.' },
  { icon: '🔗', title: 'Works in Any Notion Block', desc: 'Paste as /embed — no API key, no OAuth, no extensions required.' },
  { icon: '📱', title: 'Mobile-friendly', desc: 'Notion embeds on mobile. LofiSpace adapts to the embed size automatically.' },
  { icon: '✨', title: 'Always Free', desc: 'The full widget — all scenes, all sounds, Pomodoro timer — is permanently free.' },
]

const FAQ = [
  {
    q: 'How do I embed LofiSpace in Notion?',
    a: 'Type /embed in a Notion page, press Enter, and paste your LofiSpace URL (e.g. focusworkspace.app/workspace?scene=tokyo-cafe-rain). The widget loads inline in your page.',
  },
  {
    q: 'Does the Notion embed auto-play music?',
    a: 'Browsers block auto-play by default. Click anywhere inside the embed once to unmute. After that, music and sounds play automatically on future visits.',
  },
  {
    q: 'Can I share my Notion page with the LofiSpace widget?',
    a: 'Yes. Anyone who opens your shared Notion page can use the embed. No account is needed on either side.',
  },
  {
    q: 'How do I change the scene in my Notion embed?',
    a: 'Re-configure the workspace on focusworkspace.app, copy the new URL, then update the embed link in Notion. Delete the old embed and paste the new URL.',
  },
  {
    q: 'Is there a Notion template with LofiSpace already embedded?',
    a: 'Yes — open any preset scene via the Scene Gallery (focusworkspace.app/scenes), copy the embed URL, and paste it into your Notion study page.',
  },
  {
    q: 'Does LofiSpace work in Notion on mobile?',
    a: 'Notion on iOS and Android renders iframes in a limited way. The widget loads but some interactive controls may be restricted by the Notion mobile app.',
  },
]

export default function NotionWidgetPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Notion Widget', url: 'https://www.focusworkspace.app/notion-widget' },
      ]} />
      <JsonLd
        type="WebApplication"
        name="LofiSpace Notion Widget"
        description="Free embeddable lofi music player, ambient sounds mixer and Pomodoro timer for Notion pages."
        url="https://www.focusworkspace.app/notion-widget"
        keywords={['notion widget', 'lofi notion embed', 'notion pomodoro timer', 'notion study room']}
      />
      <FaqJsonLd items={FAQ} />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <Breadcrumb items={[
          { name: 'Home', url: 'https://www.focusworkspace.app' },
          { name: 'Notion Widget', url: 'https://www.focusworkspace.app/notion-widget' },
        ]} />

        {/* Hero */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-block rounded-full bg-violet-900/30 px-4 py-1.5 text-sm text-violet-300 ring-1 ring-violet-500/20">
            🔗 Free · No sign-up · Works with /embed
          </span>
          <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl leading-tight">
            Lofi Music Widget{' '}
            <span className="text-violet-400">for Notion</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/55 leading-relaxed">
            Embed a free lofi study room — music, ambient sounds, and Pomodoro timer — directly into any Notion page. Configure once, share forever.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/workspace" className="rounded-full bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-500 transition-all hover:scale-105">
              Configure Your Widget →
            </Link>
            <Link href="/scenes" className="rounded-full border border-white/15 bg-white/5 px-8 py-3 font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all">
              Browse Scenes
            </Link>
          </div>
        </div>

        {/* How to embed */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">How to Embed in 4 Steps</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {STEPS.map(s => (
              <div key={s.step} className="rounded-xl border border-white/10 bg-white/3 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                    {s.step}
                  </span>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why LofiSpace */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Why LofiSpace for Notion?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(w => (
              <div key={w.title} className="rounded-xl border border-white/8 bg-white/3 p-5">
                <div className="mb-2 text-2xl">{w.icon}</div>
                <h3 className="mb-1 font-semibold text-white text-sm">{w.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ready-to-use presets */}
        <section className="mb-16">
          <h2 className="mb-3 text-center text-2xl font-bold text-white">Ready-to-Use Presets</h2>
          <p className="mb-8 text-center text-white/45 text-sm">Click any scene to open the workspace — then copy the URL and embed it in Notion.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WORKSPACE_PRESETS.map(p => (
              <Link
                key={p.slug}
                href={presetWorkspaceUrl(p)}
                className="group rounded-xl border border-white/10 bg-white/3 p-5 hover:border-violet-500/30 hover:bg-violet-900/10 transition-all"
              >
                <div className="mb-3 text-3xl">{p.emoji}</div>
                <h3 className="mb-1 font-semibold text-white group-hover:text-violet-300 transition-colors">{p.title}</h3>
                <p className="text-xs text-white/45">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Embed generator */}
        <section className="mb-16">
          <h2 className="mb-3 text-center text-2xl font-bold text-white">Build Your Embed Code</h2>
          <p className="mb-8 text-center text-white/45 text-sm">
            Pick your scene and Pomodoro settings, preview it live, then copy the iframe code straight into Notion.
          </p>
          <EmbedGenerator />
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ.map(f => (
              <div key={f.q} className="rounded-xl border border-white/8 bg-white/3 p-5">
                <h3 className="mb-2 font-semibold text-white text-sm">{f.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-900/30 to-violet-800/10 p-10 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to build your Notion study room?</h2>
          <p className="mb-6 text-white/50">Configure your perfect vibe in under 2 minutes — lofi music, ambient sounds, and Pomodoro timer — then paste the URL into Notion.</p>
          <Link href="/workspace" className="inline-block rounded-full bg-violet-600 px-10 py-3.5 font-semibold text-white hover:bg-violet-500 transition-all hover:scale-105">
            Open Workspace →
          </Link>
          <p className="mt-4 text-xs text-white/25">Free forever · No account needed · Works in any Notion /embed block</p>
        </section>

        <RelatedPages exclude="/notion-widget" />
      </div>
    </>
  )
}
