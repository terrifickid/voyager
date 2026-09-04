# Plan — Remove card wrapper around "Primitives in play" `<MasCampByline>`

## Goal

Drop the `rounded-[28px]` card wrapper around the `<MasCampByline>` on every `/use-cases/uc{N}` "Primitives in play" section so the byline stands alone on the dark `carnival-poster` background, matching the existing standalone "Mas camps & kaiso tents" section already used on `uc7` and `uc8` (and elsewhere).

This reverses decision #6 of the previous plan (`1788540586503-uc-primitives-mas-camp-byline.md`), which kept the card wrapper. The user has now overridden that decision.

## Reference shape (standalone, from `uc7`/`uc8` "Mas camps & kaiso tents")

```svelte
<section class="mx-auto max-w-6xl px-6 pb-12">
	<MasCampByline register="carnival-poster" eyebrow="Mas camps & kaiso tents" camps={MAS_CAMPS} />
</section>
```

No `<div class="rounded-[28px] p-8" style="background-color: var(--register-card);">` wrapper. The `<MasCampByline>` component handles its own eyebrow + pill layout, and its pill border/text colors (`var(--register-eyebrow)` / `var(--register-text)`) are already designed to read on the dark `carnival-poster` background — proven by the existing `uc7`/`uc8` MAS_CAMPS section.

## Edits

All 8 UC files share the same template change. The script block (import, `PRIMITIVE_NOTES`, `primitivesInPlay`) stays exactly as applied in the previous plan.

### Per-UC page (8 files)

`voyager/src/routes/use-cases/uc{N}/+page.svelte`

**Template** — replace this block:

```svelte
<section class="mx-auto max-w-6xl px-6 pb-16">
	<div class="rounded-[28px] p-8" style="background-color: var(--register-card);">
		<MasCampByline register="carnival-poster" eyebrow="Primitives in play" camps={primitivesInPlay} />
	</div>
</section>
```

with this:

```svelte
<section class="mx-auto max-w-6xl px-6 pb-16">
	<MasCampByline register="carnival-poster" eyebrow="Primitives in play" camps={primitivesInPlay} />
</section>
```

The outer `<section>` keeps `px-6 pb-16` (matches the section above it — the "The problem / How Voyager fits" grid). The inner `<div>` card is gone.

For `uc7` and `uc8`, the existing separate "Mas camps & kaiso tents" `<section>` (lines 56–58 / 56–58) is **untouched** — it was already standalone and is the visual reference for this change.

## Files affected

```
voyager/src/routes/use-cases/uc1/+page.svelte   EDIT (remove inner card div)
voyager/src/routes/use-cases/uc2/+page.svelte   EDIT (remove inner card div)
voyager/src/routes/use-cases/uc3/+page.svelte   EDIT (remove inner card div)
voyager/src/routes/use-cases/uc4/+page.svelte   EDIT (remove inner card div)
voyager/src/routes/use-cases/uc5/+page.svelte   EDIT (remove inner card div)
voyager/src/routes/use-cases/uc6/+page.svelte   EDIT (remove inner card div)
voyager/src/routes/use-cases/uc7/+page.svelte   EDIT (remove inner card div; MAS_CAMPS section already standalone — untouched)
voyager/src/routes/use-cases/uc8/+page.svelte   EDIT (remove inner card div; MAS_CAMPS section already standalone — untouched)
```

No other files. Script blocks, data files, component, and `/use-cases` home are untouched.

## Out of scope

- Restyling `<MasCampByline>` (eyebrow color, pill border weight, etc.).
- Changing the sibling "The problem / How Voyager fits" card grid (still uses `rounded-[28px] p-8` cards — those are separate content blocks, not a primitive list).
- Changing the final "Next" `rounded-[32px]` card.
- Removing the `<section>` outer wrapper entirely (keep `px-6 pb-16` for vertical rhythm with adjacent sections).

## Validation

- `pnpm run build` from `/workspaces/voyager/voyager` — clean build.
- `rg -n "rounded-\[28px\] p-8" voyager/src/routes/use-cases/uc{1,2,3,4,5,6,7,8}` for lines containing `eyebrow="Primitives in play"` — should return **0 matches** (card wrapper gone).
- `rg -n "Primitives in play" voyager/src/routes/use-cases/uc{1,2,3,4,5,6,7,8}` — still returns **8 matches** (eyebrow text preserved as the component's `eyebrow` prop).
- `rg -n "MasCampByline register=\"carnival-poster\" eyebrow=\"Primitives in play\"" voyager/src/routes/use-cases/uc{1,2,3,4,5,6,7,8}` — should return **8 matches** (component call preserved, no longer wrapped).
- Visual: open each `/use-cases/uc{N}` page and confirm the pills in the "Primitives in play" section now render directly on the dark `carnival-poster` background (border + text legible), matching the standalone look of "Mas camps & kaiso tents" on `uc7`/`uc8`.

## Risks

- **Pill legibility on dark background**: pill border uses `var(--register-eyebrow)` and text uses `var(--register-text)` — both defined by `RegisterSection register="carnival-poster"` and already proven visible in the `uc7`/`uc8` MAS_CAMPS section. Risk is low; visually verify.
- **Vertical rhythm**: removing the card removes `p-8` (32px) top + bottom padding from the inner content. The `<MasCampByline>` has its own internal `gap: 14px` between eyebrow and pills, so the section now feels tighter. If it feels too tight against the next "Next" card section, consider increasing `pb-16` → `pb-20` or adding a top margin — but match what the existing `uc7`/`uc8` MAS_CAMPS section does (`pb-12`) before deciding. Default: keep `pb-16`.