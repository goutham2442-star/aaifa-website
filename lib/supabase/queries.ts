import { createClient } from './server'
import type {
  Program, GalleryImage, Testimonial,
  Award, GalleryCategory
} from '@/lib/types'

// ─── Programs ─────────────────────────────────────────────

export async function getAllPrograms(): Promise<Program[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw new Error(`Programs fetch failed: ${error.message}`)
  return (data ?? []) as Program[]
}

export async function getFeaturedPrograms(): Promise<Program[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(4)
  if (error) throw new Error(`Featured programs fetch failed: ${error.message}`)
  return (data ?? []) as Program[]
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as Program
}

// ─── Gallery ──────────────────────────────────────────────

export async function getGalleryImages(category?: GalleryCategory): Promise<GalleryImage[]> {
  const supabase = await createClient()
  let query = supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true })
  if (category) query = query.eq('category', category)
  const { data, error } = await query
  if (error) throw new Error(`Gallery fetch failed: ${error.message}`)
  return (data ?? []) as GalleryImage[]
}

export async function getFeaturedGalleryImages(limit = 6): Promise<GalleryImage[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)
  if (error) throw new Error(`Featured gallery fetch failed: ${error.message}`)
  return (data ?? []) as GalleryImage[]
}

// ─── Testimonials ─────────────────────────────────────────

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
  if (error) throw new Error(`Testimonials fetch failed: ${error.message}`)
  return (data ?? []) as Testimonial[]
}

// ─── Awards ───────────────────────────────────────────────

export async function getAllAwards(): Promise<Award[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('awards')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw new Error(`Awards fetch failed: ${error.message}`)
  return (data ?? []) as Award[]
}
