# Voyager Protocol — v3 with federated fiat ramp

Status: working draft
Layer: protocol spec (Nostr-based) + reference client architecture
Audience: implementers, auditors, and Voyager operators

This is the successor document to:

- /home/tk/voyager/EROI_AUDIT.md (v1: centralized Crossmint/x402 architecture)
- /home/tk/voyager/EROI_AUDIT_v2.md (v2: hardened centralized, dual-rail x402)
- design discussion: v3 (nostr-native, Lightning, federated ramp)

v3 replaces both. The protocol layer has no privileged operator. Voyager-the-
business runs reference clients + infrastructure, and optionally one Mostro
node tuned for Caribbean rails.

Companion: /home/tk/rubric/rubrics/eroi_defense_rubric.md (the rubric this
design satisfies).

---

## 0. Design invariants

These are not negotiable. Every change to this document must preserve all of:

1. **No custody anywhere in the protocol layer.** Not for a millisecond.
2. **No identity beyond a keypair is required by the protocol.** All KYC is
   offloaded to fiat ramps and stays there.
3. **Customer-side and vendor-side are symmetric.** Same trust model, same
   key discipline, same UX class.
4. **The protocol runs even if Voyager-the-business vanishes.**
5. **Payments are Lightning.** No on-chain commitment for routine commerce.

---

## 1. Layers

```
┌─────────────────────────────────────────────────────────┐
│                    PROTOCOL LAYER                       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  nostr relays (public commons, M≥4)             │   │
│  │  event kinds 30402, 30017, 1059, 14, 38383      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Lightning Network (P2P HTLCs; listbelow)       │   │
│  │  invoices, hodl invoices, NWC (NIP-47)          │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                       ▲
                       │
┌──────────────────────┴──────────────────────────────────┐
│                  REFERENCE CLIENTS                       │
│                                                          │
│  voyager-web (consumer)   │ browse/cart/order/pay/LN    │
│  vendor-seller-app        │ list/reply/fulfill/refund   │
│  voyager-mcp              │ agent lens (stateless)      │
│  voyager-idx              │ optional indexer (cache)    │
└──────────────────────────────────────────────────────────┘
                       ▲
                       │
┌──────────────────────┴──────────────────────────────────┐
│              USER-CONTROLLED WALLETS                     │
│                                                          │
│  Mutiny (web PWA)   │ self-custody LDK                  │
│  Alby Hub           │ self-custody node + NWC           │
│  Phoenix / Breez    │ mobile self-custody               │
│  Zeus + LND         │ power users                       │
└──────────────────────────────────────────────────────────┘
                       ▲
                       │
┌──────────────────────┴──────────────────────────────────┐
│             FIAT ↔ SATS PERIMETER (Mostro)               │
│                                                          │
│  Mostro nodes = federated solver set                    │
│  ─ voyager-mostro (ours, Caribbean-tuned)               │
│  ─ community nodes (anyone's)                           │
│  trades settle via hodl invoices; fiat moves P2P        │
└──────────────────────────────────────────────────────────┘
```

## 2. Roles

| Role                 | Who                                             | Custodian of?                                   |
| -------------------- | ----------------------------------------------- | ----------------------------------------------- |
| Customer             | any person with a nostr keypair + LN wallet     | their keys                                      |
| Vendor               | any person/entity with npub + LN node or wallet | their keys, listings storage                    |
| Relay operator       | anyone                                          | cached public events, briefly cached gift-wraps |
| Mostro node operator | anyone                                          | hodl-invoice arbiter with reputation at stake   |
| Voyager business     | us                                              | nothing protocol-critical                       |
| Indexer operator     | us or anyone                                    | derived cache, fully discardable                |
| MCP server operator  | us or anyone                                    | nothing; stateless                              |

## 3. Event kinds

| kind  | Type                         | Purpose                                      | Author                   | Encryption                 |
| ----- | ---------------------------- | -------------------------------------------- | ------------------------ | -------------------------- |
| 30402 | addressable, replaceable     | Product/service listing                      | vendor                   | public                     |
| 30017 | addressable, replaceable     | Vendor "stall" (storefront metadata)         | vendor                   | public                     |
| 1059  | gift-wrapped, encrypted blob | Sealed DM (order, terms, address, ramp-flow) | any                      | NIP-44 + gift-wrap         |
| 14    | encrypted DM inside 1059     | Order request / order response               | both                     | inner-signed               |
| 15    | file message (optional)      | shipping data / digital deliverable          | vendor                   | NIP-44                     |
| 38383 | addressable, replaceable     | Ramp intent + quotations                     | ramp user / mostro nodes | public quote, private flow |
| 30078 | addressable, replaceable     | (optional) vendor-side settings / NWC hints  | vendor                   | public                     |

**Why 38383:** Mostro already uses it. We conform.

## 4. Listing schema (kind:30402)

