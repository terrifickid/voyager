# Voyager Caribbean Web Design Rubric — Massive Music-Genre Expansion

Source files referenced (do NOT edit as part of this plan's task list):

- `refactor/cdesign.json` — the canonical rubric (v0.1, 9 criteria C1-C9).
- `cdesign1.md` — prose companion; out of scope for this round per user direction.
- `refactor/peak.json` — typography source of truth (referenced but not changed).

This plan is a **spec for future implementation**. It describes what the four new
Caribbean-music-genre criteria should look like, how the existing nine criteria's
weights should re-balance, and the validation steps. Implementation will edit
`refactor/cdesign.json` in a later phase.

## Locked decisions (from interview)

1. **Scope of expansion**: massively expand the criteria count (the user picked the
   "Massively expand criteria count" option, not the depth-only or rewrite options).
2. **Caribbean dimensions to cover**: only Caribbean music-genre display conventions.
   Sub-regional anchoring, vernacular language register, Caribbean institutional
   anchoring, cultural-practice iconography, and religious/spiritual register are
   explicitly OUT of scope for this round — they remain covered inside the existing
   C1, C2, C7, and C9 criteria.
3. **Genres to cover** (4 genre families):
   - **Reggae / Nyabinghi / roots reggae** (Jamaican roots lineage, Zion/tribulation
     register, sound-system heritage, rasta color discipline).
   - **Dancehall / sound-system culture** (selector/DJ references, Kingston-street
     aesthetic, dancehall-poster colorway, riddim/voicing language).
   - **Soca / calypso / kaiso** (Trinidad carnival-poster palette, mas-camp lineage,
     kaiso-tent tradition, road-march-ribbon register).
   - **Lover's rock / ska / rocksteady / mento** (pre-reggae heritage, off-beat skank,
     walking-bass era, mento/calypso-jazz pre-roots acknowledgment).
4. **Structure**: append four new criteria as **C10, C11, C12, C13**. Existing nine
   criteria (C1-C9) stay in place; their weights compress to make room. Total
   criteria count goes from 9 to 13. Final weights sum to 1.00.
