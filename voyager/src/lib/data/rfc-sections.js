/**
 * Voyager — Protocol RFC content as structured data.
 *
 * Source: https://github.com/terrifickid/voyager-sdk/blob/master/VOYAGER_RFC.md
 * Upstream commit recorded when this file was last updated: see VERSION below.
 *
 * This file is hand-maintained. When updating from upstream:
 *   1. Fetch the raw RFC from GitHub.
 *   2. Update `meta` if front-matter changed.
 *   3. Update or append to the `sections` array.
 *   4. Bump VERSION below and the committed sha hash.
 *
 * HTML in each `body` is hand-authored from Markdown. Treat it as the
 * canonical source of truth for what is rendered on /build/rfc.
 *
 * Authoring conventions:
 *   - `level: 2` sections render as <h2 id={id}>; level 3 as <h3>.
 *   - The first h2 in each section body is omitted because `title` is
 *     rendered by the page loop (heading hierarchy is then h2 for
 *     top-level sections, h3 for sub-sections, etc.).
 *   - Code blocks use <pre><code class="language-...">…</code></pre>.
 *   - ASCII diagrams use <pre class="ascii">…</pre> for monospace art.
 *   - Inline code uses <code>…</code>.
 *   - Strong emphasis uses <strong>…</strong>.
 */

export const VERSION = '0.4.0';
export const SOURCE_URL =
	'https://github.com/terrifickid/voyager-sdk/blob/master/VOYAGER_RFC.md';
export const SOURCE_SHA = 'master';

/**
 * Front-matter from the RFC, lifted into the hero meta strip.
 */
export const meta = {
	series: 'voyager',
	type: 'Standard Track',
	status: 'DRAFT (target: PROPOSED after alpha build)',
	version: '0.4.0',
	replaces: 'VOYAGER_PROTOCOL.md (v3) and EXTENSIBILITY_TAGS_THESIS.md (v3.1)',
	created: '2026-09-04',
	layer: 'application protocol (runs over Nostr + Lightning + Mostro)',
	audience: 'implementers, auditors, operators'
};

/**
 * Top-level sections of the RFC, in source order.
 * Appendices are rendered last, after the change-log.
 *
 * @type {Array<{ id: string, level: 2 | 3, title: string, body: string }>}
 */
