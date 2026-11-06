import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

// Build in an isolated copy: keep the API route and the Vercel build untouched.
const root = process.cwd();
const stage = path.join(root, '.pages-build');
const output = path.join(root, 'out');
const basePath = process.env.PAGES_BASE_PATH ?? '/vaidehicraft.com';
if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) throw new Error('PAGES_BASE_PATH must be empty or one repository path.');
const origin = process.env.PAGES_ORIGIN || 'https://greenthera.shivantra.com';
const url = new URL(origin);
if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) throw new Error('PAGES_ORIGIN must be an HTTPS origin.');
await fs.rm(stage, { recursive: true, force: true });
await fs.mkdir(stage, { recursive: true });
try {
  for (const file of ['src', 'public', 'scripts', 'next.config.ts', 'tsconfig.json', 'postcss.config.mjs', 'package.json', 'package-lock.json']) {
    await fs.cp(path.join(root, file), path.join(stage, file), { recursive: true });
  }
  await fs.symlink(path.join(root, 'node_modules'), path.join(stage, 'node_modules'), 'dir');
  await fs.rm(path.join(stage, 'src/app/api'), { recursive: true, force: true });
  // CSS public URLs do not inherit Next.js basePath automatically.
  const css = path.join(stage, 'src/app/globals.css');
  await fs.writeFile(css, (await fs.readFile(css, 'utf8')).replaceAll('url("/fonts/', `url("${basePath}/fonts/`));
  const env = { ...process.env, STATIC_EXPORT: 'true', NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: origin, NEXT_PUBLIC_ENQUIRY_DIRECT: 'true',
    NODE_ENV: 'production', VERCEL: '', VERCEL_ENV: '', NEXT_PUBLIC_VERCEL_ENV: '',
    VERCEL_URL: '', NEXT_PUBLIC_VERCEL_URL: '', NETLIFY: '', RENDER: '' };
  const result = spawnSync(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], { cwd: stage, env, stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Static export failed. Nothing was published.');
  await fs.rm(output, { recursive: true, force: true });
  await fs.cp(path.join(stage, 'out'), output, { recursive: true });
  await fs.writeFile(path.join(output, '.nojekyll'), '');
  // GitHub Pages cannot apply Next.js redirects: emit navigable HTML fallback pages.
  const redirects = JSON.parse(await fs.readFile(path.join(root, 'src/data/legacy-redirects.json'), 'utf8'));
  for (const { source, destination } of redirects) {
    if (!/^\/[a-zA-Z0-9/_-]+$/.test(source)) throw new Error(`Unsupported redirect: ${source}`);
    const target = `${basePath}${destination}/`;
    const dir = path.join(output, source.slice(1));
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${origin}${target}"><meta http-equiv="refresh" content="0;url=${target}"><title>Page moved | Vaidehi Craft</title></head><body><a href="${target}">Continue to Vaidehi Craft</a></body></html>`);
  }
  console.log(`\nStatic site ready in out/ for ${origin}${basePath}/`);
  console.log('Enquiries post directly from the browser to the Google Form.');
} finally { await fs.rm(stage, { recursive: true, force: true }); }
