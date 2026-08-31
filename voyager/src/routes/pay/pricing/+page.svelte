<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RampQuoteAggregator from '$lib/components/RampQuoteAggregator.svelte';
</script>

<svelte:head>
	<title>Fair pricing — Voyager Pay</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Voyager Pay</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] lg:text-[64px] text-ink leading-[1.02]">
		Fair pricing from a fair marketplace.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		A single operator has every reason to charge what the market will bear. A federation of independent operators does not. This page is about the mechanism, not the promise.
	</p>
</section>

<!-- Why a single operator charges more -->
<section class="pb-16">
	<SectionHeader
		eyebrow="Captive rent"
		title="Why a single operator charges more."
		lede="One platform, one order book, one counterparty. The customer has nowhere else to go."
	/>
	<div class="mt-10 flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			A monolithic payment platform sits between you and the other side of the trade. It sees both sides of every order. It controls the order book. It sets the fee, the rate, and the settlement window. The customer is captive not because the platform is malicious — it might be perfectly polite — but because the structural position lets it extract rent without losing volume.
		</p>
		<p>
			That is not a bug in any one company. It is the natural equilibrium of a market with one supplier. Move the supplier out of the way and rent extraction follows the position.
		</p>
	</div>
</section>

<!-- Why a federation charges less -->
<section class="pb-16">
	<SectionHeader
		eyebrow="Competition"
		title="Why a federation of independent market makers charges less."
		lede="Many operators, many order books, one client-side ranking rubric. The customer has somewhere else to go — every time."
	/>
	<div class="mt-10 flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			A Mostro node is an independent operator that bridges fiat and Bitcoin. Each one publishes a profile — region, fiats, methods, fee, HODL liquidity, reputation — as a <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">kind:38383</code> event. The customer's wallet reads those profiles, filters by fiat and method, and ranks what remains.
		</p>
		<p>
			Three things compete: <span class="font-display text-ink">rate</span>, <span class="font-display text-ink">fee</span>, and <span class="font-display text-ink">reputation</span>. An operator who charges a fat spread loses the order to a competitor on the next refresh. An operator who fakes reputation loses it on the next settled trade, because reputation is keyed to a public key that has actually settled volume.
		</p>
	</div>
</section>

<!-- How the wallet picks (embed the widget) -->
<section id="ramp" class="pb-16 scroll-mt-20">
	<SectionHeader
		eyebrow="How the wallet picks"
		title="The rubric, running live on the fixture."
		lede="Pick a fiat and a method. The widget below ranks the demo nodes per-order using the spec's §7.4 rubric."
	/>
	<div class="mt-12">
		<RampQuoteAggregator />
	</div>
</section>

<!-- Why fees converge downward over time -->
<section class="pb-16">
	<SectionHeader
		eyebrow="Convergence"
		title="Why fees converge downward over time."
		lede="Reputation is settled volume. Reputation is expensive to fake. So fees trend toward cost-plus-margin."
	/>
	<div class="mt-10 flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			Reputation accrues only with settled trades. Each settled trade leaves a signed event on a public relay, keyed to the node's public key. A node that runs at a loss to gain reputation pays out of pocket until its settled volume catches up. A node that runs at a fat margin looks good on day one and is undercut on day two by a node that quotes tighter and survives on volume.
		</p>
		<p>
			The structural argument is that fees converge on cost-plus-margin — the cost of running a Lightning node with enough outbound HODL capacity, plus a small margin for arbiter labor. They do not converge on rent. The argument is structural, not empirical. Today, the federation is small (the demo fixture ships five nodes) and convergence is a prediction, not a measurement.
		</p>
	</div>
</section>

<!-- Honest out-of-scope -->
<section class="pb-16">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<span class="eyebrow">What this page is not</span>
		<ul class="mt-6 flex flex-col gap-3 text-ink-2">
			<li>No FX oracle. Each Mostro node quotes its own rate. Cross-currency rates are what the node says they are.</li>
			<li>No settlement guarantee beyond HODL atomicity. If the fiat rail reverses (chargeback, bank clawback), the customer is exposed to the sats amount.</li>
			<li>No empirical claim yet. The federation is the demo fixture. Convergence is a structural argument, not a measurement at this scale.</li>
		</ul>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/docs/how-price-discovery-works">Read the rubric in depth</Cta>
			<Cta variant="secondary" href="/pay/node">See how to run a node</Cta>
		</div>
	</div>
</section>

<!-- Next-up CTA -->
<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">Run a node — anyone can join the federation.</h3>
			<p class="mt-2 text-sm text-ink-2">What a node does, what it costs, what's in it for the operator.</p>
		</div>
		<Cta variant="primary" href="/pay/node">Continue</Cta>
	</div>
</section>
