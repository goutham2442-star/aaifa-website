// ============================================================
// AAIFA — All TypeScript types
// ============================================================

export type ProgramMode = 'offline' | 'online' | 'hybrid'

export type GalleryCategory = 'performances' | 'events' | 'classes' | 'awards' | 'general'

export type InquiryType = 'general' | 'enrollment' | 'collaboration' | 'media'

export type InquiryStatus = 'new' | 'read' | 'replied' | 'archived'

export type EventType = 'performance' | 'workshop' | 'exam' | 'arangetram' | 'festival'

// ─── Database Types ────────────────────────────────────────

export interface Program {
  id:               string
  slug:             string
  title:            string
  subtitle:         string | null
  description:      string
  long_description: string | null
  min_age:          string | null
  duration:         string | null
  mode:             ProgramMode
  icon:             string | null
  image_url:        string | null
  highlights:       string[] | null
  levels:           ProgramLevel[] | null
  is_featured:      boolean
  sort_order:       number
  created_at:       string
  updated_at:       string
}

export interface ProgramLevel {
  name:     string
  duration: string
  focus:    string
  points:   string[]
}

export interface GalleryImage {
  id:           string
  title:        string | null
  description:  string | null
  url:          string
  storage_path: string
  category:     GalleryCategory
  alt_text:     string | null
  is_featured:  boolean
  sort_order:   number
  created_at:   string
}

export interface Testimonial {
  id:          string
  author_name: string
  author_role: string
  content:     string
  rating:      number
  program:     string | null
  avatar_url:  string | null
  is_featured: boolean
  sort_order:  number
  created_at:  string
}

export interface Inquiry {
  id:                string
  full_name:         string
  email:             string
  phone:             string | null
  subject:           string | null
  message:           string
  preferred_program: string | null
  inquiry_type:      InquiryType
  status:            InquiryStatus
  ip_address:        string | null
  created_at:        string
}

export interface Award {
  id:          string
  title:       string
  year:        number | null
  description: string | null
  image_url:   string | null
  recipient:   string
  sort_order:  number
  created_at:  string
}

export interface Event {
  id:           string
  title:        string
  description:  string | null
  event_date:   string
  event_time:   string | null
  location:     string | null
  image_url:    string | null
  type:         EventType
  is_published: boolean
  created_at:   string
}

export interface NewsletterSubscriber {
  id:             string
  email:          string
  name:           string | null
  is_active:      boolean
  source:         string
  subscribed_at:  string
}

// ─── Form Types ────────────────────────────────────────────

export interface ContactFormValues {
  full_name:    string
  email:        string
  phone?:       string
  subject?:     string
  message:      string
  inquiry_type: InquiryType
}

export interface InquiryFormValues {
  full_name:         string
  email:             string
  phone?:            string
  preferred_program: string
  message?:          string
}

export interface NewsletterFormValues {
  email: string
  name?: string
}

// ─── UI Helper Types ───────────────────────────────────────

export interface NavLink {
  label: string
  href:  string
}

export interface StatItem {
  value:    number
  suffix:   string
  label:    string
  sublabel: string
}

export interface TimelineItem {
  year:        string
  title:       string
  description: string
  type:        'performance' | 'career' | 'founding' | 'growth' | 'recognition'
}
