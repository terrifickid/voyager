<script>
	import AiTraceStream from './AiTraceStream.svelte';
	import RelayChip from './RelayChip.svelte';
	import relaysFixture from '$lib/data/aiRelays.json';
	import marketplace from '$lib/data/aiMarketplace.json';
	import { onDestroy } from 'svelte';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {{ ts: number, kind: 'parse' | 'query' | 'score' | 'sign' | 'publish' | 'explain', text: string }} TraceLine
	 */
	/** @type {{ register?: Register, onActiveRelay?: (name: string) => void, activeRelay?: string }} */
	let { register = 'carnival-poster', onActiveRelay = () => {}, activeRelay = '' } = $props();

	const queries = [
		{ id: 'q-carpenter', label: 'Find a Grenada carpenter with strong zaps', tag: ['t=furniture', 'l=grenada'] },
		{ id: 'q-music', label: 'Barbados live music this Friday', tag: ['t=music', 'when=Friday'] },
		{ id: 'q-jmd', label: 'Cheapest JMD ramp today', tag: ['kind=38383', 'l=jamaica'] }
	];

	let prompt = $state('');
	let lines = $state(/** @type {TraceLine[]} */ ([]));
	let results = $state(/** @type {any[]} */ ([]));
	let running = $state(false);
	let showPrompt = $state(false);
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
	});

	/**
	 * @param {any} q
	 */
	function useQuery(q) {
		prompt = q.label;
		runQuery(q);
	}

	/**
	 * @param {any} q
	 */
	function runQuery(q) {
		running = true;
		lines = [];
		results = [];
		const t0 = Date.now();
		const tx = q.tag;
		lines = [{ ts: t0, kind: 'parse', text: `> receive · "${q.label}"` }];
		queue(() => {
			lines = [
				...lines,
				{
					ts: Date.now(),
					kind: 'parse',
					text: `> extract · filters ${tx.join(' · ')}`
				}
			];
		}, 250);
		queue(() => {
			const firstRelay = relaysFixture[0].name;
			onActiveRelay(firstRelay);
			lines = [
				...lines,
				{
					ts: Date.now(),
					kind: 'query',
					text: `> REQ → ${relaysFixture.map((r) => r.name).join(' + ')} (kind:${q.id === 'q-jmd' ? '38383' : q.id === 'q-music' ? '31923' : '30402'})`
				},
				{
					ts: Date.now(),
					kind: 'query',
					text: `> ${firstRelay} returned first (${relaysFixture[0].avgLatencyMs}ms)`,
				}
			];
		}, 600);
		queue(() => {
			onActiveRelay(relaysFixture[1].name);
			lines = [
				...lines,
				{
					ts: Date.now(),
					kind: 'score',
					text: `> local ranking · graphDistance × -0.5 + log(zaps)×0.4 + contentMatch×0.5`
				}
			];
			results = [...marketplace]
				.filter((m) => {
					if (q.id === 'q-carpenter') return m.tags.some((t) => /furniture|wood|carpent/.test(t));
					if (q.id === 'q-music') return m.tags.some((t) => /music|live/.test(t));
					if (q.id === 'q-jmd') return m.tags.some((t) => /jmd|mostro|ramp/.test(t));
					return true;
				})
				.slice(0, 3);
			running = false;
		}, 1200);
	}

	const ranked = $derived.by(() => {
		return results.map((r) => ({
			...r,
			blendedScore: Math.round((1 - r.graphDistance * 0.15) * 40 + Math.log10(r.zaps + 1) * 8 + r.contentMatch * 40)
		}));
	});
