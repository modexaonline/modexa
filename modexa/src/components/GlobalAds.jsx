import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useAdUnits } from '../lib/useAds'
import { injectHtml } from './AdUnit'
import AdUnit from './AdUnit'

// Site-wide scripts (pop-under, social bar, ad-network loaders) + the sticky footer bar.
export default function GlobalAds() {
  const head = useAdUnits('global_head'), body = useAdUnits('global_body'), sticky = useAdUnits('sticky_bottom')
  const [hideSticky, setHideSticky] = useState(() => { try { return sessionStorage.getItem('modexa-sticky-closed') === '1' } catch { return false } })
  const sig = [...head, ...body].map(u => u.id + ':' + (u.code || '').length).join('|')
  useEffect(() => {
    const added = []
    const put = (units, parent) => units.forEach(u => {
      if (!u.code || document.querySelector(`[data-modexa-global="${u.id}"]`)) return
      const holder = document.createElement('div'); holder.setAttribute('data-modexa-global', u.id); holder.style.display = 'contents'
      parent.appendChild(holder); injectHtml(holder, u.code); added.push(holder)
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
