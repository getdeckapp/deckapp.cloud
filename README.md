# deckapp.cloud

Marketing site and documentation for [Deck](https://github.com/getdeckapp/deck) — built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Structure

| Path | Content |
| --- | --- |
| `/` | Marketing homepage |
| `/overview/` | Docs hub |
| `/package/*` | `deck/deck` package docs (synced from GitHub on build) |
| `/cloud/*` | Deck Cloud docs (maintained here) |

The old inline React docs SPA lives in `legacy/` for reference.

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

`npm run build` pulls the latest package docs from `getdeckapp/deck` before building.

## Deploy

GitHub Actions (`.github/workflows/static.yml`) builds and deploys `dist/` to GitHub Pages on push to `main`.

Set the `PUBLIC_TURNSTILE_SITE_KEY` repository secret for the waitlist form in CI (optional locally via `.env`).

## Editing docs

- **Package docs** — edit in [getdeckapp/deck](https://github.com/getdeckapp/deck/tree/master/docs); this site syncs on build.
- **Cloud docs** — edit markdown in `src/content/docs/cloud/`.
- **Marketing** — edit `src/pages/index.astro` and components in `src/components/`.
