import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { defaultSettings, setSettingsCache } from '../lib/useSettings'
import { ImageField } from './fields'
import './admin-extra.css'

export default function AdminSite({ onNotice, onError }) {
  const [f, setF] = useState(defaultSettings), [busy, setBusy] = useState(false), [loaded, setLoaded] = useState(false)
  useEffect(() => { supabase.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data, error }) => { if (error) onError(error.message); else setF({ ...defaultSettings, ...(data || {}) }); setLoaded(true) }) }, [])
  const set = k => e => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  async function save(e) {
    e.preventDefault(); setBusy(true)
    const { id, updated_at, ...payload } = f
    const { error } = await supabase.from('site_settings').update(payload).eq('id', 1)
    setBusy(false)
    if (error) { onError(error.message); return }
    setSettingsCache({ ...payload }); onNotice('Site settings saved. Public site par turant update ho jayega.')
  }
  if (!loaded) return <div className="admin-empty"><p>Loading…</p></div>
  return <form className="adm" onSubmit={save}>
    <div className="adm-head"><div><h2>Site & brand</h2><p>Site name, logo, social links, announcement bar and contact details.</p></div><button className="adm-btn primary" disabled={busy}><Save size={15}/> {busy ? 'Saving…' : 'Save settings'}</button></div>
    <section className="adm-card"><h3>Brand</h3>
      <div className="adm-grid2"><label className="adm-field"><span>Site name</span><input value={f.site_name} onChange={set('site_name')} maxLength={60}/></label><label className="adm-field"><span>Contact email</span><input type="email" value={f.contact_email} onChange={set('contact_email')} placeholder="hello@modexa.online"/></label></div>
      <label className="adm-field" style={{ marginTop: 14 }}><span>Footer tagline</span><input value={f.tagline} onChange={set('tagline')} maxLength={160}/></label>
      <label className="adm-field" style={{ marginTop: 14 }}><span>Extra footer text (optional)</span><input value={f.footer_text} onChange={set('footer_text')} maxLength={240} placeholder="e.g. Company name, address or a short notice"/></label>
      <div className="adm-grid2" style={{ marginTop: 14 }}><ImageField label="Logo image (optional)" value={f.logo_url} onChange={v => setF({ ...f, logo_url: v })} onError={onError} hint="Square PNG/SVG works best. Empty = default icon."/><ImageField label="Default social-share image" value={f.default_og_image} onChange={v => setF({ ...f, default_og_image: v })} onError={onError} hint="1200×630 recommended."/></div></section>
    <section className="adm-card"><h3>Announcement bar</h3>
      <label className="adm-check"><input type="checkbox" checked={!!f.announcement_active} onChange={set('announcement_active')}/> Show announcement bar at the top of the website</label>
      <div className="adm-grid2" style={{ marginTop: 14 }}><label className="adm-field"><span>Text</span><input value={f.announcement} onChange={set('announcement')} maxLength={160} placeholder="New: Minecraft shader pack guide is live!"/></label><label className="adm-field"><span>Link (optional)</span><input value={f.announcement_link} onChange={set('announcement_link')} placeholder="/blog or https://…"/></label></div></section>
    <section className="adm-card"><h3>Social links</h3>
      <div className="adm-grid3"><label className="adm-field"><span>X / Twitter</span><input value={f.twitter_url} onChange={set('twitter_url')} placeholder="https://x.com/…"/></label><label className="adm-field"><span>YouTube</span><input value={f.youtube_url} onChange={set('youtube_url')} placeholder="https://youtube.com/…"/></label><label className="adm-field"><span>Discord</span><input value={f.discord_url} onChange={set('discord_url')} placeholder="https://discord.gg/…"/></label></div></section>
    <section className="adm-card"><h3>Advertising</h3><p className="adm-sub">Master switches. Create the ads themselves in <b>Ads manager</b>.</p>
      <label className="adm-check"><input type="checkbox" checked={!!f.ads_enabled} onChange={set('ads_enabled')}/> Show ads on the website</label>
      <label className="adm-check" style={{ marginTop: 10 }}><input type="checkbox" checked={!!f.ads_require_consent} onChange={set('ads_require_consent')}/> Load ads only after visitor accepts cookies (recommended)</label></section>
    <div className="adm-actions"><button className="adm-btn primary" disabled={busy}><Save size={15}/> {busy ? 'Saving…' : 'Save settings'}</button></div>
  </form>
}
