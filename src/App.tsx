import { Navbar } from './components/ui'
import { Hero, About, Skills, Projects, Contact, Footer } from './components/sections'
import BlockchainBackground from './components/three/BlockchainBackground'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      {/* Global 3D Background - Fixed to viewport */}
      <BlockchainBackground fixed />
      
      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
