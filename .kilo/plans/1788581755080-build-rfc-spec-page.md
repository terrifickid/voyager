# Plan: Add RFC specification page to /build

## Goal

Expose the canonical Voyager protocol RFC as a first-class page inside the `/build` section, mirroring the `/docs/*` reading pattern. Builders reading `/build` should be one click away from the full protocol spec without leaving the build surface.

## Confirmed decisions

- New child route: `src/routes/build/rfc/+page.svelte` (user-confirmed).
- The page renders the full RFC content inline. No external load, no markdown runtime dependency.
- Page chrome reuses the existing `/docs` layout pattern (sidebar + content + TOC), but scoped to the `/build` section so it does not affect `/build`'s current visual structure.
- The RFC source of truth remains `voyager_rfc.md` (currently just a pointer at the repo root) and the upstream `https://github.com/terrifickid/voyager-sdk/blob/master/VOYAGER_RFC.md`. The on-site page is a rendered snapshot, updated by hand from upstream.

## Affected boundaries

- New file: `voyager/src/routes/build/rfc/+page.svelte`
- New file: `voyager/src/routes/build/+layout.svelte` (provides sidebar + content grid for `/build` and `/build/*`)
- New file: `voyager/src/lib/data/rfc-sections.js` (exports the structured RFC content so it can be consumed both by the page and by the TOC; avoids an unmaintainably huge `.svelte` template and a markdown runtime dep)
- Edit: `voyager/src/routes/build/+page.svelte` — add a small CTA section near the top of the SDK area that links to `/build/rfc`. Do not redesign the page.
- Edit: `voyager/src/lib/components/Breadcrumbs.svelte` — add `rfc: 'RFC'` to `SHORT_LABELS` so breadcrumbs read "Voyager › Build › RFC" instead of "Rfc".

## Page structure for /build/rfc

1. Hero
   - Eyebrow: `// protocol RFC`
   - Title: `Voyager — Protocol RFC`
   - Lede: one-line statement of what the RFC is.
   - Meta strip: Series, Type, Status (`DRAFT`), Version, Created, Layer, Audience — pulled from the RFC front matter.
2. Sticky in-page TOC (right column) auto-built from headings inside the article — reuse the existing `TableOfContents` component used by `/docs`.
3. Sidebar (left column) listing the rest of the `/build` reading path: "Back to /build", "SDK get-started", "Key model", "Verb reference", "Economics", "Regulatory posture", "Join the alpha". Anchors scroll into `/build` via existing `#economics`, `#regulatory`, `#join-alpha` ids (the SDK sections have no anchor today — add `id` attributes only if a one-line edit; otherwise list titles without links).
4. Article body — the RFC content, sectioned in the same order as the source:
   - `0. Design invariants` (5 bullets)
   - `1. Architecture and layer model`
   - `2. Roles and threat model`
   - `3. Naming and terminology`
   - `4. Conformance and versioning`
   - `5. Transport: Nostr events`
   - `6. Transport: Lightning`
   - `7. Substrate event kinds`
   - `8. Substrate tag grammar`
   - `9. Conventions: the v tag namespace`
   - `10. Listing schema (kind:30402)`
   - `11. Stall schema (kind:30017)`
   - `12. Order flow state machine`
   - `13. Fiat ramp protocol`
   - `14. SDK contract`
   - `15. Reference clients and operator toolkit`
   - `16. Naming, distribution, and identity binding`
   - `17. Conformance test vectors`
   - `18. Threat model and EROI mapping`
   - `19. What this RFC explicitly does NOT solve`
   - `20. Change-log`
   - `Appendix A` — JSON-Schema (30402, 30017, etc.)
   - Appendices B/C as appropriate (render as `<details>` blocks so they do not dominate the page).
5. Footer link: "View the source on GitHub → `https://github.com/terrifickid/voyager-sdk/blob/master/VOYAGER_RFC.md`".

## Content module: `src/lib/data/rfc-sections.js`

Export an array of `{ id, level, title, body }` records that the page renders with a small loop, e.g.:

```
{#each sections as s}
  <section id={s.id} class="rfc-section">
    <h2>{s.title}</h2>
    {@html s.body}
  </section>
{/each}
```

`body` is pre-rendered, sanitized HTML generated once at build time by a tiny build script (see "Authoring workflow" below). This keeps the page template small, lets the TOC scrape headings via the existing `TableOfContents` component, and avoids adding `marked`/`remark` as a runtime dependency.

