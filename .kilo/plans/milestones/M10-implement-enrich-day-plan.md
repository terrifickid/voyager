# M10 — Implement enrichDayPlan

## Goal
For a given date's stored day plan, ask the agent for a focused Google Places `textQuery` for each stage × slot, run `/api/places/search`, attach results as `placeCandidates`.

## Files Touched
- `src/lib/agent/enrichDayPlan.js` (only)

## Preconditions
M9 passed (a day plan exists for the date).

## Changes

Replace `src/lib/agent/enrichDayPlan.js` with:

```js
import { user } from '$lib/stores/user.svelte.js';
import { buildPlaceQueryPrompt } from './prompts.js';
import { runStructuredAgent } from './engineClient.js';
import { extractJsonBlock, safeJsonParse, parsePlaceQueryString } from './responseParsers.js';
import { searchPlaces } from './placesClient.js';

const STAGES = ['morning', 'afternoon', 'evening', 'late_night'];
const SLOTS = ['stay', 'meal', 'activity'];

export async function enrichDayPlan(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('enrichDayPlan: date must be YYYY-MM-DD');
  }
  const prefs = user.preferences;
  const day = prefs?.trip?.itinerary?.find((d) => d?.date === date);
  if (!day) throw new Error('enrichDayPlan: no day plan for date');

  const candidates = {};
  for (const stage of STAGES) {
    candidates[stage] = {};
    for (const slot of SLOTS) {
      const slotData = day?.[stage]?.[slot];
      const location = slotData?.location;
      if (!location || typeof location !== 'string') {
        candidates[stage][slot] = [];
        continue;
      }
      try {
        const { system, user: userMsg } = buildPlaceQueryPrompt(stage, slot, location, prefs);
        const raw = await runStructuredAgent(system, userMsg);
        const block = extractJsonBlock(raw);
        const parsed = safeJsonParse(block);
        const { query } = parsePlaceQueryString(parsed);
        candidates[stage][slot] = await searchPlaces(query);
      } catch {
        candidates[stage][slot] = [];
      }
    }
  }
  user.setDayPlaceCandidates(date, candidates);
}
```

## Validation Gate

1. Without an itinerary entry for the date:
   ```js
   import('/src/lib/agent/enrichDayPlan.js').then(m => m.enrichDayPlan('2099-01-01'))
   ```
   Rejects with `'enrichDayPlan: no day plan for date'`.

2. After `generateDayPlan('2026-09-01')`, with engine ready:
   ```js
   import('/src/lib/agent/enrichDayPlan.js').then(m => m.enrichDayPlan('2026-09-01'))
   ```
   Resolves.

3. Verify:
   ```js
   import('/src/lib/stores/user.svelte.js').then(m => console.log(m.user.preferences.trip.itinerary[0].placeCandidates));
   ```
   Output: object with keys `morning`, `afternoon`, `evening`, `late_night`; each has `stay`, `meal`, `activity` (each an array — possibly empty if Google returns 0 results).

4. Network tab shows multiple `POST /api/places/search` calls (one per non-empty slot, up to 12).

5. Calling twice with same date → idempotent: `placeCandidates` overwritten, no duplicates.

6. If `GOOGLE_PLACES_API_KEY` is missing/invalid, all arrays will be `[]` — that's acceptable. No thrown exceptions.

## Rollback
Revert `src/lib/agent/enrichDayPlan.js` to its M3 stub. Manually clear `placeCandidates` if needed:
```js
import('/src/lib/stores/user.svelte.js').then(m => {
  const day = m.user.preferences.trip.itinerary[0];
  if (day) day.placeCandidates = {};
});
```

## Commit Message
`M10: implement enrichDayPlan populating placeCandidates from Google Places`

## Pass Criteria
All 6 gate items pass. Proceed to M11.