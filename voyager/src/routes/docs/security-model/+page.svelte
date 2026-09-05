<svelte:head>
	<title>Security model — Voyager docs</title>
</svelte:head>

<section>
	<span class="eyebrow">Security</span>
	<h1>Security model.</h1>
	<p>The SDK respects a sharp boundary. It parses, validates, and signs. It does not generate, store, or export keys. It does not collect telemetry. The user owns the keys, the wallet, and the data. The protocol never holds funds.</p>
</section>

<section>
	<h2 id="no-keygen">No keygen</h2>
	<p>The SDK refuses to invent an identity. There is no <code class="font-mono">voyager.createIdentity</code>. The only paths to a keypair are:</p>
	<ul>
		<li><code class="font-mono">voyager.fromNsec('nsec1…')</code> — the production path. The user supplies the key; the SDK parses and validates it.</li>
		<li><code class="font-mono">voyager.demoKey()</code> — a shared demo key for exploration. Throws <code class="font-mono">VoyagerError('DEMO_KEY_DISABLED')</code> in production environments.</li>
	</ul>
</section>

<section>
	<h2 id="user-brings-key">The user brings the key</h2>
	<p>Keys live wherever the user keeps them: a hardware signer, a NIP-46 remote signer (bunker), or a local nsec paste. The SDK calls <code class="font-mono">sign(template, sk)</code> with the user's key. The key is never written to storage, never logged, never transmitted.</p>
	<p>Integrators who need remote signing integrate their own NIP-46 bunker or hardware-wallet bridge. The SDK exposes one signing call. Remote-signer handshakes are not part of the SDK surface.</p>
</section>

<section>
	<h2 id="no-telemetry">No telemetry</h2>
	<p>The SDK has no analytics, no error reporting, no remote calls. Every verb runs against the relays you pass to it. The module-level config is the only piece of state the SDK keeps, and it stays in the runtime that imports it.</p>
	<p>MIT. No required attribution. No royalty. The protocol survives without Voyager-the-business.</p>
</section>

<section>
	<h2 id="no-custody-protocol">No custody at the protocol layer</h2>
	<p>Voyager Pay settles on Lightning. The SDK signs events and publishes them; the network moves the funds. Settlement is atomic with the network or it does not happen. The protocol never holds a balance. See <a href="/docs/how-voyager-pay-works">How Voyager Pay works</a> for the seven-step flow.</p>
</section>

<section>
	<h2 id="encrypted-dms">Encrypted direct messages</h2>
	<p>Direct messages use NIP-17 gift wrapping. Relays see only ciphertext. Only the named recipient can open the rumor. The SDK wraps on send, unwraps on read.</p>
</section>

<section>
	<h2 id="honest-limits-security">Honest limits</h2>
	<p>A short list of things the SDK does not solve:</p>
	<ul>
		<li><strong>Lost keys.</strong> If the user loses their nsec and has no backup, no one can recover it. Not the SDK, not the relays, not Voyager.</li>
		<li><strong>Compromised devices.</strong> The SDK signs on whatever machine runs it. A keylogger reads the key. Use a hardware signer or NIP-46 bunker for high-value use.</li>
		<li><strong>Fiat-rail reversals.</strong> Settlement is atomic on Lightning. Fiat moves off-protocol. Disputes on the fiat side are an honest limit of any non-custodial design.</li>
		<li><strong>Relay availability.</strong> Reads fan out across multiple relays. If every relay you use is down or censored, reads stall. Use a diverse relay set.</li>
	</ul>
</section>
