# Voyager → Caribbean platform refactor (plan)

Restructure Voyager from a trip-planner site into a platform site in the scope of
`refactor/voyager.md` (open toolkit: 5 primitives + SDK + showcase apps), using a
full sui-scale IA, with cdesign.json Caribbean style on top of the kept peak.json
chrome. Tailwind HTML only. No fancy effects. Usability-forward.

**Everything migrates — nothing is deleted.** Every section on the site today moves
to its proper destination: trip-planning content under the Trip Planner project,
payments content under Voyager Pay.

## Locked decisions (from user, 2026-09-03)

- **Palette:** MOCK palette now, refine later. Jamaica/Trinidad national palettes are
  the intended direction; the current mock leans tech/civic-ocean (navy) for sui.io
  adjacency.
- **Accent:** ONE global accent. Lime `#BEE93A` is the single action color on every
  surface, including Voyager Pay (which already uses it).
- **Moves, no redirects:** `/pay`, `/plan`, `/vendors`, `/preferences` move into a
  projects hierarchy (site not live yet, so moves are direct).
- **IA scope:** Full sui-scale IA — dedicated pages per primitive and per use case.
- **Sui rubric usage:** Structure and voice only — two-clause declarative
  sentence-case headlines, `//`-style section labels, stat numerals, dotted/dashed
  dividers, footer strip motif, 5–6 column footer. Colors stay Caribbean.
- **Untouched:** header layout, breadcrumb component, footer pattern,
  `PayCheckoutCard` homepage band ("Voyager Pay — built in"), and all functional code
  (`/plan` wizard, `/preferences`, webllm, ramp quotes, `/api`, hooks).
- **Copy rules:** `voyager/.kilocode/rules/clear-communications.md` and
  `usability.md` apply to every new page. Front-load value, sentence case, define
  jargon (Nostr, Lightning, Mostro, NIP-17) at first use, no marketese, no
  exclamation marks. Positive framing throughout: state what the thing IS and DOES.

## Design tokens (mock — revisit with JA/TT research)

Add to `src/routes/layout.css` `@theme` and `src/lib/styles/tokens.css`:

```
--color-night-900: #10233B;   /* navy dark bands (civic-ocean register, cdesign C2) */
--color-night-800: #18304F;   /* lifted card on night */
--color-night-100: #D7E2EE;   /* text on dark, secondary */
--color-on-dark: var(--color-bone-50);
```

- Bone ramp, ink, pastels, radii: unchanged (peak.json preserved).
- Lime is the only accent. Navy is a SURFACE, not a second accent.
- Contrast: bone-50 on night-900 and lime on night-900 both pass AA; verify once in
  the terminal phase (C3 spot-check).
- Font: keep Space Grotesk display + Inter body (peak continuity). Bebas Neue /
  Oswald condensed-bold upgrade (cdesign C4) is deferred with the palette work.

## voyager.md coverage map (every section communicates)

| voyager.md section | Destination page |
|---|---|
| § 0 pivot (trip planner → toolkit) | `/principles` — "What changed and why" |
| § 1 pitch paragraph | `/` hero + first band |
| § 2 UC1–UC8 (8 use cases) | `/use-cases` index + 8 detail pages, strip on `/` |
| § 3.1 P1–P5 primitives | `/stack` + `/stack/{identity,payments,ramp,messaging,discovery}` |
| § 3.2 SDK (call list) | `/` SDK band (terminal mock) + `/build` SDK section + `/docs` |
| § 3.3 showcase apps (concierge, stage, market) | `/projects` index |
| § 3.4 scope boundaries | `/principles` — framed positively: "Voyager stays a toolkit — builders own the apps" |
| § 4 builder economics | `/build` |
| § 5 regulatory posture | `/build` section + pointer to the SDK "regulatory checklist" doc |
| § 6 EROI defense (F=3 O=3 B=3) | `/principles` summary + links to `/docs/what-is-eroi`, `/docs/why-systems-get-captured` |
| § 7 go-to-market / alpha partners | `/build` — "Join the alpha" reciprocal CTA (cdesign C9) |
| § 8 network hardening (R1–R5) | `/principles` — framed positively: "How the network gets stronger" (SDK ergonomics, more ramp operators, builder guidance, independent indexers) |
| § 9 roadmap questions | `/principles` — "Where builders take it next" |

