# Documentation section: apply usability.md + peak.json (visual-design rubric)

## Context

User reports the `/docs` section "looks off and wrong": typography is too varied,
the left navbar is too busy, and the page needs to reflect both:

- `voyager/.kilocode/rules/usability.md` — NN/g-flavored usability rules
  (scannability, IA, navigation, typography hierarchy).
- `/workspaces/voyager/peak.json` — `perk-visual-design-v1` rubric: warm
  bone neutrals, one acid accent, heavy grotesque sans display, pill CTAs,
  tonal-step borderless cards, near-black → mid-gray type only, generous
  whitespace, pastel icon taxonomy, hierarchy via size + weight + gray value
  only (no color noise in type).

The docs section is the read-the-spec spine of the marketing site and shares
the same global tokens (`voyager/src/lib/styles/tokens.css`,
`voyager/src/routes/layout.css`) as the rest of the marketing site. The fix
should bring docs into the same visual grammar without rewriting every page.

The docs `+layout.svelte` already sets most of the right typography direction
but over-customizes it (custom `font-display` cascade on every heading,
extra-heavy weights, hand-tuned `mt`s, link underlines). The left nav is one
flat list of 11 items — too long, no grouping, eyebrow on every item.

## Goal

Bring the docs section into compliance with peak.json C3, C6, C7, C8 and
usability.md §1, §2, §11:

1. Simpler, more normalized typography across all docs pages (one H1 scale,
   one H2, one body — no per-element overrides; hierarchy by size + weight +
   gray value only).
