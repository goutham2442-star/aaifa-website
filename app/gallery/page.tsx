import type { Metadata } from 'next'
import { Container } from '@/components/shared/container'
import { PageBanner } from '@/components/shared/page-banner'
import { GalleryGrid } from '@/components/gallery/gallery-grid'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse photos of Bharatanatyam performances, cultural events, and classes at Avighna Abhyasa Institute of Fine Arts.',
}

export default function GalleryPage() {
  return (
    <>
      <PageBanner 
        title="Our Gallery" 
        subtitle="A glimpse into performances, festivals, celebrations, and everyday training at the institute."
        page="gallery"
      />
      <div className="section-padding bg-surface relative overflow-hidden bg-floral-left bg-floral-right">
        <Container>
          <GalleryGrid />
        </Container>
      </div>
    </>
  )
}
