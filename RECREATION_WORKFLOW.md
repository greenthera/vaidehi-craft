# Vaidehi Craft recreation: inspection and approval workflow

## Scope and current state

- Reference: https://www.vaidehicraft.com/
- Stack inspected: Next.js App Router, React, TypeScript, Tailwind CSS.
- Existing home page is the Next.js starter. Preserve unrelated functionality and user changes.
- Supplied assets are in `src/assest/`: logo, home imagery, founder photo, home video, and chair, sofa, swing, and table videos. Preserve these originals.
- Delivery order: home page first; collection, product, and other pages follow after home-page review.
- Reference text was retrieved, but desktop/mobile screenshots, interactions, exact styles, product inventory, and asset mapping are not yet verified.
- Playwright use was requested previously; not authorized. The user subsequently requested building without Chrome testing; honor that instruction and leave browser verification to user-guided review.

## 1. Inspect without changing the application

Inspect local code, configuration, routing, dependencies, and git status. Read any applicable `AGENTS.md` before changes. Record existing user modifications and preserve them.

Use public, read-only reference access. Inspect navigation, all home sections, collection pages, representative product detail pages, contact, footer links, and other discovered pages. Build a complete route inventory before claiming full-site coverage. Capture desktop, tablet, and mobile evidence, including menu, search, carousel, hover, and scrolling states where present. Do not infer layout from extracted text alone.

Do not submit forms, place orders, log in, bypass access restrictions, or change the reference website. Copy only publicly accessible assets permitted for this project. Keep an asset manifest with source URL, local path, dimensions, intended placement, and accessibility or permission limitations. Use supplied media first after confirming its reference placement. Do not replace unavailable assets with dummy content silently.

### Inspection approval

Use available approved browser tools. If direct Playwright access is needed, ask once for approval, explaining that the Product Design skill requires it. Do not install browsers, run Playwright, or access a personal browser profile before that approval. Once granted, reuse the authorization within its stated scope.

## 2. Present the inspection package

Prepare a reviewable report containing:

- Reference screenshots and section order at each viewport.
- Home-page asset mapping, fonts, colors, spacing, responsive rules, and observed interactions.
- Discovered routes and actual product slugs, with coverage gaps clearly marked.
- Proposed reusable components and a bounded home-page file-change plan.
- Missing assets, uncertain behavior, and any proposed deviations.
- Validation steps and a rollback approach based on the initial diff.

**Build approval:** ask the user to approve this concrete home-page package before application edits. Record the actual reply and its scope; never treat silence as approval. Inspection and documentation may continue while approval is pending. Routine reversible edits within an approved stage do not require repeated approval.

## 3. Implement the approved home page

Use React components and Tailwind styling within the existing Next.js project. Match observed reference details and reuse local assets. Preserve working features and avoid unnecessary dependencies. Keep a narrow diff. Do not delete original media or perform destructive Git operations.

Implement accessible navigation and all observed home interactions. Respect reduced-motion preferences. Use responsive image sizes, modern image formats, explicit dimensions, below-fold lazy loading, and suitable video posters/preload behavior. Avoid claiming Core Web Vitals improvements without measurement.

Add home metadata, canonical URL, social metadata, semantic headings, alt text, and applicable verified structured data. Use an explicitly configured deployment origin for canonical and sitemap URLs; do not assume a preview owns the production domain. Do not invent business details for schema.

Home links must have a deliberate destination. Until local subpages are implemented, retain their verified reference destinations and document that behavior in the review. Do not create fake product pages or dead local routes to imply completion.

## 4. Validate and review the home page

Run the production build and TypeScript checks as appropriate. Compare rendered screenshots with the reference at matching desktop, tablet, and mobile viewports. Test navigation, keyboard access, focus handling, menu dismissal, media, responsive overflow, console errors, and primary calls to action. Record checks actually performed and their outcomes.

Keep visual verification separate from build success. Maintain `design-qa.md` with evidence, remaining differences, and an honest result of `passed`, `failed`, or `blocked`. An unavailable browser is a verification blocker, not a pass. Fix material defects before requesting acceptance.

**Home acceptance:** present the local preview, changed files, validation results, and known differences. Ask for acceptance before beginning the next page stage. Home-page acceptance does not imply publishing authorization.

## 5. Extend to the remaining pages

After home acceptance, use the inspected inventory to propose the next bounded batch. Reuse components, source real product content and assets, and use exact verified product slugs. Validate direct access, refresh, unknown-route handling, redirects, canonical consistency, and internal links. Generate sitemap and robots rules consistent with the deployment's intended indexing; include only real indexable local pages.