`/principles` is linked from the footer ABOUT/ column and from relevant bands; the
header stays at ≤7 items.

## Information architecture

Header (visible, ≤7 items, no hamburger on desktop — usability §2):
Home (logo) · Stack · Projects · Use cases · Network · Docs · CTA `Start building ›` → /build.
Mobile: keep current pattern (logo + one visible primary link).

Breadcrumbs: auto-derived; extend SHORT_LABELS with `stack`, `projects`, `network`,
`build`, `use-cases`, `principles`, `trip-planner`. Refresh stale `plan`/`pay` labels.

Footer: keep bone bg, logo blurb, language pill, bottom line. Expand to 6 columns in
sui signature: `STACK/ PROJECTS/ BUILD/ LEARN/ NETWORK/ ABOUT/`, link items prefixed
with a small square-dash glyph (sui C4), plus the thin "signal bars" strip below the
copyright line (sui C5 adapted: vertical bars night-900 → night-800 → transparent,
~80–120px, pure CSS/SVG inline, `prefers-reduced-motion` safe, no images).
ABOUT/ column links: Principles, Docs, Contact, Terms/Privacy.

### Route map

| Route | Source / content |
|---|---|
| `/` | rebuilt home (below) |
| `/stack` + 5 primitive pages | voyager.md § 3.1; one data file + shared template |
| `/projects` | showcase apps index (concierge live, stage + market as builder opportunities) |
| `/projects/trip-planner` | NEW landing; absorbs old home's trip-planning content (see migration) |
| `/projects/trip-planner/plan` | moved `/plan` wizard (code untouched) |
| `/projects/trip-planner/preferences` | moved `/preferences` (code untouched) |
| `/projects/voyager-pay` | moved `/pay` + absorbs marketplace/MCP sections (see migration) |
| `/projects/voyager-pay/pricing` `/security` `/node` | moved `/pay/*` (code untouched) |
| `/projects/voyager-pay/vendors` | moved `/vendors` |
| `/use-cases` + 8 pages | UC1–8; one data file + shared template |
| `/network` | Mostro nodes (lib/data/mostroNodes.json), relays, optional indexer (§ 3.3/R2/R4) |
| `/build` | § 4, § 5, § 7 + SDK get-started |
| `/principles` | § 0, § 3.4, § 6, § 8–9 |
| `/docs/*` | unchanged; landing re-indexed for platform scope |

## Existing-content migration table (everything carries over)

| Current content (home `/`) | Destination |
|---|---|
| Lime ribbon | Stay on `/`, retag copy to platform announcement |
| Hero + `HeroMockup` | → `/projects/trip-planner` landing |
| "How it works" 3-step card | → `/projects/trip-planner` |
| "Travel. Stay. Share." FeatureCards | → `/projects/trip-planner` |
| PersonaCards "Whoever you travel with" | → `/projects/trip-planner` |
| Testimonials marquee (`REVIEWS`, `QuoteCard`) | → `/projects/trip-planner`, copy unchanged |
| "Voyager Pay — built in" band + `PayCheckoutCard` | STAY on `/` (kept as-is) |
| "Built for any marketplace" 4 vendor-kind cards | → `/projects/voyager-pay` |
| MCP "List once, appear everywhere" band | → `/projects/voyager-pay` (relink `/vendors#mcp` → `/projects/voyager-pay/vendors#mcp`) |
| Documentation band | Stay on `/`, retag to platform docs |
| Final CTA band | Stay on `/`, retag CTA to `/build` |

Components: `QuoteCard`, `PersonaCard`, `HeroMockup`, `BrandRow` are relocated and
reused. Check imports before touching any of them.

