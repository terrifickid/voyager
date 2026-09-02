# Drop the hero + two-pillar lead-in from /pay/security

## Context

`/pay/security` currently opens with two sections before the "Foundation" block:

- **Hero** (lines 11-26): the "Secure by design." H1, the lede paragraph about "two structural pillars", and two CTAs (`/pay` and `/pay/pricing`).
- **Two-pillar headline** (lines 28-48): two cards naming the pillars ("No custody" / "Federated marketplace").

The user wants Foundation to be the first thing on the page. Both sections above it get removed. Foundation (currently line 50 onwards, "Money on Bitcoin. Messages on Nostr. No one in the middle.") stays put and becomes the new opening section.

## Why this is safe

Inbound navigation to `/pay/security` from `/pay`, `/pay/node`, and the footer all link to the page itself, not to anchors inside it. Removing the two top sections does not break any inbound link or anchor.

Outbound links inside the two removed sections:

- Hero CTA `href="/pay"` → also linked from elsewhere, no information loss.
- Hero CTA `href="/pay/pricing"` → also linked from the honest-limits CTA further down the same page, still reachable.
- Foundation lede already states the same two-pillar framing (`"three open networks stitched together"`) implicitly, and the Outcomes section that follows restates the no-custody and federation ideas explicitly, so the user is not losing the principle — just losing the lead-in.

## Edits

Single file: `voyager/src/routes/pay/security/+page.svelte`.

Delete lines 11 through 48 inclusive — both `<section>` blocks (Hero and Two-pillar headline) plus their blank-line separators. Leave the blank line that already precedes the Foundation section (the existing line 49 separator) so the Foundation block sits flush against the top of `<main>` content with its current `pt-20 pb-12 lg:pt-28 lg:pb-16` not-applicable — instead the Foundation section keeps its existing `pb-20` only and gains a `pt-20 lg:pt-28` so the page does not open with content pinned to the viewport top.

Concretely:

1. Delete lines 11-48 (the `<!-- Hero -->` section + blank line + `<!-- Two-pillar headline -->` section + the blank line that separates them from Foundation).
2. On the surviving Foundation section (currently line 51), add top padding so it is not flush against the viewport top: change the opening tag from
   `<section class="mx-auto max-w-6xl px-6 pb-20">`
   to
   `<section class="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28">`.
3. Leave the `<svelte:head><title>Security by design — Voyager Pay</title></svelte:head>` (lines 7-9) untouched — browser tab title stays the same.
4. Leave the `<!-- Foundation -->` comment in place; rename the comment text from `<!-- What it's built on -->` to `<!-- §1 Foundation -->` so it reads as the page's opening section. (Optional polish; safe to skip if prefer minimal change.)

Nothing else in the file changes. Lines 50 onward stay verbatim.

## Risks

- **Foundation opens with a `<span class="eyebrow">Foundation</span>` chip**, which is the first thing the user sees. If that feels like missing context, an alternative is to promote the Foundation section's `title` to an H1. Recommended: leave it as is — the eyebrow reads as a section chip, not as page chrome, and the `<svelte:head>` title still names the page.
- **The "two structural pillars" framing was in the hero lede only.** Foundation does not restate the pillar names verbatim — it explains Bitcoin/Lightning/Nostr and then lists Dispersion/Opacity/Binding. The Outcomes cards further down restate "no custody" and "federated marketplace" as outcomes ("Your money stays yours", "You pick your own platform"). Net effect on the page: the pillars show up later as outcomes, not up front as a lead-in. This matches the user's intent.

## Validation

1. `grep -n '<!-- Hero\|<!-- Two-pillar\|<!-- Foundation' voyager/src/routes/pay/security/+page.svelte` returns 1 line (Foundation only).
2. Read the file top-to-bottom and confirm the first non-script/non-head element is the Foundation section.
3. `cd voyager && npx svelte-check --tsconfig ./jsconfig.json` — same baseline as before this change: 1 pre-existing error in `lib/agent/index.ts:62`, 1 pre-existing warning in `routes/+page.svelte:553`. No new diagnostics.
4. Visual smoke (manual): `npm run dev` (or equivalent), visit `/pay/security`, confirm Foundation is the first section with comfortable top padding, and that nothing above it renders.
