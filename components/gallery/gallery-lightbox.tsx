'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { GALLERY_IMAGES } from '@/lib/constants'

type GalleryItem = (typeof GALLERY_IMAGES)[number]

interface LightboxProps {
  images: readonly GalleryItem[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryLightbox({ images, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = activeIndex !== null
  const image = activeIndex !== null ? images[activeIndex] : null

  const goPrev = () => {
    if (activeIndex === null) return
    onNavigate((activeIndex - 1 + images.length) % images.length)
  }
  const goNext = () => {
    if (activeIndex === null) return
    onNavigate((activeIndex + 1) % images.length)
  }

  if (!image) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-center text-sm text-white/80">{image.alt}</p>
      </DialogContent>
    </Dialog>
  )
}
