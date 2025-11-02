import type { Skill } from '@/types'

export const skills: Skill[] = [
  // Blockchain & Web3
  {
    name: 'Solidity',
    icon: '/img/icons/skills/solidity.svg',
    level: 90,
    category: 'blockchain'
  },
  {
    name: 'Ethereum',
    icon: '/img/icons/skills/ethereum.svg',
    level: 85,
    category: 'blockchain'
  },
  {
    name: 'Web3.js',
    icon: '/img/icons/skills/web3js.svg',
    level: 85,
    category: 'blockchain'
  },
  {
    name: 'Smart Contracts',
    icon: '/img/icons/skills/contract.svg',
    level: 90,
    category: 'blockchain'
  },
  
  // Languages
  {
    name: 'JavaScript',
    icon: '/img/icons/skills/javascript-color.svg',
    level: 90,
    category: 'languages'
  },
  {
    name: 'TypeScript',
    icon: '/img/icons/skills/typeScript.svg',
    level: 85,
    category: 'languages'
  },
  {
    name: 'Bash',
    icon: '/img/icons/skills/bash.svg',
    level: 80,
    category: 'languages'
  },
  
  // Frontend
  {
    name: 'React',
    icon: '/img/icons/skills/react-dark.svg',
    level: 90,
    category: 'frontend'
  },
  {
    name: 'Next.js',
    icon: '/img/icons/skills/next.svg',
    level: 85,
    category: 'frontend'
  },
  {
    name: 'Vue.js',
    icon: '/img/icons/skills/vue.svg',
    level: 80,
    category: 'frontend'
  },
  {
    name: 'Astro',
    icon: '/img/icons/skills/astro.svg',
    level: 75,
    category: 'frontend'
  },
  {
    name: 'HTML5',
    icon: '/img/icons/skills/HTML5.svg',
    level: 95,
    category: 'frontend'
  },
  {
    name: 'CSS3',
    icon: '/img/icons/skills/CSS3.svg',
    level: 90,
    category: 'frontend'
  },
  {
    name: 'Tailwind CSS',
    icon: '/img/icons/skills/tailwindcss.svg',
    level: 90,
    category: 'frontend'
  },
  {
    name: 'Sass',
    icon: '/img/icons/skills/sass.svg',
    level: 85,
    category: 'frontend'
  },
  {
    name: 'Styled Components',
    icon: '/img/icons/skills/styledcomponents.svg',
    level: 80,
    category: 'frontend'
  },
  
  // Backend & Databases
  {
    name: 'Node.js',
    icon: '/img/icons/skills/nodejs-dark.svg',
    level: 85,
    category: 'backend'
  },
  {
    name: 'MySQL',
    icon: '/img/icons/skills/mysql.svg',
    level: 80,
    category: 'backend'
  },
  {
    name: 'Supabase',
    icon: '/img/icons/skills/supabase.svg',
    level: 75,
    category: 'backend'
  },
  {
    name: 'WordPress',
    icon: '/img/icons/skills/wordpress.svg',
    level: 80,
    category: 'backend'
  },
  
  // Security & Tools
  {
    name: 'Git',
    icon: '/img/icons/skills/git.svg',
    level: 90,
    category: 'tools'
  },
  {
    name: 'Ubuntu',
    icon: '/img/icons/skills/ubuntu.svg',
    level: 85,
    category: 'tools'
  },
  {
    name: 'Vercel',
    icon: '/img/icons/skills/vercel.svg',
    level: 80,
    category: 'tools'
  }
]

export const skillCategories = {
  blockchain: skills.filter(s => s.category === 'blockchain'),
  languages: skills.filter(s => s.category === 'languages'),
  frontend: skills.filter(s => s.category === 'frontend'),
  backend: skills.filter(s => s.category === 'backend'),
  security: skills.filter(s => s.category === 'security'),
  tools: skills.filter(s => s.category === 'tools')
}
