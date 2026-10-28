import { useEffect, useMemo, useState } from 'react'
import { supabase, supabaseConfigured } from './supabase'
import { games as demoGames } from '../data/mods'
import { usePostsState } from './usePosts'
import { useModsState } from './useMods'
import { slugify } from './format'

let state = supabaseConfigured ? { items: [], loading: true } : { items: demoGames.map((g, i) => ({ ...g, description: '', blog_slug: '', sort_order: i, show_on_home: true })), loading: false }
let started = false
const listeners = new Set()
const emit = next => { state = next; listeners.forEach(f => f(state)) }
function load() {
  if (started || !supabaseConfigured) return
  started = true
  supabase.from('games').select('*').eq('status', 'published').order('sort_order', { ascending: true }).then(({ data, error }) => {
    if (error) console.error('Modexa: could not load games', error.message)
    emit({ items: error ? [] : (data || []), loading: false })
  })
}
export function refreshGames() { started = false; load() }

// Where a game card should go: its chosen blog, else its newest guide, else the game's hub page.
export function gameHref(game, posts = []) {
  const chosen = game.blog_slug && posts.find(p => p.slug === game.blog_slug)
  if (chosen) return `/blog/${chosen.slug}`
  const latest = posts.find(p => p.game_slug === game.slug)
  return latest ? `/blog/${latest.slug}` : `/games/${game.slug}`
}

// Games with live counts of guides and mods. Mods whose game has no row in `games` still appear (so nothing is hidden).
export function useGamesData() {
  const [s, setS] = useState(state)
  useEffect(() => { listeners.add(setS); setS(state); load(); return () => { listeners.delete(setS) } }, [])
  const { items: posts, loading: pl } = usePostsState()
  const { items: mods, loading: ml } = useModsState()
  const games = useMemo(() => {
    const map = new Map(s.items.map(g => [g.slug, { ...g }]))
    if (supabaseConfigured) mods.forEach(m => { if (!m.game) return; const slug = slugify(m.game); if (!map.has(slug)) map.set(slug, { slug, name: m.game, image: m.image, platform: m.platform || 'PC', description: '', blog_slug: '', sort_order: 999, show_on_home: false }) })
    return [...map.values()].map(g => ({
      ...g,
      modCount: supabaseConfigured ? mods.filter(m => slugify(m.game) === g.slug).length : (g.count || 0),
      guideCount: posts.filter(p => p.game_slug === g.slug).length,
      href: gameHref(g, posts),
    })).sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999) || a.name.localeCompare(b.name))
  }, [s.items, mods, posts])
  return { games, posts, loading: s.loading || pl || ml }
}
