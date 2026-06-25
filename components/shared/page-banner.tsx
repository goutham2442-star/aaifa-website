'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SITE_CONFIG } from '@/lib/constants'

// Page-specific background images for banners
const BANNER_IMAGES: Record<string, string> = {
  about:    'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.41.30-1.jpeg',
  programs: 'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.42.jpeg',
  gallery:  'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.40.41.jpeg',
  contact:  'https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.01-2.jpeg',
}

interface PageBannerProps {
  title: string
  subtitle?: string
  page?: keyof typeof BANNER_IMAGES
}

export function PageBanner({ title, subtitle, page }: PageBannerProps) {
  const bgImage = page ? BANNER_IMAGES[page] : undefined

  return (
    <section className="relative overflow-hidden py-24 md:py-32 text-white text-center">
      {/* Real photo background if available */}
      {bgImage ? (
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="relative h-full w-full"
          >
            <img
              src={bgImage}
              alt={title}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          {/* Rich dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/80" />
          {/* Warm crimson tint at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-crimson/20 to-transparent" />
        </div>
      ) : (
        /* Fallback gradient background */
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />
      )}

      {/* Floating large logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: bgImage ? 0.08 : 0.12 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] mix-blend-screen"
        >
          <Image
            src={SITE_CONFIG.logos.primary}
            alt="Avighna Abhyasa Motif"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Rotating mandala layer */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.06] bg-mandala-center pointer-events-none z-[1] animate-spin"
        style={{ animationDuration: '90s' }}
      />

      {/* Top/bottom gold border lines */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent z-[2]" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/50 to-transparent z-[2]" />

      {/* Inner decorative border */}
      <div className="absolute inset-3 border border-gold-500/10 pointer-events-none z-[2] rounded-2xl hidden md:block" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {/* Sanskrit/decorative eyebrow ornament */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-xs uppercase font-bold tracking-[0.3em] text-gold-400">
              Avighna Abhyasa Institute of Fine Arts
            </span>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-wide text-shimmer-gold">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-base md:text-lg font-body italic text-gold-100/75 max-w-xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Bottom lotus divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400/60" />
            <svg viewBox="0 0 40 24" className="h-5 w-10 text-gold-400" fill="currentColor" opacity="0.7">
              <path d="M20,12 C20,6 14,0 20,0 C26,0 20,6 20,12 Z" />
              <path d="M20,12 C26,12 32,6 32,12 C32,18 26,12 20,12 Z" />
              <path d="M20,12 C20,18 26,24 20,24 C14,24 20,18 20,12 Z" />
              <path d="M20,12 C14,12 8,18 8,12 C8,6 14,12 20,12 Z" />
              <circle cx="20" cy="12" r="3" />
            </svg>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
