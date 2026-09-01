# Plan — Redesign Voyager docs against compass-js

## Goal

The docs section (`/docs/*`) currently feels like a wall of prose. Each lesson is a single column with hand-rolled callouts, no table of contents, and typography that's heavier than it needs to be. The user has provided `/compass-js` — a Tailwind-based docs template — as a structural reference and asked for a redesign that improves format, design, legibility, copy, and structure while still conforming to `peak.json`.

## Decisions (locked, from questions)

1. **Layout**: 3-pane compass-faithful. Left sidebar (keep ~220px sticky) + center content + right-rail table of contents (scans h2/h3 at runtime via IntersectionObserver). Same warm-neutral palette as the rest of the site.
2. **Components**: Keep ad-hoc markup. No new shared components file. The right-rail TOC is the only new component (one file, well-scoped).
3. **Copy**: Tighten every lesson. Shorter paragraphs, declarative openers, fewer hedges. Same content, leaner prose. Voice matches compass-js (direct, technical, no marketing fluff).
4. **Gaps**: Fix both. Add Lesson 8 to the sidebar `lessons` array; create a stub `what-can-still-go-wrong` page so the Lesson 7 next-up card resolves cleanly.
5. **Tokens**: Map compass-js grays to existing Voyager tokens — no new tokens introduced.
6. **TOC**: Runtime, DOM-based, IntersectionObserver, scans h2/h3 inside a content root.
7. **Top navbar**: None. Sidebar carries nav; breadcrumbs live in each page header.

## Affected files

1. **New** — `voyager/src/lib/components/TableOfContents.svelte` — right-rail TOC component.
2. **Modified** — `voyager/src/routes/docs/+layout.svelte` — switch to 3-pane grid; add `TableOfContents`; add Lesson 8 to sidebar.
3. **Modified** — `voyager/src/routes/docs/+page.svelte` (overview) — restructure paths; shorten copy; add breadcrumbs.
4. **Modified** — each of the 9 lesson pages — restructure markup, tighten copy, add `scroll-mt-*` to h2/h3, normalize callouts to compass-js class strings.
5. **New** — `voyager/src/routes/docs/what-can-still-go-wrong/+page.svelte` — stub page (~30 lines) to satisfy the Lesson 7 next-up link.

No token changes. No new dependencies. No global CSS additions beyond what's already in `+layout.svelte` per-lesson.

## Layout shape

```svelte
<!-- +layout.svelte -->
<div class="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-12 md:pt-14">
  <div class="grid grid-cols-1 gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[220px_minmax(0,1fr)_200px] lg:gap-x-10">
    <aside class="md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-5rem)] md:overflow-y-auto">
      <!-- sidebar nav (unchanged shape, +Lesson 8) -->
    </aside>
    <article bind:this={contentEl} class="min-w-0 docs-prose">
      {@render children()}
    </article>
    <div class="hidden lg:block">
      <div class="sticky top-20">
        <TableOfContents contentEl={contentEl} />
      </div>
    </div>
  </div>
</div>

<style>
  .docs-prose :global(h2) {
    scroll-margin-top: 5rem; /* clear any sticky chrome */
    font-family: var(--font-display, system-ui, sans-serif);
    font-size: 1.5rem;       /* 24px */
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-top: 2.5rem;
    line-height: 1.25;
  }
  .docs-prose :global(h2:first-of-type) { margin-top: 1.5rem; }
  .docs-prose :global(h3) {
    scroll-margin-top: 5rem;
    font-family: var(--font-display, system-ui, sans-serif);
    font-size: 1.125rem;     /* 18px */
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--ink);
    margin-top: 1.75rem;
    line-height: 1.3;
  }
  .docs-prose :global(p) {
    font-size: 0.9375rem;    /* 15px */
    line-height: 1.65;
    color: var(--ink-2);
    margin-top: 1rem;
  }
  .docs-prose :global(p:first-of-type) { margin-top: 0; }
  .docs-prose :global(a) {
    color: var(--ink);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: color-mix(in oklab, var(--ink) 25%, transparent);
  }
  .docs-prose :global(a:hover) {
    text-decoration-color: color-mix(in oklab, var(--ink) 50%, transparent);
  }
  .docs-prose :global(strong) { color: var(--ink); font-weight: 600; }
  .docs-prose :global(ul),
  .docs-prose :global(ol) {
    margin-top: 1rem;
    padding-left: 1.5rem;
    color: var(--ink-2);
  }
  .docs-prose :global(ul) { list-style-type: disc; }
  .docs-prose :global(ol) { list-style-type: decimal; }
  .docs-prose :global(li) {
    margin-top: 0.5rem;
    line-height: 1.6;
    padding-left: 0.375rem;
  }
  .docs-prose :global(li::marker) { color: var(--muted); }
  .docs-prose :global(code) {
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 0.8125rem;    /* 13px */
    font-weight: 500;
    color: var(--ink);
    background: var(--bone-200);
    padding: 1px 6px;
    border-radius: 6px;
  }
  .docs-prose :global(pre) {
    margin-top: 1.25rem;
    border-radius: 20px;
    background: var(--bone-200);
    padding: 1rem 1.25rem;
    overflow-x: auto;
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 13px;
    line-height: 1.6;
    color: var(--ink);
  }
  .docs-prose :global(pre code) {
    background: transparent;
    padding: 0;
    border-radius: 0;
    color: inherit;
    font-weight: inherit;
  }
  .docs-prose :global(table) {
    margin-top: 1rem;
    width: 100%;
    font-size: 0.875rem;
    color: var(--ink-2);
    border-collapse: collapse;
  }
  .docs-prose :global(thead) { color: var(--ink); font-weight: 500; text-align: left; }
  .docs-prose :global(th),
  .docs-prose :global(td) {
    padding: 0.5rem 1rem 0.5rem 0;
    vertical-align: top;
  }
  .docs-prose :global(tbody tr) { border-top: 1px solid var(--bone-200); }
</style>
```

