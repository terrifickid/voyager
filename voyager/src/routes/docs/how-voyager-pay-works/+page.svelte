<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How Voyager Pay works — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Protocol</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How Voyager Pay works.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Voyager Pay is a custody-free, identity-free Lightning rail layered over signed Nostr events. Customers and vendors hold the same kind of key, speak the same events, and settle on Lightning. The protocol outlives any single operator.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-10 text-[17px] leading-relaxed text-ink-2">

		<div>
			<h2 id="design-invariants">Design invariants</h2>
			<p>The protocol refuses to negotiate on five points:</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><span class="font-display text-ink">No custody.</span> The protocol never holds funds. Settlement is atomic with the network or it does not happen.</li>
				<li><span class="font-display text-ink">No identity required.</span> Keys are pseudonymous. There is no KYC tier at the protocol layer.</li>
				<li><span class="font-display text-ink">Customer ↔ vendor symmetry.</span> Both sides hold the same kind of key, speak the same events, and bear the same responsibility.</li>
				<li><span class="font-display text-ink">Protocol outlives us.</span> Reference clients are demos. The wire format is the product.</li>
				<li><span class="font-display text-ink">Payments are Lightning.</span> Final settlement moves on Lightning. Everything else is plumbing.</li>
			</ul>
		</div>

		<div>
			<h2 id="layers">Layers</h2>
			<p>
				<strong class="text-ink">Wallets.</strong> Mobile and desktop wallets that sign events, manage keys, and show the user's balance. Wallets are interchangeable. No wallet is privileged. A Voyager Pay wallet holds a Nostr keypair (secp256k1) and a Lightning wallet (LNURL, NWC, or self-custodial).
			</p>
			<p>
				<strong class="text-ink">Reference clients.</strong> Open-source implementations that prove the protocol works end-to-end. They validate event shapes against the spec, render order books and reputation, and hand off final settlement to Lightning. They are demos, not gatekeepers.
			</p>
			<p>
				<strong class="text-ink">Wire format.</strong> Signed Nostr events of well-defined kinds. Anyone can read them. Only counterparties can write to their own orders. There is no central server, no privileged relay, no admin key. Two kinds carry the load: <code class="font-mono">kind:38383</code> for Mostro-node profiles and intent/quote pairs, and NIP-17 gift-wrapped messages between counterparties.
			</p>
		</div>

		<div>
			<h2 id="flow">The flow</h2>
			<ol class="list-decimal pl-5 flex flex-col gap-2 mt-4">
				<li>The customer's wallet picks an amount, a fiat, and a method. It reads every reachable Mostro node's <code class="font-mono">kind:38383</code> profile and ranks them on rate, fee, and reputation.</li>
				<li>The wallet opens a NIP-17 gift-wrapped order to the chosen node's public key. The relay sees only ciphertext.</li>
				<li>On acceptance, the node locks matching sats in a Lightning hold-invoice (HODL). The sats are now escrowed by the network.</li>
				<li>The customer pays fiat off-protocol: bank, mobile money, cash in person.</li>
				<li>The vendor signs an attestation: the fiat landed. Silence is a timeout, not confirmation.</li>
				<li>The HODL settles. Sats move on Lightning. Settlement is atomic with the network, not with the operator.</li>
				<li>Both counterparties may leave signed reputation events keyed to the node's public key. Future rankings weight them.</li>
			</ol>
		</div>

		<div>
			<h2 id="federation">The Mostro federation</h2>
			<p>
				A Mostro node is an independent market maker that bridges fiat and Bitcoin. Each node publishes its profile — region, supported fiats, settlement methods, fees, HODL liquidity, reputation — as a <code class="font-mono">kind:38383</code> event. Wallets rank them per-order. No single operator sits in the middle of the network.
			</p>
		</div>

	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next</span>
			<h3 class="mt-2 font-display text-xl text-ink">How price discovery works</h3>
			<p class="mt-2 text-sm text-ink-2">How a federation of Mostro nodes produces the prices a customer sees.</p>
		</div>
		<Cta variant="primary" href="/docs/how-price-discovery-works">Continue</Cta>
	</div>
</section>
