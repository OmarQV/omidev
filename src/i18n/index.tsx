'use client'

/**
 * src/i18n/index.tsx — bilingual EN/ES system.
 * LanguageProvider persists the choice, syncs <html lang> and exposes:
 *   lang        current language
 *   toggleLang  EN ⇄ ES
 *   t(value)    resolves a Localized field
 *   ui          full UI-strings dictionary for the active language
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ui as dictionaries, type UIStrings } from './ui'

export type Lang = 'en' | 'es'

/** A string localized in both supported languages. */
export interface Localized {
  en: string
  es: string
}

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  t: (value: Localized) => string
  ui: UIStrings
}

const STORAGE_KEY = 'omidev-lang'
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR-safe default; real preference resolved after mount
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') {
      setLang(stored)
    } else if (navigator.language.toLowerCase().startsWith('es')) {
      setLang('es')
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'en' ? 'es' : 'en'
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggleLang,
      t: (v: Localized) => v[lang],
      ui: dictionaries[lang],
    }),
    [lang, toggleLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within <LanguageProvider>')
  return ctx
}
