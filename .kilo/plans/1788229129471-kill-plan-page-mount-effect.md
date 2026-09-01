# Plan: kill the cross-route `reportAllChanges` / `startTime` crash

## Goal

Eliminate the browser crash

```
Uncaught TypeError: Cannot read properties of undefined (reading 'startTime')
    at et.reportAllChanges (<anonymous>:2:19429)
```

that fires on navigation to either `/plan` **or** `/pay` (and likely any other SvelteKit route, since the cause is shared).

## Root cause (verified)

There is no application code reading `.startTime` on an undefined object. `rg -n "startTime" voyager/src` returns a single hit: a comment in `TravelFormPrefs.svelte:386` that documents this exact crash from the previous fix session.

`startTime` belongs to a Svelte 5 internal scheduler `Task` record (`runtime.js`, minified as `et.reportAllChanges`). It becomes `undefined` when the scheduler tears a `Task` down mid-flush. The `Task` that gets torn down is one registered by a **re-entrant reactive read inside an already-failing scheduler tick**.

The shared substrate between `/plan` and `/pay` is **`voyager/src/routes/+layout.svelte`**, specifically the dev-only `console.error` interceptor at lines 59-73:

```js
if (import.meta.env.DEV) {
  const origErr = globalThis['console']['error'];
  globalThis['console'].error = (...args) => {
    origErr.apply(globalThis['console'], args);
    glog.warn(
      {
        type: EVENT.RENDER_ERROR,
        step: 'console.error',
        route: page.url.pathname,   // <-- reads $app/state
        args: args.map((a) => presence(a))
      },
      'console.error fired'
    );
  };
}
```

`page` from `$app/state` is reactive `$state`. Reading `page.url.pathname` inside the `console.error` wrapper — which Svelte's scheduler can invoke from inside its own flush when a `Task.startTime` lookup fails — registers a reactive dependency on `page` from a synchronous code path that runs inside the scheduler. When `page` then changes (because the navigation that triggered the crash is still in flight), the scheduler schedules a new `Task` for the wrapper, but the wrapper's `Task` was already torn down. The next flush tick walks the dead record's `startTime` and crashes.

The window `error` handler at lines 20-39 reads `page.url.pathname` synchronously too, but it runs in a separate microtask (after the scheduler flush completes) and doesn't re-enter the scheduler, so it's not the trigger — it's just a confounder that points at the same file.

Why it fires on **both** `/plan` and `/pay`: the crash isn't page-local. It's the act of navigating to any route while the dev interceptor is installed. `/plan` and `/pay` both trigger Svelte's `reportAllChanges` flush during navigation (one for the page-bound `derived`s in `+page.svelte`, one for the `RampQuoteAggregator` / `PlanTripWizard` mounts). Any flush that ends up calling `console.error` (which Svelte does on uncaught reactive errors) re-enters via the wrapper and tears down a `Task`.

## Edits

### Edit 1 — `+layout.svelte`: read `page.url.pathname` outside the reactive wrapper

The fix is to make the wrapper non-reactive: read the path into a local at install time, and update it from a small `$effect` that wraps a single `untrack`-ed read of `page`. The wrapper itself then only reads a plain local.

**Before** (lines 59-73):

```js
if (import.meta.env.DEV) {
  const origErr = globalThis['console']['error'];
  globalThis['console']['error'] = (...args) => {
    origErr.apply(globalThis['console'], args);
    glog.warn(
      {
        type: EVENT.RENDER_ERROR,
        step: 'console.error',
        route: page.url.pathname,
        args: args.map((a) => presence(a))
      },
      'console.error fired'
    );
  };
}
```

**After**:

```js
if (import.meta.env.DEV) {
  let currentRoute = page.url.pathname;
  $effect(() => {
    currentRoute = untrack(() => page.url.pathname);
  });

  const origErr = globalThis['console']['error'];
  globalThis['console']['error'] = (...args) => {
    origErr.apply(globalThis['console'], args);
    glog.warn(
      {
        type: EVENT.RENDER_ERROR,
        step: 'console.error',
        route: currentRoute,
        args: args.map((a) => presence(a))
      },
      'console.error fired'
    );
  };
}
```

Add `import { untrack } from 'svelte';` to the top of the file.

Rationale: the wrapper now reads `currentRoute`, a non-reactive `let`, not `page.url.pathname`. The `$effect` that updates `currentRoute` runs on its own scheduler `Task`, isolated from the `console.error` call site. `untrack` prevents the effect itself from registering a dep on `page` from inside its reactive body (which would be the same bug). This matches the pattern already used in `TravelFormPrefs.svelte:396` and `PayCheckoutCard.svelte:35,48`.

