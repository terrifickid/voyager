# Header / Footer Chrome — Final Reorganization

## Goal

Reorganize Header and Footer so every real page appears in the Footer, columns match the Header's top-level items, and the structure is sensible.

## Decisions (locked with user)

- **Build merges into Network.** The Header's "Build" item is removed; "Network" column in the Footer contains both `/network` and `/build`. The "Start building" CTA button in the Header stays unchanged.
- **Docs is back.** Header gets "Docs" as the 5th item. Footer gets "Docs" as the last (5th) column, listing the docs index plus all 9 child pages.
- **Trip Planner wizard screens excluded from Footer.** `/projects/trip-planner/plan` and `/projects/trip-planner/preferences` are app-flow screens, reachable in-app from Trip Planner — not listed in chrome.
- **`/principles` stays out of chrome** (unchanged from prior cleanup; reachable from the `/` home page "Read the principles" CTA).
- **No fragment URLs in chrome.** In-page sections stay reachable via the existing on-page TOCs on `/build`, `/network`, `/principles` (already implemented — do not touch).

## Header (final — 5 items)

```
Stack · Projects · Use cases · Network · Docs
```

- `voyager/src/lib/components/Header.svelte` — replace the `links` array with:
  - `{ href: '/stack', label: 'Stack' }`
  - `{ href: '/projects', label: 'Projects' }`
  - `{ href: '/use-cases', label: 'Use cases' }`
  - `{ href: '/network', label: 'Network' }`
  - `{ href: '/docs', label: 'Docs' }`
- "Start building" CTA (`<Cta variant="primary" href="/build">`) stays as-is. `isActive()` logic unchanged.

## Footer (final — 5 columns matching Header)

Rewrite the `columns` array in `voyager/src/lib/components/Footer.svelte`:

### 1. STACK/
- Overview → `/stack`
- Identity → `/stack/identity`
- Payments → `/stack/payments`
- Fiat ramp → `/stack/ramp`
- Messaging → `/stack/messaging`
- Discovery → `/stack/discovery`

### 2. PROJECTS/
- All projects → `/projects`
- Trip Planner → `/projects/trip-planner`
- Voyager Pay → `/projects/voyager-pay`
- Fair pricing → `/projects/voyager-pay/pricing`
- Security by design → `/projects/voyager-pay/security`
- For vendors → `/projects/voyager-pay/vendors`

### 3. USE CASES/
- Overview → `/use-cases`
- UC1 · Artist admin & payments → `/use-cases/uc1`
- UC2 · Caribbean commerce → `/use-cases/uc2`
- UC3 · Concierge & tourism → `/use-cases/uc3`
- UC4 · Creator monetization → `/use-cases/uc4`
- UC5 · Island logistics → `/use-cases/uc5`
- UC6 · Cultural discovery → `/use-cases/uc6`
- UC7 · Venue matchmaking → `/use-cases/uc7`
- UC8 · Sports & diaspora → `/use-cases/uc8`

### 4. NETWORK/
- The network → `/network`
- Run a node → `/projects/voyager-pay/node`
- Start building → `/build`

### 5. DOCS/
- Documentation → `/docs`
- What EROI is → `/docs/what-is-eroi`
- Why systems get captured → `/docs/why-systems-get-captured`
- What a rubric is → `/docs/what-is-a-rubric`
- How rubrics evaluate & generate → `/docs/rubrics-evaluate-and-generate`
- How Voyager Pay works → `/docs/how-voyager-pay-works`
- How Voyager Pay extends → `/docs/how-voyager-pay-extends`
- Voyager Pay EROI audit → `/docs/voyager-pay-eroi-audit`
- How price discovery works → `/docs/how-price-discovery-works`
- How Voyager plans trips → `/docs/how-voyager-plans`

Total: 34 footer links. Grid template stays `lg:grid-cols-[1.4fr_repeat(5,1fr)]` (wordmark + 5 columns) and `sm:grid-cols-3` — no CSS changes needed.

## Pages intentionally NOT in chrome

- `/` (home) — reachable via the wordmark, as today
- `/principles` — reachable from `/` home CTA
- `/projects/trip-planner/plan`, `/projects/trip-planner/preferences` — app-flow screens, reachable in-app

## Files to edit

1. `voyager/src/lib/components/Header.svelte` — replace `links` array (lines 17–23)
2. `voyager/src/lib/components/Footer.svelte` — replace `columns` array (lines 20–76)

## Files NOT touched

- All page bodies, including the on-page TOCs on `/build`, `/network`, `/principles`
- Footer grid CSS, register styles
- `src/routes/+layout.svelte` (`registerFor` mapping already covers `/docs`)

## Validation

1. `npm run build` — clean
2. Serve the site and curl `/`; verify:
   - Header nav renders exactly 5 links in order: Stack, Projects, Use cases, Network, Docs
   - Footer renders exactly the 34 links above — no `#` fragments, no `/principles`, no `/plan` or `/preferences` wizard URLs
3. Spot-check active state: `/docs` highlights "Docs", `/network` highlights "Network", `/build` highlights nothing in nav (expected — Build is only in the Footer now) while the "Start building" CTA still routes to `/build`
4. Spot-check `/use-cases/uc3`, `/projects/voyager-pay/pricing`, `/docs/what-is-a-rubric` return 200
