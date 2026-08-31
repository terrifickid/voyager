# Plan: Fix design of new Voyager Pay subpages

## Goal

Make `/pay/security`, `/pay/pricing`, `/pay/node`, `/docs/how-price-discovery-works`, and the rewritten `/pay` hero + segmenter visually match the canonical `/pay` and `/docs/how-voyager-pay-works` templates. Move the three new pay links out of the Footer Product column into a new "Voyager Pay" column.

## Decisions (resolved with user)

- **Scope**: Local design fixes only. Keep the subpage structure (the plan's design decision stands).
- **Footer**: New "Voyager Pay" column holds Voyager Pay + Security by design + Fair pricing + Run a node. Product column stays at 4 links (Plan a trip, Set preferences, How it works, About Voyager).

## Canonical patterns (what the new pages must match)

From `/pay/+page.svelte` and `/docs/how-voyager-pay-works/+page.svelte`:

1. **Pay-page hero wrapper**: `<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">` — never `pt-4 pb-12` (that's the docs-lesson hero).
2. **Pay-page h1**: `font-display text-[44px] sm:text-[56px] lg:text-[64px] text-ink max-w-4xl leading-[1.02]`.
3. **Compact card** (used for invariant grid, three-audiences segmenter): `rounded-[28px] bg-bone-200 p-6` with `Icon size={28}` + `h3 font-display text-xl text-ink leading-tight` + `p text-sm leading-relaxed text-ink-2`.
4. **Large surface card** (used for ramp, layered architecture, "what we did NOT solve"): `rounded-[28px] bg-bone-100 p-8` (or `bg-bone-200` with `p-8 sm:p-12`).
5. **Section padding**: `mx-auto max-w-6xl px-6 pb-20` for primary sections, `pb-16` for lighter follow-ups.
6. **Honest-limits block**: nested inside one `rounded-[32px] bg-bone-200 p-8 sm:p-12` container — never a standalone full-width section.
7. **Next-up CTA**: nested inside a `rounded-[28px] bg-bone-100 p-8` two-column flex (matches `/docs/how-voyager-pay-works` lines 71–80). Never its own full-width section.
8. **Ramp section wrapping the widget**: `rounded-[32px] bg-bone-100 p-8 sm:p-12` with a side-by-side intro column + widget column (matches `/pay` lines 192–225).
9. **Docs-lesson hero**: `<section class="pt-4 pb-12">` with `eyebrow` + `h1 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]` + lede `p`. (This is what `/docs/how-price-discovery-works` already has — leave it.)

## Affected files

- `voyager/src/routes/pay/security/+page.svelte` — full rewrite
- `voyager/src/routes/pay/pricing/+page.svelte` — full rewrite
- `voyager/src/routes/pay/node/+page.svelte` — full rewrite
- `voyager/src/routes/pay/+page.svelte` — fix three-audiences segmenter padding (`pb-16` → `pb-20`) and confirm hero h1 size matches canonical
- `voyager/src/lib/components/Footer.svelte` — move three pay links out of Product column into new "Voyager Pay" column
- `voyager/src/routes/docs/how-price-discovery-works/+page.svelte` — leave as-is (already matches canonical docs-lesson pattern)

## Implementation

### Step 1: Rewrite `/pay/security`

Use `/pay` hero block (lines 13–28) as the structural template.

- Hero: `<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">` with eyebrow "Voyager Pay" + h1 "Secure by design." at the canonical size, lede `p`, and two CTAs (primary → "How Voyager Pay works" /pay, secondary → "Fair pricing" /pay/pricing).
- Two-pillar cards: `rounded-[28px] bg-bone-200 p-6` (compact), `Icon size={28}` + `eyebrow` + `h3 font-display text-xl` + body. 2-column grid at `md:grid-cols-2`.
- SectionHeader "Four outcomes" with eyebrow "Outcomes" — use the canonical `SectionHeader` component, no manual h1.
- Outcomes grid: switch to `grid grid-cols-1 gap-4 sm:grid-cols-2` of compact p-6 cards (not a single column of p-8). Each card: `Icon` + `h3 font-display text-xl` + body.
- Honest-limits block: collapse into a single `<div class="rounded-[32px] bg-bone-200 p-8 sm:p-12">` with eyebrow + 3-bullet list + two CTAs. Section padding becomes `pb-16`.
- Next-up CTA: replace the standalone section with a `rounded-[28px] bg-bone-100 p-8` two-column flex matching `/docs/how-voyager-pay-works` lines 71–80.

### Step 2: Rewrite `/pay/pricing`

- Hero: same canonical pay-page hero pattern. h1 "Fair pricing from a fair marketplace." Two CTAs (primary → "Run a node" /pay/node, secondary → "Back to Voyager Pay" /pay).
- SectionHeader "Captive rent" — "Why a single operator charges more." Body paragraphs in `flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2` (canonical pattern).
- SectionHeader "Competition" — same shape.
- Ramp section: wrap the widget in a `<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">` matching `/pay` lines 192–225. Inside: `grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]` with a left column of body + Caribbean-node info card (`rounded-[28px] bg-bone-200 p-6` with the canonical `<span class="font-display text-ink">` list pattern from `/pay` lines 207–215) and the widget in the right column. Use the dynamic `nodes.find(n => n.name === 'voyager-caribbean')?.hodlLiquiditySats ?? 0` pattern.
- SectionHeader "Convergence" — same shape.
- Honest-limits block: collapse to one nested `rounded-[32px] bg-bone-200 p-8 sm:p-12` with eyebrow + 3 bullets + 2 CTAs.
- Next-up CTA: two-column flex card matching the docs-lesson pattern.

### Step 3: Rewrite `/pay/node`

- Hero: canonical pay-page hero. h1 "Run a node. Anyone can join the federation." Two CTAs (primary → "How Voyager Pay works" /pay, secondary → "Security by design" /pay/security).
- Non-custodial reminder: collapse into a `rounded-[28px] bg-bone-100 p-6` callout (matches `/docs/how-voyager-pay-works` lines 58–63).
- SectionHeader "What a node does" — body paragraphs.
- SectionHeader "What you publish" — profile card becomes `rounded-[28px] bg-bone-200 p-6` with the canonical `<ul>` + `<span class="font-display text-ink">` pattern.
- SectionHeader "What it costs to run" — 3-card grid using the canonical compact card (`rounded-[28px] bg-bone-200 p-6` with `eyebrow` + `h3 font-display text-xl text-ink leading-tight` + body), `md:grid-cols-3`.
- SectionHeader "What's in it for you" — body paragraphs.
- SectionHeader "Voyager's bootstrap node" — 2-card grid (`md:grid-cols-2`) of `rounded-[28px] bg-bone-100 p-8` cards. Profile card uses the canonical Rails/Fee/SLA/Liquidity `<ul>` pattern from `/pay` lines 207–215. Honest-limits card uses eyebrow + 3 bullets.
- Next-up CTA: two-column flex card.

### Step 4: Fix `/pay` segmenter spacing

- Change `<section class="mx-auto max-w-6xl px-6 pb-16">` (three audiences) to `pb-20` to match canonical section rhythm.
- Confirm hero h1 still reads `font-display text-[44px] sm:text-[56px] lg:text-[64px] text-ink max-w-4xl leading-[1.02]`.

### Step 5: Footer restructure

In `voyager/src/lib/components/Footer.svelte`:

- Remove the three added links from the Product column (back to its original 4: Plan a trip, Set preferences, Voyager Pay, How it works).
- Add a new column to the `columns` array:

```js
{
  title: 'Voyager Pay',
  links: [
    { label: 'Voyager Pay', href: '/pay' },
    { label: 'Security by design', href: '/pay/security' },
    { label: 'Fair pricing', href: '/pay/pricing' },
    { label: 'Run a node', href: '/pay/node' }
  ]
}
```

- Update the grid template from `md:grid-cols-[1.4fr_repeat(3,1fr)]` to `md:grid-cols-[1.4fr_repeat(4,1fr)]` so the four nav columns share equal width.
- Decide what to do with the existing "Company" and "Resources" columns. They currently have placeholder links (`/`, `/`, `/`). Leave them alone — the plan forbade touching them only via the header, and the footer placeholder structure was not in scope.

## Constraints

- Reuse `Cta`, `SectionHeader`, `Icon`, `RampQuoteAggregator` — no new components.
- No new design tokens, fonts, colors, or class conventions.
- Svelte 5 runes; no `export let`.
- Don't touch `Header.svelte`, `vp.md`, `peak.json`, `coms.md`.
- Don't renumber docs lessons.
- Keep all cross-links from the plan's linking graph resolving.

## Voice anchor reuse

Each new page must contain at least one of: "no custody", "the protocol is the product", "atomic with the network", "the wire format is the product", "anyone can run a node", "the sats are escrowed by the network, not by a person". Confirmed all three pages currently contain at least one — preserve in the rewrite.

## Honesty disclosures (preserve)

- `/pay/security`: "Today, Voyager Pay is a spec, a demo widget, and a Caribbean-tuned reference node."
- `/pay/pricing`: "Convergence is a structural argument, not an empirical claim at this scale. Today, the federation is small (the demo fixture ships five nodes)."
- `/pay/node`: "Today, running a node means running against the demo fixture, not a live network."
- `/docs/how-price-discovery-works`: "Convergence is predicted, not measured. The demo fixture has five nodes."

## Validation

- `pnpm dev` — hit every route, confirm 200.
- `curl -s http://localhost:5199/pay/security | grep "mx-auto max-w-6xl px-6 pt-20"` confirms the hero wrapper fix.
- `curl -s http://localhost:5199/pay/pricing | grep "rounded-\[32px\] bg-bone-100 p-8 sm:p-12"` confirms the widget wrapper fix.
- `curl -s http://localhost:5199/pay/node | grep "rounded-\[28px\] bg-bone-100 p-6"` confirms the non-custodial callout fix.
- Footer has 4 columns + brand column at md. Spot-check by grepping the rendered home page footer for "Voyager Pay", "Security by design", "Fair pricing", "Run a node" in the second column slot.
- Voice anchor grep still finds one anchor per page.
- Cross-link graph from the original plan still resolves (every `href` returns 200).

## Out of scope

- Header navigation, footer Company/Resources placeholder cleanup, header prominence bump.
- Real payments code, NWC wiring, fixture changes.
- Footer mobile (single-column stack) layout — the 7-link version was already acceptable there; the new 4-column version is even simpler.