5. **Out of scope this round**:
   - Indo-Caribbean / chutney / Javanese-Caribbean genres (deferred; would land
     in C12 or a future C14).
   - Latin-Caribbean fusion (salsa, merengue, kompa, zouk, tumba) — deferred;
     would need its own criterion to do justice.
   - Sub-regional anchoring, vernacular language register, Caribbean institutional
     anchoring, cultural-practice iconography, religious/spiritual register.
   - `cdesign1.md` prose rewrite — deferred per user direction.
   - Re-collecting more vision evidence. We have enough existing evidence
     (`_v2_evidence_observations.json`, `_slice_A_report.json`, `_slice_B_report.json`,
     `_slice_C_report.json` referenced in cdesign.json's `build_provenance`) to
     ground the new criteria; no new vision sweep required.

## Re-balanced weights (target: sum to 1.00)

| ID  | Name                                                    | Old w | New w |
| --- | ------------------------------------------------------- | ----- | ----- |
| C1  | Caribbean-cultural anchoring                            | 0.16  | 0.14  |
| C2  | Disciplined palette within a register family            | 0.13  | 0.10  |
| C3  | Black-ground, high-contrast type                        | 0.11  | 0.06  |
| C4  | Display voice committed (or purposefully absent)        | 0.10  | 0.07  |
| C5  | One job per screen, visible above the fold              | 0.10  | 0.07  |
| C6  | Anti-platform-extraction, transparent commercial surface | 0.14  | 0.09  |
| C7  | Imagery rooted in real Caribbean people and practice    | 0.08  | 0.06  |
| C8  | Semantic accessibility: a real h1 reading intent        | 0.08  | 0.04  |
| C9  | Reciprocal vs. extractive commercial posture            | 0.10  | 0.06  |
| C10 | Reggae / Nyabinghi / roots reggae display conventions   | —     | 0.10  |
| C11 | Dancehall / sound-system culture display conventions    | —     | 0.08  |
| C12 | Soca / calypso / kaiso display conventions              | —     | 0.08  |
| C13 | Lover's rock / ska / rocksteady / mento heritage        | —     | 0.06  |
|     | **Total**                                               | 1.00  | 1.00  |

Rationale: the existing nine lose 0.32 of weight to the four new criteria. The
largest cuts hit the most general criteria (C3 contrast, C8 a11y, C9 commercial
posture, C7 imagery-portion since C7 already absorbs some Caribbean-specific
imagery signals). Caribbean-specific criteria (C1, C2) keep most of their weight.
The new four weights are calibrated by how each genre tends to dominate a
typical Caribbean music-artist landing — reggae dominates (most ubiquitous), then
dancehall and soca split the carnival-adjacent space, then heritage gets the
smallest weight because pre-reggae artist sites are rarer.

## New criterion: C10 — Reggae / Nyabinghi / roots reggae display conventions

### What it checks

The site declares reggae/roots authority through visual register. Either the
rasta-color palette is used with discipline (red/gold/green as a controlled
three-stripe, not a lazy tropical rainbow), or the site deploys genre-recognizable
iconography (lion of Judah, dread-locks, Nyabinghi drum pattern, Iyaric language
register, sound-system heritage), or both — anchored by a real artist credit or
community byline, not stock-rasta decoration.

### Observable

- Rasta color discipline: red ~#E11A22, gold ~#F8C300, green ~#1B7E3D used as a
  three-color discipline with one as ground, one as accent, one as highlight — OR
  deliberate editorial restraint against the rasta flag (B&W reggae register).
- Genre-recognizable iconography: lion of Judah, Star of David (in reggae
  context), Haile Selassie visual reference, dread-locks treated with respect (not
  costume), Nyabinghi drum pattern (three-stand bass-drum visual), Iyaric language
  register in copy ("I and I", "Irie", "Jah", "Overstand").
- Sound-system heritage signal: selector or sound-system byline, era-marker
  (Studio One, Tuff Gong, Channel One, Black Ark, Harry J, Dynamic Sounds), riddim
  title or voicing reference.
- Zero stock-rasta decoration without artist credit. Zero dreadlocks-as-costume
  treatment. Zero Rasta-as-festival-dress-up signal.

### Levels

- **4 — On-class**: Rasta discipline OR editorial-reggae-restraint with real
  artist/community credit and at least one genre-recognizable signal (lion / Nyabinghi
  / Iyaric / sound-system byline).
- **3 — Near**: Right register but one section defaults to generic tropical or
  corporate chrome, OR colorway used without an artist credit.
- **2 — Partial**: Stock-rasta decoration (dreadlocks-wig, bobble-hat rastafarian
  mascot, generic lion clip-art) without a real artist or community byline.
- **1 — Off-class**: No reggae specificity OR cultural-appropriation signals (rasta
  caricature as festival decoration, dreadlocks-as-costume).

### Generation rule

Pick a reggae sub-register first: **rasta-color-discipline** (use all three colors
with hierarchy), **editorial-reggae-restraint** (B&W with reggae credit), or
**roots-poster-discipline** (sepia + vinyl + sleeve-archive aesthetic). Anchor
every reggae signal in a real artist/community byline. Never use dreadlocks or
lion clip-art without credit. Where Iyaric language appears, use it as register,
not decoration — translate for accessibility.

### Pitfalls

- Full-bleed rasta flag as wallpaper (lazy flag tokenism; cf. existing C2
  pitfalls for register-mixing).
- Dreadlocks-as-costume / bobble-hat rastafarian mascot / generic lion clip-art.
- Rasta-as-festival-dress-up (cultural-appropriation signal; would fail C1 already).
- Mixing reggae visuals with dancehall slackness-cue chrome (register mix).
- "Reggae invented in 1974" — erasing the pre-reggae lineage (this is what C13
  catches; C10 should not double up).
- Genre language (Iyaric) without translation / accessibility fallback.

### Evidence

- bobmarley.com (named estate, B&W editorial restraint, "HOPE ROAD LAS VEGAS"
  cultural anchor, Haile Selassie visual references, Bebas Neue/Oswald/Manrope
  type system — existing C1 evidence).
- Chronixx, Protoje, Kabaka Pyramid, Jesse Royal, Koffee, Damian Marley,
  Steel Pulse — modern roots artists whose sites deploy rasta-discipline OR
  editorial-restraint registers.
- Studio One / Tuff Gong / Black Ark historical visual archives (vinyl-sleeve
  era register).
- A *positive* negative example to call out: festival-brand sites using
  dreadlocks clip-art without a byline (this is a C10-2/C10-1 signal).

### Weight

0.10.

## New criterion: C11 — Dancehall / sound-system culture display conventions

### What it checks

The site declares dancehall authority through visual register. Either the
dancehall-poster colorway is used with discipline (high-chroma magenta/cyan/black
OR disciplined single-accent restraint), or the site deploys genre-recognizable
iconography (sound-system or selector byline, stage/dance reference, Kingston
street aesthetic, riddim/voicing language), or both — anchored by a real artist
or selector credit, not dancehall-chrome-as-decoration.

### Observable

- Dancehall-poster palette: hot magenta ~#FF1B6B / electric cyan ~#00C8FF /
  black ~#0A0A0A as a controlled three-color discipline (magenta ground, cyan
  accent, black type), OR editorial-restraint register with dancehall byline.
