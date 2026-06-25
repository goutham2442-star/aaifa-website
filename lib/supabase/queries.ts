import { createClient } from './server'
import type {
  Program, GalleryImage, Testimonial,
  Award, GalleryCategory
} from '@/lib/types'
import {
  PROGRAMS as STATIC_PROGRAMS,
  GALLERY_IMAGES as STATIC_GALLERY,
  TESTIMONIALS as STATIC_TESTIMONIALS,
  AWARDS as STATIC_AWARDS,
  PROGRAM_LEVELS
} from '@/lib/constants'

// Helper to determine if credentials are configured
function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return (
    !!url &&
    !!key &&
    !url.includes('your-project-ref') &&
    !url.includes('placeholder') &&
    !key.includes('your-anon-key')
  )
}

// Fallback mappers to keep UI interfaces aligned and type-safe
function getFallbackPrograms(): Program[] {
  return STATIC_PROGRAMS.map((p, index) => ({
    id: p.slug,
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle || null,
    description: p.description,
    long_description: p.description, // fallback same as description
    min_age: p.minAge || null,
    duration: '1-3 Years',
    mode: p.mode,
    icon: p.icon || null,
    image_url: null,
    highlights: p.highlights ? [...p.highlights] : [],
    levels: PROGRAM_LEVELS.map((lvl) => ({
      name: lvl.name,
      duration: lvl.duration,
      focus: lvl.focus,
      points: [...lvl.points],
    })),
    is_featured: p.featured || false,
    sort_order: index + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}

function getFallbackGallery(category?: GalleryCategory): GalleryImage[] {
  const list = STATIC_GALLERY.map((img, index) => ({
    id: img.id,
    title: img.alt || null,
    description: null,
    url: img.url,
    storage_path: `external/${img.id}.jpeg`,
    category: img.category,
    alt_text: img.alt || null,
    is_featured: true,
    sort_order: index + 1,
    created_at: new Date().toISOString(),
  }))
  if (category) {
    return list.filter((img) => img.category === category)
  }
  return list
}

function getFallbackTestimonials(): Testimonial[] {
  return STATIC_TESTIMONIALS.map((t, index) => ({
    id: t.id,
    author_name: t.author,
    author_role: t.role || 'Parent of Student',
    content: t.content,
    rating: t.rating,
    program: t.program || null,
    avatar_url: null,
    is_featured: true,
    sort_order: index + 1,
    created_at: new Date().toISOString(),
  }))
}

function getFallbackAwards(): Award[] {
  return STATIC_AWARDS.map((a, index) => ({
    id: a.title.replace(/\s+/g, '-').toLowerCase(),
    title: a.title,
    year: a.year || null,
    description: ('subtitle' in a && a.subtitle) ? String(a.subtitle) : null,
    image_url: null,
    recipient: 'Guru Smt. Haripriya Pettem',
    sort_order: index + 1,
    created_at: new Date().toISOString(),
  }))
}

// ─── Programs ─────────────────────────────────────────────

export async function getAllPrograms(): Promise<Program[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackPrograms()
  }
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      console.warn('Supabase getAllPrograms failed, falling back to static data:', error.message)
      return getFallbackPrograms()
    }
    return (data ?? []) as Program[]
  } catch (err) {
    console.warn('Supabase getAllPrograms threw, falling back to static data:', err)
    return getFallbackPrograms()
  }
}

export async function getFeaturedPrograms(): Promise<Program[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackPrograms().filter((p) => p.is_featured).slice(0, 4)
  }
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(4)
    if (error) {
      console.warn('Supabase getFeaturedPrograms failed, falling back to static data:', error.message)
      return getFallbackPrograms().filter((p) => p.is_featured).slice(0, 4)
    }
    return (data ?? []) as Program[]
  } catch (err) {
    console.warn('Supabase getFeaturedPrograms threw, falling back to static data:', err)
    return getFallbackPrograms().filter((p) => p.is_featured).slice(0, 4)
  }
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  if (!isSupabaseConfigured()) {
    return getFallbackPrograms().find((p) => p.slug === slug) || null
  }
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) {
      console.warn(`Supabase getProgramBySlug for ${slug} failed, falling back to static data:`, error.message)
      return getFallbackPrograms().find((p) => p.slug === slug) || null
    }
    return data as Program
  } catch (err) {
    console.warn(`Supabase getProgramBySlug for ${slug} threw, falling back to static data:`, err)
    return getFallbackPrograms().find((p) => p.slug === slug) || null
  }
}

// ─── Gallery ──────────────────────────────────────────────

export async function getGalleryImages(category?: GalleryCategory): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackGallery(category)
  }
  try {
    const supabase = await createClient()
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true })
    if (category) query = query.eq('category', category)
    const { data, error } = await query
    if (error) {
      console.warn('Supabase getGalleryImages failed, falling back to static data:', error.message)
      return getFallbackGallery(category)
    }
    return (data ?? []) as GalleryImage[]
  } catch (err) {
    console.warn('Supabase getGalleryImages threw, falling back to static data:', err)
    return getFallbackGallery(category)
  }
}

export async function getFeaturedGalleryImages(limit = 6): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackGallery().slice(0, limit)
  }
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(limit)
    if (error) {
      console.warn('Supabase getFeaturedGalleryImages failed, falling back to static data:', error.message)
      return getFallbackGallery().slice(0, limit)
    }
    return (data ?? []) as GalleryImage[]
  } catch (err) {
    console.warn('Supabase getFeaturedGalleryImages threw, falling back to static data:', err)
    return getFallbackGallery().slice(0, limit)
  }
}

// ─── Testimonials ─────────────────────────────────────────

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackTestimonials()
  }
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
    if (error) {
      console.warn('Supabase getFeaturedTestimonials failed, falling back to static data:', error.message)
      return getFallbackTestimonials()
    }
    return (data ?? []) as Testimonial[]
  } catch (err) {
    console.warn('Supabase getFeaturedTestimonials threw, falling back to static data:', err)
    return getFallbackTestimonials()
  }
}

// ─── Awards ───────────────────────────────────────────────

export async function getAllAwards(): Promise<Award[]> {
  if (!isSupabaseConfigured()) {
    return getFallbackAwards()
  }
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('awards')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error) {
      console.warn('Supabase getAllAwards failed, falling back to static data:', error.message)
      return getFallbackAwards()
    }
    return (data ?? []) as Award[]
  } catch (err) {
    console.warn('Supabase getAllAwards threw, falling back to static data:', err)
    return getFallbackAwards()
  }
}
