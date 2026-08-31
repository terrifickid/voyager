# Plan: Home-page Voyager Pay band — show the full loop (fiat → sats → vendors)

## Goal

Rework section 7 (`voyager/src/routes/+page.svelte:223-245`) so a first-time visitor sees the **complete** Voyager Pay story:

1. **Any fiat → sats**, anywhere (global). Communicated by the existing `RampQuoteAggregator` widget, kept.
2. **Sats → tourism vendors** (hotels, tours, drivers). This half is currently missing from the home page.

The current copy ("Vendors compete. You win.") only hints at step 2. The right column shows the aggregator only. There is no visualization of step 2 — no vendor list, no payment, no symbol that sats actually buy a hotel.

User decisions (resolved):
- Keep section 7 in place. Same container, same `max-w-6xl` wrapper.
- Keep `RampQuoteAggregator` as-is — it stays on the right (or moves to a new slot, see step 2).
- Add a small, mock "vendors you can pay" panel that shows sats being routed to a few tourism vendors (hotel, tour, driver). No new data file; hardcode ~3 vendors inline.
- Keep the section's overall size roughly comparable to today — not a wall of text.

## Final copy

### Section header (left column)

- **Eyebrow:** `"Voyager Pay — built in"` (unchanged).
- **Title:** `"Two sides. One protocol."` (new — sets up the loop explicitly).
- **Lede (new):** `"Convert any fiat to sats through a federation of competing Mostro nodes. Then spend those sats on the trip — hotels, tours, drivers — through the same open market."`

### Step labels (small caps, paired with icons)

- `"1 · Fiat → sats"` with `globe` icon.
- `"2 · Sats → vendors"` with `plane` icon.

## Layout

Two-column band, mirroring today's grid but with denser content:

```
┌─────────────────────────────────────────────────────────────────┐
│  eyebrow                                                         │
│  H1: Two sides. One protocol.                                    │
│  lede (2 lines)                                                  │
│                                                                  │
│  [globe] 1 · Fiat → sats                                         │
│          "Pick a rail. Rank competing Mostro nodes on rate,      │
│           fee, and reputation. Lock a rate, send fiat,           │
│           receive sats. Anywhere with a phone."                  │
│                                                                  │
│  [plane] 2 · Sats → vendors                                      │
│          "Pay tourism vendors directly in sats — hotels,          │
│           tours, drivers. Each vendor is a competing              │
│           counterparty on the same open market."                 │
│                                                                  │
│  [How Voyager Pay works]  [Why the prices are low]               │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐    ┌──────────────────────────────────┐   │
│  │ RampQuote        │    │ Pay these vendors in sats        │   │
│  │ Aggregator       │    │ ┌────────────────────────────┐   │   │
│  │ (existing)       │    │ │ 🛏 Calypso Inn — Negril     │   │   │
│  │                  │    │ │   35,000 sats/night · ★4.5  │   │   │
│  │                  │    │ ├────────────────────────────┤   │   │
│  │                  │    │ │ ✈ BlueMarlin Tours — Mobay  │   │   │
│  │                  │    │ │   12,500 sats · ★4.8        │   │   │
│  │                  │    │ ├────────────────────────────┤   │   │
│  │                  │    │ │ 🚖 Marlon's Taxi — Ocho Rios│   │   │
│  │                  │    │ │   4,200 sats · ★4.6         │   │   │
│  │                  │    │ └────────────────────────────┘   │   │
│  └──────────────────┘    └──────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

The aggregator stays in the bottom-left. The new vendor panel goes bottom-right. This makes the loop literal in one glance: left = where sats come from, right = what they buy.

## Affected file

- `voyager/src/routes/+page.svelte` — section 7 only (`<!-- 7. Voyager Pay band -->` block, lines 223–245).
  - Rewrite left column: new H1, new lede, two labelled step blocks.
  - Right column: split into a 2-col inner grid (aggregator left, vendor list right).
  - Add an inline `VENDORS` const to the existing `<script>` block (alongside `REVIEWS`). 3 entries, same `{ name, kind, region, amountSats, reputation }` shape.
  - `RampQuoteAggregator` import unchanged. No other imports.
  - No new components. No changes to `RampQuoteAggregator.svelte`, `pay/+page.svelte`, or any other file.

No new files. No data file. No JS state — the vendor list is static.

## Implementation steps (ordered)

1. Open `voyager/src/routes/+page.svelte`.
2. In the `<script>` block, append a `const VENDORS = [...]` array of three tourism vendors after `REVIEWS`. Fields: `name`, `kind` (`'hotel' | 'tour' | 'driver'`), `region`, `amountSats`, `reputation`. Use these values:
   - `{ name: 'Calypso Inn', kind: 'hotel', region: 'Negril, JM', amountSats: 35000, reputation: 92 }`
   - `{ name: 'BlueMarlin Tours', kind: 'tour', region: 'Montego Bay, JM', amountSats: 12500, reputation: 96 }`
   - `{ name: "Marlon's Taxi", kind: 'driver', region: 'Ocho Rios, JM', amountSats: 4200, reputation: 88 }`
3. Replace section 7 (`+page.svelte:223-245`) with the new structure below. Keep the outer `<section class="mx-auto max-w-6xl px-6 pb-24">` and the inner `<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">` byte-identical.
4. Add `Icon` to the `<script>` import list (it's already used elsewhere on the page — verify by grep; if already imported, skip). Add it if not.
5. Do not touch any other section. Sections 6, 8, 9 stay byte-identical.

### New markup (replaces section 7 block)

```svelte
<!-- 7. Voyager Pay band (demoted, clearly labelled aside) -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
			<div class="flex flex-col gap-5">
				<span class="eyebrow">Voyager Pay — built in</span>
				<h2 class="font-display text-[32px] sm:text-[40px] lg:text-[48px] text-ink leading-[1.05]">
					Two sides. One protocol.
				</h2>
				<p class="max-w-md text-base leading-relaxed text-ink-2">
					Convert any fiat to sats through a federation of competing Mostro nodes. Then spend those sats on the trip — hotels, tours, drivers — through the same open market.
				</p>

				<div class="mt-2 flex flex-col gap-4">
					<div class="flex items-start gap-3">
						<span class="mt-0.5 inline-flex shrink-0 items-center justify-center"
							style="width:28px;height:28px;color:var(--pastel-violet)">
							<Icon name="globe" size={28} />
						</span>
						<div class="flex flex-col gap-1">
							<span class="font-display text-sm uppercase tracking-wide text-ink">1 · Fiat → sats</span>
							<p class="text-[15px] leading-relaxed text-ink-2">
								Pick a rail. Rank competing Mostro nodes on rate, fee, and reputation. Lock a rate, send fiat, receive sats. Anywhere with a phone.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-3">
						<span class="mt-0.5 inline-flex shrink-0 items-center justify-center"
							style="width:28px;height:28px;color:var(--pastel-coral)">
							<Icon name="plane" size={28} />
						</span>
						<div class="flex flex-col gap-1">
							<span class="font-display text-sm uppercase tracking-wide text-ink">2 · Sats → vendors</span>
							<p class="text-[15px] leading-relaxed text-ink-2">
								Pay tourism vendors directly in sats — hotels, tours, drivers. Each vendor is a competing counterparty on the same open market.
							</p>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap items-center gap-3">
					<Cta variant="tertiary" href="/pay/security">How Voyager Pay works</Cta>
					<Cta variant="tertiary" href="/pay/pricing">Why the prices are low</Cta>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
				<RampQuoteAggregator />
				<div class="flex flex-col gap-3">
					<span class="eyebrow">Pay these vendors in sats</span>
					<ul class="flex flex-col gap-3">
						{#each VENDORS as v (v.name)}
							<li class="flex flex-col gap-2 rounded-[28px] bg-bone-200 p-5">
								<div class="flex items-start justify-between gap-3">
									<div class="flex flex-col gap-1">
										<span class="font-display text-lg text-ink leading-tight">{v.name}</span>
										<span class="text-xs text-muted">{v.region}</span>
									</div>
									<span class="rounded-pill bg-bone-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink">
										{v.kind}
									</span>
								</div>
								<div class="flex items-baseline justify-between gap-2">
									<span class="font-display text-base text-ink">
										{new Intl.NumberFormat('en-US').format(v.amountSats)} sats
									</span>
									<span class="text-xs text-ink-2">rep {v.reputation}/100</span>
								</div>
							</li>
						{/each}
					</ul>
					<p class="text-xs leading-relaxed text-muted">
						Demo fixture — vendor list is illustrative. Real Voyager Pay routes sats to any counterparty on the protocol.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
```

### Style notes

- Reuse existing Tailwind tokens (`bone-100`, `bone-200`, `bone-300`, `ink`, `ink-2`, `muted`, `rounded-[28px]`, `rounded-[32px]`, `rounded-pill`, `eyebrow`, `font-display`). No new design system work.
- The vendor pill tag (`<span class="rounded-pill bg-bone-300 ...">`) matches the rank pill in `RampQuoteAggregator.svelte:104-109`. Visual continuity with the existing demo widget.
- `items-start` on the outer grid (instead of `items-center` today) keeps the left column from stretching vertically against the taller right column.

## Risks and mitigations

- **Risk:** Right column gets crowded — aggregator + vendor list side by side may feel busy at md breakpoint.
  **Mitigation:** Inner grid is `md:grid-cols-2`, so below `md` they stack full-width and get breathing room. At md+ each gets ~half the right-column width.
- **Risk:** New `Icon` import needed. May already be in the script — verify.
  **Mitigation:** The plan says check first; only add if missing.
- **Risk:** Step labels ("1 · Fiat → sats") may feel gimmicky.
  **Mitigation:** Use `font-display text-sm uppercase tracking-wide` so they read as labels, not badges. Tone matches the rest of the page's typographic system.
- **Risk:** "Sats → vendors" is currently a fiction — there's no real flow that pays hotels in sats. The Voyager Pay page (`pay/+page.svelte`) describes the protocol generically.
  **Mitigation:** The vendor list is labelled "Demo fixture" in muted text. The user explicitly asked for this visualization; we're scoping the fiction to the demo layer.

## Out of scope

- No interactive payment flow.
- No new `kind` data shapes, no changes to `rankQuotes.js` or `mostroNodes.json`.
- No changes to `/pay` page sections.
- No changes to `RampQuoteAggregator.svelte`.

## Validation

- `npm run dev` from `voyager/`, scroll to section 7.
  - Left column: eyebrow + H1 + lede + two labelled step blocks + two CTAs.
  - Right column: aggregator on left, vendor list on right (at md+). Below md they stack.
  - No layout shift vs. the prior version at lg breakpoint — both columns still ~equal height (slight bias: right taller because of vendor list).
- Check `voyager/package.json` for `lint` / `check` scripts (confirmed none earlier in the session — only `dev`, `build`, `preview`, `prepare`). Skip.
- Verify the two `Icon` props render (globe in violet, plane in coral).
- Verify the vendor pill tag's text reads "HOTEL" / "TOUR" / "DRIVER" in uppercase.

## Open questions

None. Ready to implement.
