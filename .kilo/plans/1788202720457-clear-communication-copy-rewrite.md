# Plan: Rewrite all site copy to the clear-communication rubric (C1–C7)

## Goal

Every user-facing string on the Voyager site — home, pay, plan, preferences, docs, header, footer, CTAs, eyebrows, and ledes — rewritten so it scores **Good (3) or Excellent (4)** on all seven criteria of `/workspaces/voyager/coms.md` for a general adult reader. No layout or component restructuring in this pass. No new tokens, components, or copy in source markdown under `Documentation/`.

## Decisions locked in with the user

- **Scope**: prose only, all 7 criteria, expressed in copy. Layout/structure untouched (C6/C7 satisfied by prose, not by rearranging sections).
- **Audience**: general adult reader — default rubric setting. Plain English; jargon defined at first use; <20-word sentences; one main idea per sentence.
- **Genre**: apply the rubric uniformly to every page. Marketing, pay, and docs all rewritten to the same register. Where a technical term *must* stay (e.g. `kind:38383`, `HODL`, `secp256k1`), it gets an inline gloss on first use and the short form afterward.

## What "done" looks like

For each of C1–C7, a quick spot-check of any rewritten page shows:

| #  | Criterion                | Spot-check rule                                                                                            |
| -- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| C1 | Function declaration     | First sentence of every section names what the section is or what the reader should do.                    |
| C2 | Quantity                 | No two paragraphs in the same section make the same point; no required prerequisite is missing.            |
| C3 | Quality                  | Every factual claim either cites a source (inline link / file path) or is framed as opinion/inference.     |
| C4 | Manner                   | Sentences average <20 words; technical terms defined at first use; one main idea per sentence; active voice.|
| C5 | Relation                 | Every paragraph serves the section's declared function; tangents absent or bracketed.                      |
| C6 | Structure                | Headings accurately preview body content; one idea per paragraph; lists parallel; CTA findable.            |
| C7 | Working-memory load      | ≤2–3 new (undefined) terms per paragraph; chunking aids (lists, callouts) used where items are parallel.    |

The implementer self-checks each criterion on each page before considering that page done.

## Files to change (prose only)

### Marketing surface

- `voyager/src/routes/+page.svelte` — home (ribbon, hero, "How it works", tabs row, persona cards, testimonials, doc band, final CTA). Longest rewrite.
- `voyager/src/routes/pay/+page.svelte` — pay hero, problem band, five invariants, three layers, seven steps, ramp section, EROI band, threat shake-out, out-of-scope, final CTA. Second longest.

### Functional pages

- `voyager/src/routes/plan/+page.svelte` — post-submit copy (concept, itinerary, candidates). Eyebrow labels, empty states, helper text.
- `voyager/src/routes/preferences/+page.svelte` — eyebrow, title, lede.

### Docs (just-written)

- `voyager/src/routes/docs/+page.svelte` — overview intro and lesson-card descriptions.
- `voyager/src/routes/docs/how-voyager-plans/+page.svelte`
- `voyager/src/routes/docs/what-is-a-rubric/+page.svelte`
- `voyager/src/routes/docs/rubrics-evaluate-and-generate/+page.svelte`
- `voyager/src/routes/docs/how-voyager-pay-works/+page.svelte`
- `voyager/src/routes/docs/what-is-eroi/+page.svelte`
- `voyager/src/routes/docs/why-systems-get-captured/+page.svelte`
- `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte`
- `voyager/src/routes/docs/what-can-still-go-wrong/+page.svelte`

### Component copy (small, but visible on every page)

- `voyager/src/lib/components/Header.svelte` — link labels, mobile fallback link.
- `voyager/src/lib/components/Footer.svelte` — tagline, column headers, link labels, language button, copyright line.
- `voyager/src/lib/components/Cta.svelte` — none expected; the `›` glyph stays.
- `voyager/src/lib/components/SectionHeader.svelte` — none expected (pure layout).

### Out of scope (explicit)

- `Documentation/lesson.md`, `thingrubric.md`, `rubricsmore.md`, `readme.md`, `vp.md` — read-only source material; **not** edited.
- `lib/ramp/rankQuotes.js`, `lib/agent/*.ts`, `lib/webllm/engine.svelte.js`, `lib/preferences/contextPrompt.svelte.js` — code comments out of scope unless they're user-visible.
- Token CSS, layout CSS, components' class names, layout markup.
- `plans/` files.
- Search, TOC jump links, deep-linking.

## Rubric-derived rewrite rules (apply mechanically)

1. **C1 — Function declaration.** Open every section with a one-sentence statement of *what this is* or *what the reader should do here*. Replace existing ledes that bury the function. Example shape: "This page is a [type]. It tells you [what]. To use it, [do X]."
2. **C2 — Quantity.** For each page, list every paragraph and ask: "What does this paragraph add that the previous one didn't?" Cut paragraphs that restate; merge paragraphs that make the same point in weaker language. Add paragraphs whose absence leaves a gap (e.g. an unstated prerequisite, a missing definition). The implementer writes a one-line audit per page before editing.
3. **C3 — Quality.** Every factual claim either: (a) gets an inline source (`see `lib/ramp/rankQuotes.js``), (b) is framed with an explicit hedge ("in this demo", "the spec says", "by design"), or (c) is removed. Numbers must match the data they quote. Where the original claims something the rubric can't support (e.g. a feature that the code doesn't do), reframe to what the code actually does or cut.
4. **C4 — Manner.**
   - Average sentence length <20 words.
   - One main idea per sentence.
   - Active voice by default.
   - Subject-verb-object order.
   - Define jargon at first use; after the first use, use the short form.
   - Replace nominalizations and hidden verbs ("make a determination" → "decide"; "leverage" → "use"; "enables the user to" → "lets you").
