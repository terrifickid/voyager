# Plan: Testimonials strip — more reviews, full-bleed infinite scroll (LTR)

## Goal

Turn the current two-card testimonials grid (`voyager/src/routes/+page.svelte:153-172`) into a full-bleed, left-to-right infinite-scroll marquee of ~8–10 hardcoded reviews. Header copy stays in tone; lede is fixed because "Two travelers" will be a lie. Marquee runs continuously, no pause. Cards keep using the existing `QuoteCard` component — no component changes.

User decisions (resolved):
- Scroll behavior: **seamless infinite loop, no pause** (CSS `@keyframes`, duplicated row).
- Content: **hardcode ~8–10 reviews inline** in `+page.svelte` — no new data file.
- Header: **keep eyebrow + title**, rewrite lede to fit more reviews.
- Layout: **section keeps `max-w-6xl` wrapper; marquee row breaks out to 100vw** via the standard negative-margin trick. Header stays constrained.

## Final copy

- **Eyebrow:** `"From the road"` (unchanged).
- **Title:** `"Trips people actually took."` (unchanged).
- **Lede (new):** `"Real trips from real travelers. Built to fit, not to flex."`

### Reviews (8 entries, inline in `+page.svelte`)

Keep the two existing ones (Lena K., Marcus T.) and add six more. All names/roles illustrative; written in the same plain, slightly punchy voice as the rest of the page. No em-dash flourishes, no jargon.

1. **Lena K. — Designer, slow traveler** *(existing)*
   "It built a Kyoto plan that respected my hatred of 10am queues. The first café was open at 7."
2. **Marcus T. — Engineer, family trips** *(existing)*
   "I shared the link with my parents, edited the one museum they cared about, and we were off."
3. **Priya R. — Backend engineer, long weekends**
   "Lisbon in three days, no spreadsheet. It picked the tile museum over another rooftop and I trusted it."
4. **Tomás A. — Photographer, off-season**
   "I wanted empty streets in November. It gave me empty streets in November."
5. **Hana O. — Product manager, group trips**
   "Six of us, three food dealbreakers, one ferry. The plan didn't flinch."
6. **Devon S. — Solo, first time in Tokyo**
   "I edited twice. That was the whole trip planning."
7. **Aïcha B. — Founder, workcations**
   "I needed cafe wifi and a quiet block by 6pm. Both made it onto the day."
8. **Felix W. — Dad of two, short drives**
   "It cut the museum list down to one per kid. We did all of them."

## Affected file

- `voyager/src/routes/+page.svelte` — section 6 only (lines 153–172).
  - `<SectionHeader>` props update: lede text only (eyebrow + title untouched).
  - Grid + two `<QuoteCard>`s are **replaced** by a new full-bleed marquee structure (see implementation steps).
  - `QuoteCard` import stays; no other imports change.

No changes to `QuoteCard.svelte`, `SectionHeader.svelte`, `Cta.svelte`, or any other component. No new files.

## Implementation steps (ordered)

1. Open `voyager/src/routes/+page.svelte`.
2. In the existing `<SectionHeader>` at line 155–159, change only the `lede` prop to `"Real trips from real travelers. Built to fit, not to flex."`. Leave `eyebrow` and `title` exactly as they are.
3. Replace the entire `<div class="mt-12 grid …">…</div>` block at lines 160–171 with the new full-bleed marquee markup below. Keep the `<!-- 6. Testimonials -->` comment and the outer `<section class="mx-auto max-w-6xl px-6 pb-24">` wrapper byte-identical.
4. Add a small `<style>` block at the end of the file (Svelte allows a single `<style>` per component — verify there isn't already one; if there is, extend it) with three rules: `.marquee`, `.marquee__track`, and `@keyframes marquee-ltr`. Use `prefers-reduced-motion` to disable the animation (see Motion section).
5. Do not touch anything else in the file. Sections 5, 7, 8, 9 stay byte-identical.

### New markup (replaces lines 160–171)

```svelte
<div class="mt-12 -mx-6 sm:-mx-10 overflow-hidden">
	<div class="marquee">
		<div class="marquee__track" aria-label="What travelers said">
			<!-- set A -->
			{#each REVIEWS as r}
				<div class="marquee__item">
					<QuoteCard quote={r.quote} attribution={r.attribution} role={r.role} />
				</div>
			{/each}
			<!-- set B (duplicate for seamless loop) -->
			{#each REVIEWS as r}
				<div class="marquee__item">
					<QuoteCard quote={r.quote} attribution={r.attribution} role={r.role} />
				</div>
			{/each}
		</div>
	</div>
</div>
```

The `-mx-6 sm:-mx-10` pulls the strip past the section's `px-6` gutter so cards run edge-to-edge on every breakpoint (Tailwind's `px-6` = 24px = `px-6`, `p-10` on inner panels of other sections uses 40px — match with `sm:-mx-10`). The `overflow-hidden` on the outer div clips the row. Inner `marquee` uses `display:flex` + `width:max-content` so it can exceed the viewport.

