# Plan: Home-page Voyager Pay band — live checkout card

## Goal

Replace section 7 of `voyager/src/routes/+page.svelte` (currently the "Two sides. One protocol." band) with a simplified payment-app visualization of Voyager Pay. Drop the "two-step + Mostro federation" framing. The right column becomes a **single, live-updating checkout card** — the user picks a currency, optionally a vendor, and the ranked Mostro-node providers recompute. The best-rate provider is preselected; the user can tap any chip to switch. A "Pay" CTA leads to a success state.

User-language summary of the flow:

- Pick a currency (USD / EUR / GBP / JMD).
- See the ranked Mostro providers for that currency, best rate highlighted.
- Tap a different provider to switch.
- Pick which trip vendor this is going to (Calypso Inn / BlueMarlin Tours / Marlon's Taxi) — affects the sats amount.
- Pay — a success screen shows receipt.

No stepwise gating. Every control recomputes the ranked list live. The card is the whole flow; there's no "step 1 / step 2" header.

## User decisions (resolved)

- **Right-column shape:** wide card, NOT a phone frame. No 320px portrait chrome. Width is `max-w-[480px]` sitting in the right grid column.
- **Live recompute:** no step machine. `currency`, `vendor`, `provider` are all $state; ranked providers derive from them via `rankQuotes` (existing helper).
- **Provider display:** chip row of all ranked providers, the best-rate one highlighted by default. Tapping any chip selects it.
- **Code location:** new component `voyager/src/lib/components/PayCheckoutCard.svelte`. Pulls Mostro nodes from `$lib/data/mostroNodes.json` and ranking from `$lib/ramp/rankQuotes.js` (existing data + helper — no changes).
- **Section copy:** colloquial, no "Mostro / federation / Mostro nodes" jargon. Drop the second CTA ("Why the prices are low") and the globe/plane icon callouts. Single primary CTA "Open Voyager Pay".

## Out of scope (explicit)

- No changes to `RampQuoteAggregator.svelte`, `rankQuotes.js`, or `mostroNodes.json`.
- No changes to `/pay`, the design system, or other home-page sections (1–6, 8, 9 stay byte-identical).
- No real payment integration. The Pay CTA is a UI affordance only.
- No animation library (no `svelte/transition`). Tailwind `transition-colors` is enough.

## Design

### Section 7 layout (after)

Two-column band, same outer container as today:

```
┌─────────────────────────────────────────────────────────────────┐
│  eyebrow: "Voyager Pay — built in"                               │
│  H1:      "Pay the way you actually pay."                       │
│  lede:    "Pick a currency. See the best rate. Tap a vendor,    │
│           hit Pay. No app to install."                          │
│  [CTA: Open Voyager Pay]                                         │
│                                                                  │
│                                  ┌─────────────────────────────┐ │
│                                  │ Currency: [USD][EUR][GBP][JM]│ │
│                                  │ Vendor:   [Calypso ▾]       │ │
│                                  │ Amount:   35,000 sats        │ │
│                                  │ ────────────────────────────│ │
│                                  │ Providers (best first)       │ │
│                                  │ ( ● Caribbean Capital  35,100)│ │
│                                  │ ( ○ BluColony Node     34,800)│ │
│                                  │ ( ○ Atlantic Bridge    34,400)│ │
│                                  │ ────────────────────────────│ │
│                                  │ Total: 35,100 sats   [Pay ›] │ │
│                                  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

Same outer `<section class="mx-auto max-w-6xl px-6 pb-24">` and `<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">`. Outer grid becomes a clean `lg:grid-cols-2 items-start gap-10` (the `md:grid-cols-2` inner split goes away — there's no second tier).

### Check — important constraint from `RATE_TABLE`

`rankQuotes.js` only has rates for USD/EUR/GBP/JMD (Handover discovery). The currency chips in the card must therefore be exactly those four — the four existing strings already on the /pay page and in `RampQuoteAggregator.svelte` (`fiats = ['JMD', 'USD', 'EUR', 'GBP']`).

### Checkout card — anatomy

**Card chrome:**

- Container: `rounded-[28px] bg-bone-50 p-5 sm:p-6`, single `flex flex-col gap-5`.
- Width: `w-full max-w-[480px]`, centered in its column with `mx-auto` (or `lg:mx-0` to flush-left in the two-column band).
- Card sits on the section's bone-100 background — provides the same panel-on-panel nesting that `RampQuoteAggregator` does today. Visually fine, established pattern (Handover discovery).

**Row 1 — Currency chip group:**

- Eyebrow label `"Currency"` (uses existing `eyebrow` class).
- Chip group: `{JMD, USD, EUR, GBP}`, single-select. Default = `USD`.
- Chips match the established pill style: `rounded-pill`, selected = `bg-ink text-bone-50`, unselected = `bg-bone-200 text-ink hover:bg-bone-300`.

**Row 2 — Vendor selector:**

- Eyebrow label `"Paying"` (a preselected name surfaces the destination, not the source — this is what the user actually pays *for*).
- A single inline selector rendered as a clickable pill: `rounded-pill bg-bone-200 px-4 py-2 text-sm font-semibold text-ink` with the current vendor's name + a `▾` chevron (small `text-ink-2`). Tapping it opens an inline list below the pill with the three vendors (Calypso Inn / BlueMarlin Tours / Marlon's Taxi). Click-outside dismisses. No `<select>` element — keep the styling consistent.
- Each vendor row shows the sats amount next to the name (`Calypso Inn — 35,000 sats`).
- This is the first time the vendor dropdown opens a small popover — keep it simple: `position: absolute`, fade in via Tailwind `transition-opacity`.

