# Plan: Fix /projects/ai Write tab horizontal overflow on mobile

## Goal

On `/projects/ai` (Voyager AI), when a user opens the **Write** tab on a narrow viewport (≤ ~640px), the compose form extends wider than the mobile screen, forcing the whole page to scroll horizontally outside the site bounds. Make the Write tab form respect the mobile viewport at all widths.

## Root cause

The compose form lives in `voyager/src/lib/components/NostrAiWrite.svelte`. Two related CSS problems combine to produce overflow:

1. **`.row-3` is unconditionally 3 columns.** Lines 313–317:
   ```css
   .row-3 {
       display: grid;
       grid-template-columns: 1fr 1fr 1fr;
       gap: 8px;
   }
   ```
   No responsive breakpoint. The "Price (sats) / Price (fiat) / Currency" row stays 3-up at 375px wide, leaving each column ~85px after the agent padding and page gutter.

2. **Grid items containing `<input>`, `<select>`, and `<textarea>` lack `min-width: 0`.** Form controls have an intrinsic min-content width (~150px for text inputs, wider for `<select>` with long option labels like "long-form (kind:30018)"). Without `min-width: 0` on the grid/field items, the grid track expands to the intrinsic min-content, blowing the column past 1fr and pushing the row wider than the parent. `.input`/`.textarea` also lack explicit `width: 100%` and `box-sizing: border-box`, so they aren't pinned to their track.

The two combine: the 3-column row + undersized/shrinkable form controls = horizontal page overflow.

## Affected boundaries

- Edit only: `voyager/src/lib/components/NostrAiWrite.svelte` (one file).
- The `<input>`/`<select>` styling is component-scoped (Svelte `<style>`), so changes cannot leak to other components.
- No layout/CSS token changes. No copy changes.

## Exact changes

All edits are inside the existing `<style>` block of `NostrAiWrite.svelte`.

1. **Make `.row-3` responsive** — single column on small screens, 3-up from `sm` (640px) up:

   Replace the existing `.row-3` rule (lines 313–317) with:
   ```css
   .row-3 {
       display: grid;
       grid-template-columns: 1fr;
       gap: 12px;
   }
   @media (min-width: 640px) {
       .row-3 {
           grid-template-columns: 1fr 1fr 1fr;
           gap: 8px;
       }
   }
   ```

2. **Allow grid/flex items containing form controls to shrink below their intrinsic min-content** — add `min-width: 0` to `.field`:

   Replace the existing `.field` rule (lines 318–322) with:
   ```css
   .field {
       display: flex;
       flex-direction: column;
       gap: 4px;
       min-width: 0;
   }
   ```

3. **Pin inputs/textareas to their grid track** — extend the existing `.input, .textarea` rule (lines 330–339) to add `width: 100%` and `box-sizing: border-box`:

   Replace the existing rule with:
   ```css
   .input,
   .textarea {
       padding: 10px 12px;
       border-radius: 12px;
       background: var(--register-ground);
       border: 1px solid var(--register-hair);
       color: var(--register-text);
       font-size: 14px;
       font-family: inherit;
       width: 100%;
       min-width: 0;
       box-sizing: border-box;
   }
   ```

4. **Defense in depth: contain overflow at the agent card** — add `min-width: 0` to `.agent` so any future child overflow is clipped by the card rather than the page:

   Replace the existing `.agent` rule (lines 261–269) with:
   ```css
   .agent {
       display: flex;
       flex-direction: column;
       gap: 16px;
       border-radius: 24px;
       padding: 22px;
       background: var(--register-card);
       border: 1px solid var(--register-hair);
       min-width: 0;
   }
   ```

No markup changes. No other files.

## Validation

1. `cd voyager && npm run build` succeeds (no Svelte/CSS parse errors).
2. Visual check on a narrow viewport:
   - Open `/projects/ai` at 375px wide (Chrome DevTools device emulation).
   - Click the **Write** tab.
   - Confirm the page does **not** scroll horizontally (check `document.documentElement.scrollWidth === window.innerWidth` in DevTools).
   - Confirm the "Price (sats) / Price (fiat) / Currency" row stacks vertically (one field per line) at 375px, and returns to 3-up at ≥640px.
   - Confirm the "Tags" and "Location" inputs span the full card width and are usable.
   - Confirm the JSON "Live preview" pre block still scrolls internally (not the page).
3. Spot-check at 768px and 1280px: the 3-up row reappears and the form is not visually broken.

## Risks

- **Low.** All changes are scoped to one component's `<style>` block. No token or markup changes.
- The `.row-3` responsive change means the three price fields stack on mobile. This is the intended UX fix — the previous 3-up at 375px was the bug.
- Adding `min-width: 0` to `.field` and `min-width: 0`/`width: 100%` to `.input`/`.textarea` is a standard CSS hardening pattern; it cannot cause fields to render narrower than their container in practice.

## Out of scope

- Changing the page-level `<section class="mx-auto max-w-6xl px-6">` wrappers in `voyager/src/routes/projects/ai/+page.svelte`.
- Modifying the Search or Embed tabs in `NostrAiSearch.svelte` / `NostrAiEmbed.svelte` (different layouts; not reported as overflowing).
- Touching `PayAiAssistCard.svelte` or `PlanTripWizard.svelte` (different components, different page sections).
- Adding `overflow-x: hidden` on `<body>` (would mask other layout bugs; the proper fix is per-component).