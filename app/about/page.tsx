import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageBanner } from '@/components/shared/page-banner'
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
      <PageBanner 
        title="About Us" 
        subtitle="Our journey, lineage, milestones and recognition in classical fine arts."
        page="about"
      />
      <div className="section-padding bg-surface relative overflow-hidden bg-floral-right">
        <Container>
          <FounderBio />
        </Container>
      </div>
      <div className="bg-surface-alt relative overflow-hidden bg-floral-left">
        <GurusSection />
      </div>
      <div className="bg-surface relative overflow-hidden bg-floral-right">
        <Timeline />
      </div>
      <div className="bg-surface-alt relative overflow-hidden">
        <AwardsGrid />
      </div>
    </>
  )
}
