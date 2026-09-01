# Plan — Merge "Security rubric" + "EROI defense" into one section on the Voyager Pay page

## Goal

Combine the two EROI blocks on `pay/+page.svelte` into a single section. Keep both design elements (the blurb + the three property cards + the audit CTA) verbatim. Move the combined block to **above the design invariants section**. One `<section>` wrapper, one anchor (`#security-rubric`).

## Decisions (locked)

- **Single `<section>` wrapper.** `id="security-rubric"`, `scroll-mt-20`, `pb-20`. The rubric anchor lives once on the outer wrapper.
- **Position: above the design invariants section.** Currently §1 EROI design blurb sits at `pay/+page.svelte:114-126` and §11 EROI defense sits at `pay/+page.svelte:191-224`. Both move up to sit between the TOC (line 68) and `<!-- §0 five design invariants -->` (currently line 89). After the move the page order is: Why this exists → **merged EROI section** → Design invariants → How a payment flows → The fiat ramp → Extends to anything → Risks & limits.
- **Keep both design elements verbatim.** §1's SectionHeader, §1's body card (the bone-100 paragraph), §11's SectionHeader, the "Read the full EROI audit" CTA, and the three property cards (Dispersion / Information / Coupling) all survive unchanged. No copy edits in this plan.
- **TOC order shifts one slot.** Currently: `Why this exists · Design invariants · How a payment flows · The fiat ramp · Security rubric · Extends to anything · Risks & limits`. After: `Why this exists · Security rubric · Design invariants · How a payment flows · The fiat ramp · Extends to anything · Risks & limits`. Only the `Security rubric` `<li>` moves — from between "The fiat ramp" and "Extends to anything" to between "Why this exists" and "Design invariants". Same `href="#security-rubric"`, same class string, same `text-ink underline underline-offset-4 decoration-[1.5px]` styling.
- **§1's body paragraph's reference to "settlement is atomic with the network" stays.** It is a marketing one-liner, not a mechanics claim. The user explicitly rejected editing this copy. The forward reference (the mechanics live in §6) is accepted.
- **No edits outside `pay/+page.svelte`.** No edits to other docs, no edits to `+layout.svelte`, no edits to the audit page, no edits to §0 / §6 / §7 / §12.

## Files touched

`voyager/src/routes/pay/+page.svelte` only. Three edits:

1. **TOC reorder** (lines 70-76): move the `Security rubric` `<li>` from line 74 to between the `Why this exists` and `Design invariants` entries.
2. **Delete the old §1 block** (lines 114-126): the `<!-- §1 EROI design blurb -->` comment and the entire 13-line `<section id="security-rubric">...</section>`.
3. **Delete the old §11 block** (lines 191-224): the `<!-- §11 EROI defense -->` comment and the entire 34-line `<section>...</section>` (the one without an id).
4. **Insert the merged section** in a new location: directly before `<!-- §0 five design invariants -->` (currently line 89). Comment reads `<!-- §1 + §11 merged EROI section -->`.

## New merged section (the load-bearing text)

```svelte
<!-- §1 + §11 merged EROI section -->
<section id="security-rubric" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Security rubric"
		title="Designed so attacking it is a bad business."
		lede="Voyager Pay is shaped by a single rubric: make the attacker's cost structurally higher than the loot. No custodian, no central listing, no identity dossier — every design choice flows from that."
	/>
	<div class="mt-10 rounded-[28px] bg-bone-100 p-8">
		<p class="text-lg leading-relaxed text-ink-2">
			Attackers are economic actors. They spend to extract. Voyager Pay pushes their cost up structurally — value is dispersed across many independent operators, counterparties are pseudonymous, settlement is atomic with the network — so the math stops working for them and most move on.
		</p>
	</div>

	<div class="mt-20">
		<SectionHeader
			eyebrow="EROI defense"
			title="Three properties a custodial rail can't give you."
			lede="We think this design is hard to attack. The next section lists the risks that remain anyway."
		/>
		<div class="mt-6">
			<Cta variant="tertiary" href="/docs/voyager-pay-eroi-audit">Read the full EROI audit</Cta>
		</div>
		<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
			<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
				<Icon name="bolt" tone="sky" size={28} />
				<h3 class="font-display text-xl text-ink leading-tight">Dispersion</h3>
				<p class="text-sm leading-relaxed text-ink-2">
					Value is spread across many independent operators. No single node, relay, or vendor is worth breaching. The attacker has to compromise N different things in N different jurisdictions.
				</p>
			</article>
			<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
				<Icon name="chat" tone="violet" size={28} />
				<h3 class="font-display text-xl text-ink leading-tight">Information</h3>
				<p class="text-sm leading-relaxed text-ink-2">
					Order traffic is gift-wrapped. Relays see encrypted blobs, not counterparties. There is no KYC tier inside the protocol — trust lives in signed events, not identity dossiers.
				</p>
			</article>
			<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
				<Icon name="lock" tone="coral" size={28} />
				<h3 class="font-display text-xl text-ink leading-tight">Coupling</h3>
				<p class="text-sm leading-relaxed text-ink-2">
					Settlement is atomic. A counterparty can fail, but they cannot take the sats and not deliver the fiat. Stolen credentials are revocable. Move cost is high because the loot won't move.
				</p>
			</article>
		</div>
	</div>
</section>
```

