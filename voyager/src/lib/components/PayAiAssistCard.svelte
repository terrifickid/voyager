<script>
	import AiTraceStream from './AiTraceStream.svelte';
	import intents from '$lib/data/aiIntents.json';
	import nodes from '$lib/data/mostroNodes.json';
	import { onDestroy } from 'svelte';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {{ ts: number, kind: 'parse' | 'query' | 'score' | 'sign' | 'publish' | 'explain', text: string }} TraceLine
	 */
	/** @type {{ register?: Register, variant?: 'full' | 'compact' }} */
	let { register = 'carnival-poster', variant = 'full' } = $props();

	let typed = $state('');
	/** @type {any} */
	let parsedIntent = $state(null);
	/** @type {TraceLine[]} */
	let parseLines = $state([]);
	/** @type {TraceLine[]} */
	let rankingLines = $state([]);
	let rankingRevealed = $state(false);
	let anomalyOn = $state(false);
	let signedAnomaly = $state(false);
	let heldAnomaly = $state(false);

	/** @type {ReturnType<typeof setTimeout>[]} */
	let timeouts = [];

	function queue(fn, ms) {
		const id = setTimeout(() => {
			timeouts = timeouts.filter((x) => x !== id);
			fn();
		}, ms);
		timeouts.push(id);
	}

	onDestroy(() => {
		for (const id of timeouts) clearTimeout(id);
		timeouts = [];
	});

	function reset() {
		parsedIntent = null;
		parseLines = [];
		rankingRevealed = false;
		rankingLines = [];
		signedAnomaly = false;
		heldAnomaly = false;
	}

	/**
	 * @param {any} i
	 */
	function useIntent(i) {
		typed = i.text;
		parseIntent(i);
	}

	/**
	 * @param {any} i
	 */
	function parseIntent(i) {
		reset();
		const start = Date.now();
		parseLines = [{ ts: start, kind: 'parse', text: `> receive · "${i.text}"` }];
		queue(() => {
			parseLines = [
				...parseLines,
				{
					ts: Date.now(),
					kind: 'parse',
					text: `> extract · payee="${i.payee}", amount=${i.amount}, currency=${i.currency}, memo="${i.memo}"`
				}
			];
		}, 250);
		queue(() => {
			const decideText = i.rampRequired
				? '> decide · fiat rail required — will call Mostro ranking'
				: '> decide · sats-only — no ramp needed';
			parseLines = [...parseLines, { ts: Date.now(), kind: 'parse', text: decideText }];
			parsedIntent = i;
		}, 500);
	}

	function rankNodes() {
		rankingLines = [];
		rankingRevealed = false;
		const start = Date.now();
		const amount = parsedIntent?.amount ?? 0;
		const currency = parsedIntent?.currency ?? '';
		rankingLines = [
			{ ts: start, kind: 'query', text: `> query · ${rankedTop.length} Mostro nodes, ${currency} ${amount}` }
		];
		queue(() => {
			rankingLines = [
				...rankingLines,
				{
					ts: Date.now(),
					kind: 'score',
					text: '> score · rate×0.4 + speed×0.2 + reliability×0.4 (rubric §7.4)'
				}
			];
		}, 300);
		queue(() => {
			const top = rankedTop[0];
			rankingLines = [
				...rankingLines,
				{
					ts: Date.now(),
					kind: 'score',
					text: `> pick · ${top.node.name} (${top.node.feePct}%, ${top.speed} min avg, ${top.reliability}% uptime)`
				}
			];
			rankingRevealed = true;
		}, 600);
	}

	function toggleAnomaly() {
		anomalyOn = !anomalyOn;
	}

	function signAnyway() {
		signedAnomaly = true;
	}

	function holdAnomaly() {
		heldAnomaly = true;
	}

	const rankNodesReady = $derived(!!parsedIntent);

	const parsedSummary = $derived(
		parsedIntent
			? {
					Payee: parsedIntent.payee,
					'Amount/Currency':
						parsedIntent.currency === 'SAT'
							? `${parsedIntent.amount.toLocaleString('en-US')} sats`
							: `${parsedIntent.amount.toLocaleString('en-US')} ${parsedIntent.currency}`,
					'Memo/Flag': `${parsedIntent.memo}${parsedIntent.rampRequired ? ' · ramp' : ' · sats-only'}${parsedIntent.anomaly ? ' · anomaly' : ''}`
				}
			: null
	);

	const rankedTop = $derived.by(() => {
		return [...nodes]
			.slice(0, 4)
			.map((n) => {
				const speed = Math.round(60 + (100 - n.reputation) * 9 + (n.feePct - 0.2) * 120);
				return { node: n, speed, reliability: n.reputation };
			})
			.sort((a, b) => b.reliability - a.reliability);
	});

	const tradeoff = $derived.by(() => {
		if (!parsedIntent || rankedTop.length < 2) return '';
		const a = rankedTop[0];
		const b = rankedTop[1];
		const savings = Math.round((parsedIntent?.amount ?? 0) * 0.05);
		return `${a.node.name}: ${a.node.feePct}%, ${a.speed} min avg, ${a.reliability}% uptime — fastest this hour. ${b.node.name}: ${b.node.feePct}%, ${a.speed + 6} min avg — saves ~${savings} sats on a mid-sized trade.`;
	});
