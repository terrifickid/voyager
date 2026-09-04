<script>
	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {'connecting' | 'live' | 'slow' | 'timeout'} RelayStatus
	 */
	/** @type {{ register?: Register, name: string, region?: string, status: RelayStatus, avgLatencyMs?: number, active?: boolean }} */
	let {
		register = 'perk',
		name,
		region = '',
		status,
		avgLatencyMs,
		active = false
	} = $props();

	const toneByStatus = {
		connecting: 'connecting',
		live: 'live',
		slow: 'slow',
		timeout: 'timeout'
	};

	const labelByStatus = {
		connecting: 'connecting…',
		live: 'live',
		slow: 'slow',
		timeout: 'timeout'
	};
</script>

<span class="relay-chip relay-chip--{toneByStatus[status]} {active ? 'relay-chip--active' : ''}">
	<span class="relay-dot" aria-hidden="true"></span>
	<span class="relay-name">{name}</span>
	{#if region}
		<span class="relay-region">· {region}</span>
	{/if}
	<span class="relay-status">{labelByStatus[status]}</span>
	{#if avgLatencyMs !== undefined && status === 'live'}
		<span class="relay-lat">· {avgLatencyMs}ms</span>
	{/if}
</span>

<style>
	.relay-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 10px 5px 8px;
		border-radius: 999px;
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		line-height: 1;
		background: var(--register-card);
		color: var(--register-text);
		border: 1px solid var(--register-hair);
	}
	.relay-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--register-muted);
	}
	.relay-chip--live .relay-dot {
		background: color-mix(in srgb, var(--register-accent) 85%, white);
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--register-accent) 60%, transparent);
		animation: relay-pulse 2.4s ease-in-out infinite;
	}
	.relay-chip--connecting .relay-dot {
		background: var(--register-muted);
		animation: relay-blink 1.2s ease-in-out infinite;
	}
	.relay-chip--slow .relay-dot {
		background: #dab95b;
	}
	.relay-chip--timeout .relay-dot {
		background: #c0563a;
	}
	.relay-chip--active {
		outline: 1.5px solid var(--register-accent);
		outline-offset: 1px;
	}
	.relay-region,
	.relay-lat,
	.relay-status {
		color: var(--register-muted);
	}
	@keyframes relay-pulse {
		50% {
			box-shadow: 0 0 0 6px transparent;
		}
	}
	@keyframes relay-blink {
		50% {
			opacity: 0.4;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.relay-chip--live .relay-dot,
		.relay-chip--connecting .relay-dot {
			animation: none;
		}
	}
</style>
