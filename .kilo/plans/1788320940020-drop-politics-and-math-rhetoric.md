# Remove "politics" and rhetorical "math" copy from the site

## Context

The user reacted to the line "The protocol has no politics. It has math." on `/vendors` — it appears in the hero lede (line 19) and again as a closing line under "Why fair" (line 156) — and said: "this is horrible. do not mention politics or math basically."

Scope interpretation:
- Drop every literal instance of the word `politics` (it only appears in the two lines above).
- Drop every rhetorical / narrative use of the word `math` — places where it is used as a stand-in for "the protocol" or "the design". This includes the vendors hero, the EROI / security framing copy, and the pricing rubric phrasing.
- Keep technical / JS uses of `Math` (the global object) — those are not user-facing copy and do not violate the directive.
- Keep the EROI formula text inside the formula card on `/docs/voyager-pay-eroi-audit` (it literally is a math formula; "extractor_EROI = deliverable_surplus ÷ extraction_cost"). Renaming the variables to non-math vocabulary would break the lesson. The user's directive is about narrative copy, not teaching artifacts.
- Keep `<code>Math.round(...)</code>` etc. in JS — those are library calls, not narrative.

A grep baseline for `politic|math\b` already returned 30 hits under `voyager/src`. Filtering out JS `Math.*` usages leaves 13 narrative hits. The ones that follow are the entire scope.

## Files touched

All under `voyager/src/routes/`:

1. `vendors/+page.svelte` — line 19 (hero lede), line 124 (Why-fair lede), line 148 (step 3 title), line 156 (closing line under the ordered list).
2. `pay/+page.svelte` — line 93 (section title), line 98 (hero body inside the rubric box).
3. `pay/security/+page.svelte` — line 55 (Foundation lede), line 81 (EROI ribbon body), line 105 (outcome-card 2 body — contains the broken double "The math — the math" repetition; this rewrite also cleans that up).
4. `docs/what-is-eroi/+page.svelte` — line 43 (the "To change the math" sentence).
5. `docs/how-price-discovery-works/+page.svelte` — line 47 ("The wallet does the math").
6. `docs/voyager-pay-eroi-audit/+page.svelte` — line 31 (vault-vs-wallets example, "the math changes").

`pay/pricing/+page.svelte` has no narrative `math` hits; no edit.

## Specific replacements (high-confidence edits)

| File:line | Before | After |
|---|---|---|
| `vendors/+page.svelte:19` | "…the marketplace is designed to reward honest operators. The protocol has no politics. It has math." | "…the marketplace is designed to reward honest operators. The protocol makes the cost of taking value from the network higher than the value taken." |
| `vendors/+page.svelte:124` | `lede="The design refuses the failure modes that make platforms capturable. Three properties hold at the protocol layer — not as policy, as math."` | `lede="The design refuses the failure modes that make platforms capturable. Three properties hold at the protocol layer — not as a policy choice, as a property of the design."` |
| `vendors/+page.svelte:148` | `<h3 …>The math rewards honest operators.</h3>` | `<h3 …>Honest operators are rewarded.</h3>` |
| `vendors/+page.svelte:156` | "The protocol has no politics. It has math." | remove the line entirely (the lede above and the section as a whole already make the point) |
| `pay/+page.svelte:93` | `title="The math rewards honest operators."` | `title="Honest operators are rewarded."` |
| `pay/+page.svelte:98` | "…so the math stops working and extraction stops paying." | "…so extraction stops paying." |
| `pay/security/+page.svelte:55` | `lede="Voyager Pay isn't a platform that runs on trust. It's three open networks stitched together — and the math does the policing."` | `lede="Voyager Pay isn't a platform that runs on trust. It's three open networks stitched together — and the design does the policing."` |
| `pay/security/+page.svelte:81` | "Three structural properties: … **Binding** because the math doesn't let anyone rewrite history." | "Three structural properties: … **Binding** because the design doesn't let anyone rewrite history." |
| `pay/security/+page.svelte:105` | "HODL atomicity means the moment you pay fiat off-protocol and the vendor attests to receipt, the network releases the sats. No operator sits on the funds during a review. The math — the math either releases the funds or returns them." | "HODL atomicity means the moment you pay fiat off-protocol and the vendor attests to receipt, the network releases the sats. No operator sits on the funds during a review. The settlement is atomic — the protocol either releases the funds or returns them." |
| `docs/what-is-eroi/+page.svelte:43` | "To change the math, push one of these costs up before extraction begins." | "To change the outcome, push one of these costs up before extraction begins." |
| `docs/how-price-discovery-works/+page.svelte:47` | "The structural argument is this: … The wallet does the math. The customer sees the rank." | "The structural argument is this: … The wallet runs the ranking. The customer sees the result." |
| `docs/voyager-pay-eroi-audit/+page.svelte:31` | "…and the math changes. No single address publishes them all. Many separate paths in are needed. The same total value cannot be reached from one place at one time." | "…and the design changes. No single address publishes them all. Many separate paths in are needed. The same total value cannot be reached from one place at one time." |

Notes on judgement calls:
- `docs/voyager-pay-eroi-audit:22` keeps the formula text `extractor_EROI = deliverable_surplus ÷ extraction_cost` — it is a math identity in a code-style display block (`<p class="font-display text-2xl text-ink">`). The user's directive targets narrative copy; replacing the formula with non-math vocabulary would gut the lesson.
- `pay/+page.svelte:107` `title="Three properties a custodial rail can't give you."` does not contain "math" — kept.
- The rubric's `rankQuotes` references (`Math.round`, `Math.min` in `lib/ramp/rankQuotes.js`) are library calls, not narrative copy — kept.

## Validation

1. `grep -rn -i 'politic' voyager/src` returns 0 matches.
2. `grep -rn -E '\bmath\b' voyager/src | grep -v 'Math\.' | grep -v 'extractor_EROI'` returns 0 narrative matches. The formula line is excluded by the second grep.
3. `cd voyager && npx svelte-check --tsconfig ./jsconfig.json` — same baseline (1 pre-existing error in `lib/agent/index.ts:62`, 1 pre-existing warning in `routes/+page.svelte:553`). No new errors or warnings.
4. Read each edited sentence aloud: the page still teaches the same principle in positive voice; the rhetoric just stops invoking math as a character.

## Risks

- **Voice drift in the EROI framing.** Removing "the math" from sentences that previously leaned on it can leave the prose feeling softer. The replacements above use "the design" / "extraction stops paying" / "the protocol" — all consistent with the positive-principles voice established by the previous plan.
- **The `/vendors` step-3 title** changed from a punchy "The math rewards honest operators." to a flatter "Honest operators are rewarded." If that lands flat, swap to "The design favors the honest operator." / "Honest operators come out ahead."
- **Closing line at `vendors:156` is removed.** The hero lede already restates the same idea, so removing the closing line does not lose the principle; the section ends on the ordered list's three properties.