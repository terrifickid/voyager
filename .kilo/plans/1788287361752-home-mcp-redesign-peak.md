# Plan — Redesign home MCP section against `peak.json`

## Goal

The current section 8b (`+page.svelte:287-360`) is an abstract SVG topology floating
on raw page bg with a centered paragraph. Against `peak.json` it scores poorly:

- **C6 (tonal cards, borderless)** — figure sits on raw `--bone-50` page bg; the
  surrounding sections are tonal cards, so this section reads as the *unboxed*
  one. Off-pattern.
- **C5 (product-as-imagery)** — pure schematic; no product surface shown.
- **C7 (no color noise)** — the SVG uses 4 pastel hues (sky/coral/rose/violet) on
  the four vendor-kind circles. That's 4 hues of value-bearing content in one
  small diagram, which reads as a rainbow legend rather than typography-driven
  hierarchy.
- **C8 (whitespace + gravitational anchor)** — the diagram is a single small
  float; nothing anchors the eye. The section feels empty even with the figure.

## Decisions (locked, from questions)

1. **Direction:** tonal card + terminal mock + diagram + 4 pastel icon tiles.
2. **CTA:** none. Blurb keeps its inline underline link to `/vendors#mcp`.
3. **CSS:** keep `.home-mcp-*` rules, adapt palette and figure width.
4. **Section header copy:** unchanged from current — `eyebrow="MCP"`,
   `title="List once, appear everywhere."`, lede unchanged.

## The redesign in one sentence

Wrap the whole section in a `--bone-100` tonal card. Inside the card, place a
two-column composition: left = a monospace terminal mock showing a single MCP
tool call (the product surface agents actually use), right = the existing
topology diagram re-tinted to ink + a single sky hub, re-cast from
"your listing fans out to four vendor kinds" to "one event fans out to every
agent host that connects." Below the columns, four small pastel icon tiles
label the surfaces (Claude Desktop / ChatGPT / IDE plugin / custom agent).
Blurb paragraph stays below the card, still centered, still with the
`voyager-mcp` inline link.

## Affected files

1. `voyager/src/routes/+page.svelte` only.
   - Section 8b (`+page.svelte:287-360`): replace the body inside the `<section>`
     with the new tonal-card composition.
   - `<style>` block (`+page.svelte:392-501`): adapt `.home-mcp-*` rules —
     see CSS changes below.

## Markup shape

