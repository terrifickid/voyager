# Voyager — Agent-Driven Trip Planning

## Goal (plain language, shared goalpost)

When a user fills out `/plan`, we already collect the basics: where they're going, when, who's coming, their travel personality, what they like, and a free-form note.

Right now `/chat` is just a free text conversation with the AI. That's not useful.

What we want:

1. After `/plan`, when the user lands on `/chat`, the AI should **read the user's trip details** (destination, dates, travelers, personality, tags, budget, note).
2. The AI should come up with a **fundamental concept for the trip** — like a theme, vibe, or "what this trip is really about" (e.g. "a relaxed culinary walk through Kyoto with two cultural anchors per day").
3. The system should **save that concept**.
4. Then the AI should help **build a day-by-day plan** using our `daySchema` — which is split into four stages per day (morning, afternoon, evening, late night) and each stage covers three things: where you stay, what you eat, what you do.
5. For each stay/meal/activity, the system should **search Google Places** to find real, rated places that match the AI's suggestion.
6. All of this gets stored on the user (so far we don't have persistence — that's a separate decision we may revisit).
7. We are **not** making the AI "tool-call" anything. We just send it a prompt, read its text back, and use that text ourselves to call Google Places. The AI is a creative generator; we are the integrator.
8. Each step is its **own simple function** that does one thing and writes to the user store. No auto-run pipeline. No orchestrator. We (or future UI) call them one at a time.

## Decisions we already locked

- Keep WebLLM `Qwen2.5-1.5B-Instruct-q4f16_1-MLC` for now (swap later if JSON quality is bad).
- No tool calling. AI outputs JSON in a ```json block; we parse it.
- Each prompt specifies its own response shape.
- Server route `/api/places/search` for Google (already exists, will be widened).
- No persistence. In-memory only.
- Functions return nothing; we read the user store to see results.
- One milestone at a time. Validate before moving on.

## Milestones (one simple feature each)

These are the targets we'll work toward together. Each milestone = one feature we can complete and verify in isolation.

| # | Title | What "done" looks like in plain language |
|---|---|---|
| M1 | Extend the user store | The store has new slots for "trip concept" and "day-by-day itinerary", plus setters to write into them. |
| M2 | Widen the Google Places response | The Places endpoint returns more useful fields (id, location, price level) so we can store richer place info. |
| M3 | Scaffold the agent module | A new folder `src/lib/agent/` exists with empty stubs for every function we'll write. App still runs. |
| M4 | Build a response parser | A helper that takes whatever the AI spits out, finds the JSON inside it, and cleans it up so we can use it. |
| M5 | Build a "send prompt, get full reply" wrapper | A helper that runs the AI on one prompt and gives us back the entire reply as a string (not streamed tokens). |
| M6 | Write the three prompt templates | Three prompts: one for the trip concept, one for a single day's plan, one for a Google Places search query for a specific stay/meal/activity slot. |
| M7 | Build the Google Places client | A small wrapper around `/api/places/search` that gives us back a clean list of places. |
| M8 | Build `generateTripConcept()` | One function: read prefs → ask AI for concept → save it to the store. |
| M9 | Build `generateDayPlan(date)` | One function: read prefs + concept → ask AI for that day's plan → save it to the store. Validates the daySchema shape. |
| M10 | Build `enrichDayPlan(date)` | One function: read the day plan → for each stay/meal/activity ask AI for a search query → call Places → save results alongside the day. |
| M11 | Wire buttons into `/chat` | Three buttons on the chat page: generate concept, generate all days, enrich first day. A small panel shows the saved itinerary and place candidates. Chat still works. |
| M12 | Full end-to-end check | Fill `/plan` → click each button → confirm everything appears. Chat still streams. Reload wipes data (expected). |

## Progress log

This is the running record of what we've actually done across sessions. Update as we complete each milestone.

| Date | Milestone | Status | Notes |
|---|---|---|---|
| — | — | — | No milestones completed yet. |

## Out of scope (for now)

- Switching to a different/larger AI model.
- Persistence (localStorage, Redis, DB).
- Auto-running the pipeline on `/plan` submit.
- Tool calling by the AI.
- Multi-trip support.
- Authentication.
- Editing already-generated days via chat.

## Working agreement

- One milestone per session block. Don't try to do everything.
- After each milestone, we both check: does it work? does the app still run? does anything else break?
- If something breaks, we stop and fix before moving on.
- The "Goals" section above is the north star. If a milestone drifts away from it, we pause and re-align.