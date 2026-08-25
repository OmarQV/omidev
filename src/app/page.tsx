import { Footer } from '@/components/layout/Footer'
import { PillNav } from '@/components/layout/PillNav'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { InteractiveDots } from '@/components/webgl/InteractiveDots'
import { SectionDivider } from '@/components/ui/section-divider'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { ScrollToTop } from '@/components/ui/scroll-to-top'

/**
 * src/app/page.tsx — unified dashboard (Server Component).
 * InteractiveDots renders once, fixed behind every section.
 * SectionDividers create visual rhythm between major sections.
 * ScrollProgress + ScrollToTop provide navigation feedback.
 */
export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <InteractiveDots />
      <PillNav />
      <main>
        <Hero />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
