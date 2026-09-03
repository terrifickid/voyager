<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {{ label: string, href?: string, note?: string }} Camp
	 */
	/** @type {{ register?: Register, eyebrow?: string, camps: Camp[] }} */
	let { register = 'perk', eyebrow = 'Mas Camps & Kaiso Tents', camps } = $props();
</script>

<section data-register={register} aria-label={ eyebrow} class="mas-camp">
	<span class="eyebrow mas-camp__eyebrow">{eyebrow}</span>
	<ul class="mas-camp__list">
		{#each camps as c (c.label)}
			<li class="mas-camp__pill">
				{#if c.href}
					<a href={c.href} class="mas-camp__link">
						<span class="mas-camp__name">{c.label}</span>
						{#if c.note}<span class="mas-camp__note">{c.note}</span>{/if}
					</a>
				{:else}
					<span class="mas-camp__plain">
						<span class="mas-camp__name">{c.label}</span>
						{#if c.note}<span class="mas-camp__note">{c.note}</span>{/if}
					</span>
				{/if}
			</li>
		{/each}
	</ul>
</section>

<style>
	.mas-camp {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.mas-camp__eyebrow {
		color: var(--register-eyebrow);
	}
	.mas-camp__list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.mas-camp__pill {
		display: inline-flex;
	}
	.mas-camp__link,
	.mas-camp__plain {
		display: inline-flex;
		flex-direction: column;
		gap: 2px;
		padding: 10px 16px;
		border-radius: 999px;
		border: 1.5px solid var(--register-eyebrow);
		background-color: transparent;
		color: var(--register-text);
		text-decoration: none;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-weight: 600;
		font-size: 15px;
		line-height: 1.1;
		transition: background-color 0.15s ease, color 0.15s ease;
	}
	.mas-camp__link:hover {
		background-color: var(--register-eyebrow);
		color: var(--register-accent-ink);
	}
	.mas-camp__note {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--register-muted);
	}
	.mas-camp__link:hover .mas-camp__note {
		color: var(--register-accent-ink);
		opacity: 0.7;
	}
</style>