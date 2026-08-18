# M11 — Wire Buttons + Itinerary Panel into /chat

## Goal
Surface the three agent functions in the `/chat` UI as buttons, show a small status panel during runs, and render a read-only summary of the itinerary below the existing chat area. Do not change chat streaming behavior.

## Files Touched
- `src/routes/chat/+page.svelte` (only)

## Preconditions
M10 passed.

## Changes

In `src/routes/chat/+page.svelte`, add:

1. Imports near the top:
   ```js
   import { user } from '$lib/stores/user.svelte.js';
   import { generateTripConcept, generateDayPlan, enrichDayPlan } from '$lib/agent';
   ```

2. New state declarations:
   ```js
   let planStatus = $state({ phase: 'idle', message: '' }); // 'idle' | 'concept' | 'days' | 'enrich' | 'error'
   ```

3. Helper for date range:
   ```js
   function dateRange(start, end) {
     const out = [];
     if (!start || !end) return out;
     const s = new Date(start + 'T00:00:00Z');
     const e = new Date(end + 'T00:00:00Z');
     for (let d = new Date(s); d <= e; d.setUTCDate(d.getUTCDate() + 1)) {
       out.push(d.toISOString().slice(0, 10));
     }
     return out;
   }
   ```

4. Click handlers:
   ```js
   async function handleGenerateConcept() {
     planStatus = { phase: 'concept', message: 'Generating concept…' };
     try {
       await generateTripConcept();
       planStatus = { phase: 'idle', message: 'Concept ready.' };
     } catch (e) {
       planStatus = { phase: 'error', message: String(e?.message ?? e) };
     }
   }

   async function handleGenerateAllDays() {
     const trip = user.preferences.trip;
     const dates = dateRange(trip.startDate, trip.endDate);
     if (dates.length === 0) {
       planStatus = { phase: 'error', message: 'No trip dates set' };
       return;
     }
     for (const d of dates) {
       planStatus = { phase: 'days', message: `Generating plan for ${d}…` };
       try { await generateDayPlan(d); } catch (e) {
         planStatus = { phase: 'error', message: `Failed for ${d}: ${e?.message ?? e}` };
         return;
       }
     }
     planStatus = { phase: 'idle', message: 'All days generated.' };
   }

   async function handleEnrichFirstDay() {
     const trip = user.preferences.trip;
     const date = trip.itinerary?.[0]?.date ?? trip.startDate;
     if (!date) {
       planStatus = { phase: 'error', message: 'No day to enrich' };
       return;
     }
     planStatus = { phase: 'enrich', message: `Enriching ${date}…` };
     try {
       await enrichDayPlan(date);
       planStatus = { phase: 'idle', message: `Enriched ${date}.` };
     } catch (e) {
       planStatus = { phase: 'error', message: String(e?.message ?? e) };
     }
   }
   ```

5. Reactive derived for current itinerary (for the panel):
   ```js
   const itinerary = $derived(user.preferences.trip.itinerary ?? []);
   const concept = $derived(user.preferences.trip.concept);
   ```

6. UI additions (inside the existing `<section>`, below the `<form>`):
   - Three buttons labeled "Generate concept", "Generate all days", "Enrich first day". Disable each when `planStatus.phase` is `'concept' | 'days' | 'enrich'`.
   - Status line: `<p>{planStatus.message}</p>` (small text).
   - Concept card (only if `concept`): show `summary`, `themes` as comma-separated chips, `pace`.
   - Itinerary list: for each day in `itinerary`, show date as header and four collapsible stage cards (or simple flat rendering). Each stage shows its stay/meal/activity fields. If `placeCandidates[stage][slot]` exists, render as a small `<ul>` of `name` (and `rating`).

Do not remove or modify any of the existing chat textarea / send / clear / retry code.

## Validation Gate

1. `npm run dev` boots.
2. `/plan` → fill form → finish → land on `/chat`. Engine loads to ready.
3. Click "Generate concept" → status changes through "Generating concept…" → "Concept ready." Concept card appears.
4. Click "Generate all days" → status shows each date → finishes with "All days generated." Itinerary cards appear.
5. Click "Enrich first day" → status shows enrichment → finishes with "Enriched <date>." Place candidate lists appear under the relevant slots (may be empty if Google key invalid).
6. Existing chat "Send" still streams tokens; "Clear" still works; "Retry" still works.
7. Buttons are disabled while a run is in flight (re-enabled when status returns to idle/error).
8. Reload page → itinerary and concept are gone (in-memory only).

## Rollback
Revert `src/routes/chat/+page.svelte`.

## Commit Message
`M11: add plan-generation buttons and itinerary panel to /chat`

## Pass Criteria
All 8 gate items pass. Proceed to M12.