<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How Voyager Pay works — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 4</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How Voyager Pay works.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Voyager Pay is an open protocol for sending money online. There is no company in the middle of
		a payment. There is no account to lose, no platform to deplatform you, and no KYC step at the
		protocol layer.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">The five design invariants</h2>
		<p>
			Each one is a constraint the protocol refuses to negotiate on. They're listed in full on the
			<a href="/pay" class="underline underline-offset-4">Pay page</a>; here they are in plain English:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li><span class="font-display text-ink">No custody.</span> The protocol never holds funds. Settlement is atomic with the network or it does not happen.</li>
			<li><span class="font-display text-ink">No identity required.</span> Keys are pseudonymous. There is no KYC tier at the protocol layer.</li>
			<li><span class="font-display text-ink">Customer ↔ vendor symmetry.</span> Both sides hold the same kind of key, speak the same events, carry the same risk.</li>
			<li><span class="font-display text-ink">Protocol outlives us.</span> Reference clients are demos. The wire format is the product.</li>
			<li><span class="font-display text-ink">Payments are Lightning.</span> Final settlement moves on Lightning. Everything else is plumbing.</li>
		</ul>

		<h2 class="font-display text-2xl text-ink mt-4">The three layers</h2>
		<p>
			<strong class="text-ink">Top — Wallets.</strong> Mobile and desktop wallets that sign
			events, manage keys, and present the user's balance. Wallets are interchangeable; no
			wallet is privileged by the protocol. A Voyager Pay wallet holds a Nostr keypair
			(secp256k1) and a Lightning wallet (LNURL, NWC, or self-custodial).
		</p>
		<p>
			<strong class="text-ink">Middle — Reference clients.</strong> Open-source implementations
			that prove the protocol works end-to-end. They validate event shapes against the spec,
			render order books and reputation, and hand off final settlement to Lightning. They are
			demos, not gatekeepers — anyone can ship one.
		</p>
		<p>
			<strong class="text-ink">Bottom — Wire format.</strong> Signed Nostr events of well-defined
			kinds. Anyone can read them; only counterparties can write to their own orders. There is no
			central server, no privileged relay, no admin key. Two event kinds carry the load today:
			<code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">kind:38383</code> for Mostro node
			profiles and <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">kind:4</code> for
			encrypted order messages.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">The seven steps of a payment</h2>
		<ol class="list-decimal pl-5 flex flex-col gap-2">
			<li>The customer opens their wallet and picks an amount, fiat, and rail.</li>
			<li>The wallet emits a signed Nostr order, encrypted to the chosen Mostro node's pubkey.</li>
			<li>On acceptance, the node locks matching sats in a Lightning hold-invoice (HODL). The sats are now escrowed by the network.</li>
			<li>The customer pays fiat off-protocol — bank, Wise, mobile money, or cash in person.</li>
			<li>The vendor signs an attestation event: "the fiat landed". Silence is a timeout, not confirmation.</li>
			<li>The HODL settles. Sats move on the base layer; settlement is atomic with the network, not with the operator.</li>
			<li>Both counterparties may leave signed reputation events keyed to the node's pubkey. Future rankings weight them.</li>
		</ol>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">The Mostro federation</p>
			<p class="mt-2">
				A Mostro node is an independent market maker that bridges fiat and Bitcoin. Each node
				publishes its own profile — region, supported fiats, settlement methods, fees, HODL
				liquidity, reputation — as a <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">kind:38383</code>
				event. Wallets rank them per-order using the spec's §7.4 rubric; no single operator sits
				in the middle of the network.
			</p>
		</div>

		<p>
			That's the wire-level picture. The next two lessons step back and ask a harder question:
			given a protocol like this, what would an attacker need to spend to take money out of it,
			and how does the design answer that?
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">What EROI is</h3>
			<p class="mt-2 text-sm text-ink-2">Energy Return On Investment, applied to attackers instead of oil wells.</p>
		</div>
		<Cta variant="primary" href="/docs/what-is-eroi">Continue</Cta>
	</div>
</section>
