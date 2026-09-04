# Remove "Sep 2 advisory call" references

## Goal

Drop every reference to the **Sep 2 2026 advisory call** (and the unprefixed "advisory call" / "September 2 2026 advisory call" variants) from the live site, active docs, tokens.css, and historical plan files. Replace with neutral wording that anchors the platform's origins in builder validation work without naming the event or the date.

## Why

Following the prior round (drop "Caribbean-first" + "Shontelle Layne"), the named advisor and the named event are being stripped from positioning copy together. References to a specific private advisory call create an attribution footprint the project no longer wants.

## Replacement policy

- `Sep 2 2026 advisory call` / `September 2 2026 advisory call` / `Sep 2 advisory call` → drop the date and event. Use neutral phrasing like **"builder validation"**, **"early alpha input"**, or **"regional builder interviews"** when provenance still needs a noun phrase.
- `Advisory call` (unprefixed, but still pointing to the same event) → drop or replace with the same neutral phrasing.
- The unprefixed word "advisory" alone (e.g. "advisor", "advisory board") — NOT in scope. No matches in current in-scope files except where it's part of "advisory call", which is covered.
- **LINEAGE first entry** (per user direction): replace with a neutral phase label, keep 3-entry array shape. Use `{ label: 'Alpha 2026', note: 'Builder validation · regional input' }`.

## Files / sections with mentions + proposed fix

### A. Live site — `voyager/src/routes/**`

| # | File | Line(s) | Section / element | Current text | Proposed fix |
|---|------|---------|-------------------|--------------|--------------|
| 1 | `voyager/src/routes/+page.svelte` | 282 | Use-cases SectionHeader lede | `These are the jobs builders named on the Sep 2 2026 advisory call.` | `These are the jobs builders identified for the toolkit.` |
| 2 | `voyager/src/routes/principles/+page.svelte` | 17 | `LINEAGE` entry 1 | `{ label: 'Sep 2 2026', note: 'Advisory call · Caribbean builders' }` | `{ label: 'Alpha 2026', note: 'Builder validation · regional input' }` |
| 3 | `voyager/src/routes/principles/+page.svelte` | 46 | SectionHeader lede | `The Sep 2 2026 advisory call made it clear: the value isn't in the trip planner. The trip planner was the means to build the rails. The rails are now built.` | `Early alpha validation made it clear: the value isn't in the trip planner. The trip planner was the means to build the rails. The rails are now built.` |
| 4 | `voyager/src/routes/principles/+page.svelte` | 140 | Principle n=5 body | `A platform designed in Texas for the region's builders is going to miss things. The advisory call is the start.` | `A platform designed in Texas for the region's builders is going to miss things. Builder validation is the start.` |
| 5 | `voyager/src/routes/principles/+page.svelte` | 186 | HeritageLineage caption | `Sep 2 advisory call → five primitives → open rails. A lineage from prior art, not nostalgia.` | `Builder validation → five primitives → open rails. A lineage from prior art, not nostalgia.` |
| 6 | `voyager/src/routes/network/+page.svelte` | 13 | `LINEAGE` entry 1 | `{ label: 'Sep 2 2026', note: 'Advisory call · Caribbean builders' }` | `{ label: 'Alpha 2026', note: 'Builder validation · regional input' }` |
| 7 | `voyager/src/routes/use-cases/+page.svelte` | 31 | Hero lede | `These are the jobs-to-be-done surfaced by the Sep 2 2026 advisory call. Each is a target use case for some app a builder would ship on Voyager.` | `These are the jobs-to-be-done for the toolkit. Each is a target use case for some app a builder would ship on Voyager.` |
| 8 | `voyager/src/routes/use-cases/+page.svelte` | 57 | SplitPanel right title | `From the Sep 2 advisory call.` | `From early builder validation.` |
| 9 | `voyager/src/routes/use-cases/+page.svelte` | 58 | SplitPanel right body | `These are the jobs builders named in the Sep 2 2026 advisory call. Each one is a target for some app a builder ships on Voyager — the list is what the platform should make easy, not what Voyager builds.` | `These are the jobs builders identified for the toolkit. Each one is a target for some app a builder ships on Voyager — the list is what the platform should make easy, not what Voyager builds.` |

