'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { TRANSLATIONS, isLang, matchLang, loadTranslations, type Lang, type Translations } from '@/lib/i18n'

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
  // The strings actually on screen. For lazily-loaded languages this lags `lang` by one
  // chunk fetch — the UI keeps the previous language until the new one has arrived rather
  // than flashing a half-translated state.
  const [t, setT] = useState<Translations>(TRANSLATIONS.en)

  // Priority: explicit ?lang= (links from /vi/* pages) → saved choice → browser language.
  // Read after mount on purpose: the server always renders 'en', so reading during render
  // would cause a hydration mismatch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('lang')
      if (isLang(fromUrl)) {
        setLangState(fromUrl)
        localStorage.setItem('lofispace-lang', fromUrl)
        return
      }
      const saved = localStorage.getItem('lofispace-lang')
      if (isLang(saved)) setLangState(saved)
      else {
        const guess = matchLang(navigator.languages?.length ? navigator.languages : [navigator.language ?? ''])
        if (guess) setLangState(guess)
      }
    } catch { /* storage blocked — stay on the default */ }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    let live = true
    loadTranslations(lang)
      .then(next => { if (live) setT(next) })
      .catch(() => { /* chunk failed to load — keep the current strings */ })
    return () => { live = false }
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lofispace-lang', l) } catch { /* ignore */ }
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LangCtx {
  return useContext(LanguageContext)
}
