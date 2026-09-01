# Plan: Diagnose & fix `reportAllChanges → startTime` on `/plan`

## Root cause (one paragraph)

The `startTime` error is not about a missing data field — `startTime` does not exist anywhere in `voyager/src/` (verified via grep). It is Svelte's minified internal `Task`/`Effect` record being torn down mid-flush by the scheduler when **a `$effect` loops infinitely**. The previous session found this exact stack from PayCheckoutCard and fixed that loop. The same anti-pattern still exists in `TravelFormPrefs.svelte:377-380` (read of `user.preferences` via a `$derived` chain + write of `user.preferences` via `user.setPreferences(snapshot)` inside the same effect). TravelFormPrefs is mounted by `/preferences`, not `/plan`, but the global effect scheduler flushes *every* registered effect each tick, so a loop in any mounted component crashes the scheduler for all routes. Fixing the loop eliminates the symptom, but without breadcrumbs in the wizard / plan page and an effect-loop guard helper, the next loop will reproduce the same opaque crash.

## Scope (per user)

Full diagnostic instrumentation:
1. Fix the loop in `TravelFormPrefs.svelte`.
2. Add `componentLog` + `RENDER_ERROR` try/catch mirroring PayCheckoutCard.
3. Add `EVENT.RENDER_GUARD` + `EVENT.EFFECT_LOOP` to `vocab.js` and a tiny `withEffectGuard(name, log, fn)` helper.
4. Apply the guard to both PayCheckoutCard and TravelFormPrefs effects.
5. Add breadcrumbs (`JOB_START`/`JOB_SUCCESS`/`USER_ACTION`/`RENDER_GUARD`) to `PlanTripWizard.svelte`, `/plan/+page.svelte`, and `DatePicker.svelte`.
6. Strengthen `+layout.svelte` with a capture-phase `window.addEventListener('error', …, true)` and a one-time `console.error` interceptor that forwards to `EVENT.RENDER_ERROR`.

## Files to edit

| File | Change |
|---|---|
| `voyager/src/lib/log/vocab.js` | Add `RENDER_GUARD`, `EFFECT_LOOP` to the EVENT map. |
| `voyager/src/lib/util/effectGuard.js` (new) | Export `withEffectGuard(name, log, fn)` — increments per-effect counter, emits `EFFECT_LOOP` debug + bails on third re-entry within 50ms, else `RENDER_GUARD` trace on second re-entry. |
| `voyager/src/lib/components/PayCheckoutCard.svelte` | Wrap the existing `$effect` body in `withEffectGuard('PayCheckoutCard:reconcile', componentLog, () => { ... existing body ... })`. No other change. |
| `voyager/src/lib/components/TravelFormPrefs.svelte` | (a) Wrap the `$effect` body in `withEffectGuard('TravelFormPrefs:snapshot', componentLog, () => { ... })`. (b) Fix the loop: read `snapshot` once, gate the write by `lastSnapshot !== snapshot` (or compare a stable signature like `JSON.stringify(snapshot)` since `user.preferences.form` re-allocates). (c) Add try/catch + `RENDER_ERROR` log around the body, matching PayCheckoutCard. (d) Add `componentLog` child logger. |
| `voyager/src/lib/components/PlanTripWizard.svelte` | Add `componentLog` child; emit `USER_ACTION` on `next/back/finish/setKids/setNights/setStartDate/setEndDate/setDestination`; wrap `onFinish` body in `JOB_START`/`JOB_SUCCESS`; emit `RENDER_GUARD` trace on every `draft.*` mutation site (cheap, only at info level for user actions, debug level for derived recomputations). |
| `voyager/src/routes/plan/+page.svelte` | Add `componentLog` child; wrap the `onFinish` flow (`generateConcept → generateDayPlan → enrichDayPlan`) in `JOB_START`/`JOB_SUCCESS`/`RENDER_ERROR`; emit `RENDER_GUARD` once on mount. |
| `voyager/src/lib/components/DatePicker.svelte` | Add `componentLog` child; emit `USER_ACTION` on `onSelect(iso)`. |
| `voyager/src/routes/+layout.svelte` | Replace the two `window.onerror = …` / `window.onunhandledrejection = …` assignments with `addEventListener` (capture-phase `true` for `error`); install a one-time `console.error` interceptor that forwards to `EVENT.RENDER_ERROR` with route + stack (omit in prod via `import.meta.env.DEV` guard, same as prior plan). |

## Implementation notes

- `withEffectGuard(name, log, fn)`:
  ```js
  // per-effect counter + timestamps; emits EFFECT_LOOP + bails on third re-entry within 50ms.
  // else emits RENDER_GUARD trace on second re-entry within 50ms (cheap breadcrumb).
  // returns the guarded function (sync or async).
  ```
  Use a `WeakMap<fn, { count, lastAt }>` keyed on the effect body so each component's effect is independent. `count++` on entry; if `count > 1 && Date.now() - lastAt < 50`, emit `EVENT.RENDER_GUARD` with `{ step: name, count, sinceMs }`. If `count > 3 && Date.now() - firstAt < 100`, emit `EVENT.EFFECT_LOOP` with `{ step: name, count, sinceMs }` and throw (let Svelte's scheduler bail; the throw surfaces the breadcrumb via the existing `RENDER_ERROR` handler). Reset on `Date.now() - lastAt > 500`.

