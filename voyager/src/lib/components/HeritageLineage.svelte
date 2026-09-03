<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {{ label: string, note?: string }} Stage
	 */
	/** @type {{ register?: Register, eyebrow?: string, stages: Stage[], caption?: string }} */
	let { register = 'heritage-sepia', eyebrow = 'Lineage', stages, caption = '' } = $props();
</script>

<section data-register={register} aria-label={ eyebrow} class="heritage">
	<span class="eyebrow heritage__eyebrow">{eyebrow}</span>
	<ol class="heritage__track" role="list">
		{#each stages as s, i (s.label)}
			<li class="heritage__step">
				<span class="heritage__dot" aria-hidden="true"></span>
				<span class="heritage__label">{s.label}</span>
				{#if s.note}<span class="heritage__note">{s.note}</span>{/if}
				{#if i < stages.length - 1}
					<span class="heritage__arrow" aria-hidden="true">→</span>
				{/if}
			</li>
		{/each}
	</ol>
	{#if caption}
		<p class="heritage__caption">{caption}</p>
	{/if}
</section>

<style>
	.heritage {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 28px;
		border-radius: 28px;
		background-color: var(--register-card);
		color: var(--register-text);
	}
	.heritage__eyebrow {
		color: var(--register-eyebrow);
	}
	.heritage__track {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 0;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.heritage__step {
		display: inline-flex;
		flex-direction: column;
		gap: 4px;
		padding: 4px 20px 4px 24px;
		position: relative;
		min-width: 140px;
	}
	.heritage__dot {
		display: block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--register-eyebrow);
		box-shadow: 0 0 0 4px var(--register-card);
	}
	.heritage__label {
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		font-size: 18px;
		line-height: 1.1;
	}
	.heritage__note {
		font-size: 12px;
		color: var(--register-muted);
	}
	.heritage__arrow {
		position: absolute;
		right: 0;
		top: 6px;
		color: var(--register-eyebrow);
		font-size: 18px;
		line-height: 1;
	}
	.heritage__caption {
		font-size: 14px;
		color: var(--register-muted);
		margin: 0;
	}
</style>