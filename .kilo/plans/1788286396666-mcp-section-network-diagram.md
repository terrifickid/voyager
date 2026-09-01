# Plan — Add animated network diagram to `/vendors` MCP section

## Goal

Add a high-tech, "AI-pop" visual to the `#mcp` section of `/vendors` that
literalizes the **list once, appear everywhere** story: a single
kind:30402 listing radiating through `voyager-mcp` to four agent hosts.

The diagram must lift the section's perceived energy without breaking
the existing peak.json rubric — in particular C5 (no illustration/3D art),
C6 (borderless tonal cards, no shadow), C7 (no color-noise type), C9
(pastel flat icons, no decorative illustration), and C2 (lime reserved
for CTAs).

## Decisions (locked)

- **Visual approach:** Animated inline SVG network diagram (option 1).
- **Placement:** Top of the section, beside the SectionHeader, on a
  2-column grid (text left, SVG right). Mobile: stacks — SVG below text.
- **Animation:** Soft node pulse (opacity loop) + dashed-line travel
  outward from `voyager-mcp` to each agent host. CSS-driven
  (`prefers-reduced-motion: reduce` honored — animation pauses to a
  static frame).
- **Topology:** 3 stages. Center vendor node → `voyager-mcp` → 4 agent
  hosts arranged in an arc (Claude Desktop, ChatGPT, IDE plugin, custom
  agent).
- **Color use:** Strokes/fills use the existing pastel tokens
  (`--pastel-violet`, `--pastel-coral`, `--pastel-sky`, `--pastel-rose`)
  already defined in the theme. Node labels use `--ink` (near-black).
  Lime accent is **not** used in the diagram (C2 reserves lime for CTAs).
  Diagram sits on the existing `bg-bone-100` section surface — no new
  colors introduced.

## Constraint check (rubric)

- **C5 (product-as-imagery):** The diagram is a **schematic**, not
  illustration. peak.json C5 talks about hero photography of hardware; a
  network topology diagram is the kind of "real product-as-imagery"
  analog Voyager already uses on the `/pay` ramp section (`RampQuoteAggregator`)
  and is consistent with MCP.md §2's ASCII architecture diagram.
- **C6 (tonal cards, borderless):** The diagram renders inside the
  existing `bg-bone-100` rounded-[32px] section card. No border, no shadow.
- **C7 (no color in type):** Node labels are `--ink` near-black. Body
  copy below remains mid-gray.
- **C9 (pastel icons, flat):** Diagram strokes/fills are pastel flat,
  no gradients, no lime. Each agent-host node gets a distinct pastel
  hue (sky/violet/coral/rose) — taxonomy consistent with `Icon.svelte`.
- **C2 (lime discipline):** Lime stays on CTAs only.
- **C4 (CTA grammar):** Untouched — diagram is decorative; section CTAs
  remain `Cta.svelte` instances.
- **C8 (whitespace):** Diagram replaces the section's top padding budget
  with intentional whitespace; the diagram's max-width is bounded so it
  doesn't overpower the H2.

## Affected files

1. `voyager/src/routes/vendors/+page.svelte` — restructure the `#mcp`
   section to a 2-col grid and insert the SVG. Replace the prose
   paragraph that begins "The MCP server holds no keys…" with a tighter
   caption beneath the diagram. Net delta target: +30–50 lines (section
   grows from ~30 lines to ~60–80). Other sections untouched.

That's it. One file. The MCP.md reference, the bone-200 "How it works"
card, and the secondary CTA below it all stay.

## Implementation outline

### 1. Restructure the `#mcp` section

Replace the current layout:

```
<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
  <SectionHeader ... />
  <div class="mt-10 flex flex-col gap-6 text-lg ...">  (3 prose <p>)
  <div class="mt-10 rounded-[28px] bg-bone-200 p-6">   ("How it works" card)
  <div class="mt-8">                                   (secondary CTA)
</div>
```

With:

```
<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
    <SectionHeader ... />                              (text col)
    <McpNetworkDiagram />                              (SVG col)
  </div>
  <p class="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2">
    (compressed prose — drops the 3-paragraph block to one tight lede)
  </p>
  <div class="mt-10 rounded-[28px] bg-bone-200 p-6">   ("How it works" card — unchanged)
  <div class="mt-8">                                   (secondary CTA — unchanged)
</div>
```

