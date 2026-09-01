# Plan — Extensibility feature for Voyager Pay marketplace

## Goal

Make the Voyager Pay marketplace visibly extensible: any vendor type — physical goods, stays, experiences, services, digital goods — ships by publishing a convention on a reserved `v` tag, with no protocol changes. Add (1) a new docs lesson, (2) a new section on the home page, (3) a new section on the Voyager Pay page.

## Decisions (locked)

- Surface: new dedicated section on `+page.svelte` and on `pay/+page.svelte`, each with a CTA to the new doc. Existing copy unchanged.
- Vendor showcase: 4-card grid matching the thesis verbatim — `voyager.listing.v1` (physical goods), `voyager.accommodation.v1` (stays), `voyager.tour.v1` (experiences), `voyager.consulting.v1` / digital goods. Phrasing emphasises "and anything else" so the grid reads as illustrative, not exhaustive.
- Doc placement: standalone at end of docs path. Slug `/docs/how-voyager-pay-extends`. Lesson 9. Add to both `/docs` landing card list and `docs/+layout.svelte` sidebar.
- Visual treatment: follows `peak.json` rubric (warm bone bg, lime CTAs only, monumental sans display, pill CTAs with chevron, tonal borderless cards, pastel icons, no shadow, no border, generous whitespace). Reuses existing components — no new component files unless listed below.

## Source material

- `/workspaces/voyager/extensible.md` — the thesis. Use its exact argument: split protocol into fixed substrate + extensible conventions via reserved `v` tag prefix; ship a new vendor kind by publishing a new convention document; required fields are `d`, `title`, `price`, everything else rides on `v` tags.
- `/workspaces/voyager/vp.md` §3 (event kinds) and §4 (listing schema, kind:30402) — confirms listing is addressable and `v` tags ride alongside `d`/`title`/`price`.
- `/workspaces/voyager/peak.json` — design rubric. Generation rules: warm-neutral bg, single acid lime accent (CTAs only), monumental grotesque sans display, pill CTAs with `›`, tonal cards (radius 24-32px, no border, no shadow), pastel icons only (never lime), generous whitespace, monochrome type hierarchy.

## Rule compliance

- **clear-communications**: first sentence states the point, ≤20-word avg, jargon defined at first use ("v tag (a reserved tag prefix that carries a convention)"), no meta-commentary, no decorative headings.
- **sales-copy**: one focus per section ("works for any marketplace"), one CTA, benefit-led, refutes the objection "but this is just for travel" in the same paragraph.
- **usability**: scannable headings, in-page TOC on the long doc, front-loaded summary, touch targets ≥44 px, primary CTA above the fold on each marketing section, mobile single-column.

## Tasks (ordered)

### 1. New docs lesson

Create `/workspaces/voyager/voyager/src/routes/docs/how-voyager-pay-extends/+page.svelte`.

Structure (mirrors `how-voyager-pay-works/+page.svelte`):

- `<svelte:head>` title: "How Voyager Pay extends — Voyager docs"
- Header section: eyebrow "Lesson 9", title "How Voyager Pay extends.", one-paragraph lede stating the point in sentence 1 (Voyager Pay works for any marketplace; new vendor kinds ship by publishing a `v` tag convention, not by amending the protocol).
- In-page TOC nav (`aria-label="On this page"`) with anchors: `#substrate`, `#conventions`, `#v-tag`, `#examples`, `#how-to-add`.
- §1 Substrate (fixed): three bullets — events signed + replaceable by `pubkey + d`; relays forward unknown events (NIP-01); clients ignore unknown tags.
- §2 Conventions (extensible): short prose + code block showing a listing event with `["v", "voyager.accommodation.v1", "check_in", "2026-12-01"]`-style tags. Required fields `d`, `title`, `price`; everything else rides on `v`.
- §3 The `v` tag mechanism: define the prefix rule — first element of the array value is the convention namespace; remaining elements are key/value pairs in that namespace's order; clients that don't recognise a namespace ignore those tags. Plain English first, then the rule in one sentence.
- §4 What you can ship: 4-card grid (matches marketing grid) — listing, accommodation, tour, consulting. Each card: eyebrow convention id (`voyager.listing.v1`), short title, one-line example of an extra field (e.g. "duration_minutes").
- §5 How to add a new convention: numbered list — write a short doc (one paragraph per field), publish it under a stable URL, reference it from your stall event, ship. No protocol change needed. Anyone can do this; relays from any year forward it.
- §6 Out of scope: changing the substrate, defining new event kinds, asking Voyager.
- "Next up" band at bottom linking back to `/docs` (since this is the last lesson) — use the same bone-100 / Cta pattern as `how-voyager-pay-works`.

