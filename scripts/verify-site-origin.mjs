import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import ts from 'typescript';

const compiled = ts.transpileModule(fs.readFileSync('src/lib/site-origin.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const context = { exports: {}, URL };
vm.runInNewContext(compiled, context);
const { resolveSiteConfiguration, resolveSiteOrigin } = context.exports;
const fallback = 'https://vaidehicraft.vercel.app';
const cases = [
  ['Vercel production', { VERCEL_ENV: 'production', VERCEL_PROJECT_PRODUCTION_URL: 'vaidehicraft.vercel.app' }, fallback, fallback],
  ['Vercel new primary domain', { VERCEL_ENV: 'production', VERCEL_PROJECT_PRODUCTION_URL: 'official.example' }, 'https://official.example', 'https://official.example'],
  ['Prefixed Vercel variables', { NEXT_PUBLIC_VERCEL_ENV: 'production', NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: 'official.example' }, 'https://official.example', 'https://official.example'],
  ['Vercel preview', { VERCEL_ENV: 'preview', VERCEL_PROJECT_PRODUCTION_URL: 'official.example', VERCEL_URL: 'branch.vercel.app' }, undefined, 'https://branch.vercel.app'],
  ['Preview with inherited override', { VERCEL_ENV: 'preview', NEXT_PUBLIC_SITE_URL: 'https://official.example' }, undefined, 'https://official.example'],
  ['Vercel dev', { VERCEL_ENV: 'development', VERCEL_PROJECT_PRODUCTION_URL: 'official.example' }, undefined, 'https://official.example'],
  ['Vercel hostname without context', { VERCEL_URL: 'branch.vercel.app' }, undefined, 'https://branch.vercel.app'],
  ['Avoid hashed deployment canonical', { VERCEL_ENV: 'production', VERCEL_URL: 'unique-hash.vercel.app' }, fallback, fallback],
  ['Netlify production custom domain', { NETLIFY: 'true', CONTEXT: 'production', URL: 'https://new-domain.example' }, 'https://new-domain.example', 'https://new-domain.example'],
  ['Netlify preview', { NETLIFY: 'true', CONTEXT: 'deploy-preview', URL: 'https://official.example', DEPLOY_PRIME_URL: 'https://deploy-preview-1--site.netlify.app' }, undefined, 'https://deploy-preview-1--site.netlify.app'],
  ['Netlify branch deploy', { NETLIFY: 'true', CONTEXT: 'branch-deploy', URL: 'https://official.example' }, undefined, 'https://official.example'],
  ['Netlify dev server', { NETLIFY: 'true', CONTEXT: 'production', NETLIFY_PREVIEW_SERVER: 'true', URL: 'https://official.example' }, undefined, 'https://official.example'],
  ['Render production', { RENDER: 'true', IS_PULL_REQUEST: 'false', RENDER_EXTERNAL_URL: 'https://site.onrender.com' }, 'https://site.onrender.com', 'https://site.onrender.com'],
  ['Render pull request preview', { RENDER: 'true', IS_PULL_REQUEST: 'true', RENDER_EXTERNAL_URL: 'https://preview.onrender.com' }, undefined, 'https://preview.onrender.com'],
  ['Render custom-domain override', { RENDER: 'true', SITE_URL: 'https://official.example', RENDER_EXTERNAL_URL: 'https://site.onrender.com' }, 'https://official.example', 'https://official.example'],
  ['Generic hosting override', { SITE_URL: 'https://other-host.example' }, 'https://other-host.example', 'https://other-host.example'],
  ['Public override takes priority', { NEXT_PUBLIC_SITE_URL: 'https://official.example/', SITE_URL: 'https://old.example' }, 'https://official.example', 'https://official.example'],
  ['Local development stays private', { NODE_ENV: 'development', NEXT_PUBLIC_SITE_URL: 'https://official.example' }, undefined, 'https://official.example'],
  ['Unconfigured local build stays private', { NODE_ENV: 'production' }, undefined, fallback],
];
for (const [name, env, siteOrigin, metadataOrigin] of cases) {
  const actual = resolveSiteConfiguration(env);
  assert.equal(actual.siteOrigin, siteOrigin, name);
  assert.equal(actual.metadataOrigin, metadataOrigin, name);
}
for (const value of ['invalid', 'javascript:alert(1)', 'https://u:p@example.com', 'https://example.com/path', 'https://example.com?x=1', 'https://example.com/#x']) assert.throws(() => resolveSiteOrigin(value));
assert.equal(resolveSiteOrigin('  '), undefined);
console.log(`PASS: ${cases.length} hosting/domain cases, preview indexing protection, custom-domain migration and invalid-origin rejection.`);