export const sections = [
	{
		id: 'design-invariants',
		level: 2,
		title: '0. Design invariants',
		body: `
<p>These five invariants are non-negotiable. Every normative statement in this RFC preserves all five; any proposed change that violates one is out of scope and MUST be rejected on those grounds alone.</p>
<p><strong>I-1 &nbsp; No custody anywhere in the protocol layer.</strong> No actor in the protocol, including any reference implementation, holds a user's funds at any time or for any duration longer than a Lightning HTLC's cryptographic lifetime.</p>
<p><strong>I-2 &nbsp; No identity beyond a keypair is required.</strong> A user is a Nostr keypair. Nothing more. Email, phone, password, "account", or any other identifier is OPTIONAL and entirely outside the protocol.</p>
<p><strong>I-3 &nbsp; Customer-side and vendor-side are symmetric.</strong> The same key discipline, the same trust model, the same UX class. There is no special "merchant" class.</p>
<p><strong>I-4 &nbsp; The protocol runs even if Voyager-the-business vanishes.</strong> Every normative behavior in this RFC is achievable by independent operators using independent infrastructure. Voyager-the-business runs reference implementations; it does not run the protocol.</p>
<p><strong>I-5 &nbsp; Payments are Lightning.</strong> On-chain Bitcoin transactions are out of scope for routine commerce in this RFC. Hodl invoices are the canonical escrow primitive for the fiat ramp.</p>
`
	},
	{
		id: 'architecture',
		level: 2,
		title: '1. Architecture and layer model',
		body: `
<p>Voyager is a four-layer system. Implementations MUST treat layers below them as black boxes; layers above treat Voyager as a black box.</p>
<pre class="ascii">+--------------------------------------------------------------+
|  APPLICATION LAYER                                           |
|   - reference clients (voyager-web, vendor-seller-app)       |
|   - third-party apps built on @voyager/sdk                   |
|   - MCP server (voyager-mcp; AI agents consume protocol)     |
+--------------------------------------------------------------+
                          |
                          v
+--------------------------------------------------------------+
|  SDK LAYER  (@voyager/sdk)                                   |
|   - identity, event signing, gift-wrap, NWC, ramp quotes,    |
|     listing search, DM send/receive                          |
|   - lean, deterministic, crypto-native, NO AI inside         |
+--------------------------------------------------------------+
                          |
                          v
+--------------------------------------------------------------+
|  PROTOCOL LAYER  (this RFC)                                  |
|   - event kinds 30402, 30017, 14, 1059, 38383                |
|   - tag grammar, v-tag conventions, state machines           |
+--------------------------------------------------------------+
                          |
                          v
+--------------------------------------------------------------+
|  TRANSPORT LAYER                                             |
|   - Nostr relays (NIP-01) for event forwarding               |
|   - Lightning Network (BOLT-11, BOLT-04 hodl) for value      |
|   - Mostro nodes for fiat&lt;-&gt;sats arbitration                 |
+--------------------------------------------------------------+</pre>
<h3 id="architecture-layer-rules">1.1 Layer rules</h3>
<ul>
  <li>L4 (transport) is defined by existing specifications (NIP-01, NIP-17, NIP-44, NIP-47, BOLT-11, BOLT-04, and the Mostro protocol). This RFC REFERENCES those specs but does not redefine them.</li>
  <li>L3 (protocol) is what this RFC defines.</li>
  <li>L2 (SDK) is what §14 defines as the contract.</li>
  <li>L1 (application) is not specified; reference clients are listed in §15.</li>
</ul>
<h3 id="architecture-ai-mcp">1.2 The AI/MCP boundary (informative)</h3>
<p>The MCP server and any AI/ML consumer (WebLLM, hosted LLM, agent framework) lives in L1 (application). The SDK (§14) MUST NOT depend on, embed, or assume the presence of any AI runtime. AI consumers call the SDK through the same surface as human-driven clients. This keeps the SDK small, auditable, and embeddable in environments where loading a multi-GB WASM model is unacceptable.</p>
<pre class="ascii">WebLLM (in-browser or local)            &lt;-- L1, OPTIONAL
    |
    v calls MCP
voyager-mcp server                      &lt;-- L1, OPTIONAL
    |
    v uses
@voyager/sdk                            &lt;-- L2, REQUIRED for conformance
    |
    v uses
nostr relays + lightning + mostro       &lt;-- L4</pre>
`
	},
	{
		id: 'roles-threat',
		level: 2,
		title: '2. Roles and threat model',
		body: `
<h3 id="roles">2.1 Roles</h3>
<table>
  <thead>
    <tr><th>Role</th><th>Defined as</th><th>Custodian of</th></tr>
  </thead>
  <tbody>
    <tr><td>User</td><td>Holder of a Nostr keypair</td><td>Their own private key</td></tr>
    <tr><td>Customer</td><td>A user buying a listing</td><td>Nothing protocol-relevant</td></tr>
    <tr><td>Vendor</td><td>A user publishing listings</td><td>Their listings; their NWC budget</td></tr>
    <tr><td>Relay operator</td><td>Anyone running a NIP-01 relay</td><td>Cached public events, briefly cached gift-wraps</td></tr>
    <tr><td>Mostro node operator</td><td>Anyone running a Mostro daemon</td><td>Hodl-invoice arbiter with reputation at stake; never fiat</td></tr>
    <tr><td>Indexer operator</td><td>Anyone running voyager-idx or compatible</td><td>Derived cache; fully discardable</td></tr>
    <tr><td>MCP server operator</td><td>Anyone running voyager-mcp</td><td>Nothing; stateless</td></tr>
    <tr><td>Voyager-the-business</td><td>A particular operator that publishes this RFC and reference code</td><td>Nothing protocol-critical</td></tr>
  </tbody>
</table>
<p>A single legal person MAY hold multiple roles. The protocol does not prevent this; clients SHOULD display provenance so users can make informed choices.</p>
<h3 id="adversary-classes">2.2 Adversary classes</h3>
<p>This RFC's threat model (§18) explicitly considers:</p>
<ul>
  <li><strong>A-1</strong> &nbsp; Single relay operator (malicious or compromised)</li>
  <li><strong>A-2</strong> &nbsp; Majority of relay operators in a client's bootstrap set</li>
  <li><strong>A-3</strong> &nbsp; A single Mostro node operator</li>
  <li><strong>A-4</strong> &nbsp; A regional network adversary (ISP-level blocking)</li>
  <li><strong>A-5</strong> &nbsp; A single jurisdiction (subpoena, seizure, regulation)</li>
  <li><strong>A-6</strong> &nbsp; An acquirer of Voyager-the-business</li>
  <li><strong>A-7</strong> &nbsp; An attacker who compromises a user's keypair</li>
  <li><strong>A-8</strong> &nbsp; An attacker who compromises a vendor's keypair</li>
</ul>
<p>The protocol is not designed to defend against A-2, A-7, or A-8 at the protocol layer — those are out of scope by invariant I-1 and I-2.</p>
`
	},
	{
		id: 'naming-terminology',
		level: 2,
		title: '3. Naming and terminology',
		body: `
<p>The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 (RFC 2119, RFC 8174) when, and only when, they appear in all capitals, as shown here.</p>
<ul>
  <li><strong>Addressable event</strong>: a Nostr event whose canonical identity is the tuple <code>(kind, pubkey, d-tag)</code>. Two events with the same tuple at later timestamps supersede earlier ones. See NIP-01 and NIP-33.</li>
  <li><strong>Convention</strong>: a document, identified by a <code>v</code>-namespaced tag, that defines the semantics of a set of fields. See §9.</li>
  <li><strong>Hodl invoice</strong>: a BOLT-11 invoice whose preimage is held but not released by the invoicing node until an out-of-band settlement decision. See BOLT-04.</li>
  <li><strong>Indexer</strong>: a service that subscribes to relays and exposes derived query APIs over the events it has seen.</li>
  <li><strong>Listing</strong>: a kind:30402 event.</li>
  <li><strong>NWC</strong>: Nostr Wallet Connect, NIP-47.</li>
  <li><strong>Rumor</strong>: an unsigned inner event inside a NIP-17 gift-wrap.</li>
  <li><strong>Substrate</strong>: the parts of the protocol this RFC defines.</li>
  <li><strong>Stall</strong>: a kind:30017 event.</li>
  <li><strong>User</strong>: any holder of a Nostr keypair; cf. Customer/Vendor.</li>
</ul>
`
	},
	{
		id: 'conformance-versioning',
		level: 2,
		title: '4. Conformance and versioning',
		body: `
<h3 id="conformance-levels">4.1 Conformance levels</h3>
<p>An implementation MAY claim conformance at one of the following levels:</p>
<ul>
  <li><strong>L1 — Producer</strong>: emits substrate events that validate against Appendix A and pass §17 test vectors.</li>
  <li><strong>L2 — Consumer</strong>: subscribes, parses, and renders substrate events including at least one convention per §9.</li>
  <li><strong>L3 — NWC</strong>: L2 + implements NIP-47 client and/or server.</li>
  <li><strong>L4 — Ramp</strong>: L3 + implements the kind:38383 ramp intent / quote / Mostro trade flow (§13).</li>
  <li><strong>L5 — Reference Client</strong>: ships a user-facing app that meets the UX baseline in §15.</li>
</ul>
<p>The reference SDK MUST be L4-conformant. Reference clients SHOULD be L5-conformant. Implementers MUST publish a conformance statement identifying which levels they meet and which conventions they recognize.</p>
<h3 id="protocol-version">4.2 Protocol version</h3>
<p>This document is <code>voyager-0.4.0</code>. Backward-incompatible changes to the substrate (event kinds, tag grammar, required fields) require a new major version. Backward-compatible additions (new optional tags, new conventions, new event kinds ≥ 30000) MAY ship in minor versions.</p>
<p>Conventions under §9 version independently as <code>voyager.&lt;name&gt;.v&lt;n&gt;</code>. See §9.5.</p>
`
	},
	{
		id: 'transport-nostr',
		level: 2,
		title: '5. Transport: Nostr events',
		body: `
<h3 id="event-signing">5.1 Event signing</h3>
<p>All Voyager events MUST be signed per NIP-01 using the same keypair that the user uses for normal Nostr activity. There is no "Voyager key".</p>
<h3 id="relay-selection">5.2 Relay selection</h3>
<p>Clients SHOULD maintain a list of ≥ 3 NIP-01 relays and SHOULD fan subscriptions across them. The default bootstrap set is RECOMMENDED to be:</p>
<pre><code>relay.damus.io
nos.lol
relay.nostr.band
nostr.wine</code></pre>
<p>Adding more relays is RECOMMENDED. Removing relays is OPTIONAL but SHOULD be done with care (single- or double-point-of-failure).</p>
<h3 id="event-persistence">5.3 Event persistence requirements</h3>
<p>Relays are not required to store any Voyager event type. Clients MUST treat any read as a cache and SHOULD publish to multiple relays to improve availability. Indexers (L4-role operators) MAY provide persistent storage; clients MUST NOT assume indexer data is canonical.</p>
<h3 id="forwarding-integrity">5.4 Forwarding integrity</h3>
<p>Relays MUST forward Voyager events even if they do not recognize the kind or any tag. This is consistent with NIP-01 ("relays SHOULD forward events with unknown kinds") and is required by §9 (conventions may be unrecognized by older clients).</p>
`
	},
	{
		id: 'transport-lightning',
		level: 2,
		title: '6. Transport: Lightning',
		body: `
<h3 id="invoices">6.1 Invoices</h3>
<p>Routine commerce in Voyager uses BOLT-11 invoices. There is no "Voyager invoice format" — Voyager reuses the Lightning invoice format.</p>
<h3 id="nwc">6.2 NWC</h3>
<p>Front-ends MUST use NIP-47 to talk to user wallets. The NWC URI is paste-once, revocable, budget-scoped, and per-app. Front-ends MUST NOT request or hold the user's seed or spend authority.</p>
<h3 id="hodl">6.3 Hodl invoices (ramp only)</h3>
<p>The fiat ramp (§13) uses BOLT-04 hodl invoices as the escrow substrate. The Mostro node operator generates the invoice; sats are LOCKED but not SETTLED until the operator releases the preimage (after fiat is confirmed) or refunds (after dispute resolution or expiry). The operator CANNOT redirect the sats; it can only release or refund.</p>
<h3 id="routing">6.4 Routing and liquidity</h3>
<p>Out of scope for this RFC. Implementers SHOULD use established Lightning routing practice; carriers of last resort MAY operate lightning routing nodes as a commercial service but MUST NOT be required by the protocol.</p>
`
	},
	{
		id: 'substrate-kinds',
		level: 2,
		title: '7. Substrate event kinds',
		body: `
<p>This section defines the substrate. Conventions (§9) attach to these kinds without modifying them.</p>
<h3 id="substrate-registry">7.1 Registry</h3>
<table>
  <thead>
    <tr><th>Kind</th><th>Type</th><th>Purpose</th><th>Encryption</th></tr>
  </thead>
  <tbody>
    <tr><td>30402</td><td>addressable, replaceable</td><td>Listing (product / service / experience)</td><td>public</td></tr>
    <tr><td>30017</td><td>addressable, replaceable</td><td>Stall (storefront / vendor profile)</td><td>public</td></tr>
    <tr><td>1059</td><td>gift-wrap (NIP-17)</td><td>Sealed DM transport</td><td>NIP-44 + wrap</td></tr>
    <tr><td>14</td><td>inner rumor inside kind:1059</td><td>Order request / response / receipt</td><td>inner-signed</td></tr>
    <tr><td>38383</td><td>addressable, replaceable</td><td>Ramp intent / Mostro quote</td><td>public quote, optional wrap for flow</td></tr>
    <tr><td>30078</td><td>addressable, replaceable</td><td>Vendor-side settings / NWC hints</td><td>public</td></tr>
  </tbody>
</table>
<p>The substrate MAY be extended with new kinds by publishing a new section in a minor version of this RFC. Adding new kinds MUST NOT require changes to existing clients (§9.4 Open World Assumption).</p>
<h3 id="substrate-common-rules">7.2 Common rules</h3>
<ul>
  <li>All replaceable events MUST carry a <code>d</code> tag.</li>
  <li>All DM-bearing events MUST be wrapped per NIP-17.</li>
  <li>All public events MUST be addressable where the event represents something with a stable identity (listing, stall, vendor, profile, quote).</li>
</ul>
`
	},
	{
		id: 'substrate-tags',
		level: 2,
		title: '8. Substrate tag grammar',
		body: `
<p>Voyager uses standard NIP-01 tag semantics for <code>p</code>, <code>e</code>, <code>d</code>, <code>t</code>, and the Nostr tag alphabet. Two non-standard prefixes are reserved:</p>
<ul>
  <li><code>v</code> &nbsp;— Voyager convention tag. See §9.</li>
  <li><code>r</code> &nbsp;— Voyager reference (event id). For pointing at another event.</li>
</ul>
<p>Implementations MUST preserve tags they do not understand (§9.4).</p>
<h3 id="standard-tags">8.1 Standard tags used by Voyager</h3>
<table>
  <thead>
    <tr><th>Tag</th><th>Where used</th><th>Semantics</th></tr>
  </thead>
  <tbody>
    <tr><td><code>d</code></td><td>30402, 30017, 38383, 30078</td><td>Stable per-vendor id; addressability</td></tr>
    <tr><td><code>title</code></td><td>30402</td><td>REQUIRED; human-readable listing title</td></tr>
    <tr><td><code>price</code></td><td>30402</td><td>REQUIRED; integer + currency (default <code>sats</code>) formatted as <code>[amount, unit]</code></td></tr>
    <tr><td><code>p</code></td><td>14, 1059</td><td>Recipient pubkey</td></tr>
    <tr><td><code>e</code></td><td>14</td><td>Event being replied to (e.g., the listing or the order rumor)</td></tr>
    <tr><td><code>t</code></td><td>30402, 30017</td><td>Free-form topic tags; clients SHOULD NOT depend on them</td></tr>
    <tr><td><code>r</code></td><td>1059</td><td>Voyager reference to another event id</td></tr>
    <tr><td><code>image</code></td><td>30402</td><td>URL or <code>ipfs://</code> CID for an image</td></tr>
    <tr><td><code>status</code></td><td>30078</td><td>Vendor state hint (<code>active</code>, <code>vacation</code>, etc.); clients SHOULD treat as informational only</td></tr>
  </tbody>
</table>
`
	},
	{
		id: 'conventions-v-tag',
		level: 2,
		title: '9. Conventions: the v tag namespace',
		body: `
<h3 id="conventions-motivation">9.1 Motivation</h3>
<p>The protocol guarantees event <strong>structure</strong> and <strong>forwarding integrity</strong>. The protocol does not guarantee event <strong>semantics</strong>. Adding a new vendor kind (accommodation, tours, rentals, consulting, anything not yet imagined) is done by publishing a <strong>convention document</strong>, not by amending the substrate.</p>
<h3 id="conventions-form">9.2 Form</h3>
<p>A convention tag has four parts:</p>
<pre><code>["v", "&lt;namespace&gt;", "&lt;key&gt;", "&lt;value&gt;"]</code></pre>
<p>Where:</p>
<ul>
  <li><code>namespace</code> = <code>voyager.&lt;type&gt;.v&lt;n&gt;</code> (e.g., <code>voyager.listing.v1</code>, <code>voyager.accommodation.v1</code>, <code>voyager.tour.v1</code>)</li>
  <li><code>key</code> = a field name defined by that convention</li>
  <li><code>value</code> = a string value</li>
</ul>
<p>A single event MAY carry <code>v</code> tags from multiple namespaces. Clients render the namespaces they recognize and ignore the rest.</p>
<h3 id="conventions-resolution">9.3 Resolution rule</h3>
<p>A client that recognizes a namespace renders those tags. A client that does not recognize a namespace ignores those tags. No client MAY crash on, reject, or refuse to forward an event because of an unrecognized <code>v</code> tag namespace.</p>
<h3 id="conventions-open-world">9.4 Open World Assumption</h3>
<p>The following MUST hold for every conformant implementation:</p>
<ul>
  <li>Clients MUST preserve tags they do not render.</li>
  <li>Clients MUST NOT reject events for having unknown tags.</li>
  <li>Relays MUST forward events with unknown kinds or tags.</li>
  <li>Validators MUST NOT reject events for having unknown optional tags.</li>
  <li>Validators MUST reject events ONLY for malformed required substrate fields (Appendix A).</li>
</ul>
<p>Closed-world validation is forbidden at the protocol level.</p>
<h3 id="conventions-versioning">9.5 Convention versioning</h3>
<p>Each convention is <code>&lt;name&gt;.v&lt;n&gt;</code>. New versions are new namespaces:</p>
<ul>
  <li><code>voyager.tour.v1</code> — original</li>
  <li><code>voyager.tour.v2</code> — breaks compatibility, ships side-by-side</li>
</ul>
<p>Old clients keep rendering v1. New clients render v2 if present, fall back to v1 otherwise. Both versions coexist on the same network. No migration event, no flag day, no relay coordination.</p>
<h3 id="conventions-initial">9.6 Initial conventions</h3>
<p>This RFC defines three initial conventions:</p>
<ul>
  <li><code>voyager.listing.v1</code> — physical goods</li>
  <li><code>voyager.accommodation.v1</code> — lodging</li>
  <li><code>voyager.tour.v1</code> — experiences</li>
</ul>
<p>Their definitions are in §10.3, Appendix B.1, and Appendix B.2 respectively. Future conventions are added by publishing a new document under <code>voyager/&lt;convention-name&gt;.md</code> in the spec repository and bumping the minor version of this RFC.</p>
<p>A registry of conventions lives at <code>voyager.network/conventions/&lt;namespace&gt;.md</code> (canonical) and is mirrored at IPFS (content-addressed). A namespace is considered REGISTERED when the document is published there. Implementations MAY recognize unregistered namespaces but SHOULD log a warning.</p>
<h3 id="conventions-comparison">9.7 Comparison to other extensible systems</h3>
<ul>
  <li>Bitcoin soft forks: similar effect (backward-compatible changes via reserved opcode gaps). Voyager's <code>v</code> tag is the analog of a reserved opcode gap at the application layer.</li>
  <li>Nostr NIPs: similar effect (relays forward unknown kinds). Voyager's <code>v</code> tag is the analog at the tag level.</li>
  <li>JSON-LD <code>@context</code>: similar effect (sub-namespaced terms silently ignored if unmapped).</li>
  <li>RDF / Schema.org: similar effect (predicates are URIs; unknown predicates are preserved).</li>
</ul>
<p>This is not novel. It is the well-trodden path for open-world extensible systems.</p>
`
	},
	{
		id: 'listing-schema',
		level: 2,
		title: '10. Listing schema (kind:30402)',
		body: `
<h3 id="listing-required">10.1 Required substrate fields</h3>
<table>
  <thead>
    <tr><th>Field</th><th>Type</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><code>kind</code></td><td>30402</td><td>fixed</td></tr>
    <tr><td><code>pubkey</code></td><td>string</td><td>vendor npub</td></tr>
    <tr><td><code>created_at</code></td><td>int</td><td>unix seconds</td></tr>
    <tr><td><code>tags</code></td><td>array</td><td>MUST include <code>d</code>, <code>title</code>, <code>price</code></td></tr>
  </tbody>
</table>
<p>The <code>content</code> field is OPTIONAL free-form description; it is intended for human readers, not for parsing.</p>
<h3 id="listing-tag-layout">10.2 Tag layout</h3>
<table>
  <thead>
    <tr><th>Tag</th><th>Required</th><th>Format</th></tr>
  </thead>
  <tbody>
    <tr><td><code>d</code></td><td>MUST</td><td>stable uuid</td></tr>
    <tr><td><code>title</code></td><td>MUST</td><td>human-readable string</td></tr>
    <tr><td><code>price</code></td><td>MUST</td><td><code>[amount, unit]</code>; unit defaults to <code>sats</code></td></tr>
    <tr><td><code>image</code></td><td>OPTIONAL</td><td>URL or <code>ipfs://</code> CID</td></tr>
    <tr><td><code>t</code></td><td>OPTIONAL</td><td>topic tags</td></tr>
    <tr><td><code>v</code></td><td>OPTIONAL</td><td>zero or more convention tags</td></tr>
  </tbody>
</table>
<h3 id="listing-convention">10.3 <code>voyager.listing.v1</code> convention fields</h3>
<table>
  <thead>
    <tr><th>Key</th><th>Format</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><code>duration_minutes</code></td><td>integer</td><td>prep/fulfilment time</td></tr>
    <tr><td><code>shipping_zone</code></td><td>string or json array of zones</td><td>e.g., <code>caribbean</code></td></tr>
    <tr><td><code>delivery_method</code></td><td><code>pickup</code> | <code>courier</code> | <code>digital</code></td><td>comma-separated for multi</td></tr>
    <tr><td><code>price_alt_&lt;CCY&gt;</code></td><td><code>[amount, ccy]</code></td><td>informational; e.g., <code>["25","USD"]</code></td></tr>
    <tr><td><code>stock</code></td><td>integer</td><td>OPTIONAL; clients SHOULD treat 0 as "unavailable"</td></tr>
    <tr><td><code>perishable</code></td><td><code>true</code> | <code>false</code></td><td>hint for delivery urgency</td></tr>
  </tbody>
</table>
<p>Full JSON example in Appendix B.1.</p>
`
	},
	{
		id: 'stall-schema',
		level: 2,
		title: '11. Stall schema (kind:30017)',
		body: `
<h3 id="stall-required">11.1 Required substrate fields</h3>
<table>
  <thead>
    <tr><th>Field</th><th>Type</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td><code>kind</code></td><td>30017</td><td>fixed</td></tr>
    <tr><td><code>pubkey</code></td><td>string</td><td>vendor npub</td></tr>
    <tr><td><code>created_at</code></td><td>int</td><td>unix seconds</td></tr>
    <tr><td><code>tags</code></td><td>array</td><td>MUST include <code>d</code>, <code>name</code></td></tr>
  </tbody>
</table>
<h3 id="stall-tag-layout">11.2 Tag layout</h3>
<table>
  <thead>
    <tr><th>Tag</th><th>Required</th><th>Format</th></tr>
  </thead>
  <tbody>
    <tr><td><code>d</code></td><td>MUST</td><td>stable uuid</td></tr>
    <tr><td><code>name</code></td><td>MUST</td><td>stall display name</td></tr>
    <tr><td><code>currency</code></td><td>OPTIONAL</td><td>default <code>sats</code></td></tr>
    <tr><td><code>shipping</code></td><td>OPTIONAL</td><td>JSON-stringified <code>[&#123;zone, cost_sats&#125;]</code> array</td></tr>
    <tr><td><code>about</code></td><td>OPTIONAL</td><td>human-readable stall description</td></tr>
    <tr><td><code>image</code></td><td>OPTIONAL</td><td>banner URL or <code>ipfs://</code> CID</td></tr>
    <tr><td><code>v</code></td><td>OPTIONAL</td><td>zero or more convention tags</td></tr>
  </tbody>
</table>
<h3 id="stall-semantics">11.3 Semantics</h3>
<p>A stall is the vendor's storefront. Listings reference the vendor's stall implicitly via <code>pubkey</code>. Clients SHOULD display stall metadata when rendering any listing whose <code>pubkey</code> matches the stall's <code>pubkey</code>.</p>
`
	},
	{
		id: 'order-flow',
		level: 2,
		title: '12. Order flow state machine (kinds 14 inside 1059)',
		body: `
<h3 id="order-state-diagram">12.1 State diagram</h3>
<pre class="ascii">              +-----------------+
              |  request_draft  |  (customer composing)
              +--------+--------+
                       | send via NIP-17 gift-wrap (1059)
                       v
              +-----------------+
              |  request_sent   |
              +--------+--------+
                       | vendor receives
                       v
              +-----------------+
     +--------&gt;|  vendor_review  |--------+
     |         +--------+--------+        |
     |                  | accept          | cancel (reason)
     |                  v                 v
     |         +--------+--------+   +--------+--------+
     |         |  invoice_open   |   |  request_cancelled |
     |         +--------+--------+   +-------------------+
     |                  | customer pays invoice
     |                  v
     |         +--------+--------+
     |         |  payment_held   |   (HTLC settled)
     |         +--------+--------+
     |                  | vendor fulfils
     |                  v
     |         +--------+--------+
     |         |  fulfilled      |--------+
     |         +--------+--------+        |
     |                  | customer receipts; or 30d timeout
     |                  v                       v
     |         +----------------+   +-------------------+
     +---------|  completed     |   |  completed_timeout |
        dispute+----------------+   +--------------------+
              |
              v
     +----------------+
     |  disputed      |  (out-of-band; protocol does not arbitrate)
     +----------------+</pre>
<h3 id="order-rumor-schemas">12.2 Rumor (kind:14) schemas</h3>
<p><code>order_request</code> (customer → vendor):</p>
<pre><code class="language-json">{
  "kind": 14,
  "pubkey": "&lt;customer npub&gt;",
  "content": "{\"type\":\"order_request\",\"items\":[{\"d\":\"&lt;listing-d&gt;\"}],\"qty\":2,\"delivery\":{\"name\":\"...\",\"addr\":\"...\",\"phone\":\"...\",\"notes\":\"...\"}}",
  "tags": [["p","&lt;vendor-pubkey&gt;"],["e","&lt;listing-event-id&gt;"]]
}</code></pre>
<p><code>order_accept</code> (vendor → customer):</p>
<pre><code class="language-json">{
  "kind": 14,
  "pubkey": "&lt;vendor npub&gt;",
  "content": "{\"type\":\"order_accept\",\"order_id\":\"sha256(&lt;rumor-id&gt;)\",\"invoice\":\"lnbc1...\",\"expires\":900,\"terms\":{\"shipping_days\":3,\"tracking\":\"optional\"},\"escrow\":\"none\"}",
  "tags": [["p","&lt;customer-pubkey&gt;"],["e","&lt;rumor-id&gt;"]]
}</code></pre>
<p><code>payment_receipt</code> (customer → vendor; OPTIONAL but RECOMMENDED):</p>
<pre><code class="language-json">{
  "kind": 14,
  "pubkey": "&lt;customer npub&gt;",
  "content": "{\"type\":\"payment_receipt\",\"order_id\":\"...\",\"preimage_hash\":\"...\",\"paid_at\":1760000000}",
  "tags": [["p","&lt;vendor-pubkey&gt;"],["e","&lt;rumor-id&gt;"]]
}</code></pre>
<p><code>fulfilled</code> (vendor → customer):</p>
<pre><code class="language-json">{
  "kind": 14,
  "pubkey": "&lt;vendor npub&gt;",
  "content": "{\"type\":\"fulfilled\",\"order_id\":\"...\",\"tracking\":\"...\",\"digital_payload_url\":\"...\"}",
  "tags": [["p","&lt;customer-pubkey&gt;"],["e","&lt;rumor-id&gt;"]]
}</code></pre>
<h3 id="order-wrapping">12.3 Wrapping</h3>
<p>Every kind:14 above MUST be wrapped in a kind:1059 gift-wrap per NIP-17 before publication. Relays MUST NOT be able to determine the relationship between an order's request, accept, payment, and fulfilment messages (sender, recipient, contents).</p>
<h3 id="order-id">12.4 Order id</h3>
<p><code>order_id</code> = <code>sha256(&lt;request_rumor_event_id&gt;)</code>. This id is stable across the entire state machine; all messages in a single order's flow SHOULD reference the same <code>order_id</code>.</p>
<h3 id="order-expiry">12.5 Expiry</h3>
<p>An <code>invoice_open</code> state MUST transition out within the invoice's <code>expires</code> window (default 900s). If payment does not arrive, the vendor SHOULD publish a <code>request_cancelled</code> rumor.</p>
<h3 id="order-disputes">12.6 Disputes</h3>
<p>The protocol does not arbitrate disputes. The protocol's contribution to dispute is the existence of the <code>disputed</code> terminal state and the audit trail of NIP-17 gift-wraps retained by both parties. Vendor and customer MAY invoke external mechanisms (Mostro arbiter, community reputation, public zap trails).</p>
`
	},
	{
		id: 'fiat-ramp',
		level: 2,
		title: '13. Fiat ramp protocol (kind:38383 + Mostro)',
		body: `
<h3 id="ramp-goals">13.1 Goals</h3>
<ul>
  <li>Allow customers to acquire or dispose of sats without using a centralized exchange.</li>
  <li>Allow Mostro node operators to compete on rate, fee, and fiat rail coverage.</li>
  <li>Keep the customer-side experience KYC-free.</li>
  <li>Allow the protocol to keep invariant I-1 (no custody).</li>
</ul>
<h3 id="ramp-use-of-mostro">13.2 Use of Mostro</h3>
<p>Mostro is the chosen fiat ramp substrate. This RFC does not redefine Mostro; it REUSES Mostro's existing event shapes:</p>
<ul>
  <li>kind:38383 for intent and quote events (Mostro already uses this)</li>
  <li>kind:1059 for the encrypted trade flow</li>
  <li>BOLT-04 hodl invoices for escrow</li>
</ul>
<p>The Voyager layer adds:</p>
<ul>
  <li>A <code>z</code> tag convention namespace (<code>voyager.ramp.v1</code>) for ramp-specific metadata.</li>
  <li>A bridge pattern in §13.5 for clients to aggregate quotes from multiple Mostro nodes.</li>
</ul>
<h3 id="ramp-intent">13.3 Ramp intent (kind:38383, customer)</h3>
<p>Buyer:</p>
<pre><code class="language-json">{
  "kind": 38383,
  "pubkey": "&lt;customer npub&gt;",
  "tags": [
    ["d", "&lt;unique-intent-id&gt;"],
    ["s", "buy"],
    ["amt", "50000", "sats"],
    ["f", "JMD", "2500"],
    ["z", "voyager.ramp.v1", "method", "wise|remitly|cash-deposit"],
    ["z", "voyager.ramp.v1", "expires", "1800"]
  ]
}</code></pre>
<p>Seller: same shape with <code>s=sell</code>.</p>
<h3 id="ramp-quote">13.4 Quote (kind:38383, Mostro node)</h3>
<pre><code class="language-json">{
  "kind": 38383,
  "pubkey": "&lt;mostro-node-pubkey&gt;",
  "tags": [
    ["d", "&lt;quote-id&gt;"],
    ["ref", "&lt;intent-id&gt;"],
    ["z", "voyager.ramp.v1", "fee_sats", "500"],
    ["z", "voyager.ramp.v1", "maker_pubkey", "&lt;peer-seller npub&gt;"],
    ["z", "voyager.ramp.v1", "method", "wise"],
    ["z", "voyager.ramp.v1", "rate_sats_per_unit", "20.0"],
    ["z", "voyager.ramp.v1", "reputation", "0.92"]
  ]
}</code></pre>
<h3 id="ramp-bridge">13.5 Bridge pattern (clients)</h3>
<p>A client (the "bridge") SHOULD:</p>
<ol>
  <li>Subscribe to all reachable relays for kind:38383 events.</li>
  <li>Cache <code>(rate, fee, method, reputation, expiry)</code> per quote.</li>
  <li>Present top-N quotes to the user, ranked by <code>(effective_rate, fee, node_reputation, method_match, freshness)</code>.</li>
  <li>When the user selects a quote, open a kind:1059 (NIP-17) encrypted channel directly to the Mostro node's pubkey to begin the trade.</li>
</ol>
<p>The bridge does NOT custody fiat and does NOT arbitrate. It only aggregates and routes.</p>
<h3 id="ramp-trade-state">13.6 Trade state machine (delegated to Mostro)</h3>
<p>Voyager inherits Mostro's existing state machine. The Voyager layer adds a thin envelope:</p>
<pre class="ascii">pending  →  locked  →  settled   (success)
                ↘  released  (refund)
                ↘  disputed  (out-of-band arbitration)</pre>
<p>Nodes MUST NOT redirect sats. Hodl-invoice contracts enforce this.</p>
<h3 id="ramp-operator-economics">13.7 Operator economics</h3>
<p>Mostro node operators set their own:</p>
<ul>
  <li>fees (per trade or bps)</li>
  <li>supported fiat currencies</li>
  <li>supported fiat rails</li>
  <li>arbitration SLA</li>
  <li>jurisdiction preferences</li>
</ul>
<p>Voyager does not standardize these. Voyager operates one reference node (voyager-mostro) tuned for Caribbean rails; its published policy is informational and not part of this RFC.</p>
`
	},
	{
		id: 'sdk-contract',
		level: 2,
		title: '14. SDK contract (the API surface implementations MUST expose)',
		body: `
<p>This section is normative. Any package claiming to be a Voyager-conformant SDK MUST expose the surface below. The surface is described in TypeScript-flavoured pseudocode; implementations in other languages SHOULD provide idiomatic equivalents with semantically identical behavior.</p>
<h3 id="sdk-identity">14.1 Identity</h3>
<pre><code>voyager.identity.create(): &#123; npub, nsec &#125;      // generate
voyager.identity.import(nsec): &#123; npub &#125;
voyager.identity.export(): &#123; nsec &#125;            // explicit user gesture
voyager.identity.sign(eventTemplate): signedEvent</code></pre>
<p>The SDK MUST NOT persist <code>nsec</code> to disk without explicit user opt-in. It MUST allow export and re-import. It MUST NOT log <code>nsec</code>.</p>
<h3 id="sdk-payment">14.2 Payment (NWC)</h3>
<pre><code>voyager.pay.invoice(bolt11: string, opts?): Promise&lt;&#123; preimage &#125;&gt;
voyager.pay.quote(bolt11): Promise&lt;&#123; fee_sats, hop_hints &#125;&gt;
voyager.nwc.connect(uri: string): void        // paste NWC URI
voyager.nwc.disconnect(): void
voyager.nwc.budget(): Promise&lt;BudgetState&gt;    // current budget</code></pre>
<p>The SDK MUST communicate with the user's wallet via NIP-47 only. It MUST NOT request, store, or transmit the user's seed or spend authority beyond the NWC scope.</p>
<h3 id="sdk-listing">14.3 Listing</h3>
<pre><code>voyager.listing.create(input: ListingInput): Promise&lt;EventId&gt;
voyager.listing.update(d: string, patch: Partial&lt;ListingInput&gt;): Promise&lt;EventId&gt;
voyager.listing.get(pubkey: string, d: string): Promise&lt;Listing | null&gt;
voyager.listing.search(query: ListingQuery): AsyncIterable&lt;Listing&gt;
voyager.listing.delete(d: string): Promise&lt;void&gt;   // soft-delete via empty event</code></pre>
<p><code>ListingInput</code> MUST be expressed as <code>(substrate fields, v tags)</code>. The SDK MUST NOT bake any single convention into the listing type; new conventions are surfaced as opaque <code>Record&lt;string, string[]&gt;</code> arrays that clients pass through.</p>
<h3 id="sdk-stall">14.4 Stall</h3>
<pre><code>voyager.stall.create(input: StallInput): Promise&lt;EventId&gt;
voyager.stall.update(d: string, patch: Partial&lt;StallInput&gt;): Promise&lt;EventId&gt;
voyager.stall.get(pubkey: string): Promise&lt;Stall | null&gt;</code></pre>
<h3 id="sdk-messaging">14.5 Messaging (NIP-17)</h3>
<pre><code>voyager.dm.send(toNpub: string, payload: any): Promise&lt;RumorId&gt;
voyager.dm.subscribe(): AsyncIterable&lt;DecryptedRumor&gt;
voyager.dm.parse(rumor): OrderMessage | null   // type-discriminated</code></pre>
<p><code>OrderMessage</code> MUST accept <code>order_request</code>, <code>order_accept</code>, <code>payment_receipt</code>, <code>fulfilled</code>, and <code>request_cancelled</code>. Unknown types MUST be returned as <code>UnknownMessage</code> with the raw <code>kind:14</code> content.</p>
<h3 id="sdk-ramp">14.6 Ramp</h3>
<pre><code>voyager.ramp.intent(input: RampIntent): Promise&lt;IntentId&gt;
voyager.ramp.quotes(intentId: string): AsyncIterable&lt;Quote&gt;
voyager.ramp.start(intentId, quoteId): Promise&lt;TradeId&gt;  // opens NIP-17 channel
voyager.ramp.trades(): AsyncIterable&lt;TradeEvent&gt;</code></pre>
<h3 id="sdk-mcp">14.7 MCP consumer convenience (OPTIONAL surface)</h3>
<p>A separate package <code>@voyager/mcp</code> MAY wrap the SDK into MCP tools. The core SDK MUST NOT depend on MCP.</p>
<h3 id="sdk-non-negotiables">14.8 Non-negotiables for the SDK</h3>
<ul>
  <li>Zero AI/ML dependencies in the core SDK.</li>
  <li>Zero telemetry to Voyager-the-business by default.</li>
  <li>Total install size (excluding peer deps) MUST be &lt; 200 KB minified + gzipped for the TypeScript reference implementation.</li>
  <li>The SDK MUST be MIT or Apache 2.0 licensed.</li>
  <li>The SDK MUST publish source maps.</li>
  <li>The SDK MUST be deterministic — given the same inputs, the same signed events.</li>
</ul>
`
	},
	{
		id: 'reference-clients',
		level: 2,
		title: '15. Reference clients and operator toolkit',
		body: `
<h3 id="ref-clients">15.1 Reference clients</h3>
<table>
  <thead>
    <tr><th>Name</th><th>Role</th><th>Conformance</th></tr>
  </thead>
  <tbody>
    <tr><td>voyager-web</td><td>Customer marketplace</td><td>L5</td></tr>
    <tr><td>vendor-seller-app</td><td>Vendor dashboard</td><td>L5</td></tr>
    <tr><td>voyager-mcp</td><td>AI-agent lens (MCP server)</td><td>L5</td></tr>
    <tr><td>voyager-idx</td><td>Indexer (optional cache)</td><td>L4</td></tr>
    <tr><td>voyager-relay</td><td>Bootstrap Nostr relay</td><td>transport-only</td></tr>
    <tr><td>voyager-mostro</td><td>Reference Mostro node</td><td>ramp-only</td></tr>
  </tbody>
</table>
<p>These are reference implementations, not products. Vendors and operators SHOULD build their own; the reference implementations exist to demonstrate the protocol and to set the UX baseline.</p>
<h3 id="operator-toolkit">15.2 Operator toolkit</h3>
<p>The operator toolkit (<code>voyager-operator-toolkit</code>) MUST be a declarative Docker Compose / Helm deployment that brings up:</p>
<ul>
  <li>1+ Nostr relays (NIP-01)</li>
  <li>1+ Mostro node</li>
  <li>1+ indexer</li>
  <li>A landing page documenting the operator's services and policies</li>
</ul>
<p>The toolkit MUST NOT depend on Voyager-the-business for any of these to function.</p>
<h3 id="conformance-sandbox">15.3 Conformance sandbox</h3>
<p>The conformance sandbox (<code>voyager-sandbox</code>) MUST provide:</p>
<ul>
  <li>A local dev environment with mock relays, regtest Lightning nodes, and simulated Mostro peers.</li>
  <li>Test vectors for every substrate event kind in Appendix A.</li>
  <li>A CLI command <code>voyager-sandbox up</code> / <code>voyager-sandbox down</code>.</li>
  <li>No mainnet connectivity by default.</li>
</ul>
<p>The sandbox MUST be usable by a third-party implementer to validate their client without ever touching mainnet or real fiat.</p>
`
	},
	{
		id: 'naming-distribution',
		level: 2,
		title: '16. Naming, distribution, and identity binding',
		body: `
<p>This section is normative for Voyager-the-business and RECOMMENDED for any operator publishing reference software.</p>
<h3 id="canonical-name">16.1 Canonical name</h3>
<p>The canonical protocol name is <code>voyager</code>. The canonical organization identifier for reference artifacts is <code>voyager.network</code> (DNS) backed by ENS (<code>voyager.eth</code>) backed by IPFS content addressing. None of these three is load-bearing; any one can fail without losing the protocol's accessibility.</p>
<h3 id="bundle-identity">16.2 Bundle identity</h3>
<p>A released bundle of any reference client MUST embed, at build time:</p>
<ul>
  <li><code>EXPECTED_CID</code> — the IPFS CID of the released bundle</li>
  <li><code>HOLDCO_ETH</code> — the Ethereum address that owns <code>voyager.eth</code></li>
  <li><code>HOLDCO_NSEC</code> — the Nostr pubkey that announces releases</li>
</ul>
<p>The client MUST verify these against a manifest fetched from at least two independent sources (e.g., GitHub raw + IPFS gateway + ENS contenthash) on every boot, and MUST refuse to operate if any source disagrees.</p>
<h3 id="resolution">16.3 Resolution</h3>
<p>Clients SHOULD resolve <code>voyager.eth</code> via at least two independent ENS resolvers (e.g., eth.limo + eth.link + a user's own RPC) and MUST halt with a clear error if resolvers disagree about the contenthash.</p>
<h3 id="local-install">16.4 Local-install path</h3>
<p>Reference clients MUST be installable from source on <code>localhost</code> or <code>ipfs://</code> with no DNS dependency. The on-disk bundle is verifiable against <code>EXPECTED_CID</code>.</p>
`
	},
	{
		id: 'test-vectors',
		level: 2,
		title: '17. Conformance test vectors',
		body: `
<h3 id="required-vectors">17.1 Required vectors</h3>
<p>A conformant implementation MUST pass the following vectors. Each vector is identified by a hash of the canonical event JSON. Test vectors live at <code>voyager.network/test-vectors/&lt;id&gt;.json</code> and are mirrored at IPFS.</p>
<p>Initial vector set (this version):</p>
<ul>
  <li><strong>v01</strong> — minimal kind:30402 listing (substrate only, no <code>v</code> tags)</li>
  <li><strong>v02</strong> — kind:30402 listing with <code>voyager.listing.v1</code> convention</li>
  <li><strong>v03</strong> — kind:30017 stall</li>
  <li><strong>v04</strong> — kind:14 <code>order_request</code> rumor (unwrapped, for test only)</li>
  <li><strong>v05</strong> — kind:1059 wrapping of v04</li>
  <li><strong>v06</strong> — kind:38383 ramp intent (buyer)</li>
  <li><strong>v07</strong> — kind:38383 Mostro quote</li>
  <li><strong>v08</strong> — end-to-end: listing → order_request → order_accept → payment_receipt → fulfilled</li>
  <li><strong>v09</strong> — Open-World Assumption: kind:30402 with unknown <code>v</code> namespace</li>
  <li><strong>v10</strong> — backward compatibility: kind:30402 mixing <code>voyager.tour.v1</code> and <code>voyager.listing.v1</code></li>
</ul>
<h3 id="impl-matrix">17.2 Implementation-status matrix</h3>
<table>
  <thead>
    <tr><th>Implementation</th><th>L1</th><th>L2</th><th>L3</th><th>L4</th><th>L5</th></tr>
  </thead>
  <tbody>
    <tr><td>@voyager/sdk (TS)</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td>—</td></tr>
    <tr><td>voyager-web</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr>
    <tr><td>vendor-seller-app</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr>
    <tr><td>voyager-mcp</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td></tr>
    <tr><td>voyager-idx</td><td>yes</td><td>yes</td><td>yes</td><td>—</td><td>—</td></tr>
    <tr><td>voyager-mostro</td><td>yes</td><td>yes</td><td>yes</td><td>yes</td><td>—</td></tr>
    <tr><td>Community impl A (TBD)</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
    <tr><td>Community impl B (TBD)</td><td>?</td><td>?</td><td>?</td><td>?</td><td>?</td></tr>
  </tbody>
</table>
<p>The matrix MUST be kept current; the build process MUST fail if a reference implementation's claimed level regresses.</p>
`
	},
	{
		id: 'threat-eroi',
		level: 2,
		title: '18. Threat model and EROI mapping',
		body: `
<h3 id="threat-model">18.1 Threat model</h3>
<table>
  <thead>
    <tr><th>ID</th><th>Adversary action</th><th>Mitigation</th></tr>
  </thead>
  <tbody>
    <tr><td>T-1</td><td>One relay blocks or drops events</td><td>Bootstrap ≥ 3 relays; client rotates</td></tr>
    <tr><td>T-2</td><td>Customer's wallet compromised</td><td>Bounded per-customer; localized</td></tr>
    <tr><td>T-3</td><td>Vendor's npub compromised</td><td>Bounded per-vendor; vendor re-keys and indicates successor</td></tr>
    <tr><td>T-4</td><td>One Mostro node colludes / evicts</td><td>Market discipline; reputation visible; route around</td></tr>
    <tr><td>T-5</td><td>Voyager-the-business seized or acquired</td><td>Protocol unaffected; reference clients still downloadable; community forks exist</td></tr>
    <tr><td>T-6</td><td>Regional network block</td><td>Relays over Tor; Mostro nodes reachable via nostr; local-install path</td></tr>
    <tr><td>T-7</td><td>Indexer Sybil / poisoning</td><td>Bootstrap ≥ 3 relays; clients rotate; eventually apps run own subscriptions</td></tr>
    <tr><td>T-8</td><td>Liquidity drought on Mostro</td><td>Voyager-mostro subsidizes early trades; multiple nodes compete</td></tr>
    <tr><td>T-9</td><td>Convention namespace squatting</td><td>Conventions are content-addressed via IPFS; mirrors are non-authoritative; clients recognize registered namespaces only</td></tr>
    <tr><td>T-10</td><td>Substrate-level validator bug</td><td>Validators reject ONLY malformed substrate fields; unknown tags are preserved</td></tr>
    <tr><td>T-11</td><td>A jurisdiction subpoenas Voyager-the-business for user data</td><td>Voyager-the-business has no user data; protocol has no central inbox</td></tr>
    <tr><td>T-12</td><td>A jurisdiction forces a Mostro node to reverse a trade</td><td>Hodl-invoice contract is cryptographic; jurisdiction cannot alter already-settled HTLCs</td></tr>
  </tbody>
</table>
<h3 id="eroi-mapping">18.2 EROI mapping</h3>
<table>
  <thead>
    <tr><th>Dimension</th><th>Contribution</th></tr>
  </thead>
  <tbody>
    <tr><td>F (fan-out)</td><td>Many relays; many Mostro nodes; many wallets; many vendor storage choices; many indexers; many forks</td></tr>
    <tr><td>O (opacity)</td><td>NIP-17 gift-wraps; no KYC inside protocol; Lightning chain opaque to casual inspection; no central inbox</td></tr>
    <tr><td>B (binding)</td><td>Every meaningful action requires a local key signature; Mostro operator can't redirect; NWC scoped; convention namespaces immutable</td></tr>
  </tbody>
</table>
<p>Per the EROI-defense rubric at <code>/home/tk/rubric/rubrics/eroi_defense_rubric.md</code>, the substrate-level profile is (3, 3, 3) — the rubric ceiling. Reference implementations MAY inherit this profile; they MUST NOT regress it.</p>
<h3 id="eroi-low">18.3 Adversarial plays with EROI &lt; 1</h3>
<ul>
  <li><strong>Hostile acquirer of Voyager-the-business</strong>: gets GitHub, npm, docs, indexer, brand. Cannot get user accounts (none exist), user funds (no custody), user data (none held). EROI &lt; 1.</li>
  <li><strong>Jurisdictional de-platforming</strong>: blocks domain, docs hosting, relays. Cannot prevent wallets running locally or relays operating elsewhere. EROI &lt; 1 against a single jurisdiction.</li>
  <li><strong>Indexer poisoning</strong>: degrades discoverability only. EROI ≈ 1 sustained; the platform survives by client-side relay rotation.</li>
</ul>
`
	},
	{
		id: 'out-of-scope',
		level: 2,
		title: '19. What this RFC explicitly does NOT solve',
		body: `
<p>These are out of scope by design, and should remain out of scope:</p>
<ul>
  <li>Long-horizon dispute precedence across Mostro nodes (per-node arbitration, by design).</li>
  <li>Money-laundering controls at the fiat perimeter (the operator of each fiat rail is responsible).</li>
  <li>Automated credit / underwriting / BNPL — requires data the protocol refuses to keep.</li>
  <li>AMM-style instant fiat↔sats swap (Mostro is a market-maker flow; AMMs are out of scope for v1).</li>
  <li>Identity verification (intentionally offloaded to ramps and fiat rails per I-2).</li>
  <li>Vendor discovery ranking / reputation aggregation — clients do this locally; the protocol does not provide a "trust score" field.</li>
</ul>
`
	},
	{
		id: 'changelog',
		level: 2,
		title: '20. Change-log',
		body: `
<ul>
  <li><strong>v0.4.0</strong> — initial RFC. Folds VOYAGER_PROTOCOL.md (v3) and EXTENSIBILITY_TAGS_THESIS.md (v3.1) into a single normative document. Adds JSON-Schema (Appendix A), test vectors (§17), SDK contract (§14), conformance levels (§4). Status: DRAFT (target: PROPOSED after alpha build).</li>
  <li><strong>v3.1</strong> — (predecessor) Tags thesis. Substrate vs. conventions split, <code>v</code> tag prefix, three illustrative conventions.</li>
  <li><strong>v3.0</strong> — (predecessor) Initial protocol-shaped form. Lightning, Mostro, Nostr keys; no Crossmint dependency.</li>
  <li><strong>v2.x</strong> — superseded (see EROI_AUDIT_v2.md, historical)</li>
  <li><strong>v1.x</strong> — superseded (see EROI_AUDIT.md, historical)</li>
</ul>
`
	}
];

