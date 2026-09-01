<script>
	import Cta from '$lib/components/Cta.svelte';
</script>

<svelte:head>
	<title>How Voyager Pay satisfies the EROI rubric — Voyager docs</title>
</svelte:head>

<section class="pt-4 pb-12">
	<span class="eyebrow">Lesson 7</span>
	<h1 class="mt-3 font-display text-[40px] sm:text-[52px] text-ink leading-[1.05]">
		How Voyager Pay satisfies the EROI rubric.
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
		Voyager Pay is hard to capture. Three properties do the work. Value is spread out across many independent holders. What exists, who has it, and where it sits is hidden. And value is tied to its rightful context, so detached value loses worth. This page walks each property and shows where Voyager Pay puts it to work.
	</p>
</section>

<nav class="pb-10" aria-label="On this page">
	<ul class="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
		<li><a href="#formula" class="text-ink underline underline-offset-4 decoration-[1.5px]">The formula</a></li>
		<li><a href="#dispersion" class="text-ink underline underline-offset-4 decoration-[1.5px]">Dispersion</a></li>
		<li><a href="#information" class="text-ink underline underline-offset-4 decoration-[1.5px]">Information</a></li>
		<li><a href="#coupling" class="text-ink underline underline-offset-4 decoration-[1.5px]">Coupling</a></li>
		<li><a href="#where-it-lives" class="text-ink underline underline-offset-4 decoration-[1.5px]">Where each property lives</a></li>
	</ul>
</nav>

<section id="formula" class="pb-12 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<div class="rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">The formula</p>
			<p class="mt-2 font-display text-2xl text-ink">extractor_EROI = deliverable_surplus ÷ capture_cost</p>
			<p class="mt-2 text-sm">An attack is a budget problem for the attacker. If what they have to spend to take the value is more than the value itself, they move on. Push each cost up before the attack begins and most attackers leave. The four costs are taught in <a href="/docs/what-is-eroi" class="text-ink underline underline-offset-4 decoration-[1.5px]">Lesson 5</a>.</p>
		</div>
	</div>
</section>

<section id="dispersion" class="pb-12 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">Dispersion.</h2>
		<p>Value is split across many independent holders. No single target is worth breaching on its own.</p>
		<h3 class="font-display text-xl text-ink mt-2">A concrete example.</h3>
		<p>Cash in a vault versus cash across many small wallets in different places. The vault concentrates the value. One building to find, one safe to crack, one bag to carry out. Spread the same total across thousands of small balances belonging to different people in different places and the math changes. No single address publishes them all. Many separate compromises are needed. The attacker cannot be at all of them at once. Same total value. Much higher cost to take it.</p>
		<h3 class="font-display text-xl text-ink mt-2">Where Voyager Pay puts it to work.</h3>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li>Many independent operators, each running their own node in their own place.</li>
			<li>Each seller keeps their own listings. There is no central index that aggregates them.</li>
			<li>Each order's money sits in its own hold-invoice on its own node, addressed to a different key.</li>
		</ul>
		<p>The attacker's budget grows with every operator they would have to compromise.</p>
	</div>
</section>

<section id="information" class="pb-12 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">Information.</h2>
		<p>What exists, who has it, and where it sits is hidden. There is no registry to point at.</p>
		<h3 class="font-display text-xl text-ink mt-2">A concrete example.</h3>
		<p>A street artist's income versus a billboard ad. The billboard publishes a rate card: eyeballs per day, price per thousand. A buyer can find it, price it, and book it from a desk. The street artist has none of that. There is no ticker for "Negril sketches sold to passers-by in March." One is findable from anywhere. The other requires a body in a place.</p>
		<h3 class="font-display text-xl text-ink mt-2">Where Voyager Pay puts it to work.</h3>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li>Order messages are encrypted end to end. The relays that pass them along see only ciphertext.</li>
			<li>Keys are pseudonymous. There is no identity check at the protocol level.</li>
			<li>The public ledger only shows one side of each trade. No public listing server aggregates both.</li>
		</ul>
		<p>The attacker has nothing to point at.</p>
	</div>
