'use client'

/**
 * src/components/ui/animated-text.tsx
 * Character-by-character reveal with staggered spring animation.
 * Each character fades in, slides up, and deblurs independently.
 */
import { motion } from 'motion/react'

const charSpring = { type: 'spring', stiffness: 100, damping: 20 } as const

export function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <motion.span
              key={`${wi}-${ci}`}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                ...charSpring,
                delay: delay + wi * 0.06 + ci * 0.02,
              }}
              className="inline-block"
              aria-hidden
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}