```json
{
  "kind": 30402,
  "pubkey": "<vendor npub>",
  "created_at": 1760000000,
  "content": "<human-readable description>",
  "tags": [
    ["d", "<stable uuid>"],
    ["title", "Fresh whole snapper"],
    ["price", "42000", "SATS"],
    ["price_alt", "25", "USD"],
    ["category", "seafood.fish"],
    ["location_hint", "Kingston, JM"],
    ["image", "<url or ipfs hash>"],
    ["shipping_zone", "caribbean"],
    ["delivery_method", "pickup|courier|digital"],
    ["duration_minutes", "120"]
  ]
}
```

Notes:

- `price` is in SATS; `price_alt` is informational (vendor's fiat-equivalent).
- quoting multiple fiat alts (`price_alt_JMD`, `price_alt_USD`, ...) is allowed.
- listings are **addressable** — `d` makes the listing updateable; clients should
  fetch the latest by `pubkey + d`.

## 5. Stall schema (kind:30017)

```json
{
  "kind": 30017,
  "pubkey": "<vendor npub>",
  "content": "<stall description>",
  "tags": [
    ["d", "<stall-uuid>"],
    ["name", "Isabel's Fish"],
    ["currency", "SATS"],
    ["shipping", "[{zone: 'caribbean', cost_sats: 500}, ...]"]
  ]
}
```

## 6. Order flow (kinds 14 + 1059 wrapping)

### 6.1 Purchase-request (customer → vendor)

customer sends kind:14 message (rumor):

```json
{
  "kind": 14,
  "pubkey": "<customer npub>",
  "content": "{\"type\":\"order_request\",\"items\":[{\"d\":\"<listing-d>\",\"qty\":2}],\"delivery\":{\"name\":\"…\",\"addr\":\"…\",\"phone\":\"…\",\"notes\":\"…\"}}",
  "tags": [
    ["p", "<vendor-pubkey>"],
    ["e", "<listing-event-id>"]
  ]
}
```

…wrapped in NIP-17 gift-wrap (kind:1059 outer). Relay sees nothing identifying.

### 6.2 Order-accept (vendor → customer)

```json
{
  "type": "order_accept",
  "order_id": "sha256(request-rumor-id)",
  "invoice": "lnbc1...",
  "expires": 900,
  "terms": { "shipping_days": 3, "tracking": "optional" },
  "escrow": "none"
}
```

### 6.3 Payment-intent (customer wallet → vendor wallet, out-of-band)

customer's wallet pays BOLT11. This is Lightning-native; not in this spec's
event set beyond the receipt below.

### 6.4 Receipt (customer → vendor, optional but recommended)

```json
{
  "type": "payment_receipt",
  "order_id": "sha256(request-rumor-id)",
  "preimage_hash": "<sha256 of preimage>",
  "paid_at": "<unix>"
}
```

publication: usually kind:14 inside 1059; vendor stores this as their proof.

### 6.5 Fulfillment (vendor → customer)

```json
{
  "type": "fulfilled",
  "order_id": "...",
  "tracking": "...",
  "digital_payload_url": "(if any)"
}
```

## 7. The fiat ramp — Mostro federation

### 7.1 What a Mostro node is

A mostro node is an operator that offers to _arbitrate_ P2P fiat↔sats trades
using **Lightning hodl invoices** as the escrow substrate. The operator never
touches fiat. Sats briefly traverse the node's hold-invoice contract but the
node cannot unilaterally redirect them; it can only release or refund after
evidence.

Multiple operators exist. Customers (and this protocol) route among them.

### 7.2 Ramp intent (kind:38383 — signaling)

**Buyer of sats (uses fiat):**

```json
{
  "kind": 38383,
  "pubkey": "<customer npub>",
  "tags": [
    ["d", "<unique-intent-id>"],
    ["s", "buy"],
    ["amt", "50000", "SATS"],
    ["f", "JMD", "2500"],
    ["method", "payoneer|wise|cash-deposit|khipu|beforward"],
    ["expires", "1800"]
  ]
}
```

**Seller of sats:**
same shape with `s=sell`. Both sides can post; either party can initiate.

### 7.3 Quotation (Mostro node's response)

Each Mostro node that can fill the intent replies with kind:38383, `d=quote-id`,
and a `ref=<intent-id>` tag:

```json
{
  "kind": 38383,
  "pubkey": "<mostro-node-pubkey>",
  "tags": [
    ["d", "<quote-id>"],
    ["ref", "<intent-id>"],
    ["fee_sats", "500"],
    ["maker_pubkey", "<peer-seller npub>"],
    ["method", "..."],
    ["rate_sats_per_jmd", "..."],
    ["reputation", "<score>"]
  ]
}
```

### 7.4 Selection

The customer's bridge:\*\*

- aggregates quotes from all reachable Mostro nodes
- ranks by `(effective_rate, fee, node_reputation, method_match)`
- presents top 3 to user
- user picks; customer's client then negotiates directly with that node in
  kind:1059 to start the trade.

### 7.5 Trade execution (per Mostro's existing convention)

```
1. customer pays a hodl-invoice to the chosen Mostro node for
   (amount + node_fee) — invoice stays unpaid pending preimage.
2. node publishes order details + the peer-maker's pubkey to itself.
3. node's arbiter assigns the peer; peer's fiat-receive instructions
   delivered to customer via kind:1059.
4. customer pays fiat P2P (bank transfer / cash deposit / Wise / etc.).
5. peer confirms receipt (their client posts ack, node's arbiter validates).
6. node releases the preimage → customer's LN wallet receives the sats.
7. node takes its fee in-line at settlement.

dispute:
   either party flags; node-arbiter collects evidence, decides
   release / refund; node takes no principal either way.
```

### 7.6 Node operators

anyone can run a Mostro node. Operational requirements we care about:

- an LN node with outbound capacity + hodl-invoice support
- a nostr keypair and a relay
- an arbiter process (can be a human via CLI at first; agent later)
- a public rule-set: fees, supported fiat methods, jurisdiction preferences,
  arbitration policy

**Voyager's node**: voyager-mostro, tuned for Caribbean:

- fiat currencies: JMD, TTD, BBD, XCD, GYD, HTG, BSD
- fiat rails: bank transfer, Wise, Remitly, MoneyGram, JN Money, cash
  deposit at major retail chains, mobile money top-up
- arbitration SLA: <24h on mon-fri
- fee: 0.3% (vs typical 0.5-1.0%)
- reputation accumulation: visible score on voyager-idx

This is a normal for-profit line item alongside voyager-idx's hosting.

## 8. Wallets and NWC

Both `voyager-web` and `vendor-seller-app` use **NWC (NIP-47)** to talk
to the user's wallet:

```
frontend ── (NWC URI, nostr DM) ──> user's wallet anywhere
```

The URI is one-time-paste. Budget-scoped. Revocable. Neither frontend ever
has the user's spend authority; they "ask politely" via relays.

## 9. Relay set

Default bootstrap (since resolver shouldn't be a single point of failure):

```
relay.damus.io
nos.lol
relay.nostr.band
voyager-relay
nostr.wine
```

Clients fan subscriptions across ≥3 of these. Each client's relay list is
config-persisted locally; users can add/remove.

## 10. Recoery / migration

- user's full state = their nostr keypair + their NWC URI. Both portable.
- lost device → restore via `nsec` (and the wallet's own recovery flow)
- new device → paste nsec + scan NWC URI; you're back

no "account recovery" needed because no accounts exist.

## 11. EROI defense mapping

| Dimension   | Design move                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| F (fan-out) | Many relays; many Mostro nodes; many wallets; vendor-side data storage         |
| O (opacity) | NIP-17 gift-wrapped DMs; no KYC inside protocol; Lightning-chain opaque        |
| B (binding) | Every meaningful action requires local key; Mostro arb-can't-steal; NWC scoped |

**Profile: (3, 3, 3)** — matches rubric ceiling. See /home/tk/rubric/rubrics/eroi_defense_rubric.md.

## 12. Threat shake-out

| Threat                        | Mitigation                                                     |
| ----------------------------- | -------------------------------------------------------------- |
| One relay blocked             | 4+ in bootstrap; client rotates                                |
| Voyager-hosted infra seized   | protocol unaffected; reference clients still downloadable      |
| Mostro node colludes/evicts   | market discipline — customers route around; reputation visible |
| Customer's wallet compromised | that customer's funds — bounded per-customer, localized        |
| Vendor's npub compromised     | that vendor's listings — bounded; vendors can re-key +         |
| indicate successor            |
| Geographic network block      | relays over Tor; Mostro nodes reachable via nostr              |
| Liquidity bootstrap           | voyager-mostro subsidizes early trades                         |

## 13. What we explicitly did NOT solve

- long-horizon dispute precedence across Mostro nodes (it's per-node)
- money-laundering at the fiat perimeter (that's the onramp's
  thing, off-protocol)
- automated credit / underwriting / BNPL — requires data the protocol refuses to keep
- AMM-style instant fiat↔sats swap (Mostro is a market-maker flow; AMM
  is out of scope for v1)

## 14. Reference client scope (alpha)

Minimum viable public drop:

- [ ] `voyager-web` — listing-browser + cart + NWC pay
- [ ] `vendor-seller-app` — list/reply/fulfill
- [ ] `voyager-idx` — optional indexer
- [ ] `voyager-mostro` — our Caribbean-tuned node, single operator policy
- [ ] `voyager-relay` — just a bootstrap relay, not authoritative
- [ ] Docs: end-user quick-start with Mutiny or Alby Hub

Optional in alpha, planned later:

- arbitration UX inside vendor-seller-app
- voyager-mcp agent lens
- iOS/Android wrapper (Capacitor)
- reputation-as-zap integration
