'use client'

/**
 * src/components/layout/Footer.tsx
 * Minimal closing line — availability status, brand, copyright.
 */
import { profile } from '@/data/profile'
import { useLanguage } from '@/i18n'

export function Footer() {
  const { ui } = useLanguage()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-[min(72rem,calc(100%-2.5rem))] flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="font-mono text-xs tracking-tight text-muted">
          OMIDEV<span className="text-accent">_</span> © {new Date().getFullYear()}
        </p>

        <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status" />
          </span>
          {ui.footer.available}
        </p>

        <p className="text-xs text-muted-dark">
          {profile.name} — {profile.location}
        </p>
      </div>
    </footer>
  )
}
