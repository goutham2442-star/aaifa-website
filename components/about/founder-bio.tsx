import Image from 'next/image'
import { Quote } from 'lucide-react'
import { FOUNDER } from '@/lib/constants'

export function FounderBio() {
  return (
    <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
        <div className="absolute -inset-2 rounded-2xl bg-gold-shimmer opacity-20 blur-xl" />
        <Image
          src={FOUNDER.photo}
          alt={FOUNDER.name}
          fill
          className="relative rounded-2xl border-4 border-white object-cover shadow-xl"
        />
      </div>

      <div>
        <span className="mb-2 inline-block text-sm font-bold uppercase tracking-[0.25em] text-gold-600">
          Founder & Director
        </span>
        <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight">
          {FOUNDER.name}
        </h2>
        <p className="mt-1.5 text-lg font-semibold text-crimson uppercase tracking-wide">{FOUNDER.title}</p>
        <p className="mt-1 text-base text-muted-foreground">{FOUNDER.qualifications}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-base font-semibold">
          <span className="rounded-full bg-muted/80 border border-border px-4 py-1.5">
            {FOUNDER.teachingExp} Teaching Experience
          </span>
          <span className="rounded-full bg-muted/80 border border-border px-4 py-1.5">
            {FOUNDER.learningExp} Learning Experience
          </span>
        </div>

        <blockquote className="relative my-6 rounded-lg border-l-4 border-gold-500 bg-card p-5 italic text-foreground/90 text-lg md:text-xl leading-relaxed">
          <Quote className="absolute -left-3 -top-3 h-6 w-6 rotate-180 text-gold-400" />
          {FOUNDER.quote}
        </blockquote>

        <p className="text-lg leading-relaxed text-foreground/80 font-body">{FOUNDER.bio}</p>
      </div>
    </section>
  )
}
