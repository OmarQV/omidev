/**
 * Project interface for portfolio items
 */
export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  category: 'web' | 'mobile' | '3d' | 'design' | 'other'
}

/**
 * Skill interface
 */
export interface Skill {
  name: string
  icon: string
  level: number // 1-100
  category: 'blockchain' | 'languages' | 'frontend' | 'backend' | 'security' | 'tools' | 'design' | 'other'
}

/**
 * Experience interface
 */
export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current?: boolean
  description: string[]
  technologies: string[]
}

/**
 * Social link interface
 */
export interface SocialLink {
  name: string
  url: string
  icon: string
}

/**
 * Navigation item interface
 */
export interface NavItem {
  name: string
  href: string
  icon?: string
}
