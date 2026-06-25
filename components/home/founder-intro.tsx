'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Quote, ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import { FOUNDER } from '@/lib/constants'

export function FounderIntro() {
  return (
    <section className="section-padding bg-surface-alt">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto aspect-square w-full max-w-sm"
        >
          <div className="absolute -inset-3 rounded-full bg-gold-shimmer opacity-20 blur-2xl" />
          <Image
            src={FOUNDER.photo}
            alt={FOUNDER.name}
            fill
            className="relative rounded-full border-4 border-white object-cover shadow-xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            Meet Our Founder
          </span>
          <h2 className="text-display font-display font-semibold text-foreground">
            {FOUNDER.shortName}
          </h2>
          <p className="mt-1 text-sm font-medium text-crimson">{FOUNDER.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{FOUNDER.qualifications}</p>

          <blockquote className="relative mt-6 rounded-lg border-l-4 border-gold-500 bg-card p-4 italic text-foreground/80">
            <Quote className="absolute -left-3 -top-3 h-6 w-6 rotate-180 text-gold-400" />
            {FOUNDER.quote}
          </blockquote>

          <p className="mt-6 line-clamp-4 text-sm leading-relaxed text-foreground/70">
            {FOUNDER.bio}
          </p>

          <Button asChild className="mt-6 bg-crimson hover:bg-crimson-700">
            <Link href="/about">
              Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
