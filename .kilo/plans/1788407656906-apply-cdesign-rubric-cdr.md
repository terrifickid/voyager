# Voyager — Heavy cdesign.json Rubric Application (CDR + C10–C13)

## Goal

Apply the `refactor/cdesign.json` rubric **heavily** to the existing Voyager site so
every page reads as heavily authentic Caribbean web design — not "Caribbean-first
in copy, generic-SaaS in chrome." Each page commits to a single register family
(picked from a closed set) and the page's main color matches its register. Sections
within a page may shift register as long as each section commits to one.

Locked from interview:
- **Scope**: whole site — every route under `voyager/src/routes/**` and the
  shared components / tokens.
- **Criteria applied**: all 9 v2 criteria **plus** the planned-but-not-yet-edited
  C10–C13 (reggae, dancehall, soca, heritage). Treated as guideposts even though
  `refactor/cdesign.json` is not being updated this round.
- **No people/places photos** — real Caribbean photography is out of scope.
  Imagery signals come from SVG patterns, typography, color blocks, ribbons,
  badges, and content (bylines, mas-camp names, Iyaric register).
- **Display voice**: keep Space Grotesk only (no handcraft display). The
  cultural-distinct register signal comes from color discipline + layout +
  content, not from font-mixing.
- **Out of scope (do not touch)**: `refactor/cdesign.json`, `cdesign1.md`,
  the planned C10–C13 rubric-file edits.

## Register vocabulary (closed set, applied per page / per section)

Five registers. Each has a ground color, a text color, and an accent pair. Every
page picks ONE as its primary register; sections may pick another as long as
the shift is deliberate (a SplitPanel boundary, a band-background change, etc.)
and stays inside the section.

| Code | Name | Ground | Text | Accent | Source of voice |
| --- | --- | --- | --- | --- | --- |
| `civic-ocean` | Civic-ocean (COR) | `--bone-50` `#F1EFE9` | `--ink` `#14140F` | lime `#BEE93A` + navy `#10233B` | Current default; visitbarbados |
| `editorial` | Editorial-discipline (EDC) | `--bone-50` `#F1EFE9` | `--ink` `#14140F` | none — pure restraint | bobmarley, beyonce, rihanna |
| `rasta` | Rasta-tilted | `#0F1F0F` (dark forest) | `#F1EFE9` (bone) | red `#E11A22` + gold `#F8C300` + green `#1B7E3D` | C10 — three-color discipline |
| `carnival-poster` | Carnival-poster | `#0A0A0A` (near-black) | `#F1EFE9` | electric cyan `#00E2FF` + soca-gold `#FFC700` + magenta `#FF1B6B` | C11/C12 — Machel register |
| `heritage-sepia` | Heritage sepia | `#1A1208` (vinyl-black) | `#F1EFE9` | sepia `#C99A5C` + burnt-rust `#A0432A` + Iyaric-amber `#E0A23A` | C13 — pre-reggae lineage |

Two rules bind the whole site:
1. **One register per surface.** A page or a section's primary background
   commits to one register family. Splitting a section across two is the
   register-mixing anti-pattern the rubric already flags.
2. **Black-background, high-contrast type** holds across all five (rubric
   C3 invariant: body ≥4.5:1, display ≥3:1, hierarchy by tonal value).

## Color tokens — additions to `voyager/src/lib/styles/tokens.css` and `layout.css`

Add (in `tokens.css` `:root`, mirrored into `@theme` in `layout.css`):

```
--rasta-red: #E11A22;
--rasta-gold: #F8C300;
--rasta-green: #1B7E3D;
--rasta-ground: #0F1F0F;

--carnival-cyan: #00E2FF;
--carnival-gold: #FFC700;
--carnival-magenta: #FF1B6B;
--carnival-ground: #0A0A0A;

--heritage-sepia: #C99A5C;
--heritage-rust: #A0432A;
--heritage-amber: #E0A23A;
--heritage-ground: #1A1208;

--editorial-ground: #F1EFE9;
--editorial-ink: #14140F;
```

