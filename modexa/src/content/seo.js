// Pure data. Used by React pages (SeoContent / FaqSection) and by scripts/prerender.mjs.
export const LISTING = {
  home: {
    path: '/', seoTitle: 'Modexa — Discover Game Mods, Custom Content & Guides',
    description: 'Discover game mods, custom content and practical modding guides on Modexa. Every listing credits the creator and links to the original source.',
    h1: 'Discover mods. Redefine your game.',
    answer: { q: 'What is Modexa?', a: 'Modexa is an independent discovery hub for game mods and custom content. Each listing explains what a mod changes, which game and version it supports and who made it, then links to the creator’s original page so you can download from the source.' },
    steps: [
      { t: 'Search or browse', d: 'Find mods by game, category, trend or keyword — or open a guide if you are new to modding.' },
      { t: 'Check the details', d: 'Read the summary, features, requirements, version and installation notes before you commit.' },
      { t: 'Download from the source', d: 'Open the creator’s original page, back up your saves and install following their instructions.' },
    ],
    values: [
      { t: 'Creator-first', d: 'Every listing names the creator and links to their original page. We never re-host their files.' },
      { t: 'Clear, honest details', d: 'Version, platform, requirements and install steps are shown up front so you know what you are getting.' },
      { t: 'Reviewed submissions', d: 'Listings are checked by a person for a working source, accurate description and respect for rights.' },
      { t: 'Safer by habit', d: 'Our guides teach a simple routine — back up, scan, install one at a time — that prevents most problems.' },
      { t: 'Works on every device', d: 'A fast, responsive experience on phones, tablets and desktops, with no account needed.' },
      { t: 'Independent', d: 'Not affiliated with game publishers. Any sponsored content will be clearly labelled.' },
    ],
    sections: [
      { id: 'what-are-mods', h: 'What are game mods?', p: ['Mods are player-made changes that extend or tweak a game: sharper visuals, new characters, extra maps, quality-of-life fixes or entire new gameplay systems. They are built by communities of creators and are usually installed on top of the original game.', 'Because mods come from independent authors, quality and compatibility vary. Modexa helps by gathering the key facts — game, version, platform, requirements and source — in one consistent format.'] },
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
  mods: {
    path: '/mods', seoTitle: 'Explore Game Mods — Search by Game, Category & Platform',
    description: 'Browse and filter game mods by title, game, category, platform and update date. Each listing links to the creator’s original source.',
    h1: 'Explore game mods',
    answer: { q: 'How do I find the right mod?', a: 'Use the search box to look up a mod, game or creator, then open Filters to narrow by category, game and platform. Sort by featured, downloads or most recently updated, and open a listing to check version, requirements and source before downloading.' },
    sections: [
      { id: 'how-it-works', h: 'How the mod library works', p: ['Every card in this library represents a reviewed listing: a short summary, the supported game, the platform, the version and the creator’s name. Opening a card shows full features, requirements and installation notes, plus a link to the original page.', 'Use **Featured first** to see editor-selected mods, **Downloads** to see community favourites and **Recently updated** to find mods that match the newest game versions.'] },
      { id: 'filters', h: 'Filtering tips', ul: ['Pick a **game** first — compatibility matters more than anything else.', 'Use **category** to focus on graphics, gameplay, characters, maps, vehicles, utilities or quality-of-life changes.', 'Choose the **platform** you play on (PC, Android or Console) to avoid incompatible files.', 'Combine search with filters, for example “lighting” + Minecraft.'] },
      { id: 'before-download', h: 'Before you download any mod', ul: ['Check that the supported **version** matches your game.', 'Read the **requirements** (loaders, frameworks or other mods).', 'Back up your **save files**.', 'Follow the creator’s **installation steps** exactly.'] },
    ],
    faqs: [
      { q: 'How often is the mod library updated?', a: 'New listings are added as submissions are reviewed. Check the Latest page to see the newest additions.' },
      { q: 'What does “version” mean on a listing?', a: 'It is the mod’s version number as stated by the creator. Compare it with the supported game version to avoid compatibility problems.' },
      { q: 'Why does a mod say PC, Android or Console?', a: 'Mods are built for specific platforms. Choose one that matches the platform you play on.' },
    ],
  },
  trending: {
    path: '/trending', seoTitle: 'Trending Game Mods — Most Downloaded Right Now',
    description: 'See the game mods players are downloading most. Updated as the catalog grows, with links to each creator’s original source.',
    h1: 'Trending mods',
    answer: { q: 'What are trending mods?', a: 'Trending mods are the listings with the highest download activity on Modexa. They show what the community is installing most, which is a helpful starting point when you are unsure where to begin.' },
    sections: [
      { id: 'how-trending-works', h: 'How trending is calculated', p: ['The list is ordered by download count for each listing, highest first. Popularity is a useful signal, but not a guarantee of quality or compatibility — always check the supported game version and the creator’s notes.'] },
      { id: 'tips', h: 'Getting the most from trending mods', ul: ['Start with mods that match the game you already own.', 'Compare the “updated” date — recent updates usually mean better compatibility.', 'Look at the category to see which kinds of mods are popular right now.'] },
    ],
    faqs: [
      { q: 'Does a high download count mean a mod is safe?', a: 'Not necessarily. Popularity helps, but you should still verify the source, back up your saves and scan files.' },
      { q: 'How often does the trending list change?', a: 'It updates as download counts change and as new mods are published.' },
    ],
  },
  latest: {
    path: '/latest', seoTitle: 'Latest Game Mods — Newly Added & Recently Updated',
    description: 'Find the newest and most recently updated game mods on Modexa. Fresh listings with version details and original source links.',
    h1: 'Latest mods',
    answer: { q: 'Where can I find new mods?', a: 'This page lists the most recently added and updated mods, newest first. It is the quickest way to see fresh releases and updates that match current game versions.' },
    sections: [
      { id: 'why-fresh', h: 'Why fresh updates matter', p: ['Game updates often break older mods. Recently updated listings are more likely to match the latest game version, so they are a safer place to start when your game has just been patched.'] },
      { id: 'how-to-use', h: 'How to use this page', ul: ['Check the **updated date** and **version** on each card.', 'Open the listing to read what changed.', 'Save interesting mods with the bookmark button and review them later.'] },
    ],
    faqs: [
      { q: 'What counts as “latest”?', a: 'Listings sorted by their most recent publish or update date.' },
      { q: 'Can I be notified about new mods?', a: 'Not yet. Bookmark this page or check the blog for announcements.' },
    ],
  },
  games: {
    path: '/games', seoTitle: 'Browse Games — Find Mods for Your Favorite Games',
    description: 'Pick a game and discover community mods, visual upgrades and custom content made for it. Browse every game covered on Modexa.',
    h1: 'Find mods for your favorite games',
    answer: { q: 'How do I find mods for a specific game?', a: 'Choose your game from this directory to see every mod listed for it, with category, version and platform details. Starting from the game ensures you only look at mods that can actually work with it.' },
    sections: [
      { id: 'why-game-first', h: 'Why start with the game?', p: ['Compatibility is the biggest source of modding problems. Browsing by game keeps your search focused on mods built for the exact title you play, and lets you compare versions and requirements side by side.'] },
      { id: 'what-you-see', h: 'What you will see on a game page', ul: ['All published mods for that game.', 'Categories such as graphics, gameplay, maps and utilities.', 'Platform and version information on every card.'] },
    ],
    faqs: [
      { q: 'My game is not listed. What can I do?', a: 'Creators can submit mods for any game through the Submit a Mod page. New games appear automatically once a listing is published.' },
      { q: 'Does Modexa support mobile games?', a: 'Yes, where creators provide Android mods. Use the platform filter on the Explore page.' },
    ],
  },
  categories: {
    path: '/categories', seoTitle: 'Mod Categories — Graphics, Gameplay, Maps & More',
    description: 'Explore game mods by category: graphics and visuals, gameplay, characters and skins, maps, vehicles, tools and quality-of-life improvements.',
    h1: 'A category for every play style',
    answer: { q: 'What types of mods are there?', a: 'Common mod categories are graphics and visuals, gameplay changes, characters and skins, maps and worlds, vehicles, tools and utilities, and quality-of-life improvements. Pick a category to narrow your search to the kind of change you want.' },
    sections: [
      { id: 'category-guide', h: 'What each category means', ul: ['**Graphics & Visuals** — lighting, textures, shaders and overall look.', '**Gameplay** — new mechanics, difficulty, systems and balance.', '**Characters & Skins** — outfits, models and appearance packs.', '**Maps & Worlds** — new locations, structures and landscapes.', '**Vehicles** — cars, bikes, aircraft and boats.', '**Tools & Utilities** — launchers, editors and helpers.', '**Quality of Life** — interface, convenience and performance tweaks.'] },
      { id: 'tip', h: 'A tip for new modders', p: ['Start with a low-risk category such as quality-of-life or visuals. These usually change less of the game’s core and are easier to remove if something goes wrong.'] },
    ],
    faqs: [
      { q: 'Can a mod belong to more than one category?', a: 'Each listing has one main category so that browsing stays clear. Use search to find related mods across categories.' },
    ],
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
  blog: {
    path: '/blog', seoTitle: 'Modding Guides & Tips — Safer, Smarter Mod Discovery',
    description: 'Practical modding guides: compatibility checks, installation steps, backups and safer discovery, written to help you make informed choices.',
    h1: 'Guides, tips and mod news',
    answer: { q: 'What will I find in the Modexa blog?', a: 'Practical, plain-language guides about checking compatibility, installing mods, backing up saves and spotting risky downloads — plus news about new features and listings.' },
    sections: [{ id: 'topics', h: 'Topics we cover', ul: ['Choosing and verifying mod sources', 'Installation and troubleshooting', 'Backups and version management', 'Creator tips for better listings'] }],
    faqs: [],
  },
  submit: {
    path: '/submit-mod', seoTitle: 'Submit a Mod — Share Your Creation with Players',
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
      { id: 'before-you-install', h: `Before installing ${name} mods`, ul: [`Confirm the mod supports your current version of ${name}.`, 'Read the requirements — some mods need a loader or framework first.', 'Back up your save files and, if possible, the game folder.', 'Install one mod at a time and test the game after each change.'] },
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
  'Gameplay': 'Gameplay mods change how a game plays — new mechanics, systems, difficulty or balance. Read the creator’s notes carefully, because they can affect saves and online eligibility.',
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
      { id: 'how-to-choose', h: `Choosing ${name} mods`, ul: ['Match the mod to the exact game and version you play.', 'Read features and requirements before downloading.', 'Check the update date — recent updates usually mean better compatibility.', 'Use the creator’s original page for the latest files and notes.'], p: [count ? `There ${count === 1 ? 'is' : 'are'} ${count} published listing${count === 1 ? '' : 's'} in this category right now.` : 'New listings appear here as soon as they are published.'] },
    ],
    faqs: [
      { q: `Where can I find more ${name} mods?`, a: 'Use the Explore page filters or search by game. You can also submit your own mod for review.' },
      { q: 'How do I know a mod is compatible?', a: 'Compare the supported game version on the listing with your installed version, and read the creator’s notes.' },
    ],
  }
}
