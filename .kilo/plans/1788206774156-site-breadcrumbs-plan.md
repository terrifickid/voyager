# Plan: Add site breadcrumbs, especially for /pay subpages

## Goal

Add a breadcrumb trail that renders on `/pay` and each of its three subpages, so users landing on a deep route can locate themselves and step back up. Match the existing visual vocabulary (small inline text, chevron separator, eyebrow/eyebrow-adjacent styling).

## Decisions (resolved with user)

- **Placement**: Per-route, inside each page (not in root layout, not in Header).
- **Scope**: `/pay` + `/pay/security` + `/pay/pricing` + `/pay/node`. Top-level pages (`/`, `/plan`, `/preferences`, `/docs`) get no breadcrumb — `/docs/*` already has its left-rail nav, and `/pay` itself only needs a single-segment trail.
- **Trail source**: Single `Breadcrumbs.svelte` component with an internal label-map. No per-page config.
- **Visual**: Small inline text (text-[13px]), muted color, `›` chevron separators, current item is `text-ink` (not a link). Sits inside the existing `mx-auto max-w-6xl px-6` wrapper above the hero so it aligns with the hero copy.

## Affected files

- `voyager/src/lib/components/Breadcrumbs.svelte` — new component. Reads `page.url.pathname`, splits into segments, looks up each segment in a label-map, renders `<nav aria-label="Breadcrumb"><ol>...</ol></nav>` with chevron separators. Exports nothing; takes no props.
- `voyager/src/routes/pay/+page.svelte` — import `Breadcrumbs`, render at the top of the hero section.
- `voyager/src/routes/pay/security/+page.svelte` — same.
- `voyager/src/routes/pay/pricing/+page.svelte` — same.
- `voyager/src/routes/pay/node/+page.svelte` — same.

## Implementation

### Step 1: Create `Breadcrumbs.svelte`

Location: `voyager/src/lib/components/Breadcrumbs.svelte`. Svelte 5 runes (`$props`, `$state` not needed — pure render of `page.url`).

```svelte
<script>
  import { page } from '$app/state';

  const LABELS = {
    pay: 'Voyager Pay',
    security: 'Security by design',
    pricing: 'Fair pricing',
    node: 'Run a node'
  };

  function buildCrumbs(pathname) {
    const segs = pathname.split('/').filter(Boolean);
    let acc = '';
    return segs.map((s) => {
      acc += '/' + s;
      return { label: LABELS[s] ?? s, href: acc, isLast: false };
    }).map((c, i, arr) => ({ ...c, isLast: i === arr.length - 1 }));
  }

  const crumbs = $derived(buildCrumbs(page.url.pathname));
</script>

{#if crumbs.length > 1}
  <nav aria-label="Breadcrumb" class="pt-4">
    <ol class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-muted">
      {#each crumbs as crumb, i (crumb.href)}
        {#if i > 0}
          <li aria-hidden="true" class="text-[1.05em] leading-none text-bone-400">›</li>
        {/if}
        <li>
          {#if crumb.isLast}
            <span aria-current="page" class="text-ink">{crumb.label}</span>
          {:else}
            <a href={crumb.href} class="hover:text-ink transition-colors">{crumb.label}</a>
          {/if}
        </li>
      {/each}
    </ol>
  </nav>
{/if}
```

Notes on the component:
- `crumbs.length > 1` guard so single-segment paths (e.g. `/pay`) only render once they have a parent. The first segment of `/pay` is just `pay`, which has no parent on the site — so `/pay` itself renders no breadcrumb. Subpages (`/pay/security`, etc.) render "Voyager Pay › Security by design".
- The `pt-4` is the only vertical spacing inside the wrapper — the existing hero section's `pt-20` follows. This keeps a tight gap between the breadcrumb row and the eyebrow.
- `text-bone-400` for the chevron matches the muted visual weight. If `bone-400` doesn't exist in tokens, fall back to `text-muted` (confirmed existing).
- `transition-colors` matches existing nav conventions on `/pay`'s in-page TOC.

### Step 2: Insert breadcrumbs into the four pay pages

For each file, add the import next to the existing `Cta` import and render `<Breadcrumbs />` as the first child of the hero `<section>`, before the `<div class="flex flex-col gap-8">`. The breadcrumb inherits the section's `mx-auto max-w-6xl px-6` so it aligns left with the eyebrow below.

Edit pattern (apply identically to all four pages):

```svelte
<script>
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import Cta from '$lib/components/Cta.svelte';
  // ...existing imports
</script>

<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
  <Breadcrumbs />
  <div class="flex flex-col gap-8">
    <!-- existing eyebrow + h1 + lede + CTAs -->
  </div>
</section>
```

The visual effect: a small muted row "Voyager Pay › Security by design" sits a few px above the eyebrow "Voyager Pay" inside the hero. The h1 below stays at its canonical 44/56/64 size.

## Constraints

- Reuse existing tokens (`text-muted`, `text-ink`, `text-[13px]`, `bone-400` if present, else `text-muted`).
- No new design tokens, fonts, colors, or class conventions.
- Svelte 5 runes; no `export let`.
- Don't touch `Header.svelte`, the footer, or any non-pay route.
- Don't add to `/docs/*` lessons — they already have the left-rail nav.

## Validation

- `pnpm dev` then curl each route:
  - `curl -s http://localhost:<port>/pay | grep -c 'aria-label="Breadcrumb"'` → 0 (single-segment, suppressed)
  - `curl -s http://localhost:<port>/pay/security | grep -o 'aria-label="Breadcrumb"'` → 1
  - same for `/pay/pricing` and `/pay/node`
- Visual check: render the HTML and confirm the trail order is `Voyager Pay › Security by design` (not `pay › security`).
- Confirm the chevron separator is present once per segment boundary (`›` appears once between segments).
- Confirm the current item has `aria-current="page"` and the parent has a real `<a href>`.
- Confirm hero h1 below the breadcrumb still reads at canonical size (`text-[44px] sm:text-[56px] lg:text-[64px]`).
- Confirm `pt-4` on the breadcrumb plus the section's `pt-20` doesn't push the eyebrow out of view — visually fine, no spacing bug.

## Out of scope

- Docs lessons getting breadcrumbs (the left-rail sidebar already provides depth navigation there).
- Mobile-only breadcrumb variants (the flex-wrap handles narrow widths already).
- Schema.org JSON-LD breadcrumb markup (not required for this demo).
- Adding breadcrumbs to `/plan` and `/preferences` (top-level routes with no depth).