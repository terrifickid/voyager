<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PrimitiveCard from '$lib/components/PrimitiveCard.svelte';
	import UseCaseCard from '$lib/components/UseCaseCard.svelte';
	import PayCheckoutCard from '$lib/components/PayCheckoutCard.svelte';
	import StatBlock from '$lib/components/StatBlock.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import CarnivalRibbon from '$lib/components/CarnivalRibbon.svelte';

	const PRIMITIVES = [
		{ id: 'p1', code: 'P1 · IDENTITY', title: 'Self-sovereign login', body: 'A Nostr keypair replaces email, password, and platform account. No custodian. Recovery is a 12-word seed.', icon: 'lock', href: '/stack/identity' },
		{ id: 'p2', code: 'P2 · PAYMENTS', title: 'Lightning payment rail', body: 'Apps call the SDK. The user signs. The app never holds funds. Works from anywhere with internet.', icon: 'bolt', href: '/stack/payments' },
		{ id: 'p3', code: 'P3 · RAMP', title: 'Federated fiat ramp', body: 'Independent Mostro nodes compete on rate and fee. Caribbean rails first. No platform in the middle.', icon: 'globe', href: '/stack/ramp' },
		{ id: 'p4', code: 'P4 · MESSAGING', title: 'Private messaging', body: 'NIP-17 gift-wrapped DMs give any app end-to-end encrypted messaging without building a Signal clone.', icon: 'chat', href: '/stack/messaging' },
		{ id: 'p5', code: 'P5 · DISCOVERY', title: 'Discovery substrate', body: 'Listings, profiles, and ramp quotes as signed Nostr events. Relays and indexers handle findability.', icon: 'compass', href: '/stack/discovery' },
		{ id: 'sdk', code: 'SDK · ONE SURFACE', title: 'One Stripe-shaped call surface.', body: 'One TypeScript entry. Identity, payments, ramp, DMs, listings behind a single import. The SDK is what your app ships; the primitives are what it talks to.', icon: 'sparkle', href: '/build' }
	];

	const USE_CASES = [
		{ id: 'uc1', code: 'UC1', title: 'Independent artist admin & payments', body: 'Receive sats, get booked, store contracts. No label, no manager, no US bank.', href: '/use-cases/uc1' },
		{ id: 'uc2', code: 'UC2', title: 'Caribbean-to-Caribbean commerce', body: 'A buyer-seller app that works across the region without a 30% cut.', href: '/use-cases/uc2' },
		{ id: 'uc3', code: 'UC3', title: 'Concierge & tourism', body: 'High-touch trip planning where the operator keeps the booking minus a tiny routing fee.', href: '/use-cases/uc3' },
		{ id: 'uc4', code: 'UC4', title: 'Creator monetization without US bank', body: 'Receive Lightning, optionally convert to local fiat via Mostro. No DSP needed.', href: '/use-cases/uc4' },
		{ id: 'uc5', code: 'UC5', title: 'Island-hopping logistics', body: 'Regional transport booking and payment on the same primitives as everything else.', href: '/use-cases/uc5' },
		{ id: 'uc6', code: 'UC6', title: 'Cultural discovery & hub', body: 'A Caribbean-keyed social surface with identity built in. No platform to lose.', href: '/use-cases/uc6' },
		{ id: 'uc7', code: 'UC7', title: 'Venue & performer matchmaking', body: 'Verifiable reputation, signed gig records, atomic settlement between both sides.', href: '/use-cases/uc7' },
		{ id: 'uc8', code: 'UC8', title: 'Sports, carnival, diaspora coordination', body: 'Group bookings, tickets, remittances on the same primitives as everything else.', href: '/use-cases/uc8' }
	];
</script>

<svelte:head>
	<title>Voyager — Caribbean-first toolkit for the region's apps</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<!-- 1. Ribbon -->
<div class="w-full" style="background: var(--carnival-magenta); color: var(--bone-50);">
	<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5 text-[13px] font-medium">
		<span>
			<span class="font-semibold">Voyager</span> — an open toolkit for building Caribbean-first apps. Now in alpha.
		</span>
		<a href="/build" class="inline-flex items-center gap-1 underline underline-offset-2 decoration-[1.5px] font-semibold">
			Start building
			<span aria-hidden="true" class="text-[1.05em] leading-none">›</span>
		</a>
	</div>
</div>

<!-- 2. Hero -->
<section class="mx-auto max-w-6xl px-6 pt-20 pb-20 lg:pt-28 lg:pb-28">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">Open toolkit · Caribbean first</span>
		<h1 class="font-display text-[56px] sm:text-[80px] lg:text-[112px] leading-[0.95] max-w-5xl" style="color: var(--register-text);">
			An open AI toolkit for building Caribbean-first apps.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed" style="color: var(--register-on-dark-soft);">
			Five primitives, one SDK, no platform in the middle. Voyager gives any developer in the region — or in the diaspora — the rails to ship apps that don't route through US/EU payment processors. The SDK ships an in-browser AI agent that runs across all five primitives — never a remote model.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/build">Start building</Cta>
			<Cta variant="secondary" href="/projects">See projects</Cta>
			<Cta variant="secondary" href="/blog">Read the essay</Cta>
		</div>
	</div>
