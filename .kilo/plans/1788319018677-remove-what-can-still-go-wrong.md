# Remove `/docs/what-can-still-go-wrong`

## Context

The user wants the "What can still go wrong" lesson removed entirely from the docs section. There is no replacement page and no redirect — the lesson simply ceases to exist.

The page sits between Lesson 7 (`/docs/voyager-pay-eroi-audit`) and Lesson 9 (`/docs/how-voyager-pay-extends`) in the reading order. The current Lesson 7 "Next up" card points at it, so removing the page without also retargeting that card leaves a broken link.

The page number in the overview card grid is "Inserted after Lesson 7" (not part of the 1–9 numbering). No other lesson numbers reference it, so nothing renumbers.

## Goal

Remove `/docs/what-can-still-go-wrong` and every reference to it. The Lesson 7 next-up card should advance directly to Lesson 9 (`/docs/how-voyager-pay-extends`). No 301 redirect.

## Affected files

1. `voyager/src/routes/docs/what-can-still-go-wrong/+page.svelte` — delete the file and its containing directory.
2. `voyager/src/routes/docs/+layout.svelte` — drop the entry from the `lessons` array. The `sections` grouping still works because `lessons.slice(4)` is index-based; after removing one item the slice just shifts one position earlier (slice(4) now returns 7 items: original 5–10).
3. `voyager/src/routes/docs/+page.svelte` — delete the audience card at lines 99–106 (`href="/docs/what-can-still-go-wrong"`).
4. `voyager/src/routes/docs/voyager-pay-eroi-audit/+page.svelte` — retarget the Lesson 7 next-up card from `/docs/what-can-still-go-wrong` to `/docs/how-voyager-pay-extends`, and update the copy on lines 126–137 to drop the "what is still risky anyway" framing.

## Decisions

### 1. Lesson 7 next-up card rewrite

The current copy is:

> Next up — What can still go wrong — Fiat reversal, sybil reputation, relay capture, operator rug — the honest limits. → `/docs/what-can-still-go-wrong`

Replace with:

> Next up — How Voyager Pay extends — A substrate, a tag prefix, and a convention document — any vendor kind can ship. → `/docs/how-voyager-pay-extends`

The supporting paragraph (line 126–128) currently says "Hard to capture does not mean nothing can go wrong. The next lesson is where this matters most: what is still risky anyway." Change it to a positive bridge to Lesson 9 — for example: "Hard to capture is the floor, not the ceiling. The next lesson shows how the protocol stays open without amending itself."

### 2. Nav `lessons` array

Remove the `what-can-still-go-wrong` object literal (currently line 19). `sections` stays as-is:

```js
const sections = [
  { label: 'Overview', items: [lessons[0]] },
  { label: 'The trip planner', items: [lessons[1]] },
  { label: 'Rubrics & generation', items: [lessons[2], lessons[3]] },
  { label: 'Voyager Pay & EROI', items: lessons.slice(4) }
];
```

After the removal, `lessons.slice(4)` yields 7 items: original lessons 5–9 plus the price-discovery insert. The "Voyager Pay & EROI" section header stays accurate.

### 3. Overview page card

Delete the `<a href="/docs/what-can-still-go-wrong">` block at lines 99–106. Do not renumber or relabel the surviving Lesson 9 card — the user said to remove, not to renumber, and renumbering would invalidate any external links.

### 4. No redirect

Per the plan, the page is gone — `/docs/what-can-still-go-wrong` will return SvelteKit's default 404. No `+page.server.js` redirect, no static `_redirects` entry.

## Out of scope

- Renumbering Lesson 9 down to 8 (would change the URL semantics; not requested).
- Editing other plans in `.kilo/plans/` that mention the lesson — those are historical records.
- Touching the residual-risks prose that lives in `routes/pay/+page.svelte` §12. The page being removed is the docs-section treatment of those risks; the pay landing copy is independent.

## Validation

1. `cd voyager && npx svelte-check --tsconfig ./jsconfig.json` — no new errors or warnings.
2. `grep -r "what-can-still-go-wrong" voyager/src` — returns zero matches.
3. `ls voyager/src/routes/docs/what-can-still-go-wrong/` — directory absent.
4. Manual click-through at `/docs`:
   - Overview shows 10 cards (was 11), in the same three audience groupings; "For the protocol-curious" group now has 6 cards (Lesson 4, 5, 6, 7, inserted-after-8, 9).
   - Sidebar shows 10 nav items in 4 sections; "Voyager Pay & EROI" section has 7 items.
   - Lesson 7 next-up card → `/docs/how-voyager-pay-extends` (Lesson 9).
   - Direct navigation to `/docs/what-can-still-go-wrong` → 404.
