import fs from 'node:fs';
import assert from 'node:assert/strict';
const base = process.env.CHECK_SITE_URL || 'http://127.0.0.1:3108';
const canonicalOrigin = process.env.CHECK_SITE_ORIGIN;
const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
const redirects = JSON.parse(fs.readFileSync('src/data/legacy-redirects.json', 'utf8'));
const layouts = JSON.parse(fs.readFileSync('src/data/collection-layouts.json', 'utf8'));
const titles = new Set();
const pages = [
  { path: '/' }, { path: '/contact' }, { path: '/request-quote', quote: true },
  ...Object.keys(layouts).map(category => ({ path: `/furniture/${category}`, category })),
  ...products.flatMap(product => [{ path: product.path, product }, { path: product.quotePath, product, quote: true }]),
];
async function checkPage(page) {
  const response = await fetch(base + page.path);
  assert.equal(response.status, 200, page.path);
  const html = await response.text();
  assert.equal((html.match(/id="site-menu"/g) || []).length, 1, `Exactly one shared header/menu required: ${page.path}`);
  assert(!/static\.wixstatic\.com|https:\/\/www\.vaidehicraft\.com/.test(html), `Old-site dependency: ${page.path}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1 required: ${page.path}`);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && !titles.has(title), `Missing/duplicate title: ${page.path}`); titles.add(title);
  for (const property of ['name="description"', 'property="og:title"', 'name="twitter:card"', 'name="viewport"']) assert(html.includes(property), `${page.path} missing ${property}`);
  for (const script of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) JSON.parse(script[1]);
  if (page.product && !page.quote) assert(html.includes(`href="${page.product.quotePath}"`), `Missing detail → quote link: ${page.path}`);
  if (page.quote) {
    assert(/name="robots" content="[^"]*noindex/.test(html), `Quote must be noindex: ${page.path}`);
    for (const name of ['name', 'email', 'phone', 'category', 'product', 'confirm']) assert(html.includes(`name="${name}"`), `Missing quote field ${name}: ${page.path}`);
    if (page.product) {
      assert(html.includes(`value="${page.product.name}"`), `Missing product prefill: ${page.path}`);
      const radio = (html.match(/<input[^>]*name="category"[^>]*>/g) || []).find(tag => tag.includes(`value="${page.product.category}"`));
      assert(radio && radio.includes('checked=""'), `Missing category prefill: ${page.path}`);
    }
  }
  if (page.category) for (const section of layouts[page.category].sections) for (const card of section.cards) {
    const product = products.find(item => item.slug === card.slug);
    assert(html.includes(`href="${product.path}"`), `Missing collection → detail link: ${card.slug}`);
  }
  if (canonicalOrigin) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert(canonical, `Missing canonical: ${page.path}`);
    assert.equal(new URL(canonical).href, new URL(canonicalOrigin + (page.product && !page.quote ? page.product.canonicalPath : page.path)).href, `Wrong canonical: ${page.path}`);
    if (!page.quote) assert(/name="robots" content="index,/.test(html), `Public page must be indexable: ${page.path}`);
    if (page.product && !page.quote) assert(html.includes('BreadcrumbList') && html.includes('"@type":"Product"'), `Missing structured data: ${page.path}`);
  }
}
const queue = [...pages];
await Promise.all(Array.from({ length: 4 }, async () => { while (queue.length) await checkPage(queue.pop()); }));
for (const redirect of redirects) {
  const response = await fetch(base + redirect.source, { redirect: 'manual' });
  assert.equal(response.status, 308, redirect.source);
  assert.equal(new URL(response.headers.get('location'), base).pathname, redirect.destination);
}
for (const path of ['/furniture/unknown', '/furniture/chairs/not-a-design', '/request-quote/not-a-design', '/furniture/sofas/arches-cane-chair']) assert.equal((await fetch(base + path)).status, 404, path);
if (canonicalOrigin) {
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  const expected = pages.filter(page => !page.quote && (!page.product || page.product.includeInSitemap)).map(page => canonicalOrigin + page.path);
  assert.deepEqual(new Set(urls), new Set(expected), 'Sitemap must contain exactly the canonical public pages');
  assert(!urls.some(url => url.includes('/request-quote')), 'Quote forms must not enter sitemap');
  const robots = await (await fetch(base + '/robots.txt')).text();
  assert(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
  console.log(`Verified ${urls.length} sitemap URLs and robots sitemap declaration.`);
}
console.log(`PASS: ${pages.length} public/quote pages, unique titles, metadata, structured JSON, product → detail → prefilled form links, ${redirects.length} redirects and strict 404s.`);
