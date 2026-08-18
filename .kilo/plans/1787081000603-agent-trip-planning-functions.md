# Agent-Driven Trip Planning — Milestone Project Plan

## Goal

Add independent async functions that programmatically prompt the WebLLM agent with schema-formatted requests, parse responses, run Google Places searches using parsed output, and write results into the existing `UserStore`. Executed as a sequence of discrete milestones.

## Decisions (locked)

| Topic | Decision |
|---|---|
| LLM | Keep WebLLM `Qwen2.5-1.5B-Instruct-q4f16_1-MLC` (swap deferred). |
| Tool calling | None. Agent outputs JSON; system parses + calls `/api/places/search`. |
| Output format | Per-request schema in prompt; parser extracts ` ```json ` block. |
| Persistence | None. In-memory only. |
| Places call site | Server route `/api/places/search`. |
| Orchestration | None. Independent functions, manually triggered. |
| Store extension | Add `trip.concept` (object) and `trip.itinerary` (`DayPlan[]`). |
| Function return | Each function returns `undefined`; results read from `user.preferences.trip`. |
| Execution | One milestone at a time; gate must pass before next milestone starts. |

## Milestone Index

Each milestone is saved as a separate file under `.kilo/plans/milestones/` and is independently executable by an implementation-capable agent. Read the milestone file before executing it.

| # | File | Title | Depends on |
|---|---|---|---|
| M1 | `M1-extend-user-store.md` | Extend `UserStore` with `concept`, `itinerary`, new setters | — |
| M2 | `M2-expand-places-fieldmask.md` | Expand `/api/places/search` FieldMask | M1 |
| M3 | `M3-agent-module-skeleton.md` | Create `src/lib/agent/` skeleton with stubs | M2 |
| M4 | `M4-implement-response-parsers.md` | Implement `responseParsers.js` (extract, parse, validate) | M3 |
| M5 | `M5-implement-engine-client.md` | Implement `runStructuredAgent` wrapper | M4 |
| M6 | `M6-implement-prompts.md` | Implement prompt builders (`prompts.js`) | M5 |
| M7 | `M7-implement-places-client.md` | Implement `searchPlaces` client | M6 |
| M8 | `M8-implement-generate-concept.md` | Implement `generateTripConcept()` | M7 |
| M9 | `M9-implement-generate-day-plan.md` | Implement `generateDayPlan(date)` | M8 |
| M10 | `M10-implement-enrich-day-plan.md` | Implement `enrichDayPlan(date)` | M9 |
| M11 | `M11-wire-chat-ui.md` | Add buttons + itinerary panel to `/chat` | M10 |
| M12 | `M12-end-to-end-smoke.md` | Final end-to-end smoke test | M11 |

## Execution Rules

1. **Sequential only.** M(N) does not start until M(N-1) is marked complete with passing gate.
2. **Each milestone is a unit of git history.** One commit per milestone with the message format `M{N}: <title>`.
3. **Each milestone is independently revertable.** Rollback steps are inside each milestone file.
4. **Validation gate must pass before next milestone.** If gate fails, fix in place; do not start the next milestone.
5. **No source files outside the milestone's scope.** If you discover needed changes, log them and stop.

## Files Touched Summary

- `src/lib/stores/user.svelte.js` — M1 only.
- `src/routes/api/places/search/+server.js` — M2 only.
- `src/lib/agent/` — new directory, populated across M3–M10.
- `src/routes/chat/+page.svelte` — M11 only.

## Out of Scope

- Model swap.
- Persistence (localStorage/Redis/DB).
- Auto-run pipeline.
- Tool/function-calling.
- Server-side LLM.
- Multi-trip support.
- Editing already-generated days via chat.
- Authentication.

## Escalation Triggers

Stop and ask the user before continuing if any of these happen:
- A milestone gate fails 3 times in a row.
- M9 fails repeatedly due to malformed JSON from Qwen2.5-1.5B.
- Google Places API consistently returns 0 results for non-obvious queries.
- A milestone requires touching files not listed in its "Files Touched" section.

## Open Questions

None at planning level. Resolved during prior Q&A.