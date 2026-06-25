'use client'

import Link from 'next/link'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import type { PROGRAMS } from '@/lib/constants'

type ProgramItem = (typeof PROGRAMS)[number]

export function ProgramCard({ program, index }: { program: ProgramItem; index: number }) {
  const Icon = (Icons as any)[program.icon] ?? Icons.Sparkles

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <Link
        href={`/programs/${program.slug}`}
        className="card-hover group flex h-full flex-col rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${program.color}1A` }}
          >
            <Icon className="h-6 w-6" style={{ color: program.color }} />
          </div>
          <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Users className="h-3 w-3" /> {program.minAge}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-foreground">
          {program.title}
        </h3>
        <p className="text-sm text-muted-foreground">{program.subtitle}</p>
        <p className="mt-3 flex-1 text-sm text-foreground/70">{program.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {program.highlights.slice(0, 3).map((h) => (
            <li
              key={h}
              className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground"
            >
              {h}
            </li>
          ))}
        </ul>

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-crimson group-hover:gap-2">
          View Details <ArrowRight className="h-4 w-4 transition-all" />
        </span>
      </Link>
    </motion.div>
  )
}
