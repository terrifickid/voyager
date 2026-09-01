# Rubric: Structural EROI Defense

This rubric evaluates any project, system, organization, or asset for its **resistance to
capture**. Resistance is measured as the inverse of any hypothetical extractor's EROI
(Energy Return On Investment) against the system. We optimize only for **low EROI** — we
do not try to enumerate who the extractor is, what tools they have, or what their motive
is. Any sufficiently motivated extractor — a tax authority, a military, a creditor, a
thief, a hacker, a hostile acquirer, a bureaucratic process — faces the same physics.

This rubric works in two directions:

- **Audit**: score an existing system. Output = current exposure profile.
- **Generate / modify**: guide the design or restructuring of a system to reach the target profile.

---

## 1. The Irreducible Formula

```
extractor_EROI  =  deliverable_surplus / capture_cost

capture_cost    ∝  sum over each accessible unit of value:
                   ( cost to find it
                   + cost to reach it
                   + cost to hold it
                   + cost to move it to the extractor's usable store )
```

EROI < 1 means the extractor consumes more capturing the asset than the asset yields.
Any system can be moved toward this threshold by manipulating three **structural
knobs**. All defense reduces to these knobs; every historical defense pattern is a
product of them.

### 1.1 The three knobs

| Knob                      | Definition                                                                                              | What it does to the formula                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Fan-out (dispersion)**  | Value is split across many small, spatially or logically separated units                                | Raises per-unit moves; extractor's fixed costs amortize worse                      |
| **Opacity (information)** | Extractor cannot see, price, or classify the value without expending effort                             | Raises per-unit find-cost; extractor cannot prioritize                             |
| **Binding (coupling)**    | Value does not survive detachment from its context, or requires coordination with many others to detach | Raises sever-cost per unit; forces bulk action with social/legal/physical friction |

A system is **hard to consume** when, for any plausible extractor,
`capture_cost > accessible_value`, achieved by high scores on one or more knobs.

### 1.2 The four structural forms

The three knobs manifest in four observable structural forms. A well-defended system
usually exhibits at least two of them, and the strongest defenses stack three or four.

| Form            | Dominant knob                | One-line shape                                                                         | Fingerprint question                                                            |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Marbled**     | Fan-out                      | Value dispersed finely through a host matrix; no clean piece to grab                   | "Can I point at the high-value unit and remove it cleanly?"                     |
| **Lattice**     | Binding                      | Value locked in a graph; removing a piece requires severing many relations             | "How many independent relationships must be severed to take one unit?"          |
| **Chameleon**   | Opacity                      | Value exists but lacks a form, ticker, registry, or category the extractor can process | "Does an appraisal form, market ticker, or regulatory category exist for this?" |
| **Pre-claimed** | Binding (via prior claimant) | Asset already encumbered by a claimant the extractor won't want to fight               | "Who would have to be fought or compensated to take this?"                      |

---

## 2. Audit Protocol (score a system as it stands)

For the target system, walk its asset inventory and score each major asset class
against the three knobs, 0–3 each. Then aggregate.

### 2.1 Scoring scale (per knob, per asset class)

- **3** — Strong. The knob is structurally embedded. Removing it would require rebuilding the system.
- **2** — Moderate. The knob exists but can be bypassed or unwound in a single step.
- **1** — Weak. Token or accidental. A motivated extractor will route around it.
- **0** — Absent. The system has the opposite property (e.g., for fan-out: a single concentrated vault).

### 2.2 Per-asset assessment

For each significant asset class held by the system, ask:

**Fan-out (F):**

- How many discrete units is this asset's value split across?
- How geographically / jurisdictionally / logically separated are they?
- What fraction of total value sits in the single largest unit? (lower is better)

**Opacity (O):**

- Is there a public registry, ledger, database, or report that inventories this asset?
- Does a standardized category, form, or ticker describe it?
- Could a third party estimate total value within one order of magnitude from public data?

**Binding (B):**

- Does the value depend on surrounding relationships (contracts, people, processes,
  soil, infrastructure) such that removing it destroys most of its value?
- How many counterparties must consent to a transfer?
- Is the asset already pledged, licensed, or committed elsewhere?

### 2.3 Aggregate scoring for the system

For each knob, compute the **weighted score**: the asset weights × per-asset scores,
where weights are the fraction of total system value in each asset class. A single
high-value asset scoring 0 on a knob dominates the aggregate.

```
SystemKnobScore(knob) = Σ_over_assets (asset_value_fraction × knob_score)
```

Each knob score is capped at 3. The overall defense is measured as:

```
Defense_Profile = ( F, O, B )     — three numbers, each in [0, 3]
```

### 2.4 Reading the profile

