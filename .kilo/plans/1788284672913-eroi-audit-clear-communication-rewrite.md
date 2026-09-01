# Plan — Rewrite the Voyager Pay EROI audit page against the clear-communication rubric

## Goal

Replace `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` with a version that
passes the `clear-communication` rubric the user supplied. The current 397-line file fails
on at least four criteria (C2 Quantity, C4 Manner, C5 Relation, C7 Working-memory load);
the rewrite keeps the structural outline (formula → shapes → three knobs → levers →
matrix → score → pitfalls) but stops repeating the same levers four times across the
document, front-loads the function so the reader knows the answer in the first sentence,
chunks the per-knob sections so the reader never holds more than three new terms at once,
and tightens every sentence to ≤ 20 words on average.

## Diagnosis of the current file (rubric scoring)

- **C1 Function declaration — Developing.** The lede names the audit's structure but not
  its conclusion. The reader has to reach section #score to learn "Voyager Pay hits the
  rubric ceiling on every knob." Conclusion belongs in sentence one.
- **C2 Quantity — Poor.** Four sections (per-knob prose, lever-map table, matrix
  "Comment" column, pitfalls "ruled out because…") all say the same four things per
  knob. ~40% of the file is one idea restated four ways. Cut three of the four.
- **C3 Quality — Developing.** Some confident claims without source (e.g., "bootstrap
  spec ships with at least four independent relay operators"). Scores in the matrix are
  presented as if measured when they are author judgment — label them as such.
- **C4 Manner — Developing.** Many sentences >30 words. Vague metaphors ("sand mixed with
  sand", "no clean piece to grab"). One main idea per sentence is violated.
- **C5 Relation — Developing.** The "four shapes" section is a tangent the lede does not
  promise. The lever-map table duplicates the per-knob prose. The scoring-scale card
  duplicates §2.1 of the spec — link to it instead of restating it.
- **C6 Structure — Good.** TOC, headings, section rhythm are sound. One heading
  overpromises ("How Voyager Pay implements each lever" describes a table, not an
  implementation walk-through) — rename.
- **C7 Working-memory load — Poor.** Each per-knob section drops 4–5 new acronyms at once
  (HODL, NWC, Mostro node, pubkey, NIP-17, KYC, fiat leg, sats leg). Reader has to hold
  all of them to parse the section. Acronyms expand on first use in the page only — not
  every time — and the per-knob section stays ≤ 3 new acronyms at once.

## File touched

`voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` — full rewrite.

## Decisions (locked)

- **Target length: 220–280 lines.** The current 397 is too long; Lesson 9 at 174 lines
  shows what a deep page looks like without padding. The expansion we promised the user
  (richer per-knob coverage, exposure matrix, pitfalls) is delivered; the repetition is
  cut.
- **Front-load the conclusion.** Lede sentence one: state the score profile (Dispersion
  3 · Information 3 · Coupling 3) and that this is the rubric ceiling. Subsequent
  sentences say *why* and *how to read the rest of the page*.
- **Acronyms expand on first appearance in the page only.** Subsequent uses are the short
  form. This means HODL / NWC / NIP-17 each get one parenthetical expansion, in the
  per-knob section they first appear in, and never again in the file.
- **The lever-map table replaces the per-knob "How Voyager Pay applies it" prose block.**
  Per the rubric's C5 Relation, having the same levers stated four times is the core
  failure. The lever-map is the canonical place where the levers live; the per-knob
  sections become "knob → example → where this surfaces in Voyager Pay (1–2 lines) →
  reference to the lever-map for the full list."
- **The matrix "Comment" column becomes one sentence, not a restatement of the lever
  prose.** Comments cite the lever, they don't restate it. Example: "Lever: split custody.
  See #levers." instead of paraphrasing the lever's content.
- **The pitfalls section stays** but each pitfall gets one sentence of rule-out, not
  three. A pitfall either applies or it doesn't; the rule-out is the reason.
- **The four-shapes section collapses into the lede** as a single sentence. The shapes
  are useful framing but a full section is a tangent the lede does not promise. The
  reader who needs them can find §1.2 of the spec; we name them in passing so the
  reader has vocabulary for the rest of the page.
- **The scoring-scale card is replaced by a single inline sentence** ("0–3; see the
  spec") plus the score-profile card. The card duplicates §2.1 of the rubric.
- **The "Voyager Pay is Lattice-dominant on Coupling and Marbled on Dispersion" sentence
  moves to the lede.** It's the most useful sentence in the current file and is buried
  at the bottom of #shapes.

## New outline (target ~250 lines)

1. **Hero** (~12 lines): eyebrow "Lesson 7", title unchanged,
   "How Voyager Pay satisfies the EROI rubric."
   - Sentence 1: "Voyager Pay scores (3, 3, 3) — the rubric ceiling — on every
     structural knob."
   - Sentence 2–4: name the three knobs, name the two dominant shapes (Lattice on
     Coupling, Marbled on Dispersion, Chameleon on Information), name what the rest
     of the page proves.
2. **On-page TOC** (~14 lines): keep existing pattern with one change — drop
   `#shapes` as a section (folded into the lede), so entries become
   `formula · dispersion · information · coupling · levers · matrix · score · pitfalls`.
   Section ids for `#shapes` no longer exist; the TOC reflects that.
3. **The irreducible formula** (`#formula`, ~14 lines): one card. Formula in display
   type. One sentence: "If EROI < 1 the attack is unprofitable on average and most
   attackers move on. Voyager Pay's design pushes the four sub-costs up before any
   attack begins. The rest of this page audits each knob."
4. **Dispersion — 3/3** (`#dispersion`, ~28 lines):
   - The knob (1 sentence).
   - One concrete example (vault vs. many wallets, ~4 sentences — the version from
     the spec, which is the strongest).
   - Where Voyager Pay surfaces this (3 bullets max, each one line: "Split custody
     across ≥3 Mostro nodes in separate jurisdictions." "NWC-scoped wallets, each
     revocable." "Each unit of escrowed value lives in its own HODL invoice."). One
     sentence close.
5. **Information — 3/3** (`#information`, ~28 lines): same pattern.
   - The knob (1 sentence).
   - One concrete example (street artist vs. billboard ad, ~3 sentences).
   - Where Voyager Pay surfaces this (3 bullets: NIP-17 gift-wrap on every order
     message; pseudonymous keys, no KYC; no public listing server aggregating order
     books). One sentence close.
6. **Coupling — 3/3** (`#coupling`, ~28 lines): same pattern.
   - The knob (1 sentence).
   - One concrete example ($100 bill vs. refundable deposit, ~3 sentences).
   - Where Voyager Pay surfaces this (3 bullets: HODL atomicity; NWC scopes are
     budget-bounded and revocable; worst-case exposure of a compromised node is
     bounded to the in-flight HODL amount, not the customer balance). One sentence
     close.
7. **How Voyager Pay implements each lever** (`#levers`, ~50 lines): the lever-map
   table moves here and is the canonical place. The per-knob sections reference it.
   - Intro sentence: "Two strong levers per knob is the rubric's bar. Voyager Pay
     runs three on each. The table below maps each lever to where it lives in the
     protocol."
   - The existing 9-row table, with one tweak: every cell is ≤ 12 words. Long
     comments get shortened to "See {knob} {lever-name}." pointers, not restated.
8. **The exposure matrix** (`#matrix`, ~50 lines): 5 asset rows + system row.
   - Intro sentence: "Asset classes against the three knobs. Cells are the rubric's
     0–3 scoring; weights are relative — the spec does not enumerate precise
     fractions."
   - The existing 6-row table, with the "Comment" column rewritten as: "See {knob}
     {lever-name}." for every row. The comments become pointers, not restatements.
   - Closing sentence: "No cell is 0 or 1. Every asset that would attract an
     attacker scores ≥ 2 on every knob."
9. **Score profile** (`#score`, ~22 lines):
   - The existing `bg-bone-100` card with the score string and the explanation
     paragraph (kept verbatim from the current file — strong paragraph).
   - The scoring-scale card is removed; replaced by one inline sentence: "0–3 per
     the rubric's scale; see the spec for descriptors."
10. **Pitfalls this audit rules out** (`#pitfalls`, ~30 lines):
    - Intro sentence: "Four of the rubric's five failure patterns could apply to a
      marketplace protocol; each one is ruled out here by construction."
    - Four pitfalls, each one paragraph of ≤ 4 sentences. Pattern: name the
      pitfall (one sentence), name the rule-out (one sentence), name the lever
      that rules it out (one sentence). No padding.
11. **Final paragraph** (verbatim from current file, ~3 lines).
12. **Next-up card** (verbatim from current file, ~10 lines).

Total: ~270 lines.

## Constraints / non-goals

- No new components, no new imports, no new routes, no sidebar/landing changes.
- The final "Profile (3, 3, 3) does not mean…" paragraph stays verbatim.
- The "Next up" card stays verbatim.
- The score-profile explanation paragraph stays verbatim.
- No copy changes to any other file (sidebar, landing card, etc.).
- The title "How Voyager Pay satisfies the EROI rubric." stays.

## Voice and length budget

- 220–280 lines, target ~250.
- Sentence length: target average ≤ 18 words. No sentence > 30 words except inside
  the verbatim paragraph and the next-up card.
- Voice: declarative, short sentences, paragraph rhythm of 3–5 sentences. Match
  Lesson 5 and Lesson 6 cadence. No adjectives like "powerful", "robust",
  "elegant", "comprehensive". Prefer concrete nouns ("HODL invoice", "NIP-17
  gift-wrap", "Mostro node") over abstractions ("the value", "the system").
- One main idea per sentence. Subject-verb-object order by default. Active voice.
- Acronyms expand on first page-occurrence only; subsequent uses are the short
  form. HODL, NWC, NIP-17 each get one parenthetical in the per-knob section they
  first appear in.

## Validation

- Build: `cd voyager && npm run build` succeeds; build time within ± 2s of prior
  pass.
- Dev probe: `cd voyager && npm run dev -- --port 5179`, then
  `curl -s http://localhost:5179/docs/voyager-pay-eroi-audit` returns 200.
- Rendered-page content checks:
  - The lede contains "scores (3, 3, 3)" or "Dispersion 3 · Information 3 ·
    Coupling 3" within the first 100 words (C1).
  - The four shape names ("Marbled", "Lattice", "Chameleon", "Pre-claimed") each
    appear at least once — confirms the lede names them.
  - The on-page TOC contains entries for `formula · dispersion · information ·
    coupling · levers · matrix · score · pitfalls` (eight entries; no `#shapes`).
  - The exposure matrix table headers are "Asset · Value weight · F · O · B ·
    Comment".
  - The four pitfalls labels ("Security theater", "Opacity theater", "Binding
    overfit", "Marble that reassembles") each appear.
  - The verbatim "Profile (3, 3, 3) does not mean…" paragraph is present.
  - The "Next up" card still reads "How Voyager Pay extends" and links to
    `/docs/how-voyager-pay-extends`.
  - `wc -l` of the file is in 220–280 range.
- Rubric self-check (manual, against the supplied clear-communication rubric):
  - C1: lede sentence one states the score profile → Excellent.
  - C2: each lever appears once (in the lever-map), referenced from elsewhere
    instead of restated → Good.
  - C3: no fabricated numbers; weights are labeled relative; the matrix's
    author-judgment scores are presented as scores, not as measurements →
    Good.
  - C4: average sentence length ≤ 20 words; jargon defined once on first page
    use → Good.
  - C5: shapes are mentioned in the lede, not as a standalone section; the
    scoring-scale card is collapsed to a pointer → Good.
  - C6: headings preview content; section lengths are within ± 30% of each
    other (≈ 25 lines each) → Good.
  - C7: per-knob section introduces ≤ 3 new acronyms at once; the lever-map
    table is the chunking aid for parallel items → Good.
- Sidebar / landing card / `what-can-still-go-wrong` regression: unchanged from
  the current state (Lesson 7 still in sidebar; `/docs/what-can-still-go-wrong`
  still 404s).

## Risks

- **Cuts go too far.** A 270-line page may feel thin next to the 397-line version
  we just shipped. The mitigation: the lever-map and matrix tables carry the
  depth that the prose used to. If a section still feels thin on review, grow
  it back inside its own section, not by adding restatements elsewhere.
- **Lede becomes a thesis.** Front-loading "scores 3, 3, 3" can read as
  advertising. Mitigation: keep the lede declarative ("Voyager Pay scores…")
  and follow immediately with the structure of the page. The reader who wants
  the proof gets it in #dispersion / #information / #coupling.
- **Acronym under-expansion.** If the reader hasn't read Lesson 4 or Lesson 9,
  acronyms may still be unfamiliar. Mitigation: each per-knob section expands
  the one acronym it introduces, not every acronym it uses. The reader who has
  read Lessons 4 and 9 is the target.
- **Lever-map table is too dense.** A 9-row table with short comments may be
  harder to scan than the current prose. Mitigation: keep the lever names
  short and parallel; use the table to invite scanning, not to require
  reading.

## Order of operations

1. Read existing `+page.svelte` end-to-end (done — 397 lines reviewed).
2. Write the new file in one `Write` operation (full replacement).
3. Run `npm run build` in `voyager/`.
4. Run `npm run dev -- --port 5179` in `voyager/`, probe
   `/docs/voyager-pay-eroi-audit`, and grep the rendered HTML for the content
   checks listed under Validation.
5. Stop dev server.

## Open questions

None.
