import Link from 'next/link'
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { Container } from '@/components/shared/container'
import { SITE_CONFIG, NAV_LINKS, PROGRAMS } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface-dark text-white/90">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="footer" className="mb-5" />
          <p className="text-base leading-relaxed text-white/70">
            {SITE_CONFIG.description}
          </p>
          <div className="mt-6 flex gap-3.5">
            <a
              href={SITE_CONFIG.social.facebook}
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2.5 hover:bg-crimson transition-colors"
            >
              <Facebook className="h-4.5 w-4.5" />
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2.5 hover:bg-crimson transition-colors"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              aria-label="YouTube"
              className="rounded-full bg-white/10 p-2.5 hover:bg-crimson transition-colors"
            >
              <Youtube className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-5 font-display text-xl font-bold text-gold-300">Quick Links</h4>
          <ul className="space-y-3 text-base">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-xl font-bold text-gold-300">Programs</h4>
          <ul className="space-y-3 text-base">
            {PROGRAMS.filter((p) => p.featured).map((program) => (
              <li key={program.slug}>
                <Link href={`/programs/${program.slug}`} className="hover:text-gold-300 transition-colors">
                  {program.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 font-display text-xl font-bold text-gold-300">Contact Us</h4>
          <ul className="space-y-4 text-base">
            <li className="flex gap-2.5">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-400" />
              <span>{SITE_CONFIG.address.full}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="h-5 w-5 shrink-0 text-gold-400" />
              <a href={SITE_CONFIG.contact.phoneTel} className="hover:text-gold-300 transition-colors">{SITE_CONFIG.contact.phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="h-5 w-5 shrink-0 text-gold-400" />
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-gold-300 transition-colors">
                {SITE_CONFIG.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-sm text-white/60 sm:flex-row">
          <span>
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </span>
          <span>Affiliated with {SITE_CONFIG.affiliation}</span>
        </Container>
      </div>
    </footer>
  )
}