**Spacing note.** The inner `<div class="mt-20">` wrapper is what gives the second `SectionHeader` (EROI defense) visual breathing room from §1's body card. The two `SectionHeader`s are siblings inside one `<section>`, so the outer `pb-20` is preserved (no double padding). The previous spacing between the two blocks on the old page was: §1 had `pb-20`, §11 had `pb-20`, but with multiple other sections between them — total visible gap was the sum of those plus inter-section whitespace. The new `mt-20` on the inner wrapper is the closest in-section equivalent. If it looks too tight or too loose on the rendered page, bump to `mt-24` or drop to `mt-16`.

**Why a `<div class="mt-20">` wrapper around the §11 content and not a nested `<section>`.** A nested `<section>` would introduce a second landmark element, a second focus target, and break the "one section" intent. A plain `<div>` is the right visual-but-not-semantic separator.

## Validation

- `grep -n "security-rubric" voyager/src` → exactly one `id="security-rubric"` (in the merged section) and one `href="#security-rubric"` (in the TOC).
- `grep -n "Designed so attacking it is a bad business" voyager/src` → one match.
- `grep -n "Three properties a custodial rail" voyager/src` → one match.
- `grep -n "§1 EROI design blurb" voyager/src` → zero matches (the old comment is gone).
- `grep -n "§11 EROI defense" voyager/src` → zero matches (the old comment is gone).
- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev` and probe `/pay` → 200. Read the rendered HTML for `/pay` and confirm: TOC has 7 links in the new order; one `<section id="security-rubric">` exists; both SectionHeaders render in order; all three property cards present; "Read the full EROI audit" CTA present and links to `/docs/voyager-pay-eroi-audit`.
- Click the `#security-rubric` link in the rendered TOC and confirm the jump lands on the merged section's top (scroll-mt-20 still in effect).
- Confirm no orphan text from the deleted blocks appears anywhere else on the page (none should — these blocks were only on `pay/+page.svelte`).

## Risks

- **Spacing regression.** Two SectionHeaders stacked under one `<section>` with `mt-20` between them may render tighter than the old cross-section spacing. Mitigation: `mt-20` is the starting point; tune to `mt-24` / `mt-16` if it looks wrong in the dev preview. Not blocking — purely cosmetic.
- **TOC click target.** The `#security-rubric` link now jumps to a section that starts higher on the page. Sticky-offset behaviour is unchanged (`scroll-mt-20` is preserved on the outer wrapper). No expected regression, but worth a visual check.
- **Diff noise.** Three edits in one file plus a delete-then-insert pattern will produce a larger diff than the prior plan. The text content is unchanged, so reviewers should focus on placement, not copy.

## Out of scope

- No copy edits to either block.
- No edits to `+layout.svelte`, no edits to docs pages, no edits to the audit lesson.
- No new components, no new imports. `SectionHeader`, `Icon`, `Cta` are all already imported at the top of the file (lines 1-5 area).
- No URL changes, no redirects, no anchor renames.
- The §0 five design invariants section stays exactly where it is and exactly as it is. The user explicitly flagged this.