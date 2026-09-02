# Reframe security copy site-wide to teach positive principles

## Context

The user wants the entire site to teach the positive principles of security — no-custody, federated operators, pseudonymous keys, atomic settlement, user-controlled wallets, public ledgers — instead of referencing attackers, thieves, attacks, or other conflict vocabulary. The current copy on both sales pages (`/pay`, `/pay/security`, `/pay/pricing`, `/vendors`, `/`) and docs lessons (`/docs/what-is-eroi`, `/docs/why-systems-get-captured`, `/docs/voyager-pay-eroi-audit`, `/docs/how-voyager-pay-works`, `/docs/how-price-discovery-works`) leans on a "bad-actor frame": it explains the design by showing what an attacker can't do.

User decisions in this session:
- Scope: **site-wide**, including the docs lessons (the EROI acronym and the attacker-economic framing must be reframed, not deleted).
- Outcome-card titles on `/pay/security` flip to positive framings, and bodies rewrite to teach the structural property without conflict vocabulary.
- The `/pay` EROI section "Designed so attacking it is a bad business." is replaced entirely with positive-principles framing.

What the change is *not*: this is not a feature change. It is a vocabulary and framing change across the same page structures. No new components, no new sections, no layout changes, no new icons.

## Voice rules

Teach the principles directly. Use these positive terms and their synonyms:

- **No custody** — "the protocol holds nothing", "the network holds the funds", "value lives with the owner"
- **Federated** — "many operators", "competing peers", "an open network of equals", "anyone can run one"
- **Pseudonymous** — "your key is your identity", "no identity check at the protocol layer", "what you sign is who you are"
- **Atomic settlement** — "settlement completes in one step or it doesn't", "the math either releases the funds or returns them"
- **Open ledger / signed events** — "a public record anyone can verify", "signed by the holder"
- **User-controlled** — "you hold the key", "you sign the event", "you choose the wallet"

