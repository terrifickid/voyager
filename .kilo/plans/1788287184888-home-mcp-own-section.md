# Plan — Move home-page MCP diagram into its own section

## Goal

The diagram + blurb currently sit inside section 8 ("Built for any marketplace")
as a 2-col grid above the four `FeatureCard`s. The user finds this visually
cramped and wants it promoted to its own top-level `<section>`, placed
**directly under** section 8 (before the "Documentation band" closer).

The four `FeatureCard`s + centered CTA in section 8 stay byte-identical.
Section 8's `SectionHeader` + 2-col diagram block are extracted and become
the body of a new section with a real `SectionHeader`.

## Decisions (locked)

- **New section placement:** inserted between current section 8 (line ~285
  close tag) and section 9 ("Documentation band", line ~287 comment).
- **New section structure:** `SectionHeader` → figure (animated SVG) →
  small blurb paragraph. Same single-sentence blurb already written,
  with the `voyager-mcp` link. No 2-col grid — the section header carries
  the lede.
- **SectionHeader copy:**
  - `eyebrow="MCP"`
  - `title="List once, appear everywhere."`
  - `lede="A single signed event fans out to every vendor kind on Voyager Pay — and to every agent host that connects through voyager-mcp."`
- **Container:** same `mx-auto max-w-6xl px-6 pb-24` wrapper as adjacent
  sections.
- **Figure + SVG:** unchanged from the current implementation. The
  figure stays centered via `.home-mcp-figure { margin-inline: auto }`.
- **Blurb:** keep the existing one-sentence blurb. Place it as a
  centered `<p class="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-ink-2 text-center">`
  below the figure.
- **Scoped styles:** unchanged. The `home-mcp-*` CSS block stays where it
  is.
- **No new component file. No new tokens.**

## Affected files

1. `voyager/src/routes/+page.svelte` only.
   - Remove the 2-col grid (`mt-12 grid ...` block, lines 252–328 in the
     current file) from section 8.
   - Section 8 collapses back to: `SectionHeader` → 4-card grid → CTA,
     all byte-identical to the original plan target (the
     `mt-16`/diagram-row space disappears; `mt-12` between header and
     cards is restored).
   - Insert new `<section>` between section 8 and the current "9.
   Documentation band" section, with: `SectionHeader` → `<figure>`
     (existing inline SVG verbatim) → `<figcaption>` (existing) →
     centered blurb `<p>`.
   - Scoped `<style>` block: no changes needed (already in place).

## Rubric check

- **C5 (product-as-imagery):** unchanged — schematic topology.
- **C6 (borderless tonal cards):** unchanged — no new card chrome; the
  figure sits on the white page.
- **C7 (no color-noise type):** section title in `--ink`, blurb in
  `text-ink-2`. Diagram labels in `--ink`. Eyebrow uses the existing
  `.eyebrow` utility (matches all other section eyebrows on the page).
- **C9 (no decorative illustration):** unchanged — flat pastel + ink
  strokes, labeled nodes.
- **C2 (lime discipline):** unchanged — diagram uses sky/coral/rose/
  violet + ink. Section has no CTA of its own.

## Implementation outline

### 1. Edit `voyager/src/routes/+page.svelte`

a. In section 8, replace this current body (after `SectionHeader`):

```svelte
<div class="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
  <div class="flex flex-col gap-4">
    <span class="eyebrow">One event, four surfaces</span>
    <p ...>...blurb with voyager-mcp link...</p>
  </div>
  <figure class="home-mcp-figure">...SVG + figcaption...</figure>
</div>
```

with:

```svelte
<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
  <!-- 4 FeatureCards (unchanged) -->
</div>
```

(The original 4-card grid wrapper with `mt-12`. The
`mt-16`/intermediate diagram spacing goes away.)

b. Insert a new section between the section 8 close tag and the
"Documentation band" comment:

```svelte
<!-- 8b. MCP — list once, appear everywhere -->
<section class="mx-auto max-w-6xl px-6 pb-24">
  <SectionHeader
    eyebrow="MCP"
    title="List once, appear everywhere."
    lede="A single signed event fans out to every vendor kind on Voyager Pay — and to every agent host that connects through voyager-mcp."
  />
  <figure class="home-mcp-figure mt-12">
    <svg ... >... (exact SVG body from current file, lines 263–349,
                  unchanged) ...</svg>
    <figcaption class="mt-4 text-[13px] leading-snug text-muted lg:text-left text-center">
      A single signed event, four vendor surfaces, every agent host that connects.
    </figcaption>
  </figure>
  <p class="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-ink-2 text-center">
    Publish a single kind:30402 and it fans out to every vendor kind on
    Voyager Pay. The same listing also reaches agent hosts through
    <a href="/vendors#mcp" class="underline underline-offset-2 decoration-[1.5px] font-semibold text-ink">voyager-mcp</a>
    — so any AI surface that connects sees it too.
  </p>
</section>
```

c. No changes to the `<style>` block.

## Validation

- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev -- --port 5179`, probe `/` → 200.
- Rendered HTML grep checks (home page):
  - H1 still unique (`Plan it. Pay it. Take the trip.`).
  - All 4 `FeatureCard` `eyebrow` codes still appear once each.
  - `voyager-mcp` appears ≥ 1 time (blurb link).
  - `kind:30402` appears ≥ 1 time (blurb + hub label + figcaption).
  - Denylist still absent: no `Dispersion`, `Information`, `Coupling`,
    `3/3`, `knob`.
- Visual smoke at 1280px: new MCP section sits cleanly under the
  marketplace section, with the Documentation band as closer. Diagram
  centered, blurb centered below it. Mobile: stacks, SVG remains
  readable.
- `/vendors` still renders identically (no leakage of `home-mcp-*`
  classes).

## Risks

- **Section count grows by one.** The page already has 10 sections; one
  more is fine — section 8 is the longest and the new section gives the
  diagram room without competing with the cards.
- **Eyebrow / title redundancy with `/vendors` §mcp.** Both sections
  will use `eyebrow="MCP"` + `title="List once, appear everywhere."` —
  this is intentional cross-page continuity. Not a problem.

## Out of scope

- Changes to `/vendors`. Only `/` is touched.
- Changes to MCP.md content.
- New SVG component file.