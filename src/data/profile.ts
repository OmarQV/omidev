/**
 * src/data/profile.ts — single source of truth for identity content.
 * User-visible copy is bilingual via the Localized type.
 */
import type { Localized } from '@/i18n'

export interface SocialLink {
  name: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'mail'
}

export const profile = {
  name: 'Omar Quispe Vargas',
  firstName: 'Omar',
  lastName: 'Quispe Vargas',
  brand: 'OMIDEV',
  location: 'Bolivia · UTC-4',
  email: 'quispevargasomar@gmail.com',
  resume: '/docs/QuispeVargasOmar-CV.pdf',

  headline: {
    lead: {
      en: 'Security is architecture,',
      es: 'La seguridad es arquitectura,',
    },
    highlight: {
      en: 'not an afterthought.',
      es: 'no una ocurrencia tardía.',
    },
  },

  subheadline: {
    en: 'Senior Software Engineer operating across four disciplines — full-stack systems, offensive security, blockchain protocols and venture strategy. I take products from threat model to market thesis.',
    es: 'Ingeniero de Software Senior operando en cuatro disciplinas — sistemas full-stack, seguridad ofensiva, protocolos blockchain y estrategia de venture. Llevo productos del modelo de amenazas a la tesis de mercado.',
  } satisfies Localized,

  heroTagline: 'software · security · web3 · vc',
} as const

export const socialLinks: readonly SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/OmarQV', icon: 'github' },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/omar-quispe-vargas-7b5601204',
    icon: 'linkedin',
  },
  { name: 'X / Twitter', url: 'https://x.com/OmarQV2025', icon: 'twitter' },
  { name: 'Email', url: 'mailto:quispevargasomar@gmail.com', icon: 'mail' },
] as const

/** Nav items reference ui.nav keys so labels localize automatically. */
export const navItems = [
  { key: 'home', href: '#home' },
  { key: 'projects', href: '#projects' },
  { key: 'stack', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'contact', href: '#contact' },
] as const

export type NavKey = (typeof navItems)[number]['key']
