<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
</script>

<svelte:head>
	<title>Start building — Voyager · open rails</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<!-- SDK get-started -->
<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// the SDK</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.95] max-w-4xl" style="color: var(--register-text);">
			Ship with one import.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed" style="color: var(--register-on-dark-soft);">
			Nostr-native. Lean. ~500 lines in one ESM file. The SDK hides the wire format and the relay fan-out. You bring the keys.
		</p>
	</div>
	<div class="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
		<figure class="rounded-[24px] bg-[var(--register-ground)] border border-[var(--register-hair)] overflow-hidden">
			<div class="flex items-center gap-2 px-5 py-3 border-b border-[var(--register-hair)]">
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--heritage-amber);"></span>
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--heritage-sepia);"></span>
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--heritage-rust);"></span>
				<span class="ml-2 font-mono text-[12px] text-[var(--register-muted)]">your-app.js</span>
			</div>
			<pre class="m-0 px-6 py-5 font-mono text-[13px] leading-[1.6] text-[var(--register-text)] bg-[var(--register-card)] overflow-x-auto"><span class="text-[var(--register-muted)]">// one ESM file, ~500 lines</span>
<span class="text-[var(--register-text)]">import</span> * <span class="text-[var(--register-text)]">as</span> voyager <span class="text-[var(--register-text)]">from</span> <span style="color: var(--register-accent)">"voyager-sdk"</span>;

