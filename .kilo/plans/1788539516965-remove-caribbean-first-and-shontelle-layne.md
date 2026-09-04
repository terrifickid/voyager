# Remove "Caribbean-first" and "Shontelle Layne" references

## Goal

Strip every reference to the phrase **"Caribbean-first"** (and the variant **"Caribbean first"**) and every reference to **"Shontelle Layne"** / **"Layne"** from the site, the markdown docs, the rubric JSON, and historical plan files. Replace them with neutral, non-attributable wording that does not invite a political-association read.

## Why

- "Caribbean-first" mirrors "America First" / political-rally phrasing and reads as adjacent political rhetoric.
- Named advisor attribution is being dropped — references to the advisor should become "advisory call" (no name).

## Replacement policy (per user direction)

- `Caribbean-first` / `Caribbean first` (as positioning copy) → drop. Where the surrounding sentence needs to keep a noun phrase, replace with `open toolkit` / `open rails` / `the region's builders` or similar neutral wording.
- `Caribbean rails first` (principles pill, similar shape) → drop. Replace with `Open rails` or `Capture-resistant by design` style neutral phrase.
- `Caribbean-first` as a slug in rubric JSON (`visual-design.caribbean-first-web-brand`) → retitle the class but keep the rubric file (semantic rename only).
- `Shontelle Layne` / `Layne` → drop the name. Replace `Advisory call · Shontelle Layne` with `Advisory call · Caribbean builders` (no personal name). Replace prose mentions with `the Sep 2 2026 advisory call`.
- `shontelle` in `refactor/cdesign.json` rubric evidence — user scoped these in: replace the rubric evidence example with another Caribbean-artist site already in the rubric's evidence set.

## Files / sections with mentions + proposed fix

### A. Live site — `voyager/src/routes/**`

