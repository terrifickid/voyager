<script>
	/**
	 * @type {{ bars?: string[] }} */
	let { bars = ['var(--night-900)', 'var(--night-800)', 'transparent'] } = $props();

	const HEIGHTS = [64, 88, 112, 96, 80, 104, 72, 92, 116, 84, 68, 100, 76, 108, 88, 60];
	const TONES = bars;
</script>

<div class="footer-bars" aria-hidden="true">
	{#each HEIGHTS as h, i (i)}
		<span class="footer-bars__bar" style="height: {h}px; background: {TONES[i % TONES.length]}"></span>
	{/each}
</div>

<style>
	.footer-bars {
		display: flex;
		align-items: flex-end;
		gap: 6px;
		height: 120px;
		overflow: hidden;
	}
	.footer-bars__bar {
		width: 8px;
		border-radius: 2px 2px 0 0;
		flex: 0 0 auto;
	}
	@media (prefers-reduced-motion: reduce) {
		.footer-bars {
			animation: none;
		}
	}
</style>