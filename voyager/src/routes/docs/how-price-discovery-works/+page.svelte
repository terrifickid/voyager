<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How price discovery works — Voyager docs</title>
</svelte:head>

<section>
	<span class="eyebrow">Protocol</span>
	<h1>How price discovery works.</h1>
	<p>A federation of independent Mostro nodes competes on rate, fee, and reputation. Client-side ranking turns that competition into the prices the customer sees.</p>
</section>

<section>
	<h2>The three signals</h2>
	<p>When a wallet opens with an amount, a fiat, and a method, it reads every reachable Mostro node's <code class="font-mono">kind:38383</code> profile, filters by fiat and method, and ranks the survivors on three signals:</p>
	<ul>
		<li><strong>Rate.</strong> Sats per unit of fiat before fees. Better rate wins.</li>
		<li><strong>Fee.</strong> The operator's published percentage. Lower fee wins.</li>
		<li><strong>Reputation.</strong> Settled volume keyed to the node's public key. Higher reputation wins.</li>
	</ul>
</section>

<section>
	<h2>Weights</h2>
	<p>The reference client's ranking combines the three signals with these weights:</p>
	<pre><code>score = 0.6 · rateScore + 0.2 · feeScore + 0.2 · reputationScore</code></pre>
	<p>Rate gets the largest weight because it is the dominant economic signal — the customer cares most about how many sats land per unit of fiat. Fee and reputation tie-break: two operators quoting the same rate are separated by fee, then by reputation. The reference client ranks the top three and presents them; the customer picks one and negotiates directly with that node.</p>
</section>

<section>
	<h2>Why this biases toward honest operators</h2>
	<p>An operator cannot fake rate on the long run without losing money on every settled trade. They cannot fake fee — it is published. Reputation is keyed to a public key that has actually settled volume, and settled trades leave signed events on a public relay.</p>
	<p>An honest operator with real settled history outranks a fresh operator with a fat margin, even when the fresh operator's headline rate looks better. The wallet runs the ranking. The customer sees the result. Reputation accrues over time, so the operator who survives the early losses wins the long game.</p>
</section>

<section>
	<h2>Why a single node cannot persistently undercut</h2>
	<p>A node quoting below cost loses on every trade. Reputation accrues slowly because each settled trade costs the operator money. Eventually the node either raises its rate (and loses its ranking lead to the next-toughest competitor) or runs out of capital and exits. The market converges on cost-plus-margin.</p>
</section>

<section>
	<h2>Honest limits</h2>
	<ul>
		<li>Convergence is predicted, not measured. The reference federation today is a demo fixture.</li>
		<li>No FX oracle. Each Mostro node quotes its own rate.</li>
		<li>Settlement is atomic with Lightning, not with the operator. Fiat-rail reversals are an honest limit of any non-custodial design.</li>
	</ul>
</section>

<section>
	<p>
		<Cta variant="primary" href="/docs/how-voyager-pay-extends">Continue</Cta>
	</p>
</section>
