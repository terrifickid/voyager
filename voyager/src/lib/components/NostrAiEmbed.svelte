<script>
	import marketplace from '$lib/data/aiMarketplace.json';
	import embed from '$lib/data/aiEmbedSnippet.json';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 */
	/** @type {{ register?: Register }} */
	let { register = 'carnival-poster' } = $props();

	let copied = $state(false);
	let showDom = $state(false);

	const cards = marketplace
		.filter((m) => m.kind === 30402 && (m.priceSats > 0 || m.priceFiat.amount > 0))
		.slice(0, 3);

	function copySnippet() {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(embed.snippet).then(
				() => {
					copied = true;
					setTimeout(() => (copied = false), 1800);
				},
				() => {}
			);
		}
	}
</script>

<div class="embed-grid">
	<!-- Left: snippet -->
	<div class="left">
		<div class="card">
			<div class="card-head">
				<span class="card-label">Drop-in snippet</span>
				<button type="button" class="copy-btn" onclick={copySnippet}>
					{copied ? 'Copied ✓' : 'Copy snippet'}
				</button>
			</div>
			<pre class="snippet mono">{embed.snippet}</pre>
			<p class="hint">
				Any site owner pastes this <code>&lt;script&gt;</code> tag. No build step. No cookies.
				The browser fetches matching <strong>kind:30402</strong> events, ranks them locally,
				and injects three cards.
			</p>
		</div>
	</div>

	<!-- Right: mocked host page + injection -->
	<div class="right">
		<div class="host">
			<div class="host-bar">
				<span class="host-url">{embed.hostPage.url}</span>
				<span class="host-status">live · any existing site</span>
			</div>
			<div class="host-body">
				<h3 class="host-title">{embed.hostPage.title}</h3>
				<p class="host-blurb">{embed.hostPage.blurb}</p>
				<button type="button" class="host-cta">{embed.hostPage.cta}</button>
			</div>
		</div>

		<div class="rail">
			<div class="rail-head">
				<span class="rail-label">Related from Caribbean sellers</span>
				<button
					type="button"
					class="toggle-btn"
					aria-pressed={showDom}
					onclick={() => (showDom = !showDom)}
				>
					{showDom ? 'Hide' : 'View rendered HTML'}
				</button>
			</div>

			{#if !showDom}
				<ul class="cards">
					{#each cards as c (c.id)}
						<li class="rail-card">
							<span class="rail-name">{c.name}</span>
							<span class="rail-price">
								{#if c.priceSats > 0}
									{c.priceSats.toLocaleString('en-US')} sats
								{:else}
									{c.priceFiat.amount} {c.priceFiat.currency}
								{/if}
							</span>
							<span class="rail-meta">{c.location} · {(c.zaps / 1000).toFixed(1)}k zaps</span>
						</li>
					{/each}
				</ul>
			{:else}
				<pre class="snippet mono">{embed.injectionDom}</pre>
			{/if}

			<p class="footnote">All inference happens in the visitor's browser. No telemetry leaves the device.</p>
		</div>
	</div>
</div>

<style>
	.embed-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}
	@media (min-width: 1024px) {
		.embed-grid {
			grid-template-columns: 1fr 1.2fr;
		}
	}
	.card,
	.host,
	.rail {
		border-radius: 22px;
		background: var(--register-card);
		border: 1px solid var(--register-hair);
		padding: 18px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.card-head,
	.rail-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.card-label,
	.rail-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--register-muted);
	}
	.copy-btn,
	.toggle-btn {
		padding: 8px 12px;
		border-radius: 10px;
		background: transparent;
		color: var(--register-text);
		border: 1px solid var(--register-text);
		font-weight: 600;
		font-size: 12px;
		cursor: pointer;
	}
	.snippet {
		margin: 0;
		padding: 16px;
		background: var(--register-ground);
		border-radius: 14px;
		color: var(--register-text);
		font-size: 12px;
		line-height: 1.55;
		white-space: pre-wrap;
		max-height: 360px;
		overflow: auto;
	}
	.mono {
		font-family: var(--font-mono, ui-monospace, monospace);
	}
	.hint {
		font-size: 13px;
		line-height: 1.55;
		color: var(--register-muted);
		margin: 0;
	}
	.host-bar {
		display: flex;
		justify-content: space-between;
		padding: 6px 10px;
		border-radius: 8px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		color: var(--register-muted);
	}
	.host-status {
		color: var(--register-text);
	}
	.host-body {
		padding: 4px 4px 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.host-title {
		font-family: var(--font-display);
		font-size: 22px;
		color: var(--register-text);
		margin: 0;
	}
	.host-blurb {
		font-size: 14px;
		line-height: 1.55;
		color: var(--register-muted);
		margin: 0;
	}
	.host-cta {
		align-self: flex-start;
		padding: 10px 16px;
		border-radius: 12px;
		background: var(--register-text);
		color: var(--register-ground);
		font-weight: 600;
		border: 0;
		cursor: pointer;
	}
	.cards {
		display: flex;
		flex-direction: column;
		gap: 8px;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.rail-card {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: auto auto;
		column-gap: 8px;
		padding: 10px 12px;
		border-radius: 12px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
	}
	.rail-name {
		color: var(--register-text);
		font-weight: 600;
		font-size: 14px;
	}
	.rail-price {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 12px;
		color: var(--register-text);
		justify-self: end;
	}
	.rail-meta {
		grid-column: 1 / -1;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		color: var(--register-muted);
	}
	.footnote {
		font-size: 12px;
		color: var(--register-muted);
		font-family: var(--font-mono, ui-monospace, monospace);
		margin: 0;
	}
</style>
