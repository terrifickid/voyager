# Plan: Simplify DatePicker to a demo mockup

## Goal

Reduce `voyager/src/lib/components/DatePicker.svelte` from a fully-functional date picker to a demo mockup, while keeping the wizard's data flow working.

## User decisions (resolved)

- **Click behavior:** keep `onclick → onSelect(toIso(d))` so `draft.startDate` / `draft.endDate` still update. Clicks remain functional; only the navigation/bounds logic is stripped.
- **Reference month:** show the current real calendar month (computed from `new Date()` at render time).
- **Eyebrow labels:** keep "Start date" / "End date" above each calendar.
- **Remove:** the month-name header row (e.g. "October 2026") and the prev/next chevrons, and all past-date / max-date disabling logic.

## Out of scope (explicit)

- No changes to `PlanTripWizard.svelte` — it already passes `minDate`, `maxDate`, `id`, `onSelect`; these props stay in the component signature so the wizard import is unchanged, but the picker ignores `minDate` / `maxDate` internally.
- No changes to `+page.svelte`, the user store, or downstream consumers.
- No restoration of disabled-state styling for past dates; past days are clickable and selectable like any other day in the current month.

## Implementation

Edit `voyager/src/lib/components/DatePicker.svelte`:

1. **Strip the header row** (lines 173–193 in the current file): the flex container with the prev button, `monthName` span, and next button. Replace with nothing — leave only the eyebrow label and the day grid.
2. **Drop unused state and derivations:**
   - `viewYear`, `viewMonth` — no longer needed; remove.
   - `seedYear`, `seedMonth` — remove.
   - Both `$effect` blocks (lines 74–92) — remove.
   - `monthName` `$derived` — remove.
   - `minMonth`, `maxMonth`, `canPrev`, `canNext` — remove.
   - `prev`, `nextMonth` functions — remove.
3. **Compute `cells` against today's month directly.** Replace the `$derived` body so it reads `today.getFullYear()` / `today.getMonth()` instead of `viewYear` / `viewMonth`. The grid still renders 42 cells with leading blanks for Monday-first alignment, and neighbour-month days are still rendered muted+disabled (this is a layout-stable grid, not a "past dates" feature).
4. **Drop `isDisabled` past-date check.** Cells are only "disabled" when they are out-of-month neighbour cells (so the 42-cell grid stays square). Replace `isDisabled(d)` with a single check: `!cell.inMonth`. `minDate` / `maxDate` props are still in the signature but unused inside the component.
5. **Keep the today ring and selection styling as-is.** Clicking a day still toggles selection via `onSelect`.
6. **Keep `label`, `value`, `id`, `onSelect` props.** Drop `minDate` and `maxDate` from the JSDoc since they're no longer used (or leave them in the signature to avoid touching the wizard — preferred: leave in signature, just unused).

Result: ~80-line component, two side-by-side grids each showing the current month, eyebrow label only, clickable cells that still drive `draft.startDate` / `draft.endDate`.

## Risks and mitigations

- **Risk:** Removing `viewYear`/`viewMonth` means the calendar is stuck on the current real month even after `value` is updated, so a previously-selected date in a *different* month would no longer be visible.
  **Mitigation:** Acceptable for a demo mockup. The Start picker shows today's month; the End picker also shows today's month (so the grid is identical in both columns, which is fine for a visual mockup). The selection ring still renders on whatever day matches `value` *if* that day happens to be in the displayed month.
- **Risk:** `minDate` / `maxDate` props are passed by the wizard but ignored — silent contract drift.
  **Mitigation:** Leave the props in the `$props()` destructuring (with `undefined` defaults) and add a one-line comment noting they're ignored. Avoids touching `PlanTripWizard.svelte`.

## Validation

- `cd voyager && GOOGLE_PLACES_API_KEY=dummy npm run build` — must succeed.
- `npm run dev`, navigate to `/plan`, advance to step 2:
  - Two identical calendars side-by-side at md+, stacked on mobile.
  - Each shows the current month with leading blanks and a partial trailing row (still 42 cells).
  - No "October 2026" header, no prev/next chevrons.
  - Today's date has the ink ring.
  - Clicking any in-month day sets `draft.startDate` / `draft.endDate` and the cell turns `bg-ink text-bone-50`.
  - Past dates are clickable (no grey-out).
  - Clicking Next after picking both still advances through the wizard.
