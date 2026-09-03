<script>
	/**
	 * @typedef {'civic-ocean' | 'editorial' | 'rasta' | 'carnival-poster' | 'heritage-sepia'} Register
	 * @typedef {{ year: string, name: string, note?: string }} Winner
	 */
	/** @type {{ register?: Register, eyebrow?: string, winners: Winner[] }} */
	let { register = 'carnival-poster', eyebrow = 'Road March Wins', winners } = $props();
</script>

<section data-register={register} aria-label={ eyebrow} class="road-march">
	<header class="road-march__head">
		<span class="eyebrow">{eyebrow}</span>
		<h3 class="road-march__title">Road march — the wins, the lineage.</h3>
	</header>
	<ol class="road-march__list">
		{#each winners as w, i (w.year)}
			<li class="road-march__row">
				<span class="road-march__year">{w.year}</span>
				<div class="road-march__body">
					<span class="road-march__name">{w.name}</span>
					{#if w.note}<span class="road-march__note">{w.note}</span>{/if}
				</div>
				<span class="road-march__rank">#{winners.length - i}</span>
			</li>
		{/each}
	</ol>
</section>

<style>
	.road-march {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 28px;
		border-radius: 28px;
		background-color: var(--register-card);
		color: var(--register-text);
	}
	.road-march__head {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.road-march__title {
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		font-size: 22px;
		line-height: 1.15;
	}
	.road-march__list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.road-march__row {
		display: grid;
		grid-template-columns: 64px 1fr auto;
		gap: 16px;
		align-items: baseline;
		padding: 14px 0;
		border-top: 1px solid var(--register-hair, var(--register-on-dark-soft));
	}
	.road-march__row:first-child {
		border-top: 0;
	}
	.road-march__year {
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		font-size: 18px;
	}
	.road-march__body {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.road-march__name {
		font-size: 16px;
		font-weight: 600;
		color: var(--register-text);
	}
	.road-march__note {
		font-size: 13px;
		color: var(--register-muted);
	}
	.road-march__rank {
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		font-size: 14px;
		color: var(--register-secondary, var(--register-eyebrow));
	}
</style>