Tone: short sentences, defined terms, plain English. Cite the source inline once ("Per the Voyager Tags Thesis, extensible.md").

### 2. Add lesson to docs sidebar

Edit `/workspaces/voyager/voyager/src/routes/docs/+layout.svelte`:

- Append one entry to `lessons`:
  ```
  { slug: '/docs/how-voyager-pay-extends', title: 'How Voyager Pay extends', eyebrow: 'Lesson 9', desc: 'A substrate, a tag prefix, and a convention document — why any vendor kind can ship without amending the protocol.' }
  ```

### 3. Add lesson card to /docs landing

Edit `/workspaces/voyager/voyager/src/routes/docs/+page.svelte`:

- Inside the "For the protocol-curious" `<div>` (after the existing `how-price-discovery-works` card), append a new card linking to `/docs/how-voyager-pay-extends`. Eyebrow: "Lesson 9". Title: "How Voyager Pay extends". Body: "A substrate, a tag prefix, and a convention document — any vendor kind can ship without amending the protocol."

### 4. New section on the home page

Edit `/workspaces/voyager/voyager/src/routes/+page.svelte`:

- Insert a new `<section>` between the existing "Voyager Pay band" (section 7, ends near line 243) and the "Documentation band" (section 8). Numbering becomes §8 in the file.
- Section structure:
  - `<SectionHeader eyebrow="Built for any marketplace" title="Voyager Pay sells anything." lede="One protocol. Any vendor kind. Physical goods, stays, experiences, services, digital goods — and whatever comes next." />`
  - 4-card grid using existing `FeatureCard` component. Tones (rotating, no two adjacent same): `sky`, `coral`, `rose`, `violet`.
    1. icon `map-pin`, eyebrow `voyager.listing.v1`, title "Physical goods", body "Snapper, sandals, hardware. Ship weight, pickup, courier in the same event shape."
    2. icon `bed`, eyebrow `voyager.accommodation.v1`, title "Stays", body "Rooms, rentals, weeks. Add check_in, check_out, capacity without changing the protocol."
    3. icon `compass`, eyebrow `voyager.tour.v1`, title "Experiences", body "Tours, tastings, guides. Add group_size, meeting_point, duration_minutes in the same listing."
    4. icon `sparkle`, eyebrow `voyager.consulting.v1`, title "Services & digital", body "Hours, deliverables, digital downloads. The same wire format carries them."
  - One `<Cta variant="primary" href="/docs/how-voyager-pay-extends">See how a new vendor kind ships</Cta>` centered under the grid.
- Section padding: match existing sections (`mx-auto max-w-6xl px-6 pb-24`).
- Add a "Works for any marketplace" entry to the home-page in-page TOC? No — home page has no TOC. The SectionHeader eyebrow is the scan anchor.

### 5. New section on the Voyager Pay page

Edit `/workspaces/voyager/voyager/src/routes/pay/+page.svelte`:

