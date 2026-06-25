'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { PROGRAMS } from '@/lib/constants'

export function ProgramsPreview() {
  const featured = PROGRAMS.filter((p) => p.featured)

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="What We Teach"
          title="Our Programs"
          subtitle="Structured, guru-led training across four classical and visual art forms — for every age and skill level."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((program, i) => {
            const Icon = (Icons as any)[program.icon] ?? Icons.Sparkles
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="card-hover group block h-full rounded-xl border border-border bg-card p-6"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${program.color}1A` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: program.color }} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {program.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{program.subtitle}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-foreground/70">
                    {program.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-crimson group-hover:gap-2">
                    Learn more <ArrowRight className="h-4 w-4 transition-all" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" className="border-crimson text-crimson hover:bg-crimson/5">
            <Link href="/programs">View All Programs</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
