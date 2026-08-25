'use client'

/**
 * src/components/sections/Hero.tsx
 * Editorial headline with character-reveal animation, GlowButton CTA,
 * Magnetic Morphing Portrait with purple halo + parallax.
 * Portrait: public/portrait.jpg (already in place).
 */
import { useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowRight, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlowButton } from '@/components/ui/glow-button'
import { AnimatedText } from '@/components/ui/animated-text'
import { profile, socialLinks, type SocialLink } from '@/data/profile'
import { useLanguage } from '@/i18n'

const socialIcons: Record<SocialLink['icon'], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...spring, delay },
  }),
}

export function Hero() {
  const { t, ui } = useLanguage()

  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden pt-28">
      {/* Backdrop: global <InteractiveDots /> canvas (see app/page.tsx) */}
      <div className="relative z-10 mx-auto grid w-[min(72rem,calc(100%-2.5rem))] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ── Editorial headline ──────────────────────────────── */}
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-technical mb-6 text-muted"
          >
            <span className="text-accent-bright">{profile.location}</span> — {profile.heroTagline}
          </motion.p>

          <h1 className="text-display text-balance">
            <AnimatedText text={t(profile.headline.lead)} delay={0.08} />
            <br />
            <span className="gradient-accent">
              <AnimatedText text={t(profile.headline.highlight)} delay={0.35} />
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
          >
            {t(profile.subheadline)}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <GlowButton href="#projects">
              {ui.hero.viewProjects}
              <ArrowRight className="h-4 w-4" />
            </GlowButton>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">{ui.hero.getInTouch}</a>
            </Button>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.7}
            className="mt-11 flex gap-3"
            aria-label="Social profiles"
          >
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.icon]
              return (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-border hover:text-accent-bright"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                </li>
              )
            })}
          </motion.ul>
        </div>

        {/* ── Magnetic Morphing Portrait ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.25 }}
          className="justify-self-center"
        >
          <MorphingPortrait alt={ui.hero.portraitAlt} />
        </motion.div>
      </div>
    </section>
  )
}

/* ═══ Magnetic Morphing Portrait ═══════════════════════════════ */

const BLOB_SHAPES = [
  '58% 42% 55% 45% / 52% 55% 45% 48%',
  '45% 55% 48% 52% / 58% 44% 56% 42%',
  '52% 48% 42% 58% / 45% 52% 48% 55%',
  '58% 42% 55% 45% / 52% 55% 45% 48%',
]

function MorphingPortrait({ alt }: { alt: string }) {
  const reducedMotion = useReducedMotion()
  const fieldRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness: 100, damping: 20 })
  const y = useSpring(targetY, { stiffness: 100, damping: 20 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !fieldRef.current) return
    const rect = fieldRef.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    targetX.set(Math.max(-18, Math.min(18, dx * 0.08)))
    targetY.set(Math.max(-18, Math.min(18, dy * 0.08)))
  }

  const handleLeave = () => {
    targetX.set(0)
    targetY.set(0)
  }

  return (
    <div
      ref={fieldRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="flex h-[22rem] w-[22rem] items-center justify-center sm:h-[26rem] sm:w-[26rem]"
    >
      <motion.div
        style={reducedMotion ? { borderRadius: '50%' } : { x, y }}
        animate={reducedMotion ? undefined : { borderRadius: BLOB_SHAPES }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="accent-halo relative h-72 w-72 overflow-hidden border border-accent-border bg-surface-2 sm:h-80 sm:w-80"
      >
        {!imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element -- local
             asset with graceful fallback */
          <img
            src="/portrait.jpg"
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            aria-hidden
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                'radial-gradient(120% 120% at 30% 25%, #2e1065 0%, #0a0a0a 55%, #000 100%)',
            }}
          >
            <span className="select-none font-mono text-6xl font-bold tracking-tighter text-accent-dim">
              OQ
            </span>
          </div>
        )}

        {/* Inner ring + soft lilac wash for cohesion with the theme */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-accent/20 ring-inset"
          style={{
            background:
              'linear-gradient(160deg, rgba(168,85,247,0.10) 0%, transparent 40%, transparent 75%, rgba(124,58,237,0.14) 100%)',
          }}
        />
      </motion.div>
    </div>
  )
}