| # | File | Line(s) | Section / element | Current text | Proposed fix |
|---|------|---------|-------------------|--------------|--------------|
| 1 | `voyager/src/routes/+page.svelte` | 34 | `<title>` | `Voyager — Caribbean-first toolkit for the region's apps` | `Voyager — open toolkit for the region's apps` |
| 2 | `voyager/src/routes/+page.svelte` | 43 | Ribbon span | `<span class="font-semibold">Voyager</span> — an open toolkit for building Caribbean-first apps. Now in alpha.` | `<span class="font-semibold">Voyager</span> — an open toolkit for the region's apps. Now in alpha.` |
| 3 | `voyager/src/routes/+page.svelte` | 55 | Hero eyebrow | `Open toolkit · Caribbean first` | `Open toolkit · no platform in the middle` |
| 4 | `voyager/src/routes/+page.svelte` | 57 | Hero h1 | `An open AI toolkit for building Caribbean-first apps.` | `An open AI toolkit for the region's apps.` |
| 5 | `voyager/src/routes/+page.svelte` | 60 | Hero lede paragraph | (mentions "US/EU payment processors" but no Caribbean-first string; leave) | no change |
| 6 | `voyager/src/routes/+page.svelte` | 138 | Use-cases SectionHeader lede | `These are the jobs Caribbean builders named on the Sep 2 2026 advisory call.` | `These are the jobs builders named on the Sep 2 2026 advisory call.` |
| 7 | `voyager/src/lib/components/Footer.svelte` | 86 | Footer tagline | `An open toolkit for building Caribbean-first apps. Five primitives, one SDK, no platform in the middle.` | `An open toolkit for the region's apps. Five primitives, one SDK, no platform in the middle.` |
| 8 | `voyager/src/routes/principles/+page.svelte` | 17 | `LINEAGE` note | `{ label: 'Sep 2 2026', note: 'Advisory call · Shontelle Layne' }` | `{ label: 'Sep 2 2026', note: 'Advisory call · Caribbean builders' }` |
| 9 | `voyager/src/routes/principles/+page.svelte` | 19 | `LINEAGE` note | `{ label: 'Now', note: 'Open rails · Caribbean-first' }` | `{ label: 'Now', note: 'Open rails · alpha 2026' }` |
| 10 | `voyager/src/routes/principles/+page.svelte` | 24 | `<title>` | `Principles — Voyager · Caribbean-first` | `Principles — Voyager · open rails` |
| 11 | `voyager/src/routes/principles/+page.svelte` | 14 | Pill row | `{ label: 'Caribbean rails first', href: '#' }` | remove this entry from the array (3 → 2 pills) or replace with `{ label: 'Open rails', href: '#' }` |
| 12 | `voyager/src/routes/principles/+page.svelte` | 49 | "What changed" line | `Trip planner for tourists → Toolkit for builders serving the Caribbean.` | `Trip planner for tourists → Toolkit for the region's builders.` |
| 13 | `voyager/src/routes/principles/+page.svelte` | 52 | "What changed" line | `Implicit end users → Explicit Caribbean builders, integrators, creators, concierge operators, regional SMEs, CARICOM-adjacent initiatives, and diaspora communities.` | `Implicit end users → Explicit regional builders, integrators, creators, concierge operators, SMEs, and diaspora communities.` |
| 14 | `voyager/src/routes/principles/+page.svelte` | 140 | Principle n=5 body | `A platform designed in Texas for Caribbean builders is going to miss things. The advisory call is the start.` | `A platform designed in Texas for the region's builders is going to miss things. The advisory call is the start.` |
| 15 | `voyager/src/routes/principles/+page.svelte` | 164 | "Open questions" bullet | `What's the smallest viable "Caribbean hub" social surface we'd ship as a third showcase app? …` | `What's the smallest viable regional-hub social surface we'd ship as a third showcase app? …` |
| 16 | `voyager/src/routes/principles/+page.svelte` | 186 | HeritageLineage caption | `Sep 2 advisory call → five primitives → open rails. A lineage from prior art, not nostalgia.` | no change (already neutral) |
| 17 | `voyager/src/routes/network/+page.svelte` | 13 | `LINEAGE` note | `{ label: 'Sep 2 2026', note: 'Advisory call · Shontelle Layne' }` | `{ label: 'Sep 2 2026', note: 'Advisory call · Caribbean builders' }` |
| 18 | `voyager/src/routes/network/+page.svelte` | 15 | `LINEAGE` note | `{ label: 'Now', note: 'Caribbean-first · open rails' }` | `{ label: 'Now', note: 'Open rails · alpha 2026' }` |
| 19 | `voyager/src/routes/network/+page.svelte` | 30 | `<title>` | `Network — Voyager · Caribbean-first federation` | `Network — Voyager · open federation` |
| 20 | `voyager/src/routes/network/+page.svelte` | 41 | Hero lede | `Voyager doesn't host the network. Voyagers hosts the indexer. Mostro nodes, Nostr relays, and independent indexers are run by anyone who wants to.` (no Caribbean-first string; leave) | no change |
| 21 | `voyager/src/routes/network/+page.svelte` | 155 | HeritageLineage caption | `Advisory call → primitives → open rails — the same lineage shape, adapted to software.` | no change |
| 22 | `voyager/src/routes/use-cases/+page.svelte` | 20 | `<title>` | `Use cases — Voyager · Caribbean-first toolkit` | `Use cases — Voyager · open toolkit` |
| 23 | `voyager/src/routes/use-cases/+page.svelte` | 31 | Hero lede | `These are the jobs-to-be-done surfaced by the Sep 2 2026 advisory call with Shontelle Layne. Each is a target use case for some app a builder would ship on Voyager.` | `These are the jobs-to-be-done surfaced by the Sep 2 2026 advisory call. Each is a target use case for some app a builder would ship on Voyager.` |
| 24 | `voyager/src/routes/use-cases/+page.svelte` | 58 | SplitPanel right body | `These are the jobs Caribbean builders named in the Sep 2 2026 call with Shontelle Layne. Each one is a target for some app a builder ships on Voyager — the list is what the platform should make easy, not what Voyager builds.` | `These are the jobs builders named in the Sep 2 2026 advisory call. Each one is a target for some app a builder ships on Voyager — the list is what the platform should make easy, not what Voyager builds.` |
| 25 | `voyager/src/routes/use-cases/uc1/+page.svelte` | 11 | `<title>` | `{uc.code} · {uc.title} — Voyager · Caribbean-first` | `{uc.code} · {uc.title} — Voyager · open toolkit` |
| 26 | `voyager/src/routes/use-cases/uc2/+page.svelte` | 11 | `<title>` | same | same |
| 27 | `voyager/src/routes/use-cases/uc3/+page.svelte` | 11 | `<title>` | same | same |
| 28 | `voyager/src/routes/use-cases/uc4/+page.svelte` | 11 | `<title>` | same | same |
| 29 | `voyager/src/routes/use-cases/uc5/+page.svelte` | 11 | `<title>` | same | same |
| 30 | `voyager/src/routes/use-cases/uc6/+page.svelte` | 11 | `<title>` | same | same |
| 31 | `voyager/src/routes/use-cases/uc7/+page.svelte` | 18 | `<title>` | same | same |
| 32 | `voyager/src/routes/use-cases/uc8/+page.svelte` | 18 | `<title>` | same | same |
| 33 | `voyager/src/routes/projects/+page.svelte` | 19 | `<title>` | `Projects — Voyager · Caribbean-first showcases` | `Projects — Voyager · showcases` |
| 34 | `voyager/src/routes/projects/voyager-pay/+page.svelte` | 16 | `<title>` | `Voyager Pay — Open payments for Caribbean-first apps` | `Voyager Pay — Open payments for the region's apps` |
| 35 | `voyager/src/routes/projects/voyager-pay/pricing/+page.svelte` | 10 | `<title>` | `Fair pricing — Voyager Pay · Caribbean-first` | `Fair pricing — Voyager Pay · open rails` |
| 36 | `voyager/src/routes/projects/voyager-pay/vendors/+page.svelte` | 9 | `<title>` | `For vendors — Voyager · Caribbean-first marketplace` | `For vendors — Voyager · marketplace` |
| 37 | `voyager/src/routes/projects/trip-planner/+page.svelte` | 56 | `<title>` | `Trip Planner — Voyager · Caribbean-first showcase` | `Trip Planner — Voyager · showcase` |
| 38 | `voyager/src/routes/projects/trip-planner/preferences/+page.svelte` | 8 | `<title>` | `Preferences — Voyager · Trip Planner · Caribbean-first` | `Preferences — Voyager · Trip Planner · open rails` |
| 39 | `voyager/src/routes/projects/trip-planner/plan/+page.svelte` | 92 | `<title>` | `Plan a trip — Voyager · Caribbean-first` | `Plan a trip — Voyager · open toolkit` |
| 40 | `voyager/src/routes/build/+page.svelte` | 16 | `<title>` | `Start building — Voyager · Caribbean-first rails` | `Start building — Voyager · open rails` |
| 41 | `voyager/src/routes/docs/+page.svelte` | 6 | `<title>` | `Documentation — Voyager · Caribbean-first spec` | `Documentation — Voyager · open spec` |
| 42 | `voyager/src/routes/network/node/+page.svelte` | 9 | `<title>` | `Run a node — Voyager Pay · Caribbean-first` | `Run a node — Voyager Pay · open rails` |
| 43 | `voyager/src/routes/network/security/+page.svelte` | 9 | `<title>` | `Security by design — Voyager Pay · Caribbean-first` | `Security by design — Voyager Pay · open rails` |
| 44 | `voyager/src/routes/stack/+page.svelte` | 11 | `<title>` | `Stack — Voyager · Caribbean-first toolkit` | `Stack — Voyager · open toolkit` |
| 45 | `voyager/src/routes/stack/identity/+page.svelte` | 12 | `<title>` | `{p.title} — Voyager Stack · Caribbean-first` | `{p.title} — Voyager Stack · open toolkit` |
| 46 | `voyager/src/routes/stack/payments/+page.svelte` | 12 | `<title>` | same | same |
| 47 | `voyager/src/routes/stack/ramp/+page.svelte` | 12 | `<title>` | same | same |
| 48 | `voyager/src/routes/stack/messaging/+page.svelte` | 12 | `<title>` | same | same |
| 49 | `voyager/src/routes/stack/discovery/+page.svelte` | 12 | `<title>` | same | same |
| 50 | `voyager/src/routes/blog/+page.svelte` | 39 | Blog landing lede | `Voyager is an open toolkit for building Caribbean-first apps. …` | `Voyager is an open toolkit for the region's apps. …` |

