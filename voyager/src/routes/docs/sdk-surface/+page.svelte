<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>SDK surface — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">SDK</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		SDK surface.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Fourteen verbs, grouped by area. The SDK is one ESM file, ~500 lines, MIT, no AI, no telemetry. It hides the wire format and the relay fan-out. You bring the keys.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-10 text-[17px] leading-relaxed text-ink-2">

		<div>
			<h2 id="identity">Identity</h2>
			<p>Parse and validate a user-provided key, or get the shared demo key for exploration.</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.demoKey()</code> → <code class="font-mono">&#123;npub, nsec&#125;</code>. Shared demo keypair. Throws <code class="font-mono">VoyagerError('DEMO_KEY_DISABLED')</code> in production.</li>
				<li><code class="font-mono">voyager.fromNsec(nsec)</code> → <code class="font-mono">&#123;npub, nsec&#125;</code>. Parse and validate a user-provided nsec.</li>
			</ul>
		</div>

		<div>
			<h2 id="signing">Signing and verification</h2>
			<p>Canonical Nostr event signing. One call each way.</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.sign(template, sk)</code> → signed event.</li>
				<li><code class="font-mono">voyager.verify(event)</code> → boolean.</li>
				<li><code class="font-mono">voyager.eventId(event)</code> → sha256 hex.</li>
				<li><code class="font-mono">voyager.serializeEvent(event)</code> → canonical JSON.</li>
			</ul>
		</div>

		<div>
			<h2 id="listings">Listings (kind 30402)</h2>
			<p>Signed listings on NIP-33 replaceable events, keyed by vendor pubkey + a stable listing id (<code class="font-mono">d</code> tag).</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.listing(input, sk)</code> → signed event.</li>
				<li><code class="font-mono">voyager.updateListing(d, patch, sk)</code> → signed event (replaces).</li>
				<li><code class="font-mono">voyager.listings(&#123;relays, author, d, kinds, timeout&#125;)</code> → array of parsed listings.</li>
			</ul>
		</div>

		<div>
			<h2 id="stalls">Stalls (kind 30017)</h2>
			<p>Signed stalls. A stall is a vendor's profile, listing their conventions and capabilities.</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.stall(input, sk)</code> → signed event.</li>
				<li><code class="font-mono">voyager.updateStall(d, patch, sk)</code> → signed event (replaces).</li>
				<li><code class="font-mono">voyager.stalls(&#123;relays, author, timeout&#125;)</code> → array of parsed stalls.</li>
			</ul>
		</div>

		<div>
			<h2 id="dms">DMs (NIP-17)</h2>
			<p>Gift-wrapped direct messages. Relays see only ciphertext.</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.dmSend(toNpub, payload, sk, &#123;relays, dryRun?&#125;)</code> → <code class="font-mono">&#123;id, wrap&#125;</code>.</li>
				<li><code class="font-mono">voyager.dmOpen(giftwrap, sk)</code> → <code class="font-mono">&#123;fromNpub, rumor&#125;</code> or null.</li>
				<li><code class="font-mono">voyager.dmInbox(sk, &#123;relays, since, until, limit&#125;)</code> → array of opened messages.</li>
			</ul>
		</div>

		<div>
			<h2 id="ramp">Ramp (kind 38383)</h2>
			<p>Mostro-node ramp intents and quotes. The federation runs the market; clients rank candidates.</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.rampIntent(&#123;side, amt, fiat, method?, z?&#125;, sk)</code> → signed intent.</li>
				<li><code class="font-mono">voyager.rampQuote(intentOrId, quote, sk)</code> → signed quote.</li>
				<li><code class="font-mono">voyager.rampQuotes(&#123;intentId, relays, timeout&#125;)</code> → array of quote events.</li>
			</ul>
		</div>

		<div>
			<h2 id="transport">Relay transport</h2>
			<p>Publish, fetch, and subscribe. Configuration is module-level.</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.config(&#123;defaultRelays, timeout&#125;)</code> → set module-level defaults.</li>
				<li><code class="font-mono">voyager.publish(relay | relays, event)</code> → <code class="font-mono">&#123;ok, relay&#125;</code> on first-OK.</li>
				<li><code class="font-mono">voyager.get(relay | relays, filter)</code> → event or null.</li>
				<li><code class="font-mono">voyager.on(filter, callback)</code> → <code class="font-mono">unsub()</code>. Realtime subscription.</li>
			</ul>
		</div>

		<div>
			<h2 id="misc">Misc</h2>
			<p>Parse-on-read helpers and encoders.</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><code class="font-mono">voyager.parse(event)</code> → <code class="font-mono">&#123;kind, author, kindX: &#123;...&#125;, event&#125;</code>. Parsed view.</li>
				<li><code class="font-mono">voyager.npubEncode(pubBytes)</code>, <code class="font-mono">voyager.nsecEncode(skBytes)</code> — NIP-19 bech32.</li>
				<li><code class="font-mono">VoyagerError</code> — typed error with a <code class="font-mono">.code</code> field.</li>
			</ul>
		</div>

	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Install</span>
			<h3 class="mt-2 font-display text-xl text-ink">npm i voyager-sdk</h3>
			<p class="mt-2 text-sm text-ink-2">One ESM file. Node 22+ or any modern browser. MIT.</p>
		</div>
		<Cta variant="primary" href="/build">Read the quick start</Cta>
	</div>
</section>