**Row 3 — Amount (read-only display):**

- Eyebrow label `"Amount"`.
- Display only: the vendor's sats amount formatted with `Intl.NumberFormat('en-US')`. e.g. `35,000 sats`. No input box — the amount is just whichever vendor is picked.
- A muted helper line below: `"Based on vendor"` (or omit and rely on the vendor pill above; decided: **omit, vendor pill is enough**).

**Row 4 — Ranked providers (the chip row the user asked for):**

- Eyebrow label `"Providers"` with a count (`3 ranked`) on the right side.
- List of ranked provider chips. Best-rate one preselected (and visually highlighted with a violet dot or `bg-ink text-bone-50`).
- Each provider row is a clickable button with:
  - A small radio-dot on the left (filled when selected, hollow when not) — same visual pattern as the existing `mostroNodes` reputation dots in `RampQuoteAggregator.svelte:122-128`.
  - The provider's name in `font-display text-base`.
  - Region (`Kingston, JM`) as `text-xs text-muted`.
  - The sats amount they offer for this amount+currency+method on the right (`35,100 sats`) in `font-display`.
- The selected chip gets a violet ring (`ring-2 ring-[var(--pastel-violet)]`) and `bg-bone-200` fill. Unselected = `bg-bone-100 hover:bg-bone-200`.
- Lists the full ranked list (could be 5 chips if `rankQuotes` returns 5; truncate visually with `max-h-[180px] overflow-y-auto` if the count grows).
- A small footer line: `"Best rate, ranked across [N] independent operators"`. Ties to the `/pay` page's existing reputation/fee/rate framing without naming Mostro in the home card copy.

**Row 5 — Total + Pay (sticky-feeling via `mt-auto`):**

- Bottom row pushed down with `mt-auto` so it sits at the bottom of the flex column.
- Two columns:
  - Left: `"Total"` (eyebrow) + the selected provider's `effectiveRate` formatted `35,100 sats` in `font-display`.
  - Right: `Pay` button — uses existing `Cta` component with `variant="primary"`. **Important:** `Cta variant="primary"` is `bg-lime text-lime-ink` (per `Cta.svelte:11`), matching the top ribbon. Visually this reads as the call-to-action brand color. The Pay button is a real `<button>` (no href), so it routes through `Cta` with `type="button"` and `onclick={pay}`. (Pay does NOT use `<Cta>` as a link; same component works for button-shaped CTAs.)
- A small caveat disclaimer at the bottom: `"Demo fixture — no live network"`, identical to `RampQuoteAggregator.svelte:84-85`.

**Row 6 — Success state (post-Pay, replaces rows 1–5 in place):**

