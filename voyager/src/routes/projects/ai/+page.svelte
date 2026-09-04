<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import NostrAiAgent from '$lib/components/NostrAiAgent.svelte';
	import PayAiAssistCard from '$lib/components/PayAiAssistCard.svelte';

	const ROWS = [
		{
			primitive: 'Identity',
			augmentation: 'nprofile · NIP-05 · zaps reputation graph',
			dataBoundary: 'pubkey-derived subkeys never cross device'
		},
		{
			primitive: 'Payments',
			augmentation: 'intent parser · Mostro ranking · anomaly guard',
			dataBoundary: 'prompt + history kept in browser local storage'
		},
		{
			primitive: 'Ramp',
			augmentation: 'fee/reputation/speed card-sort across federation',
			dataBoundary: 'no order size or counterparty sent to a server'
		},
		{
			primitive: 'Messaging',
			augmentation: 'gift-wrapped summary · reply templates · tone-shift',
			dataBoundary: 'plaintext only on-device; protocol-level encryption on relay'
		},
		{
			primitive: 'Discovery',
			augmentation: 'content + graph + zap local ranking · kind-aware filters',
			dataBoundary: 'only Nostr REQ crosses relays; ranking stays in browser'
		}
	];
</script>

<svelte:head>
	<title>Voyager AI — One agent across the five primitives</title>
</svelte:head>

<RegisterSection register="carnival-poster">

<section class="mx-auto max-w-6xl px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">// voyager-ai · the toolkit's intelligence layer</span>
		<h1 class="font-display text-[44px] sm:text-[56px] lg:text-[64px] text-[var(--register-text)] max-w-4xl leading-[1.02]">
			One agent across the five primitives.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-muted)]">
			Voyager AI is the intelligence layer on top of Identity, Payments, Ramp, Messaging, and Discovery.
			The agent is in your browser. The federation does the heavy lifting. Nothing goes to a server
			that doesn't have to.
		</p>
		<div class="flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="#pay-ai-assist">See the Pay agent</Cta>
			<Cta variant="secondary" href="#nostr-ai-agent">See the Nostr agent</Cta>
		</div>
	</div>
</section>

<section id="nostr-ai-agent" class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// nostr ai · search · write · embed"
		title="The Nostr-side agent in one shell."
		lede="Three tabs. Same component. Each tab is a full feature, not a stub."
	/>
	<div class="mt-10">
		<NostrAiAgent register="carnival-poster" defaultTab="search" />
	</div>
</section>

<section id="pay-ai-assist" class="mx-auto max-w-6xl px-6 pb-20">
	<SectionHeader
		eyebrow="// pay ai assist"
		title="The Pay agent — same surface, in your browser."
		lede="Type a sentence; the agent parses intent, ranks Mostro nodes, and flags anomalies before you sign. Both surfaces live here, on the single Voyager AI showcase."
	/>
	<div class="mt-10">
		<PayAiAssistCard register="carnival-poster" variant="full" />
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<SectionHeader
		eyebrow="// augmentation table"
		title="What the AI does — and where the boundary sits."
		lede="Per ai.md §4: every primitive gets an augmentation, and every augmentation has an explicit data boundary."
	/>
	<div class="mt-10 rounded-[28px] bg-[var(--register-card)] border border-[var(--register-hair)] overflow-hidden">
		<div class="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-[var(--register-hair)]">
			<div class="cell cell--head">Primitive</div>
			<div class="cell cell--head">Augmentation</div>
			<div class="cell cell--head">Data boundary</div>
		</div>
		{#each ROWS as r (r.primitive)}
			<div class="grid grid-cols-[1fr_1.4fr_1.4fr] border-b border-[var(--register-hair)] last:border-b-0">
				<div class="cell cell--key">{r.primitive}</div>
				<div class="cell cell--val">{r.augmentation}</div>
				<div class="cell cell--val">{r.dataBoundary}</div>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-[var(--register-card)] p-10 sm:p-16 text-center border border-[var(--register-hair)]">
		<h2 class="font-display text-[36px] sm:text-[48px] lg:text-[56px] text-[var(--register-text)] max-w-3xl mx-auto leading-[1.05]">
			Voyager AI. The intelligence layer your wallet and your relays share.
		</h2>
		<p class="mt-6 max-w-xl mx-auto text-lg text-[var(--register-muted)]">
			One agent, two surfaces, three showcases. The protocol is the product.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<Cta variant="primary" href="/projects">All showcase apps</Cta>
			<Cta variant="secondary" href="/docs/voyager-ai-architecture">Architecture note</Cta>
		</div>
	</div>
</section>

</RegisterSection>

<style>
	.cell {
		padding: 14px 16px;
		font-size: 14px;
		line-height: 1.5;
		color: var(--register-text);
	}
	.cell--head {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--register-muted);
		background: var(--register-ground);
	}
	.cell--key {
		font-family: var(--font-display);
		font-size: 16px;
		color: var(--register-text);
	}
	.cell--val {
		color: var(--register-muted);
	}
</style>
