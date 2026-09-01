# Plan — `/vendors` top-level page

## Goal

Add a marketing/landing page at `/vendors` that explains why a merchant should list on
Voyager Pay, what kinds of goods/services fit the platform, how MCP gives them free
agent-side distribution, and why the platform is fair/uncensorable/non-political by
construction. Follow the peak.json visual-design rubric. Mirror the structure of
mindtrip.ai/business (a B2B persona hero → benefits → proof → how-it-works → CTA).

## Constraints

- New top-level route `/vendors` (same level as `/pay`, `/plan`, `/docs`).
- Add a `For vendors` link to the Header.svelte `links` array.
- No sidebar/landing-card for docs (this isn't a docs lesson). Vendor page lives
  outside `/docs/`.
- Voice/structure mirrors `/pay/+page.svelte` (which already passes peak.json): warm
  bone ground, acid-lime primary CTA only, monumental grotesque sans headlines,
  flat tonal cards, pastel icons, ~90-120px section pauses, no lifestyle-people
  imagery, no second accent hue.
- No new components. Reuse `Cta`, `SectionHeader`, `FeatureCard`, `Icon`.
- No new routes beyond `/vendors`. Sub-pages (e.g. `/vendors/onboarding`) are
  out of scope.
- Do not touch `+layout.svelte`, the footer, or any other route.

## Affected files

1. `voyager/src/routes/vendors/+page.svelte` — new file (the page).
2. `voyager/src/lib/components/Header.svelte` — add `{ href: '/vendors', label:
   'For vendors', exact: true }` to the `links` array (single-line change).

That's it. Two files.

## Page outline (mirrors `mindtrip.ai/business` structure + peak.json rubric)

Hero (eyebrow + monumental H1 + lede + dual CTA) → Three-audience proxy card row
(small operators / professionals / agents-of-anyone) → On-page TOC → Section 1
"What you can sell" (anything with a kind:30402) → Section 2 "Why the marketplace is
fair" (federated operators compete; no platform can deplatform; rubric-aligned
security) → Section 3 "MCP — list once, appear everywhere" (syndication to agents
per MCP.md) → Section 4 "How listing works" (3-step: publish kind:30402 → relay
fan-out → MCP discovery) → Section 5 "What you keep" (no rent extraction; flat
protocol fee; you hold your keys; you own your reputation) → Final CTA card
("Start selling").

Target line count: ~220-280 lines (slightly longer than `/pay` because vendor
audience benefits from explicit reassurance on three axes: distribution,
fairness, and self-custody).

### Section copy (decisions, to lock)

1. **Eyebrow.** `For merchants`
2. **H1.** `Open protocol. Federated. Uncensorable.`
3. **Hero lede.** Two-sentence plain-English statement that you can sell anything
   that has a price (physical goods, stays, services, digital goods, experiences),
   that no platform sits between you and the buyer, and that the marketplace
   design makes attacking it a bad business. ~40-55 words.
4. **Hero CTAs.** Primary lime-pill: `Start selling` → `/docs` (the docs index is
   the current onboarding entry; no separate onboarding route exists). Secondary
   outline pill: `Read the protocol` → `/pay` (cross-link to the deeper protocol
   page).
5. **Three-audience proxy row** (matches the "three audiences" pattern on `/pay`,
   but reframed for vendor perspective):
   - `For independent sellers` (sky icon) — physical goods, single operator.
     Tertiary CTA → `#what-you-can-sell`.
   - `For service businesses` (violet icon) — stays, tours, digital goods.
     Tertiary CTA → `#what-you-can-sell`.
   - `For anyone, anywhere` (coral icon) — pseudonymous, no KYC at protocol,
     cross-border. Tertiary CTA → `#why-fair`.
6. **TOC entries** (5): `what-you-can-sell · why-fair · mcp · how-it-works · what-you-keep`.
7. **#what-you-can-sell** — 4 small cards (tonal, borderless, radius 28) with
   pastel icons and 2-sentence copy each: Physical goods / Stays & experiences /
   Services & digital / Anything with a price. Each card names the kind:30402
   namespace convention (`voyager.physical.v1`, `voyager.accommodation.v1`,
   `voyager.service.v1`, custom). No new namespace definitions; copy references
   existing extensible.md conventions where they exist and is honest about
   custom-namespace support.
8. **#why-fair** — One bone-100 card titled "Why the marketplace is fair by
   construction." Three numbered points (no rubric score numbers, no jargon):
   a) Operators compete — Mostro nodes compete on rate, fee, and reputation; you
      pick the one your buyer uses.
   b) No one can deplatform you — listings live on public relays; take one down
      and four more still have them.
   c) Attacking it is a bad business — the same EROI rubric Voyager Pay was
      built against means a capturable marketplace isn't the marketplace you'll
      get.
   Closing line: "The protocol has no politics. It has math."
