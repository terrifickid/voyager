# Plan: fix `Cannot read properties of undefined (reading 'startTime')` in PlanTripWizard

## What's happening

Devtools console shows:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'startTime')
    at et.reportAllChanges (<anonymous>:2:19429)
    ...
    at n.timeout (<anonymous>:2:5652)
```

This is Svelte 5's internal scheduler crash — `reportAllChanges` runs over a `Task` record whose `startTime` was cleared during teardown. It's the canonical Svelte 5 symptom of an infinite / re-entrant effect loop that flushed mid-tick.

Reproducible on `/plan` whenever the deferred-seed `$effect` in `PlanTripWizard` runs while the user store already has a saved trip from a previous session. Source files: `voyager/src/lib/components/PlanTripWizard.svelte:183-199` and the `finish()` handler at `voyager/src/lib/components/PlanTripWizard.svelte:411-423`.

## Root cause

The previous pass added this deferred-seed effect in `PlanTripWizard.svelte:182-199`:

```js
let seeded = $state(false);
$effect(() => {
  if (seeded) return;
  seeded = true;
  untrack(() => {
    const seededDraft = initialTripDraft();
    draft.destination = seededDraft.destination;
    // ... writes 8 fields into `draft` from user.preferences.trip / user.preferences.form
  });
});
```

The writes go in one direction only (store → `draft`), so the loop itself is not infinite — but it runs against a parent (`<PlanTripWizard hidden={submitted} />`) that is now **always mounted**, with `class:hidden` toggling. When the user submits the wizard:

1. `finish()` synchronously calls `user.setTrip(snapshot)` then `user.setPreferences({...})` (`PlanTripWizard.svelte:412-423`).
2. Both assign a new object to `user.preferences` and `user.preferences.form`.
3. The deferred-seed effect's tracking still includes the read of `user.preferences.trip` and `user.preferences.form.*` (`initialTripDraft`, lines 110, 143-146).
4. Svelte schedules the seed effect to re-run.
5. On the same tick the wizard's own `class:hidden` flip causes the parent wrapper to re-render. The combined effect flush interleaves with the `class:hidden` reactivity and tears down the Task record mid-flush → `startTime` is `undefined` → `reportAllChanges` throws.

The two comments at `PlanTripWizard.svelte:177-181` and `TravelFormPrefs.svelte:381-387` literally predict this exact stack frame. The TravelFormPrefs comment is for its own write-effect; the wizard's analogous code path is the seed effect writing into `draft` while reading `user.preferences.trip`.

## Fix

Decouple the seed-read from the store-write entirely. The wizard needs:

1. A **one-shot read** from the user store at mount to seed `draft`.
2. A **separate, non-reactive** way to persist (which already exists — `finish()` writes only at submit-time, not in any `$effect`).
3. The `$effect` removed entirely in favour of a plain non-reactive call at component-init time, after `draft` is declared.

The cleanest pattern in Svelte 5 for "seed once from a store, never react to it" is to read the store value at script-init time *after* declaring `$state`, capture into a local, and write through. But that is exactly what the previous comment warned against (read at init in a `{#if}`-toggling world). Now that the wizard is permanently mounted (no mount/remount churn), reading from the store once at init is safe again.

### Edit 1 — `voyager/src/lib/components/PlanTripWizard.svelte:175-199`

**Before** (lines 175-199):

```js
let draft = $state(structuredClone(BASE_DRAFT));

// Defer the store-derived seed into an $effect ...
let seeded = $state(false);
$effect(() => {
  if (seeded) return;
  seeded = true;
  untrack(() => {
    const seededDraft = initialTripDraft();
    draft.destination = seededDraft.destination;
    // ... 8 writes
  });
});
```

**After**:

```js
let draft = $state(initialTripDraft());
```

That is the **entire fix**. Drop the `$effect`, drop `seeded`, drop `untrack` from this block. `initialTripDraft()` already does the right thing (reads `user.preferences.trip` *once* at script-init, returns a fresh object that becomes `draft`'s initial value). Because the wizard is now permanently mounted, the "seed from existing trip on mount" semantics are preserved: every fresh visit to `/plan` constructs a new instance, reads the user store at construction time, and never re-runs.

### Why this is safe (cross-checks)

- `finish()` at `PlanTripWizard.svelte:411-423` writes to `user.setTrip` and `user.setPreferences`. Those writes do **not** trigger any `$effect` in `PlanTripWizard` after Edit 1 (the only `$effect` in the wizard was the seed one). Verified by re-reading the whole file: no remaining `$effect` blocks in the wizard's `<script>`. The `endMaxDate`, `currentStep`, `progress`, `dateError`, `canAdvance`, `noteLen` are all `$derived` — they only read `draft`, which doesn't change when the store changes externally.
- `TravelFormPrefs.svelte:390-410` has its own self-throttling effect (JSON signature compare) and is not used inside `PlanTripWizard` (grep-verified: only `/preferences` route imports it). No cross-component feedback.
- `user.setPreferences` / `user.setTrip` (`user.svelte.js:22-28`) overwrite `preferences` with a new object reference. Any reader that re-derives on `preferences` (none in the wizard now) would re-run, but no reader exists in the wizard after the fix.
- The deferred-seed was a workaround for the old `{#if !submitted}` mount/unmount pattern. With the new always-mounted + `class:hidden` pattern, the seed-must-run-once invariant is preserved by JS execution order at component construction, not by an effect.

### Edit 2 — `voyager/src/lib/components/PlanTripWizard.svelte:2-6`

Remove the now-unused `import { untrack } from 'svelte'` after Edit 1. Verify with grep that nothing else in the file uses `untrack`; if not, drop the line. (If grep finds another `untrack` call, leave the import.)

### Out of scope

- `TravelFormPrefs.svelte:390-410` already has the JSON-signature guard so it doesn't loop; no change there.
- No changes to `user.svelte.js`, no store changes, no build-config changes.
- The `class:hidden` flip in `/plan/+page.svelte` from the previous plan is correct and stays.

## Validation

1. **Build**: `cd /workspaces/voyager/voyager && npm run build` → clean compile.
2. **Grep**: `rg -n "untrack|\\$effect" voyager/src/lib/components/PlanTripWizard.svelte` → no matches (untrack import removed, no $effect remains in the wizard).
3. **Reproduce on `/plan`**:
   - Hard-reload (Cmd-Shift-R) `/plan`. Confirm wizard form is visible.
   - Fill in destination, dates, travelers, archetype, tags, budget, note. Click Finish.
   - **Critical**: confirm wizard hides, itinerary section appears, and **no** `startTime` / `reportAllChanges` error in devtools console across: initial mount, every step advance, the Finish click, and the "Edit my answers" round-trip.
   - Edit a field and Finish again. Again no crash.
4. **Effect-loop regression guard**: `rg -n "RENDER_GUARD|EFFECT_LOOP|startTime" voyager/src` → no new occurrences, only the two existing comments documenting the prior crash.
5. **Component-log sanity**: open `/plan`, click through wizard + finish + edit → devtools should show one `plan:initialTripDraft` log per mount and one `plan:finish` per submit; **no** duplicate `plan:initialTripDraft` on submit (proof the seed is no longer reactive).

## Affected files

- `voyager/src/lib/components/PlanTripWizard.svelte` — replace the `$effect` block at lines 182-199 with a one-liner; drop the `seeded` declaration; drop the `untrack` import if unused.
- **No other files change.**

## Open / implicit assumptions

- "`initialTripDraft()` is safe to call at script-init time" — true now (wizard always mounted) and was the reason we deferred it previously. If a future change re-introduces conditional mounting, revert to an explicit `$effect.pre` for the seed.
- "`user.setTrip` / `user.setPreferences` writes won't be observed by any reader" — true today; re-check if a new `$effect` is ever added inside `PlanTripWizard`.
