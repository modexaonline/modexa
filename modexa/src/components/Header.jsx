import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Bookmark } from 'lucide-react'
import Logo from './Logo'
import usePublicPages from '../lib/usePublicPages'

const links = [
  { to: '/mods', label: 'Explore Mods' },
  { to: '/games', label: 'Games' },
  { to: '/categories', label: 'Categories' },
  { to: '/trending', label: 'Trending' },
  { to: '/blog', label: 'Guides & Blog' },
]

export default function Header({ savedCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const customPages = usePublicPages('show_in_menu')
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef(null)

  useEffect(() => { setMobileOpen(false) }, [location.pathname])
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [mobileOpen])
  useEffect(() => {
    const onKey = e => {
      const tag = (document.activeElement?.tagName || '').toLowerCase()
      if (e.key === '/' && !['input', 'textarea', 'select'].includes(tag)) { e.preventDefault(); searchRef.current?.focus() }
      if (e.key === 'Escape') setMobileOpen(false)
    }
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll(); window.addEventListener('keydown', onKey); window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('scroll', onScroll) }
  }, [])

  const submitSearch = event => {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    setMobileOpen(false)
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(link => <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{link.label}</NavLink>)}
          {customPages.map(page => <NavLink key={page.slug} to={`/page/${page.slug}`} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{page.title}</NavLink>)}
        </nav>
        <div className="header-actions">
          <form className="header-search" onSubmit={submitSearch} role="search">
            <Search size={16} />
            <input ref={searchRef} aria-label="Search mods" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search mods..." />
            <kbd>/</kbd>
          </form>
          <Link className="saved-link" to="/saved" aria-label={`Saved mods, ${savedCount} saved`}><Bookmark size={18}/><span className="saved-count">{savedCount}</span></Link>
          <Link className="button button-small button-primary submit-header" to="/submit-mod">Submit a Mod <span>↗</span></Link>
          <button className="icon-button mobile-menu-button" onClick={() => setMobileOpen(v => !v)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {mobileOpen && <div className="mobile-panel">
        <form className="mobile-search" onSubmit={submitSearch}><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search mods and games" aria-label="Search mods and games"/><button aria-label="Submit search"><span>→</span></button></form>
        {links.map(link => <NavLink key={link.to} to={link.to} className="mobile-nav-link">{link.label}<span>↗</span></NavLink>)}
        {customPages.map(page => <NavLink key={page.slug} to={`/page/${page.slug}`} className="mobile-nav-link">{page.title}<span>↗</span></NavLink>)}
        <Link className="mobile-nav-link" to="/saved">Saved mods <span>{savedCount}</span></Link>
        <Link className="button button-primary mobile-submit" to="/submit-mod">Submit a Mod</Link>
      </div>}
    </header>
  )
}
