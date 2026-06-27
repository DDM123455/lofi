'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/5 p-0.5">
      <button
        onClick={() => setLang('en')}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
          lang === 'en'
            ? 'bg-violet-600 text-white'
            : 'text-white/40 hover:text-white/70'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('vi')}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
          lang === 'vi'
            ? 'bg-violet-600 text-white'
            : 'text-white/40 hover:text-white/70'
        }`}
      >
        VI
      </button>
    </div>
  )
}
