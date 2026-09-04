Voyager Platform — v0.1 prototype brief
Status: working draft (pre-rubric)
Layer: product/platform doc (uses VOYAGER_PROTOCOL.md as one underlying rail)
Audience: builders in the Caribbean and abroad, app integrators, alpha partners, ourselves

Companion docs:

- /home/tk/voyager/VOYAGER_PROTOCOL.md (the underlying Nostr + Lightning + Mostro rails)
- /home/tk/voyager/VOYAGER_PLATFORM_v0.1_rubric.md (EROI-defense scoring of this brief)
- /home/tk/voyager/EROI_AUDIT.md, EROI_AUDIT_v2.md (historical — superseded by v3 protocol)
- /home/tk/rubric/rubrics/eroi_defense_rubric.md (rubric used)

---

0. What changed and why

Earlier Voyager work targeted a single end-user surface — a travel concierge / trip-planner built on top of Lightning rails. Early alpha validation and parallel reads of regional creator pain points made it clear that the value is not in the trip-planner. The trip-planner was a vehicle to get the rails built, and the rails are now built. What the region actually needs is a toolkit other people can build on.

Pivots from the v3 protocol-era framing:

- "Trip planner for tourists" -> "Toolkit for builders serving the Caribbean"
- "Voyager Pay" -> "Voyager" (platform, no single product surface)
- Voyager-the-business builds one reference app -> Voyager-the-business operates one rail/SDK set + a couple of showcase apps; everyone else builds their own
- Implicit audience: end users of our app -> Explicit audience: developers, indie operators, content creators, concierge services, music platforms, regional SMEs, CARICOM-adjacent initiatives, and Caribbean regional communities

The underlying rails (Nostr identity, Lightning payments, Mostro federated fiat ramp, NIP-17 encrypted DMs, no-custody throughout, no KYC inside the protocol) remain untouched. They are now presented as **primitives other apps consume**, not as a single end-user product.

---

1. The pitch in one paragraph

Voyager is an open toolkit for the region's applications. It gives any developer in the region (wherever they are based) a small, well-documented set of primitives — a self-sovereign login (Nostr keypair), a payment rail that works even where Visa/MasterCard don't (Lightning), a federated fiat on/off ramp that doesn't require the developer to be a regulated money services business (Mostro), and a privacy-preserving messaging substrate (NIP-17 gift-wrapped DMs). Builders ship apps on top; end users get a Caribbean-shaped internet that doesn't route through US/EU payment processors and doesn't ask them to leave their own country to participate.

---

2. Use cases from early alpha validation (regional ground truth)

These are the jobs-to-be-done surfaced by early alpha validation. Each is a target use case for some app a builder would ship on Voyager; the list below is the set Voyager-the-platform should make easy.

UC1 — Independent artist admin & payments
Indie Caribbean artists are paid microscopic per-stream royalties by global DSPs, can't afford a manager or label, and have no good tool for: tour planning, door-sales splits, merch, contracts, IP/publishing rights, gig booking. An app on Voyager lets an artist receive payment in sats (or local fiat via a Mostro ramp), get booked by venues, and store contracts — all without giving up their identity or paying 0.003¢ per stream.

