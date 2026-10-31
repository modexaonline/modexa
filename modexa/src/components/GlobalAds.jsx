import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useAdUnits } from '../lib/useAds'
import { postscribe } from '../lib/postscribe'
import AdUnit from './AdUnit'
import { useSettings } from '../lib/useSettings'
import { useConsent } from '../lib/consent'

// Site-wide scripts (pop-under, social bar, ad-network loaders) + the sticky footer bar.
export default function GlobalAds() {
  const head = useAdUnits('global_head'), body = useAdUnits('global_body'), sticky = useAdUnits('sticky_bottom')
  const [hideSticky, setHideSticky] = useState(() => { try { return sessionStorage.getItem('modexa-sticky-closed') === '1' } catch { return false } })
  const settings = useSettings(), consent = useConsent()
  const monetag = settings.monetag_enabled !== false && (!settings.ads_require_consent || consent === 'all') ? (settings.monetag_code || '').trim() : ''
  useEffect(() => {
    if (!monetag) return
    const holder = document.createElement('div'); holder.setAttribute('data-modexa-monetag', '1'); holder.style.display = 'contents'
    document.head.appendChild(holder); postscribe(holder, monetag)
    return () => holder.remove()
  }, [monetag])
  const sig = [...head, ...body].map(u => u.id + ':' + (u.code || '').length).join('|')
  useEffect(() => {
    const added = []
    const put = (units, parent) => units.forEach(u => {
      if (!u.code || document.querySelector(`[data-modexa-global="${u.id}"]`)) return
      const holder = document.createElement('div'); holder.setAttribute('data-modexa-global', u.id); holder.style.display = 'contents'
      parent.appendChild(holder); postscribe(holder, u.code); added.push(holder)
    })
    put(head, document.head); put(body, document.body)
    return () => { added.forEach(n => n.remove()) }
  }, [sig])
  const unit = sticky[0]
  useEffect(() => { document.body.classList.toggle('has-sticky-ad', Boolean(unit) && !hideSticky); return () => document.body.classList.remove('has-sticky-ad') }, [unit, hideSticky])
  if (!unit || hideSticky) return null
  return <div className="sticky-ad" role="complementary" aria-label="Advertisement">
    <button className="sticky-ad-close" aria-label="Close advertisement" onClick={() => { try { sessionStorage.setItem('modexa-sticky-closed', '1') } catch {} setHideSticky(true) }}><X size={16}/></button>
    <AdUnit unit={{ ...unit, label: '' }}/>
  </div>
}
