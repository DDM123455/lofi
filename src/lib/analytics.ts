declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

type GtagEventParams = Record<string, string | number | boolean | undefined>

function gtag(event: string, params?: GtagEventParams) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', event, params)
}

export const analytics = {
  /** Fired when user opens the workspace (/workspace). */
  workspaceOpen(source?: string) {
    gtag('workspace_open', { event_category: 'engagement', source })
  },

  /** Fired when a named preset is opened (/workspace/p/[slug]). */
  presetOpen(slug: string) {
    gtag('preset_open', { event_category: 'engagement', preset_slug: slug })
  },

  /** Fired when the share button is clicked inside the workspace. */
  shareClick(method: 'copy_link' | 'other' = 'copy_link') {
    gtag('share', { method, content_type: 'workspace_url' })
  },

  /** Fired when the Support button is clicked in the footer. */
  supportClick() {
    gtag('support_click', { event_category: 'monetisation' })
  },

  /** Fired when a donation method is selected inside the support modal. */
  donationMethodClick(method: string) {
    gtag('donation_method_click', { event_category: 'monetisation', method })
  },

  /** Generic custom event for one-off tracking. */
  custom(name: string, params?: GtagEventParams) {
    gtag(name, params)
  },
}
