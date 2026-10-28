import { useEffect, useRef, useState } from 'react'
import { unitDims } from '../lib/adConfig'

function useInView(ref, margin = '300px') {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (seen || !ref.current) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { setSeen(true); io.disconnect() } }, { rootMargin: margin })
    io.observe(ref.current); return () => io.disconnect()
  }, [seen, ref])
  return seen
}

// Re-creates <script> tags so injected ad code actually executes.
export function injectHtml(container, html) {
  const range = document.createRange(); range.selectNode(container)
  const frag = range.createContextualFragment(html)
  container.appendChild(frag)
}

const docFor = (code) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base target="_blank"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{display:flex;justify-content:center;align-items:flex-start}</style></head><body>${code}</body></html>`

function DirectLink({ unit }) {
  const rel = 'sponsored nofollow noopener noreferrer'
  if (unit.link_style === 'text') return <p className="ad-direct ad-direct-text">{unit.link_text && <span>{unit.link_text} </span>}<a href={unit.link_url} target="_blank" rel={rel}>{unit.link_label}</a></p>
  if (unit.link_style === 'card') return <a className="ad-direct ad-direct-card" href={unit.link_url} target="_blank" rel={rel}><span><strong>{unit.link_label}</strong>{unit.link_text && <small>{unit.link_text}</small>}</span><span className="ad-direct-go">Open →</span></a>
  return <div className="ad-direct ad-direct-button">{unit.link_text && <p>{unit.link_text}</p>}<a className="button button-primary" href={unit.link_url} target="_blank" rel={rel}>{unit.link_label}</a></div>
}

function Isolated({ unit, preview }) {
  const { w, h, fluid } = unitDims(unit)
  return <iframe title={unit.name || 'Advertisement'} className="ad-frame" loading="lazy" scrolling="no" width={fluid ? '100%' : w} height={h}
    style={{ width: fluid ? '100%' : w, maxWidth: '100%', height: h }}
    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation" referrerPolicy="no-referrer-when-downgrade" srcDoc={docFor(unit.code || '')}/>
}

function Inline({ unit }) {
  const ref = useRef(null)
  useEffect(() => { const el = ref.current; if (!el) return; el.innerHTML = ''; injectHtml(el, unit.code || ''); return () => { el.innerHTML = '' } }, [unit.id, unit.code])
  const { h } = unitDims(unit)
  return <div ref={ref} className="ad-inline" style={{ minHeight: Math.min(h, 120) }}/>
}

export default function AdUnit({ unit, preview = false }) {
  const holder = useRef(null)
  const visible = useInView(holder)
  const { w, h, fluid } = unitDims(unit)
  const isLink = unit.kind === 'direct_link'
  const body = !visible && !preview ? null : isLink ? <DirectLink unit={unit}/> : unit.render_mode === 'inline' ? <Inline unit={unit}/> : <Isolated unit={unit}/>
  return <aside ref={holder} className={`ad-unit ad-kind-${unit.kind}`} aria-label={unit.label || 'Advertisement'} data-ad={unit.slot_key}>
    {unit.label && <span className="ad-label">{unit.label}</span>}
    <div className="ad-body" style={!isLink ? { minHeight: h, width: fluid ? '100%' : w, maxWidth: '100%' } : undefined}>{body}</div>
  </aside>
}
