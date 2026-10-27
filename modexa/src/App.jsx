import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import { PageSkeleton } from './components/Skeleton'
const ModsPage = lazy(() => import('./pages/ModsPage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))
const GamesPage = lazy(() => import('./pages/GamesPage'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const SavedPage = lazy(() => import('./pages/SavedPage'))
const SubmitPage = lazy(() => import('./pages/SubmitPage'))
const InfoPage = lazy(() => import('./pages/InfoPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const BlogIndex = lazy(() => import('./pages/BlogPages').then(m => ({ default: m.BlogIndex })))
const BlogDetail = lazy(() => import('./pages/BlogPages').then(m => ({ default: m.BlogDetail })))
const CustomPage = lazy(() => import('./pages/BlogPages').then(m => ({ default: m.CustomPage })))
const Admin = lazy(() => import('./admin/Admin'))

export default function App() {
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('modexa-saved') || '[]') } catch { return [] }
  })
  const location = useLocation()
  useEffect(() => { try { localStorage.setItem('modexa-saved', JSON.stringify(savedIds)) } catch {} }, [savedIds])
  useEffect(() => { if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  if (location.pathname.startsWith('/admin')) return <Suspense fallback={<div className="admin-center">Loading admin…</div>}><Admin /></Suspense>
  const onToggleSave = id => setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  return <Layout savedCount={savedIds.length}>
    <Suspense fallback={<PageSkeleton/>}><Routes>
      <Route path="/blog" element={<BlogIndex/>}/>
      <Route path="/blog/:slug" element={<BlogDetail/>}/>
      <Route path="/page/:slug" element={<CustomPage/>}/>
      <Route path="/" element={<HomePage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/mods" element={<ModsPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/mods/:slug" element={<DetailPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/games" element={<GamesPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/games/:slug" element={<GamesPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/categories" element={<CategoriesPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/categories/:slug" element={<CategoriesPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/search" element={<SearchPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/saved" element={<SavedPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
      <Route path="/trending" element={<ModsPage savedIds={savedIds} onToggleSave={onToggleSave} initialMode="trending"/>}/>
      <Route path="/latest" element={<ModsPage savedIds={savedIds} onToggleSave={onToggleSave} initialMode="latest"/>}/>
      <Route path="/submit-mod" element={<SubmitPage/>}/>
      {['about','contact','guidelines','faq','privacy','terms','cookies','copyright'].map(slug => <Route key={slug} path={`/${slug}`} element={<InfoPage/>}/>)}
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes></Suspense>
  </Layout>
}