- Big check icon: `<Icon name="check" tone="violet" size={56} />`, centered.
- `"Paid."` line in display font, large.
- Sub line: `"35,100 sats sent to Calypso Inn via Caribbean Capital."` — uses the currently-selected provider's name and the vendor's name. This is the receipt.
- A small "Start over" link at the bottom (same underlined tertiary style as `Cta variant="tertiary"`).

**Status indicator (top of card):**

- A single small line at the very top of the card, above row 1: `"Live quote"` with a small animated dot (or just a static one). Pings `Live quote · [N] providers` to communicate "this is real-time data, not a static mock". Optional; only include if it doesn't add much code. **Decision: include as a static label `"Live · ranked across [N] operators"` (no animation) — communicates the same idea without requiring keyframes.**

## Component API & state

```js
// PayCheckoutCard.svelte — no props.

let currency = $state('USD');                            // 'USD' | 'EUR' | 'GBP' | 'JMD'
let vendor   = $state(VENDORS[0]);                       // first of three
let provider = $state(null);                             // populated by $derived below
let isPaid   = $state(false);

// Derived list (recomputes when currency/vendor change):
const ranked = $derived(
  rankQuotes(nodes, { amountSats: vendor.amountSats, fiat: currency, method: 'bank' })
);
// ^ Note: mostroNodes.json providers have a `supportedMethods` array.
//   'bank' is universally supported per the fixtures (Handover discovery).
//   If a currency + method combo yields no ranked providers, render a single muted helper card.

// When ranked changes, set provider = ranked[0] (the best) IF provider isn't already in the new list.
$effect(() => {
  if (ranked.length === 0) { provider = null; return; }
  const stillThere = ranked.find(r => r.node.name === provider?.node?.name);
  provider = stillThere ?? ranked[0];
});
```

The `method` selection is fixed at `'bank'` for the demo — keeps things simple and matches the widest-supported method in fixtures (Handover discovery). It's not exposed as a UI control in this card; if the user wants a method chooser later, that's an additive change.

## Implementation steps (ordered)

1. Create `voyager/src/lib/components/PayCheckoutCard.svelte` (~150 lines):
   - Imports: `Icon` from `$lib/components/Icon.svelte`, `rankQuotes` from `$lib/ramp/rankQuotes.js`, `nodes` from `$lib/data/mostroNodes.json`, `Cta` from `$lib/components/Cta.svelte`.
   - Inline `VENDORS` array (moved out of `+page.svelte`).
   - `$state` for `currency`, `vendor`, `provider`, `isPaid`.
   - `$derived` for `ranked`.
   - `$effect` to keep `provider` valid.
   - Render card chrome + rows 1–6.
   - Inline vendor popover (just a positioned `<ul>` with click-outside handler; implementation guide only — no animation).
2. Edit `voyager/src/routes/+page.svelte`:
   - Remove `import Icon from '$lib/components/Icon.svelte';` (no longer used in this file).
   - Remove `import RampQuoteAggregator from '$lib/components/RampQuoteAggregator.svelte';` (no longer used in this file).
   - Remove `const VENDORS = [...]` (moved into `PayCheckoutCard.svelte`).
   - Add `import PayCheckoutCard from '$lib/components/PayCheckoutCard.svelte';`.
   - Replace section 7 markup (`+page.svelte:230-303`) with the simplified version per the layout above.
   - Keep the outer `<section>` and inner `<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">` byte-identical.
   - Outer grid: `grid grid-cols-1 items-start gap-10 lg:grid-cols-2`. The inner `md:grid-cols-2 md:items-start` on the right column is gone.
3. Do not touch sections 1–6 or 8, 9.

## Risks and mitigations

- **Risk:** Currency chip fixed at 'bank' method in `rankQuotes` call — if a Mostro node doesn't list 'bank' as a supported method, it drops out, breaking the chip-row promise.
  **Mitigation:** Handover confirms all 5 nodes support 'bank'. If `ranked.length === 0` we render a single muted card `"No providers for this combination — try a different currency"` and disable the Pay button. Cover the empty state explicitly.
- **Risk:** Vendor popover (the inline dropdown) needs click-outside dismissal. Implementation can get tangled with focus management.
  **Mitigation:** Use a Svelte action (`<svelte:window onclick={...}>` while popover is open, or a tiny `onclick_outside` action). Mark as a small known complexity in the validator notes; not a blocker. If clicking is hard to wire, fall back to a stacked always-visible vendor list (3 rows under a label `"Vendor"`), losing the popover feel but keeping behavior identical. Either is fine; popover is preferred but stacked-list is the safety net.
