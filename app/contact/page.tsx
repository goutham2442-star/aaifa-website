import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactMap } from '@/components/contact/contact-map'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Avighna Abhyasa Institute of Fine Arts to enroll or ask about Bharatanatyam, Carnatic Music, Mridangam and Drawing & Painting classes.',
}

export default function ContactPage() {
  return (
    <div className="section-padding">
      <Container>
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="Have a question about our programs or ready to enroll? Reach out — we'd love to hear from you."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                  <span>{SITE_CONFIG.address.full}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-crimson" />
                  <a href={SITE_CONFIG.contact.phoneTel} className="hover:text-crimson">
                    {SITE_CONFIG.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-crimson" />
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-crimson">
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-crimson" />
                  <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
                </li>
              </ul>
            </div>

            <ContactMap />
          </div>
        </div>
      </Container>
    </div>
  )
}
