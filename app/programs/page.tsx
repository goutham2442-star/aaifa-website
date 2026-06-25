import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { ProgramCard } from '@/components/programs/program-card'
import { PROGRAMS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Explore Bharatanatyam, Carnatic Music, Mridangam, Drawing & Painting, workshops and certification programs at AAIFA.',
}

export default function ProgramsPage() {
  return (
    <div className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="Explore"
          title="All Programs"
          subtitle="From classical dance and music to visual arts and certification — find the right path for your artistic journey."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((program, i) => (
            <ProgramCard key={program.slug} program={program} index={i} />
          ))}
        </div>
      </Container>
    </div>
  )
}
