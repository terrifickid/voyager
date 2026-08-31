# BuildPlan-v2 — Voyager Demo Mockup

## Goal

Show one user a demo of the trip-planning UX. No AI, no Google Places. Everything that would have come from those systems comes from JSON files. `/plan` stays a real form. `/chat` becomes three buttons + an itinerary panel that fills in with canned JSON.

## Mocking strategy

- All "AI" output = JSON files under `src/lib/agent/fixtures/`.
- All "Places" output = JSON files under `src/lib/agent/fixtures/`.
- A few helper functions (`runPrompt`, `searchPlaces`, `generateConcept`, `generateDayPlan`, `enrichDayPlan`) just `import` the right JSON and write it into the user store.

## Files

- `src/lib/agent/fixtures/concept.json` — trip concept object.
- `src/lib/agent/fixtures/day.json` — one day object (morning/afternoon/evening/late × stay/eat/do).
- `src/lib/agent/fixtures/places.json` — array of place objects, used for enrichment.
- `src/lib/agent/index.ts` — exports: `runPrompt`, `searchPlaces`, `generateConcept`, `generateDayPlan`, `enrichDayPlan`. Each is a thin wrapper that loads a JSON fixture and calls a store setter.
- Existing user store gets three new slots: `tripConcept`, `itinerary`, `placeCandidates`.

## UI changes

- `/chat` page: remove chat input and streaming. Render three buttons (Generate concept, Generate all days, Enrich first day) and an itinerary panel that reads from the user store and shows whatever's there.

## Out of scope

- Real AI, real Places, persistence, auth, multi-trip, chat editing, the original 12-milestone structure.

## Validation

Fill `/plan` -> land on `/chat` -> click each button in order -> confirm panel populates with fixture content. Reload wipes state (fine).

## Risks

- WebLLM import on `/chat` may become dead code once streaming is removed. Can be cleaned up after the demo works; not required for this plan.
