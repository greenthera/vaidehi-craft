# Independent URLs and local assets

## Canonical route structure

- Home: `/`
- Collections: `/furniture/chairs`, `/furniture/sofas`, `/furniture/swings`, `/furniture/tables`
- Products: `/furniture/{category}/{model-and-descriptive-variant}-cane-{type}`
- Product quote: `/request-quote/{product-slug}`
- General quote: `/request-quote`
- Contact: `/contact`

Examples:

- `/furniture/chairs/arches-cane-chair`
- `/furniture/swings/bora-bora-double-seater-cane-swing`
- `/furniture/swings/bora-bora-single-seater-cane-swing`
- `/request-quote/arches-cane-chair`

Slugs are generated once from the catalog and persisted in `src/data/products.json`. They do not depend on card position or a mutable per-page counter. Catalog verification rejects collisions. Existing published slugs should be preserved when display names change; add a permanent redirect before deliberately changing a published slug.

## Duplicate handling

Three duplicate model entries are consolidated: Malaga chair color finishes, Filitheyo sofa entries with the same dimensions, and Claire table entries with the same dimensions. Their photographs share one model page. The 85 acquired source entries initially produced 82 product pages. A subsequent card-by-card source review recovered 16 distinct chair designs whose source links all incorrectly led to Malaga. There are now 98 canonical product pages; these additional designs use the correct local card images without copying Malaga specifications.

Different seating sizes and stand configurations remain separate, descriptively named products. Models across different furniture types have both a category path and type in the slug. No page is differentiated using the source's arbitrary `chair-1`, `sofa-2`, etc.

Old paths only exist as local one-hop permanent redirects in `src/data/legacy-redirects.json`. Their destinations, all links, canonical URLs and sitemap entries use the new paths. No redirect sends visitors to the old website. Redirecting old paths preserves an upgrade path for bookmarks and search results without exposing them as primary URLs.

## Indexing and metadata

Set `NEXT_PUBLIC_SITE_URL` to the replacement site's actual origin before the production build. Preview builds without it discourage indexing. Product/collection/contact pages have their own title, description, social metadata and canonical URL when the production origin is configured. Only primary public pages appear in the sitemap. Quote forms use stable URLs but remain `noindex, follow`; they are a transaction flow, not competing product landing pages. Product structured data uses actual catalog information without fabricated prices, reviews or stock claims.

SEO implementation follows Google's [descriptive URL guidance](https://developers.google.com/search/docs/crawling-indexing/url-structure) and [canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). This does not guarantee rankings or eliminate all possible indexing differences.

## Self-contained content

All 382 catalog images have descriptive local filenames, such as `/images/products/arches-cane-chair-01.webp`. Home images, videos, fonts and icons are local as well. User-supplied originals remain in `src/assest/` for safekeeping. Runtime catalog data has no source page paths or remote asset URLs. Source acquisition/provenance remains under `scripts/` and `docs/` for migration records; production builds and page requests do not fetch it.

Quote forms preselect the product and save the enquiry through the Google Form and its linked Google Sheet, then show `/thank-you`. On Vercel the form posts to `/api/enquiries`; on GitHub Pages the browser posts directly to Google. Email and telephone links are business contact channels, not dependencies on the previous website's hosting.

## Checks

`npm run verify:catalog` validates slug uniqueness, canonical product/quote route consistency, redirect targets, local image existence and absence of old-site runtime URLs.

`npm run lint`, `npm run check` and `npm run build` validate code and production generation. Browser testing remains disabled at the user's request.

## Latest design/finish audit

Photo inspection distinguishes Barcelona armchair/armless designs and Petra woven-base/open-frame designs. Each now has a separate product URL. Malaga cushion finishes and Mileos chair/table finishes also have distinct descriptive URLs; these finish-only pages use their primary model's canonical and are excluded from the sitemap. Related-design links expose the choices from detail pages.

Three repeated-view cards (Hawaii chair, Filitheyo sofa and Claire table) were removed instead of inventing duplicate products. There are now 103 product/variant pages, 103 unique card destinations and 103 quote pages. The sitemap contains 106 primary public URLs: 100 self-canonical products/designs, four collections, home and contact. Finish canonicals and quote noindex behavior are validated by the HTTP checks.

All served image files now reside below `public/images/`, including product photos, posters, icons and the app icon. Videos remain in `public/media/` and fonts in `public/fonts/`. Original user uploads are retained separately as source material.

## Repeated-name product preservation

The user explicitly requested restoring repeated-name products instead of removing their cards. All 106 source collection cards are now retained, each with a distinct product name/URL and matching quote URL. The restored entries are Hawaii Collection Cane Chair, Filitheyo Collection Cane Sofa and Claire Collection Cane Table. Original image assignments are preserved, including the identical Hawaii image used in both original source placements; no replacement image is fabricated. The catalog-generation script no longer removes repeated cards. Presentation-only pages retain primary-model canonicals to consolidate duplicate search content.

Catalog verification confirms 106 products and 106 distinct card destinations, with all local images present. This instruction supersedes earlier removal decisions recorded above. Browser testing remains disabled.
