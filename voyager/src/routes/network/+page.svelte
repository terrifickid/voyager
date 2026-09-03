<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SplitPanel from '$lib/components/SplitPanel.svelte';
	import nodes from '$lib/data/mostroNodes.json';

	const REFERENCE_NODE = 'voyager-caribbean';

	function fmtSats(n) {
		return new Intl.NumberFormat('en-US').format(n);
	}

	function isCaribbean(region) {
		const r = region.toLowerCase();
		const islands = ['jm', 'tt', 'bb', 'gd', 'lc', 'vc', 'ag', 'dm', 'kn', 'bs', 'gy', 'ht'];
		return islands.some((code) => r.includes(code));
	}
</script>

<svelte:head>
	<title>Network — Voyager</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// the network</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-ink leading-[0.95] max-w-4xl">
			Independent nodes, public relays.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">
			Voyager doesn't host the network. Voyagers hosts the indexer. Mostro nodes, Nostr relays, and independent indexers are run by anyone who wants to.
		</p>
	</div>
</section>

<section id="mostro-nodes" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Mostro nodes"
		title="The fiat ramp is a federation."
		lede="Each node publishes a profile (kind:38383). Wallets rank nodes per-order using a deterministic rubric. The reference node is one among many."
	/>
	<div class="mt-12 flex flex-col gap-6">
		<article class="rounded-[28px] bg-bone-100 p-8">
			<div class="flex flex-wrap items-baseline justify-between gap-4">
				<div class="flex flex-col gap-2">
					<span class="eyebrow text-muted">reference node</span>
					<h3 class="font-display text-2xl text-ink leading-tight">voyager-caribbean</h3>
					<p class="text-sm text-muted">Kingston, JM · operated by Voyager-the-business</p>
				</div>
				<div class="flex flex-wrap gap-2">
					{#each nodes.find((n) => n.name === REFERENCE_NODE)?.supportedFiats ?? [] as f (f)}
						<span class="rounded-pill bg-bone-200 px-3 py-1.5 font-mono text-[12px] text-ink">{f}</span>
					{/each}
				</div>
			</div>
		</article>

		<div class="flex flex-col gap-3">
			<p class="eyebrow text-muted">community nodes</p>
			<ul class="grid grid-cols-1 gap-3 md:grid-cols-2">
				{#each nodes.filter((n) => n.name !== REFERENCE_NODE) as n (n.name)}
					<li class="flex flex-col gap-2 rounded-[24px] bg-bone-100 p-6">
						<div class="flex items-baseline justify-between gap-3">
							<h4 class="font-display text-lg text-ink leading-tight">{n.name}</h4>
							<span class="font-mono text-[12px] text-muted">fee {n.feePct}%</span>
						</div>
						<p class="text-sm text-muted">{n.region} · {isCaribbean(n.region) ? 'caribbean' : 'global'} · {fmtSats(n.hodlLiquiditySats)} sats HODL</p>
					</li>
				{/each}
			</ul>
		</div>

		<div class="mt-2">
			<Cta variant="primary" href="/projects/voyager-pay/node">Run a Mostro node</Cta>
		</div>
	</div>
</section>

<section id="relays" class="mx-auto max-w-6xl px-6 pb-20 scroll-mt-20">
	<SectionHeader
		eyebrow="Nostr relays"
		title="Discovery is relay fan-out."
		lede="There is no central indexer that Voyager owns. Builders pick a relay set; Voyager ships a curated default for the Caribbean."
	/>
	<div class="mt-10 rounded-[28px] bg-bone-100 p-8">
		<ul class="flex flex-col gap-3 font-mono text-[14px] text-ink-2">
			<li>wss://relay.voyager Caribbean · default for Voyager apps</li>
			<li>wss://nostr.wine · global · large public catalogue</li>
			<li>wss://relay.damus.io · global · iOS default</li>
			<li>wss://nos.lol · global · free public</li>
		</ul>
		<p class="mt-6 text-sm text-muted">
			Anyone can run a relay. Operators who serve Caribbean listings and ramp quotes earn reputation from the apps that connect.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<SplitPanel
		theme="right-dark"
		left={{
			eyebrow: '// independence',
			title: 'The federation is the resilience.',
			body: 'Mostro nodes publish their own profiles. Wallets rank them per-order. If one node goes down, the next best quote wins — no central counterparty to fail.'
		}}
		right={{
			stat: { value: 'N+', label: 'INDEPENDENT NODES' },
			body: 'More operators means better rate discovery, more redundancy, and more rails. Voyager operates one reference node; community operators compete on fee, region, and reputation.',
			cta: { label: 'Run a node', href: '/projects/voyager-pay/node' }
		}}
	/>
</section>

<section id="indexer" class="mx-auto max-w-6xl px-6 pb-32 scroll-mt-20">
	<SectionHeader
		eyebrow="Indexer"
		title="An optional cache, never a chokepoint."
		lede="Voyager-the-business operates an optional indexer for builder velocity. Independent operators are encouraged to seed parallel indexers so the platform layer is never the only path."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
		<div class="flex flex-col gap-3 rounded-[28px] bg-bone-100 p-7">
			<span class="eyebrow">Free tier</span>
			<h3 class="font-display text-2xl text-ink leading-tight">Public search</h3>
			<p class="text-[15px] leading-relaxed text-ink-2">Open read access to the indexed catalogue. Rate-limited. Good for demos and small apps.</p>
		</div>
		<div class="flex flex-col gap-3 rounded-[28px] bg-bone-100 p-7">
			<span class="eyebrow">Paid tier</span>
			<h3 class="font-display text-2xl text-ink leading-tight">Hosted SLA</h3>
			<p class="text-[15px] leading-relaxed text-ink-2">Higher rate limits, webhook delivery, pre-indexed facets for buyer apps. Pricing tied to usage.</p>
		</div>
		<div class="flex flex-col gap-3 rounded-[28px] bg-bone-100 p-7">
			<span class="eyebrow">Independent</span>
			<h3 class="font-display text-2xl text-ink leading-tight">Self-host</h3>
			<p class="text-[15px] leading-relaxed text-ink-2">Run your own indexer. Voyager publishes the schema and the docker image. Capture risk lives at the platform layer; this is the mitigation.</p>
		</div>
	</div>
	<div class="mt-8">
		<Cta variant="secondary" href="/build#economics">Builder economics</Cta>
	</div>
</section>
