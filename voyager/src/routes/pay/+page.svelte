<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import RampQuoteAggregator from '$lib/components/RampQuoteAggregator.svelte';
	import nodes from '$lib/data/mostroNodes.json';
</script>

<svelte:head>
	<title>Voyager Pay — Money that moves like a Nostr note</title>
</svelte:head>

<!-- §0 hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28 lg:pb-28">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">Open payments protocol</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-ink max-w-4xl leading-[1.02]">
			Voyager Pay. Money that moves like a Nostr note.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">
			Voyager Pay is an open protocol for sending money on the open web. There is no custodian in the middle and no account to lose. No platform can deplatform you. Signed events move over Nostr (a public message network). Settlement runs on Lightning (a fast Bitcoin payment network). A federation of competing market makers — called Mostro nodes — bridges fiat and Bitcoin.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="secondary" href="/docs">Documentation</Cta>
			<Cta variant="primary" href="#ramp">See the ramp</Cta>
		</div>
	</div>
</section>

<!-- Problem band -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<span class="eyebrow">The status quo</span>
		<p class="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">
			Sending money online today means trusting a custodian with your balance, your identity, and your future access. The wallet, the KYC vendor (the "know your customer" identity check), and the payment processor are all counterparties. Each one can fail, freeze, or disappear. The protocol itself was never the bottleneck.
		</p>
	</div>
</section>

<!-- §0 five design invariants -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="Design invariants"
		title="Five design invariants."
		lede="Each one is a constraint the protocol refuses to negotiate on."
	/>
	<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
		{#each [
			{ icon: 'lock', tone: 'sky', title: 'No custody', body: 'The protocol never holds funds. Settlement either completes atomically (in one indivisible step) or it does not happen.' },
			{ icon: 'chat', tone: 'violet', title: 'No identity required', body: 'Keys are pseudonymous. There is no KYC (identity check) tier at the protocol layer.' },
			{ icon: 'compass', tone: 'coral', title: 'Customer ↔ vendor symmetry', body: 'Both sides hold the same kind of key, speak the same events, and carry the same risk.' },
			{ icon: 'leaf', tone: 'rose', title: 'Protocol outlives us', body: 'Reference clients are demos. The wire format (the exact shape of the signed events) is the product.' },
			{ icon: 'bolt', tone: 'sky', title: 'Payments are Lightning', body: 'Final settlement moves on Lightning. Everything else is plumbing.' }
		] as inv (inv.title)}
			<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
				<Icon name={inv.icon} tone={inv.tone} size={28} />
				<h3 class="font-display text-xl text-ink leading-tight">{inv.title}</h3>
				<p class="text-sm leading-relaxed text-ink-2">{inv.body}</p>
			</article>
		{/each}
	</div>
</section>

<!-- §1 layered architecture -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="Architecture"
		title="A layered stack."
		lede="Three layers and one perimeter. Each layer can be reimplemented without breaking the protocol."
	/>
	<div class="mt-12 flex flex-col gap-4">
		<article class="rounded-[28px] bg-bone-100 p-8">
			<span class="eyebrow">Top — Wallets</span>
			<h3 class="mt-3 font-display text-2xl text-ink">User-facing clients</h3>
			<p class="mt-3 text-ink-2">
				Mobile and desktop wallets sign events, manage keys, and show the user's balance. Wallets are interchangeable. No wallet is privileged by the protocol.
			</p>
			<ul class="mt-4 list-disc pl-5 text-ink-2">
				<li>Manage a Nostr keypair (secp256k1, the elliptic-curve cryptography Nostr uses).</li>
				<li>Persist a Lightning wallet (LNURL, NWC, or self-custodial — standard Lightning wallet formats).</li>
				<li>Never see the user's fiat balance.</li>
			</ul>
		</article>
		<article class="rounded-[28px] bg-bone-100 p-8">
			<span class="eyebrow">Middle — Reference clients</span>
			<h3 class="mt-3 font-display text-2xl text-ink">Conformance + UX</h3>
			<p class="mt-3 text-ink-2">
				Open-source reference implementations prove the protocol works end-to-end. They are demos, not gatekeepers. Anyone can ship one.
			</p>
			<ul class="mt-4 list-disc pl-5 text-ink-2">
				<li>Validate event shapes against the spec.</li>
				<li>Render order books, reputation, and dispute views.</li>
				<li>Hand off final settlement to Lightning.</li>
			</ul>
		</article>
		<article class="rounded-[28px] bg-bone-100 p-8">
			<span class="eyebrow">Bottom — Protocol</span>
			<h3 class="mt-3 font-display text-2xl text-ink">The wire format</h3>
			<p class="mt-3 text-ink-2">
				Signed Nostr events of well-defined kinds. Anyone can read them. Only counterparties can write to their own orders. There is no central server, no privileged relay, no admin key.
			</p>
			<ul class="mt-4 list-disc pl-5 text-ink-2">
				<li><code>kind:38383</code> — Mostro node profile (replaceable).</li>
				<li><code>kind:4</code> — Encrypted order messages between counterparties.</li>
				<li>Relays are dumb pipes. Nodes can be republished across any of them.</li>
			</ul>
		</article>
		<article class="rounded-[28px] bg-bone-200 p-6 text-center">
			<span class="eyebrow">Perimeter</span>
			<p class="mt-2 text-ink-2">
				<span class="font-display text-ink">Fiat ↔ sats</span> — only at the Mostro node's edge, where off-chain rails meet Lightning.
			</p>
		</article>
	</div>
