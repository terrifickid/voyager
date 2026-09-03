<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SplitPanel from '$lib/components/SplitPanel.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import primitives from '$lib/data/primitives.json';
	import PrimitiveCard from '$lib/components/PrimitiveCard.svelte';
</script>

<svelte:head>
	<title>Stack — Voyager · Caribbean-first toolkit</title>
</svelte:head>

<RegisterSection register="civic-ocean">
<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// the stack</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-ink leading-[0.95] max-w-4xl">
			Five primitives, one SDK.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">
			Each primitive solves one job. Together they cover identity, payment, fiat on/off, private messaging, and findability. Open the one that fits your build.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
		{#each primitives as p (p.slug)}
			<PrimitiveCard
				id={p.code.toLowerCase()}
				code="{p.code} · {p.title.split(' ')[0].toUpperCase()}"
				title={p.title}
				body={p.lede}
				icon={p.icon}
				href="/stack/{p.slug}"
			/>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<SplitPanel
		theme="left-dark"
		left={{
			stat: { value: '5 + 1', label: 'PRIMITIVES · 1 SDK' },
			title: 'Five primitives. One SDK.',
			body: 'Each primitive solves one job. The SDK wires them together — identity, payment, ramp, messaging, discovery behind one Stripe-shaped surface.'
		}}
		right={{
			eyebrow: '// why these five',
			title: 'What we left out, and why.',
			body: 'We did not pick a chat protocol, a streaming layer, or a CDN. Builders ship those on top. The five primitives are the smallest set that covers identity, money, fiat on/off, private messaging, and findability.'
		}}
	/>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="Start here"
			title="Pick the primitive that matches your job."
			lede="Each page names the protocol details, the SDK calls, and the gotchas. Read in order or jump to the one you need."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/build">Read the SDK get-started</Cta>
			<Cta variant="secondary" href="/use-cases">See use cases</Cta>
		</div>
	</div>
</section>
</RegisterSection>
