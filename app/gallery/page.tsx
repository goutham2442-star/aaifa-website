import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { GalleryGrid } from '@/components/gallery/gallery-grid'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse photos of Bharatanatyam performances, cultural events, and classes at Avighna Abhyasa Institute of Fine Arts.',
}

export default function GalleryPage() {
  return (
    <div className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="Moments Captured"
          title="Our Gallery"
          subtitle="A glimpse into performances, festivals, and everyday training at AAIFA."
        />
        <GalleryGrid />
      </Container>
    </div>
  )
}
