# Plan — Animated diagram + MCP blurb on home page "Built for any marketplace"

## Goal

Add a small, animated, schematic SVG to the home page's "Built for any
marketplace" section that visualizes **one signed event fanning out to
multiple vendor-kind families**, paired with a one-sentence blurb that
introduces `voyager-mcp` and points to `/vendors` for the full
agent-host story.

The animation is the same kind of artifact as `/vendors` §mcp (network
topology, CSS keyframes, pastel flat, scoped `<style>`), but the
topology is re-targeted: 4 outer nodes are the vendor-kind families
already shown as `FeatureCard`s, not agent hosts.

## Decisions (locked)

- **Diagram topic:** 4 vendor-kind families — `physical goods`,
  `stays`, `experiences`, `services & digital`. These are literally
  the four `FeatureCard`s already in this section. The blurb then
  bridges to agents via `voyager-mcp`.
- **Placement:** Above the 4-card grid. Section becomes: SectionHeader
  → 2-col grid (text+blurb left, animated SVG right) → 4-card grid →
  centered CTA. Mobile: stacks (SVG below text).
- **Animation:** Soft node pulse (opacity loop, staggered) + dashed
  line travel outward from a center hub. Same `prefers-reduced-motion`
  handling used on `/vendors` §mcp.
- **Topology:** Center vendor node (`your listing`, ink) →
  `kind:30402` hub (sky, slightly larger, with subtle outer ring) →
  4 vendor-kind families arranged at compass positions, each in its
  card's existing pastel tone:
  - `physical goods` (sky, NE)
  - `stays` (coral, SE)
  - `experiences` (rose, SW)
  - `services & digital` (violet, NW)
- **Blurb:** One sentence below the SVG's right column OR beside the
  text — single sentence mentioning `voyager-mcp` and `kind:30402`
  with a link to `/vendors#mcp` for the full agent-host topology.
- **Color use:** Existing pastel tokens
  (`--pastel-violet/coral/sky/rose`) and `--ink`. No new tokens. Lime
  stays reserved for CTAs (peak.json C2).
- **No new component file.** Inline SVG + scoped `<style>` inside the
  section, identical pattern to `/vendors` §mcp.

## Affected files