</script>

<article class="pay-card flex flex-col gap-6">
	<div class="flex flex-col gap-3">
		<div class="flex flex-wrap items-center gap-2">
			<span class="input-label">Try an intent</span>
			{#each intents as i (i.id)}
				<button
					type="button"
					class="intent-chip"
					onclick={() => useIntent(i)}
					aria-pressed={parsedIntent?.id === i.id}
				>
					{i.label}
				</button>
			{/each}
		</div>
		<form
			class="input-row"
			onsubmit={(e) => {
				e.preventDefault();
				const match = intents.find((i) => i.text === typed.trim());
				if (match) parseIntent(match);
			}}
		>
			<input
				type="text"
				class="intent-input"
				placeholder='e.g. "Send Alice $50 for lunch, memo split"'
				bind:value={typed}
			/>
			<button type="submit" class="send-btn" disabled={!typed.trim()}>Send</button>
		</form>
	</div>

	{#if variant === 'full'}
		<div class="flex items-center gap-3">
			<button type="button" class="toggle" aria-pressed={anomalyOn} onclick={toggleAnomaly}>
				<span class="toggle-track" class:on={anomalyOn}>
					<span class="toggle-thumb"></span>
				</span>
				<span class="toggle-label">Anomaly guard</span>
			</button>
			<span class="toggle-help">scripted on/off · flag mismatches against your fixture history</span>
		</div>

		{#if anomalyOn && parsedIntent?.anomaly}
			<div class="anomaly-strip" role="status">
				<strong>Anomaly guard:</strong>
				{parsedIntent.anomalyReason ?? 'Pattern does not match your history.'}
				AI suggests a 5-second pause before signing.
				{#if !signedAnomaly && !heldAnomaly}
					<div class="anomaly-actions">
						<button type="button" class="ghost-btn" onclick={signAnyway}>Sign anyway</button>
						<button type="button" class="hold-btn" onclick={holdAnomaly}>Hold</button>
					</div>
				{:else if signedAnomaly}
					<span class="signed-chip">Signed ✓</span>
				{:else}
					<span class="hold-chip">Held for review</span>
				{/if}
			</div>
		{/if}
	{/if}

	{#if parseLines.length > 0}
		<div class="reveal">
			<AiTraceStream {register} lines={parseLines} />
		</div>
	{/if}

	{#if parsedSummary}
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
			{#each Object.entries(parsedSummary) as [label, val] (label)}
				<div class="kv">
					<span class="kv-label">{label}</span>
					<span class="kv-val">{val}</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if variant === 'full'}
		<div class="ramp-block">
			<div class="flex items-center justify-between gap-3">
				<div class="flex flex-col">
					<span class="eyebrow">Mostro ranking</span>
					<span class="ramp-title">Score nodes against your intent.</span>
				</div>
				<button
					type="button"
					class="rank-btn"
					onclick={rankNodes}
					disabled={!rankNodesReady}
				>
					Score Mostro nodes
				</button>
			</div>

			{#if rankingLines.length > 0}
				<div class="reveal">
					<AiTraceStream {register} lines={rankingLines} />
				</div>
			{/if}

			{#if rankingRevealed}
				<ul class="rank-list">
					{#each rankedTop as r, idx (r.node.name)}
						{@const selected = idx === 0}
						<li class="rank-row" class:rank-row--selected={selected}>
							<span class="rank-idx">{idx + 1}</span>
							<div class="rank-name">
								<span class="rank-display">{r.node.name}</span>
								<span class="rank-region">{r.node.region}</span>
							</div>
							<div class="rank-bars">
								<span class="bar">
									<span class="bar-label">rate</span>
									<span class="bar-track"><span class="bar-fill" style="width: {Math.min(100, 100 - (r.node.feePct - 0.2) * 100)}%"></span></span>
								</span>
								<span class="bar">
									<span class="bar-label">speed</span>
									<span class="bar-track"><span class="bar-fill" style="width: {Math.max(20, 100 - r.speed)}%"></span></span>
								</span>
								<span class="bar">
									<span class="bar-label">rel.</span>
									<span class="bar-track"><span class="bar-fill" style="width: {r.reliability}%"></span></span>
								</span>
							</div>
							<span class="rank-fee">{r.node.feePct}%</span>
						</li>
					{/each}
				</ul>
				<p class="tradeoff">{tradeoff}</p>
			{/if}
		</div>
	{/if}
</article>

<style>
	.pay-card {
		border-radius: 28px;
		background: var(--register-card);
		padding: 28px;
		border: 1px solid var(--register-hair);
	}
	.input-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--register-muted);
	}
	.intent-chip {
		font-size: 12px;
		padding: 6px 10px;
		border-radius: 999px;
		background: var(--register-card);
		color: var(--register-text);
		border: 1px solid var(--register-hair);
		cursor: pointer;
		transition: background-color 0.15s;
	}
	.intent-chip:hover {
		background: var(--register-hair);
	}
	.intent-chip[aria-pressed='true'] {
		background: var(--register-accent);
		color: var(--register-accent-ink);
		border-color: transparent;
	}
	.input-row {
		display: flex;
		gap: 8px;
	}
	.intent-input {
		flex: 1;
		padding: 12px 14px;
		border-radius: 14px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		color: var(--register-text);
		font-size: 15px;
	}
	.intent-input:focus {
		outline: 2px solid var(--register-accent);
		outline-offset: 1px;
	}
	.send-btn {
		padding: 12px 18px;
		border-radius: 14px;
		background: var(--register-accent);
		color: var(--register-accent-ink);
		font-weight: 600;
		border: 0;
		cursor: pointer;
	}
	.send-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.reveal {
		animation: fadeIn 0.4s ease-out;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	.kv {
		border-radius: 14px;
		padding: 12px 14px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.kv-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--register-muted);
	}
	.kv-val {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 14px;
		color: var(--register-text);
	}
	.ramp-block {
		border-radius: 22px;
		padding: 18px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.ramp-title {
		font-family: var(--font-display);
		font-size: 18px;
		color: var(--register-text);
	}
	.rank-btn {
		padding: 10px 16px;
		border-radius: 12px;
		background: var(--register-text);
		color: var(--register-ground);
		font-weight: 600;
		border: 0;
		cursor: pointer;
	}
	.rank-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.rank-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.rank-row {
		display: grid;
		grid-template-columns: 24px 1fr 1.4fr 48px;
		gap: 12px;
		align-items: center;
		padding: 10px 12px;
		border-radius: 14px;
		background: var(--register-card);
		border: 1px solid var(--register-hair);
	}
	.rank-row--selected {
		border-color: var(--register-accent);
		box-shadow: 0 0 0 1.5px var(--register-accent);
	}
	.rank-idx {
		font-family: var(--font-mono, ui-monospace, monospace);
		color: var(--register-muted);
		font-size: 13px;
	}
	.rank-name {
		display: flex;
		flex-direction: column;
	}
	.rank-display {
		color: var(--register-text);
		font-weight: 600;
		font-size: 14px;
	}
	.rank-region {
		font-size: 11px;
		color: var(--register-muted);
		font-family: var(--font-mono, ui-monospace, monospace);
	}
	.rank-bars {
		display: flex;
		gap: 6px;
	}
	.bar {
		display: flex;
		flex-direction: column;
		gap: 3px;
		flex: 1;
	}
	.bar-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 9px;
		text-transform: uppercase;
		color: var(--register-muted);
	}
	.bar-track {
		height: 5px;
		border-radius: 999px;
		background: var(--register-hair);
		overflow: hidden;
	}
	.bar-fill {
		display: block;
		height: 100%;
		background: var(--register-accent);
	}
	.rank-fee {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 12px;
		color: var(--register-text);
		text-align: right;
	}
	.tradeoff {
		font-size: 13px;
		line-height: 1.55;
		color: var(--register-muted);
		margin: 0;
	}
	.toggle {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		border: 0;
		cursor: pointer;
		padding: 0;
		color: var(--register-text);
	}
	.toggle-track {
		display: inline-block;
		width: 34px;
		height: 18px;
		border-radius: 999px;
		background: var(--register-hair);
		position: relative;
		transition: background-color 0.2s;
	}
	.toggle-track.on {
		background: var(--register-accent);
	}
	.toggle-thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 14px;
		height: 14px;
		border-radius: 999px;
		background: var(--register-card);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
		transition: transform 0.2s;
	}
	.toggle-track.on .toggle-thumb {
		transform: translateX(16px);
	}
	.toggle-label {
		font-weight: 600;
		font-size: 14px;
	}
	.toggle-help {
		font-size: 12px;
		color: var(--register-muted);
		font-family: var(--font-mono, ui-monospace, monospace);
	}
	.anomaly-strip {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 14px 16px;
		border-radius: 16px;
		background: color-mix(in srgb, #dab95b 18%, var(--register-card));
		border: 1px solid color-mix(in srgb, #dab95b 65%, transparent);
		color: var(--register-text);
		font-size: 14px;
		line-height: 1.5;
	}
	.anomaly-actions {
		display: flex;
		gap: 8px;
	}
	.ghost-btn,
	.hold-btn {
		padding: 8px 14px;
		border-radius: 12px;
		font-weight: 600;
		font-size: 13px;
		cursor: pointer;
		border: 1px solid var(--register-text);
	}
	.ghost-btn {
		background: transparent;
		color: var(--register-text);
	}
	.hold-btn {
		background: var(--register-text);
		color: var(--register-ground);
	}
	.signed-chip {
		display: inline-block;
		padding: 6px 10px;
		border-radius: 999px;
		background: color-mix(in srgb, #2c8f5c 25%, var(--register-card));
		color: var(--register-text);
		font-weight: 600;
		font-size: 12px;
	}
	.hold-chip {
		display: inline-block;
		padding: 6px 10px;
		border-radius: 999px;
		background: var(--register-card);
		color: var(--register-muted);
		font-weight: 600;
		font-size: 12px;
		border: 1px solid var(--register-hair);
	}
</style>
