# M1 — Extend UserStore

## Goal
Add `concept` and `itinerary` fields to `preferences.trip` plus the three new setters the rest of the plan will use.

## Files Touched
- `src/lib/stores/user.svelte.js` (only)

## Preconditions
None.

## Changes

In `src/lib/stores/user.svelte.js`:

1. Inside the default `preferences.trip` object, add:
   ```js
   concept: null,
   itinerary: []
   ```
   Place these next to the existing `destination`, `startDate`, etc. fields.

2. Add three new methods on the `UserStore` class (do NOT modify existing methods):
   - `setTripConcept(concept)` → `this.preferences.trip.concept = concept;`
   - `upsertDayPlan(plan)` → if `plan.date` matches an entry in `this.preferences.trip.itinerary`, replace it; otherwise push. Use a simple `findIndex` + splice OR a new array.
   - `setDayPlaceCandidates(date, candidates)` → find day by `date`, set `day.placeCandidates = candidates`. If day missing, no-op (do not create).

Do not change `setTrip`, `setPreferences`, `patchPreferencesForm`, or `clear`.

## Validation Gate

1. Run `npm run dev`. No runtime errors.
2. In DevTools console on `/chat`:
   ```js
   import('/src/lib/stores/user.svelte.js').then(m => { window.__u = m.user; });
   ```
3. `window.__u.preferences.trip.concept === null` → `true`.
4. `window.__u.preferences.trip.itinerary` is `[]`.
5. `window.__u.setTripConcept({summary:'x',themes:['a'],pace:'relaxed',notes:''})` → `window.__u.preferences.trip.concept.summary === 'x'`.
6. `window.__u.upsertDayPlan({date:'2026-09-01', morning:{}})` → `itinerary.length === 1`.
7. Repeat step 6 with same date → `itinerary.length === 1`, content updated.
8. `upsertDayPlan({date:'2026-09-02', morning:{}})` → `itinerary.length === 2`.
9. `setDayPlaceCandidates('2026-09-01', {morning:{activity:[{name:'X'}]}})` → that day's `placeCandidates.morning.activity[0].name === 'X'`.
10. `setDayPlaceCandidates('2099-01-01', {})` → no-op (no error, no new day created).

## Rollback
Revert `src/lib/stores/user.svelte.js` to the original (single commit `M1: revert`).

## Commit Message
`M1: extend UserStore with concept, itinerary, and day-plan setters`

## Pass Criteria
All 10 validation gate items pass. After passing, proceed to M2.