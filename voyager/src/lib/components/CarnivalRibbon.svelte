<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {{ label: string, body?: string, href?: string }} RibbonItem
	 */
	/** @type {{ register?: Register, items: RibbonItem[] }} */
	let { register = 'carnival-poster', items } = $props();

	const palettes = {
		'perk': ['var(--lime)', 'var(--night-900)', 'var(--night-800)'],
		rasta: ['var(--rasta-red)', 'var(--rasta-gold)', 'var(--rasta-green)'],
		'carnival-poster': ['var(--carnival-cyan)', 'var(--carnival-magenta)', 'var(--carnival-gold)'],
		'carnival-poster-white': ['var(--carnival-magenta)', 'var(--carnival-cyan)', 'var(--carnival-gold)'],
		ocean: ['var(--ocean-gold)', 'var(--night-800)', 'var(--teal-bright)'],
		windies: ['var(--windies-maroon)', 'var(--windies-gold)', 'var(--bone-50)'],
		'gold-cream': ['var(--goldcream-gold)', 'var(--ink)', 'var(--goldcream-card)'],
		caribana: ['var(--caribana-magenta)', 'var(--caribana-violet)', 'var(--bone-50)'],
		'heritage-sepia': ['var(--heritage-sepia)', 'var(--heritage-rust)', 'var(--heritage-amber)'],
		editorial: ['var(--ink)', 'var(--ink-2)', 'var(--bone-300)'],
		'civic-ocean': ['var(--civic-ocean-gold)', 'var(--civic-ocean-white)', 'var(--civic-ocean-gold-deep)'],
		'festival-poster': ['var(--festival-cyan)', 'var(--festival-yellow)', 'var(--festival-orange)'],
		'monochrome-caribbean': ['var(--mc-text)', 'var(--mc-ink-soft)', 'var(--mc-ground-soft)'],
		trinidad: ['var(--trinidad-red)', 'var(--trinidad-gold)', 'var(--trinidad-green)'],
		'orange-sun': ['var(--orange-sun)', 'var(--orange-blue)', 'var(--orange-sun-deep)'],
		neo: ['var(--neo-base)', 'var(--neo-blue)', 'var(--neo-base-deep)'],
		tiffany: ['var(--tiffany-blue)', 'var(--tiffany-gold)', 'var(--tiffany-blue-deep)'],
		'maroon-nights': ['var(--mn-gold)', 'var(--mn-cream)', 'var(--mn-gold-warm)']
	};
	const cols = $derived(palettes[register] ?? palettes['perk']);
	const cycle = (i) => cols[i % cols.length];
</script>

<section data-register={register} aria-label="Ribbon" class="carnival-ribbon">
	{#each items as it, i (it.label)}
		<a href={it.href ?? '#'} class="carnival-ribbon__seg" style="background: {cycle(i)};">
			<span class="carnival-ribbon__num">{String(i + 1).padStart(2, '0')}</span>
			<span class="carnival-ribbon__label">{it.label}</span>
			{#if it.body}
				<span class="carnival-ribbon__body">{it.body}</span>
			{/if}
		</a>
	{/each}
</section>

<style>
	.carnival-ribbon {
		display: grid;
		grid-template-columns: repeat(var(--ribbon-cols, 3), 1fr);
		gap: 0;
		border-radius: 28px;
		overflow: hidden;
	}
	.carnival-ribbon__seg {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 140px;
		padding: 20px 22px;
		color: var(--ink);
		text-decoration: none;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		transition: filter 0.15s ease;
	}
	.carnival-ribbon__seg:hover {
		filter: brightness(1.05);
	}
	.carnival-ribbon__num {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.65;
	}
	.carnival-ribbon__label {
		font-size: 18px;
		line-height: 1.1;
	}
	.carnival-ribbon__body {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 12px;
		font-weight: 400;
		line-height: 1.35;
		opacity: 0.85;
		margin-top: 4px;
	}
</style>