<span class="text-[var(--register-muted)]">// Configure once at app entry</span>
voyager.config(&#123;
  defaultRelays: [<span style="color: var(--register-accent)">"wss://relay.damus.io"</span>, <span style="color: var(--register-accent)">"wss://nos.lol"</span>, <span style="color: var(--register-accent)">"wss://relay.nostr.band"</span>],
  timeout: <span style="color: var(--register-accent)">10000</span>,
&#125;);

<span class="text-[var(--register-muted)]">// Bring your own key (nsec from a hardware signer, NIP-46 remote signer, etc.)</span>
<span class="text-[var(--register-text)]">const</span> me = <span class="text-[var(--register-text)]">await</span> voyager.fromNsec(<span style="color: var(--register-accent)">"nsec1..."</span>);

<span class="text-[var(--register-muted)]">// Or for SDK exploration only — refuses to run in production:</span>
<span class="text-[var(--register-text)]">const</span> me = <span class="text-[var(--register-text)]">await</span> voyager.demoKey();

<span class="text-[var(--register-muted)]">// Build + sign a listing (kind 30402)</span>
<span class="text-[var(--register-text)]">const</span> listing = <span class="text-[var(--register-text)]">await</span> voyager.listing(
  &#123; d: <span style="color: var(--register-accent)">"snapper-001"</span>, title: <span style="color: var(--register-accent)">"Fresh whole snapper"</span>, price: [<span style="color: var(--register-accent)">"42000"</span>, <span style="color: var(--register-accent)">"sats"</span>] &#125;,
  me.nsec
);

<span class="text-[var(--register-muted)]">// Publish (first-OK across relays) or read (fan-out + dedup)</span>
<span class="text-[var(--register-text)]">await</span> voyager.publish(listing);
<span class="text-[var(--register-text)]">const</span> listings = <span class="text-[var(--register-text)]">await</span> voyager.listings(&#123; author: someVendorNpub &#125;);

<span class="text-[var(--register-muted)]">// Subscribe live</span>
voyager.on(&#123; kinds: [<span style="color: var(--register-accent)">30402</span>], authors: [someVendorNpub] &#125;, (ev) =&gt; &#123;
  console.log(<span style="color: var(--register-accent)">"new listing:"</span>, ev);
&#125;);

<span class="text-[var(--register-muted)]">// NIP-17 gift-wrapped DM</span>
<span class="text-[var(--register-text)]">await</span> voyager.dmSend(recipientNpub, &#123; type: <span style="color: var(--register-accent)">"order_request"</span>, items: [...] &#125;, me.nsec);</pre>
		</figure>
		<div class="flex flex-col gap-4 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">What you get</span>
			<ul class="flex flex-col gap-3 text-[15px] text-[var(--register-muted)]">
				<li>One ESM file, ~500 lines. Zero runtime deps (relies on @noble/curves + @noble/hashes).</li>
				<li>MIT. No telemetry. No required attribution.</li>
				<li>JavaScript today. Runs in Node 22+ and any modern browser.</li>
				<li>Web app, Node service, or serverless function. No daemon, no relay pool.</li>
				<li>User-brings-the-key. SDK does not generate keys — hardware signers and NIP-46 remote signers integrate cleanly.</li>
			</ul>
		</div>
	</div>
</section>

<!-- SDK / What's inside -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid grid-cols-1 lg:grid-cols-2 rounded-[28px] overflow-hidden">
		<div class="p-8 sm:p-12 flex flex-col gap-5 bg-[var(--register-ground)]">
			<span class="eyebrow">// the SDK</span>
			<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] max-w-md text-[var(--register-text)]">Unified surface.</h2>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)] max-w-md">A handful of well-named calls. The SDK hides the wire format and the relay fan-out. MIT. No telemetry. No required attribution.</p>
		</div>
		<div class="p-8 sm:p-12 flex flex-col gap-5" style="background-color: var(--register-accent); color: var(--register-accent-ink);">
			<span class="eyebrow" style="--register-eyebrow: var(--register-accent-ink); opacity: 0.7">// what's inside</span>
			<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] max-w-md" style="color: var(--register-accent-ink)">Four substrates, fourteen verbs.</h2>
			<p class="text-[15px] leading-relaxed max-w-md" style="color: var(--register-accent-ink)">identity (demoKey, fromNsec), signing (sign, verify, eventId), listings &amp; stalls (30402, 30017), DMs (NIP-17), ramp (38383 intent + quote). Relay transport is config + publish + get + on. That is most of what builders need. The rest is configuration, not new API.</p>
			<div class="mt-2">
				<Cta variant="secondary" href="/docs" class="border-ink! text-ink! hover:bg-ink! hover:text-[var(--register-accent)]!">Read the docs</Cta>
			</div>
		</div>
	</div>
</section>

<!-- Key model -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// key model"
		title="You bring the key. The SDK never holds it."
		lede="Hardware signer. NIP-46 remote signer. nsec paste. The SDK parses, validates, and signs. It does not generate, store, or export."
	/>
	<div class="mt-10 flex flex-col gap-5 rounded-[28px] bg-[var(--register-card)] p-8 text-[15px] leading-relaxed text-[var(--register-muted)]">
		<p>
			<span class="font-display text-[var(--register-text)]">No keygen.</span> The SDK refuses to invent an identity for you. <code class="font-mono text-[var(--register-text)]">voyager.fromNsec('nsec1…')</code> is the only production path; keys live wherever the user keeps them.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">A shared demo key, refused in production.</span> <code class="font-mono text-[var(--register-text)]">voyager.demoKey()</code> exists so the first 30 minutes of poking the API doesn't require a wallet. It throws <code class="font-mono text-[var(--register-text)]">VoyagerError('DEMO_KEY_DISABLED')</code> when <code class="font-mono text-[var(--register-text)]">NODE_ENV === 'production'</code> or the hostname matches a production pattern.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">One signing call.</span> <code class="font-mono text-[var(--register-text)]">voyager.sign(template, sk)</code> produces a canonical Nostr event; <code class="font-mono text-[var(--register-text)]">voyager.verify(event)</code> checks it. No remote signer handshake in the SDK — that's the integrator's job (NIP-46 bunker, hardware wallet bridge).
		</p>
	</div>
</section>

<!-- Verb reference -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="// the surface"
		title="Fourteen verbs. Grouped by area."
		lede="Pass-through for raw event shape. Parse-on-read. Fan-out reads. Real-time on()."
	/>
	<div class="mt-10 rounded-[28px] bg-[var(--register-card)] p-8">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">Identity</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">demoKey()</code> <span class="opacity-70">→ &#123;npub, nsec&#125;</span></li>
					<li><code class="text-[var(--register-text)]">fromNsec(nsec)</code> <span class="opacity-70">→ &#123;npub, nsec&#125;</span></li>
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">Signing &amp; verification</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">sign(template, sk)</code></li>
					<li><code class="text-[var(--register-text)]">verify(event)</code></li>
					<li><code class="text-[var(--register-text)]">eventId(event)</code></li>
					<li><code class="text-[var(--register-text)]">serializeEvent(event)</code></li>
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">Listings (kind 30402)</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">listing(input, sk)</code></li>
					<li><code class="text-[var(--register-text)]">updateListing(d, patch, sk)</code></li>
					<li><code class="text-[var(--register-text)]">listings(&#123;relays, author, d, kinds, timeout&#125;)</code></li>
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">Stalls (kind 30017)</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">stall(input, sk)</code></li>
					<li><code class="text-[var(--register-text)]">updateStall(d, patch, sk)</code></li>
					<li><code class="text-[var(--register-text)]">stalls(&#123;relays, author, timeout&#125;)</code></li>
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">DMs (NIP-17)</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">dmSend(toNpub, payload, sk, &#123;relays, dryRun?&#125;)</code></li>
					<li><code class="text-[var(--register-text)]">dmOpen(giftwrap, sk)</code></li>
					<li><code class="text-[var(--register-text)]">dmInbox(sk, &#123;relays, since, until, limit&#125;)</code></li>
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">Ramp (kind 38383)</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">rampIntent(&#123;side, amt, fiat, method?, z?&#125;, sk)</code></li>
					<li><code class="text-[var(--register-text)]">rampQuote(intentOrId, quote, sk)</code></li>
					<li><code class="text-[var(--register-text)]">rampQuotes(&#123;intentId, relays, timeout&#125;)</code></li>
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">Relay transport</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">publish(relay | relays, event)</code></li>
					<li><code class="text-[var(--register-text)]">get(relay | relays, filter)</code></li>
					<li><code class="text-[var(--register-text)]">on(filter, callback)</code> <span class="opacity-70">→ unsub()</span></li>
					<li><code class="text-[var(--register-text)]">config(&#123;defaultRelays, timeout&#125;)</code></li>
				</ul>
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="font-display text-lg text-[var(--register-text)]">Misc</h3>
				<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
					<li><code class="text-[var(--register-text)]">parse(event)</code></li>
					<li><code class="text-[var(--register-text)]">npubEncode(pubBytes)</code></li>
					<li><code class="text-[var(--register-text)]">nsecEncode(skBytes)</code></li>
					<li><code class="text-[var(--register-text)]">VoyagerError</code> <span class="opacity-70">— typed error with .code</span></li>
				</ul>
			</div>
		</div>
		<div class="mt-10 flex flex-wrap items-center gap-3">
			<a
				href="https://github.com/terrifickid/voyager-sdk"
				target="_blank"
				rel="noopener noreferrer"
				class="sdk-github-link inline-flex items-center gap-2 rounded-pill px-5 py-3 text-[15px] font-semibold leading-none transition-colors"
			>
				Read the SDK on GitHub
				<span aria-hidden="true" class="text-[1.05em] leading-none -mr-0.5">›</span>
			</a>
			<Cta variant="secondary" href="/docs">Read the docs</Cta>
		</div>
	</div>
</section>

<!-- The full protocol RFC -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="rounded-[28px] bg-[var(--register-card)] p-8 sm:p-10">
		<span class="eyebrow">// the spec</span>
		<h2 class="mt-3 font-display text-[36px] sm:text-[44px] leading-[1.05] max-w-2xl" style="color: var(--register-text);">
			The full protocol RFC.
		</h2>
		<p class="mt-4 max-w-2xl text-[15px] leading-relaxed" style="color: var(--register-muted);">
			DRAFT, version 0.4.0. For implementers, auditors, and operators — RFC 2119 normative language, JSON-Schema for substrate events, conformance test vectors, and the SDK contract.
		</p>
		<div class="mt-6 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/docs/rfc" class="bg-ink! text-bone-50! hover:bg-ink-2!">Read the RFC</Cta>
			<Cta variant="secondary" href="https://github.com/terrifickid/voyager-sdk/blob/master/VOYAGER_RFC.md" class="border-ink! text-ink! hover:bg-ink! hover:text-[var(--register-accent)]!">View on GitHub</Cta>
		</div>
	</div>
</section>

<!-- Economics -->
<section id="economics" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Builder economics"
		title="What we charge for, and what we don't."
		lede="Voyager-the-business has no protocol-critical revenue. The protocol survives without us."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">We charge for</span>
			<ul class="flex flex-col gap-3 text-[15px] text-[var(--register-muted)]">
				<li><span class="font-display text-[var(--register-text)]">Hosted indexer.</span> Free tier + paid SLA for apps that need higher rate limits and webhooks.</li>
				<li><span class="font-display text-[var(--register-text)]">Reference Mostro node.</span> 0.3% fee on Caribbean rail trades. Competitive with regional alternatives.</li>
				<li><span class="font-display text-[var(--register-text)]">Premium SDK features.</span> Pre-indexed discovery, hosted webhooks, app-builder support contracts.</li>
				<li><span class="font-display text-[var(--register-text)]">Implementation services.</span> Help for builders who want to ship their first app on the toolkit.</li>
			</ul>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">We don't charge for</span>
			<ul class="flex flex-col gap-3 text-[15px] text-[var(--register-muted)]">
				<li>Lightning routing fees. That's the routing nodes' | business.</li>
				<li>A cut of every app's commerce. We are not a platform tax.</li>
				<li>User data. We have no user data; users own their keys.</li>
				<li>Proprietary lock-in via identity. Nostr keys are interoperable with hundreds of apps.</li>
			</ul>
		</article>
	</div>
</section>

<!-- Regulatory posture -->
<section id="regulatory" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Regulatory posture"
		title="We're not a money services business. Neither are you, by default."
		lede="The protocol doesn't see fiat, hold funds, or run KYC. Apps that touch fiat take on their own posture. Voyager ships a checklist so builders know what to think about."
	/>
	<div class="mt-10 flex flex-col gap-4 rounded-[28px] bg-[var(--register-card)] p-8 text-[15px] leading-relaxed text-[var(--register-muted)]">
		<p>
			<span class="font-display text-[var(--register-text)]">No custody.</span> The protocol never holds funds. Settlement either completes atomically or it does not happen.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">No wallet custody.</span> Users bring their own (Alby, Mutiny, Phoenix, Breez, Zeus). Voyager operates no custodial balance.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">No identity dossier.</span> KYC is the optional responsibility of whoever touches fiat. The protocol layer doesn't see it, doesn't store it, doesn't require it.
		</p>
		<p>
			<span class="font-display text-[var(--register-text)]">Apps carry their own posture.</span> The SDK ships with a regulatory checklist naming the touch points (MSB, data protection, voluntary KYC). It is not legal advice.
		</p>
	</div>
</section>

<!-- Join the alpha -->
<section id="join-alpha" class="mx-auto max-w-6xl px-6 pb-32 scroll-mt-20">
		<div class="rounded-[32px] bg-[var(--register-accent)] text-[var(--register-accent-ink)] p-10 sm:p-16 text-center border border-[var(--heritage-rust)]/40">
			<span class="eyebrow" style="--register-eyebrow: var(--register-accent-ink); opacity: 0.7">// join the alpha</span>
			<h2 class="mt-4 font-display text-[40px] sm:text-[52px] lg:text-[64px] max-w-3xl mx-auto leading-[1.02]" style="color: var(--register-accent-ink)">
				Ship on the toolkit. We'll help you ship.
			</h2>
			<p class="mt-6 max-w-xl mx-auto text-lg" style="color: var(--register-accent-ink); opacity: 0.8">
				Two Caribbean builder teams TBD — one Jamaica, one Trinidad — selected by what use case they want to ship, not by technical prestige. Remote developers welcome.
			</p>
			<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
				<Cta variant="primary" href="mailto:hello@voyager.example?subject=Alpha%20build" class="bg-ink! text-bone-50! hover:bg-ink-2!">Email the alpha team</Cta>
				<Cta variant="secondary" href="/principles" class="border-ink! text-ink! hover:bg-ink! hover:text-[var(--register-accent)]!">Read the principles</Cta>
			</div>
		</div>
	</section>

<style>
	.sdk-github-link {
		background-color: var(--register-accent);
		color: var(--register-accent-ink);
	}
	.sdk-github-link:hover {
		background-color: var(
			--register-accent-hover,
			color-mix(in srgb, var(--register-accent) 92%, black)
		);
	}
</style>

</RegisterSection>
