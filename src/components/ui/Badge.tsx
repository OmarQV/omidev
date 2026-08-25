import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * src/components/ui/badge.tsx — monochrome technical chip.
 * Geist Mono, uppercase tracking — floating labels & indicators.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-border bg-surface text-muted',
        inverted: 'border-transparent bg-foreground text-background',
        outline: 'border-border-strong bg-transparent text-foreground-soft',
        status: 'border-border bg-surface text-foreground-soft', // pair with a status dot
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
