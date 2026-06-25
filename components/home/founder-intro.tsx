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
    <section className="section-padding bg-surface relative overflow-hidden bg-floral-right">
      {/* Additional matching left background ornament for enhanced symmetrical style */}
      <div className="absolute left-0 top-0 bottom-0 w-[200px] opacity-[0.05] bg-floral-left pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/65 p-8 shadow-2xl backdrop-blur-md md:p-12"
          >
            {/* Elegant traditional dancer background motif inside the card */}
            <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-[0.08] text-gold-600 mix-blend-multiply">
              <svg className="w-80 h-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M50 20 C48 15 45 10 40 10 C35 10 38 17 40 20 C42 23 45 25 45 30 C45 35 40 38 35 40 C30 42 25 45 28 50 C31 55 40 50 45 52 C50 54 53 60 51 68 C49 76 40 85 45 90 C50 95 60 90 62 82 C64 74 60 68 58 60 C56 52 65 48 70 42 C75 36 72 30 68 30 C64 30 60 35 55 35 C50 35 52 25 50 20 Z" />
                <circle cx="30" cy="75" r="8" />
                <path d="M30 67 L58 35 L62 38 L34 70" />
                <path d="M58 35 C61 30 68 30 71 33 C74 36 74 43 69 45" />
              </svg>
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="relative mx-auto aspect-square w-full max-w-[260px] lg:col-span-4 lg:max-w-none">
                <div className="absolute -inset-3 rounded-2xl bg-gold-shimmer opacity-20 blur-xl" />
                <Image
                  src={FOUNDER.photo}
                  alt={FOUNDER.name}
                  fill
                  className="relative rounded-2xl border border-white/80 object-cover shadow-lg"
                />
              </div>

              <div className="lg:col-span-8">
                <span className="mb-3 inline-block text-base font-semibold uppercase tracking-[0.25em] text-gold-600">
                  Meet Our Director
                </span>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight">
                  {FOUNDER.shortName}
                </h2>
                <p className="mt-1.5 text-lg font-semibold tracking-wide text-crimson uppercase">{FOUNDER.title}</p>
                <p className="text-base text-muted-foreground mt-1">{FOUNDER.qualifications}</p>

                <blockquote className="relative mt-6 rounded-2xl border border-gold-200/50 bg-gold-50/40 p-6 italic text-foreground/90 font-display text-xl md:text-2xl leading-relaxed">
                  <Quote className="absolute -left-3 -top-3 h-8 w-8 rotate-180 text-gold-300 opacity-60" />
                  &ldquo;{FOUNDER.quote}&rdquo;
                </blockquote>

                <p className="mt-6 text-lg leading-relaxed text-foreground/80 font-body">
                  {FOUNDER.bio}
                </p>

                <div className="mt-8">
                  <Button asChild className="bg-crimson hover:bg-crimson-700 text-white rounded-full px-10 py-7 text-base shadow-lg hover:shadow-crimson-500/10 transition-all duration-300">
                    <Link href="/about">
                      Read Full Biography <ArrowRight className="ml-2 h-4.5 w-4.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
