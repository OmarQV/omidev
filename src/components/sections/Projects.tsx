'use client'

/**
 * src/components/sections/Projects.tsx
 * Embla carousel with drag physics, autoplay, dot indicators,
 * 3D tilt cards with real project images, and modal detail view.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, ImageIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ProjectDetail } from '@/components/ui/project-detail'
import { projects, type Project } from '@/data/projects'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const
const AUTOPLAY_INTERVAL = 5000

export function Projects() {
  const { ui } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  })

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const updateState = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateState()
    emblaApi.on('select', updateState)
    emblaApi.on('reInit', updateState)
    return () => {
      emblaApi.off('select', updateState)
      emblaApi.off('reInit', updateState)
    }
  }, [emblaApi, updateState])

  // Manual autoplay — pauses on pointer enter, resumes on leave
  useEffect(() => {
    if (!emblaApi) return
    let timer: ReturnType<typeof setInterval>

    const play = () => {
      timer = setInterval(() => {
        if (emblaApi.canScrollNext()) emblaApi.scrollNext()
        else emblaApi.scrollTo(0)
      }, AUTOPLAY_INTERVAL)
    }

    const stop = () => clearInterval(timer)

    play()
    const root = emblaApi.rootNode()
    root.addEventListener('pointerenter', stop)
    root.addEventListener('pointerleave', play)

    return () => {
      stop()
      root.removeEventListener('pointerenter', stop)
      root.removeEventListener('pointerleave', play)
    }
  }, [emblaApi])

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
              onClick={() => emblaApi?.scrollPrev()}
            />
            <RailButton
              direction="next"
              disabled={!canNext}
              onClick={() => emblaApi?.scrollNext()}
            />
          </div>
        </motion.div>
      </div>

      {/* Embla carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 pl-[max(1.25rem,calc((100vw-72rem)/2))] pr-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenDetail={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mx-auto mt-8 flex w-[min(72rem,calc(100%-2.5rem))] items-center gap-2">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to ${p.title}`}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === selectedIndex
                ? 'w-8 bg-accent'
                : 'w-1.5 bg-border-strong hover:bg-muted-dark'
            )}
          />
        ))}
      </div>

      {/* Project detail modal */}
      <ProjectDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
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

/* ═══ Card with 3D tilt ═══════════════════════════════════════ */

function ProjectCard({
  project,
  index,
  onOpenDetail,
}: {
  project: Project
  index: number
  onOpenDetail: () => void
}) {
  const { t, ui } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
  }

  const handleLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...spring, delay: Math.min(index * 0.06, 0.2) }}
      className="min-w-0 flex-[0_0_min(26rem,85vw)]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="tilt-card border-glow group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
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

        {/* ── Body — simplified, with "View details" CTA ─────────── */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{t(project.tagline)}</p>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
            {project.stack.length > 4 && (
              <Badge variant="outline">+{project.stack.length - 4}</Badge>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenDetail}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-bright transition-colors hover:text-accent"
          >
            View case study
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.article>
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
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  )
}
