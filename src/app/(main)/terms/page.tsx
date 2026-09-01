import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

const URL = 'https://www.focusworkspace.app/terms'

export const metadata: Metadata = {
  title: 'Terms of Use — LofiSpace',
  description:
    'The terms that apply when you use LofiSpace, a free browser-based focus workspace with lofi music, ambient sounds and a Pomodoro timer.',
  alternates: { canonical: URL },
  openGraph: { title: 'Terms of Use — LofiSpace', description: 'The terms that apply when you use LofiSpace.', url: URL, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Terms of Use — LofiSpace', description: 'The terms that apply when you use LofiSpace.' },
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Terms of Use', url: URL },
      ]} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Terms of Use', url: URL },
      ]} />

      <h1 className="mb-2 text-4xl font-bold text-white">Terms of Use</h1>
      <p className="mb-8 text-sm text-white/40">Last updated: 1 September 2026</p>

      <div className="prose prose-invert prose-violet max-w-none
        prose-headings:text-white prose-headings:font-semibold
        prose-p:text-white/70 prose-p:leading-relaxed
        prose-li:text-white/70
        prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300
        prose-strong:text-white
        prose-h2:text-xl">

        <p>
          By using LofiSpace (<strong>focusworkspace.app</strong>) you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <h2>The service</h2>
        <p>
          LofiSpace is a free, browser-based focus workspace: lofi music playback, ambient sound mixing, animated
          backgrounds, a Pomodoro timer, a to-do list and a lightweight progress/streak system. It is provided as
          a convenience, &quot;as is&quot;, with no guarantee of availability, and may change or be discontinued at
          any time.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>Do not use the site for any unlawful purpose or in a way that disrupts it for others.</li>
          <li>Do not attempt to break, overload, scrape at scale, or reverse the hosting infrastructure.</li>
          <li>The embeddable widget may be placed on your own pages (Notion, blogs, personal sites); do not present it as your own product.</li>
        </ul>

        <h2>Third-party content</h2>
        <p>
          Audio and some video backgrounds are streamed from <strong>YouTube</strong> and are subject to
          YouTube&apos;s own terms. Weather data is provided by <strong>Open-Meteo</strong> and place names by{' '}
          <strong>OpenStreetMap</strong>. LofiSpace does not host or own that content and is not responsible for
          its accuracy or availability.
        </p>

        <h2>Your data</h2>
        <p>
          LofiSpace has no accounts. Your settings, tasks and focus history are stored only in your browser. You
          are responsible for that device and for any workspace URLs you choose to share. See our{' '}
          <Link href="/privacy">Privacy Policy</Link> for details.
        </p>

        <h2>Advertising</h2>
        <p>
          Some pages show ads served by Google AdSense. We are not responsible for the content of third-party
          advertisements.
        </p>

        <h2>No warranty; limitation of liability</h2>
        <p>
          The service is provided without warranties of any kind. To the fullest extent permitted by law,
          LofiSpace and its operators are not liable for any indirect, incidental or consequential damages arising
          from your use of, or inability to use, the site.
        </p>

        <h2>Changes</h2>
        <p>
          These terms may be updated as the product evolves; the &quot;last updated&quot; date above will change
          accordingly. Continued use after an update means you accept the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Reach us through the support options in the app or the links on our <Link href="/about">About page</Link>.
        </p>
      </div>
    </div>
  )
}
