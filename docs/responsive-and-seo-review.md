# Responsive and SEO review

## Scope and verification boundary

The user requested no browser testing. This pass inspects source layout/CSS and runs build, catalog and HTTP checks; it does not certify rendered appearance on every device. Supplied screenshots and cached public reference HTML/CSS ground the visual implementation. No Chrome, other browser or device emulator was opened.

## Responsive rules reviewed

| Width | Home | Collection | Detail | Quote |
| --- | --- | --- | --- | --- |
| 320–750px | Natural-height copy, stacked store/founder content, bounded hero/title | Two-column cards; featured sections stack | Swipeable gallery above readable details | Product image above single-column form |
| 751–899px | Collection images remain side by side; long editorial copy stacks | Three-column cards; feature image/card split | Two columns with natural-height text | Form left, image right; fields fill their column |
| 900–1099px | Store/founder become two columns | Three-column cards | Two columns | Two columns |
| 1100px and above | Desktop arrangement retained with bounded typography | Five-column reference grid, full-width film, feature sections | Roughly equal image/details columns | Wide form with narrower image column |

Home narrative copy now has a minimum 14px font size instead of shrinking to 4–8px on phones. The footer has at least 56px height and 12px labels. Form text inputs use 16px text and at least 48px height; primary actions and gallery controls have at least 44px height. Fixed source form minimum widths are not copied. Grid children have `min-width: 0`, images have explicit aspect/size containers, and long content grows in normal document flow.

Reduced motion disables menu/gallery smooth motion and automatic video playback. Films use local posters, viewport-aware playback and `preload="none"`. Only primary page images are prioritized; other images use Next.js lazy loading and responsive sizes.

## Reference inner-page structure

Collections now retain the source's card order, five-column desktop/two-column mobile grids, white rectangular photo cards, centered names, outlined Request Quote buttons, full-width films, editorial/featured sections and contact strip. The richer sidebar and clean local URLs are user-requested overrides.

Product pages use a left photo slider and right model/specifications with an outlined Request Quote action. Mobile stacks those sections. Quote pages use the reference's first name, email, phone, category, product name and confirmation fields; the selected product is prefilled. On desktop the form is left and product photo right. Submission continues to a customer-reviewed WhatsApp draft; no unsupported email submission is claimed.

## Corrected source routing issue

The reference chair page displayed many distinct designs whose links incorrectly pointed to Malaga. Recovered collection card names/images now map to 16 additional local product pages, giving 98 products and 106 displayed collection cards. Missing individual specifications are not copied from Malaga or invented. Existing duplicate model/color presentations still share one canonical product page.

## SEO implementation

- One H1 per page and unique descriptive titles and descriptions.
- Clean, persisted product and quote slugs; local canonical destinations.
- Production-origin canonical, Open Graph and Twitter metadata.
- Organization, WebSite, Product, ItemList and BreadcrumbList structured data where applicable.
- Descriptive local image filenames and contextual alt text.
- Sitemap lists home, contact, four collections and 98 product pages, including local product image entries. Quote forms are excluded and use `noindex, follow`.
- Old paths are one-hop local permanent redirects; unknown/wrong-category routes return strict 404.
- Production origin is normalized once for metadata, robots and sitemap. Configure `NEXT_PUBLIC_SITE_URL` before deployment. Unconfigured previews discourage indexing.

## Checks

Run `npm run lint`, `npm run check`, `npm run verify:catalog`, and `npm run build`.

For a running production build, `node scripts/verify-site-http.mjs` validates direct pages, collection → detail → prefilled form links, metadata, H1/title uniqueness, JSON-LD validity, redirects and strict 404s. To validate production-origin canonical/sitemap behavior against an isolated test build, also set `CHECK_SITE_ORIGIN` to that build's origin. This check uses HTTP only and does not submit the form or open WhatsApp.

Visual animation, exact crops, interactive form validation, touch behavior, focus behavior and measured Core Web Vitals still require user-guided device/browser review.

## Latest scroll, asset and variant corrections

The root scrollbar gutter is reserved during modal locking, global smooth scrolling is removed, and route changes explicitly scroll to the top before paint and once after router handling. Browser visual testing remains disabled; these interactions still need user-guided review.

Served images are centralized under `public/images/`. Photo-based catalog review now yields 103 unique cards and product/variant pages. Independent constructions self-canonicalize; three finish-only pages canonicalize to the primary model and are omitted from the sitemap. Updated HTTP checks pass for 213 pages, 175 redirects and 106 sitemap URLs. See `docs/catalog-variant-decisions.json` for the inspected distinctions.