## Homepage rebuild (section order)

1. Ribbon (as above).
2. Hero: ONE statement ≤20 words, ONE primary CTA (`Start building`) + secondary
   (`See projects`). Cultural anchor (cdesign C1): name the region plainly —
   e.g. "An open toolkit for building Caribbean-first apps." Real h1 = hero text.
3. Five-primitives strip (cards + dotted dividers, links into /stack/*).
4. "Built on Voyager" projects showcase: Trip Planner card + Voyager Pay card.
5. Voyager Pay — built in: existing band + `PayCheckoutCard` VERBATIM (peak tones).
6. Use cases strip: 8 compact cards → /use-cases pages.
7. Network stats band on `night-900`: 3–4 giant numerals, tiny ALL-CAPS labels,
   sentence-case declarative heading (sui rhythm, Caribbean palette).
8. SDK band: terminal mock reused, `voyager.*` calls from § 3.2.
9. Docs band + final CTA band → `/build`.

## Components

- Reuse (relocated): `Cta`, `SectionHeader`, `FeatureCard`, `PersonaCard`,
  `QuoteCard`, `Icon`, `PayCheckoutCard`, `HeroMockup`, `BrandRow`.
- New (flat Tailwind only): `StatBlock` (giant numeral + ALL-CAPS label), `Divider`
  (1px dotted, ink/20 — bone-50/20 on dark), `FooterBars` (strip), `PrimitiveCard`,
  `UseCaseCard`.

## Task list (ordered)

1. Add night tokens to `layout.css` + `tokens.css`.
2. Update `Header.svelte` link set + mobile link; extend `Breadcrumbs.svelte` labels.
3. Expand `Footer.svelte` to 6 columns (trailing-slash headers, glyph prefixes) and
   add the footer bars strip.
4. Move `/pay` trees → `/projects/voyager-pay*`; `/plan`, `/preferences` →
   `/projects/trip-planner*`; `/vendors` → `/projects/voyager-pay/vendors`. Fix every
   internal link (`rg 'href="/(pay|plan|vendors|preferences)'`).
5. Create `/projects/trip-planner` landing: migrate hero+HeroMockup, how-it-works,
   Travel/Stay/Share, personas, testimonials marquee from old `/`.
6. Update `/projects/voyager-pay` landing: migrate marketplace cards + MCP band.
7. Build new components (StatBlock, Divider, FooterBars, PrimitiveCard, UseCaseCard).
8. Rebuild `/` per section order above.
9. Create `/stack` + 5 primitive pages (data file + template, copy from § 3.1).
10. Create `/projects` index.
11. Create `/use-cases` data file + index + 8 pages (copy from § 2).
12. Create `/network` (nodes from mostroNodes.json; present the reference node and
    community nodes as distinct roles per § 3.3, with an invitation to run a node).
13. Create `/build` (§ 4 economics, § 5 regulatory pointer, § 7 join-alpha CTA).
14. Create `/principles` (pivot story, toolkit-vs-apps framing, EROI summary,
    network-hardening priorities, where builders take it next).
15. Re-index `/docs` landing for platform scope (existing links stay valid).
16. Titles + exactly one h1 per page (C8); refresh every `<svelte:head><title>`.

## Validation

- `npm run build` clean.
- `rg 'href="/(pay|plan|vendors|preferences)'` → zero hits.
- Each page: exactly one `<h1>`; breadcrumb on non-home; one primary CTA per screen.
- Contrast spot check on night bands (bone-50 text, lime CTA).
- Copy pass against clear-communications.md (answer-first, defined jargon, sentence
  case, positive framing, no exclamation marks) and cdesign (C1 anchoring, C2 one
  register, C6 plain literal surfaces, C9 reciprocal CTA present).
- Usability pass: header ≤7 visible items, no hamburger on desktop, no carousel or
  interstitial on new home, touch targets ≥44px, no color-only meaning.
