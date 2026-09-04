<script>
	import AiTraceStream from './AiTraceStream.svelte';
	import RelayChip from './RelayChip.svelte';
	import relaysFixture from '$lib/data/aiRelays.json';
	import { onDestroy } from 'svelte';

	/**
	 * @typedef {'perk' | 'rasta' | 'carnival-poster' | 'carnival-poster-white' | 'ocean' | 'windies' | 'gold-cream' | 'caribana' | 'heritage-sepia' | 'editorial' | 'civic-ocean' | 'festival-poster' | 'monochrome-caribbean' | 'trinidad' | 'orange-sun' | 'tiffany' | 'maroon-nights'} Register
	 * @typedef {{ ts: number, kind: 'parse' | 'query' | 'score' | 'sign' | 'publish' | 'explain', text: string }} TraceLine
	 */
	/** @type {{ register?: Register, onActiveRelay?: (name: string) => void }} */
	let { register = 'carnival-poster', onActiveRelay = () => {} } = $props();

	let mode = $state('compose');
	let title = $state('East Coast Cottage — Bathsheba');
	let summary = $state('Two-bedroom cottage, 80m from Bathsheba beach. Sleeps four, weekly only.');
	let priceSats = $state(0);
	let priceFiat = $state('420');
	let currency = $state('BBD');
	let kind = $state(30402);
	let tagsInput = $state('stay,barbados,cottage,beach');
	let location = $state('Bathsheba, BB');

	const kinds = [
		{ value: 30402, label: 'marketplace listing', tagHint: 'voyager.listing.v1' },
		{ value: 31923, label: 'calendar event', tagHint: 'voyager.event.v1' },
		{ value: 1, label: 'short note', tagHint: 'no v-tag' },
		{ value: 30018, label: 'long-form', tagHint: 'voyager.essay.v1' }
	];

	const pubkey = 'npub1demo9caribbea…zw7';
	let sig = '___________________________________';
	let signed = $state(false);
	let publishes = $state(
		/** @type {Array<{relay:string, ok:boolean, ts:number|null}>} */ (
			relaysFixture.map((r) => ({ relay: r.name, ok: false, ts: null }))
		)
	);
	/** @type {TraceLine[]} */
	let lines = $state([]);
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

	function buildEvent() {
		const tags = tagsInput
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean)
			.map((t) => ['t', t]);
		if (location) tags.push(['location', location]);
		tags.push(['v', kinds.find((k) => k.value === kind)?.tagHint ?? 'voyager.listing.v1']);
		return {
			id: '0'.repeat(64),
			pubkey,
			kind,
			content: summary,
			tags,
			created_at: Math.floor(Date.now() / 1000),
			sig
		};
	}

	function deterministicSig(seed) {
		let h = 0;
		for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
		const hex = h.toString(16).padStart(8, '0');
		return (hex + hex + hex + hex + hex + hex + hex + hex).slice(0, 128);
	}

	function copyJson() {
		const json = JSON.stringify(buildEvent(), null, 2);
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(json).catch(() => {});
		}
	}

	function copyCurl() {
		const cmd = `curl -s --max-time 5 \\
  -H "Content-Type: application/nostr+json+auth" \\
  --data-binary '${JSON.stringify(['EVENT', buildEvent()])}' \\
  ${relaysFixture[0].url}`;
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard.writeText(cmd).catch(() => {});
		}
	}

	function startSignPublish() {
		mode = 'publish';
		signed = false;
		publishes = relaysFixture.map((r) => ({ relay: r.name, ok: false, ts: null }));
		lines = [];
		const t0 = Date.now();
		lines = [{ ts: t0, kind: 'parse', text: `> receive · listing "${title}"` }];
		queue(() => {
			lines = [
				...lines,
				{ ts: Date.now(), kind: 'sign', text: '> serialize · nostr event id computed (sha256 of serialized)' }
			];
		}, 400);
		queue(() => {
			sig = deterministicSig(`${title}|${pubkey}|${kind}|${Date.now()}`);
			signed = true;
			lines = [...lines, { ts: Date.now(), kind: 'sign', text: `> sign · sig=${sig.slice(0, 18)}… (deterministic mock)` }];
		}, 1200);
		queue(() => {
			lines = [...lines, { ts: Date.now(), kind: 'publish', text: '> EVENT → 3 relays in parallel' }];
			publishes.forEach((p, i) => {
				const ms = 600 + Math.floor(Math.random() * 300);
				queue(() => {
					onActiveRelay(p.relay);
					publishes = publishes.map((x) => (x.relay === p.relay ? { ...x, ok: true, ts: ms } : x));
					lines = [
						...lines,
						{ ts: Date.now(), kind: 'publish', text: `> OK ← ${p.relay} (${ms}ms)` }
					];
				}, 1500 + i * 250 + ms);
			});
		}, 1800);
	}
