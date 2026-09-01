# Voyager MCP — Strategy and Implementation Paper

Status: working draft
Layer: strategic + technical specification
Audience: Voyager operators, vendors evaluating listing on Voyager Pay,
AI-agent platform integrators

Companion to /home/tk/voyager/VOYAGER_PROTOCOL.md (v3) and
/home/tk/voyager/EXTENSIBILITY_TAGS_THESIS.md (v3.1).

This document defines voyager-mcp: an MCP server that exposes the
Voyager Pay marketplace to AI agents, and a syndication model that
turns every vendor listing into agent-discoverable inventory across
the agentic web.

---

## 0. The strategic bet

AI agents are becoming a primary buyer-side surface. Today's a user
asks ChatGPT or Claude to find lodging in Negril; tomorrow's an
agent shops, compares, books, and pays on the user's behalf with
minimal supervision.

A vendor listed on Voyager Pay becomes **agent-discoverable** with no
extra work. The vendor does not build an API. The vendor does not
register with OpenAI, Anthropic, or any agent platform. The vendor
publishes a kind:30402 event on nostr, and voyager-mcp turns that
into an MCP server that any compliant agent host can connect to.

This is the white-label win: **list once, appear everywhere**. The
MCP server is the syndication surface.

---

## 1. What voyager-mcp is

voyager-mcp is a **stateless MCP server**. It exposes Voyager Pay's
public listings as MCP primitives:

- **Resources** — listing documents, vendor stalls, ramp quotes
- **Tools** — `search_listings`, `get_listing`, `quote_fiat`,
  `initiate_order`, `check_order_status`
- **Prompts** — reusable agent workflows: "find lodging under X
  sats/night with check-in Y", "compare tours", "quote a ramp"

The server holds no customer state. It holds no vendor data beyond
what's already public on relays. It is a _lens_, not a database.

This matches the existing protocol doc: §2 Roles already lists
"MCP server operator — nothing; stateless" and §14 lists voyager-mcp
as an optional alpha component.

---

## 2. Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  AGENT HOSTS                             │
│  Claude Desktop, ChatGPT, custom agents, IDE plugins    │
│  any MCP-compliant client                                │
└────────────────────────┬────────────────────────────────┘
                         │ MCP (JSON-RPC over HTTPS / stdio)
┌────────────────────────▼────────────────────────────────┐
│                  voyager-mcp                              │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Relay reader (subscribes to kind:30402, 30017,  │    │
│  │  38383 across ≥3 nostr relays)                   │    │
│  │  in-memory projection → vector index + filterable │    │
│  │  structured index                                  │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Tools layer (search, get, quote, initiate, poll) │    │
│  │  ─ signs outbound messages on behalf of customer │    │
│  │    when explicitly authorized (NWC delegation)    │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Prompts layer (reusable agent workflows)         │    │
│  └─────────────────────────────────────────────────┘    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│         NOSTR RELAYS + LIGHTNING (unchanged)              │
│  Voyager Pay substrate. The MCP server is a read lens     │
│  + a write delegate, nothing more.                        │
└──────────────────────────────────────────────────────────┘
```

### What voyager-mcp reads

- kind:30402 — listings
- kind:30017 — vendor stalls
- kind:38383 — ramp quotes (for the fiat-conversion tool)
- kind:14 (inside 1059 gift-wraps) — only the customer's own DMs,
  never anyone else's (privacy invariant)

### What voyager-mcp writes

Only on behalf of an authorized user:

- kind:14 (inside 1059) — order requests to vendors
- kind:38383 — ramp intent, when a user asks to convert fiat to sats

Both require NWC delegation: the user pastes an NWC URI into the
agent host, the agent host forwards payment operations through
NWC, the user's wallet signs and broadcasts. **The MCP server never
holds keys.**

---

## 3. The MCP tool surface

### 3.1 `search_listings`

Input:

```json
{
  "query": "fresh fish Kingston",
  "category": "seafood.fish",
  "price_max_sats": 50000,
  "shipping_zone": "caribbean",
  "v_namespace": "voyager.listing.v1"
}
```

Output: array of listing summaries, ranked by relevance + freshness.

### 3.2 `get_listing`

Input: `event_id` or `vendor_pubkey + d`.
Output: full listing event with all `v`-namespaced tags.

### 3.3 `quote_fiat`

Input: `amount_sats`, `fiat_currency`, `preferred_method`.
Output: top 3 Mostro quotes (kind:38383) ranked by `(effective_rate,
fee, reputation)`. Mirrors protocol §7.4.

### 3.4 `initiate_order`

Input: `listing_event_id`, `quantity`, `delivery_address`,
`payment_authorization` (NWC reference).

Output: order request (kind:14 in 1059) sent to vendor; returns
`order_id`. The vendor replies with a BOLT11 invoice; the customer
pays it; the customer wallet broadcasts a payment_receipt to the
vendor.

### 3.5 `check_order_status`

Input: `order_id`.
Output: status (requested / accepted / paid / fulfilled / disputed).
Reads vendor replies from the customer's gift-wrapped DM stream.

---

## 4. The prompts surface

Reusable agent workflows. Examples:

### `find_lodging`

```
Find lodging matching these constraints:
- check_in: {date}
- check_out: {date}
- guests: {n}
- max_price_per_night_sats: {n}
- v_namespace: voyager.accommodation.v1

