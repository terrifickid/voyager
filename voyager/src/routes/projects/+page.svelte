<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import RoadMarchRibbon from '$lib/components/RoadMarchRibbon.svelte';
	import ProjectFilter from '$lib/components/ProjectFilter.svelte';
	import projects from '$lib/data/projects.json';

	const ROAD_MARCH = [
		{ year: '2024', name: 'voyager-concierge alpha', note: 'first trip-planner build' },
		{ year: '2025', name: 'voyager-pay · spec v0.1', note: 'protocol-shaped, Nostr underneath' },
		{ year: '2026', name: 'Mostro federation', note: 'JMD, TTD, BBD · XCD rails live' }
	];

	const CATEGORIES = ['all', 'ai', 'payments', 'marketplace', 'concierge', 'logistics', 'social'];
</script>

<svelte:head>
	<title>Projects — Voyager · showcases</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// built on voyager</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-[var(--register-text)] leading-[0.95] max-w-4xl">
			Showcase apps.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-text)]">
			One showcase is live today. More land as builders ship on the toolkit.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-16">
	<ProjectFilter items={projects} categories={CATEGORIES} register="carnival-poster" />
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12 border border-[var(--register-hair)]">
		<SectionHeader
			eyebrow="Ship your own"
			title="The platform is the toolkit, not the catalogue."
			lede="If the showcase apps don't fit your use case, build on Voyager anyway. The SDK doesn't favor anyone."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
<Cta variant="primary" href="/build">Start building</Cta>
		<Cta variant="secondary" href="/use-cases">See use cases</Cta>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-32 border-t border-teal-bright">
	<RoadMarchRibbon
		register="carnival-poster"
		eyebrow="Road march · Voyager showcase lineage"
		winners={ROAD_MARCH}
	/>
</section>
</RegisterSection>
