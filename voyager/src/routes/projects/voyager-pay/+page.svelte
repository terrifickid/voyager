<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import RampQuoteAggregator from '$lib/components/RampQuoteAggregator.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import SoundSystemStrip from '$lib/components/SoundSystemStrip.svelte';
	import PayAiAssistCard from '$lib/components/PayAiAssistCard.svelte';
	import nodes from '$lib/data/mostroNodes.json';

	const SOUND_SYSTEMS = nodes.map((n) => ({ name: n.name, region: n.region, feePct: n.feePct }));
</script>

<svelte:head>
	<title>Voyager Pay — Open payments for the region's apps</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<!-- §0 hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">Open payments protocol</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-[var(--register-text)] max-w-4xl leading-[1.02]">
			Secure by design. Fair competitive marketplace.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-muted)]">
			Voyager Pay is an open protocol for sending money on the open web. There is no custodian in the middle and no account to lose. No platform in the middle. Signed events move over Nostr (a public message network). Settlement runs on Lightning (a fast Bitcoin payment network). A federation of competing market makers — called Mostro nodes — bridges fiat and Bitcoin.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/network/security">Why it's secure</Cta>
			<Cta variant="secondary" href="/projects/voyager-pay/pricing">Why prices are fair</Cta>
		</div>
	</div>
</section>

<!-- Three audiences -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="plane" tone="cyan" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">For travelers</h3>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				Cross borders without handing your balance to a custodian. Read the security outcomes.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="/network/security">Security by design</Cta>
			</div>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="sparkle" tone="gold" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">For price-sensitive buyers</h3>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				A federation of independent operators competes on rate, fee, and reputation. No rent extraction. See how the wallet picks.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="/projects/voyager-pay/pricing">Fair pricing</Cta>
			</div>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
			<Icon name="globe" tone="magenta" size={28} />
			<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">For node operators</h3>
			<p class="text-sm leading-relaxed text-[var(--register-muted)]">
				Anyone can run a Mostro node. Earn fee revenue, accrue reputation, compete on a transparent rubric. See what it costs.
			</p>
			<div class="mt-2">
				<Cta variant="tertiary" href="/network/node">Run a node</Cta>
			</div>
		</article>
	</div>
</section>

<!-- In-page TOC -->
<nav class="mx-auto max-w-6xl px-6 pb-16" aria-label="On this page">
	<ul class="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
		<li><a href="#why" class="text-[var(--register-text)] underline underline-offset-4 decoration-[1.5px]">Why this exists</a></li>
		<li><a href="#security-rubric" class="text-[var(--register-text)] underline underline-offset-4 decoration-[1.5px]">Security rubric</a></li>
		<li><a href="#invariants" class="text-[var(--register-text)] underline underline-offset-4 decoration-[1.5px]">Design invariants</a></li>
		<li><a href="#how-it-flows" class="text-[var(--register-text)] underline underline-offset-4 decoration-[1.5px]">How a payment flows</a></li>
		<li><a href="#ramp" class="text-[var(--register-text)] underline underline-offset-4 decoration-[1.5px]">The fiat ramp</a></li>
		<li><a href="#extends" class="text-[var(--register-text)] underline underline-offset-4 decoration-[1.5px]">Extends to anything</a></li>
	</ul>
</nav>

<!-- Why this exists (was "status quo") -->
<section id="why" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12">
		<span class="eyebrow">Why this exists</span>
		<p class="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--register-muted)]">
			Sending money online today means trusting a custodian with your balance, your identity, and your future access. The wallet, the KYC vendor (the "know your customer" identity check), and the payment processor are all counterparties. Each one can fail, pause, or exit. The protocol itself was never the bottleneck.
		</p>
	</div>
</section>

