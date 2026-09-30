'use client'

import { useEffect } from 'react'

/**
 * The root layout owns <html> and can't be per-route in the App Router without forcing the
 * whole site to render dynamically. All /vi/* pages are Vietnamese, so set the document
 * language on the client instead — rendered search engines pick this up, and it's reset
 * when navigating away.
 */
export function ViLangHtml() {
  useEffect(() => {
    const prev = document.documentElement.lang
    document.documentElement.lang = 'vi'
    return () => { document.documentElement.lang = prev || 'en' }
  }, [])
  return null
}
