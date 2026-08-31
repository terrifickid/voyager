<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>What can still go wrong — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="flex flex-col gap-1">
		<span class="eyebrow">Lesson 8</span>
		<span class="eyebrow">For the protocol-curious</span>
	</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		What can still go wrong.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		EROI below one against most attackers does not mean EROI below one against all of them. This lesson names the four residual risks Voyager Pay leans on structural mitigations for. It also lists the things the protocol deliberately leaves out of scope.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">The four residual risks</h2>

		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">Fiat rail reversal</p>
			<h3 class="mt-2 font-display text-xl text-ink">The customer pays fiat, then chargebacks after the HODL settles.</h3>
			<p class="mt-2">
				Mitigated by short HODL windows and reputation-weighted limits per counterparty. The budget an attacker can extract per cycle is capped. Serial reversers lose the ability to place new orders. Honest limit: there is no protocol-level refund engine, because there is no protocol-level identity to attach it to.
			</p>
		</div>

		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">Sybil reputation</p>
			<h3 class="mt-2 font-display text-xl text-ink">Reputation events are cheap to forge. A single attacker can spin up many keys.</h3>
			<p class="mt-2">
				Mitigated by tying reputation to a node public key that has actually settled volume. A brand-new keypair with no settlement history carries near-zero weight in the §7.4 ranking rubric. Honest limit: a coordinated network of sybil nodes with real volume would take time and capital to build. It is not impossible.
			</p>
		</div>

		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">Relay capture</p>
			<h3 class="mt-2 font-display text-xl text-ink">Malicious relays can censor events or selectively drop order messages.</h3>
			<p class="mt-2">
				Mitigated by the protocol being relay-agnostic: events republish across any of N independent operators. A wallet subscribing to a diverse set recovers a censored event from a peer. Honest limit: a sufficiently coordinated relay cartel could degrade the user experience without breaking settlement. Annoyance, not theft.
			</p>
		</div>

		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">Operator rug</p>
			<h3 class="mt-2 font-display text-xl text-ink">A Mostro node accepts sats into a HODL, then disappears before settling.</h3>
			<p class="mt-2">
				Mitigated by HODL invoices and short settlement cycles. The HODL has a timeout. If the node does not act, the sats return to the network's hold and become claimable by the customer. Worst-case exposure per cycle is bounded to the sats amount of the outstanding HODL. Honest limit: a node that accepts and immediately routes around the timeout still takes that cycle.
			</p>
		</div>

		<h2 class="font-display text-2xl text-ink mt-4">What we did NOT solve</h2>
		<p>
			The protocol is deliberately narrow. Things outside its scope:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li><span class="font-display text-ink">Identity.</span> The protocol is pseudonymous by design. Knowing who you are is somebody else's problem.</li>
			<li><span class="font-display text-ink">Dispute resolution.</span> The spec leaves it to reputation and short HODL windows, not to arbitration.</li>
			<li><span class="font-display text-ink">Cross-border FX beyond per-node quotes.</span> Each Mostro node prices its own corridor. The protocol does not unify them.</li>
			<li><span class="font-display text-ink">Front-end UX.</span> The Voyager Pay widget on this site is a demo of the ranking flow, not a shipped product.</li>
		</ul>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">The honest summary</p>
			<p class="mt-2">
				A structural ceiling of (3, 3, 3) on the EROI rubric puts most attackers out of business. Four named residual risks remain. Each carries a mitigation narrower than an insurance policy. Out-of-scope items stay out of scope on purpose. That is the protocol — its strengths and its limits, named.
			</p>
		</div>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Back to</span>
			<h3 class="mt-2 font-display text-xl text-ink">Documentation overview</h3>
			<p class="mt-2 text-sm text-ink-2">The full reading order, one click away.</p>
		</div>
		<Cta variant="primary" href="/docs">Back to overview</Cta>
	</div>
</section>
