<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How price discovery works — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Inserted after Lesson 8 — For the protocol-curious</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How price discovery works on Voyager Pay.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		A federation of independent Mostro nodes competes on rate, fee, and reputation. The §7.4 rubric is the client-side mechanism that turns that competition into the prices the customer actually sees.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 id="three-signals">The three things that compete</h2>
		<p>
			When a customer's wallet opens with an amount, a fiat, and a method, it reads every reachable Mostro node's <code>kind:38383</code> profile, filters by fiat and method, and ranks the survivors on three signals:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li><span class="font-display text-ink">Rate.</span> How many sats per unit of fiat, before fees. Better rate wins.</li>
			<li><span class="font-display text-ink">Fee.</span> The operator's published percentage. Lower fee wins.</li>
			<li><span class="font-display text-ink">Reputation.</span> Settled volume keyed to the node's public key. Higher reputation wins.</li>
		</ul>

		<h2 id="the-weights">The weights</h2>
		<p>
			The reference client's <code>rankQuotes</code> module — a deterministic stand-in for the spec's §7.4 rubric — combines the three signals with these weights:
		</p>
		<div class="rounded-[24px] bg-bone-100 p-6 mt-2">
			<p class="font-display text-ink text-lg">score = 0.6 · rateScore + 0.2 · feeScore + 0.2 · reputationScore</p>
		</div>
		<p>
			Rate gets the largest weight because it is the dominant economic signal — the customer cares most about how many sats land per unit of fiat. Fee and reputation tie-break: two operators quoting the same rate are separated by fee, then by reputation. The reference client ranks top three and presents them; the customer picks one, then negotiates directly with that node.
		</p>

		<h2 id="bias-toward-honest">Why the weights bias toward honest operators</h2>
		<p>
			An operator cannot fake rate on the long run without losing money on every settled trade. They cannot fake fee — it is published and visible. They can fake reputation cheaply only if reputation were a string they could rewrite. It is not. Reputation is keyed to a public key that has actually settled volume, and settled trades leave signed events on a public relay.
		</p>
		<p>
			The structural argument is this: an honest operator with real settled history outranks a fresh operator with a fat margin, even when the fresh operator's headline rate looks better. The wallet runs the ranking. The customer sees the result. Reputation accrues over time, so the operator who survives the early losses wins the long game.
		</p>

		<h2 id="no-persistent-undercut">Why a single node cannot persistently undercut</h2>
		<p>
			A node that quotes a rate below cost loses on every trade. Reputation accrues slowly because each settled trade costs the operator money. The undercut is not free. Eventually the node either raises its rate (and loses its ranking lead to the next-toughest competitor) or it runs out of capital and exits. The market does not converge on a single winner. It converges on cost-plus-margin.
		</p>

		<h2 id="cost-plus-margin">Why fees trend toward cost-plus-margin</h2>
		<p>
			Convergence is a structural argument, not an empirical claim. The federation today is the demo fixture (five nodes). At that scale, the argument predicts the equilibrium: fees settle near the cost of running a Lightning node with enough outbound HODL capacity, plus a small margin for arbiter labor. They do not settle at rent-extraction levels because the federation makes rent extraction uncompetitive.
		</p>

		<div class="rounded-[24px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">Honest limits</p>
			<ul class="mt-4 flex flex-col gap-2 list-disc pl-5">
				<li>Convergence is predicted, not measured. The demo fixture has five nodes.</li>
				<li>No FX oracle. Each Mostro node quotes its own rate.</li>
				<li>Settlement is atomic with the network, not with the operator. Fiat-rail reversals are an honest limit of the demo fixture.</li>
			</ul>
		</div>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Related</span>
			<h3 class="mt-2 font-display text-xl text-ink">Fair pricing — see the rubric run live.</h3>
			<p class="mt-2 text-sm text-ink-2">The widget on the pricing page ranks the demo nodes per-order.</p>
		</div>
		<Cta variant="primary" href="/projects/voyager-pay/pricing">Fair pricing</Cta>
	</div>
</section>