</script>

<div class="agent" role="region" aria-label="Nostr AI write agent">
	<div class="modes" role="tablist" aria-label="Write mode">
		<button
			type="button"
			role="tab"
			aria-selected={mode === 'compose'}
			class="mode"
			class:mode--active={mode === 'compose'}
			onclick={() => (mode = 'compose')}
		>Compose listing</button>
		<button
			type="button"
			role="tab"
			aria-selected={mode === 'publish'}
			class="mode"
			class:mode--active={mode === 'publish'}
			onclick={() => (mode = 'publish')}
		>Sign & publish</button>
	</div>

	<div class="relays">
		{#each relaysFixture as r (r.url)}
			<RelayChip {register} name={r.name} region={r.region} status={r.status} avgLatencyMs={r.avgLatencyMs} />
		{/each}
	</div>

	{#if mode === 'compose'}
		<div class="compose">
			<form class="form" onsubmit={(e) => e.preventDefault()}>
				<label class="field">
					<span class="field-label">Title</span>
					<input type="text" class="input" bind:value={title} />
				</label>
				<label class="field">
					<span class="field-label">Summary</span>
					<textarea class="textarea" rows="3" bind:value={summary}></textarea>
				</label>
				<div class="row-3">
					<label class="field">
						<span class="field-label">Price (sats)</span>
						<input type="number" class="input" min="0" bind:value={priceSats} />
					</label>
					<label class="field">
						<span class="field-label">Price (fiat)</span>
						<input type="text" class="input" bind:value={priceFiat} />
					</label>
					<label class="field">
						<span class="field-label">Currency</span>
						<input type="text" class="input" bind:value={currency} />
					</label>
				</div>
				<label class="field">
					<span class="field-label">Kind</span>
					<select class="input" bind:value={kind}>
						{#each kinds as k (k.value)}
							<option value={k.value}>{k.label} (kind:{k.value})</option>
						{/each}
					</select>
				</label>
				<label class="field">
					<span class="field-label">Tags (comma-separated)</span>
					<input type="text" class="input" bind:value={tagsInput} />
				</label>
				<label class="field">
					<span class="field-label">Location</span>
					<input type="text" class="input" bind:value={location} />
				</label>
			</form>

			<div class="preview">
				<div class="preview-head">
					<span class="preview-label">Live preview · Nostr event</span>
					<button type="button" class="ghost" onclick={copyJson}>Copy event JSON</button>
				</div>
				<pre class="preview-body mono">{JSON.stringify(buildEvent(), null, 2)}</pre>
			</div>
		</div>

		<div class="actions">
			<button type="button" class="primary" onclick={startSignPublish}>Sign & publish</button>
			<button type="button" class="ghost" onclick={copyCurl}>Copy cURL for manual publish</button>
		</div>
	{:else}
		<div class="publish-grid">
			<div class="publish-left">
				<div class="preview">
					<div class="preview-head">
						<span class="preview-label">Event (signed — mock)</span>
						<button type="button" class="ghost" onclick={copyJson}>Copy event JSON</button>
					</div>
					<pre class="preview-body mono">{JSON.stringify(buildEvent(), null, 2)}</pre>
				</div>
				<div class="preview">
					<div class="preview-head">
						<span class="preview-label">Equivalent cURL</span>
						<button type="button" class="ghost" onclick={copyCurl}>Copy cURL</button>
					</div>
					<pre class="preview-body mono">{`curl -s --max-time 5 \\
  -H "Content-Type: application/nostr+json+auth" \\
  --data-binary '${JSON.stringify(['EVENT', buildEvent()])}' \\
  ${relaysFixture[0].url}`}</pre>
				</div>
			</div>

			<div class="publish-right">
				<AiTraceStream {register} lines={lines} />
				<ul class="ack">
					{#each publishes as p (p.relay)}
						<li class="ack-row" class:ack-ok={p.ok}>
							<span class="ack-relay">{p.relay}</span>
							<span class="ack-state">
								{#if p.ok}
									OK · {p.ts}ms
								{:else}
									pending…
								{/if}
							</span>
						</li>
					{/each}
				</ul>
				<button type="button" class="primary" onclick={startSignPublish}>Re-publish</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.agent {
		display: flex;
		flex-direction: column;
		gap: 16px;
		border-radius: 24px;
		padding: 22px;
		background: var(--register-card);
		border: 1px solid var(--register-hair);
	}
	.modes {
		display: inline-flex;
		gap: 4px;
		padding: 4px;
		border-radius: 999px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		width: max-content;
	}
	.mode {
		padding: 8px 14px;
		border-radius: 999px;
		font-size: 13px;
		font-weight: 600;
		background: transparent;
		border: 0;
		color: var(--register-text);
		cursor: pointer;
	}
	.mode--active {
		background: var(--register-accent);
		color: var(--register-accent-ink);
	}
	.relays {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.compose {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}
	@media (min-width: 1024px) {
		.compose {
			grid-template-columns: 1fr 1fr;
		}
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.row-3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 8px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.field-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--register-muted);
	}
	.input,
	.textarea {
		padding: 10px 12px;
		border-radius: 12px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		color: var(--register-text);
		font-size: 14px;
		font-family: inherit;
	}
	.input:focus,
	.textarea:focus {
		outline: 2px solid var(--register-accent);
		outline-offset: 1px;
	}
	.preview {
		border-radius: 18px;
		background: var(--register-ground);
		border: 1px solid var(--register-hair);
		display: flex;
		flex-direction: column;
		gap: 0;
		overflow: hidden;
	}
	.preview-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 12px;
		border-bottom: 1px solid var(--register-hair);
	}
	.preview-label {
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--register-muted);
	}
	.preview-body {
		margin: 0;
		padding: 14px 16px;
		font-size: 12px;
		line-height: 1.55;
		color: var(--register-text);
		max-height: 280px;
		overflow: auto;
	}
	.mono {
		font-family: var(--font-mono, ui-monospace, monospace);
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.primary {
		padding: 12px 18px;
		border-radius: 12px;
		background: var(--register-accent);
		color: var(--register-accent-ink);
		font-weight: 600;
		border: 0;
		cursor: pointer;
	}
	.ghost {
		padding: 10px 14px;
		border-radius: 12px;
		background: transparent;
		color: var(--register-text);
		border: 1px solid var(--register-text);
		font-weight: 600;
		font-size: 13px;
		cursor: pointer;
	}
	.publish-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 16px;
	}
	@media (min-width: 1024px) {
		.publish-grid {
			grid-template-columns: 1.2fr 1fr;
		}
	}
	.publish-right {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.ack {
		display: flex;
		flex-direction: column;
		gap: 6px;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.ack-row {
		display: flex;
		justify-content: space-between;
		padding: 8px 12px;
		border-radius: 10px;
		background: var(--register-card);
		border: 1px solid var(--register-hair);
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: 12px;
		color: var(--register-muted);
	}
	.ack-ok .ack-state {
		color: color-mix(in srgb, #2c8f5c 70%, var(--register-text));
		font-weight: 600;
	}
	.ack-relay {
		color: var(--register-text);
	}
</style>
