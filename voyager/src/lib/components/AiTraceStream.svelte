<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {'parse' | 'query' | 'score' | 'sign' | 'publish' | 'explain'} TraceKind
	 * @typedef {{ ts: number, kind: TraceKind, text: string }} TraceLine
	 */
	/** @type {{ register?: Register, lines: TraceLine[] }} */
	let { register = 'perk', lines } = $props();

	const formattedTime = (ts) => {
		const d = new Date(ts);
		const pad = (n) => String(n).padStart(2, '0');
		return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
	};

	const kindLabel = (k) => {
		switch (k) {
			case 'parse':
				return 'parse';
			case 'query':
				return 'query';
			case 'score':
				return 'score';
			case 'sign':
				return 'sign';
			case 'publish':
				return 'publish';
			case 'explain':
				return 'explain';
		}
	};
</script>

<div class="trace-stream" role="log" aria-live="polite" aria-label="Agent reasoning trace">
	{#each lines as line, i (i)}
		<div class="trace-line trace-line--{line.kind}">
			<span class="trace-ts">{formattedTime(line.ts)}</span>
			<span class="trace-kind">{kindLabel(line.kind)}</span>
			<span class="trace-text">{line.text}</span>
		</div>
	{/each}
	{#if lines.length === 0}
		<div class="trace-line trace-line--muted">
			<span class="trace-text">…awaiting input.</span>
		</div>
	{/if}
</div>

<style>
	.trace-stream {
		display: flex;
		flex-direction: column;
		gap: 6px;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 13px;
		line-height: 1.55;
		border-radius: 18px;
		padding: 14px 16px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		min-height: 120px;
		max-height: 260px;
		overflow-y: auto;
	}
	.trace-line {
		display: flex;
		gap: 10px;
		align-items: baseline;
		color: var(--register-text);
	}
	.trace-ts {
		color: var(--register-muted);
		opacity: 0.7;
		flex-shrink: 0;
	}
	.trace-kind {
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 10px;
		padding: 2px 6px;
		border-radius: 999px;
		flex-shrink: 0;
		color: var(--register-text);
		background: var(--register-card);
	}
	.trace-text {
		flex: 1;
	}
	.trace-line--muted {
		color: var(--register-muted);
		opacity: 0.6;
	}
</style>
