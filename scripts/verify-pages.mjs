import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const base = process.env.PAGES_BASE_PATH ?? '/vaidehicraft.com';
const origin = process.env.PAGES_ORIGIN || 'https://greenthera.shivantra.com';
const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
const articles = JSON.parse(fs.readFileSync('src/data/journal.json', 'utf8'));
const routes = ['/', '/contact', '/blog', '/privacy-policy', '/cookie-policy', '/thank-you', '/request-quote', ...['chairs','sofas','tables','swings'].map(c=>`/furniture/${c}`), ...products.flatMap(p=>[p.path,p.quotePath]), ...articles.map(a=>`/blog/${a.slug}`)];
for (const route of routes) {
  const file = path.join('out', route, 'index.html');
  assert(fs.existsSync(file), `Missing static page: ${route}`);
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /<h1[\s>]/, `Missing visible page content: ${route}`);
  for (const match of html.matchAll(/(?:src|poster)="(\/(?!\/)[^"?]+)(?:\?[^"\s]*)?"/g)) {
    const asset = match[1];
    assert(asset.startsWith(`${base}/`), `Unprefixed asset ${asset} in ${route}`);
    assert(fs.existsSync(path.join('out', decodeURIComponent(asset.slice(base.length)))), `Missing asset ${asset}`);
  }
}
const home = fs.readFileSync('out/index.html', 'utf8');
assert(home.includes(`href="${origin}${base}/"`), 'Home canonical is wrong');
assert(!home.includes('/_next/image?'), 'Static build must not use the Next.js image API');
assert(fs.existsSync('out/.nojekyll'));
assert(fs.existsSync('out/404.html'));
const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
for (const product of products.filter((item) => item.includeInSitemap)) assert(sitemap.includes(`${origin}${base}${product.path}`));
assert(fs.readFileSync('out/robots.txt', 'utf8').includes(`${origin}${base}/sitemap.xml`));
assert(!fs.existsSync('out/api/enquiries/index.html'));
let css = '';
let js = '';
function walk(dir) { for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(file.endsWith('.css'))css+=fs.readFileSync(file,'utf8');else if(file.endsWith('.js'))js+=fs.readFileSync(file,'utf8');} }
walk('out/_next');
assert(css.includes(`${base}/fonts/`));
assert(js.includes('docs.google.com/forms/d/e/'), 'Pages forms must post to the Google Form');
assert(!js.includes('/api/enquiries'), 'Pages forms must not depend on a server route');
assert(!/url\(["']?\/fonts\//.test(css));
console.log(`Verified ${routes.length} pre-rendered pages, public assets, metadata, fonts, sitemap, robots and 404. No browser or external submissions used.`);