- Insert a new `<section id="extends">` between the existing "EROI defense" section (ends near line 260) and the "Risks & limits" section (`#risks`, starts near line 263). Add `extends` to the in-page TOC nav (around line 70) so it picks up the underline.
- Section structure:
  - Wrap in `rounded-[32px] bg-bone-100 p-8 sm:p-12` (matches the "Why this exists" band shape).
  - `<SectionHeader eyebrow="Built for any marketplace" title="Any vendor kind ships the same way." lede="The protocol guarantees event structure and forwarding. Vendor semantics ride on a reserved tag prefix, so new kinds never amend the wire format." />`
  - 4-card grid mirroring the home page. Reuse same icon + eyebrow + title + body verbatim (consistency rule). Tone rotation: `sky`, `coral`, `rose`, `violet`.
  - Below the grid: one paragraph refuting the objection ("Looks travel-shaped — does it carry other goods?"). One sentence. Then a single `<Cta variant="secondary" href="/docs/how-voyager-pay-extends">Read the extensibility spec</Cta>`.
- Update the in-page TOC (`<nav aria-label="On this page">` near line 67) to add `<li><a href="#extends">Extends to anything</a></li>` between "The fiat ramp" and "Risks & limits".

### 6. Component reuse (no new component files)

- Reuse `FeatureCard`, `SectionHeader`, `Icon`, `Cta` from `$lib/components/`. No new icons required (existing icon set has `map-pin`, `bed`, `compass`, `sparkle`).
- All design tokens (lime, bone ramp, pastel tones, radius) already exist in `src/lib/styles/tokens.css` and `src/routes/layout.css`.

## Validation

- Dev build: from `/workspaces/voyager/voyager`, run `npm run dev` (or `npm run build`) and verify each route renders without console errors:
  - `/` (home — new section visible after Pay band)
  - `/pay` (Pay — new section visible after EROI, TOC link works, anchor `#extends` scrolls)
  - `/docs` (landing — Lesson 9 card present)
  - `/docs/how-voyager-pay-extends` (new lesson renders)
  - `/docs/how-voyager-pay-works` (sidebar entry added; existing pages unchanged)
- Visual rubric self-check against `peak.json`:
  - C1 warm bone bg throughout — yes (no new colors).
  - C2 lime only on CTAs — yes (one `<Cta variant="primary">` per new section; no lime on cards).
  - C3 monumental sans display — yes (SectionHeader uses existing display classes).
  - C4 pill CTA grammar — yes (reuses `<Cta>` component).
  - C5 imagery — n/a (no new imagery added).
  - C6 tonal cards, no border, no shadow — yes (uses FeatureCard pattern).
  - C7 monochrome type — yes (no colored headings).
  - C8 generous whitespace — yes (uses `pb-24` section spacing).
  - C9 pastel icons only — yes (FeatureCard uses sky/coral/rose/violet pastels).
- Copy self-check:
  - First sentence of each new section states the point — yes.
  - Average sentence length ≤20 words — yes.
  - "v tag" defined at first use in the doc and the Pay page lede — yes.
  - One CTA per new section — yes.

## Files touched

- New: `voyager/src/routes/docs/how-voyager-pay-extends/+page.svelte`
- Edit: `voyager/src/routes/docs/+layout.svelte` (sidebar array)
- Edit: `voyager/src/routes/docs/+page.svelte` (landing card)
- Edit: `voyager/src/routes/+page.svelte` (new section between Pay band and Documentation band)
- Edit: `voyager/src/routes/pay/+page.svelte` (new section between EROI defense and Risks & limits; TOC entry)

No new components, no new tokens, no new assets.

## Risks / open questions

- Existing header navigation is `Home / Plan a trip / Voyager Pay / Docs`. No "Extensibility" nav item needed — the feature surfaces through the in-page section + docs CTAs. If the user later wants a top-level label it can be added in a follow-up.
- The thesis file (`extensible.md`) is a stub (57 lines, leading `+` markers from a copy-paste artifact). Cite it but do not transcribe verbatim — paraphrase cleanly for marketing prose.
- The home page already has 9 sections; adding a 10th pushes total height. Acceptable per the rubric's `pb-24` inter-section spacing; no action needed.