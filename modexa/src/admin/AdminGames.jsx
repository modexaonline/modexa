import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, X, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { refreshGames } from '../lib/useGames'
import { ImageField, Switch, slugify } from './fields'
import './admin-extra.css'

const BLANK = { name: '', slug: '', description: '', image: '', platform: 'PC', blog_slug: '', sort_order: 0, show_on_home: true, status: 'published' }

export default function AdminGames({ onNotice, onError }) {
  const [games, setGames] = useState([]), [posts, setPosts] = useState([]), [loading, setLoading] = useState(true), [editing, setEditing] = useState(null), [busy, setBusy] = useState(false)
  async function load() {
    setLoading(true)
    const [g, p] = await Promise.all([supabase.from('games').select('*').order('sort_order'), supabase.from('posts').select('slug,title,game_slug,status').order('created_at', { ascending: false }).limit(500)])
    setLoading(false)
    if (g.error) { onError(g.error.message); return }
    setGames(g.data || []); setPosts(p.data || [])
  }
  useEffect(() => { load() }, [])
  const set = patch => setEditing(e => ({ ...e, ...patch }))
  async function save(e) {
    e.preventDefault()
    if (!editing.name.trim()) return onError('Game name is required.')
    const { id, created_at, updated_at, ...payload } = editing
    payload.name = payload.name.trim(); payload.slug = slugify(payload.slug || payload.name); payload.sort_order = Number(payload.sort_order) || 0
    if (!payload.slug) return onError('Slug is required.')
    setBusy(true)
    const { error } = id ? await supabase.from('games').update(payload).eq('id', id) : await supabase.from('games').insert({ ...payload, sort_order: payload.sort_order || (games.length + 1) })
    setBusy(false)
    if (error) return onError(/duplicate key/i.test(error.message) ? 'A game with this slug already exists.' : error.message)
    onNotice(id ? 'Game updated.' : 'Game added.'); setEditing(null); refreshGames(); load()
  }
  async function remove(g) { if (!confirm(`Delete “${g.name}”? Its blog posts stay, they just lose the game link.`)) return; const { error } = await supabase.from('games').delete().eq('id', g.id); if (error) return onError(error.message); onNotice('Game deleted.'); refreshGames(); load() }
  async function move(i, d) {
    const j = i + d; if (j < 0 || j >= games.length) return
    const a = games[i], b = games[j]
    const r = await Promise.all([supabase.from('games').update({ sort_order: j + 1 }).eq('id', a.id), supabase.from('games').update({ sort_order: i + 1 }).eq('id', b.id)])
    if (r.some(x => x.error)) return onError(r.find(x => x.error).error.message)
    refreshGames(); load()
  }
  async function patch(g, p) { const { error } = await supabase.from('games').update(p).eq('id', g.id); if (error) return onError(error.message); refreshGames(); load() }

  if (editing) {
    const own = posts.filter(p => p.game_slug === (slugify(editing.slug || editing.name)))
    return <form className="adm" onSubmit={save}>
      <div className="adm-head"><div><h2>{editing.id ? `Edit ${editing.name}` : 'Add a game'}</h2><p>Games appear in the “Browse by game” container on the home page. Clicking a game opens its blog.</p></div><button type="button" className="adm-btn" onClick={() => setEditing(null)}><X size={15}/> Close</button></div>
      <section className="adm-card adm">
        <div className="adm-grid2"><label className="adm-field"><span>Game name *</span><input required value={editing.name} maxLength={120} onChange={e => set({ name: e.target.value, slug: editing.id ? editing.slug : slugify(e.target.value) })}/></label><label className="adm-field"><span>URL slug</span><input value={editing.slug} onChange={e => set({ slug: slugify(e.target.value) })}/><span className="adm-hint">/games/{editing.slug || 'slug'}</span></label></div>
        <ImageField label="Cover image (shown on the home card)" value={editing.image} onChange={v => set({ image: v })} onError={onError} hint="Landscape image, at least 900px wide."/>
        <label className="adm-field"><span>Short description</span><textarea value={editing.description} onChange={e => set({ description: e.target.value })} placeholder="One or two sentences for the game hub page and search results."/></label>
        <div className="adm-grid2">
          <label className="adm-field"><span>Opens this blog when clicked</span><select value={editing.blog_slug} onChange={e => set({ blog_slug: e.target.value })}><option value="">Automatic — newest guide linked to this game</option>{posts.map(p => <option key={p.slug} value={p.slug}>{p.title}{p.status !== 'published' ? ' (draft)' : ''}</option>)}</select><span className="adm-hint">If no blog exists yet the card opens the game hub page.</span></label>
          <label className="adm-field"><span>Platform label</span><input value={editing.platform} onChange={e => set({ platform: e.target.value })}/></label>
        </div>
        <div className="adm-grid3">
          <label className="adm-field"><span>Order</span><input type="number" value={editing.sort_order} onChange={e => set({ sort_order: e.target.value })}/></label>
          <label className="adm-field"><span>Status</span><select value={editing.status} onChange={e => set({ status: e.target.value })}><option value="published">Published</option><option value="draft">Draft (hidden)</option></select></label>
          <label className="adm-check" style={{ alignSelf: 'end', minHeight: 42 }}><input type="checkbox" checked={editing.show_on_home} onChange={e => set({ show_on_home: e.target.checked })}/> Show on home page</label>
        </div>
        {editing.id && <div className="adm-alert info"><div><b>{own.length}</b> blog post{own.length === 1 ? '' : 's'} linked to this game. To link a post, open it in Blog posts and choose this game.</div></div>}
        <div className="adm-actions"><button className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : 'Save game'}</button><button type="button" className="adm-btn" onClick={() => setEditing(null)}>Cancel</button></div>
      </section>
    </form>
  }
  return <div className="adm">
    <div className="adm-head"><div><h2>Games</h2><p>These cards power the home page “Browse by game” container and the Games page. Choose which blog each game opens.</p></div><button className="adm-btn primary" onClick={() => setEditing({ ...BLANK, sort_order: games.length + 1 })}><Plus size={16}/> Add game</button></div>
    <section className="adm-card" style={{ padding: 0 }}>
      {loading ? <p style={{ padding: 24, color: '#6b7280' }}>Loading…</p> : games.length === 0 ? <p style={{ padding: 32, textAlign: 'center', color: '#4b5563' }}>No games yet.</p> :
        <div className="adm-scroll"><table className="adm-table"><thead><tr><th>Order</th><th>Game</th><th>Opens</th><th>On home</th><th>Status</th><th>Actions</th></tr></thead><tbody>{games.map((g, i) => {
          const opens = g.blog_slug ? posts.find(p => p.slug === g.blog_slug) : posts.find(p => p.game_slug === g.slug && p.status === 'published')
          return <tr key={g.id}>
            <td><div className="adm-actions"><button className="adm-btn sm" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp size={14}/></button><button className="adm-btn sm" disabled={i === games.length - 1} onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown size={14}/></button></div></td>
            <td><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{g.image ? <img className="adm-thumb" src={g.image} alt=""/> : <span className="adm-thumb"/>}<div className="adm-name"><b>{g.name}</b><small>/games/{g.slug}</small></div></div></td>
            <td>{opens ? <span className="adm-pill green">Blog: {opens.title.slice(0, 32)}{opens.title.length > 32 ? '…' : ''}</span> : <span className="adm-pill amber">Game page (no blog yet)</span>}</td>
            <td><Switch checked={g.show_on_home} onChange={v => patch(g, { show_on_home: v })} label="Show on home"/></td>
            <td><span className={`adm-pill ${g.status === 'published' ? 'green' : ''}`}>{g.status}</span></td>
            <td><div className="adm-actions"><button className="adm-btn sm" onClick={() => setEditing({ ...BLANK, ...g })} title="Edit"><Pencil size={14}/></button><a className="adm-btn sm" href={`/games/${g.slug}`} target="_blank" rel="noopener noreferrer" title="View"><ExternalLink size={14}/></a><button className="adm-btn sm" onClick={() => patch(g, { status: g.status === 'published' ? 'draft' : 'published' })} title={g.status === 'published' ? 'Hide' : 'Publish'}>{g.status === 'published' ? <EyeOff size={14}/> : <Eye size={14}/>}</button><button className="adm-btn sm danger" onClick={() => remove(g)} title="Delete"><Trash2 size={14}/></button></div></td>
          </tr>
        })}</tbody></table></div>}
    </section>
  </div>
}