| Profile shape                | Interpretation                                                                                                                                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **F≥2, O≥2, B≥2**            | Structurally defended. EROI < 1 against almost any realistic extractor.                                                                                                                                                 |
| **One knob 0**, others ≥2    | Defended against the class of attack that knob fails on, but the other two do the work. Acceptable if the weak knob is not the one your most plausible threat attacks (you may not know which that is — treat as risk). |
| **Two knobs ≤1**             | Significant exposure. A motivated extractor with the right tool finds a path.                                                                                                                                           |
| **Any knob 0 and others ≤1** | Effectively open. EROI ≥ 1 in most scenarios.                                                                                                                                                                           |
| **All three ≤1**             | Concentrated, visible, severable: the classical "seizable surplus" pattern.                                                                                                                                             |

The recommendation threshold is: **no knob should score below 2** before a system
handles meaningful value.

### 2.5 The exposure matrix

To visualize: lay assets as rows, knobs as columns. Cells are 0–3. High-value rows
with low cells are the **capture surface** — where an extractor's numerator is largest
relative to their denominator. Remediation focuses there first.

| Asset | Value wt | F   | O   | B   | Comment |
| ----- | -------- | --- | --- | --- | ------- |
| ...   | ...      | .   | .   | .   |         |

---

## 3. Generation Protocol (build to target)

When designing a new system intended to hold value:

### 3.1 Default target profile

Aim for **(F≥2, O≥2, B≥2)** on every asset class that will hold >10% of the system's
aggregate value at steady state. Lower on long-tail assets is acceptable.

### 3.2 Default design moves per knob

**Fan-out levers (raise F)**

- Split custody of any liquid asset across N ≥ 3 independent custodians in separate
  jurisdictions or administrative realms
- Split ownership entities — no single entity holds >30% of aggregate value
- Disperse physical assets over space; avoid central warehouses
- Prefer streaming income over accumulated stockpiles; sweep rather than pile

**Opacity levers (raise O)**

- Favor asset forms without a standardized registry, ticker, or appraisal category
- Avoid reporting centralized inventories of the asset; if forced to report,
  report at aggregation levels that don't reveal unit-level composition
- Use bespoke contracts over standardized instruments where feasible
- Keep internal accounting legible only to operators, not to casual inspection

**Binding levers (raise B)**

- Tie asset value to processes, relationships, or physical context it can't be
  detached from without losing most value
- Multi-party consent requirements for any transfer (multi-signature, board votes,
  owner-approval thresholds)
- Pre-claim: encumber with liens, licenses, covenants that a capturer must respect or
  fight
- Invest in irreversible accumulated structure (soil, customer graph, reputation,
  trained team) over portable inventory

You do not need all levers. Two strong levers per knob is usually sufficient.

### 3.3 Non-negotiable invariants (any structure)

1. **No single point of custody.** Any asset whose capture is a single-action event
   (one key, one signature, one warehouse, one account) is a ribeye on a plate.
2. **No standardized inventory in public.** If a public record lists what you have,
   the find-cost for any extractor drops to near zero.
3. **No concentrated liquid pool.** Idle cash or commodity stock in one place is
   always capturable; flow beats pile.
4. **Recoverability.** The structure must still function for its legitimate owners.
   A defense that makes the asset unusable by you is indistinguishable from having
   lost it already.

### 3.4 Pitfalls

- **Security theater:** spending on visible locks while leaving the asset in one
  shape that a court order or a single dishonest insider can take.
- **Opacity theater:** claiming obscurity while filing the same public reports.
- **Binding overfit:** multi-signature schemes that nobody can actually operate in
  a normal workday; they get bypassed and the bypass is the attack surface.
- **Marble that reassembles:** dispersed assets that automatically settle back
  into one account daily — the fan-out is cosmetic.
- **Premature declaration:** calling a system defended before any asset class is
  actually storable in it.

---

## 4. Modification Protocol (drop an existing system's EROI)

For an existing system scoring poorly:

**Step 1 — Audit.** Run §2. Identify the high-value rows with low knob cells.

**Step 2 — Rank the gaps.** Compute for each (asset, knob) cell the marginal EROI
reduction achievable by raising that cell by one level. Cheapest-and-deepest first.

**Step 3 — Apply the smallest viable lever set.** Common sequences:

- High F gap, liquid asset → split custody across ≥3 entities, different jurisdictions, no auto-sweep.
- High O gap → restructure reporting; shift asset forms off standardized tickers where legally feasible; over-aggregate disclosures.
- High B gap → add multi-party consent; pre-encumber with reasonable liens; shift value into non-separable accumulated structure (goodwill, trained team, soil, network).

