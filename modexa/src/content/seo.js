// Pure data. Used by React pages (SeoContent / FaqSection) and by scripts/prerender.mjs.
export const LISTING = {
  home: {
    path: '/', seoTitle: 'Modexa: Android Apps, Games & Guides',
    description: 'Discover Android apps, games and practical guides on Modexa. Clear details, simple downloads and honest writing.',
    h1: 'Discover apps and games.',
    answer: { q: 'What is Modexa?', a: 'Modexa is an independent discovery hub for game mods and custom content. Each listing explains what a mod changes, which game and version it supports and who made it, then links to the creator’s original page so you can download from the source.' },
    steps: [
      { t: 'Search or browse', d: 'Find mods by game, category, trend or keyword, or open a guide if you are new to modding.' },
      { t: 'Check the details', d: 'Read the summary, features, requirements, version and installation notes before you commit.' },
      { t: 'Download from the source', d: 'Open the creator’s original page, back up your saves and install following their instructions.' },
    ],
    values: [
      { t: 'Creator-first', d: 'Every listing names the creator and links to their original page. We never re-host their files.' },
      { t: 'Clear, honest details', d: 'Version, platform, requirements and install steps are shown up front so you know what you are getting.' },
      { t: 'Reviewed submissions', d: 'Listings are checked by a person for a working source, accurate description and respect for rights.' },
      { t: 'Safer by habit', d: 'Our guides teach a simple routine, back up, scan, install one at a time, that prevents most problems.' },
      { t: 'Works on every device', d: 'A fast, responsive experience on phones, tablets and desktops, with no account needed.' },
      { t: 'Independent', d: 'Written and maintained by an independent team that checks every page.' },
    ],
    sections: [
      { id: 'what-are-mods', h: 'What are game mods?', p: ['Mods are player-made changes that extend or tweak a game: sharper visuals, new characters, extra maps, quality-of-life fixes or entire new gameplay systems. They are built by communities of creators and are usually installed on top of the original game.', 'Because mods come from independent authors, quality and compatibility vary. Modexa helps by gathering the key facts, game, version, platform, requirements and source, in one consistent format.'] },
      { id: 'how-to-choose', h: 'How to choose a mod you can trust', ul: ['Prefer mods whose creator, version and last update are clearly shown.', 'Match the mod’s supported game version to yours before installing.', 'Open the original source link and read the creator’s notes and comments.', 'Back up your save files and install one mod at a time.'], p: ['Our [guide to safer mod discovery](/blog) walks through the full checklist.'] },
    ],
    faqs: [
      { q: 'Is Modexa free to use?', a: 'Yes. You can browse listings and read guides without an account or payment.' },
      { q: 'Does Modexa host mod downloads?', a: 'No. Download buttons open the creator’s original page, so updates and licences stay with the creator.' },
      { q: 'Are the mods safe?', a: 'No third-party file can be guaranteed safe. Back up your saves, scan downloads and install from the original source. Read our safe-modding checklist for details.' },
      { q: 'Can I submit my own mod?', a: 'Yes. Use the Submit a Mod page. Our team reviews every submission before it is published.' },
      { q: 'Which games and platforms are covered?', a: 'Modexa lists mods for popular PC and mobile games. Browse the Games page to see what is currently available.' },
    ],
  },
  apps: {
    path: '/apps', seoTitle: 'Apps: Android Apps, Mods & Downloads | Modexa',
    description: 'Browse Android apps with clear details, version, requirements and simple downloads. Search, filter and find the app you need.',
    h1: 'Apps',
    answer: { q: 'How do I find the right app?', a: 'Search by name, pick a category chip, then open an app to read its details, version and requirements before you download. Newest and most downloaded sorting helps you decide quickly.' },
    sections: [
      { id: 'how-it-works', h: 'How Modexa app listings work', p: ['Every app page shows a short summary, the version, the platform and the creator, followed by a full description written for people. When a download button is available, it takes you to the original source after a short countdown.'] },
      { id: 'before-you-install', h: 'Before you install any app', ul: ['Check that the version and Android requirements match your phone.', 'Read the full description and the steps provided on the page.', 'Back up important data first.', 'Install one app at a time and test it.'] },
    ],
    faqs: [
      { q: 'Are the apps free to download?', a: 'Most are. Each listing shows its source, where you can check pricing and licence terms.' },
      { q: 'Why is there a short countdown before a download?', a: 'The countdown screen prepares your link and then redirects you automatically to the source.' },
      { q: 'How do I save an app for later?', a: 'Use the bookmark button on any card. Saved apps are kept in your browser.' },
    ],
  },
  games: {
    path: '/games', seoTitle: 'Games: Android Games, Mods & Guides | Modexa',
    description: 'Discover Android games with details, requirements and simple downloads. Search, filter and open any game for the full page.',
    h1: 'Games',
    answer: { q: 'Where can I find games on Modexa?', a: 'This page lists every game on Modexa. Search by name, filter by category and open a game to see its description, version, requirements and download button.' },
    sections: [
      { id: 'what-you-get', h: 'What you get on a game page', ul: ['A clear description and screenshots.', 'Version, platform and requirements.', 'A simple download button and related guides.'] },
    ],
    faqs: [
      { q: 'Do you list mobile games only?', a: 'Mostly Android games and apps. Each page states the platform clearly.' },
      { q: 'Can I read a guide for a game?', a: 'Yes. Guides for popular games are in the Guide section and linked from the game page when available.' },
    ],
  },
  guide: {
    path: '/guide', seoTitle: 'Guides: How-To, Tips & Walkthroughs | Modexa',
    description: 'Step-by-step guides for apps and games: installation, settings, tips and fixes written in plain language.',
    h1: 'Guides',
    answer: { q: 'What are Modexa guides?', a: 'Guides are practical, step-by-step articles that explain how to install, set up and get the most from apps and games.' },
    sections: [{ id: 'topics', h: 'Topics we cover', ul: ['Installation and setup', 'Settings and performance tips', 'Troubleshooting common problems', 'Safe downloading habits'] }],
    faqs: [],
  },
  blog: {
    path: '/blog', seoTitle: 'Blog: News, Updates & Stories | Modexa',
    description: 'News, updates and stories about Android apps and games from the Modexa team.',
    h1: 'Blog',
    answer: { q: 'What will I find on the Modexa blog?', a: 'Short, readable posts about new apps and games, updates, comparisons and announcements.' },
    sections: [{ id: 'topics', h: 'What we write about', ul: ['New releases and updates', 'App and game comparisons', 'Announcements from Modexa'] }],
    faqs: [],
  },
  search: {
    path: '/search', seoTitle: 'Search Game Mods', description: 'Search Modexa for mods by name, game, category or creator.', h1: 'Search mods',
    answer: { q: 'How does search work?', a: 'Type a mod name, game, category or creator. Results include any listing whose title, game, category, creator or summary contains your words.' },
    sections: [{ id: 'tips', h: 'Search tips', ul: ['Try the game name first, for example “Skyrim”.', 'Use short keywords such as “lighting” or “skins”.', 'Open Filters on the Explore page for more control.'] }],
    faqs: [],
  },
  saved: {
    path: '/saved', seoTitle: 'Saved Mods', description: 'Your saved Modexa mods, stored privately in this browser.', h1: 'Your saved mods',
    answer: { q: 'Where are my saved mods stored?', a: 'Saved mods are stored only in your browser on this device. They are not uploaded to a server and no account is required.' },
    sections: [{ id: 'tips', h: 'Good to know', ul: ['Clearing your browser data removes the list.', 'Saved mods do not sync between devices.', 'Remove an item any time with the bookmark button.'] }],
    faqs: [],
  },
  submit: {
    path: '/submit-mod', seoTitle: 'Submit a Mod: Share Your Creation with Players',
    description: 'Creators can submit a mod to Modexa. Provide your original source link and a clear description; every listing is reviewed before publishing.',
    h1: 'Submit your mod',
    answer: { q: 'How do I submit a mod to Modexa?', a: 'Fill in the submission form with the mod title, game, category, platform, your creator name, the original source link and a short description. Our team reviews every submission before it is published.' },
    sections: [
      { id: 'requirements', h: 'What you need', ul: ['A working link to the original page for your mod.', 'A clear description of what the mod changes.', 'Confirmation that you own the work or have permission to share it.'] },
      { id: 'process', h: 'What happens next', ol: ['We check the source, description and rights.', 'We approve, ask for changes or decline.', 'Approved mods are published with your name and a link to your page.'] },
    ],
    faqs: [
      { q: 'Does it cost anything to submit?', a: 'No. Submitting a mod to Modexa is free.' },
      { q: 'Will you host my files?', a: 'No. Listings link to your original page so you stay in control of updates and licences.' },
      { q: 'How long does review take?', a: 'Usually a few business days, depending on volume.' },
    ],
  },
}

