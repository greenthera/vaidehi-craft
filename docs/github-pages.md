# GitHub Pages deployment

The default Next.js/Vercel build remains available with `npm run build`. It already pre-renders the content pages and retains the server enquiry API.

## Publish the static site

```bash
npm run deploy
```

This automatically runs `npm run build:pages`, then uses `gh-pages` to commit and push only `out/` to the `gh-pages` branch of `https://github.com/greenthera/vaidehi-craft.git`. GitHub Pages should be configured to deploy from that branch's root (already configured by the owner). Git credentials with write access are required. The source branch is not committed or pushed by this command.

For a build without publishing:

```bash
npm run build:pages
```

HTML is generated for the homepage, collections, all 106 product details, all 106 quote pages, articles, contact and policies. Direct routes use `route/index.html`. A 404 page and `.nojekyll` are included. No server API code or environment files are published.

## Enquiry forms: deploy the backend update first

GitHub Pages serves static files and cannot run `/api/enquiries`. The Pages build sends enquiries to the existing Vercel endpoint at `https://vaidehicraft.vercel.app/api/enquiries`. **Deploy the updated API code to Vercel first**: it includes the restricted CORS/preflight support for `https://greenthera.github.io` and validates the `/vaidehi-craft` source paths. Without that backend update, browsers reject submissions from Pages. The Google Form integration is unchanged.

The website itself is static; the form backend remains hosted separately. The existing Vercel site continues to use its same-origin API.

## URLs and assets

The default public URL is `https://greenthera.github.io/vaidehi-craft/`. The build prefixes asset paths, fonts, navigation, consent policy links, canonical URLs, sharing images and sitemap URLs with the repository path. Static assets are served directly because GitHub Pages has no Next.js image optimizer. Original optimized local images remain in use.

The static build is created in an isolated temporary `.pages-build/` folder, then removed. This avoids moving or deleting the working API route or sharing the normal Next.js build output.

Optional shell environment variables (not read from a deployment dashboard):

- `PAGES_ORIGIN`: HTTPS hostname only; defaults to `https://greenthera.github.io`.
- `PAGES_BASE_PATH`: `/vaidehi-craft` by default; set empty for a custom domain root.
- `PAGES_ENQUIRY_API_URL`: HTTPS backend endpoint; defaults to the existing Vercel API.

If the Pages domain or repository path changes, update the backend's allowed origin/path as well. No custom `CNAME` is generated automatically.

GitHub Pages cannot apply Next.js server redirect or security/cache header rules. Old routes receive static HTML redirect pages with canonical/noindex and a visible link, rather than HTTP 301 responses. Hosting controls response headers. `robots.txt` is exported at the repository path; crawler-wide robots controls for a project site belong at the host root.

If Vercel and Pages are both publicly indexable, decide which domain should be the primary production site to avoid maintaining two independently canonical copies. This setup generates Pages metadata for the Pages deployment and preserves existing Vercel metadata for the Vercel deployment.

## Verification

Run lint, TypeScript and `npm run verify:pages` after building. After publishing, confirm direct product/article URL refresh, assets, cookie preferences and one approved enquiry in the linked Sheet. No browser or publishing command was run during preparation.
