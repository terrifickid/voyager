<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import primitives from '$lib/data/primitives.json';

	const p = primitives.find((x) => x.slug === 'ramp');
</script>

<svelte:head>
	<title>{p.title} — Voyager Stack</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">{p.code} · federated on/off ramp</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-ink leading-[0.95] max-w-4xl">
			{p.title}.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">{p.lede}</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
		<div class="flex flex-col gap-6">
			<div class="rounded-[28px] bg-bone-100 p-8">
				<span class="eyebrow">What it is</span>
				<p class="mt-3 text-lg leading-relaxed text-ink-2">{p.what}</p>
			</div>
			<div class="rounded-[28px] bg-bone-100 p-8">
				<span class="eyebrow">Why it matters here</span>
				<p class="mt-3 text-lg leading-relaxed text-ink-2">{p.why}</p>
			</div>
		</div>
		<aside class="flex flex-col gap-4 rounded-[28px] bg-bone-200 p-7">
			<Icon name={p.icon} tone="ink" size={28} />
			<span class="eyebrow">Wire format</span>
			<p class="font-mono text-[13px] text-ink-2">{p.kind}</p>
			<span class="eyebrow mt-2">SDK calls</span>
			<ul class="flex flex-col gap-1 font-mono text-[13px] text-ink-2">
				{#each p.sdk as call (call)}
					<li>{call}</li>
				{/each}
			</ul>
		</aside>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="Next"
			title="See the operator's side."
			lede="Anyone can run a Mostro node. Voyager operates one for Caribbean rails; community operators compete on rate and reputation."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/projects/voyager-pay/node">Run a node</Cta>
			<Cta variant="secondary" href="/network">See the network</Cta>
		</div>
	</div>
</section>
