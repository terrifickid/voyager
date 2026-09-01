<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import RampQuoteAggregator from '$lib/components/RampQuoteAggregator.svelte';
	import nodes from '$lib/data/mostroNodes.json';
</script>

<svelte:head>
	<title>Voyager Pay — Money that moves like a Nostr note</title>
</svelte:head>

<!-- §0 hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">Open payments protocol</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-ink max-w-4xl leading-[1.02]">
			Secure by design. Fair competitive marketplace.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">
			Voyager Pay is an open protocol for sending money on the open web. There is no custodian in the middle and no account to lose. No platform can deplatform you. Signed events move over Nostr (a public message network). Settlement runs on Lightning (a fast Bitcoin payment network). A federation of competing market makers — called Mostro nodes — bridges fiat and Bitcoin.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/pay/security">Why it's secure</Cta>
			<Cta variant="secondary" href="/pay/pricing">Why prices are fair</Cta>
		</div>
	</div>
</section>

<!-- Three audiences -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="plane" tone="sky" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">For travelers</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Cross borders without losing your money to a frozen card or a deplatformed account. Read the security outcomes.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="/pay/security">Security by design</Cta>
			</div>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="sparkle" tone="violet" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">For price-sensitive buyers</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				A federation of independent operators competes on rate, fee, and reputation. No rent extraction. See how the wallet picks.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="/pay/pricing">Fair pricing</Cta>
			</div>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<Icon name="globe" tone="coral" size={28} />
			<h3 class="font-display text-xl text-ink leading-tight">For node operators</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Anyone can run a Mostro node. Earn fee revenue, accrue reputation, compete on a transparent rubric. See what it costs.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="/pay/node">Run a node</Cta>
			</div>
		</article>
	</div>
</section>

<!-- In-page TOC -->
<nav class="mx-auto max-w-6xl px-6 pb-16" aria-label="On this page">
	<ul class="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
		<li><a href="#why" class="text-ink underline underline-offset-4 decoration-[1.5px]">Why this exists</a></li>
		<li><a href="#security-rubric" class="text-ink underline underline-offset-4 decoration-[1.5px]">Security rubric</a></li>
		<li><a href="#invariants" class="text-ink underline underline-offset-4 decoration-[1.5px]">Design invariants</a></li>
		<li><a href="#how-it-flows" class="text-ink underline underline-offset-4 decoration-[1.5px]">How a payment flows</a></li>
		<li><a href="#ramp" class="text-ink underline underline-offset-4 decoration-[1.5px]">The fiat ramp</a></li>
		<li><a href="#extends" class="text-ink underline underline-offset-4 decoration-[1.5px]">Extends to anything</a></li>
	</ul>
</nav>

<!-- Why this exists (was "status quo") -->
<section id="why" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<span class="eyebrow">Why this exists</span>
		<p class="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">
			Sending money online today means trusting a custodian with your balance, your identity, and your future access. The wallet, the KYC vendor (the "know your customer" identity check), and the payment processor are all counterparties. Each one can fail, freeze, or disappear. The protocol itself was never the bottleneck.
		</p>
	</div>
</section>

<!-- §1 + §11 merged EROI section -->
<section id="security-rubric" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Security rubric"
		title="Designed so attacking it is a bad business."
		lede="Voyager Pay is shaped by a single rubric: make the attacker's cost structurally higher than the loot. No custodian, no central listing, no identity dossier — every design choice flows from that."
	/>
	<div class="mt-10 rounded-[28px] bg-bone-100 p-8">
		<p class="text-lg leading-relaxed text-ink-2">
			Attackers are economic actors. They spend to extract. Voyager Pay pushes their cost up structurally — value is dispersed across many independent operators, counterparties are pseudonymous, settlement is atomic with the network — so the math stops working for them and most move on.
		</p>
	</div>

	<div class="mt-20">
		<SectionHeader
			eyebrow="EROI defense"
			title="Three properties a custodial rail can't give you."
			lede="We think this design is hard to attack. The rest of this page shows what makes that true."
		/>
		<div class="mt-6">
			<Cta variant="tertiary" href="/docs/voyager-pay-eroi-audit">Read the full EROI audit</Cta>
		</div>
		<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
			<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
				<Icon name="bolt" tone="sky" size={28} />
				<h3 class="font-display text-xl text-ink leading-tight">Dispersion</h3>
				<p class="text-sm leading-relaxed text-ink-2">
					Value is spread across many independent operators. No single node, relay, or vendor is worth breaching. The attacker has to compromise N different things in N different jurisdictions.
				</p>
			</article>
			<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
				<Icon name="chat" tone="violet" size={28} />
				<h3 class="font-display text-xl text-ink leading-tight">Information</h3>
				<p class="text-sm leading-relaxed text-ink-2">
					Order traffic is gift-wrapped. Relays see encrypted blobs, not counterparties. There is no KYC tier inside the protocol — trust lives in signed events, not identity dossiers.
				</p>
			</article>
			<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
				<Icon name="lock" tone="coral" size={28} />
				<h3 class="font-display text-xl text-ink leading-tight">Coupling</h3>
				<p class="text-sm leading-relaxed text-ink-2">
					Settlement is atomic. A counterparty can fail, but they cannot take the sats and not deliver the fiat. Stolen credentials are revocable. Move cost is high because the loot won't move.
				</p>
			</article>
		</div>
	</div>
</section>

<!-- §0 five design invariants -->
<section id="invariants" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
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

<!-- §6 + §7.5 how it flows -->
<section id="how-it-flows" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
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
<section id="ramp" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
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

<!-- §12 threat shake-out + §13 out of scope (combined under #risks) -->
<section id="extends" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="Built for any marketplace"
			title="Any vendor kind ships the same way."
			lede="The protocol guarantees event structure and forwarding. Vendor semantics ride on a reserved tag prefix (a v tag), so new kinds never amend the wire format."
		/>
		<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
			<FeatureCard
				icon="map-pin"
				tone="sky"
				eyebrow="voyager.listing.v1"
				title="Physical goods"
				body="Snapper, sandals, hardware. Ship weight, pickup, courier in the same event shape."
			/>
			<FeatureCard
				icon="bed"
				tone="coral"
				eyebrow="voyager.accommodation.v1"
				title="Stays"
				body="Rooms, rentals, weeks. Add check_in, check_out, capacity without changing the protocol."
			/>
			<FeatureCard
				icon="compass"
				tone="rose"
				eyebrow="voyager.tour.v1"
				title="Experiences"
				body="Tours, tastings, guides. Add group_size, meeting_point, duration_minutes in the same listing."
			/>
			<FeatureCard
				icon="sparkle"
				tone="violet"
				eyebrow="voyager.consulting.v1"
				title="Services & digital"
				body="Hours, deliverables, digital downloads. The same wire format carries them."
			/>
		</div>
		<p class="mt-10 max-w-2xl text-base leading-relaxed text-ink-2">
			Looks travel-shaped — does it carry other goods? Yes. The same signed listing carries physical goods, stays, experiences, services, and digital downloads. The wire format does not change.
		</p>
		<div class="mt-6">
			<Cta variant="secondary" href="/docs/how-voyager-pay-extends">Read the extensibility spec</Cta>
		</div>
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
