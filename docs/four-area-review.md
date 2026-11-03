# SEO, responsive pages, design and data review

Reviewed 2026-11-03. Scope narrowed by the user to these four areas. This is a local source/build/HTTP review, not a browser or visual acceptance test. No Chrome or other browser was opened. No deployment or external ticket creation was performed.

## Results

| Area | Status | Evidence / limits |
| --- | --- | --- |
| SEO: titles, descriptions, one H1, social metadata | Pass for tested local pages | All 219 pages return 200, have unique titles and meta descriptions, one H1, viewport, description, Open Graph title and Twitter card metadata. |
| SEO: canonical configuration | Pass in configured-origin test; production Not Verified | Test build used `https://catalog.example` only as a fixture. All canonical targets matched expected routes; six secondary product presentations canonicalize primary designs. Actual deployment origin is not configured locally. |
| SEO: indexing | Not Verified for production | Unconfigured preview intentionally has noindex directives, robots disallow and an empty sitemap. Set the real `NEXT_PUBLIC_SITE_URL` before the production build. Quote pages intentionally remain noindex. |
| SEO: sitemap and robots | Pass in configured-origin test | 106 canonical public URLs, no quote or secondary presentation URLs. Every sitemap destination is among the tested 200 pages. Robots references sitemap. |
| SEO: links, redirects, invalid routes | Pass | 219 distinct internal page targets resolve; 175 legacy redirects point directly to valid destinations. Four invalid category/product combinations return 404. |
| SEO: heading hierarchy | Pass after fix | Changed collection card headings from H3 to H2, preserving CSS. Retest found no skipped heading levels in the main content of all 219 pages. |
| SEO: structured data | Partial / Not Verified externally | Rendered JSON-LD parses. Product, Organization, WebSite, BreadcrumbList and collection ItemList markup are implemented. Google/Schema.org external validators were not run. Product data lacks offers or reviews: valid generic Product markup does not establish Google product-rich-result eligibility. Do not invent prices or ratings. |
| Responsive: layout implementation | Pass for source review | Home stacks collections/content; catalog grids use 2/3/5 columns; product and quote layouts switch to one column at 750px. Responsive image sizes and image aspect-ratio/dimension reservations are present. |
| Responsive: mobile readability | Fail / High | Source-matched viewport text becomes extremely small. At 390 CSS px: founder text ≈4.52px, store copy ≈5.23px, product specifications ≈8px, footer labels ≈8px. At 768px, some desktop-scale copy is also very small. See `src/app/globals.css`. |
| Responsive: overflow, wrapping, device behavior | Not Verified | Code alone cannot establish actual layout at 320/390/768/1024/1440px or browser zoom. Browser testing remains disabled. |
| Design: reusable typography/colors/components | Pass for source consistency | Shared type utilities, header, footer, product cards, galleries and quote forms are used across routes; local fonts are referenced. |
| Design: text contrast | Fail / Medium | Computed from declared solid colors: white on CTA #c06144 ≈4.17:1; footer #828282 on white ≈3.84:1; contact #b4581a on #ede7df ≈3.93:1. These fall below 4.5:1 for normal-size text. Background-image text needs rendered review. |
| Design: reference equality and visual appearance | Not Verified | No screenshots or rendered comparisons in this review. This is not a visual pass. `/contact` is an existing custom layout; the richer sidebar is an intentional user-requested customization. |
| Data: coverage and unique products | Pass | 106 retained cards/products: 30 chairs, 17 sofas, 32 swings, 27 tables. Unique names, slugs, product paths, quote paths and descriptions. No repeated-name product was deleted. |
| Data: search, asset files, quote destinations | Pass | Compact search index matches every product; all rendered image/video file targets exist; no image lacks an alt attribute. Collection → detail → matching prefilled quote links pass. |
| Data: complete specifications | Fail / Medium | 28 product detail pages lack detailed specifications and show the honest contact-for-details fallback. Exact URLs are in `four-area-audit-evidence.json`. |
| Data: visual correctness / business verification | Not Verified | Image assignment coverage is recorded by the previous reference audit; this review verifies file/link integrity, not whether each photo depicts the intended construction. Business contact ownership and product dimensions require owner confirmation. |

## Actionable findings

1. **High — Production indexing prerequisite.** Before release, set `NEXT_PUBLIC_SITE_URL` to the real domain, rebuild, and check the deployed sitemap, robots, canonicals and noindex behavior. Do not use the audit fixture as a real domain. No live indexing conclusion is possible from localhost.
2. **High — Tiny mobile/tablet text.** Home, all product pages, collection contact strips and footer are affected. Recommended: introduce readable minimum body sizes and rem-based text that supports zoom, then review wrapping at 320–1440px. This changes the exact reference typography requested previously, so it was documented rather than silently changed.
3. **Medium — Text contrast.** All collection quote buttons, collection contact strips and shared footer are affected. Darken the specified colors sufficiently for 4.5:1 normal text; then review against the requested reference palette. Existing explicitly requested colors were preserved in this review. Contrast guidance: https://www.w3.org/TR/WCAG22/#contrast-minimum
4. **Medium — Missing product specifications.** Supply verified materials, dimensions and finish details for the 28 listed products. Do not fabricate content. Generic Product schema can remain, but Google product snippets need genuine offers/review/aggregateRating data as applicable: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
5. **Medium — Visual/device acceptance remains open.** User-guided review should check mobile/tablet/desktop layout, header/menu, long variant titles, gallery gestures, navigation scroll reset, and quote form controls. No claim of visual parity or all-device correctness is made here.

## Fix and retest

Fixed the collection H1 → H3 skip by rendering product names as H2, with no style changes. Retested all 219 pages: zero heading skips, duplicate meta descriptions, broken internal links, missing local image/video paths or missing image alt attributes.

`npm run lint`, `npm run check`, `npm run verify:catalog`, and the configured-origin production build passed. `CHECK_SITE_ORIGIN=https://catalog.example node scripts/verify-site-http.mjs` passed all 219 pages, 175 redirects, 106 sitemap URLs and strict invalid-route checks after the fix. A separate HTML-parser crawl checked all internal targets, descriptions, headings and image/video references; machine-readable results are in `four-area-audit-evidence.json`.

The temporary test server is stopped after checks and a default unconfigured-preview build is restored. Live deployment, screenshots, device execution, Google indexing and interactive form submission are outside the evidence obtained in this review.
