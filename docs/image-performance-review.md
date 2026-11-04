# Search removal and image optimization

Updated 2026-11-04.

- Removed the header search button, dialog, filtering state and product-index import. The compact product index remains used by quote selectors. Deleted the unused search SVG.
- Checked all 395 remaining local images; 382 smaller candidates were saved. Total image files decreased from 40,705,070 to 32,035,853 bytes: 8,669,217 bytes saved (21.3%). This is aggregate file weight, not an asserted page-load speed improvement.
- Preserved image dimensions. Lossy candidates require at least 36 dB PSNR against the prior file; the accepted set's lowest measured value is 37.12 dB. Existing efficient AVIF/vector files and all uploaded originals were retained. A byte-for-byte SHA-256 check confirmed all 14 supplied originals remain intact.
- Added a rerunnable image optimization script with SHA-256 protection against repeated lossy encoding. The manifest at `docs/image-optimization.json` records every file, dimensions, output size and result.
- Corrected product-card responsive image size hints, including a 320px maximum for featured card photos, to reduce oversized image requests.
- Added one-hour browser caching for public images, fonts and videos. Next.js retains its own immutable asset and image-optimizer policies. Continuous muted video playback remains enabled as previously requested.

## Validation

Lint, TypeScript, catalog verification and the production build passed. All 395 image dimensions and output sizes were checked against the optimization manifest. A second optimizer run reused the hashes rather than recompressing files.

HTTP production checks passed for 219 pages, 175 migration redirects and strict invalid routes. All rendered pages were checked for absence of search UI. Representative image/font/video responses returned the configured one-hour cache policy. A 640px optimized product image returned a valid WebP at 23,576 bytes; the optimizer response retained its four-hour cache policy. The removed search SVG returned 404.

No browser was opened. Core Web Vitals, visual quality at device zoom levels and perceived navigation speed have not been measured. The temporary HTTP server was stopped after checks. No deployment was performed.

Delivery behavior follows the official Next.js [Image documentation](https://nextjs.org/docs/app/api-reference/components/image) and [headers documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers).
