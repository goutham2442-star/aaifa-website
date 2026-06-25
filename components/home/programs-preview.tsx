'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight, Star } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { PROGRAMS } from '@/lib/constants'

const PROGRAM_BACKGROUNDS: Record<string, string> = {
  'bharatanatyam':   '/programs/bharatanatyam.jpg',
  'carnatic-music':  '/programs/carnatic-music.jpg',
  'mridangam':       '/programs/mridangam.jpg',
  'drawing-painting':'/programs/drawing-painting.jpg',
}

export function ProgramsPreview() {
  const featured = PROGRAMS.filter((p) => p.featured)

  return (
    <section className="section-padding relative bg-neutral-950 overflow-hidden">
      {/* Top decorative border */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      {/* Bottom decorative border */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      {/* Large faint mandala backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.04] bg-mandala-center pointer-events-none animate-spin"
        style={{ animationDuration: '120s' }}
      />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="What We Teach"
          title="Our Programs"
          subtitle="Structured, guru-led training across four classical and visual art forms — for every age and skill level."
          dark
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
          {featured.map((program, i) => {
            const Icon = (Icons as any)[program.icon] ?? Icons.Sparkles
            const bgImage = PROGRAM_BACKGROUNDS[program.slug] ?? PROGRAM_BACKGROUNDS['bharatanatyam']
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, type: 'spring', stiffness: 70 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="relative flex flex-col rounded-2xl overflow-hidden shadow-xl border border-white/10 min-h-[340px] group-hover:border-gold-400/40 transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={bgImage}
                      alt={program.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                      style={{ backgroundColor: program.color }}
                    />
                  </div>

                  {/* Icon top */}
                  <div className="relative z-10 p-5">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm"
                      style={{ backgroundColor: `${program.color}30`, borderColor: `${program.color}50` }}
                    >
                      <Icon className="h-5 w-5 text-gold-300" />
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div className="relative z-10 mt-auto p-5">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold-200 transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-xs font-bold text-gold-400/80 tracking-widest uppercase mt-0.5">
                      {program.subtitle}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/80 line-clamp-2">
                      {program.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5">
                      <span className="text-sm font-bold uppercase tracking-wider text-gold-300 flex items-center gap-1 group-hover:text-white transition-colors duration-300">
                        Explore <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            className="border border-gold-400/40 text-gold-300 hover:bg-gold-500/10 hover:text-gold-200 font-semibold tracking-wider uppercase text-sm py-6 px-10 rounded-full transition-all duration-300 bg-transparent backdrop-blur-sm"
          >
            <Link href="/programs">
              View All Programs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
