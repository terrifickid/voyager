<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import UseCaseCard from '$lib/components/UseCaseCard.svelte';
	import useCases from '$lib/data/useCases.json';
</script>

<svelte:head>
	<title>Use cases — Voyager</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// use cases</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-ink leading-[0.95] max-w-4xl">
			Eight jobs the toolkit makes easy.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">
			These are the jobs-to-be-done surfaced by the Sep 2 2026 advisory call with Shontelle Layne. Each is a target use case for some app a builder would ship on Voyager.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each useCases as uc (uc.slug)}
			<UseCaseCard id={uc.slug} code={uc.code} title={uc.title} body={uc.short} href="/use-cases/{uc.slug}" />
		{/each}
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
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
