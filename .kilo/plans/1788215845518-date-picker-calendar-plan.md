# Plan: Date picker for the /plan wizard (step 2)

## Goal

Replace the two `<input type="date">` controls in the "When?" step of `voyager/src/lib/components/PlanTripWizard.svelte` (lines 297–320) with a custom, styled calendar UI. Keep the existing `draft.startDate` / `draft.endDate` contract (ISO `YYYY-MM-DD` strings) so nothing downstream (the trip store, the agent flow, the itinerary view) has to change.

## User decisions (resolved)

- **Layout:** two calendars shown side-by-side at `md+` (Start on the left, End on the right); stacked vertically on mobile.
- **Selection flow:** clicking a date in the Start calendar sets start. Clicking a date in the End calendar sets end. No swap, no auto-switch.
- **Past dates:** disabled. Today is the minimum selectable date for both calendars.
- **Max range:** End calendar grey out anything more than **60 days** after the currently-selected Start. End calendar's month navigation is bounded to startMonth..startMonth + 2 months (3 months total, including the start month).
- **Conflict behavior:** if Start is changed to a date *after* the current End, End is auto-cleared so the user re-picks it.

## Out of scope (explicit)

- No changes to `+page.svelte` (the `/plan` route), `user.svelte.js` store, agent flow, or downstream consumers.
- No year picker. Year is fixed to the current year (`new Date().getFullYear()`), per user request.
- No multi-month scroll; only one month visible per calendar at a time, with prev/next chevrons.
- No time, timezone, or locale concerns beyond what `Intl` already provides (`en-US` for day labels).
- No animation library — Tailwind `transition-colors` only.

## Design

### New component: `voyager/src/lib/components/DatePicker.svelte`

Props (Svelte 5 runes, `$props()`):

```js
/** @type {{
 *   label: string,
 *   value: string,         // ISO 'YYYY-MM-DD' or ''
 *   minDate?: Date,        // optional floor; defaults to today
 *   maxDate?: Date,        // optional ceiling
 *   id?: string,
 *   onSelect: (iso: string) => void
 * }} */
```

State:

- `viewYear` (`$state`, defaults to the year of `value` if set, else today)
- `viewMonth` (`$state`, 0–11; same seed rule)

Derived:

