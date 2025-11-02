import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full font-medium transition-colors'
    
    const variants = {
      primary: 'bg-primary-500/10 text-primary-400 border border-primary-500/30',
      secondary: 'bg-secondary-500/10 text-secondary-400 border border-secondary-500/30',
      success: 'bg-green-500/10 text-green-400 border border-green-500/30',
      warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
      default: 'bg-slate-700 text-slate-300 border border-slate-600'
    }
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
