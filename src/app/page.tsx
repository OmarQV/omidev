import { Footer } from '@/components/layout/Footer'
import { PillNav } from '@/components/layout/PillNav'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { InteractiveDots } from '@/components/webgl/InteractiveDots'

/**
 * src/app/page.tsx — unified dashboard (Server Component).
 * InteractiveDots renders once, fixed behind every section.
 */
export default function HomePage() {
  return (
    <>
      <InteractiveDots />
      <PillNav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
