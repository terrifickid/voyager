# Plan: Rewrite "How it works" section on the Voyager home page

## Goal

Replace the current copy in the "How it works" section of `voyager/src/routes/+page.svelte` (lines 54–81) with sharper, vision-true copy that reflects the spec in `vp.md` and the brand voice already established on the rest of the page. Keep the same 3-step spine and the same layout — change only the words.

## Scope

- **In scope:** the `eyebrow`, `title`, `lede`, the three step titles, the three step bodies, and the trailing CTA in the section whose id is `how` in `voyager/src/routes/+page.svelte:54-81`.
- **Out of scope:** layout changes, new components, new routes, changes to `/plan` or `/pay` flows, changes to other sections of the home page, changes to the `Footer.svelte` link target (it already points at `/` which is fine).
- **Out of scope:** rewriting the "Voyager Pay" band further down the page (`+page.svelte:175-196`). That section already uses correct vision-true framing ("Voyager Pay runs the booking as an open market. Independent vendors compete for your trip on price and quality…"). The "How it works" step 3 will echo it, not duplicate it.

## Decisions (resolved with user)

1. **Copy honesty level: Vision-true, spec-faithful.** Step 3 keeps the open-market framing from `vp.md` ("EROI defense", `vp.md:357-365`) — independent vendors compete on price and quality, no platform-paid ranking. This matches the wording already used in the Voyager Pay band directly below it.
2. **Step framing: Keep 3 steps, sharpen copy.** Spine stays `preferences → draft → book`. Only titles, lede, and bodies change.
3. **Visual change: None.** Same `rounded-[32px] bg-bone-100` panel, same `<ol>` of three numbered cards, same trailing CTA.

## Constraints from existing code / brand voice

- Voice is short, direct, often sentence-fragment titles ("Plan it. Pay it. Take the trip.", `+page.svelte:34-36`). The new titles should match that rhythm.
- Per `Documentation/rubricsmore.md` (Perk visual-design rubric): warm neutral ground, one acid accent, monumental sans display, no chevron-scroll-hints, no illustration. Plain English.
- Per `Documentation/lesson.md` and `coms.md`: observable claims, no vague abstractions, <20-word sentences where possible, active voice.
- The Voyager Pay band two sections down is the source of truth for the "open market" claim (`+page.svelte:180-185`). Step 3 must not contradict it.

## Affected file

- `voyager/src/routes/+page.svelte` — section beginning at `<!-- 3. How it works -->` (line 54) through the closing `</section>` (line 81). Only the strings inside the `<SectionHeader>` props and the three entries in the `{#each ...}` array change. The wrapping markup, the `<ol>`/`<li>` structure, the classes, and the trailing `<Cta>` stay exactly as they are.

## Copy direction (final wording to land)

- **Eyebrow:** `"How it works"` (unchanged).
- **Title:** `"Three steps. The booking comes last."`
  - Drops the old "A trip you can actually take." which is a vibe line, not a section promise. The new title mirrors the hero's cadence (short fragments, period-delimited) and previews the ordering argument.
- **Lede:** `"Plan in your browser. Pay on an open market. The safest part is the part that touches your money."`
  - Mirrors the hero's two-sentence structure ("Tell Voyager where you're going…" / "Ready to book? Voyager Pay handles the money…", `+page.svelte:37-42`). One line for the planner, one line for the booking — and a third line that earns the "comes last" promise in the title.

- **Step 1 — title:** `"Answer seven prompts."`
  - Replaces "Tell it how you travel", which was vague about what the user actually does. "Seven prompts" is concrete and matches the wizard (`PlanTripWizard.svelte:93-101`: destination, dates, travelers, archetype, tags, budget, note = 7).
- **Step 1 — body:** `"Destination, dates, who's coming, how you like to move, what you skip. Voyager turns it into a rubric your planner and your bank can both read."`
  - "Rubric" is the spec term (`vp.md:278-281`, `Documentation/thingrubric.md`) and makes the preference set feel load-bearing rather than decorative. The closing clause ("your planner and your bank can both read") plants the seed that the same profile drives both halves of the product.