2. Left navbar reorganized into 3-4 topic sections (user's choice) so it
   scans in groups rather than as 11 loose items.
3. Cards and code surfaces aligned to peak.json's tonal-step, borderless,
   radius-24-32 grammar already used by the overview page (`bg-bone-100`,
   `rounded-[24px]`, `p-6`, `hover:bg-bone-200`).
4. Drop the hand-tuned link/underline noise in `docs-prose` so links inherit
   the global link style used elsewhere on the marketing site.

## Affected files

- `voyager/src/routes/docs/+layout.svelte` — main layout: nav structure,
  prose typography, grid columns.
- `voyager/src/routes/docs/+page.svelte` — overview page cards (keep, but
  verify they match the simplified prose rules).
- No edits required to individual lesson pages (`docs/<slug>/+page.svelte`)
  if the `docs-prose` styles in `+layout.svelte` are simplified — they will
  inherit. Individual H1 eyebrows ("Lesson 1 — For travelers") can stay as
  they are content, not style.

## Decisions

### 1. Typography normalization (peak.json C3 + C7, usability §1, §11)

Replace the 7+ per-element overrides in `.docs-prose` with one ladder:

| Role    | Family              | Size / line-height  | Weight | Tracking | Color              |
|---------|---------------------|---------------------|--------|----------|--------------------|
| H1      | `var(--font-display)` | `clamp(2rem, 4vw + 1rem, 2.75rem)` / 1.1 | 600 | -0.02em | `var(--ink)`       |
| H2      | `var(--font-display)` | `1.5rem` / 1.25    | 600    | -0.01em  | `var(--ink)`       |
| H3      | system sans         | `1.125rem` / 1.3   | 600    | -0.005em | `var(--ink)`       |
| Body    | system sans         | `1rem` / 1.65      | 400    | normal   | `var(--ink-2)`     |
| Eyebrow | system sans, sm-caps | `0.75rem` / 1      | 500    | 0.08em   | `var(--muted)`     |
| Link    | inherits color      | inherits           | 600    | inherits | `var(--ink)`       |

Rules applied:

- All headings inherit color from `var(--ink)`; no `--ink-2` on headings.
- One font family per role (display for H1/H2; system sans for H3/body) —
  matches peak.json "zero serif at display sizes" + "hierarchy by size +
  weight + gray value only".
- Body color is `var(--ink-2)` (`#2A2A22`), not pure black, per peak.json C7.
- `.eyebrow` already exists as a global utility (see
  `+page.svelte` lines 26, 40, 64) — drop the hand-tuned `text-xs font-medium
  text-muted` span in the nav and rely on `.eyebrow`.
- Link styling: remove the hand-set `font-weight: 600; underline;
  underline-offset: 3px; text-decoration-color: color-mix(...)`. Default to
  the global link color (`var(--ink)`) with the existing global underline
  treatment from `layout.css`. This keeps the docs link look consistent with
  `/`, `/vendors`, etc.

### 2. Left navbar sectioning (usability §2, peak.json C8)

Reorganize the flat 11-item list into 4 grouped sections (matches user's
choice: by topic). Update the `lessons` data to group entries:

```js
const sections = [
  { label: 'Overview',            items: [lessons[0]] },
  { label: 'The trip planner',    items: [lessons[1]] },                         // L1
  { label: 'Rubrics & generation', items: [lessons[2], lessons[3]] },           // L2-L3
  { label: 'Voyager Pay & EROI',  items: [lessons.slice(4)] },                   // L4-L9 + inserts
];
```

Render as a `<ul>` of section blocks:

```svelte
{#each sections as section}
  <p class="eyebrow mb-2">{section.label}</p>
  <ul class="flex flex-col gap-y-1 mb-5">
    {#each section.items as lesson}
      ...
    {/each}
  </ul>
{/each}
```

Nav item row: collapse to one line per item. Remove the per-item eyebrow span
above the title — the section header now carries that context.

```svelte
<a href={lesson.slug} aria-current={...}
   class="block text-[15px] leading-snug py-1.5 hover:underline underline-offset-[6px]
          decoration-[1.5px] {active ? 'font-semibold text-ink underline' : 'text-ink-2'}">
  {lesson.title}
</a>
```

Active state: use `font-semibold` + underline on the current item (NN/g
"distinct styling of current section"). Drop the `text-muted` span entirely.

Width: keep the 220px column but reduce vertical density so the page reads as
4 small groups, not a 60-line list. `gap-y-1` between items, `mb-5` between
sections, `mb-6` before the first section after the "Documentation" header.

### 3. Article column width and whitespace (peak.json C8)

- Keep `lg:grid-cols-[220px_minmax(0,1fr)_200px]` so the right-rail TOC
  remains.
- Increase article max-width feel: cap the prose at `max-w-prose`
  (`~65ch`) so long lines don't run edge-to-edge of the grid.
- Add `lg:py-2` breathing room between sidebar and article on wide screens;
  the sticky top-20 behavior is already correct.

### 4. Cards and code blocks (peak.json C6)

`docs-prose :global(pre)` and `docs-prose :global(code)` already use
`var(--bone-200)` + radius 20px + no border. Confirm and align:

- Inline `code`: keep `var(--bone-200)` fill, `radius: 6px`, `padding:
  1px 6px` — already on-brand.
- Code blocks (`pre`): keep `radius: 20px` (close to peak.json's 24-32px
  range; 20 is fine for an inner code surface, not a module card).
- Tables: keep hairline `border-top: 1px solid var(--bone-200)` — peak.json
  forbids 1px borders on **cards**, not on table row separators. Leave as-is.

### 5. Overview page (docs/+page.svelte)

Already mostly compliant: cards use `rounded-[24px] bg-bone-100 p-6
hover:bg-bone-200`. Only changes:

- Verify H1 (`Read the spec behind Voyager.`) uses the new normalized scale.
- Remove the inline `eyebrow text-muted` "Documentation › Overview" crumb
  if `Breadcrumbs.svelte` is available, or simplify to a single
  `<p class="eyebrow text-muted">Overview</p>` (the sidebar already labels
  the section).
- Keep the three audience groups ("For travelers", "For the curious",
  "For the protocol-curious") — they exist *on* the overview page as
  content headers, not in the global nav, so they do not violate the
  usability rule against audience-based IA.

## Out of scope

- Rewriting any individual lesson page (`docs/<slug>/+page.svelte`). The
  simplified `docs-prose` cascade in `+layout.svelte` covers them.
- Restructuring the on-page audience cards in `/docs/+page.svelte` — they
  are content, not IA.
- Touching the global `tokens.css` or `layout.css` — current tokens already
  satisfy peak.json C1 + C7.
- Adding or removing nav entries (lesson count stays at 11).

## Validation

1. Run `cd voyager && npm run check` (or `pnpm check`) to confirm no
   Svelte/TS regressions in the docs layout.
2. Run `cd voyager && npm run lint` if a lint script exists.
3. Manual visual check at three viewport widths:
   - 1440px — verify the left nav reads as 4 grouped sections, not a flat
     11-item list.
   - 1024px — verify the right-rail TOC appears and the article column
     doesn't run edge-to-edge of the grid.
   - 390px — verify the nav collapses to a wrap-friendly row (existing
     `flex-row flex-wrap` at <md) and the prose stacks cleanly.
4. Cross-page check: navigate Overview → Lesson 1 → Lesson 4 → Inserted
   lesson and confirm typography is visually consistent (same H1 scale,
   same H2 scale, same body color, same link treatment).

## Open questions

None. User selected "By topic (3-4 sections)" and confirmed the typography
goals. No further design decisions required before implementation.
