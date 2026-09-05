# Plan: Make all home-page blocks grey (no blue)

## Goal

On the Voyager home page (`voyager/src/routes/+page.svelte`), every card/panel/CTA block currently rendered with the "teal" register card token is visually distinct (blue-ish) from the rest, which use the standard grey register card. Make all blocks on the home page grey by switching the two remaining teal backgrounds to the standard register card token.

## Root cause

Two `<div>`/`<a>` elements on the home page set `background-color: var(--register-card-teal)`.

In `voyager/src/routes/layout.css:129` (the `carnival-poster` register block — which wraps the entire home page via `<RegisterSection register="carnival-poster">` at line 127), `--register-card-teal` resolves to `--teal-deep: #0e2a3a` (a dark blue-teal). All other blocks use `var(--register-card)`, which in the same register resolves to `rgba(241, 239, 233, 0.06)` — the neutral grey the user wants.

## Affected boundaries

- Edit: `voyager/src/routes/+page.svelte` — two inline-style background changes. Nothing else.

## Exact changes

1. **Line 208** — first card in the "Apps shipped on the toolkit" section (the `Voyager AI` showcase `<a>`):

   Replace
   ```html
   style="background-color: var(--register-card-teal); color: var(--register-text);"
   ```
   with
   ```html
   style="background-color: var(--register-card); color: var(--register-text);"
   ```

   The trailing `color: var(--register-text)` is preserved as-is — it does not affect the user's complaint.

2. **Line 422** — the closing "Build on rails the region actually owns" CTA block:

   Replace
   ```html
   style="background-color: var(--register-card-teal);"
   ```
   with
   ```html
   style="background-color: var(--register-card);"
   ```

No other lines, no other files, no CSS token changes. The teal token is left defined in `layout.css` because it is used elsewhere on the site — only the two home-page references are removed.

## Validation

1. `cd voyager && npm run build` succeeds.
2. Open `http://localhost:<port>/` and confirm every rounded card/panel/CTA on the home page renders with the same neutral grey background — including the Voyager AI showcase card (currently teal) and the closing "Build on rails…" CTA block (currently teal).
3. Spot-check that other pages still render teal cards correctly (e.g. `/projects/*`, `/network/*` if applicable) — they should, because the token is untouched.

## Risks

- None material. The change is purely cosmetic, scoped to two `style` attributes on the home page. No layout shifts expected: both replacements use the same CSS variable shape (`background-color`), and the existing `--register-card` token already matches the surrounding grey.
- One minor visual consideration: the "Build on rails the region actually owns" closing CTA on a dark carnival-poster background reads as a distinct band today; making it grey will make it blend more with adjacent sections. If the user later wants a different standout treatment there, that's a separate decision and out of scope here.

## Out of scope

- Changing the `--register-card-teal` token globally.
- Adjusting other pages that may also use teal cards.
- Restyling the home page hero, typography, or section structure.