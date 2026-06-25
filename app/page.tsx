import { Hero } from '@/components/home/hero'
import { StatsBar } from '@/components/home/stats-bar'
import { ProgramsPreview } from '@/components/home/programs-preview'
import { FounderIntro } from '@/components/home/founder-intro'
import { Testimonials } from '@/components/home/testimonials'
import { CtaBanner } from '@/components/home/cta-banner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ProgramsPreview />
      <FounderIntro />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
