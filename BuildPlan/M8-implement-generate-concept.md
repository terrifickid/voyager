# M8 — Implement generateTripConcept

## Goal
Wire up the first end-to-end agent call: trip preferences → concept prompt → engine → parse → store.

## Files Touched
- `src/lib/agent/generateTripConcept.js` (only)

## Preconditions
M7 passed.

## Changes

Replace `src/lib/agent/generateTripConcept.js` with:

```js
import { user } from '$lib/stores/user.svelte.js';
import { buildConceptPrompt } from './prompts.js';
import { runStructuredAgent } from './engineClient.js';
import { extractJsonBlock, safeJsonParse, parseConcept, AgentParseError } from './responseParsers.js';

export async function generateTripConcept() {
  const prefs = user.preferences;
  if (!prefs?.trip?.destination) {
    throw new Error('generateTripConcept: no trip destination set');
  }
  const { system, user: userMsg } = buildConceptPrompt(prefs);
  const raw = await runStructuredAgent(system, userMsg);
  const block = extractJsonBlock(raw);
  const parsed = safeJsonParse(block);
  const concept = parseConcept(parsed);
  user.setTripConcept(concept);
}
```

## Validation Gate

1. Without a destination in store:
   ```js
   import('/src/lib/agent/generateTripConcept.js').then(m => m.generateTripConcept())
   ```
   Rejects with `'generateTripConcept: no trip destination set'`.

2. Fill in `/plan` wizard (destination "Kyoto", any other valid fields) → submit → land on `/chat`. Wait for engine to reach `ready`.

3. With engine ready and trip set:
   ```js
   import('/src/lib/agent/generateTripConcept.js').then(m => m.generateTripConcept())
   ```
   Resolves (no throw).

4. Verify:
   ```js
   import('/src/lib/stores/user.svelte.js').then(m => console.log(m.user.preferences.trip.concept));
   ```
   Output: object with non-empty `summary`, array `themes`, valid `pace` in `['relaxed','balanced','packed']`, string `notes`.

5. Run it a second time → re-overwrites `concept` (idempotent).

6. If at any point the model produces malformed JSON 3 consecutive times, gate fails; escalate (see parent plan "Escalation Triggers").

## Rollback
Revert `src/lib/agent/generateTripConcept.js` to its M3 stub. Manually clear `user.preferences.trip.concept` if needed:
```js
import('/src/lib/stores/user.svelte.js').then(m => m.user.setTripConcept(null));
```

## Commit Message
`M8: implement generateTripConcept writing to user store`

## Pass Criteria
All 5 gate items pass (item 6 not triggered). Proceed to M9.