- **Step 2 — title:** `"Get a draft from real places."`
  - Kept (it was already the strongest of the three).
- **Step 2 — body:** `"A model on your device drafts a day-by-day plan. A local places index ranks real candidates against each block, so nothing on the page is invented — only the order is."`
  - Tightens the old body. The split ("nothing on the page is invented — only the order is") makes the model-vs-fixture story honest without breaking the spec framing. Phrasing "on your device" matches the hero's "right in your browser" (`+page.svelte:38`).

- **Step 3 — title:** `"Vendors compete. You pay the winner."`
  - Replaces "Book it on an open market", which leaked jargon. The new title is two clauses in active voice and sets up the body's mechanism.
- **Step 3 — body:** `"Independent operators — hotels, hosts, tours — bid for each booking on price and quality. Nobody pays the platform to rank higher, so the slot goes to whoever actually earned it. Voyager Pay settles the winner."`
  - This is the vision-true version of the old "vendors bid…so the best vendors win." It names the operator types (hotels, hosts, tours) so the user can picture the scene, keeps the "no paid ranking" mechanism from the spec, and ends with the Voyager Pay handoff so the reader knows where to click next. Wording intentionally echoes the Voyager Pay band two sections down (`+page.svelte:184`) so the two blocks read as one argument.

- **Trailing CTA:** unchanged. `<Cta variant="secondary" href="/plan">Try it now</Cta>` stays.

## Implementation steps (ordered)

1. Open `voyager/src/routes/+page.svelte`.
2. Replace the `SectionHeader` props at lines 57–61 with the new eyebrow / title / lede strings above.
3. Replace the three entries in the `{#each [...]}` array at lines 63–67 with the new `{ n, t, b }` objects. Field order and shape stay identical.
4. Do not touch anything else in the file.
5. Visually re-check that the section still renders inside the existing `rounded-[32px] bg-bone-100` panel and that the trailing CTA still reads.

## Validation

- Run `npm run dev` from `voyager/` and open `/`. Confirm the "How it works" section renders with the new copy, no layout shift, and the three numbered cards still stack vertically with the trailing "Try it now" CTA.
- Run `npm run lint` and `npm run check` (or whatever the repo's lint/typecheck script is — confirm by reading `voyager/package.json`) before finishing. If no lint script exists, note that explicitly and skip rather than inventing one.
- Read the new section aloud next to the hero (`+page.svelte:30-52`) and the Voyager Pay band (`+page.svelte:175-196`). The three blocks should feel like one continuous argument, not three separate pitches.
- Confirm the new step-3 body does not contradict the Voyager Pay band wording two sections below. They should reinforce each other.

## Risks and mitigations

- **Risk:** "Bid" is aspirational — the current `/pay` UI ranks Mostro ramp quotes deterministically (`voyager/src/lib/ramp/rankQuotes.js:62-68`), it does not yet run a vendor-bidding flow. **Mitigation:** the user explicitly chose vision-true / spec-faithful copy, so this is acceptable. The Voyager Pay band already uses the same "compete" language (`+page.svelte:184`), so the home page is internally consistent. No code change required.
- **Risk:** "Seven prompts" becomes wrong if the wizard gains or drops a step. **Mitigation:** the count is currently accurate (`PlanTripWizard.svelte:93-101`). If the wizard changes, this copy needs to change with it — flag in the PR description.
- **Risk:** "Rubric" is jargon for some readers. **Mitigation:** it's used once, in the body (not the title), and is immediately clarified by "your planner and your bank can both read." Acceptable per the brand voice rules in `coms.md` (defined jargon is fine).
- **Risk:** Drift between step 3 and the Voyager Pay band if either is edited later. **Mitigation:** both blocks now share the exact phrase "no one pays the platform to rank higher." A future edit to one should be checked against the other.

## Open questions

None. Direction, copy, and layout are resolved. Ready to implement.
