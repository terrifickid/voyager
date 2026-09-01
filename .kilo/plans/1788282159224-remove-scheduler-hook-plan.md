# Plan — Remove dev-only schedulerHook SSR crash

## Goal

Delete the dev-only `schedulerHook.js` instrumentation and its two callsites in the root layout so the home page stops returning `500` on first SSR render with `TypeError: globalThis.addEventListener is not a function`.

## Root cause

`src/lib/schedulerHook.js:106` calls `globalThis.addEventListener('error', ...)` inside `installUncaughtBoundary()`. That function is invoked from `installErrorBoundary()` (line 200), which `src/routes/+layout.svelte:17` runs unconditionally during `import.meta.env.DEV`, including on the SSR render path. During SSR `globalThis` is a Node `global` object, which does not expose `addEventListener`. The throw escapes SSR layout evaluation and SvelteKit returns `500` for `/` (and potentially any first SSR pass after a fresh module graph).

A second bug, separate but in the same file: `installUncaughtBoundary` is declared with no `import.meta.env.DEV` guard of its own; the guard lives in the public wrappers but `installErrorBoundary` calls the unguarded `installUncaughtBoundary` directly, so the env check is bypassed.

Repro evidence (from this session):
- `npm run build` succeeds.
- `curl /` first hit → `500` `TypeError: globalThis.addEventListener is not a function at installUncaughtBoundary (src/lib/schedulerHook.js:106:13)`; subsequent hits → `200` because the failed module remains half-initialised and SvelteKit retries through a different module instance. Either way, first paint of the home page is broken.

## Decisions (locked)

- Remove the entire `src/lib/schedulerHook.js` file. No replacement. The browser-side global error handlers in `+layout.svelte` (the `if (browser && !errorHandlersInstalled)` block, lines 21-86) are sufficient — they already cover the same `error` / `unhandledrejection` events using `window.addEventListener`, plus the `console.error` interceptor. Per `.kilocode/rules/logging.md` the structured log via `$lib/logger.js` remains the source of truth.
- Keep the browser-side `console.error` interceptor and the `window.addEventListener('error'|'unhandledrejection', ...)` blocks in `+layout.svelte`. These run only inside `if (browser)`, so SSR is unaffected.
- Do not touch any production behaviour. The scheduler hook was dev-only (`if (!import.meta.env.DEV) return;`), so production builds are unaffected by its removal.

## Files touched

- Delete `voyager/src/lib/schedulerHook.js`.
- Edit `voyager/src/routes/+layout.svelte`:
  - Remove the import: `import { installSchedulerHook, installErrorBoundary } from '$lib/schedulerHook.js';` (line 8).
  - Remove the dev-only block calling them (lines 15-18).
  - Keep the existing `if (browser && !errorHandlersInstalled) { ... }` block (lines 20-86) untouched.
  - Keep the unused-now references to `serializeError`, `log`, `EVENT`, `presence` that the browser block still uses — verify they remain imported (they do: `import { log, EVENT, serializeError, presence } from '$lib/logger.js';`).

## Out of scope

- No replacement diagnostic for the original Svelte scheduler crash the hook was instrumenting to capture (see top-of-file comment in `schedulerHook.js`). The user explicitly asked to erase the hook; reintroducing observability can be a follow-up if the underlying scheduler bug resurfaces.
- No edits to `+layout.svelte` beyond removing the import and the 4-line `if (import.meta.env.DEV) { ... }` block.
- No edits to `logger.js`.

## Validation

- `cd voyager && npm run build` succeeds (sanity).
- `cd voyager && npm run dev -- --port <free>` then probe `/` repeatedly (5+ hits) — every hit returns `200`, never `500`. The home page HTML contains the new "Built for any marketplace" section markers added in the previous task.
- `curl /pay`, `curl /docs`, `curl /docs/how-voyager-pay-extends`, `curl /docs/how-voyager-pay-works` — all `200`.
- Browser devtools: no `globalThis.addEventListener` exception in the console on first paint of `/`. Uncaught exceptions in app code still surface via the browser-side `window.addEventListener('error', ...)` block in `+layout.svelte`, plus the `console.error` interceptor — observable in the structured log.

## Risks

- Removing the scheduler hook also removes its `setTimeout` / `queueMicrotask` wraps. If a future Svelte runtime regression reintroduces a swallowed throw inside the scheduler, we lose the capture-index breadcrumb. Acceptable: the user's directive is "just remove it", and browser-side handlers still catch escapes.