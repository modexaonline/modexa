import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, X } from 'lucide-react'

export default function CookieNotice() {
  const [show, setShow] = useState(false)
  useEffect(() => { try { if (!localStorage.getItem('modexa-cookie-notice')) setShow(true) } catch {} }, [])
  if (!show) return null
  const close = () => { try { localStorage.setItem('modexa-cookie-notice', '1') } catch {} setShow(false) }
  return <div className="cookie-notice" role="region" aria-label="Cookie notice">
    <span className="cookie-icon"><Cookie size={20}/></span>
    <p>We use only essential browser storage (for example, to remember your saved mods) and no advertising or tracking cookies. <Link to="/cookies">Read the Cookie Policy</Link></p>
    <button className="button button-primary button-small" onClick={close}>Got it</button>
    <button className="cookie-close" onClick={close} aria-label="Dismiss"><X size={16}/></button>
  </div>
}
