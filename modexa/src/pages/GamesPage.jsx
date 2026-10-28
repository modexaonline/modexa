import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Search, ArrowUpRight, Gamepad2, BookOpen, Clock3 } from 'lucide-react'
import SEO from '../components/SEO'
import SeoContent from '../components/SeoContent'
import Breadcrumbs from '../components/Breadcrumbs'
import SafeImg from '../components/SafeImg'
import PageHero from '../components/PageHero'
import ModGrid from '../components/ModGrid'
import AdSlot from '../components/AdSlot'
import { LISTING, gameContent } from '../content/seo'
import { formatCount } from '../data/mods'
import { useGamesData } from '../lib/useGames'
import { usePageContent } from '../lib/siteContent'
import useModsData from '../lib/useMods'
import { slugify, readingTime } from '../lib/format'
import { supabaseConfigured } from '../lib/supabase'

export default function GamesPage({ savedIds, onToggleSave }) {
  const L = usePageContent('listing:games', LISTING.games)
  const mods = useModsData()
  const { slug } = useParams()
  const { games, posts, loading } = useGamesData()
  const [query, setQuery] = useState('')
  const game = slug ? games.find(g => g.slug === slug) : null
  if (slug) {
    const gameMods = game ? mods.filter(m => slugify(m.game) === game.slug) : []
    const guides = game ? posts.filter(p => p.game_slug === game.slug) : []
    const crumbs = [{ label: 'Home', to: '/' }, { label: 'Games', to: '/games' }, { label: game?.name || 'Game' }]
    return <>
      <SEO fullTitle={game ? `${game.name} Guides & Mods — Modexa` : 'Game not found | Modexa'} noindex={!game} description={game ? (game.description || `Guides and community mods for ${game.name} on Modexa: compare versions, platforms and requirements, then download from the creator’s original page.`) : 'Game not found.'} pageType="CollectionPage" breadcrumbs={crumbs}/>
      <div className="container directory-section game-detail-page">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Games', to: '/games' }, { label: game?.name || (loading ? 'Loading…' : 'Not found') }]}/>
        {game ? <>
          <div className="game-detail-cover"><SafeImg src={game.image}/><div className="game-detail-cover-overlay"/><div className="game-detail-cover-copy"><span className="eyebrow">GAME HUB</span><h1>{game.name}</h1><p>{game.description || `Guides and community-made mods for ${game.name}.`}</p><span className="platform-pill">{game.platform}</span></div></div>
          {guides.length > 0 && <><div className="section-heading game-mods-heading"><div><h2>{game.name} <span className="text-gradient">guides</span></h2><p>Step-by-step articles written for this game.</p></div></div>
            <div className="blog-list-grid">{guides.map(p => <article className="blog-list-card" key={p.id}><Link to={`/blog/${p.slug}`} className="blog-list-image"><SafeImg src={p.cover_image} loading="lazy"/></Link><div className="blog-list-content"><div className="blog-list-meta"><span>{p.category || 'Guide'}</span><span><Clock3 size={13}/>{readingTime(p.content)} min read</span></div><Link to={`/blog/${p.slug}`}><h2>{p.title}</h2></Link><p>{p.excerpt}</p><Link className="text-link" to={`/blog/${p.slug}`}>Read guide <ArrowUpRight size={15}/></Link></div></article>)}</div></>}
          <AdSlot placement="mod_bottom" gameSlug={game.slug}/>
          <div className="section-heading game-mods-heading"><div><h2>Mods for <span className="text-gradient">{game.name}</span></h2><p>Published listings for this game, with version and platform details.</p></div></div>
          <ModGrid mods={gameMods} savedIds={savedIds} onToggleSave={onToggleSave}/>
          <SeoContent data={gameContent(game.name, gameMods.length)}/>
        </> : loading ? <div className="empty-state"><p>Loading…</p></div> : <div className="empty-state"><h2>Game not found</h2><Link className="button button-primary" to="/games">Browse games</Link></div>}
      </div>
    </>
  }
  const filtered = games.filter(g => g.name.toLowerCase().includes(query.toLowerCase()))
  return <>
    <SEO fullTitle={L.seoTitle} description={L.description} pageType="CollectionPage" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Games', to: '/games' }]} faqs={L.faqs}/>
    <PageHero eyebrow="YOUR FAVORITE WORLDS" title={<>Find mods for your <span className="text-gradient">favorite games.</span></>} description={L.description}/>
    <section className="directory-section"><div className="container"><div className="directory-toolbar"><div className="directory-search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search games..." aria-label="Search games"/></div><span className="results-count">{filtered.length} games</span></div>
      <div className="games-grid games-directory-grid">{filtered.map(game => <Link to={game.href} className="game-card" key={game.slug}><SafeImg src={game.image} loading="lazy"/><div className="game-overlay"/><div className="game-info"><span className="game-count">{game.guideCount > 0 ? `${game.guideCount} ${game.guideCount === 1 ? 'guide' : 'guides'}` : ''}{game.guideCount > 0 && game.modCount > 0 ? ' · ' : ''}{game.modCount > 0 ? `${formatCount(game.modCount)} ${game.modCount === 1 ? 'mod' : 'mods'}` : game.guideCount === 0 ? 'Coming soon' : ''}</span><h3>{game.name}</h3><span className="game-cta">{game.guideCount > 0 ? 'Read the guide' : 'Browse game'} <ArrowUpRight size={15}/></span></div><span className="game-index"><Gamepad2 size={20}/></span></Link>)}</div>
      {!loading && filtered.length === 0 && <div className="empty-state"><h3>No games found</h3><p>Try another search.</p></div>}
    </div></section>
    <SeoContent data={L}/>
  </>
}
