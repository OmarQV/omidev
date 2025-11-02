import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container, Card } from '@/components/ui'
import { personalInfo, stats } from '@/data/personal'
import { Code, FolderGit2, Users, Award } from 'lucide-react'

const iconMap: Record<string, any> = {
  Code,
  FolderGit2,
  Users,
  Award
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <Container size="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Blockchain Developer & Ethical Hacker
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {stats.map((stat, index) => {
              const Icon = iconMap[stat.icon]
              return (
                <Card
                  key={index}
                  variant="gradient"
                  className="text-center p-5"
                >
                  <Icon className="w-7 h-7 mx-auto mb-2 text-primary-400" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400">
                    {stat.label}
                  </div>
                </Card>
              )
            })}
          </motion.div>

          {/* About Content */}
          <motion.div variants={itemVariants}>
            <Card variant="glass" className="p-6 md:p-10 max-w-4xl mx-auto">
              <div>
                {/* Text Content */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    🎯 Specialties
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <span className="text-2xl">🔗</span>
                      <div>
                        <strong className="text-primary-400 block mb-1">Blockchain Development</strong>
                        <span className="text-slate-400 text-sm">Smart Contracts, DeFi, Web3</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <span className="text-2xl">🛡️</span>
                      <div>
                        <strong className="text-primary-400 block mb-1">Cybersecurity</strong>
                        <span className="text-slate-400 text-sm">Penetration Testing, Vulnerability Assessment</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <span className="text-2xl">💻</span>
                      <div>
                        <strong className="text-primary-400 block mb-1">Full Stack Development</strong>
                        <span className="text-slate-400 text-sm">React, TypeScript, Node.js</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <span className="text-2xl">🌐</span>
                      <div>
                        <strong className="text-primary-400 block mb-1">Network Security</strong>
                        <span className="text-slate-400 text-sm">LAN/WAN Management, Security Protocols</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="text-primary-400">📍</span>
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span className="text-green-400">●</span>
                      <span>{personalInfo.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
