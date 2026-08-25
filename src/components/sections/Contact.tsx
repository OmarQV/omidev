'use client'

/**
 * src/components/sections/Contact.tsx
 * Interactive contact card with ambient gradient backdrop,
 * one-click email copy with live feedback, direct mail CTA
 * and social rail. Enhanced visual depth.
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile, socialLinks, type SocialLink } from '@/data/profile'
import { useLanguage } from '@/i18n'

const spring = { type: 'spring', stiffness: 100, damping: 20 } as const

const socialIcons: Record<SocialLink['icon'], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

export function Contact() {
  const { ui } = useLanguage()
  return (
    <section id="contact" className="relative py-28">
      {/* Ambient background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(168,85,247,0.06), transparent)',
        }}
      />

      <div className="relative mx-auto w-[min(72rem,calc(100%-2.5rem))]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={spring}
          className="mb-14"
        >
          <p className="text-technical mb-4 text-accent-bright">{ui.contact.kicker}</p>
          <h2 className="text-display">
            {ui.contact.titleA}
            <br />
            {ui.contact.titleB}{' '}
            <span className="gradient-accent">{ui.contact.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ ...spring, delay: 0.08 }}
          className="border-glow overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left: pitch + email */}
            <div>
              <p className="max-w-lg text-base leading-relaxed text-muted">{ui.contact.pitch}</p>

              <div className="mt-8">
                <p className="text-technical mb-3 text-accent-bright/70">
                  {ui.contact.directLine}
                </p>
                <CopyEmail email={profile.email} />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <a
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(ui.contact.mailSubject)}`}
                  >
                    {ui.contact.writeMe}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: metadata + socials */}
            <div className="flex flex-col justify-between gap-8 lg:border-l lg:border-border lg:pl-10">
              <dl className="space-y-5">
                <div>
                  <dt className="text-technical mb-1 text-muted-dark">{ui.contact.location}</dt>
                  <dd className="text-sm text-foreground-soft">{profile.location}</dd>
                </div>
                <div>
                  <dt className="text-technical mb-1 text-muted-dark">{ui.contact.status}</dt>
                  <dd className="flex items-center gap-2 text-sm text-foreground-soft">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status" />
                    </span>
                    {ui.footer.available}
                  </dd>
                </div>
                <div>
                  <dt className="text-technical mb-1 text-muted-dark">
                    {ui.contact.responseTime}
                  </dt>
                  <dd className="text-sm text-foreground-soft">{ui.contact.responseValue}</dd>
                </div>
              </dl>

              <ul className="flex gap-3" aria-label="Social profiles">
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
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══ One-click email copy ═════════════════════════════════════ */

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { ui } = useLanguage()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (permissions/http) — fall back to mailto
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface-2 py-2.5 pl-5 pr-3 transition-colors hover:border-accent-border"
    >
      <span className="font-mono text-sm text-foreground-soft sm:text-base">{email}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-200 group-hover:scale-105">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={spring}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={spring}
            >
              <Copy className="h-3.5 w-3.5" strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="sr-only">{copied ? ui.contact.copied : ui.contact.copyEmail}</span>
    </button>
  )
}
