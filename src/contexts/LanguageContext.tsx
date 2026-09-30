'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { TRANSLATIONS, type Lang, type Translations } from '@/lib/i18n'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: TRANSLATIONS.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  // Priority: explicit ?lang= (links from /vi/* pages) → saved choice → browser language.
  // Read after mount on purpose: the server always renders 'en', so reading during render
  // would cause a hydration mismatch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang')
      if (fromUrl === 'en' || fromUrl === 'vi') {
        setLangState(fromUrl)
        localStorage.setItem('lofispace-lang', fromUrl)
        return
      }
      const saved = localStorage.getItem('lofispace-lang') as Lang | null
      if (saved === 'en' || saved === 'vi') setLangState(saved)
      else if (navigator.language?.toLowerCase().startsWith('vi')) setLangState('vi')
    } catch { /* storage blocked — stay on the default */ }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lofispace-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LangCtx {
  return useContext(LanguageContext)
}