// Generated (still honest, non-fabricated) content for dynamic game / category pages.
export function gameContent(name, count = 0) {
  return {
    answer: { q: `How do I find ${name} mods?`, a: `This page lists the ${name} mods published on Modexa${count ? ` (${count} right now)` : ''}. Check each card’s version and platform, open the listing for requirements and installation notes, then download from the creator’s original page.` },
    sections: [
      { id: 'before-you-install', h: `Before installing ${name} mods`, ul: [`Confirm the mod supports your current version of ${name}.`, 'Read the requirements, some mods need a loader or framework first.', 'Back up your save files and, if possible, the game folder.', 'Install one mod at a time and test the game after each change.'] },
      { id: 'after-updates', h: `${name} updates and compatibility`, p: [`Game updates can change files that mods rely on. After ${name} is patched, check the creator’s page for a matching update before re-enabling a mod.`] },
    ],
    faqs: [
      { q: `Are ${name} mods safe?`, a: 'Mods from trusted creators on their original pages are usually fine, but no third-party file can be guaranteed. Back up saves and scan downloads before installing.' },
      { q: `How do I install a ${name} mod?`, a: 'Open the mod listing, follow its installation notes and the creator’s instructions, and test the game. Our blog has general step-by-step guides.' },
      { q: `Can I submit a ${name} mod?`, a: 'Yes. Use the Submit a Mod page and include your original source link.' },
    ],
  }
}
const CAT_INFO = {
  'Graphics & Visuals': 'Graphics and visual mods change lighting, textures, shaders and the overall look of a game. They can be demanding on hardware, so check requirements and start with lighter options if your device is modest.',
  'Gameplay': 'Gameplay mods change how a game plays, new mechanics, systems, difficulty or balance. Read the creator’s notes carefully, because they can affect saves and online eligibility.',
  'Characters & Skins': 'Character and skin mods add outfits, models and appearance options. They are usually cosmetic and easier to remove than deep gameplay changes.',
  'Maps & Worlds': 'Map and world mods add new locations, structures and landscapes. They are often large files, so check storage space and loading instructions.',
  'Vehicles': 'Vehicle mods add or replace cars, bikes, aircraft and boats. Make sure the vehicle matches your game version and any required frameworks.',
  'Tools & Utilities': 'Tools and utilities include editors, helpers and launchers that make modding easier. Download only from the original creator and keep them updated.',
  'Quality of Life': 'Quality-of-life mods improve interfaces, convenience and performance without changing the core experience. They are a great first step for new modders.',
}
export function categoryContent(name, count = 0) {
  const intro = CAT_INFO[name] || `${name} mods are grouped here so you can compare similar changes side by side.`
  return {
    answer: { q: `What are ${name} mods?`, a: intro },
    sections: [
      { id: 'how-to-choose', h: `Choosing ${name} mods`, ul: ['Match the mod to the exact game and version you play.', 'Read features and requirements before downloading.', 'Check the update date, recent updates usually mean better compatibility.', 'Use the creator’s original page for the latest files and notes.'], p: [count ? `There ${count === 1 ? 'is' : 'are'} ${count} published listing${count === 1 ? '' : 's'} in this category right now.` : 'New listings appear here as soon as they are published.'] },
    ],
    faqs: [
      { q: `Where can I find more ${name} mods?`, a: 'Use the Explore page filters or search by game. You can also submit your own mod for review.' },
      { q: 'How do I know a mod is compatible?', a: 'Compare the supported game version on the listing with your installed version, and read the creator’s notes.' },
    ],
  }
}
