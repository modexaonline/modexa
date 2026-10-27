import {useEffect,useMemo,useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import {ArrowRight,Clock3,BookOpen,ChevronRight,AlertCircle,Search} from 'lucide-react'
import {supabase,supabaseConfigured} from '../lib/supabase'
import SEO from '../components/SEO'
import SafeImg from '../components/SafeImg'
import ShareButton from '../components/ShareButton'
import Markdown,{extractHeadings,headingId} from '../components/Markdown'
import {CardSkeletons,PageSkeleton} from '../components/Skeleton'
import {readingTime} from '../lib/format'
import SeoContent from '../components/SeoContent'
import {LISTING} from '../content/seo'
const fallback=[{id:'demo1',title:'A safer way to explore game mods',slug:'safer-game-mods',excerpt:'A practical checklist for checking sources, permissions, compatibility, and backups before installing a mod.',category:'Guides',cover_image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85',published_at:'2026-10-18',status:'published',seo_title:'A Safer Way to Explore Game Mods | Modexa',seo_description:'Learn how to check mod sources, compatibility, permissions and backups before installing game modifications.',content:'## Start with the original creator\nPrefer a creator page or a trusted community source with clear documentation. Be cautious of pages that hide who made the file or push unrelated downloads.\n\n## Check compatibility\nConfirm your game version, platform, dependencies, and installation instructions. Back up saves before making changes.\n\n## Make an informed choice\nReview permissions, read recent feedback, and respect the creator’s licence. No third-party file can be guaranteed risk-free.'},{id:'demo2',title:'The mod compatibility checklist',slug:'mod-compatibility-checklist',excerpt:'A few quick checks can prevent frustrating installation problems and protect your save files.',category:'How-to',cover_image:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=85',published_at:'2026-10-12',status:'published',seo_title:'Mod Compatibility Checklist | Modexa',seo_description:'Check versions, dependencies, backups and source quality before you install a game mod.',content:'## Match your version\nCheck which game release and platform the creator supports.\n\n## Read the instructions\nSome mods need a loader or another dependency. Follow the stated order and check for known conflicts.\n\n## Back up first\nKeep a safe copy of saves and settings so you can reverse changes if something goes wrong.'}]
function useContent(table){
  const [state,setState]=useState({items:supabaseConfigured?[]:fallback,loading:supabaseConfigured})
  useEffect(()=>{
    if(!supabaseConfigured)return
    let alive=true
    supabase.from(table).select('*').eq('status','published').order('published_at',{ascending:false}).then(({data,error})=>{if(alive)setState({items:error?[]:(data||[]),loading:false})})
    return()=>{alive=false}
  },[table])
  return state
}
function Intro({title,description}){return <section className="page-hero"><div className="container"><div className="eyebrow"><span className="eyebrow-line"/> THE MODEXA JOURNAL</div><h1>{title}</h1><p>{description}</p></div></section>}

export function BlogIndex(){
  const {items:posts,loading}=useContent('posts')
  const [q,setQ]=useState(''),[cat,setCat]=useState('All')
  const cats=useMemo(()=>['All',...new Set(posts.map(p=>p.category).filter(Boolean))],[posts])
  const shown=posts.filter(p=>(cat==='All'||p.category===cat)&&(!q.trim()||[p.title,p.excerpt,p.category].join(' ').toLowerCase().includes(q.toLowerCase())))
  return <><SEO fullTitle={LISTING.blog.seoTitle} description={LISTING.blog.description} pageType="CollectionPage" breadcrumbs={[{label:'Home',to:'/'},{label:'Guides & Blog',to:'/blog'}]}/>
  <Intro title={<>Useful reads. <span className="text-gradient">Less guesswork.</span></>} description={LISTING.blog.description}/>
  <section className="section-block"><div className="container">
    <div className="blog-toolbar"><div className="directory-search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search articles..." aria-label="Search articles"/></div><div className="chip-row" role="tablist">{cats.map(c=><button key={c} role="tab" aria-selected={cat===c} className={`chip ${cat===c?'active':''}`} onClick={()=>setCat(c)}>{c}</button>)}</div></div>
    {loading?<CardSkeletons/>:shown.length===0?<div className="empty-state"><h3>No articles yet</h3><p>Try a different search or check back soon.</p></div>:<div className="blog-list-grid">{shown.map(p=><article className="blog-list-card" key={p.id}><Link to={`/blog/${p.slug}`} className="blog-list-image"><SafeImg src={p.cover_image} loading="lazy"/></Link><div className="blog-list-content"><div className="blog-list-meta"><span>{p.category||'Guide'}</span><span><Clock3 size={13}/>{readingTime(p.content)} min read</span></div><Link to={`/blog/${p.slug}`}><h2>{p.title}</h2></Link><p>{p.excerpt||p.seo_description}</p><Link className="text-link" to={`/blog/${p.slug}`}>Read article <ArrowRight size={15}/></Link></div></article>)}</div>}
    {!supabaseConfigured&&<div className="demo-note"><AlertCircle size={15}/> Demo articles are shown until Supabase is connected.</div>}
  </div></section><SeoContent data={LISTING.blog}/></>
}

export function BlogDetail(){
  const {slug}=useParams(),{items:posts,loading}=useContent('posts'),post=posts.find(p=>p.slug===slug)
  if(loading)return <PageSkeleton/>
  if(!post)return <div className="container not-found-page"><BookOpen size={30}/><h1>Article not found</h1><p>This article may be unpublished or the link may have changed.</p><Link className="button button-primary" to="/blog">Back to guides</Link></div>
  const headings=extractHeadings(post.content),related=posts.filter(p=>p.id!==post.id).slice(0,3)
  const jsonLd={'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.excerpt||post.seo_description,image:post.cover_image||undefined,datePublished:post.published_at||undefined,dateModified:post.updated_at||post.published_at||undefined,author:{'@type':'Organization',name:'Modexa'}}
  return <><SEO title={post.seo_title||post.title} description={post.seo_description||post.excerpt} noindex={post.noindex} canonical={post.canonical_url} image={post.cover_image} type="article" jsonLd={jsonLd}/>
  <article className="container blog-article">
    <div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={14}/><Link to="/blog">Guides & blog</Link><ChevronRight size={14}/><span>{post.title}</span></div>
    <div className="blog-article-head"><span>{post.category||'Guide'}</span><h1>{post.title}</h1><p>{post.excerpt||post.seo_description}</p><small>MODEXA EDITORIAL · {post.published_at||'Recently published'} · {readingTime(post.content)} MIN READ</small><div className="article-actions"><ShareButton title={post.title} text={post.excerpt}/></div></div>
    {post.cover_image&&<SafeImg className="blog-article-cover" src={post.cover_image}/>}
    {headings.length>2&&<nav className="article-toc" aria-label="On this page"><b>On this page</b>{headings.map(h=><a key={h} href={`#${headingId(h)}`}>{h}</a>)}</nav>}
    <div className="blog-article-body"><Markdown content={post.content}/></div>
    <div className="article-safety-note"><AlertCircle size={18}/><p>Always check the original source, compatibility and permissions before installing third-party files. Respect creators and their licences.</p></div>
    {related.length>0&&<section className="related-posts"><h2>Keep reading</h2><div className="blog-list-grid">{related.map(p=><article className="blog-list-card" key={p.id}><Link to={`/blog/${p.slug}`} className="blog-list-image"><SafeImg src={p.cover_image} loading="lazy"/></Link><div className="blog-list-content"><div className="blog-list-meta"><span>{p.category||'Guide'}</span></div><Link to={`/blog/${p.slug}`}><h2>{p.title}</h2></Link></div></article>)}</div></section>}
  </article></>
}

export function CustomPage(){
  const {slug}=useParams(),[page,setPage]=useState(null),[loading,setLoading]=useState(true)
  useEffect(()=>{setLoading(true);if(!supabaseConfigured){setLoading(false);return}let alive=true;supabase.from('pages').select('*').eq('slug',slug).eq('status','published').maybeSingle().then(({data})=>{if(alive){setPage(data);setLoading(false)}});return()=>{alive=false}},[slug])
  if(loading)return <PageSkeleton/>
  if(!page)return <div className="container not-found-page"><h1>Page not found</h1><p>This page may be unpublished or the URL may have changed.</p><Link className="button button-primary" to="/">Back home</Link></div>
  return <><SEO title={page.seo_title||page.title} description={page.seo_description||page.excerpt} noindex={page.noindex} canonical={page.canonical_url} image={page.cover_image}/><section className="page-hero"><div className="container"><div className="eyebrow"><span className="eyebrow-line"/> MODEXA</div><h1>{page.title}</h1><p>{page.excerpt}</p></div></section><article className="container blog-article-body custom-page-body"><Markdown content={page.content}/></article></>
}
