# Plan — Render UC "Primitives in play" via `<MasCampByline>`

## Goal

Replace the inline `<ul>` pill rows on every use-case detail page (`/use-cases/uc1` … `/use-cases/uc8`) with the existing `<MasCampByline>` component already used on `/use-cases`. Pill text must match the `/use-cases` home rendering (`label = primitive name`, `note = short descriptor`).

## Decisions

1. **Component**: reuse `<MasCampByline>` (no new component).
2. **Pill content**: matches `/use-cases` home exactly. Drop the `P1 · ` code prefix from each pill; the label becomes `Identity` / `Payments` / etc. and the note becomes the short descriptor currently inlined on `/use-cases`.
3. **Data shapes unchanged**: `useCases.json` and `primitives.json` are not touched. `uc.primitives` stays as plain strings (`"P1 · Identity"`).
4. **Mapping location**: inline-map on each UC page. No new shared module. Each UC route parses its `uc.primitives` strings and looks up the note from a per-file 5-entry map. (Accepts the 8× duplication the user signed off on.)
5. **Scope**: all 8 UC detail pages.
6. **Card wrapper kept**: the existing `rounded-[28px]` card with `background-color: var(--register-card)` stays around the new `<MasCampByline>` — matches the other cards on each UC page (`The problem`, `How Voyager fits`, `Next`).
7. **Eyebrow text kept**: stays `Primitives in play` on each UC page.
8. **Register**: pass `register="carnival-poster"` to `<MasCampByline>` to match the home `/use-cases` rendering.

## Edits

All 8 files are structurally identical, so the change pattern is the same in each.

### Per-UC page (8 files)

`voyager/src/routes/use-cases/uc{N}/+page.svelte`

**Script block** — replace imports + add per-file mapping:

```svelte
<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import MasCampByline from '$lib/components/MasCampByline.svelte';
	import useCases from '$lib/data/useCases.json';

	const PRIMITIVE_NOTES = {
		Identity: 'self-sovereign login',
		Payments: 'Lightning rail',
		Ramp: 'federated fiat',
		Messaging: 'NIP-17 gift wrap',
		Discovery: 'signed listings'
	};

	const uc = useCases.find((x) => x.slug === 'uc{N}');
	const primitivesInPlay = uc.primitives.map((s) => {
		const name = s.split(' · ')[1];
		return { label: name, note: PRIMITIVE_NOTES[name] };
	});
</script>
```

**Template** — replace the inline `<ul>` block (lines 38–47 in `uc1`, identical in others) with:

```svelte
<section class="mx-auto max-w-6xl px-6 pb-16">
	<div class="rounded-[28px] p-8" style="background-color: var(--register-card);">
		<MasCampByline register="carnival-poster" eyebrow="Primitives in play" camps={primitivesInPlay} />
	</div>
</section>
```

The outer `<section>` and `rounded-[28px]` card wrapper are unchanged. The component handles the eyebrow + pill list itself.

## Files affected

```
voyager/src/routes/use-cases/uc1/+page.svelte   EDIT (import, mapping, template)
voyager/src/routes/use-cases/uc2/+page.svelte   EDIT (import, mapping, template)
voyager/src/routes/use-cases/uc3/+page.svelte   EDIT (import, mapping, template)
voyager/src/routes/use-cases/uc4/+page.svelte   EDIT (import, mapping, template)
voyager/src/routes/use-cases/uc5/+page.svelte   EDIT (import, mapping, template)
voyager/src/routes/use-cases/uc6/+page.svelte   EDIT (import, mapping, template)
voyager/src/routes/use-cases/uc7/+page.svelte   EDIT (import, mapping, template)
voyager/src/routes/use-cases/uc8/+page.svelte   EDIT (import, mapping, template)
```

No other files (no data files, no component changes, no `/use-cases` home changes).

## Out of scope

- Refactoring `useCases.json` `primitives` to be objects or codes only.
- Refactoring `/use-cases` home to share its `PRIMITIVES` constant with the UC pages.
- Removing the `P1 · ` code prefix from `useCases.json` strings (the code prefix is still useful in other surfaces that may read `uc.primitives`).
- Visual restyling of `<MasCampByline>` itself.

## Validation

- `pnpm run build` from `/workspaces/voyager/voyager` — clean build.
- Visual: open each `/use-cases/uc{N}` page and confirm the "Primitives in play" card now renders the same pill style as the `/use-cases` home pill row (label + short note per pill, no `P1 · ` prefix visible).
- `rg -n "rounded-pill bg-bone-50 px-4 py-2 text-\[13px\]" voyager/src/routes/use-cases/uc{1,2,3,4,5,6,7,8}` — returns zero matches (the old inline pill markup is gone).
- `rg -n "Primitives in play" voyager/src/routes/use-cases/uc{1,2,3,4,5,6,7,8}` — still returns 8 matches (eyebrow text preserved).
- `rg -n "P1 · Identity" voyager/src/routes/use-cases/uc6` — should still match (the data is unchanged; this string lives in `useCases.json` and is read but no longer displayed verbatim in the pill).
- Sanity check: each UC page renders the same number of pills as it has `uc.primitives` entries.

## Risks

- **Drift in `PRIMITIVE_NOTES`**: the 5-entry map is duplicated across 8 files. A future edit to one file's notes must be replicated. Acceptable per user direction (inline-map on each page).
- **Parsing brittleness**: `uc.primitives` strings are split on `' · '` (middle dot + spaces). If `useCases.json` format ever changes, mapping breaks silently. Mitigated by the unchanged-data-scope and the validation grep above.
- **Styling context**: `<MasCampByline>` relies on `var(--register-*)` tokens. The parent `<RegisterSection register="carnival-poster">` provides these, so no styling breakage expected. The `register="carnival-poster"` prop is passed redundantly but explicitly for safety.