import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Search, X, LayoutGrid, List, ArrowDownUp } from 'lucide-react'
import SEO from '../components/SEO'
import SeoContent from '../components/SeoContent'
import Breadcrumbs from '../components/Breadcrumbs'
import { LISTING } from '../content/seo'
import { usePageContent } from '../lib/siteContent'

import PageHero from '../components/PageHero'
import ModGrid from '../components/ModGrid'
import { categories, games } from '../data/mods'
import useModsData from '../lib/useMods'
import { supabaseConfigured } from '../lib/supabase'

export default function ModsPage({ savedIds, onToggleSave, initialMode = 'all' }) {
  const mods = useModsData()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || 'All categories')
  const [game, setGame] = useState(params.get('game') || 'All games')
  const [platform, setPlatform] = useState('All platforms')
  const [sort, setSort] = useState(initialMode === 'trending' ? 'downloads' : initialMode === 'latest' ? 'updated' : 'featured')
  const [view, setView] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const categoryOptions = supabaseConfigured ? [...new Set(mods.map(m => m.category).filter(Boolean))] : categories
  const gameOptions = supabaseConfigured ? [...new Set(mods.map(m => m.game).filter(Boolean))].map(name => ({ name })) : games

  const filtered = useMemo(() => {
    let list = [...mods]
    if (initialMode === 'trending') list = list.sort((a,b) => b.downloads - a.downloads)
    if (initialMode === 'latest') list = list.sort((a,b) => new Date(b.updated) - new Date(a.updated))
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(m => [m.title,m.game,m.category,m.creator,m.short].some(v => v.toLowerCase().includes(q)))
    }
    if (category !== 'All categories') list = list.filter(m => m.category === category)
    if (game !== 'All games') list = list.filter(m => m.game === game)
    if (platform !== 'All platforms') list = list.filter(m => m.platform === platform)
    if (sort === 'downloads') list.sort((a,b) => b.downloads - a.downloads)
    if (sort === 'updated') list.sort((a,b) => new Date(b.updated) - new Date(a.updated))
    if (sort === 'title') list.sort((a,b) => a.title.localeCompare(b.title))
    if (sort === 'featured') list.sort((a,b) => Number(b.featured) - Number(a.featured))
    return list
  }, [query, category, game, platform, sort, initialMode, mods])

  const reset = () => { setQuery(''); setCategory('All categories'); setGame('All games'); setPlatform('All platforms'); setParams({}) }
  const listKey = initialMode === 'trending' ? 'trending' : initialMode === 'latest' ? 'latest' : 'mods'
  const seoData = usePageContent('listing:' + listKey, LISTING[listKey])
  const title = initialMode === 'trending' ? 'Trending mods' : initialMode === 'latest' ? 'Latest mods' : 'Explore mods'
  return <>
    <SEO fullTitle={seoData.seoTitle} description={seoData.description} pageType="CollectionPage" breadcrumbs={[{label:'Home',to:'/'},{label:title,to:seoData.path}]} faqs={seoData.faqs}/>
    <PageHero eyebrow="THE MOD LIBRARY" title={seoData.h1} description={seoData.description}/>
    <section className="directory-section"><div className="container">
      <div className="directory-toolbar">
        <div className="directory-search"><Search size={18}/><input value={query} onChange={e => { setQuery(e.target.value); setParams(p => { const n = new URLSearchParams(p); e.target.value ? n.set('q',e.target.value) : n.delete('q'); return n }) }} placeholder="Search mods, games, creators..." aria-label="Search mods"/></div>
        <button className={`button button-outline filter-toggle ${showFilters ? 'is-active' : ''}`} onClick={() => setShowFilters(v => !v)}><SlidersHorizontal size={16}/> Filters <span className="filter-count">{[category !== 'All categories',game !== 'All games',platform !== 'All platforms'].filter(Boolean).length || ''}</span></button>
        <label className="sort-control"><ArrowDownUp size={15}/><span className="sr-only">Sort mods</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured first</option><option value="downloads">Most downloaded</option><option value="updated">Recently updated</option><option value="title">Title A–Z</option></select></label>
        <div className="view-toggle"><button className={view === 'grid' ? 'selected' : ''} onClick={() => setView('grid')} aria-label="Grid view"><LayoutGrid size={17}/></button><button className={view === 'list' ? 'selected' : ''} onClick={() => setView('list')} aria-label="List view"><List size={17}/></button></div>
      </div>
      {showFilters && <div className="filter-panel">
        <label>Category<select value={category} onChange={e => setCategory(e.target.value)}><option>All categories</option>{categoryOptions.map(c => <option key={c}>{c}</option>)}</select></label>
        <label>Game<select value={game} onChange={e => setGame(e.target.value)}><option>All games</option>{gameOptions.map(g => <option key={g.name}>{g.name}</option>)}</select></label>
        <label>Platform<select value={platform} onChange={e => setPlatform(e.target.value)}><option>All platforms</option><option>PC</option><option>Android</option><option>Console</option></select></label>
        <button className="clear-filters" onClick={reset}><X size={14}/> Clear filters</button>
      </div>}
      <div className="results-summary"><span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'listing' : 'listings'} found</span><span>{supabaseConfigured ? 'Reviewed listings · links open the creator’s page' : 'Sample catalog · demo data'}</span></div>
      <div className={view === 'list' ? 'mods-grid list-view' : ''}><ModGrid mods={filtered} savedIds={savedIds} onToggleSave={onToggleSave}/></div>
    </div></section>
    <SeoContent data={seoData}/>
  </>
}