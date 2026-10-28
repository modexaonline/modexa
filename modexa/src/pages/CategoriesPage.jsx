import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Layers3 } from 'lucide-react'
import SEO from '../components/SEO'
import SeoContent from '../components/SeoContent'
import Breadcrumbs from '../components/Breadcrumbs'
import SafeImg from '../components/SafeImg'
import { usePageContent } from '../lib/siteContent'
import { LISTING, gameContent, categoryContent } from '../content/seo'

import PageHero from '../components/PageHero'
import ModGrid from '../components/ModGrid'
import { categories } from '../data/mods'
import useModsData from '../lib/useMods'
import { supabaseConfigured } from '../lib/supabase'

export default function CategoriesPage({ savedIds, onToggleSave }) {
  const L = usePageContent('listing:categories', LISTING.categories)
  const mods = useModsData()
  const { slug } = useParams()
  const categoryOptions = supabaseConfigured ? [...new Set(mods.map(m => m.category).filter(Boolean))] : categories
  const category = slug ? categoryOptions.find(c => c.toLowerCase().replaceAll(' & ','-').replaceAll(' ','-') === slug) : null
  if (slug) return <>
    <SEO fullTitle={category ? `${category} Mods — Browse by Category | Modexa` : 'Category not found | Modexa'} noindex={!category} description={`Browse ${category || ''} mods on Modexa: compare games, versions and platforms, then download from the creator’s original page.`} pageType="CollectionPage" breadcrumbs={[{label:'Home',to:'/'},{label:'Categories',to:'/categories'},{label:category || 'Category'}]}/>
    <div className="container directory-section"><Breadcrumbs items={[{label:'Home',to:'/'},{label:'Categories',to:'/categories'},{label:category || 'Not found'}]}/>{category ? <><div className="section-heading category-detail-heading"><div><div className="eyebrow">EXPLORE A CATEGORY</div><h1>{category}</h1><p>Browse published mods in this category with version and platform details.</p></div></div><ModGrid mods={mods.filter(m => m.category === category)} savedIds={savedIds} onToggleSave={onToggleSave}/><SeoContent data={categoryContent(category, mods.filter(m => m.category === category).length)}/></> : <div className="empty-state"><h2>Category not found</h2><Link to="/categories" className="button button-primary">All categories</Link></div>}</div>
  </>
  return <>
    <SEO fullTitle={L.seoTitle} description={L.description} pageType="CollectionPage" breadcrumbs={[{label:'Home',to:'/'},{label:'Categories',to:'/categories'}]} faqs={L.faqs}/>
    <PageHero eyebrow="FIND YOUR KIND OF MOD" title={<>A category for every <span className="text-gradient">play style.</span></>} description={L.description}/>
    <section className="directory-section"><div className="container"><div className="category-grid categories-directory">{categoryOptions.map((c,i) => <Link key={c} to={`/categories/${c.toLowerCase().replaceAll(' & ','-').replaceAll(' ','-')}`} className="category-card category-card-large"><span className={`category-symbol symbol-${i}`}><Layers3 size={23}/></span><span><span className="category-title">{c}</span><small>{mods.filter(m => m.category === c).length} listings</small></span><ArrowUpRight className="category-arrow" size={18}/></Link>)}</div></div></section>
    <SeoContent data={L}/>
  </>
}