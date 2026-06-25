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
              className="card-hover rounded-xl border border-border bg-card p-5 text-center"
            >
              <AwardIcon className="mx-auto mb-3 h-8 w-8 text-gold-500" />
              <h3 className="font-display text-base font-semibold text-foreground">
                {award.title}
              </h3>
              {'subtitle' in award && award.subtitle && (
                <p className="text-xs text-muted-foreground">{award.subtitle}</p>
              )}
              <p className="mt-1 text-sm text-crimson">{award.year}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