Filter and rank candidates. Present top 3 with price, location,
unit_type. Ask the user which to inspect.
```

### `compare_vendor_options`

```
Compare these {n} listings across:
- total cost in sats
- shipping/availability
- vendor reputation (last 30 days of fulfilled orders)
- supported fiat methods (if user wants to ramp in)

Output: ranked table.
```

### `quote_and_pay`

```
Quote the user's {amount} {fiat} → sats ramp.
Show top 3 Mostro quotes.
On user selection, initiate ramp via the chosen node's standard flow.
```

---

## 5. The syndication model — how vendors appear everywhere

### 5.1 The single registration step

A vendor publishes one kind:30402 event. That event is on the
nostr relay set the moment it's signed. voyager-mcp's relay reader
picks it up within the relay's propagation window.

### 5.2 Many MCP surfaces, one source of truth

Anyone can run voyager-mcp. The protocol doesn't gatekeep. Possible
deployments:

- **voyager-mcp (us)** — the canonical public instance, indexed
  across the bootstrap relay set. Free to use, rate-limited.
- **Specialized instances** — `voyager-mcp-caribbean`, `voyager-mcp-
seafood` — operators run their own relay subset + indexing policy.
- **Vendor-hosted** — a vendor can run their own MCP server that
  reads only their own listings and presents them as if they were
  the marketplace. The agent host sees one MCP server; behind it is
  a single vendor's nostr feed.
- **Aggregator-hosted** — third parties (travel blogs, concierge
  services, AI startups) can run MCP servers that re-index Voyager
  listings filtered to their niche.

### 5.3 The vendor's white-label win

A vendor who lists a fish stall on Voyager Pay automatically becomes
agent-discoverable across:

- The canonical voyager-mcp instance
- Any specialized instance that filters on their category
- Any agent host whose user adds any one of these MCP servers

The vendor did not integrate with OpenAI. The vendor did not write
an API. The vendor published a kind:30402 event. The syndication
network is the protocol.

### 5.4 The relay economics

voyager-mcp instances compete on:

- **Coverage** — how many relays they subscribe to
- **Latency** — relay refresh interval
- **Filtering quality** — how well they rank and surface listings
- **Prompts quality** — what reusable workflows they expose

This is a normal hosting business. The protocol substrate is free;
the curated lens is the product.

---

## 6. Discovery — how agents find voyager-mcp

### 6.1 Listing the server

MCP servers are discoverable via the MCP registry (forthcoming) or
via direct URI paste. voyager-mcp ships a public endpoint:

```
https://mcp.voyager.marketplace/sse   (production)
```

Agents connecting here get the full tool + prompt surface.

### 6.2 Self-description

The server returns a `server_info` listing its primitives. An agent
host that connects automatically knows what's available. This is
the MCP discovery model: no upfront prompt engineering.

### 6.3 The vendor self-hosted case

A vendor running their own MCP server publishes its URL wherever
agents look — the MCP registry, their website, a `.well-known/mcp`
endpoint. Agents that add the vendor's server see only that
vendor's listings, branded as the vendor.

---

## 7. Privacy and the EROI invariants

| Invariant           | How voyager-mcp respects it                                               |
| ------------------- | ------------------------------------------------------------------------- |
| No custody          | MCP holds no keys, no balances, no payment authority                      |
| No identity         | The server never requires a customer identity; reads public listings only |
| Symmetric           | Customer and vendor tools have the same trust model                       |
| Voyager-vanish-safe | MCP is one of N runnable instances; ours is canonical but not unique      |
| Lightning           | All payments route through the user's wallet, not the MCP server          |

The MCP server **cannot**:

- spend a user's funds (NWC-scope limits)
- read other users' gift-wrapped DMs (no relay-side deanonymization)
- impersonate a vendor (kind:30402 events are signed by vendor npub)
- censor a listing (relay fan-out means another relay has it)

---

## 8. Implementation phases

### Phase 0 — Spec freeze (this document)

Land the paper. Get vendor feedback on the tool surface. Get agent-
host feedback on the discovery model.

### Phase 1 — Reference implementation

- TypeScript MCP server using `@modelcontextprotocol/sdk`
- Relay reader using `nostr-tools`
- In-memory projection + a small SQLite-backed index
- All five tools from §3, two of the three prompts from §4
- Public deployment at `mcp.voyager.marketplace`
- Open-source under MIT

### Phase 2 — Vendor self-host

- Dockerfile + docker-compose
- One-config relay list
- Vendor-branded landing page generator

### Phase 3 — Specialized instances

- A second instance at `mcp.caribbean.voyager.marketplace`
- Indexing policy: Caribbean relays only, Caribbean vendors only
- Compare tool against canonical instance

### Phase 4 — Prompts marketplace

- Allow convention authors to publish prompts alongside their
  `voyager.*.v1` conventions
- Example: the author of `voyager.accommodation.v1` also ships a
  `find_pet_friendly_lodging` prompt that uses their fields

### Phase 5 — Agent-host integrations

- Partnerships / first-class support with Claude Desktop, ChatGPT
  custom GPTs, Cursor, etc.
- Documentation per host

---

## 9. Risks

| Risk                                    | Mitigation                                                                         |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| MCP server is a single point of failure | Anyone can run one; we document the spec; we ship reference                        |
| Vendor abuse (spam listings)            | Reputation layer via zaps + fulfilled-order count; community moderation            |
| Agent hosts misinterpret listings       | Convention docs are precise; vendors self-test through MCP before publishing       |
| Nostr relay outage degrades MCP         | Multi-relay fan-out; degraded mode shows staleness; cached projections             |
| Vendor's npub compromised               | Same as protocol: bounded to that vendor, recovery via re-key + successor pointer  |
| Operator centralizes discovery          | MCP registry is one path; direct URI paste is another; vendor self-host is a third |

---

## 10. Why this beats building an API

Every existing agentic-commerce approach makes the merchant build
an integration: register with OpenAI, write a plugin, expose
endpoints. That's the App Store model.

Voyager-mcp inverts this: **the merchant publishes a signed event
on a public commons. The syndication layer finds the agents.**

This is the same inversion that made nostr a publishing primitive
rather than a Twitter competitor. We didn't build "Twitter on
nostr"; we built "publishing on nostr," and Twitter-killers fell out.

Here we don't build "OpenAI marketplace on nostr"; we build
"marketplace syndication on nostr," and AI discovery falls out.

---
