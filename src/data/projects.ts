import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with real-time inventory management and payment integration.',
    longDescription: 'Full-featured e-commerce solution built with React and Node.js, featuring real-time inventory tracking, secure payment processing with Stripe, and an intuitive admin dashboard.',
    image: '/projects/ecommerce.jpg',
    tags: ['Featured', 'Web App'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: true,
    category: 'web'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task manager with real-time updates and team collaboration features.',
    longDescription: 'A collaborative task management application with real-time synchronization, team workspaces, and project tracking capabilities.',
    image: '/projects/taskmanager.jpg',
    tags: ['SaaS', 'Productivity'],
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma', 'WebSockets'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: true,
    category: 'web'
  },
  {
    id: '3',
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for tracking social media metrics and engagement across platforms.',
    longDescription: 'Comprehensive analytics dashboard providing insights into social media performance with interactive charts and real-time data visualization.',
    image: '/projects/dashboard.jpg',
    tags: ['Analytics', 'Dashboard'],
    technologies: ['React', 'Python', 'FastAPI', 'Chart.js', 'Redis'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: true,
    category: 'web'
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'Modern portfolio website with 3D animations and smooth interactions.',
    longDescription: 'A stunning portfolio website featuring Three.js animations, smooth scroll effects, and a modern design approach.',
    image: '/projects/portfolio.jpg',
    tags: ['Design', 'Creative'],
    technologies: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: false,
    category: 'web'
  },
  {
    id: '5',
    title: 'Weather App',
    description: 'Beautiful weather application with location-based forecasts and interactive maps.',
    longDescription: 'Weather forecasting app with beautiful UI, location services, and 7-day forecasts using OpenWeather API.',
    image: '/projects/weather.jpg',
    tags: ['Mobile', 'API'],
    technologies: ['React Native', 'TypeScript', 'OpenWeather API'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: false,
    category: 'mobile'
  },
  {
    id: '6',
    title: 'Fitness Tracker',
    description: 'Mobile fitness tracking app with workout plans and progress monitoring.',
    longDescription: 'Complete fitness tracking solution with custom workout plans, progress charts, and social features.',
    image: '/projects/fitness.jpg',
    tags: ['Mobile', 'Health'],
    technologies: ['React Native', 'Firebase', 'Redux'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project',
    featured: false,
    category: 'mobile'
  }
]

export const featuredProjects = projects.filter(p => p.featured)
