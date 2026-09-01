# Plan — Plain-language rewrite of the Voyager Pay EROI audit page

## Goal

Replace `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` with a version a
non-technical reader can follow end-to-end. Apply four hard edits the user named in the
handover, then write the rest in plain English.

## Hard edits (from user)

1. **Cut the entire "Pitfalls this audit rules out" section** (current lines 259–272,
   four pitfalls including Security theater / Opacity theater / Binding overfit /
   Marble that reassembles).
2. **Remove every mention of the EROI score.** No `3/3`, no `3 · 3 · 3`, no `Score
   profile` card, no `F/O/B` cells. The page teaches what makes the system hard to
   capture; it does not grade itself.
3. **Never use the word "knob."** Replace with plain English ("the three properties",
   "these three", "what Voyager Pay does about X"). The page is allowed to mention
   Dispersion, Information, and Coupling as named properties — those are not knobs, they
   are the properties themselves.
4. **Write for a normal, non-technical person.** Sentences short, vocabulary plain,
   jargon defined inline the first time it appears, no acronyms that aren't expanded.

## File touched

`voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` — full rewrite.
Sidebar, landing card, and route unchanged.

## What stays

- Title "How Voyager Pay satisfies the EROI rubric." (locked per prior plan).
- The eyebrow "Lesson 7" (route and lesson-number convention).
- The "Next up" card pointing to `/docs/how-voyager-pay-extends` (locked per prior
  plan).
- The vault-vs-many-wallets analogy (Lesson 6 source, strongest concrete example).
- The $100-bill-vs-refundable-deposit analogy (Lesson 6 source, strongest concrete
  example).

## What goes

- The `#pitfalls` section and the TOC entry that points to it.
- The "Score profile" card and the "Dispersion 3 · Information 3 · Coupling 3" string
  in the lede (replace with a plain declaration of how the system resists capture).
- The `#matrix` section (the F/O/B scoring grid).
- All `knob` / `knobs` mentions (lede, formula section, per-property sections, lever
  map table header, matrix intro).
- The `F / O / B` column headers, the numeric cells, the `0–3` scoring scale mention,
  the `Score profile` heading, the `≥2 on every knob` footer line.
- The "shapes" vocabulary (Marbled / Lattice / Chameleon / Pre-claimed) — they were
  introduced in the prior rewrite's lede; with the score removed, they have no
  payload for a non-technical reader. Drop them entirely.
- Acronyms used in a way that requires the reader to know them: HODL, NIP-17, KYC,
  CPM. Where they must appear (e.g., HODL invoice in the protocol mechanics), expand
  inline in plain words on first use, then use the long form thereafter.
- The lever-map table header `Knob` (rename column to "Property").

## New outline (~150–180 lines)

1. **Hero** (~10 lines). Title unchanged. Plain lede: Voyager Pay is hard to capture
   because three properties work together — value is spread out, hard to identify, and
   tied to its rightful context. The page walks each property and shows where Voyager
   Pay puts it to work. No numeric scores anywhere.
2. **On-page TOC** (~12 lines, 5 entries):
   `formula · dispersion · information · coupling · where it lives`. No pitfalls,
   no matrix, no score.
3. **The formula in one sentence** (`#formula`, ~10 lines): one card. The formula in
   display type, then one sentence in plain English: an attack is a budget problem for
   the attacker; if what they have to spend to take the value is more than the value
   itself, they move on. No `find / reach / hold / move` enumeration here — that's
   Lesson 5's job; link to it in one phrase.
4. **Dispersion** (`#dispersion`, ~22 lines):
   - What it means (1–2 sentences, plain English: value is split across many
     independent holders).
   - Concrete example (vault vs. many wallets — kept from Lesson 6, kept from prior
     draft; 4 sentences).
   - Where Voyager Pay puts it to work (3 bullets, plain language: many independent
     operators in different places; each seller keeps their own listings; each order's
     money sits in its own hold-invoice on its own node, addressed to a different key).
   - One sentence close: the attacker's budget grows with every operator they would
     have to compromise.
5. **Information** (`#information`, ~22 lines): same pattern.
   - What it means (1–2 sentences: what exists, who has it, and where it sits is
     hidden).
   - Concrete example (kept: street artist vs. billboard; rewritten in shorter,
     plainer sentences).
   - Where Voyager Pay puts it to work (3 bullets: order messages are encrypted end to
     end; keys are pseudonymous and there is no identity check at the protocol level;
     the public ledger only shows one side of each trade).
   - One sentence close: the attacker has nothing to point at.
6. **Coupling** (`#coupling`, ~22 lines): same pattern.
   - What it means (1–2 sentences: value is tied to its rightful context; detached
     value loses worth).
   - Concrete example (kept: $100 bill vs. refundable deposit, rewritten plainer).
   - Where Voyager Pay puts it to work (3 bullets: settlement is atomic — sats move
     only when the other side delivers; three keys (buyer, seller, operator) all sign
     before money moves; if one connection is stolen it can be revoked without losing
     the rest, and the worst case is one in-flight order, not the buyer's whole
     balance).
   - One sentence close: the loot is no longer loot.
