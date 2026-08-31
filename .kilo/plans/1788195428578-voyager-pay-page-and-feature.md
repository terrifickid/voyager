# Plan — Voyager Pay page + home-page fiat-ramp feature

## Goal

Add a public `Voyager Pay` page that explains the protocol from `vp.md` (v3, Nostr + Lightning + Mostro federation) in marketing language, register it in the header, and surface one interactive "special feature" on the home page: a Mostro quote-aggregator widget that visualizes the spec's §7.4 ranking flow against a fixed set of demo Mostro nodes (no live network, no wallets).

Out of scope: real Nostr/Lightning integration, real Mostro-node lookup, NWC, any persistence or auth. The product already ships a `/chat` was deleted and the current routes are `/`, `/plan`, `/preferences`. We're adding `/pay`.

## Decisions

- **Route & nav.** New route at `voyager/src/routes/pay/+page.svelte` (path `/pay`). Header gets a fourth link `Voyager Pay → /pay`, exact match, font weight + underline offset matching the existing three. Mobile fallback (single underlined "Plan a trip" link) is left alone — `/pay` is reachable from the footer `Product` column too.
- **Concept-first marketing page** per the recommended option. Section list:
  1. **Hero** — eyebrow `OPEN PAYMENTS PROTOCOL` + display H1 `Voyager Pay. Money that moves like a Nostr note.` + lede + dual CTAs (`Read the spec` outline → anchor; `See the ramp` primary → `/pay#ramp`).
  2. **Problem band** — short bone-100 card explaining the custodial status quo in 2 sentences.
  3. **Five design invariants** (vp.md §0) rendered as a 5-cell bone-200 grid: `No custody`, `No identity required`, `Customer ↔ vendor symmetry`, `Protocol outlives us`, `Payments are Lightning`. Pastel icons (`lock`, `chat`, `compass`, `leaf`, `bolt`), one per card.
  4. **Layered architecture** — three stacked bone-tone cards (`Protocol`, `Reference clients`, `Wallets`, plus the `Fiat ↔ sats perimeter` strip) summarizing vp.md §1. Each card carries a short paragraph + a `<ul>` of bullets. No real diagram dependency on external libs.
  5. **How a payment actually flows** — number list (1 → 7) distilled from vp.md §6 + §7.5. Plain-English paragraph per step, no JSON. Anchored at `#how`.
  6. **The fiat ramp** (id=`ramp`) — explanation of the Mostro federation (vp.md §7), our Caribbean-tuned node's parameters (JMD/TTD/BBD/XCD/GYD/HTG/BSD rails, 0.3% fee, <24h SLA), then the **interactive quote-aggregator widget** (same component the home page will embed). The widget is the visual centerpiece.
  7. **EROI defense** — single bone-200 card summarizing vp.md §11 as a 3-column grid (`Fan-out`, `Opacity`, `Binding`) with one-sentence explanations.
  8. **Threat shake-out** — condensed version of vp.md §12 as a 2-column `<dl>`. No new content.
  9. **What we explicitly did NOT solve** — bone-200 card with the four bullets from vp.md §13. Honest framing.
  10. **Final CTA band** — monumental display line + dual CTAs (`Back to Voyager` primary `/`, `Plan a trip` secondary `/plan`).
  11. Footer (already in layout).
- **Fiat ramp quote aggregator widget** lives in `voyager/src/lib/components/RampQuoteAggregator.svelte`. Reused on both `/pay` and `/` so they look related without duplicating markup.
  - **Inputs (left column):** amount field (default `50000` sats), fiat selector (JMD/USD/EUR/GBP), method selector (`bank`, `wise`, `cash`, `mobile`). Defaults populate the rankings.
  - **Static fixture:** `voyager/src/lib/data/mostroNodes.json` — an array of 5 Mostro nodes (`voyager-caribbean`, `atlantis-mostro`, `lisbon-mostro`, `singapore-mostro`, `kingston-mostro`) with `name`, `region`, `supportedFiats[]`, `supportedMethods[]`, `feePct`, `reputation` (0–100), `hodlLiquiditySats`. The fixture is the source of truth for the page's claims (so `0.3%` shown on the page matches the actual Voyager node's `feePct`).
  - **Rank algorithm:** pure function in `voyager/src/lib/ramp/rankQuotes.ts` (or `.js` — match project style; current stores use `.svelte.js` and the agent module is `.ts`, so `.js` is the safe default). Filters nodes by `supportedFiats.includes(selectedFiat)` and `supportedMethods.includes(selectedMethod)`, then scores `0.6 * rateScore + 0.2 * feeScore + 0.2 * reputationScore`, returns top 3 sorted descending. This is a stand-in for the rubric-style `(effective_rate, fee, reputation, method_match)` rank from vp.md §7.4 — note in code comment that real implementation will query `kind:38383` events from relays.
  - **Output (right column):** 3 ranked quote cards on `bg-bone-200`, no border, no shadow. Each shows: node name (font-display), region, rank badge (`#1`/`#2`/`#3` — `--bone-300` background, `--ink` text, NOT lime — C2), `effective rate` (e.g. `1 USD = 1,842 sats`), `fee`, `method`, `reputation` as a row of 5 dots, and a small `<Cta variant="tertiary">` per card.
  - **No interactivity beyond re-rank on input change.** No simulated NWC. No wallet connect.
