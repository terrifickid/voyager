# /build page — SDK-conformant rewrite

## Goal

Rewrite `voyager/src/routes/build/+page.svelte` so every claim about the SDK matches the actual implementation in `terrifickid/voyager-sdk` (`master`, MIT, single ESM file, 14 verbs, no AI, no telemetry, no keygen).

## Authoritative source

The SDK is the spec. Files used:

- `voyager-sdk/README.md` — public API surface, install, quick start
- `voyager-sdk/SDK_MVP_DESIGN.md` — design contract, cross-cutting decisions
- `voyager-sdk/package.json` — `name: "voyager-sdk"`, `main: "./voyager.js"`, `type: "module"`, deps `@noble/curves` + `@noble/hashes`, engines `node >= 22`

## Drift the current page has (must be fixed)

1. **Package name**: page says `npm i @voyager/sdk` and `import { voyager } from "@voyager/sdk"`. Real is `npm i voyager-sdk` and `import * as voyager from "voyager-sdk"`.
2. **Invented API in code snippet** (`build/+page.svelte:40-47`):
   - `voyager.identity.create()` — does not exist
   - `voyager.pay.invoice(bolt11)` — does not exist; SDK has no invoice-payment verb
   - `voyager.pay.quote("JMD", 5000)` — does not exist; the SDK's quote verb is `voyager.rampQuote(intentOrId, quote, sk)` on kind 38383
   - `voyager.listing.create({kind: 30402, title, region})` — wrong; real is `voyager.listing(input, sk)` where `input` is `{d, title, price: [amount, unit], v?, ...}`
   - `voyager.dm.send(toNpub, {orderId, terms})` — wrong; real is `voyager.dmSend(toNpub, payload, sk, {relays, dryRun?})` (NIP-17)
3. **"An in-browser AI agent that runs across all five primitives"** (`build/+page.svelte:30, 56`) — contradicts SDK README ("Lean. No AI. No telemetry.") and design doc ("No MCP / AI anything"). Delete.
4. **"Five primitives, ten calls"** (`build/+page.svelte:73`) — counts don't match real SDK (14 verbs in design doc). Reframe around the real surface.
5. **"Python and Go when there's demand"** (`build/+page.svelte:54`) — design doc ships a single ESM file, no language ports. Delete.
6. **"TypeScript today"** — true; the SDK is ESM/TypeScript-friendly but ships `.js`. Keep but soften to "JavaScript today (TypeScript-ready)."
7. **"Host a web app, a Node service, or a serverless function"** (`build/+page.svelte:55`) — compatible (Node 22+ has native `WebSocket`/`fetch`), keep.
8. **No `voyager.config({defaultRelays, timeout})` anywhere on the page** — this is the setup the README puts front-and-center and must appear in the get-started snippet.
9. **No `voyager.demoKey()` / `voyager.fromNsec()` story** — must surface the user-brings-the-key security boundary (per user decision).
10. **"No telemetry, no required attribution"** (`build/+page.svelte:54, 68`) — compatible, MIT, no telemetry is true. Keep.

Sections that reference the SDK API in prose (and so must be checked):

- `build/+page.svelte:73` — list of verbs to refresh from the real 14.
- `build/+page.svelte:93` — "Reference Mostro node. 0.3% fee on Caribbean rail trades" is a business claim about Voyager-the-business, not SDK API. Leave intact.

Sections that are platform/business claims, not SDK API (leave intact unless wording drifts):

- Hero headline + lede (`build/+page.svelte:13-23`)
- Economics section (`build/+page.svelte:82-108`)
- Regulatory posture section (`build/+page.svelte:111-131`)
- "Join the alpha" CTA (`build/+page.svelte:134-148`)

## Target rewrite — section by section

### 1. Hero (`build/+page.svelte:13-23`)

Keep current headline and lede — they make platform claims, not SDK claims. No edit.

### 2. Get started (currently `build/+page.svelte:25-60`) — full rewrite

Eyebrow: `// the SDK`
Title: `Get started in one import.`
Lede: `Nostr-native. Lean. ~500 lines in one ESM file. The SDK hides the wire format and the relay fan-out. You bring the keys.`

