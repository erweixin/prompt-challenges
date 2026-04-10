# Prompt Challenges

A **learning path** for everyday users: from one-shot chatbot queries to Cursor-style IDE collaboration and OpenClaw-style local agent governance with MCP, Skills, and harness thinking. Built with **[Astro 5](https://astro.build/)**, deployed for **Cloudflare Pages** (static pages + Worker for `/api/score`).

- **Live content** lives in [`src/content/challenges/`](src/content/challenges/) (Markdown + frontmatter; organized by `foundation → prompt → tools → mcp → skills → harness → cross_cut`, with bilingual readings and practices across the full path).
- **Learning resources** on the home page `#resources` are grouped by stage: structured prompting, tools / IDE collaboration, MCP, local agents, Skills, harnesses, and safety.
- **Legacy Next.js site** is in [`_legacy/site/`](_legacy/site/) (reference only).
- **Archived old questions** are in [`_archive/questions/`](_archive/questions/).

## Scripts

```bash
npm install
npm run dev      # http://localhost:8080 → redirects to /zh/
npm run build
npm run preview
```

## Scoring API

Practice pages call `POST /api/score`. Set the same key as before:

```bash
cp .env.example .env
# edit OPENROUTER_API_KEY
```

For **Cloudflare Pages**, add `OPENROUTER_API_KEY` in the project **Environment variables** (production / preview). Optional: `PUBLIC_LLM_BASE_URL` if you use a different OpenAI-compatible base URL.

Local Worker emulation:

```bash
npx wrangler pages dev ./dist
```

## Cloudflare Pages

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 18+ (20+ recommended)

If the build log mentions an invalid `SESSION` KV binding, add a KV namespace named `SESSION` in `wrangler.toml` and the Pages project, or adjust `@astrojs/cloudflare` session settings when you adopt Astro sessions.

## Locales

Routes: `/zh/...`, `/en/...`. Default entry redirect: `/` → `/zh/`.

## License

See repository root license (if any). MIT where applicable.
