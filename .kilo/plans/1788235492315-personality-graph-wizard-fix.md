# Fix: `/plan` wizard must compute + save personality into the user store

## Goal

When the user finishes the `/plan` wizard, the `PersonalityGraph` card at the top of the itinerary must show the correct OCEAN trait bars and matching archetype — instead of all zeros with an empty `Closest type` line.

## Root cause

`PersonalityGraph.svelte` already reads `user.preferences.personality`, `user.preferences.form.archetype`, and `user.preferences.form.tags` directly from the store. That part is correct.

The problem is the writer. `PlanTripWizard.svelte:399-409` does this on `finish()`:

```js
user.setPreferences({
  form: { archetype: draft.archetype, tags: [...draft.tags], budget: draft.budget, note: draft.note?.trim() || null },
  personality: user.preferences.personality,   // {0,0,0,0,0} if /preferences was never visited
  type: user.preferences.type,                 // null      if /preferences was never visited
  trip: user.preferences.trip,
});
```

The wizard never computes the OCEAN vector from `draft.archetype` / `draft.tags`. So if the user lands on `/plan` directly and submits:

- `preferences.form.archetype` is set → `PersonalityGraph`'s `hasSignal` is true → empty-state hint skipped.
- `preferences.personality` is `{0,0,0,0,0}` → trait bars render but everything reads `0.00`.
- `preferences.type` is `null` → `PersonalityGraph`'s local `nearestType({0...0})` returns the first archetype arbitrarily (since all distances are equal).

`PersonalityGraph` is doing the right thing by reading the store. The store is wrong because the wizard never wrote the correct values.

## Decisions

- The wizard **must compute `personality` + `type` from `draft` and write them via `user.setPreferences(...)`** on `finish()`. After that, `PersonalityGraph` will read correct values on its own.
- Reuse the same OCEAN math as `TravelFormPrefs` by importing the shared helpers from a new `voyager/src/lib/preferences/personality.js`. `TravelFormPrefs` adopts the same module so the two writers can't drift.
- No changes to `PersonalityGraph.svelte`, the user store, or any route file.

## Affected files

- `voyager/src/lib/preferences/personality.js` — **new**. Exports `clamp`, `computePersonality(form, opts)`, `nearestType(personality, archetypeOptions, scoringTraits)`. Pure functions, no Svelte. `opts` shape: `{ archetypeOptions, tagOptions, scoringTraits }`.
- `voyager/src/lib/components/TravelFormPrefs.svelte` — drop the local `clamp` / `computePersonality` / `nearestType`; import from the new module. Update the two call sites in `$derived`s to pass the new opts shape.
- `voyager/src/lib/components/PlanTripWizard.svelte` — on `finish()`, compute `personality` + `type` from `draft` using the same helpers and write them into the `setPreferences` payload.

## Implementation steps

1. **Create `voyager/src/lib/preferences/personality.js`** (plain JS — no TypeScript):
   ```js
   import { archetypeOptions, scoringTraits } from './config.js';

   export const clamp = (v, lo = -1, hi = 1) => Math.max(lo, Math.min(hi, v));

   export function computePersonality(form, { archetypeOptions: archOpts, tagOptions, scoringTraits: traits }) {
     const out = {};
     const archOpt = archOpts.find((o) => o.id === form.archetype);
     const selected = tagOptions.filter((o) => form.tags.includes(o.id));
     for (const { key } of traits) {
       const parts = [];
       if (archOpt?.traits[key]) parts.push(archOpt.traits[key]);
       for (const o of selected) if (o.traits[key]) parts.push(o.traits[key]);
       out[key] = parts.length ? clamp(parts.reduce((a, b) => a + b, 0) / parts.length) : 0;
     }
     return out;
   }

   export function nearestType(personality, archetypeOptions, scoringTraits) {
     let best = null;
     let bestD = Infinity;
     for (const opt of archetypeOptions) {
       let d = 0;
       for (const { key } of scoringTraits) {
         const dv = (personality[key] || 0) - (opt.traits[key] || 0);
         d += dv * dv;
       }
       if (d < bestD) { bestD = d; best = opt; }
     }
     return best;
   }
   ```
   Note: parameter names in the destructured `opts` object (`archOpts`, `traits`) are local aliases used only inside the function body — pure JS, no type annotations.

