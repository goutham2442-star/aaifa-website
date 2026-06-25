'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/container'
import { SITE_CONFIG, FOUNDER } from '@/lib/constants'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient bg-surface-dark py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 animate-float rounded-full bg-crimson/40 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 animate-float rounded-full bg-gold-500/30 blur-3xl" />
      </div>

      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-block rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold-300">
            Est. {SITE_CONFIG.founded} · Bengaluru
          </span>
          <h1 className="text-hero font-display font-semibold leading-tight">
            {SITE_CONFIG.tagline}
          </h1>
          <p className="mt-3 font-display text-xl text-gold-300 sm:text-2xl">
            {SITE_CONFIG.taglineSub}
          </p>
          <p className="mt-6 max-w-lg text-white/70">{SITE_CONFIG.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-crimson hover:bg-crimson-700 hover:shadow-lg"
            >
              <Link href="/contact">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-gold-400 text-gold-300 hover:bg-gold-500/10 hover:text-gold-200"
            >
              <Link href="/gallery">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Performances
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute -inset-2 rounded-3xl bg-gold-shimmer opacity-30 blur-xl" />
          <Image
            src={FOUNDER.photo}
            alt={FOUNDER.name}
            fill
            className="relative rounded-3xl border border-white/10 object-cover shadow-2xl"
            priority
          />
        </motion.div>
      </Container>
    </section>
  )
}
