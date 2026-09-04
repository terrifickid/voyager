# Plan — `/projects` directory with search + category filter (Voyager AI only for now)

## Goal

Reframe `/projects` as a searchable, category-filterable app directory. For now the directory contains only Voyager AI; the search box and category chips are present as UI scaffolding so that future apps can be added without another UI pass. Trip Planner and Voyager Pay are removed from the showcase list (and from the home page's `// built on Voyager` strip, for consistency). The two `opportunity` placeholders (voyager-stage, voyager-market) are dropped per the chosen option.

## Scope (in)

- `voyager/src/routes/projects/+page.svelte` — rewrite showcase section to a filterable directory.
- `voyager/src/lib/data/projects.json` — new file. Single entry for now (Voyager AI), structured so future apps slot in.
- `voyager/src/lib/components/ProjectCard.svelte` — new component. Mirrors the existing card visual style used on `/projects` today (rounded-32, card background, eyebrow + h2 + body + "Open" link).
- `voyager/src/lib/components/ProjectFilter.svelte` — new component. Search input + category chip row, both wired to Svelte 5 runes.
- `voyager/src/routes/+page.svelte` — drop Trip Planner and Voyager Pay from the `// built on Voyager` strip; leave Voyager AI as the only card there too.

## Scope (out)

- `/projects/trip-planner/*` and `/projects/voyager-pay/*` route directories — left in place. No deletion, no redirect. Their deep links still resolve. (A future housekeeping pass can decide whether to remove or redirect; not part of this change.)
- `/use-cases` — untouched. It is a separate page with its own filter-less list.
- Header / Footer / `Breadcrumbs` / `+layout.svelte` — no chrome changes.
- `useCases.json`, `primitives.json`, `mostroNodes.json`, `aiRelays.json`, `aiIntents.json`, `aiMarketplace.json`, `aiEmbedSnippet.json` — no changes.

## Decisions

1. **Source list = a new `projects.json` data file, currently one entry.** Follows the same pattern as `useCases.json`. Lets the filter operate on a real list shape (not a hardcoded template literal) so adding a second app is a JSON edit, not a UI edit.
2. **Categories are app-type, not primitive-type.** "AI / Payments / Marketplace / Concierge / Logistics / Social" is the proposed chip set (plus an "All" chip). These are the standard shapes a Caribbean app falls into, mapped loosely to the UC1-UC8 taxonomy but not bound to it. Voyager AI's category is `ai`. Future apps pick one or more.
3. **Filter is purely client-side, no URL state.** Two `$state` runes (search term, active category) drive a `$derived` filtered list. The chips update the active category; the search input filters by case-insensitive substring match against `title + body + tags`. No query-string syncing in this pass.
4. **"Ship your own" CTA card stays.** The page after the filter section still leads the reader to `/build` and `/use-cases`. The `RoadMarchRibbon` lineage strip stays.
5. **No "no results" state needed today** since the only entry matches `All` and `AI`. The component should still be written defensively (render an empty grid + small "No apps match" line) so it doesn't crash on a future zero-result state.
6. **Hardcoded color guard from prior validations still applies** — no `bg-(bone|ink)` or `text-(ink|bone|muted)` classes. Stick to existing token-driven classes (`var(--register-…)`, `var(--carnival-…)`).

## Data shape

`voyager/src/lib/data/projects.json`:

```json
[
  {
    "slug": "voyager-ai",
    "code": "voyager-ai",
    "title": "Voyager AI",
    "body": "The intelligence layer across Identity, Payments, Ramp, Messaging, and Discovery. Search relays, sign listings, and parse payments — in your browser.",
    "href": "/projects/ai",
    "category": "ai",
    "status": "live"
  }
]
```

Schema: `slug`, `code`, `title`, `body`, `href`, `category` (string, single), `status` (string; currently `live` is the only value used, but the field exists so future `opportunity` / `beta` / `shipped-by-builder` entries can co-exist).

`projects.json` does **not** delete or replace `useCases.json` or `primitives.json` — different lists, different pages.

## Component shape

### `ProjectCard.svelte`

Mirrors the visual of the existing hardcoded card on `/projects/+page.svelte:62-75` (eyebrow + h2 + body + "Open {title} ›" link, rounded-32, card background). Pure presentational. Props: `{ slug, code, title, body, href, register = 'carnival-poster' }`.

### `ProjectFilter.svelte`

Props: `{ items: ProjectItem[], categories: string[] }`. Internal state:

- `let search = $state('')`
- `let active = $state('all')`
- `let visible = $derived(items.filter(...))` — match `active === 'all' || item.category === active` AND `(search.trim() === '' || haystack includes search.toLowerCase())` where `haystack = (title + ' ' + body + ' ' + (tags||[]).join(' ')).toLowerCase()`.

Renders:
- A search `<input>` with placeholder "Search apps" (styled with `var(--register-card)` background and `var(--register-hair)` border; no hardcoded color classes).
- A row of category chips. The active chip uses `var(--register-accent)` background and `var(--register-accent-ink)` text (matches the existing Cta "primary" treatment). Inactive chips use `var(--register-card)` background and `var(--register-text)` text with `var(--register-hair)` border.
- A 1/2/3-column grid of `ProjectCard` items below, using `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (matches the current showcase grid spacing).
- An empty-state `<p>` ("No apps match that filter.") rendered only when `visible.length === 0`.

## `/projects/+page.svelte` rewrite outline

1. Hero `<section>` — eyebrow, h1, lede unchanged. Update lede copy from "Voyager-the-business ships 3 showcases…" to a single-app phrasing: "One showcase is live today. More land as builders ship on the toolkit."
2. Replace the hardcoded card grid (current lines 32-77) with `<ProjectFilter items={projects} categories={['all','ai','payments','marketplace','concierge','logistics','social']} />`.
3. Remove the "Two more showcase apps, ready to ship" section (current lines 79-103).
4. Keep the "Ship your own" CTA card (current lines 105-116).
5. Keep the `RoadMarchRibbon` (current lines 118-124). Possibly reword `winners` so it doesn't read as "showcase lineage" when there's only one live showcase; alternatively leave the dates as-is and let the section read as historical. **Decision flag: keep as-is for this pass; revisit in a follow-up if it reads awkwardly.**

## Home page `// built on Voyager` strip

- `voyager/src/routes/+page.svelte` lines 84-127 — drop the two cards for Trip Planner and Voyager Pay. Keep only the Voyager AI card.
- Change grid from `md:grid-cols-2 lg:grid-cols-3` to `md:grid-cols-1` (single card centred, or kept at `lg:grid-cols-3` and the single card spans one column — the latter is the smaller diff). **Decision flag: use `md:grid-cols-1 lg:grid-cols-3` so the single card stays in the same horizontal position as before; the right two-thirds of the row reads as intentional whitespace.**
- Update the `SectionHeader` lede from "Three showcase apps live today." to "One showcase app is live today."
- Strip the `lede` claim "Three showcase apps live today" — replace with the single-app phrasing above.
- The page build still imports `Cta` and `SectionHeader`; no import changes needed.

## Files affected

```
voyager/src/routes/projects/+page.svelte              EDIT (showcase → filterable directory; drop 2 opportunity cards)
voyager/src/routes/+page.svelte                       EDIT (// built on Voyager: keep only Voyager AI)
voyager/src/lib/data/projects.json                    NEW (single Voyager AI entry; future entries slot in)
voyager/src/lib/components/ProjectCard.svelte         NEW (presentation-only)
voyager/src/lib/components/ProjectFilter.svelte       NEW (search + category chips + grid; Svelte 5 runes)
```

## Validation

- `npm run build` from `/workspaces/voyager/voyager` — clean.
- Visit `/projects` in a dev server. Confirm: search input visible, all six category chips render with `all` highlighted, only the Voyager AI card shows in the grid. Typing into the search filters the card out (then back) and a "No apps match that filter." line appears when the match is gone. Clicking the `payments` chip leaves the grid empty and shows the empty state.
- Visit `/`. Confirm the `// built on Voyager` strip shows only the Voyager AI card and the lede reads "One showcase app is live today."
- `rg -n "trip-planner|voyager-pay" voyager/src/routes/+page.svelte voyager/src/routes/projects/+page.svelte` — no matches in the home page strip or the /projects showcase section (the route directories are intentionally still present).
- No hardcoded color classes (`bg-(bone|ink)|text-(ink|bone|muted)`) introduced in the two new components.

## Open questions (flagged, not blocking)

- The `RoadMarchRibbon` on `/projects` still lists "voyager-concierge alpha" (2024) and "voyager-pay · spec v0.1" (2025) as winners. With those two apps no longer in the showcase, the ribbon reads as historical lineage, which is fine but a little out of step with the new "one showcase" framing. Decision: leave it for this pass.
- Future apps added to `projects.json` will need a `category` chosen from the chip set. If a new app doesn't fit any of the proposed six categories, the chip set should be reviewed. Out of scope here.
- The home page strip is in scope for the two-card removal but the hero / hero CTAs / use-cases strip / network stats / SDK band / docs band / final CTA / CarnivalRibbon are not touched.
