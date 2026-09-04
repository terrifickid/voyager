<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>Documentation — Voyager</title>
</svelte:head>

<section class="pt-4 pb-12">
	<p class="eyebrow">Overview</p>
	<h1 class="mt-3 font-display" id="overview" style="color: var(--register-text);">
		The Voyager spec.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed" style="color: var(--register-on-dark-soft);">
		Voyager is a Nostr-native toolkit. These pages describe the SDK surface, the primitives it speaks, and the protocol that runs on top. Pick the path that fits you, or read top to bottom.
	</p>
	<div class="mt-8">
		<Cta variant="primary" href="/docs/sdk-surface">Start with the SDK surface</Cta>
	</div>
</section>

<section class="pb-12">
	<h2 class="font-display text-2xl mt-10 mb-4" style="color: var(--register-text);">SDK</h2>
	<p class="text-[15px] mb-4" style="color: var(--register-on-dark-soft);">The verbs, the events, the NIPs.</p>
	<div class="flex flex-col gap-3">
		<a href="/docs/sdk-surface" class="block rounded-[24px] bg-[var(--register-card)] p-6 transition-colors">
			<span class="eyebrow">SDK</span>
			<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">SDK surface</h3>
			<p class="mt-2 text-[var(--register-muted)]">Fourteen verbs, grouped by area. Identity, signing, listings, stalls, DMs, ramp, relay transport.</p>
		</a>
		<a href="/docs/nostr-primitives" class="block rounded-[24px] bg-[var(--register-card)] p-6 transition-colors">
			<span class="eyebrow">SDK</span>
			<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">Nostr primitives</h3>
			<p class="mt-2 text-[var(--register-muted)]">Events, kinds, and the NIPs the SDK speaks. NIP-01, NIP-17, NIP-19, NIP-33, NIP-44.</p>
		</a>
	</div>
</section>

<section class="pb-12">
	<h2 class="font-display text-2xl mt-10 mb-4" style="color: var(--register-text);">Protocol</h2>
	<p class="text-[15px] mb-4" style="color: var(--register-on-dark-soft);">How Voyager Pay works, how prices form, and how new vendor kinds ship.</p>
	<div class="flex flex-col gap-3">
		<a href="/docs/how-voyager-pay-works" class="block rounded-[24px] bg-[var(--register-card)] p-6 transition-colors">
			<span class="eyebrow">Protocol</span>
			<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How Voyager Pay works</h3>
			<p class="mt-2 text-[var(--register-muted)]">Custody-free, identity-free Lightning rail over signed Nostr events.</p>
		</a>
		<a href="/docs/how-price-discovery-works" class="block rounded-[24px] bg-[var(--register-card)] p-6 transition-colors">
			<span class="eyebrow">Protocol</span>
			<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How price discovery works</h3>
			<p class="mt-2 text-[var(--register-muted)]">A federation of Mostro nodes ranked client-side on rate, fee, and reputation.</p>
		</a>
		<a href="/docs/how-voyager-pay-extends" class="block rounded-[24px] bg-[var(--register-card)] p-6 transition-colors">
			<span class="eyebrow">Protocol</span>
			<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">How Voyager Pay extends</h3>
			<p class="mt-2 text-[var(--register-muted)]">A substrate and a tag prefix. Any vendor kind can ship without amending the protocol.</p>
		</a>
	</div>
</section>

<section class="pb-12">
	<h2 class="font-display text-2xl mt-10 mb-4" style="color: var(--register-text);">Security</h2>
	<p class="text-[15px] mb-4" style="color: var(--register-on-dark-soft);">Keys, no custody, no telemetry. The boundary the SDK respects.</p>
	<a href="/docs/security-model" class="block rounded-[24px] bg-[var(--register-card)] p-6 transition-colors">
		<span class="eyebrow">Security</span>
		<h3 class="mt-2 font-display text-2xl text-[var(--register-text)]">Security model</h3>
		<p class="mt-2 text-[var(--register-muted)]">User brings the key. SDK parses, validates, and signs. It does not generate, store, or export.</p>
	</a>
</section>

<section class="pb-16">
	<div class="rounded-[24px] bg-[var(--register-card)] p-6">
		<p class="text-[15px]" style="color: var(--register-on-dark-soft);">
			Looking to ship on the SDK? The <a href="/build" class="underline underline-offset-4 decoration-[1.5px]" style="color: var(--heritage-amber);">build page</a> has the install, quick start, and verb reference in one place.
		</p>
	</div>
</section>
