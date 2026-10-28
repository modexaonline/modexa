import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Search, Sparkles, ShieldCheck, Zap, Compass, TrendingUp, Clock3, Gamepad2, BadgeCheck, Layers3, Smartphone, UserCheck, Scale, FileSearch, Download } from 'lucide-react'
import SEO from '../components/SEO'
import AnswerBox from '../components/AnswerBox'
import ContentSections from '../components/ContentSections'
import FaqSection from '../components/FaqSection'
import { LISTING } from '../content/seo'
import { HOME_DEFAULT } from '../content/merge'
import { usePageContent } from '../lib/siteContent'
import { useGamesData } from '../lib/useGames'
import AdSlot from '../components/AdSlot'
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
  const home = usePageContent('home', { ...LISTING.home, ...HOME_DEFAULT })
  const { games: allGames, loading: gamesLoading } = useGamesData()
  const homeGames = allGames.filter(g => g.show_on_home)
  const visibleGames = homeGames.length ? homeGames : allGames
  return <>
    <SEO fullTitle={home.seoTitle} description={home.description} faqs={home.faqs}/>
    <section className="hero-section">
      <div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/>
      <div className="container hero-content">
        <div className="eyebrow"><span className="live-dot"/> {home.hero.eyebrow}</div>
        <h1>{home.hero.line1}<br/><span>{home.hero.line2}</span></h1>
        <p className="hero-description">{home.hero.description}</p>
        <form className="hero-search" onSubmit={e => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(query.trim())}`) }}>
          <Search size={20}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={home.hero.searchPlaceholder} aria-label="Search mods, games, creators"/><button type="submit">Search <ArrowRight size={16}/></button>
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
      <div className="section-heading"><div><div className="eyebrow">HAND-PICKED DISCOVERIES</div><h2>{home.headings.featured.title} <span className="text-gradient">{home.headings.featured.accent}</span></h2><p>{home.headings.featured.text}</p></div><Link className="text-link" to="/mods">Explore all mods <ArrowRight size={16}/></Link></div>
      {loading ? <CardSkeletons/> : featured.length === 0 ? <div className="empty-state"><h3>New mods coming soon</h3><p>We are adding listings right now. Meanwhile, check out our guides.</p></div> : <div className="mods-grid">{featured.map(mod => <ModCard key={mod.id} mod={mod} saved={savedIds.includes(mod.id)} onToggleSave={onToggleSave}/>)}</div>}
    </div></section>

    <div className="container"><AdSlot placement="home_middle"/></div>
    <section className="section-block section-muted"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">FIND YOUR WORLD</div><h2>{home.headings.games.title} <span className="text-gradient">{home.headings.games.accent}</span></h2><p>{home.headings.games.text}</p></div><Link className="text-link" to="/games">All games <ArrowRight size={16}/></Link></div>
      <div className="games-grid">{gamesLoading ? <CardSkeletons count={4}/> : visibleGames.slice(0,4).map((game, i) => <Link to={game.href} className="game-card" key={game.slug}><SafeImg src={game.image} loading="lazy"/><div className="game-overlay"/><div className="game-info"><span className="game-count">{game.guideCount > 0 ? `${game.guideCount} ${game.guideCount === 1 ? 'guide' : 'guides'}` : game.modCount > 0 ? `${formatCount(game.modCount)} ${game.modCount === 1 ? 'mod' : 'mods'}` : 'Coming soon'}</span><h3>{game.name}</h3><span className="game-cta">{game.guideCount > 0 ? 'Read the guide' : 'Browse game'} <ArrowUpRight size={15}/></span></div><span className="game-index">0{i+1}</span></Link>)}</div>
          </div></section>

    <section className="section-block"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">YOUR NEXT DISCOVERY</div><h2>{home.headings.categories.title} <span className="text-gradient">{home.headings.categories.accent}</span></h2><p>{home.headings.categories.text}</p></div><Link className="text-link" to="/categories">View categories <ArrowRight size={16}/></Link></div>
      <div className="category-grid">{visibleCategories.map((category, i) => <Link to={`/categories/${encodeURIComponent(category.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-'))}`} className="category-card" key={category}><span className={`category-symbol symbol-${i}`}>{categoryIcons[i]}</span><span className="category-title">{category}</span><ArrowUpRight className="category-arrow" size={17}/></Link>)}</div>
    </div></section>

    <section className="creator-banner"><div className="container creator-banner-inner"><div className="creator-art"><div className="creator-art-circle"/><Gamepad2 size={88} strokeWidth={1}/><span className="creator-spark spark-a">✦</span><span className="creator-spark spark-b">✧</span></div><div className="creator-copy"><div className="eyebrow">MADE BY THE COMMUNITY</div><h2>Built something<br/><span className="text-gradient">awesome?</span></h2><p>Give your work a place to be discovered. Share your creation with players who are looking for their next favorite experience.</p><Link className="button button-primary" to="/submit-mod">Submit your mod <ArrowRight size={17}/></Link></div><div className="banner-decoration">MODEXA<br/>CREATOR HUB</div></div></section>

    <section className="section-block how-section"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">SIMPLE BY DESIGN</div><h2>{home.headings.how.title} <span className="text-gradient">{home.headings.how.accent}</span></h2><p>{home.headings.how.text}</p></div></div>
      <ol className="steps-grid">{home.steps.map((s, i) => <li className="step-card" key={s.t}><span className="step-num">{i + 1}</span><h3>{s.t}</h3><p>{s.d}</p></li>)}</ol>
    </div></section>

    <section className="section-block section-muted"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">WHY MODEXA</div><h2>{home.headings.why.title} <span className="text-gradient">{home.headings.why.accent}</span></h2><p>{home.headings.why.text}</p></div></div>
      <div className="value-grid">{home.values.map((v, i) => { const Icon = [UserCheck, FileSearch, BadgeCheck, ShieldCheck, Smartphone, Scale][i]; return <article className="value-card" key={v.t}><span className="value-icon"><Icon size={22}/></span><h3>{v.t}</h3><p>{v.d}</p></article> })}</div>
    </div></section>

    <section className="seo-content"><div className="container"><div className="seo-content-inner">
      <AnswerBox {...home.answer}/>
      <ContentSections sections={home.sections}/>
      <FaqSection faqs={home.faqs}/>
    </div></div></section>

    <section className="cta-band"><div className="container cta-inner">
      <div><h2>{home.cta.title}</h2><p>{home.cta.text}</p></div>
      <Link className="button button-primary" to={home.cta.buttonLink}>{home.cta.buttonText} <ArrowRight size={16}/></Link>
    </div></section>
  </>
}