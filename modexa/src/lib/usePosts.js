import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from './supabase'
import { demoPosts } from '../data/demoPosts'

let state = supabaseConfigured ? { items: [], loading: true } : { items: demoPosts, loading: false }
let started = false
const listeners = new Set()
const emit = next => { state = next; listeners.forEach(f => f(state)) }
function load() {
  if (started || !supabaseConfigured) return
  started = true
  supabase.from('posts').select('*').eq('status', 'published').order('published_at', { ascending: false }).then(({ data, error }) => {
    if (error) console.error('Modexa: could not load posts', error.message)
    emit({ items: error ? [] : (data || []), loading: false })
  })
}
export function refreshPosts() { started = false; load() }
export function usePostsState() {
  const [s, setS] = useState(state)
  useEffect(() => { listeners.add(setS); setS(state); load(); return () => { listeners.delete(setS) } }, [])
  return s
}