Repeat implementation, validation, and review for each approved batch. Do not claim the entire site is complete until the route inventory is covered or the user explicitly accepts exclusions.

## 6. Publish only after explicit approval

Before deployment, present the tested version, target environment, domain, public/private access, indexing behavior, and any outstanding limitations. Obtain explicit approval for that concrete publication. DNS changes, production replacement, external writes, paid actions, and destructive actions require their own scoped authorization unless already expressly granted.

Keep credentials out of source files, logs, and reports. Verify deployment results and retain a version or commit identifier for rollback. Do not change the live reference website as part of local recreation.

## Approval record

| Checkpoint | Status | Evidence |
| --- | --- | --- |
| Add inspection and approval workflow | Authorized | User explicitly requested this workflow. |
| Direct Playwright inspection | Not used | User requested no Chrome testing; no browser was opened. |
| Home implementation | Authorized | User explicitly said “start building”; source HTML/CSS and local media ground the first pass. |
| Home acceptance / next page batch | Pending | Requires implemented and validated home page. |
| Publication | Not authorized | No deployment approval supplied. |

Update this record only from actual user replies and completed evidence. If a checkpoint is blocked, explain the specific missing input and continue independent authorized work.

## User override for the current stage

The user authorized starting the home build and requested no Chrome testing. Proceed with reversible local implementation and automated code/build checks without waiting for the earlier package checkpoint. Do not launch another browser to work around this preference. Visual QA remains blocked pending user-guided review; do not report a visual pass.

## Latest explicit authorization and validation

The user requested independent SEO slugs, reliable local navigation, product-specific quote URLs, duplicate handling, descriptive image names, code-error fixes, and a richer sidebar. This authorizes implementing the necessary collection/product/quote/contact endpoints now; the earlier home-only staging checkpoint does not block these explicit changes.

The implementation now serves 82 canonical products with 82 quote routes and 175 local one-hop migration redirects. All assets are local; old paths appear only as redirect inputs and offline migration records. Production build, lint, TypeScript, catalog validation, 339 product/quote/redirect HTTP checks and strict invalid-route 404 checks passed. Browser verification remains off per user preference, and deployment is not authorized.

## Responsive inner-page pass

The latest request authorizes matching collection, product-detail and separate quote-form layouts to the reference while keeping the independent URLs. Browser testing remains disabled. Cached source CSS/HTML identified the reference grid/feature/slider/form structure and 16 additional mislinked chair designs; the local catalog now has 98 products and 106 displayed cards. Missing specifications are not fabricated.

The home page now uses readable minimum narrative text sizes and stacked mobile content instead of the reference's tiny viewport-scaled mobile text. The richer sidebar and canonical local paths are preserved as prior user overrides. See `docs/responsive-and-seo-review.md` for the review matrix and automated validation results.

## Scroll, image location and duplicate-card authorization

The latest request authorizes fixing modal layout shift, resetting new pages to the top, consolidating image storage and correcting repeated product destinations. Root scrollbar-gutter reservation and route-level scroll reset are implemented. Served images are consolidated in `public/images/`, with original uploads preserved.

Local photo inspection distinguishes actual constructions/finishes from repeated views. The catalog now has 103 unique card destinations with matching quote pages; finish-only pages consolidate search signals to their primary models, and three repeated cards were removed. No browser was opened and no publication occurred.

## Repeated-name product preservation

The user explicitly requested restoring repeated-name products instead of removing their cards. All 106 source collection cards are now retained, each with a distinct product name/URL and matching quote URL. The restored entries are Hawaii Collection Cane Chair, Filitheyo Collection Cane Sofa and Claire Collection Cane Table. Original image assignments are preserved, including the identical Hawaii image used in both original source placements; no replacement image is fabricated. The catalog-generation script no longer removes repeated cards. Presentation-only pages retain primary-model canonicals to consolidate duplicate search content.

Catalog verification confirms 106 products and 106 distinct card destinations, with all local images present. This instruction supersedes earlier removal decisions recorded above. Browser testing remains disabled.

## Navigation smoothness and complete asset consolidation

The user explicitly requested moving the remaining `src/assest` images into the canonical folders and rechecking the complete reference inventory. Four fresh public collection pages were inspected without a browser; all 106 reference card/image occurrences are present locally. Fourteen original uploads were moved or deduplicated only after verifying identical SHA-256 contents. Their canonical copies remain preserved, and `src/assest` is removed.

The shared header now persists across pages, menu closing is sequenced before route navigation, card prefetching follows user intent, the duplicate scroll reset is removed, and scroll/gallery/video work is reduced. Browser testing remains off; runtime smoothness requires user-guided review.