</section>

<section id="coupling" class="pb-12 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">Coupling.</h2>
		<p>Value is tied to its rightful context. Detached value loses worth, or won't move at all.</p>
		<h3 class="font-display text-xl text-ink mt-2">A concrete example.</h3>
		<p>A $100 bill versus a refundable $100 deposit pegged to a buyer identity with revocation rights. The bill is portable: whoever holds it owns it. The deposit belongs to the buyer who posted it. The merchant can refund it to that buyer's account and nowhere else. The moment it detaches from its rightful context, it loses worth.</p>
		<h3 class="font-display text-xl text-ink mt-2">Where Voyager Pay puts it to work.</h3>
		<ul class="list-disc pl-5 flex flex-col gap-2">
			<li>Settlement is atomic. Sats move only when the other side delivers.</li>
			<li>Three keys sign before money moves. The buyer, the seller, and the operator must all agree.</li>
			<li>If one connection is stolen, it can be revoked without losing the rest. The worst case is one in-flight order, not the buyer's whole balance.</li>
		</ul>
		<p>The loot is no longer loot.</p>
	</div>
</section>

<section id="where-it-lives" class="pb-12 scroll-mt-20">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<h2 class="font-display text-2xl text-ink mt-4">Where each property lives.</h2>
		<p>This is the same list, all in one place. Each row says what the property does inside Voyager Pay.</p>

		<div class="overflow-x-auto rounded-[28px] bg-bone-100 p-6">
			<p class="eyebrow">Property · What it does in Voyager Pay</p>
			<table class="mt-3 w-full text-sm">
				<thead>
					<tr class="text-left text-ink">
						<th class="py-2 pr-4 font-medium">Property</th>
						<th class="py-2 font-medium">What it does in Voyager Pay</th>
					</tr>
				</thead>
				<tbody class="text-ink-2">
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top font-display text-ink">Dispersion</td>
						<td class="py-2 align-top">Many independent operators, each running their own node in their own place.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top"></td>
						<td class="py-2 align-top">Each seller keeps their own listings. There is no central index that aggregates them.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top"></td>
						<td class="py-2 align-top">Each order's money sits in its own hold-invoice on its own node, addressed to a different key.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top font-display text-ink">Information</td>
						<td class="py-2 align-top">Order messages are encrypted end to end. The relays that pass them along see only ciphertext.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top"></td>
						<td class="py-2 align-top">Keys are pseudonymous. There is no identity check at the protocol level.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top"></td>
						<td class="py-2 align-top">The public ledger only shows one side of each trade. No public listing server aggregates both.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top font-display text-ink">Coupling</td>
						<td class="py-2 align-top">Settlement is atomic. Sats move only when the other side delivers.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top"></td>
						<td class="py-2 align-top">Three keys sign before money moves. The buyer, the seller, and the operator must all agree.</td>
					</tr>
					<tr class="border-t border-bone-200">
						<td class="py-2 pr-4 align-top"></td>
						<td class="py-2 align-top">If one connection is stolen, it can be revoked without losing the rest. The worst case is one in-flight order, not the buyer's whole balance.</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>Each of these raises the attacker's cost before the attack begins.</p>
	</div>
</section>

<section class="pb-12">
	<div class="flex flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
		<p>
			Hard to capture does not mean nothing can go wrong. The next lesson is where this matters most: what is still risky anyway.
		</p>
	</div>
</section>

<section class="pb-32">
	<div class="rounded-[28px] bg-bone-100 p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<span class="eyebrow">Next up</span>
			<h3 class="mt-2 font-display text-xl text-ink">How Voyager Pay extends</h3>
			<p class="mt-2 text-sm text-ink-2">Why the same wire format carries physical goods, stays, experiences, services, and digital downloads.</p>
		</div>
		<Cta variant="primary" href="/docs/how-voyager-pay-extends">Continue</Cta>
	</div>
</section>