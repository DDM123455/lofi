'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { LANGS, isLang } from '@/lib/i18n'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <label className="relative flex items-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white/70 transition-colors hover:text-white">
      <span className="sr-only">Language</span>
      <svg aria-hidden width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-2.5">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <select
        value={lang}
        onChange={e => { if (isLang(e.target.value)) setLang(e.target.value) }}
        className="cursor-pointer appearance-none rounded-full bg-transparent py-1 pl-7 pr-6 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        {LANGS.map(l => (
          <option key={l.code} value={l.code} className="bg-[#16121f] text-white">{l.label}</option>
        ))}
      </select>
      <svg aria-hidden width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="pointer-events-none absolute right-2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </label>
  )
}
