<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import TricolorPanel from '$lib/components/TricolorPanel.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import primitives from '$lib/data/primitives.json';
	import PrimitiveCard from '$lib/components/PrimitiveCard.svelte';
</script>

<svelte:head>
	<title>Stack — Voyager · Caribbean-first toolkit</title>
</svelte:head>

<RegisterSection register="carnival-poster">
<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// the stack</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-[var(--register-text)] leading-[0.95] max-w-4xl">
			Five primitives, one SDK.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-muted)]">
			Each primitive solves one job. Together they cover identity, payment, fiat on/off, private messaging, and findability. Open the one that fits your build.
		</p>
	</div>
</section>

<section id="primitives" class="mx-auto max-w-6xl px-6 pb-24 scroll-mt-20">
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each primitives as p (p.slug)}
			<PrimitiveCard
				register="carnival-poster"
				id={p.code.toLowerCase()}
				code="{p.code} · {p.title.split(' | ')[0].toUpperCase()}"
				title={p.title}
				body={p.lede}
				icon={p.icon}
				href="/stack/{p.slug}"
			/>
		{/each}
		<PrimitiveCard
			register="carnival-poster"
			id="sdk"
			code="SDK · ONE SURFACE"
			title="One Stripe-shaped call surface. AI inside."
			body="One TypeScript entry. Identity, payments, ramp, DMs, listings behind a single import. The SDK is what your app ships; the primitives are what it talks to. The in-browser AI agent lives across all five primitives — search relays, parse payments, sign listings — never a remote model."
			icon="sparkle"
			href="/build"
		/>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<TricolorPanel
		register="carnival-poster"
		items={[
			{
				label: 'Five primitives',
				body: 'Each solves one job. Identity, payments, ramp, DMs, listings — the smallest set that covers what Caribbean builders actually need.',
				href: '#primitives'
			},
			{
				label: 'One SDK',
				body: 'A single TypeScript entry. Stripe-shaped surface. Five primitives, one in-browser AI agent — no platform in the middle.',
				href: '/build'
			},
			{
				label: 'Builders ship the rest',
				body: 'No chat protocol, streaming layer, or CDN picked for you. Those are your call. The five plus one cover everything else.',
				href: '/principles'
			}
		]}
	/>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12">
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
