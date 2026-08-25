/**
 * src/i18n/ui.ts — UI strings dictionary (EN/ES).
 * Every interface string lives here; content data uses Localized fields.
 */

export interface UIStrings {
  nav: {
    home: string
    projects: string
    stack: string
    experience: string
    contact: string
  }
  available: string
  hero: {
    viewProjects: string
    getInTouch: string
    portraitAlt: string
  }
  projects: {
    kicker: string
    title: string
    blurb: string
    dragHint: string
    problem: string
    solution: string
    impact: string
    prev: string
    next: string
    source: string
    live: string
  }
  skills: {
    kicker: string
    title: string
    blurb: string
    categories: {
      engineering: string
      web3: string
      security: string
      strategy: string
    }
  }
  experience: {
    kicker: string
    title: string
    blurb: string
    tracks: {
      engineering: string
      security: string
      venture: string
    }
  }
  contact: {
    kicker: string
    titleA: string
    titleB: string
    titleHighlight: string
    pitch: string
    directLine: string
    writeMe: string
    location: string
    status: string
    responseTime: string
    responseValue: string
    copyEmail: string
    copied: string
    mailSubject: string
  }
  footer: {
    available: string
  }
}

export const ui: Record<'en' | 'es', UIStrings> = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      stack: 'Stack',
      experience: 'Experience',
      contact: 'Contact',
    },
    available: 'available',
    hero: {
      viewProjects: 'View projects',
      getInTouch: 'Get in touch',
      portraitAlt: 'Portrait of Omar Quispe Vargas',
    },
    projects: {
      kicker: '01 / selected work',
      title: 'Projects.',
      blurb:
        'Every build framed the same way: problem, technical solution, business impact. Hackathon-forged, production-minded.',
      dragHint: 'drag · scroll · snap',
      problem: 'problem',
      solution: 'solution',
      impact: 'impact',
      prev: 'Previous project',
      next: 'Next project',
      source: 'source code',
      live: 'live demo',
    },
    skills: {
      kicker: '02 / stack',
      title: 'Tools of the trade.',
      blurb: 'The stack behind every build — typed, containerized and audited before it ships.',
      categories: {
        engineering: 'engineering',
        web3: 'web3',
        security: 'security',
        strategy: 'strategy',
      },
    },
    experience: {
      kicker: '03 / trajectory',
      title: 'Experience.',
      blurb:
        'Three parallel tracks — engineering, offensive security and venture strategy — compounding into one hybrid profile.',
      tracks: {
        engineering: 'engineering',
        security: 'security',
        venture: 'venture / vc',
      },
    },
    contact: {
      kicker: '04 / contact',
      titleA: "Let's build",
      titleB: 'something',
      titleHighlight: 'defensible.',
      pitch:
        'Selectively available for smart-contract audits, security consulting, Web3 product engineering and strategic advisory. If your project demands security by design — tell me about it.',
      directLine: 'direct line',
      writeMe: 'Write me',
      location: 'location',
      status: 'status',
      responseTime: 'response time',
      responseValue: '< 48h — serious briefs first',
      copyEmail: 'Copy email address',
      copied: 'Email copied',
      mailSubject: '[omidev] Project brief',
    },
    footer: {
      available: 'Available for contracts',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      stack: 'Stack',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    available: 'disponible',
    hero: {
      viewProjects: 'Ver proyectos',
      getInTouch: 'Hablemos',
      portraitAlt: 'Retrato de Omar Quispe Vargas',
    },
    projects: {
      kicker: '01 / trabajo seleccionado',
      title: 'Proyectos.',
      blurb:
        'Cada build con el mismo marco: problema, solución técnica, impacto de negocio. Forjados en hackathons, pensados para producción.',
      dragHint: 'arrastra · scroll · snap',
      problem: 'problema',
      solution: 'solución',
      impact: 'impacto',
      prev: 'Proyecto anterior',
      next: 'Proyecto siguiente',
      source: 'código fuente',
      live: 'demo en vivo',
    },
    skills: {
      kicker: '02 / stack',
      title: 'Herramientas del oficio.',
      blurb: 'El stack detrás de cada build — tipado, contenedorizado y auditado antes de salir.',
      categories: {
        engineering: 'ingeniería',
        web3: 'web3',
        security: 'seguridad',
        strategy: 'estrategia',
      },
    },
    experience: {
      kicker: '03 / trayectoria',
      title: 'Experiencia.',
      blurb:
        'Tres pistas paralelas — ingeniería, seguridad ofensiva y estrategia de venture — componiendo un solo perfil híbrido.',
      tracks: {
        engineering: 'ingeniería',
        security: 'seguridad',
        venture: 'venture / vc',
      },
    },
    contact: {
      kicker: '04 / contacto',
      titleA: 'Construyamos',
      titleB: 'algo',
      titleHighlight: 'defendible.',
      pitch:
        'Disponibilidad selectiva para auditorías de smart contracts, consultoría de seguridad, ingeniería de producto Web3 y asesoría estratégica. Si tu proyecto exige seguridad desde el diseño — cuéntame.',
      directLine: 'línea directa',
      writeMe: 'Escríbeme',
      location: 'ubicación',
      status: 'estado',
      responseTime: 'tiempo de respuesta',
      responseValue: '< 48h — briefs serios primero',
      copyEmail: 'Copiar correo',
      copied: 'Correo copiado',
      mailSubject: '[omidev] Brief de proyecto',
    },
    footer: {
      available: 'Disponible para contratos',
    },
  },
}