Coral/sky/rose pastels already exist; reuse them inside the carnival-poster
register. **Do not remove** `--lime` or `--night-900` — civic-ocean register
keeps them.

## Per-page register assignment

The rubric says ONE register per page (within a surface) — not one register
total. Each page picks a primary; sections may opt into a different one.

| Route | Primary register | Why |
|---|---|---|
| `/` | `editorial` | Bob-Marley-style restraint as the brand's "Caribbean-first declaration." Black/white hero on bone. Loud accent only on a single band (SplitPanel goes rasta or carnival). |
| `/stack` | `civic-ocean` | Builder-trust surface — keep the navy/lime. |
| `/stack/identity`, `/payments`, `/ramp`, `/messaging`, `/discovery` | `civic-ocean` (each) | Same; navy/lime. Optionally one section per page may slip into `editorial` for a "deep dive" band. |
| `/projects` | `carnival-poster` | Showcases — magenta/cyan/gold register fits the "Apps shipped on the toolkit" frame. |
| `/projects/trip-planner`, `/trip-planner/preferences`, `/trip-planner/plan` | `carnival-poster` | Carnival-poster reads "Caribbean" the hardest; carry it through the consumer-facing surface. |
| `/projects/voyager-pay`, `/pricing`, `/node`, `/vendors`, `/security` | `civic-ocean` | Money surfaces stay sober navy/lime. |
| `/use-cases`, `/use-cases/uc1`–`/uc8` | `civic-ocean` | Index + per-case pages, lime accent. |
| `/network` | `civic-ocean` (primary) with one `editorial` band for the federation ethos | Mostro federation is sober. |
| `/build` | `heritage-sepia` | "Ship the first Caribbean app that doesn't need a US bank" is a roots/heritage line; sepia register fits. |
| `/principles` | `rasta` | The platform's principles page — three-color rasta discipline with red/gold/green in fixed ratios. |
| `/docs` + `/docs/**` | `editorial` | Docs are sober; mirror cdesign's editorial register so the rubric doc itself sits inside its own aesthetic. |

Inside each page, **bands** may shift register only at `SplitPanel` boundaries
or at `<section>` boundaries with a full-bleed background change. One shift per
page max; the rest of the page stays in the primary.

## Per-criterion application

This is the rubric's spec translated into per-file changes.

**C1 — Caribbean-cultural anchoring.** Add visible byline: a "Voyager advisory
call" line, "Sep 2 2026 call with Shontelle Layne" where already cited, and
where missing add an eyebrow line naming a real community signal (e.g.
"// caribbean-first · alpha 2026"). Hero gets a Caribbean place-name in
type-led composition. Each route's `<title>` gets a "Caribbean" cue where
appropriate.

**C2 — Disciplined palette within a register family.** Add `data-register`
attribute to each page's `<section>` element so palette is enforce-able and
inspectable. CSS custom properties for `--register-ground`, `--register-text`,
`--register-accent` resolve per `data-register`. **No section spans two
registers.** The existing hero on `/` keeps the editorial discipline.

**C3 — Black-ground, high-contrast type.** Already passes on civic-ocean and
editorial. New registers (`rasta`, `carnival-poster`, `heritage-sepia`) all use
near-black grounds with `#F1EFE9` text — measured contrast is ≥12:1 across
the board. Verify at validation time.

**C4 — Display voice committed (or purposefully absent).** Space Grotesk stays
the only display face. Bangers/handcraft is **explicitly not added** per
interview. The CDR register signal must come from color discipline + layout
discipline + content, not from a display-font mix. Where the rubric would
expect a handcraft display (e.g. C12 carnival-poster discipline), the layout
carries the work: ribbon strips, badge shapes, road-march lists, mas-camp
labels.

**C5 — One job per screen, visible above the fold.** Already passing; no edits.

**C6 — Anti-platform-extraction, transparent commercial surface.** Already
passing; no edits.

