<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import CarnivalRibbon from '$lib/components/CarnivalRibbon.svelte';
	import HeritageLineage from '$lib/components/HeritageLineage.svelte';

	const PRINCIPLES = [
		{ label: 'No custody', href: '#' },
		{ label: 'No identity dossier', href: '#' },
		{ label: 'Builders ship the apps', href: '#' },
		{ label: 'The protocol is the product', href: '#' },
		{ label: 'Capture-resistant by design', href: '#' },
		{ label: 'Caribbean rails first', href: '#' }
	];
	const LINEAGE = [
		{ label: 'Sep 2 2026', note: 'Advisory call · Shontelle Layne' },
		{ label: 'Oct 2026', note: 'Five primitives — alpha' },
		{ label: 'Now', note: 'Open rails · Caribbean-first' }
	];
</script>

<svelte:head>
	<title>Principles — Voyager · Caribbean-first</title>
</svelte:head>

<RegisterSection register="rasta">

<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// principles</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-[var(--register-text)] leading-[0.95] max-w-4xl">
			What Voyager is, and what it isn't.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-text)]">
			The trip planner was the vehicle. The toolkit is the destination. These are the principles that shape the platform.
		</p>
	</div>
</section>

<!-- What changed and why -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// what changed"
		title="From a trip planner to a toolkit."
		lede="The Sep 2 2026 advisory call made it clear: the value isn't in the trip planner. The trip planner was the means to build the rails. The rails are now built."
	/>
	<div class="mt-10 flex flex-col gap-6 rounded-[28px] bg-[var(--register-card)] p-8 text-lg leading-relaxed text-[var(--register-muted)]">
		<p><span class="font-display text-[var(--register-text)]">Trip planner for tourists</span> &rarr; <span class="font-display text-[var(--register-text)]">Toolkit for builders serving the Caribbean.</span></p>
		<p><span class="font-display text-[var(--register-text)]">Voyager Pay as the product</span> &rarr; <span class="font-display text-[var(--register-text)]">Voyager as the platform.</span> No single product surface.</p>
		<p><span class="font-display text-[var(--register-text)]">One reference app</span> &rarr; <span class="font-display text-[var(--register-text)]">One rail set + a couple of showcase apps.</span> Builders ship the rest.</p>
		<p><span class="font-display text-[var(--register-text)]">Implicit end users</span> &rarr; <span class="font-display text-[var(--register-text)]">Explicit Caribbean builders, integrators, creators, concierge operators, regional SMEs, CARICOM-adjacent initiatives, and diaspora communities.</span></p>
	</div>
</section>

<!-- Toolkit not apps -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// the toolkit is the product"
		title="Voyager stays a toolkit. Builders own the apps."
		lede="We are explicitly not building a travel booking engine, a music DSP, a regulated fiat wallet, a central marketplace, or a no-code builder. Each of those is a builder's job."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each [
			{ t: 'No travel booking engine', b: 'We ship a demo (Trip Planner). Real itineraries are builders\' | job.' },
			{ t: 'No music DSP', b: 'No streaming. Showcase stage is admin and reputation, not a Spotify competitor.' },
			{ t: 'No regulated wallet', b: 'Fiat flows go through Mostro nodes. Voyager is never the regulated entity.' },
			{ t: 'No central marketplace', b: 'Discovery is relay fan-out. We run an optional indexer.' },
			{ t: 'No no-code builder', b: 'SDK yes. Visual editor no.' },
			{ t: 'No national rollout', b: 'No token launch, no VC raise, no v0.1 territory campaign.' }
		] as row (row.t)}
			<article class="flex flex-col gap-2 rounded-[24px] bg-[var(--register-card)] p-6">
				<h3 class="font-display text-lg leading-tight text-[var(--register-text)]">{row.t}</h3>
				<p class="text-[14px] leading-relaxed text-[var(--register-muted)]">{row.b}</p>
			</article>
		{/each}
	</div>
</section>

<!-- EROI summary -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// EROI"
		title="Three properties a custodial rail can't give you."
		lede="EROI is extraction-resistance: how the design defends its users when someone wants to take what's there. F=3, O=3, B=3 on Voyager. Custodial rails sit at F=0."
	/>
	<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">F · Forgery</span>
			<h3 class="font-display text-2xl text-[var(--register-text)] leading-tight">3 / 3</h3>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">Order traffic is gift-wrapped. Relays see encrypted blobs. Trust lives in signed events, not identity dossiers.</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">O · Opaqueness</span>
			<h3 class="font-display text-2xl text-[var(--register-text)] leading-tight">3 / 3</h3>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">Value is dispersed across many independent operators. Reaching the whole network means reaching N operators in N jurisdictions.</p>
		</article>
		<article class="flex flex-col gap-3 rounded-[28px] bg-[var(--register-card)] p-7">
			<span class="eyebrow">B · Bonding</span>
			<h3 class="font-display text-2xl text-[var(--register-text)] leading-tight">3 / 3</h3>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">Settlement is atomic. Detached value loses worth — it won't move without its rightful context.</p>
		</article>
	</div>
	<div class="mt-8 flex flex-wrap gap-3">
		<Cta variant="tertiary" href="/docs/what-is-eroi" class="text-bone-50! hover:text-rasta-gold!">What EROI is</Cta>
		<Cta variant="tertiary" href="/docs/why-systems-get-captured" class="text-bone-50! hover:text-rasta-gold!">Why systems get captured</Cta>
	</div>
