<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>Why a capturable system invites capture — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 6</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		Why a capturable system invites capture.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Concentrated, visible, separable value is an open invitation. The moment a system has all
		three — the loot is in one place, an outsider can see it, and they can walk off with it —
		there is an EROI ≥ 1 budget waiting to be spent. The natural incentive creates the opportunity;
		the only durable answer is to make the crime not worth the squeeze.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">The natural-incentive argument</h2>
		<p>
			Attackers are not irrational. They spend on capture cost when they expect the deliverable
			surplus to exceed the cost. If your system concentrates enough value in one place, is
			visible enough for someone to find, and is separable enough to walk off with, then for any
			given attacker budget there is a strategy whose EROI is ≥ 1. The size of that budget
			shrinks or grows with the attacker pool — but as long as the formula allows it, attackers
			keep showing up.
		</p>
		<p>
			Adding more alarms does not change the formula. It changes the probability of getting
			caught, which is a separate term from the attacker's accounting. As long as EROI stays
			above 1, alarms just become a cost of doing business. This is the structural-vs-alarm
			distinction, and it's why a list of patches can never replace a design rubric.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">Two analogies that make it concrete</h2>
		<p>
			<strong class="text-ink">Cash in a vault vs. cash across many low-denomination wallets.</strong>
			A vault concentrates value. Find cost is low (one building), reach cost is medium (a safe
			crack), move cost is low (a bag). An attacker with a van and a drill runs a positive EROI.
			Now spread the same total cash across thousands of small balances belonging to different
			people in different places. Find cost rises (no address publishes them all), reach cost
			rises (you'd need many separate compromises), hold cost rises (you can't be at all of them
			at once), move cost rises (each withdrawal is small and individually suspicious). Same
			total value, much higher capture cost.
		</p>
		<p>
			<strong class="text-ink">A bearer bond vs. a relationship-bound contract.</strong> A bearer
			bond is separable: whoever holds it owns it. Move cost is near zero — transfer it, walk
			away. A relationship-bound contract (a vendor credit pegged to a buyer identity, a payment
			address bound to a Nostr pubkey with revocation rights) is not separable. The thing in your
			hand loses worth the moment it's detached from its rightful context. Move cost is high
			because the loot isn't loot any more.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">The structural answer</h2>
		<p>
			Push the extractor's EROI below 1 by raising find / reach / hold / move cost structurally,
			not by piling on detection after the fact. That's the move the three knobs — Fan-out,
			Opacity, Binding — were named for. The next lesson walks that audit for Voyager Pay
			itself.
		</p>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">In one sentence</p>
			<p class="mt-2">
				Concentrated, visible, separable value is a budget invitation. Design the system so
				the budget is too small to spend.
			</p>
		</div>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">How Voyager Pay satisfies the EROI rubric</h3>
			<p class="mt-2 text-sm text-ink-2">The audit table: which design move raises which knob, and the resulting score profile.</p>
		</div>
		<Cta variant="primary" href="/docs/voyager-pay-eroi-audit">Continue</Cta>
	</div>
</section>
