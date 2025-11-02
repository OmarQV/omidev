import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter, Download } from 'lucide-react'
import { Button, Container } from '@/components/ui'
import { personalInfo, socialLinks } from '@/data/personal'

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Twitter,
  Mail
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/50" />
      
      <Container size="lg" className="relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            >
              Hi! I'm{' '}
              <span className="gradient-text">{personalInfo.firstName}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl text-primary-400 font-medium mb-2"
            >
              ≥ {personalInfo.role}
            </motion.p>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-400 text-base mb-6"
            >
              in {personalInfo.location}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              {socialLinks.map((link, index) => {
                const Icon = iconMap[link.icon]
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-400 hover:text-white hover:border-primary-500 hover:bg-slate-800 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
              >
                <Mail className="mr-2 w-5 h-5" />
                Email
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(personalInfo.resume, '_blank')}
              >
                <Download className="mr-2 w-5 h-5" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Circular Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end order-first lg:order-last mb-8 lg:mb-0"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              {/* Rotating Border Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'conic-gradient(from 0deg, #3b82f6, #a855f7, #3b82f6)',
                  padding: '3px'
                }}
              >
                <div className="w-full h-full rounded-full bg-slate-900/50 backdrop-blur-sm" />
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-full blur-2xl" />
              
              {/* Image Container */}
              <div className="absolute inset-1.5 rounded-full overflow-hidden border-2 border-slate-800/50 shadow-2xl">
                <img 
                  src="/img/1708704123178.jpeg" 
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
