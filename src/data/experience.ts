/**
 * src/data/experience.ts — trajectory timeline, bilingual (EN/ES).
 * ✏️ Edit freely: periods, titles and highlights are yours to refine.
 */
import type { Localized } from '@/i18n'

export interface ExperienceEntry {
  id: string
  period: Localized
  title: Localized
  org: string
  track: 'engineering' | 'security' | 'venture'
  summary: Localized
  highlights: readonly Localized[]
  stack: readonly string[]
}

export const experience: readonly ExperienceEntry[] = [
  {
    id: 'web3-circuit',
    period: { en: '2025 — present', es: '2025 — presente' },
    title: {
      en: 'Web3 Builder — International Hackathon Circuit',
      es: 'Builder Web3 — Circuito Internacional de Hackathons',
    },
    org: 'ETHGlobal · Stellar · Chainlink · Uniswap · Aleph',
    track: 'engineering',
    summary: {
      en: 'Shipping end-to-end products under extreme time constraints across the leading Web3 ecosystems — from DeFi protocols to agent-payment infrastructure.',
      es: 'Entregando productos de punta a punta bajo presión extrema de tiempo en los principales ecosistemas Web3 — de protocolos DeFi a infraestructura de pagos para agentes.',
    },
    highlights: [
      {
        en: 'NOVA BAZAAR: x402/MPP agent-payments marketplace on Stellar',
        es: 'NOVA BAZAAR: marketplace de pagos de agentes x402/MPP sobre Stellar',
      },
      {
        en: 'ENSVault: DeFi strategy vaults over ENS records (HackMoney)',
        es: 'ENSVault: bóvedas de estrategias DeFi sobre records ENS (HackMoney)',
      },
      {
        en: 'QuantumPool: adaptive-liquidity Uniswap v4 hook',
        es: 'QuantumPool: hook de Uniswap v4 con liquidez adaptativa',
      },
      {
        en: 'AndesMaaS: DePIN citizen mobility oracles on Soroban',
        es: 'AndesMaaS: oráculos ciudadanos de movilidad DePIN sobre Soroban',
      },
    ],
    stack: ['Solidity', 'Soroban', 'Next.js', 'TypeScript', 'Foundry'],
  },
  {
    id: 'security-track',
    period: { en: '2024 — present', es: '2024 — presente' },
    title: {
      en: 'Offensive Security Track',
      es: 'Pista de Seguridad Ofensiva',
    },
    org: 'eJPT certification path · smart-contract auditing',
    track: 'security',
    summary: {
      en: 'Adversarial engineering applied to Web3: contract auditing methodology, network penetration testing and secure-SDLC practice.',
      es: 'Ingeniería adversarial aplicada a Web3: metodología de auditoría de contratos, pentesting de redes y práctica de SDLC seguro.',
    },
    highlights: [
      {
        en: 'Smart-contract audit practice: reentrancy, oracle manipulation, upgrade paths',
        es: 'Práctica de auditoría de contratos: reentrancy, manipulación de oráculos, rutas de upgrade',
      },
      {
        en: 'Recon and vulnerability-assessment tooling (nmap, nuclei pipelines)',
        es: 'Tooling de recon y evaluación de vulnerabilidades (pipelines nmap, nuclei)',
      },
      {
        en: 'Security-first architecture baked into every hackathon build',
        es: 'Arquitectura security-first integrada en cada build de hackathon',
      },
    ],
    stack: ['Slither', 'Foundry', 'Nmap', 'Nuclei', 'Python'],
  },
  {
    id: 'venture-track',
    period: { en: '2025 — present', es: '2025 — presente' },
    title: {
      en: 'Venture Builder & Strategy',
      es: 'Venture Builder y Estrategia',
    },
    org: 'TERRAGRID · ElevateU 2026 · grant programs',
    track: 'venture',
    summary: {
      en: 'Taking deep-tech from thesis to fundable proposal: problem validation, technical architecture, budgeting and pitch — the investor lens applied from day one.',
      es: 'Llevando deep-tech de tesis a propuesta financiable: validación de problema, arquitectura técnica, presupuesto y pitch — la mirada del inversionista desde el día uno.',
    },
    highlights: [
      {
        en: 'TERRAGRID: AgroNuclear food-production venture (ElevateU 2026 applicant)',
        es: 'TERRAGRID: venture AgroNuclear de producción de alimentos (postulante ElevateU 2026)',
      },
      {
        en: 'Grant & accelerator pipeline across LATAM Web3 ecosystems',
        es: 'Pipeline de grants y aceleradoras en ecosistemas Web3 de LATAM',
      },
      {
        en: 'Tokenomics and product-market analysis for own builds',
        es: 'Tokenomics y análisis producto-mercado para builds propios',
      },
    ],
    stack: ['Market Analysis', 'Tokenomics', 'Pitch', 'Budgeting'],
  },
  {
    id: 'foundation',
    period: { en: '2023 — 2025', es: '2023 — 2025' },
    title: {
      en: 'Full-Stack Foundation',
      es: 'Base Full-Stack',
    },
    org: 'Independent projects · open source',
    track: 'engineering',
    summary: {
      en: 'Built the engineering base: typed full-stack systems, CI discipline and open-source contribution habits that every later build stands on.',
      es: 'Construí la base de ingeniería: sistemas full-stack tipados, disciplina de CI y hábitos de contribución open-source sobre los que se apoya todo lo demás.',
    },
    highlights: [
      {
        en: '250+ GitHub contributions across 15 active repositories',
        es: '250+ contribuciones en GitHub a través de 15 repositorios activos',
      },
      {
        en: 'React/Node production patterns, testing culture, clean architecture',
        es: 'Patrones de producción React/Node, cultura de testing, arquitectura limpia',
      },
    ],
    stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
] as const
