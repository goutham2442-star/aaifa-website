import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section className="section-padding-sm bg-crimson-fade">
      <Container className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-surface-dark p-10 text-center text-white sm:flex-row sm:text-left">
        <div>
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">
            Begin Your Artistic Journey Today
          </h3>
          <p className="mt-2 text-white/70">
            Limited seats available for the next batch — book a free trial class.
          </p>
        </div>
        <Button asChild size="lg" className="bg-gold-500 text-surface-dark hover:bg-gold-400">
          <Link href="/contact">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Container>
    </section>
  )
}
