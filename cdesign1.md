# Voyager Web Design Rubric — v0.1

Human-readable companion to `voyager_web_design.json` (canonical schema).
Class: visual-design.caribbean-first-web-brand · intended use: generate + evaluate.

## Provenance (honest coverage)

Discovered from TWO sources, per the on-file method (RUBRIC_FROM_EXAMPLES.md):

1. **Primary signal — the advisory call** (/home/tk/advisorycall.md). This is where the
   _verbal_ directives live, verbatim: the colors (yellow, Tiffany blue/bluish-green/teal,
   orange, black), "less is more", "get to the point / plan it pay it take the trip",
   "the jig is up", "we can make money and not be a piece of shit", anti-tourism-cliché.
2. **Grounding — live design tokens** pulled from the exemplar URLs (curl + hex/CSS-var
   extraction, 2026-09-02). This is what anchors the palette/type criteria in real values:
   - Visit Barbados → deep navy #1a3d50 / #002b5c + gold #f8c300 / #d89737
   - LargeUp → gold #efb300 (dominant) + warm cream #fafae1 + dark gray
   - Machel Montano → electric cyan #00e2ff + yellow #fffc00 + orange #ff6900 (carnival register)
   - Bob Marley → black #000000 dominant (110×) + red/gold/green; Bebas Neue / Oswald / Manrope
   - Fenty Beauty → black/white extreme discipline; custom sans "Brown"
   - Travelocity → curl blocked (JS-rendered); cited as the _negative_ register only, no tokens claimed

Contrast set: the positive exemplars above vs the negative register (Travelocity / Ticketmaster /
Spotify — dynamic pricing, scalper fees, 0.003¢-per-stream). Weights are PROVISIONAL: assigned
from which differences the call emphasized, not from quantitative sort data.

## The grid (analytic)

Score levels: 4 On-brand · 3 Near · 2 Partial · 1 Off-brand

### C1 — Ocean-teal trust anchor (w 0.15)

What: brand/trust surfaces sit in deep Caribbean sea teal/navy; never corporate blue or pure-white-only.
Observable: hue 190–215° (#1a3d50, #002b5c, #0f5298, #00e2ff at display); warm cream/navy neutrals; no #007bff primary.

- 4: deep teal/navy + warm-cream surfaces, tonal-step elevation, water hue unmistakable
- 3: correct hue but a section or two drifts cool-gray / bare white
- 2: ocean hue only in accents; primary canvas white/cool-gray
- 1: corporate royal-blue-white, warm-wood/tan, or dark-mode purple/indigo

### C2 — Sunshine + carnival accent discipline (w 0.15)

What: one warm high-chroma accent (gold/yellow/orange, + cyan in music register), reserved for action.
Observable: single warm accent (#f8c300/#efb300/#fffc00/#ff6900) on CTAs; <15% hero coverage; ≤2–3 competing hues.

- 4: single warm accent on CTAs + one highlight; rest ocean/cream/black
- 3: accent leaks into icons/badges, or a 2nd high-chroma hue at near-equal weight
- 2: cool accent (blue/violet), or warm accent too faint to register
- 1: full multi-hue carnival chaos, rainbow gradients, or corporate-blue-only accent

### C3 — Black-ground, high-contrast discipline (w 0.12)

What: near-black type on warm surfaces (or reverse) at WCAG AA; the "NYC black" grounding.
Observable: body ≥4.5:1, large ≥3:1; near-black #000..#171722 on cream, or reversed; no gray-on-gray.

- 4: near-black on warm-cream (or clean reverse), AA pass, hierarchy by value not hue
- 3: mostly high contrast, one muted/gray section
- 2: gray-on-white body in places, or contrast fixed with thin borders/shadows
- 1: muddled mid-tones throughout, or all-black-goth losing the ocean/warmth anchor

### C4 — Bold display type, clean sans body (w 0.12)

What: bold/condensed display headline (Bebas Neue / Intro / Oswald) over clean sans body (Open Sans / Manrope / Brown / Quattrocento).
Observable: h1 display/condensed weight ≥600; body clean sans; no serif at display size.

- 4: bold condensed display + clean sans body, deliberate type scale
- 3: right families, timid weight/size/leading
- 2: default system sans (no display voice), or slab/serif body
- 1: full serif editorial, or 4+ font mash with no hierarchy

### C5 — One-job-per-screen visual economy (w 0.16)

What: single job communicated ≤20 words above the fold, generous whitespace, no forced navigation.
Observable: hero ≤20 words naming product+audience; content <~50% of hero; no carousel/interstitial/forced-steps.

- 4: ≤20-word hero floating in whitespace, one primary action, nothing decorative
- 3: clear but slightly crowded, or statement drifts past 20 words
- 2: competing statements, or auto-rotating hero carousel
- 1: three screens of brand soup, forced-steps funnel, or interstitial gate

### C6 — Anti-dark-pattern transparency (w 0.15)

What: no urgency/scarcity/dynamic-pricing cues; plain literal prices and CTA labels.
Observable: zero countdowns, "only N left", fake strikethroughs, bait pricing, hidden fees.

- 4: every price/CTA plain, complete, literal; transparency is the trust signal
- 3: no dark patterns, but reassurance clichés ("best price guaranteed") undercut plainness
- 2: stray urgency cue, or a price that needs a step to reveal the total
- 1: countdowns, fake scarcity, dynamic-pricing feel, hidden fees (Travelocity register)

### C7 — Authentic Caribbean imagery, not tourism cliché (w 0.15)

What: real Caribbean culture (mas, performers, actual ocean/streets, community life) — never stock beach postcard, generic lifestyle, or 3D mascots.
Observable: specific real people/place/performance; no watermarked stock; no posed-generic; no 3D abstracts.

- 4: lived-in, documentary-feeling Caribbean culture in frame
- 3: authentic but genericized (any-island beach), or one stock filler mixed in
- 2: stock beach/palm-tree postcard primary, or posed-generic lifestyle
- 1: watermarked stock, 3D abstract mascots, or zero Caribbean context

## Theme-Tips summary (for generation)

**Ocean + sunshine palette, black-grounded**

- Primary surface = deep ocean teal/navy (#1a3d50..#002b5c); never corporate blue or pure-white-only.
- One warm accent (gold #f8c300 / yellow #fffc00 / orange #ff6900); electric cyan #00e2ff at display scale only.
- Type near-black on warm cream (#fafae1); pass WCAG AA.
- Bold condensed display (Bebas Neue / Intro class) + clean sans body.
- Elevation by tonal value, not thin borders/shadows.

**Get-to-the-point, anti-exploitation**

- Hero states value in ≤20 words; one job per screen.
- No carousel, no interstitial, no forced-steps funnel.
- No countdowns, fake scarcity, dynamic pricing, or hidden fees.
- Plain literal prices and CTA labels; transparency over reassurance copy.
- Real Caribbean-culture imagery, never stock beach/tourism cliché.

## Validation status

JSON parses clean; weights sum to 1.0; 7 criteria × 4 levels; all fields present
(verified via python json.load + weight-sum assert, 2026-09-02).
