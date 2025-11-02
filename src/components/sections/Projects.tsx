import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/ui'
import { projects, featuredProjects } from '@/data/projects'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showAll, setShowAll] = useState(false)
  
  const displayProjects = showAll ? projects : featuredProjects

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Building secure dApps and innovative solutions
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Show More Button */}
          {!showAll && projects.length > featuredProjects.length && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(true)}
              >
                View All Projects ({projects.length})
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden h-full flex flex-col">
        {/* Project Image */}
        <div className="relative aspect-video bg-slate-700/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
            <div className="text-6xl opacity-50">🖼️</div>
          </div>
          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-primary-500 rounded-full hover:bg-primary-600 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </div>
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="primary" size="sm">
                Featured
              </Badge>
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-slate-400 text-sm mb-4 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <Badge key={tech} variant="default" size="sm">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="default" size="sm">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