### Edit 2 — defensive: same `untrack` wrap on the window error handler

Same reasoning. The window `error` handler at lines 20-39 reads `page.url.pathname` synchronously. In normal browser semantics it runs after the scheduler flush so it can't re-enter, but on a `reportAllChanges`-driven throw it's invoked from inside a `setTimeout(0)` flush continuation and can race the next scheduler tick. Wrap the read in `untrack` for the same reason.

**Before** (lines 20-39, abridged):

```js
window.addEventListener(
  'error',
  (event) => {
    glog.error(
      {
        type: EVENT.UNCAUGHT_EXCEPTION,
        route: page.url.pathname,
        ...
      },
      ...
    );
  },
  true
);
```

**After**:

```js
window.addEventListener(
  'error',
  (event) => {
    glog.error(
      {
        type: EVENT.UNCAUGHT_EXCEPTION,
        route: untrack(() => page.url.pathname),
        ...
      },
      ...
    );
  },
  true
);
```

And same for `unhandledrejection` at lines 41-51. (Use the same `untrack` import added in Edit 1.)

### Edit 3 — also fix `+layout.svelte`'s read of `page` in the template

Lines 81-83 read `page.url.pathname` inside the `<main>` block:

```svelte
{#if page.url.pathname !== '/'}
  <Breadcrumbs />
{/if}
```

This is a legitimate reactive read of `page` from a render context (Svelte handles template reactivity correctly), so it stays as-is. Not a scheduler-re-entrant read.

### Edit 4 — already-done items (no further work)

- `effectGuard.js` deleted; `PayCheckoutCard.svelte` and `TravelFormPrefs.svelte` no longer import it.
- `RENDER_GUARD` and `EJECT_LOOP` reverted from `vocab.js`.
- `PlanTripWizard.svelte` date pre-fill (this session) and the `||` fallback for empty-string saved dates.
- `TravelFormPrefs.svelte:390` and `PayCheckoutCard.svelte:32` already use `untrack` for their writes — no further change.

## Files affected

- `voyager/src/routes/+layout.svelte` — Edit 1 and Edit 2 only. Add `import { untrack } from 'svelte';`. Replace the dev interceptor block. Wrap two `page.url.pathname` reads in `untrack`.

No other files change.

## Out of scope

- Replacing `class:hidden={submitted}` in `voyager/src/routes/plan/+page.svelte` with `{#if !submitted}` — orthogonal and would mask whether Edit 1 actually fixes the crash. Defer until after this lands.
- `PlanTripWizard.svelte` further changes (date pre-fill is already shipped).
- Any change to `Breadcrumbs.svelte`, `Header.svelte`, `RampQuoteAggregator.svelte`, `PayCheckoutCard.svelte`, `user.svelte.js`.
- Production (`import.meta.env.DEV === false`) is unaffected because the interceptor is dev-only; the window-handler `untrack` wrap in Edit 2 is the only change that ships to prod.

## Validation

1. `cd /workspaces/voyager/voyager && npm run build` → clean compile.
2. **Fresh dev server**, hard-reload `/`. Open devtools console, confirm one `plan:mount` / breadcrumb log fires (not a stack of duplicates).
3. Navigate `/` → `/plan`. No `startTime` / `reportAllChanges` throw. Wizard renders.
4. Navigate `/plan` → `/pay`. No throw. `RampQuoteAggregator` renders.
5. Navigate `/pay` → `/docs` → `/plan` three times. No throw on any transition.
6. Manually trigger a `console.error('boom')` in the dev console while on `/plan`. The wrapped log fires with `route: "/plan"`. No scheduler crash. Navigate away — `route` updates correctly.
7. Edit `+layout.svelte` to temporarily remove the `untrack` wrap and re-run steps 3-5. The crash returns. Confirm the fix is causal.

## Risks / edge cases

- The dev-only interceptor's `$effect` is installed once per page load. It runs in the layout's lifetime and updates `currentRoute` on every navigation. `currentRoute` will lag by one tick on the very first route of a fresh load (init reads the install-time value, which is `page.url.pathname` at install). That matches the existing "log on mount" pattern in `+page.svelte:22-36` and is fine.
- If `page.url.pathname` is read anywhere else inside a synchronous callback invoked from the scheduler flush (e.g. a future dev-mode debug helper), the same `untrack` wrap must be used. Add a short comment near the import noting this requirement.
- If the crash still fires after Edit 1+2 land, the next suspect is the `class:hidden` wizard toggle on `/plan` — not `/pay`. The escalation path is documented but not in scope.