# Plan: Restructure home, pay, and docs using the clear-communication rubric

## Goal

Use the rubric in `/workspaces/voyager/coms.md` to **restructure** (not just rewrite prose) the three user-facing surfaces that are currently awkward:

- `voyager/src/routes/+page.svelte` (home)
- `voyager/src/routes/pay/+page.svelte` (pay)
- `voyager/src/routes/docs/+page.svelte` + the 8 lessons under `voyager/src/routes/docs/<slug>/+page.svelte`

Out of scope for this pass: any change to the rubric itself, any token/layout/component changes, any source markdown under `Documentation/`, any code under `lib/`.

## What's actually awkward right now (rubric diagnosis)

### Home — fails C1, C6, C7 most

- **C1 (function declaration) is ambiguous**: the home is doing *four* things at once — (a) selling a trip planner, (b) advertising a payments protocol, (c) showing social proof, (d) signposting docs. The hero promises a trip planner. Section 6 is a hard pivot to Voyager Pay. The reader has no single function to allocate attention to.
- **C6 (structure) is broken**:
  - Section ordering doesn't match any reader mental model. We go: hero → brand row → "how it works" → Travel/Stay/Share cards → **Voyager Pay band** → "Why Voyager" 4-card grid → personas → testimonials → docs band → final CTA. The Pay band sits in the middle of trip-planner marketing with no signal that it's an aside.
  - The hero's primary CTA is "Plan a trip". The next CTA pair belongs to Voyager Pay. Then there is a final CTA that competes with the hero CTA. Three CTAs with three different intents.
  - "Why Voyager" (4 cards) and "Travel / Stay / Share" (3 cards) cover overlapping ground. Both talk about "real places", "day-by-day", "save & share". A reader cannot tell what each section adds that the other didn't.
  - Section numbers in the source are `1` … `10` with a `9b` for docs. The numbering itself admits the structure is ad-hoc.
- **C7 (working-memory load)**: the home introduces six undefined terms in the first scroll: "Voyager", "local-first", "WebGPU", "Nostr", "Lightning", "Mostro". A general reader cannot hold this and act.
- **C2 (quantity)**: brand row, "How it works" recap, and the four "Why Voyager" cards all re-state the hero pitch.

### Pay — fails C1, C5, C6

- **C1 is split**: the page reads as three different artifacts stapled together — *marketing* (hero + status quo), *technical spec* (5 invariants, 3 layers, 7 steps), *security defense* (EROI, threats, out-of-scope). Each genre has its own register. A first-time visitor hits "settlement is atomic with the network" three paragraphs in and bails.
- **C5 (relation)**: the "status quo" paragraph is a tangent the reader didn't ask for. The §13 "out of scope" list at the bottom contradicts the §11 EROI "score profile (3,3,3)" callout above it — one claims completeness, the other admits limits.
- **C6 (structure)**: section labels in HTML comments still use the spec's numbering (§0, §1, §6, §7, §11, §12, §13). The visible page has no anchors or table of contents that match those numbers. The reader cannot find "the seven steps" again once they've scrolled past them.
- **C7 (load)**: paragraphs in §1 (architecture) and §6 (seven steps) stack four undefined terms at once (Nostr, secp256k1, LNURL, NWC, Mostro, HODL, kind:38383, kind:4). No chunking aid.

### Docs — fails C1, C6

- **C1 is weak on the overview**: the lede says "Read the spec behind Voyager." A reader landing here has no idea whether this is for users (how do I plan a trip?), builders (how do I integrate Voyager Pay?), or evaluators (is this thing real?). The lesson cards don't disambiguate by audience.
- **C6**: 8 lessons in a single flat list. No grouping. A reader who wants "how do I plan a trip" has no way to skip Lessons 4–8. A reader who wants "how does Voyager Pay work" has no way to skip Lessons 1–3.
- **C5**: Lesson 3 ("How rubrics evaluate and generate") is referenced by Lesson 1 but also requires material from Lesson 2. The dependency isn't surfaced.

## Decisions

### Decision 1 — Pick a single function per page

Per C1, every page must declare one job in the first sentence.

