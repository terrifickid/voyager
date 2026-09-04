<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>Documentation — Voyager</title>
</svelte:head>

<section>
	<span class="eyebrow">Overview</span>
	<h1>The Voyager spec.</h1>
	<p>Voyager is a Nostr-native toolkit. These pages describe the SDK surface, the primitives it speaks, and the protocol that runs on top. Pick the path that fits you, or read top to bottom.</p>
	<p>
		<Cta variant="primary" href="/docs/sdk-surface">Start with the SDK surface</Cta>
	</p>
</section>

<section>
	<h2>SDK</h2>
	<p>The verbs, the events, the NIPs.</p>
	<ul>
		<li><a href="/docs/sdk-surface">SDK surface</a> — fourteen verbs, grouped by area. Identity, signing, listings, stalls, DMs, ramp, relay transport.</li>
		<li><a href="/docs/nostr-primitives">Nostr primitives</a> — events, kinds, and the NIPs the SDK speaks. NIP-01, NIP-17, NIP-19, NIP-33, NIP-44.</li>
	</ul>
</section>

<section>
	<h2>Protocol</h2>
	<p>How Voyager Pay works, how prices form, and how new vendor kinds ship.</p>
	<ul>
		<li><a href="/docs/how-voyager-pay-works">How Voyager Pay works</a> — custody-free, identity-free Lightning rail over signed Nostr events.</li>
		<li><a href="/docs/how-price-discovery-works">How price discovery works</a> — a federation of Mostro nodes ranked client-side on rate, fee, and reputation.</li>
		<li><a href="/docs/how-voyager-pay-extends">How Voyager Pay extends</a> — a substrate and a tag prefix. Any vendor kind can ship without amending the protocol.</li>
	</ul>
</section>

<section>
	<h2>Security</h2>
	<p>Keys, no custody, no telemetry. The boundary the SDK respects.</p>
	<ul>
		<li><a href="/docs/security-model">Security model</a> — user brings the key. SDK parses, validates, and signs. It does not generate, store, or export.</li>
	</ul>
</section>

<section>
	<p>Looking to ship on the SDK? The <a href="/build">build page</a> has the install, quick start, and verb reference in one place.</p>
</section>
