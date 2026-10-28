import { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, ArrowUp, ArrowDown, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './admin-extra.css'

export const slugify = v => String(v || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export function Switch({ checked, onChange, label }) {
  return <label className="adm-switch" title={label}><input type="checkbox" checked={!!checked} onChange={e => onChange(e.target.checked)} aria-label={label}/><span/></label>
}

// URL box + upload to the public `modexa-media` storage bucket.
export function ImageField({ label = 'Image', value, onChange, onError, hint }) {
  const file = useRef(null), [busy, setBusy] = useState(false)
  async function upload(e) {
    const f = e.target.files?.[0]; if (!f) return
    if (!/^image\//.test(f.type)) { onError?.('Please choose an image file.'); return }
    if (f.size > 5 * 1024 * 1024) { onError?.('Image must be 5 MB or smaller.'); return }
    setBusy(true)
    const path = `uploads/${Date.now()}-${slugify(f.name.replace(/\.[^.]+$/, '')) || 'image'}.${(f.name.split('.').pop() || 'png').toLowerCase()}`
    const { error } = await supabase.storage.from('modexa-media').upload(path, f, { cacheControl: '31536000', upsert: false, contentType: f.type })
    setBusy(false); e.target.value = ''
    if (error) { onError?.(error.message); return }
    onChange(supabase.storage.from('modexa-media').getPublicUrl(path).data.publicUrl)
  }
  return <div className="adm-field"><span>{label}</span>
    <div className="adm-imgfield"><div className="adm-imgrow"><input value={value || ''} onChange={e => onChange(e.target.value)} placeholder="https://… or upload"/><button type="button" className="adm-btn" onClick={() => file.current?.click()} disabled={busy}><Upload size={15}/>{busy ? 'Uploading…' : 'Upload'}</button><input ref={file} type="file" accept="image/*" hidden onChange={upload}/></div>
      {value ? <img className="adm-thumb" src={value} alt="" style={{ width: 120, height: 72 }}/> : <span className="adm-hint"><ImageIcon size={13}/> {hint || 'No image yet.'}</span>}</div></div>
}

export function Counter({ value = '', min, max }) {
  const n = String(value).length, ok = n >= min && n <= max
  return <span className={`adm-counter ${ok ? 'ok' : n > max ? 'bad' : ''}`}>{n} characters · best {min}–{max}</span>
}

export function Move({ i, n, onMove, onRemove, label = 'item' }) {
  return <div className="adm-actions">
    <button type="button" className="adm-btn sm" disabled={i === 0} onClick={() => onMove(i, -1)} aria-label={`Move ${label} up`}><ArrowUp size={14}/></button>
    <button type="button" className="adm-btn sm" disabled={i === n - 1} onClick={() => onMove(i, 1)} aria-label={`Move ${label} down`}><ArrowDown size={14}/></button>
    <button type="button" className="adm-btn sm danger" onClick={() => onRemove(i)} aria-label={`Remove ${label}`}><Trash2 size={14}/></button>
  </div>
}
export const moveItem = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return arr; const c = [...arr]; [c[i], c[j]] = [c[j], c[i]]; return c }
export const lines = t => String(t || '').split('\n').map(x => x.trim()).filter(Boolean)
export const paras = t => String(t || '').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean)