- **Home page integration.** Replace the existing stats band (`200k` / `10k+`) on `/` with a full-width Voyager Pay band (eyebrow `VOYAGER PAY`, display headline `Money that moves like a Nostr note.` on the left, embedded `<RampQuoteAggregator />` on the right at 50/50 on desktop, stacked on mobile). Keep the surrounding sections unchanged. Result: the home page feels like it ends with the most interesting piece of new tech, and `/pay` is the deep dive.

## Files

### New
- `voyager/src/routes/pay/+page.svelte` — the marketing page described above.
- `voyager/src/lib/components/RampQuoteAggregator.svelte` — input + ranked-output UI.
- `voyager/src/lib/data/mostroNodes.json` — 5-node fixture.
- `voyager/src/lib/ramp/rankQuotes.js` — pure rank function. Export `rankQuotes(nodes, { amountSats, fiat, method })`. Returns `Array<{ node, score, effectiveRateSatsPerFiat, feeSats }>` length ≤ 3.
- `voyager/src/lib/components/icons/LockIcon.svelte` etc. — **NOT** needed; reuse existing `Icon.svelte` (already has `lock`, `compass`, `leaf`, `bolt`, `chat`, `globe`, `check`, `map-pin`, `sparkle`).

### Modified
- `voyager/src/lib/components/Header.svelte` — append `{ href: '/pay', label: 'Voyager Pay', exact: true }` to the `links` array. Mobile fallback link stays `Plan a trip` (no change — the existing three + this new one are still primary, the mobile shortcut is for the most common action).
- `voyager/src/routes/+page.svelte` — replace the "Stats band" `<section>` (currently around line 95) with the new Voyager Pay feature band. Reuse the `mx-auto max-w-6xl px-6 pb-24` wrapper.

### Untouched
- All plan/preferences/itinerary code.
- `src/lib/styles/tokens.css`, `src/routes/layout.css`, `src/app.html`, all other primitives (`Cta`, `Icon`, `SectionHeader`, `HeroMockup`, `FeatureCard`, `PersonaCard`, `QuoteCard`, `BrandRow`, `Footer`, `Header` styling).
- `vp.md` — read-only source of truth.

## Behavior

1. User lands on `/` → reads existing landing content → scrolls past features/personas/quotes → reaches the Voyager Pay band → can play with the quote aggregator inline.
2. User clicks the new `Voyager Pay` nav link → arrives at `/pay`. Top of page mirrors the home page's hero pattern (eyebrow + display H1 + dual CTA). Scrolling reveals invariants → architecture → how-it-works → ramp widget (same component, looks consistent) → EROI defense → threat table → out-of-scope honesty band → final CTA band.
3. Aggregator interaction on either page: changing amount / fiat / method re-ranks the 3 cards live (no submit button). Filtered-out nodes are simply absent — no empty-state UI needed since at least 3 of the 5 fixture nodes match any sensible input.
4. No data crosses the network. No persistence. No wallet connect.

## Edge cases

