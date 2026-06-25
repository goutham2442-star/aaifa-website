import { z } from 'zod'

export const contactSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  inquiry_type: z.string().default('general'),
})

export type ContactFormData = z.infer<typeof contactSchema>
