import { supabase } from './supabase'
// Sends plain text to the `ai-format` Supabase Edge Function (Gemini). Returns clean HTML with the same words.
export async function aiFormatText(text) {
  if (!supabase) throw new Error('Supabase is not connected.')
  const { data, error } = await supabase.functions.invoke('ai-format', { body: { text } })
  if (error) {
    let msg = error.message
    try { const j = await error.context?.json?.(); if (j?.error) msg = j.error } catch {}
    throw new Error(msg || 'AI format failed.')
  }
  if (!data?.html) throw new Error(data?.error || 'AI returned nothing.')
  return data.html
}