**Code panel** — replace the current `<pre>` block with this literal content (the install + config + first events from the README quick start, trimmed):

```
// install: npm i voyager-sdk
import * as voyager from "voyager-sdk";

// Configure once at app entry
voyager.config({
  defaultRelays: ["wss://relay.damus.io", "wss://nos.lol", "wss://relay.nostr.band"],
  timeout: 10000,
});

// Bring your own key (nsec from a hardware signer, NIP-46 remote signer, etc.)
const me = await voyager.fromNsec("nsec1...");

// Or for SDK exploration only — refuses to run in production:
const me = await voyager.demoKey();

// Build + sign a listing (kind 30402)
const listing = await voyager.listing(
  { d: "snapper-001", title: "Fresh whole snapper", price: ["42000", "sats"] },
  me.nsec
);

// Publish (first-OK across relays) or read (fan-out + dedup)
await voyager.publish(listing);
const listings = await voyager.listings({ author: someVendorNpub });

// Subscribe live
voyager.on({ kinds: [30402], authors: [someVendorNpub] }, (ev) => {
  console.log("new listing:", ev);
});

// NIP-17 gift-wrapped DM
await voyager.dmSend(recipientNpub, { type: "order_request", items: [...] }, me.nsec);
```

**"What you get" sidebar** — replace the bullet list (`build/+page.svelte:50-58`) with:

- One ESM file, ~500 lines. Zero runtime deps (relies on `@noble/curves` + `@noble/hashes`).
- MIT. No telemetry. No required attribution.
- JavaScript today, TypeScript-ready. Runs in Node 22+ and any modern browser.
- Web app, Node service, or serverless function. No daemon, no relay pool.
- User-brings-the-key. SDK does not generate keys — hardware signers and NIP-46 remote signers integrate cleanly.

### 3. "What's inside" two-up panel (`build/+page.svelte:62-79`) — refresh copy

Left panel (current):

- Eyebrow `// the SDK`
- Title: `Unified surface.`
- Body: keep, but soften "hides the keys" → "hides the wire format and the relay fan-out" (the SDK does not hide keys; the user brings them).

Right panel (current):

- Eyebrow `// what's inside`
- Title: replace "Five primitives, ten calls." with `Four substrates, fourteen verbs.`
- Body: replace invented verb list with the real groups: `identity (demoKey, fromNsec), signing (sign, verify, eventId), listings & stalls (30402, 30017), DMs (NIP-17), ramp (38383 intent + quote). Relay transport is config + publish + get + on. That is most of what builders need. The rest is configuration, not new API.`

### 4. Add: Keys come from the user, not the SDK (new section between "What's inside" and "Economics")

Rationale: user explicitly chose to surface the SDK's no-keygen security boundary.

Eyebrow: `// key model`
Title: `You bring the key. The SDK never holds it.`
Lede: `Hardware signer. NIP-46 remote signer. nsec paste. The SDK parses, validates, and signs. It does not generate, store, or export.`

Body card (single paragraph each, same shape as the Regulatory section):

- **No keygen.** The SDK refuses to invent an identity for you. `voyager.fromNsec('nsec1…')` is the only production path; keys live wherever the user keeps them.
- **A shared demo key, refused in production.** `voyager.demoKey()` exists so the first 30 minutes of poking the API doesn't require a wallet. It throws `VoyagerError('DEMO_KEY_DISABLED')` when `NODE_ENV === 'production'` or the hostname matches a production pattern.
- **One signing call.** `voyager.sign(template, sk)` produces a canonical Nostr event; `voyager.verify(event)` checks it. No remote signer handshake in the SDK — that's the integrator's job (NIP-46 bunker, hardware wallet bridge).

### 5. Add: Verb reference (new compact section after "Key model")

Eyebrow: `// the surface`
Title: `Fourteen verbs. Grouped by area.`
Lede: `Pass-through for raw event shape. Parse-on-read. Fan-out reads. Real-time on().`

