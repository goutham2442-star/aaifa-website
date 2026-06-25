import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </span>
      )}
      <h2 className="text-display font-display font-semibold text-foreground">
        {title}
      </h2>
      <div
        className={cn(
          'divider-gold mt-4',
          align === 'center' && 'mx-auto'
        )}
      />
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
