'use client'

import { useEffect } from 'react'

/**
 * The root layout owns <html lang="en"> (per-route <html> would force the whole site dynamic),
 * so localized pages set the document language on the client, like /vi does with ViLangHtml.
 * The server-rendered page also carries `lang` on its own wrapper element.
 */
export function LangHtml({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang
    document.documentElement.lang = lang
    return () => { document.documentElement.lang = prev || 'en' }
  }, [lang])
  return null
}
