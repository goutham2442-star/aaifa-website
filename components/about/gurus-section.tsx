import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { FOUNDER } from '@/lib/constants'

export function GurusSection() {
  return (
    <section className="section-padding-sm bg-surface-alt">
      <Container>
        <SectionHeading eyebrow="Lineage" title="Gurus & Mentors" />
        <div className="grid gap-6 sm:grid-cols-3">
          {FOUNDER.gurus.map((guru) => (
            <div
              key={guru.name}
              className="relative overflow-hidden rounded-xl border border-gold-200/40 bg-card p-8 text-center bg-lotus-corner shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-display text-2xl font-bold text-foreground">
                {guru.name}
              </h3>
              <p className="mt-2 text-lg text-crimson font-medium">{guru.art}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
