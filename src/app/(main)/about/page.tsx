import type { Metadata } from 'next'
import Link from 'next/link'
import { OrganizationJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'
import { AUTHOR_NAME, AUTHOR_TITLE } from '@/components/seo/AuthorBio'

export const metadata: Metadata = {
  title: 'About LofiSpace — Free Focus Workspace',
  description: 'Why we built LofiSpace: a free, no-account online study room combining lofi music, ambient sounds, a Pomodoro timer, and gamified focus tracking.',
  alternates: { canonical: 'https://www.focusworkspace.app/about' },
  openGraph: {
    title: 'About LofiSpace',
    description: 'Why we built a free, no-account focus workspace combining lofi music, ambient sounds, and a Pomodoro timer.',
    url: 'https://www.focusworkspace.app/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About LofiSpace',
    description: 'Why we built a free, no-account focus workspace combining lofi music, ambient sounds, and a Pomodoro timer.',
  },
}

export default function AboutPage() {
  const aboutUrl = 'https://www.focusworkspace.app/about'

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'About', url: aboutUrl },
      ]} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'About', url: aboutUrl },
      ]} />
      <OrganizationJsonLd />

      <h1 className="mb-6 text-4xl font-bold text-white">About LofiSpace</h1>

      <div className="prose prose-invert prose-violet max-w-none
        prose-headings:text-white prose-headings:font-semibold
        prose-p:text-white/70 prose-p:leading-relaxed
        prose-li:text-white/70
        prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300
        prose-strong:text-white
        prose-h2:text-xl">

        <p>
          LofiSpace (focusworkspace.app) is a free online study room and focus workspace. It combines lofi music,
          ambient sound mixing, animated backgrounds, a Pomodoro timer, a daily to-do list, and a lightweight XP
          system into a single browser tab — no account, no download, no paywall.
        </p>

        <h2>Why we built it</h2>
        <p>
          Most focus tools make you choose: a music player, or a Pomodoro timer, or an ambient-noise app, or a
          &quot;study with me&quot; video — each in its own tab, each asking you to sign up. LofiSpace exists because
          switching between five tools breaks focus before you even start. Everything here — sound, timer, scene,
          streaks — lives in one place, and the whole configuration is saved in the URL, so a study room you build
          once can be bookmarked, shared, or <Link href="/notion-widget">embedded straight into Notion</Link> in
          under a minute.
        </p>

        <h2>What&apos;s free</h2>
        <p>
          Everything. Every scene, every ambient sound, the Pomodoro timer, the XP and streak system, and the{' '}
          <Link href="/notion-widget">Notion embed</Link> are free with no account required and no feature paywall.
          If LofiSpace has been useful to your study or work sessions, the small support options in the app help
          keep the servers running — but they&apos;re optional.
        </p>

        <h2>Who&apos;s behind it</h2>
        <p>
          LofiSpace is written and maintained by {AUTHOR_NAME} ({AUTHOR_TITLE}), who also writes the study and
          productivity guides on the <Link href="/blog">LofiSpace blog</Link>. It&apos;s an independent project, not
          backed by an agency or ad network beyond what keeps the lights on.
        </p>

        <h2>Get in touch</h2>
        <p>
          Found a bug, have a feature request, or just want to share your setup? Reach out on{' '}
          <a href="https://twitter.com/lofispace_app" target="_blank" rel="noopener noreferrer">X / Twitter</a> or{' '}
          <a href="https://www.reddit.com/r/lofispace" target="_blank" rel="noopener noreferrer">Reddit</a>.
        </p>
      </div>

      <div className="my-10 rounded-2xl bg-gradient-to-r from-violet-900/40 to-violet-800/20 p-6 border border-violet-500/20">
        <p className="text-sm text-violet-300 font-semibold mb-1">Try it free — no account needed</p>
        <h3 className="text-lg font-bold text-white mb-2">Open Your LofiSpace Study Room</h3>
        <p className="text-sm text-white/60 mb-4">Mix lofi music + ambient sounds + an animated background, right in your browser.</p>
        <Link
          href="/workspace"
          className="inline-block rounded-full bg-violet-600 px-6 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
        >
          Open Workspace — Free →
        </Link>
      </div>
    </div>
  )
}
