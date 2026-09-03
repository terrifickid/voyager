# New Color Schemes — 5 Evidence-Grounded Caribbean Registers

## Goal

Add 5 new color registers to the Voyager site, each grounded in the evidence files (`cdesign1.md` v0.1 rubric, `refactor/cdesign.json` v2 rubric). **No route assignments** — registers land in the system only (tokens, layout variables, chrome CSS, palettes, typedefs); route assignment is a later decision.

Existing registers (kept unchanged): `perk`, `rasta`, `carnival-poster`, `heritage-sepia`.

## The 5 new registers

### 1. `carnival-poster-white` — user-requested white inverse

**Evidence:** user directive; rubric C3 "clean reverse" path (near-black on warm/light, AA pass). Keeps the carnival accent trio.

Tokens (add to `voyager/src/lib/styles/tokens.css`):
```
--carnival-white-ground: #FAFAF7;
--carnival-white-card: #F1F0E9;
```

`layout.css` block:
```css
[data-register='carnival-poster-white'] {
  --register-ground: var(--carnival-white-ground);
  --register-text: var(--ink);
  --register-muted: var(--muted);
  --register-eyebrow: var(--carnival-magenta);
  --register-accent: var(--carnival-cyan);
  --register-accent-ink: var(--ink);
  --register-accent-hover: var(--carnival-cyan-strong);
  --register-highlight: var(--carnival-gold);
  --register-card: var(--carnival-white-card);
  --register-card-teal: var(--teal-deep);
  --register-on-dark-soft: var(--ink-2);
  --register-hair: rgba(20, 20, 15, 0.10);
  --register-hair-strong: rgba(20, 20, 15, 0.18);
}
```

Chrome CSS:
- Header: `--site-header-bg: var(--carnival-white-ground); --site-header-text: var(--ink);`
- Footer: bg `var(--carnival-white-card)`, text/lede/link `ink`/`ink-2`, link-hover `carnival-magenta`, bullet `carnival-cyan`, eyebrow `carnival-magenta`, lang-bg `rgba(20,20,15,0.06)`, rule `rgba(20,20,15,0.10)`, rule-text `var(--muted)`
- Footer/CarnivalRibbon palettes: `['var(--carnival-magenta)', 'var(--carnival-cyan)', 'var(--carnival-gold)']`

### 2. `ocean` — Visit Barbados civic-navy

