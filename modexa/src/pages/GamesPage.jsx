import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Search, ArrowUpRight, Gamepad2 } from 'lucide-react'
import SEO from '../components/SEO'
import SeoContent from '../components/SeoContent'
import Breadcrumbs from '../components/Breadcrumbs'
import SafeImg from '../components/SafeImg'
import { LISTING, gameContent, categoryContent } from '../content/seo'

import PageHero from '../components/PageHero'
import { games, formatCount } from '../data/mods'
import useModsData from '../lib/useMods'
import { supabaseConfigured } from '../lib/supabase'
import ModGrid from '../components/ModGrid'

export default function GamesPage({ savedIds, onToggleSave }) {
  const mods = useModsData()
  const { slug } = useParams()
  const [query, setQuery] = useState('')
  const gameDirectory = useMemo(() => {
    const source = supabaseConfigured ? [] : games
    const map = new Map(source.map(g => [g.slug, { ...g, count: mods.filter(m => m.game === g.name).length || g.count }]))
    mods.forEach(m => { if (!m.game) return; const gameSlug = m.game.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); const current = map.get(gameSlug); map.set(gameSlug, { name: m.game, slug: gameSlug, count: mods.filter(x => x.game === m.game).length, image: current?.image || m.image, platform: m.platform || current?.platform || 'PC' }) })
    return [...map.values()]
  }, [mods])
  const game = slug ? gameDirectory.find(g => g.slug === slug) : null
  const gameMods = useMemo(() => game ? mods.filter(m => m.game === game.name) : [], [game, mods])
  if (slug) return <>
    <SEO fullTitle={game ? `${game.name} Mods — Browse Community Mods | Modexa` : 'Game not found | Modexa'} noindex={!game} description={game ? `Browse ${game.name} mods on Modexa: compare versions, platforms and requirements, then download from the creator’s original page.` : 'Game not found.'} pageType="CollectionPage" breadcrumbs={[{label:'Home',to:'/'},{label:'Games',to:'/games'},{label:game?.name || 'Game'}]}/>
    <div className="container directory-section game-detail-page">
      <Breadcrumbs items={[{label:'Home',to:'/'},{label:'Games',to:'/games'},{label:game?.name || 'Not found'}]}/>
      {game ? <><div className="game-detail-cover"><SafeImg src={game.image}/><div className="game-detail-cover-overlay"/><div className="game-detail-cover-copy"><span className="eyebrow">GAME DIRECTORY</span><h1>{game.name}</h1><p>Discover mods and community-made ideas for your next playthrough.</p><span className="platform-pill">{game.platform}</span></div></div><div className="section-heading game-mods-heading"><div><h2>Mods for <span className="text-gradient">{game.name}</span></h2><p>Published listings for this game, with version and platform details.</p></div></div><ModGrid mods={gameMods} savedIds={savedIds} onToggleSave={onToggleSave}/><SeoContent data={gameContent(game.name, gameMods.length)}/></> : <div className="empty-state"><h2>Game not found</h2><Link className="button button-primary" to="/games">Browse games</Link></div>}
    </div>
  </>
  const filtered = gameDirectory.filter(g => g.name.toLowerCase().includes(query.toLowerCase()))
  return <>
    <SEO fullTitle={LISTING.games.seoTitle} description={LISTING.games.description} pageType="CollectionPage" breadcrumbs={[{label:'Home',to:'/'},{label:'Games',to:'/games'}]} faqs={LISTING.games.faqs}/>
    <PageHero eyebrow="YOUR FAVORITE WORLDS" title={<>Find mods for your <span className="text-gradient">favorite games.</span></>} description={LISTING.games.description}/>
    <section className="directory-section"><div className="container"><div className="directory-toolbar"><div className="directory-search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search games..." aria-label="Search games"/></div><span className="results-count">{filtered.length} games</span></div><div className="games-grid games-directory-grid">{filtered.map(game => <Link to={`/games/${game.slug}`} className="game-card" key={game.slug}><SafeImg src={game.image} loading="lazy"/><div className="game-overlay"/><div className="game-info"><span className="game-count">{formatCount(game.count)} {supabaseConfigured ? (game.count === 1 ? 'mod' : 'mods') : 'listed mods*'}</span><h3>{game.name}</h3><span className="game-cta">Browse game <ArrowUpRight size={15}/></span></div><span className="game-index"><Gamepad2 size={20}/></span></Link>)}</div>{!supabaseConfigured && <p className="micro-disclaimer">*Demo counts are illustrative.</p>}</div></section>
    <SeoContent data={LISTING.games}/>
  </>
}