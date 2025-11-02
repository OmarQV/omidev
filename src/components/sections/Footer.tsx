import { Heart } from 'lucide-react'
import { Container } from '@/components/ui'
import { personalInfo } from '@/data/personal'

export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-800 bg-slate-900/50">
      <Container size="lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by{' '}
            <span className="text-white font-medium">{personalInfo.name}</span>
          </div>
          
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </Container>
    </footer>
  )
}
