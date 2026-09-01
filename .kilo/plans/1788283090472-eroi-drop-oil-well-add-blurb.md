# Plan — Drop the oil-well framing; add an EROI design blurb on the Voyager Pay page

## Goal

Two changes, scoped tight:

1. **Remove every "oil well" / "applied to attackers instead of oil wells" framing** across the docs site and one Pay-page link. The phrase is lame. Replace each with a sentence that lands the security principle directly without the cringe detour through petroleum.
2. **Replace the §1 layered architecture section** on `voyager/src/routes/pay/+page.svelte` with a short EROI design blurb. Marketing one-liner tone. No docs link inside it. The existing §11 "EROI defense" cards and their `Read the full EROI audit` CTA stay untouched — that block already does the deeper work.

## Decisions (locked)

- Drop the term "oil well" entirely from the codebase. The EROI acronym stands on its own; the explanation now lives in the §2 "An attack is a business" paragraph of `what-is-eroi`, which already teaches the principle without the petroleum metaphor.
- The new Pay-page blurb is a marketing one-liner. No docs link inside it. The audit CTA in §11 still exists and is the path to depth. Voice: short, declarative, security-shaped.
- §11 EROI defense on Pay stays. The new top blurb introduces the rubric; §11 walks the three properties; the audit link is the third step. Three tiers, each progressively deeper, no overlap.
- Layered-architecture section (§1, `pay/+page.svelte:113-164`) is replaced wholesale. Its content (Wallets / Reference clients / Protocol / Fiat↔sats perimeter) is implementation-shape — it belongs in `how-voyager-pay-works` if it needs to live anywhere on the marketing surface, and that lesson already covers wire-level mechanics. So: remove from Pay, no replacement needed elsewhere.
- Update the in-page TOC at `pay/+page.svelte:67-77` so the EROI section gets an anchor entry. Drop the architecture entry (it no longer exists). Keep every other entry.
- Update the `Next up` cards on `what-is-eroi`, `why-systems-get-captured`, `voyager-pay-eroi-audit`, `how-voyager-pay-works` so none of them still pitch the oil-well framing.

## Files touched

1. `voyager/src/routes/docs/what-is-eroi/+page.svelte:14-16` — rewrite the hero lede so it stops at "Voyager uses it for attackers". Drop the oil-well line.
2. `voyager/src/routes/docs/+layout.svelte:13` — sidebar Lesson 5 `desc`.
3. `voyager/src/routes/docs/+page.svelte:81` — docs landing Lesson 5 card description.
4. `voyager/src/routes/docs/how-voyager-pay-works/+page.svelte:76` — `Next up` blurb for Lesson 5.
5. `voyager/src/routes/pay/+page.svelte:113-164` — replace §1 layered-architecture with the new EROI design blurb.
6. `voyager/src/routes/pay/+page.svelte:67-77` — TOC: drop the Architecture link; add an EROI anchor link that points to the new section.

No edits to: `what-can-still-go-wrong`, `how-voyager-pay-extends`, `how-price-discovery-works`, `pay/security/+page.svelte`, the three §11 property cards on Pay, or the audit-lesson body.

## New copy (the load-bearing text)

### `what-is-eroi` hero lede (replaces lines 14-16)

> EROI stands for Energy Return On Investment. Voyager borrows it for one purpose: modelling how much an attacker gets back for the effort they spend to take something from a system. The next sections teach the principle.

The existing §2 onward already teaches the principle without any petroleum reference. No other rewrites inside `what-is-eroi`.

### Sidebar / landing card / Next-up — replace oil-well phrasing

| Location | Old | New |
|---|---|---|
| `docs/+layout.svelte:13` (Lesson 5 `desc`) | "Energy Return On Investment, applied to attackers instead of oil wells." | "A security rubric: how much an attacker gets back for the effort they spend." |
| `docs/+page.svelte:81` (Lesson 5 landing card) | "Energy Return On Investment is a ratio used for oil wells. Voyager applies it to attackers instead. Three knobs and one formula." | "A security rubric: model the attacker as an economic actor and most of the design choices follow. One principle, three properties, one formula." |
| `docs/how-voyager-pay-works/+page.svelte:76` (`Next up` blurb for Lesson 5) | "Energy Return On Investment, applied to attackers instead of oil wells." | "A security rubric: model the attacker as an economic actor and most of the design choices follow." |

### New §1 EROI blurb on `pay/+page.svelte` (replaces lines 113-164)

```svelte
<!-- §1 EROI design blurb -->
<section class="mx-auto max-w-6xl px-6 pb-20">
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
</section>
```

Notes on the new blurb:
- Single section, no internal CTA. The audit CTA lives in §11 where the three property cards live.
- Lede is one sentence. Body paragraph is one sentence. The "marketing one-liner" tone the user asked for.
- Names the principle (rubric), the shape (push cost up structurally), and the three properties (Dispersion / pseudonymous / atomic) without getting into mechanics. Mechanics are §11's job.
- `SectionHeader` component already imported at the top of the file. No new imports.

### TOC update (`pay/+page.svelte:67-77`)

Old:
```
Why this exists · Design invariants · How a payment flows · The fiat ramp · Extends to anything · Risks & limits
```

New:
```
Why this exists · Design invariants · How a payment flows · The fiat ramp · Security rubric · Extends to anything · Risks & limits
```

The new "Security rubric" link uses `href="#security-rubric"`, so the new §1 section gets `id="security-rubric"` and `scroll-mt-20` to match the convention used by other anchored sections (`#why`, `#invariants`, `#how-it-flows`, `#ramp`, `#extends`, `#risks`).

## Validation

- `grep -rn -i "oil well" voyager/src` → 0 matches.
- `grep -rn -i "energy return on investment" voyager/src` → matches only inside the formal definition in `what-is-eroi` (kept — that is where EROI is defined) and any other place the acronym is being introduced. If any non-defining sentence still carries the phrasing, fix it.
- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev` and probe `/`, `/pay`, `/docs`, `/docs/what-is-eroi` — all `200`.
- Read the new Pay-page §1 blurb end-to-end. Confirm: no docs link inside it; one declarative lede; one short body paragraph; the audit CTA still lives in §11.
- Read `what-is-eroi` hero to confirm it stops at "the next sections teach the principle" with no petroleum detour.

## Risks

- Voice drift: the "oil well" line had been a load-bearing one-liner in three places. Replacing it with longer phrasing (e.g. the landing card) risks bloating the sidebar `desc`. Mitigation: keep sidebar `desc` to one sentence; keep landing-card body to one sentence; keep `Next up` blurb to one sentence.
- TOC order: moving Security rubric between "The fiat ramp" and "Extends to anything" might read oddly. The order is intentional — it follows the "how it flows / how it's shaped" narrative the page already has. The previous "Architecture" entry sat in roughly the same spot (post-invariants, pre-flow), so position is preserved.
- If the user later wants the layered architecture content back on the marketing surface, the right home is `how-voyager-pay-works` (it already walks wire-level mechanics). Out of scope for this plan; flag if asked.

## Out of scope

- No edits to `how-voyager-pay-works` body copy. Only the `Next up` blurb for Lesson 5 changes.
- No edits to `what-can-still-go-wrong`, `how-voyager-pay-extends`, `how-price-discovery-works`, `pay/security/+page.svelte`, `pay/node/+page.svelte`, `pay/pricing/+page.svelte`.
- No edits to the §11 EROI defense cards on Pay or to the audit-lesson body.
- No new components, no new imports beyond what the new §1 blurb already uses (`SectionHeader`).
- No URL changes, no redirects.