7. **Where each property lives in the protocol** (`#where-it-lives`, ~50 lines):
   one table, three sections (Dispersion / Information / Coupling), each with the
   same 3 bullets as the per-property sections above, slightly tightened, in one
   place so a reader who has read the three sections can scan the summary, and a
   reader who skipped straight to it still gets the full list.
   - Intro sentence: "This is the same list, all in one place."
   - The table has columns `Property · What it does in Voyager Pay`. Three rows per
     property (no `Knob` / `Lever` split — collapses the lever-map table to its
     minimum).
   - Closing sentence: "Each of these raises the attacker's cost before the attack
     begins."
8. **Final paragraph** (kept from prior draft, ~3 lines): the "does not mean nothing
   can go wrong" line stays — but reworded to drop the "Profile (3, 3, 3)" prefix
   that no longer fits. New wording: "Hard to capture does not mean nothing can go
   wrong. The next lesson is where this matters most: what is still risky anyway."
9. **Next-up card** (verbatim from prior draft, ~10 lines): "How Voyager Pay extends"
   with the existing description and CTA.

Total: ~150–180 lines (under the prior 291-line draft; well within budget).

## Voice and length budget

- 150–180 lines, target ~165.
- Sentence length: target average ≤ 14 words. No sentence > 22 words. Short sentences
  only.
- Voice: declarative, plain English. Prefer concrete nouns ("hold-invoice",
  "encrypted order message", "operator") over abstractions ("the value", "the
  system").
- One main idea per sentence. Subject-verb-object order. Active voice.
- No adjective stacks ("powerful", "robust", "elegant", "comprehensive").
- No jargon left undefined on first use. Acronyms expanded inline in plain words the
  first time they appear, then dropped (e.g., "Hold-invoice (a Lightning invoice
  that doesn't pay out until the operator releases it)" — and then just "hold-invoice"
  after, without the parenthetical).
- No "knob", "sub-cost", "rubric ceiling", "spec", "lever", "asset class", "F/O/B
  cells". Translate each into the plain phrase a non-technical reader would use.

## Constraints / non-goals

- No new components, no new imports, no new routes.
- No sidebar or landing-card changes. The sidebar description ("Dispersion,
  information, coupling — the audit table and the score profile") and the landing
  card are slightly stale after this rewrite; per the prior plan and current
  handover we do not change them. They are visible only on the docs index and the
  sidebar; the page itself is the priority.
- The "Next up" card stays.

## Validation

- Build: `cd voyager && npm run build` succeeds; build time within ± 2s of the prior
  pass.
- Dev probe: `cd voyager && npm run dev -- --port 5179`, then
  `curl -s http://localhost:5179/docs/voyager-pay-eroi-audit` returns 200.
- Rendered-page content checks (grep on rendered HTML):
  - The word "knob" appears zero times.
  - The string `3/3`, `3 · 3 · 3`, `3, 3, 3` appear zero times.
  - The strings `Score profile`, `Scoring scale`, `F / O / B`, `Find cost`, `Hold
    cost`, `Move cost`, `Reach cost`, `sub-cost` appear zero times.
  - The strings `Security theater`, `Opacity theater`, `Binding overfit`, `Marble that
    reassembles` appear zero times.
  - The strings `Marbled`, `Lattice`, `Chameleon`, `Pre-claimed` appear zero times.
  - The strings `Dispersion`, `Information`, `Coupling` each appear at least twice.
  - The TOC has exactly 5 entries with IDs `formula · dispersion · information ·
    coupling · where-it-lives`.
  - The "Next up" card still reads "How Voyager Pay extends" and links to
    `/docs/how-voyager-pay-extends`.
- `wc -l` of the file is in the 150–180 range.

## Risks

- **Plain-language rewrite loses the audit's rigor.** The rubric exists because vague
  defenses fail; stripping the score and the matrix may make the page feel like a
  sales pitch. Mitigation: keep the three concrete examples (vault-vs-wallets,
  street-artist-vs-billboard, $100-bill-vs-deposit) and the specific where-it-lives
  bullets. A reader who wants the formal grading reads Lesson 5; a reader who wants
  the audit table reads `/docs/why-systems-get-captured` or the spec at `eroi.md`.
- **Sidebar description is now stale.** The docs sidebar still says "Dispersion,
  information, coupling — the audit table and the score profile" — there is no
  audit table and no score profile after this rewrite. Per the plan we leave the
  sidebar alone; if the user wants it updated, that is a follow-up.
- **"Hard to capture does not mean nothing can go wrong" loses its anchor.** The
  original sentence hung on "Profile (3, 3, 3) does not mean…" — without the score,
  the sentence reads as a generic disclaimer. Mitigation: the new wording carries
  the same meaning and points at the next lesson, which is the takeaway the user
  wants the reader to leave with.

## Order of operations

1. Read existing `+page.svelte` end-to-end (done — 291 lines reviewed).
2. Write the new file in one `Write` operation (full replacement).
3. Run `npm run build` in `voyager/`.
4. Run `npm run dev -- --port 5179` in `voyager/`, probe
   `/docs/voyager-pay-eroi-audit`, run the validation grep set above.
5. Stop dev server.

## Open questions

None.
