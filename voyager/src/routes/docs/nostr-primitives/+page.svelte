<script>
</script>

<svelte:head>
	<title>Nostr primitives — Voyager docs</title>
</svelte:head>

<section>
	<span class="eyebrow">SDK</span>
	<h1>Nostr primitives.</h1>
	<p>The events, kinds, and NIPs the SDK speaks. Voyager does not invent a wire format. It uses the Nostr wire format, scoped to a small set of kinds and NIPs.</p>
</section>

<section>
	<h2 id="events">Events</h2>
	<p>Everything in the SDK is a Nostr event: a signed JSON object with a kind, a content field, a set of tags, and a Schnorr signature over a canonical serialization. See <a href="https://github.com/nostr-protocol/nips/blob/master/01.md">NIP-01</a> for the basic event spec.</p>
	<p>The SDK passes events through as raw shape. <code class="font-mono">voyager.parse(event)</code> returns a typed view per kind.</p>
</section>

<section>
	<h2 id="event-kinds">Event kinds</h2>
	<p>The SDK works with five kind ranges:</p>
	<ul>
		<li><strong>30402</strong> — Listing. A vendor's product, service, or offer. Replaceable by <code class="font-mono">pubkey + d</code>.</li>
		<li><strong>30017</strong> — Stall. A vendor's profile, pointing at the conventions they use.</li>
		<li><strong>38383</strong> — Ramp intent and quote. Mostro nodes advertise themselves with this kind and respond to intents with quotes.</li>
		<li><strong>14</strong> — Direct message rumor (NIP-17).</li>
		<li><strong>1059</strong> — Gift wrap (NIP-17). The outer envelope that hides the recipient.</li>
	</ul>
</section>

<section>
	<h2 id="nips-used">NIPs used</h2>
	<ul>
		<li><strong>NIP-01</strong> — Basic event format. Every event in the SDK is a valid NIP-01 event.</li>
		<li><strong>NIP-17</strong> — Gift-wrapped direct messages. <code class="font-mono">dmSend</code>, <code class="font-mono">dmOpen</code>, <code class="font-mono">dmInbox</code>.</li>
		<li><strong>NIP-19</strong> — bech32 encoding. <code class="font-mono">npub</code>, <code class="font-mono">nsec</code>, <code class="font-mono">nprofile</code>, <code class="font-mono">nrelay</code>, <code class="font-mono">nevent</code>, <code class="font-mono">naddr</code>. The SDK exposes <code class="font-mono">npubEncode</code> and <code class="font-mono">nsecEncode</code>.</li>
		<li><strong>NIP-33</strong> — Replaceable events. Listings and stalls are keyed by <code class="font-mono">pubkey + d</code> so a new version supersedes the old one.</li>
		<li><strong>NIP-44</strong> — Encryption. Used inside the NIP-17 gift-wrap flow.</li>
	</ul>
</section>

<section>
	<h2 id="d-tag-replaceability">The <code class="font-mono">d</code> tag and replaceability</h2>
	<p>Listings and stalls carry a <code class="font-mono">d</code> tag — a stable identifier the vendor picks (a UUID, a slug, a SKU). The pair <code class="font-mono">(pubkey, d)</code> uniquely identifies the event. A newer event with the same pair supersedes the older one on relays (NIP-33).</p>
	<p>This means a vendor updates a listing by signing a new event with the same <code class="font-mono">d</code> tag. No central database. No edit history to manage. The latest version wins.</p>
</section>

<section>
	<h2 id="v-tag-conventions">The <code class="font-mono">v</code> tag and conventions</h2>
	<p>Conventions ride on a reserved <code class="font-mono">v</code> tag. The first value names the convention namespace (for example, <code class="font-mono">voyager.accommodation.v1</code>); the remaining values are alternating keys and values defined by that convention. New vendor kinds ship by publishing a new convention. The substrate stays fixed.</p>
	<p>See <a href="/docs/how-voyager-pay-extends">How Voyager Pay extends</a> for the full convention pattern.</p>
</section>

<section>
	<p>Continue to <a href="/docs/how-voyager-pay-works">How Voyager Pay works</a>.</p>
</section>
