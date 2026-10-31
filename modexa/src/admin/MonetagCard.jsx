import { useEffect, useState } from 'react'
import { Save, Info, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { setSettingsCache } from '../lib/useSettings'
import { Switch } from './fields'
import './admin-extra.css'

// Paste the tag Monetag gives you ("Insert code" / site verification / Multitag). It is loaded in <head> on every public page.
export default function MonetagCard({ onNotice, onError }) {
  const [code, setCode] = useState(''), [on, setOn] = useState(true), [saved, setSaved] = useState(''), [busy, setBusy] = useState(false)
  useEffect(() => { supabase.from('site_settings').select('monetag_code,monetag_enabled').eq('id', 1).maybeSingle().then(({ data }) => { if (data) { setCode(data.monetag_code || ''); setSaved(data.monetag_code || ''); setOn(data.monetag_enabled !== false) } }) }, [])
  async function save(patch = {}) {
    const next = { monetag_code: code.trim(), monetag_enabled: on, ...patch }
    if (next.monetag_code.length > 20000) return onError('Code is too long (max 20,000 characters).')
    if (next.monetag_code && !/<script[\s>]|<meta[\s>]/i.test(next.monetag_code)) return onError('This does not look like Monetag code. Paste the full <script …> tag exactly as Monetag shows it.')
    setBusy(true)
    const { error } = await supabase.from('site_settings').update(next).eq('id', 1)
    setBusy(false)
    if (error) return onError(error.message)
    setSaved(next.monetag_code); setOn(next.monetag_enabled); setSettingsCache(next); onNotice(next.monetag_code ? 'Monetag code saved, it is now live on every page.' : 'Monetag code removed.')
  }
  return <section className="adm-card" style={{ display: 'grid', gap: 12 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
      <div><h3 style={{ margin: 0 }}>Monetag, insert code</h3><p className="adm-sub" style={{ margin: '4px 0 0' }}>Paste the code from Monetag once. It is added to your whole site automatically; Monetag then places the ads itself.</p></div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{saved && on && <span className="adm-pill green"><CheckCircle2 size={13}/> Live</span>}<Switch checked={on} onChange={v => { setOn(v); if (saved) save({ monetag_enabled: v }) }} label="Monetag enabled"/></div>
    </div>
    <label className="adm-field"><span>Monetag code</span><textarea rows={6} spellCheck={false} value={code} onChange={e => setCode(e.target.value)} placeholder={'<script src="https://…" data-zone="…" async></script>'} style={{ fontFamily: 'ui-monospace,Menlo,Consolas,monospace', fontSize: 13 }}/></label>
    <div className="adm-actions"><button type="button" className="adm-btn primary" disabled={busy} onClick={() => save()}><Save size={15}/> {busy ? 'Saving…' : 'Save Monetag code'}</button>{saved && <button type="button" className="adm-btn danger" disabled={busy} onClick={() => { setCode(''); save({ monetag_code: '' }) }}>Remove code</button>}</div>
    <div className="adm-alert info"><Info size={16} style={{ flex: 'none', marginTop: 2 }}/><div>Works on its own, it does not need the other ads below. If “Load ads only after the visitor accepts cookies” is ON (Site &amp; brand settings), the code loads after the visitor accepts. Turn that off if Monetag needs to verify your site. Test in a private window with ad-blockers off.</div></div>
  </section>
}
