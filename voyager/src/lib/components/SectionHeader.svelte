<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster'} Register
	 */
	/** @type {{ register?: Register, eyebrow?: string, title: string, lede?: string, align?: 'left' | 'center' }} */
	let { register = 'perk', eyebrow = '', title, lede = '', align = 'left' } = $props();
</script>

<header
	class="section-header flex flex-col gap-4 {align === 'center' ? 'items-center text-center' : ''}"
>
	{#if eyebrow}
		<span class="eyebrow">{eyebrow}</span>
	{/if}
	<h2 class="font-display text-[40px] sm:text-[52px] lg:text-[64px] section-header__title max-w-3xl">
		{title}
	</h2>
	{#if lede}
		<p class="text-lg leading-relaxed section-header__lede max-w-2xl">{lede}</p>
	{/if}
</header>

<style>
	.section-header__title {
		color: var(--register-text);
	}
	.section-header__lede {
		color: var(--register-on-dark-soft);
	}
	[data-register='perk'] .section-header__lede {
		color: var(--ink-2);
	}
</style>