</script>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
	<div class="left flex flex-col gap-4">
		<div class="flex flex-wrap items-center gap-2">
			<span class="lbl">Try a query</span>
			{#each queries as q (q.id)}
				<button type="button" class="chip" onclick={() => useQuery(q)} disabled={running}>
					{q.label}
				</button>
			{/each}
		</div>
		<form
			class="row"
			onsubmit={(e) => {
				e.preventDefault();
				const m = queries.find((x) => x.label === prompt.trim());
				if (m) runQuery(m);
			}}
		>
			<input
				type="text"
				class="input"
				placeholder='e.g. "find a Mas Camp teaser with the highest zap count"'
				bind:value={prompt}
			/>
			<button type="submit" class="send" disabled={!prompt.trim() || running}>Ask</button>
		</form>
		<div class="relays">
			{#each relaysFixture as r (r.url)}
				<RelayChip {register} name={r.name} region={r.region} status={r.status} avgLatencyMs={r.avgLatencyMs} active={activeRelay === r.name} />
			{/each}
		</div>
		<AiTraceStream {register} lines={lines} />
		<div class="explain">
			<button
				type="button"
				class="explain-btn"
				onmouseenter={() => (showPrompt = true)}
				onmouseleave={() => (showPrompt = false)}
				onfocus={() => (showPrompt = true)}
				onblur={() => (showPrompt = false)}
				aria-expanded={showPrompt}
			>
				Explain
			</button>
			{#if showPrompt}
				<div class="explain-pop">
					<span class="explain-pop-label">prompt template</span>
					<pre class="explain-pop-body">{`You are a local Nostr search agent.
Goal: rank Caribbean marketplace events for "${prompt || '…'}".

Steps:
  1. parse intent → kinds / tags / region
  2. parallel REQ {kinds, #t, #l} on relay set
  3. local scoring = 0.4·rate + 0.2·speed + 0.4·reliability
  4. re-rank candidates with: -0.5·graphDistance
                              + 0.4·log10(zaps)
                              + 0.5·contentMatch
Return top 3 as ranked cards.`}</pre>
				</div>
			{/if}
		</div>
	</div>

	<div class="right">
		{#if ranked.length === 0}
			<div class="empty">
				<span class="empty-title">Awaiting query.</span>
				<p class="empty-body">
					The local model would parse your natural-language query into a Nostr REQ and rank results by zaps,
					graph distance, and content match.
				</p>
			</div>
		{:else}
			<ul class="results">
				{#each ranked as r, i (r.id)}
					<li class="result">
						<div class="result-head">
							<span class="result-idx">#{i + 1}</span>
							<span class="result-name">{r.name}</span>
							<span class="result-kind">kind:{r.kind}</span>
						</div>
						<p class="result-summary">{r.summary}</p>
						<div class="result-meta">
							<span class="meta-key">pubkey</span>
							<span class="meta-val mono">{r.pubkey}</span>
						</div>
						<div class="result-stats">
							<span class="stat"><span class="stat-label">graph</span><span class="stat-val">{r.graphDistance}</span></span>
							<span class="stat"><span class="stat-label">zaps</span><span class="stat-val">{(r.zaps / 1000).toFixed(1)}k</span></span>
							<span class="stat"><span class="stat-label">content</span><span class="stat-val">{r.contentMatch.toFixed(2)}</span></span>
							<span class="stat"><span class="stat-label">active</span><span class="stat-val">{r.lastActive}</span></span>
						</div>
						<div class="result-bar" aria-hidden="true">
							<span class="result-bar-fill" style="width: {r.blendedScore}%"></span>
						</div>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	.lbl {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--register-muted);
	}
	.chip {
		font-size: 12px;
		padding: 6px 10px;
		border-radius: 999px;
		background: var(--register-card);
		color: var(--register-text);
		border: 1px solid var(--register-hair);
		cursor: pointer;
	}
	.chip:hover {
		background: var(--register-hair);
	}
	.chip:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.row {
		display: flex;
		gap: 8px;
	}
	.input {
		flex: 1;
		padding: 12px 14px;
		border-radius: 14px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		color: var(--register-text);
		font-size: 15px;
	}
	.input:focus {
		outline: 2px solid var(--register-accent);
		outline-offset: 1px;
	}
	.send {
		padding: 12px 18px;
		border-radius: 14px;
		background: var(--register-accent);
		color: var(--register-accent-ink);
		font-weight: 600;
		border: 0;
		cursor: pointer;
	}
	.send:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.relays {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.explain {
		position: relative;
		display: inline-block;
	}
	.explain-btn {
		padding: 8px 14px;
		border-radius: 12px;
		background: var(--register-card);
		color: var(--register-text);
		border: 1px solid var(--register-hair);
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
	}
	.explain-pop {
		position: absolute;
		left: 0;
		bottom: calc(100% + 8px);
		width: 360px;
		max-width: 90vw;
		border-radius: 14px;
		padding: 14px 16px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		color: var(--register-text);
		z-index: 5;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
	}
	.explain-pop-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--register-muted);
	}
	.explain-pop-body {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 12px;
		line-height: 1.55;
		white-space: pre-wrap;
		margin: 8px 0 0;
	}
	.empty {
		border-radius: 22px;
		padding: 28px;
		background: var(--register-ground);
		border: 1px dashed var(--register-hair);
	}
	.empty-title {
		font-family: var(--font-display);
		font-size: 20px;
		color: var(--register-text);
	}
	.empty-body {
		font-size: 14px;
		line-height: 1.55;
		color: var(--register-muted);
		margin: 8px 0 0;
	}
	.results {
		display: flex;
		flex-direction: column;
		gap: 10px;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.result {
		border-radius: 18px;
		padding: 14px 16px;
		background: var(--register-card);
		border: 1px solid var(--register-hair);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.result-head {
		display: flex;
		gap: 8px;
		align-items: baseline;
	}
	.result-idx {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 13px;
		color: var(--register-muted);
	}
	.result-name {
		font-family: var(--font-display);
		font-size: 17px;
		color: var(--register-text);
		flex: 1;
	}
	.result-kind {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		color: var(--register-muted);
	}
	.result-summary {
		font-size: 13px;
		line-height: 1.55;
		color: var(--register-muted);
		margin: 0;
	}
	.result-meta {
		display: flex;
		gap: 6px;
		font-size: 11px;
	}
	.meta-key {
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--register-muted);
	}
	.meta-val {
		color: var(--register-text);
	}
	.mono {
		font-family: var(--font-mono, ui-monospace, monospace);
	}
	.result-stats {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.stat {
		display: inline-flex;
		gap: 4px;
		padding: 4px 8px;
		border-radius: 999px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		font-size: 11px;
		font-family: var(--font-mono, ui-monospace, monospace);
	}
	.stat-label {
		color: var(--register-muted);
	}
	.stat-val {
		color: var(--register-text);
		font-weight: 600;
	}
	.result-bar {
		display: block;
		height: 4px;
		border-radius: 999px;
		background: var(--register-hair);
		overflow: hidden;
	}
	.result-bar-fill {
		display: block;
		height: 100%;
		background: var(--register-accent);
	}
</style>
