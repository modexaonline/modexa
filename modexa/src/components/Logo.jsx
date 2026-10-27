import { Gamepad2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="brand" aria-label="Modexa home">
      <span className="brand-mark"><Gamepad2 size={22} strokeWidth={2.2} /></span>
      {!compact && <span className="brand-name">modexa<span>.</span></span>}
    </Link>
  )
}