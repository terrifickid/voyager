<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>Nostr primitives — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">SDK</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		Nostr primitives.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		The events, kinds, and NIPs the SDK speaks. Voyager does not invent a wire format. It uses the Nostr wire format, scoped to a small set of kinds and NIPs.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-10 text-[17px] leading-relaxed text-ink-2">

		<div>
			<h2 id="events">Events</h2>
			<p>
				Everything in the SDK is a Nostr event: a signed JSON object with a kind, a content field, a set of tags, and a Schnorr signature over a canonical serialization. See <a href="https://github.com/nostr-protocol/nips/blob/master/01.md" class="underline underline-offset-4">NIP-01</a> for the basic event spec.
			</p>
			<p>
				The SDK passes events through as raw shape. <code class="font-mono">voyager.parse(event)</code> returns a typed view per kind.
			</p>
		</div>

		<div>
			<h2 id="kinds">Event kinds</h2>
			<p>The SDK works with five kind ranges:</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><span class="font-display text-ink">30402</span> — Listing. A vendor's product, service, or offer. Replaceable by <code class="font-mono">pubkey + d</code>.</li>
				<li><span class="font-display text-ink">30017</span> — Stall. A vendor's profile, pointing at the conventions they use.</li>
				<li><span class="font-display text-ink">38383</span> — Ramp intent and quote. Mostro nodes advertise themselves with this kind and respond to intents with quotes.</li>
				<li><span class="font-display text-ink">14</span> — Direct message rumor (NIP-17).</li>
				<li><span class="font-display text-ink">1059</span> — Gift wrap (NIP-17). The outer envelope that hides the recipient.</li>
			</ul>
		</div>

		<div>
			<h2 id="nips">NIPs used</h2>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><span class="font-display text-ink">NIP-01</span> — Basic event format. Every event in the SDK is a valid NIP-01 event.</li>
				<li><span class="font-display text-ink">NIP-17</span> — Gift-wrapped direct messages. <code class="font-mono">dmSend</code>, <code class="font-mono">dmOpen</code>, <code class="font-mono">dmInbox</code>.</li>
				<li><span class="font-display text-ink">NIP-19</span> — bech32 encoding. <code class="font-mono">npub</code>, <code class="font-mono">nsec</code>, <code class="font-mono">nprofile</code>, <code class="font-mono">nrelay</code>, <code class="font-mono">nevent</code>, <code class="font-mono">naddr</code>. The SDK exposes <code class="font-mono">npubEncode</code> and <code class="font-mono">nsecEncode</code>.</li>
				<li><span class="font-display text-ink">NIP-33</span> — Replaceable events. Listings and stalls are keyed by <code class="font-mono">pubkey + d</code> so a new version supersedes the old one.</li>
				<li><span class="font-display text-ink">NIP-44</span> — Encryption. Used inside the NIP-17 gift-wrap flow.</li>
			</ul>
		</div>

		<div>
			<h2 id="d-tags">The <code class="font-mono">d</code> tag and replaceability</h2>
			<p>
				Listings and stalls carry a <code class="font-mono">d</code> tag — a stable identifier the vendor picks (a UUID, a slug, a SKU). The pair <code class="font-mono">(pubkey, d)</code> uniquely identifies the event. A newer event with the same pair supersedes the older one on relays (NIP-33).
			</p>
			<p>
				This means a vendor updates a listing by signing a new event with the same <code class="font-mono">d</code> tag. No central database. No edit history to manage. The latest version wins.
			</p>
		</div>

		<div>
			<h2 id="v-tags">The <code class="font-mono">v</code> tag and conventions</h2>
			<p>
				Conventions ride on a reserved <code class="font-mono">v</code> tag. The first value names the convention namespace (for example, <code class="font-mono">voyager.accommodation.v1</code>); the remaining values are alternating keys and values defined by that convention. New vendor kinds ship by publishing a new convention. The substrate stays fixed.
			</p>
			<p>
				See <a href="/docs/how-voyager-pay-extends" class="underline underline-offset-4">How Voyager Pay extends</a> for the full convention pattern.
			</p>
		</div>

	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next</span>
			<h3 class="mt-2 font-display text-xl text-ink">How Voyager Pay works</h3>
			<p class="mt-2 text-sm text-ink-2">Custody-free, identity-free Lightning rail over signed Nostr events.</p>
		</div>
		<Cta variant="primary" href="/docs/how-voyager-pay-works">Continue</Cta>
	</div>
</section>
