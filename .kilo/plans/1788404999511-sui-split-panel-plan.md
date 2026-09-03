# Voyager — sui-style polish: SplitPanel on key landings

Scope: implement the **SplitPanel** component and apply it to the five key
landings (`/stack`, `/use-cases`, `/network`, `/build`, `/principles`). No new
typography, no palette changes, no content re-anchoring. Pure visual
rhythm work — the layouts are "shiek and main stage" already; this
round adds the dark/light 50/50 split that gives sui.io its pacing.

## Locked decisions

- **Component shape**: 50/50 columns on desktop, stacked on mobile. Left
  side = `night-900` background with `bone-50` text. Right side =
  `bone-100` background with `ink` text.
- **Placement**: one split panel per page on the five key landings.
- **Typography**: keep `peak.json` (Space Grotesk display + Inter body). Do
  not introduce a new display face in this round.
- **Palette**: keep the current cdesign C2 mock (bone ramp + ink + lime
  accent + night-900 surface). Pastel icon tones are out of scope.
- **Content discipline**: every split panel states a single claim
  (two-clause, sentence case, ≤24 words above the fold of the panel).
  No marketing language, no exclamation marks.

## Component: `SplitPanel.svelte`

New file at `voyager/src/lib/components/SplitPanel.svelte`.

```
<script>
  /**
   * @typedef {'left-dark' | 'right-dark'} Theme
   * @typedef {{
   *   eyebrow?: string,
   *   title?: string,
   *   body?: string,
   *   stat?: { value: string, label: string },
   *   cta?: { label: string, href: string }
   * }} PanelProps
   */
  /** @type {{ theme?: Theme, left: PanelProps, right: PanelProps }} */
  let { theme = 'left-dark', left, right } = $props();
  const darkFirst = $derived(theme === 'left-dark');
</script>

<section class="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[28px] overflow-hidden">
  <div class="bg-night-900 text-bone-50 p-8 sm:p-12 flex flex-col gap-5 {darkFirst ? '' : 'lg:order-2'}">
    {#if left.eyebrow}<span class="text-[11px] font-semibold tracking-[0.14em] uppercase text-bone-50/70">{left.eyebrow}</span>{/if}
    {#if left.stat}
      <div class="flex flex-col gap-2">
        <span class="font-display text-[64px] sm:text-[88px] lg:text-[104px] leading-[0.95] text-bone-50">{left.stat.value}</span>
        <span class="text-[11px] font-semibold tracking-[0.14em] uppercase text-bone-50/70">{left.stat.label}</span>
      </div>
    {/if}
    {#if left.title}<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] text-bone-50 max-w-md">{left.title}</h2>{/if}
    {#if left.body}<p class="text-[15px] leading-relaxed text-bone-50/85 max-w-md">{left.body}</p>{/if}
    {#if left.cta}
      <div class="mt-2">
        <a href={left.cta.href} class="inline-flex items-center gap-1 text-bone-50 underline underline-offset-4 decoration-[1.5px] font-semibold text-[15px]">
          {left.cta.label}
          <span aria-hidden="true" class="text-[1.05em] leading-none">›</span>
        </a>
      </div>
    {/if}
  </div>
  <div class="bg-bone-100 text-ink p-8 sm:p-12 flex flex-col gap-5 {darkFirst ? '' : 'lg:order-1'}">
    {#if right.eyebrow}<span class="eyebrow">{right.eyebrow}</span>{/if}
    {#if right.title}<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] text-ink max-w-md">{right.title}</h2>{/if}
    {#if right.body}<p class="text-[15px] leading-relaxed text-ink-2 max-w-md">{right.body}</p>{/if}
    {#if right.stat}
      <div class="flex flex-col gap-2">
        <span class="font-display text-[64px] sm:text-[88px] lg:text-[104px] leading-[0.95] text-ink">{right.stat.value}</span>
        <span class="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted">{right.stat.label}</span>
      </div>
    {/if}
    {#if right.cta}
      <div class="mt-2">
        <Cta variant="primary" href={right.cta.href}>{right.cta.label}</Cta>
      </div>
    {/if}
  </div>
</section>
```

Properties used:

- `eyebrow` — short ALL-CAPS label (uses `eyebrow` class on the light side,
  custom tracking on the dark side so it stays legible against `bone-50/70`).
- `title` — sentence-case declarative headline at `font-display 36–44px`.
- `body` — one-paragraph body copy, sentence case, no exclamation marks.
- `stat` — large numeral + ALL-CAPS label (used on the dark side typically).
- `cta` — `Cta` primary on light side, underlined text link on dark side
  (lime fill would clash with `bone-50` text; text link stays AA).

Validation: panel never sets an `<h2>` that competes with the page's
single `<h1>`. Each panel is decorative within the page outline.

## Placements

Each panel sits at a unique position in its page, not at the end (the
final CTA band already does closing work).

### 1. `/stack` — between primitives grid and the "start here" closer

- **Theme**: `left-dark`.
- **Left (night-900)**: stat `5 + 1` / `PRIMITIVES · 1 SDK`. Title `Five
  primitives. One SDK.` Body: "Each primitive solves one job. The SDK
  wires them together — identity, payment, ramp, messaging, discovery
  behind one Stripe-shaped surface."
- **Right (bone-100)**: eyebrow `// why these five`. Title `What we left
  out, and why.` Body: "We did not pick a chat protocol, a streaming
  layer, or a CDN. Builders ship those on top. The five primitives
  are the smallest set that covers identity, money, fiat on/off,
  private messaging, and findability."