Notes on the mapping:
- Body color: compass-js `gray-700` → `--ink-2` (existing; already #6E6E68-ish in the docs).
- Heading color: compass-js `gray-950` → `--ink` (existing; near-black).
- Borders: compass-js `border-gray-950/10` → `border-bone-200` (warmer, on-ramp).
- Hover: compass-js `hover:bg-gray-950/4` → `hover:bg-bone-100` (existing token; matches card hover rhythm already used in the overview).

## Right-rail TOC component

`TableOfContents.svelte` — props: `contentEl: HTMLElement | null`.

```svelte
<script>
  let { contentEl } = $props();
  let headings = $state([]);
  let activeId = $state('');

  $effect(() => {
    if (!contentEl) return;
    const found = Array.from(contentEl.querySelectorAll('h2, h3'))
      .filter((h) => h.id)
      .map((h) => ({ id: h.id, text: h.textContent.trim(), level: h.tagName === 'H2' ? 2 : 3 }));
    headings = found;

    if (found.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) activeId = visible[0].target.id;
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    found.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  });
</script>

{#if headings.length > 0}
  <nav aria-label="On this page">
    <h2 class="text-xs font-semibold tracking-wider uppercase text-ink">On this page</h2>
    <ul class="mt-3 flex flex-col gap-2 border-l border-bone-200 text-sm text-ink-2">
      {#each headings as h}
        <li class="-ml-px border-l border-transparent pl-3 {activeId === h.id ? 'border-ink' : ''}">
          <a
            href={`#${h.id}`}
            aria-current={activeId === h.id ? 'location' : undefined}
            class="block {h.level === 3 ? 'pl-3' : ''} hover:text-ink {activeId === h.id ? 'text-ink font-medium' : ''}"
          >
            {h.text}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style>
  nav { font-size: 0.8125rem; }
</style>
```

Behavior matches compass-js: scans h2/h3 with id attributes, watches via IntersectionObserver with a top-biased rootMargin so the active heading tracks the one currently near the top of the viewport. Active item gets `border-ink` on the rail (mirrors compass's `border-gray-950` pattern, mapped to `ink`).

## Heading-id convention

Each lesson's h2/h3 needs a stable `id` for the TOC anchor and URL hash. Convention: lowercase-kebab-from-text. Implementation: write the id explicitly on each heading (no runtime slugifier needed — these are hand-authored). For example:

```svelte
<h2 id="the-model-in-your-tab">The model in your tab</h2>
```

Lessons 7 and 9 already use this convention for their in-page nav links; extend it to every h2/h3 across all 9 lessons.

## Sidebar additions

`+layout.svelte` `lessons` array — add the missing Lesson 8 entry. Inserted at the correct slot (between Lesson 7 and Lesson 9):

```js
{ slug: '/docs/how-price-discovery-works', title: 'How price discovery works on Voyager Pay', eyebrow: 'Inserted after Lesson 8', desc: 'The §7.4 rubric, why the 0.6 / 0.2 / 0.2 weights bias toward honest operators, and why fees trend toward cost-plus-margin.' },
```

Remove the in-page nav blocks from Lessons 7 and 9 — the right-rail TOC replaces them. Keep the existing h2/h3 anchors so the right-rail TOC picks them up.

## Per-page changes

### Overview (`/docs`)

- Add a single-line "Documentation › Overview" breadcrumb above the h1.
- Tighten the lede: drop the second sentence ("Pick the path that fits you, or read top-to-bottom.").
- Group lessons under three path labels (current structure is fine — `For travelers` / `For the curious` / `For the protocol-curious`).
- Add Lesson 8 to the protocol-curious group at its correct position.
- Replace the eight hand-coded `<a>` lesson cards with a list of links inside a single tonal card (cleaner), or keep the current card grid — copy is the bigger fix. Decision: keep the card grid, just shorten the descriptions.

### Each lesson

For every lesson page:

1. **Header**: h1 + one eyebrow ("Lesson N — short label"). Drop the double-eyebrow pattern; collapse to a single line above the h1.
2. **h2/h3**: add explicit `id` attributes. Remove all `scroll-mt-*` styling (now provided globally via `.docs-prose`).
3. **Callouts**: normalize all `<div class="rounded-[28px] bg-bone-100 p-6">` blocks to a shared `rounded-[24px] bg-bone-100 p-6` (slightly tighter, matches compass-js radius). Eyebrow callouts keep their eyebrow; formula blocks keep their `font-display` headline.
4. **Inline code chips**: keep the existing `<code>` pattern — it now picks up the new `.docs-prose code` styling automatically.
5. **Real code blocks** (currently only Lesson 9): keep the `<pre>` markup — it'll inherit the new global styling. Two `<pre>` blocks remain; no new ones added.
6. **Next-up card**: standardize the wrapper to `rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between`. Same `<Cta variant="primary">` inside.
7. **Copy**: shorten paragraphs to 2–4 sentences max. Drop hedging phrases ("in some sense", "kind of", "you might"). Use compass-js voice: declarative, direct, no marketing language.
8. **Lesson 7 table**: keep as-is structurally. The global `.docs-prose table` styling replaces the inline classes.
9. **In-page nav**: REMOVE from Lessons 7 and 9. The right-rail TOC is the unified replacement.

### Lesson 8 — sidebar integration

Beyond adding it to the layout array, no other change to Lesson 8 itself — it already has its own page. Add `id` attributes to its h2s.

### New stub page — `/docs/what-can-still-go-wrong`

Per the user's "fix both gaps" decision: create the file so the Lesson 7 next-up link resolves. ~30 lines:

```svelte
<svelte:head><title>What can still go wrong — Voyager docs</title></svelte:head>
<span class="eyebrow">Inserted after Lesson 7</span>
<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">What can still go wrong.</h1>
<p class="mt-6 text-ink-2">Voyager Pay's EROI score is high, not infinite. Three things would shift it...</p>

<h2 id="operator-collusion">Operator collusion</h2>
<p>...</p>

<h2 id="identity-tied-to-key">Identity tied to a key, not a person</h2>
<p>...</p>

<h2 id="reputation-laundering">Reputation laundering</h2>
<p>...</p>

<div class="mt-12 rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <span class="eyebrow">End of the docs</span>
    <h3 class="mt-2 font-display text-xl text-ink">That's the whole spec.</h3>
    <p class="mt-2 text-sm text-ink-2">If you want to extend it, the lesson below shows how.</p>
  </div>
  <Cta variant="primary" href="/docs/how-voyager-pay-extends">Continue to Lesson 9</Cta>
</div>
```

Exact content for the three sections: TBD in implementation. The user's spec for the existing "what can still go wrong" content lives in `/workspaces/voyager/MCP.md` or `/workspaces/voyager/extensible.md` — the implementer reads those and writes 1–2 paragraphs each.

## Validation

- `cd voyager && npm run build` succeeds (no TS errors, no Svelte compile errors).
- `cd voyager && npm run dev -- --port 5179` → `GET /docs` and `GET /docs/<each-lesson>` all return 200.
- Greps on rendered HTML for `/docs/how-voyager-plans`:
  - At least 4 h2s with `id="..."` attribute (TOC items present in DOM).
  - Right-rail TOC nav appears (`aria-label="On this page"`).
  - No `<nav aria-label="On this page">` duplicate from the removed in-page navs on Lessons 7/9.
  - No `scroll-mt-20` inline utility remains (replaced by global `.docs-prose`).
- Greps on rendered HTML for `/docs/what-can-still-go-wrong`: returns 200, contains the h1 and at least one h2 with id.
- Sidebar lesson count: grep the `+layout.svelte` source for `slug:` — should now be 10 entries (was 9).
- Denylist: no `Dispersion`, no `3/3`, no `knob`, no `Information` headings (Lesson 7 currently uses `Dispersion.`, `Information.`, `Coupling.` as full-stop h2 labels — tighten during the copy pass to read as words, not fragments).
- Visual smoke at 1280px: 3 columns visible — sidebar 220px, content ~640px, TOC ~200px. At 1024px: 2 columns (sidebar + content), TOC hidden. At <1024px: single column (sidebar collapses to top row), TOC hidden.

## Risks

- **Heading-id collisions**: explicit ids per heading mean typo-class bugs. Mitigation: implementer picks ids by lowercase-kebabifying the heading text once and copying the same string into the anchor and the h2 attribute.
- **TOC over-eager**: IntersectionObserver rootMargin `-80px 0px -70% 0px` may flicker between two adjacent short sections. Mitigation: implementer can bias to the first intersecting entry, which the code already does.
- **Longest pages shrink**: tightening Lessons 7 and 9 will cut ~15–20% of their word count. If the user wants the deep coverage preserved, this can be relaxed lesson-by-lesson during review. Plan defaults to tighter.
- **Stub page content**: `what-can-still-go-wrong` writes 3 short sections about residual risks. If the implementer can't find source material in `MCP.md` / `extensible.md`, the page can ship as a placeholder ("This page is forthcoming.") and still satisfy the broken link.
- **No new components file**: per the user's decision, the right-rail TOC is the only new component. All other "shared" callout chrome stays inline. If the implementer wants to factor callouts later, that's a separate refactor.
