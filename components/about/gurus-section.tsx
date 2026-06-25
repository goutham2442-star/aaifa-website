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
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                {guru.name}
              </h3>
              <p className="mt-1 text-sm text-crimson">{guru.art}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
