# M12 — End-to-End Smoke Test

## Goal
Run a clean full-stack verification of the entire feature with all prior milestones merged. No source-code changes expected; this milestone produces a checklist of pass/fail results.

## Files Touched
None (verification only).

## Preconditions
M11 passed.

## Steps

1. `npm run dev` from a clean state.
2. Open browser, navigate to `/plan`.
3. Fill the wizard:
   - destination: "Kyoto, Japan"
   - start: today + 14 days
   - end: today + 16 days (3-day trip)
   - travelers: 2 adults, 0 kids
   - archetype: "explorer"
   - tags: pick 2 from any group
   - budget: 3
   - note: "first time in Japan"
   - finish → redirect to `/chat`.
4. Wait for WebLLM engine to reach `ready` (~minutes on first load).
5. Click **"Generate concept"** → expect "Concept ready." Concept card visible.
6. Click **"Generate all days"** → expect "All days generated." Three day cards visible (one per date in range).
7. Click **"Enrich first day"** → expect "Enriched <date>." Place candidate lists appear under each stage's stay/meal/activity slots (may be empty arrays if Google key missing).
8. Type a message in the chat textarea ("Tell me about day 2") and press Send. Expect streamed tokens as before.
9. Open DevTools Network tab. Expect:
   - Multiple `POST /api/places/search` calls returning 200.
   - No 500s, no CORS errors.
10. Open DevTools Console. Expect no errors during any step above.
11. Reload the page. Expect the chat area to be empty and `itinerary` to be empty (in-memory only — documented behavior).

## Pass Criteria

- Steps 1–11 all complete without console errors.
- Steps 5–7 each update the status panel and persist results into the store (verifiable via DevTools eval against `user.preferences.trip`).
- Step 8 streams tokens identically to pre-change behavior.
- Steps 9–10 show only successful 200s.
- Step 11 demonstrates the documented lack of persistence (this is a feature, not a bug).

## Rollback
N/A — verification only.

## Commit Message
N/A — verification only. If issues are found, open a follow-up milestone file (e.g. `M13-fix-<issue>.md`) and stop.

## Open Follow-Ups (only if surfaced)
- If Qwen2.5-1.5B JSON is unreliable → consider model swap milestone.
- If Places API quota is a concern → add throttle/in-memory cache milestone.
- If user wants persistence → add `M13-localStorage-trip-persistence.md` (or Redis variant).