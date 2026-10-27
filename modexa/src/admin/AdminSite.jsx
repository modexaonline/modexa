import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { defaultSettings, setSettingsCache } from '../lib/useSettings'

export default function AdminSite({ onNotice, onError }) {
  const [f, setF] = useState(defaultSettings), [busy, setBusy] = useState(false), [loaded, setLoaded] = useState(false)
  useEffect(() => { supabase.from('site_settings').select('*').eq('id', 1).maybeSingle().then(({ data, error }) => { if (error) onError(error.message); else setF({ ...defaultSettings, ...(data || {}) }); setLoaded(true) }) }, [])
  const set = k => e => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  async function save(e) {
    e.preventDefault(); setBusy(true)
    const { id, updated_at, ...payload } = f
    const { error } = await supabase.from('site_settings').upsert({ id: 1, ...payload })
    setBusy(false)
    if (error) { onError(error.message); return }
    setSettingsCache({ ...payload }); onNotice('Site settings saved. Public site par turant update ho jayega.')
  }
  if (!loaded) return <div className="admin-empty"><p>Loading…</p></div>
  return <form className="admin-editor" onSubmit={save}>
    <div className="editor-heading"><div><small>SITE SETTINGS</small><h2>Brand, announcement & contact</h2></div></div>
    <div className="editor-fields">
      <div className="form-row"><label>Site name<input value={f.site_name} onChange={set('site_name')} maxLength={60}/></label><label>Contact email<input type="email" value={f.contact_email} onChange={set('contact_email')} placeholder="hello@modexa.online"/></label></div>
      <label>Footer tagline<input value={f.tagline} onChange={set('tagline')} maxLength={160}/></label>
      <div className="mod-specific-fields">
        <label className="inline-check"><input type="checkbox" checked={!!f.announcement_active} onChange={set('announcement_active')}/> Show announcement bar on top of the website</label>
        <label>Announcement text<input value={f.announcement} onChange={set('announcement')} maxLength={160} placeholder="New: Minecraft shader pack guide is live!"/></label>
        <label>Announcement link (optional)<input value={f.announcement_link} onChange={set('announcement_link')} placeholder="/blog or https://..."/></label>
      </div>
      <div className="form-row"><label>X / Twitter URL<input value={f.twitter_url} onChange={set('twitter_url')} placeholder="https://x.com/..."/></label><label>YouTube URL<input value={f.youtube_url} onChange={set('youtube_url')} placeholder="https://youtube.com/..."/></label></div>
      <label>Discord invite URL<input value={f.discord_url} onChange={set('discord_url')} placeholder="https://discord.gg/..."/></label>
      <button className="admin-primary" disabled={busy}><Save size={16}/>{busy ? 'Saving…' : 'Save settings'}</button>
    </div>
  </form>
}
