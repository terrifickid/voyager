<script>
	import { rankQuotes } from '$lib/ramp/rankQuotes.js';
	import nodes from '$lib/data/mostroNodes.json';
	import Icon from './Icon.svelte';
	import Cta from './Cta.svelte';

	const VENDORS = [
		{ name: 'Calypso Inn', region: 'Negril, JM', amountSats: 35000 },
		{ name: 'BlueMarlin Tours', region: 'Montego Bay, JM', amountSats: 12500 },
		{ name: "Marlon's Taxi", region: 'Ocho Rios, JM', amountSats: 4200 }
	];

	const fiats = ['USD', 'EUR', 'GBP', 'JMD'];

	let currency = $state('USD');
	let vendor = $state(VENDORS[0]);
	let provider = $state(null);
	let isPaid = $state(false);
	let vendorMenuOpen = $state(false);

	// Decision (a): the destination sats amount is set by the vendor and stays constant
	// across providers. Providers differ on rate/fee, not on the sats paid. So chips
	// show the same sats amount and use the effective rate as the differentiator.
	const ranked = $derived(
		rankQuotes(nodes, { amountSats: vendor.amountSats, fiat: currency, method: 'bank' })
	);

	$effect(() => {
		if (ranked.length === 0) {
			provider = null;
			return;
		}
		const stillThere = ranked.find((r) => r.node.name === provider?.node?.name);
		provider = stillThere ?? ranked[0];
	});

	function fmtSats(n) {
		return new Intl.NumberFormat('en-US').format(Math.round(n));
	}

	function fmtRate(rate) {
		return new Intl.NumberFormat('en-US').format(Math.round(rate));
	}

	function selectVendor(v) {
		vendor = v;
		vendorMenuOpen = false;
	}

	function pay() {
		isPaid = true;
	}

	function startOver() {
		isPaid = false;
	}
</script>