1. `voyager/src/routes/+page.svelte` — restructure the
   `<!-- 8. Built for any marketplace -->` section (currently lines
   246–285) into: SectionHeader → 2-col grid → 4-card grid → CTA.
   Append a new scoped `<style>` block to the existing `<style>`
   block at file end (don't overwrite the marquee rules).
   All other sections must stay byte-identical.

That's it. One file.

## Rubric check

- **C5 (product-as-imagery):** Same defense as `/vendors` §mcp —
  schematic topology, not illustration. Mirrors what `MCP.md` §2 does
  in ASCII.
- **C6 (borderless tonal cards):** Diagram lives inside the same
  white page; no new card around it.
- **C7 (no color-noise type):** Node labels in `--ink`. Blurb in
  `text-ink-2`.
- **C9 (no decorative illustration):** Flat pastel nodes + ink
  strokes. No gradient. No 3D. Each node's tone matches the
  corresponding card's `tone=` prop so the visual grammar stays
  consistent.
- **C2 (lime discipline):** Diagram uses sky/violet/coral/rose +
  ink. Lime stays on the CTA.

## Implementation outline

### 1. Section restructure (lines 246–285)

Replace the current section body:

```svelte
<!-- 8. Built for any marketplace -->
<section class="mx-auto max-w-6xl px-6 pb-24">
  <SectionHeader
    eyebrow="Built for any marketplace"
    title="Voyager Pay sells anything."
    lede="One protocol. Any vendor kind. Physical goods, stays, experiences, services, digital goods — and whatever comes next."
  />
  <div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
    <!-- 4 FeatureCards -->
  </div>
  <div class="mt-10 flex justify-center">
    <Cta variant="primary" href="/docs/how-voyager-pay-extends">See how a new vendor kind ships</Cta>
  </div>
</section>
```

With:

```svelte
<!-- 8. Built for any marketplace -->
<section class="mx-auto max-w-6xl px-6 pb-24">
  <SectionHeader
    eyebrow="Built for any marketplace"
    title="Voyager Pay sells anything."
    lede="One protocol. Any vendor kind. Physical goods, stays, experiences, services, digital goods — and whatever comes next."
  />
  <div class="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
    <div class="flex flex-col gap-4">
      <span class="eyebrow">One event, four surfaces</span>
      <p class="text-lg leading-relaxed text-ink-2">
        Publish a single kind:30402 and it fans out to every vendor kind on
        Voyager Pay. The same listing also reaches agent hosts through
        <a href="/vendors#mcp" class="underline underline-offset-2 decoration-[1.5px] font-semibold text-ink">voyager-mcp</a>
        — so any AI surface that connects sees it too.
      </p>
    </div>
    <figure class="home-mcp-figure">
      <svg ... >...</svg>
      <figcaption class="mt-4 text-[13px] leading-snug text-muted lg:text-left text-center">
        A single signed event, four vendor surfaces, every agent host that connects.
      </figcaption>
    </figure>
  </div>
  <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
    <!-- 4 FeatureCards (unchanged) -->
  </div>
  <div class="mt-10 flex justify-center">
    <Cta variant="primary" href="/docs/how-voyager-pay-extends">See how a new vendor kind ships</Cta>
  </div>
</section>
```

Notes:
- `text-muted` is the existing utility (confirmed on `/pay/+page.svelte`
  line 214).
- The `mt-16` between the diagram row and the card grid gives the
  diagram room to breathe — the diagram should feel like the lede to
  the cards, not crammed against them.

### 2. Inline SVG diagram

Inside the `<figure>`. Geometry (viewBox `0 0 520 360`):

| # | Label                | Tone            | Position            |
|---|----------------------|-----------------|---------------------|
| 1 | `your listing`       | `--ink`         | (60, 200) left      |
| 2 | `kind:30402`         | `--pastel-sky`  | (260, 200) center, r=14, with thin outer ring |
| 3 | `physical goods`     | `--pastel-sky`  | (470, 100) upper-right |
| 4 | `stays`              | `--pastel-coral`| (470, 300) lower-right |
| 5 | `experiences`        | `--pastel-rose` | (60, 300) lower-left  |
| 6 | `services & digital` | `--pastel-violet`| (60, 100) upper-left |

Solid ink line from `your listing` → `kind:30402`. Four dashed
animated lines from `kind:30402` hub outward to each family node.

Per-node label placement: above/below the circle as appropriate to
avoid overlap with edges.

`<title>` + `<desc>` on the SVG with `role="img"` (same a11y pattern
as `/vendors` §mcp).

### 3. Scoped styles

Append to the existing `<style>` block at the end of `+page.svelte`:

```css
.home-mcp-figure {
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 1024px) {
  .home-mcp-figure {
    margin-left: 0;
    margin-right: 0;
  }
}
.home-mcp-svg { display: block; overflow: visible; }
.home-mcp-label {
  font-family: var(--font-sans, system-ui, sans-serif);
  font-size: 13px; font-weight: 500; fill: var(--ink);
}
.home-mcp-sublabel {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px; fill: var(--ink); opacity: 0.7;
}
.home-mcp-link {
  stroke: var(--ink); stroke-width: 1.5;
  stroke-dasharray: 6 6;
  animation: home-mcp-travel 1.6s linear infinite;
}
.home-mcp-link--solid { stroke-dasharray: 0; animation: none; }
.home-mcp-node { animation: home-mcp-pulse 2.4s ease-in-out infinite; }
.home-mcp-node:nth-of-type(2) { animation-delay: 0.6s; }
.home-mcp-node:nth-of-type(3) { animation-delay: 1.2s; }
.home-mcp-node:nth-of-type(4) { animation-delay: 1.8s; }
@keyframes home-mcp-travel { to { stroke-dashoffset: -24; } }
@keyframes home-mcp-pulse { 50% { opacity: 0.65; } }
@media (prefers-reduced-motion: reduce) {
  .home-mcp-link { animation: none; }
  .home-mcp-node { animation: none; }
}
```

Names are `home-mcp-*` (not `mcp-*`) so they don't collide with the
existing `/vendors` page's `mcp-*` class names if both SVGs ever get
rendered on the same page (they won't, but defense in depth).

### 4. Tone-consistency with FeatureCards

The 4 family nodes use the exact `tone` prop each card already uses:

| Card eyebrow            | Card tone | Node tone       |
|-------------------------|-----------|-----------------|
| `voyager.listing.v1`    | sky       | `--pastel-sky`  |
| `voyager.accommodation.v1` | coral  | `--pastel-coral`|
| `voyager.tour.v1`       | rose      | `--pastel-rose` |
| `voyager.consulting.v1` | violet    | `--pastel-violet`|

This makes the diagram read as a key to the cards — same color →
same vendor kind.

## Validation

- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev -- --port 5179`, probe `/` → 200.
- Rendered HTML grep checks (home page):
  - H1 uniqueness preserved (`Plan it. Pay it. Take the trip.`).
  - All 4 `FeatureCard` `eyebrow` codes (`voyager.listing.v1`,
    `voyager.accommodation.v1`, `voyager.tour.v1`,
    `voyager.consulting.v1`) still appear once each.
  - `voyager-mcp` appears ≥ 1 time (the new blurb).
  - `kind:30402` appears ≥ 1 time (the new blurb — and the marquee
    items already use no `kind:` references, so this is new to
    the home page).
  - Audit denylist still absent: no `Dispersion`, `Information`,
    `Coupling`, `3/3`, `knob` introduced.
  - `text-muted` class still defined in Tailwind (it's already
    used on `/pay`).
- Visual smoke at 1280px: diagram renders right of the blurb, four
  outer nodes pulse, dashed lines travel outward, layout stacks
  cleanly under 1024px.
- `/vendors` still renders identically (no leakage of `home-mcp-*`
  classes to that page).

## Risks

- **Diagram reads as illustration (C9).** Mitigation: same defense
  as `/vendors` §mcp — it's a labeled topology, not art.
- **Color hue matches create double-encoding confusion.** If a user
  expects the diagram's `physical goods` node to be the same color as
  its card's icon and they aren't, the visual key breaks. Mitigation:
  the tones are verified identical to the card `tone=` props before
  committing.
- **Section grows from ~40 lines to ~90 lines.** Acceptable; this
  section is currently the leanest on the page and the diagram +
  blurb carry real explanatory weight.
- **`home-mcp-*` class names collide if both pages are ever inlined
  in the same render.** Mitigation: the prefix already prevents
  collision; verified by reading `/vendors` (uses `mcp-*`, no
  `home-` prefix).

## Out of scope

- New SVG component file. Inline like `/vendors`.
- Animation library. Pure CSS keyframes (same as `/vendors` §mcp).
- Real-time relay ticker. Static schematic with motion.
- Changes to `/vendors`. Only `/` is touched.
- Changes to MCP.md content.

## Order of operations

1. Read `voyager/src/routes/+page.svelte` lines 245–285 (the section)
   and lines 317–368 (existing `<style>`).
2. One `Edit` operation: replace the section body with the
   restructured 2-col grid + SVG + caption + blurb. The 4
   `FeatureCard` blocks and the centered CTA stay byte-identical.
3. Second `Edit` operation: append `home-mcp-*` CSS rules to the
   existing `<style>` block (do not overwrite marquee rules).
4. Run `npm run build`.
5. Run `npm run dev -- --port 5179`, probe `/`, run greps.
6. Stop dev server.
7. Visual smoke at desktop width.