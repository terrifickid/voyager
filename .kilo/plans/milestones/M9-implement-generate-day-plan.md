# M9 — Implement generateDayPlan

## Goal
Wire up the second agent call: takes a date string, prompts for a single daySchema-conformant day plan, parses, stores via `upsertDayPlan`. Tightens `parseDayPlan` to require all four stages × three slots.

## Files Touched
- `src/lib/agent/generateDayPlan.js`
- `src/lib/agent/responseParsers.js` (tighten `parseDayPlan`)

## Preconditions
M8 passed (concept must exist).

## Changes

### 9a. `src/lib/agent/generateDayPlan.js`

Replace with:

```js
import { user } from '$lib/stores/user.svelte.js';
import { buildDayPlanPrompt } from './prompts.js';
import { runStructuredAgent } from './engineClient.js';
import { extractJsonBlock, safeJsonParse, parseDayPlan, AgentParseError } from './responseParsers.js';

export async function generateDayPlan(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('generateDayPlan: date must be YYYY-MM-DD');
  }
  const prefs = user.preferences;
  if (!prefs?.trip?.destination) {
    throw new Error('generateDayPlan: no trip destination set');
  }
  if (!prefs?.trip?.concept) {
    throw new Error('generateDayPlan: run generateTripConcept first');
  }
  const { system, user: userMsg } = buildDayPlanPrompt(prefs, date, prefs.trip.concept);
  const raw = await runStructuredAgent(system, userMsg);
  const block = extractJsonBlock(raw);
  const parsed = safeJsonParse(block);
  const plan = parseDayPlan(parsed);
  plan.date = date; // canonicalize
  plan.placeCandidates = plan.placeCandidates ?? {};
  user.upsertDayPlan(plan);
}
```

### 9b. `src/lib/agent/responseParsers.js` — tighten `parseDayPlan`

Replace the existing `parseDayPlan` with:

```js
export function parseDayPlan(obj) {
  if (!obj || typeof obj !== 'object') throw new AgentParseError('parseDayPlan: not an object', obj);
  if (typeof obj.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(obj.date)) {
    throw new AgentParseError('parseDayPlan: date must be YYYY-MM-DD', obj);
  }
  const stages = ['morning', 'afternoon', 'evening', 'late_night'];
  const slots = ['stay', 'meal', 'activity'];
  for (const stage of stages) {
    const s = obj[stage];
    if (!s || typeof s !== 'object') throw new AgentParseError(`parseDayPlan: missing stage ${stage}`, obj);
    for (const slot of slots) {
      const sl = s[slot];
      if (!sl || typeof sl !== 'object') throw new AgentParseError(`parseDayPlan: missing ${stage}.${slot}`, obj);
      // slot-specific required fields
      if (slot === 'stay') {
        if (typeof sl.location !== 'string' || sl.location.length === 0) {
          throw new AgentParseError(`parseDayPlan: ${stage}.stay.location missing`, obj);
        }
      } else if (slot === 'meal') {
        if (typeof sl.food !== 'string' || sl.food.length === 0) {
          throw new AgentParseError(`parseDayPlan: ${stage}.meal.food missing`, obj);
        }
        if (typeof sl.location !== 'string' || sl.location.length === 0) {
          throw new AgentParseError(`parseDayPlan: ${stage}.meal.location missing`, obj);
        }
      } else if (slot === 'activity') {
        if (typeof sl.action !== 'string' || sl.action.length === 0) {
          throw new AgentParseError(`parseDayPlan: ${stage}.activity.action missing`, obj);
        }
        if (typeof sl.location !== 'string' || sl.location.length === 0) {
          throw new AgentParseError(`parseDayPlan: ${stage}.activity.location missing`, obj);
        }
      }
    }
  }
  return obj;
}
```

## Validation Gate

1. Without concept:
   ```js
   import('/src/lib/agent/generateDayPlan.js').then(m => m.generateDayPlan('2026-09-01'))
   ```
   Rejects with `'generateDayPlan: run generateTripConcept first'`.

2. With concept present, engine ready:
   ```js
   import('/src/lib/agent/generateDayPlan.js').then(m => m.generateDayPlan('2026-09-01'))
   ```
   Resolves.

3. Verify:
   ```js
   import('/src/lib/stores/user.svelte.js').then(m => console.log(m.user.preferences.trip.itinerary));
   ```
   Array contains an entry with `date === '2026-09-01'` and all four stages, each with `stay`, `meal`, `activity` populated.

4. Call again with the same date → `itinerary.length === 1`, content replaced.

5. `parseDayPlan` rejects plain `{}` → `AgentParseError`. Test:
   ```js
   import('/src/lib/agent/responseParsers.js').then(m => {
     try { m.parseDayPlan({}); } catch (e) { console.log(e instanceof m.AgentParseError); }
   });
   ```
   → `true`.

6. Bad date string:
   ```js
   m.generateDayPlan('not-a-date')
   ```
   Rejects with `'generateDayPlan: date must be YYYY-MM-DD'`.

## Rollback
- Revert `src/lib/agent/generateDayPlan.js` to its M3 stub.
- Revert `src/lib/agent/responseParsers.js` `parseDayPlan` to the M4 stub.
- Clear itinerary if needed:
  ```js
  import('/src/lib/stores/user.svelte.js').then(m => {
    m.user.preferences.trip.itinerary = [];
  });
  ```

## Commit Message
`M9: implement generateDayPlan with strict daySchema validation`

## Pass Criteria
All 6 gate items pass. Proceed to M10.