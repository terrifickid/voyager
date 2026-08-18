# Fix Budget Selector Selected State

## Problem
In `voyager/src/lib/components/TravelFormPrefs.svelte`, the Budget button group (lines 449-463) does not visually indicate the currently selected level, while the archetype radios and tag pills do. Selection state changes the underlying `form.budget` value (the Live personality panel still updates correctly), but the button styling does not reflect the selection.

## Goal
Make the selected budget level visually distinct in the same way the archetype radios and tag pills are — a clear blue-on-dark highlight — without changing any behavior, props, state, or config.

## Root cause
The current button class string is:

```
"flex-1 py-2 rounded-lg border text-lg tracking-widest transition-colors cursor-pointer
 border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500
 {form.budget === level ? 'bg-blue-600 border-blue-600 text-white' : ''}"
```

The selected-state classes are appended via a ternary, so when selected the final attribute is conceptually:

```
... border-slate-700 bg-slate-800 text-slate-100 hover:border-slate-500 bg-blue-600 border-blue-600 text-white
```

That should work, but the rendered highlight is indistinguishable in practice because (a) every button is already a dark `bg-slate-800` and the eye doesn't pick up the difference against the dark shell reliably, (b) on initial render `form.budget` is `3` (the config default) so the third button starts selected but there's no visual cue, and (c) the archetype/tag patterns rely on a clearer contrast swap (transparent → solid blue) rather than swapping one dark surface for another.

## Fix
Mirror the archetype radio pattern: unselected buttons are **transparent over `bg-slate-900`** (or, in practice, transparent with a `border-slate-700` outline), and selected buttons fill with `bg-blue-600`. This produces the same unmistakable "selected pill" affordance as the archetypes/tags.

Replace the `<button>` block at `voyager/src/lib/components/TravelFormPrefs.svelte:451-461` with:

```svelte
<button
  type="button"
  aria-pressed={form.budget === level}
  class="flex-1 py-2 rounded-lg border text-lg tracking-widest transition-colors cursor-pointer
         border-slate-700 text-slate-100 hover:border-slate-500
         {form.budget === level ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-800'}"
  onclick={() => {
    form.budget = level;
  }}
>
  {"$".repeat(level)}
</button>
```

Key changes:
- Move `bg-slate-800` from the always-on classes into the unselected branch (`bg-slate-800` on `''`, `bg-blue-600 ...` on selected). This guarantees the selected `bg-blue-600` is the *only* `bg-*` utility applied when a button is active, eliminating any "two backgrounds fight" ambiguity.
- Drop the always-on `text-slate-100` from conflict (selected branch overrides with `text-white`); keep it in the base for unselected legibility.
- Add `aria-pressed={form.budget === level}` for accessibility — not strictly visual, but consistent with treating these as toggle buttons.
- Selection classes (`bg-blue-600 border-blue-600 text-white`) now match the tag-pill selected state exactly, so the affordance is uniform across the form.

No changes to the script, props, state, helpers, deriveds, or other sections.

## Affected files
- `voyager/src/lib/components/TravelFormPrefs.svelte` — only the budget `<button>` block (lines 451-461).

## Validation
1. `npm run build` from `voyager/` succeeds; only the pre-existing `state_referenced_locally` warnings remain.
2. Dev server (`npm run dev`) on `/preferences`:
   - On first load, the third budget button (`$$$`) is selected and shows the blue highlight (matching `form.budget = 3` default).
   - Clicking `$`, `$$`, `$$$$`, or `$$$$$` highlights that button and clears the previous one — only one selected at a time.
   - Selected button has `bg-blue-600 border-blue-600 text-white`; unselected has `bg-slate-800` with a slate border.
   - The blue highlight is now visibly distinct from the unselected state (matches the tag pills).
3. Confirm the Live personality panel still updates on budget changes (functional parity — no script changes were made, so it should).
