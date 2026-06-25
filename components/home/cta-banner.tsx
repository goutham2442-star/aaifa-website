'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export function CtaBanner() {
  return (
    <section className="relative section-padding-sm overflow-hidden bg-black">
      {/* Aesthetic decorative ornaments */}
      <div className="absolute inset-0 bg-mandala-center opacity-[0.08] pointer-events-none z-0" />
      <div className="absolute left-0 top-0 bottom-0 w-[200px] opacity-[0.08] bg-floral-left pointer-events-none z-0" />
      <div className="absolute right-0 top-0 bottom-0 w-[200px] opacity-[0.08] bg-floral-right pointer-events-none z-0" />
      
      {/* Ambient glowing vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-crimson/20 via-transparent to-transparent z-0 pointer-events-none" />

      {/* Decorative top/bottom gold lines */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/60 to-transparent z-[1]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-between gap-8 text-center text-white sm:flex-row sm:text-left"
        >
          <div className="max-w-2xl">
            {/* Decorative eyebrow */}
            <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
              <div className="h-[1px] w-8 bg-gold-400/60" />
              <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em] text-gold-400">
                Begin Your Journey
              </span>
            </div>
            <h3 className="font-display text-5xl font-bold sm:text-6xl text-white leading-tight">
              Start Your Artistic Journey
              <span className="block text-shimmer-gold mt-2">with Avighna Abhyasa</span>
            </h3>
            <p className="mt-4 text-white/90 text-lg sm:text-xl leading-relaxed font-body">
              Limited seats available for the upcoming batch. Book a free trial class and discover your love for classical arts.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-4 min-w-max">
            <Button
              asChild
              size="lg"
              className="bg-crimson hover:bg-crimson-700 text-white font-semibold tracking-wider uppercase text-base py-8 px-12 rounded-full shadow-2xl hover:shadow-crimson-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href="/contact">
                Enroll Now <ArrowRight className="ml-2 h-4.5 w-4.5" />
              </Link>
            </Button>
            <a
              href={SITE_CONFIG.contact.phoneTel}
              className="flex items-center gap-2 text-lg text-gold-300/90 hover:text-gold-300 transition-colors duration-300 font-semibold mt-1"
            >
              <Phone className="h-4.5 w-4.5 text-gold-400" /> {SITE_CONFIG.contact.phone}
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