- **Risk:** `Cta variant="primary"` is `bg-lime text-lime-ink` — high-saturation green. Looks like the top ribbon but might overpower the muted bone-50 card next to it.
  **Mitigation:** That's the brand — accept it. (Same hue as the page top ribbon; it's the brand's "go" signal across the site.)
- **Risk:** The Pay button uses `Cta variant="primary"` to match site conventions, but `Cta` appends an arrow character (`›`, see `Cta.svelte:31`) and the visual might feel non-mobile.
  **Mitigation:** Acceptable — the arrow fits the in-app feel. If it looks bad in mock, swap to a plain button. Optional, defer.
- **Risk:** Provider chip row shows `effectiveRate` (sats amount the user receives), not "sats per fiat" which is what `RampQuoteAggregator` shows. Different presentation may confuse repeat visitors.
  **Mitigation:** The user explicitly asked for "providers with the winning exchange rate from your selected currency to sats" — they're asking for sats-amount, not sats-per-fiat. Show sats.
- **Risk:** Removing `RampQuoteAggregator` from the home page removes a previously-shipped interactive demo.
  **Mitigation:** Intentional per user feedback ("too technical"). `RampQuoteAggregator.svelte` is preserved untouched and still appears on `/pay`. Only the import in `+page.svelte` is removed.

## Style / token compliance

Reuse-only, no new tokens:

- Colors: `bg-bone-50`, `bg-bone-100`, `bg-bone-200`, `bg-bone-300`, `text-ink`, `text-ink-2`, `text-muted`, `bg-ink text-bone-50`, `ring-[var(--pastel-violet)]`.
- Shapes: `rounded-pill`, `rounded-[20px]`, `rounded-[28px]`.
- Type: `font-display`, `eyebrow`, `text-base`, `text-sm`, `text-xs`.
- The Pay CTA uses `Cta variant="primary"` (lime). All other chip-style buttons are hand-rolled pills matching `RampQuoteAggregator.svelte:53-77` exactly.

No new design tokens, no new CSS, no new components beyond `PayCheckoutCard.svelte`. The `Cta`, `Icon`, `rounded-pill`, `eyebrow`, `font-display`, `bone-*`, and the pastel CSS variable are all already in use.

## Validation

- `npm run dev` from `voyager/`. Scroll to section 7.
- **Initial state:** USD preselected; Calypso Inn preselected; Caribbean Capital (best rate for USD) preselected; Pay button enabled, lime.
- **Click EUR:** ranked list reorders; the best EUR provider becomes highlighted; the same provider as before may stay if it supports EUR, or provider swaps to the new best.
- **Click a lower-ranked chip:** chip becomes highlighted (violet ring, ink text); the Total amount updates immediately; the previously-selected chip deselects.
- **Click the vendor pill:** popover opens below with 3 rows. Pick a different vendor. Popover closes; amount updates; provider ranking updates (Calypso 35,000 vs Taxi 4,200 are very different amounts and likely change the ranking order).
- **Click anywhere outside the popover:** popover closes.
- **Click Pay:** card content swaps to the success state (check icon, "Paid.", receipt line, "Start over" link).
- **Click "Start over":** card returns to the live checkout, `isPaid=false`, `vendor`/`currency`/`provider` unchanged from end-of-Pay state (don't reset user choices — just leave the receipt and continue).
- **Try every currency:** JMD, USD, EUR, GBP. None should throw; the empty-state helper appears if `ranked` is empty (if it ever is for a particular fixture combination — validate at runtime).
- **Layout at mobile (`sm`):** copy stacks above the card; card is full-width with `max-w-[480px]` cap; Pay button doesn't overflow.
- **Layout at `lg+`:** two columns, copy on left flush-aligned with eyebrow at top of card (because of `items-start`); card on right is `max-w-[480px]` wide and left-aligned within its column (or centered).
- **Build check:** run `npm run build` from `voyager/` to confirm Svelte compile passes and no unused-imports warning. There is no separate `lint` script in `package.json` (confirmed in earlier session) — skip lint.

## Open questions

None. Ready to implement.
