import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { Breadcrumb } from '@/components/seo/Breadcrumb'

const URL = 'https://www.focusworkspace.app/privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy — LofiSpace',
  description:
    'How LofiSpace handles data: no accounts, settings stored locally in your browser, and the third-party services (Google AdSense, Analytics, YouTube) used on the site.',
  alternates: { canonical: URL },
  openGraph: { title: 'Privacy Policy — LofiSpace', description: 'How LofiSpace handles your data.', url: URL, type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Privacy Policy — LofiSpace', description: 'How LofiSpace handles your data.' },
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Privacy Policy', url: URL },
      ]} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://www.focusworkspace.app' },
        { name: 'Privacy Policy', url: URL },
      ]} />

      <h1 className="mb-2 text-4xl font-bold text-white">Privacy Policy</h1>
      <p className="mb-8 text-sm text-white/40">Last updated: 1 September 2026</p>

      <div className="prose prose-invert prose-violet max-w-none
        prose-headings:text-white prose-headings:font-semibold
        prose-p:text-white/70 prose-p:leading-relaxed
        prose-li:text-white/70
        prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300
        prose-strong:text-white
        prose-h2:text-xl">

        <p>
          LofiSpace (<strong>focusworkspace.app</strong>) is a free browser-based focus workspace. This policy
          explains what data is involved when you use it. In short: there are no accounts, and the settings you
          create stay in your own browser.
        </p>

        <h2>No account, no server-side profile</h2>
        <p>
          LofiSpace has no sign-up and no login. We do not create a user profile for you and we do not store your
          to-do items, timer history, streaks, or session notes on our servers. All of that is kept in your
          browser&apos;s <strong>localStorage</strong> on the device you use, and is cleared if you clear your
          browser data. Your workspace configuration (sounds, scene, volume) is also encoded into shareable URLs
          that you choose to copy or embed.
        </p>

        <h2>Analytics</h2>
        <p>
          We use <strong>Google Analytics 4</strong> and <strong>Microsoft Clarity</strong> to understand which
          pages are visited and how the app is used, in aggregate. These tools set cookies and collect standard
          technical data such as approximate location (country/city level), device and browser type, referring
          page, and interactions. Clarity may record anonymised interaction playbacks (masked input). We use this
          only to improve the product.
        </p>

        <h2>Advertising</h2>
        <p>
          Some pages display ads served by <strong>Google AdSense</strong>. Google and its partners may use
          cookies and device identifiers to serve and measure ads, including personalised ads where permitted.
          You can review and control this at{' '}
          <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google My Ad Center</a>{' '}
          and{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          For more on how Google uses data from sites that use its services, see{' '}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            policies.google.com/technologies/partner-sites
          </a>.
        </p>

        <h2>Third-party content</h2>
        <ul>
          <li><strong>YouTube</strong> — lofi audio and optional video backgrounds are played through YouTube&apos;s embedded player (privacy-enhanced mode where possible). YouTube may set cookies once playback starts.</li>
          <li><strong>Open-Meteo</strong> and <strong>OpenStreetMap Nominatim</strong> — if you use the optional weather widget, your browser sends your coordinates to these services to fetch the forecast and place name. Location is only requested with your explicit permission and is never stored by us.</li>
          <li><strong>Google Fonts</strong> — web fonts are self-hosted; no request is made to Google&apos;s font servers.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          LofiSpace itself does not set first-party tracking cookies. Cookies present on the site come from the
          analytics and advertising providers above. You can block or delete cookies in your browser settings; the
          core workspace will still function.
        </p>

        <h2>Children</h2>
        <p>
          LofiSpace is a general-audience productivity tool and is not directed at children under 13. We do not
          knowingly collect personal information from children.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Clear your browser&apos;s site data to remove all locally stored LofiSpace settings and history.</li>
          <li>Use your browser&apos;s cookie controls or an ad blocker to limit analytics and ad cookies.</li>
          <li>Decline the location permission prompt to keep the weather widget from accessing your position.</li>
        </ul>

        <h2>Changes</h2>
        <p>
          We may update this policy as the product changes. Material changes will be reflected by the &quot;last
          updated&quot; date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent via the support options in the app or the links on our{' '}
          <Link href="/about">About page</Link>.
        </p>
      </div>
    </div>
  )
}