- `firstOfMonth` = `new Date(viewYear, viewMonth, 1)`
- `daysInMonth` = computed
- `leadingBlanks` = weekday of firstOfMonth, **Monday-first** (`(weekday + 6) % 7`) — matches the rest of the site's tone (week starts on Monday; no locale surprises).
- `cells` = array of `{ date: Date, inMonth: boolean }` for the 6×7 grid (always 42 cells so the grid doesn't reflow between months).
- `isSelected(d)` = same calendar day as `value`
- `isDisabled(d)` = `d < minDate` OR `d > maxDate`
- `isToday(d)` = same calendar day as today

Header (per calendar):

- Eyebrow label above the grid: `props.label` (the wizard passes "Start date" / "End date")
- Row: `[‹]  Month YYYY  [›]`, with `‹` / `›` disabled at the bounds (`viewMonth` ≤ minMonth when `minDate` is set, and ≤ maxMonth when `maxDate` is set).

Grid:

- Day-of-week header row: `M T W T F S S` in `text-xs uppercase text-muted`.
- 42 cells, each a button. Empty leading/trailing cells from neighbouring months render muted with reduced opacity, and are **disabled** (not clickable).
- Selected cell: `bg-ink text-bone-50 rounded-full`.
- Today (when not selected): thin ink ring.
- Disabled cells: `text-bone-300 cursor-not-allowed`.
- Hover on enabled: `bg-bone-200 rounded-full`.
- Each button is `aspect-square` so the grid is square.

### Visual / token compliance

Reuse existing tokens only. No new CSS, no new colors:

- Backgrounds: `bg-bone-50` (wizard step card), `bg-bone-200` (hover).
- Text: `text-ink`, `text-ink-2`, `text-muted`, `text-bone-300` (disabled).
- Selection: `bg-ink text-bone-50` (matches the existing archetype radio, tag pill, budget button — established convention for "this is selected").
- Today: `ring-1 ring-ink`.
- Shape: `rounded-full` for day cells; `rounded-2xl` for the per-calendar container card; `rounded-pill` for the chevron buttons (matches wizard step pill style).
- Type: `font-display` on the month name (`font-display text-lg text-ink`), `font-medium text-sm` on day numbers.

### Integration in `PlanTripWizard.svelte`

The dates step block at lines 297–320 is replaced. New structure:

```svelte
<div class="flex flex-col gap-4">
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <DatePicker
      label="Start date"
      value={draft.startDate}
      minDate={today}
      maxDate={endCeiling}
      id="start-date"
      onSelect={(iso) => {
        draft.startDate = iso;
        if (draft.endDate && draft.endDate < iso) draft.endDate = '';
      }}
    />
    <DatePicker
      label="End date"
      value={draft.endDate}
      minDate={draft.startDate ? new Date(draft.startDate) : today}
      maxDate={endCeiling}
      id="end-date"
      onSelect={(iso) => { draft.endDate = iso; }}
    />
  </div>
  {#if dateError}
    <p class="text-sm text-ink">{dateError}</p>
  {/if}
</div>
```

Notes:

- `today = new Date(); today.setHours(0,0,0,0);` — module-level constant at the top of `<script>`.
- `endCeiling` is computed once: `new Date(today.getFullYear(), 11, 31)` (end of current year). User said year is fixed to this year, so the ceiling is "the rest of this year". This satisfies "60-day cap" because **Start is bounded to today ≥ today** and **End is bounded to startMonth..startMonth+2** in the DatePicker's internal `maxDate` logic — actually no: the 60-day cap is computed *from the selected Start*, so it must be re-derived when Start changes.
  - Implementation: pass `maxDate = draft.startDate ? addDays(new Date(draft.startDate), 60) : endCeiling` to the End picker. Inside the End picker, that `maxDate` also bounds month navigation (max month = `startDate + 60 days`, expressed as month index). For the Start picker, `maxDate` is `endCeiling` (end of year) so the user can pick anything in this year.
- The existing `dateError` `$derived` stays exactly as-is.
- The existing `canAdvance` for `dates` (line 153) stays exactly as-is — it already requires both dates and no error.
- `onInputKeydown` (line 191) stays bound to the text inputs on other steps; the date step has no `<input>` after the change, so the Enter-to-advance shortcut becomes the responsibility of the user clicking the Next `Cta`. This matches how every other step (archetype, tags, budget) works — no regression.

## Implementation steps (ordered)

1. Create `voyager/src/lib/components/DatePicker.svelte` (~120 lines).
2. Edit `voyager/src/lib/components/PlanTripWizard.svelte`:
   - Add `import DatePicker from './DatePicker.svelte';` near the existing `Cta` import (line 4).
   - Add module-level `const today = ...` near the top of `<script>` (after the `STEPS` const, around line 137).
   - Replace the dates step block at lines 297–320 with the new two-picker grid per the snippet above.
   - Leave the rest of the wizard byte-identical.

## Risks and mitigations

- **Risk:** Month-nav bounds with a `maxDate` that depends on the *selected* Start require the End picker to recompute its `viewMonth` when Start changes — otherwise the End picker could show a month that's no longer reachable.
  **Mitigation:** When `viewMonth` > derived maxMonth on render, clamp it (set `viewMonth = maxMonth` in a `$effect` that watches `props.value` and the bounds). Svelte 5 `$effect` handles this cleanly.

- **Risk:** Empty trailing cells from the *next* month in the 42-cell grid could be confused for valid dates if not visually distinct.
  **Mitigation:** Already disabled in the existing design (muted color, `cursor-not-allowed`, no hover). Day numbers shown but de-emphasized.

- **Risk:** Year-bound edge case: if today is e.g. November 30 and Start = November 28, End's maxDate = January 27 of next year, but user said "no year picker, this year only".
  **Mitigation:** The 60-day cap from Start naturally bounds End. If `maxDate` from Start would exceed year-end, clamp to year-end (`Math.min(addDays(start, 60), endOfThisYear)`). Both the day-grid and month-nav bounds use the same clamped value.

- **Risk:** SSR/hydration mismatch if `today` is captured at server start vs. client mount (different days).
  **Mitigation:** Use `new Date()` at module evaluation time. Both server and client run on the same UTC day most of the time; even if there's a timezone boundary crossing, the only impact is a one-off "today" mismatch, which is fine because the floor only disables past dates — not catastrophic.

- **Risk:** Keyboard accessibility — Tab order through the 42 day cells is verbose.
  **Mitigation:** Acceptable; matches every other calendar widget. Each cell is a real `<button>` so Tab/Enter/Space work natively. No action required.

## Validation

- `npm run build` from `voyager/` — must succeed (pre-existing `GOOGLE_PLACES_API_KEY` env error on `main` is unrelated; reproduce with `GOOGLE_PLACES_API_KEY=dummy npm run build`).
- `npm run dev` from `voyager/`, navigate to `/plan`, advance to step 2 ("When?"):
  - **Initial state:** both calendars visible side-by-side. Today's date is marked (ink ring). Past days are greyed out.
  - **Pick Start = today + 3 days:** Start calendar shows that date as `bg-ink text-bone-50`. End calendar's `minDate` shifts; days before that are disabled.
  - **Pick End = today + 5 days:** End calendar shows selection. Range is valid; Next button enabled.
  - **Pick End = today + 70 days:** that date is disabled in the End grid. Datepicker visually caps at today + 60.
  - **Move Start to today + 10 days (after current End of +5):** End is auto-cleared. `dateError` does not fire (because `endDate === ''`). End grid remains editable; user re-picks.
  - **Change Start to a date in the previous month:** prev chevron on Start works; past days still disabled.
  - **Month-nav bounds:** End picker's chevrons cannot advance past the month containing today+60 (or year-end, whichever is earlier).
  - **Mobile (<640px):** calendars stack vertically. Each fills its column. Touch targets ≥ 40px.
  - **Finish flow:** pick Start, pick End, click Next through the rest of the wizard, hit Finish. `user.preferences.trip.startDate` and `.endDate` are populated in the store (verify via DevTools or the wizard re-entry).
  - **Re-entry:** if `user.preferences.trip.startDate` is already set when the wizard mounts, both calendars open on the right month and the right day is highlighted.

## Open questions

None.
