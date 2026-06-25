import type { MetadataRoute } from 'next'
import { SITE_CONFIG, PROGRAMS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/programs', '/gallery', '/contact'].map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const programRoutes = PROGRAMS.map((program) => ({
    url: `${SITE_CONFIG.url}/programs/${program.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...programRoutes]
}
