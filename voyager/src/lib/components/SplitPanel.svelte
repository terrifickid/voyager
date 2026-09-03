<script>
	import Cta from '$lib/components/Cta.svelte';

	/**
	 * @typedef {'left-dark' | 'right-dark'} Theme
	 * @typedef {{
	 *   eyebrow?: string,
	 *   title?: string,
	 *   body?: string,
	 *   stat?: { value: string, label: string },
	 *   cta?: { label: string, href: string }
	 * }} PanelProps
	 */
	/** @type {{ theme?: Theme, left: PanelProps, right: PanelProps }} */
	let { theme = 'left-dark', left, right } = $props();
	const darkFirst = $derived(theme === 'left-dark');
</script>

<section class="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[28px] overflow-hidden">
	<div
		class="bg-night-900 text-bone-50 p-8 sm:p-12 flex flex-col gap-5 {darkFirst
			? ''
			: 'lg:order-2'}"
	>
		{#if left.eyebrow}
			<span
				class="text-[11px] font-semibold tracking-[0.14em] uppercase text-bone-50/70"
				>{left.eyebrow}</span
			>
		{/if}
		{#if left.stat}
			<div class="flex flex-col gap-2">
				<span
					class="font-display text-[64px] sm:text-[88px] lg:text-[104px] leading-[0.95] text-bone-50"
					>{left.stat.value}</span
				>
				<span
					class="text-[11px] font-semibold tracking-[0.14em] uppercase text-bone-50/70"
					>{left.stat.label}</span
				>
			</div>
		{/if}
		{#if left.title}
			<h2
				class="font-display text-[36px] sm:text-[44px] leading-[1.05] text-bone-50 max-w-md"
			>
				{left.title}
			</h2>
		{/if}
		{#if left.body}
			<p class="text-[15px] leading-relaxed text-bone-50/85 max-w-md">{left.body}</p>
		{/if}
		{#if left.cta}
			<div class="mt-2">
				<a
					href={left.cta.href}
					class="inline-flex items-center gap-1 text-bone-50 underline underline-offset-4 decoration-[1.5px] font-semibold text-[15px]"
				>
					{left.cta.label}
					<span aria-hidden="true" class="text-[1.05em] leading-none">›</span>
				</a>
			</div>
		{/if}
	</div>
	<div
		class="bg-bone-100 text-ink p-8 sm:p-12 flex flex-col gap-5 {darkFirst
			? ''
			: 'lg:order-1'}"
	>
		{#if right.eyebrow}<span class="eyebrow">{right.eyebrow}</span>{/if}
		{#if right.title}
			<h2 class="font-display text-[36px] sm:text-[44px] leading-[1.05] text-ink max-w-md">
				{right.title}
			</h2>
		{/if}
		{#if right.body}
			<p class="text-[15px] leading-relaxed text-ink-2 max-w-md">{right.body}</p>
		{/if}
		{#if right.stat}
			<div class="flex flex-col gap-2">
				<span
					class="font-display text-[64px] sm:text-[88px] lg:text-[104px] leading-[0.95] text-ink"
					>{right.stat.value}</span
				>
				<span class="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted"
					>{right.stat.label}</span
				>
			</div>
		{/if}
		{#if right.cta}
			<div class="mt-2">
				<Cta variant="primary" href={right.cta.href}>{right.cta.label}</Cta>
			</div>
		{/if}
	</div>
</section>
