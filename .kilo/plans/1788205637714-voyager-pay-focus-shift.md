# Plan: Amp up the focus on Voyager Pay

## Goal

Shift Voyager Pay from "spec + one marketing page + one demo widget" to the **lead product story** of the site, without adding any real payments code. Three angles drive every change:

1. **Security by design** — outcomes first (your money can't be seized, no one can freeze you, no platform can deplatform you), with each outcome mapped to a structural property of the protocol.
2. **Fair competitive marketplace** — multiple independent Mostro nodes compete on rate, fee, and reputation; no operator can extract rent; the §7.4 rubric biases selection toward honest operators.
3. **Honesty about status** — Voyager Pay is design-stage, not shipped. Every new page must say so where it matters.

## Scope

**In scope**

- Rewriting the existing `/pay` page to lead with the security + marketplace narrative and route readers into new subpages.
- Rewriting the existing home-page Voyager Pay band copy (same slot, new angle).
- Adding four new pages:
  - `/pay/security` — plain-English explainer of the security outcomes.
  - `/pay/pricing` — explainer of how the federation produces low prices (with the existing ramp widget embedded or linked).
  - `/pay/node` — landing page for Mostro node operators.
  - `/docs/how-price-discovery-works` — new protocol-curious lesson on the price-discovery mechanism.
- Updating the docs index (`/docs/+page.svelte`) to list the new lesson.
- Updating the footer Product column with the three new `/pay/*` routes.

**Explicitly out of scope**

- Any real payments code, SDKs, wallet wiring, NWC, NIP-17, Mostro operator, relay, or persistence.
- Touch-points in `/plan` or `/preferences` — deferred.
- Header prominence changes (no rename, no extra nav item) — deferred.
- New design tokens, fonts, colors, components, or copy rubrics.
- Editing `vp.md`, `peak.json`, `coms.md`, or `Documentation/*` content beyond a single sentence if absolutely needed.
- Renumbering existing docs lessons (Lesson 1–8 stay where they are; new lesson is inserted without a number to avoid breaking inbound links).

## Constraints and conventions

- Svelte 5 runes, SvelteKit 2 file routing. No new dependencies.
- Reuse existing components: `Cta`, `SectionHeader`, `Icon`, `RampQuoteAggregator`.
- Class conventions: `mx-auto max-w-6xl px-6`, `bg-bone-100`/`bg-bone-200`, `rounded-[28px]`/`rounded-[32px]`, `font-display`, `eyebrow`, `text-ink`/`text-ink-2`/`text-muted`. No emojis.
- Keep voice consistent with `/pay` and `/docs/how-voyager-pay-works`: plain English, "no custody" not "trustless", outcomes before mechanism.
- Honor `coms.md` clear-communication rubric (C1–C7).
- No new fixture files. Reuse `$lib/data/mostroNodes.json` and `$lib/ramp/rankQuotes.js` as-is.

## Affected boundaries

- `voyager/src/routes/pay/+page.svelte` — rewritten hero + new "three audiences" segmenter; invariants/layers/flow/EROI/risks blocks kept.
- `voyager/src/routes/pay/security/+page.svelte` — new file.
- `voyager/src/routes/pay/pricing/+page.svelte` — new file.
- `voyager/src/routes/pay/node/+page.svelte` — new file.
- `voyager/src/routes/docs/how-price-discovery-works/+page.svelte` — new file.
- `voyager/src/routes/docs/+page.svelte` — append the new lesson to the protocol-curious block.
- `voyager/src/lib/components/Footer.svelte` — add three links under the Product column.
- `voyager/src/routes/+page.svelte` — rewrite only the home Pay band copy (hero ribbon unchanged, all other sections unchanged).

## Design decisions (resolved)

1. **Hero narrative of `/pay`**: Lead with a two-pillar headline — "secure by design" + "fair competitive marketplace" — and the existing five-invariants block below it acts as proof, not pitch. CTAs route to `/pay/security` and `/pay/pricing`.
2. **Three-audiences segmenter** sits between the hero and the invariants. It points travelers → `/pay/security`, price-sensitive buyers → `/pay/pricing`, operators → `/pay/node`. This is the through-line for the whole page.
3. **New subpages are siblings, not children.** They link to `/pay` and to each other but do not nest under it. URLs stay flat: `/pay/security`, `/pay/pricing`, `/pay/node`.
4. **`/pay/security` is outcome-led, not spec-led.** Top of page lists four outcomes in plain English ("Your money can't be seized", "No one can freeze you", "No platform can deplatform you", "You can switch wallets in a minute"). Below each outcome is one short paragraph naming the structural property that delivers it (no custody / HODL atomicity / pseudonymous keys + federated operators / user-controlled wallets + NWC). Bottom: short CTA to `/docs/voyager-pay-eroi-audit` and `/pay#risks`.
5. **`/pay/pricing` explains the mechanism.** Sections: (a) "Why a single operator charges more" — the captive-rent story, kept short; (b) "Why a federation of independent market makers charges less" — competition on rate/fee/reputation; (c) "How the wallet picks" — embed the existing `RampQuoteAggregator` widget so the reader can see the rubric run live; (d) "Why fees converge downward over time" — reputation rises with settled volume, so faking reputation is expensive; (e) honest out-of-scope note (no FX oracle, no settlement guarantee, the federation is small today).
6. **`/pay/node` is for operators, not users.** Sections: (a) "What a node does" — HODL-invoice arbiter, never touches fiat; (b) "What you publish" — a `kind:38383` profile (region, fiats, methods, fee %, HODL liquidity, contact pubkey); (c) "What it costs to run" — Lightning node capital, reputation seeding, modest infra; (d) "What's in it for you" — fee revenue + reputation accrual; (e) "Voyager's bootstrap node" — short paragraph on the Caribbean-tuned `voyager-caribbean` example already in the widget. CTA to `vp.md` §7 and to the operator section of `/docs/how-voyager-pay-works`.
7. **New docs lesson**: `How price discovery works on Voyager Pay`. Insert it after Lesson 8 in the existing protocol-curious block, **without a number**, to avoid renumbering. The lesson explains the §7.4 rubric in narrative form: why the weights (0.6/0.2/0.2) bias toward honest operators, how reputation accrues only with settled volume, why a single node cannot persistently undercut (it loses margin without reputation), and why the federation tends toward fees that converge on cost-plus-margin rather than rent extraction. Cross-link to `/pay/pricing` and `/pay#ramp`. Doc-curriculum decision (numbered vs unnumbered) is left to the implementer; recommend unnumbered to preserve Lesson 1–8 stability.
8. **Footer Product column** adds `Voyager Pay` (existing) + `Security by design` (`/pay/security`), `Fair pricing` (`/pay/pricing`), `Run a node` (`/pay/node`). Order is top-to-bottom narrative, not alphabetical.
9. **Home Pay band** is rewritten to lead with the two-pillar headline ("secure by design" + "fair marketplace") and ends with two CTAs: `How Voyager Pay works` → `/pay/security`, and `Why the prices are low` → `/pay/pricing`. The widget stays in its slot. The band's position (after testimonials, before docs band) is unchanged.
10. **Header navigation** is not changed (the user did not choose this option). `Voyager Pay` remains a single nav link.

## Implementation order

Implement in this order so each step has something concrete to verify against:

1. **`/pay/security`** — new page. Smallest scope, establishes the voice for the security narrative. Verify: page renders, voice matches `/pay`, cross-links resolve.
2. **`/pay/pricing`** — new page. Embeds the existing `RampQuoteAggregator`. Verify: widget still renders, "Why fees converge" copy is honest about scale (federation is small today).
3. **`/pay/node`** — new page. Operator-audience voice is different; verify it doesn't read like a sales pitch and is honest about capital + reputation requirements.
4. **`/pay`** — rewrite hero, add three-audiences segmenter, update CTAs, keep invariants/layers/flow/EROI/risks blocks. Verify: navigation from each segmenter lands on the right subpage; no broken anchors.
5. **`/docs/how-price-discovery-works`** — new lesson. Verify: rubric numbers (0.6/0.2/0.2) match `rankQuotes.js`; cross-links resolve.
6. **`/docs/+page.svelte`** — append new lesson to the protocol-curious block. Verify: appears in docs index.
7. **`Footer.svelte`** — add three links. Verify: links resolve, layout still fits at md breakpoint.
8. **`+page.svelte` (home)** — rewrite only the Pay band section. Verify: other home sections unchanged, band copy leads with both pillars.

## Linking graph (after changes)

- `/pay` → `/pay/security`, `/pay/pricing`, `/pay/node`, `#why`, `#invariants`, `#how-it-flows`, `#ramp`, `#risks`, `/docs`, `/docs/voyager-pay-eroi-audit`, `/plan`, `/`.
- `/pay/security` → `/pay#invariants`, `/pay#risks`, `/docs/voyager-pay-eroi-audit`.
- `/pay/pricing` → `/pay#ramp` (widget anchor), `/docs/how-price-discovery-works`, `/pay/node`.
- `/pay/node` → `/pay/pricing`, `/docs/how-voyager-pay-works`, `/pay/security` (to remind operator readers that operators are non-custodial).
- `/docs/how-price-discovery-works` → `/pay/pricing`, `/pay#ramp`.
- `/docs/+page.svelte` → `/docs/how-price-discovery-works` (new entry).
- `Footer.svelte` → `/pay/security`, `/pay/pricing`, `/pay/node`.
- Home Pay band → `/pay/security`, `/pay/pricing`.

## Data flow

No new data flow. Existing flow is preserved:

- `RampQuoteAggregator` reads `$lib/data/mostroNodes.json` and calls `$lib/ramp/rankQuotes.js`.
- All new pages are static route components with `<script>` blocks that import only existing components.

## Failure modes and mitigations

1. **Misleading marketing.** Risk: pages imply Voyager Pay is a working product. Mitigation: every new page carries the same "Demo fixture — no live network" or equivalent honesty line used in the existing ramp widget. The node page must be explicit that running a node today means running against the demo fixture, not a live network.
2. **Voice drift across new pages.** Risk: security/pricing/node pages read like they came from different products. Mitigation: copy review pass against the existing `/pay` and `/docs/how-voyager-pay-works` voice. Mirror phrases: "the protocol is the product", "no custody", "atomic with the network", "the wire format is the product", "anyone can run a node".
3. **Contradiction between `/pay/node` and the no-privileged-operator invariant.** Risk: operator page sounds like an endorsement. Mitigation: lead the page with the structural fact that operators are non-custodial market makers, not custodians; state it twice if needed. Cross-link to `/pay/security` so the operator reader sees the symmetric argument.
4. **Docs renumbering breaks inbound links.** Risk: renumbering Lesson 5–8 to make room for the new lesson. Mitigation: insert the new lesson without a number. If a number is required for curriculum flow, prefer Lesson 4b with a footnote in the lesson itself explaining the insert.
5. **Over-promising on price convergence.** Risk: "/pay/pricing" implies prices are guaranteed low. Mitigation: the "Why fees converge" section must be honest about scale (the demo fixture has 7 nodes; convergence is a structural argument, not an empirical claim at this size).
6. **Footer layout breaks.** Risk: adding three links to the Product column overflows at md breakpoint. Mitigation: cap product column to four links (the existing one + three new); if md layout shifts, drop one label to a single word.

## Validation

- All new pages render without console errors (`pnpm dev` and open each route).
- Every cross-link in the linking graph resolves to an existing route or anchor.
- `RampQuoteAggregator` still ranks the fixture nodes correctly after the `/pay/pricing` embed.
- Voice spot-check: each new page contains at least one phrase from the established voice list above.
- Honesty spot-check: each new page mentions at least one honest limit (demo / scale / out-of-scope).
- Docs index lists the new lesson.
- Footer Product column lists the three new links in the agreed order, layout intact at md and lg breakpoints.
- Home Pay band leads with both pillars and the widget is still present.

## Open questions

None at plan-finalize time. Two minor decisions left to the implementer:

- Whether the new docs lesson is numbered (e.g. Lesson 4b) or unnumbered. Recommendation: unnumbered.
- Whether `/pay/security` opens with a four-outcome list or a two-pillar headline followed by outcomes. Recommendation: two-pillar headline then four-outcome list, mirroring the home Pay band.

## Out-of-scope follow-ups (for a later plan)

- Header prominence bump (rename `Voyager Pay` link or add a secondary CTA).
- Touch-points in `/plan` and `/preferences`.
- Wire the ramp widget to a real Nostr relay query (`kind:38383`).
- Real NWC wallet-connect flow.
- Spec edits to `vp.md` extending §7 with operator-economics detail.