### 2. `/use-cases` — between the 8-cards grid and the closer

- **Theme**: `left-dark`.
- **Left (night-900)**: stat `8` / `USE CASES`. Title `Eight jobs, not
  eight products.` Body: "Each use case is something a builder would
  ship, not something Voyager runs. The platform makes them possible;
  the apps are yours."
- **Right (bone-100)**: eyebrow `// methodology`. Title `From the Sep 2
  advisory call.` Body: "These are the jobs Caribbean builders named in
  the Sep 2 2026 call with Shontelle Layne. Each one is a target for
  some app a builder ships on Voyager — the list is what the platform
  should make easy, not what Voyager builds."

### 3. `/network` — between relays and indexer sections

- **Theme**: `right-dark`.
- **Left (bone-100)**: eyebrow `// independence`. Title `The federation is
  the resilience.` Body: "Mostro nodes publish their own profiles.
  Wallets rank them per-order. If one node goes down, the next best
  quote wins — no central counterparty to fail."
- **Right (night-900)**: stat `N+` / `INDEPENDENT NODES`. Body: "More
  operators means better rate discovery, more redundancy, and more
  rails. Voyager operates one reference node; community operators
  compete on fee, region, and reputation. CTA: Run a node →."

### 4. `/build` — between SDK get-started and economics

- **Theme**: `left-dark`.
- **Left (night-900)**: eyebrow `// the SDK`. Title `Stripe-shaped
  surface.` Body: "A handful of well-named calls. The SDK hides the
  keys, the wire format, and the relay fan-out. MIT or Apache. No
  telemetry. No required attribution."
- **Right (bone-100)**: eyebrow `// what's inside`. Title `Five
  primitives, ten calls.` Body: "identity.create, pay.invoice,
  pay.quote, listing.create, dm.send, dm.read — that is most of what
  builders need. The rest is configuration, not new API." CTA: Read
  the docs →.

### 5. `/principles` — between EROI summary and network-hardening list

- **Theme**: `right-dark`.
- **Left (bone-100)**: eyebrow `// the platform's promise`. Title `The
  protocol survives without us.` Body: "If Voyager-the-business is
  acquired or shut down tomorrow, the rails keep working. Reference
  clients are demos; the wire format is the product. Builders' apps
  do not depend on us staying alive."
- **Right (night-900)**: stat `0` / `CUSTODIANS`. Title `No platform in
  the middle.` Body: "The protocol never holds funds. Users bring their
  own wallets. Operators run their own nodes. We run an optional
  indexer and one reference Mostro node. That is the whole list."

## Out of scope (explicit non-goals)

- New display face. peak.json typography stays.
- Palette changes. Pastel icon tones stay.
- Real-Caribbean imagery (criterion C7). Placeholder slots only.
- Numbered section labels (`// 01 — STACK` etc.). The plain `//` eyebrow
  already lands; numbering is a separate polish round.
- Top-of-page metadata strip.
- Footer signal-bars repositioning.
- /use-cases and /stack detail-page polish. The split-panel scope is the
  index page on each landing.

## Task list

1. Create `voyager/src/lib/components/SplitPanel.svelte` per the spec above.
2. Add split panel to `voyager/src/routes/stack/+page.svelte`, position
   after the primitives grid and before the "start here" CTA band.
3. Add split panel to `voyager/src/routes/use-cases/+page.svelte`,
   position after the 8-card grid and before the "build on it" CTA band.
4. Add split panel to `voyager/src/routes/network/+page.svelte`,
   position after the relays section and before the indexer section.
5. Add split panel to `voyager/src/routes/build/+page.svelte`,
   position after the SDK get-started section and before `#economics`.
6. Add split panel to `voyager/src/routes/principles/+page.svelte`,
   position after the EROI summary section and before the network
   hardening list.
7. Run `npm run build`. Confirm build is clean and no new console
   warnings.
8. Validate: each modified page still has exactly one `<h1>`. Contrast
   checks: `bone-50` text on `night-900` passes AA; `bone-50/70` and
   `bone-50/85` (eyebrow + body on dark) pass AA-large (≥3:1) for the
   sizes used. Confirm by eye — terminal check during build.

## Validation

- `npm run build` clean.
- Each touched page: exactly one `<h1>`; primary CTA visible per page
  unchanged from before; breadcrumb still shows on non-home.
- Spot-check `night-900` contrast on each panel: bone-50 on night-900 is
  ~14:1 (passes AAA); bone-50/85 on night-900 is ~12:1 (passes AA +
  AAA body); the eyebrow class at `bone-50/70` is ~9.8:1 (passes AA +
  AAA body, fine for non-text-label use).
- Copy pass against `voyager/.kilocode/rules/clear-communications.md`
  (answer-first, defined jargon, sentence case, positive framing, no
  exclamation marks) and `usability.md` §1 (≤20 word headline,
  scannable).

## Open questions (flagged for the next round)

- Whether to introduce a numbered `// 01 — STACK` style across all
  sections. The current `//` eyebrow lands, but numbering gives a
  stronger sui register.
- Whether to migrate the icon pastel tones to a single tone (sky) for
  C2 palette discipline. Deferred per plan §33.
- Whether to add a real-Caribbean photography strip on `/` (UC6 + UC8
  are visual-heavy use cases). Deferred per plan §33.
