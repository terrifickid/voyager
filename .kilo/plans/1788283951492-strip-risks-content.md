# Plan — Strip all "risks" / "what can still go wrong" content from the site

## Goal

Remove every "nothing negative" block — the negative framing and risk enumeration — across the Voyager site. Cut is total: no leftover references to residual risk, no honest-limits call-out, no Lesson 8 page. Leave the protocol, the EROI rubric, the audit, the property cards (Dispersion / Information / Coupling), and the "Read the full EROI audit" CTA intact.

## Decisions (locked)

- **Scope:** every file matching the user's "everything matching 'risks' / 'what can still go wrong'" instruction. Five files touched.
- **Lesson 8 (`/docs/what-can-still-go-wrong`):** deleted whole. Sidebar and landing card entries removed. Lesson 9 becomes the natural next-up from Lesson 7.
- **EROI audit `Next up` card:** replaced with a forward pointer to Lesson 9 (`How Voyager Pay extends`), matching the new lesson-7 → lesson-9 hand-off. No risk copy on the audit page.
- **`/pay` Risks section:** deleted entirely. TOC `Risks & limits` link removed.
- **Other incidental negative copy on `/pay`:**
  - The EROI defense SectionHeader `lede` says "The next section lists the risks that remain anyway." — that "next section" is the one being deleted, so the lede is rewritten to a positive forward pointer. The SectionHeader **title** ("Three properties a custodial rail can't give you.") stays.
  - The `pay/security` page and `pay/pricing` page may carry residual negative framing — **out of scope** unless explicitly named (user said "the 'risks' and 'what could still go wrong' sections").
- **Voice drift watch:** every body paragraph being deleted is verbatim content the user wants gone. The only two pieces of new copy are: (a) the rewritten EROI defense `lede` on `/pay`, (b) the rewritten `Next up` card on the EROI audit. Both are short forward-pointers. Both must read like the existing positive voice (no new adjectives, no new metaphor).

## Files touched

### 1. `voyager/src/routes/pay/+page.svelte`

- **TOC line 76:** delete the `<li><a href="#risks" ...>Risks &amp; limits</a></li>` line. TOC drops to 7 → 6 entries (still in this order: Why this exists, Security rubric, Design invariants, How a payment flows, The fiat ramp, Extends to anything).
- **Lines 272–314:** delete the entire `<section id="risks" ...>...</section>` (the SectionHeader, the `<dl>` of four residual risks, and the "What we did NOT solve" `<div>`). Replace with nothing — page ends `#extends` then jumps to the Final CTA.
- **Line 107 (`EROI defense` SectionHeader `lede`):** rewrite from `"We think this design is hard to attack. The next section lists the risks that remain anyway."` → `"We think this design is hard to attack. The rest of this page shows what makes that true."` (positive forward pointer; mirrors the existing positive voice; avoids the dangling "next section" reference to the deleted risks block).

### 2. `voyager/src/routes/docs/+layout.svelte`

- **Line 16:** delete the entire `lessons` array entry for Lesson 8. Sidebar becomes 9 → 8 entries (Overview + Lessons 1–7, 9).

### 3. `voyager/src/routes/docs/+page.svelte`

- **Lines 99–106:** delete the entire `<a href="/docs/what-can-still-go-wrong" ...>` card. Card count drops by one. Lesson numbering in remaining cards (1–7, 9) stays as-is — **do not renumber Lesson 9 down to 8** (would invalidate any external links; the user said "nothing negative", not "renumber").

### 4. `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte`

- **Lines 62–70:** rewrite the `Next up` card so it points at Lesson 9 instead of the deleted Lesson 8.
  - `eyebrow="Next up"` stays.
  - `<h3>` text → `"How Voyager Pay extends"`.
  - `<p>` body → `"Why the same wire format carries physical goods, stays, experiences, services, and digital downloads."` (short, mirrors the Lesson 9 sidebar desc on line 17).
  - `<Cta>` `href` → `"/docs/how-voyager-pay-extends"`, label → `"Continue"`.
- **Line 57 paragraph** — `"Profile (3, 3, 3) does not mean 'nothing can go wrong'. It means the structural costs are high enough that most attackers move on. The next lesson is where this matters most: what is still risky anyway."` — **leave verbatim.** It is inside the audit body, the user did not name it, and removing it is copy-editing the lesson body. If the user wants it gone later, a separate pass.

### 5. `voyager/src/routes/docs/what-can-still-go-wrong/+page.svelte`

