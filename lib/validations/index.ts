import { z } from 'zod'

// ─── Contact Form ─────────────────────────────────────────
export const contactSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-(). ]{7,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(2, 'Subject is too short')
    .max(200, 'Subject is too long')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
  inquiry_type: z
    .enum(['general', 'enrollment', 'collaboration', 'media'])
    .default('general'),
})

// ─── Enrollment Inquiry Form ─────────────────────────────
export const inquirySchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-(). ]{7,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  preferred_program: z
    .string()
    .min(1, 'Please select a program'),
  message: z
    .string()
    .max(500, 'Message is too long')
    .optional()
    .or(z.literal('')),
})

// ─── Newsletter Form ──────────────────────────────────────
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  name: z
    .string()
    .min(2, 'Name is too short')
    .max(100)
    .optional()
    .or(z.literal('')),
})

export type ContactFormData    = z.infer<typeof contactSchema>
export type InquiryFormData    = z.infer<typeof inquirySchema>
export type NewsletterFormData = z.infer<typeof newsletterSchema>
