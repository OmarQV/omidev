'use client'

/**
 * src/components/ui/section-divider.tsx
 * Subtle glow separator between major sections.
 * Animated radial pulse keeps the page feeling alive.
 */
import { motion } from 'motion/react'

export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-4">
      {/* Gradient line */}
      <div className="h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Ambient glow blob */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute h-10 w-40 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)',
        }}
      />
    </div>
  )
}
