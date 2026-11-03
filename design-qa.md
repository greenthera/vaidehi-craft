# Verification

final result: blocked

Visual QA remains blocked because the user requested no browser testing. Source HTML/CSS and supplied screenshots ground the work, but the latest pages have not been captured in a browser. Automated checks below passed; they do not prove pixel equivalence or measured behavior on all devices.

## Current implementation

- Home narrative text now has readable minimum font sizes; long content and store/founder sections stack on small screens. Hero/title are bounded; actions and form fields have practical touch sizes.
- User-requested rich sidebar, local assets, descriptive names and independent canonical slugs remain intact.
- Collections use reference-style full-width films, five-column desktop/two-column mobile photo cards, centered model labels, outlined quote actions, feature/editorial sections and contact strips.
- All 106 displayed collection cards lead to the appropriate detail page, including 16 recovered designs whose reference links incorrectly led to Malaga. There are 98 canonical product pages.
- Detail pages have an accessible horizontal photo slider, product name/specifications and a Request Quote action. Mobile stacks gallery/details.
- Product-specific quote routes display a separate reference-style form on the left and a product photo on the right; mobile puts the photo above the form. Name, email, phone, category, product name and confirmation fields are present. Product and category are prefilled.
- Submission opens a customer-reviewed WhatsApp draft. No silent submission or unconfigured email delivery is claimed.
- Unknown source specifications are not copied from another model or fabricated.

## Passed checks

- Production webpack build: passed, generating 208 static outputs.
- Lint and TypeScript checks: passed.
- Catalog validation: 98 unique products/quote paths, all local images, 106 card targets, valid feature/poster assets, 175 one-hop redirects, no old-site runtime dependencies.
- Production-origin HTTP verification: all 203 public/quote pages return 200 and have one H1, unique titles, descriptions, viewport and social metadata, and parseable JSON-LD.
- All collection-to-detail and detail-to-quote links verified in rendered HTML. Product/category prefills and quote noindex metadata verified across all quote pages.
- All 175 redirects return 308 with the expected direct destination.
- Unknown category, unknown product, wrong-category product and unknown quote return strict 404.
- All 104 public sitemap URLs match canonical public pages; product image entries are local; quote forms are excluded. Robots points to the correct sitemap.
- Canonicals, public indexing, BreadcrumbList and Product schema verified with a reserved test origin. The isolated test server was stopped and the normal local build restored; no test domain was saved to configuration.
- `git diff --check`: passed.

## Remaining limits

No browser, device emulator or WhatsApp was opened; no form was submitted. Animation, keyboard/touch interaction, native form validation, responsive wrapping/crops and Core Web Vitals still require user-guided visual/device verification. Configure `NEXT_PUBLIC_SITE_URL` before the production build; unconfigured previews discourage indexing. No publication occurred.

See [responsive and SEO review](docs/responsive-and-seo-review.md) for source inspection details and breakpoint coverage.

## Latest modal, navigation, asset and variant pass

- Added root `scrollbar-gutter: stable` and root modal overflow locking to prevent the scrollbar-removal width change. Global smooth scrolling is removed.
- Added persistent route scroll reset with manual history restoration and a follow-up animation-frame reset; hash links remain supported.
- Centralized all served images under `public/images/`, including the app icon. Video/font locations are unchanged; original uploads are preserved.
- Inspected repeated product photos. Barcelona armchair/armless and Petra woven-base/open-frame are distinct designs. Malaga/Mileos finish variants have separate URLs with primary-model canonicals. Hawaii/Filitheyo/Claire repeated-view cards are removed.
- Current catalog: 103 products/variants, 103 unique card destinations and 103 product quote routes. Earlier 98/106 counts above describe the previous pass.
- Production-origin HTTP checks passed for 213 pages, unique titles, metadata, form prefills, 175 redirects, strict 404s, and 106 sitemap URLs with correct finish canonical handling.
- Final normal production build, lint, TypeScript and catalog checks are recorded in the completion response. The reserved-origin test server was stopped and no test domain was saved to configuration.

Modal visual stability and actual scroll behavior have not been browser-tested, in accordance with the user's instruction. The visual gate remains blocked rather than marked passed from code/HTTP checks.

## Screenshot-guided contact strip and catalog buttons

The user supplied the 1:00:17 PM screenshot. The shared collection contact strip now uses its warm background, left logo, vertical divider, copper label/value rows and three local original social icon assets. Mobile stacks the logo and information with a horizontal divider. Product-list/featured quote buttons use the sampled terracotta fill (`#c06144`), white text and narrower centered proportions. The background sampled from the screenshot is `#ede7df`.

Lint and TypeScript passed. No browser was opened; the screenshot guides the implementation but is not a capture of the updated rendering.

## Repeated-name product preservation

The user explicitly requested restoring repeated-name products instead of removing their cards. All 106 source collection cards are now retained, each with a distinct product name/URL and matching quote URL. The restored entries are Hawaii Collection Cane Chair, Filitheyo Collection Cane Sofa and Claire Collection Cane Table. Original image assignments are preserved, including the identical Hawaii image used in both original source placements; no replacement image is fabricated. The catalog-generation script no longer removes repeated cards. Presentation-only pages retain primary-model canonicals to consolidate duplicate search content.

Catalog verification confirms 106 products and 106 distinct card destinations, with all local images present. This instruction supersedes earlier removal decisions recorded above. Browser testing remains disabled.

## Latest navigation, coverage and asset pass

Fresh public reference HTML was downloaded for all four collections and compared as multisets of card image occurrences: chairs 30/30, sofas 17/17, swings 32/32, tables 27/27. No missing or extra cards were found; all 106 repeated-name cards remain. See `docs/reference-coverage-audit.json`.

The header is now persistent in the root layout. Menu navigation waits for its close animation while prefetching the target, product links prefetch on interaction intent, the duplicated route-scroll reset is removed, the fixed-header backdrop blur is removed, gallery state changes are batched per animation frame, and background/offscreen/user-paused videos do not keep playing automatically. A loading status provides feedback when a route is not ready. These changes are not browser-measured performance claims.

All 14 uploaded originals from `src/assest/` were migrated or deduplicated only against byte-identical canonical files. SHA-256 hashes verify preservation. `src/assest/` is removed; images live under `public/images/`, videos under `public/media/`. See `docs/uploaded-asset-migration.json`.

Browser testing is still disabled, so actual wheel/touch smoothness, animation sequencing and page scroll/focus behavior remain visually unverified.


## Second-section screenshot correction — 2026-11-03

Target: user screenshot `Screenshot 2026-11-03 at 3.09.44 PM.png`. At the supplied 2854px image width, the photos span approximately 656 / 1464 / 654px with 40px gaps and 984px height. Updated desktop cards to have no outside horizontal padding or rounded corners, 1.4vw gaps, 34.529vw height, larger transparent white-outline Explore buttons (13.3vw by 3.15vw, 2.1vw above the bottom), and the sofa label inset observed in the screenshot. Top whitespace including the former grid padding is consolidated to 5.45214vw. Existing mobile stacking and functional collection routes are preserved. Explore remains visible by default, hides on hover, and remains visible for keyboard focus.

Code/build checks are separate from rendered comparison. No browser was opened per the user's instruction; visual verification remains blocked pending user-guided review. Final result: blocked (visual QA only).
