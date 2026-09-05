<script>
</script>

<svelte:head>
	<title>SDK surface — Voyager docs</title>
</svelte:head>

<section>
	<span class="eyebrow">SDK</span>
	<h1>SDK surface.</h1>
	<p>Fourteen verbs, grouped by area. The SDK is one ESM file, ~500 lines, MIT, no AI, no telemetry. It hides the wire format and the relay fan-out. You bring the keys.</p>
</section>

<section>
	<h2 id="identity">Identity</h2>
	<p>Parse and validate a user-provided key, or get the shared demo key for exploration.</p>
	<ul>
		<li><code class="font-mono">voyager.demoKey()</code> → <code class="font-mono">&#123;npub, nsec&#125;</code>. Shared demo keypair. Throws <code class="font-mono">VoyagerError('DEMO_KEY_DISABLED')</code> in production.</li>
		<li><code class="font-mono">voyager.fromNsec(nsec)</code> → <code class="font-mono">&#123;npub, nsec&#125;</code>. Parse and validate a user-provided nsec.</li>
	</ul>
</section>

<section>
	<h2 id="signing-and-verification">Signing and verification</h2>
	<p>Canonical Nostr event signing. One call each way.</p>
	<ul>
		<li><code class="font-mono">voyager.sign(template, sk)</code> → signed event.</li>
		<li><code class="font-mono">voyager.verify(event)</code> → boolean.</li>
		<li><code class="font-mono">voyager.eventId(event)</code> → sha256 hex.</li>
		<li><code class="font-mono">voyager.serializeEvent(event)</code> → canonical JSON.</li>
	</ul>
</section>

<section>
	<h2 id="listings-30402">Listings (kind 30402)</h2>
	<p>Signed listings on NIP-33 replaceable events, keyed by vendor pubkey + a stable listing id (<code class="font-mono">d</code> tag).</p>
	<ul>
		<li><code class="font-mono">voyager.listing(input, sk)</code> → signed event.</li>
		<li><code class="font-mono">voyager.updateListing(d, patch, sk)</code> → signed event (replaces).</li>
		<li><code class="font-mono">voyager.listings(&#123;relays, author, d, kinds, timeout&#125;)</code> → array of parsed listings.</li>
	</ul>
</section>

<section>
	<h2 id="stalls-30017">Stalls (kind 30017)</h2>
	<p>Signed stalls. A stall is a vendor's profile, listing their conventions and capabilities.</p>
	<ul>
		<li><code class="font-mono">voyager.stall(input, sk)</code> → signed event.</li>
		<li><code class="font-mono">voyager.updateStall(d, patch, sk)</code> → signed event (replaces).</li>
		<li><code class="font-mono">voyager.stalls(&#123;relays, author, timeout&#125;)</code> → array of parsed stalls.</li>
	</ul>
</section>

<section>
	<h2 id="dms-nip17">DMs (NIP-17)</h2>
	<p>Gift-wrapped direct messages. Relays see only ciphertext.</p>
	<ul>
		<li><code class="font-mono">voyager.dmSend(toNpub, payload, sk, &#123;relays, dryRun?&#125;)</code> → <code class="font-mono">&#123;id, wrap&#125;</code>.</li>
		<li><code class="font-mono">voyager.dmOpen(giftwrap, sk)</code> → <code class="font-mono">&#123;fromNpub, rumor&#125;</code> or null.</li>
		<li><code class="font-mono">voyager.dmInbox(sk, &#123;relays, since, until, limit&#125;)</code> → array of opened messages.</li>
	</ul>
</section>

<section>
	<h2 id="ramp-38383">Ramp (kind 38383)</h2>
	<p>Mostro-node ramp intents and quotes. The federation runs the market; clients rank candidates.</p>
	<ul>
		<li><code class="font-mono">voyager.rampIntent(&#123;side, amt, fiat, method?, z?&#125;, sk)</code> → signed intent.</li>
		<li><code class="font-mono">voyager.rampQuote(intentOrId, quote, sk)</code> → signed quote.</li>
		<li><code class="font-mono">voyager.rampQuotes(&#123;intentId, relays, timeout&#125;)</code> → array of quote events.</li>
	</ul>
</section>

<section>
	<h2 id="relay-transport">Relay transport</h2>
	<p>Publish, fetch, and subscribe. Configuration is module-level.</p>
	<ul>
		<li><code class="font-mono">voyager.config(&#123;defaultRelays, timeout&#125;)</code> → set module-level defaults.</li>
		<li><code class="font-mono">voyager.publish(relay | relays, event)</code> → <code class="font-mono">&#123;ok, relay&#125;</code> on first-OK.</li>
		<li><code class="font-mono">voyager.get(relay | relays, filter)</code> → event or null.</li>
		<li><code class="font-mono">voyager.on(filter, callback)</code> → <code class="font-mono">unsub()</code>. Realtime subscription.</li>
	</ul>
</section>

<section>
	<h2 id="misc">Misc</h2>
	<p>Parse-on-read helpers and encoders.</p>
	<ul>
		<li><code class="font-mono">voyager.parse(event)</code> → <code class="font-mono">&#123;kind, author, kindX: &#123;...&#125;, event&#125;</code>. Parsed view.</li>
		<li><code class="font-mono">voyager.npubEncode(pubBytes)</code>, <code class="font-mono">voyager.nsecEncode(skBytes)</code> — NIP-19 bech32.</li>
		<li><code class="font-mono">VoyagerError</code> — typed error with a <code class="font-mono">.code</code> field.</li>
	</ul>
</section>

<section>
	<p>Looking to ship on the SDK? The <a href="/build">build page</a> has the install, quick start, and verb reference in one place.</p>
</section>
