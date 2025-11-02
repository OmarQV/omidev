import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import { Container, Card, Button } from '@/components/ui'
import { personalInfo, socialLinks } from '@/data/personal'

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Twitter,
  Mail
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('Message sent! (This is a demo)')
    setFormState({ name: '', email: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 relative bg-slate-900/50" ref={ref}>
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Available for Blockchain Development, Security Audits & Technical Consulting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Let's Talk
                  </h3>
                  <p className="text-slate-400 mb-6">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  </p>
                </div>

                {/* Contact Details */}
                <Card variant="glass" className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary-500/10 rounded-lg">
                        <Mail className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Email</div>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="text-white hover:text-primary-400 transition-colors"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary-500/10 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-400 mb-1">Location</div>
                        <div className="text-white">{personalInfo.location}</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Social Links */}
                <div>
                  <div className="text-sm text-slate-400 mb-4">Connect with me</div>
                  <div className="flex gap-3">
                    {socialLinks.map((link) => {
                      const Icon = iconMap[link.icon]
                      return (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-primary-500 hover:bg-slate-800 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="w-5 h-5 text-slate-400 hover:text-primary-400" />
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card variant="gradient" className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    {!isSubmitting && <Send className="mr-2 w-5 h-5" />}
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