Avoid these terms everywhere they appear (replace, don't just delete):

`attack`, `attacker`, `attackers`, `attacking`, `thief`, `thieves`, `steal`, `stolen`, `hack`, `hacked`, `hacking`, `seize`, `seized`, `seizure`, `freeze`, `frozen`, `freezing`, `deplatform`, `deplatformed`, `deplatforming`, `risk`, `risks`, `risky`, `threat`, `threats`, `threaten`, `vulnerab*`, `exploit`, `malicious`, `breach`, `breaching`, `compromise`, `compromised`, `loot`, `bad actor`, `adversar*`, `attacker's`, `attacks`, `attacker pool`, `attacker budget`.

Allowed replacements and reframings:

- "an attack is a bad business" → "the design rewards good behavior" / "the math favors the honest operator"
- "attacker stops when EROI < 1" → "extraction stops being worth the cost" / "the budget for extraction isn't there" (EROI stays as a named formula; see below)
- "attacker pool" → "the pool of would-be extractors" / "anyone considering it"
- "attacker's cost runs higher than the loot" → "the cost of extraction runs higher than the gain"
- "take money out of it" → "extract value from the system" / "capture the value"
- "what an attacker needs to spend" → "what it costs to extract"
- "concentrated, visible, separable value" stays (this is a structural description, not a conflict word)

**EROI is the one acronym that has to stay** — Lesson 5 teaches what it stands for and uses it in its formula. We reframe *what EROI is about*, not *whether EROI is named*. The hero lede becomes: "EROI stands for Energy Return On Investment. Voyager borrows it for one purpose: modelling how much it costs to extract value from a system versus how much the extracted value is worth. When the cost is higher than the gain, extraction stops paying."

**HODL** stays as a term-of-art noun (the Lightning hold-invoice primitive). No rephrasing needed; it is a mechanism name, not a conflict word. Where it appears in defensive sentences ("a court can freeze the escrow"), rewrite the surrounding sentence to teach the principle ("settlement is atomic with the network — no escrow sits in a company's books").

**"Honest limits"** sections stay as labels — the term is about intellectual honesty, not conflict. Their content gets rephrased.

## Files touched

All under `voyager/src/routes/`:

1. `pay/+page.svelte` — hero, three-audience card copy, EROI section (replace title + lede + body), three property cards (Dispersion / Information / Coupling body text), five invariants copy, honest-limits band if any, final CTA.
2. `pay/security/+page.svelte` — hero lede, two-pillar copy, the new "Foundation" section copy (already condensed by the previous plan), four outcome cards (flip titles + rewrite bodies), honest-limits list, CTAs.
3. `pay/pricing/+page.svelte` — hero lede, "Captive rent" / "Competition" / "Convergence" section bodies, honest-limits list, next-up CTA.
4. `vendors/+page.svelte` — hero lede, three audiences copy, "Why fair" three-step ordered list (especially step 3 "Attacking it is a bad business" → positive framing), "What you keep" cards (especially "Your customers" body which mentions "Move cost is high because the loot won't move" — rewrite to positive framing).
5. `+page.svelte` (home) — hero eyebrow, second paragraph ("It keeps scammers out, and routes your booking to the vendors who actually deserve it."), any other flagged phrases.
6. `docs/+layout.svelte` — Lesson 5 `desc` ("A security rubric: how much an attacker gets back for the effort they spend.") and any others containing flagged terms.
7. `docs/+page.svelte` — Lesson 5 landing card `desc` and any others flagged.
8. `docs/how-voyager-pay-works/+page.svelte` — Lesson 4 body paragraph ("what would an attacker need to spend to take money out of it…") and "Next up" card for Lesson 5.
9. `docs/what-is-eroi/+page.svelte` — entire body. Reframe around extraction cost vs. deliverable surplus without naming attackers. The four sub-costs (Find / Reach / Hold / Move) stay as named concepts — they're not conflict words, they're structural costs. The "extractor_EROI" formula stays (rename to `extraction_EROI` for clarity). Closing paragraphs and target-profile card reword.
10. `docs/why-systems-get-captured/+page.svelte` — entire body. Replace "attacker" framing with "extraction" framing. The vault-vs-wallets and bearer-bond-vs-relationship-bound analogies stay (they're structural, not conflict). The "extractor" / "extraction" vocabulary replaces "attacker" / "attack" throughout.
11. `docs/voyager-pay-eroi-audit/+page.svelte` — entire body. The three property sections keep their headings (Spread the value / Hide what exists / Bind value to context). All "attacker" / "attacker's cost" references rewrite as "extraction cost" / "the cost of taking it". Final paragraph "Each of these raises the attacker's cost before the attack begins." → "Each of these raises the cost of extraction, paid in advance." Closing line "Hard to capture is the floor, not the ceiling." stays (descriptive).
12. `docs/how-price-discovery-works/+page.svelte` — Lesson body section "Why the weights bias toward honest operators" / "no persistent undercut" — reframe any conflict vocabulary. Honest-limits list rephrases "Fiat-rail reversals remain a residual risk." → "Fiat-rail reversals are an honest limit." or similar.

The `what-can-still-go-wrong` directory is already deleted (per the previous plan's Todo List).

## Specific replacements (high-confidence edits)

These are exact substitutions the implementation agent should perform unless context demands a fuller rewrite.

| File:line | Before | After |
|---|---|---|
| `pay/+page.svelte:22` | "No platform can deplatform you." | "No platform in the middle." |
| `pay/+page.svelte:38` | "without losing your money to a frozen card or a deplatformed account" | "without losing your money to a frozen card" (reworded: "without handing your balance to a custodian that can freeze it") |
| `pay/+page.svelte:84` | "Each one can fail, freeze, or disappear." | "Each one can fail, pause, or exit." |
| `pay/+page.svelte:93` | `title="Designed so attacking it is a bad business."` | `title="The math rewards honest operators."` |
| `pay/+page.svelte:94` | lede — "make the attacker's cost structurally higher than the loot" | "make the cost of extraction structurally higher than the gain" |
| `pay/+page.svelte:98` | "Attackers are economic actors. They spend to extract. … most move on." | "The cost of extraction is set by the design. … extraction stops paying." |
| `pay/+page.svelte:106` | "We think this design is hard to attack." | "We think this design rewards the honest operator." |
| `pay/+page.svelte:116` | "No single node, relay, or vendor is worth breaching. The attacker has to compromise N different things in N different jurisdictions." | "No single node, relay, or vendor is worth targeting on its own. Reaching the whole network means reaching N operators in N jurisdictions." |
| `pay/+page.svelte:130` | "Stolen credentials are revocable. Move cost is high because the loot won't move." | "Credentials are revocable. Detached value loses worth — it won't move without its rightful context." |
| `pay/security/+page.svelte:36` | "There is no company in the middle that can be pressured, hacked, or seized." | "There is no company in the middle to begin with." |
| `pay/security/+page.svelte:62` | "Changing history costs more than you can steal." | "Changing history costs more than anything you'd take from it." |
| `pay/security/+page.svelte:68` | "Fast payments stacked on that ledger, sealed with one-way locks no thief can reopen." | "Fast payments stacked on that ledger, sealed with one-way locks only the recipient can open." |
| `pay/security/+page.svelte:81` (EROI ribbon) | "Three ways an attacker has to lose: Dispersion … Opacity … Binding" | "Three structural properties: **Dispersion** … **Opacity** … **Binding**" (drop the "ways an attacker has to lose" prefix) |
| `pay/security/+page.svelte:96-110` | Four outcome cards: flip titles + bodies | New positive titles (see below) + body rewrite |
| `pay/security/+page.svelte:132` | "Four residual risks remain." | "Four honest limits remain." |
| `pay/security/+page.svelte:136` | `<Cta variant="secondary" href="/pay#risks">See the risks</Cta>` | `<Cta variant="secondary" href="/pay#extends">See the open design</Cta>` (rename anchor too — see `pay/+page.svelte:225` `#extends` → keep name; the anchor moves conceptually to "extends", which already covers the openness story) |
| `pay/pricing/+page.svelte:38` | "The customer is captive not because the platform is malicious — it might be perfectly polite — but because the structural position lets it extract rent without losing volume." | "The customer has nowhere else to go. The structural position lets the platform charge what the market will bear." |
| `vendors/+page.svelte:19` | "the marketplace is designed so attacking it is a bad business. The protocol has no politics. It has math." | "the marketplace is designed to reward honest operators. The protocol has no politics. It has math." |
| `vendors/+page.svelte:139-141` (step 2 "No one can deplatform you.") | Title "No one can deplatform you." + body mentions relays | Title "Your listings live anywhere." + body unchanged (already positive) |
| `vendors/+page.svelte:148-150` (step 3 "Attacking it is a bad business.") | Title "Attacking it is a bad business." + body "The same EROI rubric … The attacker's cost runs structurally higher than the loot." | Title "The math rewards honest operators." + body "The same extraction-cost rubric Voyager Pay was built against applies here. The cost of taking value from the network runs structurally higher than the value taken." |
| `vendors/+page.svelte:298-299` (Your keys) | "No one can revoke your listings, freeze your stall, or delete your history." | "No one else can revoke your listings, pause your stall, or rewrite your history." |
| `vendors/+page.svelte:316` (Your customers) | "Move cost is high because the loot won't move." | "Detached value loses worth — it can't be redirected without its rightful context." |
| `+page.svelte:85` (hero) | "It keeps scammers out, and routes your booking to the vendors who actually deserve it." | "It routes your booking to the vendors who actually deserve it — no middleman taking a cut or freezing the funds." |
| `docs/+layout.svelte:16` | Lesson 5 `desc`: "A security rubric: how much an attacker gets back for the effort they spend." | "A security rubric: how much it costs to extract value from a system, set against how much the extracted value is worth." |
| `docs/+page.svelte:81` | Lesson 5 landing card `desc`: "Model the attacker as an economic actor and most design choices follow." | "Model extraction as an economic problem and most design choices follow." |
| `docs/how-voyager-pay-works/+page.svelte:63` | "what would an attacker need to spend to take money out of it" | "what it would cost to extract value from it" |
| `docs/how-voyager-pay-works/+page.svelte:73` | "Model the attacker as an economic actor and most design choices follow." | "Model extraction as an economic problem and most design choices follow." |
| `docs/what-is-eroi/+page.svelte:15` | lede — "modelling how much an attacker gets back for the effort they spend to take something from a system" | "modelling how much it costs to extract value from a system, set against how much the extracted value is worth" |
| `docs/what-is-eroi/+page.svelte:21` | `<h2 id="an-attack-is-a-business">An attack is a business</h2>` | `<h2 id="extraction-is-an-economics-problem">Extraction is an economics problem</h2>` |
| `docs/what-is-eroi/+page.svelte:23` | "Attackers are economic actors. They spend money, time, and operational effort to extract value. They stop when the math stops working — when what they walk off with is less than what they spent to take it." | "Extraction costs money, time, and operational effort. It stops being worth the spend when the deliverable surplus falls below the cost of taking it." |
| `docs/what-is-eroi/+page.svelte:26` | "Push their cost up structurally and most of them leave. Patch the alarm and they just add the alarm to their budget; detection only changes the probability of getting caught, not whether the attack pays on average." | "Push the cost of extraction up structurally and most of it stops happening. Patch the alarm and the alarm just becomes another line item; detection only changes the probability of being noticed, not whether extraction pays on average." |
| `docs/what-is-eroi/+page.svelte:32` | `<h2 id="the-four-costs">The four costs an attacker pays</h2>` | `<h2 id="the-four-costs">The four costs of extraction</h2>` |
| `docs/what-is-eroi/+page.svelte:34` | "Capture cost isn't one number. It's the sum of four sub-costs the attacker has to pay before walking off with anything:" | "Extraction cost isn't one number. It's the sum of four sub-costs paid in advance of any value taken:" |
| `docs/what-is-eroi/+page.svelte:38` (Reach li) | "credential theft, social engineering, breaching a perimeter." | "credentials, social engineering, or a direct path in." |
| `docs/what-is-eroi/+page.svelte:40` (Move li) | "Extracting value out of the system without it being reversed, confiscated, or traceable." | "Carrying value out of the system without it being reversed, reclaimed, or traced." |
| `docs/what-is-eroi/+page.svelte:43` | "Defenders who only add alarms after the fact often find the move cost is still low — the attacker already has the loot in hand by the time the page goes out. To change the math, you have to push one of these costs up before the attack begins." | "Operators who only add alarms after the fact often find the move cost is still low — value is already in hand by the time the alarm goes out. To change the math, push one of these costs up before extraction begins." |
| `docs/what-is-eroi/+page.svelte:52` | "Find and hold cost rise because no single target is worth breaching — the attacker has to compromise N different things in N different jurisdictions to get the whole pie." | "Find and hold cost rise because no single target is worth reaching on its own — the whole pie means reaching N operators in N different jurisdictions." |
| `docs/what-is-eroi/+page.svelte:55` | "Find and reach cost rise because the attacker has nothing to point at — order traffic is opaque, counterparties are pseudonymous, and there is no identity dossier to steal." | "Find and reach cost rise because there is nothing to point at — order traffic is opaque, counterparties are pseudonymous, and there is no identity dossier to read." |
| `docs/what-is-eroi/+page.svelte:64` | `extractor_EROI = deliverable_surplus ÷ capture_cost` | stays as the named formula (the math is the principle; renaming the variable on the left would obscure the acronym) — but rename `capture_cost` to `extraction_cost` in surrounding prose |
| `docs/what-is-eroi/+page.svelte:66` | "If an attacker's EROI is below 1, the attack is unprofitable on average and most attackers move on. If it's above 1, the attack is a business — and the system will be attacked for as long as that ratio holds." | "If extraction's EROI is below 1, extraction is unprofitable on average and most of it stops. If it's above 1, the system is open to extraction for as long as that ratio holds." |
| `docs/what-is-eroi/+page.svelte:73` | "anything below (2, 2, 2) means at least one cost is low enough that an EROI above 1 budget exists for some attacker" | "anything below (2, 2, 2) means at least one cost is low enough that an EROI above 1 budget exists for some would-be extractor" |
| `docs/why-systems-get-captured/+page.svelte:23` | "Attackers are not irrational. They spend on capture cost when they expect the deliverable surplus to exceed the cost. … there is a strategy whose EROI is at or above one. … As long as the formula allows it, attackers keep showing up." | "Extraction is not irrational. The cost is paid when the deliverable surplus is expected to exceed it. … there is a strategy whose EROI is at or above one. … As long as the formula allows it, extraction keeps happening." |
| `docs/why-systems-get-captured/+page.svelte:26` | "As long as EROI stays above one, alarms just become a cost of doing business." | "As long as EROI stays above one, alarms are just another line item in the extraction budget." |
| `docs/why-systems-get-captured/+page.svelte:31` | "An attacker with a van and a drill runs a positive EROI." | "Anyone with a van and a drill runs a positive EROI." |
| `docs/why-systems-get-captured/+page.svelte:34` | "Same total value. Much higher capture cost." | "Same total value. Much higher extraction cost." |
| `docs/voyager-pay-eroi-audit/+page.svelte:23` | "An attack is a budget problem for the attacker. If what they have to spend to take the value is more than the value itself, they move on. Push each cost up before the attack begins and most attackers leave." | "Extraction is a budget problem. If what it costs to take the value is more than the value itself, extraction stops. Push each cost up before extraction begins and most of it doesn't." |
| `docs/voyager-pay-eroi-audit/+page.svelte:38` | "The attacker's budget grows with every operator they would have to compromise." | "The extraction budget grows with every operator that would have to be reached." |
| `docs/voyager-pay-eroi-audit/+page.svelte:52` | "The attacker has nothing to point at." | "There is nothing to point at." |
| `docs/voyager-pay-eroi-audit/+page.svelte:66` | "The loot is no longer loot." | "Detached value is no longer valuable." |
| `docs/voyager-pay-eroi-audit/+page.svelte:117` | "If one connection is stolen, it can be revoked without losing the rest." | "If one connection is compromised, it can be revoked without losing the rest." |
| `docs/voyager-pay-eroi-audit/+page.svelte:122` | "Each of these raises the attacker's cost before the attack begins." | "Each of these raises the cost of extraction, paid in advance." |
| `docs/voyager-pay-eroi-audit/+page.svelte:127` | "Hard to capture is the floor, not the ceiling." | "Hard to extract value from is the floor, not the ceiling." |
| `docs/how-price-discovery-works/+page.svelte:65` | "Settlement is atomic with the network, not with the operator. Fiat-rail reversals remain a residual risk." | "Settlement is atomic with the network, not with the operator. Fiat-rail reversals are an honest limit of the demo fixture." |

The grep below defines the negative vocabulary exhaustively; any match not in the table above is the implementation agent's responsibility to handle with a sentence-level rewrite that preserves the original meaning in positive voice.

## Discovery sweep (grep baseline)

The implementation agent should run this grep before starting and after each major edit to track remaining instances:

```
rg -n -i -w 'attack|attacker|thief|steal|stealable|hack|hacked|seiz|seize|frozen|freeze|deplatform|risk|risks|risky|threat|threaten|vulnerab|exploit|malicious|breach|compromise|loot|adversar' voyager/src
```

Then a second pass on:
```
rg -n -i 'attacker|attackers|attacker\'s' voyager/src/routes/docs
```

Target: 0 matches of all of: `attackers`, `attacker`, `attacker pool`, `attacker's`, `attackers'`, `attacker budget`, `threat`, `threats`, `vulnerab`, `loot`, `thief`, `steal`, `stealable`, `hacked`, `breach`, `deplatform`, `malicious`, `adversar` after the rewrite. The four outcome-card titles on `/pay/security` flip to:
- "Your money stays yours." (was "Your money can't be seized.")
- "Settlement is yours to finish." (was "No one can freeze you.") — or simpler: "You finish the trade."
- "You pick your own platform." (was "No platform can deplatform you.")
- "Your wallet, your choice." (was "You can switch wallets in a minute.")

## Validation

1. `cd voyager && npx svelte-check --tsconfig ./jsconfig.json` — expect same baseline (1 pre-existing error in `lib/agent/index.ts:62`, 1 pre-existing warning in `routes/+page.svelte:553`). Any new error/warning is a regression.
2. `rg -n -i -w 'attack|attacker|thief|steal|hack|seiz|seize|frozen|freeze|deplatform|threat|vulnerab|exploit|malicious|breach|loot|adversar' voyager/src` returns 0 matches across the routes directory.
3. Read each edited route aloud: every page's narrative stays in positive-principles voice; no sentence invokes a would-be adversary or conflict.
4. The EROI acronym, the four sub-costs (Find / Reach / Hold / Move), and the three properties (Spread the value / Hide what exists / Bind value to context) all stay intact — only their surrounding prose changes.
5. HODL appears where it always did as a mechanism noun. "Honest limits" sections keep their label.
6. Mobile: no layout changes — same cards, same widths, same overflow behavior.

## Risks

- **Voice drift.** The four outcome-card titles flip from a punchy negative ("can't be seized") to a positive ("stays yours"). The positive version reads slightly softer; if it lands flat, swap to "Settlement is yours." / "You stay free to move." / "You pick the platform." / "Switch wallets in a minute."
- **EROI acronym stays** — the implementation agent should not rename or delete it; the lesson teaches the principle through the acronym.
- **`/pay#risks` anchor** — the "See the risks" CTA on `/pay/security` originally linked to `/pay#risks`. That anchor does not exist on the current `/pay` page (`#extends` is the closest semantic match). Rename the CTA link to `/pay#extends` and reword to "See the open design" so it points at the existing structural-features section.
- **Markdown / spec files** under `Documentation/` (e.g. `eroi.md`, `rubricsmore.md`, `vp.md`, `voyager.md`) contain many flagged terms but are NOT shipped to the site — they are upstream reference documents. The user said "site-wide" but those are not the site. The implementation agent should leave them. If the user wants them edited too, that's a separate pass.
- **Plan-file references.** `.kilo/plans/*.md` files contain many quoted strings from old copy. They are historical records. Do not touch them.