**C7 — Imagery rooted in real Caribbean people and practice.** **No people /
places photography** per interview. Site sits at **level 2–3** on this
criterion across the board. Acceptable trade-off — the rubric is honest about
this in the plan. The C7 evidence requirement is partially met by:
- SVG illustrations of carnival-poster geometry, ribbon strips, sound-system
  stacks, mas-camp tent shapes (inline SVG components).
- Bylines naming real Caribbean figures where they appear in copy (Shontelle
  Layne, Mostro operators, the advisory-call participants).
- Verbs / register in copy ("playing mas", "lime", "forward", "big up",
  "pree", "yaad", "chunes", "dutty rock") with no photographic reliance.

**C8 — Semantic accessibility.** Already passing; no edits.

**C9 — Reciprocal vs. extractive commercial posture.** Already passing; no edits.

**C10 — Reggae / Nyabinghi / roots reggae display conventions.** Add a
`<RoadMarchRibbon>` component listing bylined community credits and roots-
heritage artist names where the data warrants (Machel Montano's road-march
wins is the existing example on `/projects/voyager-pay`). Use rasta color
discipline on `/principles` — fixed ratios (red 1fr / gold 1fr / green 1fr
ribbon, or single ground with one accent). Three-color discipline, no rainbow
decay.

**C11 — Dancehall / sound-system culture display conventions.** Carnival-poster
register on `/projects` and `/projects/trip-planner` carries this. Magenta +
cyan + gold discipline; ground = near-black. Add a `<SoundSystemStrip>` on
the federation-relevant pages listing bylined sound-system / Mostro-node
operators as social proof (per rubric C1's "festival laurels" pattern adapted
to the federation metaphor).

**C12 — Soca / calypso / kaiso display conventions.** Carnival-poster register
on `/projects/trip-planner`. Add a `<MasCampByline>` strip naming real mas
camps / kaiso tents where the use-case copy warrants (UC7 venue & performer
matchmaking, UC8 sports/carnival/diaspora coordination). "Playing Mas",
"Kaiso", "Lime", "Bacchanal" in copy where it's natural — register as
language, not decoration.

**C13 — Lover's rock / ska / rocksteady / mento heritage display.** Heritage-
sepia register on `/build` carries this. Add a heritage register line:
"Built on a sequence: mento → ska → rocksteady → reggae" on `/build` or
`/principles`, with explicit lineage not nostalgia. The "Sep 2 advisory call"
is the equivalent: a real event with a real lineage from the prior art.

## Imagery without photography — concrete substitutes

Five reusable SVG components, no raster images, no licensing risk:
- `<CarnivalRibbon>` — three-strip horizontal band (configurable colors).
- `<RoadMarchRibbon>` — vertical winner list with year + name.
- `<MasCampByline>` — pill row of camp / tent / fete names.
- `<SoundSystemStrip>` — name strip with operator bylines.
- `<HeritageLineage>` — arrowed sequence ("mento → ska → rocksteady → reggae").

All five take a `register` prop and pull colors from the page's `data-register`.
None render without a byline prop or a name list, so they can't be used as
decoration.

## Components to add

In `voyager/src/lib/components/`:
- `CarnivalRibbon.svelte`
- `RoadMarchRibbon.svelte`
- `MasCampByline.svelte`
- `SoundSystemStrip.svelte`
- `HeritageLineage.svelte`
- `RegisterSection.svelte` — wrapper that sets `data-register` and resolves
  `--register-ground / --register-text / --register-accent` for its descendants.

## Files to edit

**Tokens & global:**
- `voyager/src/lib/styles/tokens.css` — add 13 new CSS variables.
- `voyager/src/routes/layout.css` — mirror into `@theme`, add
  `[data-register="rasta"]`, `[data-register="carnival-poster"]`,
  `[data-register="heritage-sepia"]`, `[data-register="editorial"]` selectors
  that set the register-specific CSS vars.