</section>

<!-- §6 + §7.5 how it flows -->
<section id="how" class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="How a payment flows"
		title="Seven steps, no magic."
		lede="Plain English from request to settlement. Every step is a signed event or a Lightning handoff."
	/>
	<ol class="mt-12 flex flex-col gap-6">
		{#each [
			{ n: 1, t: 'The customer opens their wallet', b: 'They type an amount and pick a rail. The wallet looks up Mostro node profiles on its relay set and shows a ranked list — the spec’s §7.4 rubric, executed client-side.' },
			{ n: 2, t: 'They place a signed order', b: 'The wallet emits a Nostr event with the amount, the fiat, the desired method, and an expiry. It encrypts the event to the chosen Mostro node’s public key, so only that node can read it.' },
			{ n: 3, t: 'The Mostro node holds sats', b: 'On acceptance, the node locks the matching sats in a Lightning hold-invoice (a HODL — a payment that does not settle until the node releases it). The sats are now escrowed by the network, not by a person.' },
			{ n: 4, t: 'The customer pays fiat', b: 'Using the chosen method — bank transfer, Wise, mobile money, or in-person cash — the customer sends fiat to the vendor’s settlement account off-protocol.' },
			{ n: 5, t: 'The vendor confirms receipt', b: 'The vendor signs a small attestation event back to the Mostro node: "the fiat landed". The node treats silence as a timeout, not as confirmation.' },
			{ n: 6, t: 'The HODL settles', b: 'The node releases the Lightning hold-invoice to the vendor’s wallet. Sats move on the base layer. Settlement is atomic with the network, not with the operator.' },
			{ n: 7, t: 'Reputation updates', b: 'Both counterparties can leave signed reputation events keyed to the node’s public key. Future rankings weight them. No central scoring service is involved.' }
		] as step (step.n)}
			<li class="flex gap-5 rounded-[28px] bg-bone-100 p-6">
				<span class="font-display text-3xl text-ink leading-none">{step.n}</span>
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-ink leading-tight">{step.t}</h3>
					<p class="text-[15px] leading-relaxed text-ink-2">{step.b}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<!-- §7 fiat ramp -->
<section id="ramp" class="mx-auto max-w-6xl px-6 pb-20">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="The fiat ramp"
			title="From bank to sats in one signed flow."
			lede="A federation of independent Mostro nodes competes on rate, fee, and reputation. Voyager ships one, tuned for the Caribbean."
		/>

		<div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
			<div class="flex flex-col gap-6">
				<p class="text-lg leading-relaxed text-ink-2">
					Mostro is the network of competing market makers that bridge fiat and Bitcoin. Each node publishes its profile as a <code>kind:38383</code> event. The profile lists region, supported fiats, settlement methods, fees, and reputation. Wallets rank nodes per-order using a deterministic rubric. No single operator sits in the middle.
				</p>

				<div class="rounded-[28px] bg-bone-200 p-6">
					<span class="eyebrow">Voyager Caribbean node</span>
					<ul class="mt-4 flex flex-col gap-3 text-ink-2">
						<li><span class="font-display text-ink">Rails</span> — JMD, TTD, BBD, XCD, GYD, HTG, BSD</li>
						<li><span class="font-display text-ink">Fee</span> — 0.3%</li>
						<li><span class="font-display text-ink">SLA</span> — &lt; 24h fiat settlement</li>
						<li><span class="font-display text-ink">Liquidity</span> — {(nodes.find(n => n.name === 'voyager-caribbean')?.hodlLiquiditySats ?? 0).toLocaleString('en-US')} sats HODL</li>
					</ul>
				</div>

				<p class="text-sm text-muted">
					{Object.keys(nodes).length} demo nodes are configured below. Pick a rail and a method to see the live ranking.
				</p>
			</div>

			<RampQuoteAggregator />
		</div>
	</div>
