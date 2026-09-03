<script>
	import Cta from '$lib/components/Cta.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import RegisterSection from '$lib/components/RegisterSection.svelte';
	import primitives from '$lib/data/primitives.json';

	const p = primitives.find((x) => x.slug === 'payments');
</script>

<svelte:head>
	<title>{p.title} — Voyager Stack · Caribbean-first</title>
</svelte:head>

<RegisterSection register="carnival-poster">
<section class="mx-auto max-w-6xl px-6 pt-16 pb-12 lg:pt-24">
	<div class="flex flex-col gap-8">
		<span class="eyebrow">{p.code} · lightning rail</span>
		<h1 class="font-display text-[48px] sm:text-[64px] lg:text-[80px] text-[var(--register-text)] leading-[0.95] max-w-4xl">
			{p.title}.
		</h1>
		<p class="max-w-2xl text-lg leading-relaxed text-[var(--register-muted)]">{p.lede}</p>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-20">
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
		<div class="flex flex-col gap-6">
			<div class="rounded-[28px] bg-[var(--register-card)] p-8">
				<span class="eyebrow">What it is</span>
				<p class="mt-3 text-lg leading-relaxed text-[var(--register-muted)]">{p.what}</p>
			</div>
			<div class="rounded-[28px] bg-[var(--register-card)] p-8">
				<span class="eyebrow">Why it matters here</span>
				<p class="mt-3 text-lg leading-relaxed text-[var(--register-muted)]">{p.why}</p>
			</div>
		</div>
		<aside class="flex flex-col gap-4 rounded-[28px] bg-[var(--register-card)] p-7">
			<Icon name={p.icon} tone="ink" size={28} />
			<span class="eyebrow">Wire format</span>
			<p class="font-mono text-[13px] text-[var(--register-muted)]">{p.kind}</p>
			<span class="eyebrow mt-2">SDK calls</span>
			<ul class="flex flex-col gap-1 font-mono text-[13px] text-[var(--register-muted)]">
				{#each p.sdk as call (call)}
					<li>{call}</li>
				{/each}
			</ul>
		</aside>
	</div>
</section>

<section class="mx-auto max-w-6xl px-6 pb-32">
	<div class="rounded-[32px] bg-[var(--register-card)] p-8 sm:p-12">
		<SectionHeader
			eyebrow="Next"
			title="Bring fiat in."
			lede="Lightning handles sats. P3 turns Caribbean fiats into the same sats without a custodial wallet."
		/>
		<div class="mt-8 flex flex-wrap items-center gap-3">
			<Cta variant="primary" href="/stack/ramp">Read P3 · Ramp</Cta>
			<Cta variant="secondary" href="/projects/voyager-pay">See Voyager Pay</Cta>
		</div>
	</div>
</section>
</RegisterSection>