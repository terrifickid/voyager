# Plan: stop the `/plan` "startTime" / `reportAllChanges` scheduler crash

## What the user told us (and why the previous diagnosis was wrong)

- The crash stack is `n.timeout → reportAllChanges → startTime` — a Svelte 5 internal `Task` being torn down mid-flush.
- The previous session's plan attributed this to a `$effect` re-entry loop in `TravelFormPrefs` and added (a) a JSON-signature gate and (b) a `withEffectGuard` helper.
- The fix did **not** stop the crash. Breadcrumbs show the wizard mounting twice with no `EFFECT_LOOP` warn ever firing, which means `withEffectGuard` is not the right detector — there is no synchronous effect re-entry loop. The previous diagnosis was wrong.
- The user is correct: it really is the `startTime` error, not a loop we can guard against with re-entry counting.

## What the breadcrumbs actually show

In order:
1. `paycard:auto-select-provider` (from a prior visit to `/`)
2. `plan:mount` — `/plan/+page.svelte` script body runs, reads `user.tripConcept`, `user.itinerary`
3. `plan:initialTripDraft` fires **twice** within the same flush — the wizard mounts, unmounts (when `submitted` flips), then re-mounts (when `edit()` is called)
4. `Cannot read properties of undefined (reading 'startTime')` inside the scheduler's `setTimeout` flush

## Real cause

The `{#if !submitted} <PlanTripWizard /> {:else} <itinerary/> {/if}` toggle in `/plan/+page.svelte` mounts and unmounts the wizard during the same render cycle. Each mount does top-level reactive reads of `user.preferences.trip` and `user.preferences.form` inside `initialTripDraft()`, and the `plan:mount` debug log reads `user.tripConcept` / `user.itinerary` synchronously at script-init time. In Svelte 5, every `$state` read during component initialization schedules a `Task` on the scheduler. When the wizard is destroyed before the scheduler's `setTimeout` flush, the `Task`'s internal record is torn down. The next flush tick walks the dead record's `startTime` field and crashes.

The `withEffectGuard` helper from the prior plan is not useful here: there is no re-entry loop. It must be removed or repurposed (see "Cleanup" below).

## Fix

### 1. Stop remounting the wizard
In `/plan/+page.svelte`, change the top-level branch from `{#if !submitted}` to keep `<PlanTripWizard />` mounted across the submit → edit round-trip. The wizard is already idempotent (`initialTripDraft` reads from `user.preferences.trip`), and `submitted` / `loading` already live in the parent. Use `<PlanTripWizard {onFinish} hidden={submitted} />` (add a `hidden` prop that does `display:none` on the wrapper) instead of `{#if !submitted}`. The `{:else}` branch becomes a separate sibling, not a conditional sibling of the wizard.

### 2. Defer the `plan:mount` breadcrumb out of script-init
In `/plan/+page.svelte`, move the `componentLog.debug({ type: EVENT.RENDER_GUARD, step: 'plan:mount', ... })` call into `$effect(() => { ... })` so the reactive reads happen in a tracked context, not at top-level. The `$effect` body must not write back to the same `$state` it reads.

### 3. Defer `initialTripDraft` reads in the wizard
In `PlanTripWizard.svelte`, replace `let draft = $state(initialTripDraft());` with `let draft = $state.raw({ destination: '', startDate: '', endDate: '', travelers: { adults: 1, kids: 0, kidsAges: [] }, archetype: null, tags: [], budget: 3, note: '' });` and seed the store-derived defaults inside an `$effect` guarded by `untrack(() => { ... })` plus a one-shot flag. This keeps the synchronous mount free of `$state` reads on the user store. The wizard's existing `$derived`s (`endMaxDate`, `dateError`, `canAdvance`, `noteLen`) and `bind:value` bindings continue to work — they only react to local `draft` writes.

### 4. Remove the wrong tool
Delete `voyager/src/lib/effectGuard.js` and remove its import + wrapper from both `PayCheckoutCard.svelte` and `TravelFormPrefs.svelte`. The JSON-signature gate in `TravelFormPrefs` stays (it is still a correct fix for the original loop, independently of the wrong attribution). `PayCheckoutCard`'s `$effect` keeps its existing `try/catch` + `untrack` but loses the guard wrapper.

### 5. Remove the now-pointless EVENT keys
Revert `RENDER_GUARD` and `EFFECT_LOOP` additions in `voyager/src/lib/log/vocab.js`. Keep `USER_ACTION`, `JOB_START`, `JOB_SUCCESS`, `JOB_FAILURE`, `RENDER_ERROR` — those are still useful breadcrumbs for the wizard / plan page / date picker / pay card instrumentation added in the previous round.

### 6. Keep what works
All the `componentLog` instrumentation added in `PlanTripWizard.svelte` (next/back/finish/setKids/setAdults/setKidAge/setBudget/setStartDate/setEndDate/setDestination breadcrumbs), `DatePicker.svelte` (USER_ACTION on select with `field` discriminant), and `plan/+page.svelte` (JOB_START/SUCCESS around `onFinish`, USER_ACTION on `edit`) stays. The +layout.svelte capture-phase `error` listener and dev-only `console.error` interceptor also stay — they are independent and useful regardless of the root cause.

## Validation

1. `cd voyager && npm run build` — no Svelte compile errors, no new warnings.
2. Hard-reload the dev server (Cmd-Shift-R / Ctrl-Shift-R) to clear any stale scheduler state from before the fix. The HMR caveat from the prior plan still applies.
3. Navigate home → `/preferences` → edit a tag → navigate to `/plan` → fill the wizard → Finish → Edit my answers → change a field → Finish again. No `reportAllChanges` crash, no `startTime` error. Exactly one `plan:mount` breadcrumb per page visit (because the wizard no longer unmounts on submit).
4. Open devtools console, run `setTimeout(() => { throw new Error('test') }, 0)` — confirm the capture-phase listener in `+layout.svelte` still surfaces it as `UNCAUGHT_EXCEPTION`.
5. In `/preferences`, edit a tag — confirm the JSON-signature gate still prevents the loop (no `RENDER_GUARD` breadcrumb spam, no re-entrancy).

## Out of scope

- Server-side logging changes.
- The `vocab.js` `RENDER_GUARD` / `EFFECT_LOOP` keys are removed because they were added for a detector that turned out to be wrong. If a future loop is found, re-add them with a corrected guard (one that throws on the **first** scheduler-throw, not on the fourth re-entry).
- Migrating the wizard off `$state` proxies entirely (would be a larger refactor; the deferred-seed approach is sufficient).
