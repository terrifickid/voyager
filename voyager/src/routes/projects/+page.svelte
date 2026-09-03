<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import RoadMarchRibbon from '$lib/components/RoadMarchRibbon.svelte';

	const ROAD_MARCH = [
		{ year: '2024', name: 'voyager-concierge alpha', note: 'first trip-planner build' },
		{ year: '2025', name: 'voyager-pay · spec v0.1', note: 'protocol-shaped, Nostr underneath' },
		{ year: '2026', name: 'Mostro federation', note: 'JMD, TTD, BBD · XCD rails live' }
	];
</script>

<svelte:head>
	<title>Projects — Voyager · Caribbean-first showcases</title>
</svelte:head>

<RegisterSection register="neo">

<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// built on voyager</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-[var(--register-text)] leading-[0.95] max-w-4xl">
			Showcase apps.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-text)]">
			Voyager-the-business ships 2–3 showcase apps to demonstrate the toolkit. They are demos, not products. Builders ship the rest.
		</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-16">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<a href="/projects/trip-planner" class="group flex flex-col gap-4 rounded-[32px] bg-[var(--register-card)] p-8 transition-colors hover:bg-[var(--register-hair)]">
			<div class="flex items-center justify-between">
				<span class="eyebrow">voyager-concierge</span>
				<span class="font-mono text-[12px] text-[var(--register-muted)]">live</span>
			</div>
			<h2 class="font-display text-[36px] leading-[1.05] text-[var(--register-text)]">Trip Planner</h2>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">
				A high-touch itinerary builder. Hour-by-hour plans from real places, your style, your budget. Pays through Voyager Pay.
			</p>
			<span class="mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--register-text)]">
				Open Trip Planner
				<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
			</span>
		</a>
		<a href="/projects/voyager-pay" class="group flex flex-col gap-4 rounded-[32px] bg-[var(--register-card)] p-8 transition-colors hover:bg-[var(--register-hair)]">
			<div class="flex items-center justify-between">
				<span class="eyebrow">voyager-pay</span>
				<span class="font-mono text-[12px] text-[var(--register-muted)]">live</span>
			</div>
			<h2 class="font-display text-[36px] leading-[1.05] text-[var(--register-text)]">Voyager Pay</h2>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">
				An open payments protocol with a federated fiat ramp, a Caribbean-tuned reference node, and a demo checkout widget.
			</p>
			<span class="mt-2 inline-flex items-center gap-1 text-[14px] font-semibold text-[var(--register-text)]">
				Open Voyager Pay
				<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
			</span>
		</a>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-16">
	<SectionHeader
		eyebrow="// opportunities for builders"
		title="Two more showcase apps, ready to ship."
		lede="Voyager will host these if a Caribbean builder team wants to take them on. The protocol and SDK do the heavy lifting."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] border border-[var(--register-hair)] p-7">
			<span class="eyebrow" style="--register-eyebrow: var(--teal-bright)">opportunity</span>
			<h3 class="font-display text-2xl text-[var(--register-text)] leading-tight">voyager-stage</h3>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">
				Indie artist admin: long-lived identity, reputation accumulation via zaps, contract storage, tour payment splits. Built if there's demand after concierge ships.
			</p>
			<p class="text-[13px] text-[var(--register-muted)]">UC1 + UC7</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] border border-[var(--register-hair)] p-7">
			<span class="eyebrow" style="--register-eyebrow: var(--teal-bright)">opportunity</span>
			<h3 class="font-display text-2xl text-[var(--register-text)] leading-tight">voyager-market</h3>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">
				Generic buyer/seller marketplace for Caribbean goods. Demonstrates search, listings, escrow-free Lightning payments, dispute via Mostro arbiter.
			</p>
			<p class="text-[13px] text-[var(--register-muted)]">UC2</p>
		</article>
	</div>
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
		register="neo"
		eyebrow="Road march · Voyager showcase lineage"
		winners={ROAD_MARCH}
	/>
</section>
</RegisterSection>
