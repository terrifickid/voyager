<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {{ name: string, region: string, feePct?: number }} SoundSystem
	 */
	/** @type {{ register?: Register, eyebrow?: string, systems: SoundSystem[] }} */
	let { register = 'perk', eyebrow = 'Sound systems · Mostro nodes', systems } = $props();
</script>

<section data-register={register} aria-label={ eyebrow} class="sound-strip">
	<span class="eyebrow sound-strip__eyebrow">{eyebrow}</span>
	<ul class="sound-strip__list">
		{#each systems as s, i (s.name)}
			<li class="sound-strip__row">
				<span class="sound-strip__num">{String(i + 1).padStart(2, '0')}</span>
				<div class="sound-strip__body">
					<span class="sound-strip__name">{s.name}</span>
					<span class="sound-strip__region">{s.region}{s.feePct !== undefined ? ` · ${s.feePct}% fee` : ''}</span>
				</div>
				<svg class="sound-strip__bars" viewBox="0 0 80 16" aria-hidden="true">
					<rect x="0" y="9" width="6" height="7" />
					<rect x="10" y="5" width="6" height="11" />
					<rect x="20" y="2" width="6" height="14" />
					<rect x="30" y="7" width="6" height="9" />
					<rect x="40" y="4" width="6" height="12" />
					<rect x="50" y="1" width="6" height="15" />
					<rect x="60" y="6" width="6" height="10" />
					<rect x="70" y="3" width="6" height="13" />
				</svg>
			</li>
		{/each}
	</ul>
</section>

<style>
	.sound-strip {
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 24px;
		border-radius: 28px;
		background-color: var(--register-card);
		color: var(--register-text);
	}
	.sound-strip__eyebrow {
		color: var(--register-eyebrow);
	}
	.sound-strip__list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.sound-strip__row {
		display: grid;
		grid-template-columns: 40px 1fr auto;
		gap: 14px;
		align-items: center;
		padding: 12px 0;
		border-top: 1px solid var(--register-on-dark-soft);
	}
	.sound-strip__row:first-child {
		border-top: 0;
	}
	.sound-strip__num {
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		font-size: 14px;
		color: var(--register-eyebrow);
	}
	.sound-strip__body {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}
	.sound-strip__name {
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		font-size: 17px;
		line-height: 1.1;
	}
	.sound-strip__region {
		font-size: 12px;
		color: var(--register-muted);
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
	}
	.sound-strip__bars {
		width: 80px;
		height: 16px;
		fill: var(--register-eyebrow);
		opacity: 0.85;
	}
</style>