<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>What can still go wrong — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Inserted after Lesson 7</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		What can still go wrong.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		EROI below 1 against most attackers is not EROI below 1 against all of them. Voyager Pay leans on four structural mitigations for the risks that remain. This page is an honest enumeration of the four, plus the limits we will not pretend to solve.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 id="fiat-rail-reversal">Fiat rail reversal</h2>
		<p>
			Atomic settlement on the Lightning rail does not stop the fiat side from reversing after the sats have moved. A buyer pays fiat, the operator settles the sats, the buyer's bank claws the fiat back. The structural mitigation is short HODL windows and reputation-weighted limits per operator: the exposure window stays small, and repeat offenders lose the right to settle large orders. Worst case is bounded to one in-flight trade per operator.
		</p>

		<h2 id="sybil-reputation">Sybil reputation</h2>
		<p>
			Reputation is the cheap signal attackers love to fake. Voyager ties reputation to a node pubkey that has actually settled volume — a fresh key with no on-chain history cannot outrank an operator with real trades behind it. Reputation accrues slowly and loses its rank the moment settled volume drops. The structural mitigation is the cost of acquiring a settled history at all: it requires real trades, which require real capital at risk.
		</p>

		<h2 id="relay-capture">Relay capture</h2>
		<p>
			Relays forward events. They do not author them. The protocol is relay-agnostic: events republish across N operators, a captured relay sees only ciphertext under NIP-17 gift-wrapping, and clients verify signatures against the author's pubkey regardless of which relay forwarded the event. The structural mitigation is fan-out — clients should connect to many relays and treat any single relay as untrusted.
		</p>

		<h2 id="operator-rug">Operator rug</h2>
		<p>
			An operator can refuse to settle a HODL invoice after the fiat has moved. The structural mitigation is HODL plus short settlement cycles: the sats are escrowed by the network, the operator cannot move them unilaterally, and a timeout releases the sats back to the customer. Worst-case exposure is bounded to the sats amount in one in-flight order — not the customer's whole balance.
		</p>

		<div class="rounded-[24px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">What we will not pretend to solve</p>
			<p class="mt-2">
				Identity. Arbitration. FX beyond per-node quotes. Production front-end UX. These are out of scope at the protocol layer. Conventions are open and shipped without our permission; a vendor that wants identity or arbitration declares it on its own convention. The substrate stays narrow.
			</p>
		</div>
	</div>
</section>

<section class="pb-32">
	<div class="mt-12 rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">End of the docs</span>
			<h3 class="mt-2 font-display text-xl text-ink">That is the whole spec.</h3>
			<p class="mt-2 text-sm text-ink-2">If you want to extend it, the lesson below shows how.</p>
		</div>
		<Cta variant="primary" href="/docs/how-voyager-pay-extends">Continue to Lesson 9</Cta>
	</div>
</section>
