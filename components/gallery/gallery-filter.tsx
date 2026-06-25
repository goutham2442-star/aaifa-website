'use client'

import { cn } from '@/lib/utils'
import type { GalleryCategory } from '@/lib/types'

const FILTERS: { label: string; value: GalleryCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Performances', value: 'performances' },
  { label: 'Events', value: 'events' },
  { label: 'Classes', value: 'classes' },
]

export function GalleryFilter({
  active,
  onChange,
}: {
  active: GalleryCategory | 'all'
  onChange: (value: GalleryCategory | 'all') => void
}) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            active === filter.value
              ? 'bg-crimson text-white'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
