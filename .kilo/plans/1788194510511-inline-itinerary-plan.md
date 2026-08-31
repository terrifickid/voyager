# Plan — Inline canned itinerary on `/plan`, drop `/chat`

## Goal

After finishing the trip-planning wizard, the user sees the canned itinerary immediately on the same `/plan` page. The `/chat` route and its three-button UI are removed entirely. Demo flow becomes: fill form -> itinerary appears, no second page.

## Decisions

- `/plan` swaps its own view in place: while the user has not submitted, the wizard renders; after submit, the canned itinerary renders in the same `<section>`. No navigation, no rename.
- `/chat` is deleted along with every link pointing at it.
- Wizard inputs remain editable after submit via a small "Edit my trip" link that resets the submitted state.

## Files

- `voyager/src/routes/chat/+page.svelte` — delete.
- `voyager/src/routes/plan/+page.svelte` — currently a 5-line wrapper around `PlanTripWizard`. Replace with the in-place toggle: on submit it sets a local `submitted = $state(true)`, calls the agent to load fixtures into the user store, and renders the itinerary panel from the existing `user.tripConcept` / `user.itinerary` / `user.placeCandidates` runes.
- `voyager/src/lib/components/PlanTripWizard.svelte` — drop the `goto('/chat')` at `PlanTripWizard.svelte:258`. Replace it with a callback prop (e.g. `onFinish`) so the parent owns post-submit behavior. The wizard still calls `user.setTrip(...)` and `user.setPreferences(...)` exactly as today.
- `voyager/src/lib/components/Header.svelte` — remove the `{ href: '/chat', label: 'Chat', exact: false }` entry at line 13. The `Plan a trip` link to `/plan` stays.
- `voyager/src/routes/+page.svelte` — remove the `href="/chat"` CTA at line 16. Replace with a single `Plan a trip` link to `/plan`.

## Behavior

1. User opens `/plan` -> `PlanTripWizard` renders.
2. User completes all 7 steps and clicks **Finish** -> wizard's `finish()` runs as today, then invokes the parent's `onFinish`.
3. Parent flips `submitted = true`, calls `await generateConcept()`, `await generateDayPlan()`, `await enrichDayPlan(1)` from `$lib/agent/index.ts`. The agent functions already populate `user.tripConcept`, `user.itinerary`, `user.placeCandidates`.
4. Parent re-renders the itinerary panel (concept card, day cards, place candidates) — same markup currently living in `routes/chat/+page.svelte`. Move it into a small shared component to avoid duplication if it ends up used elsewhere; otherwise inline it into the new `routes/plan/+page.svelte`.
5. Header now has no `/chat` entry; landing `/` no longer points at `/chat`.

## Edge cases

- **Reload:** state is in-memory only, so reloading `/plan` after submit reverts to the wizard. Acceptable per the original BuildPlan-v2 risks.
- **Direct navigation to `/chat`:** route no longer exists; SvelteKit returns 404. Acceptable since this is a demo with no inbound links after edits.
- **Re-editing:** "Edit my trip" link on the itinerary panel flips `submitted` back to `false`, the wizard re-mounts with values seeded from `user.preferences.trip` as today.

## Out of scope

- Anything related to real AI / Places, persistence, auth, multi-trip.
- Cleaning up `src/lib/webllm/engine.svelte.js` (called out as optional in BuildPlan-v2). Now that `/chat` is gone, the WebLLM module is dead. Safe to delete in this pass since nothing else references it; flagging as optional rather than required so the plan stays minimal.

## Validation

1. `npx svelte-check` reports zero errors in `src/lib` and `src/routes`.
2. Manual: open `/`, click CTA -> land on `/plan`, fill wizard -> click Finish -> itinerary card, day cards, and place candidates render. Click "Edit my trip" -> wizard returns. Header has no Chat link. Direct visit to `/chat` 404s.
3. `vite build` should clear the existing modules; pre-existing `GOOGLE_PLACES_API_KEY` build error in `src/routes/api/places/search/+server.js` is untouched and out of scope.

## Risks

- Move/extract the itinerary panel markup once; risk of forgetting a Tailwind class during the move. Mitigation: copy verbatim from current `routes/chat/+page.svelte`, only swap import paths.