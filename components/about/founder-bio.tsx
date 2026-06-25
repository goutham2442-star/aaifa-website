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
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
          Founder & Director
        </span>
        <h1 className="text-display font-display font-semibold text-foreground">
          {FOUNDER.name}
        </h1>
        <p className="mt-1 text-sm font-medium text-crimson">{FOUNDER.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{FOUNDER.qualifications}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="rounded-full bg-muted px-3 py-1">
            {FOUNDER.teachingExp} Teaching Experience
          </span>
          <span className="rounded-full bg-muted px-3 py-1">
            {FOUNDER.learningExp} Learning Experience
          </span>
        </div>

        <blockquote className="relative my-6 rounded-lg border-l-4 border-gold-500 bg-card p-4 italic text-foreground/80">
          <Quote className="absolute -left-3 -top-3 h-6 w-6 rotate-180 text-gold-400" />
          {FOUNDER.quote}
        </blockquote>

        <p className="text-base leading-relaxed text-foreground/80">{FOUNDER.bio}</p>
      </div>
    </section>
  )
}
