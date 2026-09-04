<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import MasCampByline from '$lib/components/MasCampByline.svelte';
	import useCases from '$lib/data/useCases.json';

	const PRIMITIVE_NOTES = {
		Identity: 'self-sovereign login',
		Payments: 'Lightning rail',
		Ramp: 'federated fiat',
		Messaging: 'NIP-17 gift wrap',
		Discovery: 'signed listings'
	};

	const uc = useCases.find((x) => x.slug === 'uc8');
	const primitivesInPlay = uc.primitives.map((s) => {
		const name = s.split(' · ')[1];
		return { label: name, note: PRIMITIVE_NOTES[name] };
	});
</script>

<svelte:head>
	<title>{uc.code} · {uc.title} — Voyager · open toolkit</title>
</svelte:head>

<RegisterSection register="carnival-poster">
<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">{uc.code} · use case</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[72px] leading-[1.02] max-w-4xl">
			{uc.title}.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed">{uc.short}</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-16">
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<div class="rounded-[28px] p-8" style="background-color: var(--register-card);">
			<span class="eyebrow">The problem</span>
			<p class="mt-3 text-lg leading-relaxed">{uc.what}</p>
		</div>
		<div class="rounded-[28px] p-8" style="background-color: var(--register-card);">
			<span class="eyebrow">How Voyager fits</span>
			<p class="mt-3 text-lg leading-relaxed">{uc.how}</p>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<MasCampByline register="carnival-poster" eyebrow="Primitives in play" camps={primitivesInPlay} />
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] p-8 sm:p-12" style="background-color: var(--register-card);">
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
