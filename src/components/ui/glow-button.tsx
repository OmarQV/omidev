'use client'

/**
 * src/components/ui/glow-button.tsx
 * Premium CTA with continuously rotating conic-gradient border
 * and radial glow on hover. Clearly differentiates the primary action.
 */
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function GlowButton({
  children,
  href,
  className,
}: {
  children: ReactNode
  href: string
  className?: string
}) {
  return (
    <a
      href={href}
      className={cn(
        'group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-7 text-base font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0',
        className
      )}
    >
      {/* Spinning conic gradient border */}
      <span
        aria-hidden
        className="absolute inset-0 animate-glow-spin rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #a855f7, #c084fc, #ffffff, #7c3aed, #a855f7)',
        }}
      />

      {/* Inner solid fill */}
      <span className="absolute inset-[1.5px] rounded-full bg-foreground transition-colors group-hover:bg-foreground-soft" />

      {/* Hover glow layer */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow:
            '0 0 24px rgba(168,85,247,0.35), 0 0 60px rgba(168,85,247,0.15)',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  )
}
