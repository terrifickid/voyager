# Plan: Promote Breadcrumbs to a global site component

## Goal

The breadcrumb that currently lives only inside the four `/pay/*` hero sections should render on every route across the site (home, plan, preferences, all docs lessons, all pay routes) from a single location, so the navigation affordance is consistent site-wide.

## Decisions (resolved with user)

- **Placement**: Root layout (`src/routes/+layout.svelte`), inside `<main>` as the first child, before `{@render children()}`. Above the docs left-rail grid, above every hero. One render site, no per-page wiring.
- **Docs behavior**: Render on `/docs` and every `/docs/*` lesson. The left-rail sidebar stays — the breadcrumb sits above it. They don't conflict (rail is sticky-left at md+; breadcrumb sits at the top of the content flow).
- **Label source**: A small map for short, known segments (`pay` → "Voyager Pay", `docs` → "Docs", `plan` → "Plan", `preferences` → "Preferences") plus a humanized fallback that converts kebab-case segments to Title Case. Future routes work automatically.
- **Hide rule**: Render only when `crumbs.length > 1` (single-segment routes — `/`, `/plan`, `/preferences`, `/docs`, `/pay` — show nothing). This is the existing guard and stays.
- **Roll back per-page wiring**: Remove the four `<Breadcrumbs />` usages and their imports from the four `/pay/*` `+page.svelte` files. With the breadcrumb in the root layout, leaving the per-page instances would cause two copies to render on `/pay/security` etc.

## Affected files

- `voyager/src/routes/+layout.svelte` — import `Breadcrumbs`, render inside `<main>` before `{@render children()}`.
- `voyager/src/lib/components/Breadcrumbs.svelte` — replace fixed `LABELS` map with a small map of short segments plus a humanize-fallback helper. Keep the rest of the component (markup, $derived, guard, chevron styling) unchanged.
- `voyager/src/routes/pay/+page.svelte` — remove `Breadcrumbs` import and `<Breadcrumbs />` from hero.
- `voyager/src/routes/pay/security/+page.svelte` — same.
- `voyager/src/routes/pay/pricing/+page.svelte` — same.
- `voyager/src/routes/pay/node/+page.svelte` — same.

## Implementation

### Step 1 — Update `Breadcrumbs.svelte`

Replace the fixed `LABELS` object with a small `SHORT_LABELS` map (just the short segments) plus a humanize fallback:

```svelte
<script>
  import { page } from '$app/state';

  const SHORT_LABELS = {
    pay: 'Voyager Pay',
    docs: 'Docs',
    plan: 'Plan',
    preferences: 'Preferences'
  };

  function humanize(seg) {
    return seg
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  function labelFor(seg) {
    return SHORT_LABELS[seg] ?? humanize(seg);
  }

  function buildCrumbs(pathname) {
    const segs = pathname.split('/').filter(Boolean);
    let acc = '';
    return segs
      .map((s) => {
        acc += '/' + s;
        return { label: labelFor(s), href: acc, isLast: false };
      })
      .map((c, i, arr) => ({ ...c, isLast: i === arr.length - 1 }));
  }

  const crumbs = $derived(buildCrumbs(page.url.pathname));
</script>

{#if crumbs.length > 1}
  <nav aria-label="Breadcrumb" class="mx-auto max-w-6xl px-6 pt-4">
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

Key change vs. the current component: the `mx-auto max-w-6xl px-6` wrapper is now on the `<nav>` itself (moved out of the parent hero section), so the breadcrumb aligns left with page content at every breakpoint. `pt-4` is the only vertical spacing — pushes the breadcrumb below the sticky header (top-0, ~64-72px) with breathing room.

### Step 2 — Wire into root layout

`voyager/src/routes/+layout.svelte`:

```svelte
<script>
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex min-h-screen flex-col bg-bone-50 text-ink-2">
  <Header />
  <main class="flex-1">
    <Breadcrumbs />
    {@render children()}
  </main>
  <Footer />
</div>
```

### Step 3 — Remove per-page wiring

For each of the four files below, delete the `import Breadcrumbs` line and the `<Breadcrumbs />` element from inside the hero section. Do not touch anything else.

- `voyager/src/routes/pay/+page.svelte`
- `voyager/src/routes/pay/security/+page.svelte`
- `voyager/src/routes/pay/pricing/+page.svelte`
- `voyager/src/routes/pay/node/+page.svelte`

## Constraints

- Reuse existing tokens: `text-muted`, `text-ink`, `text-bone-400`, `text-[13px]`. No new design tokens.
- Svelte 5 runes; no `export let`.
- Single source of truth — do not leave any per-page `<Breadcrumbs />` after the move.
- Do not touch `Header.svelte`, `Footer.svelte`, the docs left-rail sidebar, or `+layout.css`.

## Validation

With dev server running on whichever port `pnpm dev` reports (last session: 5174):

1. **Single-segment routes render no breadcrumb** (`crumbs.length > 1` guard):
   - `curl -s :PORT/ | grep -c 'aria-label="Breadcrumb"'` → 0
   - `curl -s :PORT/plan | grep -c 'aria-label="Breadcrumb"'` → 0
   - `curl -s :PORT/preferences | grep -c 'aria-label="Breadcrumb"'` → 0
   - `curl -s :PORT/docs | grep -c 'aria-label="Breadcrumb"'` → 0
   - `curl -s :PORT/pay | grep -c 'aria-label="Breadcrumb"'` → 0

2. **Multi-segment routes render exactly one breadcrumb** with correct labels:
   - `curl -s :PORT/pay/security | grep -c 'aria-label="Breadcrumb"'` → 1; trail = `Voyager Pay › Security by design`
   - `curl -s :PORT/pay/pricing | grep -c 'aria-label="Breadcrumb"'` → 1; trail = `Voyager Pay › Fair pricing`
   - `curl -s :PORT/pay/node | grep -c 'aria-label="Breadcrumb"'` → 1; trail = `Voyager Pay › Run a node`
   - `curl -s :PORT/docs/how-voyager-pay-works | grep -c 'aria-label="Breadcrumb"'` → 1; trail = `Docs › How Voyager Pay Works`
   - `curl -s :PORT/docs/rubrics-evaluate-and-generate | grep -c 'aria-label="Breadcrumb"'` → 1; trail = `Docs › Rubrics Evaluate And Generate`
   - `curl -s :PORT/docs/what-is-eroi | grep -c 'aria-label="Breadcrumb"'` → 1; trail = `Docs › What Is Eroi`

3. **No duplicate breadcrumbs on `/pay/*`** — the per-page wiring was removed, so each of the four pay routes must show exactly 1 `aria-label="Breadcrumb"`, not 2.

4. **Visual check**: confirm on a docs route that the breadcrumb sits above the left-rail grid (inside the `<main>`, before the docs layout renders its `mx-auto max-w-6xl` wrapper — the breadcrumb's own wrapper aligns with it). Confirm the docs left-rail still highlights the current lesson with `aria-current="page"` (unchanged behavior).

5. **Header offset**: confirm the breadcrumb isn't hidden under the sticky header on first paint — `pt-4` plus the section padding below should clear the ~64-72px header.

## Out of scope

- Replacing the docs left-rail with the breadcrumb (left-rail stays).
- Schema.org JSON-LD breadcrumb markup.
- Custom labels per docs lesson (current humanize-fallback produces Title Case; future lessons can add entries to `SHORT_LABELS` if a shorter label is needed).
- Mobile-specific variants (the existing `flex-wrap` handles narrow widths).
