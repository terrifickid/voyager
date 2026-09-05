<script>
	const DEFAULT_HEIGHTS = [64, 88, 112, 96, 80, 104, 72, 92, 116, 84, 68, 100, 76, 108, 88, 60];

	/**
	 * @type {{
	 *   bars?: string[],
	 *   heights?: number[],
	 *   barWidth?: number,
	 *   containerHeight?: number,
	 *   gap?: number
	 * }}
	 */
	let {
		bars = ['var(--night-900)', 'var(--night-800)', 'transparent'],
		heights = DEFAULT_HEIGHTS,
		barWidth = 8,
		containerHeight = 120,
		gap = 6
	} = $props();

	const TONES = bars;
</script>

<div
	class="footer-bars"
	aria-hidden="true"
	style="--fb-height: {containerHeight}px; --fb-width: {barWidth}px; --fb-gap: {gap}px;"
>
	{#each heights as h, i (i)}
		<span class="footer-bars__bar" style="height: {h}px; background: {TONES[i % TONES.length]}"></span>
	{/each}
</div>

<style>
	.footer-bars {
		display: flex;
		align-items: flex-end;
		gap: var(--fb-gap, 6px);
		height: var(--fb-height, 120px);
		overflow: hidden;
	}
	.footer-bars__bar {
		width: var(--fb-width, 8px);
		border-radius: 2px 2px 0 0;
		flex: 0 0 auto;
	}
	@media (prefers-reduced-motion: reduce) {
		.footer-bars {
			animation: none;
		}
	}
</style>