### B. Markdown docs (not part of the built site)

| # | File | Line(s) | Section / element | Current text | Proposed fix |
|---|------|---------|-------------------|--------------|--------------|
| 51 | `blog-sales.md` | 18 | Lede paragraph | `Voyager is an open toolkit for building Caribbean-first apps. …` | `Voyager is an open toolkit for the region's apps. …` |
| 52 | `blog-sales.md` | 93 | Subtitle / dek | `An open toolkit for building Caribbean-first apps. Five primitives, one SDK, no platform in the middle.` | `An open toolkit for the region's apps. Five primitives, one SDK, no platform in the middle.` |
| 53 | `blog.md` | 51 | Section header | `What does "scattering the granary" look like for a Caribbean-first internet?` | `What does "scattering the granary" look like for an open-rails internet?` |
| 54 | `blog.md` | 106 | Section "The eight jobs" intro | `These use cases were named by Caribbean builders on the September 2 2026 advisory call, including a Barbados-based artist and music-industry operator.` | `These use cases were named by builders on the September 2 2026 advisory call, including a Barbados-based artist and music-industry operator.` |
| 55 | `refactor/voyager.md` | 17 | §0 "What changed and why" | `Earlier Voyager work targeted a single end-user surface — a travel concierge / trip-planner … The Sep 2 2026 advisory call with Shontelle Layne (Barbados-based artist and music-industry operator) … What the Caribbean actually needs is a toolkit other people can build on.` | `Earlier Voyager work targeted a single end-user surface — a travel concierge / trip-planner … The Sep 2 2026 advisory call (a Barbados-based artist and music-industry operator) … What the region actually needs is a toolkit other people can build on.` |
| 56 | `refactor/voyager.md` | 32 | §1 "The pitch in one paragraph" | `Voyager is an open toolkit for building Caribbean-first applications. …` | `Voyager is an open toolkit for the region's applications. …` |
| 57 | `refactor/voyager.md` | 36 | §2 heading | `Use cases Shontelle named (Caribbean ground truth)` | `Use cases from the advisory call (regional ground truth)` |
| 58 | `refactor/voyager.md` | 168 | §6 "Open questions" item 1 | `Shontelle Layne + Lily's concierge operation (Barbados) — already an advisor + already has a use case. The concierge demo ships first; their feedback shapes SDK ergonomics.` | `The Barbados-based concierge operation — already an advisor + already has a use case. The concierge demo ships first; their feedback shapes SDK ergonomics.` |

