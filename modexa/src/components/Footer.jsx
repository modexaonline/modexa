import { Link } from 'react-router-dom'
import { Heart, Mail, Twitter, Youtube, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import usePublicPages from '../lib/usePublicPages'
import { useSettings } from '../lib/useSettings'
import { supabaseConfigured } from '../lib/supabase'

export default function Footer() {
  const customPages = usePublicPages('show_in_footer')
  const s = useSettings()
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
      <div className="footer-column"><h4>Discover</h4><Link to="/mods">Explore Mods</Link><Link to="/games">Games</Link><Link to="/categories">Categories</Link><Link to="/trending">Trending</Link><Link to="/latest">Latest</Link></div>
      <div className="footer-column"><h4>Community</h4><Link to="/submit-mod">Submit a Mod</Link><Link to="/blog">Guides &amp; Blog</Link><Link to="/guidelines">Community Guidelines</Link><Link to="/faq">FAQ</Link><Link to="/about">About</Link></div>
      <div className="footer-column"><h4>Information</h4><Link to="/contact">Contact</Link><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Use</Link><Link to="/cookies">Cookie Policy</Link><Link to="/copyright">Copyright &amp; DMCA</Link>{customPages.map(page => <Link key={page.slug} to={`/page/${page.slug}`}>{page.title}</Link>)}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {s.site_name || 'Modexa'}. All rights reserved.</span><span>Made for the love of games <Heart size={13} className="heart-icon" fill="currentColor"/></span></div>
    <p className="disclaimer">{supabaseConfigured ? 'Modexa is an independent discovery site and is not affiliated with game publishers. Downloads open the creator’s own source — always check permissions and compatibility.' : 'Modexa is an independent discovery concept and is not affiliated with game publishers. Demo listings are illustrative and do not provide real downloads.'}</p>
  </footer>
}
