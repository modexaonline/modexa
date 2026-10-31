import { useEffect, useRef, useState } from 'react'
import { Save, Upload, Download, RotateCcw, ExternalLink, FileCode, Info, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './admin-extra.css'

const MAX = 500 * 1024
const CFG = {
  robots_txt: { title: 'robots.txt', url: '/robots.txt', def: '/robots.default.txt', accept: '.txt,text/plain', ph: 'User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: https://yourdomain.com/sitemap.xml' },
  sitemap_xml: { title: 'sitemap.xml', url: '/sitemap.xml', def: '/sitemap.default.xml', accept: '.xml,text/xml,application/xml', ph: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://yourdomain.com/</loc></url>\n</urlset>' }
}

function validate(col, text) {
  const t = text.trim()
  if (!t) return ''
  if (new Blob([text]).size > MAX) return 'File is too large (max 500 KB).'
  if (col === 'robots_txt') {
    if (/<\s*(html|body|script)/i.test(t)) return 'This looks like HTML, not a robots.txt file.'
    if (!/^\s*(user-agent|sitemap|#)/im.test(t)) return 'robots.txt should contain at least one "User-agent:" line.'
    return ''
  }
  const doc = new DOMParser().parseFromString(t, 'application/xml')
  if (doc.querySelector('parsererror')) return 'The XML is not valid. Check for missing or unclosed tags.'
  const root = doc.documentElement.nodeName
  if (root !== 'urlset' && root !== 'sitemapindex') return 'Sitemap must start with <urlset> (or <sitemapindex>).'
  return ''
}

function Editor({ col, saved, onSaved, onNotice, onError }) {
  const c = CFG[col], [text, setText] = useState(saved || ''), [busy, setBusy] = useState(false), file = useRef(null)
  useEffect(() => setText(saved || ''), [saved])
  const custom = Boolean((saved || '').trim()), dirty = text !== (saved || '')
  async function persist(value, msg) {
    const bad = validate(col, value); if (bad) return onError(bad)
    setBusy(true)
    const { error } = await supabase.from('site_settings').update({ [col]: value }).eq('id', 1)
    setBusy(false)
    if (error) return onError(/column|schema/i.test(error.message) ? 'Database is missing the new columns. Run supabase/v11_seo_files.sql in Supabase first.' : error.message)
    onSaved(value); onNotice(msg)
  }
  function upload(e) {
    const f = e.target.files?.[0]; e.target.value = ''; if (!f) return
    if (f.size > MAX) return onError('File is too large (max 500 KB).')
    const r = new FileReader(); r.onload = () => { setText(String(r.result || '')); onNotice(`${f.name} loaded into the editor. Review it, then press Save.`) }; r.readAsText(f)
  }
  async function loadDefault() {
    try { const r = await fetch(c.def, { cache: 'no-store' }); if (!r.ok) throw 0; setText(await r.text()); onNotice('Auto-generated version loaded into the editor. Edit it, then press Save.') }
    catch { onError('The auto-generated file is only available on the deployed site after a build.') }
  }
  function download() {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' })); a.download = c.title; a.click(); URL.revokeObjectURL(a.href)
  }
  return <section className="adm-card" style={{ display: 'grid', gap: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
      <div><h3 style={{ margin: 0, display: 'flex', gap: 8, alignItems: 'center' }}><FileCode size={18}/> {c.title}</h3>
        <p className="adm-sub" style={{ margin: '4px 0 0' }}>{custom ? 'A custom file is live. It replaces the auto-generated one.' : 'Using the auto-generated file from the last build. Save text below to override it.'}</p></div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{custom && <span className="adm-pill green"><CheckCircle2 size={13}/> Custom</span>}<a className="adm-btn sm" href={c.url} target="_blank" rel="noreferrer"><ExternalLink size={14}/> View live</a></div>
    </div>
    <textarea rows={14} spellCheck={false} value={text} onChange={e => setText(e.target.value)} placeholder={c.ph} style={{ fontFamily: 'ui-monospace,Menlo,Consolas,monospace', fontSize: 13, width: '100%' }}/>
    <div className="adm-actions" style={{ flexWrap: 'wrap' }}>
      <button type="button" className="adm-btn primary" disabled={busy || !dirty} onClick={() => persist(text, `${c.title} saved. It is live now (CDN may take up to 5 minutes to refresh).`)}><Save size={15}/> {busy ? 'Saving…' : `Save ${c.title}`}</button>
      <button type="button" className="adm-btn" onClick={() => file.current?.click()}><Upload size={15}/> Upload file</button>
      <input ref={file} type="file" accept={c.accept} hidden onChange={upload}/>
      <button type="button" className="adm-btn" onClick={loadDefault}>Load auto-generated</button>
      <button type="button" className="adm-btn" onClick={download} disabled={!text.trim()}><Download size={15}/> Download</button>
      {custom && <button type="button" className="adm-btn danger" disabled={busy} onClick={() => { if (confirm(`Delete the custom ${c.title} and go back to the auto-generated one?`)) persist('', `Custom ${c.title} deleted. The auto-generated file is live again.`) }}><RotateCcw size={15}/> Delete custom file</button>}
    </div>
  </section>
}

export default function AdminSeoFiles({ onNotice, onError }) {
  const [v, setV] = useState({ robots_txt: '', sitemap_xml: '' }), [loaded, setLoaded] = useState(false)
  useEffect(() => { supabase.from('site_settings').select('robots_txt,sitemap_xml').eq('id', 1).maybeSingle().then(({ data, error }) => { if (data) setV({ robots_txt: data.robots_txt || '', sitemap_xml: data.sitemap_xml || '' }); else if (error && !/column|schema/i.test(error.message)) onError(error.message); else if (error) onError('Run supabase/v11_seo_files.sql in Supabase first, then reload.'); setLoaded(true) }) }, [])
  if (!loaded) return <div className="admin-empty"><p>Loading…</p></div>
  return <div className="adm">
    <div className="adm-head"><div><h2>Robots.txt & Sitemap</h2><p>Edit, upload or delete the files search engines read. Changes go live without a redeploy.</p></div></div>
    <Editor col="robots_txt" saved={v.robots_txt} onSaved={x => setV(p => ({ ...p, robots_txt: x }))} onNotice={onNotice} onError={onError}/>
    <Editor col="sitemap_xml" saved={v.sitemap_xml} onSaved={x => setV(p => ({ ...p, sitemap_xml: x }))} onNotice={onNotice} onError={onError}/>
    <div className="adm-alert info"><Info size={16} style={{ flex: 'none', marginTop: 2 }}/><div>Deleting a custom file switches back to the one generated automatically at every deploy. A custom sitemap does not update itself when you publish new posts, so delete it (or re-upload) to get the automatic one back. After changing the sitemap, resubmit it in Google Search Console.</div></div>
  </div>
}