### C. Rubric JSON

| # | File | Line(s) | Section / element | Current text | Proposed fix |
|---|------|---------|-------------------|--------------|--------------|
| 59 | `refactor/cdesign.json` | 5 | Top-level `class` | `"visual-design.caribbean-first-web-brand"` | `"visual-design.open-rails-web-brand"` |
| 60 | `refactor/cdesign.json` | 41 | `vision_unseen_sites_with_tokens_only` list | `"shontelle"` | replace with another Caribbean-artist site already in the rubric; recommend `"koffee"` (already used elsewhere as rubric evidence) and dropping `shontelle` from this list |
| 61 | `refactor/cdesign.json` | 252 | C4 evidence bullet | `"shontelle ships 72px helvetica-w01-bold h1 over a 10px Arial body — accidental scale drift, not design"` | `"fentybeauty ships a 72px display over a 10px body — accidental scale drift, not design"` (use existing rubric-evidence subject) |
| 62 | `refactor/cdesign.json` | 429 | C7 evidence bullet | `"shontelle: <h1> is 'QUEEN OF THE PEN.', matches the visible hero (working example)"` | `"koffee: <h1> matches the visible hero (working example)"` |
| 63 | `refactor/cdesign.json` | 468 | Negative-pattern comment | `(both are different categories; only third-party ads are anti-Caribbean-first)` | `(both are different categories; only third-party ads are anti-open-rails)` |

### D. Historical plan files (in `.kilo/plans/`) — cosmetic only, no runtime impact

These are already-completed plans stored for history. Edit them so a future grep over the repo is clean.

| # | File | Line(s) | Current text | Proposed fix |
|---|------|---------|--------------|--------------|
| 64 | `.kilo/plans/1788487551989-ai-toolkit-hero-and-mentions.md` | 8, 24, 90 | Three references to "Caribbean-first apps" in the hero copy-decision description | drop "Caribbean-first" → "open toolkit for the region's apps" in the quoted old/new h1 strings and the rationale |
| 65 | `.kilo/plans/1788400175347-voyager-platform-refactor.md` | 131 | `e.g. "An open toolkit for building Caribbean-first apps." Real h1 = hero text.` | `e.g. "An open toolkit for the region's apps." Real h1 = hero text.` |
| 66 | `.kilo/plans/1788404999511-sui-split-panel-plan.md` | 123 | `the Sep 2 2026 call with Shontelle Layne. …` | `the Sep 2 2026 advisory call. …` |
| 67 | `.kilo/plans/1788407656906-apply-cdesign-rubric-cdr.md` | 6, 83, 104, 106, 140, 141 | Multiple references to "Caribbean-first" rubric class, "Sep 2 2026 call with Shontelle Layne", "Bylines naming real Caribbean figures where they appear in copy (Shontelle Layne, Mostro operators, the advisory-call participants)" | rename rubric class to `open-rails` and drop the named-byline bullet, replace personal name with "advisory call" in remaining prose |
| 68 | `.kilo/plans/1788498639948-rolldown-plugin-timings-diagnosis.md` | 66 | `- Caribbean-first → "Open toolkit (no regional prefix)" copy edit (separate plan).` | This bullet is a backlog pointer — remove the line (the separate plan it points to is what executes this plan). |