- **Rubric C2 (lime budget):** the page uses lime only on the primary CTA in the hero. The rank badges are `bg-bone-300` not lime. The widget's selected-state highlights (if any) are `bg-ink text-bone-50`. No accent on icons.
- **Rubric C6 (no borders/shadows on cards):** all new cards use only `bg-bone-{100,200}` + radius. The aggregator's quote cards follow the same rule.
- **Rubric C4 (CTA hierarchy):** the page uses only `<Cta variant="primary">`, `<Cta variant="secondary">`, `<Cta variant="tertiary">`. No `bg-lime rounded-md` ad-hoc buttons.
- **Rubric C9 (icons):** all icons are pastel solid-fill via the existing `Icon` component. Never lime, never in a chip.
- **Type ramp:** new copy uses the established `font-display` (display) + Inter (body) + `eyebrow` (small-caps) pattern. Display headlines stay under 64px on the new page (the home page hero is the 92px peak; sub-pages don't need to compete).
- **Header overflow at md:** the existing 4-link row (`gap-8`) still fits comfortably at ≥768px. Below md the fallback stays a single `Plan a trip` link — this is acceptable for a demo.
- **SvelteKit prerendering:** the new route is purely static (no `+page.server.js`, no `+server.js`). Vite/SvelteKit will prerender it by default. No new build hazard.
- **Empty fixtures in CI:** `mostroNodes.json` lives under `src/lib/data/`, so Vite imports it as JSON at build time. Default content; nothing breaks if it's empty (the widget renders an empty state).
- **TypeScript edge case:** `rankQuotes.js` is a plain `.js` module with JSDoc — matches the project's existing convention (`src/lib/agent/index.ts` is the only `.ts` module, everything else is `.js`). The aggregator Svelte file follows the `// @ts-ignore` pattern only if it imports from `$lib/stores/user.svelte.js` (it won't — the widget has no store dependency).
- **Accessibility:** chevron `›` is `aria-hidden` in `<Cta>`. Aggregator inputs have explicit `<label>` elements. Rank badges have `aria-label="Rank 1 of 3"` etc.

## Validation

1. `npx svelte-check --tsconfig ./.svelte-kit/tsconfig.json --output human | grep -E "src/(lib|routes)"` returns empty.
2. `grep -rn "slate-\|indigo-\|blue-\|amber-\|emerald-" voyager/src/routes/pay voyager/src/lib/components/RampQuoteAggregator.svelte voyager/src/routes/+page.svelte` returns empty.
3. `grep -rn "bg-lime\|var(--lime)" voyager/src/routes/pay voyager/src/lib/components/RampQuoteAggregator.svelte` returns at most the primary `<Cta>` usage.
4. `curl -s http://127.0.0.1:<port>/pay | grep -o "Voyager Pay\|Five design invariants\|The fiat ramp\|EROI defense"` returns all four markers.
5. Manual: home page → scroll → Voyager Pay band present, aggregator changes output when fiat selector changes. `/pay` → hero copy renders, invariants grid renders, ramp widget renders, ranking visibly changes between `JMD` and `USD` (different top 3).
6. `npx vite build` still hits the pre-existing `GOOGLE_PLACES_API_KEY` error — out of scope, untouched.

## Order of operations

1. Create `mostroNodes.json` + `rankQuotes.js`.
2. Create `RampQuoteAggregator.svelte` and verify it ranks correctly against the fixture (mental check: pick `JMD`/`cash` → `voyager-caribbean` + `kingston-mostro` should top; pick `EUR`/`wise` → `lisbon-mostro` + `atlantic-mostro` should top).
3. Create `routes/pay/+page.svelte` using the existing primitives.
4. Add `Voyager Pay` nav link to `Header.svelte`.
5. Swap the stats band in `routes/+page.svelte` for the new feature band.
6. Run `svelte-check` and the grep audits above.
7. Manual smoke test of `/` and `/pay` in `vite dev`.

## Risks

- **vp.md references local files** (`/home/tk/voyager/EROI_AUDIT.md`, `/home/tk/voyager/EROI_AUDIT_v2.md`, `/home/tk/rubric/rubrics/eroi_defense_rubric.md`) we cannot read. Mitigation: the page only quotes content that lives inside `vp.md` itself; no claims depend on those external files.
- **"Concept-first" can drift into vagueness.** Mitigation: every section cites the section number from vp.md in a code comment (e.g. `<!-- §7.4 ranking -->`), and the rank-algorithm code comment links the implementation to the spec literally.
- **Header at 4 links may crowd at md widths.** Mitigation: the existing gap-8 still leaves ~150px of headroom at 768px; if it looks tight, drop to `gap-6`. Not worth a separate iteration unless visually flagged.
