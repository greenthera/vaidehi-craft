# Vaidehi Craft

React, Next.js App Router, TypeScript and Tailwind CSS. The application serves its own collection, product, quote and contact routes using local assets. No runtime request depends on the previous website.

## Development and production preview

```sh
npm install
npm run dev
```

Development compiles routes on demand. To review the optimized production build:

```sh
npm run build
npm run start
```

Open the local URL yourself. Automated browser testing remains disabled at the user's request.

## Checks

```sh
npm run lint
npm run check
npm run verify:catalog
npm run build
```

With a local production server running, `node scripts/verify-site-http.mjs` checks all page destinations, collection/detail/form links, one shared header, metadata, prefills, redirects and strict 404s over HTTP. Set `CHECK_SITE_ORIGIN` only when the build uses that configured origin, to additionally verify canonicals, robots and sitemap coverage.

## Asset locations

- `public/images/`: all images, product photos, posters, logos, icons and app icon.
- `public/media/`: videos only.
- `public/fonts/`: local font files.

The former `src/assest/` directory has been removed. Its 14 original files were moved or deduplicated against byte-identical canonical copies. `docs/uploaded-asset-migration.json` records each original path, current path and SHA-256 hash. Every original file's contents are preserved.

## Catalog and URLs

- `src/data/products.json`: 106 product/design/finish/presentation entries with stable paths and local images.
- `src/data/product-index.json`: compact client-side search index.
- `src/data/collection-layouts.json`: all 106 reference cards, retaining repeated names as clearly named variants with unique destinations.
- `src/data/legacy-redirects.json`: one-hop local redirects from old paths.

Fresh reference coverage is recorded in `docs/reference-coverage-audit.json`: 30 chairs, 17 sofas, 32 swings and 27 tables, with no missing/extra card-image occurrences. `scripts/audit-reference-coverage.py` compares newly downloaded public collection HTML with the local inventory. It is an offline audit tool, not a runtime dependency.

Missing reference specifications are not fabricated. Quote forms open a customer-reviewed WhatsApp draft; nothing is sent automatically.

## Navigation and scrolling

The header is mounted once in the root layout. Menu navigation warms the destination while closing the sidebar, then starts the route transition. Product links prefetch on pointer/focus/touch intent rather than for every card entering the viewport. Route changes reset to the top once before paint; in-page anchor links can scroll smoothly. Reduced-motion preferences are respected.

Fixed-header backdrop blur is removed; header state only updates at its scroll threshold. Product-gallery updates are animation-frame batched. Videos autoplay muted and loop continuously without overlays or playback controls, as requested. The app no longer pauses videos based on scrolling, tab visibility, reduced motion or data-saver settings. Browser autoplay and background playback policies can still affect playback.

These are code-level optimizations, not measured FPS/Core Web Vitals results. Browser smoothness still needs user review.

## Deployment and migration

Set `NEXT_PUBLIC_SITE_URL` to the replacement site's actual origin before the production build. Unconfigured previews discourage indexing. Nothing has been published.

See [URL rules](docs/urls-and-migration.md), [responsive review](docs/responsive-and-seo-review.md) and [design QA](design-qa.md). The optional offline catalog regeneration sequence is:

```sh
python3 scripts/build-catalog.py
python3 scripts/prepare-collection-layouts.py
python3 scripts/finalize-catalog-variants.py
```

Catalog regeneration requires retained migration inputs; ordinary builds and page requests do not fetch the reference website.

## Repository cleanup

Unused starter graphics, superseded social icons, three unreferenced collection downloads, and completed one-time download/consolidation scripts have been removed. Supplied original uploads remain preserved, including the original video-poster image. Historical asset manifests retain provenance for earlier downloads; they are not the runtime image inventory. Catalog regeneration, reference coverage auditing, and verification scripts remain available.
