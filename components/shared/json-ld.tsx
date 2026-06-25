import { SITE_CONFIG, FOUNDER } from '@/lib/constants'

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logos.primary,
    description: SITE_CONFIG.description,
    foundingDate: String(SITE_CONFIG.founded),
    founder: {
      '@type': 'Person',
      name: FOUNDER.name,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.line1,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560036',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.contact.phone,
      email: SITE_CONFIG.contact.email,
      contactType: 'Admissions',
    },
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.whatsapp,
      SITE_CONFIG.social.youtube,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
