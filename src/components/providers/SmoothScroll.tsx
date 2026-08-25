'use client'

/**
 * src/components/providers/SmoothScroll.tsx
 * Lenis smooth-scroll wrapper. Client Component by necessity
 * (requestAnimationFrame loop), but it renders no DOM of its own.
 *
 * Accessibility: if the user prefers reduced motion, Lenis is never
 * instantiated and native scrolling is preserved untouched.
 */
import { ReactLenis } from 'lenis/react'
import { useEffect, useState, type ReactNode } from 'react'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // SSR + first client paint + reduced-motion users: native scroll
  if (reducedMotion !== false) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        // Stable, premium glide — no artificial overshoot
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
        touchMultiplier: 1.4,
        anchors: true, // Lenis-managed #hash navigation
      }}
    >
      {children}
    </ReactLenis>
  )
}
