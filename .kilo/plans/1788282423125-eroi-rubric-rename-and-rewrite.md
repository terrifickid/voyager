# Plan — EROI messaging: teach the principle, rename the three properties

## Goal

Replace the technical, internally-coupled EROI vocabulary with a teaching-first framing. The three knobs become **Dispersion**, **Information**, and **Coupling** — three properties you can apply to any system to push the cost of extraction above the value of the loot. Teach the principle before the mechanism. The mapping to the four attacker sub-costs stays the same.

## Decisions (locked)

- Rename **Fan-out → Dispersion**, **Opacity → Information**, **Binding → Coupling** across every consumer of the vocabulary. The mapping to attacker sub-costs is unchanged: Dispersion raises find/hold, Information raises find/reach, Coupling raises move.
- Restructure `what-is-eroi` to lead with the principle, then the four sub-costs an attacker pays, then the three properties as the levers that raise those costs, then the formula as the formal anchor. Order: **Principle → 4 costs → 3 properties → formula**.
- Teaching rubric: explain *what* a property does and *how* it makes extraction too expensive — not the technical Svelte/Nostr/NWC mechanics of how Voyager Pay implements each one. The Voyager Pay-specific mechanics already live in `voyager-pay-eroi-audit`. Keep this lesson generic; keep the audit specific.
- Keep the four-cost labels (find / reach / hold / move) — they are concrete and load-bearing for the "too expensive to extract" framing.
- Keep the (3, 3, 3) score profile and the "(2, 2, 2) is the floor" anchor — the rubric framing still works.
- No edits to `how-voyager-pay-works` or `how-voyager-pay-extends` lessons — neither references the three names.

## Why this matters (one paragraph to keep in voice)

A reader landing on `what-is-eroi` today meets the formula first, the four-cost vocabulary second, and the three knobs third — without ever being told *why* this is a security principle they should apply to any system they build. The names "Fan-out / Opacity / Binding" are implementation-flavored and don't transfer. "Dispersion / Information / Coupling" name *structural properties of value in a system* — they read as a rubric, not as a Voyager feature. With this rename and reorder, the lesson teaches: (1) attackers are economic actors, (2) their four costs are find / reach / hold / move, (3) three properties of how value sits in a system raise those costs structurally, (4) if all three are above a threshold the attacker's EROI drops below 1 and they move on. The reader walks away with a principle they can apply on Monday, not a Voyager pitch.

## Files touched

1. `voyager/src/routes/docs/what-is-eroi/+page.svelte` — full copy rewrite (structure + names).
2. `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` — rename knobs in headings and body, update the score profile line. Keep the Voyager Pay-specific mechanics intact.
3. `voyager/src/routes/docs/why-systems-get-captured/+page.svelte` — update the "three knobs — Fan-out, Opacity, Binding — were named for" callout (line 45).
4. `voyager/src/routes/docs/+layout.svelte` — update Lesson 7 `desc` in the sidebar (line 15).
5. `voyager/src/routes/docs/+page.svelte` — update Lesson 7 landing card description (line 97).
6. `voyager/src/routes/pay/+page.svelte` — update §11 cards (Fan-out / Opacity / Binding headings + bodies, lines ~240-260) and the section title if it references the old names.

