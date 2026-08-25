'use client'

/**
 * src/components/sections/Experience.tsx
 * Expandable trajectory timeline with enhanced animations —
 * staggered scale-in entries, animated progress rail, and
 * diversified reveal effects per entry.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { experience, type ExperienceEntry } from '@/data/experience'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const entryVariants = [
  { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: -24 }, whileInView: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, scale: 0.96, y: 16 }, whileInView: { opacity: 1, scale: 1, y: 0 } },
  { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 } },
]

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null)
  const { ui } = useLanguage()

  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto w-[min(72rem,calc(100%-2.5rem))]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={spring}
          className="mb-14 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="text-technical mb-4 text-accent-bright">{ui.experience.kicker}</p>
            <h2 className="text-display">{ui.experience.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{ui.experience.blurb}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative ml-2 border-l border-border pl-8 sm:ml-4 sm:pl-12">
          {/* Animated progress line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent/40 to-transparent"
            style={{ transformOrigin: 'top' }}
          />

          {experience.map((entry, i) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={i}
              isOpen={openId === entry.id}
              onToggle={() => setOpenId((cur) => (cur === entry.id ? null : entry.id))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  entry,
  index,
  isOpen,
  onToggle,
}: {
  entry: ExperienceEntry
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const panelId = `exp-panel-${entry.id}`
  const { t, ui } = useLanguage()
  const variant = entryVariants[index % entryVariants.length]

  return (
    <motion.div
      {...variant}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...spring, delay: index * 0.08 }}
      className="relative pb-10 last:pb-0"
    >
      {/* Node on the rail */}
      <motion.span
        aria-hidden
        animate={{
          scale: isOpen ? 1.3 : 1,
          borderColor: isOpen ? 'var(--color-accent)' : 'var(--color-border-strong)',
          backgroundColor: isOpen ? 'var(--color-accent)' : 'var(--color-background)',
        }}
        transition={spring}
        className="absolute -left-[2.57rem] top-2 h-3 w-3 rounded-full border sm:-left-[3.57rem]"
      />

      {/* Header — whole row is the toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="group flex w-full flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-left"
      >
        <div>
          <p className="text-technical mb-1.5 text-muted-dark">
            {t(entry.period)} · <span className="text-accent-bright/70">{ui.experience.tracks[entry.track]}</span>
          </p>
          <h3 className="text-lg font-semibold tracking-tight text-foreground transition-opacity group-hover:opacity-80">
            {t(entry.title)}
          </h3>
          <p className="mt-0.5 text-sm text-muted">{entry.org}</p>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={spring}
          className="mt-1 rounded-full border border-border p-1.5 text-muted transition-colors group-hover:border-border-strong group-hover:text-foreground"
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="overflow-hidden"
          >
            <div className="pt-5">
              <p className="max-w-2xl text-sm leading-relaxed text-foreground-soft/80">
                {t(entry.summary)}
              </p>

              <ul className="mt-4 space-y-2">
                {entry.highlights.map((h, hi) => (
                  <motion.li
                    key={h.en}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...spring, delay: hi * 0.05 }}
                    className="flex gap-3 text-sm text-muted"
                  >
                    <span aria-hidden className="mt-[0.55rem] h-px w-4 shrink-0 bg-accent-dim" />
                    {t(h)}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {entry.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
