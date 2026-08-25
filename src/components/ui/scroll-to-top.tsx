'use client'

/**
 * src/components/ui/scroll-to-top.tsx
 * Floating action button that appears after scrolling past 50vh
 * and smoothly scrolls the user back to the hero.
 */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'

const spring = { type: 'spring', stiffness: 200, damping: 25 } as const

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollUp}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={spring}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-muted shadow-lg backdrop-blur-md transition-colors hover:border-accent-border hover:text-accent-bright"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
