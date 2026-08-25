'use client'

/**
 * src/components/ui/scroll-progress.tsx
 * Thin accent-gradient bar fixed at the top of the viewport
 * that fills proportionally to the user's scroll position.
 */
import { motion, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-accent-dim via-accent to-accent-bright"
    />
  )
}
