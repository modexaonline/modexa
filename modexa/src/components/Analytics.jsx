import { useEffect } from 'react'
import { useSettings } from '../lib/useSettings'
import { useConsent } from '../lib/consent'

export const GA_ID_RE = /^G-[A-Z0-9]{4,20}$/
// Accepts "G-XXXX" or the whole gtag snippet from Google and returns the Measurement ID ('' if none).
export function extractGaId(v) {
  const m = String(v || '').toUpperCase().match(/G-[A-Z0-9]{4,20}/)
  return m ? m[0] : ''
}

// Google Analytics 4 (gtag.js). The Measurement ID is managed in Admin → Site & brand → Google Analytics.
export default function Analytics() {
  const s = useSettings(), consent = useConsent()
  const id = s.ga_enabled !== false && (!s.ga_require_consent || consent === 'all') ? extractGaId(s.ga_measurement_id) : ''
  useEffect(() => {
    if (!id || typeof document === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
    const tag = document.createElement('script')
    tag.async = true; tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; tag.setAttribute('data-modexa-ga', id)
    document.head.appendChild(tag)
    window.gtag('js', new Date()); window.gtag('config', id)
    return () => { tag.remove() }
  }, [id])
  return null
}
