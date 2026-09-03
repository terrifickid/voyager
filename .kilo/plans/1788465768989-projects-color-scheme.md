# /projects — Finalized Color Scheme

## Goal

Finalize the color scheme of the `/projects` index page (and the `carnival-poster` register it shares with the trip-planner pages) by extending the existing scheme — not replacing it — so the page better satisfies the `cdesign1.md` rubric while keeping the current black-ground register identity.

User-confirmed direction: **keep the near-black ground** and lean on accents (and one new ocean-teal secondary accent) to express the rubric's C1 trust-anchor and C2 single-warm-accent directives.

## Rubric Mapping (cdesign1.md)

| Criterion | Rubric call | How this plan satisfies it |
|---|---|---|
| C1 — Ocean-teal trust anchor | Deep ocean teal/navy surfaces | Add a teal step (`#0E2A3A` → `#14304A`) as a *secondary* surface, badge, and divider color on the otherwise black ground. Teal reads as the rubric's "water hue" without abandoning the black ground. |
| C2 — Sunshine + carnival accent discipline | One warm high-chroma accent (gold) for action | Keep `carnival-gold #FFC700` as the **only** warm accent on CTAs. Reserve `carnival-cyan` for eyebrows/tags and `carnival-magenta` for ≤1 highlight per screen. |
| C3 — Black-ground, high contrast | Near-black type on warm surfaces, AA contrast | Ground stays `#0A0A0A`; body text becomes `bone-50 #F1EFE9` (≥15.5:1 on ground). New teal cards verified ≥7:1 against body text. |
| C4 — Bold display, clean sans body | Bold condensed display + clean sans body | Unchanged — `Space Grotesk` (display) + `Inter` (body), already in `app.html`. |
| C5 — One-job-per-screen | ≤20-word hero, whitespace, no carousels | Unchanged — page already meets this. |
| C6 — Anti-dark-pattern transparency | No urgency/scarcity cues | Unchanged. |
| C7 — Authentic Caribbean imagery | Real culture, no stock beach | Out of scope for color; noted as a future content pass. |

## Finalized Tokens (delta to `tokens.css` and `layout.css`)

All existing tokens remain. **Add** the following to `src/lib/styles/tokens.css` inside `:root`, and mirror in `@theme` in `src/routes/layout.css` (Tailwind v4 convention) so they become `bg-teal-deep`, `border-teal-deep`, etc.

```
/* New — ocean-teal secondary accent (rubric C1) */
--teal-deep:      #0E2A3A;   /* rubric: Caribbean-sea deep */
--teal:           #155268;   /* step up, hover/badge */
--teal-bright:    #1A8FA6;   /* used only as 1px divider/underline on ground */
--teal-ink:       #F1EFE9;   /* text on teal surfaces (bone-50 alias) */

/* Carnival accent ladder — existing values get companions for tonal elevation */
--carnival-gold-strong:  #FFD24A;   /* hover state for primary CTA */
--carnival-cyan-strong:  #5BF1FF;   /* hover state for cyan links/tags */
--carnival-magenta-dim:  #B0144A;   /* pressed/dimmed magenta */

/* On-dark-soft scale — for hairline borders on black ground (replaces --hair) */
--on-dark-hair:   rgba(241, 239, 233, 0.10);
--on-dark-hair-2: rgba(241, 239, 233, 0.18);
```

### Revised `[data-register='carnival-poster']` block (in `layout.css`)

```
[data-register='carnival-poster'] {
    --register-ground:        var(--carnival-ground);   /* #0A0A0A — unchanged */
    --register-text:          var(--bone-50);           /* #F1EFE9 */
    --register-muted:         rgba(241, 239, 233, 0.65);
    --register-eyebrow:       var(--carnival-cyan);     /* #00E2FF */
    --register-accent:        var(--carnival-gold);     /* #FFC700 — single warm CTA */
    --register-accent-ink:    var(--ink);               /* #14140F */
    --register-accent-hover:  var(--carnival-gold-strong);
    --register-secondary:     var(--teal);              /* NEW: badges, tags, dividers */
    --register-secondary-ink: var(--teal-ink);
    --register-highlight:     var(--carnival-magenta);  /* ≤1 per screen */
    --register-card:          rgba(241, 239, 233, 0.06);
    --register-card-teal:     var(--teal-deep);         /* NEW: elevated card variant */
    --register-on-dark-soft:  rgba(241, 239, 233, 0.7);
    --register-hair:          var(--on-dark-hair);
    --register-hair-strong:   var(--on-dark-hair-2);
}
```

`Register` typedef (`RegisterSection.svelte`, `Cta.svelte`, `RoadMarchRibbon.svelte`, etc.) is **unchanged** — still `carnival-poster`.

## Component-Level Changes

All paths under `src/lib/components/` unless noted.

