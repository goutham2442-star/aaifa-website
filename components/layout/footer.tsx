import Link from 'next/link'
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { Container } from '@/components/shared/container'
import { SITE_CONFIG, NAV_LINKS, PROGRAMS } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface-dark text-white/80">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="footer" className="mb-4" />
          <p className="text-sm leading-relaxed text-white/60">
            {SITE_CONFIG.description}
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={SITE_CONFIG.social.facebook}
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 hover:bg-crimson"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 hover:bg-crimson"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={SITE_CONFIG.social.youtube}
              aria-label="YouTube"
              className="rounded-full bg-white/10 p-2 hover:bg-crimson"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-gold-300">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-gold-300">Programs</h4>
          <ul className="space-y-2 text-sm">
            {PROGRAMS.filter((p) => p.featured).map((program) => (
              <li key={program.slug}>
                <Link href={`/programs/${program.slug}`} className="hover:text-gold-300">
                  {program.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg text-gold-300">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{SITE_CONFIG.address.full}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" />
              <a href={SITE_CONFIG.contact.phoneTel}>{SITE_CONFIG.contact.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${SITE_CONFIG.contact.email}`}>
                {SITE_CONFIG.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <span>
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </span>
          <span>Affiliated with {SITE_CONFIG.affiliation}</span>
        </Container>
      </div>
    </footer>
  )
}