## Out of scope (intentionally not touched)

The string "Caribbean" remains everywhere it appears in:

- Color / register names baked into the design system — `monochrome-caribbean`, `carnival-poster`, `windies`, `civic-ocean`, `trinidad`, `orange-sun`, `tiffany`, `maroon-nights`, `rasta`, `perk`, `caribana`, `festival-poster`, `carnival-poster-white`, `ocean`, `gold-cream`, `heritage-sepia`, `editorial` — none of these contain the phrase "Caribbean-first" and none reference the advisor.
- `voyager/src/lib/data/mostroNodes.json` reference-node name `voyager-caribbean` — identifier, not positioning copy; out of scope.
- `voyager/src/lib/data/primitives.json` body copy that mentions "Caribbean apps", "Caribbean merchants", "Caribbean rails first", "Caribbean app builder", "Caribbean-keyed" — these are problem-statement copy about the regional developer audience. The user's request targets the **"Caribbean-first"** positioning phrase specifically, not all Caribbean mentions. Out of scope. **Flag for explicit confirmation in plan-exit review.**
- `voyager/src/lib/data/useCases.json` titles/bodies for UC2 "Caribbean-to-Caribbean commerce" and others — problem-statement copy, not positioning. Out of scope. **Flag for explicit confirmation.**
- `voyager/src/lib/data/aiEmbedSnippet.json` Caribbean place names in sample listing copy — example data, out of scope.
- `voyager/src/lib/ramp/rankQuotes.js` "Caribbean-tuned corridor" — comment, out of scope.
- `voyager/src/lib/webllm/engine.svelte.js` system-prompt "You are Voyager, a Caribbean travel concierge." — functional AI prompt, out of scope.
- `voyager/src/lib/components/NostrAiSearch.svelte` and `NostrAiEmbed.svelte` copy "Related from Caribbean sellers" — example/result copy, out of scope.
- `voyager/src/lib/styles/tokens.css` comments — out of scope.
- `voyager/src/routes/network/+page.svelte` `isCaribbean()` helper and islands array — code, not copy, out of scope.

## Order of operations for the implementation agent

1. Replace all `<title>` tags (rows 1, 10, 19, 22, 25–32, 33–49).
2. Replace hero / ribbon / footer copy on the home page (rows 2, 3, 4, 6, 7).
3. Replace `LINEAGE` notes on `/principles` and `/network` (rows 8, 9, 17, 18) — both pages share the same shape.
4. Replace `/use-cases` lede and SplitPanel right body (rows 23, 24).
5. Replace `/principles` prose (rows 12, 13, 14, 15) and pill row (row 11).
6. Edit markdown docs (rows 51–58).
7. Edit `refactor/cdesign.json` (rows 59–63). Verify JSON remains valid.
8. Edit historical plan files (rows 64–68).
9. Run a final repo-wide grep for `caribbean-first`, `caribbean first`, `Shontelle`, `Layne`, and confirm zero matches in in-scope files.

## Validation

- `rg -i 'caribbean-first|shontelle|layne'` over the repo returns only the out-of-scope items listed above.
- `pnpm run check` (svelte-check + tsc) passes — no template syntax breakage from the `<title>` edits.
- `pnpm run build` succeeds; spot-check the home page, `/principles`, `/network`, `/use-cases`, one `/use-cases/uc*`, `/projects`, `/build`, `/docs`, `/stack` titles render correctly.
- `refactor/cdesign.json` parses as valid JSON (`jq . refactor/cdesign.json > /dev/null`).

## Open questions (for reviewer)

1. `voyager/src/lib/data/primitives.json`, `useCases.json`, `mostroNodes.json`, `aiEmbedSnippet.json`, and `webllm/engine.svelte.js` contain "Caribbean" but not "Caribbean-first". Confirm these stay out of scope.
2. The pill row on `/principles` currently has three entries; replacing "Caribbean rails first" with a new label keeps the count at three. OK to do that, or drop to two pills?
3. The class slug rename `visual-design.caribbean-first-web-brand` → `visual-design.open-rails-web-brand` will affect anyone who has the old slug in a saved search or doc reference. Acceptable?