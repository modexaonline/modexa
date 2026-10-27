import { Fragment } from 'react'

// Safe markdown subset (no dangerouslySetInnerHTML): ## ### headings, paragraphs, - lists, 1. lists, > quotes, **bold**, *italic*, `code`, [text](https://link), ![alt](https://img)
function inline(text, keyBase) {
  const out = []; let rest = String(text); let i = 0
  const re = /(!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\))|(\[([^\]]+)\]\((https?:\/\/[^)\s]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\*([^*]+)\*)/
  while (rest) {
    const m = re.exec(rest)
    if (!m) { out.push(rest); break }
    if (m.index > 0) out.push(rest.slice(0, m.index))
    const k = `${keyBase}-${i++}`
    if (m[1]) out.push(<img key={k} src={m[3]} alt={m[2]} loading="lazy" className="md-img"/>)
    else if (m[4]) out.push(<a key={k} href={m[6]} target="_blank" rel="noopener noreferrer nofollow">{m[5]}</a>)
    else if (m[7]) out.push(<strong key={k}>{m[8]}</strong>)
    else if (m[9]) out.push(<code key={k}>{m[10]}</code>)
    else if (m[11]) out.push(<em key={k}>{m[12]}</em>)
    rest = rest.slice(m.index + m[0].length)
  }
  return out
}

export function extractHeadings(content = '') {
  return String(content).split('\n').filter(l => /^##\s+/.test(l)).map(l => l.replace(/^##\s+/, '').trim())
}
export const headingId = t => 'h-' + String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function Markdown({ content = '' }) {
  const lines = String(content).replace(/\r\n?/g, '\n').split('\n')
  const blocks = []; let list = null, para = []
  const flushPara = () => { if (para.length) { blocks.push({ t: 'p', v: para.join(' ') }); para = [] } }
  const flushList = () => { if (list) { blocks.push(list); list = null } }
  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) { flushPara(); flushList(); continue }
    let m
    if ((m = line.match(/^###\s+(.*)$/))) { flushPara(); flushList(); blocks.push({ t: 'h3', v: m[1] }) }
    else if ((m = line.match(/^##\s+(.*)$/))) { flushPara(); flushList(); blocks.push({ t: 'h2', v: m[1] }) }
    else if ((m = line.match(/^[-*•]\s+(.*)$/))) { flushPara(); if (!list || list.t !== 'ul') { flushList(); list = { t: 'ul', items: [] } } list.items.push(m[1]) }
    else if ((m = line.match(/^\d+[.)]\s+(.*)$/))) { flushPara(); if (!list || list.t !== 'ol') { flushList(); list = { t: 'ol', items: [] } } list.items.push(m[1]) }
    else if ((m = line.match(/^>\s?(.*)$/))) { flushPara(); flushList(); blocks.push({ t: 'q', v: m[1] }) }
    else { flushList(); para.push(line.trim()) }
  }
  flushPara(); flushList()
  return <>{blocks.map((b, i) => {
    if (b.t === 'h2') return <h2 id={headingId(b.v)} key={i}>{inline(b.v, i)}</h2>
    if (b.t === 'h3') return <h3 key={i}>{inline(b.v, i)}</h3>
    if (b.t === 'q') return <blockquote key={i}>{inline(b.v, i)}</blockquote>
    if (b.t === 'ul') return <ul key={i}>{b.items.map((it, j) => <li key={j}>{inline(it, `${i}-${j}`)}</li>)}</ul>
    if (b.t === 'ol') return <ol key={i}>{b.items.map((it, j) => <li key={j}>{inline(it, `${i}-${j}`)}</li>)}</ol>
    return <p key={i}>{inline(b.v, i)}</p>
  })}</>
}
