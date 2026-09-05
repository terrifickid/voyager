# Plan: Remove every "choke" / "chokepoint" reference

## Goal
Delete the word `chokepoint` (and `choke`) from the entire workspace while preserving the meaning of every sentence it appears in. User confirmed: "Delete every instance everywhere".

## Scope
Six files, twelve occurrences. Each rewrite preserves the rhetorical intent (describing the absence of a single point of control / single dependency) using neutral phrasing already in use elsewhere in the corpus (`single-vendor dependency`, `single point of control`, `single dependency`, `single point of failure`, `bottleneck`).

## Affected files and rewrites

### 1. `voyager/src/routes/network/+page.svelte`
- **L119** — `<SectionHeader ... title="An optional cache, never a chokepoint." />`
  - **New title:** `"An optional cache, never a single point of failure."`
  - No other changes in this file.

### 2. `voyager/src/routes/blog/+page.svelte` (rendered blog, independent copy — not generated from `blog.md`)
- **L101** — `No single node is a chokepoint.` (inside the Ramp `<li>`)
  - **New:** `No single node is required.`
- **L129** — `No single node is a chokepoint. If one node goes offline, another takes its place.`
  - **New:** `No single node is required. If one node goes offline, another takes its place.`
- No other changes in this file.

### 3. `blog.md` (long-form prose source, 211 lines)
- **L43** — `distributed processing instead of single chokepoint factories`
  - **New:** `distributed processing instead of single centralized factories`
- **L78** — `No single node is a chokepoint.`
  - **New:** `No single node is required.`
- **L84** — `Any one of them left as a single-vendor dependency leaves a residual chokepoint.`
  - **New:** `Any one of them left as a single-vendor dependency leaves a residual single point of control.`
- **L173** — `not depending on a single chokepoint you do not control`
  - **New:** `not depending on a single point of control you do not control`

### 4. `blog-sales.md` (sales prose, 127 lines)
- **L25** — `permission from any single chokepoint to operate`
  - **New:** `permission from any single point of control to operate`
- **L32** — `No single node is a chokepoint.`
  - **New:** `No single node is required.`

### 5. `newblog.md` (draft blog, 21 lines)
- **L7** — `through which other people's resources must flow.` preceded by `a narrow pipeline ... single chokepoint`. Exact phrase to replace: `single chokepoint`.
  - **New:** `single point of control`
  - **Full L7 sentence after edit:** `… a narrow pipeline through which other people's resources must flow.` reads better if the leading `single chokepoint` becomes `single point of control`. Final edited fragment: `the metabolic cost of moving it to any single point of control is the constraint that governs every variant.`
- **L9** — `routed through many small chokepoints`
  - **New:** `routed through many small endpoints`
  - **Final edited fragment:** `A peripheral economy that is dispersed, fragmented, or routed through many small endpoints is expensive to harvest …`

### 6. `ai.md` (essay, 323 lines)
- **L314** — `The only residual chokepoint is where the model weights come from.`
  - **New:** `The only residual point of control is where the model weights come from.`
  - No other changes.

## Substitution glossary (for the implementer)
| Original phrase | Replacement |
|---|---|
| `chokepoint` (noun, technical sense) | `point of control` or `single dependency` |
| `single chokepoint` | `single point of control` |
| `single chokepoint factories` | `single centralized factories` |
| `many small chokepoints` | `many small endpoints` |
| `No single node is a chokepoint.` | `No single node is required.` |
| `An optional cache, never a chokepoint.` | `An optional cache, never a single point of failure.` |

Use the glossary to pick the closest fit if a future occurrence is added that is not enumerated above.

## Out of scope
- `bottleneck` is a synonym for chokepoint but is NOT in scope per the user's wording ("choke or chokepoints"). The one existing `bottleneck` reference at `voyager-pay/+page.svelte:90` stays untouched.
- The word `monopoly` and other anti-centralization vocabulary is unrelated; leave alone.

## Validation steps
1. `rg -in 'choke|chokepoint' /workspaces/voyager` returns zero matches (excluding `node_modules`, `.git`, and the file `node_modules/**`).
2. `rg -in 'bottleneck' /workspaces/voyager` still returns the one existing match at `voyager-pay/+page.svelte:90` (proves no accidental removal of unrelated vocabulary).
3. For each file, open it and re-read the edited sentence to confirm the new sentence reads naturally and preserves the original meaning.
4. If `voyager` has a build/lint script, run it (check `package.json` `scripts`) — this is prose, no functional change expected.

## Risks
- **Low.** All twelve changes are inside prose and one UI string. No code, schema, or build-affected content changes.
- The Svelte route `voyager/src/routes/blog/+page.svelte` is a hardcoded copy of the blog post, not generated from `blog.md`. Both must be edited independently or the rendered site will diverge from the source prose.

## Execution order
1. Edit `voyager/src/routes/network/+page.svelte` (single string, UI-visible).
2. Edit `voyager/src/routes/blog/+page.svelte` (two strings).
3. Edit `blog.md` (four strings).
4. Edit `blog-sales.md` (two strings).
5. Edit `newblog.md` (two strings).
6. Edit `ai.md` (one string).
7. Run validation grep; rebuild rendered site if applicable.