- **Home** = "Plan a trip you can actually take, in your browser." Voyager Pay is shown *as a feature of the plan* (you'll need a way to pay), not as a separate product competing for attention.
- **Pay** = "How Voyager Pay works." Marketing copy stays only on the pay hero. Everything after the hero is explanation.
- **Docs** = "Read the spec behind Voyager." Lede splits into two reading paths by audience.

### Decision 2 — Restructure the home around the reader's job, not Voyager's features

Current order follows Voyager's internal org chart. New order follows the reader's mental model: "I want a trip" → "what does it do" → "will it work for my kind of trip" → "who's actually used it" → "ok, I want to try it" → "here's the deeper reading if I want it".

Proposed new section order:

1. **Ribbon** — same as today (one-liner + inline link).
2. **Hero** — declares the function in the first sentence ("Plan a trip you can actually take, in your browser."). Two CTAs only: primary "Plan a trip" + secondary "See how it works". Drop the WebGPU line — it's a C7 cost for a first-time reader. Move it into "See how it works".
3. **How it works** — *moved to be the very first thing under the hero*, not buried. Three short numbered steps in plain English. CTA at the bottom: "Try it now".
4. **What you get** — the old "Travel / Stay / Share" + "Why Voyager" cards collapsed into one section with three cards. Drop the four-card grid; the four cards and the three cards were saying the same things.
5. **Who it's for** — keep the three personas, but rewrite the bodies so each persona answers "what changes for me?" (currently they say the same thing three times).
6. **From the road** — testimonials, keep.
7. **What about money?** — the Voyager Pay band moves *out* of the trip-planner flow and into a single, clearly labelled aside section. Eyebrow becomes "Voyager Pay — built in". One paragraph. One CTA. The ramp widget stays, but the section is one card, not a competitor to the hero.
8. **Want the spec?** — the docs band becomes the *closer*, not a mid-page detour. Single CTA: "Read the docs".
9. **Final CTA** — keep the closing band, but the secondary CTA flips from "Set preferences" to "Read the docs" (the deeper path is now the secondary action; "Plan a trip" stays primary).

The brand row at section 3 of the current page is decorative noise under C5/C2 — drop it. If it's load-bearing for a future investor/marketing context, it can come back later; right now it's a row of greys that nobody reads.

### Decision 3 — Restructure pay into a clear genre switch with explicit TOC

- Keep the hero, but split the *function declaration*: first sentence says "Voyager Pay is the payment layer inside Voyager. Here's how it works." Two CTAs only.
- Add a small in-page navigation row right under the hero — four anchor links: "Design invariants", "How a payment flows", "The fiat ramp", "Risks & limits". C6: the reader knows where they are.
- Status quo paragraph becomes an explicit "Why this exists" section with its own eyebrow. C5: it's no longer a nameless aside.
- Keep the five invariants, the three layers, the seven steps, the ramp, the EROI three knobs, the threat shake-out, the out-of-scope list, and the final CTA in their current *order* (other lessons reference these in this order).
- Drop the contradictory "score profile (3,3,3)" callout at the end of EROI, OR reword it to "we think this design is hard to attack; here's what's still risky anyway" — one narrative voice, not a score and a concession in two paragraphs.

### Decision 4 — Restructure docs into two named reading paths

Add a sentence and a small nav to the docs overview:

- **For travelers** (Lessons 1) — "How Voyager plans your trip in your browser."
- **For the curious** (Lessons 2, 3) — "What a rubric is" and "How rubrics evaluate and generate."
- **For the protocol-curious** (Lessons 4–8) — pay-specific lessons.

Lessons 1, 4, and 8 get an explicit "Next:" link to the next lesson in their track. The other lessons already have "Continue" links — they stay as-is.

Add a one-line "Who this is for" line at the top of each lesson, so a reader who lands deep via search knows whether to read on.

## What stays the same (explicit, to avoid scope creep)

- Layout, tokens (`tokens.css`, `layout.css`), bone/lime/ink colors, all class names.
- Component contracts (`FeatureCard.svelte`, `PersonaCard.svelte`, `QuoteCard.svelte`, `SectionHeader.svelte`, `Cta.svelte`).
- The five-invariants order (No custody → No identity → Symmetry → Outlives → Lightning).
- The seven-steps order on pay.
- The EROI three-knobs order (Fan-out → Opacity → Binding).
- The four-risk order on pay and Lesson 8 (Fiat rail reversal → Sybil reputation → Relay capture → Operator rug).
- The four out-of-scope items in the order they appear on pay and Lesson 8 (Identity → Dispute resolution → Cross-border FX → Front-end UX).
- The lesson order in `/docs` (1 through 8) — they reference each other by number.
- The CTA `›` glyph handling: `Cta.svelte` appends it; prose labels must not contain `›`.

## Files to change

### Structural (section order, section merges, section drops)

- `voyager/src/routes/+page.svelte` — reorder, merge Travel/Stay/Share with Why Voyager, drop brand row, demote Voyager Pay band, reposition docs band.
- `voyager/src/routes/pay/+page.svelte` — add in-page TOC, rename "status quo" to "Why this exists", reword the EROI score-profile callout (or delete and keep the threat section as the honest closer).
- `voyager/src/routes/docs/+page.svelte` — add audience split ("For travelers" / "For the protocol-curious"), group the 8 lessons into the two paths.

### Prose only (same structure, lighter rewrite)

- `voyager/src/routes/docs/how-voyager-plans/+page.svelte` — add the "Who this is for" line.
- `voyager/src/routes/docs/how-voyager-pay-works/+page.svelte` — same.
- `voyager/src/routes/docs/what-can-still-go-wrong/+page.svelte` — same.
- All other lesson pages get the "Who this is for" line as a one-sentence eyebrow replacement.

## Implementation order

1. **Restructure home** (`+page.svelte`). The largest structural change. Re-writes the section order, collapses two card grids into one, moves the Pay band, drops the brand row. Validate with curl `/`.
2. **Restructure pay** (`pay/+page.svelte`). Add in-page TOC, rename the "status quo" section, fix the EROI / threats narrative mismatch. Validate with curl `/pay`.
3. **Restructure docs overview** (`docs/+page.svelte`). Add the two-path split. Validate with curl `/docs`.
4. **Add "Who this is for" lines to lessons 1, 4, 8** (the lessons with their own next-lesson CTAs). Validate by curling each.
5. **Self-check**: per the prior pass, a per-file scratch note listing C1–C7 with the level each file sits at. Any criterion at Developing or below gets a fix-in-place edit.

## Validation

- `npm run dev` returns 200 on `/`, `/pay`, `/docs`, and all 8 lessons.
- No Svelte compile errors.
- No `›` in any `<Cta>` label (grep).
- For each surface, the rubric checklist from `coms.md`:
  - C1 — first sentence names the function.
  - C2 — no two paragraphs in the same section make the same point.
  - C6 — heading list count matches body section count for every section with a heading.
  - C7 — ≤ 2–3 new (undefined) terms per paragraph.

## Risks

- **Merge risk on home**: collapsing "Travel / Stay / Share" and "Why Voyager" into one section may lose a card the reader expects to see. Mitigation: keep the union of distinct ideas. The current four "Why Voyager" cards (Conversational / Day-by-day / Real places / Save & share) map onto the three "Travel / Stay / Share" cards as follows — Travel = Real day-by-day, Stay = Day-by-day / Real places, Share = Save & share. The Conversational point is real but lives better in "How it works" than in the card grid. Net: lose one card, gain clarity.
- **TOC anchor risk on pay**: adding anchor links means the page must give each anchor an `id`. Currently only `#how` and `#ramp` exist. The implementation adds `id="invariants"`, `id="how-it-flows"`, `id="risks"`. No layout impact.
- **Docs path-split risk**: putting "For travelers / For the protocol-curious" on the overview creates a choice the reader didn't ask for. Mitigation: keep a "Read in order" link at the bottom for sequential readers. Both options exist; the audience split is just a faster path.

## Out of scope (explicit)

- No rubric changes. The rubric in `coms.md` is treated as the source of truth.
- No new components, no new tokens, no new layout primitives.
- No source markdown under `Documentation/` is touched.
- No code under `lib/` is touched.
- The pay page's §0/§1/§6/§7/§11/§12/§13 source comments may stay; they are internal numbering for cross-reference and don't affect the visible structure.
- No new plans files.