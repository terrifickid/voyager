# M3 — Agent Module Skeleton

## Goal
Create `src/lib/agent/` with stub files that export the functions the rest of the plan will fill in. No real logic yet — every export either returns a placeholder or throws `Error('not implemented')`. Goal: prove the module graph resolves cleanly without breaking the build.

## Files Touched (all new)
- `src/lib/agent/prompts.js`
- `src/lib/agent/responseParsers.js`
- `src/lib/agent/placesClient.js`
- `src/lib/agent/engineClient.js`
- `src/lib/agent/generateTripConcept.js`
- `src/lib/agent/generateDayPlan.js`
- `src/lib/agent/enrichDayPlan.js`
- `src/lib/agent/index.js`

## Preconditions
M2 passed.

## Changes

Each file is a minimal export. Examples:

`src/lib/agent/prompts.js`:
```js
export function buildConceptPrompt(prefs) { return null; }
export function buildDayPlanPrompt(prefs, date, concept) { return null; }
export function buildPlaceQueryPrompt(stage, slot, location, prefs) { return null; }
```

`src/lib/agent/responseParsers.js`:
```js
export function extractJsonBlock(text) { return text; }
export function safeJsonParse(text) { return text; }
export function parseConcept(obj) { return obj; }
export function parseDayPlan(obj) { return obj; }
export function parsePlaceQueryString(obj) { return obj; }
export class AgentParseError extends Error {}
```

`src/lib/agent/placesClient.js`:
```js
export async function searchPlaces(query) { return []; }
```

`src/lib/agent/engineClient.js`:
```js
export async function runStructuredAgent(systemMsg, userMsg) {
  throw new Error('not implemented');
}
```

`src/lib/agent/generateTripConcept.js`:
```js
export async function generateTripConcept() {
  throw new Error('not implemented');
}
```

`src/lib/agent/generateDayPlan.js`:
```js
export async function generateDayPlan(date) {
  throw new Error('not implemented');
}
```

`src/lib/agent/enrichDayPlan.js`:
```js
export async function enrichDayPlan(date) {
  throw new Error('not implemented');
}
```

`src/lib/agent/index.js`:
```js
export { generateTripConcept } from './generateTripConcept.js';
export { generateDayPlan } from './generateDayPlan.js';
export { enrichDayPlan } from './enrichDayPlan.js';
export { buildConceptPrompt, buildDayPlanPrompt, buildPlaceQueryPrompt } from './prompts.js';
export { extractJsonBlock, safeJsonParse, parseConcept, parseDayPlan, parsePlaceQueryString, AgentParseError } from './responseParsers.js';
export { searchPlaces } from './placesClient.js';
export { runStructuredAgent } from './engineClient.js';
```

## Validation Gate

1. `npm run dev` boots with zero module resolution errors.
2. In DevTools console on `/chat`:
   ```js
   import('/src/lib/agent/index.js').then(m => console.log(Object.keys(m)));
   ```
   Output includes: `generateTripConcept`, `generateDayPlan`, `enrichDayPlan`, `buildConceptPrompt`, `extractJsonBlock`, `searchPlaces`, `runStructuredAgent`, `AgentParseError`.
3. `m.buildConceptPrompt({})` returns `null` (stub).
4. `m.generateTripConcept()` rejects with `'not implemented'`.
5. `m.AgentParseError instanceof Error` → `true`.

## Rollback
Delete `src/lib/agent/` directory.

## Commit Message
`M3: scaffold src/lib/agent module with stub exports`

## Pass Criteria
All 5 gate items pass. Proceed to M4.