- Sound-system or selector name visible (or byline): "Stone Love", "Killamanjaro",
  "Renaissance", "Coppershot", selector name in masthead.
- Stage/dance reference: "Stage", "Dance", "Booth", "Selector", "Voice"
  language in nav or copy.
- Riddim / voicing language where present: riddim title ("Drop Leaf", "Heads
  High"), voice-of-dancehall convention ("Forward", "Big Up", "Pree").
- Zero dancehall chrome without artist or selector credit. Zero slackness-cue
  visuals without bylines (extraction signal; also catches C9).

### Levels

- **4 — On-class**: Dancehall-poster color discipline OR editorial-restraint with
  real artist/selector credit and at least one genre signal (sound-system byline /
  stage-language / riddim title).
- **3 — Near**: Right register but one section drifts to generic tropical /
  corporate chrome / Rasta mix (cf. C10 register-mixing), OR colorway used
  without artist credit.
- **2 — Partial**: Dancehall chrome (bling, magenta gradients, generic dancehall
  pose imagery) without an artist or selector credit.
- **1 — Off-class**: No dancehall specificity OR cultural-appropriation signals
  (dancehall aesthetics without a Caribbean selector or artist byline).

### Generation rule

Pick a dancehall sub-register first: **dancehall-poster** (magenta/cyan/black
discipline), **editorial-dancehall-restraint** (B&W with selector credit), or
**stage-shot-discipline** (real performance photography, no stylized chrome).
Every dancehall signal anchors in a real artist/selector byline. Where
slackness-cue visuals appear, credit the artist/composer responsible (C9 also
catches this).

### Pitfalls

- Dancehall chrome (bling, magenta gradients, generic dancehall pose imagery)
  without a selector or artist byline.
- Slackness-cue visuals without artist/composer credit (extraction).
- "Dancehall = party" reduction (erasing the sound-system cultural infrastructure).
- Mixing dancehall visuals with Rasta flag as backdrop (register mix with C10).
- "Mardi Gras = dancehall" misattribution (carnival confusion; C12 catches this
  too).

### Evidence

- Vybz Kartel, Popcaan, Beenie Man, Bounty Killer, Sean Paul, Shaggy, Spice,
  Shenseea, Skeng — dancehall artists whose sites deploy the discipline.
- Stone Love, Killamanjaro, Renaissance, Coppershot — sound-system heritage
  surfaces.
- Negative: corporate-party-brand sites using dancehall aesthetics without a
  Caribbean selector or artist byline (extraction register).

### Weight

0.08.

## New criterion: C12 — Soca / calypso / kaiso display conventions

### What it checks

The site declares soca/calypso authority through visual register. Either the
carnival-poster palette is used with discipline (hot magenta + fuchsia + soca-gold
+ electric cyan + royal blue — Trinidad carnival-poster colorway), or the site
deploys genre-recognizable iconography (mas-camp lineage, kaiso-tent tradition,
road-march-ribbon register, playing-mas language), or both — anchored by a real
artist or mas-camp byline, not "tropical-carnival" decoration.

### Observable

- Carnival-poster palette: hot magenta ~#FF2D8A, fuchsia, soca-gold ~#FFC700,
  electric cyan, royal blue as a controlled 3-5 color discipline (one as ground,
  one as accent, rest as ribbons/highlights), OR editorial-restraint register
  with carnival credit.
- Mas-camp or kaiso-tent byline: "Reds", "Blues", "Yellows", "Jab Jab",
  "Pretty Mas", "J'ouvert", "Kaiso Karavan", "Calypso Revue" — real Trinidad
  carnival camp names visible.
- Road-march-ribbon convention: a ribbon strip listing road-march winners by
  year (Caribbean-credibility social-proof; cf. existing C1 evidence for Machel
  Montano's festival laurels).
- Kaiso / soca language register: "Kaiso", "Kaisonian", "Fete", "Playing Mas",
  "Lime", "Bacchanal", "Pan", "Tent", "Chantwell".
- Zero tropical-carnival without Trinidad-credit. Zero mardi-gras-misattribution
  (carnival ≠ New-Orleans-Mardi-Gras).

### Levels

- **4 — On-class**: Carnival-poster color discipline OR editorial-restraint with
  real artist/mas-camp credit and at least one genre signal (mas-camp byline /
  road-march-ribbon / kaiso language / fete register).
- **3 — Near**: Right register but one section drifts to generic tropical /
  Rasta mix / corporate-carnival chrome, OR colorway used without artist or
  camp credit.
- **2 — Partial**: Tropical-carnival decoration (palm-trees + beach + generic
  fete costume) without a Trinidad-artist or mas-camp byline.
- **1 — Off-class**: No soca specificity OR "carnival = New Orleans" misattribution
  OR generic-mardi-gras-shell without Caribbean context.

### Generation rule

Pick a soca sub-register first: **carnival-poster-discipline** (magenta + cyan +
gold discipline), **editorial-soca-restraint** (B&W with fete/tent credit), or
**road-march-ribbon-discipline** (winner-ribbon social-proof). Every soca signal
anchors in a real artist or mas-camp byline. Never conflate with New Orleans
Mardi Gras. Acknowledge mas camp lineage where present.

### Pitfalls

- Tropical-carnival decoration without a Trinidad-artist or mas-camp byline.
- "Carnival = Mardi Gras" misattribution (Trinidad-carnival ≠ New Orleans).
- Soca-rainbow-flag lazy-tropical (cf. C2 register-mixing pitfalls).
- Ignoring mas-camp lineage (Reds / Blues / Yellows heritage).
- Fete-language without Carnival Monday/Tuesday/Pretty-Mas-day register
  awareness.

### Evidence

- Machel Montano (machel_likeahboss) — carnival-poster discipline, 6 festival
  laurels, "Machel Montano" namesake register, road-march heritage. Existing C1
  evidence.
- Bunji Garlin, Fay-Ann Lyons, Kes, Patrice Roberts, Farmer Nappy, Olatunji —
  soca artists whose sites deploy the discipline.
- Calypso Rose (posthumous), Mighty Sparrow (archive), Lord Kitchener (archive) —
  calypso/kaiso heritage.
- Trinidad-carnival.com, NCCTT (National Carnival Commission of Trinidad and
  Tobago) — institutional anchor (cf. existing C1 evidence for ranked-results
  transparency).

### Weight

0.08.

## New criterion: C13 — Lover's rock / ska / rocksteady / mento heritage display

### What it checks

The site honors the pre-reggae lineage — lover's rock falsetto, ska off-beat
skank, rocksteady walking-bass era, mento/calypso-jazz 1950s roots. Catches the
"reggae invented in 1974" elision (Bob Marley's first hit "Judge Not" was 1962;
mento is pre-1950s; ska is mid-1950s; rocksteady is mid-1960s; reggae proper
emerged late 1960s). Either the site deploys a heritage timeline / pre-reggae
artist credit, or copy registers the lineage explicitly (mento / ska / rocksteady
/ reggae as a sequence), or the visual register uses heritage-era palette
(sepia, vinyl, sleeve-archive) deliberately.

### Observable

- Heritage timeline or pre-reggae artist credit visible (Toots & the Maytals,
  Alton Ellis, Desmond Dekker, The Skatalites, Lord Flea, Harry Belafonte
  archive, Millie Small).
- Copy registers the lineage explicitly: a sequence stated ("mento → ska →
  rocksteady → reggae") or a heritage band listed.
- Visual register uses heritage-era palette deliberately: sepia ground, vinyl-
  sleeve texture, sleeve-archive aesthetic.
- Zero "reggae = 1974 onwards" elision. Zero ska-reduced-to-two-tone-nostalgia.
  Zero mento-erasure (1950s calypso-jazz-Caribbean-jazz form). Zero
  "old-people-music" framing of heritage artists.

### Levels

- **4 — On-class**: Heritage timeline OR pre-reggae artist credit OR explicit
  lineage-sequence copy with heritage-era visual register.
- **3 — Near**: Heritage visible but only one signal (e.g., a Toots credit
  without a timeline or visual register), OR the heritage register is in
  footer/credits but not surfaced.
- **2 — Partial**: No heritage acknowledgment, but the site doesn't actively
  erase it (no false "reggae = 1974" claim).
- **1 — Off-class**: Active erasure — site implies or states "reggae was
  invented in 1974", or reduces ska to two-tone nostalgia, or omits mento/
  calypso-jazz pre-roots entirely.

### Generation rule

Add a heritage register to any reggae site. Either: (a) a timeline module
(1950s-1970s), (b) a pre-reggae artist credit band (Toots, Alton Ellis, Desmond
Dekker, The Skatalites, Lord Flea), or (c) a copy block naming the lineage
sequence. Use heritage-era palette deliberately — sepia, vinyl, sleeve-archive.
Treat heritage artists as living cultural figures, not nostalgia.

### Pitfalls

- "Reggae invented in 1974" — active erasure.
- Reducing ska to two-tone nostalgia (forgetting its off-beat-skank Jamaican
  origin).
- Mento-erasure (no acknowledgment of 1950s calypso-jazz-Caribbean-jazz).
- "Old-people-music" framing of heritage artists.
- Skipping the heritage entirely — site talks only about contemporary artists
  with no lineage.
- Compiling heritage without naming it: a "more artists" carousel that
  happens to include Toots but doesn't surface him as lineage.

### Evidence

- Toots & the Maytals, Alton Ellis, Desmond Dekker, The Skatalites, Lord Flea,
  Harry Belafonte (archive), Millie Small — pre-reggae / ska / rocksteady /
  mento artists.
- Studio One / Tuff Gong / Federal Records / WIRL / Studio One Records — heritage
  label surfaces with sleeve-archive register.
- Negative: contemporary-reggae-only sites that elide the pre-1974 lineage.

### Weight

0.06.

## Out of scope (explicit non-goals, reaffirmed)

- **No file edits in this round.** The plan does NOT include editing
  `refactor/cdesign.json` or `cdesign1.md`. The user has flagged that the
  rubric files should not be edited by this plan's implementation.
- **No sub-regional anchoring criterion** — sub-regional palette patterns
  (Jamaica/Trinidad/Barbados/Guyana/Belize) remain in C1, C2, C7.
- **No vernacular language register criterion** — Patois / Kweyol / Papiamento /
  Kriol signals remain in C1's `observable` and `generation_rule`.
- **No Caribbean institutional anchoring criterion** — CARICOM / PMO / NCCTT
  signals remain in C1's `evidence` list.
- **No cultural-practice iconography criterion** — mas / carnival / pan signals
  remain in C1's `evidence` and in C12's mas-camp-byline observable.
- **No religious/spiritual register criterion** — Orisha / Kumina / Pocomania /
  Rastafari signals remain implicit in C1 and C10.
- **No Indo-Caribbean / chutney / Javanese-Caribbean genre criterion** — would
  land in C12 or as a future C14. Deferred.
- **No Latin-Caribbean fusion criterion** — salsa / merengue / bachata /
  kompa / zouk / tumba would need its own criterion. Deferred.
- **No new vision evidence sweep** — implementation should ground the new
  criteria in existing evidence files (`_v2_evidence_observations.json`,
  `_slice_A_report.json`, `_slice_B_report.json`, `_slice_C_report.json`).

## Task list (for the implementing agent in a later phase)

1. Apply the weight re-balancing above to the existing nine criteria in
   `refactor/cdesign.json`. Verify weights still sum to 1.00 via `jq` or
   `python json.load`.
2. Add C10 (Reggae / Nyabinghi / roots reggae) after C9 with the full spec
   above (what_it_checks, observable, levels, generation_rule, pitfalls,
   evidence, weight).
3. Add C11 (Dancehall / sound-system culture) after C10 with the full spec.
4. Add C12 (Soca / calypso / kaiso) after C11 with the full spec.
5. Add C13 (Lover's rock / ska / rocksteady / mento) after C12 with the full spec.
6. Update the `v0_1_compare` block to reflect the new v3 changes: C10-C13 are
   NEW (post-v2), the weight re-balancing is documented, the criterion count
   goes from 9 to 13.
7. Update `rubric_id`, `version`, and `title` fields: bump `version` to "0.2"
   (or "1.0" if a major-version bump is preferred for "massive Caribbean
   expansion"), update `title` to reflect the music-genre expansion.
8. Run `jq . refactor/cdesign.json > /dev/null` (or
   `python -c "import json; json.load(open('refactor/cdesign.json'))"`) to
   confirm JSON parses clean.
9. Confirm weights sum to 1.00 via
   `python -c "import json; d=json.load(open('refactor/cdesign.json')); print(sum(c['weight'] for c in d['criteria']))"`
   — must print `1.0` (or `0.9999...` within float precision).

## Validation

- JSON parses clean (`jq` + `python json.load`).
- All 13 criteria have exactly 4 levels (score 1-4) and complete fields
  (id, name, what_it_checks, observable, weight, levels, generation_rule,
  pitfalls, evidence).
- Weights sum to 1.00 (within float precision).
- The new C10-C13 don't duplicate signals already covered by C1, C2, C7 — they
  extend into the music-genre-display space that C1/C2/C7 deliberately leave
  underspecified.
- The new C10-C13's `evidence` arrays cite existing evidence where applicable
  (Machel Montano already cited in C1) and call out negative-register sites
  where appropriate.
- The `v0_1_compare` block honestly documents what changed (4 new criteria,
  9 re-weighted, no criteria dropped).

## Open questions (flagged for the next round after implementation)

- Whether to add an Indo-Caribbean / chutney / Javanese-Caribbean criterion as
  C14 in a future round.
- Whether to add a Latin-Caribbean fusion criterion as C15 in a future round.
- Whether to update `cdesign1.md` prose to match the v3 expansion (user
  explicitly deferred this round).
- Whether to bump `version` to "0.2" or "1.0" — major-version bump may be
  appropriate given the criterion count grows by 44% and the rubric is now
  Caribbean-music-specific in a way v0.1/v0.2 weren't.