**Shared components:**
- `Header.svelte` — keep civic-ocean (so nav is consistent). Maybe add a
  small Caribbean flag-strip ornament in the masthead (a 3-stripe under-line,
  not a literal flag).
- `Footer.svelte` — keep civic-ocean; in the columns swap one eyebrow per
  column to a `data-register="rasta"` accent for visual rhythm. FooterBars
  already acts as a Caribbean cadence closer.
- `Cta.svelte` — keep variants; the `primary` variant stays lime on civic-
  ocean pages, gets register-mapped on others via a `register` prop.
- `SectionHeader.svelte` — accept a `register` prop, change eyebrow color
  per register.

**Per-route register assignment** (see table above). Concretely:
- `/` — wrap `<section>` blocks in `<RegisterSection register="editorial">`
  except one band that uses `rasta` or `carnival-poster`. Hero gets a
  black-on-bone discipline. Add Iyaric / vernacular micro-copy:
  "Forward. / We ship the rails."
- `/principles` — wrap in `rasta`. Add `<MasCampByline>` listing the
  "principles" as mas-camp bylines (as a metaphor). Add a `<HeritageLineage>`
  for the platform's own lineage (advisory call → toolkit).
- `/build` — wrap in `heritage-sepia`. Add `<HeritageLineage>` for the
  mento → ska → rocksteady → reggae sequence, plus a "we ship what we
  build" cadence at the bottom.
- `/projects` and `/projects/trip-planner` — wrap in `carnival-poster`.
  Use `<RoadMarchRibbon>` listing trip-planner milestones.
- `/projects/voyager-pay*` — wrap in `civic-ocean`. Add `<SoundSystemStrip>`
  listing Mostro nodes as "sound systems" of the federation (C11 adaptation).
- `/stack` and `/stack/*` — wrap in `civic-ocean`.
- `/use-cases` and `/use-cases/uc*` — wrap in `civic-ocean`. UC7 and UC8
  get a `<MasCampByline>` insert (carnival coordination).
- `/network` — wrap in `civic-ocean`, with one band `editorial`.
- `/docs` and `/docs/**` — wrap in `editorial`. Sober chrome.
- `/+layout.svelte` — keep as-is.

## Validation

- `npm run build` (in `voyager/`) succeeds clean.
- Each route renders exactly one `<h1>`.
- Each page's primary `<section>` carries `data-register` matching the
  assigned table.
- New `data-register` selectors resolve correctly (verify in browser; manual
  check of a couple pages is sufficient — visual proof in screenshots).
- Run the existing `npm run lint` if present.
- Spot-check one page from each register visually for register discipline.
- Verify weights / JSON-validity constraints are **not relevant** here
  (rubric file is not being edited).

## Out of scope (reaffirmed)

- `refactor/cdesign.json` — do not edit.
- `cdesign1.md` — do not edit.
- The C10–C13 rubric-file addition described in the prior plan — do not edit.
- People/places photography — explicitly skipped per interview.
- Handcraft / Bangers / painted display — explicitly skipped per interview.
- Indo-Caribbean / chutney / Latin-Caribbean fusion — deferred.
- Sub-regional anchoring, vernacular-language register, Caribbean institutional
  anchoring, cultural-practice iconography, religious/spiritual register —
  remain in C1/C2/C7 as the rubric specifies.

## Open questions

- Whether to add `<MasCampByline>` data as inline `[{label, href}]` arrays in
  each route, or as a single `masCamps.json` data file (recommended — single
  source of truth, easy to add to as more use cases surface).
- Whether the `<SoundSystemStrip>` should also double as a real Mostro-node
  list (so it doubles as C1 byline + C11 sound-system heritage) or be a
  separate component. Default: combine — single strip with two columns,
  "sound systems" header for one half, "Mostro nodes" header for the other.
- Whether `/projects/+page.svelte` (the index) should be `carnival-poster`
  (since showcase) or `civic-ocean` (since it's a directory). Default:
  `carnival-poster` — the index is the loudest surface in the projects tree
  and the C11/C12 register should land there first.