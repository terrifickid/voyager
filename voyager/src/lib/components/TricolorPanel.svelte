<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster'} Register
	 * @typedef {{ label: string, body: string, href?: string }} TricolorItem
	 */
	/** @type {{ register?: Register, items: TricolorItem[] }} */
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
		'heritage-sepia': ['var(--heritage-sepia)', 'var(--heritage-rust)', 'var(--heritage-amber)']
	};
	const cols = $derived(palettes[register] ?? palettes['perk']);
	const cycle = (i) => cols[i % cols.length];
</script>

<section data-register={register} aria-label="Tricolor" class="tricolor-panel">
	{#each items as it, i (it.label)}
		<a href={it.href ?? '#'} class="tricolor-panel__band" style="background: {cycle(i)};">
			<span class="tricolor-panel__num">{String(i + 1).padStart(2, '0')}</span>
			<h3 class="tricolor-panel__label">{it.label}</h3>
			<p class="tricolor-panel__body">{it.body}</p>
		</a>
	{/each}
</section>

<style>
	.tricolor-panel {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0;
		border-radius: 28px;
		overflow: hidden;
	}
	.tricolor-panel__band {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 12px;
		min-height: 220px;
		padding: 28px 28px 32px;
		color: var(--ink);
		text-decoration: none;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		transition: filter 0.15s ease;
	}
	.tricolor-panel__band:hover {
		filter: brightness(1.05);
	}
	.tricolor-panel__num {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.65;
	}
	.tricolor-panel__label {
		font-size: 28px;
		line-height: 1.05;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.tricolor-panel__body {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.45;
		opacity: 0.85;
	}
	@media (max-width: 768px) {
		.tricolor-panel {
			grid-template-columns: 1fr;
		}
	}
</style>