Two-column grid (or compact `<dl>`) listing every verb from `voyager-sdk/README.md`, grouped:

- **Identity** — `demoKey()`, `fromNsec(nsec)`
- **Signing & verification** — `sign(template, sk)`, `verify(event)`, `eventId(event)`, `serializeEvent(event)`
- **Listings (kind 30402)** — `listing(input, sk)`, `updateListing(d, patch, sk)`, `listings({relays, author, d, kinds, timeout})`
- **Stalls (kind 30017)** — `stall(input, sk)`, `updateStall(d, patch, sk)`, `stalls({relays, author, timeout})`
- **DMs (NIP-17)** — `dmSend(toNpub, payload, sk, {relays, dryRun?})`, `dmOpen(giftwrap, recipientSk)`, `dmInbox(recipientSk, {relays, since, until, limit})`
- **Ramp (kind 38383)** — `rampIntent({side, amt, fiat, method?, z?}, sk)`, `rampQuote(intentOrId, quote, sk)`, `rampQuotes({intentId, relays, timeout})`
- **Relay transport** — `publish(relay | relays, event)`, `get(relay | relays, filter)`, `on(filter, callback)` → `unsub()`, `config({defaultRelays, timeout})`
- **Misc** — `parse(event)`, `npubEncode(pubBytes)`, `nsecEncode(skBytes)`, `VoyagerError` (typed error with `.code`)

CTA: `Read the SDK on GitHub` → `https://github.com/terrifickid/voyager-sdk` (open in new tab). Existing `Cta variant="primary" href="/docs"` becomes secondary `Read the docs`.

### 6. Economics, Regulatory posture, Join the alpha — no edits

These reference `pay.invoice` / `listing.create` only through the fabricated snippet, not in their prose. Keep verbatim.

## Out of scope (flag, do not edit in this pass)

The same invented-API drift lives on:

- `voyager/src/routes/+page.svelte:343, 383-397` — homepage hero code block uses `voyager.identity.create()`, `voyager.pay.invoice(bolt11)`, `voyager.pay.quote(...)`, `voyager.listing.create(...)`, `voyager.dm.send(...)`. Mentions "in-browser AI agent" (`+page.svelte:343`).
- `voyager/src/routes/stack/+page.svelte:45, 63` — "in-browser AI agent lives across all five primitives" prose.
- `voyager/src/routes/docs/+page.svelte:65` — "How the in-browser AI agent fits."

Leave these untouched in this pass; the user asked for `/build` only. Note them in the plan as follow-up work.

## Files touched

- `voyager/src/routes/build/+page.svelte` — single file rewrite, replacing lines 25-79 (get-started + what's-inside), inserting a new "Key model" section and a new "Verb reference" section before the existing Economics section. Lines 1-23 (imports + hero) and 82-148 (Economics, Regulatory, Alpha CTA) preserved.

## Validation

1. `npm run lint` (per AGENTS.md — confirm the script exists; if not, ask before adding).
2. `npm run build` — must succeed; verifies the Svelte template still parses after the snippet replacement.
3. Visual smoke: `npm run dev`, hit `/build`, confirm:
   - Code panel renders the real SDK snippet; no invented verbs appear anywhere on the page.
   - "In-browser AI agent" string is absent.
   - "Five primitives, ten calls" is absent.
   - "Python and Go" is absent.
4. Grep guard:
   - `rg -n "voyager.identity.create|voyager.pay.invoice|voyager.pay.quote|voyager.listing.create|voyager.dm.send|@voyager/sdk|in-browser AI agent|Python and Go" voyager/src/routes/build/+page.svelte` → must return zero matches.
   - `rg -n "voyager-sdk|fromNsec|dmSend|rampIntent|listings\(\{|on\(\{kinds" voyager/src/routes/build/+page.svelte` → must return matches.

## Open questions

None blocking. Decision taken in chat:
- Full conformant rewrite (drop AI framing, restructure around real verbs).
- Make the no-keygen security boundary explicit (new "Key model" section).

Follow-up that is intentionally out of scope: same drift on `/`, `/stack`, `/docs` — file as a separate plan if/when the user asks.