9. **#mcp** — One bone-100 card referencing MCP.md §0-§2 and §5. Copy explains:
   - "When you publish a listing, voyager-mcp indexes it for AI agents."
   - "List once; appear in every agent host that connects to a Voyager MCP
     surface."
   - "You don't build an API. You don't register with OpenAI. You publish a
     signed event."
   - "The MCP server holds no keys, no balances, no custody."
   - Inline link to `/docs/how-voyager-pay-extends` for the convention-side, and
     a tertiary CTA `Read the MCP spec` → no internal page exists; link to
     `MCP.md` (open the file at the repo root, with a note: "Specification
     document in the repo at MCP.md").
10. **#how-it-works** — 3 steps in a row of bone-200 cards:
    1. **Publish** — Sign a kind:30402 event with your nostr key.
    2. **Relay** — It lands on the public relay set within seconds.
    3. **Discover** — voyager-mcp and every compatible agent host see it.
    Closing line: "No approval step. No review queue. No platform in the middle."
11. **#what-you-keep** — bone-100 card titled "What you keep." Three short
    bullets:
    - **Your keys.** You sign your own events. No one can revoke your listings.
    - **Your reputation.** Endorsements and zaps are tied to your npub, not to
      a tenant ID.
    - **Your customers.** No intermediary owns the buyer relationship; orders
      route gift-wrapped DMs directly between keys.
12. **Final CTA card.** `Next step` eyebrow, H3 `Start selling`, one-line lede
    pointing at the docs onboarding path, primary CTA `Continue` →
    `/docs/how-voyager-pay-extends` (existing route, deep-link to where
    convention tags are taught). Matches the CTA-card grammar used elsewhere on
    `/pay`.

## Header change (Header.svelte)

Append one entry to the `links` array:

```js
const links = [
    { href: '/', label: 'Home', exact: true },
    { href: '/plan', label: 'Plan a trip', exact: true },
    { href: '/pay', label: 'Voyager Pay', exact: true },
    { href: '/vendors', label: 'For vendors', exact: true },
    { href: '/docs', label: 'Docs', exact: true }
];
```

That's the entire header edit. The mobile fallback link at line 39 stays
pointing at `/plan` (per the layout convention).

## Risks / non-goals

- **MCP section overpromises.** The MCP server is in Phase 1 (reference
  implementation). Copy must say "in development" / "spec freeze" — not "shipped
  today." The plan copy above does not claim it's live; it says "When you
  publish a listing, voyager-mcp indexes it" framed as the design, not a
  current-state promise.
- **"Start selling" CTA goes to `/docs`.** There is no onboarding form. The
  button is a pointer into the docs; that is honest given the codebase. If the
  user wants a real onboarding route, that is a follow-up.
- **No `MCP.md` link in production.** The Vendors page references MCP.md (a
  repo-root file, not a web route). The CTA `Read the MCP spec` will render as
  a tertiary Cta pointing at `/MCP.md`, which 404s in the browser. Two options
  the implementing agent should choose between: (a) keep the link but accept the
  404 (the file exists in the repo for implementers; vendors in production will
  see the published spec elsewhere); (b) drop the tertiary CTA and inline the
  link as plain text "see MCP.md in the repo." Recommended: (b). Decision lives
  in the implementing agent's discretion.
- **"For vendors" Header link.** Adding a fifth top-level nav item tightens the
  desktop nav. The Header has `gap-8` between four items; with five it may wrap
  on narrow desktop viewports. The implementing agent should verify the gap
  still reads cleanly at the 1024px breakpoint. If it wraps, reduce gap from
  `gap-8` to `gap-6` — that's the only acceptable tweak.
- **No image / no "vendor in scene" hero.** peak.json C5 wants hardware-showing-
  the-UI photography. We have no such asset. The plan deliberately uses
  type-only hero (monumental H1 + lede + dual CTA) and leaves the imagery
  question for a follow-up. This scores C5 as Partial (2/4) — acceptable for
  v1; a follow-up adds the hero photography.

## Validation

- Build: `cd voyager && npm run build` succeeds; build time within ±2s of prior
  pass.
- Dev probe: `cd voyager && npm run dev -- --port 5179`; `curl -s
  http://localhost:5179/vendors` returns 200.
- Rendered HTML greps:
  - `Open protocol. Federated. Uncensorable.` appears exactly once (H1).
  - TOC has exactly 5 entries: `what-you-can-sell · why-fair · mcp ·
    how-it-works · what-you-keep`.
  - Header contains both `For vendors` (label) and `href="/vendors"` (link).
  - Each of `Dispersion`/`Information`/`Coupling`/`3/3`/`knob` etc. remains
    unaffected (the audit page's denylist still holds; the new vendors page
    must NOT introduce them either, since peak.json C7 forbids color-noise
    type and our hero voice stays plain).
  - `wc -l` of the new file is in 220-280 range.
  - `kind:30402` and `voyager-mcp` each appear at least once on the new page
    (so the spec terms actually land).
- `Header.svelte` diff is exactly one line added (the new link entry).

## Order of operations

1. Create `voyager/src/routes/vendors/+page.svelte` (one `Write` operation).
2. Edit `Header.svelte` to add the `For vendors` entry (one-line `edit`).
3. Run `npm run build` in `voyager/`.
4. Run `npm run dev -- --port 5179`, probe `/vendors`, run validation grep set.
5. Stop dev server.

## Open questions

None — all material decisions resolved in the three-question round (route,
MCP content, hero copy).