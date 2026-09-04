# Plan — Home hero + site-wide AI framing

## Goal

Lead with the AI angle on the home hero — the toolkit now ships an in-browser AI agent in the SDK — and add a short, consistent AI mention to a handful of pages where it belongs. Don't over-saturate. AI is one of the things the toolkit ships, not a rebrand.

User-confirmed scope:
- Hero h1 → "An open AI toolkit for building Caribbean-first apps." (eyebrow unchanged).
- Touch: home SDK band, `/stack`, `/build`, `/docs` landing.
- Do NOT touch: home ribbon, site-wide `<svelte:head>` title pattern, Header/Footer.

## Decisions

1. **What "AI toolkit" means here**: the SDK ships an in-browser AI agent (see `/projects/ai`). The agent augments every primitive and never calls a remote model. This framing is what the AI-in-the-SDK copies will keep consistent across pages.
2. **Wording style**: short, declarative, no marketing. Match the existing register ("Five primitives, one SDK" rhythm). One-line additions, never paragraphs.
3. **Where AI mentions stop**: pages that already center AI (`/projects/ai`, `/projects/voyager-pay` AI-assist injection, the trip-planner How-Voyager-plans doc) are untouched — the AI story is already there.
4. **No new routes / no new components.** Pure copy edits to four route files.

## Edits

### 1. `voyager/src/routes/+page.svelte` — home

**Hero (lines 53–67).**
- h1: `"An open toolkit for building Caribbean-first apps."` → `"An open AI toolkit for building Caribbean-first apps."`
- Hero lede (line 60): append `"The SDK ships an in-browser AI agent that runs across all five primitives — never a remote model."` to the end of the existing paragraph. Keep the existing sentence intact; this is one added sentence.

**SDK band (lines 190–219, "Stripe-shaped surface, Nostr underneath").**
- h2: `"Stripe-shaped surface, Nostr underneath."` → `"Stripe-shaped surface, Nostr underneath. AI inside the SDK."`
- Lede (line 198): `"A handful of well-named calls. The SDK hides the keys, the wire format, and the relay fan-out."` → `"A handful of well-named calls — and an in-browser AI agent. The SDK hides the keys, the wire format, the relay fan-out, and the model."`
- No changes to the terminal mock block.

**Do not touch**: top ribbon (lines 39–50), primitives strip, built-on-Voyager cards, Voyager Pay band, use-cases strip, network stats band, docs band, final CTA, CarnivalRibbon.

### 2. `voyager/src/routes/stack/+page.svelte`

**SDK card (lines 40–48, the `<PrimitiveCard id="sdk" .../>`).**
- `title`: `"One Stripe-shaped call surface."` → `"One Stripe-shaped call surface. AI inside."`
- `body`: append `" The in-browser AI agent lives across all five primitives — search relays, parse payments, sign listings — never a remote model."` to the existing body string.

**TricolorPanel "One SDK" item (lines 62–65).**
- `body`: `"A single TypeScript entry. Stripe-shaped surface. The five primitives behind one import — no platform in the middle."` → `"A single TypeScript entry. Stripe-shaped surface. Five primitives, one in-browser AI agent — no platform in the middle."`

**Do not touch**: hero, primitives grid (other than the SDK card above), other TricolorPanel items, the closing "Pick the primitive" CTA.

### 3. `voyager/src/routes/build/+page.svelte`

**SDK get-started lede (line 38).**
- `"A Stripe-shaped surface, Nostr underneath. The SDK hides the keys, the wire format, and the relay fan-out."` → `"A Stripe-shaped surface, Nostr underneath. The SDK hides the keys, the wire format, the relay fan-out — and an in-browser AI agent that runs across all five primitives."`

**"What you get" bullet list (lines 59–64).**
- Add a final bullet: `<li>An in-browser AI agent that augments every primitive. Never a remote model.</li>`

**Do not touch**: hero, terminal mock, "Stripe-shaped surface / Five primitives, ten calls" panels, economics, regulatory posture, alpha CTA, HeritageLineage.

### 4. `voyager/src/routes/docs/+page.svelte`

Add a small fourth audience path between "For the curious" and "For the protocol-curious" (after line 60). Keep the existing audience paths intact.

- Eyebrow: `"For AI-curious builders"`.
- h2: `"How the in-browser AI agent fits."`
- Single card (link):
  - href: `/projects/ai`
  - eyebrow: `"Showcase"`
  - title: `"Voyager AI — One agent across the five primitives"`
  - body: `"A walkable view of the in-browser agent: intent parsing for Voyager Pay, search/write/embed for Nostr, and the data boundary at every primitive."`

Rationale: there's no `/docs/voyager-ai-architecture` route yet (note: the existing CTA on `/projects/ai` already points to it — that's a separate stale-link issue, out of scope here). Linking to `/projects/ai` is the only live AI destination.

**Do not touch**: hero/overview, "For builders shipping the showcase apps" path, "For the curious" rubric paths, "For the protocol-curious" path, "Read in order" link.

## Files affected

```
voyager/src/routes/+page.svelte                 EDIT (hero h1, hero lede, SDK band h2 + lede)
voyager/src/routes/stack/+page.svelte           EDIT (SDK card title + body, TricolorPanel "One SDK" body)
voyager/src/routes/build/+page.svelte           EDIT (SDK lede, "What you get" bullet)
voyager/src/routes/docs/+page.svelte            EDIT (add "For AI-curious builders" path with link to /projects/ai)
```

## Files explicitly NOT affected

- `+layout.svelte`, `Header.svelte`, `Footer.svelte`, `Breadcrumbs.svelte` — no chrome changes.
- Home ribbon, primitives strip, project showcase cards, Voyager Pay built-in band, use-cases strip, network stats band, final CTA, CarnivalRibbon on home — no changes.
- All `/projects/*`, `/use-cases/*`, `/network/*`, `/principles`, individual `/stack/*` primitive pages, all individual `/docs/*` lessons — no changes.
- AI components (`NostrAiAgent*`, `PayAiAssistCard`, `AiTraceStream`, `RelayChip`) — no changes.

## Risks

- **Wording drift**: the new "in-browser AI agent that runs across all five primitives" phrasing is repeated on four pages. Keep it identical so the site reads as one voice. If a future change updates one, update all four.
- **Hero character length**: the new h1 (`"An open AI toolkit for building Caribbean-first apps."`) is one word longer than the old one. At `text-[56px]` it still fits within `max-w-5xl`; at `lg:text-[112px]` it wraps but the existing h1 wraps too. No layout risk.
- **Stale link**: `/projects/ai` already links to a non-existent `/docs/voyager-ai-architecture`. Out of scope here, but worth flagging — the new `/docs` card for AI-curious builders deliberately points at the live `/projects/ai` instead.
- **Tone drift**: the existing site language is "Five primitives, one SDK." Adding "AI" everywhere risks losing that rhythm. The plan keeps additions to one sentence each and keeps the "five primitives, one SDK" line untouched everywhere it exists.

## Validation

- `npm run build` from `/workspaces/voyager/voyager` — clean.
- `rg -n "in-browser AI|AI inside" src/routes` — returns the four edits above and nothing else.
- `rg -n "open toolkit|open AI toolkit" src/routes/+page.svelte src/routes/stack/+page.svelte src/routes/build/+page.svelte src/routes/docs/+page.svelte` — confirms no leftover old phrasing.
- No hardcoded color classes (`bg-(bone|ink)|text-(ink|bone|muted)`) introduced.
