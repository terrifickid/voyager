# Plan: default `startDate` and `endDate` to a sensible week-long window

## Goal

When the user lands on `/plan` with no saved trip (or with a partial save that has no dates), pre-fill the date step: `startDate = today`, `endDate = today + 7 days`. The user shouldn't have to pick dates just to advance through the wizard.

This is a UX change only. It does **not** touch the scheduler crash. If that crash still fires on navigation, that's a separate bug.

## Scope decision

Only `voyager/src/lib/components/PlanTripWizard.svelte:108-160` (`initialTripDraft`) changes. The `today` / `endCeiling` / `addDays` helpers at lines 176-184 already exist and are reused. No other file changes.

## Edits

### Edit 1 — `initialTripDraft()` base dates

**Before** (lines 110-119):

```js
const base = {
  destination: '',
  startDate: '',
  endDate: '',
  travelers: { adults: 1, kids: 0, kidsAges: [] },
  archetype: null,
  tags: [],
  budget: 3,
  note: '',
};
```

**After**: replace `startDate: ''` and `endDate: ''` with a computed week window. Build the values once at the top of `initialTripDraft()` so both `base` and the `seeded` branch can read them:

```js
function initialTripDraft() {
  const existing = user.preferences?.trip;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const defaultStart = toLocalIso(now);
  const defaultEnd = toLocalIso(addDaysLocal(now, 7));

  const base = {
    destination: '',
    startDate: defaultStart,
    endDate: defaultEnd,
    travelers: { adults: 1, kids: 0, kidsAges: [] },
    archetype: null,
    tags: [],
    budget: 3,
    note: '',
  };
  // ...
}
```

Add a tiny local helper at the top of the `<script>` block (right after `addDays` at line 184, or as a sibling near `initialTripDraft`):

```js
function toLocalIso(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function addDaysLocal(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
```

This matches the date-string shape the wizard already uses (see `DatePicker.svelte:29-34`, same format). The existing `addDays(d, n)` at line 180 can be reused — call it as `addDays(now, 7)` instead of adding `addDaysLocal`. That's cleaner; drop the duplicate helper.

### Edit 2 — fall back to defaults when `existing.startDate` is empty

**Before** (lines 133-134):

```js
startDate: existing.startDate ?? base.startDate,
endDate: existing.endDate ?? base.endDate,
```

**After**:

```js
startDate: existing.startDate || base.startDate,
endDate: existing.endDate || base.endDate,
```

`??` only catches `null` / `undefined`. A previously-saved `''` would otherwise leak through and re-empty the dates. `||` treats empty string as missing → fall through to the new defaults.

### Edit 3 — update the mount-log message in `initialTripDraft` (debug only)

The existing log at line 121-128 emits `seedFrom: 'base'` when `!existing`. That's still correct — no change needed. The log at lines 147-157 includes `hasStartDate` / `hasEndDate` — those will now read `true` for fresh wizards. That's the truth; no change needed.

## What this does NOT change

- `endMaxDate` derived (line 186): it already handles a populated `startDate` correctly (returns `start + 60d` capped at year-end). No edit.
- `canAdvance` for the `dates` step (line 230-231): requires both dates and no `dateError`. Pre-filled dates pass.
- `finish()` at line 339: already reads `draft.startDate` / `draft.endDate` and ships them in the snapshot. Pre-filled dates will round-trip into `user.preferences.trip` on save.
- The `$state` declaration at line 174 (`let draft = $state(initialTripDraft());`) needs no change — `initialTripDraft()` is still called once at component construction; the new defaults just appear inside it.

## Risks / edge cases

- **Return user with a previous trip**: `existing.startDate` is non-empty → `||` short-circuits to existing. Pre-filled defaults only show for first-time or partial-state users. Correct.
- **Past dates if the wizard sits open across midnight**: `today` is a `const` at script-init. Out of scope; matches the existing `endCeiling` / `endMaxDate` pattern.
- **Year-boundary**: `addDays(now, 7)` produces a `Date` object whose `toLocalIso()` is correct via `getFullYear/getMonth/getDate` (no UTC offset bugs). Verified mentally against `DatePicker.svelte:29-34` which uses the same approach.
- **The 7-day window is arbitrary**: the user said "a week trip or something". 7 days is the simplest, most defensible default. No need to expose a constant.

## Validation

1. `cd /workspaces/voyager/voyager && npm run build` → clean compile.
2. **Fresh `/plan`**: hard-reload `/plan` with `localStorage` cleared (or in a private window). Open devtools console. The Start date cell and End date cell should both be pre-selected on the calendar grid (matching today and today+7). The wizard should let you click Next straight from Destination → Dates.
3. **Existing trip**: previously-saved trip with valid `startDate`/`endDate` → those dates still appear, defaults are not used.
4. **Partial save**: if `user.preferences.trip.startDate === ''`, the wizard now shows today/today+7 (previously showed blanks).
5. **Date picker interaction**: clicking a date still updates `draft.startDate` / `draft.endDate` correctly. End-date picker still clamps to `startDate + 60d`.

## Affected files

- `voyager/src/lib/components/PlanTripWizard.svelte`:
  - `initialTripDraft()` lines 108-160: replace empty `startDate`/`endDate` in `base` with computed defaults; change `??` to `||` for both date fields; add `toLocalIso` helper.
- **No other files change.**

## Out of scope

- The `Cannot read properties of undefined (reading 'startTime')` scheduler crash. The user explicitly chose UX-only this round.
- Removing the `$effect` in `/plan/+page.svelte`. Same reason.
- Any change to `user.svelte.js`, `DatePicker.svelte`, `/plan/+page.svelte`.