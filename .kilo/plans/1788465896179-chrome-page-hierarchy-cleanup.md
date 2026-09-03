# Header / Footer Chrome — Page Hierarchy Cleanup

## Goal

Make the site's chrome (Header + Footer) point only at **real, full pages** — never at fragment URLs (`#anchor`) or placeholder links — and align the Header's top-level links with the Footer's main column structure so the user always sees a consistent site map.

## Decisions

- **Resolve fragment links with in-page TOCs, not new routes.** The economics / regulatory / ramp / relays / indexer / etc. sections stay inside their parent pages. Each parent page (`/build`, `/network`, `/principles`) gets a small in-page table-of-contents near the top with local jumps (`#anchor`). Chrome lists the parent pages only.
- **Header == Footer top-level columns.** The Header nav becomes the same five labels as the five Footer content columns.
- **Drop dead/duplicate placeholders.** `Contact` and `Terms & privacy` (both pointing at `/principles`) are removed from the Footer. `Docs` is removed from the Footer's ABOUT column (already in LEARN). `All projects` is dropped from PROJECTS (the parent `/projects` is already the same link via the route label "Projects" in the header).

## Footer columns (final, 5 columns matching the Header)

| Column | Links (all real pages) |
|---|---|
| **Stack** | `/stack/identity`, `/stack/payments`, `/stack/ramp`, `/stack/messaging`, `/stack/discovery`, `/stack` *(Overview — last)* |
| **Projects** | `/projects/trip-planner`, `/projects/voyager-pay`, `/projects` *(All projects)* |
| **Build** | `/build` *(Start building)* — economics / regulatory / alpha are now in-page sections reached via the `/build` TOC |
| **Learn** | `/use-cases`, `/docs` |
| **Network** | `/network` — relays / indexer / Mostro nodes are now in-page sections reached via the `/network` TOC |

ABOUT column is removed (its purpose merged: principles lives in the Header now).

## Header (final)

The Header becomes the same five items, in this order:

```
Stack · Projects · Build · Use cases · Network
```

`Docs` moves from the Header to the Footer's Learn column (the URL `/docs` is reachable in one click from the page) — this better reflects that Docs is content, not a primary nav surface. `Principles` moves from Footer ABOUT into **not** being in the Header (it's a one-off long-form doc, reachable from the Footer "Use cases" page and from `/`).
`Start building` CTA stays in the Header.

## In-page TOCs (small, scannable)

Add a lightweight `<nav class="page-toc">` near the top of each multi-section page. List the section labels as plain links to their local anchors. No new component — a small inline `<ul>` styled with `.eyebrow` for the labels and muted body for the rest.

- **`/build`** (`src/routes/build/+page.svelte`): TOC between the hero and the "SDK" section, linking `#economics`, `#regulatory`, `#join-alpha`.
- **`/network`** (`src/routes/network/+page.svelte`): TOC between hero and "Mostro nodes" section, linking `#mostro-nodes`, `#relays`, `#indexer`.
- **`/principles`** (`src/routes/principles/+page.svelte`): optional; only add if the page now exceeds ~4 readable sections. (Current structure has ~6 sections — add a TOC.)

## Files Touched

- `src/lib/components/Header.svelte` — replace the `links` constant: `[Stack, Projects, Build, Use cases, Network]`. Note: `/use-cases` becomes the Header label "Use cases" (matches Footer "Use cases" → `/use-cases`).
- `src/lib/components/Footer.svelte` — rewrite the `columns` array to the 5 columns above. Remove all fragment URLs and placeholders. Footer grid changes from `lg:grid-cols-[1.4fr_repeat(6,1fr)]` to `lg:grid-cols-[1.4fr_repeat(5,1fr)]` (wordmark + 5 columns).
- `src/routes/build/+page.svelte` — add the in-page TOC for `#economics`, `#regulatory`, `#join-alpha`.
- `src/routes/network/+page.svelte` — add the in-page TOC for `#mostro-nodes`, `#relays`, `#indexer`.
- `src/routes/principles/+page.svelte` — add the in-page TOC for the major sections.

## Files NOT Touched

- `src/lib/components/Breadcrumbs.svelte` — already handles dynamic crumbs. The existing in-page CTAs (e.g. `/projects/voyager-pay#extends`, `/build#economics` inside page bodies) stay unchanged — they're not chrome. The Breadcrumbs component already treats them as part of the page's own nav.
- `src/routes/+layout.svelte` — `registerFor(pathname)` map already routes correctly for the pages listed; no path routing changes needed.
- All page bodies — content stays where it is.

## Validation

1. `npm run build` — clean.
2. Smoke test the Header in each route (`/stack`, `/projects`, `/build`, `/use-cases`, `/network`, `/docs`, `/principles`, `/`, `/projects/trip-planner`, `/projects/voyager-pay`):
   - Header shows the 5 labels; active route underlined.
   - Footer columns show only real pages (no fragment URLs anywhere).
   - `Start building` CTA still routes to `/build` correctly.
3. Visual on `/build`, `/network`, `/principles`:
   - TOC near top, ~3-6 links, clean register-aware styling (`var(--register-on-dark-soft)` or appropriate).
   - Anchors scroll smoothly (`scroll-mt-20` is already on the section ids in `/build` and `/network`).
4. No regression on `/principles` (color-scheme work just landed; the TOC reuses `.eyebrow` and bone-muted registers so it slots in without changing that work).

## Risks & Open Questions

- **TOC placement.** If the TOC feels too prominent, place it inside the `SectionHeader`'s `lede` slot or under the SectionHeader rather than above the first content section. Default placement: directly below the hero `<section>`, before the first content `<section>`.
- **`/use-cases` in Header.** It mirrors the Footer "Learn" column's first link. If you'd rather the Header not duplicate a footer link, drop "Use cases" from the Header and let it live only in the Footer. Default kept: Header and Footer share the same top-level items by design.
- **Wordmark presence.** `/` (home) already reachable via the wordmark; not in Header nav. Keep as is.

## Out of Scope

- Adding new full pages for economics, regulatory, relays, etc.
- Changing the `registerFor` mapping or the existing `data-register` per-page.
- Mobile menu (current Header uses `hidden md:flex` — not part of this task).
- Accessibility/contrast pass on Footer bullets (already register-aware).