2. **Refactor `TravelFormPrefs.svelte`:**
   - Add `import { computePersonality, nearestType } from '$lib/preferences/personality.js';` and `import { archetypeOptions, scoringTraits } from '$lib/preferences/config.js';`.
   - Delete the local `clamp` / `computePersonality` / `nearestType` (lines 301-343).
   - Replace the two `$derived` lines (lines 360-361):
     ```js
     const personality = $derived(computePersonality(form, {
       archetypeOptions: archetypeField.options,
       tagOptions: tagsField.groups.flatMap((g) => g.options),
       scoringTraits: config.scoring.traits,
     }));
     const type = $derived(nearestType(personality, archetypeField.options, config.scoring.traits));
     ```
   - The `snapshot` `$derived` is unchanged — it still reads `personality` and `type` and is written via `user.setPreferences` as before.

3. **Update `PlanTripWizard.svelte` `finish()` (lines 351-433):**
   - Add imports: `computePersonality` and `nearestType` from `$lib/preferences/personality.js`, plus `archetypeOptions` and `scoringTraits` from `$lib/preferences/config.js`.
   - Build a `draftForm` snapshot and compute `draftPersonality` + `draftType` from it. `tagOptions` is `CONFIG.tagGroups.flatMap((g) => g.options)` (the wizard already has `CONFIG.tagGroups` in scope).
   - Replace the `user.setPreferences(...)` payload at lines 399-409:
     ```js
     const draftForm = {
       archetype: draft.archetype,
       tags: [...draft.tags],
       budget: draft.budget,
       note: draft.note?.trim() ?? '',
     };
     const draftPersonality = computePersonality(draftForm, {
       archetypeOptions,
       tagOptions: CONFIG.tagGroups.flatMap((g) => g.options),
       scoringTraits,
     });
     const draftType = nearestType(draftPersonality, archetypeOptions, scoringTraits);

     user.setPreferences({
       form: {
         archetype: draft.archetype,
         tags: [...draft.tags],
         budget: draft.budget,
         note: draft.note?.trim() || null,
       },
       personality: draftPersonality,
       type: draftType ? { id: draftType.id, label: draftType.label, icon: draftType.icon } : null,
       trip: user.preferences.trip,
     });
     ```
   - `user.setTrip(snapshot)` above stays unchanged.

## Risks & mitigations

- **Drift between `/preferences` and `/plan` math.** Both writers import the same `computePersonality` / `nearestType` from `personality.js`. Verify by completing both flows with the same archetype + tags and confirming the trait numbers match.
- **Pre-existing `agent/index.ts:62` `TripConcept` svelte-check error** is unrelated; do not touch.
- **SSR:** `personality.js` is pure, no browser globals, no Svelte runes. Same risk profile as the existing `config.js`.

## Validation

1. `./node_modules/.bin/svelte-check --tsconfig ./jsconfig.json --threshold error` — no new errors beyond the pre-existing `agent/index.ts:62`.
2. `cd voyager && ./node_modules/.bin/vite build` — succeeds.
3. Manual: fresh session → `/plan` → complete wizard (e.g. "The Explorer" + 2 tags) → submit. Confirm the `Personality` card on the itinerary shows non-zero bars (openness ≈ 0.80, neuroticism ≈ -0.40) and the correct closest-type icon/label.
4. Manual: `/preferences` with the same archetype + tags → confirm identical trait numbers.
5. Manual: `/preferences` first, then `/plan` with different archetype/tags → confirm the chart reflects the wizard's picks (current behavior; wizard overwrites via `setPreferences`).

## Out of scope

- Showing an "Edit my preferences" link from the chart.
- Persisting preferences across sessions.
- Changing OCEAN math or trait list.
