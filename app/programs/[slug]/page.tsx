import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { PROGRAMS, PROGRAM_LEVELS, SITE_CONFIG } from '@/lib/constants'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const program = PROGRAMS.find((p) => p.slug === slug)
  if (!program) return {}
  return {
    title: program.title,
    description: program.description,
  }
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = params
  const program = PROGRAMS.find((p) => p.slug === slug)
  if (!program) notFound()

  const Icon = (Icons as any)[program.icon] ?? Icons.Sparkles

  return (
    <div className="section-padding">
      <Container className="max-w-4xl">
        <Link
          href="/programs"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-crimson"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Programs
        </Link>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${program.color}1A` }}
            >
              <Icon className="h-7 w-7" style={{ color: program.color }} />
            </div>
            <h1 className="text-display font-display font-semibold text-foreground">
              {program.title}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">{program.subtitle}</p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-crimson hover:bg-crimson-700">
            <Link href="/contact">Enquire About This Program</Link>
          </Button>
        </div>

        <p className="mt-6 text-base leading-relaxed text-foreground/80">
          {program.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-muted px-3 py-1">Age: {program.minAge}</span>
          <span className="rounded-full bg-muted px-3 py-1 capitalize">
            Mode: {program.mode}
          </span>
        </div>

        <div className="mt-8">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            What You'll Learn
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {program.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
            Curriculum by Level
          </h2>
          <Tabs defaultValue={PROGRAM_LEVELS[0].name}>
            <TabsList className="flex-wrap">
              {PROGRAM_LEVELS.map((level) => (
                <TabsTrigger key={level.name} value={level.name}>
                  {level.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {PROGRAM_LEVELS.map((level) => (
              <TabsContent key={level.name} value={level.name} className="mt-4">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{level.focus}</h3>
                    <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                      {level.duration}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    {level.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-12 rounded-2xl bg-surface-dark p-8 text-center text-white">
          <h3 className="font-display text-2xl font-semibold">
            Ready to start {program.title}?
          </h3>
          <p className="mt-2 text-white/70">
            Call us at {SITE_CONFIG.contact.phone} or send an enquiry below.
          </p>
          <Button asChild size="lg" className="mt-5 bg-gold-500 text-surface-dark hover:bg-gold-400">
            <Link href="/contact">Enroll Now</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}
