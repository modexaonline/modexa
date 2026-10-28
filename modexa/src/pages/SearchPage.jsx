import { useSearchParams, Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import SEO from '../components/SEO'
import SeoContent from '../components/SeoContent'
import { usePageContent } from '../lib/siteContent'
import { LISTING } from '../content/seo'

import PageHero from '../components/PageHero'
import ModGrid from '../components/ModGrid'
import useModsData from '../lib/useMods'

export default function SearchPage({ savedIds, onToggleSave }) {
  const L = usePageContent('listing:search', LISTING.search)
  const mods = useModsData()
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const results = mods.filter(m => [m.title,m.game,m.category,m.creator,m.short].some(s => s.toLowerCase().includes(query.toLowerCase())))
  return <>
    <SEO fullTitle={query ? `Search results for “${query}” | Modexa` : L.seoTitle} noindex description={L.description}/>
    <PageHero eyebrow="SEARCH MODEXA" title={<>Find something <span className="text-gradient">different.</span></>} description={L.description}/>
    <section className="directory-section"><div className="container"><form className="directory-search search-page-input" onSubmit={e => e.preventDefault()}><Search size={18}/><input value={query} onChange={e => setParams(e.target.value ? {q:e.target.value} : {})} placeholder="Try Minecraft, graphics, or vehicles..." aria-label="Search Modexa"/>{query && <button type="button" onClick={() => setParams({})}>Clear</button>}</form><div className="results-summary"><span>{query ? <>Results for <strong>“{query}”</strong></> : 'Start typing to discover mods'}</span><span>{results.length} {results.length === 1 ? 'result' : 'results'}</span></div><ModGrid mods={query ? results : []} savedIds={savedIds} onToggleSave={onToggleSave}/>{!query && <div className="search-suggestions"><span>Popular searches</span>{['Minecraft','Graphics','Vehicles','Gameplay'].map(q => <Link to={`/search?q=${q}`} key={q}>{q} ↗</Link>)}</div>}</div></section>
    <SeoContent data={L}/>
  </>
}