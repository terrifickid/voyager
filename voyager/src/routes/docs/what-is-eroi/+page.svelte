<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>What EROI is — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 5 — For the protocol-curious</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		What EROI is.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		EROI stands for Energy Return On Investment. Voyager borrows it for one purpose: modelling how much an attacker gets back for the effort they spend to take something from a system.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 id="an-attack-is-a-business">An attack is a business</h2>
		<p>
			Attackers are economic actors. They spend money, time, and operational effort to extract value. They stop when the math stops working — when what they walk off with is less than what they spent to take it.
		</p>
		<p>
			Push their cost up structurally and most of them leave. Patch the alarm and they just add the alarm to their budget; detection only changes the probability of getting caught, not whether the attack pays on average.
		</p>
		<p>
			That is the whole rubric. Every other lesson in this section is the rubric applied somewhere.
		</p>

		<h2 id="the-four-costs">The four costs an attacker pays</h2>
		<p>
			Capture cost isn't one number. It's the sum of four sub-costs the attacker has to pay before walking off with anything:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li><span class="font-display text-ink">Find.</span> Discovering that the value exists, where it lives, and how to address it.</li>
			<li><span class="font-display text-ink">Reach.</span> Getting access — credential theft, social engineering, breaching a perimeter.</li>
			<li><span class="font-display text-ink">Hold.</span> Maintaining control long enough to act — evading detection, keeping the door open.</li>
			<li><span class="font-display text-ink">Move.</span> Extracting value out of the system without it being reversed, confiscated, or traceable.</li>
		</ul>
		<p>
			Defenders who only add alarms after the fact often find the move cost is still low — the attacker already has the loot in hand by the time the page goes out. To change the math, you have to push one of these costs up before the attack begins.
		</p>

		<h2 id="three-properties">Three properties that make the costs structurally high</h2>
		<p>
			You don't patch EROI. You shape the system so each cost is structurally high. Three properties of how value sits in a system do real work, and you can apply them to anything you build — they are not Voyager features, they are a rubric:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-3">
			<li>
				<span class="font-display text-ink">Spread the value.</span> Value is distributed across many independent holders. Find and hold cost rise because no single target is worth breaching — the attacker has to compromise N different things in N different jurisdictions to get the whole pie.
			</li>
			<li>
				<span class="font-display text-ink">Hide what exists.</span> What exists, who has it, and where it sits is hidden. Find and reach cost rise because the attacker has nothing to point at — order traffic is opaque, counterparties are pseudonymous, and there is no identity dossier to steal.
			</li>
			<li>
				<span class="font-display text-ink">Bind value to context.</span> Value is tied to its rightful context. Move cost rises because detached value loses worth or won't move at all — settled sats cannot be taken without delivering the fiat, and a revoked credential cannot spend.
			</li>
		</ul>

		<h2 id="formalised">Formalised</h2>
		<div class="rounded-[24px] bg-bone-100 p-6">
			<p class="font-display text-2xl text-ink">extractor_EROI = deliverable_surplus ÷ capture_cost</p>
			<p class="mt-2 text-sm">
				If an attacker's EROI is below 1, the attack is unprofitable on average and most attackers move on. If it's above 1, the attack is a business — and the system will be attacked for as long as that ratio holds.
			</p>
		</div>

		<div class="rounded-[24px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">Target profile</p>
			<p class="mt-2">
				Score each property 1 (low) to 3 (high) per asset class. The target is at least 2 on every property on every asset class — a system at (3, 3, 3) has reached the rubric ceiling. Anything below (2, 2, 2) means at least one cost is low enough that an EROI above 1 budget exists for some attacker. The next two lessons explain why that is, and then walk the audit for Voyager Pay.
			</p>
		</div>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[24px] bg-bone-100 p-6 sm:p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">Why a capturable system invites capture</h3>
			<p class="mt-2 text-sm text-ink-2">Concentrated, visible, separable value is an open invitation.</p>
		</div>
		<Cta variant="primary" href="/docs/why-systems-get-captured">Continue</Cta>
	</div>
</section>
