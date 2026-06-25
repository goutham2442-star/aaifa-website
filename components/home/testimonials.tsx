'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const testimonial = TESTIMONIALS[index]

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length)
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section className="section-padding">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Parent & Student Voices"
          title="What Families Say"
        />

        <div className="relative rounded-2xl border border-border bg-card p-8 sm:p-10">
          <Quote className="mx-auto mb-4 h-8 w-8 text-gold-400" />

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="mb-4 flex justify-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="line-clamp-5 text-xl text-foreground/80 sm:text-2xl italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <p className="mt-6 font-display text-2xl font-bold text-foreground">
                {testimonial.author}
              </p>
              <p className="text-lg text-muted-foreground mt-1">
                {testimonial.role} · {testimonial.program}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-surface p-2 shadow-md hover:bg-crimson hover:text-white sm:-left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-surface p-2 shadow-md hover:bg-crimson hover:text-white sm:-right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === index ? 'bg-crimson' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