### B. Tokens comment

| # | File | Line(s) | Current text | Proposed fix |
|---|------|---------|--------------|--------------|
| 10 | `voyager/src/lib/styles/tokens.css` | 148 | `advisory call directive "Tiffany blue/bluish-green/teal")` | `builder-validation directive "Tiffany blue/bluish-green/teal")` |

### C. Active markdown docs (not built into the site)

| # | File | Line(s) | Current text | Proposed fix |
|---|------|---------|--------------|--------------|
| 11 | `refactor/voyager.md` | 17 | `The Sep 2 2026 advisory call (a Barbados-based artist and music-industry operator) and parallel reads of Caribbean creator pain points made it clear that the value is not in the trip-planner.` | `Early alpha validation and parallel reads of regional creator pain points made it clear that the value is not in the trip-planner.` |
| 12 | `refactor/voyager.md` | 36 | §2 heading `Use cases from the advisory call (regional ground truth)` | `Use cases from early alpha validation (regional ground truth)` |
| 13 | `refactor/voyager.md` | 38 | `These are the jobs-to-be-done surfaced by the Sep 2 advisory call.` | `These are the jobs-to-be-done surfaced by early alpha validation.` |
| 14 | `refactor/voyager.md` | 192 | `The advisory call is the start, not the end.` | `Builder validation is the start, not the end.` |
| 15 | `blog.md` | 106 | `These use cases were named by builders on the September 2 2026 advisory call, including a Barbados-based artist and music-industry operator.` | `These use cases were named by builders during early alpha validation, including a Barbados-based artist and music-industry operator.` |

### D. Historical plan files (cosmetic, matches prior cleanup pattern)

| # | File | Line(s) | Current text | Proposed fix |
|---|------|---------|--------------|--------------|
| 16 | `.kilo/plans/1788404999511-sui-split-panel-plan.md` | 121–123 | The 3-line block quoting the SplitPanel right title + body referencing `Sep 2 advisory call` and `Sep 2 2026 advisory call` | Replace quoted title with `From early builder validation.` and quoted body with the new body from row 9. |
| 17 | `.kilo/plans/1788407656906-apply-cdesign-rubric-cdr.md` | 104 | `"Sep 2 2026 advisory call"` in C1 byline description | `"early builder validation"` |
| 18 | `.kilo/plans/1788407656906-apply-cdesign-rubric-cdr.md` | 174 | `The "Sep 2 advisory call" is the equivalent...` | `The "early builder validation" phase is the equivalent...` |
| 19 | `.kilo/plans/1788407656906-apply-cdesign-rubric-cdr.md` | 229 | `advisory call → toolkit` in the HeritageLineage description | `early builder validation → toolkit` |

## Out of scope (intentionally not touched)

- The plan file `.kilo/plans/1788539516965-remove-caribbean-first-and-shontelle-layne.md` itself — it's the source of truth for the prior round, which quoted "Sep 2 advisory call" as the target replacement language. Editing it would create a circular record.
- `cdesign1.md:10` — references "the advisory call" but was explicitly out of scope in the prior plan ("cdesign1.md — do not edit").
- The `advisor`/`advisory` word root in unrelated contexts (no current matches in in-scope files outside the rows above).

## Order of operations for the implementation agent

1. Edit all live-site route files (rows 1–9).
2. Edit `tokens.css` comment (row 10).
3. Edit `refactor/voyager.md` and `blog.md` (rows 11–15).
4. Edit historical plan files (rows 16–19).
5. Run final repo-wide grep for `Sep 2`, `September 2 2026`, `advisory call` — confirm zero in-scope matches remain.
6. Run `pnpm run build` from `/workspaces/voyager/voyager` to confirm no template breakage.

## Validation

- `grep -rni "sep 2\|advisory call" --include="*.svelte" --include="*.ts" --include="*.js" --include="*.json" --include="*.md" --include="*.css"` returns only the source-of-truth plan file and `cdesign1.md` (both out of scope).
- `pnpm run build` succeeds.
- `/principles` and `/network` LINEAGE still render 3 entries.
