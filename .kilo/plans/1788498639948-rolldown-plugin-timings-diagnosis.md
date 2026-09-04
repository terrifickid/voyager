# Nuclear purge of `voyager/` generated artifacts

## What "weird shit" actually exists here

Looked at `voyager/`. The only generated dirs/files present:

| Path | What it is | Owned by |
| --- | --- | --- |
| `voyager/node_modules/` | npm install output | npm |
| `voyager/package-lock.json` | npm pinfile | npm |
| `voyager/.svelte-kit/` | SvelteKit sync output + build cache | @sveltejs/kit |
| `voyager/build/` | vite build output (none present right now) | vite |

No `dist/`, `.vite/`, `.cache/`, `.turbo/`, `.next/`, `.parcel-cache/`, or `coverage/`. `compass-js/` is a sibling workspace with its own `package.json` — leave it alone.

## Will this erase "weird vite plugins"?

**No, and that's the point you need to hear.**

The two names from your build log:
- `vite-plugin-sveltekit-compile`
- `vite-plugin-sveltekit-guard`

are NOT third-party. They are bundled INSIDE `@sveltejs/kit` — see `node_modules/@sveltejs/kit/src/exports/vite/index.js` lines 699 (`vite-plugin-sveltekit-guard`) and 967 (`vite-plugin-sveltekit-compile`). They ship as code in the `@sveltejs/kit` tarball. They will appear in EVERY `vite build` on every SvelteKit project on Earth. They are SvelteKit's own machinery for guarding module env separation and orchestrating the build.

Your `vite.config.js` only registers `tailwindcss()` and `sveltekit()`. That `sveltekit()` call is what loaded those two plugins — the same `sveltekit()` you'll see in every SvelteKit starter. There is no rogue plugin to remove.

So: nuking node_modules will not remove `vite-plugin-sveltekit-compile` / `vite-plugin-sveltekit-guard`. They will come right back after `npm install` because they're part of SvelteKit.

## So what DOES the purge fix?

Things that can actually rot over time and cause noisy / wrong plugin behavior:

1. **Version skew between `package.json` and `node_modules/`** — if anyone bumped a dep in `package.json` (or a sibling did) without reinstalling, the plugin code on disk doesn't match the version pin. The mismatch can produce old format `.svelte-kit/` files that the new kit misreads. Wipe forces a clean match against current `package.json`.

2. **Stale `.svelte-kit/` generated files** — those `generated/client/nodes/0.js`-through-`44.js`, `generated/server/internal.js`, etc. are produced by `svelte-kit sync`. If a route/component was added or renamed and not re-synced, the cached manifest can disagree with current `src/routes/**`. Wiping + `svelte-kit sync` (auto-runs at vite start) rebuilds from `src/`.

3. **Stale Vite/Rolldown dep optimizer cache** — Vite 8 keeps a deps cache under `node_modules/.vite/` (and sometimes `.vite/` at project root). If Vite was upgraded without reinstall, the cache can reference transforms the new Vite no longer ships. Fresh `node_modules` empties it.

4. **A pinned `package-lock.json` with phantom transitive deps** — if a prior install left tree residue (e.g., a yanked version, a postinstall that errored silently), wiping the lock forces npm to re-resolve everything from scratch against the registry.

5. **Adapter state** — `@sveltejs/adapter-auto` (currently used) reads env vars + filesystem to detect platforms and may have an internal cache. Wipe forces redetection.

What the purge will NOT do:
- Will not remove `vite-plugin-sveltekit-compile` / `vite-plugin-sveltekit-guard` (they're part of SvelteKit).
- Will not silence the `[PLUGIN_TIMINGS]` Rolldown log on its own. That log is Rolldown instrumentation, not an error. After the purge, if it still prints, follow-up move is `rolldownOptions.input.checks.pluginTimings = false` in `vite.config.js`.
- Will not change the build from "succeeds in 4.4s" — build was already succeeding. Purge just confirms it's still succeeding after a clean start, no behavior-change.

## Steps

Run from `voyager/`:

1. `rm -rf node_modules package-lock.json .svelte-kit build`
2. `npm install`
3. `npm run build`
4. Confirm `✔ done` and `voyager/.svelte-kit/output/` is populated.

## Risks

- `npm install` resolves whatever versions npm picks today — could drift from any env-pinned versions elsewhere (CI, deploy). If the build breaks, post the error before further changes.
- Removes reproducibility for THIS exact build until new lockfile is committed.

## Out of scope

- Editing `package.json`, `vite.config.js`, or any source code.
- Caribbean-first → "Open toolkit (no regional prefix)" copy edit (separate plan).
- If `[PLUGIN_TIMINGS]` still prints after the clean build: next move is `rolldownOptions.input.checks.pluginTimings = false`. Not part of this plan.

## Validation

- `npm run build` exits 0.
- `.svelte-kit/output/` contains `server/` and `client/` subdirs as before.
- Wall-clock build time in the same ballpark as the prior 4.4s.
