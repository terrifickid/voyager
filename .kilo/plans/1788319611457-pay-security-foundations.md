# Rewrite `/pay/security` to explain the underlying networks

## Context

`/pay/security` currently sells the user on **outcomes** (can't be seized, can't be frozen, can't be deplatformed, swap wallets) — useful for a non-technical reader but it skips the *why*. A reader who has never heard of Nostr or Lightning has to take the outcomes on faith.

The user's brief: the page should now walk the reader up the stack — what Nostr is, what Bitcoin is, what Lightning is, why each is secure, how Voyager uses both networks (per `voyager.md`), and why Voyager's use of them is secure.

Decisions already made with the user:

- **Scope**: insert foundations content into the existing page; keep the four outcome cards and the honest-limits section. The page grows longer but serves both audiences — the curious reader who wants the *why*, and the outcome-led reader who just wants to know what they get.
- **Voice**: plain English, no jargon. Use terms like "hash", "public-key", "escrow" only where unavoidable; explain each in one short clause.
- **Structure**: layered chain. Each foundation's "why secure" references the layer beneath it (Lightning inherits from Bitcoin, Voyager inherits from both). Strong narrative arc.

## Out of scope

- Rewriting the outcomes section. The four outcome cards stay as-is.
- Touching `/pay/pricing`, `/pay/node`, `/pay/+page.svelte`, or any `/docs/*` route. Lesson 4 (`how-voyager-pay-works`) and Lesson 9 (`how-voyager-pay-extends`) already cover the protocol in depth; this page is the lay-of-the-land, not a replacement.
- Adding new components, new icons, or new Tailwind utilities. Reuse `Icon`, `SectionHeader`, `Cta`, the existing `bg-bone-200` / `bg-bone-100` card pattern, and the `rounded-[28px]` / `rounded-[32px]` radii already in use on this page.
- Renaming the page or changing its route.

## Final page structure (top to bottom)

1. **Hero** — unchanged. "Secure by design." Same H1, same lede, same two CTAs.
2. **Two pillars** — unchanged. No custody + federated marketplace.
3. **NEW: The three networks** — SectionHeader. Lede: "Three open networks. Voyager Pay runs on top of them. They are the reason Voyager Pay is hard to attack."
   - 3.1 **Bitcoin** — what it is (a public ledger of who owns what, secured by proof-of-work across thousands of independent nodes) → why it's secure (changing history costs more than you can take; an attacker would need to out-compute the rest of the world).
   - 3.2 **Lightning** — what it is (a fast payment network that runs on top of Bitcoin, using payment channels that lock up bitcoin and pass tiny IOUs back and forth) → why it's secure (each IOU is sealed with a hash that only the receiver can unlock, so a stolen IOU is worthless).
   - 3.3 **Nostr** — what it is (a public message network — anyone can run a relay, anyone can read, messages are signed by the sender's key, not the relay's) → why it's secure (no relay can impersonate you or rewrite history; cut one relay, the next one already has the message).
4. **NEW: How Voyager uses them** — SectionHeader. Lede: "Voyager Pay doesn't reinvent any of these. It composes them. That is the security model."
   - **Money moves on Lightning.** Settlement is a hash-sealed IOU between the buyer's wallet and the seller's wallet. No platform holds the funds mid-flight.
   - **Messages move on Nostr.** Orders and quotes are signed notes on public relays. The relays see nothing identifying — the order contents are sealed with a key only the buyer and seller hold.
   - **Trust is spread across operators.** Many relays, many Lightning nodes, many wallets. Cut any one and the others still carry the message and the money.
5. **NEW: Why that is hard to attack** — three short property cards matching the existing card style (`rounded-[28px] bg-bone-200 p-6`). Plain-English reasons keyed to the user-visible outcomes above:
   - **No one sits on your money.** The receiver's wallet is the only thing that can unlock the payment. A relay or a federation node cannot redirect it.
   - **No one can forge a message.** A relay cannot pretend to be the buyer or the seller — the message is signed with a key only the real signer holds.
   - **No one is a single point of failure.** There are many relays, many market makers, many wallets. Take one down, the rest route around.
6. **Four outcomes** — unchanged. The "Your money can't be seized / No one can freeze you / No platform can deplatform you / You can switch wallets" cards.
7. **Honest limits + next-up CTA** — unchanged. Same honest-limits list, same CTAs, same nested "Next up: Fair pricing" card.

## Style rules for the new content

- Each foundation block uses the existing two-column card pattern (`md:grid-cols-2`) with "What it is" on the left and "Why it's secure" on the right. Avoids cramming on mobile.
- Cards reuse `rounded-[28px] bg-bone-200 p-6` so they sit visually with the two-pillar cards above and the four-outcome cards below.
- SectionHeader component (already imported) for every section's title. Lede lines stay one sentence.
- No new icons in the foundation blocks. Plain type-only cards. The Icon component stays reserved for the four outcomes and the two pillars above.
- One short paragraph per property card in section 5 (new "Why that is hard to attack"). Match the length of the existing outcome cards.
- The page-level hero lede already says "two structural pillars" — that wording stays. The new section is "three networks", not a third pillar. No contradiction introduced.

## Affected files

- `voyager/src/routes/pay/security/+page.svelte` — only file touched. Insert three new `<section>` blocks (sections 3, 4, 5 in the structure above) between the existing "Two pillars" section and the existing "Four outcomes" section. No edits to the existing sections.

## Validation

1. `cd voyager && npx svelte-check --tsconfig ./jsconfig.json` — no new errors or warnings (the page already uses `Icon`, `SectionHeader`, `Cta`).
2. Manual scroll of `/pay/security`:
   - Hero, Two pillars, **The three networks** (Bitcoin / Lightning / Nostr, each with what + why), **How Voyager uses them**, **Why that is hard to attack** (3 cards), Four outcomes, Honest limits + Next-up. Same total conversion shape — the page still ends on the EROI-audit CTA and the Fair-pricing next-up card.
3. Mobile width (≤640px): the two-column "what / why" cards stack vertically; the 3-card property grid stacks; nothing overflows.
4. Read-aloud pass: every new sentence names the thing it talks about. No "HTLC", no "NIP", no "BOLT", no "kind:". "Hash" and "public-key" appear once each with a one-clause gloss.

## Risks

- **Page length.** Going from 112 lines to roughly 180–200. Mitigation: keep each foundation card to one short paragraph per side; section headers are already slim (eyebrow + title + one-line lede).
- **Voice drift.** Tempting to slip into spec tone when describing Lightning channels or Nostr gift-wrap. Mitigation: the validation step above includes a read-aloud pass that flags any unexplained term.
- **Duplicate the EROI audit page.** The EROI audit page (`/docs/voyager-pay-eroi-audit`) already explains dispersion / opacity / binding. The new content on `/pay/security` must stay at the *why is the network secure* level and defer the *does Voyager Pay satisfy the rubric* answer to the EROI CTA at the bottom of the page.
