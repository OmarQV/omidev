'use client'

/**
 * src/components/sections/Projects.tsx
 * Horizontal case-study rail — scroll-snap carousel with arrow controls,
 * edge fades and hover-lift cards. Image slot per card:
 * drop screenshots at  public/projects/<id>.jpg
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { projects, type Project } from '@/data/projects'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

export function Projects() {
  const railRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const { ui } = useLanguage()

  // Enable/disable arrows based on scroll position
  const updateArrows = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    setCanPrev(rail.scrollLeft > 8)
    setCanNext(rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 8)
  }, [])

  useEffect(() => {
    updateArrows()
    const rail = railRef.current
    if (!rail) return
    rail.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      rail.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 24 : rail.clientWidth * 0.8
    rail.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="relative overflow-hidden py-28">
      <div className="mx-auto w-[min(72rem,calc(100%-2.5rem))]">
        {/* Section header + controls */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={spring}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="text-technical mb-4 text-accent-bright">{ui.projects.kicker}</p>
            <h2 className="text-display">{ui.projects.title}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {ui.projects.blurb}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-technical mr-2 hidden text-muted-dark sm:block">
              {ui.projects.dragHint}
            </p>
            <RailButton
              direction="prev"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
            />
            <RailButton
              direction="next"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
            />
          </div>
        </motion.div>
      </div>

      {/* Horizontal rail — full-bleed with edge padding matching container */}
      <div
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-[max(1.25rem,calc((100vw-72rem)/2))] px-[max(1.25rem,calc((100vw-72rem)/2))] pb-4"
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function RailButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}) {
  const { ui } = useLanguage()
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? ui.projects.prev : ui.projects.next}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200',
        disabled
          ? 'cursor-default border-border text-muted-dark opacity-40'
          : 'border-border-strong text-foreground hover:-translate-y-0.5 hover:bg-surface-2'
      )}
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </button>
  )
}

/* ═══ Card ═════════════════════════════════════════════════════ */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, ui } = useLanguage()
  return (
    <motion.article
      data-card
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...spring, delay: Math.min(index * 0.06, 0.2) }}
      whileHover={{ y: -6 }}
      className="border-glow group flex w-[min(26rem,85vw)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      {/* ── Image slot ─────────────────────────────────────────── */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
        <ProjectImage project={project} />

        <span className="text-technical absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-muted backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>

        <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${ui.projects.source}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur-sm transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" strokeWidth={1.5} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${ui.projects.live}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted backdrop-blur-sm transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{t(project.tagline)}</p>

        <dl className="mt-5 space-y-3 border-t border-border pt-5">
          <CaseRow label={ui.projects.problem} text={t(project.problem)} />
          <CaseRow label={ui.projects.solution} text={t(project.solution)} />
          <CaseRow label={ui.projects.impact} text={t(project.impact)} />
        </dl>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function CaseRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3">
      <dt className="text-technical pt-0.5 text-[0.625rem] text-accent-bright/70">{label}</dt>
      <dd className="text-[0.8125rem] leading-relaxed text-foreground-soft/80">{text}</dd>
    </div>
  )
}

/* ═══ Image slot with graceful placeholder ═════════════════════ */

function ProjectImage({ project }: { project: Project }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        aria-hidden
        className="flex h-full w-full items-center justify-center"
        style={{
          background:
            'radial-gradient(100% 120% at 50% 0%, #141414 0%, #0a0a0a 60%, #050505 100%)',
        }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-dark">
          <ImageIcon className="h-7 w-7" strokeWidth={1.25} />
          <span className="text-technical text-[0.625rem]">{project.id}.jpg</span>
        </div>
      </div>
    )
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element -- local asset
       with runtime fallback; migrate to next/image once files exist */
    <img
      src={`/projects/${project.id}.jpg`}
      alt={`${project.title} — screenshot`}
      onError={() => setError(true)}
      className="h-full w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  )
}
