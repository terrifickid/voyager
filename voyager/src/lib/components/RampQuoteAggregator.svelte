<script>
	import { rankQuotes } from '$lib/ramp/rankQuotes.js';
	import nodes from '$lib/data/mostroNodes.json';
	import Cta from './Cta.svelte';

	let amountSats = $state(50000);
	let fiat = $state('USD');
	let method = $state('bank');

	const fiats = ['JMD', 'USD', 'EUR', 'GBP'];
	const methods = ['bank', 'wise', 'cash', 'mobile'];

	const ranked = $derived(
		rankQuotes(nodes, { amountSats: Number(amountSats) || 0, fiat, method })
	);

	function fmtSats(n) {
		return new Intl.NumberFormat('en-US').format(Math.round(n));
	}

	function dots(rep) {
		const filled = Math.round((rep / 100) * 5);
		return Array.from({ length: 5 }, (_, i) => i < filled);
	}
</script>

<div class="rounded-[32px] bg-bone-100 p-6 sm:p-8">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
		<!-- Inputs -->
		<div class="flex flex-col gap-5">
			<div class="flex flex-col gap-2">
				<label for="ramp-amount" class="eyebrow">Amount</label>
				<div class="flex items-baseline gap-2">
					<input
						id="ramp-amount"
						type="number"
						min="0"
						step="1000"
						bind:value={amountSats}
						class="w-full rounded-pill bg-bone-50 px-5 py-3 font-display text-2xl text-ink focus:outline-none focus:ring-2 focus:ring-ink"
					/>
					<span class="font-display text-lg text-ink-2">sats</span>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<span class="eyebrow">Fiat</span>
				<div class="flex flex-wrap gap-2">
					{#each fiats as f (f)}
						<button
							type="button"
							onclick={() => (fiat = f)}
							aria-pressed={fiat === f}
							class="rounded-pill px-4 py-2 text-[14px] font-semibold transition-colors {fiat ===
							f
								? 'bg-ink text-bone-50'
								: 'bg-bone-200 text-ink hover:bg-bone-300'}"
						>
							{f}
						</button>
					{/each}
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<span class="eyebrow">Method</span>
				<div class="flex flex-wrap gap-2">
					{#each methods as m (m)}
						<button
							type="button"
							onclick={() => (method = m)}
							aria-pressed={method === m}
							class="rounded-pill px-4 py-2 text-[14px] font-semibold capitalize transition-colors {method ===
							m
								? 'bg-ink text-bone-50'
								: 'bg-bone-200 text-ink hover:bg-bone-300'}"
						>
							{m}
						</button>
					{/each}
				</div>
			</div>

			<p class="text-xs leading-relaxed text-muted">
				Demo fixture — no live network. Real Voyager Pay would query <code>kind:38383</code> events from Nostr relays.
			</p>
		</div>

		<!-- Output -->
		<div class="flex flex-col gap-4">
			<span class="eyebrow">Top ranked quotes</span>
			{#if ranked.length === 0}
				<div class="rounded-[28px] bg-bone-200 p-6 text-sm text-ink-2">
					No nodes match this fiat + method combination.
				</div>
			{:else}
				{#each ranked as q, i (q.node.name)}
					<article class="flex flex-col gap-3 rounded-[28px] bg-bone-200 p-5">
						<div class="flex items-start justify-between gap-3">
							<div class="flex flex-col gap-1">
								<span class="font-display text-xl text-ink leading-tight">{q.node.name}</span>
								<span class="text-xs text-muted">{q.node.region}</span>
							</div>
							<span
								aria-label={`Rank ${i + 1} of ${ranked.length}`}
								class="rounded-pill bg-bone-300 px-3 py-1 text-[12px] font-semibold text-ink"
							>
								#{i + 1}
							</span>
						</div>
						<div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
							<span class="font-display text-lg text-ink">
								1 {fiat} = {fmtSats(q.effectiveRateSatsPerFiat)} sats
							</span>
							<span class="text-ink-2">fee {q.node.feePct}%</span>
							<span class="text-ink-2 capitalize">{q.node.supportedMethods.includes(method)
									? method
									: q.node.supportedMethods[0]}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-xs text-muted">Reputation</span>
							<span class="flex items-center gap-1" aria-label={`Reputation ${q.node.reputation} of 100`}>
								{#each dots(q.node.reputation) as on, di (di)}
									<span
										class="inline-block h-2 w-2 rounded-full {on ? 'bg-ink' : 'bg-bone-300'}"
									></span>
								{/each}
							</span>
						</div>
						<div>
							<Cta variant="tertiary" href="/pay#ramp">View corridor</Cta>
						</div>
					</article>
				{/each}
			{/if}
		</div>
	</div>
</div>