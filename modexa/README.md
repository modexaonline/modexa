# Modexa v4 — White · Black · Green (React + Supabase)

Public website + secure admin studio. Frontend: React/Vite. Backend: Supabase (Auth, Postgres, Storage).

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173  (admin: /admin)
```
`.env` already contains the Supabase URL + publishable key of project `modexa`. **Set `SITE_URL` to your real domain** (already set to `https://modexa.online`).

## Deploy (Vercel / Netlify / Cloudflare Pages)
- Build command: `npm run build`   Output: `dist`
- Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, **`SITE_URL`**
- `npm run build` = `vite build` + `scripts/prerender.mjs`. The prerender step writes a real HTML file for every important page (title, meta, canonical, JSON-LD, readable text) and generates `sitemap.xml`, `robots.txt` and `llms.txt`. It also pulls your published mods, guides and custom pages from Supabase. **Re-deploy after publishing new content** (or add a Supabase webhook → deploy hook) so new pages get their own static HTML + sitemap entry.

## Supabase
Schema (`supabase/schema.sql`) is already applied to project `modexa`. Admin login: username `admin` (maps to `admin@modexa.local`). Change the password in Supabase → Authentication → Users and keep public sign-ups OFF.

## SEO · AEO · GEO — what is built in
| Layer | What it does |
|---|---|
| **SEO** | Unique title + meta description per page, canonical URLs, OpenGraph/Twitter cards, single H1 per page, semantic headings, breadcrumbs (visual + `BreadcrumbList`), sitemap, robots, noindex on search/saved/404, fast self-hosted fonts, code-split routes. |
| **AEO** (answer engines, featured snippets, voice) | Every page opens with an answer-first “Quick answer” box, question-style headings and FAQ accordions with `FAQPage` schema; mods get `SoftwareApplication` + `HowTo` schema; guides get `Article`. |
| **GEO** (ChatGPT, Claude, Perplexity, Gemini…) | Prerendered HTML so AI crawlers that do not run JavaScript still read full content; `llms.txt` site summary; `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended; clear entity info (Organization/WebSite schema, About page, last-updated dates, creator attribution). |

Content lives in `src/content/` (`legal.js` = About, Contact, Privacy, Terms, Cookies, Copyright/DMCA, Guidelines, FAQ; `seo.js` = listing pages + home). Edit text there. You can also override any of these pages without code: Admin → Website pages → create a **published** page with the same slug (`privacy`, `terms`, `cookies`, `about`…).

## Legal pages — please review
The policy pages describe how this site actually works today (no accounts, no tracking cookies, Supabase + hosting providers as processors, forms for contact/submissions). They are solid starting templates, **not legal advice**. Before launch: confirm governing law/jurisdiction wording, add your business/contact details, and update the Privacy and Cookie policies if you add analytics, ads or newsletters (and then add a consent choice).

## Theme
White background, black text/UI, green accent. Tokens are at the top of `src/theme.css` (`--green-700`, `--black`, …).

---

## Vercel deploy: Supabase connection

Vercel does not upload your local `.env` file. This project now ships `src/lib/publicConfig.js` with the
Supabase URL and **publishable** key, so the admin login works even if you set nothing in Vercel.
(The publishable key is meant to be public. Security comes from Row Level Security. Never paste a
`secret` or `service_role` key into any file in this project.)

To override from Vercel instead: Project > Settings > Environment Variables, add
`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` and `SITE_URL` (your real domain), then redeploy.
Variables set there take priority over `publicConfig.js`.
