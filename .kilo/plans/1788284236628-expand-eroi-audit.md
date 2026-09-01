# Plan — Deeply expand the Voyager Pay EROI audit page (Lesson 7)

## Goal

Rewrite `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` into a
substantially deeper, more exhaustive treatment of the EROI defense rubric and how
Voyager Pay meets it. Source of truth for content is `eroi.md` (the structural defense
spec). Target length ~350-450 lines, with an on-page TOC, multi-section per knob, the
four structural forms, a per-asset exposure matrix, a "how Voyager Pay implements each
lever" section, the score profile, and pitfalls. Page stays as Lesson 7. No routing,
sidebar, or landing-card changes.

## Decisions (locked)

- **File touched:** `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` — full rewrite. 71 lines → ~350-450 lines.
- **Voice drift watch:** mirror Lesson 5 (`what-is-eroi`) and Lesson 6 (`why-systems-get-captured`) — short declarative sentences, paragraph rhythm, no marketing adjectives, no new metaphor. The audit page currently leans more assertive than those two; the expansion should *narrow* toward that voice, not widen the gap.
- **No new components.** Reuse `<Cta>`, `eyebrow`, `bg-bone-100` / `bg-bone-200` rounded cards, and the existing `font-display` heading scale already in use on Lesson 9.
- **No sidebar / landing-card / route changes.** Lesson numbering, slug, sidebar position all stay put.
- **Line 57 paragraph ("Profile (3, 3, 3) does not mean…") — OUT OF SCOPE.** Per the prior plan this is copy-editing the body; the user didn't name it. Leave verbatim.
- **"Next up" card stays as the prior edit set it:** eyebrow "Next up", heading "How Voyager Pay extends", body "Why the same wire format carries physical goods, stays, experiences, services, and digital downloads.", `Cta href="/docs/how-voyager-pay-extends"`.

## Source material: what to draw from `eroi.md`

The spec is rich. The expanded audit pulls from these sections, mapping them to a reader who already finished Lessons 5 and 6:

| Spec section | What it contributes to the expanded audit |
| --- | --- |
| §1.1 The three knobs (table) | A compact "knobs reference" card at the top |
| §1.2 The four structural forms | A new "The four shapes defense takes" section near the top, with examples for each |
| §2.1 Scoring scale (0-3 descriptors) | A scoring rubric sub-section inside the score profile |
| §2.5 The exposure matrix | A Voyager-Pay-specific table (asset × knob) |
| §3.2 Default design moves per knob | "How Voyager Pay implements each lever" per-knob section |
| §3.3 Non-negotiable invariants | A short invariants card |
| §3.4 Pitfalls | A pitfalls callout inside or after the score profile |

The "irreducible formula" and "four costs an attacker pays" already appear in Lesson 5. Restate only the formula in a compact reference card; do not re-teach the four costs — Lesson 5 owns that.

## File changes

### `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` — full rewrite