**Evidence:** cdesign1.md L16 (navy #1a3d50/#002b5c + gold #f8c300/#d89737); v0.1 C1 "Ocean-teal trust anchor" (w 0.15, highest palette weight); cdesign.json L158 (visitbarbados: navy + gold + white).

Tokens:
```
--ocean-ground: #0A2438;
--ocean-gold: #F8C300;
--ocean-gold-deep: #D89737;
--ocean-gold-bright: #FFD24A;
```

`layout.css` block:
```css
[data-register='ocean'] {
  --register-ground: var(--ocean-ground);
  --register-text: var(--bone-50);
  --register-muted: rgba(241, 239, 233, 0.65);
  --register-eyebrow: var(--ocean-gold);
  --register-accent: var(--ocean-gold);
  --register-accent-ink: var(--ink);
  --register-accent-hover: var(--ocean-gold-bright);
  --register-secondary: var(--teal);
  --register-secondary-ink: var(--teal-ink);
  --register-highlight: var(--carnival-cyan);
  --register-card: rgba(241, 239, 233, 0.05);
  --register-card-teal: var(--teal-deep);
  --register-on-dark-soft: rgba(241, 239, 233, 0.7);
  --register-hair: var(--on-dark-hair);
  --register-hair-strong: var(--on-dark-hair-2);
}
```

Chrome CSS:
- Header: bg `var(--ocean-ground)`, text `bone-50`
- Footer: bg `var(--ocean-ground)`, bone-50 text family (mirror carnival-poster footer block shape), link-hover/bullet/eyebrow `var(--ocean-gold)`
- Palettes: `['var(--ocean-gold)', 'var(--night-800)', 'var(--teal-bright)']`

### 3. `windies` — cricket maroon-gold flag palette

**Evidence:** cdesign.json L110 (maroon #660028 + yellow #fbed00 hero, "flag-palette anchoring done right"), L161 (maroon #660028, gold #fbed00, near-black #0a0a0a body + maroon nav band).

Tokens:
```
--windies-maroon: #660028;
--windies-ground: #2A000E;
--windies-gold: #FBED00;
--windies-gold-soft: #FFF79A;
```

`layout.css` block:
```css
[data-register='windies'] {
  --register-ground: var(--windies-ground);
  --register-text: var(--bone-50);
  --register-muted: rgba(241, 239, 233, 0.62);
  --register-eyebrow: var(--windies-gold);
  --register-accent: var(--windies-gold);
  --register-accent-ink: var(--ink);
  --register-accent-hover: var(--windies-gold-soft);
  --register-highlight: var(--windies-maroon);
  --register-card: rgba(241, 239, 233, 0.05);
  --register-on-dark-soft: rgba(241, 239, 233, 0.68);
  --register-hair: var(--on-dark-hair);
  --register-hair-strong: var(--on-dark-hair-2);
}
```

Chrome CSS:
- Header: bg `var(--windies-ground)`, text `bone-50`
- Footer: bg `var(--windies-ground)`, link-hover/bullet/eyebrow `var(--windies-gold)`
- Palettes: `['var(--windies-maroon)', 'var(--windies-gold)', 'var(--bone-50)']`

### 4. `gold-cream` — LargeUp warm-cream editorial

**Evidence:** cdesign1.md L17 (gold #efb300 dominant + warm cream #fafae1 + dark gray); cdesign.json L160 (largeup + koffee warm cultural-distinct register).

**Contrast note:** `#EFB300` on `#FAFAE1` ≈ 1.8:1 — fails AA for text. Gold is fills/bullets/large-display only; eyebrow/small text uses dark gold `#7A5C00` (≈5.5:1 on cream). This matches LargeUp's own usage (gold as surface/display, dark gray as body).

Tokens:
```
--goldcream-ground: #FAFAE1;
--goldcream-card: #F4F2D0;
--goldcream-gold: #EFB300;
--goldcream-gold-ink: #7A5C00;
```

`layout.css` block:
```css
[data-register='gold-cream'] {
  --register-ground: var(--goldcream-ground);
  --register-text: var(--ink);
  --register-muted: #6E6E58;
  --register-eyebrow: var(--goldcream-gold-ink);
  --register-accent: var(--goldcream-gold);
  --register-accent-ink: var(--ink);
  --register-accent-hover: var(--goldcream-gold);
  --register-highlight: var(--goldcream-gold);
  --register-card: var(--goldcream-card);
  --register-on-dark-soft: var(--ink-2);
  --register-hair: rgba(58, 50, 10, 0.12);
  --register-hair-strong: rgba(58, 50, 10, 0.2);
}
```

Chrome CSS:
- Header: bg `var(--goldcream-ground)`, text `ink`
- Footer: bg `var(--goldcream-card)`, ink family, bullet `var(--goldcream-gold)`, link-hover/eyebrow `var(--goldcream-gold-ink)`
- Palettes: `['var(--goldcream-gold)', 'var(--ink)', 'var(--goldcream-card)']`

### 5. `caribana` — diaspora-carnival magenta-violet (non-flag)

**Evidence:** cdesign.json L162 (magenta H1 #ed177a + violet #9e5aff = diaspora-carnival non-flag palette, register-allowed); L112 (caribana/Toronto + nottinghill/London cross-Atlantic host-city-diaspora).

Tokens:
```
--caribana-magenta: #ED177A;
--caribana-magenta-bright: #FF4A9E;
--caribana-violet: #9E5AFF;
--caribana-ground: #160A20;
```

`layout.css` block:
```css
[data-register='caribana'] {
  --register-ground: var(--caribana-ground);
  --register-text: var(--bone-50);
  --register-muted: rgba(241, 239, 233, 0.65);
  --register-eyebrow: var(--caribana-violet);
  --register-accent: var(--caribana-magenta);
  --register-accent-ink: var(--bone-50);
  --register-accent-hover: var(--caribana-magenta-bright);
  --register-highlight: var(--caribana-violet);
  --register-card: rgba(241, 239, 233, 0.06);
  --register-on-dark-soft: rgba(241, 239, 233, 0.7);
  --register-hair: var(--on-dark-hair);
  --register-hair-strong: var(--on-dark-hair-2);
}
```

Chrome CSS:
- Header: bg `var(--caribana-ground)`, text `bone-50`
- Footer: bg `var(--caribana-ground)`, link-hover/bullet `var(--caribana-magenta)`, eyebrow `var(--caribana-violet)`
- Palettes: `['var(--caribana-magenta)', 'var(--caribana-violet)', 'var(--bone-50)']`

## Implementation tasks (ordered)

Per scheme, in order — **hand-edit or carefully anchored edits only; NO bulk sed on typedef unions** (prior sed passes broke ternaries/quotes across 8 files this session).

1. **Tokens** — add the scheme's named tokens to `voyager/src/lib/styles/tokens.css`.
2. **Layout variables** — add the `[data-register='<name>']` block to `voyager/src/routes/layout.css` (after `heritage-sepia` block).
3. **Typedef unions** — extend the `Register` typedef in ALL 17 files that declare it. Current union: `'perk' | 'rasta' | 'carnival-poster' | 'heritage-sepia'` → final: `'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia'`. Files:
   - `src/routes/+layout.svelte`
   - `src/routes/docs/+layout.svelte`
   - `src/lib/components/{Header, Footer, CarnivalRibbon, PrimitiveCard, UseCaseCard, Breadcrumbs, SectionHeader, RegisterSection, MasCampByline, SoundSystemStrip, SplitPanel, HeritageLineage, RoadMarchRibbon, Icon, Cta}.svelte`
   - Verify after: `grep -rn "'heritage-sepia'} Register" voyager/src/` — every hit must contain all 9 names.
4. **Header scoped block** — add `[data-register='<name>'].site-header` to `Header.svelte` (per scheme values above).
5. **Footer scoped block** — add `[data-register='<name>'].site-footer` to `Footer.svelte`.
6. **Footer palettes** — add palette entry to `Footer.svelte` `palettes` object.
7. **CarnivalRibbon palettes** — add palette entry to `CarnivalRibbon.svelte` `palettes` object.
8. **Build** — `npm run build` must be clean.

Do schemes one at a time (carnival-poster-white → ocean → windies → gold-cream → caribana), building after each, so a breakage is attributable.

## NOT in scope

- **Route assignments** — user decision: land all 5 unassigned. `registerFor()` in `+layout.svelte` is NOT touched.
- Changing the 4 existing registers or any existing page body.
- Typography, imagery, layout changes.
- Consolidating the Register typedef into a shared file (worth doing later to kill the 17-file churn; out of scope here).

## Validation

1. `npm run build` clean after each scheme.
2. Typedef coverage: `grep -rln "heritage-sepia' | " voyager/src/` returns 0 files (i.e., no file still has the old 4-name union).
3. Manual preview: temporarily set `data-register='<name>'` on a page wrapper (dev tools) and confirm header/footer chrome, eyebrow, cards, and ribbon all render in the new scheme with readable contrast.
4. Contrast spot-checks: gold-cream eyebrow `#7A5C00` on `#FAFAE1` ≥4.5:1; windies text `bone-50` on `#2A000E` ≥7:1; ocean gold `#F8C300` used for fills/eyebrow (large text) on navy, not body.

## Risks

- **Typedef churn** — 17 files × 5 names is mechanical but error-prone; the grep check in Validation #2 catches misses.
- **gold-cream contrast** — gold `#EFB300` is decorative-only; any future page author must not use `--register-accent` for body text on this register. Document in tokens.css comment.
- **`--register-card-teal` reuse** — carnival-poster-white and ocean reference `var(--teal-deep)` for teal spotlight cards; intentional (dark card pops on their ground), but any route later assigned these registers must be previewed for card readability.
