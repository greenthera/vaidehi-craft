import fs from 'node:fs';
import assert from 'node:assert/strict';
const products = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
const redirects = JSON.parse(fs.readFileSync('src/data/legacy-redirects.json', 'utf8'));
const valid = new Set(['/', '/contact', '/request-quote', ...['chairs', 'sofas', 'swings', 'tables'].map(category => `/furniture/${category}`)]);
const slugs = new Set();
for (const product of products) {
  assert.match(product.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert(!slugs.has(product.slug), `Duplicate product slug: ${product.slug}`);
  slugs.add(product.slug);
  assert.equal(product.path, `/furniture/${product.category}/${product.slug}`);
  assert.equal(product.quotePath, `/request-quote/${product.slug}`);
  assert(products.some(item => item.path === product.canonicalPath), `Missing canonical target: ${product.slug}`);
  if (!product.includeInSitemap) assert.notEqual(product.canonicalPath, product.path);
  valid.add(product.path); valid.add(product.quotePath);
  assert(product.images.length, `No images: ${product.slug}`);
  for (const image of product.images) {
    assert.match(image, /^\/images\/products\/[a-z0-9]+(?:-[a-z0-9]+)*\.webp$/);
    assert(!/\/[a-f0-9]{24}\.webp$/.test(image), `Opaque image filename: ${image}`);
    assert(fs.existsSync(`public${image}`), `Missing image: ${image}`);
  }
}
const sources = new Set();
for (const redirect of redirects) {
  assert(!sources.has(redirect.source), `Duplicate redirect source: ${redirect.source}`);
  sources.add(redirect.source);
  assert(valid.has(redirect.destination), `Invalid redirect: ${redirect.destination}`);
  assert(!valid.has(redirect.source), `Redirect overlaps canonical page: ${redirect.source}`);
  assert.equal(redirect.permanent, true);
}
for (const filename of fs.readdirSync('public/images/products')) assert(!/^[a-f0-9]{24}\.webp$/.test(filename), `Unrenamed product image: ${filename}`);
const runtimeFiles = [];
function walk(directory) { for (const entry of fs.readdirSync(directory, { withFileTypes: true })) { const file = `${directory}/${entry.name}`; if (entry.isDirectory()) walk(file); else if (/\.(tsx?|json)$/.test(file) && !file.endsWith('legacy-redirects.json')) runtimeFiles.push(file); } }
walk('src');
for (const file of runtimeFiles) assert(!/https?:\/\/(?:www\.)?vaidehicraft\.com|static\.wixstatic\.com|referenceOrigin/.test(fs.readFileSync(file, 'utf8')), `Old-site runtime dependency: ${file}`);
console.log(`Verified ${products.length} unique product URLs, ${products.length} quote URLs, ${redirects.length} one-hop redirects, descriptive local images and no old-site runtime dependencies.`);

const layouts = JSON.parse(fs.readFileSync('src/data/collection-layouts.json', 'utf8'));
let cards = 0;
const destinations = new Set();
for (const [category, layout] of Object.entries(layouts)) {
  assert(fs.existsSync(`public${layout.poster}`), `Missing collection poster: ${category}`);
  for (const section of layout.sections) {
    if (section.image) assert(fs.existsSync(`public${section.image}`));
    for (const card of section.cards) {
      const product = products.find(item => item.slug === card.slug);
      assert(product && product.category === category, `Wrong collection card target: ${card.slug}`);
      assert(fs.existsSync(`public${card.image}`), `Missing card image: ${card.image}`);
      assert(!destinations.has(product.path), `Repeated collection destination: ${product.path}`);
      destinations.add(product.path);
      cards++;
    }
  }
}
assert.deepEqual(destinations, new Set(products.map(product => product.path)), "Every product must have exactly one displayed card destination");
console.log(`Verified ${cards} collection card targets and all featured images/posters.`);
