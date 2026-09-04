<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SplitPanel from '$lib/components/SplitPanel.svelte';
	import UseCaseCard from '$lib/components/UseCaseCard.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import MasCampByline from '$lib/components/MasCampByline.svelte';
	import useCases from '$lib/data/useCases.json';

	const PRIMITIVES = [
		{ label: 'Identity', note: 'self-sovereign login' },
		{ label: 'Payments', note: 'Lightning rail' },
		{ label: 'Ramp', note: 'federated fiat' },
		{ label: 'Messaging', note: 'NIP-17 gift wrap' },
		{ label: 'Discovery', note: 'signed listings' }
	];
</script>

<svelte:head>
	<title>Use cases — Voyager · open toolkit</title>
</svelte:head>

<RegisterSection register="carnival-poster">
<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// use cases</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.95] max-w-4xl">
			Eight jobs the toolkit makes easy.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed">
			These are the jobs-to-be-done for the toolkit. Each is a target use case for some app a builder would ship on Voyager.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each useCases as uc (uc.slug)}
			<UseCaseCard register="carnival-poster" id={uc.slug} code={uc.code} title={uc.title} body={uc.short} href="/use-cases/{uc.slug}" />
		{/each}
	</div>
	<div class="mt-12">
		<MasCampByline register="carnival-poster" eyebrow="Five primitives · one SDK" camps={PRIMITIVES} />
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<SplitPanel
		theme="left-dark"
		left={{
			stat: { value: '8', label: 'USE CASES' },
			title: 'Eight jobs, not eight products.',
			body: 'Each use case is something a builder would ship, not something Voyager runs. The platform makes them possible; the apps are yours.'
		}}
		right={{
			eyebrow: '// methodology',
			title: 'From early builder validation.',
			body: 'These are the jobs builders identified for the toolkit. Each one is a target for some app a builder ships on Voyager — the list is what the platform should make easy, not what Voyager builds.'
		}}
	/>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] p-8 sm:p-12" style="background-color: var(--register-card);">
		<SectionHeader
			eyebrow="Build on it"
			title="None of these are Voyager products."
			lede="The toolkit makes them possible. Builders ship the apps. Voyager-the-business only ships the two showcase apps on the projects page."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/build">Start building</Cta>
			<Cta variant="secondary" href="/projects">See projects</Cta>
		</div>
	</div>
</section>
</RegisterSection>