</section>

<!-- 3. Five primitives strip -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="// the stack"
		title="Five primitives, one SDK."
		lede="Each primitive solves one job. The SDK wires them together for builders."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each PRIMITIVES as p (p.id)}
			<PrimitiveCard id={p.id} code={p.code} title={p.title} body={p.body} icon={p.icon} href={p.href} register="carnival-poster" />
		{/each}
	</div>
</section>

<!-- 4. Built on Voyager projects -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="// built on Voyager"
		title="Apps shipped on the toolkit."
		lede="Three showcase apps live today. The rest is what builders ship."
	/>
	<div class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<a
			href="/projects/trip-planner"
			class="group flex flex-col gap-5 rounded-[32px] p-8 transition-colors"
			style="background-color: var(--register-card-teal); color: var(--register-text);"
		>
			<div class="flex items-center justify-between">
				<span class="eyebrow">voyager-concierge</span>
			</div>
			<h3 class="font-display text-[36px] leading-[1.05]" style="color: var(--register-text);">Trip Planner</h3>
			<p class="text-[15px] leading-relaxed" style="color: var(--register-on-dark-soft);">
				Day-by-day itineraries built in the browser from real places, your style, and your budget. Pays through Voyager Pay.
			</p>
			<span class="mt-auto inline-flex items-center gap-1 text-[14px] font-semibold" style="color: var(--carnival-cyan);">
				Open Trip Planner
				<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
			</span>
		</a>
		<a
			href="/projects/voyager-pay"
			class="group flex flex-col gap-5 rounded-[32px] p-8 transition-colors"
			style="background-color: var(--register-card-teal); color: var(--register-text);"
		>
			<div class="flex items-center justify-between">
				<span class="eyebrow">voyager-pay</span>
			</div>
			<h3 class="font-display text-[36px] leading-[1.05]" style="color: var(--register-text);">Voyager Pay</h3>
			<p class="text-[15px] leading-relaxed" style="color: var(--register-on-dark-soft);">
				An open payments protocol. No custody. Settlement on Lightning. A federation of competing Mostro nodes bridges fiat.
			</p>
			<span class="mt-auto inline-flex items-center gap-1 text-[14px] font-semibold" style="color: var(--carnival-cyan);">
				Open Voyager Pay
				<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
			</span>
		</a>
		<a
			href="/projects/ai"
			class="group flex flex-col gap-5 rounded-[32px] p-8 transition-colors"
			style="background-color: var(--register-card-teal); color: var(--register-text);"
		>
			<div class="flex items-center justify-between">
				<span class="eyebrow">voyager-ai</span>
			</div>
			<h3 class="font-display text-[36px] leading-[1.05]" style="color: var(--register-text);">Voyager AI</h3>
			<p class="text-[15px] leading-relaxed" style="color: var(--register-on-dark-soft);">
				The in-browser agent that lives across the five primitives. Parses intent, ranks relays, signs listings. Never a remote model.
			</p>
			<span class="mt-auto inline-flex items-center gap-1 text-[14px] font-semibold" style="color: var(--carnival-cyan);">
				Open Voyager AI
				<span aria-hidden="true" class="text-[1.05em] leading-none transition-transform group-hover:translate-x-0.5">›</span>
			</span>
		</a>
	</div>
</section>

<!-- 5. Voyager Pay — built in (kept verbatim) -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] p-8 sm:p-12" style="background-color: var(--register-card);">
		<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
			<div class="flex flex-col gap-5">
				<span class="eyebrow">Voyager Pay — built in</span>
				<h2 class="font-display text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.05]" style="color: var(--register-text);">
					Pay the way you actually pay.
				</h2>
				<p class="max-w-md text-base leading-relaxed" style="color: var(--register-on-dark-soft);">
					Pick a currency. See the best rate. Tap a vendor, hit Pay. No app to install.
				</p>
				<div class="mt-2">
					<Cta variant="primary" href="/projects/voyager-pay">Open Voyager Pay</Cta>
				</div>
			</div>
			<PayCheckoutCard />
		</div>
	</div>
</section>

<!-- 6. Use cases strip -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="// use cases"
		title="Eight jobs the toolkit makes easy."
		lede="These are the jobs Caribbean builders named on the Sep 2 2026 advisory call."
	/>
	<div class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each USE_CASES as uc (uc.id)}
			<UseCaseCard id={uc.id} code={uc.code} title={uc.title} body={uc.body} href={uc.href} register="carnival-poster" />
		{/each}
	</div>
	<div class="mt-10">
		<Cta variant="secondary" href="/use-cases">See all use cases</Cta>
	</div>
</section>