Define `REVIEWS` in the `<script>` block at the top of the file (currently lines 1–9) as a `const` array of `{ quote, attribution, role }` objects — same shape `QuoteCard` already accepts. Keep it inline, no new module.

### Styles (single `<style>` block, scoped)

```css
.marquee {
	display: flex;
	width: max-content;
}
.marquee__track {
	display: flex;
	gap: 1.5rem; /* gap-6 */
	padding-inline: 0.75rem; /* half of gap, so edges don't kiss the viewport */
	animation: marquee-ltr 60s linear infinite;
	will-change: transform;
}
.marquee__item {
	flex: 0 0 auto;
	width: 360px; /* readable card width on desktop; CSS clamp if needed */
}
@media (min-width: 768px) {
	.marquee__item { width: 420px; }
}
@media (prefers-reduced-motion: reduce) {
	.marquee__track { animation: none; transform: none; }
}
@keyframes marquee-ltr {
	from { transform: translateX(0); }
	to { transform: translateX(-50%); }
}
```

`translateX(-50%)` works because the track contains **exactly two copies** of the review set — when the first copy scrolls fully off-screen left, the second copy is in the identical starting position, and the loop is invisible. This is the standard seamless marquee trick; no JS needed.

## Motion + accessibility

- **Speed:** `60s` for a full cycle of two sets. Feels calm, not frantic. Tunable.
- **Direction:** left-to-right (`marquee-ltr`). User explicit ask. Track translates from `0` to `-50%`.
- **No pause on hover** per user choice. Acceptable trade-off; content stays legible because cards are large and the rate is slow.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables the keyframes and resets `transform`. Cards still display in a row inside the strip (overflow stays clipped by the outer div), so the section still works without motion.
- **Screen readers:** the `aria-label="What travelers said"` on `.marquee__track` describes the strip. Screen readers will still announce each duplicated card — that's an acceptable cost for the no-JS pure-CSS approach. If the user later wants SR dedupe, that's a follow-up (add `aria-hidden="true"` to set B).

## Validation

- `npm run dev` from `voyager/`, scroll to the testimonials section.
  - Strip runs edge-to-edge on both viewports (375px and ≥1280px).
  - Cards move continuously left-to-right; loop seam is invisible (no jump).
  - Hovering, tabbing into, or focusing a card does **not** pause motion (per choice).
  - With OS reduced-motion enabled, strip is static; no horizontal scrollbar appears.
- `voyager/package.json` has no `lint` or `check` script (only `dev`, `build`, `preview`, `prepare`). Skip.
- Verify the lede reads correctly and "Two travelers" is gone.

## Risks and mitigations

- **Risk:** Track width depends on duplicated content — if someone later edits `REVIEWS` to an odd count or removes one set, the `-50%` loop breaks visibly.
  **Mitigation:** leave a one-line comment above set B (`<!-- must be identical to set A for seamless loop -->`); both `{#each REVIEWS}` blocks share the same source so they can't drift.
- **Risk:** `QuoteCard` has internal `rounded-[28px] bg-bone-200` — fine inside a full-bleed strip, but if the strip background ever needs to match the section background, swap the card surface or add `bg-bone-100` to `.marquee`.
- **Risk:** Duplicated cards are read twice by screen readers.
  **Mitigation:** acceptable for this PR per the no-JS constraint; flagged above for follow-up if needed.
- **Risk:** `overflow-hidden` on the outer `-mx-*` div could clip a focus ring on the last card.
  **Mitigation:** cards use `rounded-[28px]` (no full-bleed focus ring needed); `QuoteCard` does not add an interactive focus. Acceptable.

## Open questions

None. Ready to implement.
