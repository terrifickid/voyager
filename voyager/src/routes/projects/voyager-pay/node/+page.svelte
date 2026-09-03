<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import nodes from '$lib/data/mostroNodes.json';
</script>

<svelte:head>
	<title>Run a node — Voyager Pay</title>
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">Voyager Pay</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-ink max-w-4xl leading-[1.02]">
			Run a node. Anyone can join the federation.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">
			A Mostro node is an independent market maker. It never touches fiat, never holds a customer balance, and cannot move sats unilaterally. Running one is a for-profit line item with real capital requirements. This page is for operators, not users.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/projects/voyager-pay">How Voyager Pay works</Cta>
			<Cta variant="secondary" href="/projects/voyager-pay/security">Security by design</Cta>
		</div>
	</div>
</section>

<!-- Non-custodial reminder -->
<section class="mx-auto max-w-6xl px-6 pb-16">
	<div class="rounded-[28px] bg-bone-100 p-6">
		<span class="eyebrow">Operators are non-custodial market makers</span>
		<p class="mt-4 text-[15px] leading-relaxed text-ink-2">
			A Mostro node never holds your customer's funds in any meaningful sense. Settlement is atomic with the network, not with the operator. The node can release the HODL or refund it — it cannot redirect it to itself. Operators earn fees; they do not custody balances. If you are evaluating this as a custodial business, it is not that.
		</p>
	</div>
</section>

<!-- What a node does -->
<section class="mx-auto max-w-6xl px-6 pb-16">
	<SectionHeader
		eyebrow="What a node does"
		title="A HODL-invoice arbiter that never touches fiat."
		lede="Three jobs. None of them involve holding customer money."
	/>
	<div class="mt-10 flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			<span class="font-display text-ink">Publish a profile.</span> Each node advertises what it can do — region, supported fiats, settlement methods, fee percentage, HODL liquidity, reputation — as a <code class="rounded bg-bone-200 px-1.5 py-0.5 text-[15px]">kind:38383</code> event on Nostr. Wallets read it. The ranking rubric weighs it.
		</p>
		<p>
			<span class="font-display text-ink">Lock sats in a HODL.</span> When a customer's wallet accepts your quote, your node emits a Lightning hold-invoice (a HODL) for the agreed amount plus your fee. The sats sit in the HODL contract on the network, not in your custody.
		</p>
		<p>
			<span class="font-display text-ink">Release on attestation, refund on timeout.</span> When the vendor signs an attestation that the fiat landed, your node releases the HODL. If the attestation does not arrive in the agreed window, your node refunds. The arbiter job is to collect evidence in disputes and call release or refund — your node takes no principal either way.
		</p>
	</div>
</section>

<!-- What you publish -->
<section class="mx-auto max-w-6xl px-6 pb-16">
	<SectionHeader
		eyebrow="What you publish"
		title="A kind:38383 profile, a pubkey, and a contact."
		lede="Six fields, all of them yours to set."
	/>
	<div class="mt-10 rounded-[28px] bg-bone-200 p-6">
		<ul class="flex flex-col gap-3 text-ink-2">
			<li><span class="font-display text-ink">Region</span> — city and country; used by wallets that filter by jurisdiction.</li>
			<li><span class="font-display text-ink">Supported fiats</span> — e.g. JMD, USD, EUR, GBP.</li>
			<li><span class="font-display text-ink">Supported methods</span> — bank transfer, Wise, mobile money, cash.</li>
			<li><span class="font-display text-ink">Fee percentage</span> — your fee, transparent, published.</li>
			<li><span class="font-display text-ink">HODL liquidity</span> — the sats you can lock at once; wallets use this to size orders.</li>
			<li><span class="font-display text-ink">Contact pubkey</span> — for encrypted order messages.</li>
		</ul>
	</div>
</section>

<!-- What it costs to run -->
<section class="mx-auto max-w-6xl px-6 pb-16">
	<SectionHeader
		eyebrow="What it costs to run"
		title="Capital, reputation seeding, modest infra."
		lede="Three line items. None are optional."
	/>
	<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<span class="eyebrow">Capital</span>
			<h3 class="font-display text-xl text-ink leading-tight">Lightning HODL capacity</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Outbound liquidity on your Lightning node. Larger HODL liquidity attracts larger orders.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<span class="eyebrow">Reputation</span>
			<h3 class="font-display text-xl text-ink leading-tight">Settled volume, not airtime</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				Reputation accrues only with settled trades. Early on, your reputation is the floor — operators who quote tight and survive on volume win.
			</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-6">
			<span class="eyebrow">Infra</span>
			<h3 class="font-display text-xl text-ink leading-tight">A node, a relay, an arbiter</h3>
			<p class="text-sm leading-relaxed text-ink-2">
				A Lightning node, a Nostr keypair and relay, and an arbiter process (can be a human via CLI at first; agent later).
			</p>
		</article>
	</div>
</section>

<!-- What's in it for you -->
<section class="mx-auto max-w-6xl px-6 pb-16">
	<SectionHeader
		eyebrow="What's in it for you"
		title="Fee revenue plus reputation accrual."
		lede="Two streams. They compound."
	/>
	<div class="mt-10 flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			Every settled trade earns your published fee. As volume accrues, so does reputation. Reputation feeds the §7.4 ranking rubric, which feeds more volume. A tight-quoting operator with real settled history outranks a fat-margin operator with no history, and the ranking happens client-side in every wallet on the network.
		</p>
	</div>
</section>

<!-- Voyager's bootstrap node -->
<section class="mx-auto max-w-6xl px-6 pb-16">
	<SectionHeader
		eyebrow="Voyager's bootstrap node"
		title="voyager-caribbean — a worked example."
		lede="The Caribbean-tuned node is already in the demo widget. These are its actual published fields."
	/>
	<div class="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
		<article class="rounded-[28px] bg-bone-100 p-8">
			<span class="eyebrow">Profile</span>
			<ul class="mt-4 flex flex-col gap-3 text-ink-2">
				<li><span class="font-display text-ink">Region</span> — Kingston, JM</li>
				<li><span class="font-display text-ink">Fiats</span> — JMD, USD, EUR, GBP</li>
				<li><span class="font-display text-ink">Methods</span> — bank, cash, mobile</li>
				<li><span class="font-display text-ink">Fee</span> — 0.3%</li>
				<li><span class="font-display text-ink">Reputation</span> — 95 / 100</li>
				<li><span class="font-display text-ink">HODL liquidity</span> — {(nodes.find(n => n.name === 'voyager-caribbean')?.hodlLiquiditySats ?? 0).toLocaleString('en-US')} sats</li>
			</ul>
		</article>
		<article class="rounded-[28px] bg-bone-100 p-8">
			<span class="eyebrow">Honest limits</span>
			<ul class="mt-4 flex flex-col gap-3 text-ink-2">
				<li>Today, running a node means running against the demo fixture, not a live network.</li>
				<li>The fixture has five nodes. Convergence on cost-plus-margin is a structural argument, not an empirical claim at this scale.</li>
				<li>The reference client is alpha; you would be running against a spec, not a shipped product.</li>
			</ul>
		</article>
	</div>
</section>

<!-- Next-up CTA -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Back to</span>
			<h3 class="mt-2 font-display text-xl text-ink">The Voyager Pay overview.</h3>
			<p class="mt-2 text-sm text-ink-2">Five invariants, three layers, seven steps from request to settlement.</p>
		</div>
		<Cta variant="primary" href="/projects/voyager-pay">Voyager Pay</Cta>
	</div>
</section>