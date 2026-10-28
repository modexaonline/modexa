import { Link } from 'react-router-dom'
import { Heart, Mail, Twitter, Youtube, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import usePublicPages from '../lib/usePublicPages'
import { useSettings } from '../lib/useSettings'
import { usePageContent } from '../lib/siteContent'
import { NAV_DEFAULT } from '../content/merge'
import { openConsent } from '../lib/consent'
import { supabaseConfigured } from '../lib/supabase'

export default function Footer() {
  const customPages = usePublicPages('show_in_footer')
  const s = useSettings()
  const nav = usePageContent('nav', NAV_DEFAULT)
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-brand-col">
        <Logo/>
        <p>{s.tagline || 'A home for fresh ideas, game-changing mods, and community creativity.'}</p>
        <div className="footer-socials">
          {s.twitter_url && <a href={s.twitter_url} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"><Twitter size={16}/></a>}
          {s.youtube_url && <a href={s.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={16}/></a>}
          {s.discord_url && <a href={s.discord_url} target="_blank" rel="noopener noreferrer" aria-label="Discord"><MessageCircle size={16}/></a>}
          {s.contact_email && <a href={`mailto:${s.contact_email}`} aria-label="Email us"><Mail size={16}/></a>}
        </div>
      </div>
      {nav.footer.map((g, gi) => <div className="footer-column" key={g.title + gi}><h4>{g.title}</h4>{g.links.map(l => /^https?:/.test(l.to) ? <a key={l.to + l.label} href={l.to} target="_blank" rel="noopener noreferrer">{l.label}</a> : <Link key={l.to + l.label} to={l.to}>{l.label}</Link>)}{gi === nav.footer.length - 1 && customPages.map(page => <Link key={page.slug} to={`/page/${page.slug}`}>{page.title}</Link>)}</div>)}
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {s.site_name || 'Modexa'}. All rights reserved.</span>{s.ads_enabled && s.ads_require_consent && <button type="button" className="footer-link-btn" onClick={openConsent}>Cookie settings</button>}<span>Made for the love of games <Heart size={13} className="heart-icon" fill="currentColor"/></span></div>
    {s.footer_text && <p className="disclaimer footer-extra">{s.footer_text}</p>}
    <p className="disclaimer">{supabaseConfigured ? 'Modexa is an independent discovery site and is not affiliated with game publishers. Downloads open the creator’s own source — always check permissions and compatibility.' : 'Modexa is an independent discovery concept and is not affiliated with game publishers. Demo listings are illustrative and do not provide real downloads.'}</p>
  </footer>
}