UC2 — Caribbean-to-Caribbean commerce
A Barbadian wants to buy something from Grenada and has no idea who to trust 30 minutes away. There is no Caribbean hub marketplace. A buyer-seller app on Voyager (using the v3 protocol's listing + order events) gives discoverability, payment, and dispute arbitration across the region without an intermediary that takes 30% or a payment processor that won't serve them.

UC3 — Concierge / tourism (Lily's pilot)
High-touch trip planning for visitors to Barbados (and eventually other islands), where the operator gets paid in sats or local fiat, the customer pays with whatever they have (LN, Lightning-via-ramp, USD via Mostro), and the operator keeps 100% of the booking minus a tiny Lightning routing fee. The travel concierge that was Voyager's first app becomes one of the showcase apps demonstrating the toolkit.

UC4 — Content monetization for region-locked creators
Caribbean creators get monetized on YouTube/Reels/TikTok only if they have a US bank. An app on Voyager lets a creator receive sats directly (Lightning), optionally convert to local fiat (JMD/TTD/BBD/XCD/GYD/HTG/BSD via Mostro), and access a payment channel that doesn't require a US bank account.

UC5 — Island-hopping logistics
Cheaper to fly Barbados→LA than Barbados→Trinidad. No ferry system. Apps on Voyager (eventually) might integrate regional transport booking + payment — the protocol doesn't need to know about boats, but the toolkit's payment and identity primitives make a transport app 10x easier to ship than starting from a hosted payments stack.

UC6 — Authentic cultural discovery / Caribbean hub
"There is no place online where Caribbean people just hang out and don't have to explain themselves." This is not a payment problem; it's an identity + discovery problem. Voyager's Nostr-keypair login + relay-set gives any builder a turnkey way to make a Caribbean-keyed community surface (timeline, group chat, marketplace) without rebuilding identity.

UC7 — Booking/matchmaking for venues and independent performers
"The less the artist knows, the easier it is to take advantage." Indie artists can't find venues; venues can't find reliable indie artists. An app on Voyager can store verifiable reputation (zaps, past-gigs as Nostr events), let venues post open slots, let artists apply, and settle payments atomically — without a CAA-style gatekeeper.

UC8 — Sports, carnival, and cross-border coordination
West Indies cricket plays as one team; carnivals happen across NYC/London/Toronto. Apps on Voyager can coordinate group bookings, ticket sales, and remittances for regional communities with the same primitives — no need to integrate 5 payment processors.

---

3. What Voyager-the-platform provides (the toolkit)

The platform is **five primitives + a SDK + a couple of showcase apps**. Nothing more is required for v0.1; the rest is what builders add.

3.1 Primitives

P1. Self-sovereign identity
Nostr keypair (`nsec` / `npub`). No email, no phone, no password, no platform-account to lose. Recovery is a 12-word seed. Compatible with every Nostr app already shipping.

P2. Payment rail
Lightning (BOLT11 + NIP-47 NWC). Apps call our SDK; SDK talks to the user's wallet; user signs. The app never holds funds. Works from anywhere with internet; no merchant account needed; no card network.

P3. Federated fiat ramp
Mostro node network (anyone can run one). Apps don't integrate fiat directly — they offer the user a "buy sats with JMD" button and the SDK finds the best quote among reachable Mostro nodes. Voyager operates one reference node tuned for Caribbean rails; we expect community nodes to appear.

P4. Private messaging
NIP-17 gift-wrapped DMs (kind:1059). Apps get end-to-end encrypted messaging without becoming a Signal competitor. Order details, contract terms, address info — none of it visible to relays.

P5. Discovery substrate
Nostr relays + addressable/replaceable events (kinds 30402, 30017, 38383). Listings, stalls, ramp quotes, profiles — all public, all signed, all discoverable by anyone running a relay or indexer. No central marketplace.

3.2 SDK

`@voyager/sdk` (or platform-appropriate name). Wraps P1–P5 into a handful of calls:

```
voyager.identity.create()              // returns {npub, nsec} — or import existing
voyager.identity.sign(event)           // low-level
voyager.pay.invoice(bolt11, opts)      // NWC to user's wallet
voyager.pay.quote(fiat, amt)           // returns top-3 Mostro quotes
voyager.pay.rampBuy({fiat, amt, method}) // executes a Mostro trade
voyager.listing.create({...})          // kind:30402
voyager.listing.search({region, cat})  // relay fan-out
voyager.dm.send(toNpub, payload)       // NIP-17 wrap
voyager.dm.read()                      // decrypt your inbox
```

SDK is MIT/Apache, hosted in a public monorepo. Anyone can ship an app on it.

3.3 Showcase apps (we ship 2–3 to demonstrate the toolkit, not as products)

- `voyager-concierge` — Lily's trip-planner. Demonstrates listings + LN pay + DM order flow + Mostro ramp. This was the original use case; now it's a demo.
- `voyager-stage` — indie artist admin. Demonstrates long-lived identity, reputation accumulation via zaps, contract storage, tour payment splits. Built if there's demand after the concierge ships.
- `voyager-market` — generic buyer/seller marketplace for Caribbean goods. Demonstrates search, listings, escrow-free Lightning payments, dispute-via-Mostro-arbiter.

  3.4 What we explicitly are NOT building in v0.1

- A travel booking engine ourselves. We ship a demo; the rest is builders.
- A music DSP. No streaming. Showcase `voyager-stage` is admin/reputation, not a Spotify competitor.
- A regulated fiat wallet. All fiat flows go through Mostro nodes that the operator chooses to onboard; Voyager is never the regulated entity.
- A central marketplace. The protocol does discovery via relays; we run an optional indexer.
- A web/mobile IDE. SDK yes; no-code-builder no.

---

4. Builder economics (the business model)

Voyager-the-business has no protocol-critical revenue (the protocol survives without us). What we can sustainably charge for:

- Hosting the optional indexer (voyager-idx) — caching layer, free tier + paid SLA
- Operating our reference Mostro node (voyager-mostro) — 0.3% fee on trades, competitive with regional alternatives
- Premium SDK features (e.g., pre-indexed discovery for app builders, hosted webhook delivery)
- Implementation services for builders who want help shipping their first app on the toolkit

What we cannot sustainably charge for, and won't try to:

- Transaction fees on protocol-level Lightning payments (Lightning routing is the routing nodes' business)
- A cut of every app's commerce (we are not a platform tax)
- User data (we have no user data; users own their keys)
- Lock-in via proprietary identity (Nostr keys are interoperable with hundreds of apps)

---

5. Regulatory posture

- We are not a money services business. No custody, ever.
- We do not run a regulated wallet. Users bring their own (Alby, Mutiny, Phoenix, Breez, Zeus).
- Our Mostro node is operated under whatever license regime applies in its jurisdiction (likely needs a discussion with a Barbados-based MSB advisor; out of scope for v0.1 brief).
- Apps built on the toolkit are responsible for their own regulatory posture. SDK ships with a "regulatory checklist" doc naming the touch points (MSB, data protection, KYC if you voluntarily collect it) but does not provide legal advice.
- KYC is the optional responsibility of whoever touches fiat. The protocol layer doesn't see it, doesn't store it, doesn't require it.

---

6. EROI: how the platform defends its builders

This is the part that justifies the platform framing rather than the trip-planner framing. Every Caribbean app that ships today inherits the structural weakness of its host (hosted card processors won't serve them, US bank required, US-only KYC, etc.). Every Caribbean app that ships on Voyager inherits the protocol's defense profile (F=3, O=3, B=3 — see VOYAGER_PROTOCOL.md §11).

That's the offer: ship an app on Voyager and you inherit a system where:

- A tax authority or hostile acquirer cannot seize your user base (no platform-account; users hold their own keys)
- A payment processor can't de-platform you (no payment-processor dependency at all)
- A single subpoena can't enumerate your users (NIP-17 DMs; no central inbox)
- A regional regulator can't categorise your marketplace the way it would a card-network-connected one (no category fits; you're closer to email + cash than to a marketplace)

Scoring is in VOYAGER_PLATFORM_v0.1_rubric.md.

---

7. Go-to-market (alpha cut)

Target alpha partners, in priority order:

1. The Barbados-based concierge operation — already an advisor + already has a use case. The concierge demo ships first; their feedback shapes SDK ergonomics.
2. Two additional Caribbean builder teams TBD — one in Jamaica (music-adjacent), one in Trinidad (commerce-adjacent). Selected by what use case they want to ship, not by technical prestige.
3. Caribbean-heritage developers based anywhere — distributed globally, often locked out of "US-only" platforms themselves. They become the bridge users.
4. CARICOM-adjacent policy/standards conversations — late-stage, only after the alpha apps prove out. Not a v0.1 activity.

Non-goals for v0.1: any kind of national rollout, any kind of token launch, any kind of VC raise.

---

8. Risks and what's still open

R1. SDK ergonomics vs. crypto-native developer
Nostr + Lightning + NWC are well-documented but unfamiliar to most Caribbean app developers. SDK has to hide the keys completely and present a unified surface. If we can't get there in v0.1, builders will go back to a hosted payments provider (where they can serve, sometimes) or Flutterwave (where they often can't serve Caribbean).

R2. Mostro node operator density
The fiat ramp only works if there are Mostro nodes reachable in Caribbean-relevant currencies. Voyager-the-business can run one; we need community nodes for redundancy and reputation. If community nodes don't appear, the ramp is a single point of failure.

R3. App-layer regulatory surprise
A builder ships a regulated activity (e.g., a remittance product) on the toolkit without realizing it. We need a "you might be a regulated entity if…" doc prominently shipped with the SDK and a no-custody disclaimer that doesn't accidentally create liability.

R4. Capture risk at the platform layer
Voyager-the-business still hosts the indexer, the docs site, the SDK repo, and the reference node. If we get acquired, those are capturable. The protocol survives; the showcase apps survive; but builder discoverability (indexer) and fiat ramp density (reference node) would degrade. This is a real risk; mitigation is to seed independent indexers and independent Mostro node operators early, so the platform layer is never the only one.

R5. Cultural-authenticity gap
A platform designed in Marfa, Texas for Caribbean builders is going to miss things. Builder validation is the start, not the end. v0.1 ships only after at least one Caribbean builder team has used the SDK to ship something we'd be willing to show a stranger.

---

9. Open questions (not blockers; flagged for the build)

- Should `voyager-stage` ship in v0.1 or wait for `voyager-concierge` to land? (Concierge first is the conservative call.)
- Do we want a hosted indexer at all, or do we let apps run their own relay subscriptions and just publish the SDK? (Hosted indexer helps builder velocity; gives us a leverage point we shouldn't want.)
- What's the smallest viable "Caribbean hub" social surface we'd be willing to ship as a third showcase app? (Probably none in v0.1; flag for v0.2.)
- Should the SDK be available in TypeScript + Python + Go from day one, or just TS? (TS only for v0.1, others when there's demand.)

---

10. Change-log
