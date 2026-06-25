'use client'

import { motion } from 'framer-motion'
import { Award as AwardIcon } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { AWARDS } from '@/lib/constants'

export function AwardsGrid() {
  return (
    <section className="section-padding-sm bg-surface-alt">
      <Container>
        <SectionHeading eyebrow="Recognition" title="Awards & Honours" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              className="card-hover relative overflow-hidden rounded-xl border border-gold-200/40 bg-card p-6 text-center bg-lotus-corner"
            >
              <AwardIcon className="mx-auto mb-3 h-8 w-8 text-gold-500" />
              <h3 className="font-display text-xl font-bold text-foreground leading-tight">
                {award.title}
              </h3>
              {'subtitle' in award && award.subtitle && (
                <p className="text-base text-muted-foreground mt-1.5 leading-normal">{award.subtitle}</p>
              )}
              <p className="mt-2 text-lg text-crimson font-semibold">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