```svelte
<!-- 8b. MCP — list once, appear everywhere -->
<section class="mx-auto max-w-6xl px-6 pb-24">
  <SectionHeader
    eyebrow="MCP"
    title="List once, appear everywhere."
    lede="A single signed event fans out to every vendor kind on Voyager Pay — and to every agent host that connects through voyager-mcp."
  />

  <!-- Tonal card (C6) -->
  <div class="home-mcp-card mt-12 rounded-[32px] bg-bone-100 p-8 sm:p-12">
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">

      <!-- Left: terminal mock (C5 product surface) -->
      <figure class="home-mcp-mock">
        <div class="home-mcp-mock__bar">
          <span class="home-mcp-mock__dot" style="--c:var(--pastel-coral)"></span>
          <span class="home-mcp-mock__dot" style="--c:var(--pastel-sky)"></span>
          <span class="home-mcp-mock__dot" style="--c:var(--pastel-rose)"></span>
          <span class="home-mcp-mock__title">mcp › claude desktop</span>
        </div>
        <pre class="home-mcp-mock__body" aria-hidden="true">
<span class="t-muted">$</span> mcp.call("voyager.search", {"near":"kyoto","when":"apr"})
<span class="t-ink">{</span>
  <span class="t-key">"kind"</span>: <span class="t-str">30402</span>,
  <span class="t-key">"matches"</span>: <span class="t-ink">[</span>
    <span class="t-str">"fushimi-inari · early entry · 90 min"</span>,
    <span class="t-str">"nishiki market · tasting loop"</span>,
    <span class="t-str">"kiyomizu-dera · sunset · 60 min"</span>
  <span class="t-ink">]</span>
<span class="t-ink">}</span>
        </pre>
        <figcaption class="mt-4 text-[13px] leading-snug text-muted">
          What an agent sees: a single signed event, indexed and queryable.
        </figcaption>
      </figure>

      <!-- Right: re-tinted diagram (single accent hub, ink edges) -->
      <figure class="home-mcp-figure">
        <svg class="home-mcp-svg" viewBox="0 0 520 360" width="100%"
             role="img" aria-labelledby="home-mcp-title home-mcp-desc">
          <title id="home-mcp-title">A single event fans out to every agent host</title>
          <desc id="home-mcp-desc">
            A listing node on the left feeds a voyager-mcp hub in the center,
            which radiates to four labelled agent surfaces: Claude Desktop,
            ChatGPT, an IDE plugin, and a custom agent.
          </desc>

          <!-- listing → voyager-mcp (solid) -->
          <line x1="60" y1="200" x2="246" y2="200" class="home-mcp-link home-mcp-link--solid"/>

          <!-- voyager-mcp → 4 hosts (dashed, animated) -->
          <line x1="274" y1="200" x2="466" y2="100" class="home-mcp-link"/>
          <line x1="274" y1="200" x2="466" y2="300" class="home-mcp-link"/>
          <line x1="274" y1="200" x2="60"  y2="300" class="home-mcp-link"/>
          <line x1="274" y1="200" x2="60"  y2="100" class="home-mcp-link"/>

          <!-- listing node (ink) -->
          <g>
            <circle cx="60" cy="200" r="10" fill="var(--ink)"/>
            <text x="60" y="232" class="home-mcp-label" text-anchor="middle">your listing</text>
            <text x="60" y="170" class="home-mcp-sublabel" text-anchor="middle">kind:30402</text>
          </g>

          <!-- voyager-mcp hub (sky only — single accent) -->
          <g>
            <circle cx="260" cy="200" r="20" fill="none" stroke="var(--ink)" stroke-width="1" opacity="0.25"/>
            <circle cx="260" cy="200" r="14" fill="var(--pastel-sky)" stroke="var(--ink)" stroke-width="1.5"/>
            <text x="260" y="238" class="home-mcp-label" text-anchor="middle">voyager-mcp</text>
            <text x="260" y="170" class="home-mcp-sublabel" text-anchor="middle">read lens</text>
          </g>

          <!-- 4 hosts: ink-filled, no pastel circles (C7) -->
          <g class="home-mcp-node" style="animation-delay:0s">
            <circle cx="470" cy="100" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
            <text x="470" y="82"  class="home-mcp-label" text-anchor="middle">Claude Desktop</text>
          </g>
          <g class="home-mcp-node" style="animation-delay:.6s">
            <circle cx="470" cy="300" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
            <text x="470" y="322" class="home-mcp-label" text-anchor="middle">ChatGPT</text>
          </g>
          <g class="home-mcp-node" style="animation-delay:1.2s">
            <circle cx="60"  cy="300" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
            <text x="60"  y="282" class="home-mcp-label" text-anchor="middle">IDE plugin</text>
          </g>
          <g class="home-mcp-node" style="animation-delay:1.8s">
            <circle cx="60"  cy="100" r="10" fill="var(--bone-50)" stroke="var(--ink)" stroke-width="1.5"/>
            <text x="60"  y="82"  class="home-mcp-label" text-anchor="middle">custom agent</text>
          </g>
        </svg>
        <figcaption class="mt-4 text-[13px] leading-snug text-muted lg:text-left text-center">
          One event. Four agent surfaces. Every new MCP host inherits it.
        </figcaption>
      </figure>
    </div>

    <!-- C9 pastel icon taxonomy: 4 surfaces named below -->
    <ul class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <li class="home-mcp-tile">
        <Icon name="chat" tone="violet" size={28}/>
        <span class="eyebrow">Claude Desktop</span>
      </li>
      <li class="home-mcp-tile">
        <Icon name="sparkle" tone="coral" size={28}/>
        <span class="eyebrow">ChatGPT</span>
      </li>
      <li class="home-mcp-tile">
        <Icon name="bolt" tone="sky" size={28}/>
        <span class="eyebrow">IDE plugin</span>
      </li>
      <li class="home-mcp-tile">
        <Icon name="globe" tone="rose" size={28}/>
        <span class="eyebrow">custom agent</span>
      </li>
    </ul>
  </div>

  <!-- Blurb stays below the card, centered (unchanged) -->
  <p class="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-ink-2 text-center">
    Publish a single kind:30402 and it fans out to every vendor kind on
    Voyager Pay. The same listing also reaches agent hosts through
    <a href="/vendors#mcp" class="underline underline-offset-2 decoration-[1.5px] font-semibold text-ink">voyager-mcp</a>
    — so any AI surface that connects sees it too.
  </p>
</section>
```

## CSS changes (only `+page.svelte` `<style>` block)

Keep `.home-mcp-figure`, `.home-mcp-svg`, `.home-mcp-label`,
`.home-mcp-sublabel`, `.home-mcp-link`, `.home-mcp-link--solid`,
`.home-mcp-node`, keyframes, and reduced-motion rules as-is. Add:

