# Plan a Trip — Step-by-Step Wizard

## Goal

Add a `/plan` route that walks the user through a multi-step wizard:
1. Destination
2. Travel dates
3. Travelers
4. The four existing preference questions (archetype, tags, budget, note) — re-implemented inline, **not** reusing `TravelFormPrefs`

Each step has its own screen with **Next** and **Back** buttons. The **Next** button is disabled until the current step has a valid answer. **Back** always returns to the previous step with answers preserved. On the final step, **Finish** saves the trip + preferences to the `user` store and redirects to `/chat`.

No LLM context bridge in this change — the trip data is stored for UI/follow-up use only.

## Decisions (resolved)

| Question | Answer |
|---|---|
| Trip fields | Destination + dates + travelers |
| Finish action | Save to `user` store → redirect to `/chat` |
| Persistence | In-memory only (mirror preferences) |
| Preference UI | **Duplicate** into the wizard — do **not** reuse `TravelFormPrefs` |
| LLM bridge | **Skip** for this change |

## Files to add

```
src/routes/plan/+page.svelte                    # thin shell, renders <PlanTripWizard />
src/lib/components/PlanTripWizard.svelte        # the wizard itself
```

## Files to edit

- `src/lib/components/Header.svelte` — add `{ href: '/plan', label: 'Plan a trip', exact: true }` to the `links` array (insert between Home and Chat).
- `src/lib/stores/user.svelte.js` — extend `preferences` with a `trip` object (see Data Model) and add a `setTrip(trip)` setter that mirrors `setPreferences`.

## Data Model

Extend `user.preferences` in `src/lib/stores/user.svelte.js`:

```js
preferences = {
  form: { archetype, tags, budget, note },        // unchanged
  personality: { ... },                            // unchanged
  type: null,                                      // unchanged
  trip: {                                          // NEW
    destination: null,     // string (free text, non-empty)
    startDate: null,       // ISO yyyy-mm-dd
    endDate: null,         // ISO yyyy-mm-dd, must be >= startDate
    travelers: {           // NEW
      adults: 1,           // int, 1..10
      kids: 0,             // int, 0..10
      kidsAges: []         // array of ints; length must equal `kids`
    },
    draft: null,           // raw snapshot at time of save, or null
    savedAt: null          // ISO timestamp at save, or null
  }
}
```

`setTrip(partial)` accepts a partial trip object and merges it into `preferences.trip` (same shape as `setPreferences`).

## Wizard Step Configuration

Inline `STEPS` array inside `PlanTripWizard.svelte` (mirrors the inline `CONFIG` pattern in `TravelFormPrefs`):

```js
const STEPS = [
  { id: 'destination', title: 'Where to?',         validate: s => s.destination?.trim().length > 0 },
  { id: 'dates',       title: 'When?',             validate: s => !!s.startDate && !!s.endDate && s.endDate >= s.startDate },
  { id: 'travelers',   title: "Who's coming?",     validate: s => s.travelers.adults >= 1 && s.travelers.kids === s.travelers.kidsAges.length },
  { id: 'archetype',   title: 'Which sounds like you?', validate: s => !!s.archetype },
  { id: 'tags',        title: 'Pick all that apply',     validate: () => true }, // optional
  { id: 'budget',      title: 'Budget',                  validate: s => s.budget >= 1 && s.budget <= 5 }, // default 3 always passes
  { id: 'note',        title: 'Anything else?',          validate: () => true } // optional
]
```

