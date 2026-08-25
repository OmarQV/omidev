'use client'

/**
 * src/components/layout/PillNav.tsx
 * Floating pill navigation — active item = inverted white pill gliding
 * behind the label (layoutId, spring 100/20). Includes EN/ES toggle.
 */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Languages, Menu, X } from 'lucide-react'
import { navItems } from '@/data/profile'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

export function PillNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<string>('#home')
  const { lang, toggleLang, ui } = useLanguage()

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    for (const s of sections) observer.observe(s)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring}
      className="fixed inset-x-0 top-5 z-50 flex justify-center px-4"
    >
      <nav aria-label="Main navigation" className="glass relative rounded-full">
        <div className="flex h-12 items-center gap-1 pl-5 pr-2">
          {/* Brand — lilac underscore */}
          <a
            href="#home"
            className="mr-2 font-mono text-sm font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            OMIDEV<span className="text-accent">_</span>
          </a>

          {/* Desktop items */}
          <ul className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="pill-active"
                      transition={spring}
                      className="absolute inset-0 rounded-full bg-foreground"
                    />
                  )}
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-200',
                      isActive
                        ? 'font-medium text-background'
                        : 'text-muted hover:text-foreground'
                    )}
                  >
                    {ui.nav[item.key]}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
            className="ml-1 flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent-border hover:text-accent-bright"
          >
            <Languages className="h-3.5 w-3.5" strokeWidth={1.5} />
            {lang === 'en' ? 'ES' : 'EN'}
          </button>

          {/* Availability chip */}
          <span className="ml-1 hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted lg:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status" />
            </span>
            {ui.available}
          </span>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="rounded-full p-2 text-muted transition-colors hover:text-foreground md:hidden"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="glass absolute inset-x-0 top-14 rounded-2xl p-2 md:hidden"
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-sm transition-colors',
                      active === item.href
                        ? 'bg-foreground font-medium text-background'
                        : 'text-muted hover:bg-surface-2 hover:text-foreground'
                    )}
                  >
                    {ui.nav[item.key]}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