<!-- §1 + §11 merged EROI section -->
<section id="security-rubric" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Security rubric"
		title="Honest operators are rewarded."
		lede="Voyager Pay is shaped by a single rubric: make the cost of extraction structurally higher than the gain. No custodian, no central listing, no identity dossier — every design choice flows from that."
	/>
	<div class="mt-10 rounded-[28px] bg-[var(--register-card)] p-8">
		<p class="text-lg leading-relaxed text-[var(--register-muted)]">
			The cost of extraction is set by the design. Voyager Pay pushes it up structurally — value is dispersed across many independent operators, counterparties are pseudonymous, settlement is atomic with the network — so extraction stops paying.
		</p>
	</div>

	<div class="mt-20">
		<SectionHeader
			eyebrow="EROI defense"
			title="Three properties a custodial rail can't give you."
			lede="We think this design rewards the honest operator. The rest of this page shows what makes that true."
		/>
		<div class="mt-6">
			<Cta variant="tertiary" href="/docs/security-model">Read the security model</Cta>
		</div>
		<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
			<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
				<Icon name="bolt" tone="cyan" size={28} />
				<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">Dispersion</h3>
				<p class="text-sm leading-relaxed text-[var(--register-muted)]">
					Value is spread across many independent operators. No single node, relay, or vendor is worth targeting on its own. Reaching the whole network means reaching N operators in N jurisdictions.
				</p>
			</article>
			<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
				<Icon name="chat" tone="gold" size={28} />
				<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">Information</h3>
				<p class="text-sm leading-relaxed text-[var(--register-muted)]">
					Order traffic is gift-wrapped. Relays see encrypted blobs, not counterparties. There is no KYC tier inside the protocol — trust lives in signed events, not identity dossiers.
				</p>
			</article>
			<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
				<Icon name="lock" tone="magenta" size={28} />
				<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">Coupling</h3>
				<p class="text-sm leading-relaxed text-[var(--register-muted)]">
					Settlement is atomic. A counterparty can fail, but they cannot take the sats and not deliver the fiat. Credentials are revocable. Detached value loses worth — it won't move without its rightful context.
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
			{ icon: 'lock', tone: 'cyan', title: 'No custody', body: 'The protocol never holds funds. Settlement either completes atomically (in one indivisible step) or it does not happen.' },
			{ icon: 'chat', tone: 'gold', title: 'No identity required', body: 'Keys are pseudonymous. There is no KYC (identity check) tier at the protocol layer.' },
			{ icon: 'compass', tone: 'magenta', title: 'Customer ↔ vendor symmetry', body: 'Both sides hold the same kind of key, speak the same events, and bear the same responsibility.' },
			{ icon: 'leaf', tone: 'magenta', title: 'Protocol outlives us', body: 'Reference clients are demos. The wire format (the exact shape of the signed events) is the product.' },
			{ icon: 'bolt', tone: 'cyan', title: 'Payments are Lightning', body: 'Final settlement moves on Lightning. Everything else is plumbing.' }
		] as inv (inv.title)}
			<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-6">
				<Icon name={inv.icon} tone={inv.tone} size={28} />
				<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">{inv.title}</h3>
				<p class="text-sm leading-relaxed text-[var(--register-muted)]">{inv.body}</p>
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
			<li class="flex gap-5 rounded-[28px] bg-[var(--register-card)] p-6">
				<span class="font-display text-3xl text-[var(--register-text)] leading-none">{step.n}</span>
				<div class="flex flex-col gap-2">
					<h3 class="font-display text-xl text-[var(--register-text)] leading-tight">{step.t}</h3>
					<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">{step.b}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<!-- AI assist in the loop -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12 border border-[var(--register-hair)]">
		<SectionHeader
			eyebrow="// ai assist in the loop"
			title="Type it. The agent parses it."
			lede="You don't need a form. You need a sentence — the local agent extracts the wire-format fields and stops, so the protocol stays auditable."
		/>
		<div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
			<PayAiAssistCard register="carnival-poster" variant="compact" />
			<ul class="flex flex-col gap-4 text-[15px] leading-relaxed text-[var(--register-muted)]">
				<li>
					<span class="font-display text-[var(--register-text)]">Parses sentences into events.</span>
					Payee, amount, currency, memo — extracted locally and shown side-by-side before you sign.
				</li>
				<li>
					<span class="font-display text-[var(--register-text)]">Does not call a server.</span>
					The model runs in your browser (WebLLM / WASM). Prompts and history never leave the device.
				</li>
				<li>
					<span class="font-display text-[var(--register-text)]">Never overrides your intent.</span>
					The agent proposes; you sign. It can flag an anomaly and pause — it cannot sign for you.
				</li>
			</ul>
		</div>
	</div>
</section>

<!-- §7 fiat ramp -->
<section id="ramp" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<div class="rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12">
		<SectionHeader
			eyebrow="The fiat ramp"
			title="From bank to sats in one signed flow."
			lede="A federation of independent Mostro nodes competes on rate, fee, and reputation. Voyager ships one, tuned for the Caribbean."
		/>

		<div class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
			<div class="flex flex-col gap-6">
				<p class="text-lg leading-relaxed text-[var(--register-muted)]">
					Mostro is the network of competing market makers that bridge fiat and Bitcoin. Each node publishes its profile as a <code>kind:38383</code> event. The profile lists region, supported fiats, settlement methods, fees, and reputation. Wallets rank nodes per-order using a deterministic rubric. No single operator sits in the middle.
				</p>

				<div class="rounded-[28px] bg-[var(--register-card)] p-6">
					<span class="eyebrow">Voyager Caribbean node</span>
					<ul class="mt-4 flex flex-col gap-3 text-[var(--register-muted)]">
						<li><span class="font-display text-[var(--register-text)]">Rails</span> — JMD, TTD, BBD, XCD, GYD, HTG, BSD</li>
						<li><span class="font-display text-[var(--register-text)]">Fee</span> — 0.3%</li>
						<li><span class="font-display text-[var(--register-text)]">SLA</span> — &lt; 24h fiat settlement</li>
						<li><span class="font-display text-[var(--register-text)]">Liquidity</span> — {(nodes.find(n => n.name === 'voyager-caribbean')?.hodlLiquiditySats ?? 0).toLocaleString('en-US')} sats HODL</li>
					</ul>
				</div>

				<p class="text-sm text-[var(--register-muted)]">
					{Object.keys(nodes).length} demo nodes are configured below. Pick a rail and a method to see the live ranking.
				</p>
			</div>

			<RampQuoteAggregator />
		</div>
	</div>
</section>

<!-- Final CTA -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-[var(--register-card)] p-10 sm:p-16 text-center">
		<h2 class="font-display text-[40px] sm:text-[52px] lg:text-[64px] text-[var(--register-text)] max-w-3xl mx-auto leading-[1.02]">
			Money that moves like a Nostr note.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-[var(--register-muted)]">
			Voyager Pay is a spec, a demo widget, and a Caribbean node. The protocol is the product.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/">Back to Voyager</Cta>
			<Cta variant="secondary" href="/projects/trip-planner/plan">Plan a trip</Cta>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<SoundSystemStrip eyebrow="Federation — sound systems & Mostro nodes" systems={SOUND_SYSTEMS} />
</section>
</RegisterSection>