```css
.home-mcp-card {
  /* tonal-step card; matches the section-7/9 bone-100 pattern (C6) */
}

.home-mcp-mock {
  border-radius: 24px;
  background: var(--bone-200);
  padding: 0;
  overflow: hidden;
  border: 0;
  box-shadow: none;
}
.home-mcp-mock__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 0;
  background: var(--bone-300);
}
.home-mcp-mock__dot {
  width: 10px; height: 10px; border-radius: 999px;
  background: var(--c, var(--ink));
  display: inline-block;
}
.home-mcp-mock__title {
  margin-left: 8px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 12px;
  color: var(--ink-2);
}
.home-mcp-mock__body {
  margin: 0;
  padding: 18px 20px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 13px;
  line-height: 1.55;
  color: var(--ink);
  white-space: pre;
  overflow-x: auto;
  background: var(--bone-50);
}
.home-mcp-mock__body .t-muted { color: var(--muted); }
.home-mcp-mock__body .t-ink   { color: var(--ink); }
.home-mcp-mock__body .t-key   { color: var(--ink-2); }
.home-mcp-mock__body .t-str   { color: var(--ink-2); }

.home-mcp-tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 18px;
  border-radius: 24px;
  background: var(--bone-200);
}
```

The `.home-mcp-figure` desktop-margin override (`margin-left: 0` at ≥1024px)
stays — inside the card the figure still aligns to its grid column on
desktop and centers on mobile.

## Rubric check

- **C1 (warm neutral ground):** the card is `--bone-100` (a tonal step inside
  the warm bone ramp); terminal is `--bone-50` inside `--bone-200`; no white,
  no cool gray.
- **C2 (acid accent discipline):** no lime introduced in the new section.
  Pastels stay on the four icon tiles only — same scope as the rest of the
  page (C9).
- **C3 (monumental sans):** section title uses the existing `SectionHeader`
  H2 (64px grotesque). Unchanged.
- **C4 (CTA grammar):** no CTA in this section (lime discipline carried
  forward).
- **C5 (product-as-imagery):** terminal mock *is* a product surface — what
  an agent host actually sees when it calls voyager-mcp. The diagram is
  demoted from hero-of-the-section to a sibling of the terminal, no
  longer carrying the visual load alone.
- **C6 (tonal card elevation):** the section body now sits inside a
  `rounded-[32px] bg-bone-100` card matching section 7's Voyager Pay band
  and section 9's doc band. Border 0, shadow none.
- **C7 (no color noise):** diagram recolored to ink + a single sky hub.
  Removed the rainbow palette from the four host circles; they are now
  bone-filled, ink-outlined, with text labels doing the categorizing work.
  Type stays near-black + mid-gray throughout.
- **C8 (whitespace + anchor):** the terminal + diagram fill the card with
  content; the icon tile row grounds the bottom edge. No floating-empty
  feeling.
- **C9 (pastel icon taxonomy):** the four icon tiles use distinct pastels
  (violet / coral / sky / rose), one per category, no chip backgrounds.

## Out of scope

- Changes to `/vendors` §mcp. That page already shows the agent-host
  topology in a richer form; the home page now previews it with a
  terminal-first composition. The two pages deliberately tell the story
  at different depth.
- New SVG component file. Reuse `Icon.svelte` for the tile icons.
- Changes to MCP.md.

## Validation

- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev -- --port 5179` → `GET /` returns 200.
- Greps on rendered HTML:
  - H1 still unique (`Plan it.`).
  - 4 FeatureCard eyebrows each appear once.
  - `voyager-mcp` appears ≥ 1 (now in diagram + blurb + tile-label area).
  - `kind:30402` appears ≥ 1 (in diagram + terminal mock).
  - Denylist absent: no `Dispersion`, `Information`, `3/3`, `knob`.
  - New check: terminal mock text fragment `mcp.call` appears exactly once
    in rendered HTML.
  - New check: 4 new tile labels appear once each: `Claude Desktop`,
    `ChatGPT`, `IDE plugin`, `custom agent`.
- `/vendors` still renders identically (no leakage of `home-mcp-mock`
  classes).
- Visual smoke at 1280px: terminal and diagram sit side by side inside the
  bone-100 card; tile row anchors the bottom of the card; blurb sits
  centered below the card.

## Risks

- **Terminal mock adds ~25 lines of CSS and a fixed `<pre>` block.** If the
  inner text wraps awkwardly on narrow mobile, wrap the `<pre>` in a
  horizontally-scrollable container (already in CSS via `overflow-x: auto`).
- **Icon reuse:** `Icon.svelte` already has `chat`, `sparkle`, `bolt`,
  `globe`. All four tile icons are pre-existing — no new glyph needed.
- **Section now visually heavier.** The card+terminal+diagram+tiles is more
  dense than the current single-diagram section. This is the intended
  shift — the prior section read as empty-float, which the user flagged.
  No change to surrounding section 8 or section 9.
