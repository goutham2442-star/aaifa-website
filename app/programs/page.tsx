import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageBanner } from '@/components/shared/page-banner'
import { ProgramsListingClient } from '@/components/programs/programs-listing-client'

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Explore Bharatanatyam, Carnatic Music, Mridangam, Drawing & Painting, workshops and certification programs at Avighna Abhyasa Institute of Fine Arts.',
}

export default function ProgramsPage() {
  return (
    <>
      <PageBanner 
        title="Our Programs" 
        subtitle="From classical dance and vocal music to visual arts and university certifications — find your artistic path."
        page="programs"
      />
      <div className="section-padding bg-surface relative overflow-hidden min-h-screen bg-floral-left bg-floral-right">
        <Container>
          <ProgramsListingClient />
        </Container>
      </div>
    </>
  )
}