- **Whole file:** delete. (Keep the directory? — directory deletion is `git rm` of the file, the empty `+page.svelte`-less directory can stay or be removed by the implementer. Either is fine; empty dirs are inert in SvelteKit.)

## Out of scope

- `/pay/security`, `/pay/pricing` — may contain negative framing (e.g. "what an attacker does") but the user named only the risks blocks. Do not touch.
- `/docs/how-price-discovery-works` — its sidebar `Lesson 8` reference (line 16 of `+layout.svelte`) is on Lesson 7's adjacent pricing page; **out of scope**.
- `/docs/what-is-eroi` line 29 mentions "the residual risks that remain anyway" — single trailing phrase in a positive paragraph. **Out of scope** (user said "sections", this is a sentence).
- No renumbering of Lesson 9.
- No new doc to plug the Lesson 8 gap.
- No 301 redirect from `/docs/what-can-still-go-wrong` — the page is gone; a 404 is acceptable. (If the implementer wants a redirect, that's a follow-up.)

## New copy (load-bearing)

The only two pieces of new copy:

**`pay/+page.svelte` EROI defense lede (replaces "The next section lists the risks that remain anyway"):**
```
"We think this design is hard to attack. The rest of this page shows what makes that true."
```

**`docs/voyager-pay-eroi-audit/+page.svelte` Next up card body + heading:**
```
heading: "How Voyager Pay extends"
body:    "Why the same wire format carries physical goods, stays, experiences, services, and digital downloads."
cta:     href="/docs/how-voyager-pay-extends", label="Continue"
```

## Validation

- `grep -rn "What can still go wrong\|what can still go wrong\|Risks & limits\|risks & limits\|residual risk\|residual risks\|The next section lists the risks\|What we did NOT solve" voyager/src` → zero matches.
- `grep -rn "Fiat rail reversal\|Sybil reputation\|Relay capture\|Operator rug" voyager/src` → zero matches (the four named risks are gone from both `/pay` and the deleted Lesson 8 page).
- `ls voyager/src/routes/docs/what-can-still-go-wrong/` → empty or absent (the page file is gone).
- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev`, probe these URLs — each returns HTTP 200 and renders without errors:
  - `/pay` — TOC has 6 links in order (no `Risks & limits`); the EROI defense `lede` reads `"...what makes that true."`; no `#risks` section; the merged Security rubric section, design invariants, how-it-flows, fiat ramp, extends sections all still render.
  - `/docs` — landing card list is one card shorter (no Lesson 8 card); remaining card numbering is unchanged (1–7, 9).
  - `/docs` and `/docs/voyager-pay-eroi-audit` and `/docs/how-voyager-pay-extends` — sidebar shows Overview + Lessons 1–7, 9 (no Lesson 8 entry).
  - `/docs/voyager-pay-eroi-audit` — `Next up` card reads `How Voyager Pay extends` and links to `/docs/how-voyager-pay-extends`.
  - `/docs/what-can-still-go-wrong` — returns SvelteKit's default 404 page (acceptable; no redirect required).
- Confirm `Voyager Pay` page still ends with the Final CTA section after `#extends`.

## Risks

- **Orphan references.** If any external link or doc body references the Lesson 8 slug, it 404s. The implementer should grep Voyager-controlled content one last time before finalizing. No external links are tracked in this repo.
- **Lesson numbering inconsistency.** Sidebar shows `Lesson 7` then `Lesson 9`. This is an intentional choice — renumbering Lesson 9 → 8 would invalidate any external deep links and is out of scope. If the user wants renumbering, a separate pass.
- **Diff size.** Five files, two of which (the Lesson 8 file and the `/pay` `#risks` section) are full deletions. Diff will look larger than the prior plan but every removed block is verbatim content the user has flagged.
- **Rewriting the EROI defense lede** is the only body copy edit. It is short and forward-pointing; if the user wants the original wording preserved, the implementer should flag before writing.

## Order of operations

1. Delete `/pay` `#risks` section + TOC entry + rewrite EROI defense lede.
2. Rewrite `voyager-pay-eroi-audit` Next up card.
3. Remove Lesson 8 entry from `docs/+layout.svelte` sidebar.
4. Remove Lesson 8 card from `docs/+page.svelte`.
5. Delete `docs/what-can-still-go-wrong/+page.svelte`.
6. Run the grep + build + dev probe validation list.

Order matters for diff readability — small edits first, then deletions, so the implementer can stop early if a small piece is wrong.

## Open questions

None. User confirmed both scope choices.