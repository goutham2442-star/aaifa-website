import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  dark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  dark = false,
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
        <span className={cn(
          'mb-3 inline-block text-sm font-bold uppercase tracking-[0.25em]',
          dark ? 'text-gold-400' : 'text-gold-600'
        )}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-wide leading-tight',
        dark ? 'text-white' : 'text-foreground'
      )}>
        {title}
      </h2>
      <div
        className={cn(
          'flex items-center gap-3 mt-4',
          align === 'center' ? 'justify-center' : 'justify-start'
        )}
      >
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-500/70" />
        <svg
          className="w-6 h-6 text-gold-500 animate-pulse"
          viewBox="0 0 100 100"
          fill="currentColor"
          style={{ animationDuration: '4s' }}
        >
          <path d="M50 20 C45 35 35 45 50 80 C65 45 55 35 50 20 Z" />
          <path d="M50 35 C35 45 25 55 40 80 C50 68 50 55 50 35 Z" opacity="0.8" />
          <path d="M50 35 C65 45 75 55 60 80 C50 68 50 55 50 35 Z" opacity="0.8" />
          <path d="M50 55 C25 60 15 70 30 80 C42 75 46 65 50 55 Z" opacity="0.6" />
          <path d="M50 55 C75 60 85 70 70 80 C58 75 54 65 50 55 Z" opacity="0.6" />
          <circle cx="50" cy="80" r="3" className="text-gold-600" />
        </svg>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-500/70" />
      </div>
      {subtitle && (
        <p className={cn(
          'mt-4 text-lg sm:text-xl leading-relaxed',
          dark ? 'text-white/70' : 'text-muted-foreground'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
