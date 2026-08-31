<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>What EROI is — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 5</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		What EROI is.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		EROI stands for Energy Return On Investment. We don't use it for oil wells. We use it for
		attackers: how much an extractor gets back for the effort they put in to take something from
		your system.
	</p>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">The formula</h2>
		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="font-display text-2xl text-ink">extractor_EROI = deliverable_surplus ÷ capture_cost</p>
			<p class="mt-2 text-sm">
				If an attacker's EROI is below 1, the attack is unprofitable on average and most
				attackers move on. If it's above 1, the attack is a business — and the system will be
				attacked for as long as that ratio holds.
			</p>
		</div>

		<h2 class="font-display text-2xl text-ink mt-4">The four costs</h2>
		<p>
			Capture cost isn't one number. It's the sum of four sub-costs the attacker has to pay before
			walking off with anything:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li><span class="font-display text-ink">Find.</span> Discovering that the value exists, where it lives, and how to address it.</li>
			<li><span class="font-display text-ink">Reach.</span> Getting access — credential theft, social engineering, breaching a perimeter.</li>
			<li><span class="font-display text-ink">Hold.</span> Maintaining control long enough to act — evading detection, keeping the door open.</li>
			<li><span class="font-display text-ink">Move.</span> Extracting value out of the system without it being reversed, confiscated, or traceable.</li>
		</ul>
		<p>
			Defenders raise any one of these and the ratio drops. Defenders who only add alarms after
			the fact often find the move cost is still low — the attacker already has the loot in hand
			by the time the page goes out.
		</p>

		<h2 class="font-display text-2xl text-ink mt-4">The three structural knobs</h2>
		<p>
			You don't patch EROI. You shape the system so each cost is structurally high. There are
			three knobs that do real work, and they correspond to the three properties on the
			<a href="/pay" class="underline underline-offset-4">Pay page</a>:
		</p>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li><span class="font-display text-ink">Fan-out</span> raises the <em>find</em> and <em>hold</em> cost by dispersing value across many independent holders — no single target is worth breaching.</li>
			<li><span class="font-display text-ink">Opacity</span> raises the <em>find</em> and <em>reach</em> cost by making it hard to know what's there, who has it, or where it sits.</li>
			<li><span class="font-display text-ink">Binding</span> raises the <em>move</em> cost by tying the value to the holder — detached from its rightful context, it loses worth or cannot be moved at all.</li>
		</ul>

		<div class="rounded-[28px] bg-bone-100 p-6 mt-4">
			<p class="eyebrow">Target profile</p>
			<p class="mt-2">
				Score each knob 1 (low) to 3 (high) per asset class. The target is ≥ 2 on every knob on
				every asset class — a system at (3, 3, 3) has reached the rubric ceiling. Anything
				below (2, 2, 2) means at least one cost is low enough that an EROI ≥ 1 budget exists for
				some attacker. The next two lessons explain why that is, and then walk the audit.
			</p>
		</div>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">Why a capturable system invites capture</h3>
			<p class="mt-2 text-sm text-ink-2">Concentrated, visible, separable value is an open invitation.</p>
		</div>
		<Cta variant="primary" href="/docs/why-systems-get-captured">Continue</Cta>
	</div>
</section>
