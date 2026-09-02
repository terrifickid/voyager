# Condense the foundations block on `/pay/security` to one salesy section

## Context

The previous edit added three new sections ("Three networks", "How Voyager uses them", "Why that is hard to attack") that run too long and read as a tutorial, not a sales pitch. They also overlap with the four outcome cards immediately below — the user-visible promises already say "your money can't be seized" etc.

User direction in this session: collapse those three sections into one tight, salesy section; quickly summarize how the architecture conforms to EROI in principle (dispersion / opacity / binding); keep the rest of the page untouched.

The rest of the file (hero, two pillars, four outcomes, honest limits + next-up) is correct as-is and stays.

## Final page structure (top to bottom)

1. Hero — unchanged.
2. Two pillars — unchanged.
3. **NEW: One condensed "What it's built on" section** (replaces the three sections added in the previous edit). Layout: SectionHeader + a row of three network tiles + one EROI ribbon below.
4. Four outcomes — unchanged.
5. Honest limits + next-up CTA — unchanged.

## What the new section looks like

A single `<section class="mx-auto max-w-6xl px-6 pb-20">` with this layout:

- **SectionHeader**
  - `eyebrow="Foundation"`
  - `title="Money on Bitcoin. Messages on Nostr. No one in the middle."`
  - `lede="Voyager Pay isn't a platform that runs on trust. It's three open networks stitched together — and the math does the policing."`

- **Three network tiles** — `mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3`. Each tile reuses the existing `rounded-[28px] bg-bone-200 p-6` card pattern with the same inner spacing (`flex flex-col gap-3`), no icon, one short line of copy. Eyebrow names the network; the title-as-eyebrow style from the existing page works here so the salesy H2 reads at full size.

  Suggested tile copy (edgy, no jargon):
  - **Bitcoin** — "A public ledger the whole world keeps identical. Changing history costs more than you can steal."
  - **Lightning** — "Fast payments stacked on that ledger, sealed with one-way locks no thief can reopen."
  - **Nostr** — "An open message network where your signature is the receipt. No relay owns your identity."

- **One-line EROI ribbon** — `mt-8 rounded-[28px] bg-bone-100 p-6 sm:p-8` (matches the nested "Next up" card style on this page at line 227). Single line, three short clauses separated by middots:
  - "Three ways an attacker has to lose: **Dispersion** spread across many operators. **Opacity** because your order is sealed, not plain. **Binding** because the math doesn't let anyone rewrite history."

  No new component, no new icon, no new CSS — just the nested-card pattern already used on this page.

## Style rules

- Eyebrow + copy per tile. No icons in the new section. SectionHeader title is the salesy H2; tiles use `eyebrow` (network name) + a one-line punch.
- Reuse `rounded-[28px] bg-bone-200 p-6` and `rounded-[28px] bg-bone-100 p-6 sm:p-8`. No new Tailwind utilities.
- One sentence per tile. The EROI ribbon stays one line (desktop) — wraps naturally on mobile.
- Voice: "matches the codebase" — avoid "decentralized", no "HODL"/"HTLC"/"NIP"/"BOLT"/"kind:". "Hash" and "public-key" don't appear in this condensed version.

## Files touched

- `voyager/src/routes/pay/security/+page.svelte` — only file edited.
  - Replace lines 50–172 (the three previously-added sections) with one new section. Total file length lands around ~140 lines, down from ~236.

## Validation

1. `cd voyager && npx svelte-check --tsconfig ./jsconfig.json` — expect same baseline (1 pre-existing error in `lib/agent/index.ts:62`, 1 pre-existing warning in `routes/+page.svelte:553`). Any new error/warning is a regression.
2. Grep on the edited file for forbidden terms: `HTLC`, `HODL`, `BOLT`, `NIP`, `kind:`, `decentralized`. (HODL is allowed inside the pre-existing four-outcome paragraph, which is untouched.)
3. Read the section once out loud:
   - "Money on Bitcoin. Messages on Nostr. No one in the middle."
   - Three one-line network tiles.
   - One-line EROI ribbon naming dispersion / opacity / binding.
   - Then four outcomes, then honest limits + next-up. Page rhythm is: hero → pillars → tight foundations pitch → outcomes → close.
4. Mobile (≤640px): the 3-tile row stacks vertically; the EROI ribbon wraps; nothing overflows.

## Risks

- **Tone drift.** Edgy short copy risks sounding glib. Mitigation: the read-aloud pass in validation; if it sounds like a tagline and not a punchline, it's fine.
- **EROI mention too brief.** "Dispersion / opacity / binding" gets a one-clause gloss each here; full rubric lives on the EROI-audit page, which the page's existing CTA at the bottom already links to.
- **Contradicting hero lede.** Hero says "two structural pillars: no custody, and a federated marketplace". The new section heading uses "Foundation" / "open networks" — no third pillar introduced.