<!-- 7. Network stats band on night-900 -->
<section style="background-color: var(--carnival-ground);">
	<div class="mx-auto max-w-6xl px-6 py-20">
		<div class="flex flex-col gap-10">
			<span class="text-[11px] font-semibold tracking-[0.14em] uppercase" style="color: var(--carnival-cyan);">// the network</span>
			<h2 class="font-display text-[40px] sm:text-[56px] lg:text-[72px] max-w-3xl leading-[1.02]" style="color: var(--bone-50);">
				The network gets stronger as more builders ship.
			</h2>
			<Divider tone="bone" />
			<div class="grid grid-cols-2 gap-10 sm:grid-cols-4">
				<StatBlock value="5" label="primitives" />
				<StatBlock value="7" label="caribbean rails" />
				<StatBlock value="0.3%" label="reference node fee" />
				<StatBlock value="8" label="named use cases" />
			</div>
			<div class="mt-4">
				<Cta variant="primary" href="/network">See the network</Cta>
			</div>
		</div>
	</div>
</section>

<!-- 8. SDK band — terminal mock -->
<section class="mx-auto max-w-6xl px-6 py-24">
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
		<div class="flex flex-col gap-5">
			<span class="eyebrow">// the SDK</span>
			<h2 class="font-display text-[40px] sm:text-[52px] lg:text-[64px] max-w-xl leading-[1.02]" style="color: var(--register-text);">
				Stripe-shaped surface, Nostr underneath. AI inside the SDK.
			</h2>
			<p class="max-w-md text-lg leading-relaxed" style="color: var(--register-on-dark-soft);">
				A handful of well-named calls — and an in-browser AI agent. The SDK hides the keys, the wire format, the relay fan-out, and the model.
			</p>
			<div class="mt-2">
				<Cta variant="primary" href="/build">Read the SDK docs</Cta>
			</div>
		</div>
		<figure class="rounded-[24px] overflow-hidden" style="background-color: var(--register-card); border: 1px solid var(--register-hair);">
			<div class="flex items-center gap-2 px-5 py-3" style="background-color: rgba(241, 239, 233, 0.04);">
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--carnival-magenta);"></span>
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--carnival-gold);"></span>
				<span class="h-2.5 w-2.5 rounded-full" style="background: var(--carnival-cyan);"></span>
				<span class="ml-2 font-mono text-[12px]" style="color: var(--register-on-dark-soft);">your-app.ts</span>
			</div>
			<pre class="m-0 px-6 py-5 font-mono text-[13px] leading-[1.6] overflow-x-auto" style="color: var(--register-text); background-color: var(--carnival-ground);"><span style="color: var(--register-muted);">// identity, payments, listings, DMs</span>
<span style="color: var(--carnival-cyan);">const</span> me = <span style="color: var(--carnival-cyan);">await</span> voyager.identity.create();
<span style="color: var(--carnival-cyan);">const</span> invoice = <span style="color: var(--carnival-cyan);">await</span> voyager.pay.invoice(bolt11);
<span style="color: var(--carnival-cyan);">const</span> quotes  = <span style="color: var(--carnival-cyan);">await</span> voyager.pay.quote(<span style="color: var(--carnival-gold);">"JMD"</span>, <span style="color: var(--carnival-gold);">5000</span>);
<span style="color: var(--carnival-cyan);">await</span> voyager.listing.create(&#123; kind: <span style="color: var(--carnival-gold);">30402</span>, title, region &#125;);
<span style="color: var(--carnival-cyan);">await</span> voyager.dm.send(toNpub, &#123; orderId, terms &#125;);</pre>
		</figure>
	</div>
</section>

<!-- 9. Docs band + final CTA -->
<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="rounded-[32px] p-8 sm:p-12" style="background-color: var(--register-card);">
		<SectionHeader
			eyebrow="Documentation"
			title="Want the spec behind Voyager?"
			lede="Short lessons on how the primitives work, what a rubric is, and how Voyager Pay's design holds up."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/docs">Read the docs</Cta>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] p-10 sm:p-16 text-center" style="background-color: var(--register-card-teal);">
		<h2 class="font-display text-[40px] sm:text-[56px] lg:text-[72px] max-w-3xl mx-auto leading-[1.02]" style="color: var(--register-text);">
			Build on rails the region actually owns.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg" style="color: var(--register-on-dark-soft);">
			Five primitives. One SDK. No platform in the middle. Ship the first app that doesn't need a US bank.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
<Cta variant="primary" href="/build">Start building</Cta>
		<Cta variant="secondary" href="/principles">Read the principles</Cta>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<CarnivalRibbon
register="carnival-poster"
		eyebrow="Forward — a Caribbean cadence"
		items={[
			{ label: 'Five primitives' },
			{ label: 'One SDK' },
			{ label: 'Caribbean rails first' },
			{ label: 'No platform in the middle' },
			{ label: 'Builders ship the apps' },
			{ label: 'Open rails, no custody' }
		]}
	/>
</section>
</RegisterSection>