</section>

<!-- The platform's promise -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid grid-cols-1 lg:grid-cols-2 rounded-[28px] overflow-hidden">
		<div class="p-8 sm:p-12 flex flex-col gap-5 bg-[var(--register-ground)]">
			<span class="eyebrow">// the platform's promise</span>
			<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] max-w-md text-[var(--register-text)]">The protocol survives without us.</h2>
			<p class="text-[15px] leading-relaxed text-[var(--register-muted)] max-w-md">If Voyager-the-business is acquired or shut down tomorrow, the rails keep working. Reference clients are demos; the wire format is the product. Builders' | apps do not depend on us staying alive.</p>
		</div>
		<div class="p-8 sm:p-12 flex flex-col gap-5" style="background-color: var(--register-accent); color: var(--register-accent-ink);">
			<span class="font-display text-[64px] sm:text-[88px] lg:text-[104px] leading-[0.95]" style="color: var(--register-accent-ink)">0</span>
			<span class="text-[11px] font-semibold tracking-[0.14em] uppercase" style="color: var(--register-accent-ink); opacity: 0.7">Custodians</span>
			<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] max-w-md" style="color: var(--register-accent-ink)">No platform in the middle.</h2>
			<p class="text-[15px] leading-relaxed max-w-md" style="color: var(--register-accent-ink)">The protocol never holds funds. Users bring their own wallets. Operators run their own nodes. We run an optional indexer and one reference Mostro node. That is the whole list.</p>
		</div>
	</div>
</section>

<!-- How the network gets stronger -->
<section class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// network hardening"
		title="How the network gets stronger."
		lede="Five things, prioritized by what makes the platform less capturable over time."
	/>
	<ol class="mt-10 flex flex-col gap-4">
		{#each [
			{ n: 1, t: 'SDK ergonomics', b: 'If builders find it easier than Stripe, they stay. If they don\'t, they leave. v0.1 priority.' },
			{ n: 2, t: 'More ramp operators', b: 'The fiat ramp is a federation. Voyager operates one; community operators bring redundancy and reputation.' },
			{ n: 3, t: 'Builder guidance', b: 'Regulatory checklists, reference architectures, the alpha program. Builders shouldn\'t learn alone.' },
			{ n: 4, t: 'Independent indexers', b: 'Capture risk at the platform layer is real. Seeding parallel indexers early keeps discovery plural.' },
			{ n: 5, t: 'Cultural authenticity', b: 'A platform designed in Texas for Caribbean builders is going to miss things. The advisory call is the start.' }
		] as item (item.n)}
			<li class="flex gap-5 rounded-[28px] bg-[var(--register-card)] p-6">
				<span class="font-display text-2xl text-[var(--register-text)] leading-none">{item.n}</span>
				<div class="flex flex-col gap-1">
					<h3 class="font-display text-lg text-[var(--register-text)] leading-tight">{item.t}</h3>
					<p class="text-[15px] leading-relaxed text-[var(--register-muted)]">{item.b}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<!-- Where builders take it next -->
<section class="mx-auto max-w-6xl px-6 pb-32">
	<SectionHeader
		eyebrow="// where it goes"
		title="Where builders take it next."
		lede="Open questions, not blockers. Flagged for the build."
	/>
	<ul class="mt-10 flex flex-col gap-4">
		{#each [
			'Should voyager-stage ship in v0.1, or wait for voyager-concierge to land? Concierge first is the conservative call.',
			'Do we want a hosted indexer at all, or do we let apps run their own relay subscriptions? Hosted indexer helps builder velocity; it gives us leverage we shouldn\'t want.',
			'What\'s the smallest viable "Caribbean hub" social surface we\'d ship as a third showcase app? Probably none in v0.1; flag for v0.2.',
			'Should the SDK ship in TypeScript, Python, and Go from day one, or just TS? TS only for v0.1; others when there\'s demand.'
		] as q, i (i)}
			<li class="rounded-[24px] bg-[var(--register-card)] p-6 text-[15px] leading-relaxed text-[var(--register-muted)]">
				<span class="font-display text-[var(--register-text)]">Q{i + 1}.</span> {q}
			</li>
		{/each}
	</ul>
	<div class="mt-10">
		<Cta variant="primary" href="/build">Start building</Cta>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-16">
	<CarnivalRibbon register="rasta" items={PRINCIPLES} />
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<HeritageLineage
		register="rasta"
		eyebrow="Platform lineage — same shape as the music"
		stages={LINEAGE}
		caption="Sep 2 advisory call → five primitives → open rails. A lineage from prior art, not nostalgia."
	/>
</section>
</RegisterSection>
