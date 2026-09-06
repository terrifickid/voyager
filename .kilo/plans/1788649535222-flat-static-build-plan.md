# Build Voyager as flat static files for local viewing

## Reality check (read first)
You cannot double-click `build/index.html` and have it render. SvelteKit
loads its JS as ES modules, and all modern browsers block ES module
loading over `file://` for security. This is a browser policy, not a
SvelteKit config issue — no `paths` or `base` setting changes it.

The closest thing to "flat files you open locally" is a static HTTP
server pointed at the build directory. The server runs no app code; it
just hands bytes to the browser. `npx serve build` is the shortest path
(no install, exits when you Ctrl-C). That's what this plan delivers.

## Decisions resolved
- Switch from `@sveltejs/adapter-auto` to `@sveltejs/adapter-static`.
- Full prerender, trailing slashes on every route, `paths.base = ''`
  so asset URLs resolve relatively.
- Delete `src/hooks.server.js` (no server to run on in static mode; it
  only sets COOP/COEP headers per response).
- `@auth/sveltekit` stays installed but unused — no code change.
- Browser-side logger (`src/lib/logger.js`) is untouched.

## Affected files
- `package.json` — swap `@sveltejs/adapter-auto` for
  `@sveltejs/adapter-static`.
- `vite.config.js` — remove the `adapter` option from the
  `sveltekit({...})` plugin call (adapter now lives in
  `svelte.config.js`).
- `svelte.config.js` — **new file**, defines the static adapter and
  `paths.base = ''`.
- `src/routes/+layout.js` — **new file**, `prerender = true`,
  `trailingSlash = 'always'`.
- `src/hooks.server.js` — **delete**.

## Implementation steps
1. `npm uninstall @sveltejs/adapter-auto`
2. `npm install -D @sveltejs/adapter-static`
3. Create `svelte.config.js`:
   ```js
   import adapter from '@sveltejs/adapter-static';

   export default {
     kit: {
       adapter: adapter({
         pages: 'build',
         assets: 'build',
         fallback: undefined,
         precompress: false,
         strict: true
       }),
       paths: { base: '' }
     }
   };
   ```
4. Edit `vite.config.js`: remove the `adapter: adapter()` line from the
   `sveltekit({...})` plugin call so SvelteKit reads the adapter from
   `svelte.config.js` instead.
5. Create `src/routes/+layout.js`:
   ```js
   export const prerender = true;
   export const trailingSlash = 'always';
   ```
6. Delete `src/hooks.server.js`.
7. `npm run build` → output to `build/`.

## Expected build output
```
build/
  index.html                ← homepage
  blog/index.html
  docs/index.html
  docs/how-voyager-pay-works/index.html
  projects/.../index.html
  stack/.../index.html
  use-cases/uc1/index.html
  _app/immutable/...        ← JS + CSS chunks
  favicon.svg
  robots.txt
```

## How to view locally
From the project root:
```bash
npx serve build
```
Opens `http://localhost:3000`. No install, no config. To change port:
`npx serve build -l 4173` (matches Vite's default preview port).

If you want the WebLLM engine (in-browser AI on `/projects/ai`) to work,
the static server must send:
```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```
`serve` honors a `serve.json` in the served directory:
```json
{
  "headers": [
    { "source": "**", "headers": [
      { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
      { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" }
    ]}
  ]
}
```
Drop that into `build/serve.json` before running `npx serve build`.
Non-AI pages render fine without these headers.

## Validation checklist
- [ ] `npm run build` exits 0.
- [ ] `build/index.html` exists; grep it for the hero headline
      "An open AI toolkit for building Caribbean-native apps." — must
      appear in the prerendered HTML, not only in JS.
- [ ] `build/_app/immutable/` is populated.
- [ ] `npx serve build` boots; `curl -s http://localhost:3000/` returns
      the prerendered HTML.
- [ ] In a browser tab at `http://localhost:3000/`: hero renders, top
      nav links work, breadcrumbs show on `/blog`, SDK terminal block
      is styled.
- [ ] DevTools Network tab: no requests to a SvelteKit server; only
      `/_app/...` and sibling HTML files.

## Risks
- `trailingSlash = 'always'` rewrites bare in-app links to directory
  form. `serve` resolves `index.html` automatically so this works.
- `adapter-static` is strict: any future `+page.server.js` or
  `+page.js` with a non-prerender `load` function will fail the build
  with the offending route named. None exist today.
- Deleting `hooks.server.js` removes the per-request log line. Browser
  logging is unaffected.

## Out of scope
- Producing a single self-contained HTML file. Would require either a
  custom build pipeline (post-process `build/` to inline all chunks)
  and rewriting Svelte's hydration to non-module scripts so `file://`
  could execute it — effectively a different framework. Not justified
  for this site.
- Desktop wrapper (Electron / Tauri). Different deliverable; flag if
  you want that instead.