/**
 * Appendices — rendered after the main sections, inside collapsible
 * <details> blocks so they do not dominate the page.
 */
export const appendices = [
	{
		id: 'appendix-a',
		level: 2,
		title: 'Appendix A — JSON-Schema',
		summary:
			'Normative JSON-Schema for the substrate event kinds (30402, 30017, 14, 1059, 38383).',
		body: `
<p>The following schemas are normative for substrate event validation. A conformant validator MUST accept events that match these schemas AND carry additional unknown tags (Open World Assumption, §9.4).</p>
<h3 id="appendix-a-30402">A.1 kind:30402</h3>
<pre><code class="language-json">{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "voyager://schemas/30402.json",
  "title": "Voyager Listing (kind:30402)",
  "type": "object",
  "required": ["kind", "pubkey", "created_at", "tags"],
  "properties": {
    "kind": { "const": 30402 },
    "pubkey": { "type": "string", "minLength": 1 },
    "created_at": { "type": "integer", "minimum": 0 },
    "content": { "type": "string" },
    "tags": {
      "type": "array",
      "items": { "type": "array", "items": { "type": "string" } },
      "minItems": 3,
      "contains": {
        "type": "array",
        "minItems": 2,
        "prefixItems": [
          { "const": "d" },
          { "type": "string", "minLength": 1 }
        ]
      }
    }
  },
  "allOf": [
    {
      "description": "MUST include d, title, price",
      "properties": {
        "tags": {
          "allOf": [
            { "contains": { "type": "array", "prefixItems": [{"const":"d"}, {"type":"string"}] } },
            { "contains": { "type": "array", "prefixItems": [{"const":"title"}, {"type":"string"}] } },
            { "contains": { "type": "array", "prefixItems": [{"const":"price"}, {"type":"string"}, {"type":"string"}] } }
          ]
        }
      }
    }
  ]
}</code></pre>
<h3 id="appendix-a-30017">A.2 kind:30017</h3>
<pre><code class="language-json">{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "voyager://schemas/30017.json",
  "title": "Voyager Stall (kind:30017)",
  "type": "object",
  "required": ["kind", "pubkey", "created_at", "tags"],
  "properties": {
    "kind": { "const": 30017 },
    "pubkey": { "type": "string", "minLength": 1 },
    "created_at": { "type": "integer", "minimum": 0 },
    "content": { "type": "string" },
    "tags": {
      "type": "array",
      "minItems": 2,
      "items": { "type": "array", "items": { "type": "string" } }
    }
  },
  "allOf": [
    { "description": "MUST include d and name" }
  ]
}</code></pre>
<h3 id="appendix-a-14">A.3 kind:14 (rumor inside NIP-17 gift-wrap)</h3>
<pre><code class="language-json">{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "voyager://schemas/14.json",
  "title": "Voyager Order Rumor (kind:14)",
  "type": "object",
  "required": ["kind", "pubkey", "content", "tags"],
  "properties": {
    "kind": { "const": 14 },
    "pubkey": { "type": "string", "minLength": 1 },
    "content": { "type": "string", "minLength": 1 },
    "tags": {
      "type": "array",
      "items": { "type": "array", "items": { "type": "string" } }
    }
  }
}</code></pre>
<h3 id="appendix-a-1059">A.4 kind:1059 (NIP-17 gift-wrap)</h3>
<p>The kind:1059 wrapper itself follows NIP-17; this RFC does not re-specify it. A conformant implementation MUST use a NIP-17 library that produces spec-compliant gift-wraps.</p>
<h3 id="appendix-a-38383">A.5 kind:38383 (ramp intent + quote)</h3>
<pre><code class="language-json">{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "voyager://schemas/38383.json",
  "title": "Voyager Ramp Event (kind:38383)",
  "type": "object",
  "required": ["kind", "pubkey", "created_at", "tags"],
  "properties": {
    "kind": { "const": 38383 },
    "pubkey": { "type": "string", "minLength": 1 },
    "created_at": { "type": "integer", "minimum": 0 },
    "content": { "type": "string" },
    "tags": {
      "type": "array",
      "items": { "type": "array", "items": { "type": "string" } }
    }
  }
}</code></pre>
<p>A kind:38383 event is recognized as an <strong>intent</strong> if it carries <code>s</code> and <code>amt</code> tags; as a <strong>quote</strong> if it carries a <code>ref</code> tag pointing at an intent id.</p>
`
	},
	{
		id: 'appendix-b',
		level: 2,
		title: 'Appendix B — Worked examples',
		summary:
			'Full JSON examples for the three initial conventions (listing, tour, accommodation), an open-world example, and a ramp quote.',
		body: `
<h3 id="appendix-b-listing">B.1 — A physical-goods listing (kind:30402 with <code>voyager.listing.v1</code>)</h3>
<pre><code class="language-json">{
  "kind": 30402,
  "pubkey": "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2",
  "created_at": 1760000000,
  "content": "Fresh whole snapper, line-caught this morning. Pickup at the dock or courier within Kingston metro.",
  "tags": [
    ["d", "snapper-2026-09-04-001"],
    ["title", "Fresh whole snapper"],
    ["price", "42000", "sats"],
    ["image", "ipfs://bafy...snapper.jpg"],
    ["t", "seafood"],
    ["t", "fish"],
    ["v", "voyager.listing.v1", "duration_minutes", "120"],
    ["v", "voyager.listing.v1", "shipping_zone", "kingston"],
    ["v", "voyager.listing.v1", "delivery_method", "pickup,courier"],
    ["v", "voyager.listing.v1", "price_alt_USD", "25", "USD"],
    ["v", "voyager.listing.v1", "stock", "8"],
    ["v", "voyager.listing.v1", "perishable", "true"]
  ]
}</code></pre>
<h3 id="appendix-b-tour">B.2 — A tour (kind:30402 with <code>voyager.tour.v1</code>)</h3>
<pre><code class="language-json">{
  "kind": 30402,
  "pubkey": "&lt;guide npub&gt;",
  "created_at": 1760000100,
  "content": "3-day southern coast motorcycle tour. Includes bike, fuel, accommodation.",
  "tags": [
    ["d", "tour-2026-12-01-south-coast"],
    ["title", "South Coast Motorcycle Tour (3 days)"],
    ["price", "1500000", "sats"],
    ["image", "ipfs://bafy...tour.jpg"],
    ["v", "voyager.tour.v1", "duration_days", "3"],
    ["v", "voyager.tour.v1", "group_size", "6"],
    ["v", "voyager.tour.v1", "meeting_point", "Negril Lighthouse"],
    ["v", "voyager.tour.v1", "difficulty", "moderate"],
    ["v", "voyager.listing.v1", "delivery_method", "digital"]
  ]
}</code></pre>
<h3 id="appendix-b-accommodation">B.3 — An accommodation (kind:30402 with <code>voyager.accommodation.v1</code>)</h3>
<pre><code class="language-json">{
  "kind": 30402,
  "pubkey": "&lt;host npub&gt;",
  "created_at": 1760000200,
  "content": "Two-bedroom apartment, ocean view, walk to beach.",
  "tags": [
    ["d", "apt-2026-12-01-apt2b"],
    ["title", "Ocean-view apartment, 2BR"],
    ["price", "350000", "sats"],
    ["v", "voyager.accommodation.v1", "check_in", "2026-12-01"],
    ["v", "voyager.accommodation.v1", "check_out", "2026-12-08"],
    ["v", "voyager.accommodation.v1", "guests", "4"],
    ["v", "voyager.accommodation.v1", "unit_type", "apartment"]
  ]
}</code></pre>
<h3 id="appendix-b-open-world">B.4 — Open-World example</h3>
<pre><code class="language-json">{
  "kind": 30402,
  "pubkey": "&lt;vendor npub&gt;",
  "created_at": 1760000300,
  "content": "Custom future thing.",
  "tags": [
    ["d", "future-001"],
    ["title", "Whatever comes next"],
    ["price", "10000", "sats"],
    ["v", "voyager.something_we_havent_imagined.v1", "field", "value"]
  ]
}</code></pre>
<p>A conformant client MUST accept and preserve this event even though <code>voyager.something_we_havent_imagined.v1</code> is not yet registered.</p>
<h3 id="appendix-b-ramp">B.5 — A ramp quote (kind:38383)</h3>
<pre><code class="language-json">{
  "kind": 38383,
  "pubkey": "&lt;mostro-node npub&gt;",
  "created_at": 1760000400,
  "content": "",
  "tags": [
    ["d", "quote-001"],
    ["ref", "intent-001"],
    ["z", "voyager.ramp.v1", "fee_sats", "500"],
    ["z", "voyager.ramp.v1", "maker_pubkey", "&lt;peer npub&gt;"],
    ["z", "voyager.ramp.v1", "method", "wise"],
    ["z", "voyager.ramp.v1", "rate_sats_per_unit", "20.0"],
    ["z", "voyager.ramp.v1", "reputation", "0.92"]
  ]
}</code></pre>
`
	},
	{
		id: 'appendix-c',
		level: 2,
		title: 'Appendix C — Migration notes from v3 protocol + v3.1 thesis',
		summary:
			'How this RFC supersedes VOYAGER_PROTOCOL.md (v3.0) and EXTENSIBILITY_TAGS_THESIS.md (v3.1), and what migration looks like.',
		body: `
<p>This RFC supersedes two documents:</p>
<ul>
  <li><code>VOYAGER_PROTOCOL.md</code> (v3.0) — the v3 protocol-era spec</li>
  <li><code>EXTENSIBILITY_TAGS_THESIS.md</code> (v3.1) — the tags thesis</li>
</ul>
<p>Both remain on disk as historical references. The substantive differences:</p>
<table>
  <thead>
    <tr><th>Topic</th><th>v3.0 protocol</th><th>v3.1 thesis</th><th>This RFC</th></tr>
  </thead>
  <tbody>
    <tr><td>Document role</td><td>Spec</td><td>Addendum proposing <code>v</code> tag prefix</td><td>Single canonical RFC</td></tr>
    <tr><td>Conformance language</td><td>Informal</td><td>Informal</td><td>RFC 2119 (MUST/SHOULD/MAY)</td></tr>
    <tr><td>Conventions layer</td><td>Absent</td><td>Proposed</td><td>§9 normative</td></tr>
    <tr><td>JSON-Schema</td><td>Inline JSON examples</td><td>None</td><td>Appendix A</td></tr>
    <tr><td>Test vectors</td><td>None</td><td>None</td><td>§17</td></tr>
    <tr><td>SDK surface</td><td>Mentioned</td><td>Not addressed</td><td>§14 normative</td></tr>
    <tr><td>Threat model</td><td>Inline table</td><td>Not addressed</td><td>§18 expanded with T-IDs</td></tr>
    <tr><td>MCP boundary</td><td>Not addressed</td><td>Not addressed</td><td>§1.2 + §14.7</td></tr>
    <tr><td>Conformance levels</td><td>None</td><td>None</td><td>§4.1 (L1–L5)</td></tr>
  </tbody>
</table>
<p>Implementers of v3.0 or v3.1 SHOULD migrate to this RFC. Migration is mechanical:</p>
<ol>
  <li>Substrate event schemas are unchanged; existing events validate under Appendix A.</li>
  <li>Convention tags are unchanged; existing <code>v</code> tags validate under §9.</li>
  <li>The SDK API surface in §14 is a superset of the SDK notes in v3.0; existing SDK calls remain valid.</li>
  <li>The kind:38383 ramp events gain a <code>z</code> (Voyager-ramp) tag namespace instead of bare tags. Existing Mostro events are still valid event-shape-wise, but Voyager bridges SHOULD prefer the <code>z</code> namespace for new quotes.</li>
</ol>
<p>No migration event is required. Both old and new events coexist on the network. Clients MUST apply Open World Assumption (§9.4) to both.</p>
`
	}
];