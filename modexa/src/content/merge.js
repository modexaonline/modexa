// Pure helper shared by the React app and the prerender script.
// Admin > Website editor stores edited fields in the `site_content` table; they override the built-in defaults.
export function mergeContent(defaults, override) {
  if (!override || typeof override !== 'object') return defaults
  const out = { ...defaults }
  for (const [k, v] of Object.entries(override)) { if (k.startsWith('__') || v === undefined || v === null) continue; out[k] = v }
  return out
}
export const NAV_DEFAULT = {
  header: [{ label: 'Explore Mods', to: '/mods' }, { label: 'Games', to: '/games' }, { label: 'Categories', to: '/categories' }, { label: 'Trending', to: '/trending' }, { label: 'Guides & Blog', to: '/blog' }],
  footer: [
    { title: 'Discover', links: [{ label: 'Explore Mods', to: '/mods' }, { label: 'Games', to: '/games' }, { label: 'Categories', to: '/categories' }, { label: 'Trending', to: '/trending' }, { label: 'Latest', to: '/latest' }] },
    { title: 'Community', links: [{ label: 'Submit a Mod', to: '/submit-mod' }, { label: 'Guides & Blog', to: '/blog' }, { label: 'Community Guidelines', to: '/guidelines' }, { label: 'FAQ', to: '/faq' }, { label: 'About', to: '/about' }] },
    { title: 'Information', links: [{ label: 'Contact', to: '/contact' }, { label: 'Privacy Policy', to: '/privacy' }, { label: 'Terms of Use', to: '/terms' }, { label: 'Cookie Policy', to: '/cookies' }, { label: 'Copyright & DMCA', to: '/copyright' }] },
  ],
}
export const HOME_DEFAULT = {
  hero: { eyebrow: 'Your next favorite mod starts here', line1: 'Discover mods.', line2: 'Redefine your game.', description: 'Modexa is an independent hub for game mods and custom content. Every listing credits the creator, shows the version and requirements, and links to the original source.', searchPlaceholder: 'Search mods, games, creators...' },
  headings: { featured: { title: 'Featured', accent: 'mods', text: 'Standout creations worth a closer look.' }, games: { title: 'Browse by', accent: 'game', text: 'Start with the game you already love. Click a game to open its guide.' }, categories: { title: 'Explore by', accent: 'category', text: 'Find exactly the kind of change you want.' }, how: { title: 'How Modexa', accent: 'works', text: 'Three steps from curiosity to a confident install.' }, why: { title: 'Built on', accent: 'trust and clarity', text: 'The principles behind every listing.' } },
  cta: { title: 'Made a mod? Share it with players.', text: 'Submit your creation for review — free, credited and linked to your original page.', buttonText: 'Submit a mod', buttonLink: '/submit-mod' },
}