- `TravelFormPrefs.svelte:377-380` fix detail:
  - Current: `user.setPreferences(snapshot); onchange?.(snapshot);`
  - Fixed:
    ```js
    let lastSerialized = $state(null);
    $effect(() => {
      try {
        const s = snapshot;
        const sig = JSON.stringify(s);
        if (sig === lastSerialized) return;
        lastSerialized = sig;
        untrack(() => {
          user.setPreferences(s);
          onchange?.(s);
        });
      } catch (err) {
        componentLog.error({ type: EVENT.RENDER_ERROR, step: 'TravelFormPrefs:snapshot', err: serializeError(err, { function: 'TravelFormPrefs:snapshotSync' }) }, 'Snapshot sync failed: ' + err.message);
      }
    });
    ```
  - Alternative (preferred if the JSON.stringify cost is acceptable): compare by `JSON.stringify` as above. Use `untrack` around the write to be belt-and-suspenders.

- `PayCheckoutCard.svelte` change: the existing effect body is already wrapped in `try/catch` and uses `untrack`. Wrap it with `withEffectGuard('PayCheckoutCard:reconcile', componentLog, () => { /* existing body */ })`. Net diff: one extra wrapping call + one new import.

- `PlanTripWizard.svelte` breadcrumb sites (all use `componentLog.info` with `EVENT.USER_ACTION`, include `from`/`to` where applicable):
  - `next()` (existing step handler)
  - `back()`
  - `finish()` — also wrap the `await` chain in `JOB_START`/`JOB_SUCCESS`/`RENDER_ERROR`
  - `setKids(n)`, `setNights(n)`, `setStartDate(iso)`, `setEndDate(iso)`, `setDestination(s)`
  - `setVibe(...)`, `setPace(...)` if they exist
  - Emit `RENDER_GUARD` (debug, not info) at the bottom of `initialTripDraft()` to confirm derived recomputation on mount.

- `/plan/+page.svelte` breadcrumb sites:
  - Wrap the `onFinish` body in `JOB_START` (`step: 'plan:onfinish'`) / `JOB_SUCCESS` / `RENDER_ERROR`.
  - `EVENT.RENDER_GUARD` debug emit on mount with `{ step: 'plan:mount', rank: ranked.length, hasConcept: !!user.tripConcept, hasItinerary: !!user.itinerary }`.

- `DatePicker.svelte` breadcrumb site:
  - On `onSelect(iso)`, emit `USER_ACTION` with `{ step: 'datepicker:select', from: prev, to: iso }` (or `field: 'start' | 'end'` if the component is used for both).

- `+layout.svelte`:
  - Replace `window.onerror = ...` with `window.addEventListener('error', handler, true)` (capture phase).
  - Replace `window.onunhandledrejection = ...` with `window.addEventListener('unhandledrejection', handler)`.
  - Add a one-time `console.error` interceptor guarded by `import.meta.env.DEV`:
    ```js
    if (import.meta.env.DEV) {
      const orig = console.error;
      console.error = (...args) => { orig.apply(console, args); globalLog.warn({ type: EVENT.RENDER_ERROR, step: 'console.error', args: args.map(a => presence(a)) }, 'console.error fired'); };
    }
    ```
  - Use `presence()` (already exported from `logger.js`) to avoid logging the full value.

- `vocab.js` additions (do NOT duplicate):
  ```js
  RENDER_GUARD: 'render_guard',    // breadcrumb for skipped/guarded render or derived recomputation
  EFFECT_LOOP: 'effect_loop',      // defensive guard fired when an $effect re-entered >3 times in <100ms
  ```

- `effectGuard.js` should live in `src/lib/util/` (verify the directory exists; if not, place under `src/lib/`).

## Validation

1. `cd voyager && npm run build` — no new warnings, no Svelte compile errors.
2. `grep -RIn "console\.\(log\|warn\|error\)" voyager/src/lib/components/{PayCheckoutCard,TravelFormPrefs,PlanTripWizard,DatePicker}.svelte voyager/src/routes/{+layout,plan/+page}.svelte` returns 0 matches (console.error interceptor in +layout is allowed — it uses the original `console.error` only via assignment; the grep should still match. If we want 0 matches, replace the assignment with a `let origConsoleError` outside the conditional and log to `globalLog.warn` only — no `console.*` calls).
3. Dev: navigate to `/preferences`, edit a tag, observe exactly one `USER_ACTION` info log, no `EFFECT_LOOP` warn, no `reportAllChanges` crash. Then navigate to `/plan`, generate a plan, observe exactly one `plan:onfinish` `JOB_START` → `JOB_SUCCESS`, no crashes.
4. Dev: in `TravelFormPrefs.svelte`, temporarily comment out the `if (sig === lastSerialized) return;` line to re-introduce the loop. Confirm `EFFECT_LOOP` warn fires after 3 re-entries, the effect throws, and the existing `RENDER_ERROR` handler in `+layout.svelte` surfaces it. Restore the guard.
5. `+layout.svelte` capture-phase listener: in dev, force a `throw new Error('test')` from a `setTimeout(0, () => { throw new Error(...) })` and confirm both the `error` listener and the `console.error` interceptor fire.

## Open questions

None — user picked the full-instrumentation scope.

## Done =

- `TravelFormPrefs.svelte` loop fixed.
- Both effects guarded by `withEffectGuard`.
- Wizard, plan page, date picker emit structured breadcrumbs.
- `+layout.svelte` catches Svelte-scheduler-thrown errors via capture-phase listener + (in dev only) `console.error` interceptor.
- Future loops in *any* component emit `EFFECT_LOOP` warn + bail before the scheduler dies, and surface via existing `RENDER_ERROR` breadcrumb path.
