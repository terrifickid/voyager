<script>
	/** @type {{ eyebrow?: string, title: string, lede?: string, align?: 'left' | 'center' }} */
	let { eyebrow = '', title, lede = '', align = 'left' } = $props();
</script>

<header class="flex flex-col gap-4 {align === 'center' ? 'items-center text-center' : ''}">
	{#if eyebrow}
		<span class="eyebrow">{eyebrow}</span>
	{/if}
	<h2 class="font-display text-[40px] sm:text-[52px] lg:text-[64px] text-ink max-w-3xl">
		{title}
	</h2>
	{#if lede}
		<p class="text-lg leading-relaxed text-ink-2 max-w-2xl">{lede}</p>
	{/if}
</header>
