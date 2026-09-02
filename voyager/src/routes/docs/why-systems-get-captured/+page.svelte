<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>Why a capturable system invites capture — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 6 — For the protocol-curious</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		Why a capturable system invites capture.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Concentrated, visible, separable value is an open invitation. The moment a system has all three — the value sits in one place, an outsider can see it, and they can walk off with it — an EROI budget at or above one is waiting to be spent. The only durable answer is to make the extraction not worth the spend.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 id="the-natural-incentive-argument">The natural-incentive argument</h2>
		<p>
			Extraction is not irrational. The cost is paid when the deliverable surplus is expected to exceed it. If a system concentrates enough value in one place, is visible enough to find, and is separable enough to walk off with, then for any given extraction budget there is a strategy whose EROI is at or above one. The size of that budget shrinks or grows with the pool of would-be extractors. As long as the formula allows it, extraction keeps happening.
		</p>
		<p>
			Adding more alarms does not change the formula. It changes the probability of being noticed, which is a separate term in the accounting. As long as EROI stays above one, alarms are just another line item in the extraction budget. This is the structural-versus-alarm distinction. It is why a list of patches can never replace a design rubric.
		</p>

		<h2 id="two-analogies">Two analogies that make it concrete</h2>
		<p>
			<strong class="text-ink">Cash in a vault vs. cash across many small wallets.</strong> A vault concentrates value. Find cost is low, one building. Reach cost is medium, a safe crack. Move cost is low, a bag. Anyone with a van and a drill runs a positive EROI.
		</p>
		<p>
			Now spread the same total cash across thousands of small balances belonging to different people in different places. Find cost rises: no address publishes them all. Reach cost rises: you would need many separate compromises. Hold cost rises: you cannot be at all of them at once. Move cost rises: each withdrawal is small and individually suspicious. Same total value. Much higher extraction cost.
		</p>
		<p>
			<strong class="text-ink">A bearer bond vs. a relationship-bound contract.</strong> A bearer bond is separable: whoever holds it owns it. Move cost is near zero. Transfer it. Walk away.
		</p>
		<p>
			A relationship-bound contract (a vendor credit pegged to a buyer identity, a payment address bound to a Nostr public key with revocation rights) is not separable. The thing in your hand loses worth the moment it detaches from its rightful context. Move cost is high. Detached value is no longer valuable.
		</p>

		<h2 id="the-structural-answer">The structural answer</h2>
		<p>
			Push extraction's EROI below one by raising find, reach, hold, and move cost structurally. Do not pile on detection after the fact. That is the move the three properties from the previous lesson were named for. The next lesson walks that audit for Voyager Pay itself.
		</p>

		<div class="rounded-[24px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">In one sentence</p>
			<p class="mt-2">
				Concentrated, visible, separable value is a budget invitation. Design the system so
				the budget is too small to spend.
			</p>
		</div>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">How Voyager Pay satisfies the EROI rubric</h3>
			<p class="mt-2 text-sm text-ink-2">The audit table: which design move raises which property, and the score profile.</p>
		</div>
		<Cta variant="primary" href="/docs/voyager-pay-eroi-audit">Continue</Cta>
	</div>
</section>
