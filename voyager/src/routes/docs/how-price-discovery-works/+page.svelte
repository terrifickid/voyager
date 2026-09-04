<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How price discovery works — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Protocol</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How price discovery works.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		A federation of independent Mostro nodes competes on rate, fee, and reputation. Client-side ranking turns that competition into the prices the customer sees.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-10 text-[17px] leading-relaxed text-ink-2">

		<div>
			<h2 id="three-signals">The three signals</h2>
			<p>
				When a wallet opens with an amount, a fiat, and a method, it reads every reachable Mostro node's <code class="font-mono">kind:38383</code> profile, filters by fiat and method, and ranks the survivors on three signals:
			</p>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li><span class="font-display text-ink">Rate.</span> Sats per unit of fiat before fees. Better rate wins.</li>
				<li><span class="font-display text-ink">Fee.</span> The operator's published percentage. Lower fee wins.</li>
				<li><span class="font-display text-ink">Reputation.</span> Settled volume keyed to the node's public key. Higher reputation wins.</li>
			</ul>
		</div>

		<div>
			<h2 id="weights">Weights</h2>
			<p>The reference client's ranking combines the three signals with these weights:</p>
			<div class="rounded-[24px] bg-bone-100 p-6 mt-4">
				<p class="font-display text-ink text-lg">score = 0.6 · rateScore + 0.2 · feeScore + 0.2 · reputationScore</p>
			</div>
			<p>
				Rate gets the largest weight because it is the dominant economic signal — the customer cares most about how many sats land per unit of fiat. Fee and reputation tie-break: two operators quoting the same rate are separated by fee, then by reputation. The reference client ranks the top three and presents them; the customer picks one and negotiates directly with that node.
			</p>
		</div>

		<div>
			<h2 id="honesty">Why this biases toward honest operators</h2>
			<p>
				An operator cannot fake rate on the long run without losing money on every settled trade. They cannot fake fee — it is published. Reputation is keyed to a public key that has actually settled volume, and settled trades leave signed events on a public relay.
			</p>
			<p>
				An honest operator with real settled history outranks a fresh operator with a fat margin, even when the fresh operator's headline rate looks better. The wallet runs the ranking. The customer sees the result. Reputation accrues over time, so the operator who survives the early losses wins the long game.
			</p>
		</div>

		<div>
			<h2 id="convergence">Why a single node cannot persistently undercut</h2>
			<p>
				A node quoting below cost loses on every trade. Reputation accrues slowly because each settled trade costs the operator money. Eventually the node either raises its rate (and loses its ranking lead to the next-toughest competitor) or runs out of capital and exits. The market converges on cost-plus-margin.
			</p>
		</div>

		<div>
			<h2 id="honest-limits">Honest limits</h2>
			<ul class="list-disc pl-5 flex flex-col gap-2 mt-4">
				<li>Convergence is predicted, not measured. The reference federation today is a demo fixture.</li>
				<li>No FX oracle. Each Mostro node quotes its own rate.</li>
				<li>Settlement is atomic with Lightning, not with the operator. Fiat-rail reversals are an honest limit of any non-custodial design.</li>
			</ul>
		</div>

	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next</span>
			<h3 class="mt-2 font-display text-xl text-ink">How Voyager Pay extends</h3>
			<p class="mt-2 text-sm text-ink-2">A substrate and a tag prefix. Any vendor kind can ship without amending the protocol.</p>
		</div>
		<Cta variant="primary" href="/docs/how-voyager-pay-extends">Continue</Cta>
	</div>
</section>