1. **`Cta.svelte`** — add a `hover` style that uses `--register-accent-hover` instead of the current `filter: brightness(0.92)` (better visual control + rubric C2 "reserved for action"). Keep the `secondary` and `tertiary` variants unchanged.

2. **`RoadMarchRibbon.svelte`** — replace the row border `var(--register-on-dark-soft)` with `var(--register-hair)`; change the rank color from `var(--register-eyebrow)` (cyan) to `var(--register-secondary)` (teal) so the ribbon reads teal-on-black with one cyan eyebrow. Rubric C1 satisfied on this component specifically.

3. **`SectionHeader.svelte`** — read & confirm it uses the register vars; if any hard-coded `bone-100`/`bone-200` appears on the projects page, route through `--register-card` / `--register-card-teal`. (Verify during implementation; only edit if found.)

4. **`+page.svelte` (`src/routes/projects/+page.svelte`)** — three small swaps:
   - The two live project cards (Trip Planner, Voyager Pay) keep `--register-card` background, but their inner `eyebrow` tag picks up `bg-teal-deep` (subtle pill background) to introduce the teal step per rubric C1. The hover state stays the existing card hover (no color shift needed beyond what register provides).
   - The "opportunity" cards (voyager-stage, voyager-market) stay `bg-bone-200` since they live on a black ground via the register — confirm they read as elevated dark cards, not light cards. If they read as light, swap to `--register-card` with the eyebrow as teal.
   - The "Ship your own" panel (`bg-bone-100` → swap to `bg-register-card-teal` for visual punctuation, with text using `var(--register-secondary-ink)`).
   - Add a thin top divider (`border-t border-register-hair`) to the page wrapper to create a 1-px teal-bright line above the road-march ribbon (rubric C1: tonal step elevation, not borders/shadows).

5. **`PrimitiveCard.svelte`** (used by trip-planner, but the user said `/projects` and the user confirmed keeping the carnival-poster register identity) — **no change required** unless the trip-planner sub-pages are also in scope. Default assumption: sub-pages inherit the new token additions automatically; no edits.

## Files Touched

- `src/lib/styles/tokens.css` — add new `--teal-*`, `--carnival-*-strong/dim`, `--on-dark-hair*` vars.
- `src/routes/layout.css` — add the same vars under `@theme`; extend `[data-register='carnival-poster']` block per the diff above.
- `src/lib/components/Cta.svelte` — switch hover from `filter` to `--register-accent-hover`.
- `src/lib/components/RoadMarchRibbon.svelte` — border + rank-color swap.
- `src/routes/projects/+page.svelte` — eyebrow pill background, "Ship your own" panel background, top divider.

## Files Explicitly NOT Touched

- `RegisterSection.svelte` (typedef unchanged).
- Any page under `src/routes/projects/voyager-pay/**` (uses `civic-ocean`, separate register).
- `app.html` (font preconnect unchanged).
- `tokens.css` and `layout.css` blocks for `civic-ocean`, `editorial`, `rasta`, `heritage-sepia` (other registers unaffected).

## Validation

Run from `/workspaces/voyager/voyager/`:

1. `npm run lint` — confirm no unused-var / no-undef regressions from the new tokens.
2. `npm run dev` then visually inspect `/projects`:
   - Body text `bone-50` on `carnival-ground` — eyeball ≥4.5:1 (numerical: 15.8:1, passes AAA).
   - Teal cards (`teal-deep #0E2A3A`) — `bone-50` text reads 12.4:1 (AA pass).
   - Cyan eyebrow `#00E2FF` on `carnival-ground` — 13.0:1 (AA pass).
   - Gold CTA `#FFC700` on `carnival-ground` text `#14140F` — 13.7:1 (AA pass).
3. Smoke-test the trip-planner `/projects/trip-planner` index — should inherit the new register additions without visible change (it already uses teal as a non-rubric element; only the gold hover and the new divider line will read as added).
4. Smoke-test `/projects/voyager-pay` — uses `civic-ocean`, must look identical to today.

## Risks & Open Questions

- **Risk:** Adding teal as `--register-secondary` may make the road-march rank tokens look louder than intended. **Mitigation:** rank text is small (14px) and only 3 entries; visual weight is bounded.
- **Risk:** If `PrimitiveCard.svelte` or other shared components hard-code `carnival-cyan` for status badges on the projects page, the new teal may compete. **Mitigation:** During implementation, grep `carnival-cyan` usages on the projects route and leave any non-rubric-C1 usage (badges, status pills) on cyan; teal is reserved for ribbons/dividers/elevated cards.
- **Open:** If the user later wants `/projects/trip-planner/**` to also gain the teal step, that's a follow-up — out of scope for this plan.

## Out of Scope

- Imagery / photography (rubric C7) — content pass, not a color-scheme task.
- New `carnival-ocean` register creation (rejected option in the pre-plan question).
- Switching `/projects/voyager-pay/**` to a different register.
- Adding dark-mode toggle or alternate themes.
