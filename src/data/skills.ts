/**
 * src/data/skills.ts — tech stack with real brand logos.
 * Icons come from the `simple-icons` package (SVG paths, self-hosted,
 * tree-shaken per named import — no external requests).
 */
import {
  siChainlink,
  siDocker,
  siEthereum,
  siGit,
  siGithub,
  siGnubash,
  siIpfs,
  siJavascript,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siSolidity,
  siStellar,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons'

export interface Skill {
  name: string
  icon: SimpleIcon
}

/** Row A — languages & frameworks */
export const skillsRowA: readonly Skill[] = [
  { name: 'TypeScript', icon: siTypescript },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'React', icon: siReact },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'Python', icon: siPython },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'Prisma', icon: siPrisma },
  { name: 'Vercel', icon: siVercel },
]

/** Row B — web3, security & infra */
export const skillsRowB: readonly Skill[] = [
  { name: 'Solidity', icon: siSolidity },
  { name: 'Ethereum', icon: siEthereum },
  { name: 'Stellar', icon: siStellar },
  { name: 'Chainlink', icon: siChainlink },
  { name: 'IPFS', icon: siIpfs },
  { name: 'Docker', icon: siDocker },
  { name: 'Linux', icon: siLinux },
  { name: 'Bash', icon: siGnubash },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub },
]

/** Compact category summary rendered under the marquee */
export const skillCategories = [
  {
    label: 'engineering',
    items: 'TypeScript · React · Next.js · Node.js · PostgreSQL',
  },
  {
    label: 'web3',
    items: 'Solidity · Soroban · Foundry · Ethereum · Stellar',
  },
  {
    label: 'security',
    items: 'Slither · Nmap · Nuclei · Burp · Threat Modeling',
  },
  {
    label: 'strategy',
    items: 'Tokenomics · Market Analysis · Pitch · Budgeting',
  },
] as const
