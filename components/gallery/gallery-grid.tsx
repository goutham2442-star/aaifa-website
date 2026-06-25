'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Expand } from 'lucide-react'
import { GalleryFilter } from './gallery-filter'
import { GalleryLightbox } from './gallery-lightbox'
import { GALLERY_IMAGES } from '@/lib/constants'
import type { GalleryCategory } from '@/lib/types'

export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === filter),
    [filter]
  )

  return (
    <>
      <GalleryFilter active={filter} onChange={setFilter} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((image, i) => (
          <motion.button
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
              <Expand className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          No images in this category yet.
        </p>
      )}

      <GalleryLightbox
        images={filtered}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  )
}
