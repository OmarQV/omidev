import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-xl p-6 transition-all duration-300'
    
    const variants = {
      default: 'bg-slate-800/50 border border-slate-700 backdrop-blur-sm',
      glass: 'glass-effect',
      gradient: 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-md'
    }
    
    const hoverStyles = hover ? 'hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/50' : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