Section outline (no anchors collide with the existing site's slug for `#score` etc.; all new section ids follow the same kebab-case pattern Lesson 9 uses):

1. **Hero** (unchanged shape): eyebrow "Lesson 7", title "How Voyager Pay satisfies the EROI rubric.", lede expanded from one sentence to a single paragraph that frames the lesson as: restate the formula, name the three knobs, promise that the rest of the page walks each knob, names the four forms, names the score profile, and names the exposure matrix. Roughly 3-5 sentences in the established `text-lg leading-relaxed text-ink-2` style.

2. **On-page TOC** (`<nav>` with `aria-label="On this page"`) — exactly the Lesson 9 pattern: `<ul>` of `<li><a class="text-ink underline underline-offset-4 decoration-[1.5px]">` entries linking to fragment ids. Entries, in order:
   - `#formula` — The irreducible formula
   - `#shapes` — The four shapes defense takes
   - `#dispersion` — Dispersion, 3/3
   - `#information` — Information, 3/3
   - `#coupling` — Coupling, 3/3
   - `#levers` — How Voyager Pay implements each lever
   - `#matrix` — The exposure matrix
   - `#score` — Score profile
   - `#pitfalls` — Pitfalls this audit rules out

3. **Section: The irreducible formula** (`#formula`) — a `bg-bone-100` rounded card. Restate the formula in monospace-ish display text using `font-display`, then one short paragraph explaining that the rest of the page is an audit against this formula. Do NOT re-explain the four sub-costs (Lesson 5 owns that).

4. **Section: The four shapes defense takes** (`#shapes`) — short. Sub-headings ("Marbled", "Lattice", "Chameleon", "Pre-claimed") each get one paragraph: dominant knob + one-line shape + a one-sentence concrete example drawn from everyday life (no Voyager specifics yet — these are introduced as universal shapes). End with the line from the spec: "A well-defended system usually exhibits at least two of them, and the strongest defenses stack three or four." Then a one-sentence bridge: "Voyager Pay is Lattice-dominant on Coupling and Marbled on Dispersion; its Information shape is closest to Chameleon."

5. **Section: Dispersion — 3/3** (`#dispersion`) — three sub-headings inside:
   - **The knob.** Restate the §1.1 row in one sentence. Note which of the four sub-costs it raises (find + hold).
   - **A concrete example.** Draw from everyday life — e.g., cash in a vault vs. cash across many small wallets in different jurisdictions (Lesson 6 already uses this analogy once; reuse without inventing a new one).
   - **How Voyager Pay applies it.** Replace the existing audit's three paragraphs on dispersion with longer, more specific coverage:
     - Nodes: anyone can run a Mostro node; the spec ships with at least four independent relay operators. Federation of competing market makers, not a single operator.
     - Wallets: interchangeable; users use NWC-scoped connections (Nostr Wallet Connect), each a bounded instance, not a global credential.
     - Vendor-side data: no central listing server holds everyone's order book; each vendor keeps their own.
     - HODL invoices (HODL = Lightning hold-invoice) — every unit of escrowed value lives in a different Lightning invoice, on a different node, addressed to a different pubkey.
     - Close with the existing "attacker has to compromise N independent things in N different jurisdictions" line, sharpened.

6. **Section: Information — 3/3** (`#information`) — three sub-headings, same pattern:
   - **The knob.** Find + reach cost. One sentence on what makes find-cost high: the absence of a registry, ticker, or appraisal form.
   - **A concrete example.** Bearer bond vs. registered security — though Lesson 6 already used bearer bond. Use a different everyday-life example: a street artist's income vs. a billboard ad. The billboard has a standardized inventory (eyeballs per day, CPM — cost per mille, cost per thousand impressions — listed in a rate card); the street artist has none. The first is findable; the second is not.
   - **How Voyager Pay applies it.** Replace the existing three paragraphs with:
     - NIP-17 gift-wrap (Nostr Improvement Proposal 17, a standard for private direct messages that hides sender, recipient, and content from relays). Relays see nothing identifying — only that encrypted blobs are moving.
     - No KYC tier inside the protocol. Keys are pseudonymous.
     - Reputation keyed to a public key, not a person — the asset is the key, not the identity behind it.
     - Two-legged settlement: the sats leg is on a public ledger; the fiat leg is private by default. An observer of either leg alone cannot reconstruct the deal.
     - No public registry enumerating "all orders" or "all counterparties" anywhere — order data lives vendor-side and node-side, not on a public listing server.

7. **Section: Coupling — 3/3** (`#coupling`) — three sub-headings, same pattern:
   - **The knob.** Move cost. One sentence on what makes move-cost high: detachment destroys most of the value.
   - **A concrete example.** A $100 bill vs. a refundable $100 deposit pegged to a buyer identity with revocation rights. The bill is separable; the deposit loses worth the moment it detaches from its context. (Lesson 6 used a similar analogy; vary the phrasing so the page doesn't read as a copy of Lesson 6.)
   - **How Voyager Pay applies it.** Replace the existing three paragraphs with:
     - Every meaningful action needs a local key. No shared session token, no admin override, no platform reset.
     - HODL invoices make settlement atomic with the network. The Mostro node cannot take the sats without delivering the fiat — releasing the HODL is what releases the sats.
     - NWC scopes are budget-bounded and revocable. Losing one does not lose the wallet.
     - Revocation: the customer controls the keys; the wallet can be re-keyed without re-doing the deal graph.
     - Worst-case exposure of a compromised node is bounded to the HODL amount, not to the customer's standing balance.

8. **Section: How Voyager Pay implements each lever** (`#levers`) — table-form or grid of cards. One row per knob, columns: lever name, where it lives in the protocol. Drawn from §3.2 of the spec, narrowed to the actual Voyager Pay levers:
   - Fan-out: split custody across ≥3 independent Mostro nodes in separate jurisdictions; no central listing server; sweep rather than pile (HODL invoices settle individually, not into a central pool).
   - Opacity: NIP-17 gift-wrap on order traffic; pseudonymous keys; no protocol-level KYC; vendor-side order data not aggregated publicly.
   - Binding: HODL invoice atomicity; multi-party consent implicit in the three-key flow (customer + vendor + node); revocation lists held by the customer.
   Wrap with a one-line "two strong levers per knob is usually sufficient" attribution to the spec, then state that Voyager Pay exceeds the bar on each.

9. **Section: The exposure matrix** (`#matrix`) — a table drawn from §2.5 of the spec, applied to Voyager Pay's asset classes. Use the existing table styling conventions from the codebase (simple `<table>` with `<thead>` / `<tbody>`, text-sm, `text-ink` for headers, `text-ink-2` for cells). Asset classes, in order:
   - Escrowed sats (in-flight HODL invoices)
   - Vendor fiat holdings (off-protocol)
   - Reputation (signed events keyed to pubkeys)
   - Order book / list data (vendor-side)
   - Relay-stored message blobs (NIP-17 encrypted, no plaintext)
   Columns: Asset · Value weight · F · O · B · Comment. Each cell 0-3. Comments are one short sentence naming the structural reason for the score. Aggregate row at the bottom reads "System (Voyager Pay) · 100% · 3 · 3 · 3 · all asset classes on every knob ≥ 2."
   Important: the matrix is illustrative; if a precise value-weight split isn't in the codebase, the implementer should mark weights as relative ("high" / "medium" / "low") rather than fabricate percentages.

10. **Section: Score profile** (`#score`) — keep the existing `bg-bone-100` rounded card. Update the paragraph to:
    - Lead with `Dispersion 3 · Information 3 · Coupling 3` in the existing display style.
    - One paragraph: "That profile matches the rubric ceiling. Each score would have to drop before the system becomes structurally capturable. Dispersion below two means a small number of nodes holds a disproportionate share of liquidity. Information below two means an attacker can identify counterparties cheaply. Coupling below two means a successful breach translates directly into movable loot. None of those are where Voyager Pay sits today." (Keep this paragraph; it is the existing one and is strong.)
    - Add the scoring-scale sub-section from §2.1 as a small reference card *inside* this section: a 0/1/2/3 descriptor list, one line per level, in a `bg-bone-200` card. Names what each level means per knob.

11. **Section: Pitfalls this audit rules out** (`#pitfalls`) — a callout list, drawn from §3.4 of the spec, restricted to the pitfalls that *could* apply to Voyager Pay and how the design rules them out. Four short paragraphs:
    - **Security theater.** Ruled out because every defense in the audit is structural, not detection-after-the-fact. The protocol has no alarm that is the defense; the defense is the shape of the value.
    - **Opacity theater.** Ruled out because no standardized public report lists Voyager Pay's order volume, counterparties, or balances. NIP-17 is opaque by protocol, not by configuration.
    - **Binding overfit.** Ruled out because HODL invoices settle in seconds, not days; the multi-party consent (customer + vendor + node) is a side effect of the three-key flow, not an extra ceremony.
    - **Marble that reassembles.** Ruled out because there is no nightly sweep into a central pool — escrowed sats live in their own HODL invoice per order, not in a shared wallet.

12. **Final paragraph** (the existing line 57) — leave verbatim.

13. **"Next up" card** — keep the existing prior-edit shape verbatim.

## Constraints / non-goals

- No new dependencies, no new components, no new routes.
- No copy in any other file changes (sidebar, landing card, pay page, etc. all stay put).
- No renaming, no renumbering.
- No removal of the existing line 57 paragraph.
- The hero lede may be expanded; the title "How Voyager Pay satisfies the EROI rubric." stays.

## Voice and length budget

- Target ~350-450 lines. Currently 71. Lesson 9 is 174 (longest). A page ~2× Lesson 9 is the upper end of what still feels like a doc page rather than a chapter.
- Voice: declarative, short sentences, paragraph rhythm of 3-6 sentences. Match Lesson 5 / Lesson 6 cadence. Avoid adjectives like "powerful", "robust", "elegant". Prefer concrete nouns ("HODL invoice", "NIP-17 gift-wrap", "Mostro node") over abstractions.
- No new metaphor. Reuse analogies already in the spec (vault vs. many small wallets; bearer bond vs. relationship-bound contract) only if they sharpen the point; otherwise pick everyday-life analogies the spec itself wouldn't object to.
- Acronyms expanded on first use, matching Lesson 9's existing pattern (HODL = Lightning hold-invoice; NWC = Nostr Wallet Connect; NIP-17 = Nostr Improvement Proposal 17, etc.).

## Validation

- Build: `cd voyager && npm run build` succeeds (target build time ~7s, same as prior pass).
- Dev probe: `cd voyager && npm run dev`, then `curl -s http://localhost:5179/docs/voyager-pay-eroi-audit` returns 200.
- Content checks on the rendered page:
  - Contains "Dispersion 3 · Information 3 · Coupling 3".
  - Contains all four shape names: "Marbled", "Lattice", "Chameleon", "Pre-claimed".
  - Contains the on-page TOC nav with all 9 fragment ids.
  - Contains the exposure matrix table headers "Asset · Value weight · F · O · B · Comment".
  - Contains the four pitfalls labels ("Security theater", "Opacity theater", "Binding overfit", "Marble that reassembles").
  - Still contains the verbatim line 57 paragraph.
  - "Next up" card still reads "How Voyager Pay extends" and links to `/docs/how-voyager-pay-extends`.
- Sidebar on `/docs` and `/docs/voyager-pay-eroi-audit` still shows Lesson 7 (no sidebar entry changes).
- Landing card on `/docs` for Lesson 7 unchanged.
- `/docs/what-can-still-go-wrong` still 404s (no regression on prior plan).
- Spot-check: `wc -l voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` is in the 350-450 range.

## Risks

- **Voice drift.** Long pages invite adjective creep. Mitigate by writing each paragraph against the Lesson 5 / Lesson 6 cadence and stripping filler words on a final pass.
- **Filler sections.** With nine TOC entries it's tempting to pad. The four-shapes and pitfalls sections must each do real work or be cut. If the implementer can't write each without padding, collapse the four-shapes section into a single paragraph inside `#formula` and skip `#pitfalls` as its own section (move the four bullets into the bottom of `#score`).
- **Acronym overload.** NIP-17, NWC, HODL, EROI, KYC, CPM, pubkey, Lightning — many on one page. Mitigate by expanding on first use, then using the short form, and by avoiding new acronyms introduced by this rewrite.
- **Fabricating numbers.** The exposure matrix must not invent percentages. Use qualitative weights ("high / medium / low") if exact figures aren't in the codebase.
- **Diff size.** One file, full rewrite. The diff will look larger than prior passes because the file is being replaced, not patched. Every line is reviewable against the spec and the prior page.

## Order of operations

1. Read existing `+page.svelte` end-to-end one more time (already done in planning).
2. Write the new file in one `Write` operation (full replacement).
3. Run `npm run build` in `voyager/`.
4. Run `npm run dev` in `voyager/`, probe `/docs/voyager-pay-eroi-audit`, and grep the rendered HTML for the content checks listed under Validation.
5. Stop dev server.

## Open questions

None.
