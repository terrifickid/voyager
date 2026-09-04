# Plan — Remove "diaspora" references site-wide

## Goal

Delete every occurrence of the word **diaspora** (case-insensitive, all forms) from:
- the live SvelteKit site at `voyager/src/**` (JSON data, Svelte pages, pill labels)
- the root-level content/docs (`blog.md`, `blog-sales.md`, `refactor/voyager.md`, `refactor/cdesign.json`, `cdesign1.md`)

Out of scope: historical `.kilo/plans/*.md` files (3 plan mentions preserved as-is — they're historical records).

**Treatment style:** light rewrite, not pure deletion. Each occurrence is replaced with the smallest grammatical equivalent so the surrounding prose stays readable. User confirmed this scope ("Live site + root content/docs").

## Inventories

36 raw matches were located with `grep -rn "diaspora" /workspaces/voyager` (case-insensitive). After excluding the 3 `.kilo/plans/*.md` historical plan files, **33 edits across 9 files**.

## Edits

### A. Live site (5 files, 8 occurrences)

#### A.1 `voyager/src/lib/data/useCases.json` — UC8 entry

- **L69** `"title": "Sports, carnival, diaspora coordination"` → `"Sports, carnival, cross-border coordination"`
- **L71** `"what": "West Indies cricket plays as one team; carnivals happen across NYC, London, Toronto. Diaspora coordination is the unspoken use case."` → `"West Indies cricket plays as one team; carnivals happen across NYC, London, Toronto. Cross-border coordination is the unspoken use case."`
- **L72** `"how": "Apps on Voyager can coordinate group bookings, ticket sales, and remittances for the diaspora community with the same primitives — no need to integrate 5 payment processors."` → `"...remittances for the regional community with the same primitives — no need to integrate 5 payment processors."`

#### A.2 `voyager/src/routes/+page.svelte` — UC8 home card

- **L116** `title: "Sports, carnival, diaspora coordination"` → `title: "Sports, carnival, cross-border coordination"`

#### A.3 `voyager/src/routes/principles/+page.svelte` — "What changed" line

- **L52** `...concierge operators, SMEs, and diaspora communities.` → `...concierge operators, SMEs, and regional communities.`

#### A.4 `voyager/src/routes/use-cases/uc8/+page.svelte` — MAS_CAMPS pill

- **L24** `{ label: 'Diaspora Hub', note: 'remit · UC8' }` → `{ label: 'Relay Hub', note: 'remit · UC8' }`
  Rationale: keep 4-pill grid balanced, stay inside carnival-fete naming register (`Carnival Yard` / `Bacchanal` / `Relay Hub` / `Sports Stand`). "Relay Hub" plays on the existing relay / Nostr vocabulary on the site and fits the `remit` note.

#### A.5 `voyager/src/routes/build/+page.svelte` — alpha-team blurb

- **L141** `Two Caribbean builder teams TBD — one Jamaica, one Trinidad — selected by what use case they want to ship, not by technical prestige. Diaspora developers welcome.` → `Two Caribbean builder teams TBD — one Jamaica, one Trinidad — selected by what use case they want to ship, not by technical prestige. Remote developers welcome.`

### B. Root content/docs (4 files, 25 occurrences)

#### B.1 `refactor/voyager.md` — 6 occurrences

- **L4** `Audience: builders in the Caribbean + diaspora, app integrators, alpha partners, ourselves` → `Audience: builders in the Caribbean and abroad, app integrators, alpha partners, ourselves`
- **L24** `...and Caribbean diaspora communities` → `...and Caribbean regional communities`
- **L32** `...any developer in the region (or in the diaspora)...` → `...any developer in the region (wherever they are based)...`
- **L61** heading `UC8 — Sports, carnival, and diaspora coordination` → `UC8 — Sports, carnival, and cross-border coordination`
- **L62** `...remittances for the diaspora community with the same primitives` → `...remittances for regional communities with the same primitives`
- **L170** `3. Diaspora developers with Caribbean heritage — distributed globally, often locked out of "US-only" platforms themselves. They become the bridge users.` → `3. Caribbean-heritage developers based anywhere — distributed globally, often locked out of "US-only" platforms themselves. They become the bridge users.`

#### B.2 `refactor/cdesign.json` — 11 occurrences

This is the cultural-design rubric. Replacing "diaspora" in design vocabulary without leaving a gap in the rubric's signal list.

- **L59** `"cultural_distinct_register (CDR)": "Contemporary music / diaspora community / carnival. ..."` → `"Contemporary music / regional community / carnival. ..."`
- **L66** `"...community, place, performance, diaspora, history, language..."` → `"...community, place, performance, history, language..."` (drop "diaspora," from the list of inside-out cultural declarations)
- **L67** `"..., diaspora-coded iconography..."` → `"..., community-coded iconography..."`
- **L91** (inside `generation_rule` field, two phrases)
  - `...host-city-diaspora remit)` → `...host-city-carnival remit)`
  - `...host-city-diaspora voice` (later in same line) → `...host-city-carnival voice`
- **L102** `"...diaspora-coded festival band"` → `"...community-coded festival band"`
- **L112** `"caribana (Toronto) + nottinghill (London): diaspora-carnival cross-Atlantic with different palettes but a shared host-city-diaspora voice"` → `"caribana (Toronto) + nottinghill (London): carnival cross-Atlantic with different palettes but a shared host-city-carnival voice"`
- **L155** `"...a culture magazine / civic body / diaspora carnival each have non-flag palettes..."` → `"...a culture magazine / civic body / carnival each have non-flag palettes..."`
- **L162** `"Magenta H1 #ed177a (caribana) + violet #9e5aff body = diaspora-carnival non-flag palette, register-allowed"` → `"Magenta H1 #ed177a (caribana) + violet #9e5aff body = carnival non-flag palette, register-allowed"`
- **L352** `"...lived-in scenes, diaspora gatherings..."` → `"...lived-in scenes, community gatherings..."`
- **L353** `"...identifiable real scenes or people with Caribbean/diaspora context. ..."` → `"...identifiable real scenes or people with Caribbean/regional context. ..."`
- **L377** `"Use real photography of specific Caribbean/diaspora culture — carnival, live performance, ..."` → `"Use real photography of specific Caribbean/regional culture — carnival, live performance, ..."`

#### B.3 `blog.md` — 2 occurrences

- **L122** `**UC8 — Sports, carnival, and diaspora coordination.**` → `**UC8 — Sports, carnival, and cross-border coordination.**`
- **L122** body `...remittances for the diaspora community on the same primitives...` → `...remittances for the regional community on the same primitives...`
- **L191** `...or remittance-sending diaspora resident who adopts...` → `...or remittance-sending regional resident who adopts...`

#### B.4 `blog-sales.md` — 4 occurrences

- **L18** `...any developer in the region — or in the diaspora — a single TypeScript surface...` → `...any developer in the region — wherever they are based — a single TypeScript surface...`
- **L23** `...regional transport, independent artist admin, diaspora remittances — those costs...` → `...regional transport, independent artist admin, cross-border remittances — those costs...`
- **L76** `...concierge booking, regional transport, diaspora coordination. ...` → `...concierge booking, regional transport, cross-border coordination. ...`
- **L78** `...or remittance-sending diaspora resident who adopts...` → `...or remittance-sending regional resident who adopts...`

#### B.5 `cdesign1.md` — 1 occurrence

- **L93** `What: real Caribbean culture (mas, performers, actual ocean/streets, diaspora) — never stock beach postcard, ...` → `What: real Caribbean culture (mas, performers, actual ocean/streets, community life) — never stock beach postcard, ...`

## Out of scope

- 3 mentions inside `.kilo/plans/*.md` historical plan documents (kept as records of what was planned at the time).
- Renaming UC8 slug (`uc8`) — slug is fine; only the displayed text changes. The slug has no `diaspora` substring.
- Changing the **purpose** of UC8 (still about NYC/London/Toronto carnivals + group bookings). Only the prose "diaspora" framing is removed.

## Validation

1. `grep -rni "diaspora" /workspaces/voyager/voyager /workspaces/voyager/blog.md /workspaces/voyager/blog-sales.md /workspaces/voyager/refactor /workspaces/voyager/cdesign1.md` — **0 matches** after edits.
2. `grep -rni "diaspora" /workspaces/voyager/.kilo/plans` — **3 matches** (unchanged, expected — historical records).
3. `pnpm run build` from `/workspaces/voyager/voyager` — clean build. No JSON parse errors after editing `refactor/cdesign.json` (validate via `node -e "JSON.parse(require('fs').readFileSync('refactor/cdesign.json'))"` if needed before build).
4. `node -e "JSON.parse(require('fs').readFileSync('voyager/src/lib/data/useCases.json'))"` — confirm `useCases.json` still parses cleanly after UC8 entry edits.
5. Visual spot-check on the live site (rendered):
   - `/use-cases/uc8` — pill list shows `Relay Hub` (not `Diaspora Hub`); the section prose reads "Cross-border coordination" / "regional community".
   - `/` home — UC8 card title reads "Sports, carnival, cross-border coordination".
   - `/principles` — "What changed" line lists `regional communities` as the last item.
   - `/build` — alpha blurb ends with "Remote developers welcome."

## Risks

- **`cdesign.json` JSON validity**: must keep balanced quotes/braces. Each `diaspora` removal uses exact-string replace; the surrounding punctuation/commas/spacing is preserved. Use `node` JSON parse as a safety check.
- **Prose readability**: "Regional" is more generic than "diaspora" in places; some sentences lose a degree of specificity. Acceptable per "remove any references" instruction.
- **UC8 framing shift**: removing "diaspora" from the UC8 framing makes the use case's remit slightly vaguer (it's still about cross-Atlantic carnivals + group bookings, but the demographic framing shifts from "diaspora communities" to "regional communities"). Acceptable per user direction.
