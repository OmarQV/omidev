'use client'

/**
 * src/components/sections/Skills.tsx
 * Tech stack — dual infinite logo marquees (React Bits "logo loop"):
 * two rows gliding in opposite directions, pause on hover, real brand
 * SVGs rendered monochrome. Enhanced category grid with proficiency
 * indicators and animated hover states.
 */
import { motion } from 'motion/react'
import { skillCategories, skillsRowA, skillsRowB, type Skill } from '@/data/skills'
import { useLanguage } from '@/i18n'

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const categoryIcons: Record<string, string> = {
  engineering: '⚡',
  web3: '🔗',
  security: '🛡️',
  strategy: '📊',
}

export function Skills() {
  const { ui } = useLanguage()
  return (
    <section id="skills" className="relative py-28">
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
            <p className="text-technical mb-4 text-accent-bright">{ui.skills.kicker}</p>
            <h2 className="text-display">{ui.skills.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">{ui.skills.blurb}</p>
        </motion.div>
      </div>

      {/* Full-bleed marquees */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <MarqueeRow skills={skillsRowA} />
        <MarqueeRow skills={skillsRowB} reverse />
      </motion.div>

      {/* Enhanced category summary */}
      <div className="mx-auto mt-16 grid w-[min(72rem,calc(100%-2.5rem))] gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ ...spring, delay: i * 0.06 }}
            className="group relative bg-surface p-6 transition-colors hover:bg-surface-2"
          >
            {/* Hover glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.06), transparent 70%)',
              }}
            />

            <div className="relative">
              <span className="mb-3 block text-2xl" aria-hidden>
                {categoryIcons[cat.label] || '•'}
              </span>
              <p className="text-technical mb-2 text-accent-bright/70 transition-colors group-hover:text-accent-bright">
                {ui.skills.categories[cat.label]}
              </p>
              <p className="text-sm leading-relaxed text-foreground-soft/85">{cat.items}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ═══ Marquee row ══════════════════════════════════════════════ */

function MarqueeRow({ skills, reverse = false }: { skills: readonly Skill[]; reverse?: boolean }) {
  // Track content duplicated once → seamless -50% translate loop
  const loop = [...skills, ...skills]

  return (
    <div className="marquee">
      <ul
        className={`marquee-track items-center gap-4 pr-4 ${reverse ? 'marquee-reverse' : ''}`}
        aria-hidden={false}
      >
        {loop.map((skill, i) => (
          <li
            key={`${skill.name}-${i}`}
            aria-hidden={i >= skills.length || undefined}
            className="group flex shrink-0 items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 transition-colors duration-300 hover:border-accent-border hover:bg-surface-2"
          >
            <LogoIcon skill={skill} />
            <span className="whitespace-nowrap font-mono text-sm text-muted transition-colors duration-300 group-hover:text-foreground">
              {skill.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LogoIcon({ skill }: { skill: Skill }) {
  return (
    <svg
      role="img"
      aria-label={`${skill.name} logo`}
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-muted transition-all duration-300 group-hover:fill-foreground"
    >
      <path d={skill.icon.path} />
    </svg>
  )
}
