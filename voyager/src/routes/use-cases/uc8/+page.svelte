<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import MasCampByline from '$lib/components/MasCampByline.svelte';
	import useCases from '$lib/data/useCases.json';

	const uc = useCases.find((x) => x.slug === 'uc8');
	const MAS_CAMPS = [
		{ label: 'Carnival Yard', note: 'fete · UC8' },
		{ label: 'Bacchanal', note: 'road march · UC8' },
		{ label: 'Diaspora Hub', note: 'remit · UC8' },
		{ label: 'Sports Stand', note: 'tickets · UC8' }
	];
</script>

<svelte:head>
	<title>{uc.code} · {uc.title} — Voyager · Caribbean-first</title>
</svelte:head>

<RegisterSection register="civic-ocean">
<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">{uc.code} · use case</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[72px] text-ink leading-[1.02] max-w-4xl">
			{uc.title}.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-ink-2">{uc.short}</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-16">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<div class="rounded-[28px] bg-bone-100 p-8">
			<span class="eyebrow">The problem</span>
			<p class="mt-3 text-lg leading-relaxed text-ink-2">{uc.what}</p>
		</div>
		<div class="rounded-[28px] bg-bone-100 p-8">
			<span class="eyebrow">How Voyager fits</span>
			<p class="mt-3 text-lg leading-relaxed text-ink-2">{uc.how}</p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-16">
	<div class="rounded-[28px] bg-bone-200 p-8">
		<span class="eyebrow">Primitives in play</span>
		<ul class="mt-4 flex flex-wrap gap-3">
			{#each uc.primitives as pr (pr)}
				<li class="rounded-pill bg-bone-50 px-4 py-2 text-[13px] font-semibold text-ink">{pr}</li>
			{/each}
		</ul>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-12">
	<MasCampByline register="civic-ocean" eyebrow="Mas camps & kaiso tents" camps={MAS_CAMPS} />
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-bone-100 p-8 sm:p-12">
		<SectionHeader
			eyebrow="Next"
			title="See how a builder ships this."
			lede="Voyager ships two showcase apps today. The rest is what builders ship on the toolkit."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/projects">See projects</Cta>
			<Cta variant="secondary" href="/use-cases">All use cases</Cta>
		</div>
	</div>
</section>
</RegisterSection>