The 3-prose block becomes a single tight sentence ("Publish once. voyager-mcp
indexes it; four agent hosts — and any new one that connects — see it
immediately.") so the diagram carries the explanatory weight.

### 2. SVG diagram (inline in `+page.svelte`, no new component file)

A new `<svg viewBox="0 0 520 360">` with `role="img"` + descriptive
`<title>`/`<desc>` for a11y.

**Layout (logical):**

```
                ┌─ Claude Desktop ─┐
                │                  │
   ┌─ vendor ─┐ │  ┌─ voyager-mcp ┐ │ ┌─ ChatGPT ─┐
   │ kind:    │─┼─▶│ (read lens)   │─┼─▶│           │
   │ 30402    │ │  └──────────────┘ │ └───────────┘
   └──────────┘ │                  │
                ├─ IDE plugin ─────┤
                │                  │
                └─ custom agent ───┘
```

Concretely, 6 nodes:

| # | Label              | Pastel tone | Position (viewBox 520×360) |
|---|--------------------|-------------|---------------------------|
| 1 | `your listing`     | `--ink`     | left, x≈40 y≈180          |
| 2 | `voyager-mcp`      | `--ink`     | center, x≈260 y≈180       |
| 3 | `Claude Desktop`   | sky         | x≈460 y≈60                |
| 4 | `ChatGPT`          | violet      | x≈490 y≈180               |
| 5 | `IDE plugin`       | coral       | x≈460 y≈300               |
| 6 | `custom agent`     | rose        | x≈260 y≈40 (top-arc)      |

Wait — that's 5 outer. Re-read: "Center vendor → MCP server → 4 agent
hosts". 4 agent hosts it is. Drop one:

| # | Label              | Tone        | Position                  |
|---|--------------------|-------------|---------------------------|
| 1 | `your listing`     | `--ink`     | x≈60 y≈180                |
| 2 | `voyager-mcp`      | `--ink`     | x≈260 y≈180               |
| 3 | `Claude Desktop`   | sky         | x≈470 y≈80                |
| 4 | `ChatGPT`          | violet      | x≈490 y≈220               |
| 5 | `IDE plugin`       | coral       | x≈470 y≈300 (omit if cramped)|
| 6 | `custom agent`     | rose        | x≈260 y≈60                |

Actually with 4 outer nodes: place 2 on right (sky upper, coral lower),
2 on top-right and bottom-right edges of an arc, OR mirror: 2 right, 1
top, 1 bottom for visual rhythm. I'll specify the latter:

| # | Label              | Tone        | Position                  |
|---|--------------------|-------------|---------------------------|
| 1 | `your listing`     | `--ink`     | (60, 200)  — left         |
| 2 | `voyager-mcp`      | `--ink`     | (260, 200) — center        |
| 3 | `Claude Desktop`   | sky         | (470, 100) — upper right  |
| 4 | `ChatGPT`          | violet      | (470, 300) — lower right  |
| 5 | `IDE plugin`       | coral       | (260, 60)  — top          |
| 6 | `custom agent`     | rose        | (260, 340) — bottom       |

This places voyager-mcp at the geometric center with 4 agent hosts
radiating at NSEW-ish angles from the right half of the canvas, and the
vendor node on the far left feeding into MCP. Reads naturally left-to-
right (vendor → MCP → agent swarm).

**Geometry:**

- Each node = `<circle r="10">` filled with the tone, stroked with
  `--ink` at 1.5px, plus a 12px label to the right (or above for the
  center vendor and below for MCP).
- `voyager-mcp` node is slightly larger (`r="14"`) to signal it's the
  hub.
- Lines: `<line>` from `your listing` to `voyager-mcp` (1.5px solid
  `--ink`), then `<line>` from `voyager-mcp` to each of the 4 agent
  hosts (`stroke-dasharray="6 6"` for the dashed travel effect).
- Animated dash travel via CSS:
  ```css
  @keyframes mcp-travel { to { stroke-dashoffset: -24; } }
  .mcp-link { stroke-dasharray: 6 6; animation: mcp-travel 1.2s linear infinite; }
  @media (prefers-reduced-motion: reduce) {
    .mcp-link { animation: none; }
    .mcp-node { animation: none; }
  }
  ```
- Node pulse: `@keyframes mcp-pulse { 50% { opacity: .65; } }` on the
  outer agent-host nodes (slow, 2.4s cycle, staggered with
  `animation-delay`).

**Dimensions:** SVG is `viewBox="0 0 520 360"` and renders inside a
`max-w-md mx-auto` wrapper. At desktop, the grid is
`lg:grid-cols-[1fr_1.1fr]` so the diagram gets a touch more horizontal
real estate than the text column.

### 3. Caption beneath diagram

Add a small caption directly under the SVG inside the right column:

```html
<p class="mt-4 text-[13px] text-muted text-center lg:text-left">
  One signed event. Four agent surfaces. Every new MCP host inherits it.
</p>
```

`text-muted` is already in use on `/pay` (`text-muted` class — confirmed
on line 214 of `/pay/+page.svelte`). Mid-gray value, no color noise.

### 4. Validation: pre/post diff sanity

- `wc -l` of `+page.svelte` will go from 282 → ~315–325 lines. **Above
  the original 220–280 target.** Acceptable: the prior target was set
  before the visual was in scope. Document this in the PR description.
- **File diff is contained to one section** (`#mcp` only). Other
  sections unchanged byte-for-byte.
- **Header.svelte diff stays at 1 line added.** (The earlier plan's
  Header change is already shipped; do not re-touch.)
- **`kind:30402` and `voyager-mcp` still appear ≥ once** — both remain
  in the compressed prose and in the `MCP.md` reference paragraph.
- **Rendered HTML still passes the audit denylist** — no new
  `Dispersion` / `Information` / `Coupling` / `3/3` / `knob` introduced.

## Risks

- **Visual reads as "illustration" to a strict rubric grader.** Mitigation:
  the SVG is a topology diagram (nodes + labeled edges), the same kind
  of artifact MCP.md §2 already uses in ASCII. If the grader still
  objects, fall back to option 2 (live relay ticker strip) — a 6-line
  edit, no SVG.
- **Animation distracts.** Mitigation: `prefers-reduced-motion`
  respected; pulse opacity floor is 0.65 (not full blink); cycle is
  2.4s (slow).
- **SVG `<title>`/`<desc>` make a11y trees noisy.** Mitigation: use
  `role="img"` with `<title>` and a single `<desc>`; suppress redundant
  per-node text (labels are visible, not announced).
- **Mobile layout breaks.** Mitigation: grid stacks at `<lg`; SVG is
  bounded by `max-w-md mx-auto` and the `viewBox` aspect is 520:360
  (~1.44:1) which fits a phone width comfortably.

## Out of scope

- New SVG component file. Diagram is inline in `+page.svelte`. If
  reused later, lift to `src/lib/components/McpNetworkDiagram.svelte`.
- Animation library (framer-motion, GSAP). Pure CSS keyframes.
- Real-time data (no live relay events). The diagram is a static
  schematic with motion.
- Color/visual changes to the rest of the vendors page. Only `#mcp`
  is touched.

## Validation

- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev -- --port 5179`, probe `/vendors` → 200.
- Rendered HTML grep checks (existing + new):
  - `Open protocol. Federated. Uncensorable.` still appears once.
  - `kind:30402` and `voyager-mcp` still each appear ≥ once.
  - TOC entries unchanged.
  - Header still contains `For vendors` and `href="/vendors"`.
- Audit page denylist still holds; vendors page still introduces none of
  the forbidden terms.
- Visual smoke: load `/vendors` in a browser at 1280px, confirm the
  diagram renders centered in the right column, the four outer nodes
  pulse, and the dashed lines travel outward.

## Order of operations

1. Read current `vendors/+page.svelte` lines 161–190 (the `#mcp`
   section).
2. Replace the `#mcp` section with the restructured grid + inline SVG
   + caption + compressed prose in one `Edit` operation.
3. Run `npm run build`.
4. Run `npm run dev -- --port 5179`, probe, grep checks.
5. Stop dev server.
6. Visual smoke at desktop width.
