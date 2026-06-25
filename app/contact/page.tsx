import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/shared/section-heading'
import { PageBanner } from '@/components/shared/page-banner'
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
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Reach out to enroll, ask questions, or schedule a visit. We’d love to hear from you."
        page="contact"
      />
      <div className="section-padding bg-surface relative overflow-hidden min-h-screen bg-floral-left bg-floral-right">
      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="Have a question about our programs or ready to enroll? Reach out — we'd love to hear from you."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-white/50 bg-white/60 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/50 bg-white/60 p-6 shadow-2xl backdrop-blur-md">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span>{SITE_CONFIG.address.full}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-gold-500" />
                  <a href={SITE_CONFIG.contact.phoneTel} className="hover:text-crimson transition-colors duration-300">
                    {SITE_CONFIG.contact.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-gold-500" />
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-crimson transition-colors duration-300">
                    {SITE_CONFIG.contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
                </li>
              </ul>
            </div>

            <ContactMap />
          </div>
        </div>
      </Container>
      </div>
    </>
  )
}
