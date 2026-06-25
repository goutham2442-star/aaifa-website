'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'
import { GoldParticles } from '@/components/home/gold-particles'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black text-white px-4 md:px-6">
      {/* Ambient Gold Particle Dust */}
      <GoldParticles />

      {/* Background Image with Zoom effect */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="relative h-full w-full"
        >
          <img
            src="https://avighnaabhyasainstitute.in/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-22-at-13.38.27.jpeg"
            alt="Avighna Abhyasa Fine Arts Background"
            className="h-full w-full object-cover object-top"
          />
        </motion.div>
        {/* Elegant overlay: Dark gradient that is lighter in the center to show the photo clearly, fading to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
        
        {/* Subtle decorative gold-lined border around the hero */}
        <div className="absolute inset-4 border border-gold-500/20 pointer-events-none z-10 rounded-2xl hidden md:block" />
        <div className="absolute inset-5 border border-gold-500/10 pointer-events-none z-10 rounded-2xl hidden md:block" />
      </div>

      {/* Symmetrical Left/Right Traditional gold vine columns to fill the empty margins */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[250px] h-[75%] opacity-[0.08] bg-floral-left pointer-events-none hidden xl:block z-[2]" />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[250px] h-[75%] opacity-[0.08] bg-floral-right pointer-events-none hidden xl:block z-[2]" />

      {/* Floating Traditional Mandala backdrop */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] opacity-10 bg-mandala-center pointer-events-none z-0 mix-blend-screen animate-spin" 
        style={{ animationDuration: '80s' }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-300 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-gold-400" />
            Nurturing Classical Traditions
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight tracking-wide text-white mt-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Welcome to <span className="block mt-2 text-shimmer-gold font-bold">Avighna Abhyasa</span> Institute of Fine Arts
          </h1>
          
          <p className="mt-6 text-base md:text-xl max-w-3xl mx-auto font-display italic text-gold-200/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            &ldquo;{SITE_CONFIG.taglineSub || 'Where devotion, discipline, and creativity come alive through dance and music'}&rdquo;
          </p>
          
          <p className="mt-4 text-sm md:text-base max-w-3xl mx-auto text-white/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-body">
            A premium sanctuary for Bharatanatyam, Carnatic Music, Mridangam, and visual fine arts. Let the divine journey begin.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-crimson hover:bg-crimson-700 text-white font-semibold tracking-wider uppercase text-sm py-5 px-9 rounded-full shadow-2xl hover:shadow-crimson-500/30 transition-all duration-300 transform hover:-translate-y-1 border border-crimson-600"
            >
              <Link href="/programs">
                Explore Programs <ArrowRight className="ml-2.5 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:text-gold-200 font-semibold tracking-wider uppercase text-sm py-5 px-9 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <Link href="/gallery">
                View Portfolio
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Traditional footer border curve decoration (Fades to black to merge with StatsBar) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
    </section>
  )
}
