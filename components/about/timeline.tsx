'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { TIMELINE } from '@/lib/constants'
import { cn } from '@/lib/utils'

const TYPE_COLOR: Record<string, string> = {
  performance: 'bg-crimson',
  career: 'bg-gold-500',
  founding: 'bg-crimson',
  growth: 'bg-gold-500',
  recognition: 'bg-crimson',
}

export function Timeline() {
  return (
    <section className="section-padding">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Our Journey" title="Milestones" />

        <div className="relative space-y-10 border-l border-border pl-8">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <span
                className={cn(
                  'absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 border-surface',
                  TYPE_COLOR[item.type]
                )}
              />
              <span className="text-base font-semibold text-gold-600">{item.year}</span>
              <h3 className="mt-1.5 font-display text-2xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-base text-foreground/75 leading-relaxed font-body">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
