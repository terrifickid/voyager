# Plan: Rewrite "How it works" — plain, salesy, zero jargon (v2)

## Goal

Replace the copy currently in `voyager/src/routes/+page.svelte:54-81` with simple, salesy language that matches how a human actually describes the product out loud. No jargon. No "rubric". No "settlement". No "open market". No "model on your device". No em-dash flourishes. Three short steps. Get the gist across in two seconds.

User's own phrasing (verbatim, from the follow-up message):

> ok - its' just a 3 step proceess. You tell us your trip info, we come up with the itenerary with ai, and then we can use voyager pay to ensure security and a good experience. it's that fucking simple.

That sentence is the brief. The new copy is a polite version of it.

## Decisions (resolved)

1. **Voice:** plain, friendly, slightly punchy. Reads like a friend explaining the product at a bar, not like a spec sheet.
2. **Steps stay at 3.** Titles become plain imperatives. Bodies are one short sentence each.
3. **No technical vocabulary.** Words explicitly banned: rubric, settlement, open market, on your device, day-by-day, index, compete, rank, vendor, operator, bidder. Use everyday words instead.
4. **Drop the "comes last" framing from the previous version.** It was clever; the user found it robotic. The order speaks for itself.
5. **Visual/layout:** unchanged. Same panel, same `<ol>`, same three cards, same trailing `<Cta variant="secondary" href="/plan">Try it now</Cta>`.

## Final copy (the only strings that change)

- **Eyebrow:** `"How it works"` (unchanged).
- **Title:** `"Three steps. That's it."`
- **Lede:** `"Tell us about your trip. We'll build the plan. Then book it safely with Voyager Pay."`

- **Step 1 — title:** `"Tell us about your trip."`
- **Step 1 — body:** `"Where you're going, when, and who's coming. A few quick questions and you're done."`

- **Step 2 — title:** `"We build your itinerary."`
- **Step 2 — body:** `"Our AI puts together a day-by-day plan using real places. Tweak anything you want."`

- **Step 3 — title:** `"Book it safely with Voyager Pay."`
- **Step 3 — body:** `"Pay through Voyager Pay and you're protected the whole way through. Good price, good experience, no surprises."`

- **Trailing CTA:** unchanged.

## Affected file

- `voyager/src/routes/+page.svelte` — only the strings inside the `<SectionHeader>` props (lines 57–61) and the three entries in the `{#each [...]}` array (lines 63–67) change. Wrapping markup, classes, `<ol>`/`<li>`, and the trailing `<Cta>` stay exactly as they are.

## Implementation steps (ordered)

1. Open `voyager/src/routes/+page.svelte`.
2. Replace the three `<SectionHeader>` prop values at lines 57–61 with the new eyebrow / title / lede strings above.
3. Replace the three `{ n, t, b }` entries in the array at lines 63–67 with the new objects. Field order and shape stay identical.
4. Do not touch anything else in the file.
5. Visually re-check that the section still renders inside the existing `rounded-[32px] bg-bone-100` panel and the trailing "Try it now" CTA still reads.

## Validation

- `npm run dev` from `voyager/`, scroll to `#how`, confirm new copy reads cleanly with no layout shift.
- `voyager/package.json` has no `lint` or `check` script (only `dev`, `build`, `preview`, `prepare`). Note this and skip rather than inventing one.
- Read the new section out loud. If any sentence sounds like marketing copy or a spec doc, rewrite it.

## Risks and mitigations

- **Risk:** "Seven prompts" was specific and now disappears; step 1 becomes vaguer. **Mitigation:** the user explicitly asked for simplicity over specificity. "Where, when, who's coming" is enough.
- **Risk:** The Voyager Pay band further down (`+page.svelte:175-196`) still uses open-market language ("compete for your trip", "no one pays to be ranked higher"). **Mitigation:** the user asked specifically to remove that language from the "How it works" section. Out of scope for this PR per the user's instruction ("no technical jargon or bullshit about settlement, or fuck all"). If desired, the Voyager Pay band can be simplified in a follow-up — flag this in the PR description but do not touch it here.

## Open questions

None. Ready to implement.