5. **C5 — Relation.** Drop or bracket tangents. The current home page has an autobiographical-feeling lede in places ("Voyager is a local-first AI trip planner...") — keep the *function*, drop the throat-clearing.
6. **C6 — Structure.** Make sure headings accurately preview the paragraph that follows. If a heading says "Three properties a custodial rail can't give you" and the body covers more than three, either the heading or the body is wrong. CTA at the end of every page; CTA findable in <10 seconds from any page.
7. **C7 — Working-memory load.** ≤2–3 new terms per paragraph. Where a paragraph needs to introduce a list of parallel items, switch to a `<ul>` or a `rounded-[28px] bg-bone-100` callout card (existing pattern in `pay/+page.svelte` §11). Front-load conclusions so readers can off-load the main idea early.

## Implementation order

1. **Establish voice** — rewrite `Footer.svelte` and `Header.svelte` first. They're on every page and set the tone for the rest. Eyebrows, link labels, and the small language/copyright lines are the cheapest places to calibrate sentence length, active voice, and one-idea-per-sentence.
2. **Rewrite home** (`+page.svelte`) — the largest single document. Write it once; copy the patterns into docs.
3. **Rewrite pay** (`pay/+page.svelte`) — second-largest; reuses the same patterns plus an EROI section that's already strong structurally.
4. **Rewrite preferences** (`preferences/+page.svelte`) — small. Then **plan** (`plan/+page.svelte`) — focused on copy in the post-submit state.
5. **Rewrite docs overview** (`docs/+page.svelte`) — already mostly rubric-shaped from the prior pass; trim and re-shape ledes.
6. **Rewrite the 8 lessons** — apply the same rules. Where the prior pass already did well (Lesson 5 EROI, Lesson 6 capturable systems), the edits will be small. Where it didn't (Lessons 2 and 3 carry the most jargon density), the edits will be larger.
7. **Self-check pass** — for each file changed, run the seven-criterion checklist. Note any criterion that scored <Good, fix in place.

## Validation

- **Dev server**: `npm run dev` must render every rewritten page with HTTP 200 and no Svelte compile errors. (The pre-existing `GOOGLE_PLACES_API_KEY` build failure is unrelated and stays as-is.)
- **Rubric self-check**: for each rewritten file, the implementer writes a short note at the top of the file (or in a working scratch file) listing the seven criteria and which level the page sits at. If any criterion is below Good (3), the page isn't done.
- **Spot-read pass**: the user does a one-pass read of every page (home, pay, plan submitted state, preferences, docs overview, each docs lesson) and flags anything that sounds wrong. Final pass closes any flagged lines.
- **Sentence-length sanity**: a rough `wc -w` on the longest paragraph in each file — target ≤80 words per paragraph, average <20 words per sentence. If a file has a paragraph that fails, split it.

## Risks / things to watch

- **Voice consistency**: 9 lesson pages plus marketing plus functional — risk of register drift. Mitigation: rewrite Footer and Header first to lock the voice; use the same patterns across files.
- **Don't break the EROI band on pay**: the §11 EROI section is the strongest existing prose on the site. Rewrite for clarity, but keep the same three-knobs structure (Fan-out / Opacity / Binding) so the audit lesson in `/docs/voyager-pay-eroi-audit` still lines up.
- **Don't break the seven-step payment flow**: each step is currently a numbered list item with a title + body. Keep the numbered structure; only rewrite the title and body prose.
- **CTA grammar**: `Cta.svelte` auto-appends `›`. Don't put `›` in the label text. The implementer reads `Cta.svelte` once before the rewrite to confirm.
- **Token CSS and bone/lime/ink tokens** stay — no visual changes. Copy changes only.
- **Source markdown files under `Documentation/` and `vp.md` stay read-only.** Lesson prose is paraphrased from them, never copied verbatim.

## Out of scope (explicit)

- Layout / structure changes (no section reordering, no card-grid reshuffling, no new components).
- Visual / typography changes (token CSS untouched).
- Code-level changes (rankQuotes.js, agent, webllm, preferences modules untouched).
- Source markdown files under `Documentation/` and `vp.md`.
- New copy in `plans/` or `.kilo/`.

## Validation summary

| Check                                                  | How                                                |
| ------------------------------------------------------ | -------------------------------------------------- |
| Dev server returns 200 on every rewritten route        | `npm run dev` + curl each path                     |
| No Svelte compile errors                               | Same                                               |
| All seven criteria scored on each file (self-check)    | Per-file note, fix any criterion <Good (3)         |
| Voice consistent across files                          | Read Footer/Header against home/pay                |
| EROI band and seven-step flow on pay still align with `/docs/voyager-pay-eroi-audit` and `/docs/how-voyager-pay-works` | Cross-read both; structure must match |

After validation passes, the user can choose to commit.
