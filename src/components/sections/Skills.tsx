import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container, Badge } from '@/components/ui'
import { skills, skillCategories } from '@/data/skills'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-20 relative bg-slate-900/50" ref={ref}>
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Tech <span className="gradient-text">Arsenal</span>
            </h2>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Technologies and tools I use to build secure solutions
            </p>
          </div>

          {/* Skills Categories */}
          <div className="space-y-10">
            {/* Blockchain & Web3 */}
            <SkillCategory
              title="Blockchain & Web3"
              skills={skillCategories.blockchain}
              delay={0}
            />

            {/* Languages */}
            <SkillCategory
              title="Programming Languages"
              skills={skillCategories.languages}
              delay={0.1}
            />

            {/* Frontend */}
            <SkillCategory
              title="Frontend Development"
              skills={skillCategories.frontend}
              delay={0.2}
            />

            {/* Backend */}
            <SkillCategory
              title="Backend & Databases"
              skills={skillCategories.backend}
              delay={0.3}
            />

            {/* Security & Tools */}
            <SkillCategory
              title="Security & DevOps"
              skills={[...skillCategories.security, ...skillCategories.tools]}
              delay={0.4}
            />
          </div>

          {/* Infinite Scroll Skills (Visual Effect) */}
          <div className="mt-16 overflow-hidden">
            <div className="mb-4 text-center text-slate-500 text-sm font-medium">
              TECHNOLOGIES I WORK WITH
            </div>
            <InfiniteSkillsScroll />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function SkillCategory({ title, skills, delay }: { title: string; skills: any[]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-semibold text-white mb-5 flex items-center">
        <span className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + index * 0.05 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="group"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-3 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:scale-110 transition-transform p-2">
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-white font-medium text-xs truncate w-full">
                  {skill.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function InfiniteSkillsScroll() {
  const allSkills = [...skills, ...skills] // Duplicate for infinite scroll

  return (
    <div className="relative">
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-4 pr-4"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {allSkills.map((skill, index) => (
            <Badge
              key={`${skill.name}-${index}`}
              variant="default"
              className="whitespace-nowrap flex-shrink-0 text-base py-2 px-4 flex items-center gap-2"
            >
              <img 
                src={skill.icon} 
                alt={skill.name}
                className="w-5 h-5 object-contain"
              />
              {skill.name}
            </Badge>
          ))}
        </motion.div>
      </div>
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-900 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-900 to-transparent pointer-events-none" />
    </div>
  )
}