</section>

<!-- §11 EROI defense -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="EROI defense"
		title="Why this is honest money."
		lede="Three properties a custodial rail can’t give you."
	/>
	<div class="mt-6">
		<Cta variant="tertiary" href="/docs/voyager-pay-eroi-audit">Read the full EROI audit</Cta>
	</div>
	<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="bolt" tone="sky" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">Fan-out</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Anyone can run a node. Anyone can run a relay. No operator is a single point of failure for the network.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="chat" tone="violet" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">Opacity</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Counterparties never have to share identity with the network. Trust lives in signed events, not in KYC dossiers.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="lock" tone="coral" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">Binding</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				HODL invoices make settlement atomic with the network. A counterparty can fail. They cannot take the sats and not deliver the fiat.
			</p>
		</article>
	</div>
</section>

<!-- §12 threat shake-out -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="Threat shake-out"
		title="What can still go wrong."
		lede="Honest list of the risks that remain. None of them are fatal."
	/>
	<dl class="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
		<div class="flex flex-col gap-2 border-b border-bone-200 pb-6">
			<dt class="font-display text-lg text-ink">Fiat rail reversal</dt>
			<dd class="text-sm leading-relaxed text-ink-2">
				A chargeback after the HODL settles. Mitigated by short HODL windows and reputation-weighted limits per counterparty.
			</dd>
		</div>
		<div class="flex flex-col gap-2 border-b border-bone-200 pb-6">
			<dt class="font-display text-lg text-ink">Sybil reputation</dt>
			<dd class="text-sm leading-relaxed text-ink-2">
				A Sybil attack (one party creating many fake identities) inflates reputation cheaply. Mitigated by tying reputation to a node public key that has actually settled volume.
			</dd>
		</div>
		<div class="flex flex-col gap-2 border-b border-bone-200 pb-6">
			<dt class="font-display text-lg text-ink">Relay capture</dt>
			<dd class="text-sm leading-relaxed text-ink-2">
				Malicious relays can censor. Mitigated because the protocol is relay-agnostic — events republish across any of N independent operators.
			</dd>
		</div>
		<div class="flex flex-col gap-2 border-b border-bone-200 pb-6">
			<dt class="font-display text-lg text-ink">Operator rug</dt>
			<dd class="text-sm leading-relaxed text-ink-2">
				A Mostro node takes the sats and disappears. Mitigated by HODL invoices and short settlement cycles. At worst the customer is exposed to the sats amount.
			</dd>
		</div>
	</dl>
</section>

<!-- §13 out of scope -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="rounded-[32px] bg-bone-200 p-8 sm:p-12">
		<span class="eyebrow">What we did NOT solve</span>
		<ul class="mt-6 flex flex-col gap-3 text-ink-2">
			<li>Identity. The protocol is pseudonymous by design.</li>
			<li>Dispute resolution. The spec leaves it to reputation and small HODL windows, not arbitration.</li>
			<li>Cross-border FX beyond what each Mostro node quotes.</li>
			<li>Front-end UX. The Voyager Pay widget here is a demo of the ranking flow, not a shipped product.</li>
		</ul>
	</div>
</section>

<!-- Final CTA -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-10 sm:p-16 text-center">
		<h2 class="font-display text-[40px] sm:text-[52px] lg:text-[64px] text-ink max-w-3xl mx-auto leading-[1.02]">
			Money that moves like a Nostr note.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-ink-2">
			Voyager Pay is a spec, a demo widget, and a Caribbean node. The protocol is the product.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/">Back to Voyager</Cta>
			<Cta variant="secondary" href="/plan">Plan a trip</Cta>
		</div>
	</div>
</section>