**Step 4 — Re-audit.** Verify the new profile. Verify legitimate operations still
function at acceptable cost (your own operational EROI on the system must remain ≥ 1 —
don't build a structure you can't afford to use).

**Step 5 — Stress.** Walk the strongest realistic play an extractor could run
against the redesigned system. If it still clears EROI ≥ 1, return to step 2.

---

## 5. Validity Checklist (every audit or design must satisfy)

- [ ] All three knobs scored for every asset class that holds >10% of value
- [ ] At least one knob ≥2 on every such asset class
- [ ] No knob 0 on any asset class holding >25% of value
- [ ] No single point of custody exists anywhere in the design
- [ ] No public standardized inventory of significant assets
- [ ] No concentrated liquid pool
- [ ] The system's legitimate operations remain usable at acceptable operational cost
- [ ] At least one realistic adversarial play sketched and verified as EROI < 1

Missing any item invalidates the audit.

---

## 6. Scope and Limits

- **This is a structural rubric, not a legal one.** It presumes legitimate ownership
  and lawful structuring. It does not address unlawful acquisition, regulatory exotic
  havens, or concealment of required disclosures. The knobs work by making capture
  physically and economically unrewarding, not by hiding wrongdoing.
- **Not absolute.** Extreme force or extreme subsidies can override local structure
  for a time. The goal is to make sustained extraction net-negative, so the extractor
  either goes elsewhere or withdraws — not to make capture literally impossible.
- **Cost to defenders.** High (F,O,B) profiles raise your own operating cost. The
  acceptable tax is whatever keeps your own operational EROI ≥ 1 while keeping the
  extractor's < 1. There is usually a wide window between the two.
- **Scale-independence.** The same rubric applies at the scale of a single project,
  a company, a household, a landscape, or a supply chain. The knobs are the same;
  only the levers differ.

---

## 7. Quick Reference Card

```
extractor_EROI  =  deliverable_surplus / capture_cost
capture_cost    ∝  Σ units (find + reach + hold + move)

Knobs:
  F  Fan-out     value split across many separated units
  O  Opacity     value not visible/priced/classified
  B  Binding     value does not survive detachment

Target profile on all material asset classes:  F≥2, O≥2, B≥2

Four structural forms:
  Marbled     — F-dominant — value ground fine into a host matrix
  Lattice     — B-dominant — value locked in a relation graph
  Chameleon   — O-dominant — value without a category
  Pre-claimed — B-dominant — already pledged to a higher claimant

Invariants:
  1. No single point of custody
  2. No public standardized inventory
  3. No concentrated liquid pool
  4. Legitimate operations still function
```

