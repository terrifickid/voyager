<script>
	/**
	 * @typedef {'civic-ocean' | 'editorial' | 'rasta' | 'carnival-poster' | 'heritage-sepia'} Register
	 * @typedef {{ label: string, href?: string }} RibbonItem
	 */
	/** @type {{ register?: Register, items: RibbonItem[] }} */
	let { register = 'carnival-poster', items } = $props();

	const palettes = {
		'civic-ocean': ['var(--lime)', 'var(--night-900)', 'var(--night-800)'],
		editorial: ['var(--ink)', 'var(--bone-300)', 'var(--bone-200)'],
		rasta: ['var(--rasta-red)', 'var(--rasta-gold)', 'var(--rasta-green)'],
		'carnival-poster': ['var(--carnival-cyan)', 'var(--carnival-magenta)', 'var(--carnival-gold)'],
		'heritage-sepia': ['var(--heritage-sepia)', 'var(--heritage-rust)', 'var(--heritage-amber)']
	};
	const cols = $derived(palettes[register] ?? palettes['civic-ocean']);
	const cycle = (i) => cols[i % cols.length];
</script>

<section data-register={register} aria-label="Ribbon" class="carnival-ribbon">
	{#each items as it, i (it.label)}
		<a href={it.href ?? '#'} class="carnival-ribbon__seg" style="background: {cycle(i)};">
			<span class="carnival-ribbon__num">{String(i + 1).padStart(2, '0')}</span>
			<span class="carnival-ribbon__label">{it.label}</span>
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
</style>