**Authoring workflow (manual, one-time per RFC revision):**
1. Fetch `https://github.com/terrifickid/voyager-sdk/raw/refs/heads/master/VOYAGER_RFC.md`.
2. Hand-convert to the structured `rfc-sections.js` array (one section per top-level `##` heading). Section bodies are written as HTML strings; code fences become `<pre><code>`; tables become `<table>`; the conformance ASCII diagram becomes a `<pre>` block.
3. Update the `version`, `status`, and `created` fields at the top of the file when upstream changes.
4. Commit. Reviewer verifies headings match upstream TOC ordering.

This is intentionally low-tech: it does not introduce a build-time markdown toolchain, keeps the page fast, and surfaces drift in code review.

## +layout.svelte for /build

New file at `voyager/src/routes/build/+layout.svelte`. Two responsibilities:

1. Wrap child routes in a 3-column grid (sidebar / article / TOC) using the same structure as `src/routes/docs/+layout.svelte`, so `/build/rfc` gets a sidebar and TOC without duplicating that chrome in the page itself.
2. Apply the `carnival-poster` register (matches the existing `/build` page) so colors and typography stay consistent.

The layout must NOT change the rendering of the existing `/build/+page.svelte`. To preserve it, the layout renders its grid only when `page.url.pathname !== '/build'`. Inside `/build`, the page renders exactly as it does today — the only diff is the small CTA linking to `/build/rfc`.

Alternatively, the layout can render the grid for all `/build/*` children including `/build` itself, and we adjust `/build/+page.svelte` to live inside the article slot. This requires more rework of the existing page (moving its hero into the slot, adding an in-page TOC). **Rejected** for this iteration — it conflicts with the user's request to add an RFC page, not redesign `/build`.

## CTA on /build

Insert a single, compact section in `voyager/src/routes/build/+page.svelte` between the existing "Verb reference" section (line ~206) and the "Economics" section (line ~209):

- Eyebrow: `// the spec`
- Title: `The full protocol RFC.`
- Lede: short sentence pointing at the formal spec (status, version, audience).
- Two `<Cta>` buttons:
  - Primary: `Read the RFC` → `/build/rfc`
  - Secondary: `View on GitHub` → the upstream URL (new tab, `rel="noopener noreferrer"`).
- Wrap in the same `rounded-[28px] bg-[var(--register-card)] p-8` container used by adjacent sections so the visual rhythm holds.

This is the only edit to `/build/+page.svelte` — no other changes to copy, layout, or existing sections.

## Risks and mitigations

- **Drift from upstream RFC.** The on-site RFC is a snapshot. Mitigation: page footer shows "Source: <github link>" and the version line at the top of the article; `rfc-sections.js` header comment records the upstream commit hash on each update.
- **Editorial effort on each revision.** Hand-converting 1300+ lines is non-trivial. Out of scope for this plan: adding a markdown pipeline. If/when the RFC revision cadence accelerates, revisit by introducing `mdsvex` or a build-time `marked` step.
- **Breadcrumb label.** Without `rfc` in `SHORT_LABELS`, breadcrumb reads "Rfc". Mitigated by the edit listed above.
- **Sidebar anchor links to in-page `/build` sections that lack `id`s.** The plan tolerates either showing them as non-link text or adding `id` attributes to those sections in a follow-up if reviewers want full cross-linking. Default: render them as non-link items so this plan stays minimal.
- **TOC over a very long page.** The existing `TableOfContents` component already handles the docs pages; if rendering ~100 headings is slow in practice, add a `data-toc-max-depth="2"` attribute and/or collapse sub-headings.

## Validation

After implementation:
1. `cd voyager && npm run dev`, open `http://localhost:5173/build` — confirm the existing page still renders identically except for the new CTA section.
2. Click the new CTA → land on `/build/rfc`. Confirm sidebar, article, and TOC render; confirm breadcrumb reads "Voyager › Build › RFC".
3. Click each item in the right-column TOC → URL hash updates and the section scrolls into view (existing `scroll-mt-20` / `scroll-margin-top: 5rem` patterns apply).
4. Resize to mobile width → sidebar collapses, TOC hides, article remains readable.
5. Click "View on GitHub" → opens upstream RFC in a new tab.
6. `npm run build` succeeds; `npm run lint` and `npm run check` (Svelte type-check) pass with zero new errors. If a `check`/`lint` script is not present, ask the user before adding one.

## Out of scope

- Implementing a markdown → HTML build step.
- Auto-syncing the on-site page with upstream via a CI job.
- Translating the RFC copy — only the English source is rendered.
- Adding the RFC to `/docs` index or footer — the user asked for `/build`, and `/build` already has its own navigation surface.
- Restructuring `/build/+page.svelte` to use the new layout's article slot.
