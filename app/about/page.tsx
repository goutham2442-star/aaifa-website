import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { FounderBio } from '@/components/about/founder-bio'
import { GurusSection } from '@/components/about/gurus-section'
import { Timeline } from '@/components/about/timeline'
import { AwardsGrid } from '@/components/about/awards-grid'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Guru Smt. Haripriya Pettem, founder of Avighna Abhyasa Institute of Fine Arts, her gurus, journey, and awards.',
}

export default function AboutPage() {
  return (
    <>
      <div className="section-padding">
        <Container>
          <FounderBio />
        </Container>
      </div>
      <GurusSection />
      <Timeline />
      <AwardsGrid />
    </>
  )
}
