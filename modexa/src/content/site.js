// Pure data (no JSX) so both the React app and the build-time prerender script can use it.
export const SITE = {
  name: 'Modexa',
  tagline: 'Discover mods. Redefine your game.',
  description: 'Modexa is an independent discovery hub for game mods, custom content and practical modding guides. Every listing points to the creator’s original source.',
  updated: '2026-10-24',
  updatedLabel: 'October 24, 2026',
  locale: 'en',
}
export const NAV = [
  { to: '/mods', label: 'Explore Mods' }, { to: '/games', label: 'Games' }, { to: '/categories', label: 'Categories' },
  { to: '/trending', label: 'Trending' }, { to: '/latest', label: 'Latest' }, { to: '/blog', label: 'Guides & Blog' }, { to: '/submit-mod', label: 'Submit a Mod' },
]
export const LEGAL_LINKS = [
  { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }, { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Use' }, { to: '/cookies', label: 'Cookie Policy' }, { to: '/copyright', label: 'Copyright & DMCA' },
  { to: '/guidelines', label: 'Community Guidelines' }, { to: '/faq', label: 'FAQ' },
]
