// Splits article markdown into blocks so ads can be inserted between paragraphs.
const NON_PARAGRAPH = /^(#{1,3}\s|[-*•]\s|\d+[.)]\s|>\s|!\[|\[ad:|\[btn:)/
export function splitBlocks(content = '') {
  return String(content).replace(/\r\n?/g, '\n').split(/\n\s*\n/).map(t => t.trim()).filter(Boolean).map(t => {
    const ad = t.match(/^\[ad:([a-z0-9-]+)\]$/i)
    return ad ? { ad: ad[1].toLowerCase() } : { text: t, paragraph: !NON_PARAGRAPH.test(t) }
  })
}
export function paragraphCount(content) { return splitBlocks(content).filter(b => b.paragraph).length }