No edits to: `how-voyager-pay-works`, `how-voyager-pay-extends`, `what-can-still-go-wrong`, `pay/security/+page.svelte` (it only links to the audit, doesn't name the knobs).

## New `what-is-eroi` shape (the load-bearing change)

```
§1 Hero
   "What EROI is."
   lede: EROI is a security principle you can apply to any system you build.
         It says: extraction is an economic activity, and an economic activity
         stops when the cost exceeds the return. Voyager uses this rubric to
         shape its payments protocol. The principle is older than Voyager.

§2 The principle (NEW — replaces the current §2 "The formula")
   "An attack is a business."
   Three short paragraphs:
     - Attackers are economic actors. They spend to extract. They stop when
       the math stops working.
     - Push their cost up structurally and most of them leave. Patch the
       alarm and they just add the alarm to their budget.
     - That is the whole rubric. Every other lesson in this section is the
       rubric applied somewhere.

§3 The four costs an attacker pays (was §2 sub-list)
   "What the attacker has to pay for."
   Short paragraph + the same four bullets (Find / Reach / Hold / Move),
   lightly rewritten so each one reads as "a cost an attacker must pay"
   rather than a noun a defender should chase. Keep the "alarms vs
   structure" closing sentence.

§4 The three properties (was §3 — RENAMED + reframed)
   "What makes the costs structurally high."
   New intro paragraph framing these as properties of how value sits in a
   system, applicable to any system the reader builds — not Voyager
   features.
   Three properties:
     - Dispersion — value is spread across many independent holders.
       Find and hold cost rise because no single target is worth breaching.
     - Information — what exists, who has it, and where it sits is hidden.
       Find and reach cost rise because the attacker has nothing to point at.
     - Coupling — value is tied to its rightful context.
       Move cost rises because detached value loses worth or won't move.
   Each property gets a one-sentence "how it makes extraction too
   expensive" closer — the teaching rubric you asked for.

§5 The formula (was §2 — MOVED here, smaller)
   "Formalised."
   One short paragraph + the formula block. Frame this as "the formal
   anchor", not the opening pitch. Keep the below-1 / above-1 explanation.

§6 Target profile (unchanged structure, names updated)
   "(3, 3, 3) is the ceiling. (2, 2, 2) is the floor."
   Same rounded-[28px] card. Just update the knob names if they appear.
```

## New `voyager-pay-eroi-audit` shape

Keep the structure (one section per property + score profile). Rename headings:
- "Fan-out — 3 / 3" → "Dispersion — 3 / 3"
- "Opacity — 3 / 3" → "Information — 3 / 3"
- "Binding — 3 / 3" → "Coupling — 3 / 3"

Each property's body keeps the Voyager Pay mechanics (NWC, NIP-17, HODL invoices, Mostro federation, etc.). Tighten the lede: this lesson is the audit; the principle lives in the previous lesson.

Update the score profile line:
`Fan-out 3 · Opacity 3 · Binding 3` → `Dispersion 3 · Information 3 · Coupling 3`

## New `why-systems-get-captured` callout

Line 45 currently reads: "That is the move the three knobs — Fan-out, Opacity, Binding — were named for."

Update to: "That is the move the three properties — Dispersion, Information, Coupling — were named for." The lesson does not need a fuller rewrite; the rest of it doesn't name the knobs.

## New `pay/+page.svelte` §11 cards

Three article cards (lines ~240-260). Update headings and bodies:

- **Dispersion** (was Fan-out). Body: "Value is spread across many independent operators. No single node, relay, or vendor is worth breaching. The attacker has to compromise N different things in N different jurisdictions."
- **Information** (was Opacity). Body: "Order traffic is gift-wrapped. Relays see encrypted blobs, not counterparties. There is no KYC tier inside the protocol — trust lives in signed events, not identity dossiers."
- **Coupling** (was Binding). Body: "Settlement is atomic. A counterparty can fail, but they cannot take the sats and not deliver the fiat. Stolen credentials are revocable. Move cost is high because the loot won't move."

If the §11 section title (line 233) names the properties, update it too. ("Three properties a custodial rail can't give you." — already property-flavoured, no rename needed; verify on implementation.)

## Docs sidebar / landing card

`+layout.svelte` Lesson 7 `desc` (line 15):
`"Fan-out, opacity, binding — the audit table and the score profile."`
→
`"Dispersion, information, coupling — the audit table and the score profile."`

`+page.svelte` Lesson 7 landing card description (line 97):
`"Which design move raises which knob, and the score profile that comes out the other side."`
→ (keep — no knob name appears; just verify on implementation.)

## Validation

- `cd voyager && npm run build` succeeds.
- `cd voyager && npm run dev` and probe `/`, `/docs`, `/docs/what-is-eroi`, `/docs/voyager-pay-eroi-audit`, `/docs/why-systems-get-captured`, `/pay` — all `200`, five consecutive `200`s on `/`.
- `rg -n "Fan-out|Opacity|Binding" voyager/src` returns zero matches after the change.
- `rg -n "Dispersion|Information|Coupling" voyager/src` returns matches only in the six edited files (no leakage into unrelated copy).
- Sanity-check the new `what-is-eroi` order by reading it end-to-end: principle → 4 costs → 3 properties → formula. Confirm each property has a "how it makes extraction too expensive" sentence.
- Confirm the audit lesson's mechanics paragraphs are unchanged in substance (NWC, NIP-17, HODL invoices, Mostro, federation, N independent jurisdictions).

## Risks

- Reader confusion if the principle paragraph is too abstract. Mitigation: keep §2 (the principle) under ~3 short paragraphs and immediately follow with the four concrete costs so the abstract lands on something physical.
- Voice drift: the codebase's "knobs" metaphor has been used elsewhere (e.g. `why-systems-get-captured` "the three knobs — Fan-out, Opacity, Binding — were named for"). Replacing with "properties" everywhere keeps the rubric framing; flag if `why-systems-get-captured` body copy elsewhere also needs touching.
- Search/SEO: the old names appeared in copy and in some URLs. URLs (`/docs/voyager-pay-eroi-audit`, `/docs/what-is-eroi`) are unchanged — no redirects needed. The sidebar `desc` and landing card `desc` are search-visible but noindex-worthy copy; rename is low-risk.

## Out of scope

- No new lessons added.
- No URLs renamed.
- No edits to `how-voyager-pay-works`, `how-voyager-pay-extends`, `what-can-still-go-wrong`, or `pay/security/+page.svelte`.
- No changes to icons or visual treatment in §11 cards unless the icon name encodes a property name (verify: `bolt`, `chat`, `lock` are concept-only — no rename needed).
