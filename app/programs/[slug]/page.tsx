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
    <div className="section-padding bg-surface relative overflow-hidden min-h-screen bg-floral-left bg-floral-right">
      <Container className="relative z-10 max-w-4xl">
        <Link
          href="/programs"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-crimson transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Programs
        </Link>

        <div className="rounded-3xl border border-white/50 bg-white/60 p-6 md:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border"
                style={{ backgroundColor: `${program.color}15`, borderColor: `${program.color}30` }}
              >
                <Icon className="h-7 w-7" style={{ color: program.color }} />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {program.title}
              </h1>
              <p className="mt-1 text-base text-gold-600/90 font-medium tracking-wide uppercase">{program.subtitle}</p>
            </div>
            <Button asChild size="lg" className="shrink-0 bg-crimson hover:bg-crimson-700 text-white rounded-full px-6 shadow-lg hover:shadow-crimson-500/10">
              <Link href="/contact">Enquire About Program</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/80">
            {program.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="rounded-full bg-surface-alt px-3.5 py-1.5 border border-gold-200/20">Age: {program.minAge}</span>
            <span className="rounded-full bg-surface-alt px-3.5 py-1.5 border border-gold-200/20">
              Mode: {program.mode}
            </span>
          </div>

          <div className="mt-8 pt-8 border-t border-border/40">
            <h2 className="font-display text-2xl font-bold text-foreground">
              What You'll Learn
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {program.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 pt-8 border-t border-border/40">
            <h2 className="mb-4 font-display text-2xl font-bold text-foreground">
              Curriculum by Level
            </h2>
            <Tabs defaultValue={PROGRAM_LEVELS[0].name}>
              <TabsList className="flex-wrap bg-surface border border-gold-200/20 p-1.5 rounded-xl h-auto">
                {PROGRAM_LEVELS.map((level) => (
                  <TabsTrigger key={level.name} value={level.name} className="rounded-lg text-xs font-bold uppercase tracking-wider px-4 py-2">
                    {level.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {PROGRAM_LEVELS.map((level) => (
                <TabsContent key={level.name} value={level.name} className="mt-4">
                  <div className="rounded-2xl border border-gold-100 bg-surface/50 p-6">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-gold-600">{level.focus}</h3>
                      <span className="rounded-full bg-crimson/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-crimson">
                        {level.duration}
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      {level.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-br from-surface-dark to-black p-8 text-center text-white border border-gold-500/20 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-32 h-32 opacity-5 text-gold-500 bg-mandala-center pointer-events-none" />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-shimmer-gold">
              Ready to start {program.title}?
            </h3>
            <p className="mt-2 text-sm text-white/70 max-w-md mx-auto">
              Call us at {SITE_CONFIG.contact.phone} or send an enquiry below to register.
            </p>
            <Button asChild size="lg" className="mt-6 bg-gold-500 text-surface-dark hover:bg-gold-400 rounded-full font-bold uppercase tracking-wider text-xs px-8 py-5">
              <Link href="/contact">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