tk@cloudshell:~/rubric/rubrics$ ls
eroi_defense.json eroi_defense_rubric.md perk_visual_design.json
tk@cloudshell:~/rubric/rubrics$ cat eroi_defense.json
{
"rubric_id": "eroi-defense-v1",
"version": "1.0.0",
"class": "structural-defense.capture-resistance",
"intended_use": "both",
"notes": "Extractor-class-agnostic rubric for structural defense against value capture. Optimizes directly for low extractor-EROI via three structural knobs (Fan-out, Opacity, Binding) and four observable structural forms (Marbled, Lattice, Chameleon, Pre-claimed). The same rubric audits existing systems and generates new ones. Full method: /home/tk/rubric/rubrics/eroi_defense_rubric.md.",
"criteria": [
{
"id": "F",
"name": "Fan-out (dispersion)",
"what_it_checks": "Is the asset value split across many small, spatially or logically separated units, rather than concentrated?",
"observable": "Number of discrete units; geographic/jurisdictional/logical separation; largest-single-unit share of total value (lower is better); no auto-sweep that reassembles dispersed assets daily.",
"levels": [
{"score": 3, "label": "Strong", "descriptor": "Value is structurally dispersed across N≥5 independent units, no single unit >20% of total, split custodians in different jurisdictions, no automatic reconcentration."},
{"score": 2, "label": "Moderate", "descriptor": "Value split across 3-4 units; largest single unit 20-40%; separation is real but reversible in a single step."},
{"score": 1, "label": "Weak", "descriptor": "Token distribution (2 units, or largest unit 40-70%); dispersion is cosmetic and reassembles under routine operation."},
{"score": 0, "label": "Absent", "descriptor": "Single concentrated store: one account, one warehouse, one vault, one entity."}
],
"weight": 0.35,
"generation_rule": "Design so that no single custody point, account, warehouse, or entity holds >30% of aggregate value; distribute across ≥3 independent custodians in separate jurisdictions; never auto-sweep back into one pool.",
"pitfalls": ["Marble that reassembles (dispersion cosmetic because cash sweeps nightly into one account)", "Calls a distributed ledger 'dispersed' while one signer controls 80% of keys"],
"evidence": ["/home/tk/rubric/rubrics/eroi_defense_rubric.md#1.1"]
},
{
"id": "O",
"name": "Opacity (information)",
"what_it_checks": "Can the value be seen, priced, or classified by an outside party without significant effort?",
"observable": "Existence of public registries, ledger entries, tickers, or standardized appraisal categories covering the asset; an outsider can estimate total value within an order of magnitude using only public data.",
"levels": [
{"score": 3, "label": "Strong", "descriptor": "No public registry captures the asset; no standardized form describes it; outside valuation requires bespoke investigation and is approximate."},
{"score": 2, "label": "Moderate", "descriptor": "Asset partially visible through aggregated disclosures, but unit-level composition isn't listed publicly."},
{"score": 1, "label": "Weak", "descriptor": "Asset is listed publicly at aggregate level; someone with effort can reconstruct the unit-level inventory."},
{"score": 0, "label": "Absent", "descriptor": "Public standardized inventory exists: tickers, registries, filings that enumerate the asset precisely."}
],
"weight": 0.30,
"generation_rule": "Favor asset forms without standardized tickers or centralized registries; report at aggregation levels that don't reveal unit-level composition; keep internal ledgers private.",
"pitfalls": ["Opacity theater: claiming obscurity while filing standardized public disclosures", "Using an obscure legal form that is nonetheless registered in a single public database"],
"evidence": ["/home/tk/rubric/rubrics/eroi_defense_rubric.md#1.1"]
},
{
"id": "B",
"name": "Binding (coupling)",
"what_it_checks": "Does the value survive detachment from its context — or does removal require severing many relationships, consent of many parties, or violation of an encumbrance?",
"observable": "Number of consenting counterparties required for transfer; presence of liens/licenses/covenants; dependence of value on non-portable accumulated structure (soil, customer graph, team, process, reputation); value-loss-on-detachment fraction.",
"levels": [
{"score": 3, "label": "Strong", "descriptor": "Detachment requires coordinated action across ≥3 independent parties, plus asset loses ≥70% of value when removed from its context; encumbrances in place create additional legal/physical friction for any capturer."},
{"score": 2, "label": "Moderate", "descriptor": "Two-party consent required, or asset loses 40-70% of value when detached."},
{"score": 1, "label": "Weak", "descriptor": "Single-party consent nominally required; asset loses 20-40% of value when detached."},
{"score": 0, "label": "Absent", "descriptor": "Asset is portable and self-contained: cash, bearer instrument, commodity inventory, single-signer account. Detachment loses <20% of value."}
],
"weight": 0.35,
"generation_rule": "Tie value to non-portable accumulated structure (relationships, process, customer graph, soil, trained team); require multi-party consent for transfers; pre-encumber with reasonable liens/licenses a capturer must respect or fight.",
"pitfalls": ["Binding overfit: multi-signature or covenant schemes so cumbersome that operators bypass them; the bypass becomes the attack surface", "Pledging the same asset to multiple parties in ways that destroy legitimate usability"],
"evidence": ["/home/tk/rubric/rubrics/eroi_defense_rubric.md#1.1"]
}
],
"aggregation": {
"method": "value-weighted per-asset",
"formula": "SystemKnobScore(knob) = Σ_over_assets (asset_value_fraction × knob_score); each knob capped at 3",
"target_profile": {"F": 2.0, "O": 2.0, "B": 2.0},
"hard_constraints": [
"No single point of custody for any material asset",
"No publicly-visible standardized inventory of significant assets",
"No concentrated liquid pool (idle cash or commodity stock in one place)",
"Legitimate operations remain usable at acceptable operational cost (defender's own EROI ≥ 1)"
]
},
"Theme_Tips_summary": [
{
"theme": "The irreducible: EROI<1 by structure",
"tips": [
"EROI = deliverable_surplus / capture_cost; capture_cost = Σ (find + reach + hold + move) across units.",
"Three structural knobs: Fan-out (F), Opacity (O), Binding (B). Pull them in that order of increasing engineering cost.",
"Four structural forms: Marbled (F), Lattice (B), Chameleon (O), Pre-claimed (B). Strong systems exhibit ≥2.",
"Target profile: F≥2, O≥2, B≥2 on every asset class holding >10% of value.",
"Extractor identity is irrelevant — physics is the same for tax offices, militaries, thieves, hackers, litigants."
]
},
{
"theme": "Practical posture",
"tips": [
"No single point of custody, ever.",
"No public standardized inventory, ever.",
"No concentrated liquid pool, ever.",
"Your own operational EROI on the system must stay ≥1 — don't build a fortress you can't afford to operate.",
"Re-audit on any material change to assets, custody, or disclosures."
]
}
]
}