Seven steps total. Steps 4–7 mirror the four questions from `TravelFormPrefs` but are re-implemented inline per user instruction (same OCEAN weights and option labels copied into the wizard's own `CONFIG`).

## Wizard Component Behavior

- `let stepIndex = $state(0)`
- `let draft = $state(initialTripDraft())` — seeded from `user.preferences.trip` if present, else defaults above
- `currentStep = $derived(STEPS[stepIndex])`
- `progress = $derived(((stepIndex + 1) / STEPS.length) * 100)`
- `canAdvance = $derived(currentStep.validate(draft))`

Per-step rendering (simple `{#if stepIndex === 0}` … `{:else if stepIndex === 1}` … switch, or a small `stepRenderers` map — keep it simple, switch is fine for 7 steps):

1. **Destination** — text input, `bind:value={draft.destination}`, autofocus.
2. **Dates** — two `<input type="date">` for start/end; show a small inline error if `endDate < startDate`.
3. **Travelers** — two number steppers for adults/kids; when `kids > 0`, show N age inputs (`<input type="number" min="0" max="17">`).
4. **Archetype** — five radio cards (icon + label + description) — copy labels/icons/descriptions from `TravelFormPrefs.svelte` `CONFIG.archetypes`.
5. **Tags** — three groups of pill checkboxes (`Vibe`, `Activities`, `Environment`) — copy from `TravelFormPrefs.svelte` `CONFIG.tagGroups`. Multi-select via `bind:group` per group.
6. **Budget** — five segmented `$` buttons — copy from `TravelFormPrefs.svelte` budget rendering. Default `3`.
7. **Note** — textarea, 3 rows, 500 char max — copy from `TravelFormPrefs.svelte`.

### Footer / navigation

Sticky bottom bar inside the wizard card:
- **Back** button (`bg-slate-800 text-slate-100`) — disabled on step 0.
- **Next** button (`bg-indigo-600`) — disabled when `!canAdvance`. On step 6 (last), button label becomes **Finish** and `disabled` only if `note` length > 500.
- Step indicator: "Step X of 7" + thin progress bar (`bg-indigo-600`, fill = `progress%`).

### Keyboard

- **Enter** in any input advances (calls `next()`) if `canAdvance`. Implemented via `onkeydown` on each input, or wrapping the step body in a `<form on:submit|preventDefault={next}>`.

## Save & Redirect

`finish()`:
```js
user.setTrip({
  destination: draft.destination.trim(),
  startDate: draft.startDate,
  endDate: draft.endDate,
  travelers: draft.travelers,
  draft: { ...draft },
  savedAt: new Date().toISOString()
})
// also write the four preference answers into the existing form slot
user.setPreferences({
  archetype: draft.archetype,
  tags: draft.tags,
  budget: draft.budget,
  note: draft.note?.trim() || null
})
goto('/chat')
```

`setPreferences` already handles re-deriving `personality` and `type` via the `$effect` in `TravelFormPrefs` — but since the wizard doesn't render that component, we should call it from `chat/+page.svelte` once when it mounts (already happens via the context prompt module). Confirm in `chat/+page.svelte` that reading `user.preferences.form` triggers the existing context prompt; if not, no additional wiring is required because `contextPrompt.svelte.js` is `$derived` from the store and will update automatically.

## Out of Scope

- LLM context bridge for trip data (skip per user).
- Persistence beyond in-memory (no localStorage, no API).
- Reusing/refactoring `TravelFormPrefs` into a stepper.
- Date picker library — native `<input type="date">` is sufficient.
- Validation library — hand-rolled per-step validators above.
- Animations between steps (single render via switch is enough).

## Validation Steps

1. `cd voyager && npm install` (no new deps expected).
2. `npm run dev`, visit `/plan`.
3. Walk through all 7 steps; confirm:
   - **Next** is disabled until each step's validator passes.
   - **Back** preserves prior answers.
   - Selecting archetype + tags updates nothing visible (no live OCEAN panel in the wizard — by design).
   - On final step, **Finish** writes to `user.preferences.trip` and redirects to `/chat`.
4. In browser devtools: `window` should expose the `user` store singleton; inspect `user.preferences.trip` after finishing.
5. Header nav shows "Plan a trip" between Home and Chat; active state highlights on `/plan`.
6. Run `npm run lint` and `npm run check` (svelte-check) — confirm no new errors.

## Risks / Caveats

- **OCEAN weights drift**: copying the trait weights into the wizard means they exist in two places. Acceptable for this change; a follow-up could extract a shared `lib/preferences/schema.js`.
- **`TravelFormPrefs` and the wizard can disagree**: editing the same fields on `/preferences` after planning will overwrite what the wizard saved (last write wins). Acceptable; the existing model already assumes single-source editing.
- **`goto` import**: must `import { goto } from '$app/navigation'`.