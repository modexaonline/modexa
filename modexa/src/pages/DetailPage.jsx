import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Bookmark, Check, Download, ExternalLink, Info, ShieldCheck, CalendarDays, UserRound, Monitor, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'
import ModCard from '../components/ModCard'
import { formatCount } from '../data/mods'
import { useModsState } from '../lib/useMods'
import { useState } from 'react'
import SafeImg from '../components/SafeImg'
import ShareButton from '../components/ShareButton'
import { PageSkeleton } from '../components/Skeleton'
import { supabase, supabaseConfigured } from '../lib/supabase'

export default function DetailPage({ savedIds, onToggleSave }) {
  const { items: mods, loading } = useModsState()
  const { slug } = useParams()
  const mod = mods.find(m => m.slug === slug)
  const [activeTab, setActiveTab] = useState('overview')
  if (loading && !mod) return <PageSkeleton/>
  if (!mod) return <div className="container not-found-inline"><h1>Mod not found</h1><p>This listing may have moved or no longer exists.</p><Link className="button button-primary" to="/mods">Browse mods</Link></div>
  const related = mods.filter(m => m.id !== mod.id && (m.game === mod.game || m.category === mod.category)).slice(0,3)
  const saved = savedIds.includes(mod.id)
  const trackDownload = () => {
    if (!supabaseConfigured) return
    try { const key = `modexa-dl-${mod.slug}`; if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1') } catch {}
    supabase.rpc('increment_mod_downloads', { p_slug: mod.slug }).then(() => {})
  }
  const jsonLd = [
    { '@type': 'SoftwareApplication', name: mod.title, applicationCategory: 'GameApplication', operatingSystem: mod.platform, description: mod.short || mod.description, image: mod.image || undefined, softwareVersion: mod.version, datePublished: mod.updated || undefined, author: { '@type': 'Person', name: mod.creator }, isBasedOn: mod.game ? { '@type': 'VideoGame', name: mod.game } : undefined, url: mod.downloadUrl || undefined },
    ...(mod.install?.length ? [{ '@type': 'HowTo', name: `How to install ${mod.title}`, step: mod.install.map((t, n) => ({ '@type': 'HowToStep', position: n + 1, text: String(t) })) }] : []),
  ]
  return <>
    <SEO fullTitle={mod.seo_title ? `${mod.seo_title} | Modexa` : `${mod.title} — ${mod.game} Mod (${mod.platform}) | Modexa`} description={mod.seo_description || `${mod.short} Check features, requirements, version ${mod.version} and install notes, then download from the creator’s original page.`} noindex={mod.noindex} canonical={mod.canonical_url} image={mod.image} type="article" pageType="ItemPage" modified={mod.updated} breadcrumbs={[{label:'Home',to:'/'},{label:'Mods',to:'/mods'},{label:mod.title}]} jsonLd={jsonLd}/>
    <div className="detail-page container">
      <div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={14}/><Link to="/mods">Mods</Link><ChevronRight size={14}/><span>{mod.title}</span></div>
      <Link to="/mods" className="back-link"><ArrowLeft size={16}/> Back to mods</Link>
      <div className="detail-hero">
        <div className="detail-art"><SafeImg src={mod.image} alt={`${mod.title} preview`} /><span className="detail-art-overlay"/><span className="detail-art-tag">{mod.category}</span></div>
        <div className="detail-summary">
          <div className="eyebrow"><span className="eyebrow-line"/> MOD PROFILE</div>
          <h1>{mod.title}</h1>
          <p className="detail-lead">{mod.short}</p>
          <div className="detail-game-line"><span className="game-mini-icon"><Monitor size={16}/></span><span>For <strong>{mod.game}</strong></span><span className="meta-dot">·</span><span>{mod.platform}</span></div>
          <div className="detail-stats"><div><Download size={16}/><span><b>{formatCount(mod.downloads)}</b><small>Downloads</small></span></div><div><CalendarDays size={16}/><span><b>{mod.updated}</b><small>Updated</small></span></div><div><UserRound size={16}/><span><b>{mod.creator}</b><small>Creator</small></span></div></div>
          <div className="detail-actions"><ShareButton title={mod.title} text={mod.short}/><button className={`button ${saved ? 'button-saved' : 'button-primary'}`} onClick={() => onToggleSave(mod.id)}>{saved ? <Check size={17}/> : <Bookmark size={17}/>} {saved ? 'Saved to library' : 'Save this mod'}</button><a className="button button-outline" href="#download-info">Download info <ArrowUpRight size={16}/></a></div>
          <p className="demo-warning"><Info size={15}/> {mod.downloadUrl ? "Opens the creator’s external source. Check permissions and compatibility before installing." : "No verified source has been added to this listing yet."}</p>
        </div>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-tabs" role="tablist" aria-label="Mod information">{[['overview','Overview'],['features','Features'],['install','Installation'],['requirements','Requirements']].map(([id,label]) => <button role="tab" aria-selected={activeTab === id} className={activeTab === id ? 'active' : ''} key={id} onClick={() => setActiveTab(id)}>{label}</button>)}</div>
          <section className="detail-content">
            {activeTab === 'overview' && <><h2>About this mod</h2><p>{mod.description}</p><h3>At a glance</h3><div className="info-grid"><div><span>Game</span><strong>{mod.game}</strong></div><div><span>Category</span><strong>{mod.category}</strong></div><div><span>Version</span><strong>{mod.version}</strong></div><div><span>Platform</span><strong>{mod.platform}</strong></div></div></>}
            {activeTab === 'features' && <><h2>What to know</h2><p>Review the original creator's listing to confirm exact features before installing.</p><ul className="feature-list">{mod.features.map(f => <li key={f}><Check size={16}/>{f}</li>)}</ul></>}
            {activeTab === 'install' && <><h2>Installation guidance</h2><p>These general safety steps are provided for the demo. Always follow the original creator's specific instructions.</p><ol className="install-list">{mod.install.map(s => <li key={s}>{s}</li>)}</ol></>}
            {activeTab === 'requirements' && <><h2>Requirements & compatibility</h2><ul className="feature-list">{mod.requirements.map(r => <li key={r}><Info size={16}/>{r}</li>)}</ul><div className="notice-box"><ShieldCheck size={19}/><p>Compatibility has not been independently verified for this demo listing. Confirm the exact game version, dependencies, and license with the original source.</p></div></>}
          </section>
          <section className="download-info-box" id="download-info"><div className="download-info-icon"><Info size={22}/></div><div><h3>{mod.downloadUrl ? "Official source & download" : "Download source not configured"}</h3><p>{mod.downloadUrl ? "You are leaving Modexa for the source supplied by the listing editor. Confirm the URL, game version, license and permissions before downloading." : "The editor has not added a verified creator URL yet. Modexa does not provide a file for this listing until an authorized source is configured."}</p>{mod.downloadUrl && <a className="button button-primary" href={mod.downloadUrl} target="_blank" rel="noopener noreferrer nofollow" onClick={trackDownload}>Visit creator source <ExternalLink size={16}/></a>}</div></section>
        </div>
        <aside className="detail-sidebar"><div className="sidebar-panel"><h3>Listing details</h3><div className="sidebar-row"><span>Creator</span><strong>{mod.creator}</strong></div><div className="sidebar-row"><span>Version</span><strong>{mod.version}</strong></div><div className="sidebar-row"><span>Updated</span><strong>{mod.updated}</strong></div><div className="sidebar-row"><span>Platform</span><strong>{mod.platform}</strong></div><div className="sidebar-row"><span>Category</span><strong>{mod.category}</strong></div><div className="verified-note"><ShieldCheck size={17}/><span>Check original source before installing</span></div></div><div className="sidebar-panel creator-panel"><span className="creator-avatar"><UserRound size={22}/></span><h3>Support creators</h3><p>Follow original creator links, review licenses, and give credit where it is due.</p><Link to="/guidelines" className="text-link">Read our guidelines <ArrowUpRight size={15}/></Link></div></aside>
      </div>
      {related.length > 0 && <section className="related-section"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> KEEP EXPLORING</div><h2>Related <span className="text-gradient">mods</span></h2></div><Link to="/mods" className="text-link">View all <ArrowUpRight size={16}/></Link></div><div className="mods-grid">{related.map(m => <ModCard key={m.id} mod={m} saved={savedIds.includes(m.id)} onToggleSave={onToggleSave}/>)}</div></section>}
      {!supabaseConfigured && <p className="micro-disclaimer">*Demo mode: engagement counts are illustrative sample data.</p>}
    </div>
  </>
}