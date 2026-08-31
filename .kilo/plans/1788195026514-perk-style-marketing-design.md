# Plan — Perk-style marketing design pass for Voyager

## Goal

Restyle Voyager to feel like a hot, premium AI-travel startup. Visual language is derived from `peak.json` ("perk-visual-design-v1"); content shape borrows from mindtrip.ai (AI travel planner with rich day-by-day itineraries, photos per place, ratings, save/share, conversational framing). The four routes (`/`, `/plan`, `/preferences`) plus the header/layout are reworked so the demo reads as one coherent product.

Out of scope: real AI integration, real photos/imagery (we'll use placeholders + a hero illustration), auth, persistence, the `/chat` route (already removed), deleting `src/lib/webllm/engine.svelte.js`.

## Decisions

- **Theme tokens (C1, C2, C7).** Define a small token layer in `layout.css` (or a new `tokens.css`) that the whole app reads from, so every route lands on the same palette:
  - `--bone-50 #F1EFE9` (page bg), `--bone-100 #E9E6DD` (section bg / nav), `--bone-200 #DED9CB` (card surface), `--bone-300 #C9C3B1` (card hover / inset surface).
  - `--ink #14140F` (display), `--ink-2 #2A2A22` (body near-black), `--muted #6E6E68` (body gray), `--hair #1A1A14` at 8% opacity (rare hairline only on imagery overlays — never as card border).
  - `--lime #BEE93A` (single acid accent), `--lime-ink #14140F` (text on lime).
  - Pastels for icons only (C9): `--pastel-violet #C9B6FF`, `--pastel-coral #FFB39E`, `--pastel-sky #A9D7FF`, `--pastel-rose #F4B4CB`.
  - Surface elevation is always a tonal step in the same hue family. No `border`/`shadow` on cards. All radii 24–32px on cards, pill (999px) on CTAs (C6, C4).
- **Type (C3, C7).** Self-host two Google Fonts via `<link>` in `app.html` (no npm deps): `Space Grotesk` (display, weight 500–700) and `Inter` (body). Display headlines: 72–100px at ≥1200px, `tracking: -0.02em`, `line-height: 0.98–1.05`, sentence case, deliberate 2–3 line breaks. Body = `Inter 16px/1.55 #2A2A22`. Eyebrows = small-caps with `letter-spacing: 0.12em`, color `--muted`.
- **CTAs (C4).** Single reusable `<Cta>` (and `<CtaSecondary>`) component using `border-radius: 999px`, padding `14px 18px 14px 20px`, `font-weight: 600`, trailing `›`. Primary fill `var(--lime)` with `--lime-ink` label. Secondary = transparent with `1.5px` `var(--ink)` border. Tertiary = underlined `--ink` text with `›`.
- **Iconography (C9).** Inline SVG components in `src/lib/components/icons/` (~12 glyphs: map-pin, calendar, sparkle, compass, leaf, chat, share, save, lock, bolt, globe, check). 28–32px, flat solid pastel fills, no stroke, no container chip. Never use lime on icons.
- **Hero imagery (C5).** Since we have no real product screenshots and the rubric wants "hardware showing the UI," substitute with an SVG mock of a phone-shaped frame containing a stylized itinerary card (same content the wizard would produce). This is a controlled, on-brand vector device — explicitly NOT a floating card over lifestyle people (Navan pitfall). Hero copy = mindtrip-style: monumental "Plan trips you'll actually want to take." with subtitle explaining local-first AI + day-by-day itinerary + save/share.
- **Layout & whitespace (C8).** `+layout.svelte` becomes a max-w-6xl bone canvas with generous vertical rhythm. Section gaps = 96–112px. No scroll-hint chevrons. Sticky pill nav at top on `--bone-100`.

## Files

### New
- `voyager/src/lib/styles/tokens.css` — CSS custom properties for palette, type, radii, shadows-as-tonals.
- `voyager/src/lib/components/Cta.svelte` — primary/secondary/tertiary variants (`href` or `onclick` slot).
- `voyager/src/lib/components/icons/Icon.svelte` + 12 small per-glyph SVGs in `voyager/src/lib/components/icons/*.svelte`.
- `voyager/src/lib/components/HeroMockup.svelte` — phone-frame SVG containing a sample itinerary card.
- `voyager/src/lib/components/SectionHeader.svelte` — eyebrow + display headline + lede, used by landing sections.
- `voyager/src/lib/components/BrandRow.svelte` — grayscale wordmark row for landing ("Trusted by ..." — uses 6 placeholder brand text marks; no fake logos).
- `voyager/src/lib/components/FeatureCard.svelte` — pastel icon + headline + body, used in benefits grid.
- `voyager/src/lib/components/PersonaCard.svelte` — persona card for "Built for …" section.
- `voyager/src/lib/components/QuoteCard.svelte` — testimonial card (2 placeholder quotes).
- `voyager/src/lib/components/Footer.svelte` — multi-column footer with link lists, locale pill, copyright.

### Modified
- `voyager/src/app.html` — add Google Fonts `<link>` for Space Grotesk + Inter; set base font-family + bg on `<html>`.
- `voyager/src/routes/layout.css` — `@import 'tailwindcss';` + `@import '$lib/styles/tokens.css';`; set `body` to `--bone-50`, `color: var(--ink-2)`, `font-family: 'Inter', sans-serif`.
- `voyager/src/routes/+layout.svelte` — bone canvas, max-w-6xl, sticky `<Header />` on bone-100, `<Footer />` at bottom.
- `voyager/src/lib/components/Header.svelte` — wordmark left, nav links (Home, Plan a trip, Preferences) right, pill `Plan a trip` button using `<Cta variant="primary">`. Active link = underlined `--ink`. No slate-* classes remain.
- `voyager/src/routes/+page.svelte` — full Perk-style landing:
  1. **Top ribbon** (lime, full-bleed, single line: "Local-first AI travel planning — runs in your browser, no API key" + `›` link).
  2. **Hero** (C8): 100+ px top space, monumental H1 (2 lines), subtitle (`--muted`), dual CTAs (`Plan a trip` lime primary, `See how it works` outline secondary), `<HeroMockup />` layered right on desktop, stacked below on mobile.
  3. **Brand row**: "Loved by travelers who hate planning trips" + 6 grayed text wordmarks in a row.
  4. **One-sentence value section** (display heading, 1-line stat, 1 paragraph, single outline CTA).
  5. **Tabs row (Travel / Stay / Share)** — 3 tone-stepped cards with pastel icon + headline + body + outline CTA. Mirrors Perk's Travel/Spend/Events grid.
  6. **Stats band** (tonal card, two oversized numbers like "200,000 hrs saved" and "10,000+ trips planned").
  7. **Benefits grid** (C9): 4 `FeatureCard`s — "Conversational planning", "Day-by-day itinerary", "Real place data", "Save & share trips". Each gets a pastel icon, eyebrow, headline, body. Tonal-step cards, no borders.
  8. **Personas** ("Built for …"): 3 `PersonaCard`s — Weekend explorers, Family trips, Group trips — each with a pastel icon + 1 paragraph + outline CTA.
  9. **Testimonials**: 2 `QuoteCard`s in a tonal-step row.
  10. **Final CTA band**: monumental display line + lime primary CTA + outline secondary.
  11. **Footer**: `<Footer />`.
- `voyager/src/routes/plan/+page.svelte` — strip all slate-*; bone canvas; eyebrow "PLAN A TRIP"; monumental H1 "Tell us where. We'll do the rest."; sub lede. After submit, panel header uses the same eyebrow + monumental treatment with an "Edit my trip" outlined pill on the right.
- `voyager/src/lib/components/PlanTripWizard.svelte` — retone only: replace `bg-slate-900/950/800/700` palette with `--bone-100/200/300`; replace indigo CTA with `<Cta variant="primary">`; replace `text-slate-100/200/400/500` with `--ink/--ink-2/--muted`; progress bar fill = `--lime`, track = `--bone-200`; **keep all functional logic and the `onFinish` prop intact**.
- `voyager/src/lib/components/TravelFormPrefs.svelte` — same retone pass as the wizard (replace slate-* with bone tokens, replace indigo with lime CTA, no behavior changes).
- `voyager/src/routes/preferences/+page.svelte` — bone background + SectionHeader above `<TravelFormPrefs />`.

### Untouched
- `src/lib/agent/*` (fixtures + functions) — visual pass only.
- `src/lib/stores/user.svelte.js` — store shape unchanged.
- Wizard step content (`STEPS`, `CONFIG`) — text unchanged.

## Behavior

1. User lands on `/` → bone canvas, ribbon, hero with display headline, sticky nav. Clicking primary CTA routes to `/plan`.
2. `/plan` shows the wizard in the new palette. Finish still calls `onFinish`, parent runs the agent calls and swaps to the itinerary panel.
3. Itinerary panel renders on bone canvas with the same eyebrow/display header pattern as the landing page. Concept card, day cards, place candidates are tonal-step cards (no borders, no shadows), each headline uses display type, body uses Inter. Tag chips (place tags) become small uppercase eyebrow pills using `--muted` text on `--bone-200` (no lime — C2).
4. "Edit my trip" outlined pill flips `submitted` back; wizard re-mounts with seeded draft, palette unchanged.
5. `/preferences` reuses the same header/footer/wizard shell.

## Edge cases

- **No imagery assets**: Hero uses an SVG device mockup composed in `HeroMockup.svelte` — no external fetches, works offline. This is the on-brand substitute for real photography (C5 pitfall: clean vector device frames are flagged "too perfect" — to mitigate, we apply slight off-axis rotation and a soft tonal-step shadow so it reads as "in-scene" without claiming to be a photo).
- **Tailwind v4**: project uses `@import 'tailwindcss';` (v4). The token CSS variables above are exposed via Tailwind v4's `@theme` block so utility classes (`bg-bone-100`, `text-ink`, `rounded-pill`) work alongside arbitrary values. This avoids re-declaring colors as utilities.
- **TypeScript edge case**: same `.svelte.js` import pattern in `+page.svelte` and `Header.svelte` already established — keep the `// @ts-ignore` + explicit param types convention.
- **Header sticky on bone bg**: `Header.svelte` switches from `bg-slate-950/80 backdrop-blur` to `bg-bone-100/90 backdrop-blur` with no border (C6 — tonal step, not hairline). Active link = `text-ink underline underline-offset-4`.

## Validation

1. `npx svelte-check --tsconfig ./.svelte-kit/tsconfig.json --output human | grep -E "src/(lib|routes)"` returns empty.
2. Manual: open `/` and confirm rubric C1–C9 markers visually:
   - C1: dominant bg in `--bone` family, no white/cool-gray surfaces.
   - C2: lime appears only on primary CTA, ribbon, and one in-scene object (the device mockup's "today" pill).
   - C3: H1 ~80–100px, Space Grotesk 500–700, `-0.02em`, 2-line break.
   - C4: every primary = pill lime; every secondary = outlined pill with `›`.
   - C6: every card is borderless + shadowless + tonal step.
   - C9: every icon is pastel, never lime, never in a chip.
3. Wizard + itinerary: complete wizard → see itinerary on `/plan` in new palette. Reload resets to wizard (existing behavior preserved).
4. `npx vite build` still hits the pre-existing `GOOGLE_PLACES_API_KEY` error in `src/routes/api/places/search/+server.js` — untouched, out of scope.

## Risks

- **Color-system migration risk**: there are ~9 files using `slate-*` and `indigo-*` classes. The implementation must update each consumer; missing one leaves a "dark slate island" that breaks the rubric. Mitigation: retone pass done per-component in a single sweep; `svelte-check` + visual review.
- **Type ramp**: relying on Tailwind v4 `@theme` for tokens requires the block to live in a file Tailwind parses. We add it to `layout.css` alongside the `@import` so SvelteKit + Tailwind see it on first paint.
- **Hero mockup "too perfect"**: addressed by rotation + tone-step shadow noted above. If reviewers still flag it, fallback is a real screenshot of the itinerary panel rendered via Playwright into `/static/hero-itinerary.png` — flagged as a stretch, not part of this pass.

## Order of operations (for the implementer)

1. Add tokens, fonts, `app.html`, `layout.css`.
2. Build primitives: `Cta`, icons, `SectionHeader`, `HeroMockup`, `FeatureCard`, `PersonaCard`, `QuoteCard`, `BrandRow`, `Footer`.
3. Rewrite `Header.svelte`, `+layout.svelte`.
4. Rewrite landing `+page.svelte` section by section.
5. Retone `PlanTripWizard.svelte`, then `+page.svelte` (plan), then `TravelFormPrefs.svelte`, then `preferences/+page.svelte`.
6. Run `svelte-check`. Fix any remaining slate/indigo stragglers.
7. Manual rubric pass — fix any C1/C2/C4/C6/C9 violations before declaring done.