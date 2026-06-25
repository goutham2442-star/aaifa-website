import Image from 'next/image'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'primary' | 'footer'
  className?: string
}

export function Logo({ variant = 'primary', className }: LogoProps) {
  const src = variant === 'footer' ? SITE_CONFIG.logos.footer : SITE_CONFIG.logos.primary

  return (
    <Link href="/" className={cn('flex items-center gap-3', className)}>
      <Image
        src={src}
        alt={SITE_CONFIG.shortName}
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        priority
      />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-xl font-bold text-crimson tracking-wide">
          {SITE_CONFIG.shortName}
        </span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Fine Arts Institute
        </span>
      </span>
    </Link>
  )
}
