/**
 * src/data/projects.ts — real case studies, bilingual (EN/ES).
 * Structure: Problem → Technical Solution → Business Impact.
 * Images: drop screenshots at  public/projects/<id>.jpg
 */
import type { Localized } from '@/i18n'

export interface Project {
  id: string
  title: string
  tagline: Localized
  problem: Localized
  solution: Localized
  impact: Localized
  stack: readonly string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export const projects: readonly Project[] = [
  {
    id: 'nova-bazaar',
    title: 'NOVA BAZAAR',
    tagline: {
      en: 'Microservices marketplace for AI agents with native payments on Stellar.',
      es: 'Marketplace de microservicios para agentes de IA con pagos nativos sobre Stellar.',
    },
    problem: {
      en: 'AI agents cannot autonomously pay for the services they consume — traditional rails demand accounts and human sign-ups.',
      es: 'Los agentes de IA no pueden pagar de forma autónoma los servicios que consumen — los rieles tradicionales exigen cuentas y registros humanos.',
    },
    solution: {
      en: 'PNPM monorepo: marketplace API (Express + Prisma), Next.js 15 dashboard and three providers. x402 pay-per-request + MPP payment-channel sessions settled in USDC on Stellar testnet, plus a TypeScript agent SDK.',
      es: 'Monorepo PNPM: API de marketplace (Express + Prisma), dashboard Next.js 15 y tres proveedores. x402 pago-por-solicitud + sesiones MPP con canales de pago liquidadas en USDC sobre Stellar testnet, más un SDK de agentes en TypeScript.',
    },
    impact: {
      en: 'Working end-to-end machine-to-machine commerce demo — a reference architecture for x402/MPP on Stellar.',
      es: 'Demo funcional de comercio machine-to-machine de punta a punta — arquitectura de referencia para x402/MPP en Stellar.',
    },
    stack: ['Next.js 15', 'TypeScript', 'Stellar', 'x402', 'MPP', 'Prisma'],
    githubUrl: 'https://github.com/Nova-Bazaar/nova-bazaar-sdk',
    featured: true,
  },
  {
    id: 'ensvault',
    title: 'ENSVault',
    tagline: {
      en: 'Your name, your strategy — ENS names as portable DeFi strategy vaults.',
      es: 'Tu nombre, tu estrategia — nombres ENS como bóvedas DeFi portables.',
    },
    problem: {
      en: 'DeFi users reconfigure slippage, routers and risk in every dApp; strategies are locked to interfaces with no portable identity.',
      es: 'Los usuarios DeFi reconfiguran slippage, routers y riesgo en cada dApp; las estrategias quedan atadas a interfaces sin identidad portable.',
    },
    solution: {
      en: 'Four contracts (Factory, Vault, StrategyRegistry, custom ENSStrategyResolver) reading a strategy schema from ENS text records and content hashes — copy trading and on-chain reputation tied to trader.eth.',
      es: 'Cuatro contratos (Factory, Vault, StrategyRegistry, ENSStrategyResolver custom) que leen un esquema de estrategia desde text records y content hashes de ENS — copy trading y reputación on-chain ligada a trader.eth.',
    },
    impact: {
      en: 'Turns ENS into portable DeFi identity: one name carries strategy, risk profile and track record across protocols.',
      es: 'Convierte ENS en identidad DeFi portable: un nombre lleva estrategia, perfil de riesgo e historial a través de protocolos.',
    },
    stack: ['Solidity', 'ENS', 'IPFS', 'Uniswap', 'Aave'],
    featured: true,
  },
  {
    id: 'andesmaas',
    title: 'AndesMaaS 3.0',
    tagline: {
      en: 'Citizen mobility oracles — gamified DePIN for La Paz on Stellar.',
      es: 'Oráculos ciudadanos de movilidad — DePIN gamificado para La Paz sobre Stellar.',
    },
    problem: {
      en: 'La Paz has zero real-time mobility data; transport eats 15-20% of a student’s budget amid roadblocks and extreme weather.',
      es: 'La Paz no tiene datos de movilidad en tiempo real; el transporte consume 15-20% del presupuesto de un estudiante entre bloqueos y clima extremo.',
    },
    solution: {
      en: 'Commit-reveal reporting (crypto anti-fraud), Proof of Location validation (<500m GPS) and $ANDES rewards via Soroban smart contracts, with Pokémon GO-style gamification and AI surge incentives.',
      es: 'Reportes commit-reveal (anti-fraude criptográfico), validación Proof of Location (<500m GPS) y recompensas $ANDES vía smart contracts Soroban, con gamificación estilo Pokémon GO e incentivos surge por IA.',
    },
    impact: {
      en: 'Model user funds ~30% of her transport fares by reporting her daily commute; the city gets a live mobility dashboard at zero sensor cost.',
      es: 'Usuaria modelo financia ~30% de sus pasajes reportando su trayecto diario; la ciudad obtiene un dashboard de movilidad en vivo sin costo de sensores.',
    },
    stack: ['Stellar', 'Soroban', 'React', 'TypeScript', 'Geolocation'],
    githubUrl: 'https://github.com/ANDESMAAS-3-0/andesmaas-3.0',
    featured: true,
  },
  {
    id: 'flowpay-sync',
    title: 'FlowPay Sync',
    tagline: {
      en: 'Smart payment links with AI upselling over WhatsApp (Fiserv/Clover).',
      es: 'Links de pago inteligentes con upselling por IA vía WhatsApp (Fiserv/Clover).',
    },
    problem: {
      en: 'LATAM merchants close sales in WhatsApp chats but collect payments manually — no conversion tracking, no upselling, no analytics.',
      es: 'Los comercios de LATAM cierran ventas por WhatsApp pero cobran a mano — sin tracking de conversión, sin upselling, sin analítica.',
    },
    solution: {
      en: 'Next.js App Router platform: one-click payment links with pre-filled WhatsApp messages, a dynamic upselling engine per transaction and a merchant dashboard — typed end to end with Zod and Clover POS hooks.',
      es: 'Plataforma Next.js App Router: links de pago de un clic con mensajes de WhatsApp pre-llenados, motor de upselling dinámico por transacción y dashboard de comercio — tipada de punta a punta con Zod e integración Clover POS.',
    },
    impact: {
      en: 'Turns a chat thread into a measurable sales channel that raises average ticket via automatic upsells.',
      es: 'Convierte un chat en un canal de ventas medible que eleva el ticket promedio con upsells automáticos.',
    },
    stack: ['Next.js', 'TypeScript', 'shadcn/ui', 'Zod', 'Clover API'],
    githubUrl: 'https://github.com/FlowPay-Sync/flowpay-sync',
    featured: true,
  },
  {
    id: 'terragrid',
    title: 'TERRAGRID',
    tagline: {
      en: 'Autonomous AgroNuclear food-production nodes for extreme territories.',
      es: 'Nodos AgroNucleares autónomos de producción de alimentos para territorios extremos.',
    },
    problem: {
      en: 'Regions with extreme climate and weak logistics cannot sustain agriculture — food security hangs on fragile supply chains.',
      es: 'Regiones con clima extremo y logística débil no sostienen agricultura — la seguridad alimentaria pende de cadenas frágiles.',
    },
    solution: {
      en: 'Demonstrative MVP: vertical controlled-environment farming, offline-first IoT sensing, operations dashboard, digital traceability and energy simulation — SMR microgrid as the strategic power layer.',
      es: 'MVP demostrativo: agricultura vertical de ambiente controlado, sensórica IoT offline-first, dashboard de operación, trazabilidad digital y simulación energética — microred SMR como capa estratégica.',
    },
    impact: {
      en: 'Full venture package (validated problem, architecture, budget, roadmap) — deep-tech taken from thesis to fundable proposal (ElevateU 2026).',
      es: 'Paquete de venture completo (problema validado, arquitectura, presupuesto, roadmap) — deep-tech de tesis a propuesta financiable (ElevateU 2026).',
    },
    stack: ['IoT', 'Offline-first', 'Data Pipeline', 'Energy Sim', '3D'],
    githubUrl: 'https://github.com/OmarQV/TERRAGRID',
    featured: false,
  },
] as const
