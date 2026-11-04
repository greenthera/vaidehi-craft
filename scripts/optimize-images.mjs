import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Sharp is supplied by Next.js. Keep image dimensions and preserve uploaded originals.
const reportPath = 'docs/image-optimization.json';
const originals = new Set(JSON.parse(await fs.readFile('docs/uploaded-asset-migration.json', 'utf8')).map(item => item.current));
let previous = { files: [] };
try { previous = JSON.parse(await fs.readFile(reportPath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
const prior = new Map(previous.files.map(item => [item.path, item]));
const hash = buffer => crypto.createHash('sha256').update(buffer).digest('hex');
const files = [];
async function walk(directory) {
  for (const item of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.posix.join(directory, item.name);
    if (item.isDirectory()) await walk(filename); else files.push(filename);
  }
}
await walk('public/images');
const results = [];
async function optimize(filename) {
  const input = await fs.readFile(filename);
  const existing = prior.get(filename);
  if (existing?.sha256 === hash(input)) { results.push(existing); return; }
  const metadata = await sharp(input).metadata();
  const result = { path: filename, width: metadata.width, height: metadata.height, before: input.length, after: input.length, sha256: hash(input) };
  if (originals.has(filename)) result.status = 'original preserved; responsive delivery optimizes served copies';
  else if (metadata.format === 'webp' || metadata.format === 'jpeg') {
    const pixels = await sharp(input).removeAlpha().raw().toBuffer();
    for (const quality of [80, 84]) {
      const encoder = sharp(input);
      const candidate = await (metadata.format === 'webp' ? encoder.webp({ quality, effort: 6, smartSubsample: true }) : encoder.jpeg({ quality, mozjpeg: true })).toBuffer();
      if (candidate.length >= input.length * 0.98) continue;
      const decoded = await sharp(candidate).removeAlpha().raw().toBuffer();
      let error = 0;
      for (let i = 0; i < pixels.length; i++) error += (pixels[i] - decoded[i]) ** 2;
      const psnr = error ? 10 * Math.log10(255 ** 2 / (error / pixels.length)) : Infinity;
      if (psnr < 36) continue;
      const outputMetadata = await sharp(candidate).metadata();
      if (outputMetadata.width !== metadata.width || outputMetadata.height !== metadata.height) throw new Error(`Dimensions changed: ${filename}`);
      await fs.writeFile(filename, candidate);
      Object.assign(result, { after: candidate.length, sha256: hash(candidate), quality, psnr: Number(psnr.toFixed(2)), status: 'optimized' });
      break;
    }
    result.status ??= 'already efficient; original retained';
  } else if (metadata.format === 'png') {
    const candidate = await sharp(input).png({ compressionLevel: 9, effort: 10 }).toBuffer();
    if (candidate.length < input.length) {
      await fs.writeFile(filename, candidate);
      Object.assign(result, { after: candidate.length, sha256: hash(candidate), status: 'losslessly optimized' });
    } else result.status = 'already efficient; original retained';
  } else result.status = 'already modern or vector; retained';
  results.push(result);
}
const queue = [...files];
await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) await optimize(queue.shift()); }));
results.sort((a, b) => a.path.localeCompare(b.path));
const before = results.reduce((total, item) => total + item.before, 0);
const after = results.reduce((total, item) => total + item.after, 0);
await fs.writeFile(reportPath, JSON.stringify({ method: 'Same dimensions; quality 80/84, PSNR >=36 dB; smaller candidates only; uploaded originals preserved; hash-based rerun protection', filesChecked: results.length, before, after, savedBytes: before - after, savedPercent: Number((100 * (1 - after / before)).toFixed(1)), files: results }, null, 2) + '\n');
console.log(JSON.stringify({ filesChecked: results.length, optimized: results.filter(item => item.after < item.before).length, before, after, savedBytes: before - after, savedPercent: Number((100 * (1 - after / before)).toFixed(1)) }, null, 2));