<article class="flex flex-col gap-5 rounded-[28px] bg-bone-50 p-5 sm:p-6 w-full max-w-[480px] mx-auto lg:mx-0">
	{#if isPaid}
		<div class="flex flex-col items-center gap-4 py-6 text-center">
			<Icon name="check" tone="violet" size={56} />
			<span class="font-display text-3xl text-ink leading-tight">Paid.</span>
			<p class="max-w-sm text-[15px] leading-relaxed text-ink-2">
				{fmtSats(vendor.amountSats)} sats sent to {vendor.name} via {provider?.node?.name ?? 'a Voyager Pay operator'}.
			</p>
			<button
				type="button"
				onclick={startOver}
				class="mt-2 inline-flex items-center gap-1.5 text-ink underline underline-offset-4 decoration-[1.5px] hover:text-ink-2 text-[15px] font-semibold"
			>
				Start over
				<span aria-hidden="true" class="text-[1.1em] leading-none">›</span>
			</button>
		</div>
	{:else}
		<div class="flex items-center justify-between text-xs text-muted">
			<span class="inline-flex items-center gap-2">
				<span class="inline-block h-2 w-2 rounded-full" style="background: var(--pastel-violet);"></span>
				Live · ranked across {ranked.length} operator{ranked.length === 1 ? '' : 's'}
			</span>
		</div>

		<!-- Currency -->
		<div class="flex flex-col gap-2">
			<span class="eyebrow">Currency</span>
			<div class="flex flex-wrap gap-2">
				{#each fiats as f (f)}
					<button
						type="button"
						onclick={() => (currency = f)}
						aria-pressed={currency === f}
						class="rounded-pill px-4 py-2 text-[14px] font-semibold transition-colors {currency === f
							? 'bg-ink text-bone-50'
							: 'bg-bone-200 text-ink hover:bg-bone-300'}"
					>
						{f}
					</button>
				{/each}
			</div>
		</div>

		<!-- Vendor -->
		<div class="flex flex-col gap-2" data-vendor-menu>
			<span class="eyebrow">Paying</span>
			<div class="relative">
				<button
					type="button"
					onclick={() => (vendorMenuOpen = !vendorMenuOpen)}
					aria-haspopup="listbox"
					aria-expanded={vendorMenuOpen}
					class="inline-flex items-center gap-2 rounded-pill bg-bone-200 px-4 py-2 text-sm font-semibold text-ink hover:bg-bone-300 transition-colors"
				>
					<span>{vendor.name}</span>
					<span aria-hidden="true" class="text-ink-2">▾</span>
				</button>
				{#if vendorMenuOpen}
					<ul
						role="listbox"
						class="absolute left-0 top-full z-10 mt-2 flex w-72 flex-col gap-1 rounded-[20px] bg-bone-50 p-2 ring-2 ring-[var(--pastel-violet)]"
					>
						{#each VENDORS as v (v.name)}
							<li>
								<button
									type="button"
									role="option"
									aria-selected={vendor.name === v.name}
									onclick={() => selectVendor(v)}
									class="flex w-full items-baseline justify-between gap-3 rounded-pill px-3 py-2 text-left text-sm transition-colors {vendor.name ===
									v.name
										? 'bg-ink text-bone-50'
										: 'text-ink hover:bg-bone-200'}"
								>
									<span class="font-semibold">{v.name}</span>
									<span class="text-xs {vendor.name === v.name ? 'text-bone-50' : 'text-ink-2'}">
										{fmtSats(v.amountSats)} sats
									</span>
								</button>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>

		<!-- Amount -->
		<div class="flex flex-col gap-1">
			<span class="eyebrow">Amount</span>
			<span class="font-display text-2xl text-ink leading-tight">
				{fmtSats(vendor.amountSats)} <span class="text-base text-ink-2">sats</span>
			</span>
		</div>

		<!-- Providers -->
		<div class="flex flex-col gap-2">
			<div class="flex items-baseline justify-between">
				<span class="eyebrow">Providers</span>
				<span class="text-xs text-muted">{ranked.length} ranked</span>
			</div>
			{#if ranked.length === 0}
				<div class="rounded-[20px] bg-bone-200 p-4 text-sm text-ink-2">
					No providers for this combination — try a different currency.
				</div>
			{:else}
				<ul class="flex flex-col gap-2">
					{#each ranked as q (q.node.name)}
						{@const selected = provider?.node?.name === q.node.name}
						<li>
							<button
								type="button"
								onclick={() => (provider = q)}
								aria-pressed={selected}
								class="flex w-full items-center justify-between gap-3 rounded-[20px] p-3 text-left transition-colors {selected
									? 'bg-bone-200 ring-2 ring-[var(--pastel-violet)]'
									: 'bg-bone-100 hover:bg-bone-200'}"
							>
								<span class="flex items-center gap-3">
									<span
										aria-hidden="true"
										class="inline-block h-2.5 w-2.5 shrink-0 rounded-full {selected
											? 'bg-ink'
											: 'bg-transparent ring-2 ring-ink'}"
									></span>
									<span class="flex flex-col">
										<span class="font-display text-base text-ink leading-tight">{q.node.name}</span>
										<span class="text-xs text-muted">{q.node.region}</span>
									</span>
								</span>
								<span class="flex flex-col items-end">
									<span class="font-display text-base text-ink leading-tight">
										{fmtRate(q.effectiveRateSatsPerFiat)} <span class="text-xs text-ink-2">sats/{currency}</span>
									</span>
									<span class="text-xs text-muted">fee {q.node.feePct}%</span>
								</span>
							</button>
						</li>
					{/each}
				</ul>
				<p class="text-xs leading-relaxed text-muted">
					Best rate, ranked across independent operators.
				</p>
			{/if}
		</div>

		<!-- Total + Pay -->
		<div class="mt-auto flex items-center justify-between gap-4 pt-2">
			<div class="flex flex-col gap-1">
				<span class="eyebrow">Total</span>
				<span class="font-display text-2xl text-ink leading-tight">
					{fmtSats(vendor.amountSats)} <span class="text-base text-ink-2">sats</span>
				</span>
			</div>
			<Cta variant="primary" onclick={pay} disabled={!provider}>Pay</Cta>
		</div>

	<p class="text-xs leading-relaxed text-muted">
		Demo fixture — no live network.
	</p>
	{/if}
</article>

<svelte:window
	onclick={(e) => {
		if (!vendorMenuOpen) return;
		const target = e.target;
		if (target instanceof Element && target.closest('[data-vendor-menu]')) return;
		vendorMenuOpen = false;
	}}
/>
