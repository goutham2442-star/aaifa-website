import { SITE_CONFIG } from '@/lib/constants'

export function ContactMap() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        src={SITE_CONFIG.address.mapEmbed}
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="AAIFA location map"
        className="border-0"
      />
    </div>
  )
}
