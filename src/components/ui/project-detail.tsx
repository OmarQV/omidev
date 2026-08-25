'use client'

/**
 * src/components/ui/project-detail.tsx
 * Modal overlay for expanded project details (Problem → Solution → Impact).
 * Uses Motion for spring-based enter/exit and <dialog> for a11y.
 */
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, ArrowUpRight, Github } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/data/projects'
import { useLanguage } from '@/i18n'

const spring = { type: 'spring', stiffness: 200, damping: 25 } as const

interface ProjectDetailProps {
  project: Project | null
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const { t, ui } = useLanguage()

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={spring}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-8 sm:p-10"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            {/* Title */}
            <p className="text-technical mb-2 text-accent-bright">{ui.projects.kicker}</p>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-muted">{t(project.tagline)}</p>

            {/* Case study sections */}
            <dl className="mt-8 space-y-6">
              <CaseSection label={ui.projects.problem} text={t(project.problem)} />
              <CaseSection label={ui.projects.solution} text={t(project.solution)} />
              <CaseSection label={ui.projects.impact} text={t(project.impact)} />
            </dl>

            {/* Stack */}
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {ui.projects.source}
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {ui.projects.live}
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CaseSection({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-l-2 border-accent/30 pl-5">
      <dt className="text-technical mb-1.5 text-xs text-accent-bright/70">{label}</dt>
      <dd className="text-sm leading-relaxed text-foreground-soft/90">{text}</dd>
    </div>
  )
}
