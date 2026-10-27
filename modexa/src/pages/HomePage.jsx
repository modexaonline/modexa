import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Search, Sparkles, ShieldCheck, Zap, Compass, TrendingUp, Clock3, Gamepad2, BadgeCheck, Layers3, Smartphone, UserCheck, Scale, FileSearch, Download } from 'lucide-react'
import SEO from '../components/SEO'
import AnswerBox from '../components/AnswerBox'
import ContentSections from '../components/ContentSections'
import FaqSection from '../components/FaqSection'
import { LISTING } from '../content/seo'
import ModCard from '../components/ModCard'
import { games, categories, formatCount } from '../data/mods'
import { useModsState } from '../lib/useMods'
import SafeImg from '../components/SafeImg'
import { CardSkeletons } from '../components/Skeleton'
import { supabaseConfigured } from '../lib/supabase'
import { useState } from 'react'

const categoryIcons = ['◈', '✦', '◇', '⌘', '↗', '⚙', '◎']

export default function HomePage({ savedIds, onToggleSave }) {
  const { items: mods, loading } = useModsState()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const featured = (mods.filter(m => m.featured).length ? mods.filter(m => m.featured) : mods).slice(0, 3)
  const visibleCategories = supabaseConfigured ? [...new Set(mods.map(m => m.category).filter(Boolean))] : categories
  const visibleGames = supabaseConfigured ? [...new Map(mods.filter(m => m.game).map(m => { const slug = m.game.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); return [slug, { name: m.game, slug, count: mods.filter(x => x.game === m.game).length, image: m.image, platform: m.platform }] })).values()] : games
  return <>
    <SEO fullTitle={LISTING.home.seoTitle} description={LISTING.home.description} faqs={LISTING.home.faqs}/>
    <section className="hero-section">
      <div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/>
      <div className="container hero-content">
        <div className="eyebrow"><span className="live-dot"/> YOUR NEXT FAVORITE MOD STARTS HERE</div>
        <h1>Discover mods.<br/><span>Redefine your game.</span></h1>
        <p className="hero-description">Modexa is an independent hub for game mods and custom content. Every listing credits the creator, shows the version and requirements, and links to the original source.</p>
        <form className="hero-search" onSubmit={e => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(query.trim())}`) }}>
          <Search size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search mods, games, creators..." aria-label="Search mods, games, creators"/><button type="submit">Search <ArrowRight size={16}/></button>
        </form>
        <div className="hero-quick-links"><span>Try:</span><Link to="/search?q=graphics">Graphics mods</Link><Link to="/search?q=minecraft">Minecraft</Link><Link to="/trending">Trending now</Link></div>
        <div className="hero-proof">
          <div className="proof-item"><span className="proof-icon"><Compass size={17}/></span><span><strong>Explore freely</strong><small>Find your next favorite</small></span></div>
          <div className="proof-item"><span className="proof-icon"><ShieldCheck size={17}/></span><span><strong>Creator-first</strong><small>Respect original sources</small></span></div>
          <div className="proof-item"><span className="proof-icon"><Zap size={17}/></span><span><strong>Built for discovery</strong><small>Less searching, more playing</small></span></div>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="visual-backdrop"/>
        <div className="floating-label label-top"><Sparkles size={15}/> COMMUNITY PICKS</div>
        <div className="hero-feature-image"><SafeImg src={mods[0]?.image}/></div>
        <div className="floating-card floating-card-top"><span className="mini-icon"><TrendingUp size={16}/></span><span><b>Fresh discoveries</b><small>Explore something new</small></span></div>
        <div className="floating-card floating-card-bottom"><span className="mini-icon cyan"><Gamepad2 size={16}/></span><span><b>Made for players</b><small>Find your next experience</small></span></div>
        <div className="visual-caption"><span className="caption-pip"/> MODS THAT CHANGE THE GAME</div>
      </div>
    </section>

    <section className="trust-strip"><div className="container trust-strip-inner"><span><span className="strip-dot"/> A growing discovery hub</span><span>Explore. Learn. Customize.</span><span>Always credit the creator.</span></div></section>

    <section className="section-block"><div className="container">
      <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> HAND-PICKED DISCOVERIES</div><h2>Featured <span className="text-gradient">mods</span></h2><p>Standout creations worth a closer look.</p></div><Link className="text-link" to="/mods">Explore all mods <ArrowRight size={16}/></Link></div>
      {loading ? <CardSkeletons/> : featured.length === 0 ? <div className="empty-state"><h3>New mods coming soon</h3><p>We are adding listings right now. Meanwhile, check out our guides.</p></div> : <div className="mods-grid">{featured.map(mod => <ModCard key={mod.id} mod={mod} saved={savedIds.includes(mod.id)} onToggleSave={onToggleSave}/>)}</div>}
    </div></section>

    <section className="section-block section-muted"><div className="container">
      <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> FIND YOUR WORLD</div><h2>Browse by <span className="text-gradient">game</span></h2><p>Start with the game you already love.</p></div><Link className="text-link" to="/games">All games <ArrowRight size={16}/></Link></div>
      <div className="games-grid">{visibleGames.slice(0,4).map((game, i) => <Link to={`/games/${game.slug}`} className="game-card" key={game.slug}><SafeImg src={game.image} loading="lazy"/><div className="game-overlay"/><div className="game-info"><span className="game-count">{formatCount(game.count)} {supabaseConfigured ? (game.count === 1 ? "mod" : "mods") : "listed mods*"}</span><h3>{game.name}</h3><span className="game-cta">Explore mods <ArrowUpRight size={15}/></span></div><span className="game-index">0{i+1}</span></Link>)}</div>
      {!supabaseConfigured && <p className="micro-disclaimer">*Illustrative demo counts. Connect Supabase to show live data.</p>}
    </div></section>

    <section className="section-block"><div className="container">
      <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR NEXT DISCOVERY</div><h2>Explore by <span className="text-gradient">category</span></h2><p>Find exactly the kind of change you want.</p></div><Link className="text-link" to="/categories">View categories <ArrowRight size={16}/></Link></div>
      <div className="category-grid">{visibleCategories.map((category, i) => <Link to={`/categories/${encodeURIComponent(category.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-'))}`} className="category-card" key={category}><span className={`category-symbol symbol-${i}`}>{categoryIcons[i]}</span><span className="category-title">{category}</span><ArrowUpRight className="category-arrow" size={17}/></Link>)}</div>
    </div></section>

    <section className="creator-banner"><div className="container creator-banner-inner"><div className="creator-art"><div className="creator-art-circle"/><Gamepad2 size={88} strokeWidth={1}/><span className="creator-spark spark-a">✦</span><span className="creator-spark spark-b">✧</span></div><div className="creator-copy"><div className="eyebrow"><span className="eyebrow-line"/> MADE BY THE COMMUNITY</div><h2>Built something<br/><span className="text-gradient">awesome?</span></h2><p>Give your work a place to be discovered. Share your creation with players who are looking for their next favorite experience.</p><Link className="button button-primary" to="/submit-mod">Submit your mod <ArrowRight size={17}/></Link></div><div className="banner-decoration">MODEXA<br/>CREATOR HUB</div></div></section>

    <section className="section-block how-section"><div className="container">
      <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> SIMPLE BY DESIGN</div><h2>How Modexa <span className="text-gradient">works</span></h2><p>Three steps from curiosity to a confident install.</p></div></div>
      <ol className="steps-grid">{LISTING.home.steps.map((s, i) => <li className="step-card" key={s.t}><span className="step-num">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}</ol>
    </div></section>

    <section className="section-block section-muted"><div className="container">
      <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> WHY MODEXA</div><h2>Built on <span className="text-gradient">trust and clarity</span></h2><p>The principles behind every listing.</p></div></div>
      <div className="value-grid">{LISTING.home.values.map((v, i) => { const Icon = [UserCheck, FileSearch, BadgeCheck, ShieldCheck, Smartphone, Scale][i]; return <article className="value-card" key={v.t}><span className="value-icon"><Icon size={22}/></span><h3>{v.t}</h3><p>{v.d}</p></article> })}</div>
    </div></section>

    <section className="seo-content"><div className="container"><div className="seo-content-inner">
      <AnswerBox {...LISTING.home.answer}/>
      <ContentSections sections={LISTING.home.sections}/>
      <FaqSection faqs={LISTING.home.faqs}/>
    </div></div></section>

    <section className="cta-band"><div className="container cta-inner">
      <div><h2>Made a mod? Share it with players.</h2><p>Submit your creation for review — free, credited and linked to your original page.</p></div>
      <Link className="button button-primary" to="/submit-mod">Submit a mod <ArrowRight size={16}/></Link>
    </div></section>
  </>
}