# Plan: Remove env var requirements (GOOGLE_PLACES_API_KEY)

## Goal

Eliminate the requirement to set any environment variables (especially `GOOGLE_PLACES_API_KEY`) for the Voyager app to build and run. Build and `npm run dev` should work with a fresh checkout and no `.env` file.

## Current state

- `voyager/.env.example` documents a single required var: `GOOGLE_PLACES_API_KEY=replace-me`.
- `voyager/src/routes/api/places/search/+server.js` imports `GOOGLE_PLACES_API_KEY` from `$env/static/private` and forwards it as `X-Goog-Api-Key` to Google Places.
- `$env/static/private` is a build-time module — the import fails the build if the var is unset, which is why every prior plan added `GOOGLE_PLACES_API_KEY=dummy` to the build command.
- Confirmed callers of `/api/places/search` or `searchPlaces`: **none in live source**.
  - `voyager/src/lib/agent/index.ts:56` defines `export async function searchPlaces(_query)` as a stub that returns `clone(placesFixture)`. No caller in `src/`.
  - All `BuildPlan*/.kilo/plans/**` references are markdown specs, not live code.
- The Google Places endpoint is fully dead code. The agent fixture `placesFixture` is what the UI actually consumes.
- Other env var references (`LOG_LEVEL`, `SERVICE_NAME`, `SERVICE_VERSION` in `voyager/src/lib/server/logger.js`) all have defaults and never fail the build.

## User decisions

- **Endpoint fate:** delete `/api/places/search` entirely. It has no callers and only exists to demonstrate a server-side key gate. (Recommended over keeping the route + stubbing the call, since the route itself imports `$env/static/private` and is the root cause of the env-var requirement.)
- **Plan docs:** leave existing `BuildPlan*/.kilo/plans/**` markdown references alone — they're historical specs, not enforced contracts. (Out of scope; touching them is a docs churn with no runtime effect.)
- **`searchPlaces` in the agent:** leave as-is. It's already a stub returning fixture data. Not an env var problem.

## Implementation

Edit `voyager/` (note: this repo's app lives in the nested `voyager/` directory):

1. **Delete the server endpoint.** Remove `voyager/src/routes/api/places/search/+server.js` and the empty parent `places/search/` directories.
2. **Delete the env example.** Remove `voyager/.env.example` (no remaining env vars to document).
3. **Update `.gitignore` if it still references `.env` in a way that needs cleanup.** Current `.gitignore` (lines 17–19) ignores `.env.*` with exceptions for `.env.example` and `.env.test`. With `.env.example` deleted, drop the `!.env.example` line. The `.env.test` exception stays — no `.env.test` exists today but the line is harmless; leave it for now to avoid touching more than needed. (Optional cleanup; mention in PR description.)
4. **Verify no remaining `$env/static/private` or `$env/dynamic/private` imports.** Run a grep; should be zero hits after step 1.
5. **Verify no remaining references to `GOOGLE_PLACES_API_KEY` in source.** Should be zero hits after steps 1–2. Historical markdown references are out of scope.

## Validation

- `cd voyager && npm run build` — must succeed with **no env var prefix**. Currently requires `GOOGLE_PLACES_API_KEY=dummy`; after this change it should not.
- `cd voyager && npm run dev` — server starts, `/plan` route renders, no import errors at boot.
- `grep -r "\$env/static/private" voyager/src` — empty.
- `grep -r "GOOGLE_PLACES_API_KEY" voyager/src voyager/.env.example` — empty. (Markdown under `BuildPlan*/.kilo/plans/` may still match — out of scope.)
- `grep -r "\.env\.example" voyager/` — empty.

## Risks and mitigations

- **Risk:** Some downstream consumer (deployed instance, CI) actually hits `/api/places/search` and the silent removal breaks it.
  **Mitigation:** Confirmed zero callers in `src/`. The endpoint was never wired to a UI. The agent's `searchPlaces` returns fixture data, so the demo flow is unaffected.
- **Risk:** Future contributor re-adds a Google Places integration and re-introduces the env var.
  **Mitigation:** Not in scope to prevent; this plan only addresses the current dead-code requirement.

## Out of scope

- Markdown references in `BuildPlan*/.kilo/plans/**` describing how the env var was used. Historical only.
- `LOG_LEVEL` / `SERVICE_NAME` / `SERVICE_VERSION` — all have defaults, never required.
- `test.js` reference to `MINIMAX_API_KEY` — unrelated to this app's runtime env.
- Removing `searchPlaces` from `agent/index.ts` — it's already a fixture stub; keep the export so any caller wiring stays intact.
